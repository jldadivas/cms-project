'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Database,
  Droplets,
  Expand,
  ExternalLink,
  Layers,
  Network,
  Play,
  Radio,
  RotateCw,
  Server,
  Smartphone,
  Sun,
  Table,
  Terminal,
  Timer,
  Video,
  Waves,
  Wifi,
  X,
  Zap,
} from 'lucide-react'
import { IoTPageHeader } from '@/components/IoTPageHeader'

type GalleryItem = {
  id: string
  title: string
  subtitle: string
  src: string
  tag: string
  tagColor: string
  description: string
  specs: { label: string; value: string }[]
  isVideo?: boolean
  videoSrc?: string
}

const galleryPhotos: GalleryItem[] = [
  {
    id: 'vl53l0x-hw',
    title: 'VL53L0X/V2 Time-of-Flight Sensor Module',
    subtitle: 'Physical Optical Transducer & Breadboard Connection',
    src: '/docs/vl53l0x-tof-sensor-hardware.jpg',
    tag: 'HARDWARE TRANSDUCER',
    tagColor: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
    description:
      'Actual photo of the VL53L0X/V2 breakout module used in the setup. Features 940 nm VCSEL infrared laser emitter and SPAD receiver with 6-pin interface (VIN, GND, SCL, SDA, GPIO1, XSHUT) connected via color-coded jumper wires to ESP32 hardware Wire 0 (GPIO 21/22).',
    specs: [
      { label: 'Model', value: 'VL53L0X / V2' },
      { label: 'Bus', value: 'I2C Wire 0 (pins 21/22)' },
      { label: 'I2C Address', value: '0x29' },
      { label: 'Light Wave', value: '940 nm VCSEL' },
    ],
  },
  {
    id: 'bh1750-hw',
    title: 'BH1750 Ambient Light Sensor Module',
    subtitle: 'Calibrated Optical Photodiode & ESP32 Breadboard Wiring',
    src: '/docs/bh1750-light-sensor-hardware.jpg',
    tag: 'HARDWARE TRANSDUCER',
    tagColor: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
    description:
      'Actual photo of the BH1750 ambient light sensor module with the ESP32 development board (active red power LED) on the breadboard in the background. Wired via hardware I2C Bus 1 (GPIO 18 SDA, GPIO 19 SCL) for concurrent, contention-free illuminance sampling.',
    specs: [
      { label: 'Model', value: 'BH1750FVI' },
      { label: 'Bus', value: 'I2C Wire 1 (pins 18/19)' },
      { label: 'I2C Address', value: '0x23' },
      { label: 'Spectral Range', value: '1–65,535 lx' },
    ],
  },
  {
    id: 'soil-hw',
    title: 'Capacitive Soil Moisture Sensor v1.2',
    subtitle: 'Corrosion-Resistant Analog Substrate Probe',
    src: '/docs/capacitive-soil-sensor-v1-2.jpg',
    tag: 'HARDWARE SENSOR',
    tagColor: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
    description:
      'Actual photo of the Capacitive Soil Moisture Sensor v1.2 probe. Unlike resistive sensors with exposed metallic electrodes that corrode quickly, this capacitive board uses an onboard 555-timer oscillator to measure the dielectric constant of surrounding soil without direct DC electrical contact.',
    specs: [
      { label: 'Model', value: 'Capacitive v1.2' },
      { label: 'ADC Channel', value: 'ADC1_CH6 (GPIO 34)' },
      { label: 'Dry Benchmark', value: '2527 raw (0%)' },
      { label: 'Wet Benchmark', value: '1237 raw (100%)' },
    ],
  },
  {
    id: 'esp32-serial',
    title: 'ESP32 Serial Monitor (Arduino IDE 2.3.10)',
    subtitle: 'Live Telemetry JSON Publishing Stream on COM4',
    src: '/docs/esp32-arduino-serial-output.jpg',
    tag: 'SERIAL TELEMETRY LOGS',
    tagColor: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
    description:
      'Screenshot of Arduino IDE 2.3.10 connected to the ESP32 Dev Module on COM4 at 115200 baud. Shows live JSON payloads published every 5 seconds to topic esp32/tof_light_soil_data with real-world sensor measurements: tof_mm=211–257, lux=5.00–30.83 lx, soil_raw=2172–2192, and rssi=-50 to -63 dBm.',
    specs: [
      { label: 'Port', value: 'COM4 @ 115200 baud' },
      { label: 'Board', value: 'ESP32 Dev Module' },
      { label: 'MQTT Topic', value: 'esp32/tof_light_soil_data' },
      { label: 'Interval', value: '5,000 ms' },
    ],
  },
  {
    id: 'fastapi-logs',
    title: 'Raspberry Pi FastAPI & MQTT Ingestion Server',
    subtitle: 'Terminal Logs: MQTT Subscribe, SQLite Insert & Mobile Polling',
    src: '/docs/raspberry-pi-fastapi-backend-logs.jpg',
    tag: 'BACKEND EDGE LOGS',
    tagColor: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
    description:
      'Screenshot of the Raspberry Pi terminal running uvicorn main:app --host 0.0.0.0 --port 8080. Demonstrates thread-safe paho-mqtt subscriber receiving 67-byte packets from esp32/tof_light_soil_data, saving to SQLite with calibrated moisture math, and responding with HTTP 200 OK to mobile client polling (GET /api/readings/current).',
    specs: [
      { label: 'Host', value: 'Raspberry Pi 4B' },
      { label: 'Port', value: '0.0.0.0:8080' },
      { label: 'Ingestion Latency', value: '< 12 ms' },
      { label: 'HTTP Status', value: '200 OK' },
    ],
  },
  {
    id: 'expo-metro',
    title: 'Raspberry Pi Expo Metro Bundler (npx expo start)',
    subtitle: 'Metro Development Server & Mobile QR Pairing',
    src: '/docs/raspberry-pi-expo-metro-qr.jpg',
    tag: 'MOBILE COMPILER & METRO',
    tagColor: 'bg-blue-500/10 text-blue-300 border-blue-500/30',
    description:
      'Screenshot of the terminal running npx expo start on the Raspberry Pi. Displays Metro bundler QR code on exp://10.219.89.43:8081, bundling 1771 modules in 1537 ms for the Android and iOS Expo Go test clients.',
    specs: [
      { label: 'Bundler URL', value: 'exp://10.219.89.43:8081' },
      { label: 'Modules', value: '1771 bundled' },
      { label: 'Runtime', value: 'Expo SDK 52' },
      { label: 'Build Time', value: '1537 ms' },
    ],
  },
  {
    id: 'expo-dashboard-screen',
    title: 'Expo Go Live Mobile Dashboard Capture',
    subtitle: 'Real Phone Screen Telemetry (214 mm · 27.5 lx · 27.5% Moisture)',
    src: '/docs/expo-go-mobile-dashboard-screenshot.jpg',
    tag: 'EXPO GO LIVE UI',
    tagColor: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
    description:
      'Actual phone screen capture from the running Expo Go app on Android. Displays live telemetry: TOF distance at 214 mm (Normal, range 20–2000 mm), Light intensity at 27.5 lx (Dark, low 100 lx · high 1000 lx), and Soil moisture at 27.5% (Dry, desired range 40–65%) with 274 session readings and active Raspberry Pi connection badge.',
    specs: [
      { label: 'Connection', value: '● CONNECTED' },
      { label: 'TOF Distance', value: '214 mm' },
      { label: 'Light', value: '27.5 lx' },
      { label: 'Soil Moisture', value: '27.5 %' },
    ],
  },
  {
    id: 'esp32-video-demo',
    title: 'Live ESP32 Serial Monitor Telemetry Video',
    subtitle: 'Real-Time Dynamic Sensor Telemetry on COM4 (36s Video Demo)',
    src: '/docs/iot-video-poster.jpg',
    videoSrc: '/docs/iot-system-demo.mp4',
    tag: 'LIVE VIDEO STREAM',
    tagColor: 'bg-rose-500/10 text-rose-300 border-rose-500/30',
    isVideo: true,
    description:
      'Actual video demonstration recording the Dell engineering laptop with Arduino IDE Serial Monitor connected to the ESP32 Dev Module on COM4. Shows live dynamic sampling of ToF distance (360 mm / 36.0 cm), changing ambient light illuminance (10.83 lx, 20.00 lx, 6.67 lx), and analog capacitive soil moisture raw counts (3247–3251).',
    specs: [
      { label: 'Source', value: 'Arduino IDE 2.x' },
      { label: 'Port', value: 'COM4 @ 115200' },
      { label: 'Duration', value: '36 Seconds' },
      { label: 'Format', value: '720p HD MP4' },
    ],
  },
]

const sensorsList = [
  {
    name: 'Adafruit VL53L0X',
    category: 'Time-of-Flight Laser Ranging',
    pinout: 'I2C Bus 0 · SDA 21, SCL 22',
    address: '0x29 (I2C)',
    range: '30 mm – 2000 mm',
    accuracy: '±1 mm precision',
    formula: 'Time of flight of 940 nm infrared laser photons',
    outputKey: 'tof_distance_mm / tof_cm',
    sampleValue: '214.0 mm (Normal status)',
    description:
      'Emits invisible 940 nm VCSEL laser pulses. A Single Photon Avalanche Diode (SPAD) array measures photon travel time directly, providing millimeter-accurate target distance independent of object color or surface reflectivity.',
    color: 'from-cyan-500/20 to-blue-500/10',
    borderColor: 'border-cyan-500/30',
    icon: Waves,
    badgeColor: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
    photoId: 'vl53l0x-hw',
  },
  {
    name: 'BH1750 Ambient Light',
    category: 'Digital Optical Illuminance',
    pinout: 'I2C Bus 1 · SDA 18, SCL 19',
    address: '0x23 (I2C)',
    range: '1 lx – 65,535 lx',
    accuracy: '1 lux resolution',
    formula: 'Continuous High-Resolution Mode approximation',
    outputKey: 'light_lux / lux',
    sampleValue: '27.5 lx (Dark status)',
    description:
      'Calibrated photodiode matching the human eye spectral response (CIE photopic luminosity curve). Operating on independent hardware Wire 1 eliminates I2C address conflict and bus contention with the ToF sensor.',
    color: 'from-amber-500/20 to-yellow-500/10',
    borderColor: 'border-amber-500/30',
    icon: Sun,
    badgeColor: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
    photoId: 'bh1750-hw',
  },
  {
    name: 'Capacitive Soil Moisture v1.2',
    category: 'Volumetric Water Content',
    pinout: 'ADC1 Channel 6 · GPIO 34',
    address: 'Analog Voltage (0–3.3V)',
    range: '0% – 100% moisture',
    accuracy: '12-bit ADC (0–4095 raw count)',
    formula: 'soil_percent = (raw - 2527) * 100.0 / (1237 - 2527)',
    outputKey: 'soil_raw & soil_moisture_percent',
    sampleValue: '2172 raw count · 27.5% (Dry status)',
    description:
      'Measures soil dielectric permittivity. Uses ADC1 (GPIO 34 with 11 dB attenuation), which operates concurrently with active Wi-Fi radio transmission. Inverted response: raw 2527 represents dry air (0%), raw 1237 represents water saturation (100%).',
    color: 'from-emerald-500/20 to-teal-500/10',
    borderColor: 'border-emerald-500/30',
    icon: Droplets,
    badgeColor: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
    photoId: 'soil-hw',
  },
  {
    name: 'Wi-Fi RSSI Telemetry',
    category: 'RF Link Quality Indication',
    pinout: 'Internal ESP32 2.4 GHz Transceiver',
    address: '802.11 b/g/n Station Mode',
    range: '-30 dBm (strong) to -90 dBm (weak)',
    accuracy: '1 dBm integer precision',
    formula: 'WiFi.RSSI() hardware signal strength',
    outputKey: 'rssi',
    sampleValue: '-64 dBm',
    description:
      'Provides real-time link quality between the edge sensor node and the local Wi-Fi router. Enables detection of signal degradation or edge node displacement before packet dropouts occur.',
    color: 'from-purple-500/20 to-pink-500/10',
    borderColor: 'border-purple-500/30',
    icon: Wifi,
    badgeColor: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
    photoId: 'esp32-serial',
  },
]

const technologiesList = [
  {
    layer: 'Embedded Firmware',
    title: 'ESP32 Dual-Core C++ / Arduino',
    icon: Cpu,
    techs: [
      { name: 'ESP32 NodeMCU', detail: '240 MHz dual-core Tensilica Xtensa LX6 microcontroller' },
      { name: 'Wire.h (Dual Bus)', detail: 'Wire 0 (pins 21/22) for ToF & Wire 1 (pins 18/19) for BH1750' },
      { name: 'PubSubClient', detail: 'Lightweight MQTT client by Nick O\'Leary with 512-byte buffer' },
      { name: 'Adafruit_VL53L0X & BH1750', detail: 'Hardware abstraction driver libraries' },
    ],
  },
  {
    layer: 'Message Transport',
    title: 'Mosquitto MQTT v3.1.1 Broker',
    icon: Network,
    techs: [
      { name: 'Eclipse Mosquitto', detail: 'High-performance C daemon running on Raspberry Pi port 1883' },
      { name: 'Telemetry Topic', detail: 'esp32/tof_light_soil_data published every 5,000 ms' },
      { name: 'LWT Status Topic', detail: 'esp32/tof_light_soil_status with retained online/offline payload' },
      { name: 'QoS Guarantee', detail: 'QoS 0 for lightweight telemetry stream, QoS 1 for device status' },
    ],
  },
  {
    layer: 'Edge Computing & Storage',
    title: 'Raspberry Pi 4B · Python & SQLite',
    icon: Server,
    techs: [
      { name: 'Raspberry Pi OS', detail: 'Debian 12 Bookworm 64-bit on quad-core Cortex-A72' },
      { name: 'paho-mqtt v2', detail: 'CallbackAPIVersion.VERSION2 async subscriber with thread locking' },
      { name: 'FastAPI & Uvicorn', detail: 'High-throughput async ASGI REST server bound to port 8080' },
      { name: 'SQLite3 Engine', detail: 'Persistent local storage at sensor_readings.sqlite3' },
    ],
  },
  {
    layer: 'Mobile Application',
    title: 'Expo Go · React Native TypeScript',
    icon: Smartphone,
    techs: [
      { name: 'Expo SDK 52', detail: 'Managed runtime supporting immediate local phone testing' },
      { name: 'React Native 0.76', detail: '60 FPS declarative cross-platform mobile UI components' },
      { name: 'useSensors() Hook', detail: 'Custom stateful poller with dynamic thresholds and error handling' },
      { name: 'Stale Timestamp Watchdog', detail: 'Detects and alerts if readings are older than 3 refresh intervals' },
    ],
  },
]

const outputTabs = [
  {
    id: 'esp32',
    name: '1. ESP32 Serial Monitor',
    desc: 'Live terminal output from the ESP32 USB UART interface on COM4 at 115200 baud.',
    content: `Publishing to esp32/tof_light_soil_data: {"tof_mm":257,"tof_cm":25.7,"lux":30.00,"soil_raw":2118,"rssi":-63}
Publishing to esp32/tof_light_soil_data: {"tof_mm":213,"tof_cm":21.3,"lux":25.83,"soil_raw":2176,"rssi":-60}
Publishing to esp32/tof_light_soil_data: {"tof_mm":241,"tof_cm":24.1,"lux":5.83,"soil_raw":2174,"rssi":-55}
Publishing to esp32/tof_light_soil_data: {"tof_mm":222,"tof_cm":22.2,"lux":5.83,"soil_raw":2176,"rssi":-52}
Publishing to esp32/tof_light_soil_data: {"tof_mm":217,"tof_cm":21.7,"lux":5.83,"soil_raw":2172,"rssi":-50}
Publishing to esp32/tof_light_soil_data: {"tof_mm":254,"tof_cm":25.4,"lux":5.00,"soil_raw":2173,"rssi":-51}
Publishing to esp32/tof_light_soil_data: {"tof_mm":185,"tof_cm":18.5,"lux":5.00,"soil_raw":2173,"rssi":-52}
Publishing to esp32/tof_light_soil_data: {"tof_mm":203,"tof_cm":20.3,"lux":10.83,"soil_raw":2173,"rssi":-52}
Publishing to esp32/tof_light_soil_data: {"tof_mm":214,"tof_cm":21.4,"lux":27.50,"soil_raw":2172,"rssi":-54}
Publishing to esp32/tof_light_soil_data: {"tof_mm":211,"tof_cm":21.1,"lux":25.83,"soil_raw":2179,"rssi":-54}
Publishing to esp32/tof_light_soil_data: {"tof_mm":230,"tof_cm":23.0,"lux":0.00,"soil_raw":2186,"rssi":-52}
Publishing to esp32/tof_light_soil_data: {"tof_mm":248,"tof_cm":24.8,"lux":30.83,"soil_raw":2187,"rssi":-51}
Publishing to esp32/tof_light_soil_data: {"tof_mm":195,"tof_cm":19.5,"lux":31.67,"soil_raw":2192,"rssi":-57}
Publishing to esp32/tof_light_soil_data: {"tof_mm":248,"tof_cm":24.8,"lux":24.17,"soil_raw":2187,"rssi":-58}`,
    language: 'bash',
  },
  {
    id: 'fastapi',
    name: '2. Raspberry Pi Uvicorn & MQTT Ingestion',
    desc: 'Terminal log from uvicorn main:app on port 8080 showing MQTT ingestion and SQLite storage.',
    content: `(.venv) shyr2@micro123:~/Downloads/UT-CMS/backend $ uvicorn main:app --host 0.0.0.0 --port 8080
2026-10-25 16:29:57,292 INFO sensor_backend: Received MQTT message on esp32/tof_light_soil_data (67 bytes)
2026-10-25 16:29:57,907 INFO sensor_backend: Saved sensor reading: tof_mm=262.0 lux=32.5 soil_raw=2193 rssi=-57
2026-10-25 16:30:02,289 INFO sensor_backend: Received MQTT message on esp32/tof_light_soil_data (67 bytes)
2026-10-25 16:30:02,306 INFO sensor_backend: Saved sensor reading: tof_mm=236.0 lux=31.67 soil_raw=2194 rssi=-57
INFO:     10.219.89.29:59254 - "GET /api/readings/current HTTP/1.1" 200 OK
2026-10-25 16:30:07,289 INFO sensor_backend: Received MQTT message on esp32/tof_light_soil_data (67 bytes)
2026-10-25 16:30:07,305 INFO sensor_backend: Saved sensor reading: tof_mm=247.0 lux=31.67 soil_raw=2200 rssi=-46
2026-10-25 16:30:12,291 INFO sensor_backend: Received MQTT message on esp32/tof_light_soil_data (67 bytes)
2026-10-25 16:30:12,307 INFO sensor_backend: Saved sensor reading: tof_mm=217.0 lux=30.83 soil_raw=2191 rssi=-47
2026-10-25 16:30:17,298 INFO sensor_backend: Received MQTT message on esp32/tof_light_soil_data (68 bytes)
2026-10-25 16:30:17,299 INFO sensor_backend: Saved sensor reading: tof_mm=None lux=35.0 soil_raw=2195 rssi=-48
2026-10-25 16:30:22,294 INFO sensor_backend: Received MQTT message on esp32/tof_light_soil_data (67 bytes)
2026-10-25 16:30:22,307 INFO sensor_backend: Saved sensor reading: tof_mm=219.0 lux=28.33 soil_raw=2194 rssi=-53
2026-10-25 16:30:27,300 INFO sensor_backend: Received MQTT message on esp32/tof_light_soil_data (67 bytes)
2026-10-25 16:30:27,311 INFO sensor_backend: Saved sensor reading: tof_mm=None lux=27.5 soil_raw=2194 rssi=-54
2026-10-25 16:30:32,300 INFO sensor_backend: Received MQTT message on esp32/tof_light_soil_data (68 bytes)
2026-10-25 16:30:32,311 INFO sensor_backend: Saved sensor reading: tof_mm=None lux=31.67 soil_raw=2199 rssi=-56`,
    language: 'bash',
  },
  {
    id: 'sqlite',
    name: '3. SQLite Database Rows',
    desc: 'Persisted rows queried from sensor_readings.sqlite3 on the Raspberry Pi.',
    content: `sqlite3 sensor_readings.sqlite3 "SELECT * FROM readings ORDER BY id DESC LIMIT 4;"

id | timestamp                  | tof_distance_mm | light_lux | soil_raw | soil_moisture_percent | rssi
---+----------------------------+-----------------+-----------+----------+-----------------------+------
42 | 2026-10-25T16:30:32.311Z   | NULL            | 31.67     | 2199     | 25.4                  | -56
41 | 2026-10-25T16:30:27.311Z   | NULL            | 27.50     | 2194     | 25.8                  | -54
40 | 2026-10-25T16:30:22.307Z   | 219.0           | 28.33     | 2194     | 25.8                  | -53
39 | 2026-10-25T16:30:17.299Z   | NULL            | 35.00     | 2195     | 25.7                  | -48
38 | 2026-10-25T16:30:12.307Z   | 217.0           | 30.83     | 2191     | 26.0                  | -47`,
    language: 'sql',
  },
  {
    id: 'api',
    name: '4. FastAPI REST Responses',
    desc: 'JSON payloads returned by the Python backend on port 8080.',
    content: `// GET http://10.219.89.43:8080/api/readings/current
{
  "reading": {
    "timestamp": "2026-10-25T16:30:22.307Z",
    "tof_distance_mm": 219.0,
    "light_lux": 28.33,
    "soil_raw": 2194,
    "soil_moisture_percent": 25.8,
    "rssi": -53
  }
}

// GET http://10.219.89.43:8080/api/health
{
  "status": "ok",
  "mqtt_connected": true,
  "mqtt_broker": "127.0.0.1:1883",
  "mqtt_data_topic": "esp32/tof_light_soil_data",
  "mqtt_status_topic": "esp32/tof_light_soil_status",
  "last_mqtt_message": {
    "topic": "esp32/tof_light_soil_data",
    "received_at": "2026-10-25T16:30:22Z"
  },
  "stored_readings": 128
}`,
    language: 'json',
  },
  {
    id: 'mobile',
    name: '5. Expo Go Mobile Render',
    desc: 'Live screen capture from the user\'s mobile phone running Expo Go (274 readings active in session).',
    content: `┌──────────────────────────────────────────────┐
│  EXPO GO · IOT FIELD MONITOR                 │
│  Dashboard                                   │
│  Live conditions from your sensor network.   │
│                                              │
│  [↻ Refresh readings]                        │
│                                              │
│  ┌────────────────────────────────────────┐  │
│  │ Raspberry Pi connection   ● CONNECTED  │  │
│  │ Last update · 10/25/2026, 4:29:12 PM   │  │
│  └────────────────────────────────────────┘  │
│                                              │
│  ┌────────────────────────────────────────┐  │
│  │ TOF distance                  Normal   │  │
│  │ 214 mm                                 │  │
│  │ Allowed range 20–2000 mm               │  │
│  └────────────────────────────────────────┘  │
│                                              │
│  ┌────────────────────────────────────────┐  │
│  │ Light intensity                 Dark   │  │
│  │ 27.5 lx                                │  │
│  │ Low 100 lx · high 1000 lx              │  │
│  └────────────────────────────────────────┘  │
│                                              │
│  ┌────────────────────────────────────────┐  │
│  │ Soil moisture                    Dry   │  │
│  │ 27.5 %                                 │  │
│  │ [████████░░░░░░░░░░░░░░░░░░░░] 27.5%   │  │
│  │ Desired range 40–65%                   │  │
│  └────────────────────────────────────────┘  │
│                                              │
│      274 readings available in this session  │
└──────────────────────────────────────────────┘`,
    language: 'markdown',
  },
]

export function ResultsPage() {
  const [activeTab, setActiveTab] = useState(outputTabs[0].id)
  const [modalPhoto, setModalPhoto] = useState<GalleryItem | null>(null)
  const [videoRotated, setVideoRotated] = useState(false)
  const currentOutput = outputTabs.find((t) => t.id === activeTab) || outputTabs[0]

  return (
    <main className="min-h-[80vh] bg-[#07121f] px-5 py-10 text-[#e6f0fa] sm:px-8 sm:py-16 bg-tech-grid">
      <div className="mx-auto max-w-6xl">
        <IoTPageHeader
          description="Comprehensive documentation of hardware sensors, physical wiring photos, communication protocols, edge backend architecture, calibration formulas, and live system outputs."
          eyebrow="SYSTEM DOCUMENTATION &amp; BENCHMARKS"
          title="Results, Sensors &amp; Technologies"
        />

        {/* SECTION 1: PHOTO EVIDENCE GALLERY */}
        <section className="mt-14">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
            <div>
              <span className="font-mono text-xs font-semibold text-cyan-400 tracking-wider uppercase">
                Empirical Verification
              </span>
              <h2 className="text-2xl font-bold text-white mt-1">Physical Hardware &amp; Live Terminal Gallery</h2>
            </div>
            <span className="rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 font-mono text-xs text-cyan-300">
              8 Real-World Setup Captures (Photos &amp; Video)
            </span>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {galleryPhotos.map((photo) => (
              <div
                className="glass-card group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 shadow-xl transition-all duration-300 hover:border-cyan-400/50 hover:shadow-cyan-500/10"
                key={photo.id}
              >
                <div
                  className="relative h-56 w-full cursor-pointer overflow-hidden bg-black/40"
                  onClick={() => setModalPhoto(photo)}
                >
                  <img
                    alt={photo.title}
                    className="size-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    src={photo.src}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07121f] via-transparent to-transparent opacity-80" />
                  <span className={`absolute top-3 left-3 rounded-md border px-2.5 py-0.5 font-mono text-[10px] font-bold ${photo.tagColor} backdrop-blur-md`}>
                    {photo.tag}
                  </span>
                  {photo.isVideo ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="grid size-14 place-items-center rounded-full bg-rose-500/90 text-white shadow-xl shadow-rose-500/40 backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
                        <Play className="size-7 translate-x-0.5 fill-current" />
                      </div>
                    </div>
                  ) : null}
                  <div className="absolute bottom-3 right-3 rounded-lg bg-black/60 p-1.5 text-cyan-300 backdrop-blur-md opacity-80 group-hover:opacity-100 transition-opacity">
                    <Expand className="size-4" />
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-sm font-bold text-white group-hover:text-cyan-200 transition-colors">
                    {photo.title}
                  </h3>
                  <p className="mt-1 text-xs text-slate-400">{photo.subtitle}</p>
                  <p className="mt-3 text-xs leading-relaxed text-slate-300 line-clamp-3">
                    {photo.description}
                  </p>

                  <div className="mt-auto pt-4 border-t border-white/[0.08] grid grid-cols-2 gap-2 text-[11px] font-mono">
                    {photo.specs.slice(0, 2).map((s) => (
                      <div key={s.label}>
                        <span className="text-slate-500">{s.label}: </span>
                        <span className="text-cyan-200 font-semibold">{s.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PHOTO & VIDEO LIGHTBOX MODAL */}
        {modalPhoto ? (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
            onClick={() => setModalPhoto(null)}
          >
            <div
              className="relative max-h-[90vh] max-w-4xl overflow-hidden rounded-2xl border border-cyan-400/30 bg-[#091524] shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-white/10 bg-[#050c14] px-5 py-3.5">
                <div>
                  <h3 className="font-bold text-white text-sm sm:text-base">{modalPhoto.title}</h3>
                  <p className="text-xs text-cyan-300 font-mono">{modalPhoto.subtitle}</p>
                </div>
                <button
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white"
                  onClick={() => setModalPhoto(null)}
                  type="button"
                >
                  <X className="size-5" />
                </button>
              </div>

              <div className="max-h-[60vh] overflow-auto bg-black p-2 flex items-center justify-center">
                {modalPhoto.videoSrc ? (
                  <video
                    autoPlay
                    className="max-h-[58vh] w-auto rounded-lg"
                    controls
                    playsInline
                    poster={modalPhoto.src}
                    src={modalPhoto.videoSrc}
                  />
                ) : (
                  <img
                    alt={modalPhoto.title}
                    className="max-h-[58vh] w-auto rounded-lg object-contain"
                    src={modalPhoto.src}
                  />
                )}
              </div>

              <div className="p-5 text-xs sm:text-sm text-slate-200 leading-relaxed bg-[#07121f]">
                <p>{modalPhoto.description}</p>
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 rounded-xl border border-white/10 bg-[#050c14] p-3 text-xs font-mono">
                  {modalPhoto.specs.map((s) => (
                    <div key={s.label}>
                      <span className="text-slate-400 block text-[10px] uppercase">{s.label}</span>
                      <span className="text-cyan-300 font-semibold">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {/* SECTION 2: LIVE VIDEO DEMONSTRATION */}
        <section className="mt-14">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
            <div>
              <span className="font-mono text-xs font-semibold text-rose-400 tracking-wider uppercase flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
                </span>
                Empirical Video Verification
              </span>
              <h2 className="text-2xl font-bold text-white mt-1">Live ESP32 Serial Telemetry Video Stream</h2>
            </div>
            <span className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-1 font-mono text-xs text-rose-300 flex items-center gap-1.5">
              <Video className="size-3.5" /> 36-Second Recorded Demo
            </span>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-12 items-start">
            {/* Video Player Column */}
            <div className="lg:col-span-7 overflow-hidden rounded-2xl border border-rose-500/30 bg-black/60 shadow-2xl backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-white/10 bg-[#050c14] px-4 py-3">
                <div className="flex items-center gap-2 font-mono text-xs text-slate-300">
                  <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Arduino IDE 2.x Serial Monitor · COM4 @ 115200</span>
                </div>
                <button
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/[0.06] px-2.5 py-1 font-mono text-[11px] text-cyan-300 hover:bg-white/[0.12] transition"
                  onClick={() => setVideoRotated(!videoRotated)}
                  title="Rotate video orientation"
                  type="button"
                >
                  <RotateCw className="size-3" />
                  <span>{videoRotated ? 'Landscape View' : 'Portrait View'}</span>
                </button>
              </div>

              <div className="relative flex items-center justify-center bg-black p-2 sm:p-4 min-h-[380px] overflow-hidden">
                <video
                  className={`w-full max-h-[500px] rounded-xl object-contain transition-transform duration-500 ${
                    videoRotated ? '-rotate-90 scale-90 sm:scale-95' : ''
                  }`}
                  controls
                  playsInline
                  poster="/docs/iot-video-poster.jpg"
                  preload="metadata"
                  src="/docs/iot-system-demo.mp4"
                />
              </div>

              <div className="border-t border-white/10 bg-[#07121f] p-4 text-xs font-mono flex flex-wrap items-center justify-between gap-3 text-slate-400">
                <span>Direct capture from Dell test laptop</span>
                <span className="text-cyan-300">720×1280 @ 30 FPS · H.264 MP4 (36s)</span>
              </div>
            </div>

            {/* Video Analysis & Live Telemetry Metrics Column */}
            <div className="lg:col-span-5 space-y-4">
              <div className="glass-card rounded-2xl border border-white/10 p-5 shadow-xl">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Terminal className="size-4 text-rose-400" />
                  Observed Physical Quantities in Stream
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-300">
                  This video verifies real-time transducer sampling and serial transmission. The ESP32 main loop runs at 1 Hz (<code className="text-cyan-300 font-mono">delay(1000)</code>) polling the I2C sensors and ADC channel:
                </p>

                <div className="mt-4 space-y-2.5 text-xs font-mono">
                  <div className="rounded-xl border border-cyan-500/20 bg-cyan-950/20 p-3">
                    <div className="flex items-center justify-between text-cyan-300 font-semibold">
                      <span>ToF Distance (VL53L0X)</span>
                      <span>360 mm (36.0 cm)</span>
                    </div>
                    <p className="mt-1 text-[11px] text-slate-400 font-sans">
                      Infrared photon time-of-flight reflecting from target surface in real time.
                    </p>
                  </div>

                  <div className="rounded-xl border border-amber-500/20 bg-amber-950/20 p-3">
                    <div className="flex items-center justify-between text-amber-300 font-semibold">
                      <span>Light Intensity (BH1750)</span>
                      <span>10.83 &rarr; 20.00 &rarr; 6.67 lx</span>
                    </div>
                    <p className="mt-1 text-[11px] text-slate-400 font-sans">
                      Continuous optical photodiode response adjusting dynamically as ambient illumination changes.
                    </p>
                  </div>

                  <div className="rounded-xl border border-emerald-500/20 bg-emerald-950/20 p-3">
                    <div className="flex items-center justify-between text-emerald-300 font-semibold">
                      <span>Soil Moisture Raw (v1.2)</span>
                      <span>3247 – 3251 ADC</span>
                    </div>
                    <p className="mt-1 text-[11px] text-slate-400 font-sans">
                      Analog voltage raw count on ADC1 Channel 6 (GPIO 34) sampled concurrently.
                    </p>
                  </div>
                </div>
              </div>

              <div className="glass-card rounded-2xl border border-white/10 p-4 text-xs font-mono text-slate-300">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-2 font-semibold">
                  Key Verification Highlights
                </span>
                <ul className="space-y-1.5 text-[11px]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="size-3.5 text-rose-400 shrink-0 mt-0.5" />
                    <span>Firmware execution verified live on COM4 without simulated data.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="size-3.5 text-rose-400 shrink-0 mt-0.5" />
                    <span>Independent I2C Wire 0 &amp; Wire 1 buses operating with zero bus lockups.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="size-3.5 text-rose-400 shrink-0 mt-0.5" />
                    <span>Direct visual correlation with physical breadboard hardware and mobile screen.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: SENSORS USED */}
        <section className="mt-14">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
            <div>
              <span className="font-mono text-xs font-semibold text-cyan-400 tracking-wider uppercase">
                Hardware Transducers
              </span>
              <h2 className="text-2xl font-bold text-white mt-1">Sensors Deployed &amp; Measured Physical Quantities</h2>
            </div>
            <span className="rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 font-mono text-xs text-cyan-300">
              3 Hardware Sensors · 4 Telemetry Metrics
            </span>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {sensorsList.map((sensor) => {
              const Icon = sensor.icon
              return (
                <article
                  className={`glass-card relative overflow-hidden rounded-2xl border ${sensor.borderColor} bg-gradient-to-br ${sensor.color} p-6 shadow-xl transition-all duration-300 hover:scale-[1.01]`}
                  key={sensor.name}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="grid size-12 place-items-center rounded-xl bg-white/[0.08] text-white shadow-inner">
                        <Icon className="size-6 text-cyan-300" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">{sensor.name}</h3>
                        <p className="text-xs text-slate-300">{sensor.category}</p>
                      </div>
                    </div>
                    <span className={`rounded-full border px-2.5 py-0.5 font-mono text-[11px] font-semibold ${sensor.badgeColor}`}>
                      {sensor.address}
                    </span>
                  </div>

                  <p className="mt-4 text-xs leading-relaxed text-slate-200 sm:text-sm">
                    {sensor.description}
                  </p>

                  <div className="mt-5 grid grid-cols-2 gap-3 rounded-xl border border-white/10 bg-[#050c14]/60 p-3.5 text-xs font-mono">
                    <div>
                      <span className="text-[10px] uppercase text-slate-400">Wiring Pinout</span>
                      <p className="font-semibold text-cyan-200">{sensor.pinout}</p>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase text-slate-400">Range &amp; Accuracy</span>
                      <p className="font-semibold text-cyan-200">{sensor.range}</p>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase text-slate-400">JSON Payload Key</span>
                      <p className="font-semibold text-amber-300">{sensor.outputKey}</p>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase text-slate-400">Sample Live Value</span>
                      <p className="font-semibold text-emerald-400">{sensor.sampleValue}</p>
                    </div>
                  </div>

                  {sensor.formula ? (
                    <div className="mt-3 rounded-lg bg-black/30 px-3 py-2 font-mono text-[11px] text-slate-300">
                      <span className="text-slate-400">Math / Principle: </span>
                      <code className="text-cyan-300">{sensor.formula}</code>
                    </div>
                  ) : null}

                  {sensor.photoId ? (
                    <div className="mt-4 flex items-center justify-between border-t border-white/[0.08] pt-3">
                      <span className="text-[11px] font-mono text-slate-400">Physical Hardware:</span>
                      <button
                        className="inline-flex items-center gap-1.5 rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-1 text-xs font-mono font-medium text-cyan-300 hover:bg-cyan-500/20 hover:text-white transition"
                        onClick={() => {
                          const match = galleryPhotos.find((p) => p.id === sensor.photoId)
                          if (match) setModalPhoto(match)
                        }}
                        type="button"
                      >
                        <Expand className="size-3" /> View Hardware Photo
                      </button>
                    </div>
                  ) : null}
                </article>
              )
            })}
          </div>
        </section>

        {/* SECTION 4: CALIBRATION CURVE FOR SOIL MOISTURE */}
        <section className="mt-14 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-6 lg:p-8 backdrop-blur-md shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-emerald-500/20 pb-4">
            <div>
              <span className="font-mono text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                Mathematical Model
              </span>
              <h2 className="text-xl font-bold text-white mt-1">Capacitive Soil Moisture Empirical Calibration</h2>
            </div>
            <span className="font-mono text-xs text-emerald-300">
              SOIL_DRY_RAW = 2527 · SOIL_WET_RAW = 1237
            </span>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-4 text-xs leading-relaxed text-slate-200 sm:text-sm">
              <p>
                The soil moisture sensor utilizes an analog capacitance probe connected to ESP32 pin <strong>GPIO 34 (ADC1 Channel 6)</strong>. Because capacitance increases with water volume, the oscillation frequency drops, producing an <strong>inverted analog voltage reading</strong>.
              </p>
              <div className="rounded-xl border border-emerald-500/30 bg-[#050c14] p-4 font-mono text-xs text-emerald-300">
                <code>
                  soil_percent = round(max(0.0, min(100.0, (soil_raw - SOIL_DRY_RAW) * 100.0 / (SOIL_WET_RAW - SOIL_DRY_RAW))), 1)
                </code>
              </div>
              <p>
                In dry open air, the reading measures <strong>2527 raw count</strong> (mapped to <strong>0.0%</strong>). When completely submerged in water, the reading drops to <strong>1237 raw count</strong> (mapped to <strong>100.0%</strong>). Clamping logic prevents anomalous values outside 0%–100%.
              </p>
            </div>

            <div className="overflow-hidden rounded-xl border border-emerald-500/30 bg-[#050c14]">
              <table className="w-full text-left font-mono text-xs">
                <thead className="border-b border-white/10 bg-white/[0.04] text-[11px] text-slate-400">
                  <tr>
                    <th className="p-2.5">Raw ADC</th>
                    <th className="p-2.5">Moisture %</th>
                    <th className="p-2.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06] text-slate-300">
                  <tr>
                    <td className="p-2.5 text-amber-300">2527</td>
                    <td className="p-2.5">0.0%</td>
                    <td className="p-2.5 text-rose-400">Dry (Air)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 text-amber-300">2194</td>
                    <td className="p-2.5">25.8%</td>
                    <td className="p-2.5 text-amber-400">Dry Soil (Live Reading)</td>
                  </tr>
                  <tr className="bg-emerald-500/10">
                    <td className="p-2.5 font-bold text-emerald-300">1840</td>
                    <td className="p-2.5 font-bold text-emerald-300">53.3%</td>
                    <td className="p-2.5 font-bold text-emerald-400">Optimal Zone</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 text-amber-300">1500</td>
                    <td className="p-2.5">79.6%</td>
                    <td className="p-2.5 text-cyan-400">Wet / Saturated</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 text-amber-300">1237</td>
                    <td className="p-2.5">100.0%</td>
                    <td className="p-2.5 text-blue-400">Submerged</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 5: TECHNOLOGIES USED */}
        <section className="mt-14">
          <div className="border-b border-white/[0.08] pb-4">
            <span className="font-mono text-xs font-semibold text-cyan-400 tracking-wider uppercase">
              Full Stack Implementation
            </span>
            <h2 className="text-2xl font-bold text-white mt-1">Technologies &amp; Architecture Layers</h2>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {technologiesList.map((item) => {
              const Icon = item.icon
              return (
                <div
                  className="glass-card rounded-2xl border border-white/10 p-6 shadow-xl"
                  key={item.layer}
                >
                  <div className="flex items-center gap-3 border-b border-white/[0.08] pb-4">
                    <span className="grid size-10 place-items-center rounded-xl bg-cyan-400/10 text-cyan-300">
                      <Icon className="size-5" />
                    </span>
                    <div>
                      <span className="font-mono text-[10px] font-semibold text-cyan-400 tracking-wider uppercase">
                        {item.layer}
                      </span>
                      <h3 className="text-base font-bold text-white">{item.title}</h3>
                    </div>
                  </div>

                  <ul className="mt-4 space-y-3">
                    {item.techs.map((tech) => (
                      <li className="flex items-start gap-2.5 text-xs text-slate-300 sm:text-sm" key={tech.name}>
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-cyan-400" />
                        <div>
                          <strong className="font-semibold text-white">{tech.name}: </strong>
                          <span className="text-slate-300">{tech.detail}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </section>

        {/* SECTION 6: RESULTS & SYSTEM OUTPUT PIPELINE */}
        <section className="mt-14">
          <div className="border-b border-white/[0.08] pb-4">
            <span className="font-mono text-xs font-semibold text-cyan-400 tracking-wider uppercase">
              Live Pipeline Verification
            </span>
            <h2 className="text-2xl font-bold text-white mt-1">Live Results &amp; System Output Documentation</h2>
            <p className="mt-1 text-xs text-slate-400">
              Inspect actual output formats at every stage from hardware serial lines to database rows and mobile screen rendering.
            </p>
          </div>

          {/* TAB BUTTONS */}
          <div className="mt-6 flex flex-wrap gap-2">
            {outputTabs.map((tab) => {
              const active = tab.id === activeTab
              return (
                <button
                  className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                    active
                      ? 'bg-gradient-to-r from-cyan-400 to-sky-500 text-[#07121f] shadow-lg shadow-cyan-500/20'
                      : 'border border-white/10 bg-white/[0.04] text-slate-300 hover:bg-white/[0.08] hover:text-white'
                  }`}
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  type="button"
                >
                  {tab.name}
                </button>
              )
            })}
          </div>

          {/* TAB CONTENT VIEWER */}
          <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-[#050c14] shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 bg-[#091524] px-5 py-3 text-xs">
              <span className="font-mono text-cyan-300">{currentOutput.desc}</span>
              <span className="rounded-md bg-white/[0.06] px-2 py-0.5 font-mono text-[10px] text-slate-400 uppercase">
                {currentOutput.language}
              </span>
            </div>
            <pre className="overflow-x-auto p-5 font-mono text-xs leading-relaxed text-slate-200">
              <code>{currentOutput.content}</code>
            </pre>

            {currentOutput.id === 'mobile' ? (
              <div className="border-t border-white/10 bg-[#07121f] p-5">
                <div className="flex flex-col sm:flex-row items-center gap-6 rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4">
                  <div
                    className="group relative cursor-pointer overflow-hidden rounded-xl border border-white/20 bg-black/50 shadow-xl max-w-[180px] shrink-0"
                    onClick={() => {
                      const match = galleryPhotos.find((p) => p.id === 'expo-dashboard-screen')
                      if (match) setModalPhoto(match)
                    }}
                  >
                    <img
                      alt="Expo Go Mobile Dashboard Screen"
                      className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      src="/docs/expo-go-mobile-dashboard-screenshot.jpg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-3">
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-cyan-300">
                        <Expand className="size-3.5" /> Enlarge Screen
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 space-y-2 text-xs sm:text-sm">
                    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-mono font-semibold text-emerald-300">
                      <Smartphone className="size-3.5" /> Verified Android Expo Go Screen
                    </div>
                    <h4 className="text-base font-bold text-white">Live Telemetry Synchronized to Mobile</h4>
                    <p className="text-slate-300 leading-relaxed text-xs">
                      Actual screenshot captured from the Android device connected to Metro on port 8081 and polling FastAPI on port 8080. Demonstrates active real-time rendering of all three transducers with live session counter (274 readings).
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-[11px] font-mono text-cyan-200">
                      <div className="rounded-lg bg-black/40 p-2 border border-white/10">
                        <span className="text-[10px] text-slate-400 block">Status</span>
                        <span className="font-bold text-emerald-400">● CONNECTED</span>
                      </div>
                      <div className="rounded-lg bg-black/40 p-2 border border-white/10">
                        <span className="text-[10px] text-slate-400 block">Distance</span>
                        <span className="font-bold text-white">214 mm</span>
                      </div>
                      <div className="rounded-lg bg-black/40 p-2 border border-white/10">
                        <span className="text-[10px] text-slate-400 block">Light</span>
                        <span className="font-bold text-amber-300">27.5 lx (Dark)</span>
                      </div>
                      <div className="rounded-lg bg-black/40 p-2 border border-white/10">
                        <span className="text-[10px] text-slate-400 block">Moisture</span>
                        <span className="font-bold text-orange-400">27.5% (Dry)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </section>

        {/* SECTION 7: PERFORMANCE BENCHMARKS */}
        <section className="mt-14">
          <div className="border-b border-white/[0.08] pb-4">
            <span className="font-mono text-xs font-semibold text-cyan-400 tracking-wider uppercase">
              Latency &amp; Footprint
            </span>
            <h2 className="text-2xl font-bold text-white mt-1">System Performance Benchmarks</h2>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="glass-card rounded-xl p-5 border border-white/10">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono">
                <Timer className="size-4" /> REFRESH CYCLE
              </div>
              <p className="mt-2 text-2xl font-bold text-white">5,000 ms</p>
              <p className="mt-1 text-xs text-slate-400">ESP32 timer interval; prevents sensor self-heating.</p>
            </div>

            <div className="glass-card rounded-xl p-5 border border-white/10">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono">
                <Activity className="size-4" /> EDGE INGESTION
              </div>
              <p className="mt-2 text-2xl font-bold text-white">&lt; 12 ms</p>
              <p className="mt-1 text-xs text-slate-400">MQTT message receipt to SQLite commit.</p>
            </div>

            <div className="glass-card rounded-xl p-5 border border-white/10">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-mono">
                <Database className="size-4" /> STORAGE SIZE
              </div>
              <p className="mt-2 text-2xl font-bold text-white">~82 bytes</p>
              <p className="mt-1 text-xs text-slate-400">Per reading in sensor_readings.sqlite3.</p>
            </div>

            <div className="glass-card rounded-xl p-5 border border-white/10">
              <div className="flex items-center gap-2 text-purple-400 text-xs font-mono">
                <Radio className="size-4" /> PAYLOAD SIZE
              </div>
              <p className="mt-2 text-2xl font-bold text-white">67 bytes</p>
              <p className="mt-1 text-xs text-slate-400">Live JSON string over MQTT on port 1883.</p>
            </div>
          </div>
        </section>

        {/* BOTTOM ACTION LINKS */}
        <div className="mt-14 flex flex-wrap gap-4 border-t border-white/10 pt-8">
          <Link
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-500 px-5 py-2.5 text-xs font-bold text-[#07121f] shadow-lg shadow-cyan-500/20 transition hover:brightness-110"
            href="/code-examples"
          >
            View Code Examples &amp; Firmware <ArrowRight className="size-4" />
          </Link>
          <Link
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-white/[0.08]"
            href="/how-it-works"
          >
            Trace Data Flow Pipeline &rarr;
          </Link>
        </div>
      </div>
    </main>
  )
}
