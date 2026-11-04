'use client'

import React from 'react'
import {
  Cpu,
  Waves,
  Sun,
  Activity,
  Server,
  Smartphone,
  ArrowRight,
  Database,
  Wifi,
  Radio,
  CheckCircle2,
} from 'lucide-react'

// ==========================================
// 1. VL53L0X WIRING DIAGRAM (WIRE 0)
// ==========================================
export function VL53L0XWiringDiagram() {
  return (
    <div className="my-6 rounded-2xl border border-cyan-500/25 bg-[#081220] p-5 shadow-2xl backdrop-blur-xl sm:p-7">
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
        <div>
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-cyan-300">
            I2C WIRE 0 SCHEMATIC
          </span>
          <h4 className="text-base font-bold text-white">VL53L0X ToF Distance Sensor Wiring</h4>
        </div>
        <span className="rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-1 font-mono text-xs text-cyan-200">
          I2C: 0x29
        </span>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Wiring Graphic */}
        <div className="relative rounded-xl border border-white/10 bg-[#060e18] p-5">
          <div className="flex justify-between items-center gap-4">
            {/* ESP32 Side */}
            <div className="w-36 rounded-lg border border-slate-600 bg-slate-900 p-3 text-center">
              <Cpu className="size-6 text-cyan-400 mx-auto mb-1" />
              <span className="font-mono text-xs font-bold text-white block">ESP32</span>
              <span className="font-mono text-[10px] text-slate-400">DevKit V1</span>
            </div>

            {/* Connecting Wire Lines */}
            <div className="flex-1 space-y-2 font-mono text-[11px]">
              <div className="flex items-center justify-between text-rose-400 border-b border-rose-500/30 pb-0.5">
                <span>3V3</span>
                <span className="text-[9px] text-slate-500">─── Red ───►</span>
                <span>VIN (3.3V)</span>
              </div>
              <div className="flex items-center justify-between text-slate-300 border-b border-slate-500/30 pb-0.5">
                <span>GND</span>
                <span className="text-[9px] text-slate-500">── Black ──►</span>
                <span>GND</span>
              </div>
              <div className="flex items-center justify-between text-cyan-300 border-b border-cyan-400/40 pb-0.5 font-bold">
                <span>GPIO 21</span>
                <span className="text-[9px] text-slate-500">── Green ──►</span>
                <span>SDA</span>
              </div>
              <div className="flex items-center justify-between text-amber-300 border-b border-amber-400/40 pb-0.5 font-bold">
                <span>GPIO 22</span>
                <span className="text-[9px] text-slate-500">── Yellow ──►</span>
                <span>SCL</span>
              </div>
            </div>

            {/* Sensor Side */}
            <div className="w-36 rounded-lg border border-cyan-500/30 bg-cyan-950/20 p-3 text-center">
              <Waves className="size-6 text-cyan-300 mx-auto mb-1" />
              <span className="font-mono text-xs font-bold text-white block">VL53L0X</span>
              <span className="font-mono text-[10px] text-cyan-300">ToF Laser (0x29)</span>
            </div>
          </div>
        </div>

        {/* Technical Highlights */}
        <div className="space-y-3 text-xs leading-relaxed text-slate-300">
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
            <strong className="text-white block font-semibold mb-1">Optical Clear Aperture</strong>
            Ensure the miniature orange protective film is removed from the laser optics. Do not touch the dual glass apertures with bare oily fingers.
          </div>
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
            <strong className="text-white block font-semibold mb-1">XSHUT & GPIO1 Floating</strong>
            The XSHUT pin is active LOW for hardware shutdown; leave it floating or tied to 3.3V. GPIO1 is an interrupt pin; leave it unconnected.
          </div>
        </div>
      </div>
    </div>
  )
}

// ==========================================
// 2. BH1750 WIRING DIAGRAM (WIRE 1)
// ==========================================
export function BH1750WiringDiagram() {
  return (
    <div className="my-6 rounded-2xl border border-purple-500/25 bg-[#081220] p-5 shadow-2xl backdrop-blur-xl sm:p-7">
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
        <div>
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-purple-300">
            I2C WIRE 1 SCHEMATIC
          </span>
          <h4 className="text-base font-bold text-white">BH1750 Ambient Light Sensor Wiring</h4>
        </div>
        <span className="rounded-lg border border-purple-500/30 bg-purple-500/10 px-2.5 py-1 font-mono text-xs text-purple-200">
          I2C: 0x23
        </span>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Wiring Graphic */}
        <div className="relative rounded-xl border border-white/10 bg-[#060e18] p-5">
          <div className="flex justify-between items-center gap-4">
            {/* ESP32 Side */}
            <div className="w-36 rounded-lg border border-slate-600 bg-slate-900 p-3 text-center">
              <Cpu className="size-6 text-purple-400 mx-auto mb-1" />
              <span className="font-mono text-xs font-bold text-white block">ESP32</span>
              <span className="font-mono text-[10px] text-slate-400">TwoWire(1)</span>
            </div>

            {/* Connecting Wire Lines */}
            <div className="flex-1 space-y-2 font-mono text-[11px]">
              <div className="flex items-center justify-between text-rose-400 border-b border-rose-500/30 pb-0.5">
                <span>3V3</span>
                <span className="text-[9px] text-slate-500">─── Red ───►</span>
                <span>VCC (3.3V)</span>
              </div>
              <div className="flex items-center justify-between text-slate-300 border-b border-slate-500/30 pb-0.5">
                <span>GND</span>
                <span className="text-[9px] text-slate-500">── Black ──►</span>
                <span>GND</span>
              </div>
              <div className="flex items-center justify-between text-blue-300 border-b border-blue-400/40 pb-0.5 font-bold">
                <span>GPIO 18</span>
                <span className="text-[9px] text-slate-500">── Blue ──►</span>
                <span>SDA</span>
              </div>
              <div className="flex items-center justify-between text-orange-300 border-b border-orange-400/40 pb-0.5 font-bold">
                <span>GPIO 19</span>
                <span className="text-[9px] text-slate-500">── Orange ──►</span>
                <span>SCL</span>
              </div>
              <div className="flex items-center justify-between text-slate-400 border-b border-slate-600/30 pb-0.5">
                <span>GND</span>
                <span className="text-[9px] text-slate-500">── Black ──►</span>
                <span>ADDR (sets 0x23)</span>
              </div>
            </div>

            {/* Sensor Side */}
            <div className="w-36 rounded-lg border border-purple-500/30 bg-purple-950/20 p-3 text-center">
              <Sun className="size-6 text-amber-300 mx-auto mb-1" />
              <span className="font-mono text-xs font-bold text-white block">BH1750</span>
              <span className="font-mono text-[10px] text-purple-300">Lux Meter (0x23)</span>
            </div>
          </div>
        </div>

        {/* Technical Highlights */}
        <div className="space-y-3 text-xs leading-relaxed text-slate-300">
          <div className="rounded-xl border border-purple-500/20 bg-purple-950/15 p-3">
            <strong className="text-purple-200 block font-semibold mb-1">
              Why Wire 1 (Pins 18/19)?
            </strong>
            By isolating the BH1750 on its own independent hardware I2C controller, clock stretching and transaction delays from the VL53L0X laser sensor never cause bus lockups.
          </div>
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
            <strong className="text-white block font-semibold mb-1">ADDR Pin to Ground</strong>
            Tying ADDR to GND guarantees the I2C address is locked at 0x23. Leaving it floating causes address instability.
          </div>
        </div>
      </div>
    </div>
  )
}

// ==========================================
// 3. CAPACITIVE SOIL WIRING (ADC1)
// ==========================================
export function SoilMoistureWiringDiagram() {
  return (
    <div className="my-6 rounded-2xl border border-emerald-500/25 bg-[#081220] p-5 shadow-2xl backdrop-blur-xl sm:p-7">
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
        <div>
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-emerald-300">
            ANALOG ADC1 SCHEMATIC
          </span>
          <h4 className="text-base font-bold text-white">Capacitive Soil Moisture Sensor V1.0</h4>
        </div>
        <span className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 font-mono text-xs text-emerald-200">
          ADC1: GPIO 34
        </span>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Wiring Graphic */}
        <div className="relative rounded-xl border border-white/10 bg-[#060e18] p-5">
          <div className="flex justify-between items-center gap-4">
            {/* ESP32 Side */}
            <div className="w-36 rounded-lg border border-slate-600 bg-slate-900 p-3 text-center">
              <Cpu className="size-6 text-emerald-400 mx-auto mb-1" />
              <span className="font-mono text-xs font-bold text-white block">ESP32</span>
              <span className="font-mono text-[10px] text-emerald-300">ADC1 Channel 6</span>
            </div>

            {/* Connecting Wire Lines */}
            <div className="flex-1 space-y-2 font-mono text-[11px]">
              <div className="flex items-center justify-between text-rose-400 border-b border-rose-500/30 pb-0.5">
                <span>3V3</span>
                <span className="text-[9px] text-slate-500">─── Red ───►</span>
                <span>VCC (3.3V)</span>
              </div>
              <div className="flex items-center justify-between text-slate-300 border-b border-slate-500/30 pb-0.5">
                <span>GND</span>
                <span className="text-[9px] text-slate-500">── Black ──►</span>
                <span>GND</span>
              </div>
              <div className="flex items-center justify-between text-emerald-300 border-b border-emerald-400/40 pb-0.5 font-bold">
                <span>GPIO 34</span>
                <span className="text-[9px] text-slate-500">─── Blue ───►</span>
                <span>AOUT (Analog)</span>
              </div>
            </div>

            {/* Sensor Side */}
            <div className="w-36 rounded-lg border border-emerald-500/30 bg-emerald-950/20 p-3 text-center">
              <Activity className="size-6 text-emerald-300 mx-auto mb-1" />
              <span className="font-mono text-xs font-bold text-white block">Soil Probe</span>
              <span className="font-mono text-[10px] text-emerald-300">Capacitive V1.0</span>
            </div>
          </div>
        </div>

        {/* Technical Highlights */}
        <div className="space-y-3 text-xs leading-relaxed text-slate-300">
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-950/15 p-3">
            <strong className="text-emerald-200 block font-semibold mb-1">
              Why GPIO 34 (ADC1) is Mandatory
            </strong>
            The ESP32 Wi-Fi radio disables ADC2 during transmission. GPIO 34 belongs to ADC1, guaranteeing uninterrupted readings during wireless broadcasts.
          </div>
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
            <strong className="text-white block font-semibold mb-1">
              Depth Insertion Warning
            </strong>
            Do not submerge the probe beyond the white horizontal indicator line. The upper circuitry (555-timer IC) is not waterproof.
          </div>
        </div>
      </div>
    </div>
  )
}

// ==========================================
// 4. UNIFIED TRIPLE SENSOR CIRCUIT
// ==========================================
export function UnifiedCircuitDiagram() {
  return (
    <div className="my-8 rounded-2xl border border-cyan-500/30 bg-[#071322] p-6 shadow-2xl backdrop-blur-xl">
      <div className="border-b border-white/[0.08] pb-4">
        <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-cyan-300">
          COMPLETE TRIPLE-SENSOR TOPOLOGY
        </span>
        <h3 className="text-lg font-bold text-white">
          Unified ESP32 Sensor Hub Architecture
        </h3>
        <p className="mt-1 text-xs text-slate-400">
          All 3 transducers operating simultaneously across dual hardware I2C controllers and ADC1.
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* ESP32 Central Controller */}
        <div className="lg:col-span-1 rounded-2xl border-2 border-cyan-500/40 bg-[#09182b] p-5 text-center shadow-lg">
          <div className="size-12 rounded-xl bg-cyan-500/20 text-cyan-300 grid place-items-center mx-auto ring-1 ring-cyan-400/30">
            <Cpu className="size-7" />
          </div>
          <h4 className="mt-3 font-bold text-white text-base">ESP32 DevKit V1</h4>
          <span className="font-mono text-[11px] text-cyan-300 block">Dual Core 240MHz</span>
          
          <div className="mt-4 space-y-1.5 text-left font-mono text-[11px] border-t border-white/10 pt-3">
            <div className="text-cyan-300">Wire 0: GPIO 21/22</div>
            <div className="text-purple-300">Wire 1: GPIO 18/19</div>
            <div className="text-emerald-300">ADC1: GPIO 34</div>
            <div className="text-slate-400">Wi-Fi: 2.4GHz STA</div>
          </div>
        </div>

        {/* 3 Transducer Cards */}
        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Card 1: VL53L0X */}
          <div className="rounded-xl border border-cyan-500/25 bg-cyan-950/20 p-4">
            <div className="flex items-center gap-2">
              <Waves className="size-5 text-cyan-300" />
              <span className="font-bold text-white text-xs">VL53L0X ToF</span>
            </div>
            <span className="mt-1 inline-block font-mono text-[10px] text-cyan-300">
              Bus: Wire 0 (0x29)
            </span>
            <ul className="mt-3 space-y-1 font-mono text-[10px] text-slate-300 border-t border-cyan-500/20 pt-2">
              <li>SDA ── GPIO 21</li>
              <li>SCL ── GPIO 22</li>
              <li>VIN ── 3.3V</li>
              <li>GND ── GND</li>
            </ul>
            <span className="mt-3 block font-mono text-[10px] text-emerald-400">
              Output: 30 - 2000 mm
            </span>
          </div>

          {/* Card 2: BH1750 */}
          <div className="rounded-xl border border-purple-500/25 bg-purple-950/20 p-4">
            <div className="flex items-center gap-2">
              <Sun className="size-5 text-amber-300" />
              <span className="font-bold text-white text-xs">BH1750 Lux</span>
            </div>
            <span className="mt-1 inline-block font-mono text-[10px] text-purple-300">
              Bus: Wire 1 (0x23)
            </span>
            <ul className="mt-3 space-y-1 font-mono text-[10px] text-slate-300 border-t border-purple-500/20 pt-2">
              <li>SDA ── GPIO 18</li>
              <li>SCL ── GPIO 19</li>
              <li>ADDR ── GND (0x23)</li>
              <li>VCC ── 3.3V</li>
            </ul>
            <span className="mt-3 block font-mono text-[10px] text-emerald-400">
              Output: 1 - 65,535 lx
            </span>
          </div>

          {/* Card 3: Soil Moisture */}
          <div className="rounded-xl border border-emerald-500/25 bg-emerald-950/20 p-4">
            <div className="flex items-center gap-2">
              <Activity className="size-5 text-emerald-300" />
              <span className="font-bold text-white text-xs">Soil Probe V1.0</span>
            </div>
            <span className="mt-1 inline-block font-mono text-[10px] text-emerald-300">
              Bus: ADC1 Channel 6
            </span>
            <ul className="mt-3 space-y-1 font-mono text-[10px] text-slate-300 border-t border-emerald-500/20 pt-2">
              <li>AOUT ── GPIO 34</li>
              <li>VCC ── 3.3V</li>
              <li>GND ── GND</li>
              <li>Resolution ── 12-bit</li>
            </ul>
            <span className="mt-3 block font-mono text-[10px] text-emerald-400">
              Output: 0 - 100% Calibrated
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ==========================================
// 5. END-TO-END SYSTEM FLOW DIAGRAM
// ==========================================
export function EndToEndSystemDiagram() {
  return (
    <div className="my-8 overflow-hidden rounded-2xl border border-cyan-500/30 bg-[#07111e] p-6 shadow-2xl backdrop-blur-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
        <div>
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-cyan-300">
            END-TO-END TELEMETRY ARCHITECTURE
          </span>
          <h3 className="text-xl font-bold text-white">Complete System Data Flow</h3>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
          <span className="size-2 rounded-full bg-emerald-400 animate-ping" />
          <span>REAL-TIME STREAM ACTIVE</span>
        </div>
      </div>

      {/* Visual Pipeline Stages */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4 relative">
        {/* Stage 1: Hardware Sensors */}
        <div className="glass-card rounded-2xl p-4 border border-cyan-500/20 relative">
          <div className="flex items-center justify-between text-xs text-cyan-300 font-mono mb-2">
            <span>STAGE 01</span>
            <span className="size-2 rounded-full bg-cyan-400 animate-pulse" />
          </div>
          <div className="flex items-center gap-2 font-bold text-white text-sm">
            <Waves className="size-4 text-cyan-400" />
            <span>Physical Sensors</span>
          </div>
          <p className="mt-2 text-[11px] text-slate-300 leading-relaxed">
            VL53L0X (Distance), BH1750 (Lux), and Capacitive Soil Probe measure the environment.
          </p>
          <div className="mt-3 rounded bg-black/40 p-2 font-mono text-[10px] text-cyan-200">
            Dual I2C + 12-bit ADC
          </div>
        </div>

        {/* Stage 2: ESP32 Edge Node */}
        <div className="glass-card rounded-2xl p-4 border border-sky-500/20 relative">
          <div className="flex items-center justify-between text-xs text-sky-300 font-mono mb-2">
            <span>STAGE 02</span>
            <span className="size-2 rounded-full bg-sky-400 animate-pulse" />
          </div>
          <div className="flex items-center gap-2 font-bold text-white text-sm">
            <Cpu className="size-4 text-sky-400" />
            <span>ESP32 MCU</span>
          </div>
          <p className="mt-2 text-[11px] text-slate-300 leading-relaxed">
            Samples sensors, formats JSON string, and executes Wi-Fi HTTP POST every 5s.
          </p>
          <div className="mt-3 rounded bg-black/40 p-2 font-mono text-[10px] text-sky-200 truncate">
            HTTP POST /api/readings
          </div>
        </div>

        {/* Stage 3: Raspberry Pi Backend */}
        <div className="glass-card rounded-2xl p-4 border border-purple-500/20 relative">
          <div className="flex items-center justify-between text-xs text-purple-300 font-mono mb-2">
            <span>STAGE 03</span>
            <span className="size-2 rounded-full bg-purple-400 animate-pulse" />
          </div>
          <div className="flex items-center gap-2 font-bold text-white text-sm">
            <Server className="size-4 text-purple-400" />
            <span>FastAPI + SQLite</span>
          </div>
          <p className="mt-2 text-[11px] text-slate-300 leading-relaxed">
            Validates schema with Pydantic, calculates percentages, and logs to SQLite WAL.
          </p>
          <div className="mt-3 rounded bg-black/40 p-2 font-mono text-[10px] text-purple-200">
            Port 8000 (LAN Edge)
          </div>
        </div>

        {/* Stage 4: Expo Go Mobile App */}
        <div className="glass-card rounded-2xl p-4 border border-emerald-500/20 relative">
          <div className="flex items-center justify-between text-xs text-emerald-300 font-mono mb-2">
            <span>STAGE 04</span>
            <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <div className="flex items-center gap-2 font-bold text-white text-sm">
            <Smartphone className="size-4 text-emerald-400" />
            <span>Expo Go Mobile</span>
          </div>
          <p className="mt-2 text-[11px] text-slate-300 leading-relaxed">
            React Native polls GET /api/readings/current, rendering real-time cards and charts.
          </p>
          <div className="mt-3 rounded bg-black/40 p-2 font-mono text-[10px] text-emerald-200">
            iOS / Android Live UI
          </div>
        </div>
      </div>

      {/* Live Data Contract Preview */}
      <div className="mt-6 rounded-xl border border-white/10 bg-[#050c14] p-4 font-mono text-xs text-slate-300">
        <span className="text-[10px] uppercase tracking-wider text-cyan-400 block mb-1">
          JSON Telemetry Schema (Contract between ESP32, Raspberry Pi, and Mobile App):
        </span>
        <pre className="text-emerald-300/90 overflow-x-auto text-[11px] leading-5">
{`{
  "tof_distance_mm": 148,
  "tof_distance_cm": 14.8,
  "light_lux": 420.50,
  "soil_raw": 1840,
  "soil_moisture_percent": 53.3,
  "rssi": -62,
  "node_status": "ONLINE"
}`}
        </pre>
      </div>
    </div>
  )
}
