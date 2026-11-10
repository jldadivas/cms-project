import { describe, expect, it } from 'vitest'
import { ionicFinalAssessment, ionicLessons } from '@/data/ionic-course-data'

describe('Ionic Framework learning course', () => {
  it('covers the thirteen requested beginner-to-advanced lessons', () => {
    expect(ionicLessons.map((lesson) => lesson.slug)).toEqual([
      'ionic-introduction',
      'ionic-setup',
      'first-ionic-app',
      'ionic-project-structure',
      'ionic-ui-components',
      'ionic-navigation',
      'javascript-typescript',
      'backend-rest-api',
      'database-integration',
      'ionic-capacitor',
      'iot-sensor-integration',
      'android-build-deploy',
      'complete-ionic-iot-app',
    ])
    expect(ionicLessons[0].level).toBe('Beginner')
    expect(ionicLessons.at(-1)?.level).toBe('Advanced')
  })

  it('provides complete examples, activities, diagrams, and interactive questions', () => {
    for (const lesson of ionicLessons) {
      expect(lesson.sections.length, lesson.title).toBeGreaterThan(0)
      expect(lesson.steps.length, lesson.title).toBeGreaterThan(0)
      expect(lesson.examples.length, lesson.title).toBeGreaterThan(0)
      expect(
        lesson.examples.every((example) => example.code.trim().length > 20),
        lesson.title,
      ).toBe(true)
      expect(lesson.activity, lesson.title).toBeTruthy()
      expect(lesson.diagram.nodes.length, lesson.title).toBeGreaterThan(2)
      expect(
        lesson.quiz.some((item) => item.type === 'Multiple choice'),
        lesson.title,
      ).toBe(true)
      expect(
        lesson.quiz.some((item) => item.type === 'True or false'),
        lesson.title,
      ).toBe(true)
      expect(
        lesson.quiz.some((item) => item.type === 'Code reading'),
        lesson.title,
      ).toBe(true)
      expect(lesson.docs.length, lesson.title).toBeGreaterThan(0)
    }

    expect(ionicFinalAssessment.length).toBeGreaterThanOrEqual(5)
  })

  it('includes required Ionic, Capacitor, backend, and sensor topics', () => {
    const courseText = JSON.stringify(ionicLessons).toLowerCase()

    for (const topic of [
      'ionic start myionicapp blank --type=react',
      '--type=angular',
      'ion-modal',
      'ion-toast',
      'ion-searchbar',
      'onioninput',
      'npx cap sync android',
      '@capacitor/camera',
      'firebase',
      'fastapi',
      'sqlite',
      'tof_distance_mm',
      'soil_raw',
      'soil_moisture_percent',
      'mqtt',
      '10.0.2.2',
      'android/app/build/outputs',
    ]) {
      expect(courseText, topic).toContain(topic)
    }
  })

  it('includes working API, SQLite, HTML, and chart examples', () => {
    const backendLesson = ionicLessons.find((lesson) => lesson.slug === 'backend-rest-api')
    const databaseLesson = ionicLessons.find((lesson) => lesson.slug === 'database-integration')
    const javascriptLesson = ionicLessons.find((lesson) => lesson.slug === 'javascript-typescript')
    const iotLesson = ionicLessons.find((lesson) => lesson.slug === 'iot-sensor-integration')

    expect(
      backendLesson?.examples.some(
        (example) =>
          example.title === 'POST sign-in and handle status' &&
          example.code.includes('/api/login') &&
          !example.code.includes('******'),
      ),
    ).toBe(true)
    expect(
      backendLesson?.examples.some(
        (example) =>
          example.title === 'Axios GET, PUT, and DELETE' && example.code.includes('api.put'),
      ),
    ).toBe(true)
    expect(
      databaseLesson?.examples.some((example) => example.title === 'SQLite package setup'),
    ).toBe(true)
    expect(
      javascriptLesson?.examples.some(
        (example) => example.title === 'HTML and CSS structure' && example.code.includes('\n'),
      ),
    ).toBe(true)
    expect(
      iotLesson?.examples.some((example) => example.title === 'Render a simple SVG history chart'),
    ).toBe(true)
  })
})
