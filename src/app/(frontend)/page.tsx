import type { Metadata } from 'next'
import { SimplifiedLandingPage } from '@/components/IoTLandingPage/SimplifiedLandingPage'

export default function HomePage() {
  return <SimplifiedLandingPage />
}

export const metadata: Metadata = {
  title: 'Expo Go IoT Monitoring | ESP32 & Raspberry Pi',
  description:
    'Learn how sensors, ESP32, Raspberry Pi, a Python API, and an Expo Go mobile app work together to monitor live IoT data.',
}
