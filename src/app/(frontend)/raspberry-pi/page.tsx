import type { Metadata } from 'next'
import { RaspberryPiPage } from '@/components/IoTPages'

export default RaspberryPiPage

export const metadata: Metadata = {
  title: 'Raspberry Pi Backend | Expo Go IoT Monitoring',
  description: 'Build a Raspberry Pi FastAPI backend for receiving and serving sensor readings.',
}
