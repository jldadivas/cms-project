import { describe, expect, it } from 'vitest'
import { capacitorFinalAssessment, capacitorLessons } from '@/data/capacitor-course-data'

describe('Capacitor learning course', () => {
  it('covers the requested nine-lesson beginner-to-advanced path', () => {
    expect(capacitorLessons.map((lesson) => lesson.slug)).toEqual([
      'introduction',
      'prerequisites-installation',
      'first-project',
      'android-studio',
      'configuration',
      'native-plugins',
      'backend-api',
      'building-apk',
      'iot-application',
    ])
    expect(capacitorLessons[0].level).toBe('Beginner')
    expect(capacitorLessons.at(-1)?.level).toBe('Advanced')
  })

  it('provides interactive learning materials and both quiz question types per lesson', () => {
    for (const lesson of capacitorLessons) {
      expect(lesson.sections.length, lesson.title).toBeGreaterThan(0)
      expect(lesson.steps.length, lesson.title).toBeGreaterThan(0)
      expect(lesson.examples.length, lesson.title).toBeGreaterThan(0)
      expect(lesson.activity, lesson.title).toBeTruthy()
      expect(lesson.quiz.some((question) => question.type === 'Multiple choice'), lesson.title).toBe(true)
      expect(lesson.quiz.some((question) => question.type === 'True or false'), lesson.title).toBe(true)
      expect(lesson.docs.length, lesson.title).toBeGreaterThan(0)
    }

    expect(capacitorFinalAssessment.length).toBeGreaterThanOrEqual(3)
  })
})
