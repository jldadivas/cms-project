'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import {
  Activity,
  ArrowDown,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Code2,
  Cpu,
  Database,
  Eye,
  Flame,
  Globe,
  Layers,
  Radio,
  RefreshCw,
  Server,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Sun,
  Terminal,
  Waves,
  Wifi,
  Zap,
} from 'lucide-react'

const features = [
  {
    icon: Radio,
    badge: 'MQTT BROKER :1883',
    title: 'Lightweight Pub/Sub',
    description:
      'ESP32 publishes JSON payloads to Mosquitto MQTT broker on topic esp32/tof_light_soil_data with Last Will status tracking.',
    metric: '5s Publish Cycle',
  },
  {
    icon: Cpu,
    badge: 'DUAL I2C BUSES',
    title: 'Hardware Isolation',
    description:
      'Separate TwoWire buses (Wire 0 for VL53L0X ToF distance on pins 21/22 and Wire 1 for BH1750 ambient light on pins 18/19).',
    metric: 'Zero I2C Conflict',
  },
  {
    icon: Database,
    badge: 'FASTAPI + SQLITE',
    title: 'Local Edge Processing',
    description:
      'Background MQTT subscriber ingests packets, validates schema with Pydantic, and commits rows to local SQLite on Raspberry Pi.',
    metric: 'Zero Cloud Dependency',
  },
  {
    icon: Smartphone,
    badge: 'REACT NATIVE',
    title: 'Expo Go Visualization',
    description:
      'Live metric cards for ToF distance, ambient light level, soil moisture, and Wi-Fi RSSI signal strength on mobile.',
    metric: 'Cross-Platform',
  },
]

type ArchitectureNode = {
  name: string
  detail: string
  icon: typeof Waves
  category: string
  protocol: string
  latency: string
  sampleData: string
  description: string
}

const architectureNodes: ArchitectureNode[] = [
  {
    name: 'Sensors',
    detail: 'ToF + Light + Soil',
    icon: Waves,
    category: 'HARDWARE LAYER',
    protocol: 'Dual I2C Buses + 12-bit ADC',
    latency: '< 5ms',
    sampleData: 'VL53L0X (0x29) on pins 21/22\nBH1750 (0x23) on pins 18/19\nSoil Sensor on GPIO 34 (ADC1)',
    description:
      'Physical transducers: Adafruit VL53L0X laser Time-of-Flight distance sensor, BH1750 digital ambient light meter, and capacitive soil moisture probe.',
  },
  {
    name: 'ESP32',
    detail: 'Dual Wire & MQTT Client',
    icon: Cpu,
    category: 'MICROCONTROLLER',
    protocol: 'PubSubClient / C++ Arduino',
    latency: '5s publish loop',
    sampleData: '{\n  "tof_mm": 148,\n  "tof_cm": 14.8,\n  "lux": 420.50,\n  "soil_raw": 1840,\n  "rssi": -64\n}',
    description:
      'Dual-core Xtensa microcontroller running separate TwoWire buses for ToF and Light, sampling analog soil ADC1, formatting JSON, and publishing to MQTT broker.',
  },
  {
    name: 'MQTT Broker',
    detail: 'Mosquitto on Pi :1883',
    icon: Radio,
    category: 'MESSAGE BROKER',
    protocol: 'MQTT v3.1.1 / TCP 1883',
    latency: '< 8ms pub/sub',
    sampleData: 'Topic: esp32/tof_light_soil_data\nStatus: esp32/tof_light_soil_status ("online")',
    description:
      'Local Mosquitto MQTT broker on the Raspberry Pi LAN. Receives published sensor packets and maintains connection state via Last Will and Testament.',
  },
  {
    name: 'Raspberry Pi',
    detail: 'Edge Computing Node',
    icon: Server,
    category: 'EDGE SERVER',
    protocol: 'Linux Debian / Python 3.12',
    latency: '< 10ms processing',
    sampleData: 'paho-mqtt subscriber -> SQLite INSERT\nUTC Timestamp: 2026-10-25T10:00:00Z',
    description:
      'Raspberry Pi gateway running Mosquitto broker and an asynchronous FastAPI service with a background subscriber saving telemetry to SQLite.',
  },
  {
    name: 'Backend API',
    detail: 'FastAPI REST & WS',
    icon: Database,
    category: 'APPLICATION LAYER',
    protocol: 'FastAPI REST + WebSockets',
    latency: '3ms response',
    sampleData: 'GET /api/readings/latest\n{"id": 42, "tof_cm": 14.8, "lux": 420.5, ...}',
    description:
      'High-throughput Python API delivering structured readings, CORS headers, Swagger documentation, and real-time WebSocket push updates.',
  },
  {
    name: 'Expo Go',
    detail: 'Mobile Monitoring App',
    icon: Smartphone,
    category: 'MOBILE FRONTEND',
    protocol: 'React Native / Hermes JS',
    latency: '60 FPS Render',
    sampleData: 'ToF Distance: 14.8 cm\nLight: 420 lx\nSoil: 1840 raw\nRSSI: -64 dBm',
    description:
      'Native cross-platform mobile client built with React Native and Expo Go, polling the edge API to display real-time sensor metrics and device status.',
  },
]

const codeTabs = [
  {
    id: 'esp32',
    label: 'ESP32 (C++)',
    lang: 'cpp',
    title: 'Dual I2C + PubSubClient MQTT Publish',
    snippet: `// Dual TwoWire buses for VL53L0X & BH1750 + Soil Moisture on GPIO 34
TwoWire tofWire = TwoWire(0);
TwoWire lightWire = TwoWire(1);

void publishSensorData() {
  char payload[256];
  snprintf(payload, sizeof(payload),
           "{\\"tof_mm\\":%s,\\"tof_cm\\":%s,"
           "\\"lux\\":%s,"
           "\\"soil_raw\\":%d,"
           "\\"rssi\\":%d}",
           tofMmStr, tofCmStr, luxStr, soilValue, WiFi.RSSI());

  mqttClient.publish("esp32/tof_light_soil_data", payload);
}`,
  },
  {
    id: 'fastapi',
    label: 'FastAPI (Python)',
    lang: 'python',
    title: 'MQTT Subscriber & Edge SQLite Ingestion',
    snippet: `def on_message(client, userdata, msg):
    payload = json.loads(msg.payload.decode())
    store_reading(payload)  # saves tof_cm, lux, soil_raw, rssi with UTC time

@app.on_event("startup")
def start_mqtt():
    client = mqtt.Client(client_id="fastapi-mqtt-subscriber")
    client.on_message = on_message
    client.connect("localhost", 1883, 60)
    client.subscribe("esp32/tof_light_soil_data")
    client.loop_start()`,
  },
  {
    id: 'expo',
    label: 'React Native (TSX)',
    lang: 'tsx',
    title: 'Mobile Real-Time Fetch Hook',
    snippet: `useEffect(() => {
  const fetchTelemetry = async () => {
    const res = await fetch(\`\${API_BASE_URL}/api/readings/latest\`);
    const data = await res.json();
    setReading(data); // { tof_cm, lux, soil_raw, rssi }
  };
  fetchTelemetry();
  const interval = setInterval(fetchTelemetry, 5000);
  return () => clearInterval(interval);
}, []);`,
  },
]

export function SimplifiedLandingPage() {
  const [selectedNodeIndex, setSelectedNodeIndex] = useState(0)
  const [activeCodeTab, setActiveCodeTab] = useState('esp32')
  const [liveRssi, setLiveRssi] = useState(-64)
  const [simulatedTick, setSimulatedTick] = useState(0)

  // Live simulation tick for top status ribbon
  useEffect(() => {
    const interval = setInterval(() => {
      setSimulatedTick((t) => t + 1)
      setLiveRssi((prev) => -Math.abs(Math.round(62 + Math.random() * 4)))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const selectedNode = architectureNodes[selectedNodeIndex]
  const SelectedIcon = selectedNode.icon

  return (
    <main className="min-h-screen overflow-x-clip bg-[#07121f] text-[#e6f0fa] bg-tech-grid">
      {/* Top Telemetry Status Ribbon */}
      <div className="border-b border-cyan-500/10 bg-[#060e18]/80 py-2 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1500px] flex-wrap items-center justify-between gap-3 px-5 text-[11px] font-mono sm:px-8">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="size-2 rounded-full bg-emerald-400 animate-ping" />
              MQTT BROKER ONLINE
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">Topic: esp32/tof_light_soil_data</span>
            <span className="hidden text-slate-600 sm:inline">|</span>
            <span className="hidden text-slate-400 sm:inline">Port 1883 &middot; Client ID: esp32-tof-light-soil</span>
          </div>
          <div className="flex items-center gap-3 text-slate-400">
            <span className="text-cyan-300">RSSI: {liveRssi} dBm</span>
            <span>&bull;</span>
            <span className="text-slate-300">Cycle #{simulatedTick}</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1500px] px-5 lg:px-8">
        {/* HERO SECTION */}
        <section
          className="relative grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:py-20"
          id="home"
        >
          {/* Ambient Lighting Orbs */}
          <div className="pointer-events-none absolute -left-20 top-10 size-96 rounded-full bg-cyan-500/10 blur-[120px]" />
          <div className="pointer-events-none absolute right-0 top-32 size-96 rounded-full bg-blue-600/10 blur-[130px]" />

          <div className="relative z-10">
            {/* Pill Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3.5 py-1.5 text-xs font-semibold text-cyan-200 shadow-[0_0_15px_rgba(34,211,238,0.15)]">
              <Sparkles className="size-3.5 text-cyan-300" />
              <span>ESP32 MQTT &bull; VL53L0X ToF &bull; BH1750 Light &bull; Soil Moisture</span>
            </div>

            {/* Main Headline */}
            <h1 className="mt-5 max-w-3xl text-4xl leading-[1.08] font-bold tracking-tight sm:text-5xl xl:text-6xl">
              Connecting the Physical World to Your{' '}
              <span className="bg-gradient-to-r from-cyan-300 via-sky-300 to-blue-400 bg-clip-text text-transparent">
                Mobile App.
              </span>
            </h1>

            {/* Description */}
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
              The ESP32 samples VL53L0X Time-of-Flight distance, BH1750 ambient light, and analog soil
              moisture sensors over dual I2C buses, publishing JSON packets to a Raspberry Pi MQTT broker.
              The FastAPI backend processes readings for an Expo Go React Native mobile app.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <Link
                className="group inline-flex min-h-12 items-center gap-2.5 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 px-6 text-sm font-bold text-[#07121f] shadow-lg shadow-cyan-500/25 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-cyan-400/40 hover:brightness-105"
                href="/how-it-works"
              >
                <span>Explore How It Works</span>
                <ArrowDown aria-hidden="true" className="size-4 transition-transform group-hover:translate-y-0.5" />
              </Link>
              <Link
                className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-cyan-500/30 bg-white/[0.04] px-5 text-sm font-semibold text-slate-200 backdrop-blur-sm transition-all hover:border-cyan-400/60 hover:bg-white/[0.08] hover:text-white"
                href="/architecture"
              >
                <span>View Architecture</span>
                <ArrowRight aria-hidden="true" className="size-4 text-cyan-300" />
              </Link>
              <Link
                className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-5 text-sm font-semibold text-slate-200 backdrop-blur-sm transition-all hover:bg-white/[0.08] hover:text-white"
                href="/code-examples"
              >
                <Code2 className="size-4 text-cyan-300" />
                <span>Code Examples</span>
              </Link>
            </div>

            {/* Key Specs Row */}
            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-white/[0.08] pt-6">
              <div>
                <p className="text-xl font-bold text-white sm:text-2xl">3 Sensors</p>
                <p className="text-xs text-slate-400">ToF, Lux, Soil Moisture</p>
              </div>
              <div>
                <p className="text-xl font-bold text-cyan-300 sm:text-2xl">MQTT 1883</p>
                <p className="text-xs text-slate-400">Mosquitto Pub/Sub</p>
              </div>
              <div>
                <p className="text-xl font-bold text-emerald-300 sm:text-2xl">Dual I2C</p>
                <p className="text-xs text-slate-400">Pins 21/22 &amp; 18/19</p>
              </div>
            </div>
          </div>

          {/* Hero Visual Presentation */}
          <div className="relative mx-auto w-full max-w-[420px] lg:max-w-[460px]">
            {/* Tech Frame */}
            <div className="relative overflow-hidden rounded-2xl border border-cyan-500/25 bg-[#0a1626]/90 p-2 shadow-2xl shadow-cyan-950/50 backdrop-blur-xl">
              {/* Terminal Titlebar */}
              <div className="flex items-center justify-between border-b border-white/[0.08] bg-[#07111e] px-4 py-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-rose-500/80" />
                  <span className="size-2 rounded-full bg-amber-500/80" />
                  <span className="size-2 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 font-mono text-[11px] text-slate-400">
                    MQTT_FEED // esp32/tof_light_soil_data
                  </span>
                </div>
                <span className="rounded bg-cyan-500/20 px-1.5 py-0.5 font-mono text-[10px] text-cyan-300">
                  ONLINE
                </span>
              </div>

              {/* Main System Image */}
              <div className="relative flex items-center justify-center overflow-hidden rounded-xl bg-[#07121f]">
                <img
                  alt="ESP32, Raspberry Pi 4B, VL53L0X ToF, BH1750 Light, and Capacitive Soil Moisture sensors connected to mobile app"
                  className="mx-auto w-full h-auto max-h-[460px] rounded-xl object-contain object-center transition-transform duration-500 hover:scale-[1.01]"
                  src="/iot-system-hero.jpg?v=2"
                />
              </div>
            </div>
          </div>
        </section>

        {/* PROJECT FEATURES SECTION */}
        <section
          aria-label="Project features"
          className="grid gap-4 pb-12 sm:grid-cols-2 lg:pb-16 xl:grid-cols-4"
        >
          {features.map(({ icon: Icon, badge, title, description, metric }) => (
            <article
              className="glass-card glass-card-hover group relative flex min-w-0 flex-col justify-between rounded-2xl p-5 shadow-lg"
              key={title}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-xl bg-gradient-to-br from-cyan-400/20 to-blue-500/20 text-cyan-300 ring-1 ring-cyan-400/30 transition-transform group-hover:scale-110">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-0.5 font-mono text-[10px] font-semibold text-slate-300">
                    {badge}
                  </span>
                </div>
                <h2 className="mt-4 text-base font-semibold text-white group-hover:text-cyan-200 transition-colors">
                  {title}
                </h2>
                <p className="mt-2 text-xs leading-relaxed text-slate-400">{description}</p>
              </div>
              <div className="mt-4 border-t border-white/[0.06] pt-3 flex items-center justify-between text-[11px]">
                <span className="text-slate-400 font-mono">SPEC:</span>
                <span className="font-semibold text-cyan-300 font-mono">{metric}</span>
              </div>
            </article>
          ))}
        </section>

        {/* SYSTEM ARCHITECTURE INTERACTIVE PIPELINE */}
        <section className="scroll-mt-24 py-12 sm:py-16" id="architecture">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/[0.08] pb-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-300">
                <Layers className="size-4" /> End-to-End MQTT Pipeline
              </div>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                System architecture
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">
                Follow the reading path from ToF, BH1750, and Soil sensors through MQTT to the mobile display.
                Click any node to inspect I2C buses, payload structures, and broker settings.
              </p>
            </div>
            <Link
              className="inline-flex items-center gap-2 rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-xs font-semibold text-cyan-200 transition hover:bg-cyan-500/20"
              href="/architecture"
            >
              Open Full Interactive Architecture Spec &rarr;
            </Link>
          </div>

          {/* Pipeline Node Visualizer */}
          <div className="mt-8 grid grid-cols-1 gap-2.5 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr] lg:items-center">
            {architectureNodes.map(({ name, detail, icon: Icon }, index) => {
              const isSelected = selectedNodeIndex === index
              return (
                <div className="contents" key={name}>
                  <button
                    aria-label={`Select ${name} stage`}
                    className={`group flex items-center gap-3.5 rounded-xl border p-3.5 text-left transition-all duration-200 lg:flex-col lg:justify-center lg:p-4 lg:text-center ${
                      isSelected
                        ? 'border-cyan-400 bg-gradient-to-b from-cyan-950/60 to-[#0c1f33] shadow-lg shadow-cyan-500/20 ring-1 ring-cyan-400/50'
                        : 'border-white/10 bg-[#0b1928] hover:border-cyan-400/40 hover:bg-[#0e2136]'
                    }`}
                    onClick={() => setSelectedNodeIndex(index)}
                    type="button"
                  >
                    <div
                      className={`grid size-10 shrink-0 place-items-center rounded-lg transition-transform group-hover:scale-105 ${
                        isSelected
                          ? 'bg-cyan-400 text-[#07121f]'
                          : 'bg-cyan-300/10 text-cyan-200 group-hover:bg-cyan-300/20'
                      }`}
                    >
                      <Icon aria-hidden="true" className="size-5" />
                    </div>
                    <div>
                      <p className={`text-sm font-semibold ${isSelected ? 'text-cyan-200' : 'text-white'}`}>
                        {name}
                      </p>
                      <p className="text-[11px] text-slate-400">{detail}</p>
                    </div>
                  </button>

                  {index < architectureNodes.length - 1 && (
                    <div className="flex justify-center text-cyan-400/60">
                      <ArrowRight
                        aria-hidden="true"
                        className="size-4 rotate-90 text-cyan-400 animate-pulse lg:rotate-0"
                      />
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Selected Node Deep-Dive Inspector Panel */}
          <div className="mt-6 overflow-hidden rounded-2xl border border-cyan-500/30 bg-[#091624] p-6 shadow-xl backdrop-blur-xl">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-cyan-400/15 text-cyan-300 ring-1 ring-cyan-400/30">
                  <SelectedIcon className="size-5" />
                </span>
                <div>
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-cyan-400">
                    STAGE {selectedNodeIndex + 1} OF 6 &bull; {selectedNode.category}
                  </span>
                  <h3 className="text-xl font-bold text-white">{selectedNode.name}</h3>
                </div>
              </div>
              <div className="flex items-center gap-3 font-mono text-xs">
                <span className="rounded bg-white/[0.05] px-2.5 py-1 text-slate-300 border border-white/10">
                  Protocol: <strong className="text-cyan-200">{selectedNode.protocol}</strong>
                </span>
                <span className="rounded bg-emerald-950/40 border border-emerald-500/30 px-2.5 py-1 text-emerald-300">
                  Latency: <strong>{selectedNode.latency}</strong>
                </span>
              </div>
            </div>

            <div className="mt-5 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Functional Role
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-slate-200">
                  {selectedNode.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  <Link
                    className="inline-flex items-center gap-1.5 rounded-lg border border-cyan-400/30 bg-cyan-400/10 px-3.5 py-1.5 text-xs font-semibold text-cyan-200 transition hover:bg-cyan-400/20"
                    href={
                      selectedNodeIndex <= 1
                        ? '/esp32'
                        : selectedNodeIndex <= 3
                          ? '/raspberry-pi'
                          : selectedNodeIndex === 4
                            ? '/code-examples'
                            : '/expo-go'
                    }
                  >
                    <span>Read {selectedNode.name} Implementation Guide</span>
                    <ChevronRight className="size-3.5" />
                  </Link>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Payload &amp; Interface Sample
                </h4>
                <pre className="mt-2 max-h-40 overflow-x-auto rounded-xl border border-white/10 bg-[#050c14] p-3.5 font-mono text-xs text-cyan-200 leading-relaxed">
                  <code>{selectedNode.sampleData}</code>
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* CODE & CIRCUITRY QUICK PREVIEW */}
        <section className="py-12 sm:py-16">
          <div className="rounded-2xl border border-white/10 bg-[#0a1626] p-6 lg:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
              <div>
                <p className="font-mono text-xs font-semibold tracking-wider text-cyan-300 uppercase">
                  UNIFIED DATA CONTRACT
                </p>
                <h2 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  Shared Code Architecture
                </h2>
                <p className="mt-1 text-sm text-slate-400">
                  The exact code that brings ToF distance, ambient light, and soil moisture from pin to mobile screen.
                </p>
              </div>
              <div className="flex rounded-xl bg-[#060e18] p-1 border border-white/10">
                {codeTabs.map((tab) => (
                  <button
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                      activeCodeTab === tab.id
                        ? 'bg-cyan-500/20 text-cyan-200 shadow-sm border border-cyan-500/30'
                        : 'text-slate-400 hover:text-white'
                    }`}
                    key={tab.id}
                    onClick={() => setActiveCodeTab(tab.id)}
                    type="button"
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Code Body */}
            {codeTabs
              .filter((tab) => tab.id === activeCodeTab)
              .map((tab) => (
                <div className="mt-5" key={tab.id}>
                  <div className="mb-2 flex items-center justify-between text-xs text-slate-400">
                    <span className="font-semibold text-slate-200">{tab.title}</span>
                    <Link
                      className="inline-flex items-center gap-1 text-cyan-300 hover:underline"
                      href="/code-examples"
                    >
                      View all code examples &rarr;
                    </Link>
                  </div>
                  <pre className="overflow-x-auto rounded-xl border border-white/10 bg-[#050c14] p-4 text-xs font-mono leading-6 text-cyan-100 sm:text-sm">
                    <code>{tab.snippet}</code>
                  </pre>
                </div>
              ))}
          </div>
        </section>

        {/* BOTTOM CALL TO ACTION */}
        <section className="mb-16 rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-[#0c223a] via-[#091829] to-[#07121f] p-8 text-center shadow-2xl lg:p-12">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to Build Your Edge IoT System?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
            Explore the complete step-by-step tutorials for ESP32 hardware wiring, FastAPI edge server configuration, and React Native mobile apps.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-500 px-6 text-sm font-bold text-[#07121f] shadow-lg shadow-cyan-500/25 transition hover:brightness-110"
              href="/how-it-works"
            >
              <span>Explore How It Works</span>
              <ArrowRight className="size-4" />
            </Link>
            <Link
              className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-5 text-sm font-semibold text-white transition hover:bg-white/[0.08]"
              href="/code-examples"
            >
              <Code2 className="size-4 text-cyan-300" />
              <span>Inspect Code Examples</span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}
