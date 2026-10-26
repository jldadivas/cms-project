import type { Metadata } from 'next'
import { IoTArchitecture } from '@/components/IoTArchitecture'

export default function ArchitecturePage() {
  return <IoTArchitecture />
}

export const metadata: Metadata = {
  title: 'System Architecture | Expo Go IoT Monitoring',
  description:
    'Explore the interactive sensor, ESP32, Raspberry Pi, API, and Expo Go architecture.',
}
