export type AndroidCourseLevel =
  'Beginner' | 'Beginner–Intermediate' | 'Intermediate' | 'Intermediate–Advanced' | 'Advanced'

export interface AndroidCodeExample {
  title: string
  filename: string
  language: string
  code: string
  explanation: string
  expectedOutput: string
}

export interface AndroidQuizOption {
  label: string
  correct: boolean
  feedback: string
}

export interface AndroidQuizQuestion {
  type: 'Multiple choice' | 'True or false' | 'Code reading'
  question: string
  options: AndroidQuizOption[]
}

export interface AndroidLesson {
  slug: string
  title: string
  level: AndroidCourseLevel
  minutes: number
  summary: string
  objectives: string[]
  prerequisites: string[]
  sections: { title: string; body: string; bullets?: string[] }[]
  steps: { title: string; detail: string }[]
  examples: AndroidCodeExample[]
  diagram: { title: string; nodes: string[] }
  activity: string
  quiz: AndroidQuizQuestion[]
  docs: { label: string; href: string }[]
}

const docs = {
  studio: { label: 'Android Studio', href: 'https://developer.android.com/studio' },
  developers: { label: 'Android Developers', href: 'https://developer.android.com/' },
  kotlin: { label: 'Kotlin documentation', href: 'https://kotlinlang.org/docs/home.html' },
  java: { label: 'Java documentation', href: 'https://docs.oracle.com/en/java/' },
  compose: { label: 'Jetpack Compose', href: 'https://developer.android.com/compose' },
  architecture: {
    label: 'Android architecture guidance',
    href: 'https://developer.android.com/topic/architecture',
  },
  api: { label: 'Android API reference', href: 'https://developer.android.com/reference' },
  setup: {
    label: 'Install Android Studio',
    href: 'https://developer.android.com/studio/install',
  },
  sdk: { label: 'SDK Manager', href: 'https://developer.android.com/tools/sdkmanager' },
  emulator: {
    label: 'Android Emulator',
    href: 'https://developer.android.com/studio/run/emulator',
  },
  gradle: {
    label: 'Android Gradle Plugin',
    href: 'https://developer.android.com/build',
  },
  lifecycle: {
    label: 'Activity lifecycle',
    href: 'https://developer.android.com/guide/components/activities/activity-lifecycle',
  },
  navigation: {
    label: 'Navigation for Compose',
    href: 'https://developer.android.com/develop/ui/compose/navigation',
  },
  retrofit: { label: 'Retrofit', href: 'https://square.github.io/retrofit/' },
  room: {
    label: 'Room persistence library',
    href: 'https://developer.android.com/training/data-storage/room',
  },
  permissions: {
    label: 'Request runtime permissions',
    href: 'https://developer.android.com/training/permissions/requesting',
  },
  bluetooth: {
    label: 'Bluetooth permissions',
    href: 'https://developer.android.com/develop/connectivity/bluetooth/bt-permissions',
  },
  release: {
    label: 'Prepare and roll out a release',
    href: 'https://developer.android.com/studio/publish',
  },
}

const question = (
  type: AndroidQuizQuestion['type'],
  prompt: string,
  correct: string,
  distractors: string[],
  feedback: string,
): AndroidQuizQuestion => ({
  type,
  question: prompt,
  options: [correct, ...distractors].map((label, index) => ({
    label,
    correct: index === 0,
    feedback: index === 0 ? feedback : `Not quite. ${feedback}`,
  })),
})

export const androidStudioLessons: AndroidLesson[] = [
  {
    slug: 'android-introduction',
    title: 'Introduction to Android Studio',
    level: 'Beginner',
    minutes: 30,
    summary: 'Understand the Android IDE, SDK, Kotlin, Java, Gradle, and native app architecture.',
    objectives: [
      'Explain the distinct jobs of Android Studio, Android SDK, Kotlin/Java, and Gradle.',
      'Trace an Android app from source code through build tools to a device.',
      'Compare native Android development with VS Code and cross-platform frameworks.',
    ],
    prerequisites: ['A computer and browser', 'No Android programming experience required'],
    sections: [
      {
        title: 'What Android Studio includes',
        body: 'Android Studio is Google’s official IDE for Android development. It provides code editing, project templates, the Android Gradle build integration, debugging and Logcat, layout/design tools, and managers for SDK packages and virtual devices. It is the workspace and tool coordinator—not a programming language.',
        bullets: [
          'Android SDK: platform APIs, build tools, emulator tools, and platform-tools such as adb.',
          'Kotlin and Java: programming languages supported by Android.',
          'Gradle and the Android Gradle Plugin: build scripts, dependency resolution, packaging, and build variants.',
        ],
      },
      {
        title: 'Native app architecture',
        body: 'An Android project compiles Kotlin or Java and resources into an installable package. The app runs on Android and uses platform APIs for lifecycle, UI, networking, sensors, storage, and permissions. Jetpack Compose is Android’s declarative UI toolkit; XML Views are the traditional view-based approach. Both can coexist in a project.',
      },
      {
        title: 'Choose a development approach',
        body: 'VS Code is a general editor and can edit Android source, but Android Studio supplies the integrated Android SDK, emulator, profilers, and Gradle-aware tooling. Flutter uses Dart and a cross-platform UI toolkit; Ionic uses web technologies and commonly Capacitor. Native Android gives direct platform APIs and Kotlin/Java, while cross-platform choices can share more UI code across platforms. Each approach has trade-offs in skills, code sharing, platform integration, and maintenance.',
      },
      {
        title: 'Where Android apps are used',
        body: 'Android runs on phones, tablets, TVs, watches, cars, and dedicated devices. The same architectural fundamentals—UI, state, data, lifecycle, permissions, and testing—apply whether an app is a sensor dashboard, commerce app, utility, or media player.',
      },
    ],
    steps: [
      {
        title: 'Identify the tool roles',
        detail:
          'Point to the IDE, SDK, programming language, and build system in a sample Android project.',
      },
      {
        title: 'Trace a code change',
        detail:
          'Edit an Activity or Composable, build with Gradle, install the package, and inspect output with Logcat.',
      },
      {
        title: 'Compare approaches',
        detail:
          'Choose native Android, Flutter, or Ionic for a sample project and explain the language, UI toolkit, and sharing trade-offs.',
      },
    ],
    examples: [
      {
        title: 'Android app layers',
        filename: 'Build and runtime flow',
        language: 'text',
        code: 'Kotlin / Java source + Compose / XML resources\n                  ↓\nAndroid Gradle Plugin + Gradle dependencies\n                  ↓\nAPK or Android App Bundle\n                  ↓\nAndroid runtime + platform APIs\n                  ↓\nUI, network, storage, sensors, and device',
        explanation:
          'Android Studio edits and coordinates the project. Gradle builds it with the Android SDK; the app then runs against Android platform APIs.',
        expectedOutput:
          'You can distinguish the editor, language, SDK, build system, package, and runtime.',
      },
    ],
    diagram: {
      title: 'From source to Android device',
      nodes: [
        'Android Studio edits project',
        'Gradle and SDK build app',
        'APK/AAB packages app',
        'Android runs app and platform APIs',
      ],
    },
    activity:
      'Create a one-page glossary for Android Studio, Android SDK, Kotlin, Java, Gradle, Compose, and APK; explain how they connect.',
    quiz: [
      question(
        'Multiple choice',
        'Which tool is the official IDE for Android development?',
        'Android Studio',
        ['Gradle', 'Kotlin'],
        'Android Studio is the IDE; Gradle builds and Kotlin is a programming language.',
      ),
      question(
        'True or false',
        'Gradle is a programming language used instead of Kotlin.',
        'False',
        ['True', 'Only for Compose'],
        'Gradle is a build automation system; Kotlin or Java implement app behavior.',
      ),
      question(
        'Code reading',
        'Which part supplies Android platform APIs such as Activity and SensorManager?',
        'Android SDK and Android platform',
        ['VS Code theme', 'AAB signing key'],
        'The SDK provides Android platform APIs and development/build tools.',
      ),
    ],
    docs: [docs.studio, docs.developers, docs.architecture, docs.kotlin, docs.java],
  },
  {
    slug: 'android-installation',
    title: 'Prerequisites and Installation',
    level: 'Beginner',
    minutes: 45,
    summary:
      'Install Android Studio, SDK packages, command-line tools, and an emulator on Windows.',
    objectives: [
      'Install Android Studio and accept the SDK component setup.',
      'Use SDK Manager and Device Manager to install tools and create an emulator.',
      'Understand bundled JDK, environment variables, and common setup checks.',
    ],
    prerequisites: [
      'Windows 10 or later with administrator access as required',
      'Internet access and available disk space',
    ],
    sections: [
      {
        title: 'Download and first-run setup',
        body: 'Download Android Studio from the official Android Developers site. Run the Windows installer and use the standard setup wizard to install Android Studio and recommended SDK components. Android Studio includes a JetBrains Runtime (JBR) suitable for running the IDE; use the IDE’s configured Gradle JDK unless a project explicitly documents another supported JDK.',
        bullets: [
          'Check the current Android Studio system requirements before installing; emulator acceleration and memory availability affect performance.',
          'As a planning estimate, 8 GB RAM is a practical minimum for the IDE alone; 16 GB or more and an SSD are more comfortable when running an emulator. Reserve several GB for the IDE and additional space for SDK platforms and emulator images.',
          'Keep the SDK in a user-writable path and allow the setup wizard to select the SDK location.',
          'Do not install random JDK builds or set JAVA_HOME unless your project/tooling needs it.',
        ],
      },
      {
        title: 'SDK tools and virtual devices',
        body: 'Open Tools → SDK Manager to install an Android SDK Platform, Android SDK Build-Tools, Android SDK Platform-Tools, and Android SDK Command-line Tools (latest). Select a platform level supported by your app. Open Tools → Device Manager, create a virtual device, choose a system image, and start it. A physical phone with developer options and USB debugging is an alternative.',
      },
      {
        title: 'Environment variables and diagnostics',
        body: 'The SDK Manager shows the SDK path; Android Studio and Gradle usually find it through the project local.properties file generated on your computer. ANDROID_HOME can be set for command-line tools when needed. Avoid committing local.properties or machine-specific paths. Use sdkmanager --list to inspect available packages and adb devices to confirm connected devices.',
      },
      {
        title: 'Common installation problems',
        body: 'If virtualization is unavailable, use a physical device or enable the supported Windows hypervisor features and firmware virtualization. If adb cannot see a phone, install the manufacturer driver if required, accept the USB debugging prompt, and try a data-capable cable. If Gradle cannot find Java, inspect Settings → Build Tools → Gradle → Gradle JDK and the project’s documented requirements.',
      },
    ],
    steps: [
      {
        title: 'Install Android Studio',
        detail:
          'Use the official Windows installer and complete the standard setup wizard, including recommended SDK downloads.',
      },
      {
        title: 'Check SDK components',
        detail:
          'In SDK Manager, install a platform, matching Build-Tools, Platform-Tools, and Command-line Tools; use versions appropriate to the project.',
      },
      {
        title: 'Create a device',
        detail:
          'In Device Manager, create and boot an emulator, or connect an Android phone with USB debugging enabled.',
      },
      {
        title: 'Verify command-line access',
        detail:
          'In Android Studio Terminal run adb version, adb devices, and sdkmanager --list after confirming the SDK tools directory is available on PATH.',
      },
    ],
    examples: [
      {
        title: 'Inspect and install SDK packages',
        filename: 'Android Studio Terminal / PowerShell',
        language: 'bash',
        code: 'sdkmanager --list\nsdkmanager "platform-tools" "cmdline-tools;latest"\nadb version\nadb devices',
        explanation:
          'Run sdkmanager from the Android SDK cmdline-tools/latest/bin directory or add that directory to PATH. Install a platform and build-tools version selected for your project in SDK Manager; the commands above avoid pinning an arbitrary API level.',
        expectedOutput:
          'SDK package listings appear, adb reports its version, and adb devices lists an emulator or authorized phone.',
      },
    ],
    diagram: {
      title: 'Android development environment',
      nodes: [
        'Android Studio installer',
        'SDK platforms and tools',
        'Emulator or USB device',
        'Gradle build and debugging',
      ],
    },
    activity:
      'Capture your Android Studio version, SDK location, installed platform, adb version, and emulator/device status; resolve one missing component using SDK Manager.',
    quiz: [
      question(
        'Multiple choice',
        'Where should you install or update SDK platforms and Build-Tools?',
        'Android Studio SDK Manager',
        ['Logcat', 'Resource Manager'],
        'SDK Manager installs SDK packages; Device Manager manages virtual devices.',
      ),
      question(
        'True or false',
        'A phone’s localhost address points to the development computer.',
        'False',
        ['True', 'Only when USB debugging is enabled'],
        'On a phone, localhost is the phone itself. Use a reachable host address for a development backend.',
      ),
      question(
        'Code reading',
        'What does adb devices help confirm?',
        'Whether adb can see connected or running Android devices',
        ['Whether Kotlin compiled', 'Whether a release is Play-ready'],
        'adb devices lists recognized emulators and authorized physical devices.',
      ),
    ],
    docs: [docs.setup, docs.studio, docs.sdk, docs.emulator],
  },
  {
    slug: 'android-studio-interface',
    title: 'Understanding the Android Studio Interface',
    level: 'Beginner',
    minutes: 35,
    summary:
      'Navigate the project view, editor, terminal, Logcat, build tools, SDK Manager, and debugger.',
    objectives: [
      'Locate the most-used Android Studio tool windows.',
      'Use Logcat and Build output to diagnose different kinds of issues.',
      'Find SDK, emulator, resource, and Gradle controls.',
    ],
    prerequisites: ['Android Studio installed', 'An existing or sample Android project'],
    sections: [
      {
        title: 'Project and code editor',
        body: 'The Project tool window shows the project or Android view of files. The editor provides Kotlin/Java editing, navigation, refactoring, inspections, and inline diagnostics. The Android view groups common app files, while Project view exposes the actual directory structure.',
        bullets: [
          'Terminal runs Gradle wrapper, adb, and other command-line tools.',
          'Build output reports compilation and packaging tasks.',
          'Gradle tool window lists project tasks and sync status.',
        ],
      },
      {
        title: 'Observe and debug a running app',
        body: 'Logcat displays device and app logs and can filter by process, tag, or severity. The debugger attaches breakpoints and lets you inspect variables and call stacks. The App Inspection tools can inspect supported runtime data such as databases and network activity. Use logs and breakpoints to find causes; avoid logging passwords, tokens, or private user data.',
      },
      {
        title: 'Design, resources, and devices',
        body: 'Layout Editor supports XML View layouts; Compose Preview renders Composables at design time. Resource Manager helps manage supported image and vector resources. Device Manager creates emulators; SDK Manager installs platforms, system images, and build components. Android Studio moves panels between versions, so tool-window names and menu positions can change.',
      },
    ],
    steps: [
      {
        title: 'Open a sample project',
        detail:
          'Switch between Android view and Project view and locate app/src/main and the Gradle files.',
      },
      {
        title: 'Build and inspect',
        detail:
          'Run the project, inspect Build output for task results, and filter Logcat to your app process.',
      },
      {
        title: 'Set a breakpoint',
        detail:
          'Pause in an event callback and inspect the call stack and local variables with the debugger.',
      },
      {
        title: 'Find device and SDK tools',
        detail:
          'Open Device Manager and SDK Manager and identify the installed emulator image and platform.',
      },
    ],
    examples: [
      {
        title: 'Filter Logcat without leaking secrets',
        filename: 'Kotlin logging example',
        language: 'kotlin',
        code: 'private const val TAG = "SensorDashboard"\n\nLog.d(TAG, "Refresh started")\nLog.i(TAG, "Loaded ${readings.size} readings")\nLog.e(TAG, "Refresh failed", exception)',
        explanation:
          'Use a stable tag and useful, sanitized diagnostics. Never print passwords, authorization headers, tokens, or sensitive user data. Logcat filters help isolate app output from system messages.',
        expectedOutput:
          'Logcat can filter diagnostic messages for SensorDashboard while the debugger and build window show other issue categories.',
      },
    ],
    diagram: {
      title: 'Use the right tool window',
      nodes: [
        'Project + editor: inspect source',
        'Build: find compile failures',
        'Logcat: inspect runtime logs',
        'Debugger: inspect execution state',
      ],
    },
    activity:
      'Run a sample app, add one safe Log.i message, locate it in Logcat, then set a breakpoint and inspect the variable values.',
    quiz: [
      question(
        'Multiple choice',
        'Which tool window is best for runtime logs from an app?',
        'Logcat',
        ['SDK Manager', 'Resource Manager'],
        'Logcat filters device and app runtime output.',
      ),
      question(
        'True or false',
        'A successful build guarantees that every runtime behavior is correct.',
        'False',
        ['True', 'Only for Compose apps'],
        'Build success confirms compilation/packaging, not behavior across runtime paths.',
      ),
      question(
        'Code reading',
        'Why should a token not be written to Logcat?',
        'Logs can expose credentials and private data',
        ['Logcat cannot show strings', 'Gradle requires tokens to be hidden'],
        'Logs may be retained or shared; do not write credentials or secrets into them.',
      ),
    ],
    docs: [docs.studio, docs.developers, docs.api],
  },
  {
    slug: 'first-android-project',
    title: 'Creating Your First Android Project',
    level: 'Beginner',
    minutes: 40,
    summary:
      'Create a native Kotlin app, understand Empty Activity, set its app ID and minimum SDK, and run it.',
    objectives: [
      'Create a project with an appropriate template and language.',
      'Distinguish namespace, application ID, and minimum SDK.',
      'Run the starter app on an emulator or physical device.',
    ],
    prerequisites: [
      'Android Studio and an SDK platform installed',
      'A running emulator or authorized Android phone',
    ],
    sections: [
      {
        title: 'Choose a project template',
        body: 'From Android Studio, choose New Project and select a phone/tablet template such as Empty Activity. The current Empty Activity template commonly starts a Kotlin Jetpack Compose app. Older or Views-based templates can generate XML layouts; template names and options may vary by Android Studio version.',
      },
      {
        title: 'Configure the application',
        body: 'Set a display name and a reverse-domain identifier such as com.example.sensormonitor. The Gradle namespace controls generated R and BuildConfig packages; applicationId identifies the installed/published app and should remain stable after release. Choose a minimum SDK according to the devices and APIs your app must support. compileSdk controls APIs available at compile time; targetSdk declares the behavior level the app targets.',
      },
      {
        title: 'Build and launch',
        body: 'Allow Gradle sync to finish, select a device, then use Run. Android Studio invokes the Gradle wrapper, compiles source and resources, packages a debug app, installs it, and launches the Activity. Use Build output for build errors and Logcat for runtime failures.',
      },
    ],
    steps: [
      {
        title: 'Start a new project',
        detail:
          'Choose New Project, a phone/tablet Empty Activity template, and Kotlin as the language where that option is shown.',
      },
      {
        title: 'Set identifiers and SDK levels',
        detail:
          'Choose a unique application ID, review namespace and SDK levels, and keep defaults unless your device support requirements call for a change.',
      },
      {
        title: 'Wait for Gradle sync',
        detail:
          'Allow the wrapper to download required dependencies and inspect the sync error details if it fails.',
      },
      {
        title: 'Run on a device',
        detail:
          'Start an emulator or connect an authorized phone, select it in the device selector, and click Run.',
      },
    ],
    examples: [
      {
        title: 'A minimal Compose Activity',
        filename: 'app/src/main/java/com/example/sensormonitor/MainActivity.kt',
        language: 'kotlin',
        code: 'class MainActivity : ComponentActivity() {\n  override fun onCreate(savedInstanceState: Bundle?) {\n    super.onCreate(savedInstanceState)\n    enableEdgeToEdge()\n    setContent {\n      MaterialTheme {\n        Surface(modifier = Modifier.fillMaxSize()) {\n          Text("Hello, Android!")\n        }\n      }\n    }\n  }\n}',
        explanation:
          'A current Compose template provides the AndroidX and Compose imports and theme setup. ComponentActivity hosts Compose content; setContent creates the UI tree. Exact generated imports and theme files depend on the selected template.',
        expectedOutput:
          'The emulator or phone installs the debug build and displays “Hello, Android!”.',
      },
      {
        title: 'App identity and SDK levels',
        filename: 'app/build.gradle.kts',
        language: 'kotlin',
        code: 'android {\n  namespace = "com.example.sensormonitor"\n  defaultConfig {\n    applicationId = "com.example.sensormonitor"\n    minSdk = 23\n    targetSdk = 35\n  }\n}',
        explanation:
          'This is illustrative Gradle Kotlin DSL. Use SDK levels supported by the installed Android Gradle Plugin and current Play requirements; minSdk is a product support decision, not a value to copy blindly.',
        expectedOutput:
          'The project has a stable application identity and explicit supported SDK levels.',
      },
    ],
    diagram: {
      title: 'Create, build, and run',
      nodes: [
        'Choose template and Kotlin',
        'Configure app ID and SDK',
        'Gradle builds debug APK',
        'Install and launch on device',
      ],
    },
    activity:
      'Create a Compose Empty Activity, change its title text, run it on an emulator, and identify its applicationId and minSdk in Gradle.',
    quiz: [
      question(
        'Multiple choice',
        'Which identifier should remain stable for an app published as an update?',
        'applicationId',
        ['Activity class name', 'Emulator name'],
        'The application ID identifies the app to Android and app distribution services.',
      ),
      question(
        'True or false',
        'minSdk is the newest Android version the app targets.',
        'False',
        ['True', 'Only for Java'],
        'minSdk is the oldest supported API level; targetSdk is a separate setting.',
      ),
      question(
        'Code reading',
        'What does setContent do in a Compose Activity?',
        'Sets the Compose UI content for the Activity',
        ['Installs Android SDK', 'Signs a release bundle'],
        'setContent establishes the composable UI tree hosted by the Activity.',
      ),
    ],
    docs: [docs.studio, docs.compose, docs.developers, docs.gradle],
  },
  {
    slug: 'kotlin-fundamentals',
    title: 'Kotlin Programming Fundamentals',
    level: 'Beginner–Intermediate',
    minutes: 70,
    summary:
      'Practice Kotlin values, control flow, functions, classes, collections, null safety, coroutines, and errors.',
    objectives: [
      'Use Kotlin types, val/var, conditions, loops, functions, and collections.',
      'Model Android data with classes, interfaces, inheritance, and nullable types.',
      'Use coroutines for asynchronous work and handle failures explicitly.',
    ],
    prerequisites: ['A Kotlin Android project', 'Basic familiarity with variables is helpful'],
    sections: [
      {
        title: 'Values, types, and control flow',
        body: 'Use val for read-only bindings and var when reassignment is needed. Kotlin infers many types; use explicit types where they improve clarity. if is an expression, when handles multiple branches, and for iterates over ranges or collections. Functions use fun and can have default or named arguments.',
      },
      {
        title: 'Classes, interfaces, and collections',
        body: 'Classes model state and behavior; data class generates useful value methods. Kotlin classes are final by default, so mark a base class open before inheritance. Interfaces describe behavior contracts. Mutable and read-only collection interfaces communicate whether callers can modify a collection.',
      },
      {
        title: 'Null safety, coroutines, and errors',
        body: 'A nullable type uses ?, and safe calls, Elvis expressions, and let help handle absence. Avoid !! unless an invariant is proven. Kotlin coroutines provide structured asynchronous work; Android UI work should use lifecycle-aware scopes such as viewModelScope. Catch expected failures and represent loading/success/error states rather than blocking the UI thread.',
      },
    ],
    steps: [
      {
        title: 'Model a reading',
        detail:
          'Define a data class with nullable sensor values because hardware or APIs may omit measurements.',
      },
      {
        title: 'Transform records',
        detail:
          'Use filter, map, and sortedBy to derive a presentation list without mutating its source.',
      },
      {
        title: 'Call a suspend function',
        detail:
          'Launch it from a lifecycle-aware coroutine scope and handle exceptions in the data or UI state layer.',
      },
    ],
    examples: [
      {
        title: 'Data classes, null safety, and collections',
        filename: 'SensorReading.kt',
        language: 'kotlin',
        code: 'data class SensorReading(\n  val timestamp: String,\n  val lightLux: Double?,\n  val soilPercent: Double?,\n)\n\nfun latestLight(readings: List<SensorReading>): Double? =\n  readings.lastOrNull { it.lightLux != null }?.lightLux\n\nval message = latestLight(readings)?.let { "$it lux" } ?: "No light reading"',
        explanation:
          'Nullable measurements are represented explicitly. lastOrNull avoids throwing on an empty list; safe calls and the Elvis operator produce a user-facing empty state.',
        expectedOutput:
          'When available, the latest non-null lux value is formatted; otherwise the message is “No light reading”.',
      },
      {
        title: 'Coroutine in a ViewModel',
        filename: 'SensorViewModel.kt',
        language: 'kotlin',
        code: 'fun refresh() {\n  viewModelScope.launch {\n    uiState = uiState.copy(isLoading = true, error = null)\n    try {\n      uiState = uiState.copy(reading = repository.current(), isLoading = false)\n    } catch (cause: IOException) {\n      uiState = uiState.copy(isLoading = false, error = "Network unavailable")\n    }\n  }\n}',
        explanation:
          'viewModelScope cancels work when its ViewModel is cleared. This state-holder example assumes uiState and repository are defined; handle parsing and other expected exception types in the data layer.',
        expectedOutput:
          'The UI can render loading, updated reading, or an explicit network error without blocking the main thread.',
      },
      {
        title: 'Control flow, classes, and exceptions',
        filename: 'KotlinFundamentals.kt',
        language: 'kotlin',
        code: 'interface Describable { fun describe(): String }\nopen class Sensor(val name: String) : Describable {\n  override fun describe() = name\n}\nclass LightSensor(name: String, val lux: Double?) : Sensor(name) {\n  fun label(): String = if (lux == null) "Unavailable" else "$lux lux"\n}\n\nval sensors = listOf(LightSensor("BH1750", 245.0), LightSensor("spare", null))\nfor ((index, sensor) in sensors.withIndex()) {\n  val state = when {\n    sensor.lux == null -> "missing"\n    sensor.lux > 500.0 -> "bright"\n    else -> "normal"\n  }\n  println("$index ${sensor.describe()}: ${sensor.label()} ($state)")\n}\ntry {\n  require(sensors.isNotEmpty()) { "Add a sensor first" }\n} catch (cause: IllegalArgumentException) {\n  println(cause.message)\n}',
        explanation:
          'This compact example demonstrates interface implementation, an open base class, a constructor, inheritance, val, a list, a loop, conditional when branches, a function, and a focused exception handler. Android UI code should report errors through UI state rather than printing them.',
        expectedOutput:
          'The loop prints one formatted line per sensor, representing a missing reading as unavailable.',
      },
    ],
    diagram: {
      title: 'Kotlin app data flow',
      nodes: [
        'Typed Kotlin data classes',
        'Repository suspend function',
        'ViewModel coroutine',
        'Compose UI state',
      ],
    },
    activity:
      'Write a data class for a sensor record, sort records by timestamp, filter null lux values, and display a clear empty-state message.',
    quiz: [
      question(
        'Multiple choice',
        'What does val declare?',
        'A read-only binding that cannot be reassigned',
        ['A nullable type', 'A coroutine'],
        'val prevents rebinding; it does not necessarily make the referenced object deeply immutable.',
      ),
      question(
        'True or false',
        'A Kotlin String? may hold null.',
        'True',
        ['False', 'Only in Java'],
        'The question mark marks a nullable Kotlin type.',
      ),
      question(
        'Code reading',
        'What does readings.lastOrNull { it.lightLux != null } return if no values match?',
        'null',
        ['0.0', 'The last list item regardless'],
        'lastOrNull returns null when no element satisfies the predicate.',
      ),
    ],
    docs: [docs.kotlin, docs.developers, docs.architecture],
  },
  {
    slug: 'java-fundamentals',
    title: 'Java Programming Fundamentals',
    level: 'Beginner–Intermediate',
    minutes: 65,
    summary:
      'Learn Java types, methods, classes, interfaces, collections, object-oriented design, and exceptions.',
    objectives: [
      'Write Java classes, constructors, methods, conditions, loops, and collections.',
      'Use interfaces and inheritance to describe app behavior.',
      'Handle exceptions and nullable platform data safely.',
    ],
    prerequisites: [
      'Android Studio installed',
      'Basic programming experience is helpful but not required',
    ],
    sections: [
      {
        title: 'Java syntax and control flow',
        body: 'Java declares explicit types for variables and method signatures. Methods belong to classes, constructors initialize instances, and if/else, switch, and loops control execution. Use descriptive names and small methods to keep Android code testable.',
      },
      {
        title: 'Classes, interfaces, and collections',
        body: 'Classes encapsulate fields and methods; inheritance extends a base class and interfaces define contracts. Prefer composition when it keeps responsibilities clearer. List, Map, and Set represent common collections. Android UI work should remain lifecycle-aware whether app source is Kotlin, Java, or mixed.',
      },
      {
        title: 'Exceptions and interoperability',
        body: 'Catch exceptions at a boundary where the app can recover or show a useful error; do not swallow them silently. Java can interoperate with Kotlin in one Android module. Android platform and Java interop APIs may return null, so validate values even when the Java type does not express nullability.',
      },
    ],
    steps: [
      {
        title: 'Create a model',
        detail:
          'Create an immutable Java class or record appropriate to the project language level, with explicit nullable sensor fields.',
      },
      {
        title: 'Transform a list',
        detail:
          'Use a loop or stream operation to find valid readings and preserve a separate empty state.',
      },
      {
        title: 'Handle failures',
        detail:
          'Wrap an I/O operation in a focused try/catch and report a typed app error to the UI.',
      },
    ],
    examples: [
      {
        title: 'Reading model and null-safe formatting',
        filename: 'SensorReading.java',
        language: 'java',
        code: 'public final class SensorReading {\n  private final String timestamp;\n  private final Double lightLux;\n\n  public SensorReading(String timestamp, Double lightLux) {\n    this.timestamp = timestamp;\n    this.lightLux = lightLux;\n  }\n\n  public String getTimestamp() { return timestamp; }\n  public Double getLightLux() { return lightLux; }\n}\n\nString label = reading.getLightLux() == null\n    ? "No light reading"\n    : reading.getLightLux() + " lux";',
        explanation:
          'The boxed Double allows a missing value; primitive double cannot represent null. This plain model can be mapped to a UI or persistence entity as the app architecture requires.',
        expectedOutput:
          'A null lux value displays “No light reading”; an actual measurement includes the lux unit.',
      },
      {
        title: 'Interface and implementation',
        filename: 'ReadingRepository.java',
        language: 'java',
        code: 'public interface ReadingRepository {\n  Reading current() throws IOException;\n}\n\npublic final class ApiReadingRepository implements ReadingRepository {\n  @Override\n  public Reading current() throws IOException {\n    // Perform the network request in an IO executor, never on the UI thread.\n    return api.fetchCurrent();\n  }\n}',
        explanation:
          'The interface decouples a screen or ViewModel from the data source. A production repository should use an async API such as a suspend function or executor rather than making a network call on the main thread.',
        expectedOutput:
          'The UI depends on a repository contract and can be tested with a fake implementation.',
      },
      {
        title: 'Java control flow, collections, and exceptions',
        filename: 'SensorSummary.java',
        language: 'java',
        code: 'List<SensorReading> readings = loadReadings();\nfor (SensorReading item : readings) {\n  Double lux = item.getLightLux();\n  if (lux == null) {\n    System.out.println("Light unavailable");\n  } else if (lux > 500.0) {\n    System.out.println("Bright: " + lux + " lux");\n  } else {\n    System.out.println("Light: " + lux + " lux");\n  }\n}\ntry {\n  saveReadings(readings);\n} catch (IOException cause) {\n  reportSaveFailure(cause);\n}',
        explanation:
          'This example combines a typed collection, enhanced for loop, conditional branches, method calls, and checked exception handling. In an Android app, move disk/network work off the main thread and render a user-safe error state.',
        expectedOutput:
          'Each reading produces a distinct missing, bright, or normal message; an I/O failure is reported rather than silently ignored.',
      },
    ],
    diagram: {
      title: 'Object-oriented Android code',
      nodes: [
        'Model classes hold data',
        'Repository interface defines access',
        'Implementation calls API or database',
        'UI renders results and errors',
      ],
    },
    activity:
      'Create a Java SensorReading class and repository interface; write a test that formats both a numeric and a missing sensor value.',
    quiz: [
      question(
        'Multiple choice',
        'Which Java type can represent a missing numeric value with null?',
        'Double',
        ['double', 'int'],
        'Wrapper types such as Double are references and may be null; primitives cannot.',
      ),
      question(
        'True or false',
        'A Java interface can define a contract implemented by a class.',
        'True',
        ['False', 'Only in Kotlin'],
        'Classes implement interfaces to provide the declared behavior.',
      ),
      question(
        'Code reading',
        'Why should a blocking HTTP request not run on the Android main thread?',
        'It can freeze the UI and trigger an application-not-responding error',
        ['It prevents Gradle sync', 'It disables null safety'],
        'Network operations must be asynchronous so the UI remains responsive.',
      ),
    ],
    docs: [docs.java, docs.developers, docs.api],
  },
  {
    slug: 'android-project-structure',
    title: 'Android Project Structure',
    level: 'Beginner–Intermediate',
    minutes: 40,
    summary:
      'Understand app source, MainActivity, manifest, resources, Gradle files, dependencies, and build configuration.',
    objectives: [
      'Locate the important source, manifest, resource, and build files.',
      'Distinguish namespace, application ID, and package declarations.',
      'Add dependencies and keep local machine configuration out of version control.',
    ],
    prerequisites: ['An Android Studio project open', 'Basic Kotlin or Java syntax'],
    sections: [
      {
        title: 'The app module',
        body: 'The app module contains src/main for production source, resources, and AndroidManifest.xml; src/test for local JVM tests; and src/androidTest for tests that run on a device. Kotlin/Java source may be grouped by package. MainActivity is often the launcher Activity, but projects can have multiple Activities or use a single Activity with Compose navigation.',
        bullets: [
          'res/drawable: images and drawable resources; mipmap: launcher icons.',
          'res/values: strings, colors, themes, and other XML values; layout: XML View layouts.',
          'assets: raw files accessed by name, not compiled as Android resources.',
        ],
      },
      {
        title: 'Manifest and identifiers',
        body: 'AndroidManifest.xml declares application components and app-level metadata; permissions and exported component behavior must be declared appropriately. Gradle namespace controls generated code packages, while applicationId is the installed/published identity. A Kotlin package declaration organizes source names and may differ from both.',
      },
      {
        title: 'Gradle configuration and dependencies',
        body: 'settings.gradle.kts configures project modules and plugin/dependency repositories. The root build.gradle.kts commonly declares plugins; app/build.gradle.kts configures the app plugin, SDK levels, build types, and module dependencies. gradle/libs.versions.toml may centralize versions. local.properties holds machine-specific SDK location and should not be committed.',
      },
    ],
    steps: [
      {
        title: 'Switch to Project view',
        detail:
          'Inspect settings.gradle.kts, app/build.gradle.kts, src/main, src/test, and src/androidTest.',
      },
      {
        title: 'Trace a launch',
        detail:
          'Find the manifest launcher declaration and open the Activity or Compose entry point it loads.',
      },
      {
        title: 'Find app resources',
        detail: 'Locate strings, themes, launcher icons, XML layouts if present, and raw assets.',
      },
      {
        title: 'Review dependencies',
        detail:
          'Find module dependencies and version catalog aliases; use Gradle sync after a documented dependency edit.',
      },
    ],
    examples: [
      {
        title: 'Representative module layout',
        filename: 'app/',
        language: 'text',
        code: 'app/\n  build.gradle.kts\n  src/\n    main/\n      AndroidManifest.xml\n      java/com/example/app/MainActivity.kt\n      res/values/strings.xml\n      res/drawable/\n      res/layout/        # when using XML Views\n      assets/\n    test/               # local JVM tests\n    androidTest/         # device/instrumented tests\nsettings.gradle.kts\nbuild.gradle.kts\ngradle/libs.versions.toml\nlocal.properties       # local SDK path; do not commit',
        explanation:
          'Generated project layouts vary with templates and language versions. The key distinction is module build configuration, production source/resources, and separate local/device test source sets.',
        expectedOutput:
          'You can locate a UI entry point, app manifest, resource, dependency declaration, and test location.',
      },
      {
        title: 'Declare a string resource',
        filename: 'app/src/main/res/values/strings.xml',
        language: 'xml',
        code: '<resources>\n    <string name="app_name">Sensor Monitor</string>\n    <string name="refresh_readings">Refresh readings</string>\n</resources>',
        explanation:
          'String resources centralize user-facing text for reuse and localization. Compose can load them with stringResource(R.string.app_name); XML Views can reference @string/app_name.',
        expectedOutput: 'The same text resource can be referenced from a Composable or XML layout.',
      },
    ],
    diagram: {
      title: 'Android project map',
      nodes: [
        'Root Gradle settings and plugins',
        'App module source and manifest',
        'Resources and assets',
        'Tests and generated build outputs',
      ],
    },
    activity:
      'Find the app ID, main Activity, manifest, one string resource, one dependency, and both test source sets in a starter project.',
    quiz: [
      question(
        'Multiple choice',
        'Which file configures dependencies for the app module?',
        'app/build.gradle.kts',
        ['AndroidManifest.xml', 'strings.xml'],
        'The app module’s Gradle build file configures module dependencies and build settings.',
      ),
      question(
        'True or false',
        'local.properties containing a developer SDK path should be committed to source control.',
        'False',
        ['True', 'Only for release builds'],
        'local.properties is machine-specific and should stay out of version control.',
      ),
      question(
        'Code reading',
        'Where are Android string resources normally stored?',
        'src/main/res/values/strings.xml',
        ['src/androidTest/strings.xml', 'gradle/wrapper/gradle-wrapper.properties'],
        'The values resource directory contains string, color, theme, and related XML values.',
      ),
    ],
    docs: [docs.developers, docs.gradle, docs.studio, docs.api],
  },
  {
    slug: 'android-ui-development',
    title: 'Android UI Development: Compose and XML',
    level: 'Beginner–Intermediate',
    minutes: 65,
    summary:
      'Build native screens with Jetpack Compose or XML Views, including forms, lists, and responsive layouts.',
    objectives: [
      'Compare declarative Compose UI and traditional XML View UI.',
      'Build a sensor screen with readable cards, form controls, and a list.',
      'Represent state and validation clearly for different screen sizes.',
    ],
    prerequisites: [
      'A working Android project',
      'Kotlin basics for Compose; XML projects can use Kotlin or Java',
    ],
    sections: [
      {
        title: 'Jetpack Compose',
        body: 'Compose describes UI as composable functions that render from state. State changes cause recomposition. Material 3 provides themed controls and layout foundations. Keep composables focused, hoist state when a parent or ViewModel owns it, and provide accessibility semantics and previews.',
      },
      {
        title: 'XML layouts and Views',
        body: 'Traditional Android layouts define a View hierarchy in XML and connect it to Activity or Fragment code. TextView displays text, EditText accepts text input, Button handles actions, ImageView shows images, LinearLayout arranges children, and ConstraintLayout supports flexible constraints. RecyclerView efficiently displays larger or changing lists using an adapter.',
      },
      {
        title: 'Material, forms, and responsive design',
        body: 'Use Material components and theme tokens consistently. Label inputs, validate user-entered values before saving, preserve state across configuration changes, and use resource qualifiers or adaptive layouts for screen sizes. Do not rely on fixed pixel coordinates or color alone to communicate status.',
      },
    ],
    steps: [
      {
        title: 'Choose one UI system for the first screen',
        detail:
          'Use Compose for a new Compose template or XML Views if the project is View-based; interoperability allows gradual migration.',
      },
      {
        title: 'Create a sensor summary',
        detail:
          'Display distance, light, and soil moisture with units, unavailable states, and a refresh action.',
      },
      {
        title: 'Add a validated form',
        detail:
          'Label an input, show validation near the field, and disable or reject invalid submissions.',
      },
      {
        title: 'Check adaptable behavior',
        detail:
          'Use emulator configurations and font scaling to verify that content scrolls, wraps, and remains accessible.',
      },
    ],
    examples: [
      {
        title: 'Compose sensor card',
        filename: 'SensorCard.kt',
        language: 'kotlin',
        code: '@Composable\nfun SensorCard(label: String, value: Double?, unit: String) {\n  Card(modifier = Modifier.fillMaxWidth()) {\n    Row(\n      modifier = Modifier.padding(16.dp),\n      horizontalArrangement = Arrangement.SpaceBetween,\n    ) {\n      Text(label)\n      Text(value?.let { "$it $unit" } ?: "Unavailable")\n    }\n  }\n}',
        explanation:
          'The composable receives values as parameters and renders null as unavailable, not as a false zero. Add appropriate Material theme imports and accessibility semantics in the app.',
        expectedOutput:
          'A full-width card shows a sensor label and a unit-bearing value or “Unavailable”.',
      },
      {
        title: 'XML layout with a labeled input',
        filename: 'app/src/main/res/layout/activity_login.xml',
        language: 'xml',
        code: '<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"\n    android:layout_width="match_parent"\n    android:layout_height="match_parent"\n    android:orientation="vertical"\n    android:padding="24dp">\n    <EditText\n        android:id="@+id/emailInput"\n        android:layout_width="match_parent"\n        android:layout_height="wrap_content"\n        android:hint="@string/email"\n        android:inputType="textEmailAddress" />\n    <Button\n        android:id="@+id/submitButton"\n        android:layout_width="match_parent"\n        android:layout_height="wrap_content"\n        android:text="@string/continue_label" />\n</LinearLayout>',
        explanation:
          'This demonstrates a basic View hierarchy and semantic input type. In production, use a TextInputLayout or equivalent accessible label/error pattern, extract strings, and validate in code.',
        expectedOutput:
          'A vertically arranged email input and button resize to the available content width.',
      },
    ],
    diagram: {
      title: 'Two native Android UI models',
      nodes: [
        'Compose functions + state',
        'Compose recomposes UI',
        'XML layout + View hierarchy',
        'ViewBinding/Compose interop connects code',
      ],
    },
    activity:
      'Implement a sensor dashboard in either Compose or XML, including three measurements, a missing-value state, a refresh button, and a labeled filter form.',
    quiz: [
      question(
        'Multiple choice',
        'Which toolkit uses composable Kotlin functions to declare UI?',
        'Jetpack Compose',
        ['RecyclerView', 'Gradle'],
        'Jetpack Compose is Android’s declarative UI toolkit.',
      ),
      question(
        'True or false',
        'A null light sensor value should automatically be rendered as 0 lux.',
        'False',
        ['True', 'Only in XML'],
        'Missing and measured-zero values are distinct; show an unavailable state.',
      ),
      question(
        'Code reading',
        'What is RecyclerView designed to present efficiently?',
        'A scrollable collection of data items',
        ['An SDK platform', 'An app signing key'],
        'RecyclerView recycles item views while displaying lists and grids.',
      ),
    ],
    docs: [docs.compose, docs.developers, docs.api],
  },
  {
    slug: 'activities-intents-navigation',
    title: 'Activities, Intents, and Navigation',
    level: 'Intermediate',
    minutes: 55,
    summary:
      'Understand Activity lifecycle, intents, navigation, fragments, back behavior, and state ownership.',
    objectives: [
      'Describe Activity lifecycle callbacks and avoid tying durable state to a screen instance.',
      'Use intents for explicit navigation and platform actions.',
      'Choose Compose Navigation or Fragment navigation for app destinations.',
    ],
    prerequisites: ['Kotlin or Java fundamentals', 'A basic Android application'],
    sections: [
      {
        title: 'Activity lifecycle and state',
        body: 'Android may create, pause, stop, resume, or destroy an Activity as the user navigates or the system reclaims resources. Do not assume one Activity instance lives forever. Keep UI state in a ViewModel when appropriate, save small transient state with saved-state mechanisms, and persist durable data in a repository or database.',
      },
      {
        title: 'Explicit and implicit intents',
        body: 'An explicit Intent names a component in your app and can carry small serializable extras. An implicit Intent describes an action such as opening a URL and lets Android resolve a capable app. Validate external input and never place large objects or secrets in intent extras. For modern external results, use Activity Result APIs.',
      },
      {
        title: 'Navigation and back stack',
        body: 'A single-Activity app can host Compose Navigation or Fragments and a navigation component. Define destinations, pass stable identifiers rather than complex mutable objects, and load current data from a repository. Back navigation should return to a sensible prior destination and preserve the correct state.',
      },
    ],
    steps: [
      {
        title: 'Observe lifecycle callbacks',
        detail:
          'Log onCreate, onStart, onResume, onPause, onStop, and onDestroy while opening and leaving a screen.',
      },
      {
        title: 'Navigate inside the app',
        detail:
          'Add a details destination and pass a reading ID; load the reading from the repository at the destination.',
      },
      {
        title: 'Launch an external action',
        detail:
          'Use an implicit ACTION_VIEW intent for a public HTTPS URL and handle the case where no app can resolve it.',
      },
      {
        title: 'Test state restoration',
        detail:
          'Rotate the emulator or recreate the Activity and verify form/UI state is restored or intentionally reset.',
      },
    ],
    examples: [
      {
        title: 'Explicit Activity intent',
        filename: 'MainActivity.kt',
        language: 'kotlin',
        code: 'val intent = Intent(this, ReadingDetailActivity::class.java)\nintent.putExtra(ReadingDetailActivity.EXTRA_READING_ID, reading.id)\nstartActivity(intent)\n\n// In the destination:\nval readingId = intent.getLongExtra(EXTRA_READING_ID, -1L)\nif (readingId < 0L) finish()',
        explanation:
          'Pass a stable ID and load the full record from a repository. Declare the extra key as a constant; handle a missing or invalid ID. The receiving Activity must be declared appropriately in the manifest.',
        expectedOutput:
          'The detail screen receives a valid ID and retrieves the reading; invalid input returns safely.',
      },
      {
        title: 'Open a web page with an implicit intent',
        filename: 'OpenDocumentation.kt',
        language: 'kotlin',
        code: 'val intent = Intent(\n  Intent.ACTION_VIEW,\n  Uri.parse("https://developer.android.com/"),\n)\nif (intent.resolveActivity(packageManager) != null) {\n  startActivity(intent)\n} else {\n  showMessage("No browser is available")\n}',
        explanation:
          'ACTION_VIEW asks Android to find an app for the URL. Validate URLs if they come from external input; use Activity Result APIs when a result is expected.',
        expectedOutput:
          'Android opens a suitable browser or the app reports that no handler is available.',
      },
    ],
    diagram: {
      title: 'Android navigation lifecycle',
      nodes: [
        'User selects a destination',
        'Navigation or Intent opens screen',
        'Activity lifecycle changes',
        'ViewModel/repository restores data',
      ],
    },
    activity:
      'Create a list-to-detail flow that passes a reading ID, handles a missing ID, and preserves filter state after rotation.',
    quiz: [
      question(
        'Multiple choice',
        'What is a good value to pass to a detail screen for a database record?',
        'A stable record ID',
        ['A whole mutable database', 'A password in a log string'],
        'Pass a small identifier and load canonical data from the repository.',
      ),
      question(
        'True or false',
        'An Activity instance is guaranteed to remain alive for the entire app session.',
        'False',
        ['True', 'Only on tablets'],
        'The system can recreate or destroy Activities; state should be handled deliberately.',
      ),
      question(
        'Code reading',
        'What does Intent.ACTION_VIEW commonly request?',
        'Open content such as a URL in a capable app',
        ['Build a Gradle module', 'Request a Kotlin compiler'],
        'An implicit ACTION_VIEW intent is resolved to an app that can view the URI.',
      ),
    ],
    docs: [docs.lifecycle, docs.navigation, docs.developers, docs.api],
  },
  {
    slug: 'backend-rest-api',
    title: 'Backend and REST API Integration',
    level: 'Intermediate',
    minutes: 65,
    summary:
      'Call REST APIs with Retrofit, model JSON, handle authentication, loading states, and network failures.',
    objectives: [
      'Configure Retrofit and OkHttp for GET and write requests.',
      'Model and validate JSON responses with Kotlin data classes.',
      'Handle network permission, authorization, error state, and backend URLs safely.',
    ],
    prerequisites: [
      'Kotlin coroutines and data classes',
      'A backend URL reachable from the Android device',
    ],
    sections: [
      {
        title: 'Retrofit, OkHttp, and JSON',
        body: 'Retrofit turns annotated interfaces into HTTP clients and can convert JSON with a converter. OkHttp supplies the underlying HTTP transport and can configure timeouts and interceptors. Use a repository to call the API from a coroutine, check response success, parse and validate data, and expose typed UI state.',
      },
      {
        title: 'Permissions, URLs, and CORS',
        body: 'Declare android.permission.INTERNET in the app manifest. Android native HTTP calls do not use browser CORS enforcement, but your backend still needs an appropriate policy for browser clients. On a physical phone, use a backend host reachable on Wi-Fi; localhost refers to the phone. The Android emulator commonly reaches the development host through 10.0.2.2. Use HTTPS for production and avoid broadly enabling cleartext traffic.',
      },
      {
        title: 'Authentication and errors',
        body: 'Send bearer tokens only over HTTPS and never hardcode credentials. Treat 401, 403, validation responses, timeouts, offline state, and malformed JSON distinctly. Avoid putting tokens in logs or URLs. A native app cannot keep a shared backend secret safe; the backend must authenticate and authorize each user. Use Android Keystore-backed secure storage when persistent token storage is required.',
      },
      {
        title: 'FastAPI and Node.js',
        body: 'Android can call any backend that exposes an HTTP/JSON contract, including FastAPI and Node.js. This project’s FastAPI example exposes GET /api/readings/current, GET /api/readings, and GET /api/health. Current returns a reading key with a record or null; history returns a readings array.',
      },
    ],
    steps: [
      {
        title: 'Add network access',
        detail:
          'Declare INTERNET permission in the manifest and configure a reachable base URL for each development environment.',
      },
      {
        title: 'Define Retrofit API',
        detail:
          'Create a typed service interface, JSON converter, and OkHttp client with finite connect/read timeouts.',
      },
      {
        title: 'Call from a coroutine',
        detail:
          'Invoke a suspend API through a repository and map success/error results into ViewModel UI state.',
      },
      {
        title: 'Test device networking',
        detail:
          'Test the emulator host bridge and a real phone’s LAN reachability; verify HTTPS and authentication separately.',
      },
    ],
    examples: [
      {
        title: 'Retrofit sensor API and model',
        filename: 'SensorApi.kt',
        language: 'kotlin',
        code: 'data class CurrentResponse(val reading: SensorReading?)\n\ndata class SensorReading(\n  val timestamp: String,\n  val tof_distance_mm: Double?,\n  val light_lux: Double?,\n  val soil_raw: Int?,\n  val soil_moisture_percent: Double?,\n  val rssi: Int?,\n)\n\ninterface SensorApi {\n  @GET("api/readings/current")\n  suspend fun current(): Response<CurrentResponse>\n\n  @GET("api/readings")\n  suspend fun history(@Query("limit") limit: Int = 100): Response<ReadingsResponse>\n}',
        explanation:
          'Add Retrofit, OkHttp, and a JSON converter in Gradle and create the Retrofit instance with a base URL ending in /. The field names follow the sample FastAPI response; confirm the real response schema and validate optional values.',
        expectedOutput:
          'The service returns typed current and history responses; callers still inspect isSuccessful and handle errors.',
      },
      {
        title: 'Manifest and URL configuration',
        filename: 'AndroidManifest.xml and build config',
        language: 'xml',
        code: '<uses-permission android:name="android.permission.INTERNET" />\n\n<!-- Development only: choose a host reachable from this device. -->\n<!-- Physical phone: http://192.168.1.50:8000/ -->\n<!-- Android emulator host: http://10.0.2.2:8000/ -->',
        explanation:
          'INTERNET is a normal install-time permission. The example URLs are placeholders; configure the correct machine/Pi address. Android blocks cleartext HTTP by default for apps targeting modern API levels unless explicitly configured, so prefer a deliberate debug-only policy or HTTPS instead of disabling transport security globally.',
        expectedOutput:
          'The app can make network requests to the configured reachable backend without embedding credentials.',
      },
    ],
    diagram: {
      title: 'Native Android REST request',
      nodes: [
        'Compose screen observes state',
        'ViewModel coroutine',
        'Repository + Retrofit/OkHttp',
        'FastAPI or Node returns JSON',
      ],
    },
    activity:
      'Call /api/readings/current from an emulator and phone, then show loading, empty, success, unauthorized, offline, and malformed-response states.',
    quiz: [
      question(
        'Multiple choice',
        'What host commonly maps to the development computer from the Android emulator?',
        '10.0.2.2',
        ['localhost on the emulator', '0.0.0.0'],
        'The Android emulator commonly exposes the host through 10.0.2.2.',
      ),
      question(
        'True or false',
        'Native Android HTTP clients are subject to browser CORS enforcement.',
        'False',
        ['True', 'Only Retrofit'],
        'CORS is a browser policy; native clients still need secure server authorization and transport.',
      ),
      question(
        'Code reading',
        'Why check Response.isSuccessful before reading a successful body?',
        'HTTP error responses must be handled distinctly from valid data',
        ['It installs Retrofit', 'It grants location permission'],
        'A response may be a 4xx/5xx; map it to an explicit error state instead of treating it as data.',
      ),
    ],
    docs: [docs.retrofit, docs.developers, docs.architecture, docs.api],
  },
  {
    slug: 'database-integration',
    title: 'Database Integration and Offline Data',
    level: 'Intermediate',
    minutes: 60,
    summary:
      'Use Room, SQLite, DataStore, SharedPreferences, and Firebase with clear offline data boundaries.',
    objectives: [
      'Choose Room for relational local data and DataStore for small preferences.',
      'Implement an entity, DAO, and database for sensor history.',
      'Separate local persistence from remote authoritative data and credentials.',
    ],
    prerequisites: ['Kotlin data classes and coroutines', 'A Gradle-based Android project'],
    sections: [
      {
        title: 'Room and SQLite',
        body: 'Room is an Android persistence library layered over SQLite. Define entities, DAOs, and a RoomDatabase; Room validates SQL queries during compilation and supports observable Flow results. Use migrations when schema changes, parameterized queries, and repository boundaries. SQLite is the local relational engine, not a remote database service.',
      },
      {
        title: 'Preferences and remote services',
        body: 'DataStore is recommended for asynchronous preferences and small settings. SharedPreferences is an older synchronous preferences API still encountered in existing apps. Firebase Authentication and Firestore are remote managed services; configure platform credentials and restrictive security rules. Never bundle production database credentials in an APK.',
      },
      {
        title: 'Offline and synchronization',
        body: 'A local Room cache can support history and offline reading. Decide how stale values are labeled, what happens when writes queue, how duplicates and conflicts are resolved, and how long history is retained. The backend remains authoritative for shared sensor data; local mobile storage should not replace server authorization.',
      },
    ],
    steps: [
      {
        title: 'Define an entity',
        detail:
          'Give each sensor record a stable local key and store timestamp, measurements, and optional values with appropriate types.',
      },
      {
        title: 'Create a DAO',
        detail:
          'Define parameterized insert and ordered history queries; return Flow for data that the UI observes.',
      },
      {
        title: 'Add Room dependencies',
        detail:
          'Use the project’s version catalog or current Room documentation for room-runtime, room-ktx, and the KSP compiler plugin.',
      },
      {
        title: 'Plan migration and sync',
        detail:
          'Version the schema, implement migrations, and define how local history refreshes from the backend after reconnecting.',
      },
      {
        title: 'Optional Firebase setup',
        detail:
          'Register the Android application ID in Firebase Console, add the generated google-services.json to the app module, configure the current Google Services Gradle plugin and Firebase BoM, then define and test restrictive Authentication and Firestore Security Rules.',
      },
    ],
    examples: [
      {
        title: 'Room entity and DAO',
        filename: 'ReadingEntity.kt',
        language: 'kotlin',
        code: '@Entity(tableName = "readings")\ndata class ReadingEntity(\n  @PrimaryKey val timestamp: String,\n  val tofDistanceMm: Double?,\n  val lightLux: Double?,\n  val soilMoisturePercent: Double?,\n)\n\n@Dao\ninterface ReadingDao {\n  @Upsert suspend fun upsertAll(items: List<ReadingEntity>)\n\n  @Query("SELECT * FROM readings ORDER BY timestamp DESC LIMIT :limit")\n  fun observeRecent(limit: Int): Flow<List<ReadingEntity>>\n}',
        explanation:
          'Use Room annotations from androidx.room and add current Room compiler processing (commonly KSP) and runtime dependencies. Choose a key that is unique in the actual API; if timestamps can collide, use a server ID or generated local key.',
        expectedOutput: 'Room persists readings and emits newest records as a Flow to collectors.',
      },
      {
        title: 'DataStore for a small preference',
        filename: 'SettingsRepository.kt',
        language: 'kotlin',
        code: 'val Context.dataStore by preferencesDataStore(name = "settings")\nprivate val UNIT = stringPreferencesKey("distance_unit")\n\nsuspend fun saveUnit(context: Context, unit: String) {\n  context.dataStore.edit { preferences -> preferences[UNIT] = unit }\n}\n\nval distanceUnit: Flow<String> = context.dataStore.data\n  .map { preferences -> preferences[UNIT] ?: "mm" }',
        explanation:
          'This Preferences DataStore example stores a non-sensitive display setting. Add the DataStore preferences dependency; do not put auth tokens or database passwords in plain preferences.',
        expectedOutput:
          'The selected unit is persisted asynchronously and defaults to millimeters.',
      },
      {
        title: 'Add Room dependencies',
        filename: 'app/build.gradle.kts',
        language: 'kotlin',
        code: 'plugins {\n  // Use the KSP plugin version compatible with your Kotlin toolchain.\n  id("com.google.devtools.ksp")\n}\n\ndependencies {\n  val roomVersion = "<current-room-version>"\n  implementation("androidx.room:room-runtime:$roomVersion")\n  implementation("androidx.room:room-ktx:$roomVersion")\n  ksp("androidx.room:room-compiler:$roomVersion")\n}',
        explanation:
          'Replace the placeholder with a current stable Room version, align the KSP plugin with the Kotlin version catalog, then sync Gradle. Android projects may centralize versions in gradle/libs.versions.toml instead of declaring them in this module.',
        expectedOutput:
          'Gradle resolves Room runtime and coroutine support, and KSP generates the database implementation.',
      },
      {
        title: 'Write a Firestore document',
        filename: 'RemoteReadings.kt',
        language: 'kotlin',
        code: 'val document = FirebaseFirestore.getInstance()\n  .collection("users")\n  .document(userId)\n  .collection("readings")\n  .document(reading.timestamp)\n\ndocument.set(reading.toFirestoreMap())\n  .addOnSuccessListener { showSavedMessage() }\n  .addOnFailureListener { error -> showSaveError(error) }',
        explanation:
          'Add the Firebase Firestore Android SDK using the current Firebase BoM and use the authenticated user ID. This is asynchronous; enforce authorization in Firestore Security Rules and never trust the client to authorize access.',
        expectedOutput:
          'The authenticated user’s reading is written remotely, or the UI receives a visible save error.',
      },
    ],
    diagram: {
      title: 'Android data storage boundaries',
      nodes: [
        'FastAPI is shared source of truth',
        'Repository syncs remote and local',
        'Room stores sensor history',
        'DataStore stores small preferences',
      ],
    },
    activity:
      'Persist a page of API sensor history in Room, observe it with Flow, and show a stale/offline label when the network is unavailable.',
    quiz: [
      question(
        'Multiple choice',
        'Which Android library provides a structured abstraction over SQLite?',
        'Room',
        ['DataStore', 'Logcat'],
        'Room provides entities, DAOs, database access, and compile-time SQL checks.',
      ),
      question(
        'True or false',
        'A production database password belongs inside the Android application bundle.',
        'False',
        ['True', 'Only in release builds'],
        'APK contents can be inspected; keep database credentials on the trusted backend.',
      ),
      question(
        'Code reading',
        'What does Flow<List<ReadingEntity>> allow a DAO to expose?',
        'A stream of changing query results',
        ['A signed APK', 'A runtime permission'],
        'Room can emit observable query updates as a Flow.',
      ),
    ],
    docs: [docs.room, docs.architecture, docs.developers],
  },
  {
    slug: 'sensors-hardware',
    title: 'Mobile Hardware and Sensor Integration',
    level: 'Advanced',
    minutes: 65,
    summary:
      'Use Android runtime permissions and platform APIs for camera, location, Bluetooth, sensors, Wi-Fi, and files.',
    objectives: [
      'Request dangerous permissions in context and handle denial.',
      'Choose platform APIs for camera, location, Bluetooth LE, and device sensors.',
      'Securely communicate with external IoT devices over supported protocols.',
    ],
    prerequisites: [
      'Android lifecycle and Kotlin basics',
      'A physical Android device for hardware testing',
    ],
    sections: [
      {
        title: 'Permissions and lifecycle',
        body: 'Declare required permissions in the manifest and request runtime permissions for protected features at the moment they are needed. Explain the purpose before asking, handle denial and “do not ask again” flows, and release camera, sensor, and Bluetooth resources when no longer needed. Permission requirements vary by Android version and feature.',
      },
      {
        title: 'Camera, location, and sensors',
        body: 'Use CameraX for camera capture, the fused location provider for location where appropriate, and SensorManager for device motion sensors. Request only the permissions needed for the user-visible feature. Location may require foreground/background distinctions; do not collect it continuously without a clear user need.',
      },
      {
        title: 'Bluetooth, Wi-Fi, files, and notifications',
        body: 'For BLE, account for Android 12+ BLUETOOTH_SCAN and BLUETOOTH_CONNECT permissions, and older-version location requirements where applicable. Wi-Fi and network APIs have their own permission and privacy constraints. Use system photo pickers or scoped storage rather than broad file access. Notifications require runtime permission on Android 13+; push also needs server/provider configuration.',
      },
    ],
    steps: [
      {
        title: 'Map feature to API and permission',
        detail:
          'Choose CameraX, location, BLE, SensorManager, or a system picker and verify current platform permission rules.',
      },
      {
        title: 'Request at point of use',
        detail:
          'Use Activity Result APIs, explain the reason, and provide a graceful path if permission is denied.',
      },
      {
        title: 'Release hardware resources',
        detail:
          'Stop camera, sensor, location, and BLE work when the screen or lifecycle no longer needs it.',
      },
      {
        title: 'Test on real hardware',
        detail:
          'Test permission grant, denial, revocation in Settings, missing hardware, and interrupted operations on a physical phone.',
      },
    ],
    examples: [
      {
        title: 'Request camera permission with Activity Result API',
        filename: 'CameraScreen.kt',
        language: 'kotlin',
        code: 'private val requestCamera = registerForActivityResult(\n  ActivityResultContracts.RequestPermission(),\n) { granted ->\n  if (granted) openCamera()\n  else showCameraPermissionExplanation()\n}\n\nfun onCapturePressed() {\n  requestCamera.launch(Manifest.permission.CAMERA)\n}',
        explanation:
          'Declare CAMERA in the manifest and register the launcher before the Activity/Fragment is started. CameraX is the recommended camera library for most app camera use cases; permission denial must remain a supported state.',
        expectedOutput:
          'The app opens its camera flow only after permission is granted and explains the unavailable feature when denied.',
      },
      {
        title: 'Request current location',
        filename: 'LocationRepository.kt',
        language: 'kotlin',
        code: 'suspend fun currentLocation(\n  client: FusedLocationProviderClient,\n  hasLocationPermission: Boolean,\n): Location? {\n  if (!hasLocationPermission) return null\n  return try {\n    client.getCurrentLocation(\n      Priority.PRIORITY_BALANCED_POWER_ACCURACY,\n      CancellationTokenSource().token,\n    ).await()\n  } catch (cause: SecurityException) {\n    null\n  }\n}',
        explanation:
          'Add the Play Services Location dependency and the appropriate location permission, request it at the point of use, and verify permission immediately before calling the API. This example returns null for permission denial or a missing fix; production code should expose those states separately and handle cancellation/errors.',
        expectedOutput:
          'The repository returns a recent location fix when permission is granted, or no location when the feature is unavailable.',
      },
      {
        title: 'Declare BLE permissions by API level',
        filename: 'AndroidManifest.xml',
        language: 'xml',
        code: '<uses-permission android:name="android.permission.BLUETOOTH_SCAN"\n    android:usesPermissionFlags="neverForLocation" />\n<uses-permission android:name="android.permission.BLUETOOTH_CONNECT" />\n\n<!-- For supported older Android versions, declare the legacy\n     Bluetooth/location permissions with appropriate maxSdkVersion. -->',
        explanation:
          'This is a partial Android 12+ declaration, not a complete BLE implementation. Review current official Bluetooth permissions guidance, target SDK behavior, scan use, and older-version requirements before shipping.',
        expectedOutput:
          'The app can request the necessary runtime BLE permissions on supported Android versions and handle denial.',
      },
    ],
    diagram: {
      title: 'Safe hardware feature flow',
      nodes: [
        'User requests a feature',
        'Explain and request permission',
        'Use platform API / plugin',
        'Stop work and handle denial',
      ],
    },
    activity:
      'Implement one device capability and test permission granted, denied, revoked, unavailable hardware, and a screen transition during an active operation.',
    quiz: [
      question(
        'Multiple choice',
        'When should an app request a feature permission?',
        'When the user reaches the feature and the reason is clear',
        ['At first launch for every possible feature', 'After silently starting collection'],
        'Request permissions in context and explain the user-visible benefit.',
      ),
      question(
        'True or false',
        'A user can revoke a permission after initially granting it.',
        'True',
        ['False', 'Only on Android tablets'],
        'Permission state can change; check and handle it when the feature is used.',
      ),
      question(
        'Code reading',
        'Which Android 12+ permission is used to connect to a BLE device?',
        'BLUETOOTH_CONNECT',
        ['INTERNET', 'READ_LOGS'],
        'Android 12 introduced runtime Bluetooth permissions including BLUETOOTH_CONNECT.',
      ),
    ],
    docs: [docs.permissions, docs.bluetooth, docs.api, docs.developers],
  },
  {
    slug: 'esp32-raspberry-pi-integration',
    title: 'ESP32 and Raspberry Pi Integration',
    level: 'Advanced',
    minutes: 70,
    summary: 'Connect an Android app to IoT readings through Raspberry Pi, MQTT, and FastAPI.',
    objectives: [
      'Trace ESP32 → Raspberry Pi → MQTT → FastAPI → Android data flow.',
      'Parse and display sensor fields with missing values and timestamps.',
      'Distinguish server, broker, and device connection health.',
    ],
    prerequisites: [
      'Kotlin and Retrofit basics',
      'A reachable FastAPI service or sample API responses',
      'Optional Pi, ESP32, sensors, and MQTT broker',
    ],
    sections: [
      {
        title: 'IoT architecture and boundaries',
        body: 'The ESP32 reads ToF distance, BH1750 light, and soil moisture sensors, then publishes telemetry. A Raspberry Pi MQTT service can store readings in SQLite and expose them through FastAPI. The Android app should call the API; it should not connect to Pi GPIO or the database directly. MQTT clients in Android are optional and require broker authentication, TLS, topic authorization, and careful lifecycle management.',
      },
      {
        title: 'REST, MQTT, and WebSockets',
        body: 'REST polling is simple and matches the current project API. MQTT can provide direct topic delivery but couples mobile clients to broker access. A secured backend WebSocket can bridge events to mobile clients. This project’s FastAPI sample currently exposes REST routes only; it does not provide an MQTT client endpoint or WebSocket route. Add those server capabilities before teaching the app to depend on them.',
      },
      {
        title: 'Readings and connection state',
        body: 'The example reading fields are timestamp, tof_distance_mm, light_lux, soil_raw, soil_moisture_percent, and rssi. The API health field mqtt_connected means the backend can reach its broker; it does not guarantee the ESP32 is online. Show last-reading freshness or add a device heartbeat contract. Null sensor values mean unavailable, not zero.',
      },
      {
        title: 'LAN and production security',
        body: 'A physical phone must use the Raspberry Pi’s reachable Wi-Fi address, not localhost. An Android emulator commonly reaches the development computer at 10.0.2.2. Restrict development ports to the trusted LAN, use HTTPS and authenticated APIs in production, and never expose the database or unauthenticated MQTT broker to the internet.',
      },
    ],
    steps: [
      {
        title: 'Verify API health',
        detail:
          'Call /api/health from the same network and interpret backend/broker status separately from ESP32 freshness.',
      },
      {
        title: 'Fetch current and historical data',
        detail:
          'Call GET /api/readings/current and GET /api/readings?limit=100 and validate the response envelope.',
      },
      {
        title: 'Build dashboard state',
        detail:
          'Display each measurement with a unit, timestamp, missing-value state, loading state, and retryable error.',
      },
      {
        title: 'Simulate disconnects',
        detail:
          'Stop the phone network, API, MQTT broker, and ESP32 separately and verify that each status is represented accurately.',
      },
    ],
    examples: [
      {
        title: 'Sensor response model and Retrofit endpoints',
        filename: 'SensorApi.kt',
        language: 'kotlin',
        code: 'data class SensorReading(\n  val timestamp: String,\n  val tof_distance_mm: Double?,\n  val light_lux: Double?,\n  val soil_raw: Int?,\n  val soil_moisture_percent: Double?,\n  val rssi: Int?,\n)\ndata class CurrentResponse(val reading: SensorReading?)\ndata class HistoryResponse(val readings: List<SensorReading>)\n\ninterface SensorApi {\n  @GET("api/readings/current")\n  suspend fun current(): Response<CurrentResponse>\n\n  @GET("api/readings")\n  suspend fun history(@Query("limit") limit: Int = 100): Response<HistoryResponse>\n}',
        explanation:
          'Use these as DTOs only after comparing them with the actual FastAPI JSON contract. Keep Retrofit calls off the main thread through suspend functions and map null values to unavailable UI states.',
        expectedOutput:
          'The app can retrieve the current reading and a bounded history list using the existing REST API.',
      },
      {
        title: 'Render values and freshness in Compose',
        filename: 'SensorDashboard.kt',
        language: 'kotlin',
        code: '@Composable\nfun SensorDashboard(reading: SensorReading?, isOnline: Boolean) {\n  Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {\n    Text(if (isOnline) "API connected" else "API offline")\n    Text("Distance: ${reading?.tof_distance_mm?.let { "$it mm" } ?: "Unavailable"}")\n    Text("Light: ${reading?.light_lux?.let { "$it lux" } ?: "Unavailable"}")\n    Text("Soil: ${reading?.soil_moisture_percent?.let { "$it%" } ?: "Unavailable"}")\n    Text("Last update: ${reading?.timestamp ?: "No data"}")\n  }\n}',
        explanation:
          'The UI distinguishes network state from sensor-field availability and shows units. A production ViewModel should also mark readings stale by comparing timestamps against a documented freshness threshold.',
        expectedOutput:
          'The dashboard shows API state, sensor values with units, null states, and the latest timestamp.',
      },
      {
        title: 'History chart points',
        filename: 'ReadingChart.kt',
        language: 'kotlin',
        code: 'data class ChartPoint(val x: Float, val y: Float)\n\nfun lightPoints(readings: List<SensorReading>): List<ChartPoint> {\n  val values = readings.mapNotNull { it.light_lux?.toFloat() }\n  val max = values.maxOrNull()?.coerceAtLeast(1f) ?: return emptyList()\n  return values.mapIndexed { index, value ->\n    ChartPoint(index.toFloat(), value / max)\n  }\n}',
        explanation:
          'This creates normalized values for a chart renderer; it does not draw the axes or timestamps. Preserve chronological order, label lux units, and represent gaps instead of connecting across missing readings in a production graph.',
        expectedOutput:
          'Non-null lux readings map to normalized chart points; an empty history returns an empty list.',
      },
      {
        title: 'Subscribe to secured MQTT telemetry',
        filename: 'MqttReadingClient.kt',
        language: 'kotlin',
        code: 'val client = MqttAsyncClient(\n  "ssl://broker.example.com:8883",\n  UUID.randomUUID().toString(),\n  MemoryPersistence(),\n)\nclient.setCallback(object : MqttCallback {\n  override fun connectionLost(cause: Throwable?) = onBrokerState(false)\n  override fun messageArrived(topic: String?, message: MqttMessage?) {\n    val payload = message?.payload?.toString(Charsets.UTF_8) ?: return\n    onTelemetry(topic.orEmpty(), JSONObject(payload))\n  }\n  override fun deliveryComplete(token: IMqttDeliveryToken?) = Unit\n})\nval options = MqttConnectOptions().apply { isAutomaticReconnect = true }\nclient.connect(options, null, object : IMqttActionListener {\n  override fun onSuccess(token: IMqttToken?) {\n    client.subscribe("sensors/+/reading", 1)\n  }\n  override fun onFailure(token: IMqttToken?, cause: Throwable?) {\n    onBrokerState(false)\n  }\n})',
        explanation:
          'This illustrates the Paho asynchronous MQTT v3 client; add its current Android-compatible dependency and INTERNET permission. Use TLS, per-user or device-scoped credentials, topic ACLs, bounded callbacks, and lifecycle-aware disconnect. Do not embed shared broker credentials, and move callback updates onto the ViewModel/UI dispatcher. The current FastAPI example does not require the phone to connect directly to MQTT.',
        expectedOutput:
          'After a secure broker connection, the client subscribes to reading messages; broker loss is reported independently from ESP32 freshness.',
      },
      {
        title: 'Optional backend WebSocket stream',
        filename: 'ReadingSocket.kt',
        language: 'kotlin',
        code: 'val request = Request.Builder()\n  .url("wss://api.example.com/ws/readings")\n  .build()\nval socket = okHttpClient.newWebSocket(request, object : WebSocketListener() {\n  override fun onMessage(webSocket: WebSocket, text: String) {\n    onReadingMessage(JSONObject(text))\n  }\n  override fun onFailure(\n    webSocket: WebSocket,\n    error: Throwable,\n    response: Response?,\n  ) {\n    onStreamError(error)\n  }\n})\n\n// Close from the lifecycle owner when the screen no longer needs the stream.\nsocket.close(1000, "screen stopped")',
        explanation:
          'Add OkHttp and implement the matching authenticated wss:// endpoint on the backend; the example URL is not an existing project route. Listener callbacks run asynchronously, so dispatch state updates to the ViewModel and close/reconnect with the Android lifecycle.',
        expectedOutput:
          'A secured server stream can update readings while connected; failures become an explicit reconnectable state.',
      },
    ],
    diagram: {
      title: 'ESP32 → Raspberry Pi → Android',
      nodes: [
        'Sensors publish from ESP32',
        'Pi receives MQTT and stores SQLite history',
        'FastAPI exposes secure REST',
        'Android fetches and charts readings',
      ],
    },
    activity:
      'Build a Kotlin dashboard for all six sensor fields. Include API status, last-reading freshness, retry, and distinct null, stale, and offline states.',
    quiz: [
      question(
        'Multiple choice',
        'Which endpoint returns the current reading in the project API?',
        'GET /api/readings/current',
        ['GET /api/health/current', 'POST /api/build'],
        'The sample FastAPI service exposes current sensor data at /api/readings/current.',
      ),
      question(
        'True or false',
        'mqtt_connected=true proves the ESP32 has just sent a sensor reading.',
        'False',
        ['True', 'Only when using Retrofit'],
        'It describes backend-to-broker connectivity; device presence requires freshness or heartbeat data.',
      ),
      question(
        'Code reading',
        'How should a null light_lux field appear?',
        'Unavailable/missing, not a measured zero',
        ['0 lux automatically', 'A failed Android build'],
        'A missing value and a measured zero have different meaning.',
      ),
    ],
    docs: [docs.retrofit, docs.architecture, docs.developers, docs.api],
  },
  {
    slug: 'android-build-deploy',
    title: 'Building and Deploying Android Applications',
    level: 'Intermediate–Advanced',
    minutes: 60,
    summary:
      'Build variants, run tests, create APK/AAB outputs, sign releases, and prepare Play uploads.',
    objectives: [
      'Distinguish debug/release build types and product flavors.',
      'Build and install an APK with Gradle or Android Studio.',
      'Create a signed release and Android App Bundle while protecting signing credentials.',
    ],
    prerequisites: [
      'A working Android project',
      'A release keystore only when preparing a release build',
    ],
    sections: [
      {
        title: 'Build variants and testing',
        body: 'Build variants combine build types such as debug and release with optional product flavors. Debug builds are debuggable and typically signed with a development key. Release builds should be optimized and signed with a protected upload/release key. Test with unit tests, instrumented tests, emulator configurations, and physical devices.',
      },
      {
        title: 'Generate APK or App Bundle',
        body: 'Use Android Studio Build menus or the Gradle wrapper. A debug APK can be installed directly for testing. A release APK is useful for direct distribution where appropriate. Google Play generally uses Android App Bundles (AAB), which Play uses to generate optimized APKs for devices. Store release artifacts and signing credentials securely.',
      },
      {
        title: 'Signing and Play preparation',
        body: 'Use Build → Generate Signed Bundle / APK and create or select a keystore. Keep passwords and keystore files out of source control and backups must be secure. Check application ID, versionCode/versionName, target API requirements, privacy disclosures, permissions, app content, testing tracks, and Play Console policies before release. Never promise that a successful build guarantees store approval.',
      },
    ],
    steps: [
      {
        title: 'Run tests and choose variant',
        detail:
          'Run unit and device tests, review debug/release configuration, and select the intended flavor/build variant.',
      },
      {
        title: 'Build a debug APK',
        detail:
          'Run the Gradle wrapper assembleDebug task or Build APK(s) in Android Studio, then install the output on a test device.',
      },
      {
        title: 'Generate a signed release',
        detail:
          'Use the signed bundle wizard, create/protect signing credentials, and generate a release APK or AAB.',
      },
      {
        title: 'Verify before distribution',
        detail:
          'Check package identity, version, permissions, device install, crash-free startup, and Play Console requirements.',
      },
    ],
    examples: [
      {
        title: 'Gradle wrapper build commands',
        filename: 'PowerShell in project root',
        language: 'bash',
        code: '.\\gradlew.bat testDebugUnitTest\n.\\gradlew.bat assembleDebug\n.\\gradlew.bat assembleRelease\n.\\gradlew.bat bundleRelease',
        explanation:
          'Use the project’s committed Gradle wrapper. A signed release requires signing configuration or Android Studio’s signed bundle wizard; keep credentials in a secure local/CI secret store and never commit them.',
        expectedOutput:
          'The debug APK is under app/build/outputs/apk/debug/; the release bundle is under app/build/outputs/bundle/release/ when configured.',
      },
      {
        title: 'Install a debug APK',
        filename: 'Android SDK Platform-Tools',
        language: 'bash',
        code: 'adb install -r app/build/outputs/apk/debug/app-debug.apk',
        explanation:
          'Connect an authorized device or start an emulator first. The -r option reinstalls while preserving app data when package signing and identity are compatible.',
        expectedOutput:
          'adb reports Success and the debug app is available on the selected device.',
      },
    ],
    diagram: {
      title: 'Android release pipeline',
      nodes: [
        'Run tests and select variant',
        'Gradle packages APK/AAB',
        'Sign with protected key',
        'Test artifact then upload to Play',
      ],
    },
    activity:
      'Build and install a debug APK, then generate a signed AAB with a non-production practice key and document where the outputs are stored.',
    quiz: [
      question(
        'Multiple choice',
        'Which artifact is normally uploaded to Google Play for device-optimized delivery?',
        'Android App Bundle (.aab)',
        ['AndroidManifest.xml', 'Gradle cache'],
        'An AAB allows Play to generate device-specific APKs.',
      ),
      question(
        'True or false',
        'A release keystore password should be committed so teammates can build.',
        'False',
        ['True', 'Only to a private Git repository'],
        'Signing secrets must be managed securely outside source control.',
      ),
      question(
        'Code reading',
        'What does assembleDebug produce?',
        'A debug APK for installation/testing',
        ['A Play listing', 'An SDK platform'],
        'assembleDebug builds the debug variant APK for the selected module.',
      ),
    ],
    docs: [docs.gradle, docs.release, docs.studio, docs.developers],
  },
  {
    slug: 'complete-android-iot-app',
    title: 'Complete Android IoT Application',
    level: 'Advanced',
    minutes: 90,
    summary:
      'Combine Kotlin, Compose, FastAPI, Room, charts, offline states, and the ESP32 sensor pipeline.',
    objectives: [
      'Design an Android architecture for sensor dashboard and history features.',
      'Implement API, repository, Room cache, ViewModel state, and a Compose UI.',
      'Test stale data, API errors, disconnects, and app lifecycle behavior.',
    ],
    prerequisites: [
      'Completion of Kotlin, REST API, Room, and Android UI lessons',
      'A reachable FastAPI service or representative sample data',
      'Optional ESP32, Raspberry Pi, MQTT broker, and sensors',
    ],
    sections: [
      {
        title: 'Application architecture',
        body: 'Use a UI layer (Compose screen and ViewModel), a data layer (repository), and data sources (Retrofit API and Room DAO). The ViewModel exposes immutable UI state. The repository refreshes from FastAPI, stores successful readings locally, and lets the UI show cached history if the network fails. Keep API secrets and database credentials on trusted infrastructure.',
        bullets: [
          'Suggested files: MainActivity.kt, SensorDashboard.kt, SensorViewModel.kt, SensorRepository.kt, SensorApi.kt, ReadingDao.kt, SensorDatabase.kt, ReadingEntity.kt.',
          'Server architecture: ESP32 sensors → MQTT broker on Raspberry Pi → consumer persists SQLite → FastAPI REST → Android client.',
          'Add a heartbeat or recent-message field for ESP32 online state; backend broker status alone is not device status.',
        ],
      },
      {
        title: 'Refresh, charts, and history',
        body: 'Refresh on user action and at a bounded interval while the screen is active; prevent overlapping requests and cancel lifecycle-bound work. Show cached/stale timestamps, retry, and offline state. Preserve chronological chart order, units, and missing-data gaps. The sample project has REST only; add and secure WebSockets before using live streaming.',
      },
      {
        title: 'Test the full path',
        body: 'Test current data, empty database, null sensor values, malformed responses, stopped API, unavailable broker, stale device, and process recreation. Confirm no secrets are in the client, no HTTP requests block the main thread, and Room migration behavior is tested.',
      },
    ],
    steps: [
      {
        title: 'Define DTO and local entity',
        detail:
          'Map the FastAPI response to typed DTOs and convert valid readings to Room entities with a stable key.',
      },
      {
        title: 'Implement API and repository',
        detail:
          'Fetch current/history with Retrofit; upsert history in Room and expose cached Flow results.',
      },
      {
        title: 'Expose UI state',
        detail:
          'Use a ViewModel to provide loading, content, empty, stale, offline, and error states.',
      },
      {
        title: 'Build the dashboard',
        detail:
          'Render sensor cards, API and device freshness indicators, and an accessible history chart with units.',
      },
      {
        title: 'Run failure tests',
        detail:
          'Disconnect the API, MQTT broker, and ESP32 separately and verify the app describes each condition accurately.',
      },
    ],
    examples: [
      {
        title: 'Repository refresh and cache',
        filename: 'SensorRepository.kt',
        language: 'kotlin',
        code: 'class SensorRepository(\n  private val api: SensorApi,\n  private val dao: ReadingDao,\n) {\n  fun observeHistory(): Flow<List<ReadingEntity>> = dao.observeRecent(100)\n\n  suspend fun refresh(): Result<Unit> = runCatching {\n    val response = api.history()\n    check(response.isSuccessful) { "History API: ${response.code()}" }\n    val readings = requireNotNull(response.body()).readings\n    dao.upsertAll(readings.map(SensorReading::toEntity))\n  }\n}',
        explanation:
          'This illustrative repository keeps networking and persistence out of the Composable. Define the DTO mapping, response envelope, error model, Room DAO, and Retrofit service for your project; avoid swallowing the Result failure.',
        expectedOutput:
          'Successful history refreshes update Room, while failure remains available for the ViewModel to show alongside cached rows.',
      },
      {
        title: 'ViewModel UI state',
        filename: 'SensorViewModel.kt',
        language: 'kotlin',
        code: 'data class DashboardUiState(\n  val readings: List<ReadingEntity> = emptyList(),\n  val refreshing: Boolean = false,\n  val error: String? = null,\n)\n\nfun refresh() = viewModelScope.launch {\n  _state.update { it.copy(refreshing = true, error = null) }\n  val result = repository.refresh()\n  _state.update { current ->\n    current.copy(refreshing = false, error = result.exceptionOrNull()?.message)\n  }\n}',
        explanation:
          'The ViewModel owns screen state and performs work in a lifecycle-aware coroutine. In a complete implementation, collect the DAO Flow into state and map low-level exceptions to safe user-facing messages.',
        expectedOutput:
          'The UI shows refresh progress and an explicit error while cached data remains visible.',
      },
      {
        title: 'Compose dashboard skeleton',
        filename: 'SensorDashboard.kt',
        language: 'kotlin',
        code: '@Composable\nfun SensorDashboard(state: DashboardUiState, onRefresh: () -> Unit) {\n  Column(Modifier.fillMaxSize().verticalScroll(rememberScrollState()).padding(16.dp)) {\n    Button(onClick = onRefresh, enabled = !state.refreshing) {\n      Text(if (state.refreshing) "Refreshing…" else "Refresh readings")\n    }\n    state.error?.let { Text("Could not refresh: $it") }\n    state.readings.take(1).forEach { reading ->\n      SensorCard("Distance", reading.tofDistanceMm, "mm")\n      SensorCard("Light", reading.lightLux, "lux")\n      SensorCard("Soil", reading.soilMoisturePercent, "%")\n    }\n    LightHistoryChart(state.readings.asReversed().mapNotNull { it.lightLux?.toFloat() })\n  }\n}\n\n@Composable\nfun LightHistoryChart(values: List<Float>) {\n  if (values.isEmpty()) {\n    Text("No light history yet")\n    return\n  }\n  val maxValue = (values.maxOrNull() ?: 1f).coerceAtLeast(1f)\n  Column {\n    Text("Light intensity (lux)")\n    Canvas(\n      Modifier.fillMaxWidth().height(180.dp)\n        .semantics { contentDescription = "Light intensity history chart" },\n    ) {\n      val xStep = if (values.size > 1) size.width / (values.size - 1) else 0f\n      val points = values.mapIndexed { index, value ->\n        Offset(index * xStep, size.height - (value / maxValue * size.height))\n      }\n      if (points.size == 1) drawCircle(Color.Cyan, 5.dp.toPx(), points.first())\n      points.zipWithNext().forEach { (start, end) ->\n        drawLine(Color.Cyan, start, end, strokeWidth = 3.dp.toPx())\n      }\n    }\n    Text("Showing ${values.size} readings; values are scaled to the visible maximum.")\n  }\n}',
        explanation:
          'This example draws a real Compose Canvas line chart from chronologically ordered cached lux values and provides an empty state and text summary. Add axis labels/time ticks and preserve null gaps in a production chart; add Material theme and state collection at the Activity/navigation boundary.',
        expectedOutput:
          'A scrollable dashboard provides refresh, an error message, cached measurements, and a rendered line graph of light history.',
      },
    ],
    diagram: {
      title: 'Complete IoT mobile application',
      nodes: [
        'ESP32 reads ToF, BH1750, soil',
        'MQTT + Pi stores history',
        'FastAPI REST serves readings',
        'Android Retrofit → Room → Compose dashboard',
      ],
    },
    activity:
      'Build the end-to-end app with six sensor fields, Room history, a chart, refresh, explicit offline/stale states, and tests for missing values and each disconnected layer.',
    quiz: [
      question(
        'Multiple choice',
        'Which Android layer should coordinate API refresh and local cache updates?',
        'Repository in the data layer',
        ['Composable button body', 'AndroidManifest.xml'],
        'A repository coordinates data sources and keeps networking/persistence out of the UI.',
      ),
      question(
        'True or false',
        'A cached reading should be labeled with its timestamp when the network is unavailable.',
        'True',
        ['False', 'Only when lux is present'],
        'Showing freshness lets users distinguish current readings from stale cached values.',
      ),
      question(
        'Code reading',
        'What should the dashboard do when soil_moisture_percent is null?',
        'Display unavailable while preserving other readings',
        ['Crash the whole screen', 'Replace it with 0%'],
        'A missing sensor should not hide healthy values or be misrepresented as a measurement.',
      ),
    ],
    docs: [docs.architecture, docs.compose, docs.room, docs.retrofit, docs.developers],
  },
]

export const androidStudioLessonSlugs = [
  ...androidStudioLessons.map((lesson) => lesson.slug),
  'android-final-assessment',
]

export const androidStudioFinalAssessment: AndroidQuizQuestion[] = [
  question(
    'Multiple choice',
    'What is Android Studio?',
    'The official Android IDE',
    ['A programming language', 'A database engine'],
    'Android Studio is Google’s official Android IDE.',
  ),
  question(
    'Multiple choice',
    'Which library provides an abstraction over SQLite?',
    'Room',
    ['Retrofit', 'Logcat'],
    'Room provides entities, DAOs, and database access over SQLite.',
  ),
  question(
    'True or false',
    'The Android emulator commonly reaches the host computer using 10.0.2.2.',
    'True',
    ['False', 'Only over Bluetooth'],
    '10.0.2.2 is the Android emulator host loopback alias.',
  ),
  question(
    'True or false',
    'The health field mqtt_connected proves the ESP32 is online.',
    'False',
    ['True', 'Only when the API returns 200'],
    'Broker connectivity and ESP32 heartbeat/freshness are different signals.',
  ),
  question(
    'Code reading',
    'Where should a production database password be stored?',
    'On the trusted backend',
    ['In the APK', 'In a committed Gradle file'],
    'Mobile packages can be inspected; keep database credentials server-side.',
  ),
  question(
    'Code reading',
    'Which artifact is normally used for Play optimized delivery?',
    'Android App Bundle (.aab)',
    ['strings.xml', 'AndroidManifest.xml'],
    'Play uses the app bundle to generate optimized APKs for devices.',
  ),
]
