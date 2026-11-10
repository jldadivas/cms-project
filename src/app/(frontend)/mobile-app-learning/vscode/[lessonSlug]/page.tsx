import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { VSCodeAssessmentPage, VSCodeLessonPage } from '@/components/VSCodeLearning'
import { vscodeLessons } from '@/data/vscode-course-data'

type VSCodeLessonRouteProps = {
  params: Promise<{ lessonSlug: string }>
}

export default async function VSCodeLessonRoute({ params }: VSCodeLessonRouteProps) {
  const { lessonSlug } = await params

  if (lessonSlug === 'assessment') return <VSCodeAssessmentPage />

  const lesson = vscodeLessons.find((item) => item.slug === lessonSlug)
  if (!lesson) notFound()

  return <VSCodeLessonPage lesson={lesson} />
}

export function generateStaticParams() {
  return [
    ...vscodeLessons.map((lesson) => ({ lessonSlug: lesson.slug })),
    { lessonSlug: 'assessment' },
  ]
}

export async function generateMetadata({ params }: VSCodeLessonRouteProps): Promise<Metadata> {
  const { lessonSlug } = await params
  if (lessonSlug === 'assessment') {
    return {
      title: 'VS Code Final Assessment | Mobile App Development',
      description:
        'Assess VS Code editor skills, extensions, web and Python tools, Git, embedded development, remote workflows, and IoT safety.',
    }
  }

  const lesson = vscodeLessons.find((item) => item.slug === lessonSlug)
  if (!lesson) return { title: 'Lesson Not Found | VS Code Learning Center' }

  return {
    title: `${lesson.title} | VS Code Learning Center`,
    description: lesson.summary,
  }
}
