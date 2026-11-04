'use client'

import React from 'react'
import Link from 'next/link'
import {
  BookOpen,
  CheckCircle2,
  Cpu,
  Wrench,
  Code2,
  Activity,
  Server,
  Layers,
  ArrowRight,
  Sparkles,
  Zap,
  Play,
  RotateCcw,
  Check,
} from 'lucide-react'
import { esp32CourseModules } from '@/data/esp32-course-data'
import { useCourseProgress } from './useCourseProgress'
import { EndToEndSystemDiagram } from './Diagrams/CircuitDiagrams'
import { CirkitSchematicViewer } from './CirkitSchematicViewer'
import { OBSVideoPlayer } from './OBSVideoPlayer'
import { FAQSection } from './FAQSection'

export function CourseHub() {
  const {
    overallPercentage,
    completedCount,
    totalLessonsCount,
    getModuleProgress,
    progress,
    resetProgress,
  } = useCourseProgress()

  const getModuleIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu':
        return Cpu
      case 'Wrench':
        return Wrench
      case 'Code2':
        return Code2
      case 'Activity':
        return Activity
      case 'Server':
        return Server
      case 'Layers':
        return Layers
      default:
        return BookOpen
    }
  }

  // Find next uncompleted lesson to recommend for quick resume
  const allLessons = esp32CourseModules.flatMap((m) =>
    m.lessons.map((l) => ({ moduleSlug: m.slug, lessonSlug: l.slug, title: l.title }))
  )
  const nextUp = allLessons.find((l) => !progress.completedLessons.includes(l.lessonSlug)) || allLessons[0]

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl border border-cyan-500/25 bg-gradient-to-br from-[#081525] via-[#071322] to-[#050c16] p-6 shadow-2xl backdrop-blur-2xl sm:p-12">
        <div className="absolute -right-20 -top-20 size-96 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 size-96 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-semibold text-cyan-300">
            <Sparkles className="size-3.5" />
            <span>INTERACTIVE ONLINE ACADEMY</span>
          </div>

          <h1 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
            ESP32 IoT <span className="text-cyan-400">Learning Center</span>
          </h1>

          <p className="mt-4 text-sm leading-relaxed text-slate-300 sm:text-lg">
            Master embedded IoT engineering from the ground up. Learn how to configure ESP32 hardware, operate dual-bus I2C laser &amp; ambient sensors, write non-blocking C++ firmware, ingest telemetry with Python FastAPI on Raspberry Pi, and render live mobile graphs in Expo Go.
          </p>

          {/* Quick Metrics Bar */}
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 font-mono text-xs">
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-center">
              <span className="block text-xl font-bold text-cyan-300">6</span>
              <span className="text-[10px] text-slate-400 uppercase">Core Modules</span>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-center">
              <span className="block text-xl font-bold text-cyan-300">26</span>
              <span className="text-[10px] text-slate-400 uppercase">Interactive Lessons</span>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-center">
              <span className="block text-xl font-bold text-emerald-400">3</span>
              <span className="text-[10px] text-slate-400 uppercase">Transducers (ToF/Lux/Soil)</span>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-center">
              <span className="block text-xl font-bold text-amber-300">100%</span>
              <span className="text-[10px] text-slate-400 uppercase">Open Source &amp; Local</span>
            </div>
          </div>

          {/* Call to Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-500 px-6 py-3 text-xs font-bold text-[#07121f] shadow-lg shadow-cyan-500/25 transition hover:brightness-110 sm:text-sm"
              href={`/esp32-learning/${nextUp.moduleSlug}/${nextUp.lessonSlug}`}
            >
              <Play className="size-4 fill-current" />
              <span>
                {completedCount > 0 ? 'Resume Course' : 'Start Lesson 1'} &rarr; {nextUp.title}
              </span>
            </Link>

            <Link
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-5 py-3 text-xs font-semibold text-white transition hover:bg-white/[0.08] sm:text-sm"
              href="#curriculum"
            >
              <span>Explore Curriculum</span>
            </Link>

            <Link
              className="inline-flex items-center gap-2 rounded-xl border border-cyan-400/30 bg-cyan-500/10 px-5 py-3 text-xs font-semibold text-cyan-300 transition hover:bg-cyan-500/20 sm:text-sm"
              href="/esp32-learning/connecting-sensors-to-esp32/cirkit-schematic-and-physical-wiring"
            >
              <Cpu className="size-4" />
              <span>Wiring &amp; Schematic</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Course Progress Dashboard Card */}
      <section className="glass-card rounded-2xl p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-cyan-400">
              YOUR PERSONAL LMS PROGRESS
            </span>
            <h2 className="text-xl font-bold text-white sm:text-2xl">
              Course Completion: {overallPercentage}%
            </h2>
            <p className="mt-1 text-xs text-slate-300">
              {completedCount} of {totalLessonsCount} lessons finished. Progress is automatically preserved.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {completedCount > 0 && (
              <button
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-slate-400 hover:text-rose-400 transition"
                onClick={() => {
                  if (confirm('Reset your saved course progress?')) resetProgress()
                }}
                type="button"
              >
                <RotateCcw className="size-3" />
                <span>Reset</span>
              </button>
            )}
            <Link
              className="inline-flex items-center gap-2 rounded-xl border border-cyan-400/40 bg-cyan-500/15 px-4 py-2 text-xs font-bold text-cyan-200 transition hover:bg-cyan-500/25"
              href={`/esp32-learning/${nextUp.moduleSlug}/${nextUp.lessonSlug}`}
            >
              <span>Continue Learning</span>
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>

        {/* Big Progress Bar */}
        <div className="mt-5 h-3 w-full overflow-hidden rounded-full bg-slate-900 ring-1 ring-white/10">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 via-sky-400 to-emerald-400 transition-all duration-500"
            style={{ width: `${overallPercentage}%` }}
          />
        </div>
      </section>

      {/* Official Cirkit Designer Hardware Schematic Section */}
      <section>
        <CirkitSchematicViewer />
      </section>

      {/* Live OBS Video Demonstration Stream Section */}
      <section>
        <OBSVideoPlayer />
      </section>

      {/* 6 Modules Grid */}
      <section id="curriculum">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-cyan-400">
              STRUCTURED CURRICULUM
            </span>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              The 6 Step-by-Step Learning Modules
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400">
            Click any module card to begin or review its lessons
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {esp32CourseModules.map((module) => {
            const modProgress = getModuleProgress(module.id)
            const Icon = getModuleIcon(module.iconName)
            const firstLesson = module.lessons[0]

            return (
              <div
                className="glass-card glass-card-hover group relative flex flex-col justify-between rounded-2xl p-6 shadow-xl border border-white/10"
                key={module.id}
              >
                <div>
                  {/* Top Badge & Progress Ring */}
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                    <span className="font-mono text-[10px] font-bold text-cyan-300 uppercase tracking-wider">
                      {module.badge}
                    </span>
                    <span className="font-mono text-xs font-bold text-cyan-200">
                      {modProgress.percentage}% Done
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="mt-4 flex items-center gap-3">
                    <div className="grid size-11 place-items-center rounded-xl bg-cyan-400/10 text-cyan-300 ring-1 ring-cyan-400/30 group-hover:scale-105 transition-transform">
                      <Icon className="size-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-base group-hover:text-cyan-200 transition-colors">
                        {module.title}
                      </h3>
                      <span className="text-[11px] font-mono text-slate-400">
                        {module.lessons.length} Lessons • Hands-on Lab
                      </span>
                    </div>
                  </div>

                  <p className="mt-3 text-xs leading-relaxed text-slate-300">
                    {module.description}
                  </p>

                  {/* Lessons List Preview */}
                  <div className="mt-4 space-y-1.5 border-t border-white/[0.06] pt-3">
                    <span className="block text-[10px] font-mono uppercase text-slate-400 font-semibold">
                      Lessons Covered:
                    </span>
                    {module.lessons.map((lesson, idx) => (
                      <div
                        className="flex items-center gap-2 text-xs text-slate-300 truncate"
                        key={lesson.id}
                      >
                        <span className="font-mono text-[10px] text-cyan-400 shrink-0">
                          0{idx + 1}.
                        </span>
                        <span className="truncate">{lesson.title}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="mt-6 border-t border-white/[0.06] pt-4">
                  <Link
                    className="inline-flex w-full items-center justify-between rounded-xl border border-white/15 bg-white/[0.04] px-4 py-2.5 text-xs font-semibold text-white transition hover:border-cyan-400/50 hover:bg-white/[0.08] hover:text-cyan-200"
                    href={`/esp32-learning/${module.slug}/${firstLesson.slug}`}
                  >
                    <span>{modProgress.percentage > 0 ? 'Continue Module' : 'Start Module'}</span>
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* End-to-End System Showcase */}
      <section>
        <EndToEndSystemDiagram />
      </section>

      {/* FAQ & Troubleshooting Section */}
      <section>
        <FAQSection />
      </section>
    </div>
  )
}
