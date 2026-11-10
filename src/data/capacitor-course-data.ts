export type CapacitorLevel = 'Beginner' | 'Beginner–Intermediate' | 'Intermediate' | 'Advanced'

export interface CapacitorCodeExample {
  title: string
  filename: string
  language: string
  code: string
  explanation: string
  expectedOutput?: string
}

export interface CapacitorQuizOption {
  label: string
  correct: boolean
  feedback: string
}

export interface CapacitorQuizQuestion {
  type: 'Multiple choice' | 'True or false'
  question: string
  options: CapacitorQuizOption[]
}

export interface CapacitorLesson {
  slug: string
  title: string
  level: CapacitorLevel
  minutes: number
  summary: string
  objectives: string[]
  prerequisites: string[]
  sections: { title: string; body: string; bullets?: string[]; note?: string }[]
  steps: { title: string; detail: string }[]
  examples: CapacitorCodeExample[]
  diagram: { title: string; nodes: string[] }
  activity: string
  quiz: CapacitorQuizQuestion[]
  docs: { label: string; href: string }[]
}

const docs = {
  gettingStarted: { label: 'Official: Getting Started', href: 'https://capacitorjs.com/docs/getting-started' },
  environment: { label: 'Official: Environment Setup', href: 'https://capacitorjs.com/docs/getting-started/environment-setup' },
  config: { label: 'Official: Configuration', href: 'https://capacitorjs.com/docs/config' },
  android: { label: 'Official: Android', href: 'https://capacitorjs.com/docs/android' },
  ios: { label: 'Official: iOS', href: 'https://capacitorjs.com/docs/ios' },
  plugins: { label: 'Official: Plugins', href: 'https://capacitorjs.com/docs/apis' },
  camera: { label: 'Camera API', href: 'https://capacitorjs.com/docs/apis/camera' },
  geolocation: { label: 'Geolocation API', href: 'https://capacitorjs.com/docs/apis/geolocation' },
  filesystem: { label: 'Filesystem API', href: 'https://capacitorjs.com/docs/apis/filesystem' },
  device: { label: 'Device API', href: 'https://capacitorjs.com/docs/apis/device' },
  push: { label: 'Push Notifications API', href: 'https://capacitorjs.com/docs/apis/push-notifications' },
  network: { label: 'Network API', href: 'https://capacitorjs.com/docs/apis/network' },
  sync: { label: 'CLI: Sync', href: 'https://capacitorjs.com/docs/cli/commands/sync' },
  build: { label: 'CLI: Build', href: 'https://capacitorjs.com/docs/cli/commands/build' },
  bluetooth: { label: 'Community BLE plugin', href: 'https://github.com/capacitor-community/bluetooth-le' },
}

export const capacitorLessons: CapacitorLesson[] = [
  {
    slug: 'introduction',
    title: 'Introduction to Capacitor',
    level: 'Beginner',
    minutes: 25,
    summary: 'Understand how Capacitor brings an existing web app into native Android and iOS projects.',
    objectives: [
      'Explain what Capacitor is and where it fits beside Ionic and React.',
      'Trace a JavaScript-to-native plugin call.',
      'Choose between Capacitor, Expo Go, and React Native for a project.',
    ],
    prerequisites: ['Basic HTML, CSS, and JavaScript', 'A browser and an existing web project'],
    sections: [
      {
        title: 'What Capacitor is',
        body: 'Capacitor is an open-source native runtime and toolchain maintained by the Ionic team. It wraps a web application in a platform-native project (Android or iOS), loads the web interface in the platform WebView, and exposes native capabilities through a consistent JavaScript plugin API.',
        bullets: ['Ionic is an optional UI component framework; Capacitor is not limited to Ionic.', 'A React, Vue, Angular, or vanilla JavaScript app can use Capacitor.', 'Capacitor generates real Android and iOS projects that you can open and customize in their native IDEs.'],
      },
      {
        title: 'How the bridge works',
        body: 'The web UI runs inside Android System WebView or iOS WKWebView. When JavaScript calls an installed plugin, Capacitor routes that call over its bridge to native Java/Kotlin or Swift/Objective-C implementation, then returns a Promise result to JavaScript. Plugin code runs only on supported platforms; provide a web fallback where the plugin offers one.',
        bullets: ['Your web build contains index.html and bundled JS, CSS, and assets.', 'npx cap sync copies that build into the native app and updates native plugin dependencies.', 'The native shell provides app lifecycle, permissions, and plugin integration; it does not automatically rewrite the website into native UI widgets.'],
      },
      {
        title: 'Web app versus native UI',
        body: 'A Capacitor app keeps the web rendering model inside a native container. This gives teams web-code reuse and access to native APIs, while a fully native or React Native UI can offer different rendering, performance, or platform integration characteristics. Responsiveness, accessibility, offline behavior, and device testing remain the application team’s responsibility.',
        bullets: ['Advantages: reuse web skills and code, share business logic, ship through app stores, access plugins.', 'Trade-offs: WebView rendering, plugin/platform compatibility work, native build/signing requirements, and store review.', 'Ionic + Capacitor combines Ionic’s web components with Capacitor’s native runtime; either can be used without the other.'],
      },
      {
        title: 'Capacitor, Expo Go, and React Native',
        body: 'Expo Go is a convenient host app for developing React Native apps, with a prebuilt set of native modules. React Native builds its UI from native-backed components using JavaScript/TypeScript. Capacitor keeps your existing web DOM and CSS and packages them in a WebView. A custom Expo development build and a Capacitor native project both support native customization, but use different UI and build workflows.',
      },
      {
        title: 'Where teams use Capacitor',
        body: 'Capacitor is useful for internal business tools, inventory and field-service apps, content applications, companion dashboards, and products whose existing web app can share screens and business logic with a mobile shell. Teams still need to validate app-store requirements, offline expectations, accessibility, device permissions, and any performance-sensitive interaction.',
      },
    ],
    steps: [
      { title: 'Identify the web application', detail: 'Find the app entry point, package.json, production build command, and output directory. Capacitor needs a built web asset folder with an index.html file.' },
      { title: 'Choose a target platform', detail: 'Android builds can be created on Windows, macOS, or Linux with Android Studio. Local iOS builds require macOS and Xcode.' },
      { title: 'Pick the integration boundary', detail: 'Decide which screens stay web-based and which device capabilities need a Capacitor plugin.' },
    ],
    examples: [{
      title: 'Web-to-native flow',
      filename: 'architecture.txt',
      language: 'text',
      code: 'React / Vue / Angular / web UI\n             ↓ npm run build\n      dist/index.html + assets\n             ↓ npx cap sync android\n      Android project (WebView)\n             ↓ plugin bridge\n     Camera / GPS / Files / Device',
      explanation: 'Capacitor copies the compiled web assets and native plugin integration into generated platform projects.',
      expectedOutput: 'A native Android or iOS app shell displays the same built web interface.',
    }],
    diagram: { title: 'The Capacitor runtime', nodes: ['Web UI and bundled assets', 'Capacitor JavaScript bridge', 'Native Android / iOS plugins', 'Device APIs'] },
    activity: 'Choose one small web app you know. List the screens you would reuse unchanged, one native feature you would add, and one reason a WebView-based UI may not be the best fit.',
    quiz: [
      {
        type: 'Multiple choice',
        question: 'What does Capacitor primarily provide to a web application?',
        options: [
          { label: 'A native project shell, web runtime, and bridge to native plugins', correct: true, feedback: 'Correct. Capacitor packages web assets in native platform projects and exposes supported native APIs.' },
          { label: 'An automatic rewrite of HTML into native Android widgets', correct: false, feedback: 'Capacitor loads the web UI in a WebView; it does not automatically rewrite DOM elements as native widgets.' },
          { label: 'A replacement for the application backend', correct: false, feedback: 'The app can still call its existing backend APIs.' },
        ],
      },
      {
        type: 'True or false',
        question: 'Capacitor can only be used with Ionic UI components.',
        options: [
          { label: 'True', correct: false, feedback: 'Capacitor can be added to many modern JavaScript web apps; Ionic UI is optional.' },
          { label: 'False', correct: true, feedback: 'Correct. Capacitor works with web frameworks such as React, Vue, Angular, or plain JavaScript.' },
        ],
      },
    ],
    docs: [docs.gettingStarted, docs.plugins],
  },
  {
    slug: 'prerequisites-installation',
    title: 'Prerequisites and Installation',
    level: 'Beginner',
    minutes: 30,
    summary: 'Prepare Node.js, Android Studio, Android SDK, and the platform build tools.',
    objectives: [
      'Check the supported Node.js and npm versions.',
      'Install Android Studio and an Android SDK platform.',
      'Verify the toolchain before adding Capacitor.',
    ],
    prerequisites: ['A computer with administrator rights for SDK installation', 'Reliable internet access and several GB of free disk space'],
    sections: [
      {
        title: 'Java, Gradle, and SDK requirements',
        body: 'The current Capacitor 8 environment guide requires Node.js 22 or newer. For Android, install Android Studio and at least one Android SDK platform (API 24 or newer). Android Studio supplies a compatible JDK, so a separate system JDK is not normally required. The Gradle wrapper and Android Gradle Plugin are generated and versioned with the native project; use the wrapper instead of installing an arbitrary global Gradle.',
        bullets: ['Use the current Capacitor environment setup guide for version requirements as platform releases evolve.', 'In Android Studio, install Android SDK Platform Tools and an API level supported by the project.', 'Accept Android SDK licenses through Android Studio or sdkmanager before building.'],
      },
      {
        title: 'iOS requirements',
        body: 'iOS development requires a Mac with Xcode and Xcode Command Line Tools. Capacitor 8 currently documents Xcode 26 or newer. Windows users can build and run Android locally, but cannot create a local iOS simulator/device build with Xcode.',
      },
      {
        title: 'Verify the command line',
        body: 'Open a new terminal after installing Node or updating PATH. Android Studio provides SDK Manager and Device Manager; the SDK path can be checked in its settings and is needed by Android command-line tools.',
      },
    ],
    steps: [
      { title: 'Install Node.js', detail: 'Install Node.js 22+ from nodejs.org or a trusted version manager. npm is included with Node.js.' },
      { title: 'Install Android Studio', detail: 'Install Android Studio, then use SDK Manager to install Android SDK Platform Tools and an API 24+ platform.' },
      { title: 'Create a test device', detail: 'In Device Manager, create an emulator using an API 24+ system image, or prepare a physical Android phone with Developer options.' },
      { title: 'Check versions and SDK tools', detail: 'Run the commands below. If adb is missing, add the Android SDK platform-tools directory to PATH or use the Android Studio terminal.' },
    ],
    examples: [{
      title: 'Toolchain checks',
      filename: 'terminal',
      language: 'bash',
      code: 'node --version\nnpm --version\nnpx cap --version\nadb --version\n# From a Capacitor project:\ncd android\n./gradlew --version',
      explanation: 'The Capacitor CLI version command is available after installing the CLI. The Gradle wrapper check is run inside a generated Android project; on Windows use gradlew.bat --version.',
      expectedOutput: 'Node v22 or newer, npm, Capacitor CLI, Android Debug Bridge, and the project Gradle wrapper report version information.',
    }],
    diagram: { title: 'Android development workstation', nodes: ['Node.js 22+ and npm', 'Capacitor CLI', 'Android Studio + SDK', 'Emulator or USB device'] },
    activity: 'Install or verify the tools, record their versions, and create an Android emulator that reaches its home screen.',
    quiz: [
      {
        type: 'Multiple choice',
        question: 'Where should you get the Gradle version used to build a Capacitor Android project?',
        options: [
          { label: 'Use the project’s Gradle wrapper and generated Android tooling', correct: true, feedback: 'Correct. The wrapper pins the Gradle version expected by that project.' },
          { label: 'Install the newest Gradle globally and delete the wrapper', correct: false, feedback: 'Avoid replacing the wrapper with an arbitrary global Gradle; it may be incompatible.' },
          { label: 'Install Gradle through npm', correct: false, feedback: 'Gradle is part of the Android build toolchain, not an npm package.' },
        ],
      },
      {
        type: 'True or false',
        question: 'The current Capacitor Android setup normally requires you to install a separate JDK manually.',
        options: [
          { label: 'True', correct: false, feedback: 'Android Studio supplies the compatible JDK in the documented setup.' },
          { label: 'False', correct: true, feedback: 'Correct. The current guide says Android Studio installs the proper JDK.' },
        ],
      },
    ],
    docs: [docs.environment, docs.android, docs.ios],
  },
  {
    slug: 'first-project',
    title: 'Create Your First Capacitor Project',
    level: 'Beginner',
    minutes: 35,
    summary: 'Add Capacitor to a web app, initialize its identity, build assets, and sync them.',
    objectives: [
      'Install Capacitor core and CLI packages.',
      'Set a stable App ID, display name, and web output directory.',
      'Build web assets before syncing a native platform.',
    ],
    prerequisites: ['Node.js 22+ and npm', 'A web app whose production build produces index.html and static assets'],
    sections: [
      {
        title: 'Use an app with a static web build',
        body: 'Capacitor expects a built directory that contains a root index.html and assets. A client-rendered Vite, Ionic, or static-export app is a straightforward fit. A server-rendered Next.js site is not automatically converted into a self-contained native app: use a supported static export if the routes and features allow it, or host the web app and use a development/server URL intentionally. Confirm server actions, API routes, cookies, dynamic rendering, and image optimization before choosing static export.',
        note: 'This educational website uses Payload and Next.js server features; do not point Capacitor at its .next build output. Start with a separate static Vite/React sample if your goal is to learn Capacitor.',
      },
      {
        title: 'App ID and App Name',
        body: 'App ID is the reverse-domain identifier used by Android applicationId and the iOS bundle identifier, for example com.example.sensordashboard. Pick it early because changing it after publishing changes app identity. App Name is the human-readable label shown to users.',
      },
      {
        title: 'Build, then sync',
        body: 'The web framework owns the web build command and output folder. Set webDir to that output (Vite defaults to dist). Build first so the folder exists, then add a platform and run cap sync. Sync copies web assets and updates native plugin dependencies.',
      },
    ],
    steps: [
      { title: 'Create a small web app', detail: 'For example, scaffold a Vite React app with npm create vite@latest sensor-web -- --template react-ts and install its dependencies.' },
      { title: 'Install Capacitor and initialize it', detail: 'Run the commands in the first example from the project root and answer the prompts with a reverse-domain App ID and display name.' },
      { title: 'Build the web app', detail: 'Run your web bundler build. Confirm that dist/index.html exists before calling cap add or cap sync.' },
      { title: 'Add Android and synchronize', detail: 'Install the Android platform package, create the android project once, and sync the compiled web assets and plugins.' },
    ],
    examples: [
      {
        title: 'Install and initialize',
        filename: 'terminal',
        language: 'bash',
        code: 'npm create vite@latest sensor-web -- --template react-ts\ncd sensor-web\nnpm install\nnpm install @capacitor/core\nnpm install -D @capacitor/cli\nnpx cap init "Sensor Monitor" com.example.sensormonitor --web-dir dist',
        explanation: 'The CLI initializes a config using your app identity and Vite build folder. Replace the sample identifier with one you control.',
        expectedOutput: 'A capacitor.config.ts file is created. The project keeps its web source and adds Capacitor dependencies.',
      },
      {
        title: 'capacitor.config.ts',
        filename: 'capacitor.config.ts',
        language: 'typescript',
        code: "import type { CapacitorConfig } from '@capacitor/cli'\n\nconst config: CapacitorConfig = {\n  appId: 'com.example.sensormonitor',\n  appName: 'Sensor Monitor',\n  webDir: 'dist',\n}\n\nexport default config",
        explanation: 'webDir must contain the final index.html. This example uses the standard Vite output folder; other bundlers may use www, build, or another directory.',
      },
      {
        title: 'Build and add Android',
        filename: 'terminal',
        language: 'bash',
        code: 'npm run build\nnpm install @capacitor/android\nnpx cap add android\nnpx cap sync android',
        explanation: 'Build the web bundle before adding/syncing the native project. cap add android is a one-time platform creation; cap sync is repeated after builds or plugin changes.',
        expectedOutput: 'The android/ project contains the web bundle and the native Capacitor Android runtime.',
      },
    ],
    diagram: { title: 'First native project workflow', nodes: ['Web source', 'npm run build → dist/', 'npx cap sync android', 'android/ native project'] },
    activity: 'Create a new Vite React TypeScript project, inspect its dist/index.html, initialize Capacitor, and explain why webDir must point to dist.',
    quiz: [
      {
        type: 'Multiple choice',
        question: 'What must the configured Capacitor webDir contain after building?',
        options: [
          { label: 'The final index.html and its bundled web assets', correct: true, feedback: 'Correct. Capacitor copies the built web assets from webDir.' },
          { label: 'Only the project’s package.json', correct: false, feedback: 'Capacitor needs the compiled web application, including index.html.' },
          { label: 'The Android SDK installation', correct: false, feedback: 'The SDK is installed separately and is not the webDir.' },
        ],
      },
      {
        type: 'True or false',
        question: 'A standard server-rendered Next.js build can always be used directly as Capacitor webDir.',
        options: [
          { label: 'True', correct: false, feedback: 'Server-rendered builds may depend on a running Next server and server-only features; inspect the app and export compatibility.' },
          { label: 'False', correct: true, feedback: 'Correct. Capacitor expects a static web asset directory; SSR features require an intentional hosted/server approach or a compatible export.' },
        ],
      },
    ],
    docs: [docs.gettingStarted, docs.config, docs.sync],
  },
  {
    slug: 'android-studio',
    title: 'Android Studio Integration',
    level: 'Beginner–Intermediate',
    minutes: 40,
    summary: 'Generate the Android platform project, run it on a simulator or phone, and iterate safely.',
    objectives: [
      'Add and synchronize the Android platform.',
      'Open the native project in Android Studio.',
      'Run on an emulator or USB-connected device.',
    ],
    prerequisites: ['Lesson 2 toolchain installed', 'A successful production web build'],
    sections: [
      {
        title: 'Android project lifecycle',
        body: 'Install @capacitor/android and run npx cap add android once to create the native project. After changing web code or plugin dependencies, build the web app and run npx cap sync android. Open the android/ directory in Android Studio for Gradle sync, device selection, debugging, signing, and native configuration.',
      },
      {
        title: 'Emulator and USB device',
        body: 'Create an emulator in Android Studio Device Manager with an API 24+ system image. For a physical phone, enable Developer options by tapping Build number in About phone, turn on USB debugging, connect by USB, and approve the computer’s RSA prompt. Confirm detection with adb devices.',
        bullets: ['Use Android Studio’s Run button or npx cap run android.', 'The Android emulator reaches the host computer through 10.0.2.2, not its own localhost.', 'A physical phone must use the computer/server LAN IP for a backend; localhost points back to the phone.'],
      },
      {
        title: 'Iterate without losing track',
        body: 'When app assets are stale, run the web build and cap sync again. Native dependency changes require a Gradle sync. If the native project is edited in Android Studio, keep those changes in source control and avoid deleting the project folder as a routine reset.',
      },
    ],
    steps: [
      { title: 'Install Android support', detail: 'From the web project root, add @capacitor/android, then create the native Android project.' },
      { title: 'Build and synchronize', detail: 'Run the web build, then synchronize Android. If sync reports a missing web directory, confirm webDir and that your build succeeded.' },
      { title: 'Open Android Studio', detail: 'Open the generated android project using npx cap open android and wait for Gradle sync to finish.' },
      { title: 'Create emulator or connect phone', detail: 'Use Device Manager for an emulator. For a phone, enable USB debugging, accept the prompt, and confirm adb devices shows an authorized device.' },
      { title: 'Run and inspect', detail: 'Select the target and press Run, or use npx cap run android. Use Logcat and Chrome remote debugging to inspect native and WebView logs.' },
    ],
    examples: [{
      title: 'Full Android setup commands',
      filename: 'terminal',
      language: 'bash',
      code: 'npm install @capacitor/core\nnpm install -D @capacitor/cli\nnpx cap init\nnpm install @capacitor/android\nnpx cap add android\nnpm run build\nnpx cap sync android\nnpx cap open android',
      explanation: 'Run init once, add android once, and repeat build + sync as web assets or native plugins change.',
      expectedOutput: 'Android Studio opens the generated Android app. Run it on an emulator or an authorized phone.',
    }],
    diagram: { title: 'From web changes to a running device', nodes: ['Edit web app', 'npm run build', 'npx cap sync android', 'Android Studio → Run'] },
    activity: 'Run the starter app on an emulator or Android phone. Change a visible label, rebuild, sync, and confirm the native app shows the updated label.',
    quiz: [
      {
        type: 'Multiple choice',
        question: 'Which address should a physical Android phone usually use to reach a backend running on the developer’s computer?',
        options: [
          { label: 'The computer’s reachable LAN IP and backend port', correct: true, feedback: 'Correct. A physical phone is a separate device on the network.' },
          { label: 'http://localhost:8000', correct: false, feedback: 'On the phone, localhost refers to the phone itself.' },
          { label: 'The emulator-only 10.0.2.2 address', correct: false, feedback: '10.0.2.2 is the standard Android emulator host loopback alias, not a physical phone address.' },
        ],
      },
      {
        type: 'True or false',
        question: 'After updating web files, the native Android project receives them automatically without a new build or sync.',
        options: [
          { label: 'True', correct: false, feedback: 'For bundled assets, build the web app and run cap sync to copy the changes.' },
          { label: 'False', correct: true, feedback: 'Correct. Build and sync are part of the bundled-asset update workflow.' },
        ],
      },
    ],
    docs: [docs.android, docs.sync],
  },
  {
    slug: 'configuration',
    title: 'Capacitor Configuration',
    level: 'Intermediate',
    minutes: 35,
    summary: 'Configure app identity and webDir, and understand when to use a hosted development server.',
    objectives: [
      'Configure appId, appName, webDir, and platform-specific options.',
      'Distinguish bundled assets from server.url development mode.',
      'Diagnose common missing-asset and mixed-content issues.',
    ],
    prerequisites: ['A Capacitor project with at least one successful sync'],
    sections: [
      {
        title: 'The config file',
        body: 'capacitor.config.ts is the source of high-level app settings. appId is a reverse-domain package identity, appName is the user-facing name, and webDir points to the built index.html directory. Platform sections can hold platform-specific options. Keep configuration typed with CapacitorConfig and commit non-secret values.',
      },
      {
        title: 'Bundled assets versus server.url',
        body: 'For production, normally bundle the built app into the native project. server.url can direct the WebView to a remote development server, but it is intended for live reload/development—not a production shortcut. A LAN URL must be reachable from the device, the development server must bind to an external interface, and Android cleartext HTTP is not a secure production configuration.',
        note: 'Never ship a development server URL, localhost URL, or cleartext-only endpoint in a production build. Use a secured HTTPS endpoint for production APIs.',
      },
      {
        title: 'Localhost, emulator, and LAN',
        body: 'localhost inside a physical phone means the phone. For Android Emulator use 10.0.2.2 to access the host machine; for a physical device on Wi-Fi use the host machine’s LAN IP. Ensure the API binds to 0.0.0.0, allow only the needed port on the private LAN firewall, and configure CORS if browser-origin requests need it.',
      },
      {
        title: 'Common configuration failures',
        body: 'A wrong webDir produces a missing index.html or a blank WebView. A stale native app usually needs build + sync. A mismatched appId can create a second app identity. A server.url reachable on the computer but not the phone often indicates localhost, firewall, Wi-Fi isolation, HTTP policy, or incorrect port.',
        bullets: ['Check the actual build output before changing webDir.', 'Keep webDir relative to the project root.', 'Treat android.allowMixedContent as a debugging-only exception, not a production fix.'],
      },
    ],
    steps: [
      { title: 'Confirm the build output', detail: 'Run the web build and inspect the configured directory for index.html.' },
      { title: 'Review identity settings', detail: 'Choose a stable reverse-domain App ID and a clear display name before publishing.' },
      { title: 'Choose the serving model', detail: 'Use bundled assets for store builds. Use a reachable server.url only during intentional live reload or a designed hosted-web-app approach.' },
      { title: 'Sync after configuration changes', detail: 'Run npx cap sync android after changing config or plugin dependencies, then rebuild/run the native app.' },
    ],
    examples: [
      {
        title: 'Production bundle configuration',
        filename: 'capacitor.config.ts',
        language: 'typescript',
        code: "import type { CapacitorConfig } from '@capacitor/cli'\n\nconst config: CapacitorConfig = {\n  appId: 'com.example.sensormonitor',\n  appName: 'Sensor Monitor',\n  webDir: 'dist',\n  android: {\n    backgroundColor: '#07121f',\n  },\n}\n\nexport default config",
        explanation: 'This configuration packages local production assets. Do not put credentials in this client-visible configuration.',
      },
      {
        title: 'Development server URL (development only)',
        filename: 'capacitor.config.ts',
        language: 'typescript',
        code: "const config: CapacitorConfig = {\n  appId: 'com.example.sensormonitor',\n  appName: 'Sensor Monitor',\n  webDir: 'dist',\n  server: {\n    url: 'http://192.168.1.25:5173',\n    cleartext: true,\n  },\n}",
        explanation: 'Replace the sample address with the developer computer’s LAN IP. This is only for local development; remove server.url and avoid cleartext HTTP in release builds.',
        expectedOutput: 'The connected device loads the live-reload server only when it can reach that LAN URL.',
      },
    ],
    diagram: { title: 'Choose a web content source', nodes: ['Production build → webDir', 'cap sync copies assets', 'Native WebView loads bundle', 'Dev only: reachable server.url'] },
    activity: 'Set webDir to your actual build output and explain why server.url should not be committed as a production endpoint.',
    quiz: [
      {
        type: 'Multiple choice',
        question: 'What is the recommended production content source for a typical bundled Capacitor app?',
        options: [
          { label: 'Built assets copied into the native project through cap sync', correct: true, feedback: 'Correct. This makes the app bundle self-contained for its web UI.' },
          { label: 'A localhost development server URL', correct: false, feedback: 'localhost is device-local and a dev server URL should not ship in production.' },
          { label: 'An HTTP server.url with cleartext enabled', correct: false, feedback: 'That may be used for local development but is not a secure production setup.' },
        ],
      },
      {
        type: 'True or false',
        question: 'A physical phone can use localhost to reach a web server running on the developer’s laptop.',
        options: [
          { label: 'True', correct: false, feedback: 'The phone’s localhost points to the phone itself.' },
          { label: 'False', correct: true, feedback: 'Correct. Use the laptop’s reachable LAN IP and ensure the server/firewall permit access.' },
        ],
      },
    ],
    docs: [docs.config, docs.android],
  },
  {
    slug: 'native-plugins',
    title: 'Native Features and Plugins',
    level: 'Intermediate',
    minutes: 55,
    summary: 'Use official Capacitor plugins for camera, location, files, device information, and notifications.',
    objectives: [
      'Install and synchronize official Capacitor plugins.',
      'Request only the runtime permissions a feature needs.',
      'Test native features on a real device and account for platform differences.',
    ],
    prerequisites: ['A working Android project', 'A physical device recommended for camera, GPS, and push tests'],
    sections: [
      {
        title: 'Camera and photo selection',
        body: 'Install @capacitor/camera and sync. Use Camera.getPhoto with a controlled source and handle cancellation/errors. The official Camera plugin’s Android gallery selection uses the system photo picker; Android permissions are generally not required unless saving to the gallery. iOS requires the appropriate camera/photo usage descriptions in Info.plist.',
        bullets: ['Test capture and gallery selection on a physical device.', 'Only request gallery/storage permissions for features that actually need them.', 'Check image quality, orientation, temporary file lifetime, and upload behavior.'],
      },
      {
        title: 'GPS and location',
        body: 'Install @capacitor/geolocation and sync. Request location only when the user invokes a location feature. Android uses coarse/fine location permissions; iOS requires location usage descriptions. High-accuracy GPS can consume power; background location is a separate, policy-sensitive design and is not provided simply by calling getCurrentPosition.',
        bullets: ['Install: npm install @capacitor/geolocation && npx cap sync android.', 'Android: ACCESS_COARSE_LOCATION and ACCESS_FINE_LOCATION; request runtime access. iOS: add NSLocationWhenInUseUsageDescription.', 'Test on a physical phone outdoors or near a window; deny permission once and verify the app explains how to retry.'],
      },
      {
        title: 'Files and device information',
        body: '@capacitor/filesystem stores and reads app files; select the appropriate directory and account for platform privacy rules. @capacitor/device reports device/platform information useful for diagnostics, not as a secure identity or authorization factor. iOS Filesystem use can require privacy manifest configuration—check the current plugin docs.',
        bullets: ['Install: npm install @capacitor/filesystem @capacitor/device && npx cap sync android.', 'Use app-private/cache directories without broad storage access. Android Documents or external storage may need permission on older versions; iOS Files app sharing requires additional Info.plist settings.', 'Test by writing and reading a small text file, then display Device.getInfo() values on an Android device.'],
      },
      {
        title: 'Push and Bluetooth',
        body: 'Push Notifications uses Firebase Cloud Messaging on Android and requires a Firebase project/configuration; Android 13+ requires notification permission handling. iOS requires the Push Notifications capability and APNs configuration. Bluetooth Low Energy is available through community plugins such as @capacitor-community/bluetooth-le; check its current compatibility, Android 12+ Bluetooth scan/connect permissions, iOS Bluetooth usage description, and device-specific behavior.',
        bullets: ['Push install: npm install @capacitor/push-notifications && npx cap sync android. Configure Firebase and add google-services.json to the Android app module; test on a physical device with a registered provider token.', 'BLE install: npm install @capacitor-community/bluetooth-le && npx cap sync android. Request Bluetooth access as required by the plugin/OS; iOS needs NSBluetoothAlwaysUsageDescription. Test with a real BLE peripheral—iOS Simulator does not support Bluetooth.', 'Ask for notification/Bluetooth access in context and make denied, disabled, or unsupported states visible.'],
      },
      {
        title: 'Plugin workflow',
        body: 'For every plugin, install its npm package, run npx cap sync, rebuild/reopen the native project, implement permission states and errors, and test on target OS versions. A plugin call on web may be unsupported or provide only a web implementation.',
      },
    ],
    steps: [
      { title: 'Install a plugin package', detail: 'Use the official plugin package for the feature and a version compatible with the project’s Capacitor major version.' },
      { title: 'Synchronize native dependencies', detail: 'Run npx cap sync android after installing. Reopen Android Studio and let Gradle sync if prompted.' },
      { title: 'Implement permissions and errors', detail: 'Explain why permission is needed, request it just in time, handle denial/cancellation, and offer a settings path when appropriate.' },
      { title: 'Test on devices', detail: 'Test on a physical device and at least one supported Android API. Verify denied permissions and unavailable hardware, not only the happy path.' },
    ],
    examples: [
      {
        title: 'Camera: capture a photo',
        filename: 'src/features/camera.ts',
        language: 'typescript',
        code: "import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'\n\nexport async function capturePhoto() {\n  try {\n    return await Camera.getPhoto({\n      quality: 85,\n      allowEditing: false,\n      resultType: CameraResultType.Uri,\n      source: CameraSource.Prompt,\n    })\n  } catch (error) {\n    console.error('Camera was cancelled or unavailable', error)\n    return null\n  }\n}",
        explanation: 'Install with npm install @capacitor/camera, then npx cap sync. Display the returned webPath in the UI and handle null/cancelled results.',
        expectedOutput: 'A photo result with a displayable webPath, or null when the user cancels or the feature fails.',
      },
      {
        title: 'Location: read a position',
        filename: 'src/features/location.ts',
        language: 'typescript',
        code: "import { Geolocation } from '@capacitor/geolocation'\n\nexport async function readLocation() {\n  const permission = await Geolocation.checkPermissions()\n  if (permission.location !== 'granted') {\n    const requested = await Geolocation.requestPermissions()\n    if (requested.location !== 'granted') throw new Error('Location permission denied')\n  }\n  return Geolocation.getCurrentPosition({ enableHighAccuracy: true, timeout: 10000 })\n}",
        explanation: 'Install @capacitor/geolocation and sync. Request permission in response to a user action; the plugin is not available for permission requests on web.',
      },
      {
        title: 'Device information',
        filename: 'src/features/device.ts',
        language: 'typescript',
        code: "import { Device } from '@capacitor/device'\n\nconst info = await Device.getInfo()\nconsole.log(info.platform, info.model, info.osVersion)",
        explanation: 'Install @capacitor/device and sync. Use this for support diagnostics only—not authentication, authorization, or a permanent user identifier.',
      },
      {
        title: 'Filesystem: save app data',
        filename: 'src/features/notes.ts',
        language: 'typescript',
        code: "import { Directory, Encoding, Filesystem } from '@capacitor/filesystem'\n\nexport async function saveNote(text: string) {\n  await Filesystem.writeFile({\n    path: 'notes/latest.txt',\n    data: text,\n    directory: Directory.Data,\n    encoding: Encoding.UTF8,\n  })\n}\n\nexport async function readNote() {\n  return Filesystem.readFile({\n    path: 'notes/latest.txt',\n    directory: Directory.Data,\n    encoding: Encoding.UTF8,\n  })\n}",
        explanation: 'Install @capacitor/filesystem and sync. App-private Directory.Data avoids broad shared-storage access. Test by writing then reading the note on device; handle a missing file on first launch.',
        expectedOutput: 'The read result contains the text written to notes/latest.txt.',
      },
      {
        title: 'Push: register after permission',
        filename: 'src/features/push.ts',
        language: 'typescript',
        code: "import { PushNotifications } from '@capacitor/push-notifications'\n\nexport async function enablePush() {\n  const permission = await PushNotifications.checkPermissions()\n  const result = permission.receive === 'granted'\n    ? permission\n    : await PushNotifications.requestPermissions()\n  if (result.receive !== 'granted') throw new Error('Notification permission denied')\n\n  await PushNotifications.addListener('registration', () => {\n    console.info('Push registration succeeded')\n  })\n  await PushNotifications.addListener('registrationError', ({ error }) => {\n    console.error('Push registration failed', error)\n  })\n  await PushNotifications.register()\n}",
        explanation: 'Install @capacitor/push-notifications and sync. Configure Firebase for Android and APNs/capability for iOS. Test on a physical device after provider setup; a token alone does not deliver messages.',
      },
      {
        title: 'Bluetooth LE: scan and connect',
        filename: 'src/features/ble.ts',
        language: 'typescript',
        code: "import { BleClient } from '@capacitor-community/bluetooth-le'\n\nexport async function connectToSensor(serviceUuid: string) {\n  await BleClient.initialize()\n  const device = await BleClient.requestDevice({ services: [serviceUuid] })\n  await BleClient.connect(device.deviceId, (deviceId) => {\n    console.info('BLE device disconnected', deviceId)\n  })\n  return device\n}",
        explanation: 'Install @capacitor-community/bluetooth-le and sync. Add the target service UUID; explain Bluetooth use in the iOS usage description. Test using a physical phone and BLE peripheral; iOS Simulator has no BLE support.',
      },
      {
        title: 'Plugin installation reference',
        filename: 'terminal',
        language: 'bash',
        code: 'npm install @capacitor/camera @capacitor/geolocation @capacitor/filesystem @capacitor/device @capacitor/push-notifications\nnpx cap sync android\n# Bluetooth LE is community maintained:\nnpm install @capacitor-community/bluetooth-le\nnpx cap sync android',
        explanation: 'Install only the APIs your app needs. Push requires provider setup; Bluetooth permission requirements depend on Android/iOS versions and the selected plugin.',
      },
    ],
    diagram: { title: 'Plugin call and permission flow', nodes: ['User taps a feature', 'JavaScript plugin API', 'OS permission prompt', 'Native API result / error'] },
    activity: 'Add @capacitor/device to a sample app, sync Android, display platform and OS version in a diagnostics panel, and test denial/unavailable behavior for one permissioned plugin.',
    quiz: [
      {
        type: 'Multiple choice',
        question: 'What should an app do before using a native feature that needs permission?',
        options: [
          { label: 'Explain why it is needed, request it in context, and handle denial', correct: true, feedback: 'Correct. Permission requests should be contextual and recoverable.' },
          { label: 'Request every permission on first launch regardless of features', correct: false, feedback: 'Request only necessary permissions when a user invokes the feature.' },
          { label: 'Assume npm install grants operating-system permission', correct: false, feedback: 'Installing a plugin does not itself grant runtime permission.' },
        ],
      },
      {
        type: 'True or false',
        question: 'The official Capacitor Push Notifications plugin is fully configured on Android by installing the npm package alone.',
        options: [
          { label: 'True', correct: false, feedback: 'Android push also needs Firebase project/app configuration and Android 13+ permission handling.' },
          { label: 'False', correct: true, feedback: 'Correct. Push requires provider setup plus platform capabilities and runtime permission handling.' },
        ],
      },
    ],
    docs: [docs.plugins, docs.camera, docs.geolocation, docs.filesystem, docs.device, docs.push, docs.bluetooth],
  },
  {
    slug: 'backend-api',
    title: 'Backend and REST API Integration',
    level: 'Intermediate',
    minutes: 45,
    summary: 'Call a LAN or production API from the mobile app with safe URLs, auth, CORS, and useful error handling.',
    objectives: [
      'Use a device-reachable API base URL.',
      'Handle HTTP errors, timeouts, and offline states.',
      'Explain CORS, Android cleartext traffic, and HTTPS requirements.',
    ],
    prerequisites: ['A Capacitor web app', 'A reachable REST endpoint; FastAPI is used in the example'],
    sections: [
      {
        title: 'Use the correct API host',
        body: 'The URL is evaluated by the phone, not by the development computer. A physical device must use a server hostname/IP reachable from the device. For an Android emulator, 10.0.2.2 maps back to the host computer. In production, use a stable HTTPS domain. Do not hardcode a developer’s private IP into a store release.',
        bullets: ['Bind the development API to 0.0.0.0 and allow its port only on the trusted private network.', 'Never expose database ports to the phone; the API is the access boundary.', 'Keep secrets on the backend; public frontend environment variables are not secrets.'],
      },
      {
        title: 'CORS and native requests',
        body: 'CORS is enforced by browsers/WebViews for cross-origin web fetch. Configure the API to allow only the origins your app actually uses, such as a hosted website origin or the Capacitor origin appropriate to the target. Native networking plugins and browser fetch may have different platform behavior; do not solve CORS with a wildcard that also permits credentials.',
        note: 'CORS is not authentication. Validate users and authorization on the API even if CORS is correctly configured.',
      },
      {
        title: 'Network permissions and HTTP',
        body: 'Android apps need the INTERNET permission to make network requests; the generated Capacitor template normally includes it, but verify the merged manifest if networking fails. Android and iOS restrict insecure cleartext HTTP differently across versions and configurations. Use a reachable LAN HTTP API only for controlled local development, configure development policy narrowly if needed, and use HTTPS in production rather than globally allowing cleartext traffic.',
      },
      {
        title: 'Authentication and transport',
        body: 'Use HTTPS for credentials and personal data in production. Keep access tokens in an appropriately protected storage strategy and avoid logging them. Capacitor Preferences is convenient key-value storage but is not an encrypted vault. For higher-risk secrets, evaluate a secure-storage plugin and a short-lived token design. Handle expired sessions and refresh tokens server-side safely.',
      },
      {
        title: 'Errors and cancellation',
        body: 'A robust API client distinguishes connection/time-out errors, non-2xx HTTP status, invalid JSON, and empty data. Add a request timeout, an offline/try-again state, and a loading state. Use AbortController to stop obsolete requests and never make error data look like a successful reading.',
      },
    ],
    steps: [
      { title: 'Configure an API base URL', detail: 'Use environment-specific configuration: emulator host, physical-device LAN URL for development, and HTTPS hostname for release.' },
      { title: 'Check reachability first', detail: 'Open the health endpoint in the phone browser and confirm the backend listens on the network interface and the firewall allows the private LAN.' },
      { title: 'Implement and validate the request', detail: 'Set a timeout, check response.ok, validate the response shape, and show explicit connection or server errors.' },
      { title: 'Secure production access', detail: 'Use HTTPS, authentication and authorization, restrictive CORS where relevant, and keep database credentials on the server.' },
    ],
    examples: [
      {
        title: 'Fetch FastAPI sensor readings',
        filename: 'src/api/readings.ts',
        language: 'typescript',
        code: "export type SensorReading = {\n  timestamp: string\n  tof_distance_mm: number | null\n  light_lux: number | null\n  soil_moisture_percent: number | null\n  rssi: number | null\n}\n\nconst API_BASE_URL = import.meta.env.VITE_API_BASE_URL\n\nexport async function getCurrentReading(signal?: AbortSignal): Promise<SensorReading | null> {\n  const response = await fetch(`${API_BASE_URL}/api/readings/current`, { signal })\n  if (!response.ok) throw new Error(`Sensor API returned HTTP ${response.status}`)\n  const body: { reading: SensorReading | null } = await response.json()\n  return body.reading\n}",
        explanation: 'Set VITE_API_BASE_URL to http://10.0.2.2:8080 for the standard Android emulator, a reachable LAN URL for a physical phone during development, and HTTPS for production.',
        expectedOutput: 'A typed reading object or null when the backend has not stored a reading yet.',
      },
      {
        title: 'Poll with timeout and visible errors',
        filename: 'src/features/useReadings.ts',
        language: 'typescript',
        code: "const controller = new AbortController()\nconst timeout = window.setTimeout(() => controller.abort(), 8000)\n\ntry {\n  const reading = await getCurrentReading(controller.signal)\n  setReading(reading)\n  setError(null)\n} catch (error) {\n  setError(error instanceof Error ? error.message : 'Unable to reach sensor API')\n} finally {\n  window.clearTimeout(timeout)\n}",
        explanation: 'In React, create the controller in an effect and abort it during cleanup so a stale request cannot update an unmounted screen.',
      },
      {
        title: 'Development base URL examples',
        filename: '.env.development.local',
        language: 'bash',
        code: '# Android emulator → computer hosting FastAPI\nVITE_API_BASE_URL=http://10.0.2.2:8080\n\n# Physical phone on the same Wi-Fi → replace with the host LAN IP\n# VITE_API_BASE_URL=http://192.168.1.25:8080\n\n# Production should use HTTPS\n# VITE_API_BASE_URL=https://api.example.com',
        explanation: 'Vite variables prefixed with VITE_ are embedded in client code. Use them only for public configuration; never put credentials here.',
      },
      {
        title: 'Axios client with authentication',
        filename: 'src/api/client.ts',
        language: 'typescript',
        code: "import axios from 'axios'\n\nexport const api = axios.create({\n  baseURL: import.meta.env.VITE_API_BASE_URL,\n  timeout: 8000,\n})\n\nexport async function fetchCurrentReading(accessToken: string) {\n  const response = await api.get('/api/readings/current', {\n    headers: { Authorization: `Bearer ${accessToken}` },\n  })\n  return response.data\n}",
        explanation: 'Install Axios with npm install axios. Keep tokens out of logs and localStorage when the threat model needs stronger protection; the backend must validate the token and authorize each request.',
      },
    ],
    diagram: { title: 'Mobile-to-backend request path', nodes: ['Capacitor app on phone', 'Wi-Fi / HTTPS request', 'FastAPI REST endpoint', 'SQLite / MQTT stays server-side'] },
    activity: 'Call GET /api/readings/current from the app. Test a valid reading, an empty database, server HTTP 500, and a phone with Wi-Fi turned off; make each state distinguishable.',
    quiz: [
      {
        type: 'Multiple choice',
        question: 'Which URL is normally used by a standard Android emulator to reach a service on its host computer?',
        options: [
          { label: 'http://10.0.2.2:<port>', correct: true, feedback: 'Correct. 10.0.2.2 maps to the host loopback interface in the standard Android emulator.' },
          { label: 'http://localhost:<port>', correct: false, feedback: 'The emulator’s localhost refers to the emulator itself.' },
          { label: 'http://0.0.0.0:<port>', correct: false, feedback: '0.0.0.0 is a bind address, not the client destination address.' },
        ],
      },
      {
        type: 'True or false',
        question: 'CORS provides authentication and makes it safe to expose a database port to mobile devices.',
        options: [
          { label: 'True', correct: false, feedback: 'CORS is not authentication. Keep the database behind the backend API.' },
          { label: 'False', correct: true, feedback: 'Correct. Authenticate and authorize API calls; do not expose database ports.' },
        ],
      },
    ],
    docs: [docs.network, docs.android, docs.gettingStarted],
  },
  {
    slug: 'building-apk',
    title: 'Build an Android APK',
    level: 'Intermediate',
    minutes: 45,
    summary: 'Build and sync web assets, run a debug APK, and create signed release artifacts.',
    objectives: [
      'Build and synchronize the latest web code.',
      'Generate and install a debug APK.',
      'Explain signing, APK versus AAB, and safe key handling.',
    ],
    prerequisites: ['Android Studio and SDK installed', 'Android project builds successfully in debug mode'],
    sections: [
      {
        title: 'Debug APK',
        body: 'First run the web production build and cap sync android. In Android Studio, select Build > Build Bundle(s) / APK(s) > Build APK(s), or use the Capacitor CLI build command. Android Studio displays the generated APK location. Install a debug APK on a test device with adb install -r path/to/app-debug.apk.',
      },
      {
        title: 'Signed release APK and AAB',
        body: 'For distribution, create a release signing key and keep its private key and passwords backed up securely. In Android Studio choose Build > Generate Signed Bundle / APK, select APK or Android App Bundle (AAB), choose the release variant, and sign it. AAB is the normal Google Play publishing format; APK can be used for direct installation/test distribution. Never commit keystore credentials to source control.',
        bullets: ['Keep signing keys, passwords, and upload keys outside the repository and out of client code.', 'Use Play App Signing and follow current Play Console requirements for distribution.', 'Increment versionCode/versionName appropriately for updates.'],
      },
      {
        title: 'Ship updated web code',
        body: 'Every bundled UI update requires the web build and cap sync before producing a fresh APK/AAB. Plugin or native configuration changes also require native rebuilds. Do not confuse a website refresh with an app-store update; bundled assets are part of the installed app unless you intentionally design a remote-content strategy.',
      },
    ],
    steps: [
      { title: 'Build the website assets', detail: 'Run npm run build and verify it succeeds.' },
      { title: 'Sync Android', detail: 'Run npx cap sync android to copy the new assets and reconcile plugins.' },
      { title: 'Generate a debug APK', detail: 'Open Android Studio and use Build > Build Bundle(s) / APK(s) > Build APK(s), or run npx cap build android --androidreleasetype APK for the supported CLI flow.' },
      { title: 'Install and test', detail: 'Use Android Studio’s prompt or adb install -r path/to/app-debug.apk. Test navigation, offline behavior, permissions, API access, and app restart.' },
      { title: 'Create a signed release', detail: 'Use Generate Signed Bundle / APK, protect the key and credentials, select release, and produce the APK or AAB required by your distribution channel.' },
    ],
    examples: [
      {
        title: 'Build and install a debug APK',
        filename: 'terminal',
        language: 'bash',
        code: 'npm run build\nnpx cap sync android\nnpx cap build android --androidreleasetype APK\nadb devices\nadb install -r path/to/app-debug.apk',
        explanation: 'The CLI build command supports Android APK or AAB output; Android Studio is also a clear route for signing and build variant selection. Replace the example APK path with the generated artifact location.',
        expectedOutput: 'The debug app installs on the selected authorized Android device.',
      },
      {
        title: 'Generate a signed artifact',
        filename: 'Android Studio',
        language: 'text',
        code: 'Build → Generate Signed Bundle / APK\n1. Choose Android App Bundle (AAB) or APK\n2. Select or create a release keystore\n3. Enter key alias and credentials\n4. Select release variant\n5. Build and verify the signed artifact',
        explanation: 'Do not store keystore passwords in source control, frontend environment variables, or screenshots. Keep secure backups of the signing key.',
      },
    ],
    diagram: { title: 'Release pipeline', nodes: ['Web build', 'Capacitor sync', 'Android release build', 'Sign → APK / AAB → test'] },
    activity: 'Install a debug APK on a physical phone, update one UI string, rebuild and sync, then install the updated APK and verify the change.',
    quiz: [
      {
        type: 'Multiple choice',
        question: 'Which output is generally used for Google Play publishing?',
        options: [
          { label: 'A signed Android App Bundle (AAB)', correct: true, feedback: 'Correct. AAB is the usual Play publishing format; APK is useful for direct installs and testing.' },
          { label: 'capacitor.config.ts', correct: false, feedback: 'That is project configuration, not an installable release artifact.' },
          { label: 'An unsigned web dist folder', correct: false, feedback: 'The web folder is not a signed Android application package.' },
        ],
      },
      {
        type: 'True or false',
        question: 'A release keystore and its passwords should be committed to the application repository for convenient builds.',
        options: [
          { label: 'True', correct: false, feedback: 'Signing credentials are sensitive; store and back them up securely outside source control.' },
          { label: 'False', correct: true, feedback: 'Correct. Protect the keystore and its passwords; do not commit them.' },
        ],
      },
    ],
    docs: [docs.build, docs.android],
  },
  {
    slug: 'iot-application',
    title: 'Build an IoT Sensor App',
    level: 'Advanced',
    minutes: 65,
    summary: 'Connect an ESP32, Raspberry Pi, MQTT, FastAPI, and Capacitor dashboard over local Wi-Fi.',
    objectives: [
      'Trace sensor telemetry from the ESP32 to a mobile screen.',
      'Render typed readings and refresh them without overlapping requests.',
      'Handle empty, stale, offline, and API error states.',
    ],
    prerequisites: ['Lessons 3, 4, and 7', 'A Raspberry Pi API reachable from the Android device', 'Optional ESP32 sensors for live data'],
    sections: [
      {
        title: 'Architecture and responsibility boundaries',
        body: 'The ESP32 reads a VL53L0X time-of-flight distance sensor and BH1750 light sensor over I²C plus soil moisture on an ADC pin. It publishes JSON telemetry over Wi-Fi/MQTT. A Raspberry Pi subscribes to MQTT, stores readings in SQLite, and exposes FastAPI REST endpoints. The Capacitor app calls the FastAPI API; it does not connect directly to GPIO, SQLite, or the MQTT broker.',
        bullets: ['Data path: ESP32 sensors → MQTT broker on Raspberry Pi → FastAPI → HTTPS/Wi-Fi REST → Capacitor UI.', 'The current API example exposes GET /api/readings/current, GET /api/readings?limit=20, and GET /api/health.', 'Use the Pi LAN IP for a phone on the same Wi-Fi; replace it with a secured host/domain outside the local network.'],
      },
      {
        title: 'Display meaningful live data',
        body: 'Represent missing values as unavailable rather than zero. Show a timestamp so learners can see freshness. A five-second poll is adequate for a teaching dashboard; stop polling when the screen is inactive, avoid overlapping requests, and provide a manual refresh. For higher-frequency streaming, design and secure a WebSocket path deliberately.',
      },
      {
        title: 'Connection and failure handling',
        body: 'Distinguish “API unreachable” from “API is reachable but no readings exist.” Display MQTT connectivity from the health endpoint separately from phone-to-API connectivity. Handle timeouts, stale data, and permission/network state. Do not retry endlessly or silently replace errors with simulated readings.',
      },
      {
        title: 'Charts and device testing',
        body: 'Use the readings history endpoint for charts, preserving its newest-first ordering and limiting the requested history. Reverse the values for chronological charts. Test both a real phone and emulator, with the backend healthy and stopped, with Wi-Fi disconnected, and with an empty database. A chart library is optional; the data model and labels are more important than visual effects.',
      },
    ],
    steps: [
      { title: 'Verify the Pi API', detail: 'From the phone browser, open /api/health and /api/readings/current at the Pi’s LAN IP. Confirm the API binds to the LAN interface and the firewall allows the API port only on the private network.' },
      { title: 'Configure the app API URL', detail: 'Use the Pi’s LAN address for a physical phone; use the appropriate host address for an emulator. Use HTTPS for a deployed endpoint.' },
      { title: 'Fetch current and history', detail: 'Fetch current readings for metric cards and a bounded history for charts. Validate HTTP status and JSON shape.' },
      { title: 'Build dashboard states', detail: 'Render distance (mm), light (lux), soil moisture (%), last update time, and MQTT status with explicit loading/empty/error states.' },
      { title: 'Refresh and test failures', detail: 'Poll on an interval without overlapping, clean up requests on unmount, and verify disconnected API behavior.' },
    ],
    examples: [
      {
        title: 'Sensor types and API client',
        filename: 'src/api/sensors.ts',
        language: 'typescript',
        code: "export type Reading = {\n  timestamp: string\n  tof_distance_mm: number | null\n  light_lux: number | null\n  soil_moisture_percent: number | null\n  rssi: number | null\n}\n\nexport async function getReading(baseUrl: string, signal?: AbortSignal) {\n  const response = await fetch(`${baseUrl}/api/readings/current`, { signal })\n  if (!response.ok) throw new Error(`API error: ${response.status}`)\n  const payload: { reading: Reading | null } = await response.json()\n  return payload.reading\n}",
        explanation: 'Keep readings typed and let null mean “sensor has no value”; a missing value must not be presented as a zero measurement.',
      },
      {
        title: 'Refresh without overlapping requests',
        filename: 'src/features/useSensorPolling.ts',
        language: 'typescript',
        code: "useEffect(() => {\n  let active = true\n  const controller = new AbortController()\n\n  const refresh = async () => {\n    try {\n      const next = await getReading(API_BASE_URL, controller.signal)\n      if (active) setState({ reading: next, error: null })\n    } catch (error) {\n      if (active && !controller.signal.aborted) {\n        setState({ reading: null, error: error instanceof Error ? error.message : 'API unavailable' })\n      }\n    }\n  }\n\n  void refresh()\n  const timer = window.setInterval(() => void refresh(), 5000)\n  return () => { active = false; controller.abort(); window.clearInterval(timer) }\n}, [])",
        explanation: 'For production, serialize or skip a refresh while the previous request is still in flight; this abbreviated example focuses on cleanup and visible errors.',
        expectedOutput: 'The dashboard refreshes about every five seconds and stops its timer when the screen unmounts.',
      },
      {
        title: 'Example response',
        filename: 'GET /api/readings/current',
        language: 'json',
        code: '{\n  "reading": {\n    "timestamp": "2026-11-10T12:00:00Z",\n    "tof_distance_mm": 412.5,\n    "light_lux": 286.1,\n    "soil_moisture_percent": 54.2,\n    "rssi": -61\n  }\n}',
        explanation: 'The exact current data depends on sensors publishing to the Pi. A missing reading is represented as { "reading": null }.',
      },
      {
        title: 'Useful API checks',
        filename: 'terminal',
        language: 'bash',
        code: 'curl http://<PI_LAN_IP>:8080/api/health\ncurl http://<PI_LAN_IP>:8080/api/readings/current\ncurl "http://<PI_LAN_IP>:8080/api/readings?limit=20"',
        explanation: 'Run from a computer on the same LAN; substitute the actual Pi IP and port. The phone must also be able to reach this URL.',
      },
    ],
    diagram: { title: 'ESP32 to Capacitor dashboard', nodes: ['VL53L0X · BH1750 · soil ADC', 'ESP32 → Wi-Fi / MQTT', 'Raspberry Pi → FastAPI / SQLite', 'Capacitor app → REST dashboard'] },
    activity: 'Build a dashboard with cards for ToF distance, light intensity, soil moisture, last reading time, and MQTT state. Add manual refresh and test API stopped, empty history, and stale timestamp cases.',
    quiz: [
      {
        type: 'Multiple choice',
        question: 'Which component should the Capacitor app call to read persisted sensor measurements?',
        options: [
          { label: 'The Raspberry Pi FastAPI REST endpoint', correct: true, feedback: 'Correct. FastAPI is the application API boundary between the phone and server-side MQTT/SQLite.' },
          { label: 'The SQLite file directly over Wi-Fi', correct: false, feedback: 'The database stays on the server; do not expose its file or port to the mobile app.' },
          { label: 'The ESP32 GPIO pins over HTTP', correct: false, feedback: 'GPIO sensor collection is handled by ESP32 firmware, then telemetry flows through MQTT and the backend.' },
        ],
      },
      {
        type: 'True or false',
        question: 'A null sensor value should be rendered as a measured value of zero.',
        options: [
          { label: 'True', correct: false, feedback: 'Null means unavailable/absent; zero is a real measurement and would be misleading.' },
          { label: 'False', correct: true, feedback: 'Correct. Show unavailable or no reading instead of inventing a zero value.' },
        ],
      },
    ],
    docs: [docs.gettingStarted, docs.network, docs.android],
  },
]

export const capacitorFinalAssessment: CapacitorQuizQuestion[] = [
  {
    type: 'Multiple choice',
    question: 'Which sequence updates a bundled Android app after changing web source files?',
    options: [
      { label: 'Build web assets → cap sync android → rebuild the native app', correct: true, feedback: 'Correct. This brings the latest web bundle into the native app before packaging.' },
      { label: 'Change the source and reinstall the old APK', correct: false, feedback: 'The old APK still contains its previous bundled assets.' },
      { label: 'Run cap sync before creating any web build', correct: false, feedback: 'Sync expects the web output directory and its index.html to exist.' },
    ],
  },
  {
    type: 'True or false',
    question: 'A physical Android phone can reach a development computer at the phone’s localhost address.',
    options: [
      { label: 'True', correct: false, feedback: 'The phone’s localhost refers to the phone, not the developer computer.' },
      { label: 'False', correct: true, feedback: 'Correct. Use a reachable LAN address or secure hostname.' },
    ],
  },
  {
    type: 'Multiple choice',
    question: 'What should an app do when a required plugin permission is denied?',
    options: [
      { label: 'Show a clear explanation and provide a useful recovery path', correct: true, feedback: 'Correct. Permission denial is a normal state the UI should handle.' },
      { label: 'Crash the app so the user retries', correct: false, feedback: 'Handle denial gracefully and explain the impact.' },
      { label: 'Pretend the permission was granted', correct: false, feedback: 'The feature should not claim success when access was denied.' },
    ],
  },
  {
    type: 'Multiple choice',
    question: 'Where should database credentials for a FastAPI backend be stored?',
    options: [
      { label: 'In protected backend environment configuration, never bundled in the app', correct: true, feedback: 'Correct. Mobile client bundles are inspectable; secrets belong on the backend.' },
      { label: 'In a VITE_ or NEXT_PUBLIC_ client variable', correct: false, feedback: 'Public frontend variables are shipped to the client and are not secrets.' },
      { label: 'In the capacitor.config.ts file', correct: false, feedback: 'Capacitor config is included with the app and should not contain secrets.' },
    ],
  },
]

export const capacitorLearningPath = [
  { title: 'Introduction', description: 'Learn the WebView, bridge, and platform model.' },
  { title: 'Install and configure', description: 'Prepare Android tooling and create a native project.' },
  { title: 'Add native capabilities', description: 'Use plugins and connect a backend API.' },
  { title: 'Build and ship', description: 'Package a tested Android app and IoT dashboard.' },
]

export const capacitorLessonSlugs = [
  ...capacitorLessons.map((lesson) => lesson.slug),
  'capacitor-final-assessment',
]
