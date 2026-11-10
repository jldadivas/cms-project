import type { Metadata } from 'next'
import { FlutterLearningDashboard } from '@/components/FlutterLearning'

export default function FlutterLearningPage() {
  return <FlutterLearningDashboard />
}

export const metadata: Metadata = {
  title: 'Flutter and Dart Learning Center | Mobile App Development',
  description:
    'Learn Dart and Flutter from installation and widgets to REST APIs, persistence, native device features, Android builds, and IoT sensor apps.',
}
