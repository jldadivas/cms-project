import type { Payload } from 'payload'
import { toLessonSlug } from '@/utilities/toLessonSlug'
import { guideLessonSteps } from './guide-lesson-steps'
import {
  guideLessonCodeExamples,
  guideLessonVideos,
} from './guide-lesson-resources'

export const guideTopics = [
  {
    slug: 'introduction-to-the-system',
    title: 'Introduction to Expo Go',
    summary: 'Learn what Expo Go does and how it fits into the React Native development workflow.',
    sections: [
      {
        heading: 'What is Expo Go?',
        body: 'Expo Go runs a React Native app on a phone during development. Scan a QR code to preview the mobile interface without first building a standalone app.',
      },
      {
        heading: 'What do you need to use Expo Go?',
        description: 'Prepare your phone and computer, start an Expo project, and connect the preview.',
        body: 'To preview a React Native project, you need a supported Android or iOS phone with Expo Go, a computer with Node.js and npm, an Expo project, and a network path from the phone to the development server. The steps below take you from checking the tools to opening your first screen. Basic JavaScript or TypeScript and React Native knowledge helps, but you can learn those concepts as you build.',
      },
      {
        heading: 'Understand the development workflow',
        description: 'Follow the loop from creating a project and editing code to testing it on your phone.',
        body: 'Create a React Native project, edit its screens and logic, start the Expo development server, and open the QR code in Expo Go. Metro bundles and serves your JavaScript to the phone. Fast Refresh applies many code edits while the app stays open. When the app needs live data or device control, it can make a separate API or WebSocket connection to a Raspberry Pi, ESP32, or backend.',
      },
    ],
  },
  {
    slug: 'technologies-programming-languages',
    title: 'Expo Go and React Native Basics',
    summary: 'Get familiar with Expo tooling, React Native components, and the Expo SDK.',
    sections: [
      {
        heading: 'Expo CLI and the Metro bundler',
        body: 'Expo CLI starts the development server and provides project commands. Metro bundles your JavaScript and serves it to Expo Go while you build and preview the app.',
      },
      {
        heading: 'React Native components and screens',
        body: 'Build mobile interfaces with React Native components such as View, Text, Pressable, and TextInput. Compose these components into screens that run on iOS and Android.',
      },
      {
        heading: 'Use packages from the Expo SDK',
        body: 'The Expo SDK provides supported APIs and libraries for common mobile features. Install compatible packages with npx expo install so their versions match your project’s Expo SDK.',
      },
    ],
  },
  {
    slug: 'setting-up-expo-go',
    title: 'Setting Up Expo Go',
    summary: 'Prepare your computer and phone, create an Expo project, and open it in Expo Go.',
    sections: [
      {
        heading: 'Install Node.js',
        description: 'Install the Node.js LTS release on Windows, verify npm, and check that your computer is ready for Expo.',
        body: 'Node.js runs JavaScript tools outside the browser. Expo uses Node.js and npm to create projects, install packages, and run the development server. On Windows, download the current LTS installer from the official Node.js website, keep npm and the PATH option enabled, then reopen your terminal and verify node and npm before creating an Expo project.',
      },
      {
        heading: 'Create an Expo project',
        body: 'Run create-expo-app to scaffold a new React Native project. Move into the project folder and start the development server with npx expo start.',
      },
      {
        heading: 'Run the app on a phone',
        body: 'Install Expo Go from the iOS App Store or Google Play, start your project, and scan its QR code. Keep your phone and computer on a network that can reach the development server.',
      },
      {
        heading: 'Navigate the Expo project',
        body: 'Find the app entry point, routes, assets, and package scripts in the generated project. Keep screens and reusable components organized as your app grows.',
      },
    ],
  },
  {
    slug: 'esp32-setup-and-programming',
    title: 'Building Screens with Expo Go',
    summary: 'Create mobile screens with React Native components, styles, and user input.',
    sections: [
      {
        heading: 'Build your first React Native screen',
        body: 'Use View to group content and Text to show labels and instructions. Save your changes and preview the screen in Expo Go.',
      },
      {
        heading: 'Style layouts for mobile',
        body: 'Use React Native style objects and Flexbox to arrange content for different screen sizes. Check the result on a phone in Expo Go as you refine spacing and alignment.',
      },
      {
        heading: 'Handle taps and text input',
        body: 'Use Pressable for touch interactions and TextInput for editable values. Keep user input in React state so the screen updates when it changes.',
      },
      {
        heading: 'Render a list of items',
        body: 'Use FlatList to display collections efficiently, provide a stable key for each item, and use Expo Go to test scrolling and empty states on a device.',
      },
    ],
  },
  {
    slug: 'raspberry-pi-setup',
    title: 'Navigation and State',
    summary: 'Organize app screens, move between routes, and keep interactive UI state in sync.',
    sections: [
      {
        heading: 'Organize screens and reusable components',
        body: 'Keep route-level screens focused and move repeated interface patterns into reusable components. This makes the project easier to understand and update.',
      },
      {
        heading: 'Add navigation with Expo Router',
        body: 'Expo Router maps files in the app directory to screens and routes. Add a route, link to it, and open the project in Expo Go to verify navigation.',
      },
      {
        heading: 'Manage state and user actions',
        body: 'Use React state for values that change, such as a selected tab or form input. Update state in event handlers and confirm that the interface responds as expected.',
      },
    ],
  },
  {
    slug: 'connecting-expo-go-to-devices',
    title: 'Connecting Expo Go to Raspberry Pi and ESP32',
    summary:
      'Build a mobile control app for Raspberry Pi and ESP32, from local network setup and REST APIs to live updates, MQTT, Bluetooth, and safe device commands.',
    sections: [
      {
        heading: 'Understand the phone-to-device connection',
        description: 'Learn the network path between Expo Go and your Raspberry Pi or ESP32.',
        body: 'Expo Go runs on your phone, while your Raspberry Pi or ESP32 runs device code. Put both on a network that allows local devices to communicate. Give the board a reachable IP address, then have the app connect to that address; localhost in the phone app means the phone itself, not the board. A Raspberry Pi can host an API directly. An ESP32 can host a small HTTP server, or connect to a separate server or MQTT broker.',
      },
      {
        heading: 'Create a small Raspberry Pi REST API',
        description: 'Expose simple HTTP endpoints for sensor readings and device actions.',
        body: 'REST is a straightforward starting point: use GET to read device state and POST to request an action. Keep the API on your trusted local network while prototyping, validate command values, and return JSON with clear HTTP status codes. This example uses Flask on a Raspberry Pi; an ESP32 can expose equivalent routes with an embedded web-server library.',
      },
      {
        heading: 'Call the API from your Expo app',
        description: 'Fetch readings, send a command, and show loading or error feedback.',
        body: 'Use the Raspberry Pi’s LAN address in fetch(), not localhost. Handle non-success HTTP responses and network failures so the screen can explain when the board is offline. Store the base URL in app configuration rather than repeating it throughout the app.',
      },
      {
        heading: 'Stream live updates with WebSocket',
        description: 'Use a persistent connection when device readings need to update immediately.',
        body: 'HTTP requests are useful for occasional reads and commands. For a continuous stream, a WebSocket can push new sensor values to the phone without repeatedly polling. The device or a small server on the Pi must provide a WebSocket endpoint, and the app should handle connection errors and reconnects.',
      },
      {
        heading: 'Use MQTT for IoT messaging',
        description: 'Publish and subscribe to device topics through an MQTT broker.',
        body: 'MQTT uses a broker to route small messages between publishers and subscribers. For example, an ESP32 can publish sensor data to home/room1/temperature while the phone subscribes to that topic. The broker needs a WebSocket listener for a React Native app to connect over WebSocket; never expose a broker without authentication and access controls.',
      },
      {
        heading: 'Choose Bluetooth and understand Expo Go limits',
        description: 'Know when BLE is a better fit and when you need a development build.',
        body: 'Bluetooth Low Energy is useful for nearby, low-power communication, especially during device setup or when Wi-Fi is unavailable. Direct BLE support depends on a native library, and the required native module is not included in Expo Go by default. Use a development build with a compatible BLE library for direct Bluetooth access. If you need to stay in Expo Go, use a network API or WebSocket instead.',
      },
      {
        heading: 'Secure and troubleshoot the connection',
        description: 'Check reachability, permissions, and safe handling of device commands.',
        body: 'Start by testing the board’s API from another device on the same Wi-Fi. Verify the IP address, port, server bind address, and firewall or router client-isolation settings. Do not put long-lived passwords or broker secrets in a mobile app. Require authentication for sensitive actions, validate commands on the device, and use TLS and a trusted remote service rather than exposing a home device directly to the public internet.',
      },
    ],
  },
  {
    slug: 'data-communication-methods',
    title: 'Testing and Debugging with Expo Go',
    summary: 'Use Fast Refresh, development tools, and device testing to catch issues early.',
    sections: [
      {
        heading: 'Use Fast Refresh',
        body: 'Fast Refresh applies many code edits while the app is open in Expo Go. Save a change, confirm it appears, and reload the app if its state or connection becomes stale.',
      },
      {
        heading: 'Inspect logs and errors',
        body: 'Read errors in the terminal and Expo development tools, then use the stack trace to locate the failing component or request. Fix the cause and reload the app to verify it.',
      },
      {
        heading: 'Test on a physical device',
        body: 'Preview on iOS or Android with Expo Go and check touch targets, safe areas, and device-specific behavior. A simulator can help, but it does not replace testing on a phone.',
      },
    ],
  },
  {
    slug: 'mobile-app-features',
    title: 'Using Expo SDK Features',
    summary: 'Add app assets and native device capabilities using libraries supported by Expo Go.',
    sections: [
      {
        heading: 'Add images, icons, and fonts',
        body: 'Place image assets in the project, load them with React Native components, and configure app icons and fonts using Expo’s supported tooling.',
      },
      {
        heading: 'Use device APIs in Expo Go',
        body: 'Choose Expo SDK libraries that support the feature you need, install them with npx expo install, and follow their permission requirements before previewing.',
      },
      {
        heading: 'Understand Expo Go limitations',
        body: 'Expo Go includes a defined set of native modules. If your app needs a custom native module that is not included, create a development build instead of expecting it to run in Expo Go.',
      },
    ],
  },
  {
    slug: 'system-architecture',
    title: 'From Expo Go to a Production App',
    summary: 'Understand the difference between a development preview and a distributable app.',
    sections: [
      {
        heading: 'Expo Go is a development preview',
        body: 'Expo Go is useful for developing and testing compatible projects, but it is not the installable production app you distribute to users.',
      },
      {
        heading: 'Know when to create a development build',
        body: 'Use a development build when your app needs custom native code or a native module that is unavailable in Expo Go. The build provides a custom development client for your project.',
      },
      {
        heading: 'Prepare a release build with EAS',
        body: 'Use EAS Build to create installable app binaries for distribution and testing. Review the Expo build and submission guides before releasing to an app store.',
      },
    ],
  },
] as const

export const seedGuidePages = async (
  payload: Payload,
  { syncExisting = true }: { syncExisting?: boolean } = {},
): Promise<void> => {
  for (const [index, topic] of guideTopics.entries()) {
    const existingPage = await payload.find({
      collection: 'pages',
      depth: 0,
      limit: 1,
      overrideAccess: true,
      where: {
        slug: {
          equals: topic.slug,
        },
      },
    })

    const topicSections = topic.sections.map((section) => {
      const heading = section.heading
      const lessonSlug = toLessonSlug(heading)
      const lessonKey = `${topic.slug}/${lessonSlug}`
      const video = guideLessonVideos[lessonKey]
      const steps = guideLessonSteps[lessonKey] || []
      const codeExamples = guideLessonCodeExamples[lessonKey] || []
      const description =
        'description' in section && typeof section.description === 'string' && section.description.trim()
          ? section.description.trim()
          : section.body.trim().length > 150
            ? `${section.body.trim().slice(0, 147).trimEnd()}...`
            : section.body.trim()

      return {
        heading,
        lessonSlug,
        body: section.body,
        description,
        videoUrl: video?.url || null,
        videoTitle: video?.title || null,
        steps: steps.map((s) => ({
          title: s.title,
          details: s.details,
        })),
        codeExamples: codeExamples.map((c) => ({
          title: c.title,
          language: c.language as any,
          code: c.code,
        })),
      }
    })

    const data = {
      _status: 'published' as const,
      hero: {
        type: 'none' as const,
      },
      layout: [],
      meta: {
        description: topic.summary,
        title: `${topic.title} | Expo Go Guide`,
      },
      slug: topic.slug,
      summary: topic.summary,
      title: topic.title,
      topicOrder: index + 1,
      topicSections,
    }

    if (existingPage.docs.length > 0) {
      if (syncExisting) {
        await payload.update({
          collection: 'pages',
          context: {
            disableRevalidate: true,
          },
          depth: 0,
          id: existingPage.docs[0].id,
          overrideAccess: true,
          data,
        })
      }
      continue
    }

    await payload.create({
      collection: 'pages',
      context: {
        disableRevalidate: true,
      },
      depth: 0,
      overrideAccess: true,
      data,
    })
  }
}
