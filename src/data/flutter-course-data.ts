export type FlutterLevel =
  'Beginner' | 'Beginner–Intermediate' | 'Intermediate' | 'Intermediate–Advanced' | 'Advanced'

export interface FlutterCodeExample {
  title: string
  filename: string
  language: string
  code: string
  explanation: string
  expectedOutput: string
}

export interface FlutterQuizOption {
  label: string
  correct: boolean
  feedback: string
}

export interface FlutterQuizQuestion {
  type: 'Multiple choice' | 'True or false' | 'Code reading'
  question: string
  options: FlutterQuizOption[]
}

export interface FlutterLesson {
  slug: string
  title: string
  level: FlutterLevel
  minutes: number
  summary: string
  objectives: string[]
  prerequisites: string[]
  sections: { title: string; body: string; bullets?: string[]; note?: string }[]
  steps: { title: string; detail: string }[]
  examples: FlutterCodeExample[]
  diagram: { title: string; nodes: string[] }
  activity: string
  quiz: FlutterQuizQuestion[]
  docs: { label: string; href: string }[]
}

const docs = {
  flutter: { label: 'Flutter documentation', href: 'https://docs.flutter.dev/' },
  install: { label: 'Install Flutter', href: 'https://docs.flutter.dev/install' },
  dart: { label: 'Dart documentation', href: 'https://dart.dev/' },
  language: { label: 'Dart language tour', href: 'https://dart.dev/language' },
  packages: { label: 'Flutter packages', href: 'https://pub.dev/' },
  android: { label: 'Android Studio', href: 'https://developer.android.com/studio' },
  cookbook: { label: 'Flutter cookbook', href: 'https://docs.flutter.dev/cookbook' },
  navigation: { label: 'Navigation and routing', href: 'https://docs.flutter.dev/ui/navigation' },
  architecture: {
    label: 'Flutter app architecture',
    href: 'https://docs.flutter.dev/app-architecture',
  },
  networking: {
    label: 'Fetch data from the internet',
    href: 'https://docs.flutter.dev/cookbook/networking/fetch-data',
  },
  persistence: {
    label: 'Persistence cookbook',
    href: 'https://docs.flutter.dev/cookbook/persistence',
  },
  platform: {
    label: 'Android platform setup',
    href: 'https://docs.flutter.dev/platform-integration/android/setup',
  },
  deployment: {
    label: 'Build and release Android apps',
    href: 'https://docs.flutter.dev/deployment/android',
  },
  dartNullSafety: { label: 'Dart null safety', href: 'https://dart.dev/null-safety' },
}

const question = (
  type: FlutterQuizQuestion['type'],
  prompt: string,
  correct: string,
  distractors: string[],
  feedback: string,
): FlutterQuizQuestion => ({
  type,
  question: prompt,
  options: [correct, ...distractors].map((label, index) => ({
    label,
    correct: index === 0,
    feedback: index === 0 ? feedback : `Not quite. ${feedback}`,
  })),
})

export const flutterLessons: FlutterLesson[] = [
  {
    slug: 'flutter-introduction',
    title: 'Introduction to Flutter',
    level: 'Beginner',
    minutes: 25,
    summary:
      'Understand Flutter, Dart, its rendering model, and where it fits among cross-platform tools.',
    objectives: [
      'Explain how Flutter and Dart work together.',
      'Describe Flutter widgets, rendering, and supported platforms.',
      'Compare Flutter with React Native, Ionic, and Capacitor.',
    ],
    prerequisites: [
      'A computer and a modern browser',
      'Basic familiarity with programming is helpful but not required',
    ],
    sections: [
      {
        title: 'Flutter and Dart',
        body: 'Flutter is an open-source UI toolkit for building applications from one codebase. Dart is the strongly typed, null-safe language used to write Flutter apps. Flutter ships with the Dart SDK, so a separate Dart installation is usually unnecessary for Flutter development.',
        bullets: [
          'A widget describes a piece of the interface or its behavior.',
          'Flutter composes widgets into a tree and renders its own controls rather than translating each widget to a native UI component.',
          'The same project can target Android, iOS, web, Windows, macOS, and Linux, subject to platform support and project requirements.',
        ],
      },
      {
        title: 'Architecture and trade-offs',
        body: 'A Flutter application starts in Dart, builds a widget tree, and uses the Flutter framework and engine to lay out and paint pixels. Plugins connect Dart code to platform APIs when hardware or operating-system integration is needed. Flutter offers a consistent UI and shared business logic, but teams must learn Dart, validate every plugin on each platform, and still perform native signing and store-release work.',
        note: 'Flutter uses Dart and Flutter widgets. React Native uses JavaScript or TypeScript with native-backed components; Ionic uses web UI and often Capacitor to package it in a native WebView shell. No approach is best for every application.',
      },
      {
        title: 'Choosing the right tool',
        body: 'Flutter suits teams that want a custom cross-platform UI and a single Dart codebase. React Native can suit teams with JavaScript or React experience. Ionic plus Capacitor can be effective when reusing an existing web application is the priority. Compare accessibility, performance, native integrations, team skills, offline behavior, and app-store needs before choosing.',
      },
    ],
    steps: [
      {
        title: 'Trace the widget tree',
        detail:
          'Start at runApp, identify the root MaterialApp, and follow home to the screen Scaffold and its child widgets.',
      },
      {
        title: 'Trace a platform feature',
        detail:
          'A screen calls a Dart plugin API; the plugin’s Android or iOS implementation requests permission and talks to the operating system.',
      },
      {
        title: 'Choose by project constraints',
        detail:
          'Write down the target platforms, existing code to reuse, performance needs, native features, and the team’s strongest skills.',
      },
    ],
    examples: [
      {
        title: 'Flutter app shape',
        filename: 'lib/main.dart',
        language: 'dart',
        code: "import 'package:flutter/material.dart';\n\nvoid main() => runApp(const SensorApp());\n\nclass SensorApp extends StatelessWidget {\n  const SensorApp({super.key});\n\n  @override\n  Widget build(BuildContext context) => const MaterialApp(\n        home: Scaffold(\n          body: Center(child: Text('Hello, Flutter!')),\n        ),\n      );\n}",
        explanation:
          'Dart defines the app entry point and Flutter widgets. MaterialApp supplies app-level behavior; Scaffold provides a screen structure.',
        expectedOutput: 'A Flutter app renders “Hello, Flutter!” centered in its first screen.',
      },
    ],
    diagram: {
      title: 'From Dart code to screen',
      nodes: [
        'Dart application',
        'Flutter widget and rendering framework',
        'Flutter engine and platform embedder',
        'Android, iOS, web, or desktop screen',
      ],
    },
    activity:
      'Pick Flutter, React Native, or Ionic + Capacitor for a sample project. Explain your choice using two project requirements and one trade-off.',
    quiz: [
      question(
        'Multiple choice',
        'Which language is used to write Flutter application code?',
        'Dart',
        ['Kotlin only', 'TypeScript only'],
        'Dart is the primary language for Flutter apps.',
      ),
      question(
        'True or false',
        'Flutter maps every Flutter widget directly to a corresponding native UI widget.',
        'False',
        ['True', 'Only on Android'],
        'Flutter renders its own UI; plugins provide access to platform APIs.',
      ),
    ],
    docs: [docs.flutter, docs.dart, docs.architecture],
  },
  {
    slug: 'flutter-setup',
    title: 'Prerequisites and Installation',
    level: 'Beginner',
    minutes: 40,
    summary:
      'Install Flutter, Android tooling, editor support, and verify a development environment.',
    objectives: [
      'Install the Flutter SDK and configure PATH.',
      'Set up Android Studio, SDK tools, and an emulator or device.',
      'Use flutter doctor and create a starter app.',
    ],
    prerequisites: [
      'A supported development computer with internet access',
      'Administrator permission may be needed for drivers or SDK setup',
    ],
    sections: [
      {
        title: 'Install Flutter and Dart',
        body: 'Install the stable Flutter SDK using the current official instructions for your operating system or the VS Code Flutter extension. Add the Flutter SDK’s bin directory to PATH. Flutter includes its compatible Dart SDK; use the bundled Dart version for a Flutter project unless you have a separate Dart-only workflow.',
      },
      {
        title: 'Android development tools',
        body: 'Install Android Studio and its Android SDK Platform, Build-Tools, Command-line Tools, Platform-Tools, and Emulator. Create an emulator from Device Manager or connect a phone with USB debugging enabled. Android Studio also supplies a compatible Java runtime used by Android builds.',
      },
      {
        title: 'Editor and validation',
        body: 'Install the Flutter and Dart extensions in VS Code, or use Android Studio’s Flutter and Dart support. Run flutter doctor to see which target-platform requirements still need attention; read each reported item and follow the linked setup guide.',
      },
    ],
    steps: [
      {
        title: 'Install the Flutter SDK',
        detail:
          'Follow the official install guide for your OS, extract Flutter to a writable folder, and add its bin directory to PATH. Restart the terminal afterward.',
      },
      {
        title: 'Install Android Studio components',
        detail:
          'Use SDK Manager to install a current Android SDK and command-line tools. Use Device Manager to create a virtual device if you do not have a phone.',
      },
      {
        title: 'Accept Android SDK licenses',
        detail:
          'Run flutter doctor --android-licenses, review the licenses, and accept as appropriate for your environment.',
      },
      {
        title: 'Check and run a starter project',
        detail:
          'Run flutter doctor, flutter --version, and dart --version; then create and launch the sample project on a selected device.',
      },
    ],
    examples: [
      {
        title: 'Verify and create',
        filename: 'Terminal',
        language: 'bash',
        code: 'flutter doctor\nflutter --version\ndart --version\nflutter create my_first_app\ncd my_first_app\nflutter run',
        explanation:
          'The Flutter SDK installs Dart alongside Flutter. The doctor command reports missing platform prerequisites; create scaffolds a project, and run launches it on an available target.',
        expectedOutput:
          'flutter doctor lists checked toolchains, version commands print installed versions, and flutter run builds and opens the starter app on the selected device.',
      },
      {
        title: 'Android license check',
        filename: 'Terminal',
        language: 'bash',
        code: 'flutter doctor --android-licenses\nflutter doctor -v',
        explanation:
          'The first command walks through Android SDK licenses. Verbose doctor output includes extra environment details for diagnosing setup problems.',
        expectedOutput:
          'Android toolchain checks pass once required SDK components and licenses are configured.',
      },
    ],
    diagram: {
      title: 'A Flutter Android workstation',
      nodes: [
        'Flutter SDK (includes Dart)',
        'VS Code or Android Studio',
        'Android SDK and Java toolchain',
        'Emulator or USB-debugging phone',
      ],
    },
    activity:
      'Install Flutter on your own machine, run flutter doctor, and write down any unresolved check with the exact suggested fix.',
    quiz: [
      question(
        'Multiple choice',
        'Which command diagnoses a Flutter toolchain setup?',
        'flutter doctor',
        ['flutter diagnose --all', 'dart doctor'],
        'flutter doctor checks the Flutter SDK and installed platform toolchains.',
      ),
      question(
        'True or false',
        'Flutter includes a Dart SDK for developing Flutter apps.',
        'True',
        ['False', 'Only after installing Android Studio'],
        'The Flutter SDK bundles the Dart SDK version it supports.',
      ),
    ],
    docs: [docs.install, docs.android, docs.platform],
  },
  {
    slug: 'flutter-project-structure',
    title: 'Understanding Flutter Project Structure',
    level: 'Beginner',
    minutes: 30,
    summary: 'Explore main.dart, lib, pubspec.yaml, assets, platform folders, and core widgets.',
    objectives: [
      'Identify important project files and directories.',
      'Explain MaterialApp, Scaffold, StatelessWidget, and StatefulWidget.',
      'Register assets and dependencies.',
    ],
    prerequisites: ['Flutter SDK installed', 'A Flutter project generated with flutter create'],
    sections: [
      {
        title: 'Files and folders',
        body: 'lib/ contains the Dart application source; lib/main.dart is a common entry point. pubspec.yaml declares package dependencies, fonts, and assets. test/ contains tests. android/ and ios/ hold platform-specific projects, while web/, windows/, macos/, and linux/ appear when those targets are enabled. Generated build output should not be edited as source.',
      },
      {
        title: 'Build the first screen',
        body: 'main() calls runApp. MaterialApp configures navigation, theme, and app-level Material behavior. Scaffold gives a standard page layout with appBar, body, floatingActionButton, and other slots. StatelessWidget is appropriate when the UI depends only on immutable inputs; StatefulWidget holds mutable state that can change over time.',
      },
      {
        title: 'Assets and dependencies',
        body: 'Add packages under dependencies or dev_dependencies in pubspec.yaml, then run flutter pub get. Declare asset paths under flutter: assets: and use a pubspec indent of two spaces. Asset file names and paths are case-sensitive on many target filesystems.',
      },
    ],
    steps: [
      {
        title: 'Inspect the starter project',
        detail:
          'Open pubspec.yaml, lib/main.dart, test/, and android/. Separate application source from generated build artifacts.',
      },
      {
        title: 'Create a screen widget',
        detail:
          'Compose MaterialApp → Scaffold → AppBar and body widgets. Use const constructors when all values are compile-time constants.',
      },
      {
        title: 'Register an image asset',
        detail:
          'Place an image in assets/images/, list that directory under flutter: assets: in pubspec.yaml, and load it with Image.asset.',
      },
    ],
    examples: [
      {
        title: 'Widget structure',
        filename: 'lib/main.dart',
        language: 'dart',
        code: "import 'package:flutter/material.dart';\n\nvoid main() => runApp(const MyApp());\n\nclass MyApp extends StatelessWidget {\n  const MyApp({super.key});\n\n  @override\n  Widget build(BuildContext context) => MaterialApp(\n        title: 'Learning App',\n        theme: ThemeData(colorSchemeSeed: Colors.teal),\n        home: Scaffold(\n          appBar: AppBar(title: const Text('Dashboard')),\n          body: const Center(child: Text('Welcome')),\n        ),\n      );\n}",
        explanation:
          'The widget tree is explicit: MyApp builds MaterialApp, which configures a Scaffold screen containing an AppBar and centered text.',
        expectedOutput: 'A themed screen with a Dashboard app bar and centered Welcome label.',
      },
    ],
    diagram: {
      title: 'Project and widget structure',
      nodes: [
        'pubspec.yaml: packages and assets',
        'lib/main.dart: Dart entry point',
        'MaterialApp: app theme and navigation',
        'Scaffold: screen layout and child widgets',
      ],
    },
    activity:
      'Add a small local image to a new assets/images folder, declare it in pubspec.yaml, and render it above the welcome text.',
    quiz: [
      question(
        'Multiple choice',
        'Where do Flutter projects normally declare packages and bundled assets?',
        'pubspec.yaml',
        ['analysis_options.yaml', 'android/gradle.properties'],
        'pubspec.yaml is the package manifest and also declares Flutter assets.',
      ),
      question(
        'True or false',
        'A StatelessWidget should own mutable state that changes as a user taps a button.',
        'False',
        ['True', 'Only if const'],
        'Use StatefulWidget or a state-management solution for changing UI state.',
      ),
    ],
    docs: [docs.flutter, docs.cookbook, docs.packages],
  },
  {
    slug: 'dart-fundamentals',
    title: 'Dart Programming Fundamentals',
    level: 'Beginner–Intermediate',
    minutes: 55,
    summary:
      'Practice Dart types, collections, control flow, functions, classes, null safety, and async code.',
    objectives: [
      'Use Dart variables, collections, functions, and classes.',
      'Understand null safety and nullable types.',
      'Explain Future, async/await, and Stream.',
    ],
    prerequisites: ['Dart SDK from Flutter', 'A Dart-capable editor or DartPad'],
    sections: [
      {
        title: 'Types and control flow',
        body: 'Dart supports String, int, double, bool, List, Map, and inferred local variables with var or final. Use if/else, switch, for, for-in, and while for control flow. Prefer final when a local reference should not be reassigned and const for compile-time constants.',
      },
      {
        title: 'Functions and objects',
        body: 'Functions can use positional, named, optional, and default parameters. Classes define fields and methods; constructors initialize objects. Dart supports inheritance and interfaces, but composition and small focused classes often make app code easier to maintain.',
      },
      {
        title: 'Null safety and asynchronous work',
        body: 'A non-nullable String cannot contain null; String? is nullable. Use a null check or safe handling rather than adding ! without proof. Future represents a result available later, while Stream represents a sequence of asynchronous values. async and await make Future-based code easier to read; handle errors with try/catch.',
      },
    ],
    steps: [
      {
        title: 'Declare values',
        detail:
          'Use typed declarations or inference; choose final for values assigned once and nullable types only when null is meaningful.',
      },
      {
        title: 'Model data',
        detail:
          'Create a class with a named constructor and typed fields, then convert decoded JSON into that model.',
      },
      {
        title: 'Handle asynchronous values',
        detail:
          'Mark a function async, await a Future inside it, and catch expected failures at the appropriate boundary.',
      },
    ],
    examples: [
      {
        title: 'Types and functions',
        filename: 'bin/main.dart',
        language: 'dart',
        code: "String describeReading(double? celsius) {\n  if (celsius == null) return 'No reading';\n  return 'Temperature: ${celsius.toStringAsFixed(1)} C';\n}\n\nvoid main() {\n  final readings = <String, double>{'room': 22.5};\n  for (final entry in readings.entries) {\n    print('${entry.key}: ${describeReading(entry.value)}');\n  }\n}",
        explanation:
          'A nullable double represents a missing sensor value. A typed Map stores readings and entries enables iteration.',
        expectedOutput: 'room: Temperature: 22.5 C',
      },
      {
        title: 'Class and async',
        filename: 'bin/main.dart',
        language: 'dart',
        code: "class Reading {\n  const Reading({required this.lux});\n  final double lux;\n}\n\nFuture<Reading> loadReading() async {\n  await Future<void>.delayed(const Duration(milliseconds: 100));\n  return const Reading(lux: 245.0);\n}\n\nFuture<void> main() async {\n  final reading = await loadReading();\n  print('Light: ${reading.lux} lux');\n}",
        explanation:
          'The class stores typed data. loadReading returns a Future, and main awaits its eventual Reading result.',
        expectedOutput: 'Light: 245.0 lux',
      },
    ],
    diagram: {
      title: 'Dart data and async flow',
      nodes: [
        'Typed input and nullable values',
        'Function or model transforms data',
        'Future / Stream returns later values',
        'UI renders data and handles errors',
      ],
    },
    activity:
      'Write a SensorReading class with nullable distance, light, and soil fields. Add a function that returns “offline” when all three are absent.',
    quiz: [
      question(
        'Code reading',
        'What does String? mean in Dart?',
        'The value can be a String or null',
        ['The value is always a String', 'The value is a Future<String>'],
        'The question mark makes the type nullable.',
      ),
      question(
        'Multiple choice',
        'Which Dart type represents one value that will be available later?',
        'Future<T>',
        ['List<T>', 'Map<T>'],
        'Future<T> represents a single asynchronous result or error.',
      ),
      question(
        'True or false',
        'A Stream represents a sequence of asynchronous values over time.',
        'True',
        ['False', 'Only a Future'],
        'Streams can emit multiple values asynchronously.',
      ),
    ],
    docs: [docs.language, docs.dartNullSafety],
  },
  {
    slug: 'flutter-ui-development',
    title: 'Flutter UI Development',
    level: 'Beginner–Intermediate',
    minutes: 55,
    summary: 'Build responsive Material screens with layout, forms, lists, and validation widgets.',
    objectives: [
      'Compose layouts with common Flutter widgets.',
      'Build and validate forms.',
      'Create responsive dashboards and lists.',
    ],
    prerequisites: ['Dart fundamentals', 'A working Flutter project'],
    sections: [
      {
        title: 'Layout building blocks',
        body: 'Container decorates or constrains a child. Padding adds internal spacing; Flutter does not provide a CSS-style margin property on every widget, so use padding or layout spacing deliberately. Row and Column arrange children horizontally and vertically. Stack layers children. Expanded and Flexible distribute available space.',
      },
      {
        title: 'Input and collections',
        body: 'TextField captures input; Form and TextFormField support validation with a GlobalKey<FormState>. ListView.builder and GridView.builder lazily build large collections. Images can come from assets or network URLs; handle loading and errors for remote images.',
      },
      {
        title: 'Responsive design',
        body: 'Use LayoutBuilder or MediaQuery to adapt to available space. Prefer flexible constraints over fixed phone-sized widths. Material widgets such as AppBar, NavigationBar, Card, and FilledButton provide accessible platform-consistent patterns.',
      },
    ],
    steps: [
      {
        title: 'Sketch the hierarchy',
        detail:
          'Plan the Scaffold, app bar, body layout, and reusable sections before adding styling.',
      },
      {
        title: 'Build a form',
        detail:
          'Add TextFormField validators and call validate on the FormState before submitting.',
      },
      {
        title: 'Adapt the dashboard',
        detail:
          'Use LayoutBuilder to choose a one- or two-column dashboard based on available width, not device model names.',
      },
    ],
    examples: [
      {
        title: 'Responsive sensor cards',
        filename: 'lib/dashboard.dart',
        language: 'dart',
        code: "LayoutBuilder(\n  builder: (context, constraints) {\n    final columns = constraints.maxWidth >= 700 ? 2 : 1;\n    return GridView.count(\n      crossAxisCount: columns,\n      shrinkWrap: true,\n      physics: const NeverScrollableScrollPhysics(),\n      children: const [\n        Card(child: ListTile(title: Text('Distance'), subtitle: Text('320 mm'))),\n        Card(child: ListTile(title: Text('Light'), subtitle: Text('245 lux'))),\n      ],\n    );\n  },\n)",
        explanation:
          'LayoutBuilder reads the actual parent constraints. The grid uses two columns on wider layouts and one on narrow mobile screens.',
        expectedOutput:
          'Two sensor cards display in one column on a phone and two columns when at least 700 logical pixels are available.',
      },
      {
        title: 'Validated form',
        filename: 'lib/login_form.dart',
        language: 'dart',
        code: "final formKey = GlobalKey<FormState>();\n\nForm(\n  key: formKey,\n  child: Column(children: [\n    TextFormField(\n      decoration: const InputDecoration(labelText: 'Email'),\n      validator: (value) => value != null && value.contains('@')\n          ? null\n          : 'Enter a valid email address',\n    ),\n    FilledButton(\n      onPressed: () {\n        if (formKey.currentState!.validate()) {\n          // Send the validated form to the authentication API.\n        }\n      },\n      child: const Text('Sign in'),\n    ),\n  ]),\n)",
        explanation:
          'Form validates its TextFormField children before an authentication request. A complete screen should also validate passwords, show request errors, and avoid logging credentials.',
        expectedOutput:
          'An invalid email displays inline feedback; a valid form can continue to the backend request.',
      },
    ],
    diagram: {
      title: 'From screen structure to responsive layout',
      nodes: [
        'Scaffold and AppBar',
        'LayoutBuilder reads constraints',
        'Row, Column, or GridView arranges widgets',
        'Cards and controls adapt to available width',
      ],
    },
    activity:
      'Create a login screen with email and password validators, a submit button, and a layout that remains usable on a narrow phone.',
    quiz: [
      question(
        'Multiple choice',
        'Which widget builds a large scrollable list lazily?',
        'ListView.builder',
        ['Column with every item', 'Center'],
        'ListView.builder builds visible children as needed.',
      ),
      question(
        'True or false',
        'A fixed width sized for a large phone is the best way to support tablets and small phones.',
        'False',
        ['True', 'Only for landscape'],
        'Use constraints and flexible layout to adapt across screen sizes.',
      ),
    ],
    docs: [docs.cookbook, docs.flutter],
  },
  {
    slug: 'navigation-state-management',
    title: 'Navigation and State Management',
    level: 'Intermediate',
    minutes: 45,
    summary:
      'Navigate between screens, pass data, and select state tools appropriate to app complexity.',
    objectives: [
      'Navigate with Navigator and named routes.',
      'Pass typed data to another screen.',
      'Compare setState, Provider, and Riverpod.',
    ],
    prerequisites: ['Flutter widgets and Dart classes', 'A sample app with at least two screens'],
    sections: [
      {
        title: 'Moving between screens',
        body: 'Navigator pushes a route onto the navigation stack and pops to return. Pass constructor arguments or route arguments for screen data. For more complex deep links, nested navigation, and URL synchronization, choose and configure a routing approach deliberately; do not mix incompatible route systems without a plan.',
      },
      {
        title: 'Local state and shared state',
        body: 'setState is suitable for small, local widget state. Provider exposes dependencies and state through the widget tree. Riverpod offers a separate provider model and testable dependency handling. Pick one state approach based on team needs; a package is not required for every screen.',
      },
      {
        title: 'State lifecycle',
        body: 'Keep UI state separate from network and persistence concerns as an app grows. A view model or controller can own loading, data, and error state; widgets render those states and call actions. Dispose controllers and subscriptions when their owner is removed.',
      },
    ],
    steps: [
      {
        title: 'Create a destination screen',
        detail: 'Define a typed constructor that requires the data the screen needs.',
      },
      {
        title: 'Push and return',
        detail:
          'Use Navigator.push with a MaterialPageRoute, pass the object to the destination, and use Navigator.pop to return.',
      },
      {
        title: 'Choose a state scope',
        detail:
          'Use setState for a small widget. Use Provider or Riverpod when state or dependencies need broader access, testing, or lifecycle management.',
      },
    ],
    examples: [
      {
        title: 'Pass data with Navigator',
        filename: 'lib/reading_detail.dart',
        language: 'dart',
        code: "class ReadingDetail extends StatelessWidget {\n  const ReadingDetail({super.key, required this.sensorName});\n  final String sensorName;\n\n  @override\n  Widget build(BuildContext context) => Scaffold(\n        appBar: AppBar(title: Text(sensorName)),\n        body: Center(child: Text('Details for $sensorName')),\n      );\n}\n\nvoid openDetails(BuildContext context, String name) {\n  Navigator.of(context).push(\n    MaterialPageRoute<void>(\n      builder: (_) => ReadingDetail(sensorName: name),\n    ),\n  );\n}",
        explanation:
          'The route passes data through a typed constructor. Navigator manages the screen stack; the back action pops the route.',
        expectedOutput: 'Selecting a sensor opens a detail screen titled with that sensor’s name.',
      },
      {
        title: 'Shared state with Provider',
        filename: 'lib/reading_model.dart',
        language: 'dart',
        code: "import 'package:flutter/foundation.dart';\nimport 'package:provider/provider.dart';\n\nclass ReadingModel extends ChangeNotifier {\n  String? _status;\n  String? get status => _status;\n\n  void updateStatus(String value) {\n    _status = value;\n    notifyListeners();\n  }\n}\n\nChangeNotifierProvider(\n  create: (_) => ReadingModel(),\n  child: const SensorApp(),\n)",
        explanation:
          'Provider exposes one ChangeNotifier to descendant widgets. Add provider with flutter pub add provider, then listen with context.watch or context.select where needed.',
        expectedOutput:
          'Widgets listening to ReadingModel rebuild when update stores a new reading and calls notifyListeners.',
      },
    ],
    diagram: {
      title: 'UI, state, and navigation',
      nodes: [
        'User action in a widget',
        'setState / Provider / Riverpod updates state',
        'Navigator selects the next route',
        'Destination widget renders the supplied state',
      ],
    },
    activity:
      'Add a sensor list and detail route. Pass a sensor model to the detail page and add a button that returns a selected value.',
    quiz: [
      question(
        'Multiple choice',
        'Which approach is generally suitable for state used only by one small widget?',
        'setState',
        ['A database table', 'An HTTP interceptor'],
        'setState is often enough for local, short-lived widget state.',
      ),
      question(
        'True or false',
        'Navigator.push can open a route and Navigator.pop can return to the previous route.',
        'True',
        ['False', 'Only with Riverpod'],
        'Navigator manages a route stack using push and pop.',
      ),
    ],
    docs: [docs.navigation, docs.architecture, docs.packages],
  },
  {
    slug: 'backend-rest-api',
    title: 'Backend and REST API Integration',
    level: 'Intermediate',
    minutes: 55,
    summary:
      'Make REST requests, parse JSON, handle authentication and failures, and connect to FastAPI or Node.',
    objectives: [
      'Use the http package for REST requests.',
      'Parse JSON and model responses safely.',
      'Handle loading, errors, authentication, and reachable API URLs.',
    ],
    prerequisites: [
      'Dart async/await and JSON basics',
      'A backend URL reachable from the test device',
    ],
    sections: [
      {
        title: 'HTTP and JSON',
        body: 'Add the http package with flutter pub add http. Use Uri.https for HTTPS production APIs, request timeouts, and check status codes before parsing. Decode JSON to Map/List structures, validate expected fields, and convert to typed Dart models. A repository can keep widgets independent of transport details.',
      },
      {
        title: 'Methods, auth, and failure handling',
        body: 'GET reads, POST creates or triggers processing, PUT or PATCH updates, and DELETE removes resources. Send credentials in HTTPS authorization headers; store tokens in platform-secure storage rather than source code or ordinary preferences. Handle timeouts, connectivity failures, non-2xx statuses, invalid JSON, and empty responses explicitly. Never log access tokens.',
      },
      {
        title: 'CORS and network addressing',
        body: 'A phone cannot reach a development computer using localhost: that name points to the phone. Use the host’s LAN IPv4 for a physical device; Android emulator-to-host networking commonly uses 10.0.2.2. Permit only required local HTTP cleartext during development if Android blocks it; production APIs should use HTTPS. Browser CORS applies to Flutter web, not native Flutter HTTP clients.',
      },
      {
        title: 'FastAPI and Node.js',
        body: 'Both FastAPI and Node.js can expose JSON REST endpoints. The client should depend on the API contract, not the backend language. This project’s FastAPI sensor API returns the current record under a reading key and history under readings.',
      },
    ],
    steps: [
      {
        title: 'Add the HTTP client',
        detail:
          'Run flutter pub add http. Keep an API base URL outside source code where it can be configured per environment.',
      },
      {
        title: 'Request and validate data',
        detail:
          'Use a Uri, set a timeout, check the response status, decode JSON, and map validated values into a model.',
      },
      {
        title: 'Present all request states',
        detail:
          'Render loading, data, empty, and retryable error states; avoid silently converting an API failure into valid-looking zero values.',
      },
      {
        title: 'Test on the target network',
        detail:
          'Check the API from the phone browser first, use a reachable LAN address, and use HTTPS for production credentials and data.',
      },
    ],
    examples: [
      {
        title: 'Fetch sensor readings',
        filename: 'lib/sensor_api.dart',
        language: 'dart',
        code: "import 'dart:convert';\nimport 'package:http/http.dart' as http;\n\nFuture<Map<String, dynamic>> fetchCurrentReading(Uri baseUrl) async {\n  final uri = baseUrl.resolve('/api/readings/current');\n  final response = await http.get(uri).timeout(const Duration(seconds: 8));\n  if (response.statusCode != 200) {\n    throw Exception('Sensor API returned ${response.statusCode}');\n  }\n  final body = jsonDecode(response.body) as Map<String, dynamic>;\n  final reading = body['reading'];\n  if (reading is! Map<String, dynamic>) {\n    throw Exception('No current reading is available');\n  }\n  return reading;\n}",
        explanation:
          'The example uses a reachable base URI, an explicit timeout, an HTTP status check, and validation of this project’s {reading: ...} response shape.',
        expectedOutput:
          'A validated map containing timestamp, tof_distance_mm, light_lux, soil_raw, soil_moisture_percent, and rssi, or a surfaced error if no reading exists.',
      },
      {
        title: 'Authenticated POST request',
        filename: 'lib/api_client.dart',
        language: 'dart',
        code: "final response = await http.post(\n  baseUrl.resolve('/api/session'),\n  headers: {\n    'content-type': 'application/json',\n    'authorization': 'Bearer $accessToken',\n  },\n  body: jsonEncode({'username': username, 'password': password}),\n).timeout(const Duration(seconds: 10));\n\nif (response.statusCode < 200 || response.statusCode >= 300) {\n  throw Exception('Request failed: ${response.statusCode}');\n}",
        explanation:
          'In a real app, obtain credentials from a secure sign-in flow and keep the access token in a secure storage package. Do not hardcode secrets.',
        expectedOutput:
          'A successful 2xx response continues; other statuses become an explicit error for the UI or repository to handle.',
      },
    ],
    diagram: {
      title: 'A resilient REST request',
      nodes: [
        'Flutter widget requests data',
        'Repository sends HTTP request',
        'FastAPI or Node returns JSON',
        'Dart model validates and UI renders loading/data/error',
      ],
    },
    activity:
      'Call GET /api/readings/current from a device on the same Wi-Fi. Test the no-data response and a stopped-backend timeout, and show distinct empty and error states.',
    quiz: [
      question(
        'Multiple choice',
        'What host address does an Android emulator commonly use to reach its development host?',
        '10.0.2.2',
        ['localhost', '192.168.0.1 always'],
        'For the standard Android emulator, 10.0.2.2 is the host loopback alias.',
      ),
      question(
        'True or false',
        'Browser CORS policy blocks requests from native Flutter Android networking in the same way it blocks Flutter web.',
        'False',
        ['True', 'Only for GET'],
        'CORS is a browser policy; native Flutter clients are not subject to browser CORS enforcement.',
      ),
    ],
    docs: [docs.networking, docs.packages, docs.flutter],
  },
  {
    slug: 'database-integration',
    title: 'Database Integration and Local Persistence',
    level: 'Intermediate',
    minutes: 50,
    summary:
      'Choose between preferences, SQLite, and Firebase; store settings and sensor history with clear ownership.',
    objectives: [
      'Select local persistence for the right data.',
      'Perform SQLite CRUD operations.',
      'Understand Firebase and remote database boundaries.',
    ],
    prerequisites: ['Dart models and async code', 'A Flutter project with package access'],
    sections: [
      {
        title: 'Choose storage by purpose',
        body: 'SharedPreferences is for small non-sensitive key-value settings, not large relational records or secrets. Use flutter_secure_storage for credentials. SQLite is useful for structured offline records and history; packages such as sqflite provide a local relational database. Firebase provides hosted services; choose a specific product and configure platform credentials and security rules.',
      },
      {
        title: 'CRUD and synchronization',
        body: 'Define a schema, parameterize SQL values, and implement create/read/update/delete operations through a repository. For sensor history, decide how the app handles duplicate timestamps, retention, offline writes, and reconnection sync. A mobile client should call a trusted backend for protected remote data rather than exposing database credentials.',
      },
      {
        title: 'Avoid duplicate sources of truth',
        body: 'Keep server-owned sensor records on the backend and use local storage for an intentional cache or offline copy. Document which system wins on conflict and when cached values are considered stale.',
      },
    ],
    steps: [
      {
        title: 'Add a persistence package',
        detail:
          'For a demo, flutter pub add shared_preferences or flutter pub add sqflite path. Review the current package setup and target-platform constraints.',
      },
      {
        title: 'Define data and schema',
        detail:
          'Use a typed Reading model and a versioned database schema. Never build SQL by concatenating untrusted input.',
      },
      {
        title: 'Implement repository operations',
        detail:
          'Provide methods such as saveReading, getRecentReadings, and deleteOldReadings; test normal, empty, and migration paths.',
      },
      {
        title: 'Keep secrets out of preferences',
        detail:
          'Use secure storage for auth tokens and access the remote database only through an authenticated backend or correctly secured Firebase rules.',
      },
    ],
    examples: [
      {
        title: 'Save a reading record',
        filename: 'lib/reading_record.dart',
        language: 'dart',
        code: "class ReadingRecord {\n  const ReadingRecord({required this.timestamp, this.lightLux});\n  final DateTime timestamp;\n  final double? lightLux;\n\n  Map<String, Object?> toMap() => {\n        'timestamp': timestamp.toIso8601String(),\n        'light_lux': lightLux,\n      };\n}\n\n// With sqflite:\nawait db.insert(\n  'readings',\n  record.toMap(),\n  conflictAlgorithm: ConflictAlgorithm.replace,\n);",
        explanation:
          'The map keys match the database columns. Parameterized insert helpers handle values safely; create the table in a versioned onCreate migration.',
        expectedOutput:
          'The local readings table contains a timestamped record and an optional light value.',
      },
      {
        title: 'Save a preference',
        filename: 'Terminal and lib/settings.dart',
        language: 'dart',
        code: "flutter pub add shared_preferences\n\nimport 'package:shared_preferences/shared_preferences.dart';\n\nconst preferences = SharedPreferencesAsync();\nawait preferences.setString('temperature_unit', 'celsius');\nfinal unit = await preferences.getString('temperature_unit');",
        explanation:
          'SharedPreferencesAsync is intended for simple settings such as a display unit. Do not store passwords or large relational data in preferences.',
        expectedOutput:
          'The selected temperature unit is stored on the device and can be loaded on the next app launch.',
      },
      {
        title: 'Firebase setup',
        filename: 'Terminal and lib/main.dart',
        language: 'dart',
        code: 'dart pub global activate flutterfire_cli\nflutter pub add firebase_core firebase_auth cloud_firestore\nflutterfire configure\n\nawait Firebase.initializeApp(\n  options: DefaultFirebaseOptions.currentPlatform,\n);',
        explanation:
          'The FlutterFire CLI configures platform-specific Firebase options and generates firebase_options.dart. Follow the selected Firebase product setup and apply restrictive Security Rules before storing user data.',
        expectedOutput:
          'The app initializes Firebase for the configured platform; authentication and Firestore calls can then be added with their own error and rules handling.',
      },
    ],
    diagram: {
      title: 'Where data belongs',
      nodes: [
        'Small preference → SharedPreferences',
        'Credential → secure storage',
        'Offline structured history → SQLite',
        'Shared authoritative data → authenticated backend / Firebase',
      ],
    },
    activity:
      'Design a readings table with timestamp, sensor values, and a primary key. Add a repository that can save a reading and query the latest ten.',
    quiz: [
      question(
        'Multiple choice',
        'Which storage type best fits a small non-sensitive theme preference?',
        'SharedPreferences',
        ['SQLite relation only', 'A hardcoded API token'],
        'Preferences fit simple key-value settings; do not store secrets there.',
      ),
      question(
        'True or false',
        'A mobile app should connect directly to a protected production database using credentials embedded in the app.',
        'False',
        ['True', 'Only over Wi-Fi'],
        'Keep database credentials on the trusted server and expose an authenticated API.',
      ),
    ],
    docs: [docs.persistence, docs.packages],
  },
  {
    slug: 'iot-sensor-integration',
    title: 'ESP32, Raspberry Pi, and Sensor Integration',
    level: 'Advanced',
    minutes: 60,
    summary:
      'Connect Flutter to the project’s FastAPI sensor API and design robust live IoT dashboards.',
    objectives: [
      'Trace ESP32 → MQTT → Raspberry Pi → FastAPI → Flutter.',
      'Parse the project’s sensor response fields.',
      'Handle refresh, charts, offline status, and historical records.',
    ],
    prerequisites: [
      'REST API basics',
      'An API endpoint reachable from the phone or emulator',
      'Optional ESP32 sensors and Raspberry Pi for hardware testing',
    ],
    sections: [
      {
        title: 'System architecture',
        body: 'The ESP32 reads ToF distance, BH1750 light, and soil moisture, then publishes MQTT data. A Raspberry Pi MQTT subscriber stores readings in SQLite and exposes FastAPI routes. Flutter calls the HTTP API; it should not connect directly to the Pi’s database or sensor GPIO. MQTT-to-Flutter is an optional architecture that requires an intentionally exposed, authenticated broker or a backend WebSocket bridge.',
      },
      {
        title: 'Reading shape and freshness',
        body: 'GET /api/readings/current returns {\"reading\": {...}} or a null reading. Each reading may contain timestamp, tof_distance_mm, light_lux, soil_raw, soil_moisture_percent, and rssi. GET /api/readings?limit=100 returns a readings array. /api/health reports mqtt_connected for the bridge-to-broker link; do not mistake that for proof the ESP32 is online. Use message freshness and a device heartbeat/status contract to show device availability.',
      },
      {
        title: 'Live screens and reliability',
        body: 'Use a periodic Timer or a WebSocket stream to refresh, cancel it when the screen is disposed, and prevent overlapping requests. Display loading, empty, stale, offline, and error states separately. This project currently exposes REST endpoints, not a WebSocket route; a secured WebSocket bridge is an optional extension. Store history locally only when offline access or chart performance requires it. Use charts from a maintained Flutter package and label axes/units.',
      },
      {
        title: 'Network and security',
        body: 'On a physical phone use the Raspberry Pi LAN IP, not localhost. Standard Android emulator host access uses 10.0.2.2 if the backend runs on the host. A device on Wi-Fi can reach the Pi’s LAN address when routing and firewall rules allow it. Use HTTPS beyond a trusted development LAN; do not expose MQTT or database ports to the public internet.',
      },
    ],
    steps: [
      {
        title: 'Verify backend health',
        detail:
          'Open /api/health from a laptop or phone and confirm the API and MQTT status before debugging Flutter.',
      },
      {
        title: 'Fetch the current reading',
        detail:
          'Call /api/readings/current, validate the reading object, and render units, missing values, and its timestamp.',
      },
      {
        title: 'Add refresh and history',
        detail:
          'Poll at a modest interval or consume a secured WebSocket; cancel timers and subscriptions in dispose.',
      },
      {
        title: 'Test failure modes',
        detail:
          'Turn Wi-Fi off, stop FastAPI, and send an empty reading response. Show clear stale and retry states rather than zero readings.',
      },
    ],
    examples: [
      {
        title: 'Sensor model and response',
        filename: 'lib/sensor_reading.dart',
        language: 'dart',
        code: "class SensorReading {\n  const SensorReading({this.timestamp, this.tofDistanceMm, this.lightLux,\n    this.soilRaw, this.soilMoisturePercent, this.rssi});\n  final String? timestamp;\n  final double? tofDistanceMm;\n  final double? lightLux;\n  final int? soilRaw;\n  final double? soilMoisturePercent;\n  final int? rssi;\n\n  factory SensorReading.fromJson(Map<String, dynamic> json) => SensorReading(\n    timestamp: json['timestamp'] as String?,\n    tofDistanceMm: (json['tof_distance_mm'] as num?)?.toDouble(),\n    lightLux: (json['light_lux'] as num?)?.toDouble(),\n    soilRaw: json['soil_raw'] as int?,\n    soilMoisturePercent: (json['soil_moisture_percent'] as num?)?.toDouble(),\n    rssi: json['rssi'] as int?,\n  );\n}",
        explanation:
          'JSON numbers may decode as int or double, so num?.toDouble() supports both. Keep fields nullable because sensors may be absent.',
        expectedOutput:
          'A typed SensorReading model representing the nullable values returned by the project API.',
      },
      {
        title: 'Polling lifecycle',
        filename: 'lib/dashboard_state.dart',
        language: 'dart',
        code: 'Timer? _refreshTimer;\n\n@override\nvoid initState() {\n  super.initState();\n  _load();\n  _refreshTimer = Timer.periodic(\n    const Duration(seconds: 5),\n    (_) => _load(),\n  );\n}\n\n@override\nvoid dispose() {\n  _refreshTimer?.cancel();\n  super.dispose();\n}',
        explanation:
          'Import dart:async for Timer. In production, make _load guard against overlapping requests and update explicit loading/error/stale state.',
        expectedOutput:
          'The screen refreshes every five seconds while mounted and stops the timer when disposed.',
      },
      {
        title: 'Optional WebSocket updates',
        filename: 'lib/live_sensor_stream.dart',
        language: 'dart',
        code: "final channel = WebSocketChannel.connect(\n  Uri.parse('wss://api.example.com/ws/readings'),\n);\nfinal subscription = channel.stream.listen(\n  (message) => handleReading(jsonDecode(message)),\n  onError: (Object error) => showConnectionError(error),\n  onDone: () => showDisconnectedState(),\n);\n\n// When the screen or service is disposed:\nawait subscription.cancel();\nawait channel.sink.close();",
        explanation:
          'Install the package with flutter pub add web_socket_channel. This illustrates a separately implemented, authenticated WebSocket backend; the current FastAPI example only exposes REST. Use wss in production, define a message schema, handle reconnect/backoff, and dispose the subscription.',
        expectedOutput:
          'A server-pushed sensor message is decoded and the UI updates without polling; disconnects are shown explicitly.',
      },
    ],
    diagram: {
      title: 'ESP32 to Flutter data path',
      nodes: [
        'ESP32 reads ToF, BH1750, and soil sensor',
        'MQTT transports readings to Raspberry Pi',
        'FastAPI and SQLite expose REST and history',
        'Flutter requests JSON and renders a dashboard',
      ],
    },
    activity:
      'Build three sensor cards and a connection indicator from GET /api/readings/current. Then stop FastAPI and verify the screen shows an error or stale state rather than fake zero values.',
    quiz: [
      question(
        'Multiple choice',
        'What is the current-reading endpoint response envelope in this project?',
        '{\"reading\": sensorObjectOrNull}',
        ['A bare MQTT packet', '{\"database_password\": \"...\"}'],
        'The API returns the current record under reading, which is null when no record exists.',
      ),
      question(
        'True or false',
        'A physical phone can use localhost to reach a FastAPI service on the Raspberry Pi.',
        'False',
        ['True', 'Only on Android'],
        'Use the Pi’s reachable LAN address; localhost on the phone refers to the phone.',
      ),
    ],
    docs: [docs.networking, docs.architecture, docs.packages],
  },
  {
    slug: 'mobile-device-features',
    title: 'Mobile Features and Device Hardware',
    level: 'Intermediate–Advanced',
    minutes: 50,
    summary:
      'Use Flutter plugins for camera, location, BLE, files, notifications, and device information.',
    objectives: [
      'Select maintained packages for common hardware features.',
      'Request runtime permission at the moment it is needed.',
      'Test device capabilities and handle denial or unsupported devices.',
    ],
    prerequisites: [
      'Flutter plugins and async code',
      'A physical Android device for camera, GPS, or BLE tests',
    ],
    sections: [
      {
        title: 'Packages and permissions',
        body: 'Flutter packages expose platform features through plugin APIs. Camera needs camera access (and an iOS camera usage description); location needs platform location declarations and runtime permission; BLE needs version-specific Bluetooth scan/connect permissions (some older Android versions also require location); notifications require runtime notification permission on recent Android and permission requests on iOS. App-private files generally need no broad storage permission; a user-selected shared file should use a picker. Device metadata usually needs no runtime permission, but avoid collecting stable identifiers. Request the minimum permission in context and provide a graceful denial path.',
      },
      {
        title: 'Feature package examples',
        body: 'Use camera to preview or capture an image; geolocator to read a permitted position; flutter_blue_plus to scan/connect to BLE peripherals; path_provider to find an app-private directory and dart:io File for app-owned data; flutter_local_notifications for local alerts; firebase_messaging for remote push; and device_info_plus for device model metadata. On Android, test on a device with the required permission toggled; on iOS add the corresponding Info.plist usage descriptions. Check each package’s current setup guide because platform configuration changes over time.',
      },
      {
        title: 'Device testing and privacy',
        body: 'Emulators may not implement real sensors or BLE behavior. Test permissions, background behavior, lifecycle, and denied/revoked access on a physical device. Minimize collected location/device data, tell users how it is used, and do not assume permission remains granted.',
      },
    ],
    steps: [
      {
        title: 'Choose a package',
        detail:
          'Check pub.dev support, maintenance, platform compatibility, and the package’s official example and migration notes.',
      },
      {
        title: 'Configure native projects',
        detail:
          'Add only the required Android permissions and iOS usage descriptions; follow the current plugin installation guide.',
      },
      {
        title: 'Request permission and act',
        detail:
          'Request access in response to a user action, handle granted/denied/permanently denied states, and make the feature optional.',
      },
      {
        title: 'Test on hardware',
        detail:
          'Test permission changes, cancellation, app resume, and unsupported-device behavior on the target phone.',
      },
    ],
    examples: [
      {
        title: 'Request current location',
        filename: 'lib/location_action.dart',
        language: 'dart',
        code: "import 'package:geolocator/geolocator.dart';\n\nFuture<Position> getCurrentPosition() async {\n  if (!await Geolocator.isLocationServiceEnabled()) {\n    throw Exception('Enable location services to continue');\n  }\n  var permission = await Geolocator.checkPermission();\n  if (permission == LocationPermission.denied) {\n    permission = await Geolocator.requestPermission();\n  }\n  if (permission == LocationPermission.denied ||\n      permission == LocationPermission.deniedForever) {\n    throw Exception('Location permission was not granted');\n  }\n  return Geolocator.getCurrentPosition();\n}",
        explanation:
          'Add geolocator and configure platform permissions using its current package guide. A real UI should explain the feature and handle deniedForever with settings guidance.',
        expectedOutput:
          'Returns a current Position when service and permission are available; reports a clear failure otherwise.',
      },
      {
        title: 'Camera package setup',
        filename: 'Terminal',
        language: 'bash',
        code: 'flutter pub add camera\nflutter pub get\nflutter devices',
        explanation:
          'The camera plugin requires platform setup and lifecycle handling. Follow the pub.dev camera guide for supported formats, permission declarations, and controller disposal.',
        expectedOutput:
          'The package is resolved and connected device targets are listed; camera capture is tested on a device with a camera.',
      },
      {
        title: 'Feature package setup',
        filename: 'Terminal',
        language: 'bash',
        code: 'flutter pub add geolocator\nflutter pub add flutter_blue_plus\nflutter pub add path_provider\nflutter pub add flutter_local_notifications\nflutter pub add device_info_plus',
        explanation:
          'Install only the features your app actually uses. For push notifications, configure firebase_messaging and its platform credentials separately; review every package’s current Android and iOS permission instructions.',
        expectedOutput:
          'pubspec.yaml records selected packages. Their platform permissions and native setup must be completed before testing on a device.',
      },
      {
        title: 'Capture a camera image',
        filename: 'lib/camera_action.dart',
        language: 'dart',
        code: "final cameras = await availableCameras();\nif (cameras.isEmpty) throw StateError('No camera is available');\nfinal controller = CameraController(cameras.first, ResolutionPreset.medium);\ntry {\n  await controller.initialize();\n  final image = await controller.takePicture();\n  print('Captured image at ${image.path}');\n} finally {\n  await controller.dispose();\n}",
        explanation:
          'Import package:camera and follow its Android/iOS permission setup. In a screen, create and dispose the controller with the widget lifecycle, handle initialization errors, and show a preview before capture where appropriate.',
        expectedOutput:
          'A camera preview initializes and capture returns an image file path on a supported device with permission.',
      },
      {
        title: 'Scan for Bluetooth devices',
        filename: 'lib/ble_scan.dart',
        language: 'dart',
        code: "final subscription = FlutterBluePlus.scanResults.listen((results) {\n  for (final result in results) {\n    print('Found ${result.device.platformName}');\n  }\n});\nawait FlutterBluePlus.startScan(timeout: const Duration(seconds: 5));\nawait subscription.cancel();",
        explanation:
          'Import flutter_blue_plus, request the Android-version-appropriate scan permission, check Bluetooth is enabled, and cancel stream subscriptions with the owning widget. Follow the package guide for iOS and Android native settings.',
        expectedOutput:
          'Nearby BLE advertisements are listed while scanning is active; a denied permission or disabled radio is shown as a recoverable state.',
      },
      {
        title: 'Write app-private data and inspect device',
        filename: 'lib/device_files.dart',
        language: 'dart',
        code: "final directory = await getApplicationDocumentsDirectory();\nfinal file = File('${directory.path}/reading.json');\nawait file.writeAsString(jsonEncode(reading.toJson()));\n\nfinal info = await DeviceInfoPlugin().androidInfo;\nprint('Android ${info.version.release}');",
        explanation:
          'Import dart:io, dart:convert, path_provider, and device_info_plus. App-private documents do not require broad storage permission; keep sensitive values in secure storage instead.',
        expectedOutput:
          'The app-owned JSON file is written in its documents directory and Android version metadata is printed.',
      },
      {
        title: 'Show a local notification',
        filename: 'lib/notification_service.dart',
        language: 'dart',
        code: "final notifications = FlutterLocalNotificationsPlugin();\nawait notifications.initialize(\n  const InitializationSettings(\n    android: AndroidInitializationSettings('@mipmap/ic_launcher'),\n    iOS: DarwinInitializationSettings(),\n  ),\n);\nawait notifications.show(\n  1,\n  'Sensor alert',\n  'Soil moisture is below your threshold',\n  const NotificationDetails(\n    android: AndroidNotificationDetails('sensor_alerts', 'Sensor alerts'),\n    iOS: DarwinNotificationDetails(),\n  ),\n);",
        explanation:
          'Import flutter_local_notifications and request notification permission using the plugin’s current Android and iOS APIs before showing alerts. A remote push notification additionally needs Firebase Messaging and server-side credentials.',
        expectedOutput:
          'After setup and permission, the device shows a local sensor alert notification.',
      },
    ],
    diagram: {
      title: 'A safe plugin interaction',
      nodes: [
        'User requests a feature',
        'App explains and requests permission',
        'Flutter plugin checks platform capability',
        'Native API returns data or a handled denial',
      ],
    },
    activity:
      'Add a location button. Test service off, permission denied, permission granted, and permission revoked after the app is backgrounded.',
    quiz: [
      question(
        'Multiple choice',
        'When should an app request a sensitive hardware permission?',
        'When the user invokes the feature and understands why it is needed',
        ['At first launch before explaining anything', 'Repeatedly until permission is granted'],
        'Ask in context and provide a useful path when permission is denied.',
      ),
      question(
        'True or false',
        'A successful emulator test proves a Bluetooth plugin works on every physical device.',
        'False',
        ['True', 'Only for Android'],
        'Hardware and vendor behavior differ; test on the actual target devices.',
      ),
    ],
    docs: [docs.packages, docs.cookbook],
  },
  {
    slug: 'building-android-apps',
    title: 'Building and Deploying Android Applications',
    level: 'Intermediate',
    minutes: 40,
    summary: 'Run, debug, build, sign, and distribute APK and Android App Bundle outputs.',
    objectives: [
      'Run Flutter on an emulator or phone.',
      'Generate debug APK, release APK, and AAB artifacts.',
      'Understand signing and safe release practices.',
    ],
    prerequisites: [
      'Flutter and Android SDK configured',
      'A connected device or emulator',
      'Release signing requires a securely stored keystore',
    ],
    sections: [
      {
        title: 'Debug and build',
        body: 'Use flutter run to build and install a debug app. flutter clean removes generated build output; flutter pub get resolves dependencies. Debug APKs are for development and are not production release artifacts. Android App Bundles are uploaded to Google Play, which generates optimized APKs for devices.',
      },
      {
        title: 'Signing and release',
        body: 'A release APK or AAB must be signed. Create a release keystore and keep it outside version control; never put passwords in source code or share them publicly. Configure signing using protected local properties or CI secret storage, then keep secure backups of the keystore and credentials. Losing the signing key can prevent updates under the same app identity.',
      },
      {
        title: 'Install and update',
        body: 'The common APK output paths are build/app/outputs/flutter-apk/app-debug.apk and build/app/outputs/flutter-apk/app-release.apk. A release bundle is commonly at build/app/outputs/bundle/release/app-release.aab. Verify the actual build output for your Flutter/Gradle configuration. Install a debug APK with adb install -r path-to.apk; distribute release artifacts through a trusted channel.',
      },
    ],
    steps: [
      {
        title: 'Run on a target',
        detail:
          'Run flutter devices, select an emulator or USB-debugging phone, then use flutter run and inspect debug output.',
      },
      {
        title: 'Build a debug APK',
        detail:
          'Run flutter clean, flutter pub get, then flutter build apk --debug. Install the generated artifact on a test device.',
      },
      {
        title: 'Configure release signing',
        detail:
          'Follow the official Android deployment guide, store the signing key securely, and configure Gradle without committing credentials.',
      },
      {
        title: 'Build and verify releases',
        detail:
          'Use flutter build apk --release or flutter build appbundle --release. Test the signed artifact and retain versioned backups securely.',
      },
    ],
    examples: [
      {
        title: 'Build command sequence',
        filename: 'Terminal',
        language: 'bash',
        code: 'flutter clean\nflutter pub get\nflutter run\nflutter build apk --debug\nflutter build apk --release\nflutter build appbundle --release',
        explanation:
          'Clean removes generated output; pub get resolves packages; run launches the app; the build commands produce development or signed release APK/AAB artifacts. A release build requires signing configuration.',
        expectedOutput:
          'Debug and release APKs are under build/app/outputs/flutter-apk/; the release AAB is under build/app/outputs/bundle/release/ for the standard Android Gradle configuration.',
      },
    ],
    diagram: {
      title: 'Flutter Android delivery flow',
      nodes: [
        'Dart source and pubspec dependencies',
        'Flutter and Gradle compile Android app',
        'APK for direct device installation',
        'Signed AAB for Google Play distribution',
      ],
    },
    activity:
      'Build and install a debug APK. Then document which signing settings and secrets must be configured before any release build.',
    quiz: [
      question(
        'Multiple choice',
        'Which artifact is generally uploaded to Google Play for Play-managed device delivery?',
        'Android App Bundle (.aab)',
        ['Dart source file', 'Debug logcat text'],
        'Google Play accepts an Android App Bundle and generates device-specific APKs.',
      ),
      question(
        'True or false',
        'It is safe to commit a release keystore password to a public Git repository.',
        'False',
        ['True', 'Only if the app is open source'],
        'Signing credentials are secrets; keep them out of source control.',
      ),
    ],
    docs: [docs.deployment, docs.platform, docs.android],
  },
  {
    slug: 'complete-flutter-iot-app',
    title: 'Complete Flutter IoT Application',
    level: 'Advanced',
    minutes: 75,
    summary:
      'Combine Flutter, FastAPI, SQLite history, ESP32, MQTT, sensor cards, and charts in one project.',
    objectives: [
      'Structure a Flutter IoT client around a repository and model.',
      'Display current and historical sensor data safely.',
      'Handle errors, refresh, status, and offline history.',
    ],
    prerequisites: [
      'Completed API, database, and UI lessons',
      'A FastAPI sensor backend or sample JSON',
      'Optional Raspberry Pi, Mosquitto, ESP32, and sensors',
    ],
    sections: [
      {
        title: 'Application architecture',
        body: 'The ESP32 samples sensors and publishes MQTT. Mosquitto and a Raspberry Pi bridge deliver the data to FastAPI, which stores history in SQLite. Flutter uses a repository to call /api/readings/current and /api/readings?limit=100, maps JSON into typed models, and renders dashboard and history screens. The mobile app must not contain database credentials.',
      },
      {
        title: 'Dashboard and charts',
        body: 'Show ToF distance in millimeters, BH1750 light in lux, soil moisture percentage, raw soil value when useful, ESP32 RSSI, and sample timestamp. Use fl_chart or another maintained chart package for history; validate values, sort by timestamp, label units, and avoid charting missing data as zero.',
      },
      {
        title: 'Refresh, status, and offline behavior',
        body: 'Choose polling for a simple prototype or a secured WebSocket for lower-latency updates. Cancel Timer and stream subscriptions when disposed, guard against concurrent refreshes, and distinguish server health from whether the ESP32 has recently sent data. Cache history intentionally in SQLite and indicate when shown values are cached.',
      },
      {
        title: 'Build a production-ready iteration',
        body: 'Configure per-environment API endpoints, use HTTPS and authenticated access where data is private, add integration tests for JSON parsing, and test airplane mode, backend restart, empty database, and stale sensor updates. Keep secrets in server configuration or secure device storage, never Dart source.',
      },
    ],
    steps: [
      {
        title: 'Create a feature structure',
        detail:
          'Separate models, API service/repository, state controller or provider, screens, and reusable sensor cards.',
      },
      {
        title: 'Connect the API',
        detail:
          'Use a LAN address during phone testing, parse the reading and readings envelopes, and surface timeout/status errors.',
      },
      {
        title: 'Render current and historical data',
        detail:
          'Display the latest timestamped values and a labeled chart built from valid historical records.',
      },
      {
        title: 'Test disconnected states and package',
        detail:
          'Stop Wi-Fi, FastAPI, MQTT, and ESP32 separately; show which layer is unavailable, then build and test an Android APK.',
      },
    ],
    examples: [
      {
        title: 'Project dependencies',
        filename: 'Terminal',
        language: 'bash',
        code: 'flutter pub add http\nflutter pub add sqflite path\nflutter pub add fl_chart\nflutter pub add provider',
        explanation:
          'These packages illustrate HTTP, local SQLite history, chart rendering, and one state-management option. Choose compatible current versions on pub.dev and avoid adding packages you do not need.',
        expectedOutput:
          'pubspec.yaml lists the chosen dependencies and flutter pub get resolves them for the project.',
      },
      {
        title: 'Reading card',
        filename: 'lib/sensor_card.dart',
        language: 'dart',
        code: "Widget sensorValue(String label, double? value, String unit) {\n  return Card(\n    child: ListTile(\n      title: Text(label),\n      subtitle: Text(\n        value == null ? 'No recent reading' : '${value.toStringAsFixed(1)} $unit',\n      ),\n    ),\n  );\n}\n\n// Example:\nsensorValue('Light intensity', reading.lightLux, 'lux');",
        explanation:
          'The UI keeps missing measurements distinct from a measured zero and includes a unit for interpretation.',
        expectedOutput:
          'A card shows a formatted measurement such as “245.0 lux” or “No recent reading”.',
      },
    ],
    diagram: {
      title: 'Complete Flutter IoT architecture',
      nodes: [
        'ESP32 sensors: ToF, BH1750, soil',
        'MQTT broker and Raspberry Pi bridge',
        'FastAPI REST + SQLite history',
        'Flutter repository, dashboard, charts, and cache',
      ],
    },
    activity:
      'Build the first vertical slice: fetch the latest reading, show all available sensor values and timestamp, and add a refresh action plus explicit offline error. Extend it with history and a chart.',
    quiz: [
      question(
        'Multiple choice',
        'Which component should own access to the sensor REST endpoints in a maintainable Flutter app?',
        'A repository or API service used by the UI state layer',
        ['A database password embedded in every widget', 'The ESP32 GPIO driver inside the phone'],
        'Keep HTTP details in a service/repository and keep credentials out of the app.',
      ),
      question(
        'True or false',
        'A missing sensor measurement should always be displayed as 0.0.',
        'False',
        ['True', 'Only on charts'],
        'Null or missing data is not the same as a real zero measurement.',
      ),
    ],
    docs: [docs.architecture, docs.networking, docs.packages],
  },
]

export const flutterLessonSlugs = [
  ...flutterLessons.map((lesson) => lesson.slug),
  'flutter-final-assessment',
]

export const flutterFinalAssessment: FlutterQuizQuestion[] = [
  question(
    'Multiple choice',
    'What role does Dart play in a Flutter application?',
    'It is the programming language used to build the app and widget behavior',
    ['It is the Android emulator', 'It is a remote database'],
    'Dart is Flutter’s programming language.',
  ),
  question(
    'Code reading',
    'What does String? indicate in Dart?',
    'A nullable string that may hold null',
    ['A required non-null string', 'A stream of strings'],
    'The question mark marks a nullable type.',
  ),
  question(
    'Multiple choice',
    'What URL host should a physical phone use to reach a development API on a computer?',
    'That computer’s reachable LAN IP address',
    ['localhost on the phone', 'The Flutter package registry'],
    'A phone’s localhost points back to the phone itself.',
  ),
  question(
    'True or false',
    'An AAB is the same thing as a debug APK intended for direct testing.',
    'False',
    ['True', 'Only on emulators'],
    'An AAB is a Play distribution bundle; debug APKs are development artifacts.',
  ),
  question(
    'Multiple choice',
    'Which path describes this course’s sensor pipeline?',
    'ESP32 → MQTT → Raspberry Pi/FastAPI → Flutter',
    ['Flutter → GPIO → BH1750 without a backend', 'SQLite → Android Studio → ESP32'],
    'The app gets sensor data from the backend API, not directly from GPIO.',
  ),
]
