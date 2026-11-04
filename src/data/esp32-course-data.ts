export interface QuizOption {
  id: string
  text: string
  isCorrect: boolean
  explanation: string
}

export interface QuizQuestion {
  id: string
  question: string
  options: QuizOption[]
  hint?: string
}

export interface CodeBlockItem {
  id: string
  title: string
  language: 'cpp' | 'python' | 'json' | 'bash' | 'typescript'
  filename?: string
  code: string
  explanation: string
  expandableNotes?: { title: string; content: string }[]
  expectedOutput?: string
}

export interface WiringPinRow {
  sensorPin: string
  esp32Pin: string
  pinType: string
  functionDescription: string
  wireColorRecommendation?: string
}

export interface StepInstruction {
  stepNumber: number
  title: string
  instruction: string
  tip?: string
  warning?: string
}

export interface Lesson {
  id: string
  slug: string
  title: string
  shortDescription: string
  estimatedMinutes: number
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  overview: string
  keyTakeaways: string[]
  steps?: StepInstruction[]
  codeBlocks?: CodeBlockItem[]
  wiringTable?: {
    componentName: string
    voltage: string
    rows: WiringPinRow[]
    notes?: string
  }
  diagramType?: 'esp32-pinout' | 'hardware-setup' | 'vl53l0x-wiring' | 'bh1750-wiring' | 'soil-wiring' | 'unified-wiring' | 'cirkit-schematic' | 'obs-video' | 'pi-rest-architecture' | 'system-flow'
  troubleshootingTips?: { problem: string; cause: string; solution: string }[]
  practicalExample?: string
  whyImportant?: string
}

export interface CourseModule {
  id: string
  moduleNumber: number
  slug: string
  title: string
  tagline: string
  description: string
  badge: string
  iconName: string
  lessons: Lesson[]
  quiz: {
    title: string
    description: string
    passingScore: number
    questions: QuizQuestion[]
  }
}

export interface FAQItem {
  id: string
  category: 'Hardware' | 'Arduino IDE' | 'Sensors & I2C' | 'Wi-Fi & Network' | 'Raspberry Pi & API' | 'Mobile & Expo'
  question: string
  answer: string
  relatedLessonSlug?: string
}

export const esp32CourseModules: CourseModule[] = [
  // ==========================================
  // MODULE 1: INTRODUCTION TO ESP32
  // ==========================================
  {
    id: 'module-1',
    moduleNumber: 1,
    slug: 'introduction-to-esp32',
    title: 'Introduction to ESP32',
    tagline: 'Master the powerhouse dual-core microcontroller powering the modern Internet of Things.',
    description: 'Learn what an ESP32 is, why it is chosen for connected smart devices, its dual-core Xtensa architecture, GPIO pinout, power rails, and wireless radios.',
    badge: 'MODULE 01 • FOUNDATION',
    iconName: 'Cpu',
    lessons: [
      {
        id: 'what-is-esp32',
        slug: 'what-is-esp32',
        title: 'What is an ESP32 & Its Role in IoT?',
        shortDescription: 'Understand the difference between microcontrollers and computers, and why ESP32 is the premier choice for IoT edge devices.',
        estimatedMinutes: 8,
        difficulty: 'Beginner',
        overview: `The ESP32 is a low-cost, low-power system-on-a-chip (SoC) microcontroller with integrated Wi-Fi and dual-mode Bluetooth created by Espressif Systems. Unlike a full computer such as the Raspberry Pi that runs an operating system (Linux) and consumes 3 to 15 Watts of power, the ESP32 is a **microcontroller unit (MCU)** that executes bare-metal C++ firmware with microsecond precision, consuming mere milliwatts.

In an IoT (Internet of Things) architecture, the ESP32 serves as the **Physical Edge Node**. It sits directly next to transducers, takes analog and digital measurements at high frequency, applies local calibration, and wirelessly transmits structured data packets over Wi-Fi to a local server or cloud broker.`,
        keyTakeaways: [
          'An ESP32 is a microcontroller designed for dedicated real-time control, not a general-purpose operating system.',
          'Consumes negligible power compared to single-board computers, making it ideal for battery or solar-powered sensors.',
          'Includes built-in 2.4 GHz 802.11 b/g/n Wi-Fi and Bluetooth 4.2 / BLE directly on the silicon die.',
          'Acts as the bridge between physical transducers (soil, light, distance) and network servers (Raspberry Pi, FastAPI).',
        ],
        whyImportant: 'Knowing the role of each device prevents over-engineering. An ESP32 excels at reading electrical pins and driving buses without OS scheduling jitter, while the Raspberry Pi excels at hosting databases and serving APIs.',
        practicalExample: 'In our automated greenhouse project, the ESP32 measures soil moisture every second in the plant bed. Rather than running a bulky computer near damp soil, the tiny $5 ESP32 samples the sensor, packages the value into JSON, and transmits it wirelessly across the room.',
        diagramType: 'hardware-setup',
      },
      {
        id: 'esp32-specifications',
        slug: 'esp32-specifications',
        title: 'ESP32 Hardware Specifications & Architecture',
        shortDescription: 'Explore the dual-core 240MHz Xtensa processor, memory layout, ultra-low power coprocessor, and wireless specs.',
        estimatedMinutes: 10,
        difficulty: 'Beginner',
        overview: `To understand why the ESP32 outperforms classic microcontrollers like the Arduino Uno (16 MHz 8-bit AVR), we must examine its internal architecture. The ESP32 integrates a **Dual-Core Tensilica Xtensa 32-bit LX6 microprocessor** operating at up to 240 MHz, delivering over 600 DMIPS of computational power.

It splits responsibilities across its two cores:
1. **PRO_CPU (Protocol CPU / Core 0)**: Typically manages the Wi-Fi and Bluetooth radio stacks, encryption handshakes, and RTOS background tasks.
2. **APP_CPU (Application CPU / Core 1)**: Executes your user Arduino sketch, including the \`setup()\` and \`loop()\` routines and sensor sampling.

Additionally, the chip contains an **Ultra Low Power (ULP) co-processor** that can sample analog pins while the main dual-core CPU enters Deep Sleep mode (consuming less than 15 microamps).`,
        keyTakeaways: [
          'Dual-Core 32-bit Xtensa LX6 CPU clocked at 240 MHz (15x faster than standard Arduino boards).',
          '520 KB of internal SRAM and 4 MB to 16 MB of external SPI Flash storage.',
          'Integrated 802.11 b/g/n Wi-Fi transceiver with speeds up to 150 Mbps.',
          'Bluetooth v4.2 BR/EDR (Classic) and BLE (Bluetooth Low Energy).',
          'Cryptographic hardware acceleration for AES, SHA-2, RSA, and ECC for secure networking.',
        ],
        whyImportant: 'Because Core 0 handles the intensive Wi-Fi stack in the background, your sensor measurements and I2C transactions on Core 1 do not suffer from network latency or frame dropping.',
        practicalExample: 'When sending sensor data over Wi-Fi, the ESP32 performs TLS/HTTP or MQTT packet encryption on hardware crypto blocks, ensuring data integrity without slowing down sensor acquisition.',
      },
      {
        id: 'gpio-pinout-and-peripherals',
        slug: 'gpio-pinout-and-peripherals',
        title: 'GPIO Pins, Power Rails, & ADC Limitations',
        shortDescription: 'Learn every pin on the ESP32 DevKit V1: power, ground, digital I/O, I2C buses, strapping pins, and the ADC1 vs ADC2 Wi-Fi rule.',
        estimatedMinutes: 12,
        difficulty: 'Intermediate',
        overview: `The DOIT ESP32 DevKit V1 (30-pin variant) exposes 25 usable General Purpose Input/Output (GPIO) pins, multiple power rails, and dedicated communication buses. Understanding which pins to use—and which pins to avoid—is the most critical skill in ESP32 hardware engineering.

### Power Pins
- **VIN (5V)**: External 5V DC input pin. When powered via USB, this pin outputs regulated ~4.8V-5V from the computer USB port.
- **3V3 (3.3V Output)**: Powered by the onboard AMS1117 / ME6211 linear voltage regulator. **ESP32 GPIO pins operate at 3.3V logic! Never apply 5V directly to any ESP32 GPIO pin.**
- **GND**: Common ground reference. All sensors, breadboards, and power supplies must share a common GND.

### The Golden Rule: ADC1 vs ADC2
The ESP32 features two 12-bit Successive Approximation Register (SAR) Analog-to-Digital Converters:
- **ADC1**: GPIOs 32, 33, 34, 35, 36 (VP), 39 (VN). **Always safe to use with Wi-Fi!**
- **ADC2**: GPIOs 0, 2, 4, 12, 13, 14, 15, 25, 26, 27. **CANNOT be used when Wi-Fi is active!** The internal Wi-Fi radio driver preempts ADC2. If your sketch calls \`analogRead()\` on an ADC2 pin while connected to Wi-Fi, it will return invalid readings or crash. This is why our Soil Moisture Sensor is connected to **GPIO 34 (ADC1)**.

### Input-Only Pins
GPIO 34, 35, 36, and 39 have no internal pull-up or pull-down transistors and cannot output voltages. They are dedicated analog and digital inputs.`,
        keyTakeaways: [
          'ESP32 logic level is strictly 3.3V. Feeding 5V logic into GPIO pins can permanently fry the input buffer.',
          'Always use ADC1 pins (GPIO 32-39) for analog sensors when Wi-Fi is enabled.',
          'GPIO 34, 35, 36, and 39 are input-only pins—ideal for analog sensors like soil moisture.',
          'Avoid strapping pins (GPIO 0, 2, 12, 15) for normal sensor connections as they control the chip bootloader state upon reset.',
        ],
        diagramType: 'esp32-pinout',
        whyImportant: 'Connecting an analog sensor to ADC2 while Wi-Fi is transmitting is the #1 bug beginners encounter: the sensor suddenly reports 0 or 4095 as soon as the Wi-Fi connects.',
        troubleshootingTips: [
          {
            problem: 'Analog sensor reads 0 or random values as soon as WiFi.begin() is called.',
            cause: 'Sensor is connected to an ADC2 pin (e.g. GPIO 4, 13, 14). The ESP32 Wi-Fi driver monopolizes ADC2.',
            solution: 'Move the sensor signal wire to an ADC1 pin: GPIO 32, 33, 34, 35, 36, or 39.',
          },
          {
            problem: 'ESP32 fails to boot after wiring a button or sensor.',
            cause: 'The sensor is pulling a strapping pin (GPIO 0 or GPIO 12) LOW or HIGH during power-up, forcing the chip into UART download or wrong flash voltage mode.',
            solution: 'Move peripheral wires to standard GPIOs like 16, 17, 18, 19, 21, 22, 23.',
          },
        ],
      },
      {
        id: 'communication-protocols',
        slug: 'communication-protocols',
        title: 'Communication Protocols: I2C, SPI, UART, & Wireless',
        shortDescription: 'How the ESP32 speaks to sensors over wires and transfers telemetry to servers across airwaves.',
        estimatedMinutes: 9,
        difficulty: 'Beginner',
        overview: `To build smart IoT systems, microcontrollers must communicate with peripherals (sensors, displays, actuators) and edge servers. The ESP32 supports both wired bus protocols and wireless network protocols.

### 1. I2C (Inter-Integrated Circuit)
- **Wires**: 2 wires: **SDA** (Serial Data) and **SCL** (Serial Clock).
- **Topology**: Multi-device bus. Up to 127 devices can share the same two wires, differentiated by a 7-bit hex address (e.g., VL53L0X is 0x29; BH1750 is 0x23).
- **ESP32 Advantage**: The ESP32 hardware contains **two independent I2C controllers** (\`TwoWire(0)\` and \`TwoWire(1)\`), allowing us to run two completely separate I2C buses to avoid bus contention!

### 2. SPI (Serial Peripheral Interface)
- **Wires**: 4 wires: MOSI (Master Out Slave In), MISO (Master In Slave Out), SCK (Serial Clock), and CS (Chip Select).
- **Speed**: Very fast (up to 40-80 MHz), typically used for TFT displays and SD card storage.

### 3. UART (Universal Asynchronous Receiver-Transmitter)
- **Wires**: 2 wires: **TX** (Transmit) and **RX** (Receive).
- Used for programming and Serial Monitor debugging over the micro-USB cable.

### 4. Wireless Protocols
- **HTTP REST API**: Client-server protocol. ESP32 acts as an HTTP client sending JSON POST requests to Raspberry Pi FastAPI endpoints.
- **MQTT**: Ultra-lightweight publish/subscribe messaging protocol for telemetry over Wi-Fi.`,
        keyTakeaways: [
          'I2C uses only 2 wires and identifies devices by their unique 7-bit I2C address.',
          'The ESP32 has two separate hardware I2C controllers, enabling dual independent I2C buses.',
          'UART powers the Serial Monitor for viewing real-time sensor debug logs on your PC.',
          'HTTP REST and MQTT are the two primary protocols for moving sensor packets from ESP32 to Raspberry Pi.',
        ],
        whyImportant: 'Understanding bus addressing ensures you never accidentally assign two sensors with the same address to the same bus or mistake digital serial for analog voltage.',
      },
    ],
    quiz: {
      title: 'Module 1 Knowledge Check: ESP32 Fundamentals',
      description: 'Test your understanding of ESP32 architecture, GPIO pinout, and hardware capabilities.',
      passingScore: 3,
      questions: [
        {
          id: 'm1-q1',
          question: 'What happens if you use an ADC2 pin (such as GPIO 4) for an analog sensor while Wi-Fi is actively connected?',
          options: [
            { id: 'a', text: 'The readings will be amplified by 200%.', isCorrect: false, explanation: 'ADC2 does not amplify signals.' },
            { id: 'b', text: 'The analogRead() calls will fail or return erratic values because the Wi-Fi radio monopolizes ADC2.', isCorrect: true, explanation: 'Correct! The ESP32 internal Wi-Fi driver shares hardware circuitry with ADC2. Always use ADC1 (GPIO 32-39) when Wi-Fi is enabled.' },
            { id: 'c', text: 'The ESP32 will immediately shut down its CPU permanently.', isCorrect: false, explanation: 'It does not damage the CPU, it simply produces invalid ADC readings.' },
            { id: 'd', text: 'The Wi-Fi speed increases to 5 GHz.', isCorrect: false, explanation: 'The ESP32 hardware only supports 2.4 GHz.' },
          ],
        },
        {
          id: 'm1-q2',
          question: 'What is the maximum logic voltage that should be applied to an ESP32 GPIO pin?',
          options: [
            { id: 'a', text: '5.0V', isCorrect: false, explanation: '5.0V can permanently damage the internal ESD diodes and input buffers.' },
            { id: 'b', text: '3.3V', isCorrect: true, explanation: 'Correct! ESP32 GPIOs operate strictly on 3.3V logic level.' },
            { id: 'c', text: '12.0V', isCorrect: false, explanation: '12V is automotive/industrial voltage and will destroy the board.' },
            { id: 'd', text: '1.8V only', isCorrect: false, explanation: 'While some internal flash operates at 1.8V, the external GPIO rail is 3.3V.' },
          ],
        },
        {
          id: 'm1-q3',
          question: 'Which CPU core in the ESP32 typically executes your Arduino sketch (setup and loop)?',
          options: [
            { id: 'a', text: 'Core 0 (PRO_CPU)', isCorrect: false, explanation: 'Core 0 is dedicated to managing Wi-Fi and Bluetooth stacks.' },
            { id: 'b', text: 'Core 1 (APP_CPU)', isCorrect: true, explanation: 'Correct! The Arduino-ESP32 framework runs your setup() and loop() tasks on Core 1 by default.' },
            { id: 'c', text: 'The ULP Coprocessor only', isCorrect: false, explanation: 'The ULP only runs assembly during Deep Sleep.' },
            { id: 'd', text: 'Neither, code runs in the cloud', isCorrect: false, explanation: 'Firmware executes on-chip.' },
          ],
        },
      ],
    },
  },

  // ==========================================
  // MODULE 2: ESP32 HARDWARE SETUP
  // ==========================================
  {
    id: 'module-2',
    moduleNumber: 2,
    slug: 'esp32-hardware-setup',
    title: 'ESP32 Hardware Setup & IDE Configuration',
    tagline: 'Connect your board to your computer, install drivers, configure the Arduino IDE, and master troubleshooting.',
    description: 'A complete step-by-step setup guide covering USB data cables, Silicon Labs CP2102 and CH340 drivers, Arduino IDE 2.x, board index installation, COM port selection, and upload troubleshooting.',
    badge: 'MODULE 02 • TOOLING',
    iconName: 'Wrench',
    lessons: [
      {
        id: 'hardware-checklist',
        slug: 'hardware-checklist',
        title: 'Required Hardware & Component Checklist',
        shortDescription: 'Gather the right development board, verify your USB cable has data lines, and prepare your breadboard.',
        estimatedMinutes: 7,
        difficulty: 'Beginner',
        overview: `Before writing a single line of C++, you need to assemble the correct hardware toolkit. Many beginners lose hours debugging connection problems that turn out to be a cheap charging-only USB cable.

### Required Hardware:
1. **ESP32 Development Board**: DOIT ESP32 DevKit V1 (30-pin or 38-pin version with ESP-WROOM-32 module).
2. **Micro-USB to USB-A Cable**: **CRITICAL**: Ensure it is a 4-wire **DATA SYNC** cable, not a 2-wire "charge only" cable from a vape, headphone, or power bank.
3. **Half-size or Full-size Solderless Breadboard**: 400 or 830 tie-points.
4. **Jumper Wires**: Male-to-Male (M-M) and Male-to-Female (M-F) DuPont cables.
5. **Computer**: Running Windows 10/11, macOS, or Linux.`,
        keyTakeaways: [
          'A "charge only" micro-USB cable will light up the board LED but will never appear as a COM port.',
          'The ESP32 DevKit V1 fits neatly across the center divider of a standard breadboard, leaving one row of holes on one side.',
          'Always disconnect USB power before rewiring circuits on your breadboard.',
        ],
        whyImportant: 'Having verified hardware components eliminates guesswork when diagnosing upload and port detection issues.',
        troubleshootingTips: [
          {
            problem: 'The ESP32 red power LED lights up, but the computer makes no USB insertion sound.',
            cause: 'The USB cable lacks D+ and D- internal data wires, or the USB port provides insufficient power.',
            solution: 'Swap the micro-USB cable with one known to transfer files from a phone or camera. Plug directly into a motherboard USB port, avoiding unpowered USB hubs.',
          },
        ],
        diagramType: 'hardware-setup',
      },
      {
        id: 'usb-drivers-and-com-port',
        slug: 'usb-drivers-and-com-port',
        title: 'Installing USB-to-UART Bridge Drivers & COM Port Setup',
        shortDescription: 'Identify the USB-to-Serial converter chip (CP2102 or CH340) and install the Virtual COM Port (VCP) drivers on Windows.',
        estimatedMinutes: 9,
        difficulty: 'Beginner',
        overview: `The ESP32 microcontroller communicates with your PC via serial communication (UART). Because modern computers do not have RS-232 serial ports, development boards include a small rectangular USB-to-UART bridge IC next to the micro-USB port.

### Identify Your Bridge Chip:
- **Silicon Labs CP2102**: Square black chip labeled "SILABS CP2102". Standard on DOIT DevKit V1.
- **WCH CH340G / CH340C**: Rectangular chip labeled "CH340". Common on lower-cost clones.

### Step-by-Step Installation on Windows:
1. If using CP2102: Download the **CP210x Universal Windows Driver** from Silicon Labs official site. Extract the zip and right-click \`silabser.inf\` -> **Install**.
2. If using CH340: Download and run the **CH341SER.EXE** installer.
3. Plug the ESP32 into a USB port.
4. Open **Device Manager** on Windows (press \`Win + X\` -> Device Manager).
5. Expand the **Ports (COM & LPT)** section. You should see:
   - \`Silicon Labs CP210x USB to UART Bridge (COM3)\` (or COM4, COM5, etc.)`,
        keyTakeaways: [
          'The USB-to-UART chip translates USB packets from your computer into serial TX/RX pulses the ESP32 understands.',
          'Without the driver installed, the board will show up with a yellow exclamation mark as "Unknown Device" in Device Manager.',
          'Remember the exact assigned COM port number (e.g. COM4) as you will select it in the Arduino IDE.',
        ],
        whyImportant: 'The Arduino IDE cannot upload code or open the Serial Monitor without an active Virtual COM Port.',
        steps: [
          {
            stepNumber: 1,
            title: 'Identify the Bridge Chip',
            instruction: 'Look closely at the small black IC next to the micro-USB socket on your ESP32 board. Read whether it says "SILABS CP2102" or "CH340".',
          },
          {
            stepNumber: 2,
            title: 'Install the Driver',
            instruction: 'Download the Silicon Labs CP210x VCP driver or CH340 installer. Complete installation and restart your computer if prompted.',
          },
          {
            stepNumber: 3,
            title: 'Verify in Device Manager',
            instruction: 'Open Windows Device Manager, expand "Ports (COM & LPT)", and confirm that your ESP32 appears with a designated COM port number (e.g. COM3 or COM4).',
          },
        ],
      },
      {
        id: 'installing-arduino-ide',
        slug: 'installing-arduino-ide',
        title: 'Installing Arduino IDE & ESP32 Board Package',
        shortDescription: 'Download Arduino IDE 2.x, configure the Espressif Board Manager URL, and install the official esp32 core.',
        estimatedMinutes: 10,
        difficulty: 'Beginner',
        overview: `The Arduino IDE (Integrated Development Environment) provides the editor, C++ compiler (xtensa-esp32-elf-gcc), and uploader (esptool.py) needed to program the ESP32.

### Step 1: Install Arduino IDE 2.x
Download and run the installer for **Arduino IDE 2.3+** from [arduino.cc](https://www.arduino.cc/en/software).

### Step 2: Add Espressif Board Manager URL
1. Open Arduino IDE.
2. Navigate to **File** -> **Preferences** (or \`Ctrl + ,\`).
3. Locate the **Additional Boards Manager URLs** field.
4. Paste the official Espressif stable package JSON URL:
   \`\`\`
   https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json
   \`\`\`
5. Click **OK**.

### Step 3: Install the ESP32 Core
1. Click the **Boards Manager** icon on the left sidebar (looks like a circuit board).
2. In the search bar, type \`esp32\`.
3. Locate **esp32 by Espressif Systems** and click **Install** (version 2.0.14 or 3.0+).
4. Wait for the download and toolchain installation to finish.

### Step 4: Select Board and Port
- Go to **Tools** -> **Board** -> **esp32** -> Select **DOIT ESP32 DEVKIT V1**.
- Go to **Tools** -> **Port** -> Select your detected COM port (e.g. **COM4**).
- Upload Speed: **921600** (or **115200** if you encounter noisy cables).
- Flash Frequency: **80MHz**.`,
        keyTakeaways: [
          'The Additional Boards Manager URL tells Arduino IDE where to find Espressif compiler toolchains.',
          'Selecting "DOIT ESP32 DEVKIT V1" sets default pin mappings, clock speed (240MHz), and flash partition sizes.',
          'Setting Upload Speed to 921600 cuts code upload times from 45 seconds down to 8 seconds.',
        ],
        whyImportant: 'Without installing the Espressif core, the Arduino IDE only knows how to compile for 8-bit AVR Arduinos and will reject ESP32 code with compilation errors.',
      },
      {
        id: 'first-upload-and-troubleshooting',
        slug: 'first-upload-and-troubleshooting',
        title: 'First Upload, Serial Monitor, & Connection Troubleshooting',
        shortDescription: 'Upload a Blink & Serial test sketch, configure the 115200 baud rate, and solve the infamous BOOT button error.',
        estimatedMinutes: 12,
        difficulty: 'Beginner',
        overview: `Now that your board and IDE are configured, we will upload our first test firmware: a sketch that blinks the onboard blue LED (GPIO 2) and transmits a heartbeat message to the Serial Monitor every second.

### The Infamous "Failed to connect to ESP32" Error
When uploading, you may see the IDE output:
\`\`\`
Connecting........_____....._____.....
A fatal error occurred: Failed to connect to ESP32: No serial data received.
\`\`\`
**Why does this happen?** Some ESP32 DevKit boards have an auto-reset circuit with weak 10µF capacitors on the EN line. The board fails to automatically drop GPIO 0 to LOW into bootloader mode.

**The Fix**:
1. In the Arduino IDE, click **Upload** (\`Ctrl + U\`).
2. Watch the bottom console. When you see \`Connecting........_____\`, immediately **press and hold the physical BOOT (or PRG) button** on your ESP32 board for 2 seconds until you see \`Writing at 0x00010000... (10%)\`, then release it.
3. The upload will complete with \`Hard resetting via RTS pin...\`.`,
        keyTakeaways: [
          'Blinking the onboard LED on GPIO 2 proves the toolchain, bootloader, and flash memory are working.',
          'Always match the Serial Monitor baud rate in Arduino IDE to the baud rate specified in Serial.begin(115200).',
          'Holding the physical BOOT button during "Connecting..." forces the chip into ROM bootloader mode.',
        ],
        codeBlocks: [
          {
            id: 'blink-serial-test',
            title: 'ESP32 Blink & Serial Heartbeat Test',
            language: 'cpp',
            filename: 'esp32_blink_test.ino',
            code: `// ==========================================
// ESP32 Heartbeat & Onboard LED Test
// Board: DOIT ESP32 DEVKIT V1
// ==========================================

// Most ESP32 DevKit V1 boards have a blue LED on GPIO 2
const int LED_PIN = 2;
int counter = 0;

void setup() {
  // Initialize UART0 Serial communication at 115200 baud
  Serial.begin(115200);
  
  // Give the serial monitor 1 second to connect
  delay(1000);
  
  // Configure the LED pin as a digital output
  pinMode(LED_PIN, OUTPUT);
  
  Serial.println("========================================");
  Serial.println("ESP32 System Initialized Successfully!");
  Serial.println("CPU Clock: 240 MHz");
  Serial.println("Firmware: Blink & Serial Diagnostics");
  Serial.println("========================================");
}

void loop() {
  counter++;
  
  // Turn LED ON (3.3V)
  digitalWrite(LED_PIN, HIGH);
  Serial.print("[HEARTBEAT #");
  Serial.print(counter);
  Serial.print("] LED Status: ON  | System Uptime: ");
  Serial.print(millis() / 1000);
  Serial.println(" seconds");
  delay(500);

  // Turn LED OFF (0V)
  digitalWrite(LED_PIN, LOW);
  Serial.print("[HEARTBEAT #");
  Serial.print(counter);
  Serial.println("] LED Status: OFF");
  delay(500);
}`,
            explanation: 'Initializes GPIO 2 as an output, starts Serial communication at 115200 baud, and toggles the LED while logging uptime every second.',
            expectedOutput: `========================================
ESP32 System Initialized Successfully!
CPU Clock: 240 MHz
Firmware: Blink & Serial Diagnostics
========================================
[HEARTBEAT #1] LED Status: ON  | System Uptime: 2 seconds
[HEARTBEAT #1] LED Status: OFF
[HEARTBEAT #2] LED Status: ON  | System Uptime: 3 seconds
[HEARTBEAT #2] LED Status: OFF`,
          },
        ],
        troubleshootingTips: [
          {
            problem: 'Serial Monitor displays gibberish characters (like ⸮⸮⸮▒▒▒).',
            cause: 'Baud rate mismatch. Arduino IDE Serial Monitor is set to 9600 baud while code specifies 115200.',
            solution: 'Change the baud rate dropdown in the top-right of the Serial Monitor tab from 9600 to 115200 baud.',
          },
          {
            problem: 'Error: "Serial port COMx is not available / Permission denied".',
            cause: 'Another program (like PuTTY, Cura, Python script, or another Arduino IDE window) is currently holding the COM port open.',
            solution: 'Close all other serial monitor windows, terminal sessions, or 3D printer software, then re-plug the USB cable.',
          },
        ],
      },
    ],
    quiz: {
      title: 'Module 2 Knowledge Check: Tooling & Setup',
      description: 'Verify your knowledge of drivers, IDE settings, and upload troubleshooting.',
      passingScore: 3,
      questions: [
        {
          id: 'm2-q1',
          question: 'If the Arduino IDE displays "Connecting........_____" and fails with "No serial data received", what physical action resolves it?',
          options: [
            { id: 'a', text: 'Unplug the power and blow on the antenna.', isCorrect: false, explanation: 'This has no effect on the ROM bootloader.' },
            { id: 'b', text: 'Press and hold the physical BOOT button on the ESP32 while it says Connecting.', isCorrect: true, explanation: 'Correct! Holding the BOOT button forces GPIO 0 LOW, putting the chip into ROM bootloader mode to accept new firmware.' },
            { id: 'c', text: 'Increase the computer screen brightness.', isCorrect: false, explanation: 'Hardware is not influenced by display settings.' },
            { id: 'd', text: 'Switch the board from 240MHz to 10MHz.', isCorrect: false, explanation: 'Upload is handled by the internal bootloader, not sketch clock.' },
          ],
        },
        {
          id: 'm2-q2',
          question: 'Why does the Serial Monitor display strange unreadable symbols when you open it?',
          options: [
            { id: 'a', text: 'The ESP32 is infected with a computer virus.', isCorrect: false, explanation: 'Microcontrollers do not get standard PC viruses.' },
            { id: 'b', text: 'The baud rate in the Serial Monitor does not match the Serial.begin(115200) in your sketch.', isCorrect: true, explanation: 'Correct! If the transmitter and receiver do not share the exact same bit timing (baud rate), data framing errors produce garbled text.' },
            { id: 'c', text: 'The ESP32 only understands Chinese characters.', isCorrect: false, explanation: 'Serial transmits standard ASCII/UTF-8 bytes.' },
            { id: 'd', text: 'The micro-USB cable is plugged in upside down.', isCorrect: false, explanation: 'Micro-USB is keyed and cannot be inserted upside down without breaking.' },
          ],
        },
        {
          id: 'm2-q3',
          question: 'Which chip on the ESP32 DevKit board converts USB communication into serial signals for the microcontroller?',
          options: [
            { id: 'a', text: 'Silicon Labs CP2102 or WCH CH340', isCorrect: true, explanation: 'Correct! The CP2102 or CH340 is the dedicated USB-to-UART bridge IC.' },
            { id: 'b', text: 'The Wi-Fi antenna', isCorrect: false, explanation: 'The antenna radiates RF electromagnetic waves.' },
            { id: 'c', text: 'The 3.3V linear voltage regulator', isCorrect: false, explanation: 'The regulator steps down 5V to 3.3V.' },
            { id: 'd', text: 'The reset tactile push button', isCorrect: false, explanation: 'The button grounds the EN pin to restart the CPU.' },
          ],
        },
      ],
    },
  },

  // ==========================================
  // MODULE 3: UNDERSTANDING & WRITING CODE
  // ==========================================
  {
    id: 'module-3',
    moduleNumber: 3,
    slug: 'understanding-and-writing-code',
    title: 'Understanding & Writing ESP32 Code',
    tagline: 'Master setup() and loop(), non-blocking timing, robust Wi-Fi networking, analog sampling, and HTTP REST clients.',
    description: 'Learn the lifecycle of an embedded sketch, avoiding blocking delays with millis(), connecting to Wi-Fi with auto-reconnect, reading calibrated ADC values, and executing HTTP requests with JSON payloads.',
    badge: 'MODULE 03 • SOFTWARE',
    iconName: 'Code2',
    lessons: [
      {
        id: 'arduino-basics-setup-loop',
        slug: 'arduino-basics-setup-loop',
        title: 'Arduino C++ Lifecycle: setup() and loop()',
        shortDescription: 'Understand the two core functions, variable scope, preprocessor directives, and non-blocking timing with millis().',
        estimatedMinutes: 10,
        difficulty: 'Beginner',
        overview: `Every Arduino C++ program contains two mandatory functions: \`setup()\` and \`loop()\`.

### 1. \`setup()\`
Runs exactly **once** when the ESP32 powers on or resets. This is where you configure hardware peripherals:
- Setting pin directions with \`pinMode(pin, OUTPUT/INPUT)\`
- Starting serial debugging with \`Serial.begin(115200)\`
- Initializing I2C buses with \`Wire.begin()\`
- Connecting to Wi-Fi networks

### 2. \`loop()\`
Runs **repeatedly and continuously** as long as power is supplied. When the function reaches its closing curly brace \`}\`, it is invoked again immediately.

### The Problem with \`delay()\` vs \`millis()\`
Calling \`delay(5000)\` completely freezes Core 1 for 5 seconds. The microcontroller cannot read sensors, cannot respond to network events, and cannot maintain connection heartbeats.
Instead, professional firmware uses **non-blocking timing** using \`millis()\`, which returns the number of milliseconds elapsed since the ESP32 booted.`,
        keyTakeaways: [
          'setup() runs once for initialization; loop() runs repeatedly for ongoing tasks.',
          'Global variables declared outside functions retain their values across loop iterations.',
          'Never use long delay() calls in connected IoT code; use non-blocking millis() timers instead.',
        ],
        codeBlocks: [
          {
            id: 'non-blocking-timer-template',
            title: 'Professional Non-Blocking Timer Pattern',
            language: 'cpp',
            filename: 'non_blocking_timer.ino',
            code: `// ==========================================
// Professional Non-Blocking Timing in C++
// ==========================================

unsigned long previousMillis = 0;
const unsigned long INTERVAL_MS = 2000; // Run sensor task every 2 seconds

void setup() {
  Serial.begin(115200);
  Serial.println("System starting non-blocking executive loop...");
}

void loop() {
  unsigned long currentMillis = millis();

  // Check if our timer interval has elapsed
  if (currentMillis - previousMillis >= INTERVAL_MS) {
    previousMillis = currentMillis; // Reset our timer benchmark
    
    // Perform periodic task here
    Serial.print("[HEARTBEAT] Sampling sensors at: ");
    Serial.print(currentMillis / 1000.0);
    Serial.println(" seconds");
  }

  // Other quick tasks (like maintaining Wi-Fi or checking buttons) run freely here
  // without being blocked!
}`,
            explanation: 'Uses millis() timestamp subtraction to execute tasks at fixed intervals without pausing or freezing the processor.',
            expectedOutput: `System starting non-blocking executive loop...
[HEARTBEAT] Sampling sensors at: 2.00 seconds
[HEARTBEAT] Sampling sensors at: 4.00 seconds
[HEARTBEAT] Sampling sensors at: 6.00 seconds`,
          },
        ],
        whyImportant: 'If an ESP32 sketch is frozen inside a long delay(), it cannot process background Wi-Fi packets, leading to broken sockets and connection drops.',
      },
      {
        id: 'connecting-to-wifi',
        slug: 'connecting-to-wifi',
        title: 'Connecting ESP32 to Wi-Fi with Auto-Reconnect',
        shortDescription: 'Use the official WiFi.h library to connect to 2.4 GHz networks, retrieve IP addresses, and handle signal drops.',
        estimatedMinutes: 12,
        difficulty: 'Beginner',
        overview: `The ESP32 includes an onboard 2.4 GHz 802.11 b/g/n radio. To connect to an existing router, we configure the chip in **Station Mode (WIFI_STA)**.

### Crucial Wi-Fi Rules:
1. **2.4 GHz Only**: The ESP32 does **NOT** support 5 GHz Wi-Fi networks. Make sure your router broadcasts a 2.4 GHz SSID.
2. **Auto-Reconnect**: Consumer Wi-Fi routers periodically rotate DHCP leases or reboot. Real-world IoT firmware must automatically detect when Wi-Fi is lost and reconnect in the background without requiring a manual reset.
3. **Signal Strength (RSSI)**: Received Signal Strength Indicator measured in dBm. Values between -30 dBm and -65 dBm indicate excellent signal; values below -85 dBm indicate unreliable packet delivery.`,
        keyTakeaways: [
          'ESP32 requires a 2.4 GHz Wi-Fi SSID; 5 GHz bands will not appear.',
          'Always configure WiFi.mode(WIFI_STA) and WiFi.setAutoReconnect(true).',
          'Print WiFi.localIP() to verify your board has received a valid DHCP lease on your local subnet.',
        ],
        codeBlocks: [
          {
            id: 'esp32-wifi-reconnect',
            title: 'Bulletproof ESP32 Wi-Fi Connection with Diagnostics',
            language: 'cpp',
            filename: 'esp32_wifi_connect.ino',
            code: `#include <WiFi.h>

// Replace with your local Wi-Fi credentials (2.4 GHz only)
const char* WIFI_SSID     = "YOUR_WIFI_SSID";
const char* WIFI_PASSWORD = "YOUR_WIFI_PASSWORD";

unsigned long lastWifiCheck = 0;
const unsigned long WIFI_CHECK_INTERVAL = 10000; // Check every 10 seconds

void connectToWiFi() {
  Serial.print("Connecting to Wi-Fi network: ");
  Serial.println(WIFI_SSID);

  WiFi.mode(WIFI_STA);                 // Station mode: connects to access point
  WiFi.setAutoReconnect(true);        // Automatically reconnect if connection drops
  WiFi.persistent(false);             // Do not write credentials to flash on every boot
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  // Wait up to 15 seconds for connection
  unsigned long startAttempt = millis();
  while (WiFi.status() != WL_CONNECTED && millis() - startAttempt < 15000) {
    delay(500);
    Serial.print(".");
  }
  Serial.println();

  if (WiFi.status() == WL_CONNECTED) {
    Serial.println(">>> Wi-Fi Connected Successfully!");
    Serial.print(">>> IP Address:   ");
    Serial.println(WiFi.localIP());
    Serial.print(">>> Subnet Mask:  ");
    Serial.println(WiFi.subnetMask());
    Serial.print(">>> Gateway IP:   ");
    Serial.println(WiFi.gatewayIP());
    Serial.print(">>> Signal (RSSI): ");
    Serial.print(WiFi.RSSI());
    Serial.println(" dBm");
  } else {
    Serial.println(">>> Wi-Fi connection timed out. Will retry in background...");
  }
}

void setup() {
  Serial.begin(115200);
  delay(1000);
  connectToWiFi();
}

void loop() {
  unsigned long now = millis();

  // Periodically verify connection status
  if (now - lastWifiCheck >= WIFI_CHECK_INTERVAL) {
    lastWifiCheck = now;
    
    if (WiFi.status() == WL_CONNECTED) {
      Serial.print("[HEALTH CHECK] Wi-Fi Active | IP: ");
      Serial.print(WiFi.localIP());
      Serial.print(" | RSSI: ");
      Serial.print(WiFi.RSSI());
      Serial.println(" dBm");
    } else {
      Serial.println("[HEALTH CHECK] Wi-Fi Lost! Re-attempting connection...");
      WiFi.disconnect();
      WiFi.reconnect();
    }
  }

  // Your sensor tasks run here without being blocked!
}`,
            explanation: 'Sets up Station mode, waits with a 15-second timeout, logs network parameters (IP, Subnet, RSSI), and implements an ongoing health check to recover from Wi-Fi drops.',
            expectedOutput: `Connecting to Wi-Fi network: HomeNetwork_2.4G
.......
>>> Wi-Fi Connected Successfully!
>>> IP Address:   192.168.1.142
>>> Subnet Mask:  255.255.255.0
>>> Gateway IP:   192.168.1.1
>>> Signal (RSSI): -58 dBm
[HEALTH CHECK] Wi-Fi Active | IP: 192.168.1.142 | RSSI: -58 dBm`,
          },
        ],
        whyImportant: 'An IoT device in a field or greenhouse must recover automatically when the home router reboots overnight. Without auto-reconnect, the device remains offline forever until physically power-cycled.',
      },
      {
        id: 'reading-sensors',
        slug: 'reading-sensors',
        title: 'Reading Digital & Analog Sensors on ESP32',
        shortDescription: 'Understand 12-bit ADC conversion (0-4095), ADC attenuation, voltage reference, and multi-sample noise filtering.',
        estimatedMinutes: 11,
        difficulty: 'Intermediate',
        overview: `Sensors interface with microcontrollers in two primary electrical forms: **Digital** and **Analog**.

### 1. Digital Pins
- Read with \`digitalRead(pin)\`.
- Returns only binary states: \`HIGH\` (3.3V) or \`LOW\` (0V).
- Used for switches, pushbuttons, PIR motion sensors, and digital pulses.

### 2. Analog Pins & The 12-bit ADC
The ESP32 possesses a 12-bit Analog-to-Digital Converter (ADC):
- 12-bit resolution means readings range from **0 to 4095** ($2^{12} - 1 = 4095$).
- In contrast, classic Arduino Uno boards have a 10-bit ADC (0 to 1023). The ESP32 provides **4x higher sensitivity**!

### ADC Attenuation
By default, the ESP32 ADC reference is configured for ~1.1V maximum input. To read the full 0V to 3.3V range from sensors like our Capacitive Soil Moisture probe, we configure **11 dB attenuation**:
\`\`\`cpp
analogSetPinAttenuation(SOIL_PIN, ADC_11db);
\`\`\`

### Mitigating Electrical Noise: Moving Average Filter
Analog pins on microcontrollers pick up electromagnetic noise from nearby power lines and Wi-Fi transmissions. Rather than trusting a single instantaneous reading, clean firmware takes 10 rapid samples and averages them.`,
        keyTakeaways: [
          'ESP32 ADC provides 12-bit resolution (values from 0 to 4095).',
          'Use analogSetPinAttenuation(pin, ADC_11db) to measure the full 0V to 3.3V sensor range.',
          'Always use ADC1 pins (GPIO 32 to 39) to prevent Wi-Fi contention.',
          'Implement a 10-sample moving average filter to remove electrical noise spikes.',
        ],
        codeBlocks: [
          {
            id: 'adc-analog-filter-code',
            title: 'Filtered 12-bit Analog Sensor Reader',
            language: 'cpp',
            filename: 'esp32_filtered_adc.ino',
            code: `// ==========================================
// 12-bit ADC Analog Sampling with Noise Filter
// Pin: GPIO 34 (ADC1 - Safe with Wi-Fi)
// ==========================================

const int ANALOG_PIN = 34; // Input-only ADC1 pin

int readFilteredADC(int pin, int samples = 10) {
  long sum = 0;
  for (int i = 0; i < samples; i++) {
    sum += analogRead(pin);
    delay(5); // Small settling delay between conversions
  }
  return sum / samples;
}

void setup() {
  Serial.begin(115200);
  
  // Set ADC resolution to full 12 bits (0-4095)
  analogReadResolution(12);
  
  // Configure 11dB attenuation to read full 0 to ~3.3V range
  analogSetPinAttenuation(ANALOG_PIN, ADC_11db);
  
  Serial.println("ADC Configured: 12-bit (0-4095) on GPIO 34 with 11dB attenuation.");
}

void loop() {
  int rawADC = readFilteredADC(ANALOG_PIN, 10);
  
  // Convert 12-bit raw integer to approximate voltage (0V to 3.3V)
  float voltage = (rawADC / 4095.0) * 3.3;

  Serial.print("Raw ADC Value (0-4095): ");
  Serial.print(rawADC);
  Serial.print(" | Approximate Voltage: ");
  Serial.print(voltage, 2);
  Serial.println(" V");

  delay(1000);
}`,
            explanation: 'Configures 12-bit resolution and 11dB attenuation on GPIO 34, then reads 10 successive samples to eliminate transient electrical noise.',
            expectedOutput: `ADC Configured: 12-bit (0-4095) on GPIO 34 with 11dB attenuation.
Raw ADC Value (0-4095): 2145 | Approximate Voltage: 1.73 V
Raw ADC Value (0-4095): 2142 | Approximate Voltage: 1.72 V
Raw ADC Value (0-4095): 2148 | Approximate Voltage: 1.73 V`,
          },
        ],
        whyImportant: 'Raw ADC readings can fluctuate by ±50 counts due to RF noise. Filtering creates smooth, stable telemetry charts on the mobile app.',
      },
      {
        id: 'sending-data-to-server',
        slug: 'sending-data-to-server',
        title: 'Sending Telemetry via MQTT & PubSubClient',
        shortDescription: 'Publish JSON sensor data to the Raspberry Pi Mosquitto broker on port 1883 with automatic reconnect and Last Will status tracking.',
        estimatedMinutes: 14,
        difficulty: 'Intermediate',
        overview: `In our IoT architecture, the ESP32 transmits sensor readings to the Raspberry Pi using **MQTT (Message Queuing Telemetry Transport)** rather than standard HTTP.

### Why MQTT for This IoT Project?
1. **Persistent Lightweight Connection**: Unlike HTTP, which opens and tears down a full TCP handshake for every request, MQTT maintains a continuous, lightweight socket on port \`1883\`. Packet headers are as small as 2 bytes, minimizing Wi-Fi radio power and network latency.
2. **Publish / Subscribe Model**: The ESP32 does not need to know which client is reading the data. It simply publishes packets to topic \`esp32/tof_light_soil_data\`. The Raspberry Pi Mosquitto broker routes the message to any subscribers (Python FastAPI backend, logger, mobile clients).
3. **Last Will and Testament (LWT)**: When connecting, the ESP32 registers a Last Will message on \`esp32/tof_light_soil_status\` with payload \`"offline"\`. If the ESP32 loses power or Wi-Fi unexpectedly, the broker automatically publishes \`"offline"\` to inform the entire system!
4. **Memory-Safe Static Buffering**: The firmware formats JSON directly into a fixed-size character buffer (\`char payload[256]\`) using \`snprintf()\`, preventing heap fragmentation crashes caused by dynamic Arduino \`String\` concatenation.

### Network State Machine
The firmware maintains two non-blocking reconnect timers:
- \`maintainWiFi()\`: Checks connection status every 10 seconds (\`WIFI_RETRY_MS = 10000\`).
- \`maintainMQTT()\`: Retries broker connection every 5 seconds (\`MQTT_RETRY_MS = 5000\`).
- \`mqttClient.loop()\`: Invoked on every pass of \`loop()\` to process keep-alive ping packets and broker acknowledgments.`,
        keyTakeaways: [
          'MQTT runs over port 1883 with minimal 2-byte header overhead compared to HTTP.',
          'PubSubClient library by Nick O\'Leary provides lightweight publish and subscribe capabilities.',
          'Last Will and Testament (LWT) on topic "esp32/tof_light_soil_status" automatically detects hardware disconnects.',
          'snprintf with char payload[256] prevents Arduino String memory leaks and heap crashes.',
        ],
        codeBlocks: [
          {
            id: 'mqtt-pubsub-client-sketch',
            title: 'ESP32 MQTT PubSubClient Publisher Driver',
            language: 'cpp',
            filename: 'esp32_mqtt_publisher.ino',
            code: `#include <WiFi.h>
#include <PubSubClient.h> // Library: "PubSubClient" by Nick O'Leary

// ================================
// CONFIGURATION
// ================================
const char* WIFI_SSID     = "YOUR_WIFI_SSID";
const char* WIFI_PASSWORD = "YOUR_WIFI_PASSWORD";

const char* MQTT_BROKER   = "YOUR_RASPBERRY_PI_IP"; // e.g. 192.168.1.150
const int   MQTT_PORT     = 1883;

const char* MQTT_TOPIC        = "esp32/tof_light_soil_data";
const char* MQTT_STATUS_TOPIC = "esp32/tof_light_soil_status"; // online/offline (Last Will)
const char* MQTT_CLIENT_ID    = "esp32-tof-light-soil";

// Leave MQTT_USER as "" for anonymous access.
const char* MQTT_USER     = "";
const char* MQTT_PASS     = "";

const unsigned long PUBLISH_INTERVAL_MS = 5000;   // publish every 5 seconds
const unsigned long WIFI_RETRY_MS       = 10000;  // retry Wi-Fi every 10 s
const unsigned long MQTT_RETRY_MS       = 5000;   // retry MQTT every 5 s

WiFiClient   wifiClient;
PubSubClient mqttClient(wifiClient);

unsigned long lastPublish = 0;
unsigned long lastWifiTry = 0;
unsigned long lastMqttTry = 0;

void connectWiFi() {
  Serial.print("Connecting to Wi-Fi: ");
  Serial.println(WIFI_SSID);

  WiFi.mode(WIFI_STA);
  WiFi.setAutoReconnect(true);
  WiFi.persistent(false);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  unsigned long start = millis();
  while (WiFi.status() != WL_CONNECTED && millis() - start < 15000) {
    delay(500);
    Serial.print(".");
  }
  Serial.println();

  if (WiFi.status() == WL_CONNECTED) {
    Serial.print("Wi-Fi connected. IP: ");
    Serial.println(WiFi.localIP());
  } else {
    Serial.println("Wi-Fi not connected yet, will keep retrying...");
  }
}

void maintainWiFi() {
  if (WiFi.status() == WL_CONNECTED) return;

  unsigned long now = millis();
  if (now - lastWifiTry >= WIFI_RETRY_MS) {
    lastWifiTry = now;
    Serial.println("Wi-Fi lost. Reconnecting...");
    WiFi.disconnect();
    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  }
}

bool connectMQTT() {
  Serial.print("Connecting to MQTT broker ");
  Serial.print(MQTT_BROKER);
  Serial.print("... ");

  bool ok;
  if (strlen(MQTT_USER) > 0) {
    ok = mqttClient.connect(MQTT_CLIENT_ID, MQTT_USER, MQTT_PASS,
                            MQTT_STATUS_TOPIC, 1, true, "offline");
  } else {
    ok = mqttClient.connect(MQTT_CLIENT_ID, nullptr, nullptr,
                            MQTT_STATUS_TOPIC, 1, true, "offline");
  }

  if (ok) {
    Serial.println("connected.");
    mqttClient.publish(MQTT_STATUS_TOPIC, "online", true);
  } else {
    Serial.print("failed, rc=");
    Serial.println(mqttClient.state());
  }
  return ok;
}

void maintainMQTT() {
  if (WiFi.status() != WL_CONNECTED) return;
  if (mqttClient.connected()) return;

  unsigned long now = millis();
  if (now - lastMqttTry >= MQTT_RETRY_MS) {
    lastMqttTry = now;
    connectMQTT();
  }
}

void publishSensorData(int tofMm, float tofCm, float lux, int soilRaw) {
  char tofMmStr[16];
  char tofCmStr[16];
  char luxStr[16];

  snprintf(tofMmStr, sizeof(tofMmStr), "%d", tofMm);
  snprintf(tofCmStr, sizeof(tofCmStr), "%.1f", tofCm);
  snprintf(luxStr, sizeof(luxStr), "%.2f", lux);

  // Build JSON payload
  char payload[256];
  snprintf(payload, sizeof(payload),
           "{\"tof_mm\":%s,\"tof_cm\":%s,"
           "\"lux\":%s,"
           "\"soil_raw\":%d,"
           "\"rssi\":%d}",
           tofMmStr, tofCmStr,
           luxStr,
           soilRaw,
           WiFi.RSSI());

  Serial.print("Publishing to ");
  Serial.print(MQTT_TOPIC);
  Serial.print(": ");
  Serial.println(payload);

  if (!mqttClient.publish(MQTT_TOPIC, payload)) {
    Serial.println("Publish failed.");
  }
}

void setup() {
  Serial.begin(115200);
  delay(1000);

  connectWiFi();

  mqttClient.setServer(MQTT_BROKER, MQTT_PORT);
  mqttClient.setBufferSize(512);
  mqttClient.setKeepAlive(30);
}

void loop() {
  maintainWiFi();
  maintainMQTT();
  mqttClient.loop();

  unsigned long now = millis();
  if (now - lastPublish >= PUBLISH_INTERVAL_MS) {
    lastPublish = now;
    if (mqttClient.connected()) {
      // Example values (in full sketch, sampled from real hardware sensors)
      publishSensorData(148, 14.8, 420.50, 1842);
    } else {
      Serial.println("MQTT offline, skipping publish.");
    }
  }
}`,
            explanation: 'Establishes Wi-Fi, configures PubSubClient with Last Will on topic esp32/tof_light_soil_status, maintains non-blocking reconnect timers, and publishes JSON payloads to esp32/tof_light_soil_data every 5 seconds.',
            expectedOutput: `Connecting to Wi-Fi: YOUR_WIFI_SSID
.......
Wi-Fi connected. IP: 192.168.1.105
Connecting to MQTT broker 192.168.1.150... connected.
Publishing to esp32/tof_light_soil_data: {"tof_mm":148,"tof_cm":14.8,"lux":420.50,"soil_raw":1842,"rssi":-58}
Publishing to esp32/tof_light_soil_data: {"tof_mm":148,"tof_cm":14.8,"lux":420.50,"soil_raw":1842,"rssi":-58}`,
          },
        ],
        whyImportant: 'MQTT Last Will and Testament ensures that if your ESP32 node loses power or disconnects, the Raspberry Pi server and mobile app immediately detect that the sensor node is offline.',
      },
    ],
    quiz: {
      title: 'Module 3 Knowledge Check: Code & Networking',
      description: 'Test your understanding of Arduino C++ timing, ADC sampling, and HTTP networking.',
      passingScore: 3,
      questions: [
        {
          id: 'm3-q1',
          question: 'Why should you avoid using delay(5000) in connected ESP32 IoT code?',
          options: [
            { id: 'a', text: 'It uses too much electrical battery power.', isCorrect: false, explanation: 'delay() does not increase power consumption.' },
            { id: 'b', text: 'It completely blocks the CPU, preventing sensor reads, network health checks, and packet processing.', isCorrect: true, explanation: 'Correct! delay() freezes execution on Core 1. Always use non-blocking millis() timing.' },
            { id: 'c', text: 'It burns out the internal flash memory chip.', isCorrect: false, explanation: 'Flash memory is only written when saving data, not during delays.' },
            { id: 'd', text: 'The compiler will refuse to compile delay().', isCorrect: false, explanation: 'The compiler accepts it, but it causes runtime latency issues.' },
          ],
        },
        {
          id: 'm3-q2',
          question: 'What is the native resolution of the ESP32 Analog-to-Digital Converter (ADC)?',
          options: [
            { id: 'a', text: '8-bit (0 to 255)', isCorrect: false, explanation: '8-bit is standard for older microcontrollers.' },
            { id: 'b', text: '10-bit (0 to 1023)', isCorrect: false, explanation: '10-bit is standard on the older Arduino Uno.' },
            { id: 'c', text: '12-bit (0 to 4095)', isCorrect: true, explanation: 'Correct! The ESP32 ADC provides 12-bit resolution, yielding 4096 discrete voltage levels.' },
            { id: 'd', text: '24-bit (0 to 16,777,215)', isCorrect: false, explanation: '24-bit is reserved for high-end external audio/weight ADCs like the HX711.' },
          ],
        },
        {
          id: 'm3-q3',
          question: 'Why must you always call http.end() after finishing an HTTPClient transaction?',
          options: [
            { id: 'a', text: 'To restart the Raspberry Pi.', isCorrect: false, explanation: 'http.end() only affects the local ESP32 client.' },
            { id: 'b', text: 'To close the TCP socket and free allocated heap RAM, preventing memory leaks.', isCorrect: true, explanation: 'Correct! If http.end() is omitted, the ESP32 runs out of socket descriptors and crashes.' },
            { id: 'c', text: 'To disconnect from Wi-Fi permanently.', isCorrect: false, explanation: 'WiFi stays connected; only the HTTP session is terminated.' },
            { id: 'd', text: 'It is optional and does nothing.', isCorrect: false, explanation: 'It is mandatory in production embedded systems.' },
          ],
        },
      ],
    },
  },

  // ==========================================
  // MODULE 4: CONNECTING SENSORS TO ESP32
  // ==========================================
  {
    id: 'module-4',
    moduleNumber: 4,
    slug: 'connecting-sensors-to-esp32',
    title: 'Connecting Sensors to ESP32',
    tagline: 'Wire and program VL53L0X ToF laser distance, BH1750 ambient light, and Capacitive Soil Moisture probes.',
    description: 'Deep-dive into the 3 core transducers of our IoT project. Master dual I2C hardware buses (Wire 0 and Wire 1), prevent address collisions, calibrate soil moisture math, and inspect unified multi-sensor firmware.',
    badge: 'MODULE 04 • TRANSDUCERS',
    iconName: 'Activity',
    lessons: [
      {
        id: 'vl53l0x-distance-sensor',
        slug: 'vl53l0x-distance-sensor',
        title: 'VL53L0X Time-of-Flight Distance Sensor',
        shortDescription: 'Laser-based distance measurement with millimeter precision up to 2 meters. Wiring, I2C address, and Adafruit library.',
        estimatedMinutes: 14,
        difficulty: 'Intermediate',
        overview: `The **VL53L0X** is a cutting-edge Time-of-Flight (ToF) laser-ranging sensor housed in the smallest package on the market. Unlike traditional infrared sensors that measure reflected light intensity (which varies dramatically based on surface color) or ultrasonic transducers that produce wide acoustic echo cones, the VL53L0X measures the **exact time of flight** of emitted photons.

It contains an invisible 940nm VCSEL (Vertical Cavity Surface-Emitting Laser) emitter and a Single Photon Avalanche Diode (SPAD) detector array. It calculates distance with millimetric precision from 30 mm up to 2000 mm (2 meters).

### Communication & Address
- Protocol: **I2C**.
- Default 7-bit I2C Address: **\`0x29\`**.
- Connected to: **ESP32 TwoWire(0) on SDA: GPIO 21, SCL: GPIO 22**.

### Required Library
In the Arduino IDE Library Manager (\`Ctrl + Shift + I\`), search for and install:
**Adafruit_VL53L0X** by Adafruit.`,
        keyTakeaways: [
          'Time-of-Flight technology measures photon travel time, making it immune to target color or surface reflectivity.',
          'Default I2C address is 0x29.',
          'Operates on 3.3V logic; connect VIN to the ESP32 3V3 rail.',
          'Provides measurements in both millimeters (mm) and centimeters (cm).',
        ],
        wiringTable: {
          componentName: 'Adafruit VL53L0X ToF Sensor',
          voltage: '3.3V DC',
          rows: [
            { sensorPin: 'VIN', esp32Pin: '3V3', pinType: 'Power Input', functionDescription: 'Regulated 3.3V supply from ESP32 rail', wireColorRecommendation: 'Red' },
            { sensorPin: 'GND', esp32Pin: 'GND', pinType: 'Ground', functionDescription: 'Common ground reference', wireColorRecommendation: 'Black' },
            { sensorPin: 'SCL', esp32Pin: 'GPIO 22', pinType: 'I2C Clock (Wire 0)', functionDescription: 'Serial Clock line for Wire 0', wireColorRecommendation: 'Yellow' },
            { sensorPin: 'SDA', esp32Pin: 'GPIO 21', pinType: 'I2C Data (Wire 0)', functionDescription: 'Serial Data line for Wire 0', wireColorRecommendation: 'Green' },
            { sensorPin: 'XSHUT', esp32Pin: 'Unconnected or GPIO', pinType: 'Shutdown Pin', functionDescription: 'Leave unconnected unless toggling address', wireColorRecommendation: 'Optional' },
            { sensorPin: 'GPIO1', esp32Pin: 'Unconnected', pinType: 'Interrupt Output', functionDescription: 'Hardware interrupt indicator; leave floating', wireColorRecommendation: 'None' },
          ],
          notes: 'Ensure the small orange protective film is peeled off the optical lens window before testing.',
        },
        diagramType: 'vl53l0x-wiring',
        codeBlocks: [
          {
            id: 'vl53l0x-standalone-sketch',
            title: 'Complete VL53L0X Standalone Driver Code',
            language: 'cpp',
            filename: 'esp32_vl53l0x_test.ino',
            code: `#include <Wire.h>
#include <Adafruit_VL53L0X.h>

// Assign to Hardware I2C Bus 0 on ESP32
#define TOF_SDA 21
#define TOF_SCL 22

TwoWire tofWire = TwoWire(0);
Adafruit_VL53L0X tof = Adafruit_VL53L0X();

void setup() {
  Serial.begin(115200);
  delay(1000);
  Serial.println("\\n--- Initializing VL53L0X ToF Distance Sensor ---");

  // Initialize I2C Bus 0 on custom GPIOs
  tofWire.begin(TOF_SDA, TOF_SCL);

  // Initialize the sensor on custom I2C bus at default address 0x29
  if (!tof.begin(0x29, false, &tofWire)) {
    Serial.println("[ERROR] Failed to find VL53L0X sensor!");
    Serial.println("[HINT]  Check 3.3V, GND, and SDA (21) / SCL (22) jumper wires.");
    while (1) {
      delay(100); // Halt execution if sensor is missing
    }
  }

  Serial.println("[SUCCESS] VL53L0X detected on I2C address 0x29!");
}

void loop() {
  VL53L0X_RangingMeasurementData_t measure;

  // Request laser ranging measurement
  tof.rangingTest(&measure, false);

  if (measure.RangeStatus != 4) { // Phase failures report status 4 (out of range)
    int distanceMm = measure.RangeMilliMeter;
    float distanceCm = distanceMm / 10.0;

    Serial.print("Target Distance: ");
    Serial.print(distanceMm);
    Serial.print(" mm (");
    Serial.print(distanceCm, 1);
    Serial.println(" cm)");
  } else {
    Serial.println("Target Distance: Out of Range (> 2000 mm)");
  }

  delay(500); // Sample twice per second
}`,
            explanation: 'Initializes TwoWire(0) on pins 21 and 22, connects to address 0x29, executes rangingTest(), checks RangeStatus for out-of-bounds reflection, and outputs distance in millimeters and centimeters.',
            expectedOutput: `--- Initializing VL53L0X ToF Distance Sensor ---
[SUCCESS] VL53L0X detected on I2C address 0x29!
Target Distance: 148 mm (14.8 cm)
Target Distance: 147 mm (14.7 cm)
Target Distance: 215 mm (21.5 cm)`,
          },
        ],
        troubleshootingTips: [
          {
            problem: 'Sensor repeatedly prints "Failed to find VL53L0X sensor!".',
            cause: 'SDA and SCL wires are reversed, or breadboard loose connection.',
            solution: 'Verify that sensor SDA connects to GPIO 21 and SCL connects to GPIO 22. Test with an I2C scanner sketch.',
          },
          {
            problem: 'Readings are stuck at 8190 mm or 20 mm.',
            cause: 'Orange protective plastic sticker was left on the sensor optical aperture.',
            solution: 'Peel off the protective film with tweezers.',
          },
        ],
      },
      {
        id: 'bh1750-light-sensor',
        slug: 'bh1750-light-sensor',
        title: 'BH1750 Ambient Light Sensor & The Dual I2C Architecture',
        shortDescription: 'Measure illuminance in Lux matching the human eye spectral response. Why we run TwoWire(1) on GPIO 18/19.',
        estimatedMinutes: 14,
        difficulty: 'Intermediate',
        overview: `The **BH1750** is a calibrated digital ambient light sensor with an internal 16-bit ADC. Unlike cheap analog photoresistors (LDRs) that vary non-linearly with temperature and produce arbitrary raw voltage numbers, the BH1750 directly calculates illuminance in **Lux (lx)**.

### Illuminance Reference Levels:
- **0.1 - 1.0 lx**: Full moonlight.
- **10 - 50 lx**: Dim hallway / living room at night.
- **300 - 500 lx**: Standard office workspace / classroom.
- **1,000 - 5,000 lx**: Overcast daylight / photography studio.
- **10,000 - 65,000 lx**: Direct midday tropical sunlight.

### Architectural Innovation: Dual Hardware I2C Buses
In many simple tutorials, developers place all I2C sensors on the same SDA/SCL wires. However, the VL53L0X laser sensor utilizes **I2C clock stretching** while calculating photon statistics. When sharing a single I2C bus, the BH1750 light sensor often suffers from timeout errors or freezes the bus.

To solve this, our project leverages the ESP32's dual hardware I2C controllers:
- **Wire 0 (GPIO 21 SDA, GPIO 22 SCL)**: Dedicated exclusively to the VL53L0X laser sensor.
- **Wire 1 (GPIO 18 SDA, GPIO 19 SCL)**: Dedicated exclusively to the BH1750 light sensor.

Running separate hardware buses provides **complete electrical and clock isolation**, zero bus contention, and guaranteed high-speed telemetry!`,
        keyTakeaways: [
          'Outputs direct illuminance in Lux (1 to 65,535 lx) with spectral response matching human vision.',
          'ADDR pin to GND configures default I2C address 0x23.',
          'Uses dedicated TwoWire(1) on GPIO 18 (SDA) and GPIO 19 (SCL) to avoid clock stretching conflicts with the ToF sensor.',
          'Operates reliably at 3.3V logic level.',
        ],
        wiringTable: {
          componentName: 'BH1750 Digital Ambient Light Meter',
          voltage: '3.3V DC',
          rows: [
            { sensorPin: 'VCC', esp32Pin: '3V3', pinType: 'Power Input', functionDescription: 'Regulated 3.3V supply from ESP32 rail', wireColorRecommendation: 'Red' },
            { sensorPin: 'GND', esp32Pin: 'GND', pinType: 'Ground', functionDescription: 'Common ground reference', wireColorRecommendation: 'Black' },
            { sensorPin: 'SCL', esp32Pin: 'GPIO 19', pinType: 'I2C Clock (Wire 1)', functionDescription: 'Serial Clock line for dedicated Wire 1 bus', wireColorRecommendation: 'Orange' },
            { sensorPin: 'SDA', esp32Pin: 'GPIO 18', pinType: 'I2C Data (Wire 1)', functionDescription: 'Serial Data line for dedicated Wire 1 bus', wireColorRecommendation: 'Blue' },
            { sensorPin: 'ADDR', esp32Pin: 'GND (or floating)', pinType: 'Address Selector', functionDescription: 'Tied to GND sets I2C address to 0x23', wireColorRecommendation: 'Black' },
          ],
        },
        diagramType: 'bh1750-wiring',
        codeBlocks: [
          {
            id: 'bh1750-standalone-sketch',
            title: 'BH1750 Standalone Driver on Wire 1 (Pins 18/19)',
            language: 'cpp',
            filename: 'esp32_bh1750_test.ino',
            code: `#include <Wire.h>
#include <BH1750.h> // Library: "BH1750" by Christopher Laws

#define LIGHT_SDA 18
#define LIGHT_SCL 19

// Instantiate separate hardware I2C Bus 1
TwoWire lightWire = TwoWire(1);
BH1750 lightMeter;

void setup() {
  Serial.begin(115200);
  delay(1000);
  Serial.println("\\n--- Initializing BH1750 Ambient Light Sensor ---");

  // Initialize Bus 1 on GPIO 18 (SDA) and GPIO 19 (SCL)
  lightWire.begin(LIGHT_SDA, LIGHT_SCL);

  // Initialize BH1750 in Continuous High Resolution Mode
  if (lightMeter.begin(BH1750::CONTINUOUS_HIGH_RES_MODE, 0x23, &lightWire)) {
    Serial.println("[SUCCESS] BH1750 detected on Wire 1 (0x23)!");
  } else {
    Serial.println("[ERROR] Could not find BH1750 sensor!");
    Serial.println("[HINT]  Check VCC (3.3V), GND, SDA (18) and SCL (19).");
    while (1) {
      delay(100);
    }
  }
}

void loop() {
  // Read ambient illuminance in Lux
  float lux = lightMeter.readLightLevel();

  Serial.print("Ambient Light Level: ");
  Serial.print(lux, 2);
  Serial.print(" lx -> ");

  // Provide contextual description
  if (lux < 50) {
    Serial.println("Dim / Night Indoor");
  } else if (lux < 500) {
    Serial.println("Normal Indoor Office");
  } else if (lux < 2000) {
    Serial.println("Bright Studio / Overcast Outdoor");
  } else {
    Serial.println("Bright Sunlight");
  }

  delay(500);
}`,
            explanation: 'Initializes TwoWire(1) on pins 18 and 19, connects to BH1750 at address 0x23 in continuous high-resolution mode, reads light in Lux, and classifies the lighting context.',
            expectedOutput: `--- Initializing BH1750 Ambient Light Sensor ---
[SUCCESS] BH1750 detected on Wire 1 (0x23)!
Ambient Light Level: 420.50 lx -> Normal Indoor Office
Ambient Light Level: 421.00 lx -> Normal Indoor Office
Ambient Light Level: 12.30 lx -> Dim / Night Indoor`,
          },
        ],
        troubleshootingTips: [
          {
            problem: 'BH1750 returns NaN (Not a Number) or -1.00.',
            cause: 'ADDR pin is floating near 3.3V, causing the chip to switch its address to 0x5C.',
            solution: 'Tie the ADDR pin firmly to GND with a jumper wire to lock the address at 0x23.',
          },
        ],
      },
      {
        id: 'capacitive-soil-moisture-sensor',
        slug: 'capacitive-soil-moisture-sensor',
        title: 'Capacitive Soil Moisture Sensor V1.0 & Calibration Math',
        shortDescription: 'Corrosion-free moisture sensing on ADC1 GPIO 34. Empirical air/water calibration formula and percentage math.',
        estimatedMinutes: 15,
        difficulty: 'Intermediate',
        overview: `Unlike cheap resistive soil probes that expose bare copper traces to moist soil (which suffer from galvanic electrolysis and corrode to dust within weeks), the **Capacitive Soil Moisture Sensor V1.0** utilizes capacitive sensing.

The probe traces are insulated beneath a protective solder mask layer. The probe acts as a variable capacitor in an onboard 555-timer high-frequency oscillator circuit. Because water has a high dielectric constant ($k \\approx 80$) compared to dry air ($k \\approx 1$), increasing soil moisture increases capacitance, which lowers the output analog voltage.

### The Inverse Relationship
- **Dry Air / Parched Soil**: Low capacitance $\\rightarrow$ **High Analog Voltage** (~2.5V - 3.0V $\\rightarrow$ ADC count ~2500 - 3200).
- **100% Saturated / Water**: High capacitance $\\rightarrow$ **Low Analog Voltage** (~1.0V - 1.4V $\\rightarrow$ ADC count ~1200 - 1500).

Notice that **higher raw ADC values mean DRIER soil!**

### Pin Choice: GPIO 34 (ADC1)
As established in Module 1, GPIO 34 is part of **ADC1** and is an input-only pin. It functions 100% reliably even when the Wi-Fi transceiver is actively broadcasting packets.

### Mathematical Calibration Formula
To convert raw 12-bit ADC integers into a user-friendly 0% to 100% moisture reading, we use empirical calibration constants:
\`\`\`cpp
// Calibrated constants for our specific probe
const int AIR_VALUE   = 2527; // Raw reading in completely dry air (0% moisture)
const int WATER_VALUE = 1237; // Raw reading submerged in water cup (100% moisture)

// Calculate percentage: note inverse mapping!
float moisturePercent = map(rawADC, AIR_VALUE, WATER_VALUE, 0, 100);
moisturePercent = constrain(moisturePercent, 0.0, 100.0);
\`\`\``,
        keyTakeaways: [
          'Capacitive probes avoid galvanic electrolysis, providing years of continuous lifespan in moist soil.',
          'Analog output has an INVERSE relationship: high voltage = dry, low voltage = wet.',
          'Must be connected to an ADC1 pin (GPIO 34) so Wi-Fi does not disrupt analog conversions.',
          'Empirically calibrate your sensor by recording dry air and water cup readings.',
        ],
        wiringTable: {
          componentName: 'Capacitive Soil Moisture Sensor V1.0',
          voltage: '3.3V DC',
          rows: [
            { sensorPin: 'VCC', esp32Pin: '3V3', pinType: 'Power Input', functionDescription: '3.3V power supply (Do NOT connect to 5V)', wireColorRecommendation: 'Red' },
            { sensorPin: 'GND', esp32Pin: 'GND', pinType: 'Ground', functionDescription: 'Common ground reference', wireColorRecommendation: 'Black' },
            { sensorPin: 'AOUT', esp32Pin: 'GPIO 34', pinType: 'Analog Input (ADC1)', functionDescription: 'Analog voltage output to ADC1 channel', wireColorRecommendation: 'Blue' },
          ],
          notes: 'Never submerge the sensor past the white horizontal warning line printed on the PCB! The electronic components near the cable connector are not waterproof.',
        },
        diagramType: 'soil-wiring',
        codeBlocks: [
          {
            id: 'soil-moisture-calibration-sketch',
            title: 'Soil Moisture Calibration & Percentage Converter',
            language: 'cpp',
            filename: 'esp32_soil_calibrated.ino',
            code: `// ==========================================
// Calibrated Capacitive Soil Moisture Reader
// Sensor Pin: GPIO 34 (ADC1)
// ==========================================

const int SOIL_PIN = 34;

// Replace with your empirical calibration values:
// 1. Hold sensor in dry air -> record raw value for AIR_VALUE
// 2. Submerge up to line in water cup -> record raw value for WATER_VALUE
const int AIR_VALUE   = 2527; // Dry air (0% moisture)
const int WATER_VALUE = 1237; // Submerged in water (100% moisture)

int readSoilAverage(int pin, int count = 10) {
  long sum = 0;
  for (int i = 0; i < count; i++) {
    sum += analogRead(pin);
    delay(5);
  }
  return sum / count;
}

void setup() {
  Serial.begin(115200);
  delay(1000);
  
  analogReadResolution(12); // 0 - 4095
  analogSetPinAttenuation(SOIL_PIN, ADC_11db);

  Serial.println("--- Capacitive Soil Moisture Sensor Calibrated ---");
  Serial.print("Calibration Air (0%):   ");
  Serial.println(AIR_VALUE);
  Serial.print("Calibration Water (100%): ");
  Serial.println(WATER_VALUE);
}

void loop() {
  int rawADC = readSoilAverage(SOIL_PIN, 10);
  
  // Inverse mapping: as rawADC decreases, moisture percentage increases
  float moisture = map(rawADC, AIR_VALUE, WATER_VALUE, 0, 100);
  moisture = constrain(moisture, 0.0, 100.0);

  Serial.print("Raw ADC: ");
  Serial.print(rawADC);
  Serial.print(" | Calibrated Soil Moisture: ");
  Serial.print(moisture, 1);
  Serial.print("% -> Status: ");

  if (moisture < 20.0) {
    Serial.println("VERY DRY (Water Needed!)");
  } else if (moisture < 60.0) {
    Serial.println("OPTIMAL MOISTURE");
  } else {
    Serial.println("HIGHLY SATURATED / WET");
  }

  delay(1000);
}`,
            explanation: 'Samples GPIO 34 with an averaging filter, applies inverse map() transformation using empirical calibration constants, constrains to 0-100%, and outputs soil moisture health status.',
            expectedOutput: `--- Capacitive Soil Moisture Sensor Calibrated ---
Calibration Air (0%):   2527
Calibration Water (100%): 1237
Raw ADC: 1840 | Calibrated Soil Moisture: 53.3% -> Status: OPTIMAL MOISTURE
Raw ADC: 1845 | Calibrated Soil Moisture: 52.9% -> Status: OPTIMAL MOISTURE
Raw ADC: 2490 | Calibrated Soil Moisture: 2.8% -> Status: VERY DRY (Water Needed!)`,
          },
        ],
        troubleshootingTips: [
          {
            problem: 'Soil percentage displays 0% even when probe is placed in wet soil.',
            cause: 'Sensor is powered from 5V instead of 3.3V, causing output voltage to exceed the ADC reference range, or calibration values are inverted.',
            solution: 'Verify VCC connects to 3.3V rail. Confirm that AIR_VALUE > WATER_VALUE in the map() call.',
          },
        ],
      },
      {
        id: 'unified-multi-sensor-firmware',
        slug: 'unified-multi-sensor-firmware',
        title: 'Complete Project Firmware: Dual I2C, Soil ADC1 & MQTT Pipeline',
        shortDescription: 'The production Arduino C++ sketch: initializes dual TwoWire buses, samples analog soil on ADC1, and publishes telemetry packets to the Raspberry Pi Mosquitto broker.',
        estimatedMinutes: 18,
        difficulty: 'Advanced',
        overview: `This is the **core production firmware sketch** powering our entire IoT pipeline. It brings together every hardware transducer, dual independent I2C buses, analog calibration, and robust network communications into a single resilient sketch.

### Architectural Blueprint:
1. **Dual Independent Hardware I2C Controllers**:
   - **Wire 0 (TwoWire(0))**: Allocated to \`TOF_SDA\` (GPIO 21) & \`TOF_SCL\` (GPIO 22) for the Adafruit VL53L0X laser sensor operating at 100 kHz.
   - **Wire 1 (TwoWire(1))**: Allocated to \`LIGHT_SDA\` (GPIO 18) & \`LIGHT_SCL\` (GPIO 19) for the BH1750 ambient light sensor operating in Continuous High-Resolution Mode (\`0x23\`).
   - Using two hardware TwoWire instances completely eliminates I2C address collisions and clock stretching bottlenecks.
2. **Wi-Fi-Safe ADC1 Analog Sampling**:
   - Capacitive Soil Moisture probe connected to \`SOIL_PIN 34\`.
   - Configured with \`analogReadResolution(12)\` (4096 counts) and \`analogSetPinAttenuation(SOIL_PIN, ADC_11db)\` for full 0 to 3.3V voltage dynamic range. Because GPIO 34 belongs to ADC1, it functions with zero interference during Wi-Fi transmission.
3. **Resilient Non-Blocking Connection State Machine**:
   - \`maintainWiFi()\`: Automatically re-associates every 10 seconds if Wi-Fi drops without pausing sensor polling.
   - \`maintainMQTT()\`: Re-establishes TCP session to the Raspberry Pi Mosquitto broker on port \`1883\` every 5 seconds.
4. **Last Will and Testament (LWT)**:
   - When connecting, registers retained message \`"offline"\` on \`esp32/tof_light_soil_status\`.
   - Immediately publishes retained message \`"online"\`. If the power cord is pulled, Mosquitto broadcasts \`"offline"\` immediately.
5. **Memory-Safe JSON Formatting with snprintf**:
   - Formats fields directly into \`char payload[256]\`.
   - Safely substitutes \`"null"\` strings if a sensor is disconnected or out of range (\`RangeStatus != 4\`), preserving valid JSON formatting.`,
        keyTakeaways: [
          'Runs TwoWire(0) on pins 21/22 and TwoWire(1) on pins 18/19 simultaneously without bus conflict.',
          'Samples soil moisture on ADC1 GPIO 34 to avoid Wi-Fi radio contention.',
          'PubSubClient connects to Raspberry Pi on port 1883 with Last Will and Testament status tracking.',
          'Static char payload[256] prevents heap fragmentation crashes common with Arduino String.',
        ],
        diagramType: 'unified-wiring',
        codeBlocks: [
          {
            id: 'unified-multi-sensor-sketch',
            title: 'Complete Project Firmware (esp32_tof_light_soil_mqtt.ino)',
            language: 'cpp',
            filename: 'esp32_tof_light_soil_mqtt.ino',
            code: `#include <Wire.h>
#include <WiFi.h>
#include <PubSubClient.h>   // Library: "PubSubClient" by Nick O'Leary
#include <Adafruit_VL53L0X.h>
#include <BH1750.h>

// ================================
// CONFIGURATION
// ================================
const char* WIFI_SSID     = "YOUR_WIFI_SSID";
const char* WIFI_PASSWORD = "YOUR_WIFI_PASSWORD";

const char* MQTT_BROKER   = "YOUR_RASPBERRY_PI_IP";
const int   MQTT_PORT     = 1883;

// Different topics and client ID from other sketches
const char* MQTT_TOPIC        = "esp32/tof_light_soil_data";
const char* MQTT_STATUS_TOPIC = "esp32/tof_light_soil_status";  // online/offline (Last Will)
const char* MQTT_CLIENT_ID    = "esp32-tof-light-soil";

// Leave MQTT_USER as "" for anonymous access.
const char* MQTT_USER     = "";
const char* MQTT_PASS     = "";

const unsigned long PUBLISH_INTERVAL_MS = 5000;   // publish every 5 seconds
const unsigned long WIFI_RETRY_MS       = 10000;  // retry Wi-Fi every 10 s
const unsigned long MQTT_RETRY_MS       = 5000;   // retry MQTT every 5 s

// ================================
// SENSOR PINS & I2C BUSES
// ================================
#define TOF_SDA 21
#define TOF_SCL 22

#define LIGHT_SDA 18
#define LIGHT_SCL 19

#define SOIL_PIN 34   // ADC1 - safe to use with Wi-Fi

TwoWire tofWire = TwoWire(0);
TwoWire lightWire = TwoWire(1);

Adafruit_VL53L0X tof;
BH1750 lightMeter;

bool tofReady = false;
bool lightReady = false;

WiFiClient   wifiClient;
PubSubClient mqttClient(wifiClient);

unsigned long lastPublish = 0;
unsigned long lastWifiTry = 0;
unsigned long lastMqttTry = 0;

void connectWiFi() {
  Serial.print("Connecting to Wi-Fi: ");
  Serial.println(WIFI_SSID);

  WiFi.mode(WIFI_STA);
  WiFi.setAutoReconnect(true);
  WiFi.persistent(false);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  unsigned long start = millis();
  while (WiFi.status() != WL_CONNECTED && millis() - start < 15000) {
    delay(500);
    Serial.print(".");
  }
  Serial.println();

  if (WiFi.status() == WL_CONNECTED) {
    Serial.print("Wi-Fi connected. IP: ");
    Serial.println(WiFi.localIP());
  } else {
    Serial.println("Wi-Fi not connected yet, will keep retrying...");
  }
}

void maintainWiFi() {
  if (WiFi.status() == WL_CONNECTED) return;

  unsigned long now = millis();
  if (now - lastWifiTry >= WIFI_RETRY_MS) {
    lastWifiTry = now;
    Serial.println("Wi-Fi lost. Reconnecting...");
    WiFi.disconnect();
    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  }
}

bool connectMQTT() {
  Serial.print("Connecting to MQTT broker ");
  Serial.print(MQTT_BROKER);
  Serial.print("... ");

  bool ok;
  if (strlen(MQTT_USER) > 0) {
    ok = mqttClient.connect(MQTT_CLIENT_ID, MQTT_USER, MQTT_PASS,
                            MQTT_STATUS_TOPIC, 1, true, "offline");
  } else {
    ok = mqttClient.connect(MQTT_CLIENT_ID, nullptr, nullptr,
                            MQTT_STATUS_TOPIC, 1, true, "offline");
  }

  if (ok) {
    Serial.println("connected.");
    mqttClient.publish(MQTT_STATUS_TOPIC, "online", true);
  } else {
    Serial.print("failed, rc=");
    Serial.println(mqttClient.state());
  }
  return ok;
}

void maintainMQTT() {
  if (WiFi.status() != WL_CONNECTED) return;
  if (mqttClient.connected()) return;

  unsigned long now = millis();
  if (now - lastMqttTry >= MQTT_RETRY_MS) {
    lastMqttTry = now;
    connectMQTT();
  }
}

void publishSensorData() {
  // 1. ToF distance
  char tofMmStr[16] = "null";
  char tofCmStr[16] = "null";

  if (tofReady) {
    VL53L0X_RangingMeasurementData_t measurement;
    tof.rangingTest(&measurement, false);

    if (measurement.RangeStatus != 4) {
      snprintf(tofMmStr, sizeof(tofMmStr), "%u", measurement.RangeMilliMeter);
      snprintf(tofCmStr, sizeof(tofCmStr), "%.1f", measurement.RangeMilliMeter / 10.0);
    }
  }

  // 2. BH1750 ambient light
  char luxStr[16] = "null";

  if (lightReady) {
    float lux = lightMeter.readLightLevel();
    if (lux >= 0) {
      snprintf(luxStr, sizeof(luxStr), "%.2f", lux);
    }
  }

  // 3. Soil moisture (raw ADC1)
  int soilValue = analogRead(SOIL_PIN);

  // Build JSON payload
  char payload[256];
  snprintf(payload, sizeof(payload),
           "{\"tof_mm\":%s,\"tof_cm\":%s,"
           "\"lux\":%s,"
           "\"soil_raw\":%d,"
           "\"rssi\":%d}",
           tofMmStr, tofCmStr,
           luxStr,
           soilValue,
           WiFi.RSSI());

  Serial.print("Publishing to ");
  Serial.print(MQTT_TOPIC);
  Serial.print(": ");
  Serial.println(payload);

  if (!mqttClient.publish(MQTT_TOPIC, payload)) {
    Serial.println("Publish failed.");
  }
}

void setup() {
  Serial.begin(115200);
  delay(1000);

  analogReadResolution(12);
  analogSetPinAttenuation(SOIL_PIN, ADC_11db);

  Serial.println();
  Serial.println("================================");
  Serial.println(" ESP32 SENSOR NODE - MQTT");
  Serial.println(" ToF | BH1750 | Soil Moisture");
  Serial.println("================================");

  // Initialize ToF I2C bus (Wire 0)
  if (tofWire.begin(TOF_SDA, TOF_SCL, 100000)) {
    Serial.println("ToF I2C bus initialized.");
    if (tof.begin(0x29, false, &tofWire)) {
      tofReady = true;
      Serial.println("ToF sensor: CONNECTED");
    } else {
      Serial.println("ToF sensor: NOT DETECTED");
    }
  }

  // Initialize BH1750 I2C bus (Wire 1)
  if (lightWire.begin(LIGHT_SDA, LIGHT_SCL, 100000)) {
    Serial.println("BH1750 I2C bus initialized.");
    if (lightMeter.begin(BH1750::CONTINUOUS_HIGH_RES_MODE, 0x23, &lightWire)) {
      lightReady = true;
      Serial.println("BH1750: CONNECTED");
    } else {
      Serial.println("BH1750: NOT DETECTED");
    }
  }

  Serial.println("Soil moisture sensor: READY");
  connectWiFi();

  mqttClient.setServer(MQTT_BROKER, MQTT_PORT);
  mqttClient.setBufferSize(512);
  mqttClient.setKeepAlive(30);
}

void loop() {
  maintainWiFi();
  maintainMQTT();
  mqttClient.loop();

  unsigned long now = millis();
  if (now - lastPublish >= PUBLISH_INTERVAL_MS) {
    lastPublish = now;
    if (mqttClient.connected()) {
      publishSensorData();
    } else {
      Serial.println("MQTT offline, skipping publish.");
    }
  }
}`,
            explanation: 'Initializes dual hardware TwoWire buses (Wire 0 on 21/22 and Wire 1 on 18/19), configures ADC1 on GPIO 34, connects to local Wi-Fi, registers Last Will on esp32/tof_light_soil_status, and publishes JSON telemetry to esp32/tof_light_soil_data every 5 seconds.',
            expectedOutput: `================================
 ESP32 SENSOR NODE - MQTT
 ToF | BH1750 | Soil Moisture
================================
ToF I2C bus initialized.
ToF sensor: CONNECTED
BH1750 I2C bus initialized.
BH1750: CONNECTED
Soil moisture sensor: READY
Connecting to Wi-Fi: YOUR_WIFI_SSID
.......
Wi-Fi connected. IP: 192.168.1.105
Connecting to MQTT broker 192.168.1.150... connected.
Publishing to esp32/tof_light_soil_data: {"tof_mm":148,"tof_cm":14.8,"lux":420.50,"soil_raw":1842,"rssi":-58}
Publishing to esp32/tof_light_soil_data: {"tof_mm":147,"tof_cm":14.7,"lux":419.00,"soil_raw":1839,"rssi":-59}`,
          },
        ],
        whyImportant: 'This complete firmware serves as the production edge engine for the entire IoT ecosystem. It feeds distance, lux, soil moisture, and Wi-Fi signal metrics into the Raspberry Pi broker and Expo Go mobile client.',
      },
      {
        id: 'cirkit-schematic-and-physical-wiring',
        slug: 'cirkit-schematic-and-physical-wiring',
        title: 'Cirkit Designer Schematic & Step-by-Step Physical Wiring',
        shortDescription: 'Detailed physical wire-by-wire connection guide based on the project Cirkit Designer schematic: power splitting, common ground, and dual I2C routing.',
        estimatedMinutes: 18,
        difficulty: 'Intermediate',
        diagramType: 'cirkit-schematic',
        overview: `Building a stable IoT circuit requires clean wire management and strict adherence to electrical pinouts. The **Cirkit Designer schematic** above represents the exact physical wiring diagram for our project.

### Visual Architecture Analysis:
1. **Central ESP32 DevKit V1 Board**:
   - Oriented with the **micro-USB port and CP2102 chip at the bottom** and the **ESP-WROOM-32 metal radio can at the top**.
   - Left pin header hosts 3V3 power (Pin 1) and ADC1 analog inputs (GPIO 34 / Pin 5).
   - Right pin header hosts both I2C buses (GPIO 21/22 for Wire 0; GPIO 18/19 for Wire 1).

2. **VL53L0X ToF Distance Sensor (Top Left)**:
   - **VIN**: Connected via the **dark blue wire** directly to the ESP32 **3V3 rail** (Pin 1).
   - **GND**: Connected via the **dark blue / black wire** to the ESP32 **GND** pin.
   - **SCL (I2C Clock)**: The **cyan wire** routes around the bottom of the ESP32 and connects to **GPIO 22** (Pin 28).
   - **SDA (I2C Data)**: The **light blue wire** routes around the bottom of the ESP32 and connects to **GPIO 21** (Pin 25).
   - *XSHUT and GPIO1* remain unconnected for default single-address operation.

3. **BH1750 Ambient Light Sensor (Top Right)**:
   - **VCC**: Connected via the **pink wire** to the **3V3 rail**.
   - **GND**: Connected via the **dark blue / black wire** to the **GND** reference.
   - **SCL (I2C Clock)**: Connected via the **purple / magenta wire** directly to **GPIO 19** (Pin 23).
   - **SDA (I2C Data)**: Connected via the **brown / pink wire** directly to **GPIO 18** (Pin 22).
   - **ADDR**: Tied directly to **GND** with a dark jumper wire. This fixes the 7-bit I2C address permanently at \`0x23\`.

4. **Capacitive Soil Moisture Sensor v1.0 (Bottom Right)**:
   - **VCC (\`+\`)**: Connected via the **pink wire** to the **3V3 rail**.
   - **GND (\`-\`)**: Connected via the **dark blue / black wire** to the **GND** reference.
   - **AOUT (\`A\`)**: Connected via the **cyan wire** directly to **GPIO 34** (Pin 5 on the left header). Because GPIO 34 uses **ADC1**, readings remain 100% stable while Wi-Fi transmits!`,
        keyTakeaways: [
          'All three sensors are powered cleanly from the single ESP32 3V3 rail.',
          'Every sensor shares a unified common ground with the ESP32.',
          'VL53L0X operates on Wire 0 (GPIO 21/22); BH1750 operates on Wire 1 (GPIO 18/19) with ADDR grounded.',
          'Soil sensor connects to GPIO 34 (ADC1), preventing any conflict with the Wi-Fi radio.',
        ],
        steps: [
          {
            stepNumber: 1,
            title: 'Seat the ESP32 on the Breadboard',
            instruction: 'Place the ESP32 DevKit board straddling the central divider notch of your breadboard. Press down firmly and evenly so all pins enter the tie-points without bending.',
            tip: 'Leave at least one accessible column of tie-points on each side of the board for jumper wires.',
          },
          {
            stepNumber: 2,
            title: 'Establish 3.3V Power and Common Ground Rails',
            instruction: 'Connect a jumper from ESP32 Pin 1 (3V3) to the red positive (+) breadboard bus rail. Connect a jumper from ESP32 GND to the blue negative (-) breadboard bus rail.',
            warning: 'Never connect the 3.3V rail to VIN (5V). Overvoltage will permanently destroy the sensors.',
          },
          {
            stepNumber: 3,
            title: 'Wire the VL53L0X Distance Sensor (Wire 0)',
            instruction: 'Connect VL53L0X VIN to the 3.3V bus rail, GND to the ground rail, SCL to ESP32 GPIO 22, and SDA to ESP32 GPIO 21.',
            tip: 'Peel off the miniature orange protective lens film with tweezers before measuring distance.',
          },
          {
            stepNumber: 4,
            title: 'Wire the BH1750 Ambient Light Sensor (Wire 1)',
            instruction: 'Connect BH1750 VCC to the 3.3V bus rail, GND to ground, SCL to ESP32 GPIO 19, SDA to ESP32 GPIO 18, and connect ADDR to GND to lock address 0x23.',
          },
          {
            stepNumber: 5,
            title: 'Wire the Capacitive Soil Moisture Probe (ADC1)',
            instruction: 'Connect probe VCC to 3.3V, GND to ground, and signal AOUT directly to ESP32 GPIO 34 (Pin 5).',
            warning: 'Do not submerge the sensor past the white indicator line. The upper 555-timer circuit is not waterproof.',
          },
          {
            stepNumber: 6,
            title: 'Verify Continuity with Multimeter before USB Insertion',
            instruction: 'Set your digital multimeter to continuity mode. Touch one probe to the ESP32 GND pin and verify zero resistance to all three sensor GND pads. Check that there is no short circuit between 3.3V and GND.',
          },
        ],
        wiringTable: {
          componentName: 'Cirkit Designer Complete Hardware Circuit',
          voltage: '3.3V DC Regulated',
          rows: [
            { sensorPin: 'VL53L0X VIN', esp32Pin: '3V3 (Pin 1)', pinType: 'Power Input', functionDescription: '3.3V supply from ESP32 rail', wireColorRecommendation: 'Dark Blue' },
            { sensorPin: 'VL53L0X GND', esp32Pin: 'GND (Pin 14)', pinType: 'Ground Reference', functionDescription: '0V return path', wireColorRecommendation: 'Dark Blue / Black' },
            { sensorPin: 'VL53L0X SCL', esp32Pin: 'GPIO 22 (Pin 28)', pinType: 'I2C Wire 0 Clock', functionDescription: 'Clock line for address 0x29', wireColorRecommendation: 'Cyan' },
            { sensorPin: 'VL53L0X SDA', esp32Pin: 'GPIO 21 (Pin 25)', pinType: 'I2C Wire 0 Data', functionDescription: 'Data line for address 0x29', wireColorRecommendation: 'Light Blue' },
            { sensorPin: 'BH1750 VCC', esp32Pin: '3V3 (Pin 1)', pinType: 'Power Input', functionDescription: '3.3V supply from ESP32 rail', wireColorRecommendation: 'Pink' },
            { sensorPin: 'BH1750 GND', esp32Pin: 'GND (Pin 14)', pinType: 'Ground Reference', functionDescription: '0V return path', wireColorRecommendation: 'Dark Blue / Black' },
            { sensorPin: 'BH1750 SCL', esp32Pin: 'GPIO 19 (Pin 23)', pinType: 'I2C Wire 1 Clock', functionDescription: 'Independent Clock for Wire 1', wireColorRecommendation: 'Purple / Magenta' },
            { sensorPin: 'BH1750 SDA', esp32Pin: 'GPIO 18 (Pin 22)', pinType: 'I2C Wire 1 Data', functionDescription: 'Independent Data for Wire 1', wireColorRecommendation: 'Brown / Pink' },
            { sensorPin: 'BH1750 ADDR', esp32Pin: 'GND (Pin 14)', pinType: 'Address Selector', functionDescription: 'Tied to GND sets address to 0x23', wireColorRecommendation: 'Dark Blue / Black' },
            { sensorPin: 'Soil VCC (+)', esp32Pin: '3V3 (Pin 1)', pinType: 'Power Input', functionDescription: '3.3V supply from ESP32 rail', wireColorRecommendation: 'Pink' },
            { sensorPin: 'Soil GND (-)', esp32Pin: 'GND (Pin 14)', pinType: 'Ground Reference', functionDescription: '0V return path', wireColorRecommendation: 'Dark Blue / Black' },
            { sensorPin: 'Soil AOUT (A)', esp32Pin: 'GPIO 34 (Pin 5)', pinType: 'ADC1 Analog Input', functionDescription: '12-bit analog voltage (Wi-Fi safe)', wireColorRecommendation: 'Cyan' },
          ],
          notes: 'Diagram created and verified in Cirkit Designer. All signals operate strictly on 3.3V logic level.',
        },
        troubleshootingTips: [
          {
            problem: 'VL53L0X is detected but BH1750 returns timeout or NaN.',
            cause: 'Wires for Wire 1 (GPIO 18/19) were accidentally plugged into Wire 0 (GPIO 21/22), or ADDR was left floating.',
            solution: 'Confirm BH1750 SDA is in GPIO 18 and SCL is in GPIO 19. Ensure ADDR is firmly grounded to 0V.',
          },
          {
            problem: 'The ESP32 brownout detector triggers and the board continuously reboots.',
            cause: 'Short circuit between 3V3 and GND on the breadboard rail, or bad micro-USB cable with excessive voltage drop.',
            solution: 'Disconnect USB immediately. Inspect breadboard power rails for bridging wires. Use a shorter, thicker USB data sync cable.',
          },
        ],
      },
      {
        id: 'breadboard-power-rails-and-common-grounding',
        slug: 'breadboard-power-rails-and-common-grounding',
        title: 'Breadboard Power Distribution & Common Grounding',
        shortDescription: 'Master breadboard bus rails, common ground return paths, current budgets, and decoupling capacitors to eliminate electrical noise.',
        estimatedMinutes: 14,
        difficulty: 'Beginner',
        diagramType: 'unified-wiring',
        overview: `A common failure mode for beginners is connecting each sensor power wire individually into the same single 3V3 pin hole on the ESP32. This causes physical crowding, loose DuPont contacts, and intermittent disconnects.

### How Solderless Breadboards Distribute Power:
- **Power Bus Rails (+ and -)**: The long continuous columns running along the outer edges of the breadboard are connected internally from top to bottom.
- By connecting **one jumper wire from the ESP32 3V3 pin to the red (+) bus rail**, the entire red strip becomes a 3.3V power distribution bus!
- By connecting **one jumper wire from ESP32 GND to the blue (-) bus rail**, the entire blue strip becomes a common ground reference.
- Any sensor needing power or ground simply plugs into this bus rail.

### Why Common Ground is Electrically Mandatory:
Voltage is fundamentally a **potential difference between two points**.
When the ESP32 measures analog voltage on GPIO 34 from the Soil Moisture Sensor, or reads high/low logic transitions on I2C lines, it measures the voltage **relative to its own internal 0V Ground plane**.
If a sensor does not share a solid, low-resistance ground return path with the microcontroller, the signal floating ground causes erratic ADC readings, I2C bus arbitration errors, and missed ACK packets.

### Current Budget Calculation:
- **ESP32 DevKit Onboard Regulator (AMS1117 / ME6211)**: Rated up to **500 mA** continuous output at 3.3V.
- **ESP32 Wi-Fi Transmission Peak**: ~120 - 180 mA.
- **VL53L0X Laser Distance Sensor**: ~19 mA during active photon ranging.
- **BH1750 Ambient Light Sensor**: ~0.14 mA (140 microamps).
- **Capacitive Soil Probe**: ~5 mA.
- **Total Combined Current**: **~145 - 205 mA**.
Because 205 mA is less than half of the 500 mA regulator capacity, powering all three transducers from the ESP32 3V3 pin is **100% safe, stable, and well within thermal margins**.`,
        keyTakeaways: [
          'Use the breadboard red (+) and blue (-) outer bus rails for 3.3V power and ground distribution.',
          'Common ground provides the single 0V reference point required for accurate ADC sampling and I2C digital logic.',
          'Total sensor current draw is under 25 mA—far below the ESP32 voltage regulator limit of 500 mA.',
          'Avoid long jumper wires (> 20 cm) on high-speed I2C buses to prevent signal degradation.',
        ],
        whyImportant: 'Proper breadboard power rail distribution prevents voltage droops and ground loops, ensuring your IoT device operates 24/7 without random rebooting.',
        practicalExample: 'In our setup, the red breadboard rail powers the VL53L0X, BH1750, and Soil probe simultaneously. Even when the soil probe is immersed in wet earth, the 3.3V rail voltage stays rock-steady at 3.29V.',
      },
      {
        id: 'hardware-wiring-video-demonstration',
        slug: 'hardware-wiring-video-demonstration',
        title: 'Live Hardware Demonstration & Serial Monitor Stream',
        shortDescription: 'Watch the live screen capture of the ESP32 hardware reading real-time ToF distance, illuminance, and soil moisture over the USB serial monitor.',
        estimatedMinutes: 12,
        difficulty: 'Beginner',
        diagramType: 'obs-video',
        overview: `To see the complete hardware circuit in action, watch the **live screen recording video** below captured directly from our testing workstation running OBS Studio.

The video demonstrates the physical ESP32 connected via USB on **COM4** to the Arduino IDE Serial Monitor at **115200 baud**. You will see:
1. **Physical Circuit Stability**: The ESP32 powering all three sensors simultaneously over the breadboard power rails.
2. **Real-Time Transducer Responses**:
   - The VL53L0X distance reading dynamically changing in millimeters as objects approach and recede.
   - The BH1750 illuminance reading instantly shifting between dim indoor levels (~25 lx) and bright light (~450 lx).
   - The Capacitive Soil Moisture Probe sampling ADC1 on GPIO 34, computing inverse capacitance, and converting raw counts to moisture percentages.
3. **Structured Telemetry Ingestion**: Every 5 seconds, the firmware bundles all three transducer values into a structured JSON string formatted for our Raspberry Pi FastAPI backend.`,
        keyTakeaways: [
          'Visual proof of all three sensors functioning simultaneously on a single ESP32 node.',
          'Verification of 115200 baud serial communication without buffer overrun.',
          'Live observation of distance, light, and soil telemetry streaming in JSON format.',
          'Downloadable MP4 recording available for offline reference and study.',
        ],
        steps: [
          {
            stepNumber: 1,
            title: 'Verify Hardware Wiring Against Cirkit Diagram',
            instruction: 'Ensure all jumper wires match the Cirkit Designer schematic: VL53L0X on GPIO 21/22, BH1750 on GPIO 18/19, and Soil probe on GPIO 34.',
          },
          {
            stepNumber: 2,
            title: 'Open Arduino IDE and Select Port',
            instruction: 'Navigate to Tools -> Port and select your detected ESP32 port (e.g. COM4 on Windows). Set baud rate to 115200.',
          },
          {
            stepNumber: 3,
            title: 'Open Serial Monitor',
            instruction: 'Press Ctrl + Shift + M to open the Serial Monitor. Observe the boot banner, I2C bus initialization confirmations, and the 5-second telemetry loop.',
          },
          {
            stepNumber: 4,
            title: 'Perform Live Stimulus Tests',
            instruction: 'Wave your hand in front of the VL53L0X to see distance change in millimeters. Cover the BH1750 to watch lux drop. Place the soil probe in water to see moisture percentage rise to 100%.',
          },
        ],
        whyImportant: 'Seeing real serial output streaming from physical hardware validates that your wiring, baud rate, and firmware logic are fully operational before deploying to the Raspberry Pi network.',
      },
    ],
    quiz: {
      title: 'Module 4 Knowledge Check: Transducers & Wiring',
      description: 'Test your understanding of Time-of-Flight distance, ambient lux, capacitive soil probes, and dual I2C architecture.',
      passingScore: 3,
      questions: [
        {
          id: 'm4-q1',
          question: 'Why does our architecture assign the BH1750 to TwoWire(1) on GPIO 18/19 rather than sharing GPIO 21/22 with the VL53L0X?',
          options: [
            { id: 'a', text: 'GPIO 21 and 22 only work for LEDs, not sensors.', isCorrect: false, explanation: 'GPIO 21 and 22 are full hardware I2C pins.' },
            { id: 'b', text: 'To provide electrical isolation and prevent I2C clock-stretching contention caused by the VL53L0X laser calculations.', isCorrect: true, explanation: 'Correct! Running two independent hardware I2C controllers prevents device lockups and communication latency.' },
            { id: 'c', text: 'The BH1750 requires 120V alternating current.', isCorrect: false, explanation: 'It operates at 3.3V DC.' },
            { id: 'd', text: 'Arduino IDE does not support I2C addressing.', isCorrect: false, explanation: 'Arduino IDE fully supports standard I2C addresses.' },
          ],
        },
        {
          id: 'm4-q2',
          question: 'What is the relationship between the Capacitive Soil Moisture Sensor analog voltage and actual soil moisture?',
          options: [
            { id: 'a', text: 'Direct relationship: higher soil moisture produces higher voltage.', isCorrect: false, explanation: 'This is the opposite of how capacitive dielectric measurement operates.' },
            { id: 'b', text: 'Inverse relationship: high raw ADC count indicates dry air; low raw ADC count indicates wet saturated soil.', isCorrect: true, explanation: 'Correct! Increasing water content raises probe capacitance, lowering the oscillation voltage.' },
            { id: 'c', text: 'The voltage remains constant regardless of moisture.', isCorrect: false, explanation: 'The sensor varies voltage based on the surrounding soil dielectric constant.' },
            { id: 'd', text: 'It outputs Morse code pulses.', isCorrect: false, explanation: 'It outputs an analog DC voltage between ~1.2V and 3.0V.' },
          ],
        },
        {
          id: 'm4-q3',
          question: 'Why is a capacitive soil probe superior to a traditional resistive probe with exposed copper prongs?',
          options: [
            { id: 'a', text: 'Capacitive probes are immune to galvanic electrolysis and corrosion because copper traces are insulated beneath solder mask.', isCorrect: true, explanation: 'Correct! Resistive probes corrode within weeks due to DC current flow through wet soil.' },
            { id: 'b', text: 'Capacitive probes can also detect earthquakes.', isCorrect: false, explanation: 'They only measure capacitance.' },
            { id: 'c', text: 'Capacitive probes generate electricity like solar panels.', isCorrect: false, explanation: 'They consume power from the 3.3V rail.' },
            { id: 'd', text: 'There is no difference between them.', isCorrect: false, explanation: 'Capacitive probes offer vastly superior durability.' },
          ],
        },
      ],
    },
  },

  // ==========================================
  // MODULE 5: CONNECTING ESP32 TO RASPBERRY PI
  // ==========================================
  {
    id: 'module-5',
    moduleNumber: 5,
    slug: 'connecting-esp32-to-raspberry-pi',
    title: 'Connecting ESP32 to Raspberry Pi via FastAPI',
    tagline: 'Bridge microcontroller edge telemetry to a local Python FastAPI server and persistent SQLite database.',
    description: 'Learn how the ESP32 and Raspberry Pi find each other over local Wi-Fi, build a production-grade FastAPI REST server in Python, store records in SQLite, and handle network edge failures.',
    badge: 'MODULE 05 • EDGE BACKEND',
    iconName: 'Server',
    lessons: [
      {
        id: 'raspberry-pi-network-setup',
        slug: 'raspberry-pi-network-setup',
        title: 'Raspberry Pi Setup & Local Network Architecture',
        shortDescription: 'Configure your Raspberry Pi, establish a common 2.4GHz Wi-Fi subnet, and discover your local static IP address.',
        estimatedMinutes: 10,
        difficulty: 'Beginner',
        overview: `In an industrial or smart-home IoT pipeline, the **Raspberry Pi** acts as the **Edge Server & Gateway**. While the ESP32 reads physical pins in real time, it lacks the memory to maintain extensive historical databases or run complex web servers. The Raspberry Pi fills this role with a full Linux operating system, multi-gigabyte RAM, and persistent storage.

### The Network Architecture:
Both the ESP32 and the Raspberry Pi must join the **same local Wi-Fi network (SSID)** so they reside on the same IP subnet (e.g. \`192.168.1.xxx\`).

### Discovering the Raspberry Pi Local IP:
Open a terminal on your Raspberry Pi (or SSH from your PC) and run:
\`\`\`bash
hostname -I
\`\`\`
Output example: \`192.168.1.150\`

**Pro-Tip**: In your home router settings, assign a **DHCP Static IP Reservation** to the Raspberry Pi MAC address so its IP never changes when the router reboots!`,
        keyTakeaways: [
          'The ESP32 and Raspberry Pi must be on the same Wi-Fi network to communicate directly over LAN without complex port forwarding.',
          'Use hostname -I on the Raspberry Pi terminal to find its local IPv4 address.',
          'Assigning a static DHCP reservation in your router prevents the Pi address from drifting.',
        ],
        diagramType: 'pi-rest-architecture',
        whyImportant: 'If the ESP32 tries to send HTTP requests to an incorrect or stale IP address, all network requests will time out with error code -1.',
      },
      {
        id: 'fastapi-backend-setup',
        slug: 'fastapi-backend-setup',
        title: 'Building the FastAPI Server on Raspberry Pi',
        shortDescription: 'Create a high-speed Python REST API using FastAPI, Pydantic data validation, and Uvicorn ASGI server.',
        estimatedMinutes: 15,
        difficulty: 'Intermediate',
        overview: `**FastAPI** is a modern, high-performance web framework for Python based on standard type hints and ASGI asynchronous execution. It is significantly faster and more structured than legacy frameworks like Flask.

### Why FastAPI for IoT Edge?
1. **Automatic Data Validation**: Uses **Pydantic** models to validate incoming JSON sensor packets. If the ESP32 sends a missing or invalid field, FastAPI automatically rejects it with clear HTTP 422 error messages.
2. **Interactive Swagger Documentation**: Automatically generates an interactive API test page at \`http://<PI_IP>:8000/docs\`.
3. **High Throughput**: Can handle hundreds of concurrent requests per second on a Raspberry Pi 4/5.

### Step-by-Step Installation on Raspberry Pi:
\`\`\`bash
# Create dedicated project directory
mkdir ~/iot-edge-server && cd ~/iot-edge-server

# Create and activate Python virtual environment
python3 -m venv venv
source venv/bin/activate

# Install FastAPI and Uvicorn server
pip install fastapi uvicorn pydantic
\`\`\``,
        keyTakeaways: [
          'FastAPI automatically validates incoming JSON sensor fields using Pydantic schemas.',
          'Runs on Uvicorn ASGI server bound to 0.0.0.0 so external devices on the LAN can connect.',
          'Provides built-in interactive Swagger UI testing documentation at /docs.',
        ],
        codeBlocks: [
          {
            id: 'fastapi-minimal-server',
            title: 'Complete Python FastAPI Telemetry Ingestion Server',
            language: 'python',
            filename: 'main.py',
            code: `# ==========================================
# Raspberry Pi IoT Telemetry Ingestion Server
# Framework: FastAPI + Uvicorn
# ==========================================

from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
import uvicorn

app = FastAPI(
    title="IoT Edge Sensor Telemetry API",
    description="Receives sensor data from ESP32 and serves real-time metrics to Expo Go mobile app.",
    version="2.0.0"
)

# Enable CORS so Expo Go web/mobile clients can access API without restrictions
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic Schema defining the exact JSON contract from ESP32
class SensorTelemetryIn(BaseModel):
    tof_mm: Optional[int] = Field(None, description="Target distance in millimeters from VL53L0X")
    tof_cm: Optional[float] = Field(None, description="Target distance in centimeters from VL53L0X")
    lux: Optional[float] = Field(None, description="Ambient illuminance in Lux from BH1750")
    soil_raw: int = Field(..., description="Raw 12-bit ADC value from Capacitive Soil Probe")
    rssi: Optional[int] = Field(None, description="ESP32 Wi-Fi signal strength in dBm")

# In-memory storage for the latest reading
current_reading = {
    "tof_distance_mm": 150,
    "tof_distance_cm": 15.0,
    "light_lux": 425.0,
    "soil_raw": 1820,
    "soil_moisture_percent": 55.0,
    "rssi": -62,
    "updated_at": datetime.utcnow().isoformat(),
    "node_status": "ONLINE"
}

# Empirical soil moisture constants
SOIL_AIR = 2527
SOIL_WATER = 1237

def calculate_soil_percent(raw: int) -> float:
    # Inverse map: higher raw = drier
    percent = ((SOIL_AIR - raw) / (SOIL_AIR - SOIL_WATER)) * 100.0
    return round(max(0.0, min(100.0, percent)), 1)

@app.get("/")
def root():
    return {
        "system": "Raspberry Pi IoT Edge Server",
        "status": "RUNNING",
        "timestamp": datetime.utcnow().isoformat()
    }

@app.post("/api/readings", status_code=status.HTTP_201_CREATED)
def receive_sensor_readings(data: SensorTelemetryIn):
    """
    Endpoint called by ESP32 every 5 seconds to ingest telemetry.
    """
    global current_reading

    soil_percent = calculate_soil_percent(data.soil_raw)
    distance_cm = data.tof_cm if data.tof_cm is not None else (round(data.tof_mm / 10.0, 1) if data.tof_mm is not None else None)

    current_reading = {
        "tof_distance_mm": data.tof_mm,
        "tof_distance_cm": distance_cm,
        "light_lux": round(data.lux, 2) if data.lux is not None else None,
        "soil_raw": data.soil_raw,
        "soil_moisture_percent": soil_percent,
        "rssi": data.rssi or -60,
        "updated_at": datetime.utcnow().isoformat(),
        "node_status": "ONLINE"
    }

    print(f"[{datetime.now().strftime('%H:%M:%S')}] INGESTED: "
          f"Distance: {data.tof_mm}mm | Lux: {data.lux:.1f}lx | Soil: {soil_percent}%")

    return {
        "status": "success",
        "message": "Telemetry accepted and processed",
        "soil_moisture_percent": soil_percent
    }

@app.get("/api/readings/current")
def get_current_reading():
    """
    Endpoint called by Expo Go mobile app to display live gauges.
    """
    return current_reading

if __name__ == "__main__":
    # Crucial: host='0.0.0.0' binds to all network interfaces, allowing ESP32 and phone to reach it!
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)`,
            explanation: 'Defines a Pydantic schema for strict validation, enables CORS for Expo Go, calculates soil percentage on the backend, ingests POST telemetry from ESP32, and serves GET /api/readings/current.',
            expectedOutput: `INFO:     Started server process [4128]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
[14:32:01] INGESTED: Distance: 145mm | Lux: 412.5lx | Soil: 53.2%
[14:32:06] INGESTED: Distance: 146mm | Lux: 415.0lx | Soil: 53.0%`,
          },
        ],
        whyImportant: 'Binding Uvicorn to 127.0.0.1 (localhost) is the most common beginner mistake: it prevents any other device on the Wi-Fi network from reaching the server. You MUST bind to 0.0.0.0.',
      },
      {
        id: 'sqlite-database-storage',
        slug: 'sqlite-database-storage',
        title: 'Edge Persistence: Storing Telemetry in SQLite',
        shortDescription: 'Zero-configuration SQL storage on Raspberry Pi. Create tables, insert records, and query history for graphs.',
        estimatedMinutes: 12,
        difficulty: 'Intermediate',
        overview: `While keeping the latest reading in memory is great for live gauges, real IoT applications require historical data logging to render graphs in the mobile app (e.g. soil moisture trends over the last 24 hours).

### Why SQLite on the Edge?
- **Zero Configuration**: Built directly into Python (\`import sqlite3\`). No complex MySQL or Postgres database server to configure or maintain.
- **Single File Storage**: Stored cleanly in \`sensor_readings.db\`. Easy to back up or inspect.
- **Power Failure Resilient**: Uses atomic write-ahead logging (WAL mode), protecting your data if the Raspberry Pi power cable is accidentally unplugged.`,
        keyTakeaways: [
          'SQLite is serverless, zero-maintenance, and built natively into standard Python.',
          'WAL mode ensures database integrity during sudden power interruptions.',
          'Allows the mobile app to query historical records to render line charts.',
        ],
        codeBlocks: [
          {
            id: 'sqlite-db-code',
            title: 'SQLite Database Helper for Telemetry Ingestion',
            language: 'python',
            filename: 'database.py',
            code: `# ==========================================
# SQLite Database Storage Helper
# ==========================================

import sqlite3
from datetime import datetime
from typing import List, Dict, Any

DB_FILE = "sensor_readings.db"

def init_db():
    """Creates the readings table if it does not already exist."""
    with sqlite3.connect(DB_FILE) as conn:
        cursor = conn.cursor()
        # Enable WAL mode for high concurrency and crash resilience
        cursor.execute("PRAGMA journal_mode=WAL;")
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS readings (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                timestamp TEXT NOT NULL,
                tof_distance_mm INTEGER,
                light_lux REAL,
                soil_raw INTEGER,
                soil_moisture_percent REAL,
                rssi INTEGER
            )
        """)
        conn.commit()
    print("[DB] SQLite database initialized successfully.")

def insert_reading(tof_mm: int, lux: float, soil_raw: int, soil_percent: float, rssi: int):
    """Inserts a new sensor telemetry row."""
    with sqlite3.connect(DB_FILE) as conn:
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO readings (timestamp, tof_distance_mm, light_lux, soil_raw, soil_moisture_percent, rssi)
            VALUES (?, ?, ?, ?, ?, ?)
        """, (datetime.utcnow().isoformat(), tof_mm, lux, soil_raw, soil_percent, rssi))
        conn.commit()

def get_recent_readings(limit: int = 50) -> List[Dict[str, Any]]:
    """Retrieves the latest historical records for mobile graphing."""
    with sqlite3.connect(DB_FILE) as conn:
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        cursor.execute("""
            SELECT id, timestamp, tof_distance_mm, light_lux, soil_raw, soil_moisture_percent, rssi
            FROM readings
            ORDER BY id DESC
            LIMIT ?
        """, (limit,))
        rows = cursor.fetchall()
        return [dict(row) for row in rows]`,
            explanation: 'Provides table initialization with WAL mode, parameterized SQL inserts, and historical query functions for mobile chart rendering.',
          },
        ],
        whyImportant: 'Using parameterized queries (\`?, ?\`) prevents SQL injection vulnerabilities and properly handles data types.',
      },
      {
        id: 'esp32-http-client-firmware',
        slug: 'esp32-http-client-firmware',
        title: 'Complete ESP32-to-FastAPI Firmware & Troubleshooting',
        shortDescription: 'The full C++ firmware sending all 3 sensor readings to Raspberry Pi FastAPI with status checks and error recovery.',
        estimatedMinutes: 16,
        difficulty: 'Advanced',
        overview: `We now bring everything together into the **Final ESP32 Client Firmware**. This sketch samples the VL53L0X, BH1750, and Soil Moisture sensors, packages their values into a JSON string, and executes an HTTP POST to the Raspberry Pi FastAPI server every 5 seconds.

### Troubleshooting Network Errors:
- **HTTP Error Code -1 (\`CONNECTION_REFUSED\` or \`TIMEOUT\`)**:
  - The Raspberry Pi IP address is incorrect.
  - The FastAPI server is not running on port 8000.
  - Raspberry Pi firewall is blocking port 8000. Check: \`sudo ufw allow 8000/tcp\`.
  - Uvicorn was run with \`host="127.0.0.1"\` instead of \`host="0.0.0.0"\`.
- **HTTP Error Code 422 (\`Unprocessable Entity\`)**:
  - Pydantic schema mismatch: the field names in the ESP32 JSON string do not match the Python model (e.g. \`tof_mm\` vs \`tof_distance\`).`,
        keyTakeaways: [
          'Full production firmware connecting sensors to the Raspberry Pi over HTTP.',
          'Includes network timeout guards and memory-safe http.end() calls.',
          'Verify your Raspberry Pi firewall with sudo ufw allow 8000/tcp.',
        ],
        codeBlocks: [
          {
            id: 'complete-esp32-to-pi-firmware',
            title: 'Complete Production ESP32 -> Raspberry Pi Ingestion Firmware',
            language: 'cpp',
            filename: 'esp32_to_raspberrypi_fastapi.ino',
            code: `#include <Wire.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <Adafruit_VL53L0X.h>
#include <BH1750.h>

// ==========================================
// 1. NETWORK CONFIGURATION
// ==========================================
const char* WIFI_SSID     = "YOUR_WIFI_SSID";
const char* WIFI_PASSWORD = "YOUR_WIFI_PASSWORD";

// Replace with your Raspberry Pi's actual local IP address
const char* API_ENDPOINT  = "http://192.168.1.150:8000/api/readings";

// ==========================================
// 2. HARDWARE PIN ALLOCATIONS
// ==========================================
#define TOF_SDA   21
#define TOF_SCL   22

#define LIGHT_SDA 18
#define LIGHT_SCL 19

#define SOIL_PIN  34 // ADC1 (Safe with Wi-Fi)

TwoWire tofWire   = TwoWire(0);
TwoWire lightWire = TwoWire(1);

Adafruit_VL53L0X tof;
BH1750 lightMeter;

bool tofReady   = false;
bool lightReady = false;

unsigned long lastTransmit = 0;
const unsigned long TRANSMIT_INTERVAL_MS = 5000; // Send telemetry every 5 seconds

void connectWiFi() {
  Serial.print("Connecting to Wi-Fi: ");
  Serial.println(WIFI_SSID);

  WiFi.mode(WIFI_STA);
  WiFi.setAutoReconnect(true);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  unsigned long start = millis();
  while (WiFi.status() != WL_CONNECTED && millis() - start < 15000) {
    delay(500);
    Serial.print(".");
  }
  Serial.println();

  if (WiFi.status() == WL_CONNECTED) {
    Serial.print(">>> Wi-Fi Connected. Local IP: ");
    Serial.println(WiFi.localIP());
  } else {
    Serial.println(">>> Wi-Fi timeout. Retrying in main loop...");
  }
}

void setup() {
  Serial.begin(115200);
  delay(1000);
  Serial.println("\\n==============================================");
  Serial.println("ESP32 to Raspberry Pi REST Telemetry Node");
  Serial.println("==============================================");

  // Configure Soil ADC
  analogReadResolution(12);
  analogSetPinAttenuation(SOIL_PIN, ADC_11db);

  // Initialize VL53L0X on Wire 0
  tofWire.begin(TOF_SDA, TOF_SCL);
  if (tof.begin(0x29, false, &tofWire)) {
    tofReady = true;
    Serial.println("[OK] VL53L0X Ready on Wire 0.");
  }

  // Initialize BH1750 on Wire 1
  lightWire.begin(LIGHT_SDA, LIGHT_SCL);
  if (lightMeter.begin(BH1750::CONTINUOUS_HIGH_RES_MODE, 0x23, &lightWire)) {
    lightReady = true;
    Serial.println("[OK] BH1750 Ready on Wire 1.");
  }

  // Connect to Wi-Fi
  connectWiFi();
}

void loop() {
  unsigned long now = millis();

  if (now - lastTransmit >= TRANSMIT_INTERVAL_MS) {
    lastTransmit = now;

    if (WiFi.status() != WL_CONNECTED) {
      Serial.println("[NETWORK] Wi-Fi lost. Attempting reconnection...");
      WiFi.reconnect();
      return;
    }

    // 1. Read VL53L0X ToF Distance
    int tofMm = 0;
    if (tofReady) {
      VL53L0X_RangingMeasurementData_t measure;
      tof.rangingTest(&measure, false);
      if (measure.RangeStatus != 4) {
        tofMm = measure.RangeMilliMeter;
      }
    }

    // 2. Read BH1750 Ambient Light
    float lux = 0.0;
    if (lightReady) {
      lux = lightMeter.readLightLevel();
    }

    // 3. Read Capacitive Soil Moisture
    long soilSum = 0;
    for (int i = 0; i < 10; i++) {
      soilSum += analogRead(SOIL_PIN);
      delay(2);
    }
    int soilRaw = soilSum / 10;

    // 4. Construct JSON Payload
    String json = "{";
    json += "\\"tof_mm\\":" + String(tofMm) + ",";
    json += "\\"lux\\":" + String(lux, 2) + ",";
    json += "\\"soil_raw\\":" + String(soilRaw) + ",";
    json += "\\"rssi\\":" + String(WiFi.RSSI());
    json += "}";

    // 5. Send HTTP POST to Raspberry Pi FastAPI
    WiFiClient client;
    HTTPClient http;

    http.begin(client, API_ENDPOINT);
    http.addHeader("Content-Type", "application/json");
    http.setTimeout(4000);

    Serial.print("[HTTP POST] Transmitting -> ");
    Serial.println(json);

    int httpCode = http.POST(json);

    if (httpCode == HTTP_CODE_CREATED || httpCode == HTTP_CODE_OK) {
      Serial.print("[HTTP 201 SUCCESS] Server Response: ");
      Serial.println(http.getString());
    } else {
      Serial.print("[HTTP ERROR] Failed with code: ");
      Serial.println(httpCode);
      Serial.println(http.errorToString(httpCode));
    }

    http.end(); // Free connection handle
  }
}`,
            explanation: 'Samples all three sensors every 5 seconds, serializes data into a valid JSON string matching the FastAPI Pydantic schema, and performs an HTTP POST with status code logging.',
            expectedOutput: `[HTTP POST] Transmitting -> {"tof_mm":148,"lux":422.50,"soil_raw":1832,"rssi":-59}
[HTTP 201 SUCCESS] Server Response: {"status":"success","message":"Telemetry accepted and processed","soil_moisture_percent":53.7}`,
          },
        ],
        troubleshootingTips: [
          {
            problem: 'Serial Monitor reports "HTTP ERROR -1: connection refused".',
            cause: 'FastAPI is not running on Raspberry Pi, or Uvicorn was bound to 127.0.0.1 instead of 0.0.0.0.',
            solution: 'Start the server on Raspberry Pi using uvicorn main:app --host 0.0.0.0 --port 8000.',
          },
          {
            problem: 'Serial Monitor reports "HTTP ERROR 422: Unprocessable Entity".',
            cause: 'JSON key names mismatch. For example, ESP32 sent "tof_distance" but Pydantic model expects "tof_mm".',
            solution: 'Verify that JSON field names exactly match the Pydantic schema in main.py.',
          },
        ],
      },
    ],
    quiz: {
      title: 'Module 5 Knowledge Check: Edge Server & API',
      description: 'Test your understanding of FastAPI, local IP addressing, and edge database storage.',
      passingScore: 3,
      questions: [
        {
          id: 'm5-q1',
          question: 'Why must Uvicorn on the Raspberry Pi be started with --host 0.0.0.0 instead of default 127.0.0.1?',
          options: [
            { id: 'a', text: '127.0.0.1 only listens for requests from the Raspberry Pi itself, preventing the ESP32 and phone from connecting over LAN.', isCorrect: true, explanation: 'Correct! 0.0.0.0 binds the server to all network interfaces on the local Wi-Fi.' },
            { id: 'b', text: '0.0.0.0 automatically pays your internet service provider bill.', isCorrect: false, explanation: 'It is a network interface binding address.' },
            { id: 'c', text: '127.0.0.1 causes the Raspberry Pi CPU to overheat.', isCorrect: false, explanation: 'IP address binding has no thermal consequence.' },
            { id: 'd', text: '0.0.0.0 is an encrypted military protocol.', isCorrect: false, explanation: 'It is the standard standard INADDR_ANY constant.' },
          ],
        },
        {
          id: 'm5-q2',
          question: 'What HTTP status code does FastAPI return when incoming JSON fails Pydantic schema validation?',
          options: [
            { id: 'a', text: '200 OK', isCorrect: false, explanation: '200 indicates a successful request.' },
            { id: 'b', text: '404 Not Found', isCorrect: false, explanation: '404 indicates a missing URL route.' },
            { id: 'c', text: '422 Unprocessable Entity', isCorrect: true, explanation: 'Correct! HTTP 422 indicates that data types or required fields were invalid.' },
            { id: 'd', text: '500 Server Melted', isCorrect: false, explanation: '500 is an unhandled internal server error.' },
          ],
        },
        {
          id: 'm5-q3',
          question: 'What is the primary benefit of enabling WAL (Write-Ahead Logging) mode in SQLite on the Raspberry Pi?',
          options: [
            { id: 'a', text: 'It prevents database corruption during sudden power losses and allows concurrent reading and writing.', isCorrect: true, explanation: 'Correct! WAL mode is critical for edge computing where unexpected power disconnections can occur.' },
            { id: 'b', text: 'It converts SQLite into a blockchain.', isCorrect: false, explanation: 'SQLite is a relational SQL engine.' },
            { id: 'c', text: 'It translates English into Spanish.', isCorrect: false, explanation: 'Database journaling modes handle transactional durability.' },
            { id: 'd', text: 'It compresses images.', isCorrect: false, explanation: 'WAL handles transaction logs.' },
          ],
        },
      ],
    },
  },

  // ==========================================
  // MODULE 6: UNDERSTANDING THE COMPLETE SYSTEM
  // ==========================================
  {
    id: 'module-6',
    moduleNumber: 6,
    slug: 'understanding-the-complete-system',
    title: 'Understanding the Complete System',
    tagline: 'See how ESP32, physical sensors, Wi-Fi, Raspberry Pi FastAPI, SQLite, and Expo Go connect end-to-end.',
    description: 'An architectural masterclass connecting all components into a synchronized real-time IoT ecosystem. Trace one physical measurement from photon emission to mobile screen pixel rendering.',
    badge: 'MODULE 06 • ARCHITECTURE',
    iconName: 'Layers',
    lessons: [
      {
        id: 'complete-iot-pipeline',
        slug: 'complete-iot-pipeline',
        title: 'End-to-End IoT Pipeline Walkthrough',
        shortDescription: 'Trace a measurement from physical photons and capacitance to Wi-Fi packets, SQLite rows, and mobile UI rendering.',
        estimatedMinutes: 12,
        difficulty: 'Intermediate',
        overview: `To truly master IoT engineering, you must see how every individual layer collaborates to form a cohesive, robust pipeline.

### The 7-Stage Data Pipeline:
\`\`\`
[1. PHYSICAL PHENOMENA] 
        │ (Photons, Distance, Soil Permittivity)
        ▼
[2. TRANSDUCERS: VL53L0X, BH1750, SOIL PROBE]
        │ (Dual I2C Buses + 12-bit ADC Voltage)
        ▼
[3. ESP32 MICROCONTROLLER]
        │ (Sampling, Calibration, JSON Serialization)
        ▼ (2.4 GHz Wi-Fi HTTP POST)
[4. LOCAL ROUTER & TRANSPORT LAYER]
        │ (TCP/IP Port 8000)
        ▼
[5. RASPBERRY PI FASTAPI BACKEND]
        │ (Pydantic Schema Validation, Moisture Math)
        ▼
[6. SQLITE DATABASE PERSISTENCE]
        │ (Historical Time-Series Telemetry Table)
        ▼ (Local Wi-Fi HTTP GET /api/readings/current)
[7. EXPO GO MOBILE APPLICATION]
        │ (React Native Live Gauge Cards & Interactive Charts)
        ▼
[HUMAN USER SEES REAL-TIME METRIC ON PHONE SCREEN]
\`\`\`

### Role of Each Component:
1. **Physical Sensors**: Transduce natural properties into electrical signals (microns, lumens, capacitance).
2. **ESP32 Edge Microcontroller**: Runs deterministic C++ firmware, eliminates I2C conflicts via dual buses, and safeguards Wi-Fi by sampling ADC1.
3. **Local Wi-Fi Network**: High-speed, zero-cost, private transport layer.
4. **Raspberry Pi Edge Server**: Ingests, validates, and stores data locally without relying on paid third-party cloud subscriptions.
5. **Expo Go React Native App**: Displays beautiful, responsive telemetry on Android and iOS devices.`,
        keyTakeaways: [
          'Each layer has one specific responsibility, creating a decoupled and maintainable architecture.',
          'Zero cloud dependency: the system operates 100% offline on your local Wi-Fi network.',
          'If one component is upgraded (e.g. adding a new sensor), other layers remain unaffected.',
        ],
        diagramType: 'system-flow',
        whyImportant: 'Architectural clarity allows you to isolate and solve bugs in seconds. If the mobile app shows old data, you immediately know whether to check the phone fetch hook, the Pi API, or the ESP32 transmitter.',
      },
      {
        id: 'expo-go-mobile-integration',
        slug: 'expo-go-mobile-integration',
        title: 'Expo Go Mobile Application Integration & Visualization',
        shortDescription: 'How React Native in Expo Go queries the Raspberry Pi API to render interactive metric cards and live graphs.',
        estimatedMinutes: 14,
        difficulty: 'Intermediate',
        overview: `**Expo Go** is a native mobile development runtime for Android and iOS that executes your compiled React Native JavaScript bundle.

### How Expo Go Visualizes Telemetry:
The mobile phone connects to the **same local Wi-Fi network** as the Raspberry Pi.
Using React's \`useEffect\` and standard \`fetch()\`, the mobile app periodically polls the Raspberry Pi endpoint:
\`\`\`
GET http://192.168.1.150:8000/api/readings/current
\`\`\`
The response is parsed and stored in React state, triggering instantaneous updates to:
- **Distance Card**: Displays millimeters and centimeters with an animated gauge.
- **Light Intensity Card**: Displays Lux with sun/moon icons and ambient category tags.
- **Soil Moisture Card**: Displays percentage with dry/moist/wet progress bars.
- **Wi-Fi Signal Card**: Displays RSSI in dBm with signal strength bars.`,
        keyTakeaways: [
          'Expo Go runs React Native cross-platform on both iOS and Android.',
          'The mobile client connects to the Raspberry Pi LAN IP address over HTTP.',
          'Polling or WebSocket connections provide real-time updates to UI cards.',
        ],
        codeBlocks: [
          {
            id: 'react-native-sensor-card',
            title: 'React Native Telemetry Fetcher Hook for Expo Go',
            language: 'typescript',
            filename: 'useSensorTelemetry.ts',
            code: `// ==========================================
// React Native / Expo Go Telemetry Hook
// ==========================================

import { useState, useEffect } from 'react'

export interface SensorData {
  tof_distance_mm: number
  tof_distance_cm: number
  light_lux: number
  soil_raw: number
  soil_moisture_percent: number
  rssi: number
  updated_at: string
  node_status: string
}

// Replace with your Raspberry Pi local LAN IP
const PI_API_URL = 'http://192.168.1.150:8000/api/readings/current'

export function useSensorTelemetry(pollIntervalMs = 3000) {
  const [data, setData] = useState<SensorData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    async function fetchTelemetry() {
      try {
        const response = await fetch(PI_API_URL)
        if (!response.ok) {
          throw new Error(\`HTTP \${response.status}: Failed to reach Raspberry Pi\`)
        }
        const json: SensorData = await response.json()
        if (isMounted) {
          setData(json)
          setError(null)
          setLoading(false)
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.message || 'Network connection failed')
        }
      }
    }

    // Initial fetch immediately
    fetchTelemetry()

    // Poll every 3 seconds
    const interval = setInterval(fetchTelemetry, pollIntervalMs)

    return () => {
      isMounted = false
      clearInterval(interval)
    }
  }, [pollIntervalMs])

  return { data, loading, error }
}`,
            explanation: 'Periodically queries the Raspberry Pi REST endpoint, handles network error states gracefully, and delivers live typed sensor telemetry to React Native mobile components.',
          },
        ],
        whyImportant: 'Decoupling the phone from the physical sensors through the Raspberry Pi edge server allows multiple mobile phones and tablets to view telemetry simultaneously without overloading the ESP32.',
      },
      {
        id: 'production-best-practices',
        slug: 'production-best-practices',
        title: 'Production Hardening: Systemd, Watchdogs, & Retention',
        shortDescription: 'Configure FastAPI as an auto-starting system service, enable ESP32 hardware watchdog timers, and automate database pruning.',
        estimatedMinutes: 12,
        difficulty: 'Advanced',
        overview: `A prototype is great on your workbench, but a **production system** must survive power outages, network dropouts, and memory leaks without human intervention.

### 1. Auto-Start FastAPI on Raspberry Pi Boot with Systemd
Create a system service file at \`/etc/systemd/system/iot-edge.service\`:
\`\`\`ini
[Unit]
Description=IoT FastAPI Edge Server
After=network.target

[Service]
User=pi
WorkingDirectory=/home/pi/iot-edge-server
ExecStart=/home/pi/iot-edge-server/venv/bin/uvicorn main:app --host 0.0.0.0 --port 8000
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
\`\`\`
Enable and start the service:
\`\`\`bash
sudo systemctl daemon-reload
sudo systemctl enable iot-edge
sudo systemctl start iot-edge
\`\`\`

### 2. ESP32 Hardware Task Watchdog Timer (WDT)
If the ESP32 firmware ever deadlocks inside an unresponsive I2C transaction, the hardware watchdog automatically resets the microcontroller:
\`\`\`cpp
#include <esp_task_wdt.h>
#define WDT_TIMEOUT_SECONDS 10

// In setup():
esp_task_wdt_init(WDT_TIMEOUT_SECONDS, true); // true = reset on timeout
esp_task_wdt_add(NULL); // Add current loop task

// In loop():
esp_task_wdt_reset(); // Feed the watchdog!
\`\`\`

### 3. Automated Database Pruning
In IoT telemetry logging, saving a record every 5 seconds generates 17,280 rows per day. Implement a cron job on the Raspberry Pi to prune records older than 30 days:
\`\`\`sql
DELETE FROM readings WHERE timestamp < datetime('now', '-30 days');
\`\`\``,
        keyTakeaways: [
          'systemd ensures the Python FastAPI server restarts automatically on power failures.',
          'ESP32 hardware watchdog timer reboots the MCU if firmware locks up.',
          'Pruning old SQLite rows prevents the SD card from filling up over months of continuous operation.',
        ],
        whyImportant: 'These hardening techniques turn an academic project into an industrial-grade, maintenance-free IoT appliance.',
      },
    ],
    quiz: {
      title: 'Module 6 Knowledge Check: Full System Architecture',
      description: 'Test your understanding of the complete edge-to-mobile IoT data pipeline.',
      passingScore: 3,
      questions: [
        {
          id: 'm6-q1',
          question: 'What is the primary benefit of having the mobile app read data from the Raspberry Pi instead of connecting directly to the ESP32?',
          options: [
            { id: 'a', text: 'It decouples the mobile client, allows historical data storage in SQLite, and prevents multiple mobile devices from exhausting the ESP32 limited RAM.', isCorrect: true, explanation: 'Correct! The Raspberry Pi acts as the central coordinator and data cache.' },
            { id: 'b', text: 'Microcontrollers cannot communicate with iPhones.', isCorrect: false, explanation: 'They can via BLE or HTTP, but handling multiple web clients drains MCU resources.' },
            { id: 'c', text: 'The Raspberry Pi converts analog light into laser beams.', isCorrect: false, explanation: 'The Pi is an edge compute device, not an optical transducer.' },
            { id: 'd', text: 'It requires monthly subscription fees.', isCorrect: false, explanation: 'Our local architecture is 100% free and open-source.' },
          ],
        },
        {
          id: 'm6-q2',
          question: 'What happens if the ESP32 hardware watchdog timer (WDT) is not reset within its configured timeout window?',
          options: [
            { id: 'a', text: 'The ESP32 sounds an audible alarm siren.', isCorrect: false, explanation: 'There is no buzzer unless wired.' },
            { id: 'b', text: 'The hardware watchdog triggers a hard hardware reset, rebooting the ESP32 back into setup().', isCorrect: true, explanation: 'Correct! Watchdog timers automatically recover microcontrollers from infinite loops or frozen states.' },
            { id: 'c', text: 'The flash memory is deleted.', isCorrect: false, explanation: 'Firmware in flash is preserved across resets.' },
            { id: 'd', text: 'The Wi-Fi password changes.', isCorrect: false, explanation: 'Network credentials are unaffected.' },
          ],
        },
        {
          id: 'm6-q3',
          question: 'Which tool on Linux automatically restarts the FastAPI backend if the Raspberry Pi reboots?',
          options: [
            { id: 'a', text: 'Photoshop', isCorrect: false, explanation: 'Photoshop is photo editing software.' },
            { id: 'b', text: 'systemd service manager', isCorrect: true, explanation: 'Correct! systemd is the standard Linux service manager for daemon processes.' },
            { id: 'c', text: 'The Arduino IDE Serial Monitor', isCorrect: false, explanation: 'Serial Monitor is a desktop diagnostic utility.' },
            { id: 'd', text: 'The browser history', isCorrect: false, explanation: 'Browser history has no system supervisor capability.' },
          ],
        },
      ],
    },
  },
]

// ==========================================
// COMPREHENSIVE FINAL ASSESSMENT (10 QUESTIONS)
// ==========================================
export const finalAssessmentQuestions: QuizQuestion[] = [
  {
    id: 'final-q1',
    question: 'Why is it mandatory to connect the Capacitive Soil Moisture Sensor to an ADC1 pin (like GPIO 34) rather than ADC2 on the ESP32?',
    options: [
      { id: 'a', text: 'ADC2 pins are restricted to 5V inputs only.', isCorrect: false, explanation: 'All ESP32 pins are 3.3V logic.' },
      { id: 'b', text: 'The ESP32 Wi-Fi driver monopolizes ADC2 hardware during wireless transmissions, causing analogRead() to fail or return corrupted values.', isCorrect: true, explanation: 'Correct! ADC2 is hardware-shared with the Wi-Fi transceiver. Always use ADC1 pins (GPIO 32-39) when Wi-Fi is enabled.' },
      { id: 'c', text: 'ADC1 pins have gold-plated traces on the PCB.', isCorrect: false, explanation: 'PCB traces are standard copper.' },
      { id: 'd', text: 'ADC2 can only read digital buttons.', isCorrect: false, explanation: 'ADC2 is an analog converter, but blocked by the Wi-Fi stack.' },
    ],
  },
  {
    id: 'final-q2',
    question: 'What is the physical measurement principle behind the VL53L0X sensor that makes it superior to ultrasonic or infrared reflection sensors?',
    options: [
      { id: 'a', text: 'It measures the ultrasonic sound echo bounced off objects.', isCorrect: false, explanation: 'That is the principle of HC-SR04 ultrasonic sensors.' },
      { id: 'b', text: 'It emits 940nm laser photons and calculates the precise Time-of-Flight travel duration, making readings independent of target color or ambient lighting.', isCorrect: true, explanation: 'Correct! Photons travel at the speed of light; measuring transit time eliminates color reflectance bias.' },
      { id: 'c', text: 'It reads the temperature of the air.', isCorrect: false, explanation: 'It is an optical ranging device, not a thermometer.' },
      { id: 'd', text: 'It measures electrostatic charge.', isCorrect: false, explanation: 'It is a photonic laser sensor.' },
    ],
  },
  {
    id: 'final-q3',
    question: 'In our dual-bus I2C architecture, how are the VL53L0X and BH1750 sensors physically separated?',
    options: [
      { id: 'a', text: 'Both share GPIO 21 and 22 on the same wire.', isCorrect: false, explanation: 'Sharing the bus risks clock stretching lockups.' },
      { id: 'b', text: 'VL53L0X uses Wire 0 (GPIO 21 SDA / GPIO 22 SCL); BH1750 uses Wire 1 (GPIO 18 SDA / GPIO 19 SCL).', isCorrect: true, explanation: 'Correct! Leveraging the ESP32 dual hardware I2C controllers guarantees zero bus contention.' },
      { id: 'c', text: 'One sensor connects via USB, the other via Bluetooth.', isCorrect: false, explanation: 'Both are wired I2C transducers.' },
      { id: 'd', text: 'Sensors are connected to the power outlet.', isCorrect: false, explanation: 'Mains AC voltage would destroy low-voltage electronics.' },
    ],
  },
  {
    id: 'final-q4',
    question: 'What happens if you use delay(5000) inside your ESP32 Arduino loop() instead of non-blocking millis() timing?',
    options: [
      { id: 'a', text: 'Execution freezes completely for 5 seconds, causing delayed sensor sampling, dropped Wi-Fi packets, and unresponsive network handling.', isCorrect: true, explanation: 'Correct! delay() wastes CPU cycles and blocks all background executive logic.' },
      { id: 'b', text: 'The ESP32 runs 10x faster.', isCorrect: false, explanation: 'delay() halts execution.' },
      { id: 'c', text: 'The sensor data is automatically sent to the cloud.', isCorrect: false, explanation: 'No code runs while the CPU is stalled in delay().' },
      { id: 'd', text: 'The computer crashes.', isCorrect: false, explanation: 'The microcontroller halts, not the PC.' },
    ],
  },
  {
    id: 'final-q5',
    question: 'When calibrating the Capacitive Soil Moisture Sensor, what does a higher raw 12-bit ADC value signify?',
    options: [
      { id: 'a', text: 'Higher moisture (water-saturated soil).', isCorrect: false, explanation: 'This is the opposite of capacitive sensing physics.' },
      { id: 'b', text: 'Drier conditions (lower capacitance in dry air produces higher analog output voltage).', isCorrect: true, explanation: 'Correct! Due to the inverse capacitive relationship, dry air reads ~2500-3200 while water reads ~1200-1500.' },
      { id: 'c', text: 'The sensor has failed completely.', isCorrect: false, explanation: 'High reading in dry air is standard expected operation.' },
      { id: 'd', text: 'High soil acidity.', isCorrect: false, explanation: 'It measures dielectric permittivity, not pH.' },
    ],
  },
  {
    id: 'final-q6',
    question: 'Why must Uvicorn on the Raspberry Pi be executed with --host 0.0.0.0?',
    options: [
      { id: 'a', text: 'To allow external devices on the local Wi-Fi network (ESP32 and mobile phones) to reach the server, rather than restricting it to localhost.', isCorrect: true, explanation: 'Correct! 127.0.0.1 blocks all incoming network traffic from other LAN devices.' },
      { id: 'b', text: 'To make the Python script execute in dark mode.', isCorrect: false, explanation: 'Host binding has nothing to do with UI colors.' },
      { id: 'c', text: 'To bypass the need for a micro-SD card.', isCorrect: false, explanation: 'Storage is unaffected.' },
      { id: 'd', text: 'To prevent people from visiting Google.', isCorrect: false, explanation: 'It merely configures the listening socket.' },
    ],
  },
  {
    id: 'final-q7',
    question: 'Why must http.end() always be called after executing an HTTP POST in the ESP32 firmware?',
    options: [
      { id: 'a', text: 'To release the internal TCP socket descriptor and free allocated heap RAM, preventing system memory exhaustion.', isCorrect: true, explanation: 'Correct! Omitting http.end() creates memory leaks that eventually crash the ESP32.' },
      { id: 'b', text: 'To shut down the Raspberry Pi power supply.', isCorrect: false, explanation: 'It only affects the local ESP32 client session.' },
      { id: 'c', text: 'To format the flash memory.', isCorrect: false, explanation: 'It does not erase flash storage.' },
      { id: 'd', text: 'It is completely optional and serves no purpose.', isCorrect: false, explanation: 'It is essential in embedded C++ networking.' },
    ],
  },
  {
    id: 'final-q8',
    question: 'If the Arduino IDE fails during upload with "Failed to connect to ESP32: No serial data received", what step should you take?',
    options: [
      { id: 'a', text: 'Press and hold the physical BOOT button on the ESP32 board while the IDE displays "Connecting........_____".', isCorrect: true, explanation: 'Correct! Holding BOOT forces GPIO 0 LOW, placing the chip in ROM bootloader mode to accept new code.' },
      { id: 'b', text: 'Dip the board in water.', isCorrect: false, explanation: 'Water will short-circuit and destroy the electronics.' },
      { id: 'c', text: 'Delete Windows from your computer.', isCorrect: false, explanation: 'This is an embedded bootloader synchronization issue.' },
      { id: 'd', text: 'Increase the upload speed to 10,000,000 baud.', isCorrect: false, explanation: 'Unrealistic baud rates will worsen connection stability.' },
    ],
  },
  {
    id: 'final-q9',
    question: 'What is the role of Expo Go in this complete IoT system architecture?',
    options: [
      { id: 'a', text: 'It runs the React Native mobile application, querying the Raspberry Pi API to render real-time gauges and graphs.', isCorrect: true, explanation: 'Correct! Expo Go provides the cross-platform mobile user interface for monitoring metrics.' },
      { id: 'b', text: 'It compiles C++ firmware for the ESP32.', isCorrect: false, explanation: 'Arduino IDE / esptool handles C++ compilation.' },
      { id: 'c', text: 'It measures soil moisture directly from the phone screen.', isCorrect: false, explanation: 'Phone screens do not have soil moisture probe hardware.' },
      { id: 'd', text: 'It provides Wi-Fi internet access to the Raspberry Pi.', isCorrect: false, explanation: 'Wi-Fi access is provided by your router.' },
    ],
  },
  {
    id: 'final-q10',
    question: 'Which Linux service manager tool automatically starts and supervises the FastAPI backend on Raspberry Pi boot?',
    options: [
      { id: 'a', text: 'systemd', isCorrect: true, explanation: 'Correct! Creating a systemd service file ensures high availability and automatic reboot recovery.' },
      { id: 'b', text: 'Microsoft Paint', isCorrect: false, explanation: 'Paint is a graphics program.' },
      { id: 'c', text: 'Notepad', isCorrect: false, explanation: 'Notepad is a text editor.' },
      { id: 'd', text: 'Google Chrome', isCorrect: false, explanation: 'Chrome is a web browser.' },
    ],
  },
]

// ==========================================
// TROUBLESHOOTING & FAQ SECTION (15 ITEMS)
// ==========================================
export const courseFAQList: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Hardware',
    question: 'Can I power my ESP32 and all 3 sensors from a single computer USB port?',
    answer: 'Yes! A standard USB 2.0 or 3.0 port provides 500mA to 900mA at 5V. The ESP32 consumes ~120mA during Wi-Fi transmission, while the VL53L0X, BH1750, and Soil probe combined consume under 35mA. The onboard 3.3V voltage regulator handles this load easily. However, ensure your micro-USB cable is of high quality to prevent voltage dips.',
  },
  {
    id: 'faq-2',
    category: 'Hardware',
    question: 'Why should I never connect any sensor output directly to 5V when using ESP32?',
    answer: 'The ESP32 silicon is manufactured on a 40nm process with maximum absolute input ratings of 3.6V on all GPIO pins. Supplying 5V to any GPIO pin will overheat and permanently destroy the internal protection diodes and input buffer transistors.',
  },
  {
    id: 'faq-3',
    category: 'Arduino IDE',
    question: 'My COM port does not appear in Arduino IDE Tools -> Port on Windows. How do I fix it?',
    answer: 'First, ensure your micro-USB cable is a 4-wire data cable and not a "charge-only" cable. Second, identify your board USB-to-UART chip (CP2102 or CH340) and install the official Silicon Labs CP210x or WCH CH341SER driver. Check Windows Device Manager under "Ports (COM & LPT)" to confirm your system recognizes the hardware.',
  },
  {
    id: 'faq-4',
    category: 'Arduino IDE',
    question: 'What does "A fatal error occurred: Failed to connect to ESP32: No serial data received" mean?',
    answer: 'The Arduino IDE uploader (esptool.py) is trying to send an initial synchronization handshake, but the ESP32 did not enter ROM bootloader mode. When the IDE console prints "Connecting........_____", press and hold the physical BOOT button on your ESP32 board until you see the flashing percentage counter begin, then release it.',
  },
  {
    id: 'faq-5',
    category: 'Sensors & I2C',
    question: 'Why does the BH1750 return NaN or negative numbers?',
    answer: 'This happens when the ADDR pin is left floating or experiencing electrical noise, causing the sensor to randomly toggle between I2C address 0x23 and 0x5C. Connect the ADDR pin securely to GND with a jumper wire to lock the address at 0x23.',
  },
  {
    id: 'faq-6',
    category: 'Sensors & I2C',
    question: 'Can I put the VL53L0X and BH1750 on the same SDA and SCL wires?',
    answer: 'Technically yes (since they have different I2C addresses: 0x29 and 0x23), but practically NO in production. The VL53L0X laser driver performs I2C clock-stretching while calculating photon timing statistics. In practice, this frequently causes the BH1750 to time out or freeze the shared bus. Using separate hardware buses (TwoWire 0 on GPIO 21/22 and TwoWire 1 on GPIO 18/19) completely isolates the two sensors.',
  },
  {
    id: 'faq-7',
    category: 'Sensors & I2C',
    question: 'Why does my soil moisture reading fluctuate wildly when Wi-Fi is transmitting?',
    answer: 'You have connected the sensor to an ADC2 pin (e.g. GPIO 4, 13, 14, 25, 26, 27). The ESP32 internal Wi-Fi transceiver uses ADC2 internally for RF power calibration, corrupting your readings. Move your analog wire to an ADC1 pin (GPIO 32, 33, 34, 35, 36, or 39).',
  },
  {
    id: 'faq-8',
    category: 'Sensors & I2C',
    question: 'How far should I insert the Capacitive Soil Moisture Sensor into the dirt?',
    answer: 'Insert the sensor up to the white horizontal line printed across the middle of the PCB. Never submerge the top portion of the sensor where the onboard 555-timer IC, resistors, and connector cable are located, as water contact on those components will cause erratic readings and short circuits.',
  },
  {
    id: 'faq-9',
    category: 'Wi-Fi & Network',
    question: 'My ESP32 will not connect to my home Wi-Fi network. What is wrong?',
    answer: 'The ESP32 only supports 2.4 GHz Wi-Fi (802.11 b/g/n). If your router only broadcasts on the 5 GHz band, or has 2.4 GHz disabled, the ESP32 will never see the network. Enable the 2.4 GHz band in your router settings. Also verify your SSID and password do not contain unsupported unicode emojis.',
  },
  {
    id: 'faq-10',
    category: 'Wi-Fi & Network',
    question: 'How do I prevent the Raspberry Pi IP address from changing when my router reboots?',
    answer: 'Log into your home Wi-Fi router admin page (usually 192.168.1.1 or 192.168.0.1), locate DHCP Settings or Static Lease Reservations, and assign a permanent reserved IP (e.g. 192.168.1.150) to the Raspberry Pi MAC address.',
  },
  {
    id: 'faq-11',
    category: 'Raspberry Pi & API',
    question: 'My ESP32 gets HTTP error -1 when trying to send data to Raspberry Pi.',
    answer: 'Error -1 means the TCP connection was refused or timed out. 1) Check that both devices are on the exact same Wi-Fi SSID. 2) Verify the Raspberry Pi IP address with hostname -I. 3) Ensure Uvicorn was started with --host 0.0.0.0 and port 8000. 4) Check the Raspberry Pi firewall with sudo ufw allow 8000/tcp.',
  },
  {
    id: 'faq-12',
    category: 'Raspberry Pi & API',
    question: 'What is the purpose of Pydantic in our FastAPI backend?',
    answer: 'Pydantic defines strict data schemas. When the ESP32 sends a JSON packet, Pydantic automatically checks that required fields (tof_mm, lux, soil_raw) are present and correctly typed (integers/floats). If the packet is malformed, FastAPI rejects it cleanly with an HTTP 422 error instead of crashing the server.',
  },
  {
    id: 'faq-13',
    category: 'Mobile & Expo',
    question: 'Can I view the sensor gauges in Expo Go when I am away from my house on cellular data?',
    answer: 'By default, this project runs on your local Wi-Fi network for zero cloud dependency, low latency, and complete privacy. To view data over cellular data, you can either configure a secure VPN (like WireGuard or Tailscale) on your Raspberry Pi, or port-forward through your router with SSL/TLS encryption.',
  },
  {
    id: 'faq-14',
    category: 'Mobile & Expo',
    question: 'Why does Expo Go show "Network request failed" when loading sensor values?',
    answer: 'Ensure your smartphone is connected to the SAME Wi-Fi network as the Raspberry Pi, not your cellular data. Also verify that you typed http://<PI_IP>:8000 (with http, not https) and that the FastAPI backend is running.',
  },
  {
    id: 'faq-15',
    category: 'Hardware',
    question: 'Can I add a temperature/humidity sensor like DHT22 or BME280 to this project?',
    answer: 'Absolutely! The ESP32 has plenty of free GPIOs left. For example, a BME280 can be added to Wire 1 (sharing pins 18 and 19 with the BH1750 because BME280 uses address 0x76), or a digital DHT22 can be connected to GPIO 23. You would simply read the temperature in C++ and add "temperature": temp to the JSON payload.',
  },
]
