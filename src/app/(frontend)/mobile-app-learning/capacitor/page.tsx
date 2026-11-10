import type { Metadata } from 'next'
import { CapacitorLearningDashboard } from '@/components/CapacitorLearning'

export default function CapacitorLearningPage() {
  return <CapacitorLearningDashboard />
}

export const metadata: Metadata = {
  title: 'Capacitor Learning Center | Mobile App Development',
  description:
    'Learn Ionic Capacitor step by step: set up Android, use native plugins, connect REST APIs, build an APK, and create an IoT mobile app.',
}
