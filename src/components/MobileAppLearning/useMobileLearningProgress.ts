'use client'

import { useCallback, useEffect, useState } from 'react'

const PROGRESS_KEY = 'mobile_app_learning_progress_v1'

export interface MobileLearningProgress {
  completedLessons: string[]
  completedActivities: string[]
  quizScores: Record<string, number>
  lastVisitedSlug: string | null
}

const EMPTY_PROGRESS: MobileLearningProgress = {
  completedLessons: [],
  completedActivities: [],
  quizScores: {},
  lastVisitedSlug: null,
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function parseProgress(value: unknown): MobileLearningProgress {
  if (Array.isArray(value)) {
    return {
      ...EMPTY_PROGRESS,
      completedLessons: value.filter((slug): slug is string => typeof slug === 'string'),
    }
  }

  if (!isRecord(value)) return EMPTY_PROGRESS

  const completedLessons = Array.isArray(value.completedLessons)
    ? value.completedLessons.filter((slug): slug is string => typeof slug === 'string')
    : []
  const completedActivities = Array.isArray(value.completedActivities)
    ? value.completedActivities.filter((slug): slug is string => typeof slug === 'string')
    : []
  const quizScores: Record<string, number> = {}

  if (isRecord(value.quizScores)) {
    for (const [slug, score] of Object.entries(value.quizScores)) {
      if (typeof score === 'number' && Number.isFinite(score) && score >= 0 && score <= 100) {
        quizScores[slug] = score
      }
    }
  }

  return {
    completedLessons,
    completedActivities,
    quizScores,
    lastVisitedSlug: typeof value.lastVisitedSlug === 'string' ? value.lastVisitedSlug : null,
  }
}

export function useMobileLearningProgress(validSlugs: readonly string[]) {
  const [progress, setProgress] = useState<MobileLearningProgress>(EMPTY_PROGRESS)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const valid = new Set(validSlugs)
    try {
      const saved = localStorage.getItem(PROGRESS_KEY)
      if (saved) {
        const parsed = parseProgress(JSON.parse(saved))
        setProgress({
          ...parsed,
          completedLessons: parsed.completedLessons.filter((slug) => valid.has(slug)),
          completedActivities: parsed.completedActivities.filter((slug) => valid.has(slug)),
          quizScores: Object.fromEntries(
            Object.entries(parsed.quizScores).filter(([slug]) => valid.has(slug)),
          ),
          lastVisitedSlug:
            parsed.lastVisitedSlug && valid.has(parsed.lastVisitedSlug)
              ? parsed.lastVisitedSlug
              : null,
        })
      }
    } catch (error) {
      console.warn('Failed to read mobile app course progress:', error)
    } finally {
      setIsLoaded(true)
    }
  }, [validSlugs])

  const toggleLesson = useCallback((slug: string) => {
    setProgress((current) => {
      const completedLessons = current.completedLessons.includes(slug)
        ? current.completedLessons.filter((item) => item !== slug)
        : [...current.completedLessons, slug]
      const next = { ...current, completedLessons, lastVisitedSlug: slug }
      try {
        localStorage.setItem(PROGRESS_KEY, JSON.stringify(next))
      } catch (error) {
        console.warn('Failed to save mobile app course progress:', error)
      }
      return next
    })
  }, [])

  const toggleActivity = useCallback((slug: string) => {
    setProgress((current) => {
      const completedActivities = current.completedActivities.includes(slug)
        ? current.completedActivities.filter((item) => item !== slug)
        : [...current.completedActivities, slug]
      const next = { ...current, completedActivities }
      try {
        localStorage.setItem(PROGRESS_KEY, JSON.stringify(next))
      } catch (error) {
        console.warn('Failed to save mobile app course activity progress:', error)
      }
      return next
    })
  }, [])

  const recordQuizScore = useCallback((slug: string, score: number) => {
    setProgress((current) => {
      const next = {
        ...current,
        quizScores: {
          ...current.quizScores,
          [slug]: Math.max(current.quizScores[slug] ?? 0, score),
        },
      }
      try {
        localStorage.setItem(PROGRESS_KEY, JSON.stringify(next))
      } catch (error) {
        console.warn('Failed to save mobile app course progress:', error)
      }
      return next
    })
  }, [])

  const setLastVisitedSlug = useCallback((slug: string) => {
    setProgress((current) => {
      if (current.lastVisitedSlug === slug) return current
      const next = { ...current, lastVisitedSlug: slug }
      try {
        localStorage.setItem(PROGRESS_KEY, JSON.stringify(next))
      } catch (error) {
        console.warn('Failed to save mobile app course progress:', error)
      }
      return next
    })
  }, [])

  const valid = new Set(validSlugs)
  const visibleProgress = {
    ...progress,
    completedLessons: progress.completedLessons.filter((slug) => valid.has(slug)),
    completedActivities: progress.completedActivities.filter((slug) => valid.has(slug)),
  }

  return {
    progress: visibleProgress,
    completedLessons: visibleProgress.completedLessons,
    completedActivities: visibleProgress.completedActivities,
    quizScores: visibleProgress.quizScores,
    lastVisitedSlug: visibleProgress.lastVisitedSlug,
    isLoaded,
    toggleLesson,
    toggleActivity,
    recordQuizScore,
    setLastVisitedSlug,
  }
}
