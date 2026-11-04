'use client'

import React, { useState } from 'react'
import { Cpu, Info, Zap, AlertTriangle, ShieldCheck } from 'lucide-react'

interface PinInfo {
  number: string
  label: string
  category: 'power' | 'ground' | 'i2c-0' | 'i2c-1' | 'adc1' | 'strapping' | 'general'
  desc: string
  note?: string
}

const leftPins: PinInfo[] = [
  { number: '1', label: '3V3', category: 'power', desc: '3.3V Regulated Output (max 500mA)', note: 'Powers VL53L0X, BH1750, and Soil Sensor' },
  { number: '2', label: 'EN', category: 'general', desc: 'Enable / Reset Pin', note: 'Active LOW. Ground to restart ESP32 CPU' },
  { number: '3', label: 'VP (GPIO 36)', category: 'adc1', desc: 'ADC1 Channel 0 / Input Only', note: 'Safe with Wi-Fi enabled' },
  { number: '4', label: 'VN (GPIO 39)', category: 'adc1', desc: 'ADC1 Channel 3 / Input Only', note: 'Safe with Wi-Fi enabled' },
  { number: '5', label: 'GPIO 34', category: 'adc1', desc: 'ADC1 Channel 6 / Input Only', note: 'USED: Connected to Soil Moisture AOUT' },
  { number: '6', label: 'GPIO 35', category: 'adc1', desc: 'ADC1 Channel 7 / Input Only', note: 'Safe with Wi-Fi enabled' },
  { number: '7', label: 'GPIO 32', category: 'adc1', desc: 'ADC1 Channel 4 / Touch 9', note: 'General analog/digital input/output' },
  { number: '8', label: 'GPIO 33', category: 'adc1', desc: 'ADC1 Channel 5 / Touch 8', note: 'General analog/digital input/output' },
  { number: '9', label: 'GPIO 25', category: 'general', desc: 'DAC 1 / ADC2 Channel 8', note: 'Do not use ADC2 when Wi-Fi is active' },
  { number: '10', label: 'GPIO 26', category: 'general', desc: 'DAC 2 / ADC2 Channel 9', note: 'Do not use ADC2 when Wi-Fi is active' },
  { number: '11', label: 'GPIO 27', category: 'general', desc: 'Touch 7 / ADC2 Channel 7', note: 'General digital I/O' },
  { number: '12', label: 'GPIO 14', category: 'general', desc: 'HSPI CLK / ADC2 Channel 6', note: 'General digital I/O' },
  { number: '13', label: 'GPIO 12', category: 'strapping', desc: 'Strapping Pin / MTDI', note: 'CAUTION: Must be LOW during power boot' },
  { number: '14', label: 'GND', category: 'ground', desc: 'Ground Reference (0V)', note: 'Connect all sensor GND pins here' },
  { number: '15', label: 'VIN (5V)', category: 'power', desc: '5V Power Input / USB 5V Output', note: 'Input from USB or external 5V regulator' },
]

const rightPins: PinInfo[] = [
  { number: '30', label: 'GND', category: 'ground', desc: 'Ground Reference (0V)', note: 'Second common ground pin' },
  { number: '29', label: 'GPIO 23', category: 'general', desc: 'VSPI MOSI / General I/O', note: 'High speed SPI or digital output' },
  { number: '28', label: 'GPIO 22', category: 'i2c-0', desc: 'I2C Wire 0 Clock (SCL)', note: 'USED: Connected to VL53L0X SCL' },
  { number: '27', label: 'GPIO 1', category: 'general', desc: 'UART0 TX (Debug Serial)', note: 'Sends text to Arduino IDE Serial Monitor' },
  { number: '26', label: 'GPIO 3', category: 'general', desc: 'UART0 RX (Debug Serial)', note: 'Receives serial input from computer' },
  { number: '25', label: 'GPIO 21', category: 'i2c-0', desc: 'I2C Wire 0 Data (SDA)', note: 'USED: Connected to VL53L0X SDA' },
  { number: '24', label: 'GND', category: 'ground', desc: 'Ground Reference (0V)', note: 'Third common ground pin' },
  { number: '23', label: 'GPIO 19', category: 'i2c-1', desc: 'I2C Wire 1 Clock (SCL)', note: 'USED: Connected to BH1750 SCL' },
  { number: '22', label: 'GPIO 18', category: 'i2c-1', desc: 'I2C Wire 1 Data (SDA)', note: 'USED: Connected to BH1750 SDA' },
  { number: '21', label: 'GPIO 5', category: 'strapping', desc: 'VSPI CS / Strapping Pin', note: 'Outputs PWM during boot' },
  { number: '20', label: 'GPIO 17', category: 'general', desc: 'UART2 TX / General I/O', note: 'Available digital pin' },
  { number: '19', label: 'GPIO 16', category: 'general', desc: 'UART2 RX / General I/O', note: 'Available digital pin' },
  { number: '18', label: 'GPIO 4', category: 'general', desc: 'ADC2 Channel 0 / Touch 0', note: 'Avoid ADC while Wi-Fi is transmitting' },
  { number: '17', label: 'GPIO 0', category: 'strapping', desc: 'BOOT Button / Strapping Pin', note: 'Must be LOW to enter flashing bootloader' },
  { number: '16', label: 'GPIO 2', category: 'strapping', desc: 'Onboard Blue LED / Strapping', note: 'Blinks onboard LED. Must be floating on boot' },
]

export function ESP32PinoutDiagram() {
  const [selectedPin, setSelectedPin] = useState<PinInfo | null>(null)
  const [activeFilter, setActiveFilter] = useState<string>('all')

  const getPinColor = (category: PinInfo['category']) => {
    switch (category) {
      case 'power':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/50 hover:bg-rose-500/40'
      case 'ground':
        return 'bg-slate-700/50 text-slate-300 border-slate-500/40 hover:bg-slate-600/50'
      case 'i2c-0':
        return 'bg-cyan-500/20 text-cyan-200 border-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.25)] hover:bg-cyan-500/40'
      case 'i2c-1':
        return 'bg-purple-500/20 text-purple-200 border-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.25)] hover:bg-purple-500/40'
      case 'adc1':
        return 'bg-emerald-500/20 text-emerald-200 border-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.25)] hover:bg-emerald-500/40'
      case 'strapping':
        return 'bg-amber-500/20 text-amber-200 border-amber-400/50 hover:bg-amber-500/40'
      default:
        return 'bg-white/[0.04] text-slate-300 border-white/10 hover:bg-white/[0.08]'
    }
  }

  const isHighlighted = (pin: PinInfo) => {
    if (activeFilter === 'all') return true
    if (activeFilter === 'used') {
      return ['GPIO 21', 'GPIO 22', 'GPIO 18', 'GPIO 19', 'GPIO 34', '3V3', 'GND'].includes(pin.label)
    }
    return pin.category === activeFilter
  }

  return (
    <div className="my-8 rounded-2xl border border-cyan-500/25 bg-[#081220] p-5 shadow-2xl backdrop-blur-xl sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Cpu className="size-5 text-cyan-400" />
            <h3 className="text-base font-bold text-white sm:text-lg">
              DOIT ESP32 DevKit V1 (30-Pin) Interactive Pinout
            </h3>
          </div>
          <p className="mt-1 text-xs text-slate-400">
            Hover or click any pin to inspect its electrical specs, bus assignments, and project roles.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-1.5 text-[11px]">
          {[
            { id: 'all', label: 'All Pins' },
            { id: 'used', label: '⭐ Used in Project' },
            { id: 'i2c-0', label: 'I2C Wire 0 (VL53L0X)' },
            { id: 'i2c-1', label: 'I2C Wire 1 (BH1750)' },
            { id: 'adc1', label: 'ADC1 (Soil Probe)' },
            { id: 'power', label: 'Power (3V3/VIN)' },
          ].map((f) => (
            <button
              className={`rounded-lg px-2.5 py-1 font-medium transition ${
                activeFilter === f.id
                  ? 'bg-cyan-500 text-[#07121f] font-bold shadow-md shadow-cyan-500/25'
                  : 'border border-white/10 bg-white/[0.03] text-slate-300 hover:bg-white/[0.08]'
              }`}
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              type="button"
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Visual Board Diagram */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_260px_1fr] items-center">
        {/* Left Pin Column */}
        <div className="space-y-1.5">
          {leftPins.map((pin) => {
            const active = isHighlighted(pin)
            return (
              <button
                className={`flex w-full items-center justify-between rounded-lg border px-3 py-1.5 text-left text-xs font-mono transition ${
                  getPinColor(pin.category)
                } ${!active ? 'opacity-25' : 'opacity-100'}`}
                key={pin.number}
                onClick={() => setSelectedPin(pin)}
                onMouseEnter={() => setSelectedPin(pin)}
                type="button"
              >
                <span className="font-semibold">{pin.label}</span>
                <span className="text-[10px] opacity-75">#{pin.number}</span>
              </button>
            )
          })}
        </div>

        {/* Center Board Illustration */}
        <div className="relative mx-auto flex h-[480px] w-[200px] flex-col items-center justify-between rounded-2xl border-2 border-slate-700 bg-[#06101c] p-4 shadow-2xl shadow-cyan-500/10">
          {/* Top Micro-USB Port */}
          <div className="flex flex-col items-center">
            <div className="h-4 w-12 rounded-b-md border border-slate-500 bg-gradient-to-b from-slate-400 to-slate-600 shadow-inner" />
            <span className="mt-1 font-mono text-[9px] uppercase tracking-wider text-slate-400">
              Micro-USB
            </span>
          </div>

          {/* Wi-Fi & BT Antenna area */}
          <div className="relative my-2 w-full rounded-xl border border-amber-500/30 bg-amber-950/20 p-2 text-center">
            <div className="mx-auto h-2 w-24 rounded border border-amber-400/40 bg-amber-500/20" />
            <span className="mt-1 block font-mono text-[9px] font-bold tracking-wider text-amber-300">
              2.4GHz PCB ANTENNA
            </span>
          </div>

          {/* Espressif ESP-WROOM-32 Metal Shield */}
          <div className="relative flex w-full flex-1 flex-col items-center justify-center rounded-xl border border-slate-600 bg-gradient-to-br from-slate-800 to-slate-900 p-3 text-center shadow-lg">
            <div className="size-6 place-items-center rounded-lg bg-cyan-500/20 text-cyan-300 ring-1 ring-cyan-400/30 grid">
              <Cpu className="size-4" />
            </div>
            <span className="mt-2 font-mono text-[11px] font-bold tracking-widest text-white">
              ESP-WROOM-32
            </span>
            <span className="text-[9px] font-mono text-cyan-300">Dual Xtensa 240MHz</span>
            <span className="mt-1 text-[8px] text-slate-400 font-mono">520KB SRAM • 4MB Flash</span>

            {/* CP2102 Bridge Chip */}
            <div className="mt-4 rounded border border-slate-700 bg-black/60 px-2 py-1">
              <span className="font-mono text-[8px] text-slate-300">CP2102 USB-UART</span>
            </div>
          </div>

          {/* Bottom Buttons: EN and BOOT */}
          <div className="mt-3 flex w-full justify-between px-2">
            <div className="text-center">
              <div className="mx-auto size-3 rounded-full border border-slate-400 bg-slate-300 shadow-sm" />
              <span className="font-mono text-[8px] text-slate-400">EN</span>
            </div>
            <div className="text-center">
              <div className="size-1.5 rounded-full bg-cyan-400 animate-pulse mx-auto" />
              <span className="font-mono text-[7px] text-cyan-300">LED2</span>
            </div>
            <div className="text-center">
              <div className="mx-auto size-3 rounded-full border border-amber-400 bg-amber-300 shadow-sm" />
              <span className="font-mono text-[8px] text-amber-400">BOOT</span>
            </div>
          </div>
        </div>

        {/* Right Pin Column */}
        <div className="space-y-1.5">
          {rightPins.map((pin) => {
            const active = isHighlighted(pin)
            return (
              <button
                className={`flex w-full items-center justify-between rounded-lg border px-3 py-1.5 text-left text-xs font-mono transition ${
                  getPinColor(pin.category)
                } ${!active ? 'opacity-25' : 'opacity-100'}`}
                key={pin.number}
                onClick={() => setSelectedPin(pin)}
                onMouseEnter={() => setSelectedPin(pin)}
                type="button"
              >
                <span className="text-[10px] opacity-75">#{pin.number}</span>
                <span className="font-semibold">{pin.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Selected Pin Details Callout */}
      <div className="mt-6 rounded-xl border border-white/10 bg-[#06111f] p-4 text-xs">
        {selectedPin ? (
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-bold text-white">
                  Pin #{selectedPin.number}: {selectedPin.label}
                </span>
                <span className="rounded bg-white/10 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase text-cyan-300">
                  {selectedPin.category}
                </span>
              </div>
              <p className="mt-1 text-slate-300">{selectedPin.desc}</p>
              {selectedPin.note && (
                <p className="mt-1.5 font-medium text-cyan-300 flex items-center gap-1.5">
                  <Info className="size-3.5 shrink-0" />
                  {selectedPin.note}
                </p>
              )}
            </div>
            <div className="rounded-lg border border-cyan-500/20 bg-cyan-950/30 px-3 py-1.5 font-mono text-[11px] text-cyan-200">
              Logic: 3.3V Max
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-slate-400">
            <Info className="size-4 text-cyan-400" />
            <span>Click or hover over any pin in the diagram above to view its detailed specifications and project role.</span>
          </div>
        )}
      </div>
    </div>
  )
}
