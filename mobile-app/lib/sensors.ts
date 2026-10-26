import { useEffect, useState } from 'react'

export type SensorReading = {
  id?: number
  timestamp?: string
  tof_distance_mm?: number | null
  light_lux?: number | null
  soil_raw?: number | null
  soil_moisture_percent?: number | null
  rssi?: number | null
  [key: string]: unknown
}

export type SensorSettings = {
  baseUrl: string
  port: number
  interval: number
  tofMin: number
  tofMax: number
  lightLow: number
  lightHigh: number
  soilDry: number
  soilWet: number
  soilTargetMin: number
  soilTargetMax: number
}

const defaultEnvUrl = process.env.EXPO_PUBLIC_API_BASE_URL?.trim().replace(/\/+$/, '') || ''
const initialHost = defaultEnvUrl.replace(/:\d+$/, '') || 'http://192.168.1.100'
const initialPort = defaultEnvUrl.match(/:(\d+)$/) ? parseInt(defaultEnvUrl.match(/:(\d+)$/)![1], 10) : 8080

let currentSettings: SensorSettings = {
  baseUrl: initialHost,
  port: initialPort,
  interval: 5,
  tofMin: 20,
  tofMax: 2000,
  lightLow: 100,
  lightHigh: 1000,
  soilDry: 30,
  soilWet: 70,
  soilTargetMin: 40,
  soilTargetMax: 65,
}

let currentReading: SensorReading | null = null
let currentRecords: SensorReading[] = []
let isConnected = false
let isLoading = false
let currentError: string | null = null
let currentUpdatedAt: string | null = null

type Listener = () => void
const listeners = new Set<Listener>()

function notify() {
  for (const listener of listeners) {
    listener()
  }
}

export function updateSettings(newSettings: Partial<SensorSettings>) {
  currentSettings = { ...currentSettings, ...newSettings }
  notify()
}

function getApiEndpoint(path: string): string {
  const base = currentSettings.baseUrl.trim().replace(/\/+$/, '')
  // If baseUrl already includes port, don't duplicate
  if (base.replace(/^https?:\/\//, '').includes(':')) {
    return `${base}${path}`
  }
  return `${base}:${currentSettings.port}${path}`
}

export async function fetchCurrent(): Promise<void> {
  if (isLoading) return
  isLoading = true
  notify()

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 6000)

  try {
    const primaryUrl = getApiEndpoint('/api/readings/current')
    let res = await fetch(primaryUrl, { signal: controller.signal }).catch(() => null)
    
    // Fallback to /api/readings/latest if needed
    if (!res || !res.ok) {
      const fallbackUrl = getApiEndpoint('/api/readings/latest')
      res = await fetch(fallbackUrl, { signal: controller.signal })
    }

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`)
    }

    const json = await res.json()
    const r: SensorReading | null = json && typeof json === 'object' && 'reading' in json ? json.reading : json

    if (r) {
      currentReading = r
      isConnected = true
      currentUpdatedAt = r.timestamp || new Date().toISOString()
      currentError = null
    }

    // Also attempt fetching history
    try {
      const historyRes = await fetch(getApiEndpoint('/api/readings?limit=20'), {
        signal: controller.signal,
      })
      if (historyRes.ok) {
        const historyJson = await historyRes.json()
        if (historyJson && Array.isArray(historyJson.readings)) {
          currentRecords = historyJson.readings
        }
      }
    } catch {
      // History failure is non-blocking
    }
  } catch (err) {
    isConnected = false
    currentError = err instanceof Error ? err.message : 'Unable to connect to sensor API'
  } finally {
    clearTimeout(timer)
    isLoading = false
    notify()
  }
}

export function useSensors() {
  const [, setTick] = useState(0)

  useEffect(() => {
    const onChange = () => setTick((t) => t + 1)
    listeners.add(onChange)
    return () => {
      listeners.delete(onChange)
    }
  }, [])

  return {
    reading: currentReading,
    records: currentRecords,
    connected: isConnected,
    loading: isLoading,
    error: currentError,
    updatedAt: currentUpdatedAt,
    settings: currentSettings,
  }
}
