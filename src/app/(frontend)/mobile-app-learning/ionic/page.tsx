import type { Metadata } from 'next'
import { IonicLearningDashboard } from '@/components/IonicLearning'

export default function IonicLearningPage() {
  return <IonicLearningDashboard />
}

export const metadata: Metadata = {
  title: 'Ionic Framework Learning Center | Mobile App Development',
  description:
    'Learn Ionic React and Angular, web components, TypeScript, REST APIs, Capacitor native plugins, Android builds, and IoT dashboards.',
}
