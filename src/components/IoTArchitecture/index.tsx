'use client'

import { useState } from 'react'
import {
  Activity,
  ArrowDown,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Database,
  Layers,
  Network,
  Play,
  Radio,
  Server,
  ShieldCheck,
  Smartphone,
  Terminal,
  Waves,
  Zap,
} from 'lucide-react'
import { IoTPageHeader } from '@/components/IoTPageHeader'

const optionalDatabase = {
  name: 'SQLite (sensor_readings.sqlite3)',
  icon: Database,
  responsibility: 'Persists readings locally for historical inspection and reboot recovery.',
  communication: 'Local SQL queries from main.py via sqlite3 standard library with thread locking.',
  input: 'Timestamped sensor records with calibrated soil moisture percentage.',
  output: 'Stored history (GET /api/readings) and latest reading (GET /api/readings/current).',
  protocol: 'Embedded C / SQLite3 Engine',
  latency: '< 1ms disk write',
  techSpec: 'Stored at sensor_readings.sqlite3. Thread-safe execution via _db_lock.',
  contract:
    'CREATE TABLE readings (\n  id INTEGER PRIMARY KEY AUTOINCREMENT,\n  timestamp TEXT NOT NULL,\n  tof_distance_mm REAL,\n  light_lux REAL,\n  soil_raw INTEGER,\n  soil_moisture_percent REAL,\n  rssi INTEGER\n);',
}

const components = [
  {
    name: 'Sensors',
    icon: Waves,
    responsibility:
      'Measure physical conditions: laser Time-of-Flight distance, ambient light levels, and soil moisture.',
    communication: 'Dual I2C buses (Wire 0 & Wire 1) plus 12-bit ADC1 on GPIO 34.',
    input: 'Physical distance, ambient photons, and soil volumetric moisture.',
    output: 'ToF distance (mm), ambient illuminance (lux), and raw soil ADC voltage.',
    protocol: 'I2C (0x29 & 0x23) + ADC1 11dB Attenuation',
    latency: '< 5ms conversion',
    techSpec:
      'VL53L0X on SDA 21, SCL 22 (Wire 0); BH1750 on SDA 18, SCL 19 (Wire 1); Soil sensor on GPIO 34 (ADC1).',
    contract:
      'VL53L0X: 0..2000 mm\nBH1750: 0..65535 lx\nSoil: 0..4095 raw ADC (ADC1_CH6)',
  },
  {
    name: 'ESP32',
    icon: Cpu,
    responsibility:
      'Runs firmware on dual I2C buses, reads sensors, formats JSON, and publishes to MQTT broker via PubSubClient.',
    communication: 'Wi-Fi 802.11 b/g/n and MQTT client to Raspberry Pi.',
    input: 'Dual I2C bus signals, GPIO 34 ADC, and local Wi-Fi / MQTT credentials.',
    output: 'JSON packets published to topic esp32/tof_light_soil_data every 5 seconds.',
    protocol: 'PubSubClient / C++ Arduino',
    latency: '5s publish interval',
    techSpec:
      'Dual-core ESP32 (240MHz). Client ID: esp32-tof-light-soil. Last Will on esp32/tof_light_soil_status.',
    contract:
      'Topic: esp32/tof_light_soil_data\n{\n  "tof_mm": 148,\n  "tof_cm": 14.8,\n  "lux": 420.50,\n  "soil_raw": 1840,\n  "rssi": -64\n}',
  },
  {
    name: 'MQTT Broker',
    icon: Network,
    responsibility:
      'Mosquitto MQTT broker on Raspberry Pi (port 1883). Manages pub/sub topics and client keepalives.',
    communication: 'TCP IP over local Wi-Fi on port 1883.',
    input: 'MQTT publish packets from ESP32 on esp32/tof_light_soil_data.',
    output: 'Real-time message routing to the FastAPI backend subscriber.',
    protocol: 'MQTT v3.1.1 / TCP 1883',
    latency: '< 8ms round-trip',
    techSpec: 'Mosquitto running on Raspberry Pi LAN (0.0.0.0:1883). Anonymous access or credentials.',
    contract:
      'Publish Topic: esp32/tof_light_soil_data\nStatus Topic: esp32/tof_light_soil_status ("online"/"offline")',
  },
  {
    name: 'Raspberry Pi',
    icon: Server,
    responsibility:
      'Edge gateway host running Mosquitto MQTT broker and main.py FastAPI background subscriber.',
    communication: 'Internal MQTT socket (localhost:1883) and HTTP server on port 8080.',
    input: 'MQTT stream from Mosquitto broker on esp32/tof_light_soil_data.',
    output: 'Calibrated moisture percentage calculated, readings stored in SQLite.',
    protocol: 'Linux Debian 12 / Python 3.12',
    latency: '5ms pipeline latency',
    techSpec: 'Raspberry Pi 4 Model B / SOIL_DRY_RAW=2527 / SOIL_WET_RAW=1237.',
    contract: 'paho-mqtt CallbackAPIVersion.VERSION2 -> on_message() -> store_reading() -> SQLite insert',
  },
  {
    name: 'Python API',
    icon: Network,
    responsibility: 'FastAPI MQTT-to-HTTP bridge (main.py) exposing telemetry endpoints for mobile and web apps.',
    communication: 'FastAPI async lifespan with paho-mqtt subscriber on port 8080.',
    input: 'Validated sensor records from MQTT subscriber / SQLite.',
    output: 'JSON responses with current telemetry, history, and broker health.',
    protocol: 'FastAPI / paho-mqtt v2 / Uvicorn',
    latency: '3ms response time',
    techSpec: 'Endpoints: GET /api/readings/current, GET /api/readings/latest, GET /api/readings, GET /api/health.',
    contract:
      'GET /api/readings/current -> 200 OK\n{\n  "reading": {\n    "timestamp": "2026-10-25T11:15:30.123Z",\n    "tof_distance_mm": 148.0,\n    "light_lux": 420.5,\n    "soil_raw": 1840,\n    "soil_moisture_percent": 53.3,\n    "rssi": -64\n  }\n}',
  },
  optionalDatabase,
  {
    name: 'Expo Go app',
    icon: Smartphone,
    responsibility: 'Cross-platform mobile UI; polls /api/readings/current and renders telemetry cards.',
    communication: 'HTTP GET polling to the Pi API address on port 8080.',
    input: 'JSON readings with ToF distance (mm), light (lux), soil moisture (%), and RSSI (dBm).',
    output: 'Real-time telemetry cards, status indicators, and alerts on smartphone.',
    protocol: 'React Native 0.76 / Expo SDK 52',
    latency: '60 FPS Native Render',
    techSpec: 'Native iOS & Android runtime via Expo Go client over local Wi-Fi.',
    contract: 'State update -> Distance (mm), Light (lx), Soil Moisture (%), Wi-Fi RSSI (dBm)',
  },
]

const primaryComponents = components.filter((component) => !component.name.includes('SQLite'))

export function IoTArchitecture() {
  const [selectedName, setSelectedName] = useState(components[0].name)
  const [activeTab, setActiveTab] = useState<'overview' | 'contract' | 'specs'>('overview')
  const [simulatingFlow, setSimulatingFlow] = useState(false)

  const selected = components.find((component) => component.name === selectedName) ?? components[0]
  const SelectedIcon = selected.icon

  // Simulated packet flow animation through primary nodes
  const triggerPacketSimulation = () => {
    if (simulatingFlow) return
    setSimulatingFlow(true)
    let idx = 0
    const timer = setInterval(() => {
      setSelectedName(primaryComponents[idx].name)
      idx++
      if (idx >= primaryComponents.length) {
        clearInterval(timer)
        setTimeout(() => setSimulatingFlow(false), 800)
      }
    }, 700)
  }

  return (
    <main className="min-h-[70vh] bg-[#07121f] px-5 py-10 text-[#e6f0fa] sm:px-8 sm:py-14 bg-tech-grid">
      <div className="mx-auto max-w-6xl">
        <IoTPageHeader
          description="Select a layer to inspect its role and the data it receives and produces. Readings move toward the API; requests and responses connect the mobile app back to the service."
          eyebrow="INTERACTIVE SYSTEM MAP"
          title="System architecture"
        />

        {/* Interactive Pipeline Controller Ribbon */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-cyan-500/20 bg-[#091524] px-5 py-3.5 shadow-lg backdrop-blur-xl">
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <span className="size-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="font-semibold text-white">Full-Stack Data Journey:</span>
            <span className="hidden sm:inline text-slate-400">
              Left to right flow with zero external cloud dependencies.
            </span>
          </div>
          <button
            className={`inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-500 px-4 py-1.5 text-xs font-bold text-[#07121f] shadow-md shadow-cyan-500/20 transition hover:brightness-110 disabled:opacity-60`}
            disabled={simulatingFlow}
            onClick={triggerPacketSimulation}
            type="button"
          >
            <Play className={`size-3.5 ${simulatingFlow ? 'animate-spin' : ''}`} />
            {simulatingFlow ? 'Simulating Packet...' : 'Simulate Packet Flow'}
          </button>
        </div>

        {/* Node Pipeline Selection */}
        <section
          aria-label="Select a system component"
          className="mt-4 rounded-2xl border border-white/10 bg-[#091524]/90 p-4 sm:p-6 shadow-xl backdrop-blur-xl"
        >
          <ol className="flex flex-col gap-2 lg:flex-row lg:items-stretch">
            {primaryComponents.map(({ name, icon: Icon }, index) => {
              const isSelected = selectedName === name
              return (
                <li className="flex min-w-0 flex-1 flex-col lg:flex-row lg:items-center" key={name}>
                  <button
                    aria-pressed={isSelected}
                    className={`flex min-h-14 flex-1 items-center gap-3 rounded-xl border px-3 py-3 text-left transition-all duration-200 ${
                      isSelected
                        ? 'border-cyan-400 bg-gradient-to-br from-cyan-950/80 to-[#0e243a] text-cyan-50 shadow-[0_0_22px_rgba(34,211,238,0.2)] ring-1 ring-cyan-400/50'
                        : 'border-white/10 bg-[#0b1928] text-slate-200 hover:border-cyan-400/30 hover:bg-[#0e2136]'
                    }`}
                    onClick={() => setSelectedName(name)}
                    type="button"
                  >
                    <div
                      className={`grid size-9 shrink-0 place-items-center rounded-lg transition-transform ${
                        isSelected ? 'bg-cyan-400 text-[#07121f]' : 'bg-cyan-400/10 text-cyan-300'
                      }`}
                    >
                      <Icon aria-hidden="true" className="size-4" />
                    </div>
                    <span className="text-sm font-semibold">{name}</span>
                  </button>
                  {index < primaryComponents.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="flex h-7 items-center justify-center text-cyan-400/70 lg:w-7"
                    >
                      <ArrowDown className="size-4 lg:hidden" />
                      <ArrowRight className="hidden size-4 animate-pulse lg:block" />
                    </span>
                  )}
                </li>
              )
            })}
          </ol>

          {/* Database Option Ribbon */}
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.08] pt-4">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="text-cyan-300">&bull;</span>
              <span>Data persists locally in edge storage:</span>
            </div>
            <button
              aria-pressed={selectedName === optionalDatabase.name}
              className={`inline-flex min-h-10 items-center gap-2 rounded-xl border px-4 text-xs font-semibold transition ${
                selectedName === optionalDatabase.name
                  ? 'border-cyan-400 bg-cyan-950/70 text-cyan-200 shadow-md ring-1 ring-cyan-400/40'
                  : 'border-white/10 bg-[#0b1928] text-slate-300 hover:border-cyan-400/30'
              }`}
              onClick={() => setSelectedName(optionalDatabase.name)}
              type="button"
            >
              <Database aria-hidden="true" className="size-4 text-cyan-300" />
              {optionalDatabase.name}
            </button>
          </div>
        </section>

        {/* Selected Layer Detailed Inspector */}
        <section
          aria-live="polite"
          className="mt-6 rounded-2xl border border-cyan-500/30 bg-[#091524] p-6 sm:p-8 shadow-2xl backdrop-blur-xl"
        >
          {/* Node Heading */}
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/[0.08] pb-5">
            <div className="flex items-center gap-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-cyan-400/15 text-cyan-300 ring-1 ring-cyan-400/30 shadow-lg shadow-cyan-500/15">
                <SelectedIcon aria-hidden="true" className="size-6" />
              </span>
              <div>
                <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-cyan-400">
                  LAYER COMPONENT SPECIFICATION
                </span>
                <h2 className="text-2xl font-bold text-white">{selected.name}</h2>
              </div>
            </div>

            {/* Sub-Tabs */}
            <div className="flex rounded-xl bg-[#060e18] p-1 border border-white/10">
              <button
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  activeTab === 'overview'
                    ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
                onClick={() => setActiveTab('overview')}
                type="button"
              >
                Overview
              </button>
              <button
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  activeTab === 'contract'
                    ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
                onClick={() => setActiveTab('contract')}
                type="button"
              >
                Data Contract
              </button>
              <button
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  activeTab === 'specs'
                    ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
                onClick={() => setActiveTab('specs')}
                type="button"
              >
                Hardware Specs
              </button>
            </div>
          </div>

          {/* Tab 1: Overview */}
          {activeTab === 'overview' && (
            <div className="mt-6">
              <p className="text-sm leading-relaxed text-slate-200 sm:text-base">
                {selected.responsibility}
              </p>

              <dl className="mt-6 grid gap-4 border-t border-white/[0.08] pt-6 sm:grid-cols-3">
                {[
                  ['Communication', selected.communication],
                  ['Input', selected.input],
                  ['Output', selected.output],
                ].map(([term, description]) => (
                  <div className="rounded-xl border border-white/[0.06] bg-[#060e19] p-4" key={term}>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-cyan-300 font-mono">
                      {term}
                    </dt>
                    <dd className="mt-2 text-xs leading-relaxed text-slate-300">{description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {/* Tab 2: Data Contract */}
          {activeTab === 'contract' && (
            <div className="mt-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Payload / Protocol Interface Contract
              </h3>
              <pre className="mt-3 overflow-x-auto rounded-xl border border-white/10 bg-[#050c14] p-4 font-mono text-xs leading-relaxed text-cyan-200 sm:text-sm">
                <code>{selected.contract}</code>
              </pre>
            </div>
          )}

          {/* Tab 3: Hardware Specs */}
          {activeTab === 'specs' && (
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-white/[0.08] bg-[#060e19] p-4">
                <p className="font-mono text-xs font-semibold text-cyan-300 uppercase">
                  Runtime Protocol
                </p>
                <p className="mt-1 text-sm text-slate-200">{selected.protocol}</p>
                <p className="mt-3 font-mono text-xs font-semibold text-cyan-300 uppercase">
                  Typical Latency
                </p>
                <p className="mt-1 text-sm text-emerald-300 font-mono">{selected.latency}</p>
              </div>
              <div className="rounded-xl border border-white/[0.08] bg-[#060e19] p-4">
                <p className="font-mono text-xs font-semibold text-cyan-300 uppercase">
                  Technical Specifications
                </p>
                <p className="mt-1 text-xs leading-relaxed text-slate-300">{selected.techSpec}</p>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  )
}
