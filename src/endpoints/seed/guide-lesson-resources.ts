import type { LessonGuideBlock } from '@/components/GuideLessonGuide'

export type GuideCodeExample = {
  title: string
  language: string
  code: string
}

export type GuideLessonVideo = {
  title: string
  url: string
}

export const guideLessonVideos: Record<string, GuideLessonVideo> = {
  'introduction-to-the-system/what-is-expo-go': {
    title: 'Where is Expo Go?',
    url: 'https://www.youtube.com/watch?v=bu8X9mCL0Ek',
  },
  'setting-up-expo-go/create-an-expo-project': {
    title: 'Create Your First Expo App',
    url: 'https://www.youtube.com/watch?v=80jdwxKgQEI',
  },
}

export const guideLessonStepTitles: Record<string, string> = {
  'introduction-to-the-system/what-is-expo-go': 'How to Set Up Expo Go',
}

export const guideLessonGuides: Record<string, LessonGuideBlock[]> = {
  'setting-up-expo-go/install-node-js': [
    {
      type: 'paragraph',
      parts: [
        { text: 'Node.js lets you run JavaScript outside a browser. Expo uses it to run project tools and the development server. npm is included with Node.js and installs the project packages your app needs.' },
      ],
    },
    { type: 'heading', text: 'Step 1: Download the Windows LTS installer' },
    {
      type: 'paragraph',
      parts: [
        { text: 'Go to the ' },
        {
          text: 'official Node.js website',
          bold: true,
          href: 'https://nodejs.org/',
        },
        { text: ' and choose the LTS Windows Installer (.msi). LTS is a stable release line; use a Node.js version supported by your Expo SDK.' },
      ],
    },
    { type: 'heading', text: 'Step 2: Install Node.js' },
    {
      type: 'list',
      items: [
        'Open the downloaded .msi installer and follow its prompts.',
        'The default setup is suitable for most beginners.',
        'Keep npm package manager and Add to PATH enabled so Windows can find node and npm from a terminal.',
        'Finish the installation. Close any terminals that were already open.',
      ],
    },
    { type: 'heading', text: 'Step 3: Verify the installation' },
    {
      type: 'paragraph',
      parts: [
        { text: 'Open a new Command Prompt or PowerShell window and run the version commands in the example below. Both should print a version number. Exact versions change over time, so the important check is that both commands work.' },
      ],
    },
    { type: 'heading', text: 'Step 4: Test Node.js with Expo (optional)' },
    {
      type: 'paragraph',
      parts: [
        { text: 'Create a small Expo project and start its development server. When the QR code appears, Node.js and npm are ready for the next setup step. You do not need to install Expo CLI globally; use npx expo from inside the project.' },
      ],
    },
    { type: 'heading', text: 'Common problems' },
    {
      type: 'list',
      items: [
        '“node is not recognized”: open a new terminal or restart Windows so the updated PATH is loaded.',
        'Still not recognized: rerun the official Node.js installer and make sure the Node.js installation and Add to PATH options are enabled.',
        'npm command errors: read the specific error first; do not run a terminal as Administrator unless a trusted project instruction specifically requires it.',
        'Slow package downloads: check your internet connection and retry; avoid deleting project files or lockfiles as a first troubleshooting step.',
      ],
    },
    {
      type: 'note',
      tone: 'info',
      title: 'Keep Node.js current',
      text: 'Use an LTS release supported by the Expo SDK in your project. If a project reports an engine-version requirement, follow that project’s documented Node.js range.',
    },
  ],
  'introduction-to-the-system/understand-the-development-workflow': [
    {
      type: 'paragraph',
      parts: [
        { text: 'The development workflow is a loop: ' },
        { text: 'create → edit → run → preview → improve', bold: true },
        { text: '. Your computer runs the project and Expo development server. Expo Go on your phone opens the project, while Metro serves the JavaScript bundle over the development connection.' },
      ],
    },
    { type: 'heading', text: '1. Create the project' },
    {
      type: 'paragraph',
      parts: [
        { text: 'Use create-expo-app to create the project files, then move into the project folder. You only need to do this when starting a new project.' },
      ],
    },
    { type: 'heading', text: '2. Write the interface and app logic' },
    {
      type: 'list',
      items: [
        'Open the project folder in Visual Studio Code or another editor.',
        'Edit the screen entry point provided by your template. Depending on the template, this may be app/index.tsx, app/(tabs)/index.tsx, or App.tsx.',
        'Build the UI from React Native components such as View, Text, Pressable, and TextInput.',
        'Keep changing values in React state, and split reusable UI into components as the app grows.',
      ],
    },
    { type: 'heading', text: '3. Run the development server' },
    {
      type: 'paragraph',
      parts: [
        { text: 'Run npx expo start from the project folder. Metro bundles JavaScript and serves the project to Expo Go. Keep this process running; its terminal output is also useful for diagnosing errors.' },
      ],
    },
    { type: 'heading', text: '4. Open the project on your phone' },
    {
      type: 'list',
      items: [
        'Connect your phone and computer to a network that allows them to communicate.',
        'Scan the current QR code in the terminal with Expo Go. If the local connection is blocked, try npx expo start --tunnel.',
        'Wait for the bundle to load, then interact with the screen on the phone.',
      ],
    },
    { type: 'heading', text: '5. Iterate with Fast Refresh' },
    {
      type: 'paragraph',
      parts: [
        { text: 'Change a text label or style and save. Fast Refresh applies many edits without rebuilding a native app. Some edits may reset local screen state; reload the app if the preview becomes stale.' },
      ],
    },
    { type: 'heading', text: '6. Add APIs or IoT connections when your app needs data' },
    {
      type: 'paragraph',
      parts: [
        { text: 'The Expo development connection is how Expo Go loads your project; it is not the same connection as your app’s backend. Use fetch() to request data from a server or local Raspberry Pi/ESP32 API. From a physical phone, use the device’s reachable LAN IP address instead of localhost. The code example below shows a basic request with an HTTP error check.' },
      ],
    },
    { type: 'quote', text: 'Edit and save on the computer. Preview and test on the phone. Repeat.' },
    {
      type: 'note',
      tone: 'info',
      title: 'Expo Go versus a production build',
      text: 'Expo Go is a development preview client. Fast Refresh is not a production update mechanism; use an appropriate development build or release build when your project needs a custom native module or distribution.',
    },
  ],
  'introduction-to-the-system/what-is-expo-go': [
    {
      type: 'paragraph',
      parts: [
        { text: 'Read the ' },
        {
          text: 'Expo Go Official Page',
          bold: true,
          href: 'https://expo.dev/go',
        },
        {
          text: '. Expo Go is a mobile app that lets you run and test React Native apps on your phone without first building an APK or IPA.',
        },
      ],
    },
    { type: 'heading', text: 'How it works' },
    {
      type: 'list',
      items: [
        'Write your app code on your computer in a code editor such as VS Code.',
        'Start the Expo development server and scan its QR code with your phone.',
        'Expo Go opens the project so you can preview changes while developing.',
      ],
    },
    { type: 'heading', text: 'Who it is for' },
    {
      type: 'list',
      items: [
        'Beginners and students learning React Native.',
        'Quickly testing mobile app screens and interactions.',
        'Previewing app changes without creating a store-ready build.',
      ],
    },
    {
      type: 'quote',
      text: 'Think of Expo Go as a live preview app for your mobile project.',
    },
    {
      type: 'note',
      tone: 'warning',
      title: 'Development preview only',
      text: 'Expo Go is for development and testing, not a final production app. Some custom native modules require a development build instead.',
    },
  ],
  'introduction-to-the-system/what-do-you-need-to-use-expo-go': [
    {
      type: 'paragraph',
      parts: [
        { text: 'Expo Go is the preview app on your phone. Your computer runs the project and the Expo development server; the phone connects to that server to load the JavaScript bundle. This is separate from any API connection your finished app may make to a Raspberry Pi, ESP32, or cloud service.' },
      ],
    },
    { type: 'heading', text: '1. A phone with Expo Go' },
    {
      type: 'list',
      items: [
        'Use a supported Android or iOS phone and install Expo Go from Google Play or the Apple App Store.',
        'The phone is where you scan the project QR code and interact with your running app.',
      ],
    },
    { type: 'heading', text: '2. A computer with Node.js and a code editor' },
    {
      type: 'list',
      items: [
        'Install a Node.js version supported by the Expo SDK used by your project. npm is included with Node.js.',
        'Use Visual Studio Code or another editor to change the project files.',
        'Open a new terminal after installing Node.js so the node and npm commands are available.',
      ],
    },
    { type: 'heading', text: '3. An Expo project and development server' },
    {
      type: 'paragraph',
      parts: [
        { text: 'Create a project, move into its folder, and start the development server with the commands in the code example below. Leave the server running while you preview the project.' },
      ],
    },
    { type: 'heading', text: '4. A connection from phone to computer' },
    {
      type: 'list',
      items: [
        'For the default LAN connection, put the phone and computer on the same Wi-Fi network.',
        'Guest Wi-Fi, VPNs, and router client isolation can prevent the phone from reaching the computer.',
        'If LAN access is blocked, try npx expo start --tunnel. Tunnel mode can be slower and still requires internet access.',
        'Scan the QR code shown by Expo with Expo Go. On iOS, use the Camera app if Expo Go does not show a scanner.',
      ],
    },
    { type: 'heading', text: '5. Basic coding knowledge' },
    {
      type: 'paragraph',
      parts: [
        { text: 'You can begin without being an expert. JavaScript or TypeScript fundamentals and React Native ideas such as components, props, state, and Flexbox make it easier to understand the starter screen and build on it.' },
      ],
    },
    {
      type: 'note',
      tone: 'info',
      title: 'Expo Go is a development preview',
      text: 'Expo Go includes a fixed set of native libraries. If your app needs a native module that is not included, you will need a development build. Updating your app in Expo Go is not the same as publishing a production app.',
    },
    {
      type: 'note',
      tone: 'warning',
      title: 'QR code will not connect?',
      text: 'Confirm the server is still running, the phone can reach the computer on the network, and you scanned the current QR code. Try tunnel mode, then check the Expo terminal output and phone permissions.',
    },
  ],
  'connecting-expo-go-to-devices/understand-the-phone-to-device-connection': [
    { type: 'heading', text: 'A simple local-network layout' },
    {
      type: 'list',
      items: [
        'The phone and board join a Wi-Fi network that allows local devices to communicate.',
        'The board has a reachable IP address, for example 192.168.1.50.',
        'The app connects to the board IP and service port, for example http://192.168.1.50:5000.',
        'For remote access, use a securely authenticated backend or VPN rather than exposing a device port to the internet.',
      ],
    },
    {
      type: 'note',
      tone: 'warning',
      title: 'Avoid localhost on the phone',
      text: 'In an Expo Go app running on a physical phone, localhost points to that phone. Use the Raspberry Pi or ESP32 IP address instead.',
    },
  ],
  'connecting-expo-go-to-devices/create-a-small-raspberry-pi-rest-api': [
    {
      type: 'paragraph',
      parts: [
        { text: 'Install Flask on the Pi with python3 -m pip install flask. The ESP32 example uses its Arduino WebServer library. Both are prototypes: connect the handlers to your real sensors or GPIO logic and keep them on a trusted development network.' },
      ],
    },
    {
      type: 'note',
      tone: 'warning',
      title: 'Prototype example',
      text: 'This sample has no authentication and is only for a trusted development network. Do not expose it to the internet or use it to control hazardous equipment.',
    },
  ],
  'connecting-expo-go-to-devices/call-the-api-from-your-expo-app': [
    { type: 'heading', text: 'Handle HTTP errors and offline devices' },
    {
      type: 'list',
      items: [
        'Use the board’s current LAN IP and API port in your base URL.',
        'Check response.ok before treating a request as successful.',
        'Show a loading state while waiting and an error message if the request fails.',
        'Keep device secrets out of the app bundle; a mobile app cannot keep embedded credentials private.',
      ],
    },
  ],
  'connecting-expo-go-to-devices/stream-live-updates-with-websocket': [
    { type: 'heading', text: 'When to choose WebSocket' },
    {
      type: 'paragraph',
      parts: [
        { text: 'Use HTTP for occasional reads and commands. Use WebSocket when a device needs to ' },
        { text: 'push frequent updates', bold: true },
        { text: ' to the app. The code example expects a WebSocket service at the Pi’s IP address and port.' },
      ],
    },
    {
      type: 'note',
      tone: 'info',
      title: 'Production connections',
      text: 'Use wss:// with a trusted certificate outside a private development network, and close the socket when the screen unmounts.',
    },
  ],
  'connecting-expo-go-to-devices/use-mqtt-for-iot-messaging': [
    { type: 'heading', text: 'Example topic design' },
    {
      type: 'list',
      items: [
        'Publish readings to home/room1/temperature.',
        'Publish device availability to home/room1/status.',
        'Send requested actions to a command topic and publish the confirmed result separately.',
        'Choose a broker with secure MQTT over WebSocket (WSS) for direct app connections.',
      ],
    },
    {
      type: 'note',
      tone: 'warning',
      title: 'Broker access',
      text: 'Give each app or device only the topic permissions it needs. Do not ship a broker administrator password in the mobile app.',
    },
  ],
  'connecting-expo-go-to-devices/choose-bluetooth-and-understand-expo-go-limits': [
    { type: 'heading', text: 'BLE usually needs a development build' },
    {
      type: 'paragraph',
      parts: [
        { text: 'Expo Go includes a fixed set of native modules. A Bluetooth package that adds native code generally requires a project-specific ' },
        { text: 'development build', bold: true },
        { text: ' and device permissions. Check the package’s Expo compatibility, platform support, and permission setup before choosing it.' },
      ],
    },
    {
      type: 'list',
      items: [
        'Choose BLE for nearby discovery, pairing, and small low-power messages.',
        'Choose Wi-Fi plus HTTP or WebSocket when the board is reachable on the network.',
        'A Raspberry Pi can act as a gateway: the phone uses Wi-Fi while the Pi communicates with a BLE sensor.',
      ],
    },
  ],
  'connecting-expo-go-to-devices/secure-and-troubleshoot-the-connection': [
    { type: 'heading', text: 'A useful connection checklist' },
    {
      type: 'list',
      items: [
        'Confirm the phone and device are on the intended network; guest Wi-Fi can block device-to-device traffic.',
        'Check the board IP, server port, route, and that the server listens on the network interface, not only 127.0.0.1.',
        'Try the API URL from the phone browser and inspect server logs if it fails.',
        'Check router client isolation, firewall rules, iOS local-network permission prompts, and Android network permissions.',
        'Validate every command on the device and require authorization before changing outputs.',
        'Use TLS and authenticated access for anything beyond a private prototype network.',
      ],
    },
  ],
}

export const guideLessonImages: Record<string, string> = {
  'setting-up-expo-go/install-node-js': '/nodejs-windows-setup.svg',
  'introduction-to-the-system/what-do-you-need-to-use-expo-go': '/expo-go-setup-flow.svg',
  'introduction-to-the-system/understand-the-development-workflow': '/expo-go-setup-flow.svg',
  'connecting-expo-go-to-devices/understand-the-phone-to-device-connection':
    '/aquasentinel-system.png',
}

export const guideLessonCodeExamples: Record<string, GuideCodeExample[]> = {
  'setting-up-expo-go/install-node-js': [
    {
      title: 'Verify Node.js and npm in PowerShell or Command Prompt',
      language: 'bash',
      code: `node -v
npm -v`,
    },
    {
      title: 'Create and run a test Expo app',
      language: 'bash',
      code: `npx create-expo-app@latest myApp
cd myApp
npx expo start`,
    },
  ],
  'introduction-to-the-system/understand-the-development-workflow': [
    {
      title: 'Create, enter, and run the project',
      language: 'bash',
      code: `npx create-expo-app@latest myApp
cd myApp
npx expo start

# If your phone cannot reach your computer over Wi-Fi:
npx expo start --tunnel`,
    },
    {
      title: 'A simple React Native screen',
      language: 'tsx',
      code: `import { StyleSheet, Text, View } from 'react-native'

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello, Expo Go!</Text>
      <Text>Save a change and watch Fast Refresh update this screen.</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
  },
})`,
    },
    {
      title: 'Request data from an API',
      language: 'typescript',
      code: `type Reading = { temperatureC: number }

async function getReading(): Promise<Reading> {
  const response = await fetch('http://192.168.1.100:8000/data')

  if (!response.ok) {
    throw new Error(\`Request failed: HTTP \${response.status}\`)
  }

  return response.json() as Promise<Reading>
}`,
    },
  ],
  'introduction-to-the-system/what-do-you-need-to-use-expo-go': [
    {
      title: 'Create and start an Expo project',
      language: 'bash',
      code: `npx create-expo-app@latest myApp
cd myApp
npx expo start

# If your phone cannot reach your computer over Wi-Fi:
npx expo start --tunnel`,
    },
    {
      title: 'Check your development tools',
      language: 'bash',
      code: `node --version
npm --version`,
    },
    {
      title: 'A simple React Native screen',
      language: 'tsx',
      code: `import { StyleSheet, Text, View } from 'react-native'

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello, Expo Go!</Text>
      <Text>Change this text and save to try Fast Refresh.</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
  },
})`,
    },
  ],
  'introduction-to-the-system/what-is-expo-go': [
    {
      title: 'Create an Expo project',
      language: 'bash',
      code: `npx create-expo-app myApp
cd myApp`,
    },
    {
      title: 'Start the app',
      language: 'bash',
      code: 'npx expo start',
    },
    {
      title: 'A first screen in Expo Go',
      language: 'tsx',
      code: `import { Text, View } from 'react-native'

export default function App() {
  return (
    <View>
      <Text>Hello from Expo Go</Text>
    </View>
  )
}`,
    },
  ],
  'setting-up-expo-go/create-an-expo-project': [
    {
      title: 'Create and start the project',
      language: 'bash',
      code: `npx create-expo-app@latest ExpoGoGuide
cd ExpoGoGuide
npx expo start`,
    },
  ],
  'setting-up-expo-go/run-the-app-on-a-phone': [
    {
      title: 'Start the Expo development server',
      language: 'bash',
      code: `cd ExpoGoGuide
npx expo start`,
    },
  ],
  'connecting-expo-go-to-devices/create-a-small-raspberry-pi-rest-api': [
    {
      title: 'Minimal Flask API for a Raspberry Pi',
      language: 'python',
      code: `from flask import Flask, jsonify

app = Flask(__name__)
led_is_on = False

@app.get("/api/status")
def status():
    return jsonify({"led": led_is_on, "temperatureC": 22.5})

@app.post("/api/led/<state>")
def set_led(state):
    global led_is_on
    if state not in ("on", "off"):
        return jsonify({"error": "state must be on or off"}), 400
    led_is_on = state == "on"
    # Set the GPIO output here using your chosen Raspberry Pi GPIO library.
    return jsonify({"led": led_is_on})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)`,
    },
    {
      title: 'ESP32 HTTP status endpoint (Arduino)',
      language: 'cpp',
      code: `#include <WiFi.h>
#include <WebServer.h>

const char* ssid = "YOUR_WIFI_NAME";
const char* password = "YOUR_WIFI_PASSWORD";
WebServer server(80);

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) delay(250);

  server.on("/api/status", HTTP_GET, []() {
    server.send(200, "application/json",
                "{\\"led\\":false,\\"temperatureC\\":22.5}");
  });
  server.begin();
  Serial.println(WiFi.localIP());
}

void loop() {
  server.handleClient();
}`,
    },
  ],
  'connecting-expo-go-to-devices/call-the-api-from-your-expo-app': [
    {
      title: 'Read status and send a command',
      language: 'tsx',
      code: `import { useState } from 'react'
import { Button, Text, View } from 'react-native'

const DEVICE_URL = 'http://192.168.1.50:5000'

export default function DeviceScreen() {
  const [status, setStatus] = useState('Not connected')

  async function loadStatus() {
    try {
      const response = await fetch(\`\${DEVICE_URL}/api/status\`)
      if (!response.ok) throw new Error(\`HTTP \${response.status}\`)
      const data: { led: boolean; temperatureC: number } = await response.json()
      setStatus(\`LED: \${data.led ? 'on' : 'off'}, temperature: \${data.temperatureC}°C\`)
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Could not reach device')
    }
  }

  async function turnLedOn() {
    try {
      const response = await fetch(\`\${DEVICE_URL}/api/led/on\`, { method: 'POST' })
      if (!response.ok) throw new Error(\`HTTP \${response.status}\`)
      await loadStatus()
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Command failed')
    }
  }

  return (
    <View>
      <Text>{status}</Text>
      <Button title="Refresh status" onPress={loadStatus} />
      <Button title="Turn LED on" onPress={() => void turnLedOn()} />
    </View>
  )
}`,
    },
  ],
  'connecting-expo-go-to-devices/stream-live-updates-with-websocket': [
    {
      title: 'Receive live readings over WebSocket',
      language: 'tsx',
      code: `import { useEffect, useState } from 'react'

type Reading = { temperatureC: number; humidity: number }

export function useDeviceReading() {
  const [reading, setReading] = useState<Reading | null>(null)
  const [connection, setConnection] = useState('Connecting')

  useEffect(() => {
    const socket = new WebSocket('ws://192.168.1.50:8765')
    socket.onopen = () => setConnection('Connected')
    socket.onmessage = (event) => {
      try {
        setReading(JSON.parse(String(event.data)) as Reading)
      } catch {
        setConnection('Received invalid device data')
      }
    }
    socket.onerror = () => setConnection('Connection error')
    socket.onclose = () => setConnection('Disconnected')
    return () => socket.close()
  }, [])

  return { reading, connection }
}`,
    },
  ],
  'connecting-expo-go-to-devices/use-mqtt-for-iot-messaging': [
    {
      title: 'Example MQTT message',
      language: 'text',
      code: `// Device publishes to: home/room1/temperature
{
  "value": 22.5,
  "unit": "C",
  "timestamp": "2026-10-04T12:00:00Z"
}

// The app subscribes through a broker's secure WebSocket endpoint.
// Use a per-user token or short-lived credential; never embed admin credentials.`,
    },
  ],
}
