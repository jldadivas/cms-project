'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'
import {
  Activity,
  Menu,
  X,
  ChevronDown,
  Cpu,
  Radio,
  Server,
  Smartphone,
  Sparkles,
  ChevronRight,
  ArrowRight,
  Zap,
  Code2,
  TabletSmartphone,
  Wrench,
  Terminal,
  Layers,
  Lock,
  Unlock,
} from 'lucide-react'

interface TechDropdownItem {
  name: string
  sublabel: string
  description: string
  href: string
  badge: string
  icon: typeof Cpu
  isFeatured?: boolean
}

const technologies: TechDropdownItem[] = [
  {
    name: 'ESP32',
    sublabel: 'About ESP32 & Architecture',
    description: 'Dual-core MCU specs, dual I2C buses (Wire/Wire1), ADC1 soil probe & Wi-Fi MQTT',
    href: '/esp32',
    badge: 'About ESP32',
    icon: Cpu,
    isFeatured: true,
  },
  {
    name: 'ESP32 Learning Center',
    sublabel: 'Tutorials, Schematic & Video',
    description: 'Step-by-step hands-on lessons, Cirkit Designer wiring schematic & OBS live demo',
    href: '/esp32-learning',
    badge: 'Learning Hub',
    icon: Sparkles,
  },
  {
    name: 'About Raspberry Pi',
    sublabel: 'Edge Gateway & API',
    description: 'Mosquitto MQTT broker, FastAPI REST endpoints & SQLite data engine',
    href: '/raspberry-pi',
    badge: 'Edge Broker',
    icon: Server,
  },
  {
    name: 'MQTT Communication',
    sublabel: 'Broker Setup & Data Flow',
    description: 'Learn how the ESP32 publishes sensor readings to Mosquitto on your Raspberry Pi',
    href: '/mqtt',
    badge: 'MQTT Guide',
    icon: Radio,
  },
  {
    name: 'Raspberry Pi Learning Center',
    sublabel: 'Six guided IoT modules',
    description: 'Learn Python, MQTT, FastAPI, SQLite, REST APIs, and the complete sensor system',
    href: '/raspberry-pi-learning',
    badge: 'Learning Hub',
    icon: Sparkles,
  },
  {
    name: 'Expo Go',
    sublabel: 'Mobile Telemetry App',
    description: 'Cross-platform React Native client with real-time distance, lux & soil gauges',
    href: '/expo-go',
    badge: 'Mobile Client',
    icon: Smartphone,
  },
  {
    name: 'FastAPI Backend',
    sublabel: 'REST API & MQTT Bridge',
    description: 'Python ASGI server that bridges Mosquitto MQTT to HTTP REST endpoints for Expo Go',
    href: '/fastapi',
    badge: 'API Server',
    icon: Zap,
  },
]

const primaryNavigation = [
  { label: 'Home', href: '/' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Results & Specs', href: '/results' },
  { label: 'Code Examples', href: '/code-examples' },
]

const mobileDevelopmentLinks = [
  {
    name: 'Flutter (Dart)',
    description: 'Dart, widgets, APIs, and Flutter dashboards',
    href: '/mobile-app-learning#flutter',
    icon: Layers,
  },
  {
    name: 'Ionic Framework',
    description: 'Cross-platform mobile UI with Ionic React',
    href: '/mobile-app-learning#ionic',
    icon: Code2,
  },
  {
    name: 'Capacitor',
    description: 'Connect web apps to native Android features',
    href: '/mobile-app-learning#capacitor',
    icon: Smartphone,
  },
  {
    name: 'Android Studio',
    description: 'Android SDK, emulators, and app builds',
    href: '/mobile-app-learning#android-studio',
    icon: Wrench,
  },
  {
    name: 'Visual Studio Code',
    description: 'Editor setup, debugging, and Git workflow',
    href: '/mobile-app-learning#visual-studio-code',
    icon: Terminal,
  },
  {
    name: 'ESP32 and Raspberry Pi Integration',
    description: 'Connect sensors, MQTT, FastAPI, and mobile',
    href: '/mobile-app-learning#iot-integration',
    icon: Cpu,
  },
  {
    name: 'Complete IoT Mobile Application Tutorial',
    description: 'Build the configurable Flutter sensor dashboard',
    href: '/mobile-app-learning/flutter-iot-application',
    icon: TabletSmartphone,
  },
]

export function IoTNavigation() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [techDropdownOpen, setTechDropdownOpen] = useState(false)
  const [techDropdownLocked, setTechDropdownLocked] = useState(false)
  const [mobileDevelopmentDropdownOpen, setMobileDevelopmentDropdownOpen] = useState(false)
  const [mobileDevelopmentDropdownLocked, setMobileDevelopmentDropdownLocked] =
    useState(false)
  const [mobileTechExpanded, setMobileTechExpanded] = useState(true)
  const [mobileDevelopmentExpanded, setMobileDevelopmentExpanded] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const mobileDevelopmentRef = useRef<HTMLDivElement>(null)
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const mobileDevelopmentTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Determine if any technology route is currently active
  const isTechActive =
    pathname === '/esp32' ||
    pathname.startsWith('/esp32-learning') ||
    pathname === '/raspberry-pi' ||
    pathname.startsWith('/raspberry-pi-learning') ||
    pathname === '/mqtt' ||
    pathname === '/expo-go' ||
    pathname === '/fastapi'
  const isMobileDevelopmentActive = pathname.startsWith('/mobile-app-learning')

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setTechDropdownOpen(false)
        setTechDropdownLocked(false)
      }
      if (
        mobileDevelopmentRef.current &&
        !mobileDevelopmentRef.current.contains(event.target as Node)
      ) {
        setMobileDevelopmentDropdownOpen(false)
        setMobileDevelopmentDropdownLocked(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current)
      if (mobileDevelopmentTimeoutRef.current) {
        clearTimeout(mobileDevelopmentTimeoutRef.current)
      }
    }
  }, [])

  // Close menus when route changes
  useEffect(() => {
    setTechDropdownOpen(false)
    setTechDropdownLocked(false)
    setMobileDevelopmentDropdownOpen(false)
    setMobileDevelopmentDropdownLocked(false)
    setMobileMenuOpen(false)
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current)
    if (mobileDevelopmentTimeoutRef.current) {
      clearTimeout(mobileDevelopmentTimeoutRef.current)
    }
  }, [pathname])

  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current)
    setTechDropdownOpen(true)
  }

  const handleMouseLeave = () => {
    if (techDropdownLocked) return
    dropdownTimeoutRef.current = setTimeout(() => setTechDropdownOpen(false), 500)
  }

  const handleMobileDevelopmentMouseEnter = () => {
    if (mobileDevelopmentTimeoutRef.current) {
      clearTimeout(mobileDevelopmentTimeoutRef.current)
    }
    setMobileDevelopmentDropdownOpen(true)
  }

  const handleMobileDevelopmentMouseLeave = () => {
    if (mobileDevelopmentDropdownLocked) return
    mobileDevelopmentTimeoutRef.current = setTimeout(
      () => setMobileDevelopmentDropdownOpen(false),
      500,
    )
  }

  return (
    <nav
      aria-label="Main navigation"
      className="sticky top-0 z-50 border-b border-cyan-500/10 bg-[#07121f]/90 backdrop-blur-xl transition-all"
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
        <div className="ml-auto hidden min-w-0 flex-1 flex-nowrap items-center justify-end gap-1.5 md:flex">
          {/* Home Link */}
          <Link
            aria-current={pathname === '/' ? 'page' : undefined}
            className={`relative shrink-0 whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200 2xl:px-3.5 ${
              pathname === '/'
                ? 'bg-cyan-500/15 text-cyan-200 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] border border-cyan-500/30 font-semibold'
                : 'text-slate-300 hover:bg-white/[0.07] hover:text-white'
            }`}
            href="/"
          >
            Home
            {pathname === '/' && (
              <span className="absolute -bottom-1.5 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
            )}
          </Link>

          {/* Technologies Dropdown */}
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            ref={dropdownRef}
          >
            <button
              aria-expanded={techDropdownOpen}
              aria-haspopup="true"
              className={`relative inline-flex items-center gap-1.5 shrink-0 whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200 2xl:px-3.5 ${
                isTechActive || techDropdownOpen
                  ? 'bg-cyan-500/15 text-cyan-200 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] border border-cyan-500/30 font-semibold'
                  : 'text-slate-300 hover:bg-white/[0.07] hover:text-white'
              }`}
              onClick={() => {
                if (techDropdownOpen) {
                  setTechDropdownOpen(false)
                  setTechDropdownLocked(false)
                } else {
                  setTechDropdownOpen(true)
                }
              }}
              type="button"
            >
              <span>Technologies</span>
              <ChevronDown
                aria-hidden="true"
                className={`size-3.5 text-cyan-400 transition-transform duration-200 ${
                  techDropdownOpen ? 'rotate-180' : ''
                }`}
              />
              {isTechActive && (
                <span className="absolute -bottom-1.5 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
              )}
            </button>

            {/* Desktop Dropdown Popover */}
            {techDropdownOpen && (
              <div
                className="absolute left-1/2 top-full z-50 mt-2 flex max-h-[min(540px,calc(100vh-5rem))] w-[420px] -translate-x-1/2 flex-col overflow-hidden rounded-2xl border border-cyan-500/30 bg-[#081524]/95 p-3 shadow-2xl backdrop-blur-2xl animate-in fade-in slide-in-from-top-2 duration-150"
                role="menu"
              >
                <div className="mb-2 flex shrink-0 items-center justify-between gap-2 border-b border-white/[0.08] px-2.5 pb-2">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-cyan-300">
                    TECHNOLOGY STACK &amp; GUIDES
                  </span>
                  <div className="flex shrink-0 items-center gap-2">
                    <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-2 py-0.5 font-mono text-[10px] text-cyan-400">
                      7 Components
                    </span>
                    <button
                      aria-label={
                        techDropdownLocked
                          ? 'Unlock Technologies dropdown'
                          : 'Lock Technologies dropdown open'
                      }
                      aria-pressed={techDropdownLocked}
                      className={`inline-flex min-h-8 items-center gap-1.5 rounded-lg border px-2 text-[10px] font-semibold transition ${
                        techDropdownLocked
                          ? 'border-cyan-400/40 bg-cyan-500/15 text-cyan-100'
                          : 'border-white/10 bg-white/[0.04] text-slate-300 hover:border-cyan-400/30 hover:text-white'
                      }`}
                      onClick={() => {
                        if (!techDropdownLocked) {
                          if (dropdownTimeoutRef.current) {
                            clearTimeout(dropdownTimeoutRef.current)
                          }
                          setTechDropdownOpen(true)
                        }
                        setTechDropdownLocked((locked) => !locked)
                      }}
                      type="button"
                    >
                      {techDropdownLocked ? (
                        <Unlock aria-hidden="true" className="size-3.5" />
                      ) : (
                        <Lock aria-hidden="true" className="size-3.5" />
                      )}
                      {techDropdownLocked ? 'Unlock' : 'Lock open'}
                    </button>
                  </div>
                </div>

                <div className="max-h-[300px] flex-1 overflow-y-auto overscroll-contain pr-1.5 space-y-1 [scrollbar-width:thin] [scrollbar-color:rgba(34,211,238,0.5)_rgba(255,255,255,0.06)] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-white/[0.04] [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-cyan-400/50 hover:[&::-webkit-scrollbar-thumb]:bg-cyan-300">
                  {technologies.map((tech) => {
                    const Icon = tech.icon
                    const isCourse =
                      tech.href === '/esp32-learning' || tech.href === '/raspberry-pi-learning'
                    const isCurrent = isCourse
                      ? pathname.startsWith(tech.href)
                      : pathname === tech.href

                    return (
                      <Link
                        className={`group flex items-start gap-3 rounded-xl p-2.5 transition-all ${
                          isCurrent
                            ? 'bg-cyan-500/15 border border-cyan-400/40'
                            : 'hover:bg-white/[0.06] border border-transparent'
                        }`}
                        href={tech.href}
                        key={tech.name}
                        onClick={() => {
                          setTechDropdownOpen(false)
                          setTechDropdownLocked(false)
                        }}
                        role="menuitem"
                      >
                        <div
                          className={`mt-0.5 grid size-9 shrink-0 place-items-center rounded-lg transition-transform group-hover:scale-105 ${
                            tech.isFeatured
                              ? 'bg-cyan-400/20 text-cyan-300 ring-1 ring-cyan-400/40'
                              : 'bg-white/[0.06] text-slate-300 ring-1 ring-white/10 group-hover:text-cyan-300'
                          }`}
                        >
                          <Icon aria-hidden="true" className="size-4" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-bold text-xs text-white group-hover:text-cyan-200 transition-colors">
                              {tech.name}
                            </span>
                            <span className="font-mono text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/[0.05] text-cyan-300 border border-white/[0.08]">
                              {tech.badge}
                            </span>
                          </div>
                          <span className="block text-[11px] font-semibold text-cyan-400/90 mt-0.5">
                            {tech.sublabel}
                          </span>
                          <p className="mt-0.5 text-[11px] leading-snug text-slate-300 line-clamp-2">
                            {tech.description}
                          </p>
                        </div>

                        <ChevronRight
                          aria-hidden="true"
                          className="mt-2 size-4 text-slate-500 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:text-cyan-400 shrink-0"
                        />
                      </Link>
                    )
                  })}
                </div>

                {/* Quick Learning Center & Schematic Callout */}
                <div className="mt-2.5 shrink-0 rounded-xl border border-cyan-500/20 bg-cyan-950/30 p-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-cyan-200">
                      Need ESP32 Wiring Schematics?
                    </span>
                    <Link
                      className="inline-flex items-center gap-1 font-mono text-[10px] font-bold text-cyan-300 hover:text-cyan-100 hover:underline"
                      href="/esp32-learning/connecting-sensors-to-esp32/cirkit-schematic-and-physical-wiring"
                      onClick={() => {
                        setTechDropdownOpen(false)
                        setTechDropdownLocked(false)
                      }}
                    >
                      <span>Cirkit Diagram</span>
                      <ArrowRight className="size-3" />
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mobile App Development Dropdown */}
          <div
            className="relative"
            onMouseEnter={handleMobileDevelopmentMouseEnter}
            onMouseLeave={handleMobileDevelopmentMouseLeave}
            ref={mobileDevelopmentRef}
          >
            <button
              aria-expanded={mobileDevelopmentDropdownOpen}
              aria-haspopup="true"
              className={`relative inline-flex items-center gap-1 shrink-0 whitespace-nowrap rounded-lg px-2 py-1.5 text-xs font-medium transition-all duration-200 lg:px-3 ${
                isMobileDevelopmentActive || mobileDevelopmentDropdownOpen
                  ? 'border border-cyan-500/30 bg-cyan-500/15 font-semibold text-cyan-200'
                  : 'text-slate-300 hover:bg-white/[0.07] hover:text-white'
              }`}
              onClick={() => {
                if (mobileDevelopmentDropdownOpen) {
                  setMobileDevelopmentDropdownOpen(false)
                  setMobileDevelopmentDropdownLocked(false)
                } else {
                  setMobileDevelopmentDropdownOpen(true)
                }
              }}
              type="button"
            >
              <span>Mobile App Development</span>
              <ChevronDown
                aria-hidden="true"
                className={`size-3.5 text-cyan-400 transition-transform duration-200 ${
                  mobileDevelopmentDropdownOpen ? 'rotate-180' : ''
                }`}
              />
              {isMobileDevelopmentActive && (
                <span className="absolute -bottom-1.5 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
              )}
            </button>

            {mobileDevelopmentDropdownOpen && (
              <div
                className="absolute right-0 top-full z-50 mt-2 flex max-h-[min(540px,calc(100vh-5rem))] w-[min(90vw,440px)] flex-col overflow-hidden rounded-2xl border border-cyan-500/30 bg-[#081524]/95 p-3 shadow-2xl backdrop-blur-2xl animate-in fade-in slide-in-from-top-2 duration-150"
                role="menu"
              >
                <div className="mb-2 flex shrink-0 items-center justify-between gap-2 border-b border-white/[0.08] px-2.5 pb-2">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-cyan-300">
                    MOBILE DEVELOPMENT LEARNING PATH
                  </span>
                  <div className="flex shrink-0 items-center gap-2">
                    <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-2 py-0.5 font-mono text-[10px] text-cyan-400">
                      7 guides
                    </span>
                    <button
                      aria-label={
                        mobileDevelopmentDropdownLocked
                          ? 'Unlock Mobile App Development dropdown'
                          : 'Lock Mobile App Development dropdown open'
                      }
                      aria-pressed={mobileDevelopmentDropdownLocked}
                      className={`inline-flex min-h-8 items-center gap-1.5 rounded-lg border px-2 text-[10px] font-semibold transition ${
                        mobileDevelopmentDropdownLocked
                          ? 'border-cyan-400/40 bg-cyan-500/15 text-cyan-100'
                          : 'border-white/10 bg-white/[0.04] text-slate-300 hover:border-cyan-400/30 hover:text-white'
                      }`}
                      onClick={() => {
                        if (!mobileDevelopmentDropdownLocked) {
                          if (mobileDevelopmentTimeoutRef.current) {
                            clearTimeout(mobileDevelopmentTimeoutRef.current)
                          }
                          setMobileDevelopmentDropdownOpen(true)
                        }
                        setMobileDevelopmentDropdownLocked((locked) => !locked)
                      }}
                      type="button"
                    >
                      {mobileDevelopmentDropdownLocked ? (
                        <Unlock aria-hidden="true" className="size-3.5" />
                      ) : (
                        <Lock aria-hidden="true" className="size-3.5" />
                      )}
                      {mobileDevelopmentDropdownLocked ? 'Unlock' : 'Lock open'}
                    </button>
                  </div>
                </div>
                <div className="max-h-[300px] flex-1 space-y-1 overflow-y-auto overscroll-contain pr-1.5 [scrollbar-width:thin] [scrollbar-color:rgba(34,211,238,0.5)_rgba(255,255,255,0.06)] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-white/[0.04] [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-cyan-400/50 hover:[&::-webkit-scrollbar-thumb]:bg-cyan-300">
                  {mobileDevelopmentLinks.map(({ name, description, href, icon: Icon }) => (
                    <Link
                      className="group flex items-start gap-3 rounded-xl border border-transparent p-2.5 transition hover:border-cyan-400/20 hover:bg-white/[0.06]"
                      href={href}
                      key={name}
                      onClick={() => {
                        setMobileDevelopmentDropdownOpen(false)
                        setMobileDevelopmentDropdownLocked(false)
                      }}
                      role="menuitem"
                    >
                      <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-lg bg-white/[0.06] text-cyan-300 ring-1 ring-white/10">
                        <Icon aria-hidden="true" className="size-4" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-xs font-bold text-white group-hover:text-cyan-200">
                          {name}
                        </span>
                        <span className="mt-1 block text-[11px] leading-snug text-slate-300">
                          {description}
                        </span>
                      </span>
                      <ChevronRight
                        aria-hidden="true"
                        className="mt-2 size-4 shrink-0 text-slate-500 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100 group-hover:text-cyan-400"
                      />
                    </Link>
                  ))}
                </div>
                <Link
                  className="mt-2 shrink-0 flex items-center justify-between rounded-xl border border-cyan-500/20 bg-cyan-950/30 px-3 py-2.5 text-xs font-semibold text-cyan-200 transition hover:bg-cyan-950/50"
                  href="/mobile-app-learning"
                  onClick={() => setMobileDevelopmentDropdownOpen(false)}
                >
                  <span>Open the full learning center</span>
                  <ArrowRight aria-hidden="true" className="size-4 text-cyan-300" />
                </Link>
              </div>
            )}
          </div>

          {/* Remaining Primary Links */}
          {primaryNavigation.slice(1).map(({ label, href }) => {
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
              >
                {label}
                {active && (
                  <span className="absolute -bottom-1.5 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                )}
              </Link>
            )
          })}
        </div>

        {/* Mobile menu trigger button */}
        <button
          aria-controls="site-navigation-menu"
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="ml-auto inline-flex min-h-10 shrink-0 items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-3.5 text-sm font-semibold text-slate-100 transition hover:border-cyan-400/40 hover:bg-white/[0.08] md:hidden"
          onClick={() => setMobileMenuOpen((isOpen) => !isOpen)}
          type="button"
        >
          {mobileMenuOpen ? (
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
        {mobileMenuOpen && (
          <div
            className="absolute inset-x-4 top-full z-50 mt-2 grid gap-2 rounded-2xl border border-cyan-500/20 bg-[#091524]/95 p-4 shadow-2xl backdrop-blur-2xl md:hidden animate-in fade-in slide-in-from-top-3 duration-200 max-h-[85vh] overflow-y-auto"
            id="site-navigation-menu"
          >
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-2 px-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-cyan-300">
                Navigation
              </span>
              <span className="flex items-center gap-1.5 text-[11px] text-emerald-400">
                <span className="size-1.5 rounded-full bg-emerald-400 animate-ping" />
                Edge Active
              </span>
            </div>

            {/* Mobile Home */}
            <Link
              className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                pathname === '/'
                  ? 'bg-cyan-500/15 text-cyan-200 border border-cyan-500/30 font-semibold'
                  : 'text-slate-300 hover:bg-white/[0.06] hover:text-white'
              }`}
              href="/"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>

            {/* Mobile Technologies Section Accordion */}
            <div className="rounded-xl border border-cyan-500/20 bg-cyan-950/20 p-2.5">
              <button
                className="flex w-full items-center justify-between text-xs font-bold uppercase tracking-wider text-cyan-300"
                onClick={() => setMobileTechExpanded((prev) => !prev)}
                type="button"
              >
                <span>Technologies</span>
                <ChevronDown
                  className={`size-4 transition-transform ${mobileTechExpanded ? 'rotate-180' : ''}`}
                />
              </button>

              {mobileTechExpanded && (
                <div className="mt-2 space-y-1.5 border-t border-white/[0.06] pt-2">
                  {technologies.map((tech) => {
                    const Icon = tech.icon
                    const isCourse =
                      tech.href === '/esp32-learning' || tech.href === '/raspberry-pi-learning'
                    const isCurrent = isCourse
                      ? pathname.startsWith(tech.href)
                      : pathname === tech.href

                    return (
                      <Link
                        className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs transition ${
                          isCurrent
                            ? 'bg-cyan-500/20 text-cyan-200 font-semibold border border-cyan-400/30'
                            : 'text-slate-300 hover:bg-white/[0.06] hover:text-white'
                        }`}
                        href={tech.href}
                        key={tech.name}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Icon className="size-4 text-cyan-400 shrink-0" />
                        <div className="min-w-0">
                          <span className="block font-bold text-white">{tech.name}</span>
                          <span className="block text-[10px] text-cyan-300/80">{tech.badge}</span>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>

            <div className="rounded-xl border border-cyan-500/20 bg-cyan-950/20 p-2.5">
              <button
                aria-expanded={mobileDevelopmentExpanded}
                className="flex w-full items-center justify-between text-xs font-bold uppercase tracking-wider text-cyan-300"
                onClick={() =>
                  setMobileDevelopmentExpanded((isExpanded) => !isExpanded)
                }
                type="button"
              >
                <span>Mobile App Development</span>
                <ChevronDown
                  aria-hidden="true"
                  className={`size-4 transition-transform ${
                    mobileDevelopmentExpanded ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {mobileDevelopmentExpanded && (
                <div className="mt-2 space-y-1.5 border-t border-white/[0.06] pt-2">
                  {mobileDevelopmentLinks.map(({ name, description, href, icon: Icon }) => (
                    <Link
                      className={`flex items-start gap-2.5 rounded-lg px-2.5 py-2 text-xs transition ${
                        isMobileDevelopmentActive
                          ? 'text-cyan-100 hover:bg-cyan-500/10'
                          : 'text-slate-300 hover:bg-white/[0.06] hover:text-white'
                      }`}
                      href={href}
                      key={name}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Icon aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-cyan-400" />
                      <span className="min-w-0">
                        <span className="block font-bold text-white">{name}</span>
                        <span className="mt-0.5 block text-[10px] leading-relaxed text-slate-400">
                          {description}
                        </span>
                      </span>
                    </Link>
                  ))}
                  <Link
                    className="block rounded-lg px-2.5 py-2 text-xs font-semibold text-cyan-200 hover:bg-white/[0.06]"
                    href="/mobile-app-learning"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Open the full learning center
                  </Link>
                </div>
              )}
            </div>

            {/* Other Mobile Nav Items */}
            {primaryNavigation.slice(1).map(({ label, href }) => {
              const active = pathname === href || (href !== '/' && pathname.startsWith(`${href}/`))

              return (
                <Link
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                    active
                      ? 'bg-cyan-500/15 text-cyan-200 border border-cyan-500/30 font-semibold'
                      : 'text-slate-300 hover:bg-white/[0.06] hover:text-white'
                  }`}
                  href={href}
                  key={label}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {label}
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </nav>
  )
}
