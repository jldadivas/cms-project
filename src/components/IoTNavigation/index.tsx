'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Activity, Menu, X } from 'lucide-react'

const navigation = [
  { label: 'Home', href: '/' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Results & Specs', href: '/results' },
  { label: 'ESP32', href: '/esp32' },
  { label: 'Raspberry Pi', href: '/raspberry-pi' },
  { label: 'Expo Go', href: '/expo-go' },
  { label: 'Code Examples', href: '/code-examples' },
]

export function IoTNavigation() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const links = navigation.map(({ label, href }) => {
    const isAnchor = href.startsWith('/#')
    const active =
      !isAnchor &&
      (pathname === href || (href !== '/' && pathname.startsWith(`${href}/`)))

    return (
      <Link
        aria-current={active ? 'page' : undefined}
        className={`relative shrink-0 whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200 2xl:px-3.5 ${
          active
            ? 'bg-cyan-500/15 text-cyan-200 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] border border-cyan-500/30 font-semibold'
            : 'text-slate-300 hover:bg-white/[0.07] hover:text-white'
        }`}
        href={href}
        key={label}
        onClick={() => setOpen(false)}
      >
        {label}
        {active && (
          <span className="absolute -bottom-1.5 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
        )}
      </Link>
    )
  })

  return (
    <nav
      aria-label="Main navigation"
      className="sticky top-0 z-50 border-b border-cyan-500/10 bg-[#07121f]/85 backdrop-blur-xl transition-all"
    >
      <div className="relative mx-auto flex max-w-[1500px] items-center justify-between gap-4 px-5 py-3 lg:px-8">
        {/* Brand Logo */}
        <Link
          aria-label="Expo Go IoT home"
          className="group flex shrink-0 items-center gap-3 transition-transform hover:scale-[1.02]"
          href="/"
        >
          <div className="relative grid size-10 place-items-center rounded-xl bg-gradient-to-br from-cyan-400 via-sky-500 to-blue-600 text-[#07121f] shadow-lg shadow-cyan-500/25 transition-all group-hover:shadow-cyan-400/40">
            <Activity aria-hidden="true" className="size-5 text-[#07121f] transition-transform group-hover:rotate-12" />
            <span className="absolute -top-1 -right-1 flex size-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-3 rounded-full border-2 border-[#07121f] bg-emerald-400" />
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="whitespace-nowrap font-black tracking-wider text-white text-sm sm:text-base">
                EXPO GO <span className="text-cyan-400">/ IoT</span>
              </span>
              <span className="hidden rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2 py-0.5 text-[10px] font-semibold text-cyan-300 sm:inline-block">
                v2.4
              </span>
            </div>
            <p className="hidden text-[10px] text-slate-400 md:block font-mono">
              EDGE TELEMETRY PIPELINE
            </p>
          </div>
        </Link>

        {/* Live Network Beacon */}
        <div className="hidden lg:flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-950/30 px-3 py-1 text-[11px] font-medium text-emerald-300">
          <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>TELEMETRY LIVE</span>
        </div>

        {/* Desktop Nav Links */}
        <div className="ml-auto hidden min-w-0 flex-1 flex-nowrap items-center justify-end gap-1.5 xl:flex">
          {links}
        </div>

        {/* Mobile menu trigger button */}
        <button
          aria-controls="site-navigation-menu"
          aria-expanded={open}
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          className="ml-auto inline-flex min-h-10 shrink-0 items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-3.5 text-sm font-semibold text-slate-100 transition hover:border-cyan-400/40 hover:bg-white/[0.08] xl:hidden"
          onClick={() => setOpen((isOpen) => !isOpen)}
          type="button"
        >
          {open ? (
            <>
              Close <X aria-hidden="true" className="size-4 text-cyan-300" />
            </>
          ) : (
            <>
              Menu <Menu aria-hidden="true" className="size-4 text-cyan-300" />
            </>
          )}
        </button>

        {/* Mobile Dropdown Menu */}
        {open && (
          <div
            className="absolute inset-x-4 top-full z-50 mt-2 grid gap-1.5 rounded-2xl border border-cyan-500/20 bg-[#091524]/95 p-3.5 shadow-2xl backdrop-blur-2xl xl:hidden animate-in fade-in slide-in-from-top-3 duration-200"
            id="site-navigation-menu"
          >
            <div className="mb-2 flex items-center justify-between border-b border-white/[0.08] pb-2 px-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-cyan-300">
                Navigation
              </span>
              <span className="flex items-center gap-1.5 text-[11px] text-emerald-400">
                <span className="size-1.5 rounded-full bg-emerald-400 animate-ping" />
                Edge Active
              </span>
            </div>
            {links}
          </div>
        )}
      </div>
    </nav>
  )
}
