// AUTO-GENERATED FROM COURSE PRESENTATION DECKS (PPTX)
// Mobile App Development - 7 Presentation Slide Decks

export interface PresentationSlide {
  slideNumber: number
  category?: string
  title: string
  bullets: string[]
}

export interface MobileAppPresentation {
  id: string
  lessonSlug: string
  relatedSlugs: string[]
  title: string
  subtitle: string
  badge: string
  fileName: string
  downloadUrl: string
  fileSize: string
  slideCount: number
  slides: PresentationSlide[]
}

export const mobileAppPresentations: MobileAppPresentation[] = [
  {
    "id": "flutter",
    "lessonSlug": "flutter-and-dart",
    "relatedSlugs": [
      "flutter-iot-application"
    ],
    "title": "Flutter & Dart Mobile Apps",
    "subtitle": "Dart language, widget architecture, REST networking, fl_chart visualizations, and configurable IoT dashboards",
    "badge": "Native UI Engine",
    "fileName": "Flutter (Dart) Mobile App Development.pptx",
    "downloadUrl": "/presentations/Flutter_(Dart)_Mobile_App_Development.pptx",
    "fileSize": "240 KB",
    "slideCount": 22,
    "slides": [
      {
        "slideNumber": 1,
        "category": "MOBILE APP DEVELOPMENT LEARNING CENTER",
        "title": "Flutter & Dart Mobile Apps",
        "bullets": [
          "Dart language, widget architecture, REST networking, fl_chart visualizations, and configurable IoT dashboards.",
          "Native UI Engine",
          "Flutter \u2022 Dart \u2022 FastAPI IoT"
        ]
      },
      {
        "slideNumber": 2,
        "category": "STRUCTURE",
        "title": "Presentation Agenda",
        "bullets": [
          "01 / FOUNDATIONS",
          "Flutter & Dart",
          "Cross-platform engine, Dart language rules, and ecosystem comparisons.",
          "02 / ARCHITECTURE",
          "Widget Model",
          "Widget tree composition, Stateless vs Stateful components.",
          "03 / ENVIRONMENT",
          "SDK & Tooling",
          "Flutter doctor, PATH setups, pubspec.yaml, and Android license checks.",
          "04 / NETWORKING",
          "REST & Storage",
          "http client requests, dynamic origin config, and shared_preferences.",
          "05 / DATA VISUALIZATION",
          "Charts & History",
          "fl_chart rendering, time-series data ordering, and unit separation.",
          "06 / PRODUCTION",
          "Build & Diagnostics",
          "AAB bundling, release signing, troubleshooting, and best practices."
        ]
      },
      {
        "slideNumber": 3,
        "category": "UI FRAMEWORK",
        "title": "What is Flutter?",
        "bullets": [
          "Google\u2019s cross-platform UI toolkit that compiles natively to mobile, web, and desktop targets from a single codebase.",
          "Flutter Architecture Strengths",
          "UI Consistency",
          "Identical Cross-Platform",
          "Compilation",
          "AOT Native Machine Code",
          "Dev Cycle",
          "Stateful Hot Reload",
          "Own-Rendered UI Engine",
          "Renders every pixel directly onto screen canvases rather than wrapping native OEM controls.",
          "Backend Independence",
          "Does not replace backend logic; consumes REST and WebSocket endpoints from servers like FastAPI."
        ]
      },
      {
        "slideNumber": 4,
        "category": "PROGRAMMING LANGUAGE",
        "title": "What is Dart?",
        "bullets": [
          "Language Characteristics",
          "Relationship to Flutter",
          "Dart is the client-optimized programming language; Flutter is the framework and widget library built using Dart.",
          "Installing Flutter SDK automatically includes the compatible Dart SDK.",
          "\u2022 Sound Null Safety: Prevents null pointer exceptions at compile time.",
          "\u2022 Dual Compilation: JIT for instant hot reloads; AOT for release binaries.",
          "\u2022 Asynchronous Standard Library: Native Future and Stream primitives."
        ]
      },
      {
        "slideNumber": 5,
        "category": "FRAMEWORK COMPARISON",
        "title": "Flutter vs Ionic vs Expo Go",
        "bullets": [
          "Language: Dart",
          "Rendering: Own Canvas Engine",
          "Best for: Pixel-perfect, high-performance custom widgets.",
          "Language: TypeScript / React",
          "Rendering: WebView + Capacitor",
          "Best for: Leveraging existing web standards and skills.",
          "Language: JavaScript / React Native",
          "Rendering: Native OEM Controls",
          "Best for: React developers building bridge apps.",
          "Flutter",
          "Ionic React",
          "Expo Go"
        ]
      },
      {
        "slideNumber": 6,
        "category": "WIDGET COMPOSITION",
        "title": "Widget Model & Widget Tree",
        "bullets": [
          "// Conceptual Widget Tree MaterialApp \u2514\u2500 Scaffold \u251c\u2500 AppBar (Title: \"Sensor Monitor\") \u2514\u2500 ListView \u251c\u2500 TextField (API Origin) \u251c\u2500 FilledButton (Refresh) \u2514\u2500 Card (Sensor Readout)",
          "Core Principles",
          "In Flutter, everything is a widget \u2014 layout, padding, styling, and behavior components are declared as immutable nodes inside a tree.",
          "\u2022 StatelessWidget: Immutable UI configured by fixed inputs.",
          "\u2022 StatefulWidget: Manages mutable state across lifecycle rebuilds."
        ]
      },
      {
        "slideNumber": 7,
        "category": "DART MODEL",
        "title": "Data Model & JSON Serialization",
        "bullets": [
          "class SensorReading { final double? distanceMm; final double? lightLux; final DateTime timestamp; SensorReading({ required this.distanceMm, required this.lightLux, required this.timestamp, }); factory SensorReading.fromJson(Map<String, dynamic> json) { return SensorReading( distanceMm: (json['tof_distance_mm'] as num?)?.toDouble(), lightLux: (json['light_lux'] as num?)?.toDouble(), timestamp: DateTime.parse(json['timestamp']), ); } }"
        ]
      },
      {
        "slideNumber": 8,
        "category": "ENVIRONMENT SETUP",
        "title": "SDK Installation & Environment Diagnostics",
        "bullets": [
          "# Inspect environment health flutter doctor # Accept missing Android SDK licenses flutter doctor --android-licenses # List connected devices / emulators flutter devices # Run local development app flutter run",
          "Setup Checkpoints",
          "\u2022 Extract Flutter SDK to writable user folder and update system PATH.",
          "\u2022 Install Android Studio + Android SDK platform packages.",
          "\u2022 VS Code requires the Flutter extension (includes Dart extension automatically)."
        ]
      },
      {
        "slideNumber": 9,
        "category": "STARTER APPLICATION",
        "title": "Minimal Starter Entry Point (lib/main.dart)",
        "bullets": [
          "import 'package:flutter/material.dart'; void main() => runApp(const SensorApp()); class SensorApp extends StatelessWidget { const SensorApp({super.key}); @override Widget build(BuildContext context) => MaterialApp( title: 'Sensor Monitor', theme: ThemeData(colorSchemeSeed: Colors.teal), home: Scaffold( appBar: AppBar(title: const Text('Sensor Monitor')), body: const Center(child: Text('Connect to your Raspberry Pi')), ), ); }"
        ]
      },
      {
        "slideNumber": 10,
        "category": "STATE ARCHITECTURE",
        "title": "Stateless vs. Stateful Widgets",
        "bullets": [
          "StatelessWidget",
          "Used for presentation elements that depend strictly on configuration passed by parents.",
          "Immutable UI",
          "StatefulWidget",
          "Maintains a persistent State object across rebuilds. Invokes setState() when new sensor readings arrive.",
          "Mutable State & Controllers"
        ]
      },
      {
        "slideNumber": 11,
        "category": "HTTP INTEGRATION",
        "title": "REST Dashboard Implementation (http package)",
        "bullets": [
          "Future<void> _refresh() async { setState(() { _loading = true; _error = null; }); try { final origin = _originController.text.trim().replaceAll(RegExp(r'/+$'), ''); final response = await http.get(Uri.parse('$origin/api/readings/current')) .timeout(const Duration(seconds: 5)); if (response.statusCode != 200) throw Exception('HTTP ${response.statusCode}'); final body = jsonDecode(response.body) as Map<String, dynamic>; if (!mounted) return; setState(() => _reading = body['reading'] as Map<String, dynamic>?); } catch (err) { if (!mounted) return; setState(() => _error = err.toString()); } finally { if (mounted) setState(() => _loading = false); } }"
        ]
      },
      {
        "slideNumber": 12,
        "category": "SECTION 05",
        "title": "Settings Persistence & Time-Series Charts",
        "bullets": [
          "Persisting API origins with shared_preferences and rendering telemetry with fl_chart."
        ]
      },
      {
        "slideNumber": 13,
        "category": "CONFIGURATION",
        "title": "Settings Persistence (shared_preferences)",
        "bullets": [
          "LAN Origin Storage",
          "Store target Raspberry Pi host IP addresses locally so the app reconnects automatically after restarts.",
          "final prefs = await SharedPreferences.getInstance(); \n await prefs.setString('api_origin', origin);",
          "Security Constraints",
          "\u2022 Store only non-secret settings (IP address/port) in plain shared_preferences.",
          "\u2022 Never store production API tokens or MQTT credentials in plain preferences.",
          "\u2022 Validate http/https URL scheme before saving input strings."
        ]
      },
      {
        "slideNumber": 14,
        "category": "TELEMETRY CHARTS",
        "title": "Historical Plotting with fl_chart",
        "bullets": [
          "// Query GET /api/readings?limit=100 (newest-first) final chronologicalReadings = readings.reversed.toList(); final spots = chronologicalReadings .where((r) => r.lightLux != null) .toList() .asMap() .entries .map((entry) => FlSpot( entry.key.toDouble(), entry.value.lightLux!, )) .toList();",
          "Chart Data Rules",
          "\u2022 Reverse Array: API returns newest-first; reverse list copy before drawing left-to-right time series.",
          "\u2022 Separate Units: Maintain distinct charts for Lux (lx), Distance (mm), and Soil Moisture (%).",
          "\u2022 Filter Nulls: Exclude missing sensor values cleanly before mapping spots."
        ]
      },
      {
        "slideNumber": 15,
        "category": "STREAMING",
        "title": "Optional WebSocket Integration",
        "bullets": [
          "Streaming Principles",
          "Stream Lifecycle Cleanup",
          "Always close WebSocket subscriptions inside widget dispose() methods to avoid memory leaks.",
          "_channel?.sink.close();",
          "\u2022 web_socket_channel: Standard package for stream handling.",
          "\u2022 REST Fallback: Retain HTTP polling as reliable backup.",
          "\u2022 Scheme Conversion: Replace http:// \u2192 ws:// and https:// \u2192 wss://."
        ]
      },
      {
        "slideNumber": 16,
        "category": "END-TO-END DATA PATH",
        "title": "Complete IoT System Pipeline",
        "bullets": [
          "ESP32 Sensors",
          "VL53L0X / BH1750 via I2C",
          "Mosquitto Broker",
          "MQTT over Wi-Fi",
          "Raspberry Pi",
          "FastAPI + SQLite Storage",
          "Flutter App",
          "REST & fl_chart Render"
        ]
      },
      {
        "slideNumber": 17,
        "category": "RELEASE ENGINEERING",
        "title": "Build & Release Commands",
        "bullets": [
          "# Build APK for testing/sideloading flutter build apk --release # Build Android App Bundle for Play Store flutter build appbundle --release",
          "Release Requirements",
          "\u2022 Unique Application ID configured inside android/app/build.gradle.",
          "\u2022 Release keystore signing keys stored strictly outside version control.",
          "\u2022 Production builds enforced with HTTPS endpoints."
        ]
      },
      {
        "slideNumber": 18,
        "category": "VERIFICATION",
        "title": "Pre-Release Checklist",
        "bullets": [
          "Unique Application ID",
          "Application ID and build versions verified.",
          "Keystore Security",
          "Release signing keys kept out of source repositories.",
          "Production HTTPS",
          "Target host URLs upgraded to secure HTTPS.",
          "Offline State Validations",
          "Tested app performance under network disconnects."
        ]
      },
      {
        "slideNumber": 19,
        "category": "DIAGNOSTICS",
        "title": "Troubleshooting Common Errors",
        "bullets": [
          "ISSUE: flutter not recognized",
          "ISSUE: Android Licenses Missing",
          "ISSUE: Chart Plots Backward",
          "ISSUE: JSON Casting Failures",
          "Add Flutter SDK bin folder to environment PATH and restart terminal.",
          "Run flutter doctor --android-licenses and accept all prompts.",
          "Reverse historical array list prior to passing coordinates into fl_chart.",
          "Cast numbers safely as (json['key'] as num?)?.toDouble()."
        ]
      },
      {
        "slideNumber": 20,
        "category": "SUMMARY",
        "title": "Key Takeaways",
        "bullets": [
          "01",
          "Dart is the programming language; Flutter provides the native UI widget tree.",
          "02",
          "Use StatelessWidget for static layouts and StatefulWidget for dynamic API feeds.",
          "03",
          "Establish a REST baseline first; reverse array series copies for fl_chart plotting."
        ]
      },
      {
        "slideNumber": 21,
        "category": "REVIEW",
        "title": "Assessment Check",
        "bullets": [
          "Q: Is Dart a separate UI toolkit from Flutter?",
          "A: No. Dart is the language; Flutter is the UI toolkit.",
          "Q: Which unit measure is used for BH1750 readings?",
          "A: Lux (lx).",
          "Q: Why separate charts for lux vs mm?",
          "A: Different physical quantities, units, and ranges.",
          "Q: Should signing keys be committed to Git?",
          "A: No, store signing secrets securely outside Git."
        ]
      },
      {
        "slideNumber": 22,
        "category": "CONCLUSION",
        "title": "Thank You",
        "bullets": [
          "Build real dashboards on top of your ESP32 + Raspberry Pi FastAPI backend with Flutter.",
          "Mobile App Development Learning Center"
        ]
      }
    ]
  },
  {
    "id": "ionic",
    "lessonSlug": "ionic-framework",
    "relatedSlugs": [
      "ionic-capacitor-iot-app"
    ],
    "title": "Ionic Framework & Native Apps",
    "subtitle": "Ionic React, Capacitor runtime bridge, Android packaging, and IoT dashboard implementation",
    "badge": "Web-to-Native Stack",
    "fileName": "Ionic Framework Development.pptx",
    "downloadUrl": "/presentations/Ionic_Framework_Development.pptx",
    "fileSize": "227 KB",
    "slideCount": 18,
    "slides": [
      {
        "slideNumber": 1,
        "category": "MOBILE APP DEVELOPMENT LEARNING CENTER",
        "title": "Ionic Framework & Native Apps",
        "bullets": [
          "Ionic React, Capacitor runtime bridge, Android packaging, and IoT dashboard implementation.",
          "Web-to-Native Stack",
          "Ionic React \u2022 Capacitor \u2022 FastAPI IoT"
        ]
      },
      {
        "slideNumber": 2,
        "category": "STRUCTURE",
        "title": "Presentation Agenda",
        "bullets": [
          "01 / CORE",
          "Ionic React Basics",
          "UI toolkit, web components, and cross-framework concepts.",
          "02 / COMPARISON",
          "Framework Ecosystems",
          "Ionic React vs Flutter vs Expo Go architectural comparison.",
          "03 / TOOLING",
          "CLI & Setup",
          "Environment setup, Ionic CLI commands, and editor integrations.",
          "04 / COMPONENTS",
          "Mobile Layouts",
          "IonPage, IonContent, IonCard, and platform styling.",
          "05 / APPLICATION",
          "IoT Dashboard Code",
          "REST state handling, WebSocket streams, and UI hooks.",
          "06 / PRODUCTION",
          "Build & Deployment",
          "AAB bundling, key signing, and diagnostic checklists."
        ]
      },
      {
        "slideNumber": 3,
        "category": "FUNDAMENTALS",
        "title": "What is Ionic Framework?",
        "bullets": [
          "A mobile-style UI toolkit and application tooling library built exclusively for web technologies.",
          "Framework Roles",
          "UI Toolkit",
          "Ionic",
          "Native Bridge",
          "Capacitor",
          "Backend API",
          "Raspberry Pi FastAPI",
          "Ionic React Support",
          "Build native-like interfaces using React, TypeScript, HTML, and CSS.",
          "WebView Execution",
          "Runs inside an optimized browser container on Android and iOS."
        ]
      },
      {
        "slideNumber": 4,
        "category": "COMPARISON",
        "title": "Ionic vs Flutter vs Expo Go",
        "bullets": [
          "Stack: React, TS, HTML, CSS",
          "Runtime: WebView + Capacitor",
          "Best for: Web devs leveraging existing web skills.",
          "Stack: Dart Language",
          "Runtime: Custom Skia Engine",
          "Best for: High-performance custom canvas apps.",
          "Stack: React Native JS",
          "Runtime: Native UI Components",
          "Best for: Direct native bridge React projects.",
          "Ionic React",
          "Flutter",
          "Expo Go"
        ]
      },
      {
        "slideNumber": 5,
        "category": "COMPONENT HIERARCHY",
        "title": "Core Ionic UI Components",
        "bullets": [
          "IonPage & IonContent",
          "IonHeader & IonToolbar",
          "IonCard & IonCardContent",
          "IonButton & IonInput",
          "Page Lifecycle Containers",
          "Roots view state and provides scrollable viewport with ion-padding class.",
          "App Navigation Bar",
          "Encapsulates titles, action buttons, and platform-specific headers.",
          "Structured Data Display",
          "Groups dashboard metrics and IoT sensor readouts cleanly.",
          "Interactive Elements",
          "Native look-and-feel controls for dynamic user input."
        ]
      },
      {
        "slideNumber": 6,
        "category": "ENVIRONMENT SETUP",
        "title": "Tooling & SDK Configuration",
        "bullets": [
          "Core SDK Requirements",
          "# Install Ionic CLI globally npm install --global @ionic/cli # Verify local setup environment node --version npm --version ionic --version",
          "\u2022 Node.js LTS: Installed and verified via terminal.",
          "\u2022 Ionic CLI: Installed globally via npm.",
          "\u2022 Android Studio: Android SDK & JDK setup.",
          "\u2022 VS Code: TypeScript & React editing extensions.",
          "PATH Tip: If ionic command is not found, verify npm global binary path is added to system environment PATH."
        ]
      },
      {
        "slideNumber": 7,
        "category": "PROJECT LIFECYCLE",
        "title": "CLI Operations & Initialization",
        "bullets": [
          "# 1. Initialize blank Ionic React application ionic start sensor-ionic blank --type=react cd sensor-ionic # 2. Run local web development server ionic serve # 3. Add Capacitor & Android platform packages npm install @capacitor/core @capacitor/cli npx cap init SensorMonitor com.example.sensormonitor --web-dir=dist npm install @capacitor/android # 4. Build web bundle and sync to Android project ionic build npx cap add android npx cap sync android"
        ]
      },
      {
        "slideNumber": 8,
        "category": "STARTER CODE",
        "title": "Starter Page Component (Home.tsx)",
        "bullets": [
          "import { IonCard, IonCardContent, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react'; export default function Home() { return ( <IonPage> <IonHeader> <IonToolbar> <IonTitle>Sensor MonitorIonTitle> IonToolbar> IonHeader> <IonContent className=\"ion-padding\"> <IonCard> <IonCardContent>Connect to your Raspberry Pi API.IonCardContent> IonCard> IonContent> IonPage> ); }"
        ]
      },
      {
        "slideNumber": 9,
        "category": "API LAYER",
        "title": "REST API Service (src/api.ts)",
        "bullets": [
          "export type SensorReading = { timestamp: string; tof_distance_mm: number | null; light_lux: number | null; soil_moisture_percent: number | null; }; export async function getCurrentReading(origin: string): Promisenull> { const response = await fetch(`${origin.replace(/\\/+$/, '')}/api/readings/current`, { signal: AbortSignal.timeout(5000), }); if (!response.ok) throw new Error(`API returned HTTP ${response.status}`); const body: { reading: SensorReading | null } = await response.json(); return body.reading; }"
        ]
      },
      {
        "slideNumber": 10,
        "category": "UI IMPLEMENTATION",
        "title": "IoT Dashboard Page Component",
        "bullets": [
          "const [reading, setReading] = useStatenull>(null); const [error, setError] = useState<string>(); async function refresh() { try { setError(undefined); setReading(await getCurrentReading(apiOrigin)); } catch (cause) { setError(cause instanceof Error ? cause.message : 'Request failed'); } } // In Render: <IonButton onClick={refresh}>RefreshIonButton> {error && <IonText color=\"danger\">Pi API unavailable: {error}IonText>} {reading && ( <IonCard> <IonCardContent> ToF: {reading.tof_distance_mm ?? 'Unavailable'} mm | Light: {reading.light_lux ?? 'Unavailable'} lx IonCardContent> IonCard> )}"
        ]
      },
      {
        "slideNumber": 11,
        "category": "STATE HANDLING",
        "title": "Required Mobile UI States",
        "bullets": [
          "Loading State",
          "Displays IonSpinner during active REST fetches.",
          "Real Data State",
          "Renders sensor metrics alongside units (mm, lx, %).",
          "No Reading State",
          "Shows \"Waiting for first reading\" on empty databases.",
          "Request Error State",
          "Surfaces offline status explicitly. Never display mock/fake data."
        ]
      },
      {
        "slideNumber": 12,
        "category": "SECTION 05",
        "title": "Real-Time Networking & WebSockets",
        "bullets": [
          "Implementing optional WebSocket streaming, origin configuration, and CORS rules."
        ]
      },
      {
        "slideNumber": 13,
        "category": "REAL-TIME DATA",
        "title": "Optional WebSocket Streaming",
        "bullets": [
          "Implementation Strategy",
          "Socket Lifecycle",
          "Use bounded reconnect algorithms and ensure WebSocket connections close on React component unmount.",
          "ws = new WebSocket(apiOrigin.replace(/^http/, 'ws'));",
          "\u2022 REST Baseline: Maintain HTTP polling fallback at all times.",
          "\u2022 Backend Route: Enable /ws/readings before adding client sockets.",
          "\u2022 Scheme Conversion: Convert http:// \u2192 ws:// automatically."
        ]
      },
      {
        "slideNumber": 14,
        "category": "PRODUCTION DEPLOYMENT",
        "title": "Build & Sync Workflow",
        "bullets": [
          "1. ionic build",
          "Compiles React code into output dist folder.",
          "2. npx cap sync",
          "Copies web dist and syncs plugin manifests.",
          "3. npx cap open",
          "Launches Android Studio native project workspace.",
          "4. Generate AAB",
          "Builds signed Android App Bundle for Play Store."
        ]
      },
      {
        "slideNumber": 15,
        "category": "PRE-FLIGHT AUDIT",
        "title": "Production Release Checklist",
        "bullets": [
          "Unique Application ID",
          "Configured reverse-domain ID and version metadata.",
          "Secure Keystore Storage",
          "Release signing keys stored strictly outside version control.",
          "Production HTTPS",
          "Enforced encrypted endpoints with no debug cleartext traffic.",
          "Tested Offline States",
          "Verified application error handling on production binaries."
        ]
      },
      {
        "slideNumber": 16,
        "category": "SUMMARY",
        "title": "Key Takeaways",
        "bullets": [
          "01",
          "Ionic provides UI components; Capacitor acts as the native bridge.",
          "02",
          "Always execute ionic build prior to running npx cap sync android.",
          "03",
          "Establish a REST fallback baseline before enabling real-time WebSocket streams."
        ]
      },
      {
        "slideNumber": 17,
        "category": "REVIEW",
        "title": "Assessment Check",
        "bullets": [
          "Q: What does Ionic React use for native shells?",
          "A: Capacitor.",
          "Q: Which command copies web assets to native?",
          "A: npx cap sync android",
          "Q: Key difference between Flutter & Ionic?",
          "A: Dart+widgets vs React/web+Capacitor.",
          "Q: Should signing keys be committed to Git?",
          "A: No, store keys securely outside Git repositories."
        ]
      },
      {
        "slideNumber": 18,
        "category": "CONCLUSION",
        "title": "Thank You",
        "bullets": [
          "Build cross-platform dashboards connected to your ESP32 + Raspberry Pi backend.",
          "Mobile App Development Learning Center"
        ]
      }
    ]
  },
  {
    "id": "capacitor",
    "lessonSlug": "capacitor-android",
    "relatedSlugs": [],
    "title": "Capacitor Native Runtime",
    "subtitle": "Bridging web applications to native platforms with custom plugin architecture and Android workflows",
    "badge": "v4.0 Native Bridge",
    "fileName": "Capacitor Mobile App Development.pptx",
    "downloadUrl": "/presentations/Capacitor_Mobile_App_Development.pptx",
    "fileSize": "287 KB",
    "slideCount": 26,
    "slides": [
      {
        "slideNumber": 1,
        "category": "MOBILE APP DEVELOPMENT LEARNING CENTER",
        "title": "Capacitor Native Runtime",
        "bullets": [
          "Bridging web applications to native platforms with custom plugin architecture and Android workflows.",
          "v4.0 Native Bridge",
          "Android Studio & IoT Integration"
        ]
      },
      {
        "slideNumber": 2,
        "category": "STRUCTURE",
        "title": "Presentation Agenda",
        "bullets": [
          "01 / CORE",
          "Architecture & Roles",
          "Capacitor vs Ionic visual separation, native WebView, and assets runtime.",
          "02 / WORKFLOW",
          "Setup & Commands",
          "Initialization, metadata configuration, sync pipelines, and Android Studio integration.",
          "03 / NATIVE",
          "Plugins & Hardware",
          "Network status plugins, permission manifests, and API origin management.",
          "04 / SECURITY",
          "Networking & Policy",
          "Android cleartext rules, LAN communication, CORS handling, and debug gateways.",
          "05 / IMPLEMENTATION",
          "IoT Dashboard Project",
          "REST state management, sensor reading fetchers, and Raspberry Pi communication.",
          "06 / PRODUCTION",
          "Build & Release",
          "AAB generation, key signing, troubleshooting common errors, and best practices."
        ]
      },
      {
        "slideNumber": 3,
        "category": "FUNDAMENTALS",
        "title": "What is Capacitor?",
        "bullets": [
          "A native runtime and plugin bridge that encapsulates modern web applications inside native iOS and Android projects.",
          "UI Rendering",
          "Not Included",
          "Native IDE Export",
          "Full Support",
          "Framework Lock-in",
          "Zero (Framework Agnostic)",
          "Native Packaging",
          "Wraps React/Ionic build assets into standard Android Studio configurations.",
          "Unified API Bridge",
          "Accesses hardware APIs like Camera, Network, and Filesystem cleanly in JS."
        ]
      },
      {
        "slideNumber": 4,
        "category": "ARCHITECTURE",
        "title": "Capacitor vs Ionic: Division of Responsibilities",
        "bullets": [
          "Ionic Framework",
          "UI Components: Buttons, Modals, Tabs, Navigation.",
          "Design System: iOS & Material Design adaptors.",
          "Web Context: Runs within the target browser or WebView.",
          "Capacitor Runtime",
          "Native Host: Project creation for Xcode & Android Studio.",
          "Plugin Bridge: Maps JS functions to Java/Kotlin/Swift.",
          "Standalone Support: Works with any web application."
        ]
      },
      {
        "slideNumber": 5,
        "category": "EXECUTION MODEL",
        "title": "How Capacitor Works (Web to Native)",
        "bullets": [
          "STEP 01",
          "Build Assets",
          "Generate optimized static web bundles (JS, HTML, CSS).",
          "STEP 02",
          "Cap Sync",
          "Copies web dist folder and links plugin native code.",
          "STEP 03",
          "Native Project",
          "Opens Android Studio environment with source code.",
          "STEP 04",
          "Gradle Build",
          "Compiles native binaries into APK/AAB packages."
        ]
      },
      {
        "slideNumber": 6,
        "category": "ENVIRONMENT",
        "title": "Development Prerequisites",
        "bullets": [
          "Node.js LTS & npm",
          "Required runtime environment for project tooling and packages.",
          "Ionic CLI or Web Bundler",
          "Vite, Webpack, or Ionic CLI for frontend asset compilation.",
          "Capacitor Packages",
          "Install @capacitor/core, @capacitor/cli, and @capacitor/android.",
          "Android Studio & SDK",
          "Platform SDKs, Build-Tools, and Java Development Kit (JDK)."
        ]
      },
      {
        "slideNumber": 7,
        "category": "CLI OPERATIONS",
        "title": "Initialization & Build Commands",
        "bullets": [
          "# Install Capacitor CLI & Core npm install @capacitor/core @capacitor/cli # Initialize project metadata npx cap init SensorMonitor com.example.sensormonitor --web-dir=dist # Add platform and perform initial sync npm install @capacitor/android ionic build npx cap add android npx cap sync android npx cap open android",
          "Command Nuances",
          "cap add android is executed strictly once during setup to generate native structure.",
          "cap sync android must be executed after every web build or plugin modification to update native targets."
        ]
      },
      {
        "slideNumber": 8,
        "category": "PROJECT MANIFEST",
        "title": "Configuration Parameters",
        "bullets": [
          "Core Properties",
          "capacitor.config.ts Structure",
          "import { CapacitorConfig } from '@capacitor/cli'; const config: CapacitorConfig = { appId: 'com.example.sensormonitor', appName: 'SensorMonitor', webDir: 'dist', server: { // url: 'http://192.168.1.50:5173', cleartext: true } }; export default config;",
          "appName",
          "appId",
          "webDir",
          "Application title displayed on native home screens and launcher dialogs.",
          "Unique reverse-domain identifier (e.g. com.example.sensormonitor). Must match store listings.",
          "Directory where frontend build assets are placed (typically dist or build)."
        ]
      },
      {
        "slideNumber": 9,
        "category": "HARDWARE BRIDGE",
        "title": "Official Native Plugins",
        "bullets": [
          "Network",
          "Monitors network state and connection changes.",
          "Camera",
          "Captures photos and selects device media.",
          "Filesystem",
          "Accesses local application file storage.",
          "Preferences",
          "Persists lightweight key-value data safely.",
          "Geolocation",
          "Queries GPS location updates.",
          "Local Notifications",
          "Schedules system push notifications."
        ]
      },
      {
        "slideNumber": 10,
        "category": "IMPLEMENTATION",
        "title": "Network Plugin Integration",
        "bullets": [
          "import { Network } from '@capacitor/network'; export async function getNetworkStatus() { const status = await Network.getStatus(); // Validates device connection, NOT endpoint health return status.connected ? 'Network available' : 'Device offline'; }",
          "Key Operational Detail",
          "The Network plugin checks local interfaces (Wi-Fi / Cellular connectivity).",
          "Note: Connectivity does not guarantee backend API reachable states (e.g. Raspberry Pi service health)."
        ]
      },
      {
        "slideNumber": 11,
        "category": "SECURITY & PRIVACY",
        "title": "Permissions Management",
        "bullets": [
          "Manifest Declarations",
          "Explicitly declare minimum runtime requirements inside AndroidManifest.xml.",
          "Automated Injection",
          "Capacitor plugins automatically insert necessary native permissions upon sync.",
          "Release Audits",
          "Review final combined manifests prior to store submission to prevent over-privileging."
        ]
      },
      {
        "slideNumber": 12,
        "category": "SECTION 04",
        "title": "Networking & Security Policies",
        "bullets": [
          "Configuring LAN APIs, cleartext traffic rules, and CORS requirements."
        ]
      },
      {
        "slideNumber": 13,
        "category": "NETWORKING",
        "title": "API Origin & Dynamic Hosts",
        "bullets": [
          "Dynamic Endpoint Settings",
          "Allow users to manually configure Raspberry Pi host IP and port settings directly inside application settings interfaces.",
          "const baseURL = `${protocol}://${userHost}:${userPort}`;",
          "Validation Rules",
          "Scheme Enforcement: Validate HTTP/HTTPS protocols explicitly.",
          "Dev Scope: Limit plain HTTP cleartext strictly to development networks.",
          "Prod Standard: Enforce encrypted HTTPS for external production builds."
        ]
      },
      {
        "slideNumber": 14,
        "category": "ANDROID SECURITY",
        "title": "Network Security Config",
        "bullets": [
          "<network-security-config> <domain-config cleartextTrafficPermitted=\"true\"> <domain includeSubdomains=\"true\">192.168.1.50domain> domain-config> network-security-config>",
          "Avoid Global Cleartext",
          "Never set usesCleartextTraffic=\"true\" globally in production manifests.",
          "Targeted LAN Scope",
          "Scope cleartext permissions strictly to trusted development IPs or local hostnames."
        ]
      },
      {
        "slideNumber": 15,
        "category": "CROSS-ORIGIN POLICY",
        "title": "CORS: Web Preview vs Native WebView",
        "bullets": [
          "or capacitor://localhost",
          "Web Browser Preview",
          "Browsers enforce strict origin matching. FastAPI must explicitly allow localhost origins:",
          "http://localhost:5173",
          "Capacitor Native WebView",
          "Requests originate from custom schemes or direct local origins:",
          "http://localhost"
        ]
      },
      {
        "slideNumber": 16,
        "category": "NATIVE ENVIRONMENT",
        "title": "Android Studio Integration Workflow",
        "bullets": [
          "1. Open IDE",
          "Run npx cap open android to load compiled project in Android Studio.",
          "2. Emulate / Device",
          "Execute on Android Virtual Devices (AVD) or physical hardware via USB debugging.",
          "3. Inspection",
          "Debug native code using Android Logcat and Web views via Chrome DevTools."
        ]
      },
      {
        "slideNumber": 17,
        "category": "CONTINUOUS DEPLOYMENT",
        "title": "Web-to-Native Synchronization Loop",
        "bullets": [
          "Warning: Omitting 'cap sync' results in stale web bundles running inside native builds.",
          "1. Web Code Edit",
          "React / Vue / TS",
          "2. ionic build",
          "Outputs /dist",
          "3. cap sync",
          "Copies Assets",
          "4. Native Run",
          "Android Studio"
        ]
      },
      {
        "slideNumber": 18,
        "category": "USE CASE",
        "title": "Capacitor in the IoT Dashboard",
        "bullets": [
          "Application Architecture",
          "State Management",
          "\u2022 Ionic React UI stack initialization",
          "\u2022 Dynamic Pi IP configuration UI",
          "\u2022 Native Android build container",
          "\u2022 Loading: Fetch initialization",
          "\u2022 Data: Sensor render",
          "\u2022 Error: Endpoint timeout handling"
        ]
      },
      {
        "slideNumber": 19,
        "category": "IMPLEMENTATION",
        "title": "REST Fetcher Interface (src/api.ts)",
        "bullets": [
          "export type SensorReading = { timestamp: string; tof_distance_mm: number | null; light_lux: number | null; soil_moisture_percent: number | null; }; export async function getCurrentReading(origin: string): Promisenull> { const response = await fetch(`${origin.replace(/\\/+$/, '')}/api/readings/current`, { signal: AbortSignal.timeout(5000), }); if (!response.ok) throw new Error(`API HTTP ${response.status}`); const body = await response.json(); return body.reading; }"
        ]
      },
      {
        "slideNumber": 20,
        "category": "PRODUCTION DEPLOYMENT",
        "title": "Build & Release Targets",
        "bullets": [
          "APK (Android Package)",
          "Used primarily for internal testing, direct sideloading, and development verification.",
          "Debug / Manual Installs",
          "AAB (Android App Bundle)",
          "Mandatory target format for Google Play Store submission. Optimizes device binaries dynamically.",
          "Google Play Store"
        ]
      },
      {
        "slideNumber": 21,
        "category": "VERIFICATION",
        "title": "Pre-Release Checklist",
        "bullets": [
          "Unique App ID & Version",
          "Verified package domain and build incremental integers.",
          "External Key Storage",
          "Release keystores stored strictly outside source repositories.",
          "Enforced Production HTTPS",
          "Cleartext policies revoked for general public hosts.",
          "Offline State Validations",
          "Tested app behavior under zero-network conditions."
        ]
      },
      {
        "slideNumber": 22,
        "category": "DIAGNOSTICS",
        "title": "Troubleshooting Common Errors",
        "bullets": [
          "ISSUE: Stale UI in Native App",
          "ISSUE: Plugin Not Found at Runtime",
          "ISSUE: Android Unreachable HTTP",
          "ISSUE: CORS Failure in Browser",
          "Run ionic build followed by npx cap sync android.",
          "Install package, execute cap sync, re-verify import statement.",
          "Verify LAN IP, check FastAPI host bind (0.0.0.0), review cleartext policy.",
          "Whitelist exact frontend local dev origin inside FastAPI middleware."
        ]
      },
      {
        "slideNumber": 23,
        "category": "GUIDELINES",
        "title": "Development Best Practices",
        "bullets": [
          "Build & Sync Ordering",
          "Always execute web compilation before invoking native sync actions.",
          "Backend Authentication",
          "Keep broker secrets on secure backends rather than mobile client bundles.",
          "Repository Ignore Patterns",
          "Commit lockfiles; exclude node_modules, dist, and native Android build outputs.",
          "Least Privilege Models",
          "Request permissions dynamically at runtime only when required by feature scope."
        ]
      },
      {
        "slideNumber": 24,
        "category": "SUMMARY",
        "title": "Key Takeaways",
        "bullets": [
          "01",
          "Capacitor provides the native runtime bridge; Ionic supplies UI components.",
          "02",
          "The core workflow follows: build assets \u2192 cap sync \u2192 open native IDE.",
          "03",
          "LAN HTTP demands explicit cleartext policies; HTTPS remains mandatory for release."
        ]
      },
      {
        "slideNumber": 25,
        "category": "REVIEW",
        "title": "Assessment Check",
        "bullets": [
          "Q: Is Capacitor a UI toolkit?",
          "A: No, Ionic provides UI components.",
          "Q: Which command updates native assets?",
          "A: npx cap sync android",
          "Q: Where is app ID configured?",
          "A: capacitor.config.ts",
          "Q: Should cleartext be enabled globally in production?",
          "A: No, restrict to dev LAN targets."
        ]
      },
      {
        "slideNumber": 26,
        "category": "CONCLUSION",
        "title": "Thank You",
        "bullets": [
          "Bridge your web apps to native iOS and Android seamlessly with Capacitor.",
          "Mobile App Development Learning Center"
        ]
      }
    ]
  },
  {
    "id": "vscode",
    "lessonSlug": "vscode-setup",
    "relatedSlugs": [],
    "title": "Visual Studio Code Workflows",
    "subtitle": "Editor setup, framework extensions, integrated terminals, device debugging, and Git source control",
    "badge": "Developer Workspace",
    "fileName": "VS Code & Development Workflows.pptx",
    "downloadUrl": "/presentations/VS_Code_&_Development_Workflows.pptx",
    "fileSize": "221 KB",
    "slideCount": 14,
    "slides": [
      {
        "slideNumber": 1,
        "category": "MOBILE APP DEVELOPMENT LEARNING CENTER",
        "title": "Visual Studio Code Workflows",
        "bullets": [
          "Editor setup, framework extensions, integrated terminals, device debugging, and Git source control.",
          "Developer Workspace",
          "Flutter \u2022 React \u2022 Ionic \u2022 Git"
        ]
      },
      {
        "slideNumber": 2,
        "category": "STRUCTURE",
        "title": "Presentation Agenda",
        "bullets": [
          "01 / FOUNDATIONS",
          "VS Code Capabilities",
          "Lightweight editor vs. full Android Studio IDE roles.",
          "02 / EXTENSIONS",
          "Tooling & Plugins",
          "Flutter/Dart extensions, React/TypeScript linting, and formatting.",
          "03 / ENVIRONMENT",
          "Integrated Terminals",
          "Command executions, PATH configuration, and device selection.",
          "04 / DEBUGGING",
          "Breakpoints & Tasks",
          "Hot reload, launch.json setups, and task automation.",
          "05 / SOURCE CONTROL",
          "Git & .gitignore",
          "Staging diffs, secret protection, and lockfile rules.",
          "06 / DIAGNOSTICS",
          "Best Practices",
          "Troubleshooting workspace paths, extensions, and review checklists."
        ]
      },
      {
        "slideNumber": 3,
        "category": "EDITOR ARCHITECTURE",
        "title": "What is Visual Studio Code?",
        "bullets": [
          "A lightweight, highly extensible code editor optimized for cross-platform application authoring.",
          "Critical Boundary",
          "VS Code is not a full Android IDE and does not ship with the Android SDK.",
          "Native compilation tooling (SDK Platforms, Gradle) is supplied externally by Android Studio.",
          "Extension Ecosystem",
          "Hosts rich language tooling for Flutter, React, TypeScript, and Python.",
          "Integrated Tooling",
          "Includes embedded terminals, interactive debug consoles, and built-in Git UI."
        ]
      },
      {
        "slideNumber": 4,
        "category": "TOOLING DIVISION",
        "title": "VS Code vs. Android Studio",
        "bullets": [
          "VS Code",
          "Focus: Fast source code editing & script execution.",
          "Footprint: Minimal resource consumption and quick startup.",
          "Primary Role: Authoring Flutter, React, and TypeScript code.",
          "Android Studio",
          "Focus: Native Android platform builds and emulation.",
          "Footprint: Heavyweight suite with embedded SDK manager.",
          "Primary Role: Managing Gradle, AVD emulators, & APK keys."
        ]
      },
      {
        "slideNumber": 5,
        "category": "TOOLING EXTENSIONS",
        "title": "Essential Framework Extensions",
        "bullets": [
          "Flutter Extension (Pulls Dart)",
          "Enables Dart IntelliSense, widget refactoring, hot reload, and device targets.",
          "TypeScript & ESLint",
          "Provides real-time static analysis, error highlighting, and code formatting.",
          "Prettier Formatter",
          "Enforces consistent code style across HTML, CSS, React, and JSON files.",
          "Ionic & Tailwind Tooling",
          "Offers component autocompletion and class utility suggestions."
        ]
      },
      {
        "slideNumber": 6,
        "category": "CLI INTEGRATION",
        "title": "Integrated Terminal Workflows",
        "bullets": [
          "# Open terminal shortcut: Ctrl + ` # Flutter commands flutter devices flutter run # Ionic / Web commands npm install ionic serve npx cap sync android",
          "Workspace Context Invariant",
          "Always use File \u2192 Open Folder to open the root folder containing pubspec.yaml or package.json.",
          "The integrated terminal inherits the current working directory of the opened workspace folder."
        ]
      },
      {
        "slideNumber": 7,
        "category": "EXECUTION CONTROL",
        "title": "Device Selection & Debugging",
        "bullets": [
          "Device Selection Bar",
          "Select target physical phones or emulators directly from the VS Code status bar or Command Palette.",
          "Ctrl+Shift+P \u2192 Flutter: Select Device",
          "Hot Reload & Breakpoints",
          "\u2022 Press F5 to launch debugging sessions.",
          "\u2022 Set inline breakpoints directly in source margin lines.",
          "\u2022 Use r for Hot Reload and R for Hot Restart in Flutter."
        ]
      },
      {
        "slideNumber": 8,
        "category": "VERSION CONTROL",
        "title": "Source Control & Git Integration",
        "bullets": [
          "1. Staging & Diffs",
          "Review line-by-line visual diffs before staging modified files (Ctrl+Shift+G).",
          "2. Branch Management",
          "Create, switch, and merge feature branches directly from status bar prompts.",
          "3. Push / Pull",
          "Synchronize upstream repository changes safely with one-click actions."
        ]
      },
      {
        "slideNumber": 9,
        "category": "REPOSITORY CLEANLINESS",
        "title": ".gitignore Essentials & Lockfiles",
        "bullets": [
          "# Exclude build output & dependencies node_modules/ dist/ build/ .dart_tool/ # Exclude local settings & secrets android/local.properties .env *.jks",
          "Lockfile Preservation Rule",
          "Always commit dependency lockfiles (package-lock.json or pubspec.lock) to source control.",
          "Preserving lockfiles ensures reproducible dependency versions across all developer machines."
        ]
      },
      {
        "slideNumber": 10,
        "category": "AUTOMATION",
        "title": "Tasks & Launch Configurations",
        "bullets": [
          ".vscode/launch.json",
          "Configures reproducible debugging arguments, target entry files, and environment flags across team environments.",
          "Debug Configuration",
          ".vscode/tasks.json",
          "Automates routine build, sync, and code generation commands directly within VS Code task menus.",
          "Task Automation"
        ]
      },
      {
        "slideNumber": 11,
        "category": "DIAGNOSTICS",
        "title": "Troubleshooting Common Issues",
        "bullets": [
          "ISSUE: No Android Device Appears",
          "ISSUE: Missing Package Errors",
          "ISSUE: Terminal CWD Incorrect",
          "ISSUE: Extension Fails to Load",
          "Enable USB debugging on physical phone, accept RSA key prompt, and verify output using adb devices.",
          "Execute flutter pub get or npm install in the integrated terminal.",
          "Use File \u2192 Open Folder to select the exact root directory containing project manifests.",
          "Reload VS Code window via Command Palette (Developer: Reload Window)."
        ]
      },
      {
        "slideNumber": 12,
        "category": "SUMMARY",
        "title": "Key Takeaways",
        "bullets": [
          "01",
          "VS Code is a lightweight code editor; Android SDK components are managed via Android Studio.",
          "02",
          "Leverage framework extensions for instant hot reloads, device picking, and static linting.",
          "03",
          "Keep secrets out of Git repositories; commit dependency lockfiles to ensure reproducible builds."
        ]
      },
      {
        "slideNumber": 13,
        "category": "REVIEW",
        "title": "Assessment Check",
        "bullets": [
          "Q: Does VS Code include the Android SDK?",
          "A: No. Android SDK must be installed via Android Studio or CLI.",
          "Q: Which extension provides Dart support?",
          "A: The Flutter extension (pulls Dart dependency).",
          "Q: How do you open the integrated terminal?",
          "A: Press Ctrl + ` (backtick).",
          "Q: Should .env files be committed to Git?",
          "A: No, keep secrets out of source control."
        ]
      },
      {
        "slideNumber": 14,
        "category": "CONCLUSION",
        "title": "Thank You",
        "bullets": [
          "Configure your editor for seamless Flutter, React, and Ionic project development.",
          "Mobile App Development Learning Center"
        ]
      }
    ]
  },
  {
    "id": "android-studio",
    "lessonSlug": "android-studio",
    "relatedSlugs": [
      "android-build-release"
    ],
    "title": "Android Studio & Native Builds",
    "subtitle": "IDE setup, Android SDK management, Gradle build automation, emulators, and release packaging",
    "badge": "Native Toolchain",
    "fileName": "Android Studio & Native Builds.pptx",
    "downloadUrl": "/presentations/Android_Studio_&_Native_Builds.pptx",
    "fileSize": "267 KB",
    "slideCount": 20,
    "slides": [
      {
        "slideNumber": 1,
        "category": "MOBILE APP DEVELOPMENT LEARNING CENTER",
        "title": "Android Studio & Native Builds",
        "bullets": [
          "IDE setup, Android SDK management, Gradle build automation, emulators, and release packaging.",
          "Native Toolchain",
          "SDK Platform \u2022 Gradle \u2022 adb \u2022 APK/AAB"
        ]
      },
      {
        "slideNumber": 2,
        "category": "STRUCTURE",
        "title": "Presentation Agenda",
        "bullets": [
          "01 / FOUNDATIONS",
          "Android Studio Role",
          "IDE capabilities and comparison against VS Code lightweight editors.",
          "02 / ENVIRONMENT",
          "SDK & Component Setup",
          "Platform tools, build tools, SDK platforms, and license validation.",
          "03 / HARDWARE",
          "Emulators & Devices",
          "Virtual Device Manager, HAXM/Hyper-V, and adb phone debugging.",
          "04 / AUTOMATION",
          "Gradle Build System",
          "Project structure, manifest files, and framework synchronization.",
          "05 / INSPECTION",
          "Debugging Tools",
          "Logcat stack traces, Chrome WebView inspection, and adb reverse.",
          "06 / PRODUCTION",
          "Build & Release",
          "APK vs AAB bundles, keystore security, and pre-release checklists."
        ]
      },
      {
        "slideNumber": 3,
        "category": "CORE IDE",
        "title": "What is Android Studio?",
        "bullets": [
          "Google\u2019s official Integrated Development Environment (IDE) for building Android applications across all target form factors.",
          "Cross-Framework Dependency",
          "Frameworks like Flutter and Capacitor/Ionic can be authored in VS Code, but native compilation always requires the Android SDK managed by Android Studio.",
          "Android Studio supplies the Device Manager & SDK binaries for CLI builds.",
          "SDK & Toolchain Manager",
          "Downloads and maintains Android SDK platforms, platform tools, and build tools.",
          "Gradle Build Engine Integration",
          "Compiles Java/Kotlin code, process resources, and sign native APK/AAB binaries."
        ]
      },
      {
        "slideNumber": 4,
        "category": "TOOLING COMPARISON",
        "title": "Android Studio vs. VS Code",
        "bullets": [
          "Android Studio",
          "Bundled Environment: IDE + SDK Manager + Emulator + Gradle.",
          "Native Profiling: Memory, CPU, network, and battery profilers.",
          "Role: Native project compilation, release signing, and AVD management.",
          "VS Code",
          "Lightweight Editor: Fast code editing, extensions, and git workflows.",
          "No Bundled SDK: Requires external Android SDK installation.",
          "Role: Authoring React, TypeScript, Flutter, and HTML frontend code."
        ]
      },
      {
        "slideNumber": 5,
        "category": "SDK INSTALLATION",
        "title": "Essential SDK Components",
        "bullets": [
          "Android SDK Platform",
          "Target framework API level binaries (e.g., API 34 / Android 14) required for compiling apps.",
          "Android SDK Platform-Tools",
          "Contains command-line utilities including adb (Android Debug Bridge) and fastboot.",
          "Android SDK Build-Tools",
          "Native toolchain utilities including aapt2 resource compilers and d8/r8 bytecode shrinkers.",
          "Android Emulator & System Images",
          "Virtual machine runtime engines and x86_64 OS images for local desktop device simulation."
        ]
      },
      {
        "slideNumber": 6,
        "category": "TOOLCHAIN DIAGNOSTICS",
        "title": "SDK Licenses & Verification",
        "bullets": [
          "# Accept missing Android SDK licenses flutter doctor --android-licenses # Verify connected physical or virtual devices adb devices # Perform overall framework toolchain audit flutter doctor",
          "License Acceptance Invariant",
          "Unaccepted Android SDK licenses completely block native Gradle compilation commands in both Flutter and Capacitor.",
          "Run flutter doctor --android-licenses and accept all prompts until flutter doctor reports a green checkmark."
        ]
      },
      {
        "slideNumber": 7,
        "category": "VIRTUAL TESTING",
        "title": "Android Emulator (AVD) Configuration",
        "bullets": [
          "Device Manager Setup",
          "Hardware Acceleration",
          "Emulators require hardware virtualization support (Intel HAXM, Hyper-V, or KVM on Linux).",
          "Troubleshooting: If emulator fails to boot or runs slowly, verify CPU virtualization is enabled in system BIOS.",
          "1. Launch Device Manager from Android Studio welcome window or toolbar.",
          "2. Select a hardware profile (e.g. Pixel 8) with Play Store capabilities.",
          "3. Download an x86_64 system image (matching native host architecture).",
          "4. Launch virtual device and verify boot state via adb devices."
        ]
      },
      {
        "slideNumber": 8,
        "category": "HARDWARE DEBUGGING",
        "title": "Physical Phone Setup & Authorization",
        "bullets": [
          "Device Enabling Sequence",
          "adb Device Verification",
          "# List connected devices $ adb devices List of devices attached R58M123456A device # Authorized R58M999999B unauthorized # RSA pending",
          "Status device indicates full authorization. unauthorized means the user has not accepted the USB RSA key.",
          "1.",
          "Open Settings \u2192 About Phone on target Android device.",
          "2.",
          "Tap Build Number 7 consecutive times to enable Developer Options.",
          "3.",
          "Navigate to Developer Options and enable USB Debugging.",
          "4.",
          "Connect via USB and approve computer RSA fingerprint key prompt."
        ]
      },
      {
        "slideNumber": 9,
        "category": "CLI TOOLING",
        "title": "Essential adb Commands",
        "bullets": [
          "adb devices",
          "adb install",
          "adb logcat",
          "adb reverse tcp:8080 tcp:8080",
          "List Attached Targets",
          "Queries daemon for connected physical phones and running emulator instances.",
          "Direct Binary Sideloading",
          "Pushes and installs compiled APK files directly onto target device hardware.",
          "Stream System Logs",
          "Streams real-time device logs, runtime exceptions, and crash stack traces.",
          "Network Port Forwarding",
          "Forwards phone localhost requests directly to desktop development servers."
        ]
      },
      {
        "slideNumber": 10,
        "category": "BUILD AUTOMATION",
        "title": "Gradle Build System Architecture",
        "bullets": [
          "Gradle Core Concepts",
          "Android Project Structure",
          "android/ \u251c\u2500 app/ \u2502 \u251c\u2500 src/main/AndroidManifest.xml \u2502 \u2514\u2500 build.gradle (App config & signing) \u251c\u2500 build.gradle (Project repositories) \u2514\u2500 gradlew (Gradle wrapper script)",
          "\u2022 Gradle Wrapper (gradlew): Ensures identical build tool versions across teams.",
          "\u2022 Dependency Resolution: Fetches native Java/Kotlin libraries from Maven/Google repositories.",
          "\u2022 Build Variants: Compiles isolated debug and release artifacts."
        ]
      },
      {
        "slideNumber": 11,
        "category": "FRAMEWORK INTEGRATION",
        "title": "Capacitor & Flutter Android Integration",
        "bullets": [
          "Capacitor Workflow",
          "Web build assets are copied into android/app/src/main/assets/public via CLI:",
          "ionic build && npx cap sync android",
          "Flutter Workflow",
          "Flutter engine invokes Gradle internally via unified CLI build targets:",
          "flutter build apk --release"
        ]
      },
      {
        "slideNumber": 12,
        "category": "SECTION 05",
        "title": "Native Inspection & Debugging",
        "bullets": [
          "Logcat analysis, Chrome DevTools WebView inspection, and port forwarding setups."
        ]
      },
      {
        "slideNumber": 13,
        "category": "DIAGNOSTICS",
        "title": "Logcat & Chrome DevTools Inspection",
        "bullets": [
          "Logcat Output",
          "Inspect real-time system messages, Java/Kotlin exceptions, and native crashes. Filter by package ID or tag.",
          "package:mine level:error",
          "Chrome DevTools (WebView)",
          "Inspect Capacitor / Ionic WebView instances by navigating Chrome on desktop to:",
          "chrome://inspect"
        ]
      },
      {
        "slideNumber": 14,
        "category": "DISTRIBUTION",
        "title": "APK vs. Android App Bundle (AAB)",
        "bullets": [
          "APK (Android Package)",
          "Self-contained binary suitable for direct device sideloading, local testing, and enterprise distribution.",
          "Direct Install / QA Testing",
          "AAB (Android App Bundle)",
          "Publishing format for Google Play Store. Dynamic Delivery generates device-optimized micro-APKs upon download.",
          "Mandatory for Google Play"
        ]
      },
      {
        "slideNumber": 15,
        "category": "RELEASE ENGINEERING",
        "title": "Release Signing & Build Commands",
        "bullets": [
          "# Flutter Release Commands flutter build apk --release flutter build appbundle --release # Capacitor Release Steps ionic build npx cap sync android # Android Studio: Build -> Generate Signed Bundle / APK",
          "Key Signing Rule",
          "Store release keystores and passwords securely OUTSIDE source control.",
          "Never commit release-key.jks or plain text passwords into Git repositories."
        ]
      },
      {
        "slideNumber": 16,
        "category": "PRE-FLIGHT AUDIT",
        "title": "Production Release Checklist",
        "bullets": [
          "Unique Application ID",
          "Configured unique reverse-domain ID in build.gradle.",
          "Keystore Outside Git",
          "Signing credentials stored securely in environment secret stores.",
          "Enforced Production HTTPS",
          "Cleartext traffic disabled for production domains.",
          "Tested Release Build",
          "Installed and verified signed release binary on physical hardware."
        ]
      },
      {
        "slideNumber": 17,
        "category": "DIAGNOSTICS",
        "title": "Troubleshooting Common Errors",
        "bullets": [
          "ISSUE: Gradle Cannot Download Dependencies",
          "ISSUE: Device Marked Unauthorized",
          "ISSUE: Missing Android SDK Licenses",
          "ISSUE: Release Cannot Find Signing Config",
          "Verify internet proxy settings, disk space, and repository URLs in build.gradle.",
          "Unlock phone screen, re-plug USB cable, and accept RSA key authorization dialog.",
          "Run flutter doctor --android-licenses and accept all license terms.",
          "Verify keystore file path and credentials inside android/app/build.gradle."
        ]
      },
      {
        "slideNumber": 18,
        "category": "SUMMARY",
        "title": "Key Takeaways",
        "bullets": [
          "01",
          "Android Studio provides the IDE, Android SDK manager, AVD emulators, and Gradle engine.",
          "02",
          "Use adb devices to verify attached physical hardware and emulator instances.",
          "03",
          "Build Android App Bundles (AAB) for Play Store distribution; keep keystores outside Git."
        ]
      },
      {
        "slideNumber": 19,
        "category": "REVIEW",
        "title": "Assessment Check",
        "bullets": [
          "Q: Which tool reports connected devices?",
          "A: adb (Android Debug Bridge).",
          "Q: Where do you create a virtual emulator?",
          "A: Device Manager inside Android Studio.",
          "Q: Which build target is required for Play Store?",
          "A: AAB (Android App Bundle).",
          "Q: Should signing keys be committed to Git?",
          "A: No, store signing keys securely outside Git."
        ]
      },
      {
        "slideNumber": 20,
        "category": "CONCLUSION",
        "title": "Thank You",
        "bullets": [
          "Install, configure, build, and release native Android applications with confidence.",
          "Mobile App Development Learning Center"
        ]
      }
    ]
  },
  {
    "id": "realtime-iot",
    "lessonSlug": "realtime-iot-monitoring",
    "relatedSlugs": [
      "display-sensor-data",
      "sensor-graphs"
    ],
    "title": "Real-Time IoT Monitoring",
    "subtitle": "Data freshness, reconnection resilience, polling vs. WebSockets, and data-quality states",
    "badge": "Telemetry Standard",
    "fileName": "Real-Time IoT Monitoring.pptx",
    "downloadUrl": "/presentations/Real-Time_IoT_Monitoring.pptx",
    "fileSize": "167 KB",
    "slideCount": 16,
    "slides": [
      {
        "slideNumber": 1,
        "category": "MOBILE APP DEVELOPMENT LEARNING CENTER",
        "title": "Real-Time IoT Monitoring",
        "bullets": [
          "Data freshness, reconnection resilience, polling vs. WebSockets, and data-quality states.",
          "Telemetry Standard",
          "ESP32 \u2022 Raspberry Pi \u2022 Mobile UI"
        ]
      },
      {
        "slideNumber": 2,
        "category": "STRUCTURE",
        "title": "Presentation Agenda",
        "bullets": [
          "01 / PRINCIPLES",
          "What \"Real-Time\" Means",
          "Defining accuracy, update cadences, and connectivity honesty.",
          "02 / PIPELINE",
          "End-to-End Data Flow",
          "ESP32 publish \u2192 Pi Mosquitto \u2192 FastAPI \u2192 Client rendering.",
          "03 / SIGNALS",
          "Monitoring States",
          "Separating network status, backend health, and data age.",
          "04 / TRANSPORT",
          "Polling vs WebSockets",
          "Evaluating REST polling baselines against socket push streams.",
          "05 / LIFECYCLE",
          "Backgrounding & Power",
          "Battery management, resume triggers, and fault recovery.",
          "06 / DIAGNOSTICS",
          "Troubleshooting",
          "Common failure scenarios, freshness rules, and assessment."
        ]
      },
      {
        "slideNumber": 3,
        "category": "DEFINITIONS",
        "title": "What \"Real-Time\" Means for IoT",
        "bullets": [
          "Honest Data Reporting",
          "\"Real-time\" does not mean instant speed \u2014 it means correct and honest system representation.",
          "Critical Distinction",
          "Never mistake HTTP connectivity for sensor health.",
          "\u2022 Explicit sensor update intervals.",
          "\u2022 Transparent connectivity status.",
          "\u2022 Clear behavior when sensors freeze.",
          "A 200 OK REST response from FastAPI only proves the web server is online \u2014 it does not guarantee fresh ESP32 measurements."
        ]
      },
      {
        "slideNumber": 4,
        "category": "TELEMETRY PATH",
        "title": "End-to-End Data Pipeline",
        "bullets": [
          "NODE 01",
          "NODE 02",
          "NODE 03",
          "NODE 04",
          "ESP32 Firmware",
          "Publishes periodic JSON metrics over Wi-Fi MQTT topic.",
          "Pi Ingestion",
          "Mosquitto receives payloads; Python inserts into SQLite.",
          "FastAPI REST",
          "Exposes current/history endpoints and status routes.",
          "Mobile Client",
          "Fetches telemetry via polling or WebSocket stream."
        ]
      },
      {
        "slideNumber": 5,
        "category": "SYSTEM STATUS",
        "title": "Three Distinct Diagnostic Signals",
        "bullets": [
          "1. Network Reachability",
          "Physical phone-to-Pi Wi-Fi connectivity interface status.",
          "2. Backend Health",
          "FastAPI runtime status combined with Mosquitto broker link.",
          "3. Sensor Freshness",
          "Age of the last stored timestamp compared to current time."
        ]
      },
      {
        "slideNumber": 6,
        "category": "API State",
        "title": "Timestamp & Payload Condition",
        "bullets": [
          "UI Render Outcome",
          "Unreachable",
          "N/A (Connection Failed)",
          "Connection Error: Trigger retry with exponential backoff.",
          "Reachable",
          "Old Timestamp (> 2x Interval)",
          "Stale Sensor Data: Warn user ESP32 feed is offline.",
          "Reachable",
          "Reading == Null",
          "Waiting State: Database empty, awaiting first reading.",
          "Reachable",
          "Fresh Timestamp",
          "Live Reading: Fully operational telemetry render.",
          "STATE MAPPING",
          "Monitoring States & UI Outcomes"
        ]
      },
      {
        "slideNumber": 7,
        "category": "UPDATE TRANSPORT",
        "title": "REST Polling vs. WebSockets",
        "bullets": [
          "REST Polling (Baseline)",
          "Periodic GET /api/readings/current fetch calls. Supported out-of-the-box by all backends.",
          "WebSocket Push (Optional)",
          "Reduces polling overhead via server-initiated /ws/readings data frames.",
          "\u2022 Simplest to operate and debug.",
          "\u2022 Requires sensible minimum interval.",
          "\u2022 Easily paused when backgrounded.",
          "\u2022 Requires dedicated backend route.",
          "\u2022 Needs bounded reconnect logic.",
          "\u2022 Retains REST polling as fallback."
        ]
      },
      {
        "slideNumber": 8,
        "category": "DATA QUALITY",
        "title": "Freshness Thresholds & Timestamps",
        "bullets": [
          "Threshold Definition",
          "Base stale warnings explicitly on the ESP32 publish cadence.",
          "Stale Cutoff = ESP32 Interval \u00d7 2",
          "Example: If ESP32 publishes every 5 seconds, mark data stale after 10 seconds without updates.",
          "Timestamp Rules",
          "\u2022 Always display actual last-reading timestamp in UI.",
          "\u2022 Prefer backend/server timestamps over mobile device time.",
          "\u2022 Handle missing or null timestamps gracefully without crashing."
        ]
      },
      {
        "slideNumber": 9,
        "category": "LIFECYCLE MANAGEMENT",
        "title": "Backgrounding & Power Optimization",
        "bullets": [
          "1. Pause Polling",
          "Halt or slow timer loops when mobile app enters background state.",
          "2. Resume Refresh",
          "Trigger immediate telemetry refresh as soon as app returns to foreground.",
          "3. Battery Protection",
          "Prevent radio drain from continuous background polling requests."
        ]
      },
      {
        "slideNumber": 10,
        "category": "SECTION 05",
        "title": "Failure Recovery & Testing Protocols",
        "bullets": [
          "Simulating component drops, testing network reconnects, and validating freshness recovery."
        ]
      },
      {
        "slideNumber": 11,
        "category": "RESILIENCE TESTING",
        "title": "Failure Simulation Protocols",
        "bullets": [
          "Disconnect Wi-Fi",
          "Verifies immediate connection error handling and backoff retries.",
          "Stop Mosquitto Service",
          "Verifies API reports broker disconnect without failing HTTP route.",
          "Stop FastAPI Server",
          "Verifies mobile client correctly surfaces API unreachable state.",
          "Restore Network Link",
          "Confirms app refreshes data and evaluates timestamp before \"live\" badge."
        ]
      },
      {
        "slideNumber": 12,
        "category": "OPTIMIZATION",
        "title": "Battery & Performance Efficiency",
        "bullets": [
          "Polling Efficiency",
          "UI Performance",
          "\u2022 Avoid aggressive polling (< 2-second intervals).",
          "\u2022 Match polling rate directly to ESP32 publish frequency.",
          "\u2022 Pause all background timers when screen locks.",
          "\u2022 Debounce rapid state updates to prevent re-render lag.",
          "\u2022 Cap historical chart data arrays (e.g. max 50 points).",
          "\u2022 Separate metrics display cards by physical measurement unit."
        ]
      },
      {
        "slideNumber": 13,
        "category": "DIAGNOSTICS",
        "title": "Troubleshooting Real-Time Issues",
        "bullets": [
          "ISSUE: Old Data Shown After Reconnect",
          "ISSUE: Excessive Battery Drain",
          "ISSUE: Stale Values Despite Online API",
          "ISSUE: Chart Runs Backward",
          "Refresh current reading endpoint immediately and re-evaluate timestamp freshness before displaying live state.",
          "Increase poll interval, pause background timers, or transition to WebSocket push streams.",
          "Compare reading timestamp against current server time and verify Mosquitto MQTT status.",
          "Backend returns historical telemetry newest-first; reverse array on client side prior to chart rendering."
        ]
      },
      {
        "slideNumber": 14,
        "category": "SUMMARY",
        "title": "Key Takeaways",
        "bullets": [
          "01",
          "\"Real-time\" means accurate and honest data representation, not just raw execution speed.",
          "02",
          "Track three signals independently: Network reachability, Backend health, and Sensor data age.",
          "03",
          "Start with REST polling as baseline; pause polling while backgrounded to conserve device battery."
        ]
      },
      {
        "slideNumber": 15,
        "category": "REVIEW",
        "title": "Assessment Check",
        "bullets": [
          "Q: Does HTTP reachability prove fresh sensor data?",
          "A: No. HTTP status only proves REST availability.",
          "Q: What reduces polling overhead?",
          "A: WebSocket push streams (after route setup).",
          "Q: When should polling pause?",
          "A: When the app is backgrounded.",
          "Q: How should freshness thresholds be set?",
          "A: Based directly on ESP32 publish cadence."
        ]
      },
      {
        "slideNumber": 16,
        "category": "CONCLUSION",
        "title": "Thank You",
        "bullets": [
          "Build honest, resilient, and power-efficient real-time IoT monitoring applications.",
          "Mobile App Development Learning Center"
        ]
      }
    ]
  },
  {
    "id": "end-to-end",
    "lessonSlug": "end-to-end-integration",
    "relatedSlugs": [],
    "title": "End-to-End IoT Integration",
    "subtitle": "ESP32 + Raspberry Pi + Mobile App full system validation, diagnostic boundaries, and security protocols",
    "badge": "System Validation Stack",
    "fileName": "End-to-End IoT Integration.pptx",
    "downloadUrl": "/presentations/End-to-End_IoT_Integration.pptx",
    "fileSize": "267 KB",
    "slideCount": 18,
    "slides": [
      {
        "slideNumber": 1,
        "category": "MOBILE APP DEVELOPMENT LEARNING CENTER",
        "title": "End-to-End IoT Integration",
        "bullets": [
          "ESP32 + Raspberry Pi + Mobile App full system validation, diagnostic boundaries, and security protocols.",
          "System Validation Stack",
          "MQTT \u2022 FastAPI \u2022 SQLite \u2022 Mobile"
        ]
      },
      {
        "slideNumber": 2,
        "category": "STRUCTURE",
        "title": "Presentation Agenda",
        "bullets": [
          "01 / ARCHITECTURE",
          "System Overview",
          "Independent system layers and boundary isolation principles.",
          "02 / FIRMWARE",
          "Sensors & ESP32",
          "Sensor wiring, I2C addressing, and MQTT payload validation.",
          "03 / BACKEND",
          "Pi Ingestion & REST",
          "Mosquitto broker, SQLite storage, and FastAPI endpoints.",
          "04 / CLIENT",
          "Mobile Integration",
          "App configuration, rendering states, and state separation.",
          "05 / RESILIENCE",
          "Failure & Recovery",
          "Fault isolation, connection recovery, and security models.",
          "06 / ACCEPTANCE",
          "Checklist & Audit",
          "End-to-end criteria, diagnostics, and troubleshooting."
        ]
      },
      {
        "slideNumber": 3,
        "category": "SYSTEM ARCHITECTURE",
        "title": "Complete End-to-End Pipeline",
        "bullets": [
          "1. ESP32 & Sensors",
          "VL53L0X, BH1750, Soil over I2C / ADC",
          "2. MQTT Broker",
          "Mosquitto running on Pi over Wi-Fi",
          "3. Ingestion & DB",
          "Python subscriber saves to SQLite",
          "4. Mobile App",
          "FastAPI REST rendering (Flutter/Ionic)"
        ]
      },
      {
        "slideNumber": 4,
        "category": "METHODOLOGY",
        "title": "Core Diagnostic Principle",
        "bullets": [
          "Boundary Validation",
          "Validate each system boundary using its own logs, metrics, or explicit requests.",
          "Never mark an integration complete based solely on a successful mobile screen render.",
          "B1",
          "Sensors \u2192 ESP32 Firmware Execution",
          "B2",
          "ESP32 \u2192 MQTT Broker Transport",
          "B3",
          "MQTT \u2192 Backend Subscriber Ingestion & SQLite",
          "B4",
          "SQLite \u2192 FastAPI REST Response",
          "B5",
          "REST \u2192 Mobile App Config & State Rendering"
        ]
      },
      {
        "slideNumber": 5,
        "category": "STEP 01",
        "title": "Verify Sensors & Firmware",
        "bullets": [
          "Hardware Audit Checklist",
          "Target Payload Structure",
          "{ \"tof_distance_mm\": 142, \"light_lux\": 350, \"soil_moisture_percent\": 68, \"timestamp\": \"2026-11-07T23:30:00Z\" }",
          "* Mismatched JSON field names directly cause silent backend ingestion drops.",
          "Voltage Check: Verify safe 3.3V power rails (protect sensors).",
          "Pin Mapping: Confirm I2C addresses & ADC GPIO assignments.",
          "Serial Output: Inspect ESP32 serial logs for physical readings.",
          "Payload Format: Validate topic names & strict JSON strings."
        ]
      },
      {
        "slideNumber": 6,
        "category": "STEP 02",
        "title": "Verify Pi Ingestion & Health",
        "bullets": [
          "Verification Pipeline",
          "Health Check Command",
          "curl http://:8080/api/health # Response: { \"status\": \"ok\", \"mqtt_connected\": true, \"database\": \"connected\" }",
          "Health endpoints must report backend operational status and MQTT connectivity separately.",
          "1. Mosquitto Sub: Confirm payload delivery at broker.",
          "2. Backend Subscriber: Inspect Python service log output.",
          "3. SQLite DB: Query newly inserted rows in database."
        ]
      },
      {
        "slideNumber": 7,
        "category": "STEP 03",
        "title": "Verify FastAPI REST Endpoints",
        "bullets": [
          "Core API Routes",
          "# Verify REST current reading curl http://192.168.1.50:8080/api/readings/current # Query historical series (Limit 25) curl \"http://192.168.1.50:8080/api/readings?limit=25\"",
          "GET /api/health",
          "GET /api/readings/current",
          "GET /api/readings?limit=N",
          "Client Tip: Backend supplies historical records newest-first. Reverse array clientside for chronological plotting.",
          "Backend API status and MQTT broker connection link.",
          "Returns latest stored measurement object.",
          "Historical array (newest-first). Reverse for charts."
        ]
      },
      {
        "slideNumber": 8,
        "category": "STEP 04",
        "title": "Configure & Validate Mobile App",
        "bullets": [
          "Setup Guidelines",
          "Physical Device Testing Rules",
          "Always test builds on physical hardware over real Wi-Fi network interfaces.",
          "* Never rely solely on USB tethering or desktop emulators for connectivity tests.",
          "\u2022 Input Pi LAN IP and HTTP port in dynamic settings screen.",
          "\u2022 Query current and historical endpoints dynamically.",
          "\u2022 Validate units (mm, lx, %) & local timestamps render correctly."
        ]
      },
      {
        "slideNumber": 9,
        "category": "CLIENT STATES",
        "title": "Required Mobile Rendering States",
        "bullets": [
          "Loading State",
          "Indicates initial REST fetch in progress.",
          "Real Data Rendering",
          "Renders values alongside units (mm, lx, %).",
          "No Reading Yet State",
          "Shows \"Unavailable\" when backend returns null fields.",
          "Request Error State",
          "Explicit failure notification. Never show fake/cached mock data."
        ]
      },
      {
        "slideNumber": 10,
        "category": "STEP 05",
        "title": "Failure & Recovery Testing",
        "bullets": [
          "1. Host Fault",
          "Configure incorrect IP host to verify UI connection error triggering.",
          "2. Broker Interruption",
          "Stop Mosquitto service to verify MQTT status changes independently.",
          "3. Network Restoration",
          "Restore network connectivity to test automatic data stream resumes."
        ]
      },
      {
        "slideNumber": 11,
        "category": "API Reachable",
        "title": "Payload / Timestamp",
        "bullets": [
          "System State Diagnosis",
          "FALSE",
          "N/A",
          "API Unreachable: Network failure or backend offline. Retry with backoff.",
          "TRUE",
          "Old Timestamp",
          "Stale Sensor Data: ESP32 or MQTT pipeline stopped publishing.",
          "TRUE",
          "Reading == Null",
          "Waiting for Initial Data: DB empty, awaiting first sensor publish.",
          "TRUE",
          "Fresh Timestamp",
          "Live Reading: Complete end-to-end operational state.",
          "STATE MATRIX",
          "System Monitoring States"
        ]
      },
      {
        "slideNumber": 12,
        "category": "SECTION 06",
        "title": "Remote Access Safety & Production Hardening",
        "bullets": [
          "Securing off-LAN IoT communications, gateway authentication, and network policies."
        ]
      },
      {
        "slideNumber": 13,
        "category": "SECURITY ARCHITECTURE",
        "title": "Remote Access Protection Rules",
        "bullets": [
          "Recommended Security Models",
          "Strictly Forbidden Configurations",
          "WireGuard / Tailscale VPN: Secure encrypted tunnel to Pi network.",
          "HTTPS Gateway: Reverse proxy with TLS encryption & JWT auth.",
          "Rate Limiting: Throttle inbound public API gateway traffic.",
          "Unauthenticated Port Forwarding: Exposing plain HTTP to WAN.",
          "Public MQTT Listeners: Exposing port 1883 without TLS/auth.",
          "Debug API Access: Leaving unauthenticated endpoints open."
        ]
      },
      {
        "slideNumber": 14,
        "category": "VALIDATION",
        "title": "Integration Acceptance Checklist",
        "bullets": [
          "ESP32 reads physical sensors and publishes configured MQTT topics correctly.",
          "Raspberry Pi subscriber logs incoming frames and commits rows to SQLite database.",
          "FastAPI /api/health endpoint accurately reports backend and MQTT service states.",
          "FastAPI /api/readings/current returns structured JSON measurements.",
          "Mobile client connects dynamically to Pi LAN host and formats units/timestamps.",
          "Offline, stale, and empty-data UI rendering states are distinct and understandable."
        ]
      },
      {
        "slideNumber": 15,
        "category": "TROUBLESHOOTING",
        "title": "Common Integration Issues",
        "bullets": [
          "ISSUE: ESP32 Publishes, API Has No Data",
          "ISSUE: App Works Only on Dev PC",
          "ISSUE: Complete Blank Dashboard",
          "ISSUE: Stale Readings After Reconnect",
          "Compare MQTT topic, verify JSON keys, check Python validation logs & DB write permissions.",
          "Configure explicit Pi LAN origin IP inside app settings; test without USB tethering.",
          "Audit boundaries in sequence: Sensor \u2192 MQTT \u2192 Ingestion \u2192 REST \u2192 App config.",
          "Re-trigger current data REST query on application resume and evaluate timestamp age."
        ]
      },
      {
        "slideNumber": 16,
        "category": "SUMMARY",
        "title": "Key Takeaways",
        "bullets": [
          "01",
          "Validate system boundaries independently in strict sequential order.",
          "02",
          "Distinguish API connectivity status from MQTT broker health and sensor data age.",
          "03",
          "Remote access requires encrypted VPN tunnels or authenticated TLS reverse proxies."
        ]
      },
      {
        "slideNumber": 17,
        "category": "REVIEW",
        "title": "Assessment Check",
        "bullets": [
          "Q: What is the correct diagnostic order for a blank dashboard?",
          "A: Sensor/firmware \u2192 MQTT delivery \u2192 backend ingestion/SQLite \u2192 REST response \u2192 mobile config/rendering.",
          "Q: Does HTTP endpoint reachability prove fresh sensor data?",
          "A: No. HTTP status only proves REST availability. Sensor timestamp freshness must be evaluated independently."
        ]
      },
      {
        "slideNumber": 18,
        "category": "CONCLUSION",
        "title": "Thank You",
        "bullets": [
          "Validate every boundary to build reliable, end-to-end IoT system integrations.",
          "Mobile App Development Learning Center"
        ]
      }
    ]
  }
]

export function getPresentationForLesson(slug: string): MobileAppPresentation | undefined {
  return mobileAppPresentations.find(
    (p) => p.lessonSlug === slug || p.relatedSlugs.includes(slug)
  )
}
