import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import Link from 'next/link'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { homeStatic } from '@/endpoints/seed/home-static'
import { guideTopics } from '@/endpoints/seed/guide-topics'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { GuideLessons } from '@/components/GuideLessons'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = pages.docs
    ?.filter((doc) => {
      return doc.slug !== 'home'
    })
    .map(({ slug }) => {
      return { slug }
    })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = 'home' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const url = '/' + decodedSlug
  let page: RequiredDataFromCollectionSlug<'pages'> | null

  page = await queryPageBySlug({
    slug: decodedSlug,
  })

  // Remove this code once your website is seeded
  if (!page && slug === 'home') {
    page = homeStatic
  }

  const fallbackTopicIndex = guideTopics.findIndex((topic) => topic.slug === decodedSlug)
  const fallbackTopic = fallbackTopicIndex >= 0 ? guideTopics[fallbackTopicIndex] : null

  if (!page && !fallbackTopic) {
    return <PayloadRedirects url={url} />
  }

  if ((page?.topicOrder !== undefined && page.topicOrder !== null) || fallbackTopic) {
    const topics = await queryGuidePages()
    const navigationTopics = topics.length
      ? topics
      : guideTopics.map((topic, index) => ({
          slug: topic.slug,
          title: topic.title,
          topicOrder: index + 1,
        }))
    const currentIndex = navigationTopics.findIndex((topic) => topic.slug === decodedSlug)
    const previousTopic = currentIndex > 0 ? navigationTopics[currentIndex - 1] : null
    const nextTopic = currentIndex >= 0 ? navigationTopics[currentIndex + 1] || null : null
    const sections = page?.topicSections?.length
      ? page.topicSections
      : fallbackTopic?.sections || []

    return (
      <article className="bg-[#f3f3e9] text-[#18342e]">
        <PageClient />
        <PayloadRedirects disableNotFound url={url} />
        {draft && <LivePreviewListener />}
        <div className="border-b border-[#bac8b9] bg-[#e4ead9]">
          <div className="container py-16 md:py-24">
            <Link
              className="mb-12 inline-flex items-center gap-2 text-sm text-[#56776a] hover:text-[#18342e]"
              href="/#topics"
            >
              <ChevronLeft aria-hidden="true" className="size-4" /> All topics
            </Link>
            <div className="max-w-4xl">
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.14em] text-[#66836e]">
                Expo Go device guide /{' '}
                {String(page?.topicOrder ?? fallbackTopicIndex + 1).padStart(2, '0')}
              </p>
              <h1 className="max-w-4xl text-5xl leading-[1.04] font-semibold md:text-7xl">
                {page?.title || fallbackTopic?.title}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#4f6b60] md:text-xl">
                {page?.summary || fallbackTopic?.summary}
              </p>
            </div>
          </div>
        </div>

        <div className="container max-w-7xl py-10 md:py-16">
          <div className="min-w-0">
            <div className="grid gap-x-8 md:grid-cols-[8rem_minmax(0,1fr)]">
              <p className="mb-6 text-xs font-semibold uppercase tracking-[0.14em] text-[#789083] md:mb-0">
                Lesson content
              </p>
              <GuideLessons sections={sections} topicSlug={decodedSlug} />
            </div>

            <nav
              aria-label="Previous and next topics"
              className="mt-8 flex justify-between gap-4 border-t border-[#bac8b9] pt-7"
            >
              {previousTopic ? (
                <Link
                  className="group flex max-w-[48%] items-center gap-3"
                  href={`/${previousTopic.slug}`}
                >
                  <ChevronLeft aria-hidden="true" className="size-5 shrink-0" />
                  <span>
                    <span className="block text-xs uppercase tracking-[0.1em] text-[#789083]">
                      Previous
                    </span>
                    <span className="mt-1 block font-semibold group-hover:underline">
                      {previousTopic.title}
                    </span>
                  </span>
                </Link>
              ) : (
                <span />
              )}
              {nextTopic && (
                <Link
                  className="group flex max-w-[48%] items-center gap-3 text-right"
                  href={`/${nextTopic.slug}`}
                >
                  <span>
                    <span className="block text-xs uppercase tracking-[0.1em] text-[#789083]">
                      Next
                    </span>
                    <span className="mt-1 block font-semibold group-hover:underline">
                      {nextTopic.title}
                    </span>
                  </span>
                  <ChevronRight aria-hidden="true" className="size-5 shrink-0" />
                </Link>
              )}
            </nav>
          </div>
        </div>
      </article>
    )
  }

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  const { hero, layout } = page

  return (
    <article className="pt-16 pb-24">
      <PageClient />
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <RenderHero {...hero} />
      <RenderBlocks blocks={layout ?? []} />
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = 'home' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const page = await queryPageBySlug({
    slug: decodedSlug,
  })

  return generateMeta({ doc: page })
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})

const queryGuidePages = cache(async () => {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'pages',
    depth: 0,
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    sort: 'topicOrder',
    where: {
      topicOrder: {
        greater_than: 0,
      },
    },
    select: {
      slug: true,
      title: true,
      topicOrder: true,
    },
  })

  return result.docs
})
