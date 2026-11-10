import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { FlutterAssessmentPage, FlutterLessonPage } from '@/components/FlutterLearning'
import { flutterLessons } from '@/data/flutter-course-data'

type FlutterLessonRouteProps = {
  params: Promise<{ lessonSlug: string }>
}

export default async function FlutterLessonRoute({ params }: FlutterLessonRouteProps) {
  const { lessonSlug } = await params

  if (lessonSlug === 'assessment') return <FlutterAssessmentPage />

  const lesson = flutterLessons.find((item) => item.slug === lessonSlug)
  if (!lesson) notFound()

  return <FlutterLessonPage lesson={lesson} />
}

export function generateStaticParams() {
  return [
    ...flutterLessons.map((lesson) => ({ lessonSlug: lesson.slug })),
    { lessonSlug: 'assessment' },
  ]
}

export async function generateMetadata({ params }: FlutterLessonRouteProps): Promise<Metadata> {
  const { lessonSlug } = await params
  if (lessonSlug === 'assessment') {
    return {
      title: 'Flutter and Dart Final Assessment | Mobile App Development',
      description:
        'Assess Flutter, Dart, APIs, persistence, device plugins, Android builds, and IoT application knowledge.',
    }
  }

  const lesson = flutterLessons.find((item) => item.slug === lessonSlug)
  if (!lesson) return { title: 'Lesson Not Found | Flutter Learning Center' }

  return {
    title: `${lesson.title} | Flutter Learning Center`,
    description: lesson.summary,
  }
}
