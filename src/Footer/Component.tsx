import Link from 'next/link'
import { Activity, Cpu, Database, Github, Server, Smartphone, Waves, Wifi } from 'lucide-react'

export function Footer() {
  return (
    <footer className="mt-auto border-t border-cyan-500/10 bg-[#060e18] text-slate-400">
      <div className="mx-auto max-w-[1500px] px-5 py-10 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Info */}
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid size-8 place-items-center rounded-lg bg-cyan-400/15 text-cyan-300 ring-1 ring-cyan-400/30">
                <Activity aria-hidden="true" className="size-4" />
              </span>
              <span className="font-bold tracking-wide text-white text-sm">
                EXPO GO <span className="text-cyan-400">/ IoT</span>
              </span>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-slate-400">
              End-to-end edge telemetry platform demonstrating live sensor data acquisition on ESP32,
              processing with FastAPI on Raspberry Pi, and native visualization with React Native in Expo Go.
            </p>
            <div className="mt-4 flex items-center gap-2 text-[11px] text-emerald-400 font-mono">
              <span className="size-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>SYSTEM ARCHITECTURE v2.4</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white">Documentation</p>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <Link className="transition hover:text-cyan-300" href="/how-it-works">
                  How It Works
                </Link>
              </li>
              <li>
                <Link className="transition hover:text-cyan-300" href="/#architecture">
                  System Architecture
                </Link>
              </li>
              <li>
                <Link className="transition hover:text-cyan-300" href="/code-examples">
                  Code Examples
                </Link>
              </li>
            </ul>
          </div>

          {/* Hardware & Components */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white">Hardware Nodes</p>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <Link className="inline-flex items-center gap-1.5 transition hover:text-cyan-300" href="/esp32">
                  <Cpu className="size-3 text-cyan-400" /> ESP32 Microcontroller
                </Link>
              </li>
              <li>
                <Link className="inline-flex items-center gap-1.5 transition hover:text-cyan-300" href="/raspberry-pi">
                  <Server className="size-3 text-cyan-400" /> Raspberry Pi Edge Server
                </Link>
              </li>
              <li>
                <Link className="inline-flex items-center gap-1.5 transition hover:text-cyan-300" href="/expo-go">
                  <Smartphone className="size-3 text-cyan-400" /> Expo Go Mobile App
                </Link>
              </li>
            </ul>
          </div>

          {/* Network & Specs */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white">Edge Protocols</p>
            <div className="mt-3 flex flex-wrap gap-1.5 font-mono text-[11px]">
              <span className="rounded bg-white/[0.05] px-2 py-1 text-slate-300 border border-white/10">
                HTTP/1.1 REST
              </span>
              <span className="rounded bg-white/[0.05] px-2 py-1 text-slate-300 border border-white/10">
                WebSockets
              </span>
              <span className="rounded bg-white/[0.05] px-2 py-1 text-slate-300 border border-white/10">
                SQLite WAL
              </span>
              <span className="rounded bg-white/[0.05] px-2 py-1 text-slate-300 border border-white/10">
                JSON RFC 8259
              </span>
            </div>
            <p className="mt-3 text-[11px] leading-relaxed text-slate-500">
              Live data is shown only after a configured backend responds successfully. Defaults to simulated telemetry when disconnected.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/[0.08] pt-6 text-xs text-slate-500 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Expo Go IoT Monitoring &middot; Open Source Architecture</p>
          <p className="font-mono text-[11px] text-slate-400">
            Next.js &bull; Tailwind CSS &bull; React Native
          </p>
        </div>
      </div>
    </footer>
  )
}
