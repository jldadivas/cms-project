import type { Metadata } from 'next'
import { MobileAppLearningHub } from '@/components/MobileAppLearning'

export default function MobileAppLearningPage() {
  return <MobileAppLearningHub />
}

export const metadata: Metadata = {
  title: 'Mobile App Development Learning Center | Flutter, Ionic & IoT',
  description:
    'Learn Flutter, Dart, Ionic, Capacitor, Android Studio, and VS Code, then build mobile apps connected to ESP32 sensors and Raspberry Pi FastAPI.',
}
