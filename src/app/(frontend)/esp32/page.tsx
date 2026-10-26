import type { Metadata } from 'next'
import { Esp32Page } from '@/components/IoTPages'

export default Esp32Page

export const metadata: Metadata = {
  title: 'ESP32 | Expo Go IoT Monitoring',
  description: 'Learn how the ESP32 reads sensors and sends JSON readings to a Raspberry Pi.',
}
