import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { IonicAssessmentPage, IonicLessonPage } from '@/components/IonicLearning'
import { ionicLessons } from '@/data/ionic-course-data'

type IonicLessonRouteProps = {
  params: Promise<{ lessonSlug: string }>
}

export default async function IonicLessonRoute({ params }: IonicLessonRouteProps) {
  const { lessonSlug } = await params

  if (lessonSlug === 'assessment') return <IonicAssessmentPage />

  const lesson = ionicLessons.find((item) => item.slug === lessonSlug)
  if (!lesson) notFound()

  return <IonicLessonPage lesson={lesson} />
}

export function generateStaticParams() {
  return [
    ...ionicLessons.map((lesson) => ({ lessonSlug: lesson.slug })),
    { lessonSlug: 'assessment' },
  ]
}

export async function generateMetadata({ params }: IonicLessonRouteProps): Promise<Metadata> {
  const { lessonSlug } = await params
  if (lessonSlug === 'assessment') {
    return {
      title: 'Ionic Framework Final Assessment | Mobile App Development',
      description:
        'Assess Ionic components, React and Angular, TypeScript, REST APIs, Capacitor, Android builds, and IoT apps.',
    }
  }

  const lesson = ionicLessons.find((item) => item.slug === lessonSlug)
  if (!lesson) return { title: 'Lesson Not Found | Ionic Learning Center' }

  return {
    title: `${lesson.title} | Ionic Learning Center`,
    description: lesson.summary,
  }
}
