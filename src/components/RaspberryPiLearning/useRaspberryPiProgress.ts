'use client'

import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'raspberry_pi_lms_progress_v1'

interface RaspberryPiProgress {
  completedModules: string[]
}

const EMPTY_PROGRESS: RaspberryPiProgress = {
  completedModules: [],
}

export function useRaspberryPiProgress() {
  const [progress, setProgress] = useState<RaspberryPiProgress>(EMPTY_PROGRESS)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed: unknown = JSON.parse(saved)
        if (
          typeof parsed === 'object' &&
          parsed !== null &&
          'completedModules' in parsed &&
          Array.isArray(parsed.completedModules)
        ) {
          setProgress({
            completedModules: parsed.completedModules.filter(
              (slug): slug is string => typeof slug === 'string',
            ),
          })
        }
      }
    } catch (error) {
      console.warn('Failed to read Raspberry Pi course progress:', error)
    } finally {
      setIsLoaded(true)
    }
  }, [])

  const updateProgress = useCallback((update: (current: RaspberryPiProgress) => RaspberryPiProgress) => {
    setProgress((current) => {
      const next = update(current)
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      } catch (error) {
        console.warn('Failed to save Raspberry Pi course progress:', error)
      }
      return next
    })
  }, [])

  const markModuleComplete = useCallback((moduleSlug: string) => {
    updateProgress((current) => ({
      ...current,
      completedModules: current.completedModules.includes(moduleSlug)
        ? current.completedModules
        : [...current.completedModules, moduleSlug],
    }))
  }, [updateProgress])

  return { progress, isLoaded, markModuleComplete }
}
