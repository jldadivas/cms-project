import type { Metadata } from 'next'
import { Esp32Page } from '@/components/IoTPages'

export default Esp32Page

export const metadata: Metadata = {
  title: 'About ESP32 | Expo Go IoT Monitoring',
  description:
    'Learn all about the ESP32 microcontroller, its dual-core architecture, dual TwoWire I2C buses, ADC1 calibration, and MQTT pipeline.',
}
