'use client'

import Link from 'next/link'
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Code2,
  Cpu,
  Database,
  Layers,
  Radio,
  Server,
  Smartphone,
  Sparkles,
} from 'lucide-react'
import { raspberryPiCourseModules } from '@/data/raspberry-pi-course-data'
import { useRaspberryPiProgress } from './useRaspberryPiProgress'
import { RaspberryPiSetupGuide } from './RaspberryPiSetupGuide'

const moduleIcons = [Code2, Radio, Server, Database, Smartphone, Layers]

export function RaspberryPiCourseHub() {
  const { progress, isLoaded } = useRaspberryPiProgress()
  const nextModule =
    raspberryPiCourseModules.find((module) => !progress.completedModules.includes(module.slug)) ??
    raspberryPiCourseModules[0]
  const completion = Math.round(
    (progress.completedModules.length / raspberryPiCourseModules.length) * 100,
  )

  return (
    <div className="min-h-screen bg-[#07121f] px-4 py-8 text-[#e6f0fa] sm:px-6 lg:py-12">
      <main className="mx-auto max-w-7xl space-y-8">
        <section className="relative overflow-hidden rounded-3xl border border-cyan-500/25 bg-gradient-to-br from-[#081525] via-[#071322] to-[#050c16] p-6 shadow-2xl sm:p-10">
          <div className="pointer-events-none absolute -right-20 -top-20 size-80 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="relative max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-300">
              <Sparkles aria-hidden="true" className="size-3.5" />
              PROJECT-BASED IOT COURSE
            </div>
            <h1 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-5xl">
              Raspberry Pi <span className="text-cyan-400">Learning Center</span>
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-300 sm:text-base">
              Start by setting up Raspberry Pi OS, network access, and the project services. Then
              build a complete sensor system step by step with Python, MQTT, FastAPI, SQLite, REST
              APIs, and Expo Go using the ESP32, VL53L0X, BH1750, and soil moisture sensor.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-500 px-5 py-3 text-sm font-bold text-[#07121f] transition hover:brightness-110"
                href="#raspberry-pi-setup"
              >
                <Server aria-hidden="true" className="size-4" />
                Set up your Raspberry Pi
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
              <Link
                className="inline-flex items-center gap-2 rounded-xl border border-cyan-400/30 bg-cyan-500/10 px-5 py-3 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-500/20"
                href={`/raspberry-pi-learning/${nextModule.slug}`}
              >
                <BookOpen aria-hidden="true" className="size-4" />
                {progress.completedModules.length ? 'Continue learning' : 'Start learning'}
              </Link>
              <a
                className="inline-flex items-center rounded-xl border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.08]"
                href="#course-modules"
              >
                Explore all modules
              </a>
            </div>
          </div>
        </section>

        <RaspberryPiSetupGuide />

        <section aria-label="Course progress" className="rounded-2xl border border-white/10 bg-[#091524] p-5 sm:p-7">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-wider text-cyan-400">
                YOUR COURSE PROGRESS
              </p>
              <h2 className="mt-1 text-xl font-bold text-white">
                {isLoaded ? progress.completedModules.length : 0} of {raspberryPiCourseModules.length}{' '}
                modules complete
              </h2>
            </div>
            <span className="font-mono text-sm font-bold text-cyan-300">{completion}%</span>
          </div>
          <div
            aria-label={`${completion}% of modules completed`}
            className="mt-4 h-2.5 overflow-hidden rounded-full bg-slate-800"
            role="progressbar"
            aria-valuemax={100}
            aria-valuemin={0}
            aria-valuenow={completion}
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all"
              style={{ width: `${completion}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-slate-400">
            Your completed modules are saved in this browser.
          </p>
        </section>

        <section id="course-modules">
          <div className="mb-5">
            <p className="font-mono text-xs font-bold uppercase tracking-wider text-cyan-400">
              SIX GUIDED MODULES
            </p>
            <h2 className="mt-1 text-2xl font-bold text-white">Choose your next lesson</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {raspberryPiCourseModules.map((module, index) => {
              const Icon = moduleIcons[index] ?? Cpu
              const completed = progress.completedModules.includes(module.slug)

              return (
                <Link
                  className="group flex h-full flex-col rounded-2xl border border-white/10 bg-[#091524] p-5 transition hover:-translate-y-0.5 hover:border-cyan-400/40 hover:bg-[#0b1a2b]"
                  href={`/raspberry-pi-learning/${module.slug}`}
                  key={module.id}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="grid size-11 place-items-center rounded-xl border border-cyan-400/20 bg-cyan-500/10 text-cyan-300">
                      <Icon aria-hidden="true" className="size-5" />
                    </span>
                    {completed ? (
                      <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-300">
                        <CheckCircle2 aria-hidden="true" className="size-3.5" />
                        Complete
                      </span>
                    ) : (
                      <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[10px] text-slate-400">
                        MODULE 0{module.moduleNumber}
                      </span>
                    )}
                  </div>
                  <p className="mt-4 font-mono text-[10px] font-bold uppercase tracking-wider text-cyan-300">
                    {module.level}
                  </p>
                  <h3 className="mt-1 text-lg font-bold text-white group-hover:text-cyan-100">
                    {module.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-300">
                    {module.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between border-t border-white/[0.07] pt-3 text-xs">
                    <span className="text-slate-400">
                      {module.topics.length} subtopics
                    </span>
                    <span className="inline-flex items-center gap-1 font-semibold text-cyan-300">
                      Open lesson
                      <ArrowRight aria-hidden="true" className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>
      </main>
    </div>
  )
}
