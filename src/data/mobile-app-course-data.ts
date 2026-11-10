export type MobileLearningLevel = 'Beginner' | 'Intermediate' | 'Advanced'

export interface MobileCodeExample {
  filename: string
  language: string
  code: string
  explanation: string
}

export interface MobileAppLesson {
  slug: string
  title: string
  level: MobileLearningLevel
  minutes: number
  summary: string
  introduction: string
  explanation: string
  objectives: string[]
  tools: string[]
  steps: { title: string; detail: string }[]
  commands: string
  examples: MobileCodeExample[]
  expectedOutput: string
  activity: string
  troubleshooting: { problem: string; solution: string }[]
  assessment: { question: string; answer: string }
}

export const mobileAppLessons: MobileAppLesson[] = [
  {
    slug: 'mobile-app-development-intro',
    title: 'Introduction to Mobile App Development',
    level: 'Beginner',
    minutes: 15,
    summary: 'Compare Flutter, Ionic, Capacitor, Android Studio, VS Code, and Expo Go.',
    introduction:
      'A mobile app is a user interface that runs on a phone and communicates with services such as the Raspberry Pi sensor API.',
    explanation:
      'Flutter builds its interface with Dart and Flutter widgets. Ionic uses web technologies such as React and TypeScript; Capacitor packages that web app in a native Android or iOS shell. Expo Go runs a React Native app during development. Android Studio supplies Android SDK tools, emulators, and native build tooling; VS Code is a lightweight editor. For this course, the sensor data path is ESP32 → sensors → Wi-Fi/MQTT → Raspberry Pi → FastAPI → mobile app.',
    objectives: [
      'Distinguish a UI framework from a native build tool.',
      'Choose a Flutter or Ionic + Capacitor learning path.',
      'Explain how sensor readings reach a mobile screen.',
    ],
    tools: ['A computer with internet access', 'An Android phone or emulator', 'This website and the example project'],
    steps: [
      { title: 'Choose a framework', detail: 'Choose Flutter when you want a Dart app with Flutter widgets. Choose Ionic React when you already know React, HTML, and CSS.' },
      { title: 'Separate editor from Android tooling', detail: 'Use VS Code or Android Studio to edit code. Android Studio also installs the Android SDK and emulator used to build and run Android apps.' },
      { title: 'Trace the data path', detail: 'The ESP32 reads sensors and publishes MQTT messages. The Pi backend stores readings and exposes HTTP endpoints; the phone consumes those endpoints.' },
    ],
    commands: 'flutter doctor\nnode --version\nnpm --version',
    examples: [{
      filename: 'System architecture',
      language: 'text',
      code: 'VL53L0X + BH1750 + soil probe\n             ↓ I²C / ADC\n          ESP32 firmware\n             ↓ Wi-Fi / MQTT\n     Raspberry Pi + Mosquitto\n             ↓ FastAPI REST / optional WebSocket\n       Flutter or Ionic app',
      explanation: 'The phone normally talks to FastAPI, not directly to GPIO pins or the MQTT broker.',
    }],
    expectedOutput: 'You can explain each layer and identify which framework and development tools you will use.',
    activity: 'Draw the data path for one light reading, from the BH1750 through to the mobile dashboard.',
    troubleshooting: [
      { problem: 'Confusing Android Studio with a UI framework', solution: 'Android Studio is primarily an IDE and Android toolchain; Flutter and Ionic provide application UI frameworks.' },
      { problem: 'Trying to use localhost from a phone', solution: 'Use the Raspberry Pi LAN address from the phone. On an emulator, use the emulator host bridge address when applicable.' },
    ],
    assessment: { question: 'Which service should the mobile app call to retrieve stored sensor data?', answer: 'The Raspberry Pi FastAPI service; its existing current-reading endpoint is GET /api/readings/current.' },
  },
  {
    slug: 'flutter-and-dart',
    title: 'Introduction to Flutter and Dart',
    level: 'Beginner',
    minutes: 30,
    summary: 'Learn the Flutter widget model, Dart basics, SDK installation, and project structure.',
    introduction:
      'Flutter is Google’s cross-platform UI toolkit. Dart is the language used to describe Flutter apps and their behavior.',
    explanation:
      'Flutter apps compose small widgets into a widget tree. StatelessWidget describes UI from fixed inputs; StatefulWidget stores UI state that changes as readings arrive. Flutter includes Material widgets and renders its own controls, while Expo Go uses React Native and a JavaScript runtime. Flutter has a consistent UI toolkit; Expo Go offers a fast React Native development-client workflow. Neither framework replaces the Raspberry Pi API.',
    objectives: [
      'Describe Dart, Flutter, widgets, and the widget tree.',
      'Install the Flutter SDK and validate it with flutter doctor.',
      'Create and run a starter project on an Android device.',
    ],
    tools: ['Flutter SDK (includes the Dart SDK)', 'VS Code with Flutter and Dart extensions or Android Studio', 'Android SDK and a device/emulator'],
    steps: [
      { title: 'Install Flutter', detail: 'Download the stable Flutter SDK for your OS, extract it to a user-writable folder, and add its bin directory to PATH. Flutter includes Dart; a separate Dart install is usually unnecessary.' },
      { title: 'Install Android tooling', detail: 'Install Android Studio and an Android SDK platform. Accept SDK licenses and make sure a phone with USB debugging or an emulator is available.' },
      { title: 'Check the environment', detail: 'Run flutter doctor and address the Android toolchain issues it reports. Restart your terminal after changing PATH.' },
      { title: 'Create a starter app', detail: 'Create the project, open it in your editor, and run it on a connected device.' },
    ],
    commands: 'flutter doctor\nflutter create sensor_mobile\ncd sensor_mobile\nflutter run',
    examples: [{
      filename: 'lib/main.dart',
      language: 'dart',
      code: "import 'package:flutter/material.dart';\n\nvoid main() => runApp(const SensorApp());\n\nclass SensorApp extends StatelessWidget {\n  const SensorApp({super.key});\n\n  @override\n  Widget build(BuildContext context) => MaterialApp(\n        title: 'Sensor Monitor',\n        theme: ThemeData(colorSchemeSeed: Colors.teal),\n        home: Scaffold(\n          appBar: AppBar(title: const Text('Sensor Monitor')),\n          body: const Center(child: Text('Connect to your Raspberry Pi')),\n        ),\n      );\n}",
      explanation: 'main starts the app. MaterialApp configures the theme and route tree; Scaffold provides a standard screen layout.',
    }],
    expectedOutput: 'The Android device displays a Sensor Monitor screen with a teal Material theme.',
    activity: 'Change the title and theme color, then hot reload the app on your phone.',
    troubleshooting: [
      { problem: 'flutter is not recognized', solution: 'Add the Flutter SDK bin folder to PATH and open a new terminal.' },
      { problem: 'Android licenses are missing', solution: 'Run flutter doctor --android-licenses, review the licenses, and rerun flutter doctor.' },
    ],
    assessment: { question: 'Is Dart a separate UI toolkit from Flutter?', answer: 'No. Dart is the programming language; Flutter is the UI toolkit and framework built with Dart.' },
  },
  {
    slug: 'ionic-framework',
    title: 'Introduction to Ionic Framework',
    level: 'Beginner',
    minutes: 25,
    summary: 'Create an Ionic React app and understand its web-based mobile UI model.',
    introduction:
      'Ionic provides mobile-style web components and application tooling. With Ionic React, you build screens using React, TypeScript, HTML, and CSS.',
    explanation:
      'Ionic components such as IonPage, IonHeader, IonContent, and IonCard run in a web view. Capacitor can package that web app as an Android or iOS project and provide native plugin access. Flutter renders with Flutter widgets and Dart; Expo Go runs React Native JavaScript; Ionic reuses web skills. Ionic alone is not the native bridge: Capacitor fills that role.',
    objectives: [
      'Explain how Ionic React renders a cross-platform app.',
      'Create and run an Ionic React starter project.',
      'Identify when Capacitor is needed.',
    ],
    tools: ['Node.js LTS and npm', 'Ionic CLI', 'VS Code and an Android device or browser'],
    steps: [
      { title: 'Install Node.js', detail: 'Install a supported Node.js LTS release and confirm node and npm are available in a new terminal.' },
      { title: 'Install Ionic CLI', detail: 'Install the Ionic command line globally, then create a React starter project.' },
      { title: 'Run the web version', detail: 'Start the development server and open the local address it prints. The browser build helps iterate on UI before adding native Android.' },
    ],
    commands: 'npm install --global @ionic/cli\nionic start sensor-ionic blank --type=react\ncd sensor-ionic\nionic serve',
    examples: [{
      filename: 'src/pages/Home.tsx',
      language: 'tsx',
      code: "import { IonCard, IonCardContent, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';\n\nexport default function Home() {\n  return (\n    <IonPage>\n      <IonHeader><IonToolbar><IonTitle>Sensor Monitor</IonTitle></IonToolbar></IonHeader>\n      <IonContent className=\"ion-padding\">\n        <IonCard><IonCardContent>Connect to your Raspberry Pi API.</IonCardContent></IonCard>\n      </IonContent>\n    </IonPage>\n  );\n}",
      explanation: 'Ionic components provide familiar mobile layout and platform-aware styling while React manages the page.',
    }],
    expectedOutput: 'The Ionic starter screen opens in a browser with Ionic mobile styling.',
    activity: 'Replace the starter content with a card that describes one sensor and its measurement unit.',
    troubleshooting: [
      { problem: 'ionic command is missing after installation', solution: 'Open a new terminal and verify npm’s global bin directory is on PATH.' },
      { problem: 'The browser shows a blank page', solution: 'Check the terminal and browser console for a missing import or TypeScript compile error.' },
    ],
    assessment: { question: 'What does Ionic React use to create Android/iOS native project shells?', answer: 'Capacitor.' },
  },
  {
    slug: 'capacitor-android',
    title: 'Capacitor and Native Android Projects',
    level: 'Beginner',
    minutes: 25,
    summary: 'Add Capacitor to Ionic, synchronize Android projects, and use native plugins.',
    introduction:
      'Capacitor bridges a web-based Ionic or React app to native platform projects and APIs.',
    explanation:
      'Ionic is a UI toolkit; Capacitor is the native runtime and plugin bridge. It creates an Android project that Android Studio can open. The web app is built first, then cap sync copies the built web assets and plugin configuration into the native project. For a LAN API, use an explicit configurable HTTP/HTTPS origin and configure Android network policy deliberately. Do not disable TLS validation for production.',
    objectives: [
      'Explain the difference between Ionic UI and Capacitor runtime.',
      'Add Android support and synchronize the native project.',
      'Open the Android project in Android Studio.',
    ],
    tools: ['Node.js and Ionic CLI', 'Capacitor packages', 'Android Studio and Android SDK'],
    steps: [
      { title: 'Enable Capacitor', detail: 'From the Ionic project, add Capacitor packages and initialize the app metadata if the starter did not already configure them.' },
      { title: 'Build and add Android', detail: 'Build the web app, install the Android platform package, and create the native Android project.' },
      { title: 'Synchronize and open', detail: 'Run cap sync after web or plugin changes, then open the Android project in Android Studio.' },
      { title: 'Use plugins intentionally', detail: 'Install official Capacitor plugins for native capabilities such as network status. Request only permissions the app actually needs.' },
    ],
    commands: 'npm install @capacitor/core @capacitor/cli\nnpx cap init SensorMonitor com.example.sensormonitor --web-dir=dist\nnpm install @capacitor/android\nionic build\nnpx cap add android\nnpx cap sync android\nnpx cap open android',
    examples: [{
      filename: 'src/networkStatus.ts',
      language: 'typescript',
      code: "import { Network } from '@capacitor/network';\n\nexport async function getNetworkStatus() {\n  const status = await Network.getStatus();\n  return status.connected ? 'Network available' : 'Device offline';\n}",
      explanation: 'Install the @capacitor/network plugin before importing it. This reports local network availability, not whether the Raspberry Pi API is healthy.',
    }],
    expectedOutput: 'Android Studio opens the generated native project, ready to run on an emulator or connected phone.',
    activity: 'Change a visible web screen, run ionic build and npx cap sync android, and verify the updated screen in Android Studio.',
    troubleshooting: [
      { problem: 'Android project does not include recent web changes', solution: 'Run ionic build followed by npx cap sync android before rebuilding the native app.' },
      { problem: 'Android cannot reach the Pi over HTTP', solution: 'Verify both devices share a reachable LAN and the API binds to 0.0.0.0. Use HTTPS for production and review Android cleartext policy only for a trusted development LAN.' },
    ],
    assessment: { question: 'Which command copies a newly built web app into the native project?', answer: 'npx cap sync android (after the web build).' },
  },
  {
    slug: 'vscode-setup',
    title: 'Setting Up Visual Studio Code',
    level: 'Beginner',
    minutes: 20,
    summary: 'Configure VS Code for Flutter, Dart, React, Ionic, Git, and device debugging.',
    introduction:
      'VS Code is a code editor that can host language extensions, debugging tools, terminals, and Git workflows.',
    explanation:
      'Install the Flutter extension to get Dart support, project commands, and device selection. For Ionic React, install the recommended React/TypeScript tooling. The Android SDK is still provided by Android Studio or its command-line tools; VS Code does not replace it. Keep projects under version control and exclude generated build folders.',
    objectives: [
      'Install framework-specific extensions.',
      'Run a project from the integrated terminal.',
      'Use source control and device debugging.',
    ],
    tools: ['Visual Studio Code', 'Flutter/Dart extensions or React/TypeScript extensions', 'Git and Android Studio SDK tools'],
    steps: [
      { title: 'Open the project folder', detail: 'Use File → Open Folder so VS Code detects the project and its package manifest.' },
      { title: 'Install extensions', detail: 'For Flutter, install the Flutter extension and its Dart dependency. For Ionic React, enable TypeScript and ESLint tooling appropriate to the repository.' },
      { title: 'Select a device', detail: 'Connect an Android phone with USB debugging enabled or start an emulator; select it in the VS Code status bar.' },
      { title: 'Use Git', detail: 'Review changes before staging. Keep secrets such as production credentials and private API keys out of committed configuration.' },
    ],
    commands: 'code .\nflutter devices\nflutter run\nnpm install\nionic serve',
    examples: [{
      filename: '.gitignore',
      language: 'text',
      code: '.dart_tool/\n.dart_tool/package_config.json\nbuild/\nnode_modules/\ndist/\nandroid/local.properties\n.env',
      explanation: 'Ignore generated artifacts and local secrets. Retain the project lockfiles so collaborators install reproducible dependency versions.',
    }],
    expectedOutput: 'VS Code recognizes the project, displays the connected device, and runs the selected framework task.',
    activity: 'Create a Git branch, make a small UI change, inspect the diff, and commit it without adding generated files.',
    troubleshooting: [
      { problem: 'No Android device appears', solution: 'Enable USB debugging, approve the computer prompt, install the OEM USB driver if needed, and check adb devices.' },
      { problem: 'The editor reports missing packages', solution: 'Run flutter pub get or npm install from the folder containing the correct project manifest.' },
    ],
    assessment: { question: 'Does VS Code include the Android SDK?', answer: 'No. Install Android SDK tools separately, commonly through Android Studio.' },
  },
  {
    slug: 'android-studio',
    title: 'Installing and Configuring Android Studio',
    level: 'Beginner',
    minutes: 25,
    summary: 'Install Android SDK tools, create an emulator, and connect a physical Android phone.',
    introduction:
      'Android Studio is Google’s IDE for Android development and the normal desktop manager for Android SDKs, emulators, and Gradle builds.',
    explanation:
      'Flutter and Ionic can be authored in VS Code, but Android builds depend on Android SDK platform tools and build tools. Android Studio’s Device Manager creates virtual devices. A physical phone needs Developer options and USB debugging. Keep SDK versions compatible with the framework and plugins used by the app.',
    objectives: [
      'Install Android Studio and an SDK platform.',
      'Create an emulator or connect a USB-debugging phone.',
      'Build Flutter or Capacitor projects with the Android toolchain.',
    ],
    tools: ['Android Studio', 'Android SDK Platform Tools and Build Tools', 'Hardware virtualization support for an emulator or a USB cable'],
    steps: [
      { title: 'Install Android Studio', detail: 'Use the official installer and select Android SDK, Platform Tools, and at least one SDK platform.' },
      { title: 'Create a virtual device', detail: 'Open Device Manager, choose a device profile and system image, then start the emulator.' },
      { title: 'Connect a physical phone', detail: 'Enable Developer options and USB debugging on the phone, connect it, approve the RSA prompt, and verify it with adb devices.' },
      { title: 'Validate Flutter tooling', detail: 'Run flutter doctor and accept Android licenses before launching the Flutter app.' },
    ],
    commands: 'adb devices\nflutter doctor --android-licenses\nflutter devices',
    examples: [{
      filename: 'Device verification',
      language: 'text',
      code: 'List of devices attached\nR58M123456A    device',
      explanation: 'A device marked “device” is authorized. “unauthorized” means the phone has not approved this computer’s USB debugging key.',
    }],
    expectedOutput: 'The emulator or phone appears in adb devices and in the framework’s device list.',
    activity: 'Run a starter app on an emulator, then disconnect it and run the same app on a physical Android phone.',
    troubleshooting: [
      { problem: 'Gradle cannot download dependencies', solution: 'Check internet access, proxy settings, disk space, and the Gradle error details before changing wrapper versions.' },
      { problem: 'Emulator is slow or fails to start', solution: 'Check hardware virtualization and available memory; use a compatible system image or a physical phone.' },
    ],
    assessment: { question: 'Which Android tool reports connected devices to the command line?', answer: 'adb, included with Android SDK Platform Tools.' },
  },
  {
    slug: 'mobile-ui-widgets',
    title: 'Building Mobile Interfaces and Dashboards',
    level: 'Intermediate',
    minutes: 35,
    summary: 'Create responsive sensor cards, navigation, loading states, and accessible layouts.',
    introduction:
      'A useful monitoring screen presents current values, units, timestamps, connectivity, and understandable error states.',
    explanation:
      'Flutter composes widgets such as Scaffold, AppBar, Card, NavigationBar, and LayoutBuilder. Ionic React composes IonPage, IonHeader, IonCard, IonTabs, and CSS grid. Keep sensor display components separate from network code. Show loading, offline, stale, and empty states instead of presenting missing readings as real measurements.',
    objectives: [
      'Build reusable cards for ToF distance, light, soil moisture, and connection status.',
      'Use responsive layouts and platform navigation.',
      'Show loading and error states accessibly.',
    ],
    tools: ['Flutter SDK or Ionic React project', 'Android emulator or phone', 'Sample UI data during initial layout only'],
    steps: [
      { title: 'Sketch the hierarchy', detail: 'Put connection status and last-update time near the top, then arrange the three sensor cards in a responsive grid.' },
      { title: 'Create reusable cards', detail: 'Pass each reading and unit into a reusable component. Format null values as “No reading” rather than zero.' },
      { title: 'Add navigation', detail: 'Add clear Dashboard, History, and Settings destinations. Preserve reachable touch targets and text contrast.' },
      { title: 'Add UI states', detail: 'Represent loading, offline, stale, and API error states distinctly.' },
    ],
    commands: 'flutter run\n# Ionic React\nionic serve',
    examples: [{
      filename: 'Flutter sensor card',
      language: 'dart',
      code: "Widget sensorCard(String label, String? value, String unit) => Card(\n  child: Padding(\n    padding: const EdgeInsets.all(16),\n    child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [\n      Text(label),\n      const SizedBox(height: 8),\n      Text(value == null ? 'No reading' : '$value $unit',\n        style: Theme.of(context).textTheme.headlineSmall),\n    ]),\n  ),\n);",
      explanation: 'Use a nullable display value so an absent reading is never silently shown as a valid zero.',
    }],
    expectedOutput: 'A dashboard with separate sensor cards, a status indicator, and navigation that adapts to phone width.',
    activity: 'Add three cards showing a current reading, unit, and timestamp. Then test the layout at narrow and wide screen sizes.',
    troubleshooting: [
      { problem: 'Cards overflow on a small phone', solution: 'Use a single-column layout below a width breakpoint and allow long labels to wrap.' },
      { problem: 'Missing readings look like zero', solution: 'Use nullable values and render an explicit unavailable state.' },
    ],
    assessment: { question: 'Why should a missing sensor value not be rendered as 0?', answer: 'Zero is a valid measurement and can be mistaken for real data; show an explicit no-reading state.' },
  },
  {
    slug: 'rest-api-integration',
    title: 'REST API Integration',
    level: 'Intermediate',
    minutes: 30,
    summary: 'Call FastAPI over HTTP and safely parse current and historical readings.',
    introduction:
      'REST gives a mobile app a simple request/response interface to current and stored sensor readings.',
    explanation:
      'This project’s backend already implements GET /api/readings/current, GET /api/readings?limit=100, and GET /api/health. The current endpoint returns an envelope such as {\"reading\": null} or {\"reading\": {\"timestamp\": ..., \"tof_distance_mm\": ..., \"light_lux\": ..., \"soil_moisture_percent\": ...}}. Configure the base URL at runtime; do not hardcode a specific LAN address into a published app. Handle non-2xx responses, timeouts, missing readings, and changing local addresses.',
    objectives: [
      'Configure an API base URL.',
      'Fetch and parse the current reading envelope.',
      'Handle unavailable or invalid responses without showing fake sensor values.',
    ],
    tools: ['Flutter http package or browser fetch in Ionic React', 'FastAPI running on the Raspberry Pi', 'Phone and Pi on a reachable network'],
    steps: [
      { title: 'Start the API', detail: 'On the Pi, run the backend bound to 0.0.0.0 and note the Pi’s reachable LAN address.' },
      { title: 'Configure the origin', detail: 'Enter the Pi address and port in app settings, for example http://192.168.1.50:8080. Replace the example address with the actual Pi address.' },
      { title: 'Request current data', detail: 'Call /api/readings/current, verify the HTTP status, and decode the reading property. A null reading means the database has no data yet.' },
      { title: 'Load history and health', detail: 'Use /api/readings?limit=100 for stored data and /api/health for service status.' },
    ],
    commands: 'curl http://<PI_LAN_IP>:8080/api/health\ncurl http://<PI_LAN_IP>:8080/api/readings/current\ncurl \"http://<PI_LAN_IP>:8080/api/readings?limit=100\"',
    examples: [
      {
        filename: 'Flutter current-reading request',
        language: 'dart',
        code: "final response = await http.get(\n  Uri.parse('\${baseUrl}/api/readings/current'),\n).timeout(const Duration(seconds: 5));\nif (response.statusCode != 200) {\n  throw Exception('Sensor API returned \${response.statusCode}');\n}\nfinal body = jsonDecode(response.body) as Map<String, dynamic>;\nfinal reading = body['reading'] as Map<String, dynamic>?;",
        explanation: 'Add package:http to pubspec.yaml and import dart:convert and package:http/http.dart as http. Keep a null reading distinct from a failed request.',
      },
      {
        filename: 'Ionic React current-reading request',
        language: 'tsx',
        code: "const response = await fetch(`${baseUrl}/api/readings/current`, {\n  signal: AbortSignal.timeout(5000),\n});\nif (!response.ok) throw new Error(`Sensor API returned ${response.status}`);\nconst body: { reading: SensorReading | null } = await response.json();\nsetReading(body.reading);",
        explanation: 'Use the configured baseUrl and validate the response before updating the screen.',
      },
    ],
    expectedOutput: 'A real JSON response from the Pi; if no MQTT messages were stored yet, the current reading field is null.',
    activity: 'Fetch /api/readings/current from the phone and display ToF in mm, light in lux, soil in %, and the reading timestamp.',
    troubleshooting: [
      { problem: 'Connection refused or request times out', solution: 'Confirm the API is running, bound to 0.0.0.0, reachable through the firewall, and addressed by the Pi LAN IP rather than localhost.' },
      { problem: 'Browser blocks the request', solution: 'For Ionic web development, configure FastAPI CORS for the exact development origin; do not use unrestricted origins with credentials in production.' },
    ],
    assessment: { question: 'What should the app show when the API returns {\"reading\": null}?', answer: 'An explicit “No reading yet” state; do not display fabricated sensor values.' },
  },
  {
    slug: 'websocket-communication',
    title: 'WebSocket Communication',
    level: 'Intermediate',
    minutes: 30,
    summary: 'Understand push updates and add an optional WebSocket endpoint to FastAPI.',
    introduction:
      'WebSockets keep a connection open so a server can push updates without the app repeatedly making HTTP requests.',
    explanation:
      'The requested /ws/readings path is not currently implemented by this project’s main.py. The project already supports REST polling, which works without server changes. The example below is an optional starter endpoint that polls the existing database and pushes only new readings; it must be added to the backend and tested before clients rely on it. For production, publish updates directly from the MQTT ingest path through a managed async connection layer and protect the socket appropriately.',
    objectives: [
      'Compare periodic REST polling with WebSocket push.',
      'Understand that /ws/readings requires backend implementation.',
      'Handle disconnects and reconnects in a mobile client.',
    ],
    tools: ['FastAPI and Uvicorn', 'Flutter web_socket_channel or browser WebSocket', 'A client on the same LAN as the Pi'],
    steps: [
      { title: 'Keep REST working', detail: 'Use the existing current-reading endpoint as the reliable baseline and fallback.' },
      { title: 'Add an optional socket route', detail: 'Add the example route to main.py; it reads persisted data and sends only a changed timestamp. This polling-based example is for learning, not an event-driven production design.' },
      { title: 'Connect a client', detail: 'Use ws:// on a trusted local network. For HTTPS deployments, use wss:// and a valid certificate.' },
      { title: 'Recover from disconnects', detail: 'Show connection status, retry with bounded backoff, and return to REST polling if the socket remains unavailable.' },
    ],
    commands: 'pip install fastapi uvicorn\n# Run from the backend folder after adding the route:\nuvicorn main:app --host 0.0.0.0 --port 8080',
    examples: [
      {
        filename: 'main.py (optional starter route)',
        language: 'python',
        code: "import asyncio\nfrom fastapi import WebSocket, WebSocketDisconnect\n\n@app.websocket('/ws/readings')\nasync def stream_readings(websocket: WebSocket):\n    await websocket.accept()\n    last_timestamp = None\n    try:\n        while True:\n            result = await asyncio.to_thread(current_reading)\n            reading = result.get('reading')\n            if reading and reading['timestamp'] != last_timestamp:\n                await websocket.send_json({'reading': reading})\n                last_timestamp = reading['timestamp']\n            await asyncio.sleep(1)\n    except WebSocketDisconnect:\n        return",
        explanation: 'This example relies on the existing current_reading function and stored database records. Import WebSocket and WebSocketDisconnect. The one-second polling loop is simple but not a production push/broadcast architecture.',
      },
      {
        filename: 'Ionic React WebSocket client',
        language: 'tsx',
        code: "const socket = new WebSocket(`${wsBaseUrl}/ws/readings`);\nsocket.onmessage = (event) => {\n  const message: { reading: SensorReading } = JSON.parse(event.data);\n  setReading(message.reading);\n};\nsocket.onerror = () => setConnectionState('error');\nsocket.onclose = () => setConnectionState('reconnecting');\nreturn () => socket.close();",
        explanation: 'Build wsBaseUrl from the configured API origin, replacing http with ws and https with wss. Close the socket when its screen unmounts.',
      },
    ],
    expectedOutput: 'After implementing the optional backend route, a connected client receives a JSON reading when a newer timestamp is stored.',
    activity: 'Add the route in a local test branch, connect a WebSocket client, then stop the API and verify the UI reports disconnection.',
    troubleshooting: [
      { problem: '404 on /ws/readings', solution: 'The WebSocket route is optional and is not in the existing backend. Add and restart the route before connecting.' },
      { problem: 'Socket closes immediately', solution: 'Check ws/wss scheme, host, port, reverse proxy WebSocket upgrade support, and server logs.' },
    ],
    assessment: { question: 'Does this project’s existing main.py already provide /ws/readings?', answer: 'No. It currently provides REST endpoints; the lesson shows an optional WebSocket extension.' },
  },
  {
    slug: 'mqtt-communication',
    title: 'MQTT Communication for Mobile Apps',
    level: 'Intermediate',
    minutes: 25,
    summary: 'Understand MQTT roles and why mobile apps normally consume the Pi API instead of the broker.',
    introduction:
      'MQTT is a lightweight publish/subscribe protocol used by the ESP32 and Raspberry Pi in this project.',
    explanation:
      'The ESP32 publishes readings to esp32/tof_light_soil_data and Mosquitto routes them to the Pi backend subscriber. The backend validates and stores the readings before exposing them through FastAPI. This keeps broker credentials and network access on the trusted device/backend side. A mobile client can use MQTT only if the broker deliberately exposes an authenticated TLS or WSS listener and the app manages credentials safely; never expose an unauthenticated broker to the Internet.',
    objectives: [
      'Identify MQTT publisher, broker, topic, and subscriber.',
      'Trace ESP32 readings through Mosquitto into FastAPI.',
      'Choose REST/WebSocket for mobile access unless secure broker access is intentionally configured.',
    ],
    tools: ['Mosquitto on Raspberry Pi', 'ESP32 firmware', 'Backend MQTT subscriber and FastAPI'],
    steps: [
      { title: 'Verify the broker', detail: 'Check Mosquitto status on the Pi and confirm the configured MQTT host, port, and credentials.' },
      { title: 'Watch the sensor topic', detail: 'Subscribe locally on the Pi to confirm ESP32 messages arrive on esp32/tof_light_soil_data.' },
      { title: 'Follow backend ingestion', detail: 'Check the backend logs and /api/health. The mobile app then reads persisted data from FastAPI.' },
      { title: 'Protect remote access', detail: 'Keep plain MQTT port 1883 on the trusted LAN. For remote use, prefer VPN plus authenticated TLS, or a secured WSS listener and short-lived credentials.' },
    ],
    commands: 'sudo systemctl status mosquitto\nmosquitto_sub -h 127.0.0.1 -p 1883 -t esp32/tof_light_soil_data -v\ncurl http://<PI_LAN_IP>:8080/api/health',
    examples: [{
      filename: 'Data path',
      language: 'text',
      code: 'ESP32 publisher\n  → Mosquitto topic: esp32/tof_light_soil_data\n  → Python MQTT subscriber\n  → SQLite readings table\n  → FastAPI REST API\n  → Mobile dashboard',
      explanation: 'This is the implemented architecture. The mobile app does not need broker credentials to display sensor readings.',
    }],
    expectedOutput: 'A JSON sensor message appears on the broker topic and later appears in the FastAPI current/history endpoint.',
    activity: 'Publish one test reading on a local development broker and follow it through the subscriber and API logs. Do not publish fake values as real device measurements.',
    troubleshooting: [
      { problem: 'Broker is connected but no readings are stored', solution: 'Check the topic name, ESP32 publisher, backend subscription, payload validation, and server logs.' },
      { problem: 'Considering direct public MQTT access', solution: 'Do not expose an unauthenticated broker. Keep it private or use an authenticated TLS/WSS setup with restricted topic permissions.' },
    ],
    assessment: { question: 'Why does this course route mobile sensor access through FastAPI?', answer: 'FastAPI provides a controlled API over stored, validated readings without distributing MQTT broker credentials to the app.' },
  },
  {
    slug: 'raspberry-pi-fastapi',
    title: 'Connecting to Raspberry Pi FastAPI',
    level: 'Intermediate',
    minutes: 30,
    summary: 'Configure the Pi address and API port, verify health, and understand the backend contract.',
    introduction:
      'The Raspberry Pi acts as the local gateway between the ESP32 MQTT sensor network and mobile clients.',
    explanation:
      'The repository’s main.py starts FastAPI on port 8080 when run with Uvicorn and currently exposes /api/readings/current, /api/readings?limit=..., and /api/health. It subscribes to MQTT and stores records in SQLite. Bind the server to 0.0.0.0 for reachable LAN access, configure the app’s origin in settings, and allow the port through the Pi firewall only to trusted networks. For remote access, use a VPN or authenticated TLS reverse proxy rather than router port forwarding.',
    objectives: [
      'Run the backend and identify its existing endpoints.',
      'Configure a mobile app with a user-entered Pi origin.',
      'Explain safe LAN and remote access choices.',
    ],
    tools: ['Raspberry Pi OS', 'Python backend and project dependencies', 'Phone and Pi on the same trusted Wi-Fi'],
    steps: [
      { title: 'Start services', detail: 'Start Mosquitto, activate the Python environment, and run Uvicorn bound to 0.0.0.0:8080.' },
      { title: 'Find the Pi address', detail: 'Run hostname -I on the Pi and use the reachable LAN address; DHCP reservations make it more stable.' },
      { title: 'Check API health', detail: 'From a browser or terminal on the same network, request /api/health and /api/readings/current.' },
      { title: 'Set the app origin', detail: 'Enter http://<PI_LAN_IP>:8080 in the app settings. On a production deployment use HTTPS with a trusted certificate.' },
    ],
    commands: 'hostname -I\nuvicorn main:app --host 0.0.0.0 --port 8080\ncurl http://<PI_LAN_IP>:8080/api/health',
    examples: [{
      filename: 'Expected endpoint responses',
      language: 'json',
      code: '{\n  "status": "ok",\n  "mqtt_connected": true,\n  "stored_readings": 42\n}\n\n{\n  "reading": {\n    "timestamp": "2026-10-25T16:30:22.307Z",\n    "tof_distance_mm": 219.0,\n    "light_lux": 28.33,\n    "soil_raw": 2194,\n    "soil_moisture_percent": 25.8,\n    "rssi": -53\n  }\n}',
      explanation: 'The shape matches the existing main.py health and current-reading endpoints. Real values depend on sensor messages actually received and stored.',
    }],
    expectedOutput: 'The Pi health endpoint responds and a mobile app can retrieve a real current reading when one has been stored.',
    activity: 'Change the IP in app settings to the Pi’s actual LAN address and verify the app can reach /api/health without rebuilding.',
    troubleshooting: [
      { problem: 'Works on the Pi but not on the phone', solution: 'Use the Pi LAN address, not localhost; check Wi-Fi isolation, firewall rules, server bind address, and phone network.' },
      { problem: 'The Pi address changes', solution: 'Use a DHCP reservation or re-enter the current address in app settings.' },
    ],
    assessment: { question: 'Why is a configurable API origin better than hardcoding one Pi IP?', answer: 'LAN addresses differ between installations and can change, so configuration lets the same app work without rebuilding.' },
  },
  {
    slug: 'display-sensor-data',
    title: 'Displaying ESP32 Sensor Data',
    level: 'Intermediate',
    minutes: 30,
    summary: 'Map API fields to sensor units, connection state, and readable mobile UI.',
    introduction:
      'The phone receives measurements as JSON and presents them with units and timestamps.',
    explanation:
      'The VL53L0X reports distance in millimeters, the BH1750 reports light in lux, and the calibrated capacitive probe reports soil moisture as a percentage. A stale timestamp can indicate that the app can reach the Pi but new sensor data has stopped. Show RSSI in dBm as a link-quality indicator, not as a sensor measurement. Validate fields and handle null ToF data explicitly.',
    objectives: [
      'Map the project API response to UI fields and units.',
      'Show last-update and connection freshness.',
      'Distinguish missing, stale, and current measurements.',
    ],
    tools: ['Flutter or Ionic client', 'FastAPI response schema', 'A real sensor pipeline or test device'],
    steps: [
      { title: 'Parse fields', detail: 'Read tof_distance_mm, light_lux, soil_moisture_percent, rssi, and timestamp from the reading object.' },
      { title: 'Format values', detail: 'Show mm, lx, %, and dBm with consistent decimal precision and an accessible label.' },
      { title: 'Assess freshness', detail: 'Compare timestamp age with the expected ESP32 publishing interval and label old readings as stale.' },
      { title: 'Represent missing data', detail: 'Show “Unavailable” or “No reading yet” rather than inventing a numeric value.' },
    ],
    commands: 'curl http://<PI_LAN_IP>:8080/api/readings/current',
    examples: [{
      filename: 'Flutter reading model',
      language: 'dart',
      code: "class SensorReading {\n  const SensorReading({this.distanceMm, this.lightLux, this.soilPercent, required this.timestamp});\n  final double? distanceMm;\n  final double? lightLux;\n  final double? soilPercent;\n  final DateTime timestamp;\n\n  factory SensorReading.fromJson(Map<String, dynamic> json) => SensorReading(\n    distanceMm: (json['tof_distance_mm'] as num?)?.toDouble(),\n    lightLux: (json['light_lux'] as num?)?.toDouble(),\n    soilPercent: (json['soil_moisture_percent'] as num?)?.toDouble(),\n    timestamp: DateTime.parse(json['timestamp'] as String),\n  );\n}",
      explanation: 'The numeric casts accept JSON integers and decimals. Nullable fields prevent an unavailable sensor value from being misrepresented.',
    }],
    expectedOutput: 'Each available reading appears with a correct unit and timestamp; unavailable fields are clearly labeled.',
    activity: 'Display all three sensor values and add a freshness label that distinguishes a recent reading from an old one.',
    troubleshooting: [
      { problem: 'A JSON cast fails on some readings', solution: 'Parse numeric fields using num? and convert to double; check for null before formatting.' },
      { problem: 'Values look stale despite an online API', solution: 'Compare the reading timestamp and backend MQTT status; API reachability alone does not mean the sensor is publishing.' },
    ],
    assessment: { question: 'Which unit should be shown for BH1750 readings?', answer: 'Lux (lx), a measure of illuminance.' },
  },
  {
    slug: 'sensor-graphs',
    title: 'Sensor Graphs and Historical Readings',
    level: 'Intermediate',
    minutes: 35,
    summary: 'Load stored history and visualize time-series data without confusing units.',
    introduction:
      'Charts help reveal trends that are hard to see in a single sensor reading.',
    explanation:
      'The project exposes stored readings via GET /api/readings?limit=100. Order and timestamps matter: this endpoint currently returns newest-first data, so reverse a copy before drawing a left-to-right time series. Give distance, lux, and moisture separate charts or scales because their units differ. Handle empty history and downsample large lists on the client.',
    objectives: [
      'Fetch historical readings from the existing endpoint.',
      'Plot time-series values with correctly labeled units.',
      'Handle empty, null, and dense datasets.',
    ],
    tools: ['Flutter fl_chart or Ionic chart library', 'FastAPI history endpoint', 'Stored sensor readings in SQLite'],
    steps: [
      { title: 'Request a bounded window', detail: 'Fetch /api/readings?limit=100 instead of downloading an unbounded history.' },
      { title: 'Normalize data', detail: 'Parse timestamps, reverse newest-first results for chronological plotting, and filter null values per sensor.' },
      { title: 'Draw separate charts', detail: 'Keep mm, lux, and percent on separate charts with axis labels, units, and a visible time range.' },
      { title: 'Handle chart states', detail: 'Show an empty-state message until readings exist and a loading indicator while history is fetched.' },
    ],
    commands: 'curl \"http://<PI_LAN_IP>:8080/api/readings?limit=100\"',
    examples: [{
      filename: 'Flutter fl_chart points',
      language: 'dart',
      code: "final points = readings\n    .reversed\n    .where((reading) => reading.lightLux != null)\n    .toList();\nfinal spots = points.asMap().entries.map((entry) =>\n  FlSpot(entry.key.toDouble(), entry.value.lightLux!),\n).toList();\n// Render spots with LineChart(LineChartData(...)).",
      explanation: 'Add fl_chart to pubspec.yaml. Reverse a copy for chronological order and filter null measurements before creating chart points.',
    }],
    expectedOutput: 'A chronological line chart with a labeled unit and a sensible empty state when there are no saved readings.',
    activity: 'Build a light-intensity chart from real history and allow the user to select a 25-, 50-, or 100-reading window.',
    troubleshooting: [
      { problem: 'The chart runs backward in time', solution: 'The history endpoint returns newest-first. Reverse the list before plotting.' },
      { problem: 'Distance and lux charts have unreadable scales', solution: 'Use separate charts or axes for values with different physical units and ranges.' },
    ],
    assessment: { question: 'Why should lux and millimeters usually use separate charts?', answer: 'They are different physical quantities with different units and ranges; sharing a scale can make trends misleading.' },
  },
  {
    slug: 'flutter-iot-application',
    title: 'Complete Flutter IoT Application',
    level: 'Advanced',
    minutes: 60,
    summary: 'Build a configurable Flutter dashboard using REST, optional WebSockets, and history charts.',
    introduction:
      'In this project, Flutter displays real ESP32 readings collected and served by the Raspberry Pi.',
    explanation:
      'Add http, web_socket_channel, fl_chart, and shared_preferences to pubspec.yaml. Use shared preferences for non-secret LAN settings only; do not store long-lived production credentials in plain preferences. REST is the working baseline with this repository. A /ws/readings connection is optional and works only after implementing the backend route from the WebSocket lesson. Use a five-second timeout and surface API errors instead of filling the dashboard with simulated values.',
    objectives: [
      'Create a Flutter project with HTTP, WebSocket, chart, and settings dependencies.',
      'Configure the Pi API origin without hardcoding one address.',
      'Build current readings and historical charts with error states.',
    ],
    tools: ['Flutter SDK and Android toolchain', 'Raspberry Pi FastAPI backend', 'Android phone on the same network'],
    steps: [
      { title: 'Create the project and add dependencies', detail: 'Add the packages shown in the manifest example and run flutter pub get.' },
      { title: 'Implement settings', detail: 'Let users enter the API origin and save it locally. Validate http/https scheme and host.' },
      { title: 'Connect REST first', detail: 'Fetch /api/readings/current and /api/readings?limit=100. Display empty and error states.' },
      { title: 'Add streaming optionally', detail: 'Only connect to /ws/readings after the backend route is implemented; retain REST refresh as a fallback.' },
      { title: 'Run on Android', detail: 'Use the Pi LAN address from a physical phone, then test offline recovery and invalid settings.' },
    ],
    commands: 'flutter create sensor_mobile\ncd sensor_mobile\nflutter pub add http web_socket_channel fl_chart shared_preferences\nflutter run',
    examples: [
      {
        filename: 'pubspec.yaml (dependencies)',
        language: 'yaml',
        code: 'dependencies:\n  flutter:\n    sdk: flutter\n  http: ^1.2.0\n  web_socket_channel: ^3.0.0\n  fl_chart: ^0.70.0\n  shared_preferences: ^2.3.0',
        explanation: 'Use compatible current package releases when creating the project and commit pubspec.lock for an application. Check the package changelog before upgrading.',
      },
      {
        filename: 'lib/main.dart (REST dashboard starter)',
        language: 'dart',
        code: "import 'dart:convert';\nimport 'package:flutter/material.dart';\nimport 'package:http/http.dart' as http;\n\nvoid main() => runApp(const MaterialApp(home: SensorDashboard()));\n\nclass SensorDashboard extends StatefulWidget {\n  const SensorDashboard({super.key});\n  @override\n  State<SensorDashboard> createState() => _SensorDashboardState();\n}\n\nclass _SensorDashboardState extends State<SensorDashboard> {\n  final _origin = TextEditingController(text: 'http://192.168.1.50:8080');\n  Map<String, dynamic>? _reading;\n  String? _error;\n  bool _loading = false;\n\n  Future<void> _refresh() async {\n    setState(() { _loading = true; _error = null; });\n    try {\n      final origin = _origin.text.trim().replaceAll(RegExp(r'/+$'), '');\n      final response = await http.get(Uri.parse('\$origin/api/readings/current'))\n          .timeout(const Duration(seconds: 5));\n      if (response.statusCode != 200) throw Exception('HTTP \${response.statusCode}');\n      final body = jsonDecode(response.body) as Map<String, dynamic>;\n      if (!mounted) return;\n      setState(() => _reading = body['reading'] as Map<String, dynamic>?);\n    } catch (error) {\n      if (!mounted) return;\n      setState(() => _error = error.toString());\n    } finally {\n      if (mounted) setState(() => _loading = false);\n    }\n  }\n\n  @override\n  void dispose() { _origin.dispose(); super.dispose(); }\n\n  @override\n  Widget build(BuildContext context) => Scaffold(\n    appBar: AppBar(title: const Text('ESP32 Sensor Monitor')),\n    body: ListView(padding: const EdgeInsets.all(16), children: [\n      TextField(controller: _origin, decoration: const InputDecoration(labelText: 'Raspberry Pi API origin')),\n      const SizedBox(height: 8),\n      FilledButton(onPressed: _loading ? null : _refresh, child: const Text('Refresh readings')),\n      if (_loading) const LinearProgressIndicator(),\n      if (_error != null) Text('API unavailable: \$_error'),\n      if (!_loading && _error == null && _reading == null) const Text('No sensor reading has been stored yet.'),\n      if (_reading != null) ...[\n        _value('Distance', _reading!['tof_distance_mm'], 'mm'),\n        _value('Light', _reading!['light_lux'], 'lx'),\n        _value('Soil moisture', _reading!['soil_moisture_percent'], '%'),\n        Text('Updated: \${_reading!['timestamp']}'),\n      ],\n    ]),\n  );\n\n  Widget _value(String label, Object? value, String unit) => Card(\n    child: ListTile(title: Text(label), trailing: Text(value == null ? 'Unavailable' : '\$value \$unit')),\n  );\n}",
        explanation: 'This compilable starter has configurable LAN API origin, timeout, empty state, and request error handling. Add SharedPreferences for persistence, fl_chart for the history endpoint, and web_socket_channel only after implementing the optional backend WebSocket route.',
      },
    ],
    expectedOutput: 'After entering the actual Pi address and pressing Refresh, the dashboard shows real stored readings or a clear empty/error state.',
    activity: 'Run this app on a phone and Pi on the same Wi-Fi. Test a valid origin, an invalid port, and an API with no stored readings.',
    troubleshooting: [
      { problem: 'Android blocks local HTTP traffic', solution: 'Prefer HTTPS for deployed apps. For a trusted development LAN, configure the narrowest Android cleartext policy needed rather than globally weakening network security.' },
      { problem: 'No updates appear automatically', solution: 'The starter refresh is manual. Add a Timer for periodic REST polling or implement the optional server WebSocket route first.' },
    ],
    assessment: { question: 'Can this Flutter starter rely on /ws/readings in the current repository?', answer: 'No. main.py currently exposes REST only; add and test a WebSocket endpoint before enabling streaming.' },
  },
  {
    slug: 'ionic-capacitor-iot-app',
    title: 'Complete Ionic + Capacitor IoT Application',
    level: 'Advanced',
    minutes: 60,
    summary: 'Build an Ionic React dashboard for the Pi API and package it as an Android app.',
    introduction:
      'Ionic React provides the UI; Capacitor adds native Android packaging and plugin access.',
    explanation:
      'The same API origin and payload contract used in Flutter apply here. Start with fetch against the real /api/readings/current endpoint and validate null and error states. Browser WebSocket is available to Ionic web screens, but /ws/readings must be implemented on the backend first. Capacitor packages the built web app; it does not automatically make LAN HTTP safe or provide a backend.',
    objectives: [
      'Create an Ionic React project with Capacitor Android support.',
      'Fetch current sensor readings from FastAPI.',
      'Build and test the Android wrapper.',
    ],
    tools: ['Node.js LTS and Ionic CLI', 'React/TypeScript', 'Capacitor, Android Studio, and Pi FastAPI'],
    steps: [
      { title: 'Create the React app', detail: 'Create an Ionic React starter and install dependencies.' },
      { title: 'Configure the API origin', detail: 'Collect the Pi host and port in an app settings screen; form the REST URL from user input.' },
      { title: 'Implement REST UI states', detail: 'Fetch current readings and render loading, real data, no-reading, and request-error states.' },
      { title: 'Add Android platform', detail: 'Build the web app, add Capacitor Android, sync, then open Android Studio.' },
      { title: 'Use WebSocket only when available', detail: 'Add a client socket only after deploying the optional backend route; use bounded reconnects and keep REST refresh as a fallback.' },
    ],
    commands: 'ionic start sensor-mobile blank --type=react\ncd sensor-mobile\nnpm install @capacitor/core @capacitor/cli @capacitor/android\nionic build\nnpx cap add android\nnpx cap sync android\nnpx cap open android',
    examples: [
      {
        filename: 'src/api.ts',
        language: 'typescript',
        code: "export type SensorReading = {\n  timestamp: string;\n  tof_distance_mm: number | null;\n  light_lux: number | null;\n  soil_moisture_percent: number | null;\n  rssi: number | null;\n};\n\nexport async function getCurrentReading(origin: string): Promise<SensorReading | null> {\n  const response = await fetch(\`\${origin.replace(/\\/+$/, '')}/api/readings/current\`, {\n    signal: AbortSignal.timeout(5000),\n  });\n  if (!response.ok) throw new Error(\`API returned HTTP \${response.status}\`);\n  const body: { reading: SensorReading | null } = await response.json();\n  return body.reading;\n}",
        explanation: 'Build the endpoint from a user-configured origin, enforce a timeout, and propagate errors so the UI can report offline status.',
      },
      {
        filename: 'src/pages/Home.tsx',
        language: 'tsx',
        code: "const [reading, setReading] = useState<SensorReading | null>(null);\nconst [error, setError] = useState<string>();\n\nasync function refresh() {\n  try { setError(undefined); setReading(await getCurrentReading(apiOrigin)); }\n  catch (cause) { setError(cause instanceof Error ? cause.message : 'Request failed'); }\n}\n\n<IonButton onClick={refresh}>Refresh</IonButton>\n{error && <IonText color=\"danger\">Pi API unavailable: {error}</IonText>}\n{reading && <IonCard><IonCardContent>\n  ToF: {reading.tof_distance_mm ?? 'Unavailable'} mm<br />\n  Light: {reading.light_lux ?? 'Unavailable'} lx<br />\n  Soil: {reading.soil_moisture_percent ?? 'Unavailable'}%\n</IonCardContent></IonCard>}",
        explanation: 'This snippet uses Ionic controls and real API response fields. Place hooks inside the page component and import the corresponding React and Ionic symbols.',
      },
    ],
    expectedOutput: 'The web preview displays real readings; after Capacitor sync, the Android project runs the same UI on a phone.',
    activity: 'Configure the actual Pi address, run the Ionic app on Android, and compare the readings to /api/readings/current in a browser.',
    troubleshooting: [
      { problem: 'The Android app shows a CORS error in web preview', solution: 'Allow the exact Ionic development origin in FastAPI CORS settings; native WebView requests and browser requests can have different origin behavior.' },
      { problem: 'Native app still shows old UI', solution: 'Run ionic build and npx cap sync android before rebuilding the native app.' },
    ],
    assessment: { question: 'What is the key difference between the Flutter and Ionic implementations?', answer: 'Flutter uses Dart and Flutter widgets; Ionic uses React/web technologies and Capacitor for native packaging.' },
  },
  {
    slug: 'android-build-release',
    title: 'Android APK Building and Deployment',
    level: 'Advanced',
    minutes: 35,
    summary: 'Build debug and release Android packages with Flutter or Ionic + Capacitor.',
    introduction:
      'An APK can be installed directly on Android for testing; Play Store distribution commonly uses an Android App Bundle.',
    explanation:
      'Flutter debug APKs and Capacitor Android builds are for development. A production release needs a unique application ID, a securely managed signing key, tested permissions, network policy, and a release build. Never commit signing secrets. For Capacitor, sync the web build before opening Android Studio; for Flutter, use Flutter’s release build commands.',
    objectives: [
      'Distinguish debug and release packages.',
      'Build an APK using Flutter or Android Studio.',
      'Protect signing keys and validate API network configuration.',
    ],
    tools: ['Flutter SDK or Ionic + Capacitor', 'Android Studio / Gradle', 'A test Android phone'],
    steps: [
      { title: 'Build and test debug', detail: 'Run the app on a real phone and verify API origin settings, offline behavior, and required Android permissions.' },
      { title: 'Prepare release configuration', detail: 'Set a stable application ID, app version, icons, release network security, and signing configuration.' },
      { title: 'Create a release artifact', detail: 'Use flutter build apk --release or build the Capacitor Android app from Android Studio/Gradle.' },
      { title: 'Install and verify', detail: 'Install the release package on a test phone and confirm it connects only to the intended API endpoint.' },
    ],
    commands: 'flutter build apk --release\n# Ionic/Capacitor:\nionic build\nnpx cap sync android\nnpx cap open android\n# For Play Store distribution, build an Android App Bundle in Android Studio.',
    examples: [{
      filename: 'Release checklist',
      language: 'text',
      code: '✓ Unique application ID and version\n✓ Release signing key stored outside source control\n✓ HTTPS API endpoint for production\n✓ No debug credentials or unrestricted cleartext policy\n✓ Tested install, update, offline, and API error states',
      explanation: 'A signed release should be tested separately from a debug build; a successful compile alone does not validate network behavior or credentials.',
    }],
    expectedOutput: 'A release-signed Android artifact installs and displays data from the configured production API.',
    activity: 'Create and install a release APK on a test phone. Verify that a wrong API address produces an error state rather than a crash.',
    troubleshooting: [
      { problem: 'Release build cannot find signing configuration', solution: 'Follow the framework’s signing guide and load secrets from a secure local or CI secret store, not from committed files.' },
      { problem: 'Release app cannot use a local HTTP endpoint', solution: 'Use HTTPS for production. Development-only cleartext settings should be narrowly scoped and excluded from release builds.' },
    ],
    assessment: { question: 'Should an Android release signing key be committed to Git?', answer: 'No. Store it securely outside source control and restrict access.' },
  },
  {
    slug: 'realtime-iot-monitoring',
    title: 'Real-Time IoT Monitoring',
    level: 'Advanced',
    minutes: 40,
    summary: 'Combine polling or WebSocket updates with freshness, reconnection, and data-quality states.',
    introduction:
      '“Real-time” monitoring needs a clear update interval, connectivity status, and behavior when the sensor or network stops responding.',
    explanation:
      'The ESP32 publishes periodically; the Pi subscriber stores readings; the mobile app retrieves updates. REST polling is already supported and is simplest to operate. WebSockets can reduce polling overhead after the backend adds a working endpoint. Monitor API connectivity separately from MQTT/sensor freshness, debounce UI updates, limit chart history, and avoid treating reconnection as proof that the latest sensor value is fresh.',
    objectives: [
      'Choose a polling interval or optional WebSocket stream.',
      'Represent API, MQTT, and sensor freshness separately.',
      'Recover cleanly from outages and app lifecycle changes.',
    ],
    tools: ['Mobile client with network-state handling', 'FastAPI / MQTT backend', 'Raspberry Pi logs and health endpoint'],
    steps: [
      { title: 'Define freshness thresholds', detail: 'Base stale warnings on the ESP32 publish cadence and show the actual last-reading timestamp.' },
      { title: 'Select the update path', detail: 'Use periodic GET requests for the current backend, or add /ws/readings before selecting push updates.' },
      { title: 'Handle backgrounding', detail: 'Pause or reduce polling while the app is backgrounded and refresh when it resumes.' },
      { title: 'Test failure recovery', detail: 'Disconnect Wi-Fi, stop Mosquitto, and stop FastAPI separately so each status indicator can be validated.' },
    ],
    commands: 'curl http://<PI_LAN_IP>:8080/api/health\ncurl http://<PI_LAN_IP>:8080/api/readings/current',
    examples: [{
      filename: 'Monitoring states',
      language: 'text',
      code: 'API unreachable  → show connection error; retry with backoff\nAPI reachable + old timestamp → show stale sensor data\nAPI reachable + reading null → show waiting for first reading\nAPI reachable + fresh timestamp → show live reading',
      explanation: 'Network reachability, backend health, and the age of sensor data are related but distinct states.',
    }],
    expectedOutput: 'A clear connection and freshness status that changes correctly when the phone, Pi API, MQTT broker, or ESP32 is disconnected.',
    activity: 'Stop one system component at a time and record how the app should respond before restoring the connection.',
    troubleshooting: [
      { problem: 'The UI keeps showing old data after reconnect', solution: 'Refresh current data on reconnect and validate its timestamp before marking the dashboard live.' },
      { problem: 'Frequent polling drains battery', solution: 'Use a sensible minimum interval, pause in background, and consider server push after implementing and securing the WebSocket endpoint.' },
    ],
    assessment: { question: 'Does HTTP API reachability prove that the ESP32 is sending fresh readings?', answer: 'No. Check the current reading timestamp and backend MQTT health separately.' },
  },
  {
    slug: 'end-to-end-integration',
    title: 'Complete ESP32 + Raspberry Pi + Mobile Integration',
    level: 'Advanced',
    minutes: 45,
    summary: 'Bring the hardware, MQTT bridge, FastAPI, and a configured mobile app together.',
    introduction:
      'This final lesson validates the full system from physical sensor wiring through mobile display.',
    explanation:
      'The complete system has independent layers: sensors connect to the ESP32 over I²C/ADC; firmware publishes MQTT over Wi-Fi; Mosquitto and the Python subscriber run on the Pi; FastAPI exposes current/history/health endpoints; and a mobile app configured with the Pi address displays the data. Validate each boundary with its own logs or request before diagnosing the next layer. For secure off-LAN access, use a managed VPN or an authenticated HTTPS gateway with rate limiting; never expose plain MQTT or an unauthenticated debug API to the public Internet.',
    objectives: [
      'Verify the physical sensor node and MQTT publication.',
      'Verify backend storage and REST endpoint responses.',
      'Connect Flutter or Ionic over the LAN and validate recovery behavior.',
    ],
    tools: ['ESP32 and VL53L0X/BH1750/soil sensor', 'Raspberry Pi running Mosquitto and FastAPI', 'Flutter or Ionic Android app and test phone'],
    steps: [
      { title: 'Verify sensors and firmware', detail: 'Check safe 3.3 V wiring, I²C addresses and GPIO pins, then confirm the ESP32 publishes measured values.' },
      { title: 'Verify Pi ingestion', detail: 'Check Mosquitto subscriber output, backend logs, /api/health, and a stored row in SQLite.' },
      { title: 'Configure mobile settings', detail: 'Enter the Pi LAN IP and API port, then request current and history endpoints.' },
      { title: 'Exercise failure and recovery', detail: 'Test a missing reading, wrong host, stopped broker, and restored network; ensure the UI distinguishes each state.' },
      { title: 'Plan remote access safely', detail: 'For remote monitoring, use a VPN or authenticated HTTPS gateway. Avoid unauthenticated port forwarding and public MQTT listeners.' },
    ],
    commands: 'curl http://<PI_LAN_IP>:8080/api/health\ncurl http://<PI_LAN_IP>:8080/api/readings/current\ncurl \"http://<PI_LAN_IP>:8080/api/readings?limit=25\"',
    examples: [{
      filename: 'Integration acceptance checklist',
      language: 'text',
      code: '[ ] ESP32 sees each sensor and publishes the configured MQTT topic\n[ ] Raspberry Pi subscriber logs messages and SQLite stores readings\n[ ] /api/health reports backend and MQTT status\n[ ] /api/readings/current returns the latest stored measurement\n[ ] Mobile app uses the configured Pi address and shows units/timestamp\n[ ] Offline, stale, and empty-data states are understandable\n[ ] Remote access uses authenticated encryption or a VPN',
      explanation: 'Treat each checked boundary as evidence. Do not mark the system complete based solely on a successful mobile screen render.',
    }],
    expectedOutput: 'A mobile dashboard shows real sensor readings from the ESP32 through the Pi, and shows accurate status when any part is unavailable.',
    activity: 'Complete the checklist using your own hardware. Capture the sensor output, API response, and mobile screen for a reproducible project report.',
    troubleshooting: [
      { problem: 'The ESP32 publishes but the API has no reading', solution: 'Compare MQTT topic, JSON field names, backend validation logs, and SQLite writes.' },
      { problem: 'The app works only while the phone is on a developer computer', solution: 'Configure the reachable Pi LAN origin, test without a USB tether, and use secure remote access only when needed.' },
    ],
    assessment: { question: 'What is the correct order for diagnosing a blank dashboard?', answer: 'Check sensor/firmware output, MQTT delivery, backend ingestion and SQLite, REST response, then mobile configuration and rendering.' },
  },
]

export const mobileLearningLevels: {
  level: MobileLearningLevel
  description: string
}[] = [
  { level: 'Beginner', description: 'Learn the tools, frameworks, and Android development environment.' },
  { level: 'Intermediate', description: 'Build interfaces and connect to REST, WebSockets, MQTT, and sensors.' },
  { level: 'Advanced', description: 'Build, integrate, deploy, and troubleshoot complete IoT mobile apps.' },
]

export const mobileTechnologyTracks = [
  {
    id: 'flutter',
    title: 'Flutter (Dart)',
    description: 'Dart, widgets, REST, charts, and the configurable Flutter IoT dashboard.',
    lessonSlug: 'flutter-and-dart',
    video: {
      id: '1ukSR1GRtMU',
      title: 'Flutter Tutorial for Beginners #1 - Intro & Setup',
      channel: 'Net Ninja',
      description:
        'An introductory Flutter setup lesson. This is a third-party tutorial; follow the course lesson for this project’s own setup and sensor API.',
    },
  },
  {
    id: 'ionic',
    title: 'Ionic Framework',
    description: 'Build cross-platform mobile interfaces with Ionic React and TypeScript.',
    lessonSlug: 'ionic-framework',
    video: {
      id: '-aHBhvkrFlY',
      title: 'Ionic React Crash Course',
      channel: 'Ionic',
      description:
        'An introduction to building interfaces with Ionic React, from the Ionic team.',
    },
  },
  {
    id: 'capacitor',
    title: 'Capacitor',
    description: 'Bridge web applications to native Android projects and plugins.',
    lessonSlug: 'capacitor-android',
    video: {
      id: 'K7ghUiXLef8',
      title: 'Ionic & Capacitor for Building Native Mobile Apps – Full Course for Beginners',
      channel: 'freeCodeCamp.org',
      description:
        'A longer Ionic and Capacitor course covering the web-to-native app workflow.',
    },
  },
  {
    id: 'android-studio',
    title: 'Android Studio',
    description: 'Install the Android SDK, create emulators, connect a phone, and build apps.',
    lessonSlug: 'android-studio',
    video: {
      id: 'NCoekcDxbrI',
      title: 'Introduction to Android Studio',
      channel: 'Android Developers',
      description:
        'An introduction to Android Studio from the Android Developers channel.',
    },
  },
  {
    id: 'visual-studio-code',
    title: 'Visual Studio Code',
    description: 'Configure editor extensions, terminals, debugging, devices, and Git.',
    lessonSlug: 'vscode-setup',
    video: {
      id: 'f8_uF_IDV50',
      title: 'Learn Visual Studio Code in 15 minutes: 2026 Official Beginner Tutorial',
      channel: 'Visual Studio Code',
      description:
        'A concise beginner overview from the Visual Studio Code channel.',
    },
  },
  {
    id: 'iot-integration',
    title: 'ESP32 and Raspberry Pi Integration',
    description: 'Trace real sensor readings through MQTT, FastAPI, and the mobile dashboard.',
    lessonSlug: 'raspberry-pi-fastapi',
    video: {
      id: '-DytaQpNwJo',
      title: 'Build Your First Real IoT System: ESP32 to MQTT to Raspberry Pi',
      channel: 'IoT Builds',
      description:
        'A third-party ESP32-to-Raspberry Pi MQTT walkthrough. Its implementation may differ from this course’s FastAPI REST API.',
    },
  },
  {
    id: 'complete-iot-mobile-app',
    title: 'Complete IoT Mobile Application Tutorial',
    description:
      'Build a Flutter sensor dashboard and connect the complete ESP32 and Raspberry Pi data path.',
    lessonSlug: 'flutter-iot-application',
    video: {
      id: 'XTr5B36XqA0',
      title: 'Flutter IOT App',
      channel: 'Roman Just Codes',
      description:
        'A supplementary Flutter IoT app walkthrough. The video may use different hardware or services; use the written lesson for this project’s API and integration steps.',
    },
  },
]

export const mobileAppLessonSlugs = mobileAppLessons.map((lesson) => lesson.slug)
