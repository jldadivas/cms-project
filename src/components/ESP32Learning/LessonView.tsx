'use client'

import React from 'react'
import Link from 'next/link'
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Layers,
  Sparkles,
  AlertTriangle,
  Lightbulb,
  Check,
  Terminal,
  Cpu,
} from 'lucide-react'
import type { CourseModule, Lesson } from '@/data/esp32-course-data'
import { useCourseProgress } from './useCourseProgress'
import { InteractiveCodeBlock } from './InteractiveCodeBlock'
import { ESP32PinoutDiagram } from './Diagrams/ESP32PinoutDiagram'
import { CirkitSchematicViewer } from './CirkitSchematicViewer'
import { OBSVideoPlayer } from './OBSVideoPlayer'
import {
  VL53L0XWiringDiagram,
  BH1750WiringDiagram,
  SoilMoistureWiringDiagram,
  UnifiedCircuitDiagram,
  EndToEndSystemDiagram,
} from './Diagrams/CircuitDiagrams'

interface LessonViewProps {
  module: CourseModule
  lesson: Lesson
  previousLesson?: { moduleSlug: string; lessonSlug: string; title: string } | null
  nextLesson?: { moduleSlug: string; lessonSlug: string; title: string } | null
  isLastLessonInModule: boolean
}

export function LessonView({
  module,
  lesson,
  previousLesson,
  nextLesson,
  isLastLessonInModule,
}: LessonViewProps) {
  const { isLessonCompleted, toggleLessonComplete } = useCourseProgress()
  const completed = isLessonCompleted(lesson.slug)

  // Render diagram helper
  const renderDiagram = () => {
    switch (lesson.diagramType) {
      case 'esp32-pinout':
        return <ESP32PinoutDiagram />
      case 'vl53l0x-wiring':
        return <VL53L0XWiringDiagram />
      case 'bh1750-wiring':
        return <BH1750WiringDiagram />
      case 'soil-wiring':
        return <SoilMoistureWiringDiagram />
      case 'unified-wiring':
        return <UnifiedCircuitDiagram />
      case 'cirkit-schematic':
        return <CirkitSchematicViewer />
      case 'obs-video':
        return <OBSVideoPlayer />
      case 'system-flow':
        return <EndToEndSystemDiagram />
      default:
        return null
    }
  }

  return (
    <article className="space-y-8 animate-in fade-in duration-300">
      {/* Lesson Hero Header */}
      <div className="rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-[#091524] via-[#071322] to-[#050e18] p-6 shadow-2xl backdrop-blur-xl sm:p-10">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-cyan-400">
              MODULE 0{module.moduleNumber}: {module.title.toUpperCase()}
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-slate-300">
            <span className="flex items-center gap-1">
              <Clock className="size-3.5 text-cyan-400" />
              {lesson.estimatedMinutes} mins
            </span>
            <span>•</span>
            <span
              className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase ${
                lesson.difficulty === 'Beginner'
                  ? 'border border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                  : lesson.difficulty === 'Intermediate'
                  ? 'border border-cyan-500/30 bg-cyan-500/10 text-cyan-300'
                  : 'border border-purple-500/30 bg-purple-500/10 text-purple-300'
              }`}
            >
              {lesson.difficulty}
            </span>
          </div>
        </div>

        <h1 className="mt-4 text-2xl font-black tracking-tight text-white sm:text-4xl">
          {lesson.title}
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-300 sm:text-base">
          {lesson.shortDescription}
        </p>

        {/* Action Button: Mark Complete */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition shadow-lg ${
              completed
                ? 'border border-emerald-500/50 bg-emerald-500/20 text-emerald-200 shadow-emerald-500/10'
                : 'border border-cyan-400/50 bg-cyan-500/15 text-cyan-200 hover:bg-cyan-500/25 shadow-cyan-500/15'
            }`}
            onClick={() => toggleLessonComplete(lesson.slug)}
            type="button"
          >
            {completed ? (
              <>
                <CheckCircle2 className="size-4 text-emerald-400" />
                <span>Lesson Completed</span>
              </>
            ) : (
              <>
                <Check className="size-4 text-cyan-300" />
                <span>Mark Lesson as Complete</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Lesson Detailed Overview */}
      <section className="glass-card rounded-2xl p-6 sm:p-8">
        <h2 className="text-lg font-bold text-white sm:text-xl flex items-center gap-2">
          <Lightbulb className="size-5 text-cyan-400" />
          Lesson Deep Dive &amp; Core Principles
        </h2>
        <div className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-300 sm:text-base">
          {lesson.overview}
        </div>
      </section>

      {/* Why This Step Is Necessary Box */}
      {lesson.whyImportant && (
        <aside className="rounded-2xl border border-cyan-400/30 bg-cyan-950/25 p-5 text-xs sm:text-sm leading-relaxed text-slate-200 backdrop-blur-md">
          <div className="flex items-center gap-2 font-bold text-cyan-300 uppercase tracking-wider text-xs mb-1.5">
            <Sparkles className="size-4" /> Why This Concept Matters
          </div>
          <p>{lesson.whyImportant}</p>
        </aside>
      )}

      {/* Key Takeaways Checklist */}
      {lesson.keyTakeaways && lesson.keyTakeaways.length > 0 && (
        <section className="rounded-2xl border border-white/10 bg-[#06101c] p-6 sm:p-8">
          <h3 className="text-base font-bold text-white sm:text-lg">Key Engineering Takeaways</h3>
          <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {lesson.keyTakeaways.map((point, idx) => (
              <li
                className="flex items-start gap-3 rounded-xl border border-white/[0.05] bg-white/[0.02] p-3 text-xs leading-relaxed text-slate-300"
                key={idx}
              >
                <CheckCircle2 className="size-4 shrink-0 text-cyan-400 mt-0.5" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Render Architectural Diagram if defined */}
      {lesson.diagramType && (
        <section>
          {renderDiagram()}
        </section>
      )}

      {/* Step-by-Step Practical Instructions */}
      {lesson.steps && lesson.steps.length > 0 && (
        <section className="glass-card rounded-2xl p-6 sm:p-8">
          <div className="border-b border-white/[0.08] pb-4">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-cyan-300">
              HANDS-ON EXECUTION
            </span>
            <h3 className="text-lg font-bold text-white sm:text-xl">
              Step-by-Step Implementation Guide
            </h3>
          </div>

          <ol className="mt-6 space-y-6">
            {lesson.steps.map((step) => (
              <li
                className="grid gap-4 md:grid-cols-[3.5rem_minmax(0,1fr)] items-start border-b border-white/[0.06] pb-6 last:border-b-0"
                key={step.stepNumber}
              >
                <span className="grid size-11 place-items-center rounded-2xl bg-cyan-400/10 font-mono text-base font-bold text-cyan-200 ring-1 ring-cyan-400/30">
                  0{step.stepNumber}
                </span>
                <div>
                  <h4 className="text-base font-bold text-white">{step.title}</h4>
                  <p className="mt-2 text-xs leading-relaxed text-slate-300 sm:text-sm">
                    {step.instruction}
                  </p>
                  {step.tip && (
                    <div className="mt-3 rounded-xl border border-cyan-500/20 bg-cyan-950/20 p-3 text-xs text-cyan-200">
                      <strong>Pro-Tip:</strong> {step.tip}
                    </div>
                  )}
                  {step.warning && (
                    <div className="mt-3 rounded-xl border border-rose-500/30 bg-rose-950/20 p-3 text-xs text-rose-200">
                      <strong>Caution:</strong> {step.warning}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* Hardware Wiring Pin Table */}
      {lesson.wiringTable && (
        <section className="glass-card rounded-2xl p-6 sm:p-8">
          <div className="border-b border-white/[0.08] pb-4">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-cyan-300">
              PINOUT MAPPING TABLE
            </span>
            <h3 className="text-lg font-bold text-white sm:text-xl">
              {lesson.wiringTable.componentName} to ESP32 Pin Connections
            </h3>
            <span className="mt-1 inline-block rounded border border-rose-500/30 bg-rose-500/10 px-2.5 py-0.5 font-mono text-[11px] text-rose-300">
              Operating Voltage: {lesson.wiringTable.voltage}
            </span>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 uppercase text-[10px]">
                  <th className="pb-3 pr-4">Sensor Pin</th>
                  <th className="pb-3 pr-4">ESP32 Pin</th>
                  <th className="pb-3 pr-4">Pin Type</th>
                  <th className="pb-3 pr-4">Recommended Wire</th>
                  <th className="pb-3">Electrical Function</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.05]">
                {lesson.wiringTable.rows.map((row, idx) => (
                  <tr className="hover:bg-white/[0.02]" key={idx}>
                    <td className="py-3 pr-4 font-bold text-white">{row.sensorPin}</td>
                    <td className="py-3 pr-4 font-bold text-cyan-300">{row.esp32Pin}</td>
                    <td className="py-3 pr-4 text-slate-400">{row.pinType}</td>
                    <td className="py-3 pr-4">
                      {row.wireColorRecommendation && (
                        <span className="rounded bg-white/[0.06] px-2 py-0.5 text-[11px] text-slate-300">
                          {row.wireColorRecommendation}
                        </span>
                      )}
                    </td>
                    <td className="py-3 text-slate-300 font-sans text-xs">
                      {row.functionDescription}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {lesson.wiringTable.notes && (
            <p className="mt-4 text-xs text-slate-400 italic font-sans">
              * Note: {lesson.wiringTable.notes}
            </p>
          )}
        </section>
      )}

      {/* Code Blocks with Syntax Highlighting and Copy Code */}
      {lesson.codeBlocks && lesson.codeBlocks.length > 0 && (
        <section>
          <div className="mb-4">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-cyan-300">
              FIRMWARE &amp; SCRIPT EXAMPLES
            </span>
            <h3 className="text-xl font-bold text-white">
              Complete Working Code (Tested on Hardware)
            </h3>
          </div>
          {lesson.codeBlocks.map((block) => (
            <InteractiveCodeBlock item={block} key={block.id} />
          ))}
        </section>
      )}

      {/* Real-World Case Study / Practical Example */}
      {lesson.practicalExample && (
        <section className="rounded-2xl border border-white/10 bg-[#06111f] p-6 sm:p-8">
          <h4 className="text-base font-bold text-white flex items-center gap-2">
            <Terminal className="size-4 text-cyan-400" />
            Real-World Project Context
          </h4>
          <p className="mt-3 text-xs leading-relaxed text-slate-300 sm:text-sm">
            {lesson.practicalExample}
          </p>
        </section>
      )}

      {/* Troubleshooting Tips if present */}
      {lesson.troubleshootingTips && lesson.troubleshootingTips.length > 0 && (
        <section className="rounded-2xl border border-amber-500/25 bg-amber-950/15 p-6 sm:p-8">
          <div className="flex items-center gap-2 font-bold text-amber-300 text-sm mb-4">
            <AlertTriangle className="size-4" /> Common Errors &amp; Troubleshooting
          </div>
          <div className="space-y-4">
            {lesson.troubleshootingTips.map((tip, idx) => (
              <div
                className="rounded-xl border border-amber-500/20 bg-black/40 p-4 text-xs leading-relaxed"
                key={idx}
              >
                <div className="font-bold text-amber-200">Problem: {tip.problem}</div>
                <div className="mt-1 text-slate-300">
                  <strong className="text-slate-200">Cause:</strong> {tip.cause}
                </div>
                <div className="mt-1.5 font-semibold text-emerald-300">
                  <strong>Solution:</strong> {tip.solution}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}



      {/* Bottom Navigation: Previous / Next Lesson */}
      <nav
        aria-label="Previous and Next lesson navigation"
        className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6"
      >
        {previousLesson ? (
          <Link
            className="group flex max-w-[45%] items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3 text-xs transition hover:border-cyan-400/40 hover:bg-white/[0.08]"
            href={`/esp32-learning/${previousLesson.moduleSlug}/${previousLesson.lessonSlug}`}
          >
            <ChevronLeft className="size-5 shrink-0 text-cyan-400 transition-transform group-hover:-translate-x-1" />
            <div className="min-w-0">
              <span className="block text-[10px] font-mono uppercase text-slate-400">
                Previous Lesson
              </span>
              <span className="truncate font-semibold text-white block">
                {previousLesson.title}
              </span>
            </div>
          </Link>
        ) : (
          <div />
        )}

        {nextLesson ? (
          <Link
            className="group flex max-w-[45%] items-center gap-3 rounded-xl border border-cyan-500/30 bg-cyan-500/10 p-3 text-right text-xs transition hover:border-cyan-400 hover:bg-cyan-500/20"
            href={`/esp32-learning/${nextLesson.moduleSlug}/${nextLesson.lessonSlug}`}
          >
            <div className="min-w-0">
              <span className="block text-[10px] font-mono uppercase text-cyan-300">
                Next Lesson
              </span>
              <span className="truncate font-semibold text-white block">
                {nextLesson.title}
              </span>
            </div>
            <ChevronRight className="size-5 shrink-0 text-cyan-400 transition-transform group-hover:translate-x-1" />
          </Link>
        ) : (
          <Link
            className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-500 px-5 py-3 text-xs font-bold text-[#07121f] shadow-lg shadow-cyan-500/20 transition hover:brightness-110"
            href="/esp32-learning"
          >
            <span>Course Completed! Hub Overview</span>
            <CheckCircle2 className="size-4" />
          </Link>
        )}
      </nav>
    </article>
  )
}
