import { describe, expect, it } from 'vitest'
import { vscodeFinalAssessment, vscodeLessons } from '@/data/vscode-course-data'

describe('Visual Studio Code learning course', () => {
  it('covers the requested beginner-to-advanced learning path', () => {
    expect(vscodeLessons.map((lesson) => lesson.slug)).toEqual([
      'vscode-introduction',
      'vscode-installation',
      'vscode-interface',
      'vscode-extensions',
      'vscode-terminal',
      'vscode-web-development',
      'vscode-python-backend',
      'vscode-flutter-dart',
      'vscode-ionic-capacitor',
      'vscode-backend-development',
      'vscode-git-github',
      'vscode-esp32-platformio',
      'vscode-raspberry-pi-remote',
      'vscode-debugging',
      'complete-iot-workflow',
    ])
    expect(vscodeLessons[0].level).toBe('Beginner')
    expect(vscodeLessons.at(-1)?.level).toBe('Advanced')
  })

  it('provides actual tutorials, interactive examples, activities, quizzes, and references', () => {
    for (const lesson of vscodeLessons) {
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

    expect(vscodeFinalAssessment.length).toBeGreaterThanOrEqual(5)
  })

  it('covers the declared tooling and cross-platform development tracks', () => {
    const courseText = JSON.stringify(vscodeLessons).toLowerCase()

    for (const topic of [
      'visual studio code',
      'extensions',
      'integrated terminal',
      'python',
      'flutter',
      'ionic',
      'capacitor',
      'git',
      'github',
      'esp32',
      'platformio',
      'raspberry pi',
      'remote - ssh',
      'debugger',
      'mqtt',
      'fastapi',
    ]) {
      expect(courseText, topic).toContain(topic)
    }
  })
})
