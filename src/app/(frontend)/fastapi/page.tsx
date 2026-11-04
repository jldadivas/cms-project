import type { Metadata } from 'next'
import { FastApiPage } from '@/components/IoTPages'

export default FastApiPage

export const metadata: Metadata = {
  title: 'FastAPI Backend | Expo Go IoT Monitoring',
  description:
    'Learn how the FastAPI MQTT-to-HTTP bridge on the Raspberry Pi connects sensor data from the ESP32 to the Expo Go mobile app via REST endpoints.',
}

