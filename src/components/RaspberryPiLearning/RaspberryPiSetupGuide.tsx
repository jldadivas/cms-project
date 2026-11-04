import {
  Cable,
  CheckCircle2,
  Cpu,
  HardDrive,
  Network,
  Server,
  ShieldCheck,
  Wifi,
} from 'lucide-react'
import { InteractiveCodeBlock } from '@/components/ESP32Learning/InteractiveCodeBlock'

const setupCommands = [
  {
    id: 'pi-update-and-packages',
    title: 'Update Raspberry Pi OS and install project packages',
    filename: 'Raspberry Pi terminal',
    language: 'bash' as const,
    code: 'sudo apt update\nsudo apt full-upgrade -y\nsudo apt install -y python3-full python3-venv mosquitto mosquitto-clients\nsudo systemctl enable --now mosquitto',
    explanation:
      'Run after first boot. The system update can take several minutes. If the update requires a restart, run sudo reboot after these commands and reconnect. python3-venv creates an isolated Python environment; Mosquitto is the local MQTT message broker.',
  },
  {
    id: 'pi-mosquitto-security',
    title: 'Secure the MQTT broker with a login',
    filename: '/etc/mosquitto/conf.d/sensor.conf',
    language: 'bash' as const,
    code: 'sudo mosquitto_passwd -c /etc/mosquitto/passwd sensor_client\nsudo nano /etc/mosquitto/conf.d/sensor.conf\n\n# Add these lines to sensor.conf:\nlistener 1883\nallow_anonymous false\npassword_file /etc/mosquitto/passwd\n\nsudo systemctl restart mosquitto\nsudo systemctl status mosquitto',
    explanation:
      'Create this password file once; omit -c if you later add another broker user. Enter a strong password when prompted. Keep MQTT and the API on a trusted local network; do not forward their ports from your router to the public internet.',
  },
  {
    id: 'pi-python-backend-setup',
    title: 'Create the backend environment',
    filename: 'Raspberry Pi terminal',
    language: 'bash' as const,
    code: 'mkdir -p ~/sensor-backend\ncd ~/sensor-backend\npython3 -m venv .venv\nsource .venv/bin/activate\npython -m pip install --upgrade pip\npip install fastapi uvicorn paho-mqtt python-dotenv',
    explanation:
      'Keep the project in its own folder. The .venv environment prevents project libraries from changing Raspberry Pi OS packages.',
  },
  {
    id: 'pi-copy-main',
    title: 'Copy the project backend to the Pi',
    filename: 'Windows PowerShell (from the project folder)',
    language: 'bash' as const,
    code: 'scp .\\main.py pi-user@raspberrypi.local:~/sensor-backend/main.py',
    explanation:
      'Replace pi-user and raspberrypi with the account and hostname you created in Raspberry Pi Imager. Run this on your computer from the folder that contains main.py. You can also copy the file with a USB drive.',
  },
  {
    id: 'pi-env-settings',
    title: 'Configure the backend connection',
    filename: '~/sensor-backend/.env',
    language: 'bash' as const,
    code: 'MQTT_HOST=127.0.0.1\nMQTT_PORT=1883\nMQTT_USER=sensor_client\nMQTT_PASSWORD=replace_with_the_password_you_created\nSOIL_DRY_RAW=2527\nSOIL_WET_RAW=1237',
    explanation:
      'Create this file with nano .env while inside ~/sensor-backend, then run chmod 600 .env. The backend connects to the broker running on the same Pi, so MQTT_HOST stays 127.0.0.1. Use your actual password and never commit this file to source control.',
  },
  {
    id: 'pi-esp32-credentials',
    title: 'Use the same broker login in the ESP32 sketch',
    filename: 'ESP32 MQTT settings',
    language: 'cpp' as const,
    code: 'const char* MQTT_USER = "sensor_client";\nconst char* MQTT_PASS = "replace_with_the_same_password";',
    explanation:
      'The project example sketch starts with an empty MQTT_USER for anonymous access. With the authenticated broker above, update these local device settings to match the Pi user and password. Never commit real passwords to a public repository.',
  },
  {
    id: 'pi-run-backend',
    title: 'Start and test the API',
    filename: 'Raspberry Pi terminal',
    language: 'bash' as const,
    code: 'cd ~/sensor-backend\nnano .env\nchmod 600 .env\nsource .venv/bin/activate\nuvicorn main:app --host 0.0.0.0 --port 8080',
    explanation:
      'Keep this terminal open while testing. From a browser on the same network, open http://<PI_IP>:8080/docs. The ESP32 must publish to the Pi LAN IP on MQTT port 1883 using the configured topic and login.',
  },
]

const firstBootSteps = [
  {
    title: 'Prepare the parts',
    description:
      'Use the Raspberry Pi 4 Model B from this project, its compatible power supply, a microSD card (16 GB or larger is a practical starting point), and a computer with a card reader. Ethernet is convenient for setup; Wi-Fi also works.',
  },
  {
    title: 'Install Raspberry Pi OS',
    description:
      'Install Raspberry Pi Imager on your computer, insert the microSD card, select Raspberry Pi OS 64-bit (Lite is sufficient for a headless server), and choose the card as the destination. Writing the image erases the selected card, so double-check the destination first.',
  },
  {
    title: 'Set up access before writing the card',
    description:
      'In Imager customization, choose a hostname, create your own username and strong password, set the correct country and keyboard layout, configure Wi-Fi if needed, and enable SSH. Use SSH key authentication when you are comfortable with it.',
  },
  {
    title: 'Boot and connect to the Pi',
    description:
      'Insert the card, connect Ethernet if available, then power on the Pi. After the first boot, connect from the same network with SSH. The first boot may take a few minutes.',
  },
]

const systemLayers = [
  {
    icon: Cpu,
    title: 'ESP32 reads the sensors',
    description:
      'The ESP32 reads the VL53L0X distance sensor, BH1750 light sensor, and analog soil probe. These sensors connect to the ESP32, not to the Raspberry Pi GPIO pins.',
  },
  {
    icon: Network,
    title: 'Mosquitto receives MQTT messages',
    description:
      'The ESP32 sends small JSON messages over Wi-Fi to the Mosquitto broker on the Pi. The broker routes each topic to software that subscribed to it.',
  },
  {
    icon: Server,
    title: 'Python processes and serves readings',
    description:
      'The project’s main.py subscribes to sensor messages, validates their values, calculates soil moisture from the dry/wet calibration points, and provides FastAPI HTTP endpoints.',
  },
  {
    icon: HardDrive,
    title: 'SQLite stores history for Expo Go',
    description:
      'Each valid reading is saved in sensor_readings.sqlite3. Expo Go requests current or historical readings from the API on port 8080 and displays the sensor data on the phone.',
  },
]

export function RaspberryPiSetupGuide() {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-white/10 bg-[#091524] p-5 sm:p-7">
        <div className="flex items-center gap-2">
          <span className="grid size-9 place-items-center rounded-xl border border-cyan-400/20 bg-cyan-500/10 text-cyan-300">
            <Server aria-hidden="true" className="size-4" />
          </span>
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-cyan-300">
              FIRST, UNDERSTAND THE PI
            </p>
            <h2 className="text-xl font-bold text-white">What is a Raspberry Pi?</h2>
          </div>
        </div>
        <p className="mt-4 text-sm leading-7 text-slate-300">
          A Raspberry Pi is a small, low-power computer. Unlike the ESP32, it runs a full operating
          system called Raspberry Pi OS, so it can run several services at once. In this project,
          the Pi is the local edge server: it runs Mosquitto, the Python FastAPI backend, and the
          SQLite database. The ESP32 focuses on reading the sensors; the Pi receives, stores, and
          shares those readings with the mobile app.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {systemLayers.map(({ icon: Icon, title, description }, index) => (
            <div className="rounded-xl border border-white/[0.07] bg-[#06101c] p-4" key={title}>
              <div className="flex items-center gap-2">
                <Icon aria-hidden="true" className="size-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-white">
                  <span className="mr-1.5 font-mono text-cyan-300">0{index + 1}</span>
                  {title}
                </h3>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-slate-300">{description}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 rounded-xl border border-amber-500/20 bg-amber-950/15 p-3 text-xs leading-relaxed text-amber-100">
          <strong>Hardware note:</strong> The soil probe and I2C sensors in this project are wired
          to the ESP32. Do not connect sensor or ESP32 signals to Raspberry Pi GPIO unless you have
          checked voltage compatibility and a separate wiring plan.
        </p>
      </section>

      <section
        className="scroll-mt-24 rounded-2xl border border-cyan-500/25 bg-gradient-to-br from-[#091827] to-[#071322] p-5 sm:p-7"
        id="raspberry-pi-setup"
      >
        <div className="flex items-center gap-2">
          <span className="grid size-9 place-items-center rounded-xl border border-cyan-400/20 bg-cyan-500/10 text-cyan-300">
            <Cable aria-hidden="true" className="size-4" />
          </span>
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-cyan-300">
              BEGINNER SETUP WALKTHROUGH
            </p>
            <h2 className="text-xl font-bold text-white">Set up your Raspberry Pi</h2>
          </div>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-slate-300">
          Set up the Pi as a network server first. You can do the whole setup without a monitor by
          enabling Wi-Fi and SSH in Raspberry Pi Imager.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {firstBootSteps.map((step, index) => (
            <div className="flex gap-3 rounded-xl border border-white/[0.07] bg-[#06101c] p-4" key={step.title}>
              <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-cyan-500/10 font-mono text-xs font-bold text-cyan-200">
                {index + 1}
              </span>
              <div>
                <h3 className="text-sm font-bold text-white">{step.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-300">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-xl border border-white/[0.07] bg-[#06101c] p-4">
          <div className="flex items-center gap-2">
            <Wifi aria-hidden="true" className="size-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white">Connect, update, and identify the Pi</h3>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-slate-300">
            From Windows PowerShell, connect using the account and hostname selected in Imager.
            When you are at the Pi terminal, update the OS and check its LAN address. The address
            shown by <code className="text-cyan-200">hostname -I</code> is the one the ESP32 and
            phone use to reach the Pi.
          </p>
          <InteractiveCodeBlock
            item={{
              id: 'pi-first-ssh',
              title: 'First connection from Windows PowerShell',
              filename: 'PowerShell, then Raspberry Pi terminal',
              language: 'bash',
              code: 'ssh pi-user@raspberrypi.local\n\n# After connecting to the Pi:\nhostname -I',
              explanation:
                'Replace pi-user and raspberrypi with the account and hostname you set. If .local does not resolve, find the Pi address in your router and connect with ssh pi-user@192.168.1.50, replacing the example address.',
            }}
          />
        </div>

        <div className="mt-2">
          {setupCommands.map((item) => (
            <InteractiveCodeBlock item={item} key={item.id} />
          ))}
        </div>

        <div className="mt-5 rounded-xl border border-emerald-500/20 bg-emerald-950/15 p-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 aria-hidden="true" className="size-4 text-emerald-300" />
            <h3 className="text-sm font-bold text-emerald-100">Confirm each part works</h3>
          </div>
          <ol className="mt-2 list-inside list-decimal space-y-1.5 text-xs leading-relaxed text-slate-300">
            <li>Check Mosquitto with sudo systemctl status mosquitto.</li>
            <li>Start main.py with Uvicorn and keep the terminal open while testing.</li>
            <li>Open http://&lt;PI_IP&gt;:8080/docs from another device on the same network.</li>
            <li>Check /api/health, then /api/readings/current after the ESP32 has published.</li>
            <li>Set the Expo Go base URL to http://&lt;PI_IP&gt;:8080, not localhost.</li>
          </ol>
        </div>

        <div className="mt-4 flex items-start gap-2 rounded-xl border border-cyan-500/20 bg-cyan-950/15 p-4 text-xs leading-relaxed text-cyan-100">
          <ShieldCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-cyan-300" />
          <p>
            <strong>Network safety:</strong> Keep the Pi on your trusted home or lab network. Use
            MQTT password authentication, keep your .env file private, and do not set up router
            port forwarding for ports 1883 or 8080.
          </p>
        </div>
      </section>
    </div>
  )
}
