import type { Metadata } from 'next'
import { MqttPage } from '@/components/IoTPages/MqttPage'

export default function MqttTechnologyPage() {
  return <MqttPage />
}

export const metadata: Metadata = {
  title: 'MQTT Setup and Project Guide | Expo Go IoT',
  description:
    'Understand how MQTT connects the ESP32 to Mosquitto and the Raspberry Pi FastAPI backend. Learn setup, secure configuration, testing, and troubleshooting.',
}
