import type { Metadata } from 'next'
import { CourseHub } from '@/components/ESP32Learning/CourseHub'
import { LearningLayout } from '@/components/ESP32Learning/LearningLayout'

export default function Esp32LearningPage() {
  return (
    <LearningLayout>
      <CourseHub />
    </LearningLayout>
  )
}

export const metadata: Metadata = {
  title: 'ESP32 Learning Center & IoT LMS | Complete Hardware to Cloud Course',
  description:
    'Comprehensive interactive course on ESP32 microcontroller setup, dual-bus I2C laser & light sensors, ADC soil moisture, Arduino C++ firmware, Raspberry Pi FastAPI backend, and Expo Go mobile visualization.',
}
