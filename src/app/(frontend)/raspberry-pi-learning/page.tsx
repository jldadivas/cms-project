import type { Metadata } from 'next'
import { RaspberryPiCourseHub } from '@/components/RaspberryPiLearning/CourseHub'

export default function RaspberryPiLearningPage() {
  return <RaspberryPiCourseHub />
}

export const metadata: Metadata = {
  title: 'Raspberry Pi Learning Center | Complete IoT Course',
  description:
    'Learn Python, MQTT, FastAPI, SQLite, REST APIs, and Expo Go by building a complete ESP32 Raspberry Pi sensor system.',
}
