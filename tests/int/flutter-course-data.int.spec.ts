import { describe, expect, it } from 'vitest'
import { flutterFinalAssessment, flutterLessons } from '@/data/flutter-course-data'

describe('Flutter and Dart learning course', () => {
  it('covers the twelve requested beginner-to-advanced lessons', () => {
    expect(flutterLessons.map((lesson) => lesson.slug)).toEqual([
      'flutter-introduction',
      'flutter-setup',
      'flutter-project-structure',
      'dart-fundamentals',
      'flutter-ui-development',
      'navigation-state-management',
      'backend-rest-api',
      'database-integration',
      'iot-sensor-integration',
      'mobile-device-features',
      'building-android-apps',
      'complete-flutter-iot-app',
    ])
    expect(flutterLessons[0].level).toBe('Beginner')
    expect(flutterLessons.at(-1)?.level).toBe('Advanced')
  })

  it('provides real activities, code, diagrams, official resources, and interactive quizzes', () => {
    for (const lesson of flutterLessons) {
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
      expect(lesson.docs.length, lesson.title).toBeGreaterThan(0)
    }

    expect(flutterFinalAssessment.length).toBeGreaterThanOrEqual(5)
  })

  it('includes required Flutter, API, persistence, native, build, and IoT concepts', () => {
    const courseText = JSON.stringify(flutterLessons).toLowerCase()

    for (const topic of [
      'flutter doctor',
      'pubspec.yaml',
      'null safety',
      'riverpod',
      'provider',
      'fastapi',
      'sqlite',
      'sharedpreferences',
      'firebase_core',
      'camera',
      'path_provider',
      'websocket',
      'bluetooth',
      'flutter build apk --release',
      'tof_distance_mm',
      'soil_raw',
      'soil_moisture_percent',
      'mqtt',
    ]) {
      expect(courseText, topic).toContain(topic)
    }
  })
})
