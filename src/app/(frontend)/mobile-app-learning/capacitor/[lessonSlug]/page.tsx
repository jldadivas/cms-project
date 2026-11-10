import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  CapacitorAssessmentPage,
  CapacitorLessonPage,
} from '@/components/CapacitorLearning'
import { capacitorLessons } from '@/data/capacitor-course-data'

type CapacitorLessonRouteProps = {
  params: Promise<{ lessonSlug: string }>
}

export default async function CapacitorLessonRoute({ params }: CapacitorLessonRouteProps) {
  const { lessonSlug } = await params

  if (lessonSlug === 'assessment') return <CapacitorAssessmentPage />

  const lesson = capacitorLessons.find((item) => item.slug === lessonSlug)
  if (!lesson) notFound()

  return <CapacitorLessonPage lesson={lesson} />
}

export function generateStaticParams() {
  return [
    ...capacitorLessons.map((lesson) => ({ lessonSlug: lesson.slug })),
    { lessonSlug: 'assessment' },
  ]
}

export async function generateMetadata({
  params,
}: CapacitorLessonRouteProps): Promise<Metadata> {
  const { lessonSlug } = await params
  if (lessonSlug === 'assessment') {
    return {
      title: 'Capacitor Final Assessment | Mobile App Development',
      description: 'Check your knowledge of Capacitor setup, native plugins, APIs, Android builds, and IoT apps.',
    }
  }

  const lesson = capacitorLessons.find((item) => item.slug === lessonSlug)
  if (!lesson) return { title: 'Lesson Not Found | Capacitor Learning Center' }

  return {
    title: `${lesson.title} | Capacitor Learning Center`,
    description: lesson.summary,
  }
}
