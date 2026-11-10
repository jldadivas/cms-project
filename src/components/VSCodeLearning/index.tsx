'use client'

import { useEffect, useMemo, useState } from 'react'
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
  Menu,
  Search,
  Terminal,
  Trophy,
  Wrench,
  X,
} from 'lucide-react'
import {
  vscodeFinalAssessment,
  vscodeLessons,
  vscodeLessonSlugs,
  type VSCodeLesson,
  type VSCodeQuizQuestion,
} from '@/data/vscode-course-data'
import { mobileAppLessonSlugs } from '@/data/mobile-app-course-data'
import { useMobileLearningProgress } from '@/components/MobileAppLearning/useMobileLearningProgress'

const VSCODE_PROGRESS_SLUGS = [...mobileAppLessonSlugs, ...vscodeLessonSlugs]
const COURSE_PATH = '/mobile-app-learning/vscode'
const PASSING_SCORE = 70

function VSCodeMark({ className = 'size-14' }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`grid shrink-0 place-items-center rounded-2xl border border-sky-300/25 bg-gradient-to-br from-sky-400/20 to-blue-500/10 text-sky-200 shadow-lg shadow-sky-500/10 ${className}`}
    >
      <svg className="size-9" fill="none" viewBox="0 0 32 32">
        <path d="M4 11.2 11.1 16 4 20.8 1.5 19.2 6.1 16l-4.6-3.2L4 11.2Z" fill="currentColor" />
        <path d="m12.2 11.3 14.3-7.5v24.4l-14.3-7.5V11.3Z" fill="currentColor" opacity=".8" />
        <path d="m15.4 13.3 7.3-3.8v13l-7.3-3.8v-5.4Z" fill="#07121f" />
      </svg>
    </span>
  )
}

function ProgressBar({
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
      aria-label="VS Code course progress"
      className="rounded-2xl border border-white/10 bg-[#091524] p-5 sm:p-6"
    >
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-sky-300">
            Your learning progress
          </p>
          <h2 className="mt-1 text-lg font-bold text-white">
            {loaded ? completed : 0} / {total} lessons completed
          </h2>
        </div>
        <span className="font-mono text-sm font-bold text-sky-200">{percent}%</span>
      </div>
      <div
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={percent}
        className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800"
        role="progressbar"
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-sky-400 to-blue-400 transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="mt-2 text-xs text-slate-400">
        Lessons, activities, and quiz scores use the existing shared learning progress.
      </p>
    </section>
  )
}

function FlowDiagram({ title, nodes }: { title: string; nodes: string[] }) {
  return (
    <figure className="rounded-2xl border border-sky-500/20 bg-[#081625] p-5 sm:p-6">
      <figcaption className="flex items-center gap-2 text-sm font-bold text-white">
        <Layers3 aria-hidden="true" className="size-4 text-sky-300" />
        {title}
      </figcaption>
      <ol className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
        {nodes.map((node, index) => (
          <li className="flex min-w-0 items-center gap-2" key={node}>
            <div className="flex min-h-[4.5rem] flex-1 items-center gap-3 rounded-xl border border-sky-400/15 bg-[#06101c] p-3">
              <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-sky-500/10 font-mono text-xs font-bold text-sky-200">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="text-xs font-semibold leading-relaxed text-slate-200">{node}</span>
            </div>
            {index < nodes.length - 1 && (
              <ArrowRight
                aria-hidden="true"
                className="hidden size-4 shrink-0 text-sky-400 xl:block"
              />
            )}
          </li>
        ))}
      </ol>
    </figure>
  )
}

function CodePlayground({ lesson }: { lesson: VSCodeLesson }) {
  const [activeExample, setActiveExample] = useState(0)
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle')
  const example = lesson.examples[activeExample]

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(example.code)
      setCopyState('copied')
    } catch (error) {
      console.warn('Failed to copy VS Code course example:', error)
      setCopyState('failed')
    }
    window.setTimeout(() => setCopyState('idle'), 2200)
  }

  return (
    <section
      aria-labelledby="vscode-playground-heading"
      className="overflow-hidden rounded-2xl border border-sky-500/25 bg-[#091524] shadow-xl"
    >
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-white/[0.08] p-4 sm:px-6">
        <div>
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-sky-300">
            Interactive code and terminal examples
          </p>
          <h2 className="mt-1 text-lg font-bold text-white" id="vscode-playground-heading">
            Explore the code
          </h2>
        </div>
        <button
          className="inline-flex min-h-9 items-center gap-2 rounded-lg border border-white/15 bg-white/[0.04] px-3 text-xs font-semibold text-slate-200 transition hover:border-sky-400/40 hover:text-white"
          onClick={copyCode}
          type="button"
        >
          {copyState === 'copied' ? (
            <Check aria-hidden="true" className="size-3.5 text-emerald-300" />
          ) : (
            <Copy aria-hidden="true" className="size-3.5 text-sky-300" />
          )}
          {copyState === 'copied' ? 'Copied' : copyState === 'failed' ? 'Copy failed' : 'Copy code'}
        </button>
      </div>
      <div className="flex gap-2 overflow-x-auto border-b border-white/[0.06] p-3 [scrollbar-width:thin]">
        {lesson.examples.map((item, index) => (
          <button
            aria-pressed={activeExample === index}
            className={`shrink-0 rounded-lg px-3 py-2 text-xs font-semibold transition ${activeExample === index ? 'border border-sky-400/30 bg-sky-500/15 text-sky-100' : 'border border-transparent text-slate-400 hover:bg-white/[0.05] hover:text-white'}`}
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
        <p className="flex flex-wrap items-center gap-2 font-mono text-xs text-slate-300">
          <Terminal aria-hidden="true" className="size-3.5 text-sky-300" />
          {example.filename}
          <span className="rounded border border-sky-500/20 px-1.5 py-0.5 text-[9px] uppercase text-sky-200">
            {example.language}
          </span>
        </p>
        <p className="mt-2 text-xs leading-relaxed text-slate-300">{example.explanation}</p>
      </div>
      <Highlight code={example.code} language={example.language} theme={themes.vsDark}>
        {({ getLineProps, getTokenProps, tokens }) => (
          <pre className="max-h-[34rem] overflow-auto bg-[#050c14] p-4 text-xs leading-6 sm:p-6 sm:text-sm">
            {tokens.map((line, lineIndex) => (
              <div key={lineIndex} {...getLineProps({ className: 'table-row', line })}>
                <span className="table-cell select-none pr-5 text-right font-mono text-[10px] text-slate-600">
                  {lineIndex + 1}
                </span>
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
      <div className="border-t border-white/[0.06] bg-sky-400/[0.04] px-4 py-3 sm:px-6">
        <p className="font-mono text-[9px] font-bold uppercase tracking-wider text-sky-300">
          Expected result
        </p>
        <pre className="overflow-x-auto whitespace-pre-wrap pt-2 font-mono text-xs leading-relaxed text-sky-100">
          {example.expectedOutput}
        </pre>
      </div>
      <p aria-live="polite" className="sr-only">
        {copyState === 'copied'
          ? 'Code copied.'
          : copyState === 'failed'
            ? 'Could not copy code. Select the code and copy it manually.'
            : ''}
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
  questions: VSCodeQuizQuestion[]
  score?: number
  onScore: (score: number) => void
  title: string
  passingScore?: number
}) {
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [submitted, setSubmitted] = useState(false)
  const correctCount = questions.reduce(
    (count, item, index) => count + (item.options[answers[index]]?.correct ? 1 : 0),
    0,
  )
  const scorePercent = questions.length ? Math.round((correctCount / questions.length) * 100) : 0

  function submitQuiz() {
    if (Object.keys(answers).length !== questions.length) return
    setSubmitted(true)
    onScore(scorePercent)
  }

  return (
    <section
      aria-labelledby="vscode-quiz-heading"
      className="rounded-2xl border border-sky-500/25 bg-[#091524] p-5 sm:p-7"
    >
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-white/[0.08] pb-4">
        <div>
          <p className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-wider text-sky-300">
            <ListChecks aria-hidden="true" className="size-4" />
            Knowledge check
          </p>
          <h2 className="mt-1 text-lg font-bold text-white" id="vscode-quiz-heading">
            {title}
          </h2>
          <p className="mt-1 text-xs text-slate-400">
            Answer each question, then submit to see explanations and your score.
          </p>
        </div>
        {score !== undefined && (
          <span className="rounded-full border border-emerald-400/20 bg-emerald-400/[0.06] px-3 py-1.5 text-xs font-bold text-emerald-200">
            Best score {score}%
          </span>
        )}
      </div>
      <div className="mt-5 space-y-5">
        {questions.map((item, questionIndex) => (
          <fieldset
            className="rounded-xl border border-white/[0.08] bg-[#06101c] p-4"
            key={item.question}
          >
            <legend className="max-w-full px-1 text-sm font-semibold leading-relaxed text-white">
              <span className="mr-2 font-mono text-sky-300">Q{questionIndex + 1}</span>
              <span className="mr-2 rounded border border-white/10 px-1.5 py-0.5 text-[9px] font-medium uppercase text-slate-400">
                {item.type}
              </span>
              {item.question}
            </legend>
            <div className="mt-3 space-y-2">
              {item.options.map((option, optionIndex) => {
                const selected = answers[questionIndex] === optionIndex
                const resultStyle = submitted
                  ? option.correct
                    ? 'border-emerald-400/40 bg-emerald-400/[0.08]'
                    : selected
                      ? 'border-rose-400/40 bg-rose-400/[0.06]'
                      : 'border-white/[0.06]'
                  : selected
                    ? 'border-sky-400/40 bg-sky-400/[0.07]'
                    : 'border-white/[0.06]'
                return (
                  <label
                    className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 text-xs leading-relaxed text-slate-300 transition ${resultStyle}`}
                    key={option.label}
                  >
                    <input
                      checked={selected}
                      className="mt-0.5 accent-sky-400"
                      disabled={submitted}
                      name={`vscode-question-${questionIndex}`}
                      onChange={() =>
                        setAnswers((current) => ({ ...current, [questionIndex]: optionIndex }))
                      }
                      type="radio"
                    />
                    <span className="min-w-0 flex-1">
                      {option.label}
                      {submitted && (
                        <span
                          className={`mt-1 block ${option.correct ? 'text-emerald-200' : 'text-slate-400'}`}
                        >
                          {option.feedback}
                        </span>
                      )}
                    </span>
                    {submitted && option.correct && (
                      <CheckCircle2
                        aria-label="Correct answer"
                        className="size-4 shrink-0 text-emerald-300"
                      />
                    )}
                  </label>
                )
              })}
            </div>
          </fieldset>
        ))}
      </div>
      {!submitted ? (
        <button
          className="mt-5 inline-flex min-h-10 items-center gap-2 rounded-xl bg-sky-300 px-4 py-2 text-sm font-bold text-[#07121f] transition hover:bg-sky-200 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={Object.keys(answers).length !== questions.length}
          onClick={submitQuiz}
          type="button"
        >
          Submit answers <ArrowRight aria-hidden="true" className="size-4" />
        </button>
      ) : (
        <p
          aria-live="polite"
          className={`mt-5 rounded-xl border p-4 text-sm font-bold ${passingScore === undefined || scorePercent >= passingScore ? 'border-emerald-400/30 bg-emerald-400/[0.06] text-emerald-200' : 'border-amber-400/30 bg-amber-400/[0.06] text-amber-100'}`}
        >
          Score: {correctCount}/{questions.length} ({scorePercent}%).
          {passingScore !== undefined
            ? scorePercent >= passingScore
              ? ' Assessment passed.'
              : ` Review lessons and try again; ${passingScore}% is required.`
            : ' Review the explanations and revisit topics you missed.'}
        </p>
      )}
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
  const [search, setSearch] = useState('')
  const [expanded, setExpanded] = useState(false)
  const filteredLessons = useMemo(
    () =>
      vscodeLessons.filter((lesson) =>
        `${lesson.title} ${lesson.summary} ${lesson.objectives.join(' ')}`
          .toLowerCase()
          .includes(search.toLowerCase()),
      ),
    [search],
  )

  return (
    <aside className="rounded-2xl border border-white/10 bg-[#091524] p-4 lg:sticky lg:top-24">
      <button
        aria-expanded={expanded}
        className="flex min-h-10 w-full items-center justify-between gap-2 text-left text-sm font-bold text-white lg:cursor-default"
        onClick={() => setExpanded((value) => !value)}
        type="button"
      >
        <span className="flex items-center gap-2">
          <BookOpen aria-hidden="true" className="size-4 text-sky-300" />
          Course lessons
        </span>
        <span className="flex items-center gap-2 text-xs font-normal text-slate-400">
          {vscodeLessons.length} lessons <Menu aria-hidden="true" className="size-4 lg:hidden" />
        </span>
      </button>
      <div className={`${expanded ? 'block' : 'hidden'} mt-3 lg:block`}>
        <label className="flex min-h-10 items-center gap-2 rounded-lg border border-white/10 bg-[#06101c] px-3">
          <Search aria-hidden="true" className="size-4 shrink-0 text-slate-400" />
          <input
            className="min-w-0 flex-1 bg-transparent text-xs text-white outline-none placeholder:text-slate-500"
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search lessons and topics"
            type="search"
            value={search}
          />
          {search && (
            <button
              aria-label="Clear lesson search"
              className="text-slate-400 hover:text-white"
              onClick={() => setSearch('')}
              type="button"
            >
              <X aria-hidden="true" className="size-3.5" />
            </button>
          )}
        </label>
        <nav
          aria-label="VS Code lessons"
          className="mt-3 max-h-[65vh] space-y-1 overflow-y-auto pr-1"
        >
          {filteredLessons.length ? (
            filteredLessons.map((lesson) => {
              const active = lesson.slug === currentSlug
              const complete = completedLessons.includes(lesson.slug)
              return (
                <Link
                  className={`flex items-start gap-2 rounded-lg border px-2 py-2 text-xs transition ${active ? 'border-sky-400/30 bg-sky-500/10 text-sky-100' : 'border-transparent text-slate-300 hover:bg-white/[0.05]'}`}
                  href={`${COURSE_PATH}/${lesson.slug}`}
                  key={lesson.slug}
                  onClick={() => setExpanded(false)}
                >
                  {complete ? (
                    <CheckCircle2
                      aria-label="Completed"
                      className="mt-0.5 size-3.5 shrink-0 text-emerald-300"
                    />
                  ) : (
                    <Circle
                      aria-hidden="true"
                      className="mt-0.5 size-3.5 shrink-0 text-slate-600"
                    />
                  )}
                  <span className="min-w-0 flex-1">
                    <span className="font-mono text-[9px] text-sky-400">
                      {String(vscodeLessons.indexOf(lesson) + 1).padStart(2, '0')}
                    </span>{' '}
                    {lesson.title}
                    {quizScores[lesson.slug] !== undefined && (
                      <span className="mt-1 block text-[9px] text-slate-500">
                        Best quiz: {quizScores[lesson.slug]}%
                      </span>
                    )}
                  </span>
                </Link>
              )
            })
          ) : (
            <p className="rounded-lg border border-white/[0.06] p-3 text-xs text-slate-400">
              No lessons match “{search}”.
            </p>
          )}
          <Link
            className={`flex items-center gap-2 rounded-lg border px-2 py-2 text-xs transition ${currentSlug === 'assessment' ? 'border-amber-400/30 bg-amber-400/[0.07] text-amber-100' : 'border-transparent text-slate-300 hover:bg-white/[0.05]'}`}
            href={`${COURSE_PATH}/assessment`}
            onClick={() => setExpanded(false)}
          >
            <Trophy aria-hidden="true" className="size-3.5 text-amber-300" />
            Final assessment
            {quizScores['vscode-final-assessment'] !== undefined && (
              <span className="ml-auto text-[9px] text-slate-500">
                {quizScores['vscode-final-assessment']}%
              </span>
            )}
          </Link>
        </nav>
      </div>
    </aside>
  )
}

export function VSCodeLearningDashboard() {
  const { completedLessons, completedActivities, isLoaded, lastVisitedSlug, quizScores } =
    useMobileLearningProgress(VSCODE_PROGRESS_SLUGS)
  const completed = vscodeLessons.filter((lesson) => completedLessons.includes(lesson.slug)).length
  const activitiesCompleted = vscodeLessons.filter((lesson) =>
    completedActivities.includes(lesson.slug),
  ).length
  const continueHref =
    lastVisitedSlug === 'vscode-final-assessment'
      ? `${COURSE_PATH}/assessment`
      : `${COURSE_PATH}/${lastVisitedSlug && vscodeLessons.some((lesson) => lesson.slug === lastVisitedSlug) ? lastVisitedSlug : vscodeLessons[0].slug}`
  const assessmentPassed = (quizScores['vscode-final-assessment'] ?? 0) >= PASSING_SCORE

  return (
    <main className="min-h-screen bg-[#07121f] px-4 py-6 text-[#e6f0fa] sm:px-6 lg:py-10">
      <div className="mx-auto max-w-7xl space-y-8">
        <Link
          className="inline-flex items-center gap-2 text-sm font-semibold text-sky-300 transition hover:text-sky-100"
          href="/mobile-app-learning"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          Mobile App Development
        </Link>
        <header className="relative overflow-hidden rounded-[2rem] border border-sky-400/20 bg-gradient-to-br from-[#102440] via-[#111827] to-[#07121f] p-6 shadow-2xl sm:p-10">
          <div
            aria-hidden="true"
            className="absolute -right-14 -top-20 size-72 rounded-full bg-sky-400/[0.08] blur-3xl"
          />
          <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(260px,0.65fr)] lg:items-center">
            <div>
              <div className="flex items-center gap-4">
                <VSCodeMark />
                <div>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-sky-300">
                    Interactive programming course
                  </p>
                  <p className="mt-1 text-xs text-slate-400">VS Code · Extensions · Git · IoT</p>
                </div>
              </div>
              <h1 className="mt-6 max-w-3xl text-3xl font-black tracking-tight text-white sm:text-5xl">
                Learn to build with <span className="text-sky-300">VS Code</span>
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
                Use a lightweight, extensible source-code editor across web, Python, mobile,
                backend, embedded, and remote IoT projects. Learn how extensions work with—not
                instead of—your language runtimes and SDKs.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-gradient-to-r from-sky-300 to-blue-400 px-5 text-sm font-extrabold text-[#07121f] transition hover:brightness-110"
                  href={continueHref}
                >
                  {completed ? 'Continue learning' : 'Start the course'}
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
                <a
                  className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-4 text-sm font-semibold text-slate-200 transition hover:bg-white/[0.08]"
                  href="https://code.visualstudio.com/docs"
                  rel="noreferrer"
                  target="_blank"
                >
                  Official VS Code docs
                  <ExternalLink aria-hidden="true" className="size-3.5" />
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Guided lessons', value: String(vscodeLessons.length) },
                { label: 'Estimated time', value: '13–17 hrs' },
                { label: 'Learning path', value: 'Beginner → Advanced' },
                { label: 'Final project', value: 'Full IoT workflow' },
              ].map((item) => (
                <div
                  className="rounded-2xl border border-white/10 bg-[#06101c]/80 p-4"
                  key={item.label}
                >
                  <p className="text-[10px] uppercase tracking-wider text-slate-400">
                    {item.label}
                  </p>
                  <p className="mt-2 text-sm font-bold text-white">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </header>
        <ProgressBar completed={completed} loaded={isLoaded} total={vscodeLessons.length} />
        <p className="text-xs text-slate-400">
          {activitiesCompleted} / {vscodeLessons.length} practical activities completed
          {assessmentPassed ? ' · Final assessment passed' : ''}
        </p>
        <section aria-labelledby="vscode-objectives" className="grid gap-4 lg:grid-cols-3">
          <article className="rounded-2xl border border-white/10 bg-[#091524] p-5">
            <GraduationCap aria-hidden="true" className="size-5 text-sky-300" />
            <h2 className="mt-3 font-bold text-white" id="vscode-objectives">
              Learning objectives
            </h2>
            <ul className="mt-3 space-y-2 text-xs leading-relaxed text-slate-300">
              <li>Navigate the editor, terminal, extensions, Git, and debugger.</li>
              <li>Use VS Code with web, Python, Flutter, Ionic, and embedded toolchains.</li>
              <li>Develop and troubleshoot an ESP32-to-mobile IoT system.</li>
            </ul>
          </article>
          <article className="rounded-2xl border border-white/10 bg-[#091524] p-5">
            <Wrench aria-hidden="true" className="size-5 text-sky-300" />
            <h2 className="mt-3 font-bold text-white">Prerequisites and tools</h2>
            <p className="mt-2 text-xs leading-relaxed text-slate-300">
              A Windows, Linux, or macOS computer and VS Code. Install runtimes and SDKs separately
              for each track; optional hardware includes an ESP32 and Raspberry Pi.
            </p>
          </article>
          <article className="rounded-2xl border border-white/10 bg-[#091524] p-5">
            <Clock3 aria-hidden="true" className="size-5 text-sky-300" />
            <h2 className="mt-3 font-bold text-white">Learning path</h2>
            <p className="mt-2 text-xs leading-relaxed text-slate-300">
              Start with setup and editor basics, then web/backend, mobile, Git, embedded and remote
              development, debugging, and the complete IoT workflow.
            </p>
          </article>
        </section>
        <FlowDiagram
          title="One editor, multiple toolchains"
          nodes={[
            'Edit source in workspace',
            'Extensions connect language tools',
            'Runtimes and SDKs build/run code',
            'Debug locally, remotely, or on device',
          ]}
        />
        <section aria-labelledby="vscode-curriculum-title">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-sky-300">
                Beginner to advanced
              </p>
              <h2 className="mt-1 text-2xl font-bold text-white" id="vscode-curriculum-title">
                The learning path
              </h2>
            </div>
            <Link
              className="inline-flex items-center gap-2 text-sm font-semibold text-sky-300 hover:text-sky-100"
              href={`${COURSE_PATH}/assessment`}
            >
              Final assessment <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {vscodeLessons.map((lesson, index) => {
              const complete = completedLessons.includes(lesson.slug)
              return (
                <Link
                  className="group rounded-2xl border border-white/10 bg-[#091524] p-5 transition hover:-translate-y-0.5 hover:border-sky-400/35 hover:bg-[#0b1a2b]"
                  href={`${COURSE_PATH}/${lesson.slug}`}
                  key={lesson.slug}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="font-mono text-[10px] font-bold text-sky-300">
                      LESSON {String(index + 1).padStart(2, '0')} · {lesson.level}
                    </span>
                    {complete && (
                      <CheckCircle2
                        aria-label="Completed"
                        className="size-4 shrink-0 text-emerald-300"
                      />
                    )}
                  </div>
                  <h3 className="mt-3 font-bold text-white group-hover:text-sky-100">
                    {lesson.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-300">{lesson.summary}</p>
                  <p className="mt-4 flex items-center gap-1 text-[10px] text-slate-400">
                    <Clock3 aria-hidden="true" className="size-3" />
                    {lesson.minutes} minutes
                    {quizScores[lesson.slug] !== undefined && (
                      <span className="ml-auto text-sky-200">
                        Best quiz: {quizScores[lesson.slug]}%
                      </span>
                    )}
                  </p>
                </Link>
              )
            })}
          </div>
        </section>
        <section
          aria-labelledby="vscode-docs-heading"
          className="rounded-2xl border border-white/10 bg-[#091524] p-5 sm:p-7"
        >
          <h2 className="font-bold text-white" id="vscode-docs-heading">
            Official learning resources
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {[
              ['VS Code website', 'https://code.visualstudio.com/'],
              ['VS Code documentation', 'https://code.visualstudio.com/docs'],
              ['Marketplace', 'https://marketplace.visualstudio.com/vscode'],
              ['Python', 'https://docs.python.org/3/'],
              ['Flutter', 'https://docs.flutter.dev/'],
              ['Dart', 'https://dart.dev/'],
              ['Git', 'https://git-scm.com/doc'],
              ['PlatformIO', 'https://docs.platformio.org/'],
              ['Raspberry Pi', 'https://www.raspberrypi.com/documentation/'],
            ].map(([label, href]) => (
              <a
                className="inline-flex min-h-9 items-center gap-2 rounded-lg border border-white/10 px-3 text-xs font-semibold text-slate-300 transition hover:border-sky-400/30 hover:text-sky-100"
                href={href}
                key={href}
                rel="noreferrer"
                target="_blank"
              >
                {label}
                <ExternalLink aria-hidden="true" className="size-3" />
              </a>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

export function VSCodeLessonPage({ lesson }: { lesson: VSCodeLesson }) {
  const index = vscodeLessons.findIndex((item) => item.slug === lesson.slug)
  const previous = vscodeLessons[index - 1]
  const next = vscodeLessons[index + 1]
  const {
    completedLessons,
    completedActivities,
    isLoaded,
    quizScores,
    toggleLesson,
    toggleActivity,
    recordQuizScore,
    setLastVisitedSlug,
  } = useMobileLearningProgress(VSCODE_PROGRESS_SLUGS)
  const complete = completedLessons.includes(lesson.slug)
  const activityComplete = completedActivities.includes(lesson.slug)

  useEffect(() => {
    setLastVisitedSlug(lesson.slug)
  }, [lesson.slug, setLastVisitedSlug])

  return (
    <main className="min-h-screen bg-[#07121f] px-4 py-6 text-[#e6f0fa] sm:px-6 lg:py-9">
      <div className="mx-auto max-w-7xl">
        <Link
          className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-sky-300 hover:text-sky-100"
          href={COURSE_PATH}
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          VS Code course
        </Link>
        <div className="grid items-start gap-5 lg:grid-cols-[minmax(250px,0.32fr)_minmax(0,0.68fr)]">
          <LessonSidebar
            completedLessons={completedLessons}
            currentSlug={lesson.slug}
            quizScores={quizScores}
          />
          <article className="min-w-0 space-y-6">
            <header className="rounded-3xl border border-sky-500/25 bg-gradient-to-br from-[#102440] via-[#0b1824] to-[#07121f] p-5 sm:p-8">
              <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-wider text-sky-300">
                Lesson {String(index + 1).padStart(2, '0')} · {lesson.level}
                <span className="flex items-center gap-1 rounded-full border border-white/10 px-2 py-1 text-slate-300">
                  <Clock3 aria-hidden="true" className="size-3" />
                  {lesson.minutes} min
                </span>
              </div>
              <h1 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
                {lesson.title}
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">{lesson.summary}</p>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <button
                  className={`inline-flex min-h-10 items-center gap-2 rounded-xl px-4 text-xs font-bold transition ${complete ? 'border border-emerald-400/30 bg-emerald-400/[0.08] text-emerald-200' : 'bg-sky-300 text-[#07121f] hover:bg-sky-200'}`}
                  disabled={!isLoaded}
                  onClick={() => toggleLesson(lesson.slug)}
                  type="button"
                >
                  <CheckCircle2 aria-hidden="true" className="size-4" />
                  {complete ? 'Lesson completed' : 'Mark lesson complete'}
                </button>
                <span className="text-[10px] text-slate-400">
                  Quiz score: {quizScores[lesson.slug] ?? 'Not taken'}
                  {quizScores[lesson.slug] !== undefined ? '%' : ''}
                </span>
              </div>
            </header>
            <section className="rounded-2xl border border-white/10 bg-[#091524] p-5 sm:p-7">
              <div className="flex items-center gap-2">
                <GraduationCap aria-hidden="true" className="size-4 text-sky-300" />
                <h2 className="font-bold text-white">Learning objectives</h2>
              </div>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {lesson.objectives.map((objective) => (
                  <li
                    className="flex items-start gap-2 rounded-lg bg-white/[0.03] p-3 text-xs leading-relaxed text-slate-300"
                    key={objective}
                  >
                    <Check aria-hidden="true" className="mt-0.5 size-3.5 shrink-0 text-sky-300" />
                    {objective}
                  </li>
                ))}
              </ul>
              <h3 className="mt-5 text-xs font-bold text-white">Prerequisites and tools</h3>
              <ul className="mt-2 flex flex-wrap gap-2">
                {lesson.prerequisites.map((item) => (
                  <li
                    className="rounded-full border border-white/10 bg-[#06101c] px-3 py-1.5 text-[10px] text-slate-300"
                    key={item}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </section>
            {lesson.sections.map((section) => (
              <section
                className="rounded-2xl border border-white/10 bg-[#091524] p-5 sm:p-7"
                key={section.title}
              >
                <h2 className="text-lg font-bold text-white">{section.title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-300">{section.body}</p>
                {section.bullets && (
                  <ul className="mt-4 space-y-2">
                    {section.bullets.map((bullet) => (
                      <li
                        className="flex items-start gap-2 text-xs leading-relaxed text-slate-300"
                        key={bullet}
                      >
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-sky-300" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
            <section className="rounded-2xl border border-white/10 bg-[#091524] p-5 sm:p-7">
              <h2 className="flex items-center gap-2 font-bold text-white">
                <ListChecks aria-hidden="true" className="size-4 text-sky-300" />
                Step-by-step tutorial
              </h2>
              <ol className="mt-4 space-y-3">
                {lesson.steps.map((step, stepIndex) => (
                  <li className="flex gap-3" key={step.title}>
                    <span className="grid size-7 shrink-0 place-items-center rounded-lg border border-sky-400/20 bg-sky-500/10 font-mono text-[10px] font-bold text-sky-200">
                      {String(stepIndex + 1).padStart(2, '0')}
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold text-white">{step.title}</h3>
                      <p className="mt-1 text-xs leading-relaxed text-slate-300">{step.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
            <FlowDiagram title={lesson.diagram.title} nodes={lesson.diagram.nodes} />
            <CodePlayground lesson={lesson} />
            <section className="rounded-2xl border border-sky-400/20 bg-sky-400/[0.04] p-5 sm:p-7">
              <h2 className="flex items-center gap-2 font-bold text-white">
                <Wrench aria-hidden="true" className="size-4 text-sky-300" />
                Practical activity
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">{lesson.activity}</p>
              <button
                className={`mt-4 inline-flex min-h-10 items-center gap-2 rounded-xl border px-4 text-xs font-bold transition ${activityComplete ? 'border-emerald-400/30 bg-emerald-400/[0.08] text-emerald-200' : 'border-sky-400/25 bg-sky-400/[0.06] text-sky-100 hover:bg-sky-400/[0.12]'}`}
                disabled={!isLoaded}
                onClick={() => toggleActivity(lesson.slug)}
                type="button"
              >
                <CheckCircle2 aria-hidden="true" className="size-4" />
                {activityComplete ? 'Activity completed' : 'Mark activity complete'}
              </button>
            </section>
            <section className="rounded-2xl border border-white/10 bg-[#091524] p-5 sm:p-7">
              <h2 className="font-bold text-white">Official learning resources</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {lesson.docs.map((doc) => (
                  <a
                    className="inline-flex min-h-9 items-center gap-2 rounded-lg border border-white/10 px-3 text-xs font-semibold text-slate-300 transition hover:border-sky-400/30 hover:text-sky-100"
                    href={doc.href}
                    key={doc.href}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {doc.label}
                    <ExternalLink aria-hidden="true" className="size-3" />
                  </a>
                ))}
              </div>
            </section>
            <LessonQuiz
              onScore={(score) => recordQuizScore(lesson.slug, score)}
              questions={lesson.quiz}
              score={quizScores[lesson.slug]}
              title={`${lesson.title} quiz`}
            />
            <nav aria-label="Lesson navigation" className="grid gap-3 sm:grid-cols-2">
              {previous ? (
                <Link
                  className="rounded-xl border border-white/10 bg-[#091524] p-4 transition hover:border-sky-400/30"
                  href={`${COURSE_PATH}/${previous.slug}`}
                >
                  <span className="flex items-center gap-2 text-[10px] font-bold uppercase text-slate-400">
                    <ArrowLeft aria-hidden="true" className="size-3" /> Previous lesson
                  </span>
                  <span className="mt-2 block text-sm font-bold text-white">{previous.title}</span>
                </Link>
              ) : (
                <Link
                  className="rounded-xl border border-white/10 bg-[#091524] p-4 transition hover:border-sky-400/30"
                  href={COURSE_PATH}
                >
                  <span className="flex items-center gap-2 text-[10px] font-bold uppercase text-slate-400">
                    <ArrowLeft aria-hidden="true" className="size-3" /> Course overview
                  </span>
                  <span className="mt-2 block text-sm font-bold text-white">VS Code course</span>
                </Link>
              )}
              {next ? (
                <Link
                  className="rounded-xl border border-sky-400/20 bg-sky-400/[0.04] p-4 text-left transition hover:border-sky-400/40"
                  href={`${COURSE_PATH}/${next.slug}`}
                >
                  <span className="flex items-center justify-end gap-2 text-[10px] font-bold uppercase text-sky-300">
                    Next lesson <ArrowRight aria-hidden="true" className="size-3" />
                  </span>
                  <span className="mt-2 block text-right text-sm font-bold text-white">
                    {next.title}
                  </span>
                </Link>
              ) : (
                <Link
                  className="rounded-xl border border-amber-400/20 bg-amber-400/[0.04] p-4 text-left transition hover:border-amber-400/40"
                  href={`${COURSE_PATH}/assessment`}
                >
                  <span className="flex items-center justify-end gap-2 text-[10px] font-bold uppercase text-amber-200">
                    Final assessment <Trophy aria-hidden="true" className="size-3" />
                  </span>
                  <span className="mt-2 block text-right text-sm font-bold text-white">
                    Test your VS Code knowledge
                  </span>
                </Link>
              )}
            </nav>
          </article>
        </div>
      </div>
    </main>
  )
}

export function VSCodeAssessmentPage() {
  const { completedLessons, isLoaded, quizScores, recordQuizScore, setLastVisitedSlug } =
    useMobileLearningProgress(VSCODE_PROGRESS_SLUGS)

  useEffect(() => {
    setLastVisitedSlug('vscode-final-assessment')
  }, [setLastVisitedSlug])

  const completed = vscodeLessons.filter((lesson) => completedLessons.includes(lesson.slug)).length

  return (
    <main className="min-h-screen bg-[#07121f] px-4 py-6 text-[#e6f0fa] sm:px-6 lg:py-10">
      <div className="mx-auto max-w-5xl space-y-6">
        <Link
          className="inline-flex items-center gap-2 text-sm font-semibold text-sky-300 hover:text-sky-100"
          href={COURSE_PATH}
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          VS Code course
        </Link>
        <header className="rounded-3xl border border-amber-400/20 bg-gradient-to-br from-[#272319] via-[#111827] to-[#07121f] p-6 sm:p-10">
          <p className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-wider text-amber-200">
            <Trophy aria-hidden="true" className="size-4" />
            Final assessment
          </p>
          <h1 className="mt-3 text-3xl font-black text-white sm:text-4xl">
            Visual Studio Code Development Workflow
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
            Review editor tools, extensions, terminal, Python, mobile, Git, embedded development,
            remote Pi workflows, and IoT safety. Answer every question; 70% is required to pass.
          </p>
          <p className="mt-4 text-xs text-slate-400">
            {isLoaded ? completed : 0} / {vscodeLessons.length} course lessons completed
          </p>
        </header>
        <LessonQuiz
          onScore={(score) => recordQuizScore('vscode-final-assessment', score)}
          passingScore={PASSING_SCORE}
          questions={vscodeFinalAssessment}
          score={quizScores['vscode-final-assessment']}
          title="Final VS Code practical assessment"
        />
        <Link
          className="inline-flex items-center gap-2 text-sm font-semibold text-sky-300 hover:text-sky-100"
          href={`${COURSE_PATH}/${vscodeLessons[0].slug}`}
        >
          Review lessons <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      </div>
    </main>
  )
}
