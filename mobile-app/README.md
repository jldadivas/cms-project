# Expo IoT Monitor app

This is a separate React Native application intended to run in Expo Go. It fetches readings from the Raspberry Pi API; it does not connect directly to the sensors.

## Run in Expo Go

1. Install Node.js 22.13 or newer and npm.
2. Copy `.env.example` to `.env` and set `EXPO_PUBLIC_API_BASE_URL` to the backend computer's reachable LAN URL, such as `http://<PI_LAN_IP>:8080`.
3. From this directory, run `npm install` and `npm start`.
4. Install Expo Go on the phone and scan the QR code. Allow LAN access if prompted.

The phone and Raspberry Pi usually need to be on the same local network. Do not use `localhost` as the API host on the phone; it points back to the phone itself. The API must be reachable from the phone, and browser CORS settings do not apply to native Expo Go fetch requests.

The screen refreshes every five seconds and includes explicit loading, offline, empty-reading, and refresh states. The matching backend examples are on the website's `/code-examples` page.
