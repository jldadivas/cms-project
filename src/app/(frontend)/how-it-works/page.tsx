import type { Metadata } from 'next'
import { HowItWorksPage } from '@/components/IoTPages'

export default HowItWorksPage

export const metadata: Metadata = {
  title: 'How It Works | Expo Go IoT Monitoring',
  description: 'Follow sensor readings from ESP32 through a Raspberry Pi API to an Expo Go app.',
}
