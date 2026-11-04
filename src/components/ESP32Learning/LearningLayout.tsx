'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Sparkles,
  RotateCcw,
  Home,
  Layers,
  HelpCircle,
} from 'lucide-react'
import { esp32CourseModules } from '@/data/esp32-course-data'
import { useCourseProgress } from './useCourseProgress'

interface LearningLayoutProps {
  children: React.ReactNode
  currentModuleId?: string
  currentLessonSlug?: string
}

export function LearningLayout({
  children,
  currentModuleId,
  currentLessonSlug,
}: LearningLayoutProps) {
  const pathname = usePathname()
  const {
    overallPercentage,
    completedCount,
    totalLessonsCount,
    getModuleProgress,
    isLessonCompleted,
    resetProgress,
  } = useCourseProgress()

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [collapsedModules, setCollapsedModules] = useState<Record<string, boolean>>({})

  const toggleModuleCollapse = (modId: string) => {
    setCollapsedModules((prev) => ({ ...prev, [modId]: !prev[modId] }))
  }

  return (
    <div className="min-h-screen bg-[#07121f] text-[#e6f0fa] bg-tech-grid">
      {/* Top Learning Center Banner & Global Progress Bar */}
      <header className="sticky top-[61px] z-40 border-b border-cyan-500/15 bg-[#07121f]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              aria-label="Toggle navigation sidebar"
              className="grid size-9 place-items-center rounded-xl border border-white/15 bg-white/[0.04] text-slate-300 hover:text-white lg:hidden"
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              type="button"
            >
              {mobileSidebarOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>

            <Link
              className="flex items-center gap-2 text-xs font-mono font-bold text-slate-300 hover:text-cyan-300 transition"
              href="/esp32-learning"
            >
              <Home className="size-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Learning Center Hub</span>
            </Link>

            <span className="text-slate-600 hidden sm:inline">/</span>

            <span className="font-mono text-xs font-semibold text-cyan-200 truncate max-w-[200px] sm:max-w-none">
              ESP32 to Expo Go Complete LMS
            </span>
          </div>

          {/* Progress Pill */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col items-end">
              <span className="font-mono text-[11px] text-slate-300">
                Course Progress: <strong className="text-cyan-300">{overallPercentage}%</strong> ({completedCount}/{totalLessonsCount})
              </span>
              <div className="mt-1 h-1.5 w-36 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all duration-500"
                  style={{ width: `${overallPercentage}%` }}
                />
              </div>
            </div>

            <Link
              className="inline-flex items-center gap-1.5 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 text-xs font-semibold text-cyan-300 hover:bg-cyan-500/20 transition"
              href="/esp32-learning/connecting-sensors-to-esp32/cirkit-schematic-and-physical-wiring"
            >
              <span className="hidden sm:inline">Schematic &amp; Wiring</span>
              <ChevronRight className="size-3" />
            </Link>
          </div>
        </div>

        {/* Mobile Mini Progress Bar */}
        <div className="h-1 w-full bg-slate-800/80 md:hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all duration-300"
            style={{ width: `${overallPercentage}%` }}
          />
        </div>
      </header>

      {/* Main Two-Column LMS Layout */}
      <div className="mx-auto max-w-[1500px] px-4 py-6 sm:px-6 lg:py-8">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[300px_minmax(0,1fr)] xl:grid-cols-[330px_minmax(0,1fr)]">
          {/* Desktop & Mobile Responsive Sidebar */}
          <aside
            className={`fixed inset-y-0 left-0 z-50 w-80 transform border-r border-cyan-500/15 bg-[#071322] p-5 shadow-2xl backdrop-blur-2xl transition-transform duration-300 ease-in-out lg:static lg:z-auto lg:w-full lg:transform-none lg:rounded-2xl lg:border lg:border-white/10 lg:p-4 lg:shadow-none ${
              mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
            }`}
          >
            {/* Sidebar Mobile Close */}
            <div className="mb-4 flex items-center justify-between border-b border-white/[0.08] pb-3 lg:hidden">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-cyan-300">
                Course Curriculum
              </span>
              <button
                className="grid size-8 place-items-center rounded-lg border border-white/15 bg-white/[0.04] text-slate-300"
                onClick={() => setMobileSidebarOpen(false)}
                type="button"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Sidebar Header */}
            <div className="mb-4 hidden items-center justify-between border-b border-white/[0.08] pb-3 lg:flex">
              <div>
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-cyan-300">
                  CURRICULUM
                </span>
                <h2 className="text-sm font-bold text-white">6 Modules • 23 Lessons</h2>
              </div>
              <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2 py-0.5 font-mono text-[10px] font-bold text-cyan-300">
                {overallPercentage}% Done
              </span>
            </div>

            {/* Modules List */}
            <nav aria-label="Course lessons navigation" className="space-y-4 max-h-[calc(100vh-180px)] overflow-y-auto pr-1">
              {esp32CourseModules.map((module) => {
                const modProgress = getModuleProgress(module.id)
                const isCollapsed = collapsedModules[module.id]
                const isCurrentModule = currentModuleId === module.id || currentModuleId === module.slug

                return (
                  <div
                    className={`overflow-hidden rounded-xl border transition-all ${
                      isCurrentModule
                        ? 'border-cyan-500/40 bg-[#09182b]'
                        : 'border-white/[0.06] bg-[#06101c]/80'
                    }`}
                    key={module.id}
                  >
                    {/* Module Accordion Header */}
                    <button
                      className="flex w-full items-center justify-between p-3 text-left transition hover:bg-white/[0.03]"
                      onClick={() => toggleModuleCollapse(module.id)}
                      type="button"
                    >
                      <div className="min-w-0 flex-1 pr-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10px] font-bold text-cyan-400">
                            MOD 0{module.moduleNumber}
                          </span>
                          {modProgress.isComplete && (
                            <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400">
                              <CheckCircle2 className="size-3" />
                              <span>Complete</span>
                            </span>
                          )}
                        </div>
                        <h3 className="truncate text-xs font-bold text-white mt-0.5">
                          {module.title}
                        </h3>
                        <div className="mt-1 flex items-center gap-2 text-[10px] font-mono text-slate-400">
                          <span>{modProgress.completed}/{modProgress.total} lessons</span>
                          <span>•</span>
                          <span>{modProgress.percentage}%</span>
                        </div>
                      </div>

                      {isCollapsed ? (
                        <ChevronDown className="size-4 shrink-0 text-slate-400" />
                      ) : (
                        <ChevronRight className="size-4 shrink-0 text-cyan-300" />
                      )}
                    </button>

                    {/* Module Lessons Sub-list */}
                    {!isCollapsed && (
                      <div className="border-t border-white/[0.06] bg-[#050c16]/90 p-1.5 space-y-1">
                        {module.lessons.map((lesson, idx) => {
                          const isCompleted = isLessonCompleted(lesson.slug)
                          const isCurrent = currentLessonSlug === lesson.slug

                          return (
                            <Link
                              className={`group flex items-start gap-2.5 rounded-lg px-2.5 py-2 text-xs transition ${
                                isCurrent
                                  ? 'border border-cyan-400/50 bg-cyan-500/15 font-semibold text-cyan-200 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]'
                                  : 'text-slate-300 hover:bg-white/[0.05] hover:text-white'
                              }`}
                              href={`/esp32-learning/${module.slug}/${lesson.slug}`}
                              key={lesson.id}
                              onClick={() => setMobileSidebarOpen(false)}
                            >
                              <span className="mt-0.5 shrink-0">
                                {isCompleted ? (
                                  <CheckCircle2 className="size-3.5 text-emerald-400" />
                                ) : (
                                  <span className="grid size-3.5 place-items-center rounded-full border border-slate-600 font-mono text-[9px] text-slate-500">
                                    {idx + 1}
                                  </span>
                                )}
                              </span>
                              <span className="min-w-0 flex-1 leading-snug">
                                {lesson.title}
                              </span>
                            </Link>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )
              })}

              {/* Reset Progress Helper */}
              <div className="pt-2 text-center">
                <button
                  className="inline-flex items-center gap-1.5 text-[11px] font-mono text-slate-500 hover:text-rose-400 transition"
                  onClick={() => {
                    if (confirm('Are you sure you want to reset your course progress?')) {
                      resetProgress()
                    }
                  }}
                  type="button"
                >
                  <RotateCcw className="size-3" />
                  <span>Reset Course Progress</span>
                </button>
              </div>
            </nav>
          </aside>

          {/* Main Content Area */}
          <main className="min-w-0 flex-1">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
