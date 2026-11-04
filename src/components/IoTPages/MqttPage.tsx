import Link from 'next/link'
import {
  ArrowDown,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Network,
  Radio,
  Server,
  ShieldCheck,
  Smartphone,
  Terminal,
} from 'lucide-react'
import { InteractiveCodeBlock } from '@/components/ESP32Learning/InteractiveCodeBlock'
import { IoTPageHeader } from '@/components/IoTPageHeader'

const flow = [
  { icon: Cpu, title: 'ESP32 sensors', detail: 'VL53L0X, BH1750, and soil probe readings' },
  { icon: Radio, title: 'MQTT publisher', detail: 'Publishes a small JSON message every 5 seconds' },
  { icon: Server, title: 'Mosquitto broker', detail: 'Routes messages by topic on the Raspberry Pi' },
  { icon: Network, title: 'Python subscriber', detail: 'main.py validates readings and saves them to SQLite' },
  { icon: Smartphone, title: 'FastAPI → Expo Go', detail: 'HTTP endpoints serve current and historical data' },
]

const projectTopics = [
  {
    topic: 'esp32/tof_light_soil_data',
    purpose: 'Sensor measurements published by the ESP32 and subscribed to by the Pi backend.',
    example: '{"tof_mm":148,"tof_cm":14.8,"lux":420.5,"soil_raw":1840,"rssi":-64}',
  },
  {
    topic: 'esp32/tof_light_soil_status',
    purpose: 'ESP32 connection status. The retained Last Will publishes offline after an unexpected disconnect.',
    example: 'online',
  },
]

export function MqttPage() {
  return (
    <main className="min-h-[75vh] bg-[#07121f] px-5 py-10 text-[#e6f0fa] bg-tech-grid sm:px-8 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <IoTPageHeader
          description="See why this project uses MQTT, how the ESP32 sensor node sends readings to Mosquitto on the Raspberry Pi, and how to set up, secure, test, and troubleshoot the message path."
          eyebrow="TECHNOLOGY GUIDE · MQTT"
          title="MQTT in the Raspberry Pi IoT Project"
        />

        <section className="mt-8 rounded-2xl border border-cyan-500/25 bg-gradient-to-br from-[#091827] to-[#071322] p-5 sm:p-7">
          <div className="flex items-center gap-2">
            <Radio aria-hidden="true" className="size-5 text-cyan-300" />
            <h2 className="text-xl font-bold text-white">What MQTT does in this project</h2>
          </div>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            MQTT is a lightweight messaging protocol. Instead of making a new HTTP request for every
            sensor update, the ESP32 keeps a connection to Mosquitto and publishes a small message
            on a named topic. The Raspberry Pi backend subscribes to that topic. Mosquitto forwards
            each message to the subscriber, and <code className="text-cyan-200">main.py</code>{' '}
            validates the sensor values, calculates soil moisture, and stores the reading in
            <code className="text-cyan-200"> sensor_readings.sqlite3</code>. FastAPI then makes
            readings available to Expo Go over HTTP.
          </p>
          <div className="mt-5">
            <ol aria-label="Project MQTT data flow" className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
              {flow.map(({ icon: Icon, title, detail }, index) => (
                <li className="flex flex-1 items-center gap-2 sm:items-stretch" key={title}>
                  <div className="flex flex-1 items-start gap-3 rounded-xl border border-white/[0.08] bg-[#06101c] p-3">
                    <Icon aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-cyan-300" />
                    <div>
                      <h3 className="text-xs font-bold text-white">{title}</h3>
                      <p className="mt-1 text-[11px] leading-relaxed text-slate-400">{detail}</p>
                    </div>
                  </div>
                  {index < flow.length - 1 && (
                    <>
                      <ArrowRight aria-hidden="true" className="hidden size-4 shrink-0 self-center text-cyan-500 sm:block" />
                      <ArrowDown aria-hidden="true" className="mx-auto size-4 shrink-0 text-cyan-500 sm:hidden" />
                    </>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-3">
          <article className="glass-card rounded-2xl p-5">
            <h2 className="text-sm font-bold text-cyan-200">Publisher</h2>
            <p className="mt-2 text-xs leading-relaxed text-slate-300">
              The ESP32 publishes sensor JSON. It does not need to know whether the Python backend
              or a test tool is listening.
            </p>
          </article>
          <article className="glass-card rounded-2xl p-5">
            <h2 className="text-sm font-bold text-cyan-200">Broker</h2>
            <p className="mt-2 text-xs leading-relaxed text-slate-300">
              Mosquitto runs on the Pi and routes messages to clients that subscribed to matching
              topics. This project uses the standard MQTT port 1883 on the local network.
            </p>
          </article>
          <article className="glass-card rounded-2xl p-5">
            <h2 className="text-sm font-bold text-cyan-200">Subscriber</h2>
            <p className="mt-2 text-xs leading-relaxed text-slate-300">
              The Python MQTT client in main.py subscribes to sensor and status topics, then
              processes incoming messages independently of Expo Go.
            </p>
          </article>
        </section>

        <section className="mt-8 rounded-2xl border border-white/10 bg-[#091524] p-5 sm:p-7">
          <div className="flex items-center gap-2">
            <Network aria-hidden="true" className="size-5 text-cyan-400" />
            <h2 className="text-xl font-bold text-white">Topics and messages used by the project</h2>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">
            A topic is a case-sensitive label used for routing. The JSON payload is the message
            content. Both the publisher and subscriber need to use the same topic name.
          </p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {projectTopics.map((item) => (
              <article className="rounded-xl border border-white/[0.08] bg-[#06101c] p-4" key={item.topic}>
                <h3 className="break-all font-mono text-xs font-bold text-cyan-200">{item.topic}</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-300">{item.purpose}</p>
                <pre className="mt-3 overflow-x-auto rounded-lg bg-black/30 p-3 font-mono text-[11px] text-emerald-200">
                  <code>{item.example}</code>
                </pre>
              </article>
            ))}
          </div>
          <p className="mt-4 text-xs leading-relaxed text-slate-400">
            The ESP32 sketch publishes sensor data with MQTT QoS 0 (fast delivery without a broker
            acknowledgment for each reading). Its status Last Will uses QoS 1 and is retained, so
            new subscribers can see the latest online/offline state.
          </p>
        </section>

        <section className="mt-8 rounded-2xl border border-cyan-500/25 bg-[#091524] p-5 sm:p-7">
          <div className="flex items-center gap-2">
            <Terminal aria-hidden="true" className="size-5 text-cyan-400" />
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-cyan-300">
                SETUP ON RASPBERRY PI
              </p>
              <h2 className="text-xl font-bold text-white">Install and configure Mosquitto</h2>
            </div>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">
            Run these commands on Raspberry Pi OS. The broker and the Python backend run on the
            same Pi, so the backend connects to <code className="text-cyan-200">127.0.0.1</code>.
            The ESP32 is a different device and connects to the Pi&apos;s LAN IP address.
          </p>
          <InteractiveCodeBlock
            item={{
              id: 'mqtt-install-mosquitto',
              title: 'Install and start Mosquitto',
              filename: 'Raspberry Pi terminal',
              language: 'bash',
              code: 'sudo apt update\nsudo apt install -y mosquitto mosquitto-clients\nsudo systemctl enable --now mosquitto\nsudo systemctl status mosquitto',
              explanation:
                'The broker runs as a system service. Check that the status says active (running) before connecting the ESP32 or backend.',
            }}
          />
          <InteractiveCodeBlock
            item={{
              id: 'mqtt-secure-broker',
              title: 'Create a broker login and restrict anonymous access',
              filename: '/etc/mosquitto/conf.d/sensor.conf',
              language: 'bash',
              code: 'sudo mosquitto_passwd -c /etc/mosquitto/passwd sensor_client\nsudo nano /etc/mosquitto/conf.d/sensor.conf\n\n# Add to sensor.conf:\nlistener 1883\nallow_anonymous false\npassword_file /etc/mosquitto/passwd\n\nsudo systemctl restart mosquitto\nsudo systemctl status mosquitto',
              explanation:
                'Enter a strong password when prompted. The -c flag creates the password file; omit -c when adding users later. If Mosquitto does not load conf.d automatically, enable include_dir /etc/mosquitto/conf.d in mosquitto.conf. Keep the broker on your trusted LAN and do not forward port 1883 to the internet.',
            }}
          />
        </section>

        <section className="mt-8 rounded-2xl border border-white/10 bg-[#091524] p-5 sm:p-7">
          <div className="flex items-center gap-2">
            <Cpu aria-hidden="true" className="size-5 text-cyan-400" />
            <h2 className="text-xl font-bold text-white">Connect the ESP32 and Python backend</h2>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">
            Give the ESP32 the Pi&apos;s reachable LAN address, such as 192.168.1.50. Do not use
            127.0.0.1 in the ESP32 sketch: that address refers to the ESP32 itself. Configure the
            same MQTT username and password on both clients.
          </p>
          <InteractiveCodeBlock
            item={{
              id: 'mqtt-esp32-settings',
              title: 'ESP32 broker and topic settings',
              filename: 'ESP32 firmware',
              language: 'cpp',
              code: 'const char* MQTT_BROKER = "192.168.1.50"; // Replace with the Pi LAN IP\nconst int MQTT_PORT = 1883;\nconst char* MQTT_TOPIC = "esp32/tof_light_soil_data";\nconst char* MQTT_STATUS_TOPIC = "esp32/tof_light_soil_status";\nconst char* MQTT_CLIENT_ID = "esp32-tof-light-soil";\nconst char* MQTT_USER = "sensor_client";\nconst char* MQTT_PASS = "replace_with_your_broker_password";\n\n// Authenticated connection with retained Last Will:\nmqttClient.connect(MQTT_CLIENT_ID, MQTT_USER, MQTT_PASS,\n                   MQTT_STATUS_TOPIC, 1, true, "offline");',
              explanation:
                'Set the broker and credentials in your local sketch. The project publishes sensor JSON to MQTT_TOPIC every five seconds and publishes retained online status after connection. Keep real Wi-Fi and MQTT credentials out of public source control.',
            }}
          />
          <InteractiveCodeBlock
            item={{
              id: 'mqtt-backend-env',
              title: 'Backend MQTT settings',
              filename: '~/sensor-backend/.env',
              language: 'bash',
              code: 'MQTT_HOST=127.0.0.1\nMQTT_PORT=1883\nMQTT_USER=sensor_client\nMQTT_PASSWORD=replace_with_your_broker_password\nMQTT_DATA_TOPIC=esp32/tof_light_soil_data\nMQTT_STATUS_TOPIC=esp32/tof_light_soil_status',
              explanation:
                'The backend reads these settings from .env at startup. Since Mosquitto is on the Pi itself, use 127.0.0.1 here, even though the ESP32 uses the Pi LAN IP. Protect this file with chmod 600 .env.',
            }}
          />
        </section>

        <section className="mt-8 rounded-2xl border border-white/10 bg-[#091524] p-5 sm:p-7">
          <div className="flex items-center gap-2">
            <CheckCircle2 aria-hidden="true" className="size-5 text-emerald-300" />
            <h2 className="text-xl font-bold text-white">Test the MQTT message flow</h2>
          </div>
          <ol className="mt-4 space-y-3">
            {[
              'On the Pi, use mosquitto_sub to listen to the sensor topic. A message should appear about every five seconds when the ESP32 is connected.',
              'From a second terminal, use mosquitto_pub to send a sample JSON reading. The Python backend should log that it received and saved the reading.',
              'Open /api/health and /api/readings/current on port 8080. Confirm the MQTT connection and sample reading are visible.',
              'Open the Expo Go app using the Pi LAN IP and port 8080. Confirm its current reading updates.',
            ].map((text, index) => (
              <li className="flex items-start gap-3 text-sm leading-relaxed text-slate-300" key={text}>
                <span className="grid size-6 shrink-0 place-items-center rounded-md bg-emerald-500/10 font-mono text-[11px] font-bold text-emerald-200">
                  {index + 1}
                </span>
                {text}
              </li>
            ))}
          </ol>
          <InteractiveCodeBlock
            item={{
              id: 'mqtt-test-subscriber',
              title: 'Subscribe to the project sensor topic',
              filename: 'Raspberry Pi terminal',
              language: 'bash',
              code: 'mosquitto_sub -h 127.0.0.1 -p 1883 -u sensor_client -P "YOUR_PASSWORD" -t esp32/tof_light_soil_data -v',
              explanation:
                'Replace YOUR_PASSWORD with the password you set. This example passes the test password in the terminal command; avoid doing this on shared machines because command history may retain it. The -v option prints the topic and message.',
            }}
          />
          <InteractiveCodeBlock
            item={{
              id: 'mqtt-test-publisher',
              title: 'Publish a sample reading for testing',
              filename: 'Second Raspberry Pi terminal',
              language: 'bash',
              code: 'mosquitto_pub -h 127.0.0.1 -p 1883 -u sensor_client -P "YOUR_PASSWORD" -t esp32/tof_light_soil_data -m \'{"tof_mm":148,"lux":420.5,"soil_raw":1840,"rssi":-64}\'',
              explanation:
                'Run while the subscriber and API are active. A valid sample should appear in the subscriber output and be inserted into SQLite by main.py.',
            }}
          />
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              className="inline-flex items-center gap-2 rounded-xl border border-cyan-400/30 bg-cyan-500/10 px-4 py-2.5 text-xs font-semibold text-cyan-100 transition hover:bg-cyan-500/20"
              href="/raspberry-pi-learning/mqtt-communication"
            >
              Open the MQTT course module
              <ArrowRight aria-hidden="true" className="size-3.5" />
            </Link>
            <Link
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-xs font-semibold text-slate-200 transition hover:bg-white/[0.07]"
              href="/raspberry-pi"
            >
              Raspberry Pi backend guide
              <ArrowRight aria-hidden="true" className="size-3.5" />
            </Link>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-amber-500/20 bg-amber-950/10 p-5 sm:p-7">
          <div className="flex items-center gap-2">
            <ShieldCheck aria-hidden="true" className="size-5 text-amber-300" />
            <h2 className="text-lg font-bold text-white">If messages do not arrive</h2>
          </div>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              ['Broker offline', 'Run sudo systemctl status mosquitto and check the service logs.'],
              ['Wrong broker address', 'The ESP32 must use the Pi LAN IP; the local backend uses 127.0.0.1.'],
              ['Login rejected', 'Check that the username and password match in Mosquitto, the ESP32 sketch, and .env.'],
              ['Topic mismatch', 'Compare esp32/tof_light_soil_data exactly in the publisher and both subscribers.'],
              ['No network route', 'Put ESP32, Pi, and phone on a network that permits devices to reach one another.'],
              ['API still empty', 'Check backend logs, /api/health, and the SQLite file after verifying MQTT messages arrive.'],
            ].map(([title, detail]) => (
              <li className="rounded-xl border border-amber-500/15 bg-[#06101c] p-3" key={title}>
                <h3 className="text-xs font-bold text-amber-100">{title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-300">{detail}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  )
}
