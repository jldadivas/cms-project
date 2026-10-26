type LessonStep = {
  title: string
  details: string
}

export const guideLessonSteps: Record<string, LessonStep[]> = {
  'introduction-to-the-system/what-is-expo-go': [
    {
      title: 'Create an Expo project',
      details: 'Use create-expo-app to generate a React Native project on your computer.',
    },
    {
      title: 'Start the development server',
      details: 'Run npx expo start in the project folder and wait for the QR code.',
    },
    {
      title: 'Open it in Expo Go',
      details:
        'Scan the QR code with Expo Go and confirm that the starter app opens on your phone.',
    },
  ],
  'introduction-to-the-system/what-do-you-need-to-use-expo-go': [
    {
      title: 'Install the phone app',
      details: 'Install Expo Go from the official App Store or Google Play, and keep it updated.',
    },
    {
      title: 'Check Node.js and npm',
      details: 'Install a Node.js version supported by your Expo SDK, open a new terminal, and check node --version and npm --version.',
    },
    {
      title: 'Create and start a project',
      details: 'Run npx create-expo-app@latest myApp, enter the new folder, and run npx expo start.',
    },
    {
      title: 'Open the QR-code preview',
      details: 'Connect the phone to a network that can reach your computer, then scan the terminal QR code with Expo Go.',
    },
    {
      title: 'Try Fast Refresh',
      details: 'Change a visible text label, save the file, and confirm the open app refreshes.',
    },
    {
      title: 'Learn the next concepts',
      details: 'Practice JavaScript or TypeScript, components, props, state, and basic React Native layout as the project grows.',
    },
  ],
  'introduction-to-the-system/understand-the-development-workflow': [
    {
      title: 'Create the project',
      details: 'Run npx create-expo-app@latest myApp and change into the generated folder.',
    },
    {
      title: 'Start the development server',
      details: 'Run npx expo start and keep the terminal open while the app is being developed.',
    },
    {
      title: 'Open the app in Expo Go',
      details: 'Scan the QR code from your phone on a network that can reach the development computer.',
    },
    {
      title: 'Edit a screen',
      details: 'Change a visible label or layout in the project using React Native components.',
    },
    {
      title: 'Verify Fast Refresh',
      details: 'Save the file and confirm Expo Go updates the screen without starting a new build.',
    },
    {
      title: 'Connect to data when needed',
      details: 'Call a backend or local Pi/ESP32 API from the app, and handle loading, success, and error states.',
    },
  ],
  'technologies-programming-languages/expo-cli-and-the-metro-bundler': [
    {
      title: 'Start Expo CLI',
      details: 'Run npx expo start from the root of your project.',
    },
    {
      title: 'Load the JavaScript bundle',
      details:
        'Open the project in Expo Go so Metro can serve its JavaScript bundle to your phone.',
    },
    {
      title: 'Read the development output',
      details: 'Use the terminal and Expo development tools to inspect server status and errors.',
    },
  ],
  'technologies-programming-languages/react-native-components-and-screens': [
    {
      title: 'Compose a screen',
      details: 'Use View to group elements and Text to display readable content.',
    },
    {
      title: 'Add an interaction',
      details: 'Add a Pressable control and connect it to a clear user action.',
    },
    {
      title: 'Preview on a phone',
      details: 'Open the screen in Expo Go and check that it is readable and usable.',
    },
  ],
  'technologies-programming-languages/use-packages-from-the-expo-sdk': [
    {
      title: 'Choose an Expo SDK library',
      details: 'Find a supported Expo library that provides the API your app needs.',
    },
    {
      title: 'Install a compatible version',
      details: 'Use npx expo install so the installed package matches your Expo SDK.',
    },
    {
      title: 'Test the feature in Expo Go',
      details: 'Follow the library setup and permission instructions, then try it on a device.',
    },
  ],
  'setting-up-expo-go/install-node-js': [
    {
      title: 'Download the Node.js LTS installer',
      details: 'Open the official Node.js website and choose the LTS Windows Installer (.msi), using a release supported by your Expo SDK.',
    },
    {
      title: 'Run the Windows installer',
      details: 'Open the downloaded .msi, accept the license, keep the default features including npm and Add to PATH, then finish installation.',
    },
    {
      title: 'Open a fresh terminal and verify',
      details: 'Close old terminal windows, open Command Prompt or PowerShell, then run node -v and npm -v. Both commands should print version numbers.',
    },
    {
      title: 'Create a test Expo project',
      details: 'Run npx create-expo-app@latest myApp, enter the project folder, and start it with npx expo start.',
    },
    {
      title: 'Fix common PATH problems',
      details: 'If Windows cannot find node or npm, reopen the terminal or restart Windows. If the commands are still missing, rerun the official installer and ensure Add to PATH is enabled.',
    },
  ],
  'setting-up-expo-go/create-an-expo-project': [
    {
      title: 'Create the project',
      details: 'Run npx create-expo-app@latest from a suitable working directory.',
    },
    {
      title: 'Enter the project folder',
      details: 'Change into the new project directory before running Expo commands.',
    },
    {
      title: 'Start Expo',
      details: 'Run npx expo start and wait for the development server to become ready.',
    },
  ],
  'setting-up-expo-go/run-the-app-on-a-phone': [
    {
      title: 'Install Expo Go',
      details: 'Install the Expo Go app on the iOS or Android phone you will use to preview.',
    },
    {
      title: 'Scan the project QR code',
      details: 'With npx expo start running, use Expo Go to scan the QR code.',
    },
    {
      title: 'Confirm Fast Refresh',
      details: 'Edit a screen, save it, and verify that the update appears in the phone preview.',
    },
  ],
  'setting-up-expo-go/navigate-the-expo-project': [
    {
      title: 'Find the app entry point',
      details: 'Open the route or app entry file created by the selected project template.',
    },
    {
      title: 'Locate project assets',
      details: 'Review the assets folder and identify how images and fonts are referenced.',
    },
    {
      title: 'Check available commands',
      details: 'Review package.json scripts for the project’s start, platform, and test commands.',
    },
  ],
  'esp32-setup-and-programming/build-your-first-react-native-screen': [
    {
      title: 'Add a View container',
      details: 'Use a View to group the screen content and apply a simple layout.',
    },
    {
      title: 'Show text',
      details: 'Add a Text component with a short title and supporting message.',
    },
    {
      title: 'Preview your screen',
      details: 'Save the file and verify the screen in Expo Go.',
    },
  ],
  'esp32-setup-and-programming/style-layouts-for-mobile': [
    {
      title: 'Create a style object',
      details: 'Define styles for spacing, color, and typography near the component.',
    },
    {
      title: 'Use Flexbox',
      details: 'Arrange content with flexDirection, alignment, and gap styles.',
    },
    {
      title: 'Check different screen sizes',
      details: 'Preview on a phone and adjust the layout if content is crowded or clipped.',
    },
  ],
  'esp32-setup-and-programming/handle-taps-and-text-input': [
    {
      title: 'Add a Pressable control',
      details: 'Use Pressable for a touch target and provide a visible label.',
    },
    {
      title: 'Add controlled text input',
      details: 'Connect TextInput to state with value and onChangeText.',
    },
    {
      title: 'Verify the interaction',
      details: 'Use Expo Go to tap the control and enter text with the device keyboard.',
    },
  ],
  'esp32-setup-and-programming/render-a-list-of-items': [
    {
      title: 'Prepare list data',
      details: 'Create an array of items with stable identifiers and display values.',
    },
    {
      title: 'Render with FlatList',
      details: 'Provide data, renderItem, and keyExtractor to FlatList.',
    },
    {
      title: 'Test list behavior',
      details: 'Preview scrolling and empty-list behavior in Expo Go.',
    },
  ],
  'raspberry-pi-setup/organize-screens-and-reusable-components': [
    {
      title: 'Identify repeated UI',
      details: 'Find interface elements that appear on more than one screen.',
    },
    {
      title: 'Create a component',
      details: 'Move a repeated element into a component that accepts the data it needs as props.',
    },
    {
      title: 'Keep screens focused',
      details: 'Use the shared component from each screen and keep route-specific logic local.',
    },
  ],
  'raspberry-pi-setup/add-navigation-with-expo-router': [
    {
      title: 'Create a route file',
      details: 'Add a screen file under the app directory following Expo Router conventions.',
    },
    {
      title: 'Link between screens',
      details: 'Use Expo Router links or navigation actions to open the new route.',
    },
    {
      title: 'Test the route',
      details: 'Open the project in Expo Go and navigate to and from the screen.',
    },
  ],
  'raspberry-pi-setup/manage-state-and-user-actions': [
    {
      title: 'Identify changing values',
      details: 'Choose the values that should update the interface after a user action.',
    },
    {
      title: 'Store values in state',
      details: 'Use a state hook and update its value from the relevant event handler.',
    },
    {
      title: 'Test visible feedback',
      details: 'Confirm the screen renders the new value or status in Expo Go.',
    },
  ],
  'connecting-expo-go-to-devices/understand-the-phone-to-device-connection': [
    {
      title: 'Connect both devices',
      details: 'Join the phone and Raspberry Pi or ESP32 to a Wi-Fi network that permits local device traffic.',
    },
    {
      title: 'Find the board IP address',
      details: 'Check your router’s client list or the board’s network command output, then reserve a stable address if possible.',
    },
    {
      title: 'Test reachability',
      details: 'Open the device service URL from another device on the same Wi-Fi before calling it from Expo Go.',
    },
  ],
  'connecting-expo-go-to-devices/create-a-small-raspberry-pi-rest-api': [
    {
      title: 'Install Flask',
      details: 'On the Raspberry Pi, install Flask in a virtual environment or your chosen Python environment.',
    },
    {
      title: 'Add status and command routes',
      details: 'Create a GET route for device status and a validated POST route for a safe test action.',
    },
    {
      title: 'Listen on the network',
      details: 'Bind the development server to 0.0.0.0 and test the route from a second device on the LAN.',
    },
  ],
  'connecting-expo-go-to-devices/call-the-api-from-your-expo-app': [
    {
      title: 'Set the device base URL',
      details: 'Replace the sample IP with the Raspberry Pi or ESP32 address and use the correct service port.',
    },
    {
      title: 'Fetch and validate status',
      details: 'Check response.ok, parse the expected JSON shape, and handle connection failures.',
    },
    {
      title: 'Send a safe test command',
      details: 'Use a harmless action such as changing an LED, then verify the state in the API response.',
    },
  ],
  'connecting-expo-go-to-devices/stream-live-updates-with-websocket': [
    {
      title: 'Start a WebSocket server',
      details: 'Run a WebSocket endpoint on the board or on a service the board can reach.',
    },
    {
      title: 'Connect from the app',
      details: 'Create the socket when the screen mounts and parse each incoming message.',
    },
    {
      title: 'Clean up the connection',
      details: 'Close the socket when leaving the screen and provide visible disconnected or error feedback.',
    },
  ],
  'connecting-expo-go-to-devices/use-mqtt-for-iot-messaging': [
    {
      title: 'Run or choose an MQTT broker',
      details: 'Use a broker reachable by both devices, with MQTT over secure WebSocket enabled for a direct mobile app connection.',
    },
    {
      title: 'Plan topics and permissions',
      details: 'Separate telemetry, availability, and command topics; grant each client only the access it needs.',
    },
    {
      title: 'Test with non-sensitive readings',
      details: 'Publish a sample sensor value, confirm it arrives at the subscriber, and handle reconnects or stale data.',
    },
  ],
  'connecting-expo-go-to-devices/choose-bluetooth-and-understand-expo-go-limits': [
    {
      title: 'Choose Wi-Fi or BLE',
      details: 'Use Wi-Fi when the board is network-reachable; use BLE for nearby, low-power device communication.',
    },
    {
      title: 'Check library support',
      details: 'Verify that the selected BLE library supports your Expo SDK, phone platforms, and required permissions.',
    },
    {
      title: 'Create a development build for native BLE',
      details: 'If the library is not included in Expo Go, build and install a custom development client before testing.',
    },
  ],
  'connecting-expo-go-to-devices/secure-and-troubleshoot-the-connection': [
    {
      title: 'Verify network details',
      details: 'Check IP address, port, route, Wi-Fi isolation, and firewall rules.',
    },
    {
      title: 'Check app and server errors',
      details: 'Inspect the Expo logs, device permission prompts, and server logs to identify the failing layer.',
    },
    {
      title: 'Secure command access',
      details: 'Validate commands on the board and add authentication before allowing important device actions.',
    },
  ],
  'data-communication-methods/use-fast-refresh': [
    {
      title: 'Start the preview',
      details: 'Open the project in Expo Go while the development server is running.',
    },
    {
      title: 'Make a small edit',
      details: 'Change visible text or a style and save the file.',
    },
    {
      title: 'Confirm the refresh',
      details: 'Verify the updated interface appears and reload if the app becomes out of sync.',
    },
  ],
  'data-communication-methods/inspect-logs-and-errors': [
    {
      title: 'Reproduce the issue',
      details:
        'Repeat the action that causes the problem while the Expo development server is running.',
    },
    {
      title: 'Read the error details',
      details:
        'Check the terminal and Expo development tools for the message and relevant stack trace.',
    },
    {
      title: 'Verify the fix',
      details: 'Correct the reported issue and repeat the same action in Expo Go.',
    },
  ],
  'data-communication-methods/test-on-a-physical-device': [
    {
      title: 'Open the app on a phone',
      details: 'Scan the development server’s QR code with Expo Go.',
    },
    {
      title: 'Exercise key interactions',
      details: 'Tap controls, enter text, and move between screens using the device.',
    },
    {
      title: 'Review device-specific behavior',
      details: 'Check safe areas, keyboard behavior, and layout on the target platform.',
    },
  ],
  'mobile-app-features/add-images-icons-and-fonts': [
    {
      title: 'Add assets to the project',
      details: 'Place images and font files in a clearly named project assets folder.',
    },
    {
      title: 'Load assets in the app',
      details: 'Reference the files using supported React Native and Expo APIs.',
    },
    {
      title: 'Preview on a device',
      details: 'Open the app in Expo Go and verify that assets load at the expected size.',
    },
  ],
  'mobile-app-features/use-device-apis-in-expo-go': [
    {
      title: 'Select an Expo SDK API',
      details: 'Choose an Expo library that supports the device capability you want to use.',
    },
    {
      title: 'Install and configure it',
      details: 'Install the compatible package and add its required permissions or configuration.',
    },
    {
      title: 'Test permission behavior',
      details: 'Try the feature in Expo Go and verify both granted and denied permission states.',
    },
  ],
  'mobile-app-features/understand-expo-go-limitations': [
    {
      title: 'Check native module support',
      details: 'Confirm that each required native module is included in the Expo Go app.',
    },
    {
      title: 'Identify custom native code',
      details: 'If a required module is unavailable, plan to use a development build.',
    },
    {
      title: 'Choose the right preview',
      details:
        'Use Expo Go for supported projects and a development build for custom native requirements.',
    },
  ],
  'system-architecture/expo-go-is-a-development-preview': [
    {
      title: 'Use Expo Go during development',
      details: 'Open compatible projects quickly while iterating on screens and app behavior.',
    },
    {
      title: 'Separate preview from release',
      details:
        'Do not treat the Expo Go app as your branded, distributable production application.',
    },
    {
      title: 'Plan the release path',
      details:
        'Choose a development build or production build based on the app’s native requirements.',
    },
  ],
  'system-architecture/know-when-to-create-a-development-build': [
    {
      title: 'Review your dependencies',
      details: 'Check whether your app needs native code that Expo Go does not include.',
    },
    {
      title: 'Create a development build',
      details: 'Configure and build a custom development client for the project.',
    },
    {
      title: 'Continue testing',
      details:
        'Install the development client and use it to preview the app with its native modules.',
    },
  ],
  'system-architecture/prepare-a-release-build-with-eas': [
    {
      title: 'Configure the app',
      details: 'Review app identifiers, version information, icons, and other release settings.',
    },
    {
      title: 'Build for distribution',
      details: 'Use EAS Build to create a platform-specific installable app binary.',
    },
    {
      title: 'Test before publishing',
      details: 'Install and verify the release build before submitting it to an app store.',
    },
  ],
}
