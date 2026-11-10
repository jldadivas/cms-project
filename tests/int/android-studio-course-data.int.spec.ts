import { describe, expect, it } from 'vitest'
import {
  androidStudioFinalAssessment,
  androidStudioLessons,
} from '@/data/android-studio-course-data'

describe('Android Studio learning course', () => {
  it('covers the requested fifteen-lesson beginner-to-advanced path', () => {
    expect(androidStudioLessons.map((lesson) => lesson.slug)).toEqual([
      'android-introduction',
      'android-installation',
      'android-studio-interface',
      'first-android-project',
      'kotlin-fundamentals',
      'java-fundamentals',
      'android-project-structure',
      'android-ui-development',
      'activities-intents-navigation',
      'backend-rest-api',
      'database-integration',
      'sensors-hardware',
      'esp32-raspberry-pi-integration',
      'android-build-deploy',
      'complete-android-iot-app',
    ])
    expect(androidStudioLessons[0].level).toBe('Beginner')
    expect(androidStudioLessons.at(-1)?.level).toBe('Advanced')
  })

  it('provides actual lesson content, code, activities, diagrams, quizzes, and docs', () => {
    for (const lesson of androidStudioLessons) {
      expect(lesson.sections.length, lesson.title).toBeGreaterThan(0)
      expect(lesson.steps.length, lesson.title).toBeGreaterThan(0)
      expect(lesson.examples.length, lesson.title).toBeGreaterThan(0)
      expect(
        lesson.examples.every((example) => example.code.trim().length > 20),
        lesson.title,
      ).toBe(true)
      expect(lesson.activity, lesson.title).toBeTruthy()
      expect(lesson.diagram.nodes.length, lesson.title).toBeGreaterThan(2)
      for (const type of ['Multiple choice', 'True or false', 'Code reading'] as const) {
        expect(
          lesson.quiz.some((item) => item.type === type),
          lesson.title,
        ).toBe(true)
      }
      expect(lesson.docs.length, lesson.title).toBeGreaterThan(0)
    }

    expect(androidStudioFinalAssessment.length).toBeGreaterThanOrEqual(5)
  })

  it('covers Android development, native IoT, and deployment topics', () => {
    const courseText = JSON.stringify(androidStudioLessons).toLowerCase()

    for (const topic of [
      'android studio',
      'android sdk',
      'kotlin',
      'java',
      'gradle',
      'jetpack compose',
      'recyclerview',
      'retrofit',
      'okhttp',
      'room',
      'datastore',
      'firestore',
      'fusedlocationproviderclient',
      'bluetooth_connect',
      'tof_distance_mm',
      'light_lux',
      'soil_raw',
      'soil_moisture_percent',
      'rssi',
      'mqtt',
      'mqttasyncclient',
      'websocket',
      'wss://',
      'lighthistorychart',
      '10.0.2.2',
      'assembledebug',
      'assemblerelease',
      'bundlerelease',
      'android app bundle',
    ]) {
      expect(courseText, topic).toContain(topic)
    }
  })
})
