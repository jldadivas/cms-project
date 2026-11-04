'use client'

import Link from 'next/link'
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  BookOpenCheck,
  Check,
  CheckCircle2,
  Lightbulb,
  ListChecks,
  Terminal,
} from 'lucide-react'
import { InteractiveCodeBlock } from '@/components/ESP32Learning/InteractiveCodeBlock'
import type { RaspberryPiCourseModule } from '@/data/raspberry-pi-course-data'
import { useRaspberryPiProgress } from './useRaspberryPiProgress'

interface ModuleLessonProps {
  module: RaspberryPiCourseModule
  previousModule: RaspberryPiCourseModule | null
  nextModule: RaspberryPiCourseModule | null
}

export function RaspberryPiModuleLesson({
  module,
  previousModule,
  nextModule,
}: ModuleLessonProps) {
  const { progress, markModuleComplete } = useRaspberryPiProgress()
  const isComplete = progress.completedModules.includes(module.slug)

  return (
    <article className="space-y-7">
      <header className="overflow-hidden rounded-3xl border border-cyan-500/25 bg-gradient-to-br from-[#091524] via-[#071322] to-[#050e18] p-6 shadow-2xl sm:p-9">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-cyan-300">
            MODULE 0{module.moduleNumber} · RASPBERRY PI LEARNING CENTER
          </span>
          <span className="rounded-full border border-cyan-500/25 bg-cyan-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-cyan-200">
            {module.level}
          </span>
        </div>
        <h1 className="mt-5 text-3xl font-black tracking-tight text-white sm:text-4xl">
          {module.title}
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-300 sm:text-base">
          {module.description}
        </p>
        <button
          aria-pressed={isComplete}
          className={`mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-bold transition ${
            isComplete
              ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-200'
              : 'border-cyan-400/40 bg-cyan-500/15 text-cyan-100 hover:bg-cyan-500/25'
          }`}
          onClick={() => markModuleComplete(module.slug)}
          type="button"
        >
          {isComplete ? (
            <CheckCircle2 aria-hidden="true" className="size-4 text-emerald-300" />
          ) : (
            <Check aria-hidden="true" className="size-4" />
          )}
          {isComplete ? 'Lesson marked complete' : 'Mark lesson as complete'}
        </button>
      </header>

      <section className="rounded-2xl border border-white/10 bg-[#091524] p-5 sm:p-7">
        <div className="flex items-center gap-2">
          <BookOpenCheck aria-hidden="true" className="size-5 text-cyan-400" />
          <h2 className="text-lg font-bold text-white">Learning objectives</h2>
        </div>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {module.objectives.map((objective) => (
            <li
              className="flex items-start gap-2 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 text-sm leading-relaxed text-slate-300"
              key={objective}
            >
              <CheckCircle2 aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-cyan-400" />
              {objective}
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-white/10 bg-[#091524] p-5 sm:p-7">
        <div className="flex items-center gap-2">
          <ListChecks aria-hidden="true" className="size-5 text-cyan-400" />
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-cyan-300">
              MODULE CURRICULUM
            </p>
            <h2 className="text-lg font-bold text-white">What you will learn</h2>
          </div>
        </div>
        <ol className="mt-5 grid gap-3 md:grid-cols-2">
          {module.topics.map((topic, index) => (
            <li
              className="flex gap-3 rounded-xl border border-white/[0.07] bg-[#06101c] p-4"
              key={topic.title}
            >
              <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-cyan-500/10 font-mono text-xs font-bold text-cyan-300">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="text-sm font-semibold text-white">{topic.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-400">{topic.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="rounded-2xl border border-cyan-500/20 bg-[#091524] p-5 sm:p-7">
        <div className="flex items-center gap-2">
          <Lightbulb aria-hidden="true" className="size-5 text-cyan-400" />
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-cyan-300">
              HANDS-ON TUTORIAL
            </p>
            <h2 className="text-lg font-bold text-white">Build it step by step</h2>
          </div>
        </div>
        <ol className="mt-5 space-y-4">
          {module.tutorialSteps.map((step, index) => (
            <li className="flex gap-3" key={step.title}>
              <span className="grid size-8 shrink-0 place-items-center rounded-xl border border-cyan-400/25 bg-cyan-500/10 font-mono text-xs font-bold text-cyan-200">
                {index + 1}
              </span>
              <div className="rounded-xl border border-white/[0.07] bg-[#06101c] p-4">
                <h3 className="text-sm font-semibold text-white">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-300">{step.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="rounded-2xl border border-white/10 bg-[#091524] p-5 sm:p-7">
        <div className="flex items-center gap-2">
          <span className="grid size-8 place-items-center rounded-lg bg-cyan-500/10 text-cyan-300">
            <Terminal aria-hidden="true" className="size-4" />
          </span>
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-cyan-300">
              FOLLOW THE DATA
            </p>
            <h2 className="text-lg font-bold text-white">System diagram</h2>
          </div>
        </div>
        <ol aria-label={`${module.title} data flow`} className="mt-5 flex flex-wrap items-center gap-2">
          {module.diagram.map((step, index) => (
            <li className="flex items-center gap-2" key={step}>
              <span className="rounded-xl border border-cyan-400/20 bg-[#06101c] px-3 py-2 text-center text-xs font-semibold text-cyan-100">
                {step}
              </span>
              {index < module.diagram.length - 1 && (
                <>
                  <ArrowRight aria-hidden="true" className="hidden size-4 shrink-0 text-cyan-500 sm:block" />
                  <ArrowDown aria-hidden="true" className="size-4 shrink-0 text-cyan-500 sm:hidden" />
                </>
              )}
            </li>
          ))}
        </ol>
      </section>

      <section>
        <div className="mb-3">
          <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-cyan-300">
            PROJECT EXAMPLES
          </p>
          <h2 className="text-xl font-bold text-white">Commands and code</h2>
          <p className="mt-1 text-sm text-slate-400">
            Copy an example and adapt it to your Raspberry Pi address and project settings.
          </p>
        </div>
        {module.codeBlocks.map((item) => (
          <InteractiveCodeBlock item={item} key={item.id} />
        ))}
      </section>

      <nav
        aria-label="Previous and next lesson"
        className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5"
      >
        {previousModule ? (
          <Link
            className="inline-flex max-w-[48%] items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-3 text-sm text-slate-200 transition hover:border-cyan-400/30 hover:bg-white/[0.06]"
            href={`/raspberry-pi-learning/${previousModule.slug}`}
          >
            <ArrowLeft aria-hidden="true" className="size-4 shrink-0 text-cyan-400" />
            <span className="min-w-0">
              <span className="block text-[10px] uppercase text-slate-400">Previous lesson</span>
              <span className="block truncate font-semibold">{previousModule.title}</span>
            </span>
          </Link>
        ) : (
          <span />
        )}
        {nextModule ? (
          <Link
            className="inline-flex max-w-[48%] items-center gap-2 rounded-xl border border-cyan-500/30 bg-cyan-500/10 p-3 text-sm text-cyan-100 transition hover:bg-cyan-500/20"
            href={`/raspberry-pi-learning/${nextModule.slug}`}
          >
            <span className="min-w-0 text-right">
              <span className="block text-[10px] uppercase text-cyan-300/70">Next lesson</span>
              <span className="block truncate font-semibold">{nextModule.title}</span>
            </span>
            <ArrowRight aria-hidden="true" className="size-4 shrink-0 text-cyan-300" />
          </Link>
        ) : (
          <Link
            className="inline-flex items-center gap-2 rounded-xl border border-cyan-500/30 bg-cyan-500/10 p-3 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-500/20"
            href="/raspberry-pi-learning"
          >
            Finish course
            <CheckCircle2 aria-hidden="true" className="size-4 text-cyan-300" />
          </Link>
        )}
      </nav>
    </article>
  )
}
