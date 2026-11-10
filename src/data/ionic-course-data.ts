export type IonicLevel =
  'Beginner' | 'Beginner–Intermediate' | 'Intermediate' | 'Intermediate–Advanced' | 'Advanced'

export interface IonicCodeExample {
  title: string
  filename: string
  language: string
  code: string
  explanation: string
  expectedOutput: string
}

export interface IonicQuizOption {
  label: string
  correct: boolean
  feedback: string
}

export interface IonicQuizQuestion {
  type: 'Multiple choice' | 'True or false' | 'Code reading'
  question: string
  options: IonicQuizOption[]
}

export interface IonicLesson {
  slug: string
  title: string
  level: IonicLevel
  minutes: number
  summary: string
  objectives: string[]
  prerequisites: string[]
  sections: { title: string; body: string; bullets?: string[]; note?: string }[]
  steps: { title: string; detail: string }[]
  examples: IonicCodeExample[]
  diagram: { title: string; nodes: string[] }
  activity: string
  quiz: IonicQuizQuestion[]
  docs: { label: string; href: string }[]
}

const docs = {
  ionic: { label: 'Ionic documentation', href: 'https://ionicframework.com/docs' },
  react: { label: 'Ionic React', href: 'https://ionicframework.com/docs/react' },
  angular: { label: 'Ionic Angular', href: 'https://ionicframework.com/docs/angular' },
  cli: { label: 'Ionic CLI', href: 'https://ionicframework.com/docs/cli' },
  components: { label: 'Ionic components', href: 'https://ionicframework.com/docs/components' },
  api: { label: 'REST API guide', href: 'https://ionicframework.com/docs/techniques/http' },
  capacitor: { label: 'Capacitor documentation', href: 'https://capacitorjs.com/docs' },
  capacitorInstall: {
    label: 'Capacitor setup',
    href: 'https://capacitorjs.com/docs/getting-started',
  },
  plugins: { label: 'Capacitor plugins', href: 'https://capacitorjs.com/docs/apis' },
  camera: { label: 'Camera plugin', href: 'https://capacitorjs.com/docs/apis/camera' },
  geolocation: {
    label: 'Geolocation plugin',
    href: 'https://capacitorjs.com/docs/apis/geolocation',
  },
  filesystem: { label: 'Filesystem plugin', href: 'https://capacitorjs.com/docs/apis/filesystem' },
  device: { label: 'Device plugin', href: 'https://capacitorjs.com/docs/apis/device' },
  notifications: {
    label: 'Push Notifications plugin',
    href: 'https://capacitorjs.com/docs/apis/push-notifications',
  },
  deployment: {
    label: 'Android deployment',
    href: 'https://capacitorjs.com/docs/android/deployment',
  },
  typescript: { label: 'TypeScript documentation', href: 'https://www.typescriptlang.org/docs/' },
  android: { label: 'Android Studio', href: 'https://developer.android.com/studio' },
  pubdev: { label: 'npm packages', href: 'https://www.npmjs.com/' },
}

const question = (
  type: IonicQuizQuestion['type'],
  prompt: string,
  correct: string,
  distractors: string[],
  feedback: string,
): IonicQuizQuestion => ({
  type,
  question: prompt,
  options: [correct, ...distractors].map((label, index) => ({
    label,
    correct: index === 0,
    feedback: index === 0 ? feedback : `Not quite. ${feedback}`,
  })),
})

export const ionicLessons: IonicLesson[] = [
  {
    slug: 'ionic-introduction',
    title: 'Introduction to Ionic Framework',
    level: 'Beginner',
    minutes: 25,
    summary:
      'Learn what Ionic is, how its web UI works, and how it relates to Capacitor and other frameworks.',
    objectives: [
      'Explain Ionic Framework and its web-first architecture.',
      'Distinguish Ionic UI from Capacitor native runtime.',
      'Compare Ionic with Flutter and React Native for a project.',
    ],
    prerequisites: [
      'A browser and computer',
      'Basic HTML is helpful; you can learn the rest in this course',
    ],
    sections: [
      {
        title: 'What Ionic does',
        body: 'Ionic Framework is a library of web components and tools for building mobile-style user interfaces with HTML, CSS, and JavaScript. You can use Ionic with React, Angular, or Vue. The UI runs as a web application in a browser; to distribute it as an installed native mobile app and reach native device APIs, teams commonly pair Ionic with Capacitor.',
        bullets: [
          'Ionic supplies reusable components such as ion-button, ion-list, ion-input, and ion-tabs.',
          'Ionic React uses React components that wrap Ionic web components; Ionic Angular uses Angular templates and services.',
          'Capacitor is a separate native runtime and plugin system maintained by the Ionic team.',
        ],
      },
      {
        title: 'Architecture and trade-offs',
        body: 'In a mobile build, the Ionic web UI is bundled into a native Android or iOS project and rendered in a platform WebView. Capacitor exposes native functionality through plugins. Ionic can share web skills and code, but teams still need to handle responsive layouts, accessibility, platform permissions, native build tools, signing, offline behavior, and WebView performance constraints.',
      },
      {
        title: 'Ionic, Capacitor, Flutter, and React Native',
        body: 'Ionic is a web UI framework; Capacitor packages web assets in native shells and bridges to native APIs. They complement one another rather than compete directly. Flutter uses Dart and its own rendering toolkit. React Native builds its interface from React components backed by native platform views. Choose based on team skills, code reuse, UI needs, native integration, performance, and deployment requirements.',
        note: 'A project can use Ionic in a browser without Capacitor. Capacitor can also package a web app that does not use Ionic.',
      },
      {
        title: 'Where Ionic is useful',
        body: 'Ionic can fit business and field-service applications, data-entry tools, content apps, and dashboards where sharing a web codebase is valuable. Prototype on the target device early: a browser demo alone does not validate native plugin permissions, app lifecycle, or store distribution.',
      },
    ],
    steps: [
      {
        title: 'Identify the layers',
        detail:
          'Label your app UI framework, web framework, native runtime, plugin APIs, backend, and data store. Keep their responsibilities distinct.',
      },
      {
        title: 'Trace a button',
        detail:
          'An Ionic button emits a web event; your React or Angular code handles it. If needed, that code calls a Capacitor plugin which delegates to a native API.',
      },
      {
        title: 'Compare project needs',
        detail:
          'List platforms, UI reuse, team skills, device features, offline requirements, accessibility, and release process before choosing a stack.',
      },
    ],
    examples: [
      {
        title: 'Ionic app layers',
        filename: 'architecture.txt',
        language: 'text',
        code: 'Ionic UI components (HTML / CSS)\n             ↓\n React or Angular application\n             ↓ ionic build\n   HTML, CSS, JS web assets\n             ↓ Capacitor sync\n Android / iOS native project\n             ↓ plugins\n Camera / GPS / Files / Device',
        explanation:
          'Ionic builds the web experience. Capacitor copies the built assets into native platform projects and connects supported plugins.',
        expectedOutput:
          'The same responsive web UI can run in a browser and in a native Android or iOS app shell.',
      },
    ],
    diagram: {
      title: 'Ionic and Capacitor roles',
      nodes: [
        'Ionic web components',
        'React / Angular app logic',
        'Capacitor native container and bridge',
        'Android / iOS services and plugins',
      ],
    },
    activity:
      'For a sensor dashboard, list which parts are Ionic UI, which parts are React or Angular app logic, which APIs come from Capacitor, and what the backend owns.',
    quiz: [
      question(
        'Multiple choice',
        'What is Ionic Framework primarily?',
        'A web UI component framework for mobile-style applications',
        ['An Android SDK replacement', 'A database engine'],
        'Ionic supplies web UI components and tools; native packaging is commonly handled by Capacitor.',
      ),
      question(
        'True or false',
        'Ionic and Capacitor are exactly the same product and serve the same role.',
        'False',
        ['True', 'Only on Android'],
        'Ionic is the UI framework; Capacitor is a native runtime and plugin layer.',
      ),
      question(
        'Code reading',
        'In a Capacitor mobile build, where does the Ionic UI render?',
        'Inside a platform WebView in the native app shell',
        ['Directly inside the MQTT broker', 'As Flutter widgets'],
        'Capacitor loads the built web interface in the platform WebView.',
      ),
    ],
    docs: [docs.ionic, docs.react, docs.angular, docs.capacitor],
  },
  {
    slug: 'ionic-setup',
    title: 'Prerequisites and Installation',
    level: 'Beginner',
    minutes: 35,
    summary:
      'Install Node.js, npm, Ionic CLI, and an editor, then check versions and diagnose setup.',
    objectives: [
      'Install Node.js and npm.',
      'Install and verify Ionic CLI.',
      'Understand TypeScript and editor prerequisites.',
    ],
    prerequisites: [
      'A supported computer',
      'Internet access and permission to configure your developer environment',
    ],
    sections: [
      {
        title: 'Node.js and npm',
        body: 'Ionic CLI and project tooling run on Node.js. Install a supported Node.js LTS release; npm is included with Node.js. Use the versions required by the current Ionic starter and plugin dependencies. Check node --version and npm --version in a new terminal after installation.',
      },
      {
        title: 'Editor and web foundations',
        body: 'Visual Studio Code is a common editor. Learn semantic HTML for structure, CSS for presentation, JavaScript for behavior, and TypeScript for static types and improved editor feedback. Ionic starters can use TypeScript; you can learn the essentials in Lesson 7.',
      },
      {
        title: 'Install the Ionic CLI',
        body: 'The official Ionic CLI package is @ionic/cli. Install globally with npm install -g @ionic/cli, then check ionic --version. If global installation fails due to permissions, configure npm’s global directory for your user rather than blindly running an elevated command.',
      },
    ],
    steps: [
      {
        title: 'Install Node.js LTS',
        detail:
          'Download the installer from nodejs.org for your operating system and open a fresh terminal when it finishes.',
      },
      {
        title: 'Verify Node and npm',
        detail:
          'Run node --version and npm --version. Resolve PATH or version-manager issues before installing CLI packages.',
      },
      {
        title: 'Install Ionic CLI',
        detail:
          'Run npm install -g @ionic/cli, then ionic --version to confirm the CLI is available.',
      },
      {
        title: 'Configure VS Code',
        detail:
          'Install VS Code and enable TypeScript/JavaScript support. Use a project-local dependency install for app packages.',
      },
    ],
    examples: [
      {
        title: 'Check the environment',
        filename: 'Terminal',
        language: 'bash',
        code: 'node --version\nnpm --version\nnpm install -g @ionic/cli\nionic --version',
        explanation:
          'The first two commands verify the JavaScript runtime and package manager. The last two install and print the Ionic CLI version.',
        expectedOutput:
          'Node, npm, and Ionic CLI each print a version. If ionic is not found, reopen the terminal and check npm global PATH.',
      },
    ],
    diagram: {
      title: 'Development workstation setup',
      nodes: [
        'Node.js LTS and npm',
        'Ionic CLI and project tools',
        'VS Code with TypeScript support',
        'Browser and optional Android Studio',
      ],
    },
    activity:
      'Run all four version/install commands, record the versions, then run ionic --help and find the commands for creating and serving an app.',
    quiz: [
      question(
        'Multiple choice',
        'Which package installs the official Ionic CLI?',
        '@ionic/cli',
        ['@ionic/react-router', '@capacitor/android'],
        'The CLI package is installed globally with npm install -g @ionic/cli.',
      ),
      question(
        'True or false',
        'npm is normally installed together with Node.js.',
        'True',
        ['False', 'Only inside Ionic'],
        'The Node.js distribution includes npm.',
      ),
      question(
        'Code reading',
        'What does node --version report?',
        'The installed Node.js runtime version',
        ['The Ionic app route', 'The current Wi-Fi address'],
        'It prints the Node.js version available on PATH.',
      ),
    ],
    docs: [
      docs.cli,
      { label: 'Node.js downloads', href: 'https://nodejs.org/en/download' },
      docs.typescript,
    ],
  },
  {
    slug: 'first-ionic-app',
    title: 'Creating Your First Ionic Application',
    level: 'Beginner',
    minutes: 40,
    summary:
      'Scaffold an Ionic React app, run it in a browser, and see the equivalent Angular starter command.',
    objectives: [
      'Create a blank Ionic React starter.',
      'Run and preview the development server.',
      'Choose between Ionic React and Ionic Angular starters.',
    ],
    prerequisites: ['Node.js and npm installed', 'Ionic CLI installed'],
    sections: [
      {
        title: 'Choose a starter and framework',
        body: 'The Ionic CLI can create blank, tabs, and sidemenu starter apps for supported UI frameworks. A React starter uses React components and React Router integration; an Angular starter uses Angular components and Angular Router. Choose one framework for a project instead of mixing starter conventions.',
      },
      {
        title: 'Create and run a React app',
        body: 'Create the blank React app with ionic start MyIonicApp blank --type=react. Move to the new directory, install dependencies if needed, and run ionic serve. The development server opens a browser preview; it is not yet a native Android installation.',
      },
      {
        title: 'Create an Angular app',
        body: 'Use ionic start MyIonicAngularApp blank --type=angular for an Angular-based starter. Then cd MyIonicAngularApp, install dependencies if prompted, and run ionic serve. Follow the generated project’s scripts and current CLI prompts.',
      },
    ],
    steps: [
      {
        title: 'Generate the React starter',
        detail: 'Run ionic start MyIonicApp blank --type=react and answer any CLI prompts.',
      },
      {
        title: 'Install and enter the project',
        detail:
          'Run cd MyIonicApp and npm install if the CLI has not already installed the starter packages.',
      },
      {
        title: 'Launch browser preview',
        detail:
          'Run ionic serve. Keep the terminal open while the dev server runs and use browser developer tools to inspect output.',
      },
      {
        title: 'Compare with Angular',
        detail:
          'Create another blank starter using --type=angular and compare its main app, routing, and page files.',
      },
    ],
    examples: [
      {
        title: 'Ionic React starter',
        filename: 'Terminal',
        language: 'bash',
        code: 'ionic start MyIonicApp blank --type=react\ncd MyIonicApp\nnpm install\nionic serve',
        explanation:
          'The CLI scaffolds a React app with Ionic components. ionic serve starts a browser development server with live reload.',
        expectedOutput:
          'A blank Ionic React app opens in a browser; terminal output shows the local development address.',
      },
      {
        title: 'Ionic Angular starter',
        filename: 'Terminal',
        language: 'bash',
        code: 'ionic start MyIonicAngularApp blank --type=angular\ncd MyIonicAngularApp\nnpm install\nionic serve',
        explanation:
          'Use the angular starter type to scaffold Ionic Angular. It has Angular components and routing conventions instead of React.',
        expectedOutput:
          'A blank Ionic Angular app runs in a browser using the Angular development toolchain.',
      },
    ],
    diagram: {
      title: 'From CLI command to browser preview',
      nodes: [
        'Choose React or Angular starter',
        'Ionic CLI creates project files',
        'npm installs project dependencies',
        'ionic serve runs the app locally',
      ],
    },
    activity:
      'Create a React starter and change its home page title. Then create an Angular starter and identify one structural difference.',
    quiz: [
      question(
        'Multiple choice',
        'Which command starts the Ionic development server for a browser preview?',
        'ionic serve',
        ['npx cap open android', 'npm publish'],
        'ionic serve runs the web development server.',
      ),
      question(
        'True or false',
        'An Ionic Angular starter is the same project type as an Ionic React starter.',
        'False',
        ['True', 'Only if both use TypeScript'],
        'They use different UI framework and routing conventions.',
      ),
      question(
        'Code reading',
        'What does --type=react select in ionic start?',
        'The React framework starter',
        ['A release build mode', 'A database driver'],
        'The CLI uses that option to scaffold the React variant.',
      ),
    ],
    docs: [docs.react, docs.angular, docs.cli],
  },
  {
    slug: 'ionic-project-structure',
    title: 'Understanding Ionic Project Structure',
    level: 'Beginner',
    minutes: 35,
    summary: 'Navigate src, pages, components, assets, theme variables, routes, and package.json.',
    objectives: [
      'Find the app entry, pages, components, and theme.',
      'Explain package.json and TypeScript source files.',
      'Organize reusable UI components.',
    ],
    prerequisites: ['An Ionic React or Angular starter project'],
    sections: [
      {
        title: 'React starter structure',
        body: 'A current Ionic React project commonly has src/App.tsx for app routes and setup, src/main.tsx as its entry point, src/pages for route-level screens, src/components for reusable UI, and src/theme/variables.css for theme tokens. Exact generated files can change between starter versions; inspect the project that the CLI created.',
      },
      {
        title: 'Angular starter structure',
        body: 'An Ionic Angular project commonly uses src/app for routes and application features, page folders containing component TypeScript/HTML/SCSS files, and src/theme/variables.scss for theme variables. Angular modules or standalone components depend on the generated version. Follow the conventions already present in the starter.',
      },
      {
        title: 'Assets, styles, and dependencies',
        body: 'Place images and static files in the generated public or assets directory and reference them using the starter’s asset convention. package.json lists scripts and dependencies; the lockfile records exact resolved versions. Do not edit node_modules. Put shared color tokens and global CSS in the theme/style files rather than duplicating values across pages.',
      },
    ],
    steps: [
      {
        title: 'Locate the application entry',
        detail: 'Find main.tsx or the Angular bootstrap entry. Trace how the root app is rendered.',
      },
      {
        title: 'Find routes and pages',
        detail:
          'Open App.tsx and its route configuration in React, or the generated Angular route configuration.',
      },
      {
        title: 'Extract a reusable component',
        detail:
          'Move a repeated sensor value card into src/components and pass its label, value, and unit as typed props or inputs.',
      },
      {
        title: 'Change the theme',
        detail:
          'Update the generated theme variables and check the same color token on multiple pages.',
      },
    ],
    examples: [
      {
        title: 'Reusable React sensor card',
        filename: 'src/components/SensorCard.tsx',
        language: 'tsx',
        code: "import { IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/react';\n\ntype SensorCardProps = {\n  title: string;\n  value: number | null;\n  unit: string;\n};\n\nexport function SensorCard({ title, value, unit }: SensorCardProps) {\n  return (\n    <IonCard>\n      <IonCardHeader><IonCardTitle>{title}</IonCardTitle></IonCardHeader>\n      <IonCardContent>\n        {value === null ? 'No recent reading' : `${value.toFixed(1)} ${unit}`}\n      </IonCardContent>\n    </IonCard>\n  );\n}",
        explanation:
          'A typed reusable component accepts data from a page and renders null measurements differently from real zero values.',
        expectedOutput:
          'The same sensor card can be reused for distance, light, soil moisture, or signal strength.',
      },
    ],
    diagram: {
      title: 'A maintainable Ionic React app',
      nodes: [
        'main.tsx bootstraps the app',
        'App.tsx declares route tree',
        'pages compose reusable components',
        'theme and assets supply shared UI resources',
      ],
    },
    activity:
      'Create a SensorCard component with typed props and use it twice on the home page with different labels and units.',
    quiz: [
      question(
        'Multiple choice',
        'Where are npm dependencies and project scripts declared?',
        'package.json',
        ['src/theme/variables.css', 'android/AndroidManifest.xml'],
        'package.json contains dependency and script declarations.',
      ),
      question(
        'True or false',
        'A shared component belongs in the application source, not node_modules.',
        'True',
        ['False', 'Only for Angular'],
        'Application components should be versioned in the project source.',
      ),
      question(
        'Code reading',
        'Why does SensorCard use number | null for value?',
        'To represent missing readings separately from valid numeric values',
        ['To turn a number into CSS', 'To make every value equal zero'],
        'A nullable type makes the no-reading state explicit.',
      ),
    ],
    docs: [docs.react, docs.angular, docs.components],
  },
  {
    slug: 'ionic-ui-components',
    title: 'Ionic UI Components',
    level: 'Beginner–Intermediate',
    minutes: 55,
    summary:
      'Build screens with Ionic layout, forms, lists, navigation elements, overlays, and feedback components.',
    objectives: [
      'Use Ionic page and layout components.',
      'Create forms, lists, search, and selection controls.',
      'Choose the correct overlay and navigation component.',
    ],
    prerequisites: ['A running Ionic starter', 'Basic JSX or Angular template syntax'],
    sections: [
      {
        title: 'Page layout and data entry',
        body: 'ion-header, ion-toolbar, and ion-title compose a page header; ion-content provides the scrollable page area. ion-button triggers actions. ion-card groups related content. ion-list and ion-item display rows. ion-input and ion-label support form fields. ion-searchbar and ion-select add search and selection controls. Bind values using the framework’s normal React or Angular state patterns.',
      },
      {
        title: 'Navigation and overlays',
        body: 'ion-tabs provides tab navigation and ion-menu provides a side menu. ion-modal is for focused dialog flows; ion-alert asks for confirmation or presents a simple choice. ion-loading communicates a blocking wait, and ion-toast provides brief non-blocking feedback. In React, Ionic overlay controller APIs are asynchronous; use a controller only from an event/action, not during render.',
      },
      {
        title: 'Accessible interaction',
        body: 'Give inputs labels, make buttons understandable, keep keyboard focus visible, and do not rely on color alone for status. Keep content scrollable and test on narrow screens. Prefer specific form and navigation components over custom clickable divs.',
      },
    ],
    steps: [
      {
        title: 'Build a page shell',
        detail:
          'Wrap content in IonPage when using Ionic React routing, then add IonHeader, IonToolbar, IonTitle, and IonContent.',
      },
      {
        title: 'Render readings',
        detail: 'Use IonCard for summary values and IonList/IonItem for a longer sensor history.',
      },
      {
        title: 'Add a validated input',
        detail:
          'Use IonInput with an associated IonLabel and validate its value in your app state before submitting.',
      },
      {
        title: 'Present feedback',
        detail:
          'Use an inline state for persistent errors, a toast for brief confirmation, an alert for a decision, and a modal for a multi-step task.',
      },
    ],
    examples: [
      {
        title: 'Ionic React sensor page',
        filename: 'src/pages/Home.tsx',
        language: 'tsx',
        code: 'import { IonButton, IonCard, IonCardContent, IonContent,\n  IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from \'@ionic/react\';\n\nexport default function Home() {\n  return (\n    <IonPage>\n      <IonHeader><IonToolbar><IonTitle>Sensor Monitor</IonTitle></IonToolbar></IonHeader>\n      <IonContent className="ion-padding">\n        <IonCard><IonCardContent>Light: 245 lux</IonCardContent></IonCard>\n        <IonList>\n          <IonItem><IonLabel>Distance: 320 mm</IonLabel></IonItem>\n          <IonItem><IonLabel>Soil moisture: 46%</IonLabel></IonItem>\n        </IonList>\n        <IonButton expand="block">Refresh readings</IonButton>\n      </IonContent>\n    </IonPage>\n  );\n}',
        explanation:
          'Ionic React components are imported as React components. IonPage contains the routed view; IonContent owns scrolling.',
        expectedOutput:
          'A responsive Ionic page displays a header, light card, sensor list, and full-width refresh button.',
      },
      {
        title: 'Input and selection',
        filename: 'src/components/SensorFilter.tsx',
        language: 'tsx',
        code: 'import { IonInput, IonItem, IonLabel, IonSearchbar, IonSelect,\n  IonSelectOption } from \'@ionic/react\';\n\n<IonSearchbar aria-label="Search sensors" placeholder="Search sensors" />\n<IonItem>\n  <IonLabel position="stacked">Device name</IonLabel>\n  <IonInput value={deviceName} onIonInput={(event) =>\n    setDeviceName(event.detail.value ?? \'\')} />\n</IonItem>\n<IonItem>\n  <IonLabel>Time range</IonLabel>\n  <IonSelect value={range} onIonChange={(event) => setRange(event.detail.value)}>\n    <IonSelectOption value="hour">Last hour</IonSelectOption>\n    <IonSelectOption value="day">Last day</IonSelectOption>\n  </IonSelect>\n</IonItem>',
        explanation:
          'Use Ionic input events such as onIonInput and onIonChange, and keep selected values in React state. Components are framework-wrapped APIs rather than raw custom HTML tags in React.',
        expectedOutput:
          'The user can type a device name and choose a time range; React state reflects both values.',
      },
      {
        title: 'Tabs, menu, and overlays',
        filename: 'src/components/FeedbackExamples.tsx',
        language: 'tsx',
        code: 'const [showModal, setShowModal] = useState(false);\nconst [showLoading, setShowLoading] = useState(false);\n\n<IonTabs>{/* IonRouterOutlet and IonTabBar go here */}</IonTabs>\n<IonMenu contentId="main-content">...</IonMenu>\n<IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>\n  <IonContent className="ion-padding">Sensor details</IonContent>\n</IonModal>\n<IonAlert isOpen={showAlert} header="Delete reading?" buttons={[\'Cancel\', \'Delete\']} />\n<IonToast isOpen={showToast} message="Saved" duration={1800} />\n<IonLoading isOpen={showLoading} message="Loading readings..." />',
        explanation:
          'IonTabs, IonMenu, IonModal, IonAlert, IonToast, and IonLoading serve distinct navigation or feedback jobs. Wire their open/close state and callbacks in a real page.',
        expectedOutput:
          'Tabs switch main sections; menu opens navigation; overlays show and dismiss according to app state.',
      },
    ],
    diagram: {
      title: 'Ionic component composition',
      nodes: [
        'IonPage route container',
        'IonHeader and IonToolbar',
        'IonContent scrollable area',
        'Cards, lists, forms, tabs, and overlays',
      ],
    },
    activity:
      'Build a sensor screen with a header, searchbar, select filter, list, add-reading modal, delete confirmation alert, and save toast.',
    quiz: [
      question(
        'Multiple choice',
        'Which Ionic element is the normal scrollable content area in a page?',
        'ion-content / IonContent',
        ['ion-title / IonTitle', 'ion-loading / IonLoading'],
        'IonContent manages the routed page’s main scrollable content.',
      ),
      question(
        'True or false',
        'A toast is generally a brief, non-blocking confirmation.',
        'True',
        ['False', 'It replaces navigation'],
        'A toast provides transient feedback; use other components for decisions or complex tasks.',
      ),
      question(
        'Code reading',
        'Which callback is appropriate for handling an Ionic React input change?',
        'onIonInput',
        ['onAndroidBuild', 'onMqttRender'],
        'Ionic React inputs emit Ionic events such as onIonInput.',
      ),
    ],
    docs: [docs.components, docs.react, docs.angular],
  },
  {
    slug: 'ionic-navigation',
    title: 'Navigation and Routing',
    level: 'Intermediate',
    minutes: 45,
    summary:
      'Configure Ionic Router, route parameters, tabs, menus, protected navigation, and lifecycle hooks.',
    objectives: [
      'Create routed Ionic React pages.',
      'Pass route parameters and navigate between pages.',
      'Understand tabs, guards, and page lifecycle.',
    ],
    prerequisites: ['An Ionic React project', 'Basic React components and TypeScript'],
    sections: [
      {
        title: 'Ionic React routing',
        body: 'Ionic React integrates with React Router through @ionic/react-router and IonReactRouter. IonRouterOutlet renders routed pages within Ionic’s navigation model; IonPage is the normal page root. Declare routes explicitly and use a catch-all redirect or not-found page appropriate to the app.',
      },
      {
        title: 'Parameters, tabs, and menus',
        body: 'Use route parameters for identifiers such as /sensors/:sensorId and read them with the router hook. Pass small ephemeral data through navigation state only when a refresh or deep link need not recreate it; fetch canonical records by ID. Tabs use IonTabs, IonRouterOutlet, IonTabBar, and IonTabButton. A menu links to app routes and needs a contentId matching the main content.',
      },
      {
        title: 'Authentication and page lifecycle',
        body: 'Protect private routes by checking authentication state and redirecting to sign-in while preserving the destination when appropriate. Keep authorization enforcement on the backend; a hidden route is not access control. Ionic React page lifecycle events such as useIonViewWillEnter and useIonViewDidLeave fit routed view transitions; clean up listeners, timers, and subscriptions.',
      },
    ],
    steps: [
      {
        title: 'Declare routes',
        detail:
          'Add route entries for the dashboard, sensor detail, and sign-in pages using the routing setup generated by your Ionic starter.',
      },
      {
        title: 'Pass an identifier',
        detail:
          'Navigate to /sensors/42 and read the route parameter; load the authorized record from the API.',
      },
      {
        title: 'Add tab or side-menu navigation',
        detail: 'Wrap tab destinations in IonTabs or add menu links that target registered routes.',
      },
      {
        title: 'Add a route guard',
        detail:
          'Check auth state, redirect when signed out, and always verify permissions on the backend as well.',
      },
    ],
    examples: [
      {
        title: 'React routes and parameter',
        filename: 'src/App.tsx',
        language: 'tsx',
        code: "import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';\nimport { IonReactRouter } from '@ionic/react-router';\nimport { Redirect, Route } from 'react-router-dom';\nimport Home from './pages/Home';\nimport SensorDetail from './pages/SensorDetail';\n\nsetupIonicReact();\n\n<IonApp>\n  <IonReactRouter>\n    <IonRouterOutlet>\n      <Route exact path=\"/home\" component={Home} />\n      <Route exact path=\"/sensors/:sensorId\" component={SensorDetail} />\n      <Route exact path=\"/\" render={() => <Redirect to=\"/home\" />} />\n    </IonRouterOutlet>\n  </IonReactRouter>\n</IonApp>",
        explanation:
          'The route declares a named sensorId segment. Check the generated React Router major version and starter conventions before copying route APIs into another version.',
        expectedOutput:
          'The home path renders Home, a sensor ID path renders its detail page, and the root redirects to home.',
      },
      {
        title: 'Protect a route',
        filename: 'src/App.tsx',
        language: 'tsx',
        code: 'function PrivateRoute({ isAuthenticated, children }: {\n  isAuthenticated: boolean;\n  children: React.ReactNode;\n}) {\n  return isAuthenticated ? <>{children}</> : <Redirect to="/login" />;\n}\n\n<Route exact path="/sensors/:sensorId">\n  <PrivateRoute isAuthenticated={auth.isSignedIn}>\n    <SensorDetail />\n  </PrivateRoute>\n</Route>',
        explanation:
          'This client-side route changes what the UI displays. It is not a security boundary: FastAPI or another backend must independently authenticate and authorize each protected request.',
        expectedOutput:
          'Signed-in users see the sensor page; signed-out users are sent to login. Unauthorized API calls remain blocked by the backend.',
      },
    ],
    diagram: {
      title: 'Ionic page navigation',
      nodes: [
        'User selects a tab, menu, or link',
        'Router matches path and parameters',
        'IonRouterOutlet activates a page',
        'Page lifecycle loads or cleans up data',
      ],
    },
    activity:
      'Create a protected sensor route. Redirect a signed-out user to sign-in, then after sign-in return to the requested sensor page and verify backend authorization.',
    quiz: [
      question(
        'Multiple choice',
        'Why should a sensor detail route use a sensor ID rather than depend only on transient navigation state?',
        'The page can reload or deep-link and fetch the canonical record by ID',
        ['IDs automatically encrypt the backend', 'It disables browser history'],
        'A stable identifier lets a route be restored and data be fetched again.',
      ),
      question(
        'True or false',
        'Hiding a route in the Ionic UI is sufficient authorization for protected sensor data.',
        'False',
        ['True', 'Only in production'],
        'The backend must enforce authentication and authorization on protected resources.',
      ),
      question(
        'Code reading',
        'What is IonRouterOutlet responsible for?',
        'Rendering the matched routed page within Ionic navigation',
        ['Compiling TypeScript to Java', 'Storing SQLite passwords'],
        'IonRouterOutlet is Ionic’s routed page outlet.',
      ),
    ],
    docs: [docs.react, docs.angular, docs.ionic],
  },
  {
    slug: 'javascript-typescript',
    title: 'JavaScript and TypeScript for Ionic',
    level: 'Beginner–Intermediate',
    minutes: 55,
    summary:
      'Practice JavaScript and TypeScript values, functions, arrays, interfaces, async code, and React state.',
    objectives: [
      'Use JavaScript variables, arrays, objects, and functions.',
      'Define TypeScript interfaces and union types.',
      'Handle promises and update UI state.',
    ],
    prerequisites: ['Node.js installed', 'A browser or Ionic project'],
    sections: [
      {
        title: 'JavaScript essentials',
        body: 'Use const for bindings that should not be reassigned and let for reassigned values. Arrays store ordered values; objects store named properties. Use map/filter for common transformations and if, switch, and loops for control flow. Functions can be declared or assigned as arrow functions.',
      },
      {
        title: 'TypeScript and UI props',
        body: 'TypeScript adds static types that are checked before execution. Interfaces and type aliases describe data contracts; union types represent valid alternatives such as number | null. React props should be typed, and Ionic Angular services/classes can use types for constructor and API models. Runtime JSON still needs validation: TypeScript types do not validate untrusted server responses.',
      },
      {
        title: 'Async work and state',
        body: 'A Promise represents an eventual result; async functions return promises and await pauses within that function. Catch network failures explicitly. In React, use state setters to update render state; do not mutate a state array or object in place. In Angular, use the app’s established signals, observables, or service pattern consistently.',
      },
    ],
    steps: [
      {
        title: 'Type a sensor record',
        detail: 'Define fields with nullable values because some sensors may be missing.',
      },
      {
        title: 'Transform a list',
        detail:
          'Filter readings by time and map them into chart points without mutating the source array.',
      },
      {
        title: 'Call an async function',
        detail:
          'Use await inside try/catch and update loading, data, and error state in separate branches.',
      },
    ],
    examples: [
      {
        title: 'TypeScript model and transform',
        filename: 'src/models/reading.ts',
        language: 'typescript',
        code: 'export interface Reading {\n  timestamp: string;\n  light_lux: number | null;\n  soil_moisture_percent: number | null;\n}\n\nconst latestLight = (readings: Reading[]): number | null => {\n  const latest = readings.find((item) => item.light_lux !== null);\n  return latest?.light_lux ?? null;\n};',
        explanation:
          'The interface documents the API data shape. The nullable number and optional chaining represent a missing reading without claiming it is zero.',
        expectedOutput:
          'latestLight returns a sensor value, or null when no reading has a light value.',
      },
      {
        title: 'Async state in React',
        filename: 'src/pages/Home.tsx',
        language: 'tsx',
        code: "const [loading, setLoading] = useState(false);\nconst [error, setError] = useState<string | null>(null);\n\nasync function refresh() {\n  setLoading(true);\n  setError(null);\n  try {\n    const next = await sensorApi.current();\n    setReading(next);\n  } catch (cause) {\n    setError(cause instanceof Error ? cause.message : 'Request failed');\n  } finally {\n    setLoading(false);\n  }\n}",
        explanation:
          'The function models loading, success, failure, and cleanup. The service parses and validates the API; React state drives visible feedback.',
        expectedOutput:
          'The screen shows a spinner while loading, the new reading on success, and a retryable error on failure.',
      },
      {
        title: 'JavaScript collections',
        filename: 'src/utils/readings.js',
        language: 'javascript',
        code: "const readings = [\n  { sensor: 'light', lux: 220 },\n  { sensor: 'light', lux: 245 },\n  { sensor: 'soil', lux: null },\n];\n\nconst validLight = readings\n  .filter((item) => item.sensor === 'light' && item.lux !== null)\n  .map((item) => item.lux);\n\nconsole.log(validLight);",
        explanation:
          'filter selects actual light values and map extracts their lux readings without changing the original array.',
        expectedOutput: '[220, 245]',
      },
      {
        title: 'HTML and CSS structure',
        filename: 'src/components/SensorPanel.html',
        language: 'html',
        code: `<section class="sensor-panel" aria-labelledby="sensor-title">
  <h2 id="sensor-title">Current readings</h2>
  <p><span>Light</span><strong>245 lux</strong></p>
</section>

<style>
.sensor-panel { padding: 1rem; border-radius: 1rem; }
.sensor-panel p { display: flex; justify-content: space-between; }
@media (max-width: 420px) { .sensor-panel { padding: .75rem; } }
</style>`,
        explanation:
          'HTML provides semantic structure and an accessible heading. CSS controls layout and adapts padding on a narrow phone. Ionic components provide themed equivalents for common UI patterns.',
        expectedOutput:
          'A labeled sensor card renders with a responsive layout and readable label/value alignment.',
      },
    ],
    diagram: {
      title: 'Typed UI data flow',
      nodes: [
        'HTTP JSON arrives untrusted',
        'Validate and map to a TypeScript model',
        'Async function updates app state',
        'React or Angular renders the new UI',
      ],
    },
    activity:
      'Create a typed array of sensor readings, filter out null light values, and display the latest valid lux reading with an explicit empty state.',
    quiz: [
      question(
        'Multiple choice',
        'Does a TypeScript interface validate JSON received at runtime?',
        'No; validate the received data at runtime',
        ['Yes, it automatically sanitizes JSON', 'Only when using Ionic Angular'],
        'Types are erased at runtime; validate untrusted API responses explicitly.',
      ),
      question(
        'True or false',
        'An async function returns a Promise.',
        'True',
        ['False', 'Only in React'],
        'async functions return promises, including when they return a plain value.',
      ),
      question(
        'Code reading',
        'What does number | null mean?',
        'The value can be a number or explicitly missing',
        ['The value can be any object', 'The number is encrypted'],
        'A union type expresses these two valid value shapes.',
      ),
    ],
    docs: [docs.typescript, docs.react, docs.angular],
  },
  {
    slug: 'backend-rest-api',
    title: 'Backend and REST API Integration',
    level: 'Intermediate',
    minutes: 55,
    summary:
      'Fetch and validate API data, handle auth and errors, and connect Ionic to FastAPI or Node.',
    objectives: [
      'Make GET and POST REST requests.',
      'Use typed API services and parse JSON safely.',
      'Handle authentication, loading states, base URLs, and CORS.',
    ],
    prerequisites: [
      'Basic TypeScript and async/await',
      'A backend URL reachable from the browser or device',
    ],
    sections: [
      {
        title: 'REST methods and services',
        body: 'GET reads resources, POST creates or processes, PUT/PATCH updates, and DELETE removes. Encapsulate requests in a service rather than making every page construct URLs. Fetch is built into browsers; Axios is an optional dependency. Check status codes, parse and validate response envelopes, set timeouts or cancellation, and handle network errors.',
      },
      {
        title: 'Authentication and errors',
        body: 'Send access tokens using authorization headers over HTTPS and store mobile tokens with a secure storage plugin, not localStorage or source code. Handle 401, 403, validation errors, timeouts, offline states, malformed JSON, and empty records. Do not log passwords or tokens. The backend remains responsible for authorization.',
      },
      {
        title: 'API base URL and CORS',
        body: 'A mobile phone must call a host reachable from the phone; localhost refers to the phone itself. Use the computer or Raspberry Pi LAN IP for physical-device development. In an Android emulator, 10.0.2.2 commonly reaches the host computer. HTTPS is required for production. Browser CORS applies to Ionic in the browser; native Capacitor HTTP behavior differs, but the backend should still use an explicit secure origin policy for browser clients.',
      },
      {
        title: 'FastAPI and Node.js',
        body: 'An Ionic client can talk to either FastAPI or Node.js over the same HTTP/JSON contract. The existing project FastAPI service exposes GET /api/readings/current, GET /api/readings, and GET /api/health. Current returns a reading key with a record or null; history returns a readings array.',
      },
    ],
    steps: [
      {
        title: 'Configure a base URL',
        detail:
          'Use an environment-specific public API base URL without secrets. Do not hardcode a device-specific localhost address.',
      },
      {
        title: 'Create a typed service',
        detail:
          'Implement a single API service that performs requests, validates status codes, and maps JSON into app types.',
      },
      {
        title: 'Render request states',
        detail: 'Display loading, data, empty, offline, and retryable failure states separately.',
      },
      {
        title: 'Test on browser and phone',
        detail:
          'Test CORS in a browser and connectivity from a physical device using a reachable LAN address.',
      },
    ],
    examples: [
      {
        title: 'Typed fetch service',
        filename: 'src/services/sensorApi.ts',
        language: 'typescript',
        code: "export type SensorReading = {\n  timestamp: string;\n  tof_distance_mm: number | null;\n  light_lux: number | null;\n  soil_raw: number | null;\n  soil_moisture_percent: number | null;\n  rssi: number | null;\n};\n\nexport async function fetchCurrent(baseUrl: string): Promise<SensorReading | null> {\n  const response = await fetch(`${baseUrl}/api/readings/current`);\n  if (!response.ok) throw new Error(`API returned ${response.status}`);\n  const body: unknown = await response.json();\n  if (typeof body !== 'object' || body === null || !('reading' in body)) {\n    throw new Error('Invalid reading response');\n  }\n  return (body as { reading: SensorReading | null }).reading;\n}",
        explanation:
          'This example validates the HTTP status and response envelope. Production code should validate individual field types using a schema or explicit type guard.',
        expectedOutput:
          'A typed current sensor record or null when the API has no reading; failures throw errors for the UI to report.',
      },
      {
        title: 'POST sign-in and handle status',
        filename: 'src/services/sessionApi.ts',
        language: 'typescript',
        code: "const response = await fetch(`${API_BASE_URL}/api/login`, {\n  method: 'POST',\n  headers: { 'content-type': 'application/json' },\n  body: JSON.stringify({ username, password }),\n});\nif (response.status === 401) throw new Error('Check your sign-in details');\nif (!response.ok) throw new Error(`Sign-in failed: ${response.status}`);\nconst session = await response.json();\nawait secureStorage.set('access-token', session.accessToken);",
        explanation:
          'The login path and response shape are examples; match your backend API. For a native app, use secure storage for a returned token, send it in an authorization header on later requests, use HTTPS, and never log credentials.',
        expectedOutput:
          'Successful credentials return a session and save its access token securely; 401 and other errors are handled distinctly.',
      },
      {
        title: 'Axios GET, PUT, and DELETE',
        filename: 'src/services/readingApi.ts',
        language: 'typescript',
        code: "import axios from 'axios';\n\nconst api = axios.create({ baseURL: API_BASE_URL, timeout: 8000 });\n\nconst { data } = await api.get<{ readings: Reading[] }>('/api/readings', {\n  params: { limit: 50 },\n});\nawait api.put(`/api/readings/${readingId}`, updatedReading);\nawait api.delete(`/api/readings/${readingId}`);",
        explanation:
          'Install Axios with npm install axios. The instance centralizes base URL and timeout; add authorization only when your backend requires it. This CRUD example assumes the backend provides and authorizes those update/delete routes.',
        expectedOutput:
          'GET loads recent readings, PUT updates one record, and DELETE removes it when those backend routes exist.',
      },
    ],
    diagram: {
      title: 'Ionic REST communication',
      nodes: [
        'Page triggers service request',
        'Typed API service sends HTTP',
        'FastAPI or Node returns JSON',
        'Validated model updates UI states',
      ],
    },
    activity:
      'Connect the sensor page to /api/readings/current. Test no data, a stopped server, and an invalid response; show each case distinctly.',
    quiz: [
      question(
        'Multiple choice',
        'What host should a physical phone use to reach a backend running on the developer computer?',
        'The computer’s reachable LAN IPv4 address',
        ['localhost on the phone', 'The npm registry'],
        'Use an address routable from the phone; its localhost is itself.',
      ),
      question(
        'True or false',
        'A TypeScript type declaration alone validates untrusted API JSON at runtime.',
        'False',
        ['True', 'Only for GET'],
        'TypeScript types do not replace runtime response validation.',
      ),
      question(
        'Code reading',
        'What should the UI do when fetch throws due to a network failure?',
        'Display an explicit error or offline state with a retry option',
        ['Show zero values as if the request worked', 'Ignore the error'],
        'Surface failures and preserve distinct loading, empty, and error states.',
      ),
    ],
    docs: [docs.api, docs.react, docs.capacitor],
  },
  {
    slug: 'database-integration',
    title: 'Database Integration and Offline Data',
    level: 'Intermediate',
    minutes: 45,
    summary:
      'Choose browser storage, SQLite, or Firebase appropriately and implement safe CRUD patterns.',
    objectives: [
      'Distinguish local web storage, SQLite, and remote databases.',
      'Plan CRUD and offline synchronization.',
      'Protect database credentials and user data.',
    ],
    prerequisites: [
      'TypeScript data models',
      'An Ionic starter; native SQLite requires Capacitor setup',
    ],
    sections: [
      {
        title: 'Browser persistence',
        body: 'localStorage is synchronous and appropriate only for small, non-sensitive web preferences. IndexedDB is better for structured browser data and larger offline caches. Neither should contain secrets. Web storage does not automatically synchronize between the browser build and a native app.',
      },
      {
        title: 'SQLite and Firebase',
        body: 'For native offline relational data, use a maintained Capacitor SQLite plugin and follow its native setup, migration, and licensing requirements. On web, use its documented web implementation or IndexedDB where supported. Firebase offers hosted services such as Authentication and Firestore; configure platform credentials and restrictive Security Rules before using user data.',
      },
      {
        title: 'CRUD and synchronization',
        body: 'Keep protected authoritative records on the backend; the mobile app should not contain a production database password. Add create/read/update/delete operations through a repository. Decide how offline changes queue, how duplicates/conflicts are resolved, how long cached sensor history is retained, and how users see stale cached data.',
      },
    ],
    steps: [
      {
        title: 'Choose storage for the use case',
        detail:
          'Use preferences for small settings, IndexedDB for browser structured data, and SQLite for native relational offline data.',
      },
      {
        title: 'Add and configure the plugin',
        detail:
          'For example, install @capacitor-community/sqlite, run npx cap sync, then install jeep-sqlite and complete its platform-specific Android, iOS, and web setup from the plugin’s current documentation.',
      },
      {
        title: 'Define schema and migrations',
        detail:
          'Version the schema, use parameterized values, and implement CRUD through a repository.',
      },
      {
        title: 'Test offline/reconnect behavior',
        detail: 'Test empty, stale, queued-write, conflict, and sync-failure states explicitly.',
      },
    ],
    examples: [
      {
        title: 'Small browser preference',
        filename: 'src/services/preferences.ts',
        language: 'typescript',
        code: "export function saveDisplayUnit(unit: 'mm' | 'cm'): void {\n  localStorage.setItem('display-unit', unit);\n}\n\nexport function readDisplayUnit(): 'mm' | 'cm' {\n  return localStorage.getItem('display-unit') === 'cm' ? 'cm' : 'mm';\n}",
        explanation:
          'This is a minimal browser-only preference example. Never use localStorage for authentication secrets; use a native secure-storage solution for sensitive mobile tokens.',
        expectedOutput:
          'The selected display unit persists across browser refreshes on that origin.',
      },
      {
        title: 'SQLite repository shape',
        filename: 'src/services/readingRepository.ts',
        language: 'typescript',
        code: "interface ReadingRecord {\n  id?: number;\n  timestamp: string;\n  light_lux: number | null;\n}\n\nexport async function saveReading(record: ReadingRecord) {\n  const db = await getDatabase();\n  return db.run(\n    'INSERT INTO readings (timestamp, light_lux) VALUES (?, ?)',\n    [record.timestamp, record.light_lux],\n  );\n}\n\nexport async function recentReadings(limit: number) {\n  const db = await getDatabase();\n  return db.query('SELECT * FROM readings ORDER BY timestamp DESC LIMIT ?', [limit]);\n}",
        explanation:
          'The plugin-specific getDatabase helper represents the SQLite plugin connection setup. Bind values through the driver instead of interpolating user-controlled SQL.',
        expectedOutput:
          'A timestamped record is added and the newest rows can be queried from the local database.',
      },
      {
        title: 'SQLite package setup',
        filename: 'Terminal',
        language: 'bash',
        code: 'npm install @capacitor-community/sqlite\nnpx cap sync\nnpm install jeep-sqlite\nnpx cap sync',
        explanation:
          'Install the Capacitor SQLite plugin and synchronize native projects. The web implementation uses jeep-sqlite and requires documented web initialization and asset setup; follow the current plugin README for exact steps.',
        expectedOutput:
          'The native plugin is added to the Android/iOS projects; after web configuration, the same repository interface can use the web implementation.',
      },
    ],
    diagram: {
      title: 'Choose persistence deliberately',
      nodes: [
        'Small preference → browser storage',
        'Browser offline data → IndexedDB',
        'Native offline relational data → SQLite plugin',
        'Shared authoritative data → secured backend or Firebase',
      ],
    },
    activity:
      'Store a display-unit preference locally, then outline how sensor history would be cached in SQLite and synchronized with FastAPI after reconnecting.',
    quiz: [
      question(
        'Multiple choice',
        'Where should a production database password live?',
        'On the trusted backend, never in the mobile client',
        ['In localStorage', 'In a committed .env file bundled with the app'],
        'Mobile bundles can be inspected; keep database credentials server-side.',
      ),
      question(
        'True or false',
        'localStorage is an appropriate place for a small non-sensitive display preference in the browser.',
        'True',
        ['False', 'Only for video'],
        'A small UI preference is a reasonable localStorage use.',
      ),
      question(
        'Code reading',
        'Why does the SQLite example use ? placeholders?',
        'To bind values safely instead of constructing SQL with user input',
        ['To add Ionic components', 'To enable CORS'],
        'Parameterized values help prevent SQL injection and quoting errors.',
      ),
    ],
    docs: [docs.capacitor, docs.plugins, docs.pubdev],
  },
  {
    slug: 'ionic-capacitor',
    title: 'Ionic with Capacitor and Native Plugins',
    level: 'Intermediate',
    minutes: 60,
    summary:
      'Connect Ionic web builds to native Android projects and use Capacitor plugins with permissions.',
    objectives: [
      'Explain Ionic/Capacitor roles.',
      'Add and sync Android platform projects.',
      'Use native plugins with appropriate permissions and testing.',
    ],
    prerequisites: [
      'A built Ionic application',
      'Node.js and npm',
      'Android Studio and Android SDK for Android builds',
    ],
    sections: [
      {
        title: 'Ionic and Capacitor relationship',
        body: 'Ionic supplies the web UI framework; Capacitor provides the native runtime, generated platform projects, and plugin bridge. Capacitor requires a package.json, a separate built web directory such as dist or www, and an index.html at the web directory root. Use the generated project’s Capacitor configuration to set appId, appName, and webDir.',
      },
      {
        title: 'Add and synchronize Android',
        body: 'Install @capacitor/core and the CLI, initialize Capacitor, install @capacitor/android, and add Android. Build the web app before syncing so the native project receives current assets. npx cap sync android copies web assets and updates native plugin/platform dependencies. npx cap open android opens the project in Android Studio.',
      },
      {
        title: 'Native features and permissions',
        body: 'Official plugins include Camera, Geolocation, Filesystem, Device, and Push Notifications. Install each plugin, sync the native project, and follow its Android/iOS permission and configuration instructions. Ask permissions in context, handle denial and unsupported devices, and test on real hardware. Push notifications additionally require provider setup and native credentials.',
      },
      {
        title: 'Development server versus packaged app',
        body: 'A local dev server URL can be configured temporarily for live reload, but it requires a reachable network and is not the production bundle. Use HTTPS for production APIs. Do not assume a Capacitor build can package a server-rendered website as static files; confirm the framework outputs a static web directory first.',
      },
    ],
    steps: [
      {
        title: 'Install Capacitor packages',
        detail:
          'Run npm install @capacitor/core and npm install -D @capacitor/cli in the web project.',
      },
      {
        title: 'Initialize and configure',
        detail:
          'Run npx cap init and set a reverse-domain app ID, human-readable name, and correct webDir from the web framework build.',
      },
      {
        title: 'Add Android',
        detail:
          'Install @capacitor/android, then run npx cap add android once to create the native Android project.',
      },
      {
        title: 'Build, sync, and open',
        detail:
          'Run the web build command, npx cap sync android, then npx cap open android. Repeat build and sync after web or plugin changes.',
      },
    ],
    examples: [
      {
        title: 'Capacitor Android command sequence',
        filename: 'Terminal',
        language: 'bash',
        code: 'npm install @capacitor/core\nnpm install -D @capacitor/cli\nnpx cap init\nnpm install @capacitor/android\nnpx cap add android\nnpm run build\nnpx cap sync android\nnpx cap open android',
        explanation:
          'core is the runtime; the CLI initializes and manages native projects; cap init writes configuration; Android package and cap add create the platform project; build generates web assets; sync copies assets and plugin changes; open launches Android Studio.',
        expectedOutput:
          'An Android project appears in android/ and opens in Android Studio with the latest built web app and plugin configuration.',
      },
      {
        title: 'Use the Camera plugin',
        filename: 'src/features/camera.ts',
        language: 'typescript',
        code: "import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';\n\nconst photo = await Camera.getPhoto({\n  quality: 85,\n  allowEditing: false,\n  resultType: CameraResultType.Uri,\n  source: CameraSource.Prompt,\n});\nconsole.log(photo.webPath ?? photo.path);",
        explanation:
          'Install @capacitor/camera, sync Android, and follow the plugin docs for permission behavior and platform support. Show and handle cancellation rather than treating it as a camera failure.',
        expectedOutput:
          'The user chooses a camera or photo source and the app receives a URI that can be displayed or uploaded.',
      },
    ],
    diagram: {
      title: 'Ionic web app to native plugin',
      nodes: [
        'Ionic build output in dist/',
        'Capacitor copies assets into Android project',
        'WebView runs Ionic UI',
        'Plugin bridge calls Camera / GPS / Files / Device',
      ],
    },
    activity:
      'Add Capacitor to a simple Ionic starter, sync Android, then add Camera and test grant, denial, and cancel flows on a physical Android device.',
    quiz: [
      question(
        'Multiple choice',
        'What does npx cap sync android do?',
        'Copies web assets and updates the Android project/plugin dependencies',
        ['Publishes an app to Play Store', 'Starts a React development server'],
        'Sync updates the native project from the latest web build and installed plugins.',
      ),
      question(
        'True or false',
        'Ionic is the native plugin bridge and Capacitor is only a set of UI components.',
        'False',
        ['True', 'Only for iOS'],
        'Ionic provides UI components; Capacitor provides native runtime and plugin integration.',
      ),
      question(
        'Code reading',
        'What should follow a web app build before opening Android Studio?',
        'npx cap sync android',
        ['npm uninstall @capacitor/core', 'ionic start again'],
        'Sync copies the fresh build and plugin changes to the native project.',
      ),
    ],
    docs: [
      docs.capacitorInstall,
      docs.plugins,
      docs.camera,
      docs.geolocation,
      docs.filesystem,
      docs.device,
      docs.notifications,
    ],
  },
  {
    slug: 'iot-sensor-integration',
    title: 'ESP32, Raspberry Pi, and Sensor Integration',
    level: 'Advanced',
    minutes: 60,
    summary: 'Connect an Ionic app to FastAPI sensor readings and build reliable live dashboards.',
    objectives: [
      'Trace ESP32 → MQTT → Raspberry Pi → FastAPI → Ionic.',
      'Parse current and historical sensor API responses.',
      'Handle refresh, charts, offline states, and stale device data.',
    ],
    prerequisites: [
      'Ionic and TypeScript basics',
      'A reachable FastAPI service or sample API responses',
      'Optional ESP32, sensors, Raspberry Pi, and MQTT broker',
    ],
    sections: [
      {
        title: 'IoT data architecture',
        body: 'An ESP32 samples a ToF distance sensor, BH1750 light sensor, and capacitive soil sensor. It publishes MQTT messages to a broker. A Raspberry Pi service subscribes, stores records in SQLite, and exposes a FastAPI REST API. Ionic calls the API; it should not connect to Pi GPIO or the database directly. MQTT-to-mobile is a separate design requiring a secured broker or server-side WebSocket bridge.',
      },
      {
        title: 'API fields and device status',
        body: 'The current-reading route returns {reading: objectOrNull}; history returns {readings: [...]}. Fields include timestamp, tof_distance_mm, light_lux, soil_raw, soil_moisture_percent, and rssi. The health endpoint mqtt_connected refers to the backend MQTT connection, not proof the ESP32 is online. Show last-message freshness or add a device heartbeat/status contract for ESP32 connection state.',
      },
      {
        title: 'Refresh, charts, and failures',
        body: 'Use a bounded polling interval or a secured WebSocket extension. Cancel timers and streams on page leave, prevent overlapping requests, and show loading, empty, stale, offline, and error states separately. Use a maintained chart library, preserve units and timestamps, and never render absent readings as zero. The current FastAPI example exposes REST routes; it does not include a WebSocket endpoint.',
      },
      {
        title: 'LAN and production security',
        body: 'On a physical phone, configure the Raspberry Pi’s reachable LAN address, not localhost. Confirm the API port is allowed only on the intended local network. Use HTTPS for production and avoid exposing MQTT broker or database ports to the public internet.',
      },
    ],
    steps: [
      {
        title: 'Verify API health',
        detail:
          'Open /api/health from the client network and verify the backend is responding; identify MQTT bridge status separately from sensor freshness.',
      },
      {
        title: 'Fetch current data',
        detail:
          'Call /api/readings/current and validate the reading envelope and each optional field.',
      },
      {
        title: 'Add a history chart',
        detail:
          'Fetch /api/readings?limit=100, parse timestamps, sort chronologically, and label distance, lux, and moisture units.',
      },
      {
        title: 'Simulate disconnects',
        detail:
          'Stop FastAPI, broker, and ESP32 separately. Explain which health signal is unavailable and show retry/stale states.',
      },
    ],
    examples: [
      {
        title: 'Typed sensor model',
        filename: 'src/models/SensorReading.ts',
        language: 'typescript',
        code: "export interface SensorReading {\n  timestamp: string;\n  tof_distance_mm: number | null;\n  light_lux: number | null;\n  soil_raw: number | null;\n  soil_moisture_percent: number | null;\n  rssi: number | null;\n}\n\nexport function parseReading(value: unknown): SensorReading {\n  if (typeof value !== 'object' || value === null || !('timestamp' in value)) {\n    throw new Error('Invalid sensor reading');\n  }\n  return value as SensorReading;\n}",
        explanation:
          'The interface documents expected fields; the guard checks only the envelope example. Production parsing should validate each field type rather than relying on a TypeScript assertion.',
        expectedOutput:
          'A reading includes a timestamp and optional ToF, light, soil, moisture percentage, and Wi-Fi RSSI values.',
      },
      {
        title: 'Periodic refresh cleanup',
        filename: 'src/hooks/useSensorRefresh.ts',
        language: 'typescript',
        code: "useEffect(() => {\n  let active = true;\n  let inFlight = false;\n  const refresh = async () => {\n    if (inFlight) return;\n    inFlight = true;\n    try {\n      const next = await sensorApi.current();\n      if (active) setReading(next);\n    } catch (cause) {\n      if (active) setError(cause instanceof Error ? cause.message : 'Offline');\n    } finally {\n      inFlight = false;\n    }\n  };\n  void refresh();\n  const timer = window.setInterval(() => void refresh(), 5000);\n  return () => {\n    active = false;\n    window.clearInterval(timer);\n  };\n}, []);",
        explanation:
          'The effect clears its timer, prevents overlapping requests, and ignores a late response after cleanup. In a real hook, include dependencies for values referenced by refresh.',
        expectedOutput:
          'The current reading refreshes at most once every five seconds while the page is active, and the timer stops when the component unmounts.',
      },
      {
        title: 'Render a simple SVG history chart',
        filename: 'src/components/ReadingChart.tsx',
        language: 'tsx',
        code: 'type Point = { timestamp: string; light_lux: number | null };\n\nfunction ReadingChart({ points }: { points: Point[] }) {\n  const values = points.filter(\n    (point): point is Point & { light_lux: number } => point.light_lux !== null,\n  );\n  const max = Math.max(1, ...values.map((point) => point.light_lux));\n  const coordinates = values.map((point, index) => {\n    const x = values.length < 2 ? 0 : (index / (values.length - 1)) * 300;\n    const y = 100 - (point.light_lux / max) * 90;\n    return `${x},${y}`;\n  });\n  return <svg viewBox="0 0 300 110" role="img" aria-label="Light readings over time">\n    <polyline points={coordinates.join(\' \')} fill="none" stroke="currentColor" />\n  </svg>;\n}',
        explanation:
          'This small SVG example visualizes valid lux readings without adding a chart dependency. A production chart should also show timestamp labels, units, missing data gaps, and an accessible text summary.',
        expectedOutput:
          'Available lux readings appear as a line scaled to the current maximum; null sensor values are omitted rather than shown as zero.',
      },
    ],
    diagram: {
      title: 'ESP32 sensor data to Ionic screen',
      nodes: [
        'ToF, BH1750, and soil sensors on ESP32',
        'Wi-Fi / MQTT to Raspberry Pi bridge',
        'FastAPI REST and SQLite history',
        'Ionic cards, status, and history charts',
      ],
    },
    activity:
      'Build a dashboard for distance, light, soil moisture, RSSI, and timestamp. Stop FastAPI and the ESP32 separately; show a meaningful stale/offline status for each case.',
    quiz: [
      question(
        'Multiple choice',
        'Which route returns the current sensor record in this project?',
        'GET /api/readings/current',
        ['POST /api/build/android', 'GET /api/camera/permission'],
        'The FastAPI API exposes the current reading at /api/readings/current.',
      ),
      question(
        'True or false',
        'If FastAPI reports mqtt_connected=true, that guarantees the ESP32 is online and currently sending data.',
        'False',
        ['True', 'Only on a Raspberry Pi'],
        'It indicates the backend’s broker connection; device freshness requires a heartbeat or recent reading.',
      ),
      question(
        'Code reading',
        'How should a null light_lux value be displayed?',
        'As missing/unavailable, not as 0 lux',
        ['As 0 lux automatically', 'As a successful API status'],
        'Missing data differs from a measured zero and should be represented accurately.',
      ),
    ],
    docs: [docs.api, docs.capacitor, docs.ionic],
  },
  {
    slug: 'android-build-deploy',
    title: 'Building and Deploying Android Applications',
    level: 'Intermediate–Advanced',
    minutes: 45,
    summary:
      'Build Ionic web assets, sync Android, test on emulator or phone, and package signed releases.',
    objectives: [
      'Run browser and Android builds.',
      'Generate and find APK/AAB outputs.',
      'Understand signing and update requirements.',
    ],
    prerequisites: [
      'Node.js and Ionic project',
      'Capacitor Android project',
      'Android Studio, Android SDK, and Java/Gradle toolchain',
    ],
    sections: [
      {
        title: 'Build and test',
        body: 'Use ionic serve for browser development. For native Android, ionic build creates web assets, npx cap sync android copies them and plugin changes into the Android project, and npx cap open android opens the project in Android Studio. Test with an emulator and physical device; they exercise different hardware and network environments.',
      },
      {
        title: 'APK and AAB outputs',
        body: 'In Android Studio use Build > Build APK(s) for a debug APK, or the signed bundle/APK wizard for a release. With Gradle, a debug APK commonly appears under android/app/build/outputs/apk/debug/ and release APK under android/app/build/outputs/apk/release/; a release bundle is under android/app/build/outputs/bundle/release/. Exact paths can differ by variant and build configuration. Capacitor sync does not itself produce a signed release.',
      },
      {
        title: 'Signing and updates',
        body: 'Create a release keystore and retain it securely; never commit signing passwords or private keys. Configure signing using protected local properties or CI secrets. Increment app version/build metadata for releases, test the signed artifact, and distribute APK/AAB through a trusted channel. Losing the signing key can prevent updates under the same application identity.',
      },
    ],
    steps: [
      {
        title: 'Test in browser',
        detail:
          'Run ionic serve and check routes, responsive layout, API CORS, and browser behavior.',
      },
      {
        title: 'Build and sync native assets',
        detail: 'Run ionic build followed by npx cap sync android.',
      },
      {
        title: 'Run Android app',
        detail:
          'Open Android Studio with npx cap open android, select an emulator or USB-debugging device, and run the app.',
      },
      {
        title: 'Generate release artifact',
        detail:
          'Configure signing securely, then use Android Studio’s signed APK/AAB flow and test the resulting release output.',
      },
    ],
    examples: [
      {
        title: 'Web build to Android project',
        filename: 'Terminal',
        language: 'bash',
        code: 'ionic build\nnpx cap sync android\nnpx cap open android',
        explanation:
          'Build generates web assets; sync updates the native project with those assets and plugin dependencies; open launches Android Studio. Build APK or AAB from Android Studio/Gradle after signing setup.',
        expectedOutput:
          'Android Studio opens the synced project. Debug and release artifacts are generated under android/app/build/outputs/ after a native build.',
      },
    ],
    diagram: {
      title: 'Ionic Android release flow',
      nodes: [
        'ionic build produces web bundle',
        'Capacitor sync updates android/',
        'Android Studio / Gradle builds native app',
        'Sign and distribute APK or AAB',
      ],
    },
    activity:
      'Install a debug APK on a physical phone. Then document the signing key location, version number, artifact path, and safe process for a test release.',
    quiz: [
      question(
        'Multiple choice',
        'Which command creates the Ionic web asset bundle before native sync?',
        'ionic build',
        ['ionic publish', 'npx cap clean database'],
        'Build produces the frontend assets that Capacitor sync copies to Android.',
      ),
      question(
        'True or false',
        'npx cap sync android alone creates a signed release APK.',
        'False',
        ['True', 'Only with ionic serve'],
        'Sync updates native assets and plugins; Android build and signing create release artifacts.',
      ),
      question(
        'Code reading',
        'Where is a common Gradle release APK output directory?',
        'android/app/build/outputs/apk/release/',
        ['src/theme/release/', 'node_modules/android.apk'],
        'Gradle’s standard Android app output is under android/app/build/outputs.',
      ),
    ],
    docs: [docs.deployment, docs.android, docs.capacitor],
  },
  {
    slug: 'complete-ionic-iot-app',
    title: 'Complete Ionic IoT Mobile Application',
    level: 'Advanced',
    minutes: 75,
    summary:
      'Combine Ionic React, TypeScript, Capacitor, FastAPI, MQTT, SQLite, and sensor monitoring.',
    objectives: [
      'Structure an Ionic feature and API service.',
      'Render current and historical sensor readings.',
      'Test reliability and build a native Android app.',
    ],
    prerequisites: [
      'Completed Ionic UI, API, database, and Capacitor lessons',
      'A reachable FastAPI service or sample sensor JSON',
      'Optional ESP32, MQTT broker, and Raspberry Pi',
    ],
    sections: [
      {
        title: 'Project architecture',
        body: 'ESP32 samples ToF, BH1750, and capacitive soil sensors and publishes MQTT. A Raspberry Pi MQTT bridge stores records in SQLite and exposes FastAPI REST endpoints. Ionic React presents sensor pages and charts; TypeScript models response data; Capacitor packages the app and enables selected native plugins. Keep database and broker credentials on trusted infrastructure.',
      },
      {
        title: 'Dashboard features',
        body: 'Show distance in mm, light in lux, soil moisture percent, raw ADC soil value when useful, RSSI, last reading timestamp, and separate API/broker/device freshness status. Use a maintained chart library for history and label units. Do not treat mqtt_connected as ESP32 presence; track last device message or add a heartbeat route.',
      },
      {
        title: 'Offline, history, and security',
        body: 'Use a local SQLite plugin or browser storage according to platform needs; keep data ownership and synchronization explicit. Report API and network errors, retry with limits, cache recent history deliberately, and label cached data. Use HTTPS outside trusted development LANs and authenticated server endpoints for protected data.',
      },
      {
        title: 'End-to-end verification',
        body: 'Test browser CORS, phone LAN connectivity, Android permissions, app background/resume, empty database, stale sensor data, and backend restart. The current project has REST endpoints; WebSocket streaming is an optional backend feature, not an existing API.',
      },
    ],
    steps: [
      {
        title: 'Scaffold and define the data contract',
        detail:
          'Create Ionic React app, a SensorReading type, and service functions for current and history endpoints.',
      },
      {
        title: 'Implement loading and error states',
        detail:
          'Build reusable cards and dashboard state for loading, no data, offline, stale, and last successful response.',
      },
      {
        title: 'Add sensor history and chart',
        detail:
          'Request bounded history, sort by parsed timestamp, and render labeled chart series with null data omitted.',
      },
      {
        title: 'Package and test Android',
        detail:
          'Build the web app, sync Capacitor, run in Android Studio, and test the reachable Pi API from a real phone.',
      },
    ],
    examples: [
      {
        title: 'Service and response model',
        filename: 'src/services/sensorApi.ts',
        language: 'typescript',
        code: 'export type SensorReading = {\n  timestamp: string;\n  tof_distance_mm: number | null;\n  light_lux: number | null;\n  soil_raw: number | null;\n  soil_moisture_percent: number | null;\n  rssi: number | null;\n};\n\nexport async function currentReading(baseUrl: string) {\n  const response = await fetch(`${baseUrl}/api/readings/current`);\n  if (!response.ok) throw new Error(`Sensor API: ${response.status}`);\n  const body = await response.json() as { reading: SensorReading | null };\n  return body.reading;\n}\n\nexport async function readingHistory(baseUrl: string, limit = 100) {\n  const response = await fetch(`${baseUrl}/api/readings?limit=${limit}`);\n  if (!response.ok) throw new Error(`History API: ${response.status}`);\n  return (await response.json() as { readings: SensorReading[] }).readings;\n}',
        explanation:
          'The service keeps route details out of the page and maps the project’s current and history response envelopes. Add runtime field validation and request cancellation for production.',
        expectedOutput:
          'Current and history functions return typed records or throw a surfaced HTTP error.',
      },
      {
        title: 'Dashboard card and refresh',
        filename: 'src/pages/Home.tsx',
        language: 'tsx',
        code: 'const [reading, setReading] = useState<SensorReading | null>(null);\nconst [error, setError] = useState<string | null>(null);\n\n<IonRefresher slot="fixed" onIonRefresh={async (event) => {\n  try {\n    setReading(await currentReading(API_BASE_URL));\n    setError(null);\n  } catch (cause) {\n    setError(cause instanceof Error ? cause.message : \'Sensor API unavailable\');\n  } finally {\n    event.detail.complete();\n  }\n}}>\n  <IonRefresherContent />\n</IonRefresher>\n<IonCard>\n  <IonCardHeader><IonCardTitle>Light intensity</IonCardTitle></IonCardHeader>\n  <IonCardContent>\n    {reading?.light_lux == null ? \'No recent reading\' : `${reading.light_lux.toFixed(1)} lux`}\n  </IonCardContent>\n</IonCard>\n{error && <IonText color="danger">{error}</IonText>}',
        explanation:
          'Ionic refresher provides an explicit user-triggered refresh. The card preserves null as missing data and reports an error instead of presenting a fabricated sensor value.',
        expectedOutput:
          'Pull-to-refresh fetches new data, displays a lux card, and surfaces API failure in the page.',
      },
    ],
    diagram: {
      title: 'Complete Ionic IoT stack',
      nodes: [
        'ESP32 sensors and MQTT publisher',
        'Raspberry Pi MQTT bridge and SQLite',
        'FastAPI current/history REST API',
        'Ionic React + TypeScript + Capacitor app',
      ],
    },
    activity:
      'Implement current readings, a history chart, pull-to-refresh, and separate API/MQTT/device status. Test with missing sensor values and stopped backend.',
    quiz: [
      question(
        'Multiple choice',
        'Which component is the mobile app’s API boundary in this project?',
        'FastAPI REST service on the Raspberry Pi',
        ['Direct access to SQLite files over Wi-Fi', 'The Ionic theme stylesheet'],
        'The app calls FastAPI; the backend owns MQTT and SQLite access.',
      ),
      question(
        'True or false',
        'A missing sensor reading should be displayed as a measured value of zero.',
        'False',
        ['True', 'Only in charts'],
        'Keep missing values distinct from measured zero.',
      ),
      question(
        'Code reading',
        'Why does the dashboard refresh handler always call event.detail.complete() in finally?',
        'To stop the Ionic refresher animation on both success and failure',
        ['To publish an MQTT message', 'To sign the APK'],
        'The UI control must complete even when the network request fails.',
      ),
    ],
    docs: [docs.react, docs.api, docs.capacitor, docs.deployment],
  },
]

export const ionicLessonSlugs = [
  ...ionicLessons.map((lesson) => lesson.slug),
  'ionic-final-assessment',
]

export const ionicFinalAssessment: IonicQuizQuestion[] = [
  question(
    'Multiple choice',
    'What does Ionic Framework primarily provide?',
    'Web UI components used with React, Angular, or Vue',
    ['A native SQL database', 'An MQTT broker'],
    'Ionic is a web UI framework.',
  ),
  question(
    'True or false',
    'Capacitor and Ionic are different tools that can be used together.',
    'True',
    ['False', 'Only on Android'],
    'Ionic builds the web UI; Capacitor packages it in native projects and exposes plugins.',
  ),
  question(
    'Code reading',
    'What does npx cap sync android do after ionic build?',
    'Copies the built web assets and updates native plugin dependencies',
    ['Generates a new ESP32 firmware binary', 'Deploys an AAB to Google Play'],
    'Sync updates the native project but does not publish/sign a release.',
  ),
  question(
    'Multiple choice',
    'Which API route returns the latest sensor reading for this project?',
    'GET /api/readings/current',
    ['GET /api/theme/colors', 'POST /android/build'],
    'The FastAPI sensor service exposes current readings at this route.',
  ),
  question(
    'True or false',
    'mqtt_connected being true always proves the ESP32 has sent a recent message.',
    'False',
    ['True', 'Only in Ionic Angular'],
    'That field describes the backend’s MQTT connection; track message freshness separately.',
  ),
  question(
    'Multiple choice',
    'Where should production database credentials be stored?',
    'On the trusted backend, not in the bundled mobile app',
    ['In a public TypeScript file', 'In browser localStorage'],
    'A distributed mobile bundle cannot keep database credentials secret.',
  ),
]
