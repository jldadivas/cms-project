import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { cache } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import RichText from '@/components/RichText'
import { GuideLessonMedia } from '@/components/GuideLessonMedia'
import { GuideLessonGuide, type LessonGuideBlock } from '@/components/GuideLessonGuide'
import { guideTopics } from '@/endpoints/seed/guide-topics'
import { guideLessonSteps } from '@/endpoints/seed/guide-lesson-steps'
import {
  guideLessonCodeExamples,
  guideLessonGuides,
  guideLessonImages,
  guideLessonStepTitles,
  guideLessonVideos,
} from '@/endpoints/seed/guide-lesson-resources'
import type { Page } from '@/payload-types'
import { toLessonSlug } from '@/utilities/toLessonSlug'

type Args = {
  params: Promise<{
    slug: string
    lessonSlug: string
  }>
}

type ResolvedLesson = {
  heading: string
  lessonSlug: string
  body: string
  description: string
  content?: NonNullable<Page['topicSections']>[number]['content']
  image?: NonNullable<Page['topicSections']>[number]['image']
  imageSrc?: string
  videoTitle?: string | null
  videoUrl?: string | null
  guide?: LessonGuideBlock[]
  stepTitle?: string
  codeExamples: { title: string; language?: string | null; code: string }[]
  steps: { title: string; details: string }[]
}

export default async function GuideLessonPage({ params: paramsPromise }: Args) {
  const { slug: topicSlug, lessonSlug } = await paramsPromise
  const topic = await queryTopicBySlug(topicSlug)
  const fallbackTopic = guideTopics.find((item) => item.slug === topicSlug)

  if (!topic && !fallbackTopic) notFound()

  const lessons = resolveLessons(topicSlug, topic, fallbackTopic)
  const lessonIndex = lessons.findIndex((lesson) => lesson.lessonSlug === lessonSlug)

  if (lessonIndex < 0) notFound()

  const lesson = lessons[lessonIndex]
  const previousLesson = lessons[lessonIndex - 1]
  const nextLesson = lessons[lessonIndex + 1]
  const topicTitle = topic?.title || fallbackTopic?.title || 'Expo Go Guide'

  return (
    <article className="bg-[#f3f3e9] text-[#18342e]">
      <header className="border-b border-[#bac8b9] bg-[#e4ead9]">
        <div className="container py-12 md:py-16">
          <Link
            className="mb-9 inline-flex items-center gap-2 text-sm text-[#56776a] hover:text-[#18342e]"
            href={`/${topicSlug}`}
          >
            <ChevronLeft aria-hidden="true" className="size-4" /> All {topicTitle} lessons
          </Link>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-[#66836e]">
            {topicTitle} / Lesson {String(lessonIndex + 1).padStart(2, '0')} of{' '}
            {String(lessons.length).padStart(2, '0')}
          </p>
          <h1 className="max-w-5xl text-4xl leading-[1.06] font-semibold md:text-6xl">
            {lesson.heading}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-[#4f6b60] md:text-xl">
            {lesson.description}
          </p>
        </div>
      </header>

      <div className="container max-w-7xl py-10 md:py-14">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-16">
          <main className="min-w-0">
            <section aria-labelledby="lesson-explanation">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#789083]">
                Lesson explanation
              </p>
              <h2 className="sr-only" id="lesson-explanation">
                Lesson explanation
              </h2>
              {lesson.body && (
                <p className="max-w-3xl whitespace-pre-line text-lg leading-8 text-[#405d53]">
                  {lesson.body}
                </p>
              )}
              {lesson.content && (
                <RichText
                  className="mt-6 max-w-3xl text-[#405d53]"
                  data={lesson.content}
                  enableGutter={false}
                />
              )}
              {!lesson.content && lesson.guide && <GuideLessonGuide blocks={lesson.guide} />}
            </section>

            {lesson.steps.length > 0 && (
              <section aria-labelledby="lesson-steps" className="mt-12">
                <div className="mb-5 border-b border-[#bac8b9] pb-4">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#789083]">
                    Work through it
                  </p>
                  <h2 className="text-3xl font-semibold" id="lesson-steps">
                    {lesson.stepTitle || 'Step by step'}
                  </h2>
                </div>
                <ol>
                  {lesson.steps.map((step, index) => (
                    <li
                      className="grid gap-3 border-b border-[#d2dcd2] py-6 md:grid-cols-[3rem_minmax(0,1fr)] md:gap-5"
                      key={`${step.title}-${index}`}
                    >
                      <span className="grid size-9 place-items-center rounded-full bg-[#d9e5c2] font-mono text-sm font-semibold text-[#31594b]">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div className="max-w-3xl">
                        <h3 className="text-xl font-semibold">{step.title}</h3>
                        <p className="mt-2 text-base leading-7 text-[#4f6b60]">{step.details}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {lesson.codeExamples.length > 0 && (
              <section aria-labelledby="lesson-code" className="mt-12">
                <div className="mb-5 border-b border-[#bac8b9] pb-4">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#789083]">
                    Try it yourself
                  </p>
                  <h2 className="text-3xl font-semibold" id="lesson-code">
                    Code examples
                  </h2>
                </div>
                <div className="space-y-5">
                  {lesson.codeExamples.map((example, index) => (
                    <figure
                      className="overflow-hidden rounded-lg border border-[#164044] bg-[#002326]"
                      key={`${example.title}-${index}`}
                    >
                      <figcaption className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-3 text-sm text-[#d9e9e5]">
                        <span className="font-medium">{example.title}</span>
                        <span className="font-mono text-xs uppercase text-[#9bb2b1]">
                          {example.language || 'text'}
                        </span>
                      </figcaption>
                      <pre className="overflow-x-auto p-5 text-sm leading-7 text-[#d4f0df]">
                        <code>{example.code}</code>
                      </pre>
                    </figure>
                  ))}
                </div>
              </section>
            )}

            <div className="mt-10">
              <GuideLessonMedia
                image={lesson.image}
                imageSrc={lesson.imageSrc}
                title={lesson.heading}
                videoTitle={lesson.videoTitle}
                videoUrl={lesson.videoUrl}
              />
            </div>

            <nav
              aria-label="Previous and next lessons"
              className="mt-12 flex justify-between gap-4 border-t border-[#bac8b9] pt-6"
            >
              {previousLesson ? (
                <Link
                  className="group flex max-w-[48%] items-center gap-3"
                  href={`/${topicSlug}/lesson/${previousLesson.lessonSlug}`}
                >
                  <ChevronLeft aria-hidden="true" className="size-5 shrink-0" />
                  <span>
                    <span className="block text-xs uppercase tracking-[0.1em] text-[#789083]">
                      Previous lesson
                    </span>
                    <span className="mt-1 block font-semibold group-hover:underline">
                      {previousLesson.heading}
                    </span>
                  </span>
                </Link>
              ) : (
                <span />
              )}
              {nextLesson && (
                <Link
                  className="group flex max-w-[48%] items-center gap-3 text-right"
                  href={`/${topicSlug}/lesson/${nextLesson.lessonSlug}`}
                >
                  <span>
                    <span className="block text-xs uppercase tracking-[0.1em] text-[#789083]">
                      Next lesson
                    </span>
                    <span className="mt-1 block font-semibold group-hover:underline">
                      {nextLesson.heading}
                    </span>
                  </span>
                  <ChevronRight aria-hidden="true" className="size-5 shrink-0" />
                </Link>
              )}
            </nav>
          </main>

          <aside className="border-l-2 border-[#b8c9b7] py-1 pl-5 lg:sticky lg:top-8">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#789083]">
              In this lesson
            </p>
            <p className="mt-3 text-3xl font-semibold text-[#31594b]">
              {String(lesson.steps.length).padStart(2, '0')}
            </p>
            <p className="mt-1 text-sm text-[#56776a]">guided steps</p>
            <Link
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#31594b] underline decoration-[#9bae9f] underline-offset-4 hover:decoration-[#31594b]"
              href={`/${topicSlug}`}
            >
              View all lessons
              <ChevronRight aria-hidden="true" className="size-4" />
            </Link>
          </aside>
        </div>
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug: topicSlug, lessonSlug } = await paramsPromise
  const topic = await queryTopicBySlug(topicSlug)
  const fallbackTopic = guideTopics.find((item) => item.slug === topicSlug)
  const lessons = resolveLessons(topicSlug, topic, fallbackTopic)
  const lesson = lessons.find((item) => item.lessonSlug === lessonSlug)

  return {
    title: lesson
      ? `${lesson.heading} | ${topic?.title || fallbackTopic?.title}`
      : 'Expo Go lesson',
    description: lesson?.description,
  }
}

const queryTopicBySlug = cache(async (slug: string) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'pages',
    depth: 2,
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
      topicOrder: {
        greater_than: 0,
      },
    },
  })

  return result.docs[0] || null
})

function resolveLessons(
  topicSlug: string,
  page: Page | null,
  fallbackTopic: (typeof guideTopics)[number] | undefined,
): ResolvedLesson[] {
  const cmsSections = page?.topicSections || []
  const fallbackSections = fallbackTopic?.sections || []
  const sectionCount = cmsSections.length || fallbackSections.length

  return Array.from({ length: sectionCount }, (_, index) => {
    const cmsSection = cmsSections[index]
    const fallbackSection = fallbackSections[index]
    const heading = cmsSection?.heading || fallbackSection?.heading || 'Lesson'
    const lessonSlug = cmsSection?.lessonSlug?.trim() || toLessonSlug(heading)
    const body = cmsSection?.body || fallbackSection?.body || ''
    const lessonKey = `${topicSlug}/${lessonSlug}`
    const fallbackVideo = guideLessonVideos[lessonKey]
    const steps = cmsSection?.steps?.length
      ? cmsSection.steps.map(({ title, details }) => ({ title, details }))
      : guideLessonSteps[lessonKey] || []
    const codeExamples = cmsSection?.codeExamples?.length
      ? cmsSection.codeExamples.map(({ title, language, code }) => ({ title, language, code }))
      : guideLessonCodeExamples[lessonKey] || []

    return {
      heading,
      lessonSlug,
      body,
      description:
        cmsSection?.description?.trim() ||
        'A guided explanation with practical, step-by-step instructions.',
      content: cmsSection?.content,
      guide: guideLessonGuides[lessonKey],
      image: cmsSection?.image,
      imageSrc: cmsSection?.image ? undefined : guideLessonImages[lessonKey],
      videoTitle: cmsSection?.videoTitle || fallbackVideo?.title,
      videoUrl: cmsSection?.videoUrl || fallbackVideo?.url,
      stepTitle: guideLessonStepTitles[lessonKey],
      codeExamples,
      steps,
    }
  })
}
