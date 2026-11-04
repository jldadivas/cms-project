import type { CodeBlockItem } from '@/data/esp32-course-data'

export interface RaspberryPiCourseTopic {
  title: string
  detail: string
}

export interface RaspberryPiCourseModule {
  id: string
  moduleNumber: number
  slug: string
  title: string
  level: 'Beginner–Intermediate' | 'Intermediate' | 'Advanced'
  description: string
  objectives: string[]
  topics: RaspberryPiCourseTopic[]
  tutorialSteps: { title: string; detail: string }[]
  diagram: string[]
  codeBlocks: CodeBlockItem[]
}

export const raspberryPiCourseModules: RaspberryPiCourseModule[] = [
  {
    id: 'python-programming',
    moduleNumber: 1,
    slug: 'python-programming',
    title: 'Python Programming',
    level: 'Beginner–Intermediate',
    description:
      'After preparing your Pi with the setup guide, learn the Python skills used by its sensor service: create a project, prepare its environment, work with JSON, and run scripts.',
    objectives: [
      'Explain how Python scripts run on Raspberry Pi OS.',
      'Use variables, data types, functions, loops, and JSON.',
      'Install project dependencies without changing system Python.',
      'Create and run a Python virtual environment.',
    ],
    topics: [
      { title: 'Introduction to Python on Raspberry Pi', detail: 'Python is already available on Raspberry Pi OS and is used here for the MQTT-to-HTTP backend.' },
      { title: 'Python fundamentals and syntax', detail: 'Use indentation to group code, names to describe values, and print() to inspect a result.' },
      { title: 'Variables, data types, functions, and loops', detail: 'Store readings as numbers and strings, group reusable work into functions, and repeat actions safely.' },
      { title: 'Working with JSON data', detail: 'Decode the ESP32 JSON payload into Python values before validating or saving sensor readings.' },
      { title: 'Installing Python libraries and dependencies', detail: 'Install FastAPI, Uvicorn, paho-mqtt, and python-dotenv for the project backend.' },
      { title: 'Creating and managing virtual environments', detail: 'Keep project packages in .venv instead of changing packages used by the operating system.' },
      { title: 'Running Python scripts on Raspberry Pi', detail: 'Run a script from the terminal and use its output to check for errors.' },
    ],
    tutorialSteps: [
      { title: 'Open a terminal and check Python', detail: 'Run python3 --version. The Raspberry Pi project uses Python 3 and the python3 command.' },
      { title: 'Create a project folder and virtual environment', detail: 'Create a folder for the backend, enter it, and run python3 -m venv .venv.' },
      { title: 'Activate the environment and install packages', detail: 'Run source .venv/bin/activate, then install the packages listed in the project setup.' },
      { title: 'Run a small script and inspect its output', detail: 'Save the example as check_payload.py and run python check_payload.py while the environment is active.' },
    ],
    diagram: ['ESP32 JSON payload', 'Python parses values', 'Validate readings', 'Save or serve data'],
    codeBlocks: [
      {
        id: 'python-project-setup',
        title: 'Create the Python environment',
        filename: 'terminal',
        language: 'bash',
        code: 'mkdir -p ~/sensor-backend\ncd ~/sensor-backend\npython3 -m venv .venv\nsource .venv/bin/activate\npython -m pip install --upgrade pip\npip install fastapi uvicorn paho-mqtt python-dotenv',
        explanation: 'Run these commands on Raspberry Pi OS. Activate .venv again whenever you open a new terminal for this project.',
      },
      {
        id: 'python-json-example',
        title: 'Read an ESP32 JSON message',
        filename: 'check_payload.py',
        language: 'python',
        code: 'import json\n\npayload = \'{"tof_mm": 148, "lux": 420.5, "soil_raw": 1840, "rssi": -64}\'\nreading = json.loads(payload)\n\nprint(f"Distance: {reading[\'tof_mm\']} mm")\nprint(f"Light: {reading[\'lux\']} lux")\nprint(f"Soil ADC: {reading[\'soil_raw\']}")',
        explanation: 'json.loads converts JSON text into a Python dictionary. A real MQTT callback decodes the received message before processing it.',
        expectedOutput: 'Distance: 148 mm\nLight: 420.5 lux\nSoil ADC: 1840',
      },
    ],
  },
  {
    id: 'mqtt-communication',
    moduleNumber: 2,
    slug: 'mqtt-communication',
    title: 'MQTT Communication',
    level: 'Intermediate',
    description:
      'Set up Mosquitto and follow sensor messages from the ESP32 publisher to the Raspberry Pi subscriber.',
    objectives: [
      'Describe the MQTT broker, publisher, subscriber, topic, and message.',
      'Install and verify Mosquitto on Raspberry Pi.',
      'Connect the ESP32 sensor publisher to the Pi broker.',
      'Inspect and troubleshoot JSON sensor messages.',
    ],
    topics: [
      { title: 'Introduction to MQTT protocol', detail: 'MQTT is a lightweight publish/subscribe protocol suited to small sensor messages.' },
      { title: 'Understanding MQTT broker, publisher, and subscriber', detail: 'The ESP32 publishes, Mosquitto routes messages, and the Python backend subscribes.' },
      { title: 'Installing and configuring Mosquitto', detail: 'Install the broker and client tools, then enable the broker service.' },
      { title: 'Understanding MQTT topics and messages', detail: 'The project uses esp32/tof_light_soil_data for readings and esp32/tof_light_soil_status for device status.' },
      { title: 'Connecting ESP32 to Raspberry Pi through MQTT', detail: 'Configure the ESP32 with the Pi address, broker port 1883, and the correct topic.' },
      { title: 'Receiving ESP32 sensor readings', detail: 'Use mosquitto_sub to confirm that the broker receives the sensor node messages.' },
      { title: 'Processing JSON sensor messages', detail: 'Parse tof_mm, lux, soil_raw, and rssi from each sensor payload.' },
      { title: 'Testing and troubleshooting MQTT communication', detail: 'Check network reachability, broker status, IP address, port, topic, and credentials.' },
    ],
    tutorialSteps: [
      { title: 'Install and start Mosquitto', detail: 'Install the broker and clients, then enable and start the mosquitto service.' },
      { title: 'Find the Raspberry Pi address', detail: 'Run hostname -I and use the reachable LAN address in the ESP32 MQTT configuration.' },
      { title: 'Subscribe to the sensor topic', detail: 'Open a second terminal and subscribe to the project data topic to watch incoming JSON.' },
      { title: 'Compare the message with the expected payload', detail: 'Confirm that the topic and keys match the Python backend before debugging later stages.' },
    ],
    diagram: ['ESP32 publisher', 'Wi-Fi / TCP port 1883', 'Mosquitto broker', 'Python subscriber'],
    codeBlocks: [
      {
        id: 'mosquitto-install',
        title: 'Install and start Mosquitto',
        filename: 'terminal',
        language: 'bash',
        code: 'sudo apt update\nsudo apt install -y mosquitto mosquitto-clients\nsudo systemctl enable --now mosquitto\nsudo systemctl status mosquitto',
        explanation: 'A running broker is required before either the ESP32 or Python subscriber can exchange messages.',
      },
      {
        id: 'mqtt-subscribe',
        title: 'Watch ESP32 sensor messages',
        filename: 'terminal',
        language: 'bash',
        code: 'mosquitto_sub -h localhost -p 1883 -t esp32/tof_light_soil_data -v',
        explanation: 'Run this on the Raspberry Pi. The -v option prints both the topic and payload. The ESP32 should publish JSON about every five seconds.',
        expectedOutput: 'esp32/tof_light_soil_data {"tof_mm":148,"lux":420.5,"soil_raw":1840,"rssi":-64}',
      },
      {
        id: 'mosquitto-secure-config',
        title: 'Add password authentication for LAN clients',
        filename: '/etc/mosquitto/conf.d/sensor.conf',
        language: 'bash',
        code: 'sudo mosquitto_passwd -c /etc/mosquitto/passwd sensor_client\nsudo nano /etc/mosquitto/conf.d/sensor.conf\n\n# Add these lines to sensor.conf:\nlistener 1883\nallow_anonymous false\npassword_file /etc/mosquitto/passwd\n\nsudo systemctl restart mosquitto\nsudo systemctl status mosquitto',
        explanation: 'Enter a strong password when prompted, then configure the ESP32 and backend with the same credentials. Keep port 1883 limited to your trusted LAN; do not expose it to the public internet.',
      },
    ],
  },
  {
    id: 'fastapi-backend',
    moduleNumber: 3,
    slug: 'fastapi-backend',
    title: 'FastAPI Backend Development',
    level: 'Intermediate',
    description:
      'Build and run the Python service that subscribes to MQTT, validates sensor data, calculates soil moisture, and exposes HTTP endpoints.',
    objectives: [
      'Create a FastAPI application and run it with Uvicorn.',
      'Understand how the MQTT callback processes sensor messages.',
      'Calculate soil moisture using the project calibration values.',
      'Test the backend endpoints on the Raspberry Pi.',
    ],
    topics: [
      { title: 'Introduction to FastAPI', detail: 'FastAPI defines Python functions as HTTP endpoints and generates interactive API documentation.' },
      { title: 'Installing FastAPI and Uvicorn', detail: 'Install both packages inside the project virtual environment.' },
      { title: 'Creating a Python backend project', detail: 'Keep main.py, the virtual environment, environment settings, and SQLite file organized.' },
      { title: 'Understanding the main.py file', detail: 'The project file configures MQTT, initializes SQLite, starts the API, and defines routes.' },
      { title: 'Connecting FastAPI with the MQTT broker', detail: 'The application starts a Paho MQTT client and connects it to Mosquitto.' },
      { title: 'Understanding MQTT callbacks', detail: 'on_connect subscribes to topics; on_message parses and stores readings.' },
      { title: 'Processing incoming sensor readings', detail: 'The backend validates tof_mm, lux, soil_raw, and rssi before saving a row.' },
      { title: 'Calculating soil moisture percentage', detail: 'The project maps dry raw 2527 and wet raw 1237 to a clamped 0–100 percent value.' },
      { title: 'Creating and testing API endpoints', detail: 'Use current-reading, historical-reading, and health routes to check the service.' },
      { title: 'Running FastAPI on Raspberry Pi', detail: 'Bind Uvicorn to 0.0.0.0:8080 so other devices on the LAN can reach it.' },
    ],
    tutorialSteps: [
      { title: 'Install the backend packages', detail: 'Activate .venv and install FastAPI, Uvicorn, paho-mqtt, and python-dotenv.' },
      { title: 'Configure broker and calibration settings', detail: 'Set MQTT_HOST to the broker address and keep the dry/wet soil calibration values consistent with your probe.' },
      { title: 'Start the API service', detail: 'Run Uvicorn with main:app, host 0.0.0.0, and port 8080.' },
      { title: 'Test the API and MQTT health', detail: 'Open /docs or request /api/health from a device on the same network.' },
    ],
    diagram: ['MQTT callback', 'Decode and validate JSON', 'Calibrate soil value', 'SQLite + FastAPI routes'],
    codeBlocks: [
      {
        id: 'fastapi-run',
        title: 'Run FastAPI on the LAN',
        filename: 'terminal',
        language: 'bash',
        code: 'source .venv/bin/activate\nuvicorn main:app --host 0.0.0.0 --port 8080',
        explanation: 'Binding to 0.0.0.0 allows other devices on your local network to connect. Use the Pi LAN IP from the phone or browser.',
      },
      {
        id: 'soil-calculation',
        title: 'Calibrate the raw soil reading',
        filename: 'soil_calibration.py',
        language: 'python',
        code: 'def soil_percent(raw: int, dry: int = 2527, wet: int = 1237) -> float:\n    if dry == wet:\n        raise ValueError("Dry and wet calibration values must differ")\n    percent = (raw - dry) * 100.0 / (wet - dry)\n    return round(max(0.0, min(100.0, percent)), 1)\n\nprint(soil_percent(1840))',
        explanation: 'This matches the project calibration: the dry reading maps to 0%, the wet reading maps to 100%, and values are clamped to that range.',
        expectedOutput: '51.9',
      },
      {
        id: 'fastapi-test',
        title: 'Check the backend endpoints',
        filename: 'terminal',
        language: 'bash',
        code: 'curl http://localhost:8080/api/health\ncurl http://localhost:8080/api/readings/current\ncurl "http://localhost:8080/api/readings?limit=10"',
        explanation: 'The health route reports broker and database status; current returns the newest reading; readings returns recent history.',
      },
    ],
  },
  {
    id: 'sqlite-database',
    moduleNumber: 4,
    slug: 'sqlite-database',
    title: 'SQLite Database Management',
    level: 'Intermediate',
    description:
      'Store and inspect sensor readings on the Pi with SQLite, from table creation through current and historical queries.',
    objectives: [
      'Explain how the project uses a local SQLite database.',
      'Create and inspect the readings table.',
      'Save, query, and troubleshoot sensor records.',
      'Use a database browser to inspect saved telemetry.',
    ],
    topics: [
      { title: 'Introduction to SQLite', detail: 'SQLite stores structured data in a local database file and needs no separate database server.' },
      { title: 'Creating a SQLite database', detail: 'The backend creates sensor_readings.sqlite3 when its database connection initializes.' },
      { title: 'Understanding database tables and columns', detail: 'The readings table has timestamp, distance, light, soil, moisture, and signal columns.' },
      { title: 'Creating the sensor_readings.sqlite3 database', detail: 'The database path can be configured with SENSOR_DB_PATH; the project default is sensor_readings.sqlite3.' },
      { title: 'Saving ESP32 sensor readings', detail: 'The MQTT callback inserts validated measurements into the readings table.' },
      { title: 'Retrieving current and historical sensor data', detail: 'Order records by newest ID to get the current reading or a limited history.' },
      { title: 'Understanding SQL queries', detail: 'Use SELECT, WHERE, ORDER BY, and LIMIT to inspect the telemetry you need.' },
      { title: 'Viewing the database using DB Browser for SQLite', detail: 'Open a copy of the database in DB Browser to browse rows and run read-only queries.' },
      { title: 'Managing and troubleshooting database records', detail: 'Check the file path, table schema, permissions, timestamps, and insert logs.' },
    ],
    tutorialSteps: [
      { title: 'Start the backend once', detail: 'The application initializes the database and creates the readings table if it does not exist.' },
      { title: 'Check that readings are arriving', detail: 'Confirm the MQTT callback logs inserts before investigating database display tools.' },
      { title: 'Query the latest rows', detail: 'Use sqlite3 or DB Browser to view recent rows in descending ID order.' },
      { title: 'Inspect the schema and file location', detail: 'Confirm the table columns and SENSOR_DB_PATH point to the database you are opening.' },
    ],
    diagram: ['Validated sensor reading', 'SQLite INSERT', 'readings table', 'SELECT for API response'],
    codeBlocks: [
      {
        id: 'sqlite-schema',
        title: 'Project readings table',
        filename: 'main.py',
        language: 'python',
        code: 'CREATE TABLE IF NOT EXISTS readings (\n    id INTEGER PRIMARY KEY AUTOINCREMENT,\n    timestamp TEXT NOT NULL,\n    tof_distance_mm REAL,\n    light_lux REAL,\n    soil_raw INTEGER,\n    soil_moisture_percent REAL,\n    rssi INTEGER\n)',
        explanation: 'The database schema stores one timestamped record for each valid sensor message.',
      },
      {
        id: 'sqlite-query',
        title: 'Inspect recent sensor readings',
        filename: 'sqlite3',
        language: 'bash',
        code: 'sqlite3 sensor_readings.sqlite3\n.tables\n.schema readings\nSELECT timestamp, tof_distance_mm, light_lux, soil_moisture_percent\nFROM readings\nORDER BY id DESC\nLIMIT 10;',
        explanation: 'Run this in the backend folder where the database file is stored. The API also returns history through GET /api/readings.',
      },
      {
        id: 'sqlite-browser',
        title: 'Open the database in DB Browser',
        filename: 'terminal',
        language: 'bash',
        code: 'sudo apt install -y sqlitebrowser\nsqlitebrowser sensor_readings.sqlite3',
        explanation: 'Open the project database and use Browse Data to inspect readings. If the file is on a headless Pi, copy it to a trusted computer first and open the copy.',
      },
    ],
  },
  {
    id: 'rest-expo-integration',
    moduleNumber: 5,
    slug: 'rest-expo-integration',
    title: 'REST API and Expo Go Integration',
    level: 'Intermediate',
    description:
      'Connect the Expo Go app to the Pi API over Wi-Fi, inspect JSON responses, and display current and historical sensor data.',
    objectives: [
      'Explain how an HTTP GET request reads sensor data.',
      'Test API endpoints in Swagger UI, Postman, or a browser.',
      'Configure Expo Go with the Raspberry Pi LAN IP and port.',
      'Display sensor readings and history in a mobile application.',
    ],
    topics: [
      { title: 'Introduction to REST API', detail: 'The backend exposes resources through HTTP routes so the mobile client can request sensor data.' },
      { title: 'Understanding HTTP GET requests', detail: 'GET requests retrieve data and do not change saved readings.' },
      { title: 'Understanding API endpoints and JSON responses', detail: 'The current route returns a reading object; the history route returns an array of readings.' },
      { title: 'Testing APIs using Swagger UI and Postman', detail: 'Use /docs or Postman to send requests and inspect status codes and JSON.' },
      { title: 'Connecting Expo Go to Raspberry Pi', detail: 'The phone and Pi must be able to reach each other on the same network.' },
      { title: 'Configuring the Raspberry Pi IP address and API port', detail: 'Set EXPO_PUBLIC_API_BASE_URL to http://<PI_LAN_IP>:8080; do not use localhost on the phone.' },
      { title: 'Fetching sensor readings from FastAPI', detail: 'Request /api/readings/current and check the response before updating the screen.' },
      { title: 'Displaying ToF, light, and soil moisture readings', detail: 'Render distance in millimeters, illuminance in lux, and calibrated soil moisture in percent.' },
      { title: 'Displaying historical sensor graphs', detail: 'Use readings from the history endpoint to plot a time series in the mobile app.' },
      { title: 'Troubleshooting mobile application connectivity', detail: 'Check the URL, Wi-Fi, API bind address, port, firewall, and CORS settings.' },
    ],
    tutorialSteps: [
      { title: 'Check the Pi API locally', detail: 'Open the Swagger page at http://localhost:8080/docs on the Raspberry Pi.' },
      { title: 'Find the address reachable from the phone', detail: 'Run hostname -I on the Pi and choose the address on the same Wi-Fi network as the phone.' },
      { title: 'Set the mobile app base URL', detail: 'Set EXPO_PUBLIC_API_BASE_URL to the Pi address and port 8080, then restart Expo after changing the environment file.' },
      { title: 'Fetch and display the current reading', detail: 'Request /api/readings/current, check the HTTP response, then render the values from its reading object.' },
    ],
    diagram: ['Expo Go on phone', 'HTTP GET over Wi-Fi', 'FastAPI on Pi :8080', 'SQLite sensor readings'],
    codeBlocks: [
      {
        id: 'expo-api-config',
        title: 'Configure the phone API address',
        filename: 'mobile-app/.env',
        language: 'bash',
        code: 'EXPO_PUBLIC_API_BASE_URL=http://192.168.1.50:8080',
        explanation: 'Replace the sample address with your Raspberry Pi LAN IP. A phone’s localhost points to the phone, not the Pi.',
      },
      {
        id: 'expo-fetch-current',
        title: 'Fetch the latest sensor reading',
        filename: 'sensorApi.ts',
        language: 'typescript',
        code: 'const baseUrl = process.env.EXPO_PUBLIC_API_BASE_URL\n\nexport async function fetchCurrentReading() {\n  if (!baseUrl) throw new Error("Set EXPO_PUBLIC_API_BASE_URL")\n\n  const response = await fetch(`${baseUrl}/api/readings/current`)\n  if (!response.ok) {\n    throw new Error(`Sensor API returned HTTP ${response.status}`)\n  }\n\n  const result = await response.json()\n  return result.reading\n}',
        explanation: 'The current endpoint responds with a JSON object containing reading. Keep network errors visible so the app can show a useful connection state.',
      },
      {
        id: 'api-endpoints',
        title: 'Test the API from a browser or terminal',
        filename: 'terminal',
        language: 'bash',
        code: 'curl http://192.168.1.50:8080/api/health\ncurl http://192.168.1.50:8080/api/readings/current\ncurl "http://192.168.1.50:8080/api/readings?limit=50"',
        explanation: 'Replace 192.168.1.50 with the Pi LAN IP. The same addresses can be opened in Swagger UI at /docs.',
      },
      {
        id: 'expo-history-chart',
        title: 'Draw a simple soil-moisture history chart',
        filename: 'SoilHistoryChart.tsx',
        language: 'typescript',
        code: "import { Text, View } from 'react-native'\n\ntype Reading = {\n  timestamp?: string\n  soil_moisture_percent?: number | null\n}\n\nexport function SoilHistoryChart({ records }: { records: Reading[] }) {\n  const points = records.slice().reverse()\n  if (points.length === 0) return <Text>No history yet</Text>\n\n  return (\n    <View accessibilityLabel=\"Soil moisture history\">\n      <Text>Soil moisture history (%)</Text>\n      <View style={{ height: 140, flexDirection: 'row', alignItems: 'flex-end', gap: 4 }}>\n        {points.map((reading, index) => {\n          const percent = Math.max(0, Math.min(100, reading.soil_moisture_percent ?? 0))\n          return (\n            <View\n              key={`${reading.timestamp ?? 'reading'}-${index}`}\n              accessibilityLabel={`${percent}% soil moisture`}\n              style={{ flex: 1, height: `${Math.max(percent, 2)}%`, backgroundColor: '#16845b' }}\n            />\n          )\n        })}\n      </View>\n    </View>\n  )\n}",
        explanation: 'Pass the readings array returned by GET /api/readings?limit=20. Each bar shows one stored soil moisture percentage; add axis labels or a chart library for a richer graph.',
      },
    ],
  },
  {
    id: 'complete-iot-system',
    moduleNumber: 6,
    slug: 'complete-iot-system',
    title: 'Complete IoT System',
    level: 'Advanced',
    description:
      'Bring the whole project together: sensors, ESP32 firmware, MQTT, the Raspberry Pi backend, SQLite, REST, and the Expo Go app.',
    objectives: [
      'Explain the end-to-end sensor data flow.',
      'Verify each service independently before testing the full system.',
      'Identify common failures at each system boundary.',
      'Operate the complete project from sensors to mobile display.',
    ],
    topics: [
      { title: 'Understanding the complete IoT system architecture', detail: 'Sensors feed the ESP32; the Pi bridges MQTT messages to stored readings and HTTP; Expo Go presents the data.' },
      { title: 'ESP32 and sensor integration', detail: 'The ESP32 reads VL53L0X distance, BH1750 light, and analog soil moisture sensors.' },
      { title: 'ESP32-to-Raspberry Pi MQTT communication', detail: 'The ESP32 publishes sensor JSON over Wi-Fi to the Pi Mosquitto broker.' },
      { title: 'Mosquitto MQTT broker configuration', detail: 'The broker listens for clients and routes the project data and status topics.' },
      { title: 'FastAPI MQTT-to-HTTP bridge', detail: 'A Python subscriber processes MQTT messages while FastAPI exposes readings to HTTP clients.' },
      { title: 'SQLite sensor data storage', detail: 'Validated readings and calibrated moisture values are persisted locally.' },
      { title: 'REST API integration', detail: 'The API provides current readings, historical data, and service health.' },
      { title: 'Expo Go mobile application integration', detail: 'The phone requests the Pi API and displays distance, light, soil moisture, and history.' },
      { title: 'Understanding the complete sensor data flow', detail: 'Follow a measurement from sensor pins through JSON, MQTT, SQLite, REST, and the mobile screen.' },
      { title: 'Running and testing the entire system', detail: 'Start the broker and API, power the ESP32, then check the API and mobile app.' },
      { title: 'Troubleshooting the complete IoT project', detail: 'Test each boundary in order: sensor, Wi-Fi, MQTT, callback, database, API, and app.' },
    ],
    tutorialSteps: [
      { title: 'Start Mosquitto on the Raspberry Pi', detail: 'Check systemctl status mosquitto and confirm the broker is ready on port 1883.' },
      { title: 'Start the FastAPI bridge', detail: 'Activate the backend virtual environment and run Uvicorn on 0.0.0.0:8080.' },
      { title: 'Power the ESP32 and confirm MQTT messages', detail: 'Watch esp32/tof_light_soil_data with mosquitto_sub and check that sensor values are changing.' },
      { title: 'Verify database and API results', detail: 'Check /api/health and /api/readings/current, then inspect history if the current record is empty.' },
      { title: 'Connect the Expo Go app', detail: 'Set the Pi LAN IP in the app environment, restart Expo, and confirm the displayed measurements update.' },
    ],
    diagram: ['VL53L0X · BH1750 · Soil', 'ESP32 reads and publishes JSON', 'Mosquitto on Raspberry Pi', 'FastAPI → SQLite → REST', 'Expo Go dashboard'],
    codeBlocks: [
      {
        id: 'system-startup',
        title: 'Start and verify the Raspberry Pi services',
        filename: 'terminal',
        language: 'bash',
        code: 'sudo systemctl enable --now mosquitto\nsudo systemctl status mosquitto\ncd ~/sensor-backend\nsource .venv/bin/activate\nuvicorn main:app --host 0.0.0.0 --port 8080',
        explanation: 'Start the broker first, then the backend. In another terminal, confirm the ESP32 publishes and the API stores its readings.',
      },
      {
        id: 'system-health',
        title: 'Run the end-to-end API checks',
        filename: 'terminal',
        language: 'bash',
        code: 'curl http://localhost:8080/api/health\ncurl http://localhost:8080/api/readings/current\ncurl "http://localhost:8080/api/readings?limit=5"',
        explanation: 'Check broker connection status, latest sensor values, and stored history before investigating the mobile screen.',
      },
    ],
  },
]
