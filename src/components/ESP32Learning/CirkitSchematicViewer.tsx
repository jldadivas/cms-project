'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  Info,
  CheckCircle2,
  Cpu,
  Waves,
  Sun,
  Activity,
  Zap,
} from 'lucide-react'

export function CirkitSchematicViewer() {
  const [isZoomed, setIsZoomed] = useState(false)
  const [activeHighlight, setActiveHighlight] = useState<string>('all')

  const wireConnections = [
    {
      sensor: 'VL53L0X ToF (Top Left)',
      pin: 'VIN',
      esp32Pin: '3V3 (Top Left)',
      wireColor: 'Dark Blue',
      type: 'Power (3.3V DC)',
      purpose: 'Supplies regulated 3.3V to the laser emitter and SPAD array',
      category: 'power',
    },
    {
      sensor: 'VL53L0X ToF (Top Left)',
      pin: 'GND',
      esp32Pin: 'GND (Pin 14)',
      wireColor: 'Dark Blue / Black',
      type: 'Ground (0V)',
      purpose: 'Common electrical ground reference',
      category: 'ground',
    },
    {
      sensor: 'VL53L0X ToF (Top Left)',
      pin: 'SCL',
      esp32Pin: 'GPIO 22 (Pin 28)',
      wireColor: 'Cyan',
      type: 'I2C Bus 0 Clock',
      purpose: 'Serial Clock for Wire 0; communicates with address 0x29',
      category: 'vl53l0x',
    },
    {
      sensor: 'VL53L0X ToF (Top Left)',
      pin: 'SDA',
      esp32Pin: 'GPIO 21 (Pin 25)',
      wireColor: 'Light Blue',
      type: 'I2C Bus 0 Data',
      purpose: 'Bidirectional Serial Data line for distance packets',
      category: 'vl53l0x',
    },
    {
      sensor: 'BH1750 Lux (Top Right)',
      pin: 'VCC',
      esp32Pin: '3V3 (Top Left)',
      wireColor: 'Pink',
      type: 'Power (3.3V DC)',
      purpose: 'Supplies 3.3V to the photodiode array and internal 16-bit ADC',
      category: 'power',
    },
    {
      sensor: 'BH1750 Lux (Top Right)',
      pin: 'GND',
      esp32Pin: 'GND (Pin 14)',
      wireColor: 'Dark Blue / Black',
      type: 'Ground (0V)',
      purpose: 'Common electrical ground return path',
      category: 'ground',
    },
    {
      sensor: 'BH1750 Lux (Top Right)',
      pin: 'SCL',
      esp32Pin: 'GPIO 19 (Pin 23)',
      wireColor: 'Purple / Magenta',
      type: 'I2C Bus 1 Clock',
      purpose: 'Dedicated hardware Clock line for independent Wire 1 bus',
      category: 'bh1750',
    },
    {
      sensor: 'BH1750 Lux (Top Right)',
      pin: 'SDA',
      esp32Pin: 'GPIO 18 (Pin 22)',
      wireColor: 'Brown / Pink',
      type: 'I2C Bus 1 Data',
      purpose: 'Dedicated hardware Data line for independent Wire 1 bus',
      category: 'bh1750',
    },
    {
      sensor: 'BH1750 Lux (Top Right)',
      pin: 'ADDR',
      esp32Pin: 'GND (Pin 14)',
      wireColor: 'Dark Blue / Black',
      type: 'Address Selector',
      purpose: 'Tied to ground to lock the 7-bit I2C address to 0x23',
      category: 'bh1750',
    },
    {
      sensor: 'Soil Moisture v1.0 (Bottom Right)',
      pin: 'VCC (+)',
      esp32Pin: '3V3 (Top Left)',
      wireColor: 'Pink',
      type: 'Power (3.3V DC)',
      purpose: 'Powers the onboard 555-timer high-frequency oscillator',
      category: 'power',
    },
    {
      sensor: 'Soil Moisture v1.0 (Bottom Right)',
      pin: 'GND (-)',
      esp32Pin: 'GND (Pin 14)',
      wireColor: 'Dark Blue / Black',
      type: 'Ground (0V)',
      purpose: 'Common electrical ground reference',
      category: 'ground',
    },
    {
      sensor: 'Soil Moisture v1.0 (Bottom Right)',
      pin: 'AOUT (A)',
      esp32Pin: 'GPIO 34 (Pin 5)',
      wireColor: 'Cyan',
      type: 'Analog Input (ADC1)',
      purpose: 'Analog voltage representing soil capacitance (safe with Wi-Fi)',
      category: 'soil',
    },
  ]

  const filteredWires = wireConnections.filter((wire) => {
    if (activeHighlight === 'all') return true
    return wire.category === activeHighlight
  })

  return (
    <div className="my-8 rounded-2xl border border-cyan-500/30 bg-[#071322] p-5 shadow-2xl backdrop-blur-xl sm:p-8">
      {/* Schematic Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-cyan-400">
              CIRKIT DESIGNER HARDWARE SCHEMATIC
            </span>
          </div>
          <h3 className="text-xl font-bold text-white sm:text-2xl">
            Official Project Wiring Diagram
          </h3>
          <p className="mt-1 text-xs text-slate-400">
            Exact physical wiring topology showing the ESP32, VL53L0X (top left), BH1750 (top right), and Capacitive Soil Sensor (bottom right).
          </p>
        </div>

        {/* Zoom Button */}
        <button
          className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/[0.04] px-3.5 py-1.5 text-xs font-semibold text-slate-200 transition hover:border-cyan-400/50 hover:bg-white/[0.08]"
          onClick={() => setIsZoomed(!isZoomed)}
          type="button"
        >
          {isZoomed ? (
            <>
              <ZoomOut className="size-3.5 text-cyan-400" />
              <span>Normal View</span>
            </>
          ) : (
            <>
              <ZoomIn className="size-3.5 text-cyan-400" />
              <span>Enlarge Schematic</span>
            </>
          )}
        </button>
      </div>

      {/* Schematic Image Display Container */}
      <div
        className={`relative mt-6 overflow-hidden rounded-2xl border border-white/10 bg-[#050b14] p-3 transition-all duration-300 ${
          isZoomed ? 'max-h-[800px] cursor-zoom-out' : 'max-h-[500px]'
        }`}
        onClick={() => setIsZoomed(!isZoomed)}
      >
        <div className="relative w-full h-[360px] sm:h-[460px] lg:h-[500px]">
          <Image
            alt="Official ESP32 Cirkit Designer Wiring Diagram with VL53L0X, BH1750, and Capacitive Soil Moisture Sensor"
            className="object-contain"
            fill
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
            src="/docs/esp32-cirkit-wiring-schematic.png"
            unoptimized
          />
        </div>

        {/* Watermark Tag */}
        <div className="absolute bottom-4 right-4 rounded-lg border border-white/10 bg-black/70 px-2.5 py-1 font-mono text-[10px] text-slate-400 backdrop-blur-md">
          Cirkit Designer Verified Schematic
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.08] pt-4">
        <span className="font-mono text-xs font-semibold text-slate-300">
          Filter Wiring by Circuit Node:
        </span>
        <div className="flex flex-wrap gap-1.5 text-[11px] font-mono">
          {[
            { id: 'all', label: 'All 12 Wires' },
            { id: 'vl53l0x', label: 'VL53L0X (Wire 0)' },
            { id: 'bh1750', label: 'BH1750 (Wire 1)' },
            { id: 'soil', label: 'Soil Sensor (ADC1)' },
            { id: 'power', label: '3.3V Power Rail' },
            { id: 'ground', label: 'GND Returns' },
          ].map((cat) => (
            <button
              className={`rounded-lg px-2.5 py-1 transition ${
                activeHighlight === cat.id
                  ? 'bg-cyan-500 font-bold text-[#07121f] shadow-md shadow-cyan-500/20'
                  : 'border border-white/10 bg-white/[0.03] text-slate-300 hover:bg-white/[0.08]'
              }`}
              key={cat.id}
              onClick={() => setActiveHighlight(cat.id)}
              type="button"
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Complete Wire Color Breakdown Table */}
      <div className="mt-4 overflow-x-auto rounded-xl border border-white/10 bg-[#06101c]">
        <table className="w-full text-left font-mono text-xs">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.02] text-slate-400 uppercase text-[10px]">
              <th className="py-3 px-4">Component &amp; Pin</th>
              <th className="py-3 px-4">ESP32 Pin</th>
              <th className="py-3 px-4">Diagram Wire Color</th>
              <th className="py-3 px-4">Electrical Function</th>
              <th className="py-3 px-4">Role in Circuit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.05]">
            {filteredWires.map((wire, idx) => (
              <tr className="hover:bg-white/[0.03] transition-colors" key={idx}>
                <td className="py-3 px-4 font-bold text-white whitespace-nowrap">
                  {wire.sensor} &rarr; <span className="text-cyan-300">{wire.pin}</span>
                </td>
                <td className="py-3 px-4 font-bold text-cyan-400 whitespace-nowrap">
                  {wire.esp32Pin}
                </td>
                <td className="py-3 px-4 whitespace-nowrap">
                  <span
                    className={`inline-block rounded px-2 py-0.5 text-[11px] font-semibold ${
                      wire.wireColor.includes('Pink')
                        ? 'bg-pink-500/20 text-pink-300 border border-pink-500/40'
                        : wire.wireColor.includes('Cyan') || wire.wireColor.includes('Light Blue')
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                        : wire.wireColor.includes('Purple')
                        ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                        : wire.wireColor.includes('Brown')
                        ? 'bg-amber-600/20 text-amber-300 border border-amber-600/40'
                        : 'bg-slate-700/40 text-slate-300 border border-slate-600/40'
                    }`}
                  >
                    {wire.wireColor}
                  </span>
                </td>
                <td className="py-3 px-4 text-slate-400">{wire.type}</td>
                <td className="py-3 px-4 text-slate-300 font-sans text-xs">
                  {wire.purpose}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Critical Circuit Notes */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
        <div className="rounded-xl border border-cyan-500/20 bg-cyan-950/20 p-3.5">
          <strong className="block text-cyan-200 font-bold mb-1">Dual I2C Bus Isolation</strong>
          Notice how the VL53L0X loops around the bottom to GPIO 21/22 (Wire 0), while the BH1750 connects directly to GPIO 18/19 (Wire 1). Separate hardware controllers prevent clock-stretching bus stalls.
        </div>
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-950/20 p-3.5">
          <strong className="block text-emerald-200 font-bold mb-1">ADC1 GPIO 34 Direct Link</strong>
          The soil sensor analog line connects directly to GPIO 34. Because GPIO 34 is on ADC1, wireless Wi-Fi packet broadcasts never disrupt moisture readings.
        </div>
        <div className="rounded-xl border border-amber-500/20 bg-amber-950/20 p-3.5">
          <strong className="block text-amber-200 font-bold mb-1">Common 3.3V Power Bus</strong>
          All 3 sensors are powered from the single 3V3 rail. Total continuous current consumption is under 35mA, well within the ESP32 regulator's 500mA rating.
        </div>
      </div>
    </div>
  )
}
