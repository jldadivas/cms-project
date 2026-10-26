import Link from 'next/link'
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
        description="The ESP32 bridges physical sensors to the local network. It manages dual TwoWire I2C buses for VL53L0X and BH1750, samples analog soil moisture on ADC1, and publishes JSON packets to the Raspberry Pi MQTT broker."
        eyebrow="MICROCONTROLLER"
        title="ESP32: ToF, Light, Soil &amp; MQTT"
      />

      <div className="mt-10 grid gap-4 md:grid-cols-3">
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
        description="Expo Go previews a React Native app during development. Your app uses fetch or a WebSocket to connect to the Raspberry Pi API; the phone must be able to reach the Pi."
        eyebrow="MOBILE CLIENT"
        title="Build and test with Expo Go"
      />

      <ol className="mt-10 grid gap-4 md:grid-cols-2">
        {[
          ['Install Development Client', 'Install Node.js 20+ LTS and the official Expo Go app from App Store or Google Play.'],
          ['Create Expo Workspace', 'Run npx create-expo-app@latest and configure TypeScript templates.'],
          ['Launch Preview Server', 'Run npx expo start and scan the generated terminal QR code with your phone camera.'],
          ['Point to Pi Edge IP', 'Define EXPO_PUBLIC_API_BASE_URL=http://<PI_LAN_IP>:8000 in your .env file.'],
        ].map(([title, detail], index) => (
          <li className="glass-card rounded-2xl p-6" key={title}>
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-cyan-300">PHASE 0{index + 1}</span>
              <span className="size-2 rounded-full bg-cyan-400 animate-pulse" />
            </div>
            <h2 className="mt-3 text-base font-bold text-white">{title}</h2>
            <p className="mt-2 text-xs leading-relaxed text-slate-300 sm:text-sm">{detail}</p>
          </li>
        ))}
      </ol>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <InfoCard icon={Smartphone} title="Dev Client vs Standalone Production APK/IPA">
          Expo Go executes your bundle over hot module reloading. For production deployments, EAS Build compiles standalone iOS and Android binaries that do not require Expo Go.
        </InfoCard>
        <InfoCard icon={Wifi} title="LAN Addressing Notice">
          Mobile devices resolve localhost to the phone loopback interface. Always supply the host Raspberry Pi LAN IP address.
        </InfoCard>
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-white">Expo Go Dashboard Reference Implementation</h2>
        <div className="mt-4">
          <CodeExamples only={['expo']} />
        </div>
      </section>
    </PageFrame>
  )
}

export { ResultsPage } from './ResultsPage'
