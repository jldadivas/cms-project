import type { Metadata } from 'next'
import { VSCodeLearningDashboard } from '@/components/VSCodeLearning'

export default function VSCodeLearningPage() {
  return <VSCodeLearningDashboard />
}

export const metadata: Metadata = {
  title: 'VS Code Learning Center | Mobile App Development',
  description:
    'Learn VS Code from editor basics to web, Python, mobile, Git, ESP32, Raspberry Pi, debugging, and complete IoT development workflows.',
}
