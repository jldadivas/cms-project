'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Highlight, themes } from 'prism-react-renderer'
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  Circle,
  Clock3,
  Copy,
  ExternalLink,
  GraduationCap,
  Layers3,
  ListChecks,
  Sparkles,
  Terminal,
  Trophy,
  Wrench,
} from 'lucide-react'
import {
  capacitorFinalAssessment,
  capacitorLessons,
  capacitorLessonSlugs,
  type CapacitorLesson,
  type CapacitorQuizQuestion,
} from '@/data/capacitor-course-data'
import { mobileAppLessonSlugs } from '@/data/mobile-app-course-data'
import { useMobileLearningProgress } from '@/components/MobileAppLearning/useMobileLearningProgress'

const CAPACITOR_PROGRESS_SLUGS = [...mobileAppLessonSlugs, ...capacitorLessonSlugs]
const COURSE_PATH = '/mobile-app-learning/capacitor'

function CapacitorMark({ className = 'size-11' }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`grid shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-cyan-300 to-blue-500 shadow-lg shadow-cyan-500/20 ${className}`}
    >
      <svg className="size-7" fill="none" viewBox="0 0 32 32">
        <path d="M25 8.5a12 12 0 1 0 0 15" stroke="#07121f" strokeLinecap="round" strokeWidth="4" />
        <path d="m18 9-5 8h5l-3 7 8-10h-5l3-5Z" fill="#07121f" />
      </svg>
    </span>
  )
}

function CourseProgress({
  completed,
  total,
  loaded,
}: {
  completed: number
  total: number
  loaded: boolean
}) {
  const percent = total ? Math.round((completed / total) * 100) : 0

  return (
    <section
      aria-label="Capacitor course progress"
      className="rounded-2xl border border-white/10 bg-[#091524] p-5 sm:p-6"
    >
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-300">
            Your learning progress
          </p>
          <h2 className="mt-1 text-lg font-bold text-white">
            {loaded ? completed : 0} / {total} lessons completed
          </h2>
        </div>
        <span className="font-mono text-sm font-bold text-cyan-200">{percent}%</span>
      </div>
      <div
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={percent}
        className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800"
        role="progressbar"
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="mt-2 text-xs text-slate-400">
        Progress and quiz scores are saved in this browser with the existing mobile-learning progress.
      </p>
    </section>
  )
}

function FlowDiagram({ title, nodes }: { title: string; nodes: string[] }) {
  return (
    <figure className="rounded-2xl border border-cyan-500/20 bg-[#081625] p-5 sm:p-6">
      <figcaption className="flex items-center gap-2 text-sm font-bold text-white">
        <Layers3 aria-hidden="true" className="size-4 text-cyan-300" />
        {title}
      </figcaption>
      <ol className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
        {nodes.map((node, index) => (
          <li className="flex min-w-0 items-center gap-2" key={node}>
            <div className="flex min-h-[4.5rem] flex-1 items-center gap-3 rounded-xl border border-cyan-400/15 bg-[#06101c] p-3">
              <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-cyan-500/10 font-mono text-xs font-bold text-cyan-200">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="text-xs font-semibold leading-relaxed text-slate-200">{node}</span>
            </div>
            {index < nodes.length - 1 && (
              <ArrowRight aria-hidden="true" className="hidden size-4 shrink-0 text-cyan-400 xl:block" />
            )}
          </li>
        ))}
      </ol>
    </figure>
  )
}

export function CapacitorLearningDashboard() {
  const { completedLessons, isLoaded, lastVisitedSlug, quizScores } =
    useMobileLearningProgress(CAPACITOR_PROGRESS_SLUGS)
  const completed = capacitorLessonSlugs
    .filter((slug) => slug !== 'capacitor-final-assessment')
    .filter((slug) => completedLessons.includes(slug)).length
  const continueHref =
    lastVisitedSlug === 'capacitor-final-assessment'
      ? `${COURSE_PATH}/assessment`
      : `${COURSE_PATH}/${
          lastVisitedSlug && capacitorLessons.some((lesson) => lesson.slug === lastVisitedSlug)
            ? lastVisitedSlug
            : capacitorLessons[0].slug
        }`

  return (
    <main className="min-h-screen bg-[#07121f] px-4 py-6 text-[#e6f0fa] sm:px-6 lg:py-10">
      <div className="mx-auto max-w-7xl space-y-8">
        <Link
          className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 transition hover:text-cyan-100"
          href="/mobile-app-learning"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          Mobile App Development
        </Link>

        <header className="relative overflow-hidden rounded-[2rem] border border-cyan-400/20 bg-gradient-to-br from-[#0c2536] via-[#091827] to-[#07121f] p-6 shadow-2xl sm:p-10">
          <div aria-hidden="true" className="absolute -right-14 -top-20 size-72 rounded-full bg-cyan-400/[0.07] blur-3xl" />
          <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(260px,0.65fr)] lg:items-center">
            <div>
              <div className="flex items-center gap-4">
                <CapacitorMark className="size-14 rounded-2xl sm:size-16" />
                <div>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-300">
                    Interactive technology course
                  </p>
                  <p className="mt-1 text-xs text-slate-400">Ionic · Web · Android · iOS</p>
                </div>
              </div>
              <h1 className="mt-6 max-w-3xl text-3xl font-black tracking-tight text-white sm:text-5xl">
                Build mobile apps with <span className="text-cyan-300">Capacitor</span>
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
                Start with a web application you already know, package it in native Android and iOS
                projects, and connect device features through Capacitor plugins. Finish by building
                a live IoT sensor dashboard backed by FastAPI.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-300 to-sky-400 px-5 text-sm font-extrabold text-[#07121f] transition hover:brightness-110"
                  href={continueHref}
                >
                  {completed ? 'Continue learning' : 'Start the course'}
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
                <a
                  className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-4 text-sm font-semibold text-slate-200 transition hover:bg-white/[0.08]"
                  href="https://capacitorjs.com/docs"
                  rel="noreferrer"
                  target="_blank"
                >
                  Official documentation
                  <ExternalLink aria-hidden="true" className="size-3.5" />
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Guided lessons', value: '9' },
                { label: 'Estimated time', value: '6–8 hrs' },
                { label: 'Learning path', value: 'Beginner → Advanced' },
                { label: 'Final project', value: 'IoT dashboard' },
              ].map((item) => (
                <div className="rounded-2xl border border-white/10 bg-[#06111d]/80 p-4" key={item.label}>
                  <p className="font-mono text-[9px] uppercase tracking-wider text-slate-400">{item.label}</p>
                  <p className="mt-2 text-sm font-bold text-white sm:text-base">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </header>

        <CourseProgress completed={completed} loaded={isLoaded} total={capacitorLessons.length} />

        <section aria-labelledby="path-heading" className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)]">
          <div className="rounded-2xl border border-white/10 bg-[#091524] p-5 sm:p-7">
            <div className="flex items-center gap-2">
              <GraduationCap aria-hidden="true" className="size-5 text-cyan-300" />
              <h2 className="text-lg font-bold text-white" id="path-heading">Your learning path</h2>
            </div>
            <ol className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                { title: 'Understand the runtime', detail: 'Learn the WebView, bridge, and native project model.' },
                { title: 'Set up Android', detail: 'Install the tools, initialize Capacitor, and run a device build.' },
                { title: 'Add real capabilities', detail: 'Work with plugins, permissions, API calls, and error states.' },
                { title: 'Build a real project', detail: 'Package a tested Android app and create an IoT dashboard.' },
              ].map((item, index) => (
                <li className="flex gap-3 rounded-xl border border-white/[0.07] bg-[#06101c] p-4" key={item.title}>
                  <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-cyan-500/10 font-mono text-xs font-bold text-cyan-200">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-white">{item.title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-slate-400">{item.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#091524] p-5 sm:p-7">
            <div className="flex items-center gap-2">
              <Wrench aria-hidden="true" className="size-4 text-cyan-300" />
              <h2 className="text-lg font-bold text-white">Prerequisites &amp; tools</h2>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              {[
                'HTML, CSS, JavaScript, and basic npm familiarity',
                'Node.js 22+ and npm',
                'Android Studio with Android SDK and an emulator or Android phone',
                'A Mac with Xcode is required for local iOS builds',
                'A web app whose build creates a static index.html and assets',
              ].map((item) => (
                <li className="flex gap-2 rounded-lg border border-white/[0.06] bg-[#06101c] p-3" key={item}>
                  <CheckCircle2 aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-cyan-400" />
                  <span className="text-xs leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 rounded-xl border border-amber-400/15 bg-amber-400/[0.05] p-3 text-xs leading-relaxed text-amber-100/80">
              This Payload/Next.js website uses server features and is not itself a static Capacitor
              bundle. The course uses a Vite sample for build steps and explains hosted/server-based alternatives.
            </p>
          </div>
        </section>

        <section aria-labelledby="lessons-heading">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-300">9 guided lessons + final assessment</p>
              <h2 className="mt-1 text-2xl font-black text-white sm:text-3xl" id="lessons-heading">
                Capacitor from first project to IoT
              </h2>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-xs text-slate-300">
              <Clock3 aria-hidden="true" className="size-3.5 text-cyan-300" />
              About 6–8 hours
            </span>
          </div>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {capacitorLessons.map((lesson, index) => {
              const isComplete = completedLessons.includes(lesson.slug)
              const score = quizScores[lesson.slug]
              return (
                <Link
                  className="group flex min-h-48 flex-col rounded-2xl border border-white/10 bg-[#091524] p-5 transition hover:-translate-y-0.5 hover:border-cyan-400/40 hover:bg-[#0b1a2b]"
                  href={`${COURSE_PATH}/${lesson.slug}`}
                  key={lesson.slug}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-cyan-300">
                      Lesson {String(index + 1).padStart(2, '0')}
                    </span>
                    {isComplete ? (
                      <CheckCircle2 aria-label="Completed" className="size-4 text-emerald-300" />
                    ) : (
                      <span className="rounded-full border border-white/10 px-2 py-1 text-[9px] font-bold uppercase text-slate-400">
                        {lesson.level}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-4 text-base font-bold text-white group-hover:text-cyan-100">{lesson.title}</h3>
                  <p className="mt-2 flex-1 text-xs leading-relaxed text-slate-400">{lesson.summary}</p>
                  <div className="mt-4 flex items-center justify-between border-t border-white/[0.07] pt-3">
                    <span className="flex items-center gap-1.5 text-[10px] text-slate-400">
                      <Clock3 aria-hidden="true" className="size-3" /> {lesson.minutes} min
                      {score !== undefined ? ` · Best quiz ${score}%` : ''}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-cyan-300">
                      Open lesson <ArrowRight aria-hidden="true" className="size-3.5 transition group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>

        <FlowDiagram
          title="Web-to-mobile conversion workflow"
          nodes={['Build web app', 'Configure Capacitor', 'Sync Android / iOS', 'Test and package']}
        />

        <section className="grid gap-4 sm:grid-cols-2">
          <a
            className="group flex items-center justify-between rounded-2xl border border-cyan-500/20 bg-[#091524] p-5 transition hover:border-cyan-400/40"
            href="https://capacitorjs.com/docs"
            rel="noreferrer"
            target="_blank"
          >
            <span>
              <span className="block text-xs font-bold uppercase tracking-wider text-cyan-300">Official docs</span>
              <span className="mt-1 block text-sm font-bold text-white">Capacitor documentation</span>
            </span>
            <ExternalLink aria-hidden="true" className="size-4 text-cyan-300 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
          <Link
            className="group flex items-center justify-between rounded-2xl border border-cyan-500/20 bg-[#091524] p-5 transition hover:border-cyan-400/40"
            href={`${COURSE_PATH}/assessment`}
          >
            <span>
              <span className="block text-xs font-bold uppercase tracking-wider text-cyan-300">Course checkpoint</span>
              <span className="mt-1 block text-sm font-bold text-white">Take the final assessment</span>
            </span>
            <Trophy aria-hidden="true" className="size-5 text-amber-300 transition group-hover:scale-110" />
          </Link>
        </section>
      </div>
    </main>
  )
}

function CodePlayground({ lesson }: { lesson: CapacitorLesson }) {
  const [activeExample, setActiveExample] = useState(0)
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle')
  const example = lesson.examples[activeExample]

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(example.code)
      setCopyState('copied')
    } catch (error) {
      console.warn('Failed to copy Capacitor course code:', error)
      setCopyState('failed')
    }
    window.setTimeout(() => setCopyState('idle'), 2200)
  }

  return (
    <section aria-labelledby="playground-heading" className="overflow-hidden rounded-2xl border border-cyan-500/25 bg-[#091524] shadow-xl">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-white/[0.08] p-4 sm:px-6">
        <div>
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-300">Interactive code playground</p>
          <h2 className="mt-1 text-lg font-bold text-white" id="playground-heading">Explore the examples</h2>
        </div>
        <button
          className="inline-flex min-h-9 items-center gap-2 rounded-lg border border-white/15 bg-white/[0.04] px-3 text-xs font-semibold text-slate-200 transition hover:border-cyan-400/40 hover:text-white"
          onClick={copyCode}
          type="button"
        >
          {copyState === 'copied' ? <Check aria-hidden="true" className="size-3.5 text-emerald-300" /> : <Copy aria-hidden="true" className="size-3.5 text-cyan-300" />}
          {copyState === 'copied' ? 'Copied' : copyState === 'failed' ? 'Copy failed' : 'Copy code'}
        </button>
      </div>
      <div className="flex gap-2 overflow-x-auto border-b border-white/[0.06] p-3 [scrollbar-width:thin]">
        {lesson.examples.map((item, index) => (
          <button
            aria-pressed={activeExample === index}
            className={`shrink-0 rounded-lg px-3 py-2 text-xs font-semibold transition ${
              activeExample === index
                ? 'border border-cyan-400/30 bg-cyan-500/15 text-cyan-100'
                : 'border border-transparent text-slate-400 hover:bg-white/[0.05] hover:text-white'
            }`}
            key={item.title}
            onClick={() => {
              setActiveExample(index)
              setCopyState('idle')
            }}
            type="button"
          >
            {item.title}
          </button>
        ))}
      </div>
      <div className="border-b border-white/[0.06] bg-[#071322] px-4 py-2.5 sm:px-6">
        <p className="flex items-center gap-2 font-mono text-xs text-slate-300">
          <Terminal aria-hidden="true" className="size-3.5 text-cyan-300" /> {example.filename}
          <span className="rounded border border-cyan-500/20 px-1.5 py-0.5 text-[9px] uppercase text-cyan-200">{example.language}</span>
        </p>
        <p className="mt-2 text-xs leading-relaxed text-slate-300">{example.explanation}</p>
      </div>
      <Highlight code={example.code} language={example.language} theme={themes.vsDark}>
        {({ getLineProps, getTokenProps, tokens }) => (
          <pre className="max-h-[34rem] overflow-auto bg-[#050c14] p-4 text-xs leading-6 sm:p-6 sm:text-sm">
            {tokens.map((line, lineIndex) => (
              <div key={lineIndex} {...getLineProps({ className: 'table-row', line })}>
                <span className="table-cell select-none pr-5 text-right font-mono text-[10px] text-slate-600">{lineIndex + 1}</span>
                <span className="table-cell">
                  {line.map((token, tokenIndex) => (
                    <span key={tokenIndex} {...getTokenProps({ token })} />
                  ))}
                </span>
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      {example.expectedOutput && (
        <div className="border-t border-white/[0.08] bg-[#050e18]">
          <p className="border-b border-white/[0.05] px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-wider text-emerald-300 sm:px-6">Expected result</p>
          <pre className="overflow-x-auto whitespace-pre-wrap p-4 font-mono text-xs leading-relaxed text-emerald-200 sm:px-6">{example.expectedOutput}</pre>
        </div>
      )}
      <p aria-live="polite" className="sr-only">
        {copyState === 'copied' ? 'Code copied.' : copyState === 'failed' ? 'Could not copy code. Select the code and copy it manually.' : ''}
      </p>
    </section>
  )
}

function LessonQuiz({
  questions,
  score,
  onScore,
  title,
  passingScore,
}: {
  questions: CapacitorQuizQuestion[]
  score?: number
  onScore: (score: number) => void
  title: string
  passingScore?: number
}) {
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [submitted, setSubmitted] = useState(false)
  const correctCount = questions.reduce(
    (count, question, index) => count + (question.options[answers[index]]?.correct ? 1 : 0),
    0,
  )
  const scorePercent = Math.round((correctCount / questions.length) * 100)

  function submitQuiz() {
    if (Object.keys(answers).length !== questions.length) return
    setSubmitted(true)
    onScore(Math.round((correctCount / questions.length) * 100))
  }

  return (
    <section aria-labelledby="quiz-heading" className="rounded-2xl border border-cyan-500/25 bg-[#091524] p-5 sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-white/[0.08] pb-4">
        <div>
          <p className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-wider text-cyan-300">
            <ListChecks aria-hidden="true" className="size-4" /> Knowledge check
          </p>
          <h2 className="mt-1 text-lg font-bold text-white" id="quiz-heading">{title}</h2>
          <p className="mt-1 text-xs text-slate-400">Choose one answer for each question, then submit to see explanations.</p>
        </div>
        {score !== undefined && (
          <span className="rounded-full border border-emerald-400/20 bg-emerald-400/[0.06] px-3 py-1.5 text-xs font-bold text-emerald-200">
            Best score {score}%
          </span>
        )}
      </div>
      <div className="mt-5 space-y-5">
        {questions.map((question, questionIndex) => (
          <fieldset className="rounded-xl border border-white/[0.08] bg-[#06101c] p-4" key={question.question}>
            <legend className="max-w-full px-1 text-sm font-semibold leading-relaxed text-white">
              <span className="mr-2 font-mono text-cyan-300">Q{questionIndex + 1}</span>
              <span className="mr-2 rounded border border-white/10 px-1.5 py-0.5 align-middle text-[9px] font-bold uppercase tracking-wide text-slate-400">{question.type}</span>
              {question.question}
            </legend>
            <div className="mt-3 space-y-2">
              {question.options.map((option, optionIndex) => {
                const selected = answers[questionIndex] === optionIndex
                const style = submitted
                  ? option.correct
                    ? 'border-emerald-500/50 bg-emerald-500/[0.07] text-emerald-100'
                    : selected
                      ? 'border-rose-500/50 bg-rose-500/[0.06] text-rose-100'
                      : 'border-white/[0.05] text-slate-500'
                  : selected
                    ? 'border-cyan-400/50 bg-cyan-500/[0.08] text-cyan-100'
                    : 'border-white/[0.08] text-slate-300 hover:border-cyan-400/30 hover:bg-white/[0.03]'
                return (
                  <label className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 text-xs leading-relaxed transition ${style} ${submitted ? 'cursor-default' : ''}`} key={option.label}>
                    <input
                      checked={selected}
                      className="mt-0.5 accent-cyan-400"
                      disabled={submitted}
                      name={`capacitor-quiz-${questionIndex}`}
                      onChange={() => setAnswers((current) => ({ ...current, [questionIndex]: optionIndex }))}
                      type="radio"
                    />
                    <span className="min-w-0 flex-1">
                      <span>{option.label}</span>
                      {submitted && (option.correct || selected) && (
                        <span className={`mt-1 block ${option.correct ? 'text-emerald-200' : 'text-rose-200'}`}>{option.feedback}</span>
                      )}
                    </span>
                    {submitted && option.correct && <CheckCircle2 aria-hidden="true" className="size-4 shrink-0 text-emerald-300" />}
                  </label>
                )
              })}
            </div>
          </fieldset>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.08] pt-4">
        {submitted ? (
          <>
            <p aria-live="polite" className="text-sm font-semibold text-white">
              Score: <span className={correctCount === questions.length ? 'text-emerald-300' : 'text-cyan-200'}>{correctCount}/{questions.length} ({scorePercent}%)</span>
              {passingScore !== undefined && (
                <span className={`ml-2 ${scorePercent >= passingScore ? 'text-emerald-300' : 'text-amber-200'}`}>
                  {scorePercent >= passingScore ? 'Passed' : `Keep practicing — ${passingScore}% required`}
                </span>
              )}
              <span className="ml-2 text-xs font-normal text-slate-400">Your best score is saved in this browser.</span>
            </p>
            <button
              className="rounded-lg border border-white/15 px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-white/[0.06]"
              onClick={() => {
                setSubmitted(false)
                setAnswers({})
              }}
              type="button"
            >
              Try again
            </button>
          </>
        ) : (
          <>
            <p className="text-xs text-slate-400">{Object.keys(answers).length}/{questions.length} answered</p>
            <button
              className="min-h-10 rounded-xl bg-gradient-to-r from-cyan-300 to-sky-400 px-4 text-xs font-extrabold text-[#07121f] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
              disabled={Object.keys(answers).length !== questions.length}
              onClick={submitQuiz}
              type="button"
            >
              Submit answers
            </button>
          </>
        )}
      </div>
    </section>
  )
}

function LessonSidebar({
  currentSlug,
  completedLessons,
  quizScores,
}: {
  currentSlug: string
  completedLessons: string[]
  quizScores: Record<string, number>
}) {
  return (
    <aside className="rounded-2xl border border-white/10 bg-[#091524] p-4 lg:sticky lg:top-24">
      <div className="mb-3 flex items-center gap-2 border-b border-white/[0.08] pb-3">
        <BookOpen aria-hidden="true" className="size-4 text-cyan-300" />
        <h2 className="text-sm font-bold text-white">Capacitor lessons</h2>
      </div>
      <nav aria-label="Capacitor course lessons" className="max-h-[45vh] space-y-1 overflow-y-auto pr-1 lg:max-h-[calc(100vh-12rem)]">
        {capacitorLessons.map((lesson, index) => {
          const current = lesson.slug === currentSlug
          const complete = completedLessons.includes(lesson.slug)
          return (
            <Link
              aria-current={current ? 'page' : undefined}
              className={`flex items-start gap-2 rounded-lg px-2 py-2 text-xs leading-snug transition ${
                current ? 'border border-cyan-400/30 bg-cyan-500/10 font-semibold text-cyan-100' : 'text-slate-300 hover:bg-white/[0.05]'
              }`}
              href={`${COURSE_PATH}/${lesson.slug}`}
              key={lesson.slug}
            >
              {complete ? (
                <CheckCircle2 aria-hidden="true" className="mt-0.5 size-3.5 shrink-0 text-emerald-300" />
              ) : (
                <Circle aria-hidden="true" className="mt-0.5 size-3.5 shrink-0 text-slate-600" />
              )}
              <span className="min-w-0 flex-1">
                <span className="mr-1 font-mono text-[9px] text-cyan-400">{String(index + 1).padStart(2, '0')}</span>
                {lesson.title}
                {quizScores[lesson.slug] !== undefined && (
                  <span className="mt-1 block text-[9px] text-slate-500">Best quiz: {quizScores[lesson.slug]}%</span>
                )}
              </span>
            </Link>
          )
        })}
        <Link
          className={`flex items-center gap-2 rounded-lg px-2 py-2 text-xs transition ${
            currentSlug === 'assessment' ? 'border border-amber-400/30 bg-amber-400/[0.07] text-amber-100' : 'text-slate-300 hover:bg-white/[0.05]'
          }`}
          href={`${COURSE_PATH}/assessment`}
        >
          <Trophy aria-hidden="true" className="size-3.5 text-amber-300" />
          Final assessment
          {quizScores['capacitor-final-assessment'] !== undefined && (
            <span className="ml-auto text-[9px] text-slate-500">{quizScores['capacitor-final-assessment']}%</span>
          )}
        </Link>
      </nav>
    </aside>
  )
}

export function CapacitorLessonPage({ lesson }: { lesson: CapacitorLesson }) {
  const index = capacitorLessons.findIndex((item) => item.slug === lesson.slug)
  const previous = capacitorLessons[index - 1]
  const next = capacitorLessons[index + 1]
  const {
    completedLessons,
    isLoaded,
    quizScores,
    toggleLesson,
    recordQuizScore,
    setLastVisitedSlug,
  } = useMobileLearningProgress(CAPACITOR_PROGRESS_SLUGS)
  const complete = completedLessons.includes(lesson.slug)

  useEffect(() => {
    setLastVisitedSlug(lesson.slug)
  }, [lesson.slug, setLastVisitedSlug])

  return (
    <main className="min-h-screen bg-[#07121f] px-4 py-6 text-[#e6f0fa] sm:px-6 lg:py-9">
      <div className="mx-auto max-w-7xl">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <Link className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 hover:text-cyan-100" href={COURSE_PATH}>
            <ArrowLeft aria-hidden="true" className="size-4" /> Capacitor Learning Hub
          </Link>
          <span className="font-mono text-xs text-slate-400">
            {isLoaded ? completedLessons.filter((slug) => capacitorLessonSlugs.includes(slug)).length : 0}/{capacitorLessons.length} lessons complete
          </span>
        </div>
        <div className="grid items-start gap-6 lg:grid-cols-[290px_minmax(0,1fr)]">
          <LessonSidebar currentSlug={lesson.slug} completedLessons={completedLessons} quizScores={quizScores} />
          <article className="min-w-0 space-y-6">
            <header className="rounded-3xl border border-cyan-500/25 bg-gradient-to-br from-[#0b2031] via-[#091524] to-[#050e18] p-5 shadow-2xl sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-cyan-300 sm:text-xs">
                  Capacitor · Lesson {String(index + 1).padStart(2, '0')} of {capacitorLessons.length}
                </span>
                <span className="rounded-full border border-cyan-500/25 bg-cyan-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-cyan-200">
                  {lesson.level} · {lesson.minutes} min
                </span>
              </div>
              <h1 className="mt-5 text-2xl font-black tracking-tight text-white sm:text-4xl">{lesson.title}</h1>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-300 sm:text-base">{lesson.summary}</p>
              <button
                aria-pressed={complete}
                className={`mt-5 inline-flex min-h-10 items-center gap-2 rounded-xl border px-4 py-2 text-sm font-bold transition ${
                  complete ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-200' : 'border-cyan-400/40 bg-cyan-500/15 text-cyan-100 hover:bg-cyan-500/25'
                }`}
                onClick={() => toggleLesson(lesson.slug)}
                type="button"
              >
                {complete ? <CheckCircle2 aria-hidden="true" className="size-4 text-emerald-300" /> : <Check aria-hidden="true" className="size-4" />}
                {complete ? 'Lesson completed' : 'Mark lesson complete'}
              </button>
            </header>

            <section className="rounded-2xl border border-white/10 bg-[#091524] p-5 sm:p-7">
              <h2 className="text-lg font-bold text-white">Learning objectives</h2>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {lesson.objectives.map((objective) => (
                  <li className="flex items-start gap-2 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 text-xs leading-relaxed text-slate-300" key={objective}>
                    <CheckCircle2 aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-cyan-400" />
                    {objective}
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-2xl border border-white/10 bg-[#091524] p-5 sm:p-7">
              <div className="flex items-center gap-2">
                <Wrench aria-hidden="true" className="size-4 text-cyan-300" />
                <h2 className="text-lg font-bold text-white">Prerequisites</h2>
              </div>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {lesson.prerequisites.map((item) => (
                  <li className="rounded-xl border border-white/[0.06] bg-[#06101c] p-3 text-xs leading-relaxed text-slate-300" key={item}>{item}</li>
                ))}
              </ul>
            </section>

            {lesson.sections.map((section) => (
              <section className="rounded-2xl border border-white/10 bg-[#091524] p-5 sm:p-7" key={section.title}>
                <h2 className="text-lg font-bold text-white">{section.title}</h2>
                <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-300">{section.body}</p>
                {section.bullets && (
                  <ul className="mt-4 space-y-2">
                    {section.bullets.map((bullet) => (
                      <li className="flex gap-2 text-xs leading-relaxed text-slate-300" key={bullet}>
                        <span aria-hidden="true" className="mt-1.5 size-1.5 shrink-0 rounded-full bg-cyan-400" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
                {section.note && (
                  <p className="mt-4 rounded-xl border border-amber-400/20 bg-amber-400/[0.05] p-4 text-xs leading-relaxed text-amber-100/90">{section.note}</p>
                )}
              </section>
            ))}

            <FlowDiagram title={lesson.diagram.title} nodes={lesson.diagram.nodes} />

            <section className="rounded-2xl border border-cyan-500/20 bg-[#091524] p-5 sm:p-7">
              <h2 className="text-lg font-bold text-white">Step-by-step tutorial</h2>
              <ol className="mt-4 space-y-3">
                {lesson.steps.map((step, stepIndex) => (
                  <li className="flex gap-3" key={step.title}>
                    <span className="grid size-8 shrink-0 place-items-center rounded-xl border border-cyan-400/25 bg-cyan-500/10 font-mono text-xs font-bold text-cyan-200">{stepIndex + 1}</span>
                    <div className="min-w-0 flex-1 rounded-xl border border-white/[0.07] bg-[#06101c] p-4">
                      <h3 className="text-sm font-semibold text-white">{step.title}</h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-slate-300">{step.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <CodePlayground lesson={lesson} />

            <section className="rounded-2xl border border-emerald-500/20 bg-[#091524] p-5 sm:p-7">
              <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-emerald-300">Hands-on activity</p>
              <h2 className="mt-1 text-lg font-bold text-white">Try it yourself</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">{lesson.activity}</p>
            </section>

            <LessonQuiz
              onScore={(score) => recordQuizScore(lesson.slug, score)}
              questions={lesson.quiz}
              score={quizScores[lesson.slug]}
              title={`${lesson.title} quiz`}
            />

            <section className="rounded-2xl border border-white/10 bg-[#091524] p-5 sm:p-7">
              <h2 className="text-sm font-bold text-white">Official documentation for this lesson</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {lesson.docs.map((doc) => (
                  <a
                    className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-3 text-xs font-semibold text-cyan-200 transition hover:border-cyan-400/30 hover:bg-cyan-500/[0.06]"
                    href={doc.href}
                    key={doc.href}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {doc.label}<ExternalLink aria-hidden="true" className="size-3" />
                  </a>
                ))}
              </div>
            </section>

            <nav aria-label="Previous and next lesson" className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5">
              {previous ? (
                <Link className="inline-flex max-w-[48%] items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-3 text-xs text-slate-200 transition hover:border-cyan-400/30" href={`${COURSE_PATH}/${previous.slug}`}>
                  <ArrowLeft aria-hidden="true" className="size-4 shrink-0 text-cyan-400" />
                  <span className="min-w-0"><span className="block text-[9px] uppercase text-slate-400">Previous</span><span className="block truncate font-semibold">{previous.title}</span></span>
                </Link>
              ) : <span />}
              {next ? (
                <Link className="inline-flex max-w-[48%] items-center gap-2 rounded-xl border border-cyan-500/30 bg-cyan-500/10 p-3 text-xs text-cyan-100 transition hover:bg-cyan-500/20" href={`${COURSE_PATH}/${next.slug}`}>
                  <span className="min-w-0 text-right"><span className="block text-[9px] uppercase text-cyan-300/70">Next lesson</span><span className="block truncate font-semibold">{next.title}</span></span>
                  <ArrowRight aria-hidden="true" className="size-4 shrink-0 text-cyan-300" />
                </Link>
              ) : (
                <Link className="inline-flex items-center gap-2 rounded-xl border border-amber-400/25 bg-amber-400/[0.06] p-3 text-xs font-semibold text-amber-100 transition hover:bg-amber-400/10" href={`${COURSE_PATH}/assessment`}>
                  Take final assessment <Trophy aria-hidden="true" className="size-4 text-amber-300" />
                </Link>
              )}
            </nav>
          </article>
        </div>
      </div>
    </main>
  )
}

export function CapacitorAssessmentPage() {
  const {
    completedLessons,
    isLoaded,
    quizScores,
    recordQuizScore,
    setLastVisitedSlug,
  } = useMobileLearningProgress(CAPACITOR_PROGRESS_SLUGS)

  useEffect(() => {
    setLastVisitedSlug('capacitor-final-assessment')
  }, [setLastVisitedSlug])

  const completed = capacitorLessons.filter((lesson) => completedLessons.includes(lesson.slug)).length

  return (
    <main className="min-h-screen bg-[#07121f] px-4 py-6 text-[#e6f0fa] sm:px-6 lg:py-9">
      <div className="mx-auto max-w-7xl">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <Link className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 hover:text-cyan-100" href={COURSE_PATH}>
            <ArrowLeft aria-hidden="true" className="size-4" /> Capacitor Learning Hub
          </Link>
          <span className="font-mono text-xs text-slate-400">{isLoaded ? completed : 0}/{capacitorLessons.length} lessons complete</span>
        </div>
        <div className="grid items-start gap-6 lg:grid-cols-[290px_minmax(0,1fr)]">
          <LessonSidebar currentSlug="assessment" completedLessons={completedLessons} quizScores={quizScores} />
          <article className="min-w-0 space-y-6">
            <header className="rounded-3xl border border-amber-400/20 bg-gradient-to-br from-[#242016] via-[#111722] to-[#07121f] p-6 sm:p-9">
              <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-xl border border-amber-300/20 bg-amber-300/[0.08] text-amber-200">
                  <Trophy aria-hidden="true" className="size-5" />
                </span>
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-amber-200">Course completion checkpoint</p>
              </div>
              <h1 className="mt-5 text-3xl font-black text-white sm:text-4xl">Capacitor final assessment</h1>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-300">
                Review the workflow from web build to native app, device permissions, network APIs,
                and the IoT data path. Your best score is saved with the existing mobile-learning progress.
              </p>
              <div className="mt-5 flex flex-wrap gap-2 text-xs text-slate-300">
                <span className="rounded-lg border border-white/10 px-3 py-2">{completed}/{capacitorLessons.length} lessons marked complete</span>
                <span className="rounded-lg border border-white/10 px-3 py-2">Pass target: 75%</span>
              </div>
            </header>
            <LessonQuiz
              onScore={(score) => recordQuizScore('capacitor-final-assessment', score)}
              questions={capacitorFinalAssessment}
              score={quizScores['capacitor-final-assessment']}
              title="Capacitor knowledge assessment"
              passingScore={75}
            />
            <section className="rounded-2xl border border-cyan-500/20 bg-[#091524] p-5 sm:p-7">
              <div className="flex items-center gap-2">
                <Sparkles aria-hidden="true" className="size-4 text-cyan-300" />
                <h2 className="text-base font-bold text-white">Practical completion challenge</h2>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                Build a small web UI, sync it to Android, show device information with a Capacitor plugin,
                fetch a sensor reading from FastAPI over Wi-Fi, then generate and install a debug APK.
                Include a short README explaining permissions, API URL selection, and how to rebuild after web changes.
              </p>
              <Link className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-cyan-200 hover:text-white" href={`${COURSE_PATH}/iot-application`}>
                Review the IoT capstone <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </section>
            <div className="flex flex-wrap justify-between gap-3">
              <Link className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-white/10 px-4 text-xs font-semibold text-slate-200 hover:bg-white/[0.05]" href={`${COURSE_PATH}/${capacitorLessons[capacitorLessons.length - 1].slug}`}>
                <ArrowLeft aria-hidden="true" className="size-4" /> Back to final lesson
              </Link>
              <Link className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-cyan-400 px-4 text-xs font-extrabold text-[#07121f] hover:brightness-110" href={COURSE_PATH}>
                Course dashboard <GraduationCap aria-hidden="true" className="size-4" />
              </Link>
            </div>
          </article>
        </div>
      </div>
    </main>
  )
}
