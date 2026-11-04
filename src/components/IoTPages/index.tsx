import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRight,
  CheckCircle2,
  Cpu,
  Database,
  ExternalLink,
  Layers,
  Network,
  Radio,
  Server,
  ShieldCheck,
  Smartphone,
  Terminal,
  Video,
  Waves,
  Wifi,
  Zap,
} from 'lucide-react'
import { CodeExamples } from '@/components/CodeExamples'
import { IoTPageHeader } from '@/components/IoTPageHeader'

const steps = [
  {
    icon: Waves,
    title: 'Sensors measure distance, light & moisture',
    detail:
      'The VL53L0X Time-of-Flight laser sensor measures distance in millimeters and centimeters, the BH1750 sensor measures ambient illuminance in lux, and an analog probe reads soil moisture.',
    badge: 'STAGE 01 &bull; TRANSDUCERS',
  },
  {
    icon: Cpu,
    title: 'ESP32 dual I2C & ADC sampling',
    detail:
      'Firmware initializes separate TwoWire buses (Wire 0 on pins 21/22 and Wire 1 on pins 18/19), reads analog soil on GPIO 34 (ADC1), and serializes JSON with ToF, lux, soil, and RSSI values.',
    badge: 'STAGE 02 &bull; DUAL I2C NODE',
  },
  {
    icon: Wifi,
    title: 'MQTT packet publishing over Wi-Fi',
    detail:
      'PubSubClient connects to the Raspberry Pi Mosquitto broker (port 1883) over local Wi-Fi, publishing to topic esp32/tof_light_soil_data every 5 seconds with Last Will status tracking.',
    badge: 'STAGE 03 &bull; MQTT PROTOCOL',
  },
  {
    icon: Server,
    title: 'Raspberry Pi Mosquitto & FastAPI',
    detail:
      'Mosquitto routes the messages while a background Python subscriber ingests readings, validates constraints with Pydantic, and commits rows to SQLite storage.',
    badge: 'STAGE 04 &bull; EDGE BROKER & DB',
  },
  {
    icon: Network,
    title: 'Backend API provides readings',
    detail:
      'REST endpoints (/api/readings/current and /api/readings) serve parsed distance, lux, soil moisture, and signal data to the mobile client.',
    badge: 'STAGE 05 &bull; ASYNC API',
  },
  {
    icon: Smartphone,
    title: 'Expo Go displays the result',
    detail:
      'The React Native application running in Expo Go renders interactive cards for ToF Distance, Light Level, Soil Moisture, and Wi-Fi RSSI signal strength.',
    badge: 'STAGE 06 &bull; MOBILE CLIENT',
  },
]

function PageFrame({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-[75vh] bg-[#07121f] px-5 py-10 text-[#e6f0fa] sm:px-8 sm:py-16 bg-tech-grid">
      <div className="mx-auto max-w-6xl">{children}</div>
    </main>
  )
}

function InfoCard({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Cpu
  title: string
  children: React.ReactNode
}) {
  return (
    <article className="glass-card glass-card-hover group relative rounded-2xl p-6 shadow-xl">
      <div className="grid size-11 place-items-center rounded-xl bg-cyan-400/10 text-cyan-300 ring-1 ring-cyan-400/25 transition-transform group-hover:scale-105">
        <Icon aria-hidden="true" className="size-5" />
      </div>
      <h2 className="mt-4 text-base font-bold text-white group-hover:text-cyan-200 transition-colors">
        {title}
      </h2>
      <div className="mt-2.5 text-xs leading-relaxed text-slate-300 sm:text-sm">{children}</div>
    </article>
  )
}

export function HowItWorksPage() {
  return (
    <PageFrame>
      <IoTPageHeader
        description="Follow one sensor reading from the physical world to a mobile screen. Each layer has a clear responsibility and a well-defined network boundary."
        eyebrow="DATA FLOW PIPELINE"
        title="How the IoT system works"
      />

      <ol className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {steps.map(({ icon: Icon, title, detail, badge }, index) => (
          <li
            className="glass-card glass-card-hover group relative rounded-2xl p-6 shadow-lg"
            key={title}
          >
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <span className="font-mono text-[10px] font-semibold text-cyan-300 tracking-wider">
                {badge}
              </span>
              <span className="grid size-8 place-items-center rounded-lg bg-cyan-400/10 font-mono text-xs font-bold text-cyan-200">
                0{index + 1}
              </span>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-white/[0.05] text-cyan-200">
                <Icon aria-hidden="true" className="size-4" />
              </span>
              <h2 className="font-bold text-white group-hover:text-cyan-200 transition-colors text-sm sm:text-base">
                {title}
              </h2>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-slate-300 sm:text-sm">{detail}</p>
          </li>
        ))}
      </ol>

      <aside className="mt-8 rounded-2xl border border-cyan-400/30 bg-cyan-950/25 p-5 text-sm leading-relaxed text-slate-200 backdrop-blur-md">
        <div className="flex items-center gap-2 font-semibold text-cyan-300 text-xs uppercase tracking-wider mb-1">
          <Terminal className="size-4" /> Architecture Note
        </div>
        Expo Go is a development client running your compiled React Native JavaScript bundle. The app itself
        initiates standard HTTP/WebSocket requests to the Raspberry Pi over local Wi-Fi; Expo Go does not
        directly pair or communicate with the physical transducers.
      </aside>

      <div className="mt-8 flex flex-wrap gap-4">
        <Link
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-500 px-5 py-2.5 text-xs font-bold text-[#07121f] shadow-lg shadow-cyan-500/20 transition hover:brightness-110"
          href="/architecture"
        >
          Explore Interactive Architecture Map <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
        <Link
          className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-white/[0.08]"
          href="/code-examples"
        >
          View Code Examples &rarr;
        </Link>
      </div>
    </PageFrame>
  )
}

export function Esp32Page() {
  return (
    <PageFrame>
      <IoTPageHeader
        description="The ESP32 is a feature-rich 32-bit dual-core microcontroller that bridges physical transducers to your network. In this project, it orchestrates dual independent I2C buses (VL53L0X Time-of-Flight & BH1750 Ambient Light), samples analog soil moisture on ADC1 GPIO 34, formats structured JSON payloads, and publishes to the Raspberry Pi Mosquitto broker over Wi-Fi."
        eyebrow="ABOUT ESP32 &amp; HARDWARE ARCHITECTURE"
        title="About ESP32: Dual-Core Node, Sensors &amp; Telemetry"
      />

      {/* About ESP32 Architecture & Specifications Grid */}
      <section className="mt-8 rounded-2xl border border-cyan-500/20 bg-[#091524]/90 p-6 sm:p-8 backdrop-blur-xl shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
          <div>
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-cyan-300">
              HARDWARE SPECIFICATIONS &amp; PINOUTS
            </span>
            <h2 className="text-xl font-bold text-white sm:text-2xl mt-1">
              About the ESP32 DevKit V1 Microcontroller
            </h2>
          </div>
          <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 font-mono text-xs text-cyan-300">
            Xtensa Dual-Core 240 MHz
          </span>
        </div>

        <p className="mt-4 text-xs leading-relaxed text-slate-300 sm:text-sm">
          The ESP32 (specifically the 30-pin ESP32-WROOM-32 DevKit V1) serves as the primary edge sensing engine in this IoT pipeline. It features ultra-low-power co-processing, integrated 2.4 GHz Wi-Fi, and multiple high-speed serial peripherals. By leveraging its secondary hardware I2C bus (<code className="text-cyan-300 font-mono">Wire1</code>), the system simultaneously polls distance and illuminance without the bus arbitration locks common on single-bus microcontrollers.
        </p>

        {/* 4-Column Technical Specs */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 font-mono text-xs">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5">
            <span className="text-[10px] text-slate-400 uppercase block">Processor Core</span>
            <span className="font-bold text-cyan-300 text-sm mt-0.5 block">Dual Xtensa LX6</span>
            <span className="text-[10px] text-slate-400 mt-1 block">240 MHz &bull; 600 DMIPS</span>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5">
            <span className="text-[10px] text-slate-400 uppercase block">Memory &amp; Storage</span>
            <span className="font-bold text-cyan-300 text-sm mt-0.5 block">520 KB SRAM</span>
            <span className="text-[10px] text-slate-400 mt-1 block">4 MB External SPI Flash</span>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5">
            <span className="text-[10px] text-slate-400 uppercase block">RF Connectivity</span>
            <span className="font-bold text-emerald-400 text-sm mt-0.5 block">802.11 b/g/n</span>
            <span className="text-[10px] text-slate-400 mt-1 block">2.4 GHz + BLE v4.2</span>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5">
            <span className="text-[10px] text-slate-400 uppercase block">Operating Power</span>
            <span className="font-bold text-amber-300 text-sm mt-0.5 block">3.3V Logic Rails</span>
            <span className="text-[10px] text-slate-400 mt-1 block">5V USB / AMS1117 LDO</span>
          </div>
        </div>
      </section>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <InfoCard icon={Cpu} title="Dual TwoWire I2C Buses">
          Initializes Wire 0 on SDA 21, SCL 22 for VL53L0X and Wire 1 on SDA 18, SCL 19 for BH1750. Running separate hardware buses eliminates bus contention and clock stretching issues.
        </InfoCard>
        <InfoCard icon={Waves} title="Soil Moisture on ADC1">
          Connected to GPIO 34 configured with 12-bit resolution and 11dB attenuation. Because GPIO 34 uses ADC1, it functions reliably without conflict when Wi-Fi is actively transmitting.
        </InfoCard>
        <InfoCard icon={Wifi} title="MQTT PubSubClient">
          Connects to Mosquitto on port 1883, publishing to <code className="mx-1 text-cyan-300 font-mono">esp32/tof_light_soil_data</code> every 5 seconds with Last Will status on <code className="mx-1 text-cyan-300 font-mono">esp32/tof_light_soil_status</code>.
        </InfoCard>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-cyan-500/40 bg-gradient-to-r from-cyan-950/40 via-[#0a1b2d] to-[#071322] p-6 shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="grid size-12 place-items-center rounded-2xl bg-cyan-500/20 text-cyan-300 shrink-0 ring-1 ring-cyan-400/40">
            <Cpu className="size-6" />
          </div>
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-0.5 text-[10px] font-bold text-cyan-300 mb-1">
              <span>ONLINE TUTORIALS &amp; WIRING SCHEMATIC</span>
            </div>
            <h3 className="text-base font-bold text-white">
              ESP32 Learning Center: Complete Hands-On Guide
            </h3>
            <p className="text-xs text-slate-300 max-w-2xl mt-0.5">
              Explore step-by-step interactive lessons with progress tracking, Cirkit Designer wiring schematic, pinouts, and Arduino C++ firmware code.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <Link
            className="inline-flex items-center gap-2 rounded-xl border border-cyan-400/40 bg-cyan-500/10 px-4 py-2.5 text-xs font-semibold text-cyan-300 transition hover:bg-cyan-500/20"
            href="/esp32-learning/connecting-sensors-to-esp32/cirkit-schematic-and-physical-wiring"
          >
            <span>Cirkit Schematic</span>
          </Link>
          <Link
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-500 px-5 py-2.5 text-xs font-bold text-[#07121f] shadow-lg shadow-cyan-500/20 transition hover:brightness-110"
            href="/esp32-learning"
          >
            <span>Open Learning Center</span>
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-rose-500/30 bg-rose-950/20 p-5 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="grid size-10 place-items-center rounded-xl bg-rose-500/20 text-rose-300 shrink-0">
            <Video className="size-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="size-2 rounded-full bg-rose-400 animate-ping" />
              Live Serial Monitor Video Capture Available
            </h3>
            <p className="text-xs text-slate-300">
              Watch the 36-second real-world screen recording of the Dell laptop running Arduino IDE Serial Monitor connected to the ESP32 on COM4.
            </p>
          </div>
        </div>
        <Link
          className="inline-flex items-center gap-1.5 rounded-xl border border-rose-500/30 bg-rose-500/20 px-4 py-2 text-xs font-semibold text-rose-200 transition hover:bg-rose-500/30 hover:text-white"
          href="/results"
        >
          Watch Video Stream &rarr;
        </Link>
      </div>

      <section className="mt-10 rounded-2xl border border-white/10 bg-[#091524] p-6 lg:p-8 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
          <div>
            <h2 className="text-xl font-bold text-white">Arduino IDE Reference Firmware</h2>
            <p className="mt-1 text-xs text-slate-400">
              Matches your sketch: Adafruit_VL53L0X, BH1750, Soil ADC1 pin 34, and PubSubClient MQTT.
            </p>
          </div>
          <span className="rounded-md border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-1 font-mono text-[11px] text-cyan-300">
            C++ / PubSubClient
          </span>
        </div>
        <div className="mt-4">
          <CodeExamples only={['esp32']} />
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-white">Diagnostics &amp; Common Issues</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <InfoCard icon={Wifi} title="MQTT Failed (rc=-2 or rc=-4)">
            Verify the Raspberry Pi LAN IP and that Mosquitto is active. Ensure <code className="text-cyan-200">/etc/mosquitto/mosquitto.conf</code> includes <code className="text-cyan-200">listener 1883</code> and <code className="text-cyan-200">allow_anonymous true</code>.
          </InfoCard>
          <InfoCard icon={Network} title="Sensor Not Detected">
            Verify 3.3V and GND wiring. Confirm ToF SDA/SCL connect to pins 21/22 and BH1750 SDA/SCL connect to pins 18/19. Check I2C pullup resistors if lines exceed 15 cm.
          </InfoCard>
        </div>
      </section>
    </PageFrame>
  )
}

export function RaspberryPiPage() {
  return (
    <PageFrame>
      <IoTPageHeader
        description="The Raspberry Pi runs your main.py MQTT-to-HTTP bridge: it connects to the local Mosquitto broker, subscribes to esp32/tof_light_soil_data, computes calibrated soil moisture percentages, logs readings into SQLite (sensor_readings.sqlite3), and serves REST endpoints for Expo Go."
        eyebrow="EDGE SERVER &amp; MQTT BRIDGE"
        title="Raspberry Pi: main.py Bridge &amp; API"
      />

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        <InfoCard icon={Network} title="paho-mqtt v2 Bridge">
          Subscribes to <code className="text-cyan-200 font-mono">esp32/tof_light_soil_data</code> and <code className="text-cyan-200 font-mono">esp32/tof_light_soil_status</code> with automatic reconnect backoff and thread-safe ingestion.
        </InfoCard>
        <InfoCard icon={CheckCircle2} title="Calibrated Moisture Math">
          Transforms raw 12-bit ADC values (GPIO 34) into soil moisture percentages based on empirical dry (2527) and wet (1237) calibration constants.
        </InfoCard>
        <InfoCard icon={Database} title="SQLite Telemetry Table">
          Persists records to <code className="text-cyan-200 font-mono">readings</code> table: UTC timestamp, <code className="text-cyan-200 font-mono">tof_distance_mm</code>, <code className="text-cyan-200 font-mono">light_lux</code>, <code className="text-cyan-200 font-mono">soil_raw</code>, <code className="text-cyan-200 font-mono">soil_moisture_percent</code>, and <code className="text-cyan-200 font-mono">rssi</code>.
        </InfoCard>
      </div>

      <section className="mt-10 rounded-2xl border border-white/10 bg-[#091524] p-6 lg:p-8 shadow-xl">
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
          <div>
            <h2 className="text-xl font-bold text-white">Edge Deployment Command Flow</h2>
            <p className="mt-1 text-xs text-slate-400">
              Set up virtualenv, install dependencies, and run your main.py FastAPI bridge on port 8080.
            </p>
          </div>
          <span className="font-mono text-xs text-cyan-300">BASH</span>
        </div>
        <pre className="mt-4 overflow-x-auto rounded-xl border border-white/10 bg-[#050c14] p-4 font-mono text-xs leading-relaxed text-cyan-200 sm:text-sm">
          <code>{`# 1. Ensure Mosquitto MQTT broker is active
sudo systemctl enable mosquitto --now

# 2. Setup Python environment and dependencies
python3 -m venv .venv
source .venv/bin/activate
pip install fastapi uvicorn paho-mqtt python-dotenv

# 3. Launch main.py on port 8080
uvicorn main:app --host 0.0.0.0 --port 8080 --reload`}</code>
        </pre>
        <p className="mt-3 text-xs leading-relaxed text-slate-400">
          Verify from any computer or mobile browser on your local network at
          <code className="mx-1 text-cyan-200 font-mono">http://&lt;PI_LAN_IP&gt;:8080/docs</code> to test <code className="text-cyan-200 font-mono">GET /api/readings/current</code> and <code className="text-cyan-200 font-mono">GET /api/health</code>.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-white">FastAPI + MQTT Bridge Reference Implementation (main.py)</h2>
        <div className="mt-4">
          <CodeExamples only={['fastapi']} />
        </div>
      </section>
    </PageFrame>
  )
}

export function ExpoGoPage() {
  return (
    <PageFrame>
      <IoTPageHeader
        description="Expo Go is the official development client that lets you run your React Native app instantly on a real iOS or Android device — no Xcode or Android Studio build required. In this project, the MyExpoApp React Native app connects to your Raspberry Pi FastAPI server over local Wi-Fi and streams live sensor telemetry directly to your phone screen."
        eyebrow="MOBILE CLIENT · EXPO GO"
        title="Expo Go: Mobile Telemetry Dashboard"
      />

      {/* What is Expo Go */}
      <section className="mt-8 rounded-2xl border border-cyan-500/20 bg-[#091524]/90 p-6 sm:p-8 backdrop-blur-xl shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
          <div>
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-cyan-300">
              WHAT IS EXPO GO?
            </span>
            <h2 className="text-xl font-bold text-white sm:text-2xl mt-1">
              The Expo Go Development Client
            </h2>
          </div>
          <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 font-mono text-xs text-cyan-300">
            React Native Runtime
          </span>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-slate-300 sm:text-sm">
          Expo Go is a free app published by Expo on the App Store and Google Play. It contains a pre-built React Native runtime environment with all the standard Expo SDK modules already compiled in. When you run <code className="text-cyan-300 font-mono">npx expo start</code> on your computer, a Metro bundler server starts and produces a JavaScript bundle from your source code. Expo Go on your phone downloads and executes that bundle instantly — without you needing to compile any native code yourself.
        </p>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 font-mono text-xs">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5">
            <span className="text-[10px] text-slate-400 uppercase block">Runtime Engine</span>
            <span className="font-bold text-cyan-300 text-sm mt-0.5 block">Hermes JS</span>
            <span className="text-[10px] text-slate-400 mt-1 block">Optimised bytecode VM</span>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5">
            <span className="text-[10px] text-slate-400 uppercase block">Platforms</span>
            <span className="font-bold text-emerald-400 text-sm mt-0.5 block">iOS + Android</span>
            <span className="text-[10px] text-slate-400 mt-1 block">Web via Metro</span>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5">
            <span className="text-[10px] text-slate-400 uppercase block">SDK Version</span>
            <span className="font-bold text-amber-300 text-sm mt-0.5 block">Expo SDK 58</span>
            <span className="text-[10px] text-slate-400 mt-1 block">React Native 0.88</span>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5">
            <span className="text-[10px] text-slate-400 uppercase block">Hot Reload</span>
            <span className="font-bold text-cyan-300 text-sm mt-0.5 block">Fast Refresh</span>
            <span className="text-[10px] text-slate-400 mt-1 block">Sub-second updates</span>
          </div>
        </div>
      </section>

      {/* How Expo Go Works */}
      <section className="mt-8 rounded-2xl border border-cyan-500/25 bg-gradient-to-br from-[#091827] to-[#071322] p-5 sm:p-7">
        <div className="flex items-center gap-2">
          <Smartphone aria-hidden="true" className="size-5 text-cyan-300" />
          <h2 className="text-xl font-bold text-white">How Expo Go works in this project</h2>
        </div>
        <p className="mt-3 text-sm leading-7 text-slate-300">
          Expo Go does not talk directly to the ESP32 or Raspberry Pi hardware. It runs your JavaScript app code, which makes standard HTTP <code className="text-cyan-200">fetch()</code> calls to the FastAPI REST server running on your Raspberry Pi. Your phone and the Pi must be on the same local Wi-Fi network for these requests to succeed.
        </p>
        <ol aria-label="Expo Go data flow" className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-stretch">
          {[
            { icon: Terminal, title: 'npx expo start', detail: 'Metro bundler compiles your TypeScript source on your computer' },
            { icon: Smartphone, title: 'QR Scan', detail: 'Expo Go on your phone fetches the JS bundle over local Wi-Fi' },
            { icon: Wifi, title: 'fetch() API call', detail: 'App polls GET /api/readings/current on the Pi every N seconds' },
            { icon: Server, title: 'FastAPI responds', detail: 'Pi returns live sensor JSON: ToF, lux, soil moisture, RSSI' },
            { icon: Layers, title: 'UI renders', detail: 'SensorCard components update with the latest telemetry values' },
          ].map(({ icon: Icon, title, detail }, index, arr) => (
            <li className="flex flex-1 items-center gap-2 sm:items-stretch" key={title}>
              <div className="flex flex-1 items-start gap-3 rounded-xl border border-white/[0.08] bg-[#06101c] p-3">
                <Icon aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-cyan-300" />
                <div>
                  <h3 className="text-xs font-bold text-white">{title}</h3>
                  <p className="mt-1 text-[11px] leading-relaxed text-slate-400">{detail}</p>
                </div>
              </div>
              {index < arr.length - 1 && (
                <>
                  <ArrowRight aria-hidden="true" className="hidden size-4 shrink-0 self-center text-cyan-500 sm:block" />
                  <Database aria-hidden="true" className="mx-auto size-4 shrink-0 text-cyan-500 sm:hidden" />
                </>
              )}
            </li>
          ))}
        </ol>
      </section>

      {/* Setup Guide */}
      <section className="mt-8 rounded-2xl border border-cyan-500/25 bg-[#091524] p-5 sm:p-7">
        <div className="flex items-center gap-2">
          <Terminal aria-hidden="true" className="size-5 text-cyan-400" />
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-cyan-300">SETUP GUIDE</p>
            <h2 className="text-xl font-bold text-white">How to set up Expo Go and MyExpoApp</h2>
          </div>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-slate-300">
          Follow these steps on your development machine (Windows, macOS, or Linux). Your mobile phone and the Raspberry Pi must both be on the same Wi-Fi network.
        </p>
        <ol className="mt-5 space-y-4">
          {[
            {
              step: '01',
              title: 'Install Expo Go on your phone',
              detail: 'Download the free Expo Go app from the Apple App Store (iOS) or Google Play (Android). No account is required for local LAN development.',
              code: null,
            },
            {
              step: '02',
              title: 'Install Node.js 20+ LTS on your computer',
              detail: 'Expo SDK 58 requires Node.js 20 or later. Verify your version before running any expo commands.',
              code: 'node --version   # must be v20 or higher\nnpm --version',
            },
            {
              step: '03',
              title: 'Open MyExpoApp and install dependencies',
              detail: 'Navigate to the MyExpoApp project folder and install packages with npm.',
              code: 'cd C:\\Users\\Dadivas\\Desktop\\cms-expo\\MyExpoApp\nnpm install',
            },
            {
              step: '04',
              title: 'Start the Metro bundler',
              detail: 'Run expo start. Metro compiles your TypeScript source, then prints a QR code in the terminal. Keep this terminal open while you test.',
              code: 'npx expo start',
            },
            {
              step: '05',
              title: 'Scan the QR code with your phone',
              detail: 'On Android, open the Expo Go app and tap "Scan QR code". On iOS, use the built-in Camera app — it detects the exp:// URL and opens Expo Go automatically.',
              code: null,
            },
            {
              step: '06',
              title: 'Enter your Raspberry Pi IP in the app Settings',
              detail: 'In the app, go to the Settings tab and enter your Raspberry Pi\'s LAN IP address (e.g. http://192.168.1.50) and port 8080. Tap "Test connection" to verify the FastAPI server is reachable.',
              code: null,
            },
          ].map(({ step, title, detail, code }) => (
            <li key={step} className="flex gap-4">
              <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-cyan-500/10 font-mono text-xs font-bold text-cyan-200 border border-cyan-500/20">
                {step}
              </span>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-white">{title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-300">{detail}</p>
                {code && (
                  <pre className="mt-3 overflow-x-auto rounded-xl border border-white/10 bg-[#050c14] p-4 font-mono text-xs leading-relaxed text-cyan-200">
                    <code>{code}</code>
                  </pre>
                )}
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* MyExpoApp Project Structure */}
      <section className="mt-8 rounded-2xl border border-white/10 bg-[#091524] p-5 sm:p-7">
        <div className="flex items-center gap-2">
          <Layers aria-hidden="true" className="size-5 text-cyan-400" />
          <h2 className="text-xl font-bold text-white">MyExpoApp project structure</h2>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-slate-300">
          The mobile app lives at <code className="text-cyan-200 font-mono">C:\Users\Dadivas\Desktop\cms-expo\MyExpoApp</code>. It uses Expo Router for file-based navigation and is written entirely in TypeScript.
        </p>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {[
            {
              path: 'src/app/index.tsx',
              label: 'Dashboard Screen',
              detail: 'Main screen. Polls /api/readings/current on an interval, renders SensorCard components for ToF distance, light lux, and soil moisture. Shows connection status and stale-data warnings.',
            },
            {
              path: 'src/app/settings.tsx',
              label: 'Settings Screen',
              detail: 'Lets you enter the Raspberry Pi IP, API port, refresh interval, and custom sensor thresholds (dry/wet ranges, lux limits, ToF min/max). Changes are saved for the app session.',
            },
            {
              path: 'src/app/analytics.tsx',
              label: 'Analytics Screen',
              detail: 'Displays trend charts for historical readings using the Trend component. Visualises up to 500 readings stored in the session.',
            },
            {
              path: 'src/app/history.tsx',
              label: 'History Screen',
              detail: 'Table view of past readings fetched from GET /api/readings. Allows scrolling through the full reading log stored in the Pi\'s SQLite database.',
            },
            {
              path: 'src/lib/sensors.ts',
              label: 'Sensor State Store',
              detail: 'Lightweight global store using useSyncExternalStore. Manages settings, current reading, records, loading state, errors, and connection status. fetchCurrent() calls the Pi API.',
            },
            {
              path: 'src/components/sensor-ui.tsx',
              label: 'UI Component Library',
              detail: 'Shared primitives: Page, Header, Panel, Button, SensorCard (with progress bar), and Trend (interactive touch chart). All styled with StyleSheet and the project colour palette.',
            },
          ].map(({ path, label, detail }) => (
            <article key={path} className="rounded-xl border border-white/[0.08] bg-[#06101c] p-4">
              <h3 className="break-all font-mono text-xs font-bold text-cyan-200">{path}</h3>
              <p className="mt-1 text-[11px] font-semibold text-white">{label}</p>
              <p className="mt-2 text-xs leading-relaxed text-slate-300">{detail}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Key App Concepts */}
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <InfoCard icon={Smartphone} title="Dev Client vs Standalone APK/IPA">
          Expo Go runs your JS bundle live. For a standalone app that does not need Expo Go, use <code className="text-cyan-300 font-mono">eas build</code> to compile a native iOS <code className="text-cyan-300 font-mono">.ipa</code> or Android <code className="text-cyan-300 font-mono">.apk</code>.
        </InfoCard>
        <InfoCard icon={Wifi} title="LAN Addressing — Never Use localhost">
          On a phone, <code className="text-cyan-300 font-mono">localhost</code> refers to the phone itself, not your PC or Raspberry Pi. Always enter the Pi&apos;s LAN IP (e.g. <code className="text-cyan-300 font-mono">192.168.1.50</code>) in the Settings screen.
        </InfoCard>
        <InfoCard icon={Network} title="Stale Timestamp Watchdog">
          The app tracks the last received timestamp. If no new reading arrives within three refresh intervals, the Dashboard shows a <strong className="text-amber-300">STALE DATA</strong> warning so you know the Raspberry Pi or network may be offline.
        </InfoCard>
      </div>

      {/* API Contract */}
      <section className="mt-8 rounded-2xl border border-white/10 bg-[#091524] p-5 sm:p-7">
        <div className="flex items-center gap-2">
          <Network aria-hidden="true" className="size-5 text-cyan-400" />
          <h2 className="text-xl font-bold text-white">API contract between the app and Raspberry Pi</h2>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-slate-300">
          The app communicates with the FastAPI server on your Raspberry Pi using plain HTTP GET requests. Both endpoints are unauthenticated and read-only — Expo Go never writes data to the Pi.
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {[
            {
              method: 'GET',
              endpoint: '/api/readings/current',
              purpose: 'Returns the single most recent sensor reading as JSON. The Dashboard screen polls this every N seconds (configurable in Settings, minimum 5 s).',
              example: '{"reading":{"timestamp":"2026-10-25T08:30:22Z","tof_distance_mm":247,"light_lux":31.67,"soil_moisture_percent":23.4,"rssi":-47}}',
            },
            {
              method: 'GET',
              endpoint: '/api/readings?limit=500',
              purpose: 'Returns up to 500 historical readings in descending order. The History and Analytics screens consume this to show trends and logs.',
              example: '{"readings":[{"timestamp":"...","tof_distance_mm":247,...},{"timestamp":"...",..."rssi":-52}]}',
            },
          ].map((item) => (
            <article className="rounded-xl border border-white/[0.08] bg-[#06101c] p-4" key={item.endpoint}>
              <div className="flex items-center gap-2">
                <span className="rounded bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-300 border border-emerald-500/20">{item.method}</span>
                <h3 className="break-all font-mono text-xs font-bold text-cyan-200">{item.endpoint}</h3>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-slate-300">{item.purpose}</p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-black/30 p-3 font-mono text-[11px] text-emerald-200">
                <code>{item.example}</code>
              </pre>
            </article>
          ))}
        </div>
        <p className="mt-4 text-xs leading-relaxed text-slate-400">
          The expected JSON fields are <code className="text-cyan-200 font-mono">timestamp</code> (ISO 8601), <code className="text-cyan-200 font-mono">tof_distance_mm</code>, <code className="text-cyan-200 font-mono">light_lux</code>, <code className="text-cyan-200 font-mono">soil_moisture_percent</code>, and <code className="text-cyan-200 font-mono">rssi</code>. Missing fields are handled gracefully — the sensor card shows a dash instead of a value.
        </p>
      </section>

      {/* Diagnostics */}
      <section className="mt-8">
        <h2 className="text-xl font-bold text-white">Diagnostics &amp; Common Issues</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <InfoCard icon={Wifi} title="App shows DISCONNECTED">
            Check that your phone and Raspberry Pi are on the same Wi-Fi network. In the Settings screen, confirm the IP and port match the output of <code className="text-cyan-200 font-mono">hostname -I</code> on the Pi. The Pi FastAPI server must be running (<code className="text-cyan-200 font-mono">uvicorn main:app --host 0.0.0.0 --port 8080</code>).
          </InfoCard>
          <InfoCard icon={Network} title="App shows STALE DATA">
            The Pi is reachable but readings have stopped updating. Check that the ESP32 is powered on and the MQTT broker (Mosquitto) is active on the Pi. The ESP32 publishes new data every 5 seconds; if the SQLite table stops growing the bridge process (<code className="text-cyan-200 font-mono">main.py</code>) may have crashed.
          </InfoCard>
          <InfoCard icon={Smartphone} title="QR code does not open Expo Go">
            Ensure Expo Go is installed. On Android, open Expo Go first and use the in-app scanner. On iOS, use the default Camera app — it recognises the <code className="text-cyan-200 font-mono">exp://</code> link. If Metro is behind a VPN or proxy, disable it temporarily.
          </InfoCard>
          <InfoCard icon={Terminal} title="Metro bundler crashes on start">
            Delete <code className="text-cyan-200 font-mono">node_modules</code> and re-run <code className="text-cyan-200 font-mono">npm install</code>. Clear the Metro cache with <code className="text-cyan-200 font-mono">npx expo start --clear</code>. Ensure your Node.js version is 20 or higher with <code className="text-cyan-200 font-mono">node --version</code>.
          </InfoCard>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-white">Expo Go Dashboard Reference Implementation</h2>
        <p className="mt-2 text-sm text-slate-400">The complete source for <code className="text-cyan-200 font-mono">src/app/index.tsx</code> in your MyExpoApp project.</p>
        <div className="mt-4">
          <CodeExamples only={['expo']} />
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-cyan-500/25 bg-[#091524] p-5 sm:p-7">
        <div className="border-b border-white/[0.08] pb-4">
          <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-cyan-300">
            APP WALKTHROUGH
          </p>
          <h2 className="mt-1 text-xl font-bold text-white">Expo Go Screens &amp; Demonstration</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">
            Explore the app&apos;s connection settings, saved readings, and sensor trends, then watch the
            mobile dashboard running in Expo Go.
          </p>
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              src: '/docs/expo-go-settings-screen.jpg',
              title: 'Connection and sensor settings',
              description:
                'Configure the Raspberry Pi API address, port, refresh interval, and sensor ranges; the screen also shows the connection test result.',
            },
            {
              src: '/docs/expo-go-history-screen.jpg',
              title: 'Reading history',
              description:
                'Review timestamped ToF, light, and soil readings, search the history, or export the records as CSV.',
            },
            {
              src: '/docs/expo-go-analytics-screen.jpg',
              title: 'Sensor analytics',
              description:
                'View historical sensor trends and summary statistics for the collected light and soil measurements.',
            },
          ].map((screen) => (
            <figure
              className="overflow-hidden rounded-xl border border-white/10 bg-[#06101c]"
              key={screen.src}
            >
              <a
                aria-label={`Open full-size image: ${screen.title}`}
                className="block"
                href={screen.src}
                rel="noreferrer"
                target="_blank"
              >
                <div className="relative aspect-[720/1612] bg-black/40">
                  <Image
                    alt={screen.title}
                    className="object-contain"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    src={screen.src}
                  />
                </div>
              </a>
              <figcaption className="border-t border-white/[0.08] p-4">
                <h3 className="text-sm font-bold text-white">{screen.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-300">
                  {screen.description}
                </p>
              </figcaption>
            </figure>
          ))}

          <figure className="overflow-hidden rounded-xl border border-white/10 bg-[#06101c]">
            <video
              aria-label="Expo Go mobile app demonstration"
              className="aspect-[720/1612] w-full bg-black object-contain"
              controls
              playsInline
              poster="/docs/expo-go-mobile-dashboard-screenshot.jpg"
              preload="metadata"
              src="/docs/expo-go-app-demo.mp4"
            >
              Your browser does not support embedded video.
            </video>
            <figcaption className="border-t border-white/[0.08] p-4">
              <h3 className="text-sm font-bold text-white">Expo Go live app demonstration</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-300">
                Watch the mobile client display sensor readings from the Raspberry Pi API.
              </p>
            </figcaption>
          </figure>
        </div>
      </section>
    </PageFrame>
  )
}

export { ResultsPage } from './ResultsPage'

export function FastApiPage() {
  return (
    <PageFrame>
      <IoTPageHeader
        description="FastAPI is the Python ASGI web framework running on your Raspberry Pi. It acts as the critical bridge between the MQTT message stream (from the ESP32 via Mosquitto) and the HTTP REST API that your Expo Go mobile app polls for live sensor data. Without FastAPI, the phone has no way to access the sensor readings stored in SQLite."
        eyebrow="API SERVER · RASPBERRY PI"
        title="FastAPI: The MQTT-to-Mobile Bridge"
      />

      {/* What FastAPI is */}
      <section className="mt-8 rounded-2xl border border-cyan-500/20 bg-[#091524]/90 p-6 sm:p-8 backdrop-blur-xl shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
          <div>
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-cyan-300">
              WHAT IS FASTAPI?
            </span>
            <h2 className="text-xl font-bold text-white sm:text-2xl mt-1">
              Modern async Python REST framework
            </h2>
          </div>
          <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 font-mono text-xs text-cyan-300">
            ASGI · Uvicorn
          </span>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-slate-300 sm:text-sm">
          FastAPI is an open-source Python web framework designed for building HTTP APIs with very high performance (on par with Node.js and Go). It is built on top of <code className="text-cyan-300 font-mono">Starlette</code> for the ASGI runtime and <code className="text-cyan-300 font-mono">Pydantic</code> for automatic data validation. In this project, FastAPI runs on the Raspberry Pi served by <code className="text-cyan-300 font-mono">Uvicorn</code> — a lightweight ASGI server — and exposes the sensor reading endpoints that the Expo Go app fetches on every poll interval.
        </p>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 font-mono text-xs">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5">
            <span className="text-[10px] text-slate-400 uppercase block">Framework</span>
            <span className="font-bold text-cyan-300 text-sm mt-0.5 block">FastAPI</span>
            <span className="text-[10px] text-slate-400 mt-1 block">Python 3.9+</span>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5">
            <span className="text-[10px] text-slate-400 uppercase block">ASGI Server</span>
            <span className="font-bold text-emerald-400 text-sm mt-0.5 block">Uvicorn</span>
            <span className="text-[10px] text-slate-400 mt-1 block">Port 8080</span>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5">
            <span className="text-[10px] text-slate-400 uppercase block">MQTT Client</span>
            <span className="font-bold text-amber-300 text-sm mt-0.5 block">paho-mqtt v2</span>
            <span className="text-[10px] text-slate-400 mt-1 block">CallbackAPI V2</span>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5">
            <span className="text-[10px] text-slate-400 uppercase block">Storage</span>
            <span className="font-bold text-cyan-300 text-sm mt-0.5 block">SQLite 3</span>
            <span className="text-[10px] text-slate-400 mt-1 block">sensor_readings.db</span>
          </div>
        </div>
      </section>

      {/* How it connects Raspi → Expo Go */}
      <section className="mt-8 rounded-2xl border border-cyan-500/25 bg-gradient-to-br from-[#091827] to-[#071322] p-5 sm:p-7">
        <div className="flex items-center gap-2">
          <Zap aria-hidden="true" className="size-5 text-cyan-300" />
          <h2 className="text-xl font-bold text-white">How FastAPI connects the Raspberry Pi to Expo Go</h2>
        </div>
        <p className="mt-3 text-sm leading-7 text-slate-300">
          FastAPI runs two parallel systems inside a single <code className="text-cyan-200 font-mono">main.py</code> process. A background <strong className="text-white">paho-mqtt thread</strong> subscribes to Mosquitto and writes every incoming ESP32 reading to SQLite. The <strong className="text-white">Uvicorn HTTP server</strong> simultaneously accepts REST requests from Expo Go and reads those rows back out of SQLite. The two sides share the database — the MQTT side writes, the HTTP side reads.
        </p>
        <ol aria-label="FastAPI bridge flow" className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-stretch">
          {[
            { icon: Cpu, title: 'ESP32 publishes', detail: 'Sends JSON to esp32/tof_light_soil_data every 5 s via Mosquitto on port 1883' },
            { icon: Radio, title: 'paho-mqtt receives', detail: 'on_message() fires in a daemon thread — validates and stores the payload' },
            { icon: Database, title: 'SQLite write', detail: 'INSERT into the readings table: tof_distance_mm, light_lux, soil_moisture_percent, rssi' },
            { icon: Zap, title: 'FastAPI serves', detail: 'GET /api/readings/current reads the latest row and returns JSON over HTTP' },
            { icon: Smartphone, title: 'Expo Go displays', detail: 'fetch() in the app receives the JSON and renders live SensorCard values' },
          ].map(({ icon: Icon, title, detail }, index, arr) => (
            <li className="flex flex-1 items-center gap-2 sm:items-stretch" key={title}>
              <div className="flex flex-1 items-start gap-3 rounded-xl border border-white/[0.08] bg-[#06101c] p-3">
                <Icon aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-cyan-300" />
                <div>
                  <h3 className="text-xs font-bold text-white">{title}</h3>
                  <p className="mt-1 text-[11px] leading-relaxed text-slate-400">{detail}</p>
                </div>
              </div>
              {index < arr.length - 1 && (
                <ArrowRight aria-hidden="true" className="hidden size-4 shrink-0 self-center text-cyan-500 sm:block" />
              )}
            </li>
          ))}
        </ol>
      </section>

      {/* The three REST endpoints */}
      <section className="mt-8 rounded-2xl border border-white/10 bg-[#091524] p-5 sm:p-7">
        <div className="flex items-center gap-2">
          <Network aria-hidden="true" className="size-5 text-cyan-400" />
          <h2 className="text-xl font-bold text-white">REST endpoints Expo Go uses</h2>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-slate-300">
          The Expo Go app only ever makes <code className="text-cyan-200 font-mono">GET</code> requests — it never writes to the Pi. All three endpoints are served on port <code className="text-cyan-200 font-mono">8080</code> bound to <code className="text-cyan-200 font-mono">0.0.0.0</code> so any device on the local network can reach them.
        </p>
        <div className="mt-4 space-y-3">
          {[
            {
              method: 'GET',
              endpoint: '/api/readings/current',
              alias: '/api/readings/latest',
              purpose: 'Returns the single most recently stored row from the readings table. The Expo Go Dashboard screen polls this every N seconds (configurable in Settings). This is the primary live-data endpoint.',
              example: '{"reading":{"timestamp":"2026-10-25T08:30:22Z","tof_distance_mm":247.0,"light_lux":31.67,"soil_moisture_percent":23.4,"rssi":-47}}',
              color: 'emerald',
            },
            {
              method: 'GET',
              endpoint: '/api/readings?limit=500',
              alias: null,
              purpose: 'Returns up to 500 historical readings in descending order. Used by the Expo Go History and Analytics screens to draw trend charts and the reading log table.',
              example: '{"readings":[{"timestamp":"2026-10-25T08:30:22Z","tof_distance_mm":247.0,...},{"timestamp":"...","rssi":-52}]}',
              color: 'emerald',
            },
            {
              method: 'GET',
              endpoint: '/api/health',
              alias: null,
              purpose: 'Health check — shows whether the MQTT connection to Mosquitto is active, the broker address, both topic names, the last received MQTT message timestamp, and the total number of stored readings.',
              example: '{"status":"ok","mqtt_connected":true,"mqtt_broker":"127.0.0.1:1883","stored_readings":1284}',
              color: 'sky',
            },
          ].map((item) => (
            <article className="rounded-xl border border-white/[0.08] bg-[#06101c] p-4" key={item.endpoint}>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-300 border border-emerald-500/20">{item.method}</span>
                <h3 className="break-all font-mono text-xs font-bold text-cyan-200">{item.endpoint}</h3>
                {item.alias && (
                  <span className="font-mono text-[10px] text-slate-500">alias: {item.alias}</span>
                )}
              </div>
              <p className="mt-2 text-xs leading-relaxed text-slate-300">{item.purpose}</p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-black/30 p-3 font-mono text-[11px] text-emerald-200">
                <code>{item.example}</code>
              </pre>
            </article>
          ))}
        </div>
        <p className="mt-4 text-xs leading-relaxed text-slate-400">
          CORS is configured to allow all origins (<code className="text-cyan-200 font-mono">allow_origins=["*"]</code>) by default so Expo Go can reach the API from any phone IP. Tighten this in production by setting the <code className="text-cyan-200 font-mono">CORS_ORIGINS</code> environment variable in <code className="text-cyan-200 font-mono">.env</code>.
        </p>
      </section>

      {/* What FastAPI does inside main.py */}
      <section className="mt-8 rounded-2xl border border-cyan-500/25 bg-[#091524] p-5 sm:p-7">
        <div className="flex items-center gap-2">
          <Terminal aria-hidden="true" className="size-5 text-cyan-400" />
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-cyan-300">INSIDE MAIN.PY</p>
            <h2 className="text-xl font-bold text-white">What FastAPI does step by step</h2>
          </div>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-slate-300">
          The entire bridge lives in a single file — <code className="text-cyan-200 font-mono">main.py</code> — on the Raspberry Pi. Here is what happens from startup to the moment your phone receives a reading.
        </p>
        <ol className="mt-5 space-y-4">
          {[
            {
              step: '01',
              title: 'Startup: database and MQTT client initialised',
              detail: 'FastAPI\'s lifespan hook runs first. It calls initialize_db() to create the readings table in SQLite if it does not exist, then builds a paho-mqtt client with CallbackAPIVersion.VERSION2, registers the on_connect, on_disconnect, and on_message callbacks, and calls connect_async() so the MQTT connection starts in a background thread without blocking the HTTP server.',
            },
            {
              step: '02',
              title: 'MQTT: on_connect() subscribes to both topics',
              detail: 'When Mosquitto accepts the connection, on_connect() fires. It subscribes to esp32/tof_light_soil_data (QoS 0, sensor readings) and esp32/tof_light_soil_status (QoS 1, online/offline Last Will). Any future reconnects automatically re-subscribe via reconnect_delay_set().',
            },
            {
              step: '03',
              title: 'MQTT: on_message() validates and stores each reading',
              detail: 'Every five seconds the ESP32 publishes a JSON payload. on_message() decodes it, extracts tof_mm, lux, soil_raw, and rssi, runs finite_number() to reject NaN or negative values, converts the raw ADC soil value to a moisture percentage using the calibration constants SOIL_DRY_RAW=2527 and SOIL_WET_RAW=1237, then writes one row to the SQLite readings table with a UTC ISO 8601 timestamp.',
            },
            {
              step: '04',
              title: 'HTTP: GET /api/readings/current is called by Expo Go',
              detail: 'Expo Go\'s useSensors() hook calls fetchCurrent() on every poll interval. FastAPI\'s current_reading() handler opens the SQLite database, runs SELECT * FROM readings ORDER BY id DESC LIMIT 1, and wraps the row in {"reading": {...}}. The entire round-trip from phone request to JSON response is typically under 20 ms on a local network.',
            },
            {
              step: '05',
              title: 'HTTP: GET /api/readings returns history',
              detail: 'The Expo Go History and Analytics screens call this endpoint. reading_history() accepts a limit query parameter (default 500, max 5000) and returns an array of readings ordered newest-first. The Trend chart and history list are built entirely from this response.',
            },
            {
              step: '06',
              title: 'Shutdown: MQTT loop stopped cleanly',
              detail: 'When Uvicorn exits, the FastAPI lifespan context manager calls loop_stop() then disconnect() on the paho client, ensuring Mosquitto receives a clean DISCONNECT packet and publishes the retained "offline" Last Will to the status topic.',
            },
          ].map(({ step, title, detail }) => (
            <li key={step} className="flex gap-4">
              <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-cyan-500/10 font-mono text-xs font-bold text-cyan-200 border border-cyan-500/20 mt-0.5">
                {step}
              </span>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-white">{title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-300">{detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Key concept cards */}
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <InfoCard icon={Zap} title="Why FastAPI instead of Flask?">
          FastAPI is async-native. The paho-mqtt background thread and Uvicorn HTTP handlers run concurrently without blocking each other. Flask would require a thread-per-request model that does not compose as cleanly with a long-running MQTT loop.
        </InfoCard>
        <InfoCard icon={Database} title="SQLite as the shared memory">
          SQLite acts as the hand-off point between the MQTT subscriber thread and the HTTP request handlers. A threading.Lock() wraps every INSERT to prevent race conditions when the ESP32 publishes faster than the default 5-second interval.
        </InfoCard>
        <InfoCard icon={ShieldCheck} title="Soil moisture calibration">
          Raw ADC values from the ESP32 (0–4095) are converted to a 0–100% moisture percentage using two empirical calibration constants: <code className="text-cyan-300 font-mono">SOIL_DRY_RAW=2527</code> (air reading) and <code className="text-cyan-300 font-mono">SOIL_WET_RAW=1237</code> (submerged reading). These are clamped to [0, 100].
        </InfoCard>
      </div>

      {/* How to run FastAPI on the Pi */}
      <section className="mt-8 rounded-2xl border border-white/10 bg-[#091524] p-5 sm:p-7">
        <div className="flex items-center gap-2">
          <Server aria-hidden="true" className="size-5 text-cyan-400" />
          <h2 className="text-xl font-bold text-white">Running FastAPI on the Raspberry Pi</h2>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-slate-300">
          Install dependencies inside a Python virtual environment, then start Uvicorn. Keep the terminal open (or use <code className="text-cyan-200 font-mono">systemd</code> / <code className="text-cyan-200 font-mono">tmux</code> for a persistent session).
        </p>
        <pre className="mt-5 overflow-x-auto rounded-xl border border-white/10 bg-[#050c14] p-4 font-mono text-xs leading-relaxed text-cyan-200 sm:text-sm">
          <code>{`# 1. Create and activate a virtual environment
python3 -m venv .venv
source .venv/bin/activate

# 2. Install FastAPI and all bridge dependencies
pip install fastapi uvicorn paho-mqtt python-dotenv

# 3. Start the server — bound to all interfaces so Expo Go can reach it
uvicorn main:app --host 0.0.0.0 --port 8080 --reload

# 4. Verify in a browser or from any device on the network
# http://<PI_LAN_IP>:8080/docs          ← Swagger UI
# http://<PI_LAN_IP>:8080/api/health    ← MQTT connection status
# http://<PI_LAN_IP>:8080/api/readings/current`}</code>
        </pre>
        <p className="mt-3 text-xs leading-relaxed text-slate-400">
          The <code className="text-cyan-200 font-mono">--reload</code> flag restarts Uvicorn automatically when you edit <code className="text-cyan-200 font-mono">main.py</code>. Remove it for a stable production deployment. Use <code className="text-cyan-200 font-mono">hostname -I</code> on the Pi to find its LAN IP address.
        </p>
      </section>

      {/* Environment variables */}
      <section className="mt-8 rounded-2xl border border-white/10 bg-[#091524] p-5 sm:p-7">
        <div className="flex items-center gap-2">
          <Layers aria-hidden="true" className="size-5 text-cyan-400" />
          <h2 className="text-xl font-bold text-white">Environment variables (.env)</h2>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-slate-300">
          Create a <code className="text-cyan-200 font-mono">.env</code> file next to <code className="text-cyan-200 font-mono">main.py</code>. FastAPI reads these at startup via <code className="text-cyan-200 font-mono">python-dotenv</code>.
        </p>
        <div className="mt-4 overflow-x-auto rounded-xl border border-white/10 bg-[#050c14]">
          <table className="w-full text-xs font-mono">
            <thead>
              <tr className="border-b border-white/[0.08]">
                <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-cyan-300">Variable</th>
                <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-cyan-300">Default</th>
                <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-cyan-300">Purpose</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              {[
                ['MQTT_HOST', '127.0.0.1', 'Mosquitto broker address (localhost on the Pi)'],
                ['MQTT_PORT', '1883', 'Mosquitto port — must match ESP32 firmware'],
                ['MQTT_USER', '(empty)', 'Broker username — leave empty for anonymous'],
                ['MQTT_PASSWORD', '(empty)', 'Broker password — required if USER is set'],
                ['MQTT_DATA_TOPIC', 'esp32/tof_light_soil_data', 'Sensor readings topic from the ESP32'],
                ['MQTT_STATUS_TOPIC', 'esp32/tof_light_soil_status', 'ESP32 online/offline Last Will topic'],
                ['SENSOR_DB_PATH', 'sensor_readings.sqlite3', 'Path to the SQLite database file'],
                ['SOIL_DRY_RAW', '2527', 'ADC reading in air (0% moisture calibration)'],
                ['SOIL_WET_RAW', '1237', 'ADC reading submerged (100% moisture calibration)'],
                ['CORS_ORIGINS', '*', 'Comma-separated allowed origins for the HTTP API'],
              ].map(([variable, defaultVal, purpose]) => (
                <tr key={variable} className="hover:bg-white/[0.03]">
                  <td className="px-4 py-2.5 text-cyan-200">{variable}</td>
                  <td className="px-4 py-2.5 text-amber-300">{defaultVal}</td>
                  <td className="px-4 py-2.5 text-slate-400">{purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Diagnostics */}
      <section className="mt-8">
        <h2 className="text-xl font-bold text-white">Diagnostics &amp; Common Issues</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <InfoCard icon={Wifi} title="Expo Go shows DISCONNECTED">
            Confirm the FastAPI server is running with <code className="text-cyan-200 font-mono">uvicorn main:app --host 0.0.0.0 --port 8080</code>. Check that you entered the Pi&apos;s LAN IP (not <code className="text-cyan-200 font-mono">localhost</code>) in Expo Go Settings. Test from any browser on the same network: <code className="text-cyan-200 font-mono">http://&lt;PI_IP&gt;:8080/api/health</code>.
          </InfoCard>
          <InfoCard icon={Radio} title="mqtt_connected: false in /api/health">
            Mosquitto is likely not running. On the Pi run <code className="text-cyan-200 font-mono">sudo systemctl status mosquitto</code>. If it is inactive, start it with <code className="text-cyan-200 font-mono">sudo systemctl enable --now mosquitto</code>. Also verify the MQTT_HOST and MQTT_PORT in your <code className="text-cyan-200 font-mono">.env</code> match the broker configuration.
          </InfoCard>
          <InfoCard icon={Database} title="stored_readings stays at 0">
            The MQTT connection is up but no readings are being stored. Verify the ESP32 is powered on and publishing. Subscribe on the Pi to check: <code className="text-cyan-200 font-mono">mosquitto_sub -h 127.0.0.1 -t esp32/tof_light_soil_data -v</code>. If messages appear there but not in SQLite, check main.py logs for validation errors.
          </InfoCard>
          <InfoCard icon={CheckCircle2} title="readings/current returns null">
            <code className="text-cyan-200 font-mono">{`{"reading": null}`}</code> means the readings table exists but is empty — no data has been stored yet. Wait for the ESP32 to publish at least one reading, or send a test payload with <code className="text-cyan-200 font-mono">mosquitto_pub</code> to verify the pipeline.
          </InfoCard>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-white">FastAPI Bridge Reference Implementation (main.py)</h2>
        <p className="mt-2 text-sm text-slate-400">
          The complete <code className="text-cyan-200 font-mono">main.py</code> source — copy it to your Raspberry Pi and run with Uvicorn.
        </p>
        <div className="mt-4">
          <CodeExamples only={['fastapi']} />
        </div>
      </section>

    </PageFrame>
  )
}
