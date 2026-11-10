import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  AndroidStudioAssessmentPage,
  AndroidStudioLessonPage,
} from '@/components/AndroidStudioLearning'
import { androidStudioLessons } from '@/data/android-studio-course-data'

type AndroidStudioLessonRouteProps = {
  params: Promise<{ lessonSlug: string }>
}

export default async function AndroidStudioLessonRoute({ params }: AndroidStudioLessonRouteProps) {
  const { lessonSlug } = await params

  if (lessonSlug === 'assessment') return <AndroidStudioAssessmentPage />

  const lesson = androidStudioLessons.find((item) => item.slug === lessonSlug)
  if (!lesson) notFound()

  return <AndroidStudioLessonPage lesson={lesson} />
}

export function generateStaticParams() {
  return [
    ...androidStudioLessons.map((lesson) => ({ lessonSlug: lesson.slug })),
    { lessonSlug: 'assessment' },
  ]
}

export async function generateMetadata({
  params,
}: AndroidStudioLessonRouteProps): Promise<Metadata> {
  const { lessonSlug } = await params
  if (lessonSlug === 'assessment') {
    return {
      title: 'Android Studio Final Assessment | Mobile App Development',
      description:
        'Assess Android Studio, Kotlin, Java, Compose, REST APIs, Room, hardware, IoT architecture, and release builds.',
    }
  }

  const lesson = androidStudioLessons.find((item) => item.slug === lessonSlug)
  if (!lesson) return { title: 'Lesson Not Found | Android Studio Learning Center' }

  return {
    title: `${lesson.title} | Android Studio Learning Center`,
    description: lesson.summary,
  }
}
