'use client'

import React, { useState, useRef } from 'react'
import {
  Video,
  Play,
  RotateCw,
  Download,
  Terminal,
  Clock,
  Sparkles,
  Maximize2,
  CheckCircle2,
} from 'lucide-react'

interface OBSVideoPlayerProps {
  title?: string
  description?: string
  videoSrc?: string
  fileSize?: string
}

export function OBSVideoPlayer({
  title = 'Real-World Hardware Wiring & Serial Telemetry Demo',
  description = 'Live screen recording demonstrating the physical ESP32 connected to the VL53L0X ToF laser, BH1750 light meter, and capacitive soil probe with real-time Serial Monitor output.',
  videoSrc = '/videos/esp32-obs-wiring-demo.mp4',
  fileSize = '21.0 MB',
}: OBSVideoPlayerProps) {
  const [videoRotated, setVideoRotated] = useState(false)
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed)
    if (videoRef.current) {
      videoRef.current.playbackRate = speed
    }
  }

  return (
    <div className="my-8 rounded-2xl border border-rose-500/30 bg-[#091524] p-5 shadow-2xl backdrop-blur-xl sm:p-8">
      {/* Video Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
        <div className="flex items-center gap-3">
          <div className="grid size-11 place-items-center rounded-xl bg-rose-500/20 text-rose-300 ring-1 ring-rose-400/30">
            <Video className="size-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-rose-400 animate-ping" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-rose-300">
                LIVE DEMONSTRATION STREAM
              </span>
            </div>
            <h3 className="text-base font-bold text-white sm:text-xl">{title}</h3>
          </div>
        </div>

        {/* Video Controls Header */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Speed Buttons */}
          <div className="flex items-center rounded-xl border border-white/10 bg-white/[0.03] p-1 font-mono text-[10px]">
            {[1.0, 1.25, 1.5].map((speed) => (
              <button
                className={`rounded-lg px-2 py-0.5 transition ${
                  playbackSpeed === speed
                    ? 'bg-rose-500 text-white font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
                key={speed}
                onClick={() => handleSpeedChange(speed)}
                type="button"
              >
                {speed}x
              </button>
            ))}
          </div>

          {/* Orientation Toggle */}
          <button
            className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/[0.04] px-3 py-1.5 font-mono text-xs text-slate-200 transition hover:bg-white/[0.08]"
            onClick={() => setVideoRotated(!videoRotated)}
            type="button"
          >
            <RotateCw className="size-3.5 text-cyan-400" />
            <span className="hidden sm:inline">{videoRotated ? 'Landscape' : 'Rotate'}</span>
          </button>

          {/* Direct Download Link */}
          <a
            className="inline-flex items-center gap-1.5 rounded-xl border border-rose-500/30 bg-rose-500/15 px-3 py-1.5 font-mono text-xs text-rose-200 transition hover:bg-rose-500/25"
            download
            href={videoSrc}
          >
            <Download className="size-3.5" />
            <span className="hidden sm:inline">MP4 ({fileSize})</span>
          </a>
        </div>
      </div>

      <p className="mt-3 text-xs leading-relaxed text-slate-300 sm:text-sm">
        {description}
      </p>

      {/* Video Player Display Container */}
      <div className="relative mt-6 overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl flex items-center justify-center min-h-[360px] sm:min-h-[480px]">
        <video
          className={`w-full max-h-[560px] object-contain transition-transform duration-500 ${
            videoRotated ? '-rotate-90 scale-90' : ''
          }`}
          controls
          playsInline
          poster="/docs/iot-system-demo-poster.jpg"
          preload="metadata"
          ref={videoRef}
          src={videoSrc}
        />
      </div>

      {/* Video Metadata Footer */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/[0.06] bg-[#06101c] p-3 text-xs font-mono text-slate-400">
        <span className="flex items-center gap-2">
          <Terminal className="size-3.5 text-rose-400" />
          <span>Source: OBS Screen Recording · Direct USB-to-UART Stream (COM4)</span>
        </span>
        <span className="text-cyan-300">Format: 1080p H.264 · 60 FPS · Stereo</span>
      </div>

      {/* Video Breakdown Guide */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 text-xs">
          <div className="flex items-center gap-2 text-rose-300 font-bold mb-1">
            <Clock className="size-3.5" />
            <span>0:00 - Setup &amp; Boot</span>
          </div>
          <p className="text-slate-300">
            ESP32 establishes serial link at 115200 baud, checks I2C buses, and begins non-blocking main loop.
          </p>
        </div>

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 text-xs">
          <div className="flex items-center gap-2 text-cyan-300 font-bold mb-1">
            <Clock className="size-3.5" />
            <span>0:15 - Sensor Sampling</span>
          </div>
          <p className="text-slate-300">
            VL53L0X ranging test and BH1750 lux measurements respond in real-time as objects move in front of the optical sensors.
          </p>
        </div>

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 text-xs">
          <div className="flex items-center gap-2 text-emerald-300 font-bold mb-1">
            <Clock className="size-3.5" />
            <span>0:30 - Moisture &amp; JSON</span>
          </div>
          <p className="text-slate-300">
            Capacitive soil probe converts 12-bit ADC counts into calibrated moisture percentage and formats the telemetry packet.
          </p>
        </div>
      </div>
    </div>
  )
}
