import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MobileAppLessonPage } from '@/components/MobileAppLearning'
import { mobileAppLessons } from '@/data/mobile-app-course-data'

type MobileLessonPageProps = {
  params: Promise<{ lessonSlug: string }>
}

export default async function MobileLessonRoute({ params }: MobileLessonPageProps) {
  const { lessonSlug } = await params
  const lesson = mobileAppLessons.find((item) => item.slug === lessonSlug)
  if (!lesson) notFound()

  return <MobileAppLessonPage lesson={lesson} />
}

export function generateStaticParams() {
  return mobileAppLessons.map((lesson) => ({ lessonSlug: lesson.slug }))
}

export async function generateMetadata({
  params,
}: MobileLessonPageProps): Promise<Metadata> {
  const { lessonSlug } = await params
  const lesson = mobileAppLessons.find((item) => item.slug === lessonSlug)

  if (!lesson) {
    return { title: 'Lesson Not Found | Mobile App Learning Center' }
  }

  return {
    title: `${lesson.title} | Mobile App Learning Center`,
    description: lesson.summary,
  }
}
