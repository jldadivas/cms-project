'use client'

import { useState, useEffect, useCallback } from 'react'
import { esp32CourseModules } from '@/data/esp32-course-data'

const STORAGE_KEY = 'esp32_lms_progress_v1'

export interface CourseProgressState {
  completedLessons: string[]
  quizScores: Record<string, number>
  finalExamScore: number | null
  lastVisitedSlug: string | null
  userName?: string
  lastUpdated: string
}

const DEFAULT_STATE: CourseProgressState = {
  completedLessons: [],
  quizScores: {},
  finalExamScore: null,
  lastVisitedSlug: null,
  lastUpdated: new Date().toISOString(),
}

export function useCourseProgress() {
  const [progress, setProgress] = useState<CourseProgressState>(DEFAULT_STATE)
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentUser, setCurrentUser] = useState<{ id?: string; email?: string; name?: string } | null>(null)

  // 1. Load from localStorage and check logged-in user on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        setProgress(parsed)
      }
    } catch (e) {
      console.warn('Failed to read LMS progress from localStorage:', e)
    }

    // Check Payload CMS authentication session
    fetch('/api/users/me')
      .then((res) => {
        if (res.ok) return res.json()
        return null
      })
      .then((data) => {
        if (data && data.user) {
          setCurrentUser(data.user)
          if (data.user.name) {
            setProgress((prev) => {
              const updated = { ...prev, userName: data.user.name }
              try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
              } catch (_) {}
              return updated
            })
          }
        }
      })
      .catch(() => {
        // Not logged in or network error, continue using localStorage seamlessly
      })
      .finally(() => {
        setIsLoaded(true)
      })
  }, [])

  // 2. Persist helper
  const persistState = useCallback((newState: CourseProgressState) => {
    setProgress(newState)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newState))
    } catch (e) {
      console.warn('Failed to persist LMS progress:', e)
    }
  }, [])

  // 3. Mark lesson complete
  const markLessonComplete = useCallback((lessonSlug: string) => {
    setProgress((prev) => {
      if (prev.completedLessons.includes(lessonSlug)) return prev
      const updated = {
        ...prev,
        completedLessons: [...prev.completedLessons, lessonSlug],
        lastVisitedSlug: lessonSlug,
        lastUpdated: new Date().toISOString(),
      }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      } catch (_) {}
      return updated
    })
  }, [])

  // 4. Toggle lesson complete
  const toggleLessonComplete = useCallback((lessonSlug: string) => {
    setProgress((prev) => {
      const exists = prev.completedLessons.includes(lessonSlug)
      const updatedList = exists
        ? prev.completedLessons.filter((slug) => slug !== lessonSlug)
        : [...prev.completedLessons, lessonSlug]
      const updated = {
        ...prev,
        completedLessons: updatedList,
        lastVisitedSlug: lessonSlug,
        lastUpdated: new Date().toISOString(),
      }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      } catch (_) {}
      return updated
    })
  }, [])

  // 5. Record quiz score
  const recordQuizScore = useCallback((moduleId: string, score: number) => {
    setProgress((prev) => {
      const updated = {
        ...prev,
        quizScores: {
          ...prev.quizScores,
          [moduleId]: Math.max(score, prev.quizScores[moduleId] || 0),
        },
        lastUpdated: new Date().toISOString(),
      }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      } catch (_) {}
      return updated
    })
  }, [])

  // 6. Record final exam score
  const recordFinalExamScore = useCallback((score: number, userName?: string) => {
    setProgress((prev) => {
      const updated = {
        ...prev,
        finalExamScore: Math.max(score, prev.finalExamScore || 0),
        userName: userName || prev.userName,
        lastUpdated: new Date().toISOString(),
      }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      } catch (_) {}
      return updated
    })
  }, [])

  // 7. Reset all progress
  const resetProgress = useCallback(() => {
    const fresh: CourseProgressState = {
      completedLessons: [],
      quizScores: {},
      finalExamScore: null,
      lastVisitedSlug: null,
      userName: currentUser?.name || undefined,
      lastUpdated: new Date().toISOString(),
    }
    persistState(fresh)
  }, [currentUser, persistState])

  // 8. Calculations
  const allLessons = esp32CourseModules.flatMap((m) => m.lessons)
  const totalLessonsCount = allLessons.length
  const completedCount = progress.completedLessons.length
  const overallPercentage = totalLessonsCount > 0 ? Math.round((completedCount / totalLessonsCount) * 100) : 0

  const getModuleProgress = useCallback((moduleId: string) => {
    const mod = esp32CourseModules.find((m) => m.id === moduleId)
    if (!mod) return { completed: 0, total: 0, percentage: 0, isComplete: false }
    const modLessons = mod.lessons.map((l) => l.slug)
    const completed = modLessons.filter((slug) => progress.completedLessons.includes(slug)).length
    const total = modLessons.length
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0
    return {
      completed,
      total,
      percentage,
      isComplete: completed === total && total > 0,
    }
  }, [progress.completedLessons])

  const isLessonCompleted = useCallback((lessonSlug: string) => {
    return progress.completedLessons.includes(lessonSlug)
  }, [progress.completedLessons])

  return {
    progress,
    isLoaded,
    currentUser,
    overallPercentage,
    completedCount,
    totalLessonsCount,
    markLessonComplete,
    toggleLessonComplete,
    recordQuizScore,
    recordFinalExamScore,
    resetProgress,
    getModuleProgress,
    isLessonCompleted,
  }
}
