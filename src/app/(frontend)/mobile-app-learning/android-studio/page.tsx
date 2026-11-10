import type { Metadata } from 'next'
import { AndroidStudioLearningDashboard } from '@/components/AndroidStudioLearning'

export default function AndroidStudioLearningPage() {
  return <AndroidStudioLearningDashboard />
}

export const metadata: Metadata = {
  title: 'Android Studio Learning Center | Mobile App Development',
  description:
    'Learn native Android development with Android Studio, Kotlin, Java, Jetpack Compose, REST APIs, Room, device hardware, and Android releases.',
}
