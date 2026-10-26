import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ShieldAlert } from 'lucide-react'
import { CodeExamples } from '@/components/CodeExamples'

export default function CodeExamplesPage() {
  return (
    <main className="min-h-screen bg-[#07121f] px-5 py-8 text-[#e6f0fa] sm:px-8 bg-tech-grid">
      <div className="mx-auto max-w-7xl">
        <Link
          className="group inline-flex items-center gap-2 text-xs font-semibold text-slate-400 transition hover:text-cyan-200"
          href="/#architecture"
        >
          <ArrowLeft aria-hidden="true" className="size-3.5 transition-transform group-hover:-translate-x-1" />
          <span>Back to architecture</span>
        </Link>
        <header className="mt-6 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 font-mono text-[11px] font-semibold tracking-wider text-cyan-300">
            <span className="size-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>REFERENCE IMPLEMENTATION</span>
          </div>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">Code examples</h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
            These snippets use one shared data contract: ESP32 sends JSON to{' '}
            <code className="text-cyan-300 font-mono">POST /api/readings</code>; the Expo app reads{' '}
            <code className="text-cyan-300 font-mono">GET /api/readings/latest</code>. Configure real
            credentials and device-specific sensor conversions before use.
          </p>
        </header>

        <CodeExamples />

        <aside className="mt-10 rounded-2xl border border-amber-400/30 bg-amber-950/20 p-5 text-xs leading-relaxed text-amber-200/90 shadow-xl backdrop-blur-md sm:text-sm">
          <div className="flex items-center gap-2 font-bold text-amber-300 uppercase tracking-wider mb-1.5 font-mono">
            <ShieldAlert className="size-4" />
            <span>Network &amp; Security Protocol</span>
          </div>
          Use the Raspberry Pi&apos;s reachable LAN address (e.g. 192.168.1.100), not <code className="text-amber-100 font-mono">localhost</code> on your phone. Keep
          credentials out of source control. Restrict local API access during development; add
          authentication and HTTPS/TLS before exposing a service beyond a trusted network.
          Browser-based clients may require a specific CORS origin; native Expo fetches do not use
          browser CORS enforcement.
        </aside>
      </div>
    </main>
  )
}

export const metadata: Metadata = {
  title: 'Code Examples | Expo Go IoT Monitoring',
  description: 'ESP32 HTTP, FastAPI, SQLite, Expo React Native, and WebSocket code examples.',
}
