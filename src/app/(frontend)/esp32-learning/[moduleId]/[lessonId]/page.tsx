import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { esp32CourseModules } from '@/data/esp32-course-data'
import { LearningLayout } from '@/components/ESP32Learning/LearningLayout'
import { LessonView } from '@/components/ESP32Learning/LessonView'

type Args = {
  params: Promise<{
    moduleId: string
    lessonId: string
  }>
}

export default async function LessonPage({ params: paramsPromise }: Args) {
  const { moduleId, lessonId } = await paramsPromise

  // Locate module by slug or id
  const currentModule = esp32CourseModules.find(
    (m) => m.slug === moduleId || m.id === moduleId
  )
  if (!currentModule) {
    notFound()
  }

  // Locate lesson by slug or id
  const lessonIndex = currentModule.lessons.findIndex(
    (l) => l.slug === lessonId || l.id === lessonId
  )
  if (lessonIndex < 0) {
    notFound()
  }

  const lesson = currentModule.lessons[lessonIndex]
  const isLastLessonInModule = lessonIndex === currentModule.lessons.length - 1

  // Compute flattened lesson list for inter-module Previous / Next navigation
  const allFlattenedLessons = esp32CourseModules.flatMap((m) =>
    m.lessons.map((l) => ({
      moduleSlug: m.slug,
      lessonSlug: l.slug,
      title: l.title,
    }))
  )

  const currentFlattenedIndex = allFlattenedLessons.findIndex(
    (item) => item.moduleSlug === currentModule.slug && item.lessonSlug === lesson.slug
  )

  const previousLesson =
    currentFlattenedIndex > 0 ? allFlattenedLessons[currentFlattenedIndex - 1] : null
  const nextLesson =
    currentFlattenedIndex < allFlattenedLessons.length - 1
      ? allFlattenedLessons[currentFlattenedIndex + 1]
      : null

  return (
    <LearningLayout
      currentLessonSlug={lesson.slug}
      currentModuleId={currentModule.slug}
    >
      <LessonView
        isLastLessonInModule={isLastLessonInModule}
        lesson={lesson}
        module={currentModule}
        nextLesson={nextLesson}
        previousLesson={previousLesson}
      />
    </LearningLayout>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { moduleId, lessonId } = await paramsPromise
  const currentModule = esp32CourseModules.find(
    (m) => m.slug === moduleId || m.id === moduleId
  )
  const lesson = currentModule?.lessons.find(
    (l) => l.slug === lessonId || l.id === lessonId
  )

  if (!currentModule || !lesson) {
    return {
      title: 'Lesson Not Found | ESP32 Learning Center',
    }
  }

  return {
    title: `${lesson.title} | ${currentModule.title} | ESP32 Learning Center`,
    description: lesson.shortDescription,
  }
}
