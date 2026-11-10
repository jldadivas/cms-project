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
  ionicFinalAssessment,
  ionicLessons,
  ionicLessonSlugs,
  type IonicLesson,
  type IonicQuizQuestion,
} from '@/data/ionic-course-data'
import { mobileAppLessonSlugs } from '@/data/mobile-app-course-data'
import { useMobileLearningProgress } from '@/components/MobileAppLearning/useMobileLearningProgress'

const IONIC_PROGRESS_SLUGS = [...mobileAppLessonSlugs, ...ionicLessonSlugs]
const COURSE_PATH = '/mobile-app-learning/ionic'
const PASSING_SCORE = 70

function IonicMark({ className = 'size-14' }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`grid shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-blue-400 to-violet-500 shadow-lg shadow-blue-500/20 ${className}`}
    >
      <svg className="size-9" fill="none" viewBox="0 0 32 32">
        <path d="M16 3 28 9.5v13L16 29 4 22.5v-13L16 3Z" fill="#07121f" />
        <path d="m16 7 8.5 4.5v9L16 25l-8.5-4.5v-9L16 7Z" fill="#5b7cfa" />
        <path
          d="m12.2 12.3 7.6 7.4m0-7.4-7.6 7.4"
          stroke="white"
          strokeLinecap="round"
          strokeWidth="2.2"
        />
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
      aria-label="Ionic course progress"
      className="rounded-2xl border border-white/10 bg-[#091524] p-5 sm:p-6"
    >
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-blue-300">
            Your learning progress
          </p>
          <h2 className="mt-1 text-lg font-bold text-white">
            {loaded ? completed : 0} / {total} lessons completed
          </h2>
        </div>
        <span className="font-mono text-sm font-bold text-blue-200">{percent}%</span>
      </div>
      <div
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={percent}
        className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800"
        role="progressbar"
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-blue-400 to-violet-400 transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="mt-2 text-xs text-slate-400">
        Lessons, activities, and quiz scores use the existing shared mobile-learning progress.
      </p>
    </section>
  )
}

function FlowDiagram({ title, nodes }: { title: string; nodes: string[] }) {
  return (
    <figure className="rounded-2xl border border-blue-500/20 bg-[#081625] p-5 sm:p-6">
      <figcaption className="flex items-center gap-2 text-sm font-bold text-white">
        <Layers3 aria-hidden="true" className="size-4 text-blue-300" />
        {title}
      </figcaption>
      <ol className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
        {nodes.map((node, index) => (
          <li className="flex min-w-0 items-center gap-2" key={node}>
            <div className="flex min-h-[4.5rem] flex-1 items-center gap-3 rounded-xl border border-blue-400/15 bg-[#06101c] p-3">
              <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-blue-500/10 font-mono text-xs font-bold text-blue-200">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="text-xs font-semibold leading-relaxed text-slate-200">{node}</span>
            </div>
            {index < nodes.length - 1 && (
              <ArrowRight
                aria-hidden="true"
                className="hidden size-4 shrink-0 text-blue-400 xl:block"
              />
            )}
          </li>
        ))}
      </ol>
    </figure>
  )
}

function CodePlayground({ lesson }: { lesson: IonicLesson }) {
  const [activeExample, setActiveExample] = useState(0)
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle')
  const example = lesson.examples[activeExample]

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(example.code)
      setCopyState('copied')
    } catch (error) {
      console.warn('Failed to copy Ionic course code:', error)
      setCopyState('failed')
    }
    window.setTimeout(() => setCopyState('idle'), 2200)
  }

  return (
    <section
      aria-labelledby="ionic-playground-heading"
      className="overflow-hidden rounded-2xl border border-blue-500/25 bg-[#091524] shadow-xl"
    >
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-white/[0.08] p-4 sm:px-6">
        <div>
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-blue-300">
            Interactive HTML, CSS, JS & TypeScript examples
          </p>
          <h2 className="mt-1 text-lg font-bold text-white" id="ionic-playground-heading">
            Explore the code
          </h2>
        </div>
        <button
          className="inline-flex min-h-9 items-center gap-2 rounded-lg border border-white/15 bg-white/[0.04] px-3 text-xs font-semibold text-slate-200 transition hover:border-blue-400/40 hover:text-white"
          onClick={copyCode}
          type="button"
        >
          {copyState === 'copied' ? (
            <Check aria-hidden="true" className="size-3.5 text-emerald-300" />
          ) : (
            <Copy aria-hidden="true" className="size-3.5 text-blue-300" />
          )}
          {copyState === 'copied' ? 'Copied' : copyState === 'failed' ? 'Copy failed' : 'Copy code'}
        </button>
      </div>
      <div className="flex gap-2 overflow-x-auto border-b border-white/[0.06] p-3 [scrollbar-width:thin]">
        {lesson.examples.map((item, index) => (
          <button
            aria-pressed={activeExample === index}
            className={`shrink-0 rounded-lg px-3 py-2 text-xs font-semibold transition ${activeExample === index ? 'border border-blue-400/30 bg-blue-500/15 text-blue-100' : 'border border-transparent text-slate-400 hover:bg-white/[0.05] hover:text-white'}`}
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
          <Terminal aria-hidden="true" className="size-3.5 text-blue-300" />
          {example.filename}
          <span className="rounded border border-blue-500/20 px-1.5 py-0.5 text-[9px] uppercase text-blue-200">
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
      <div className="border-t border-white/[0.08] bg-[#050e18]">
        <p className="border-b border-white/[0.05] px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-wider text-emerald-300 sm:px-6">
          Expected result
        </p>
        <pre className="overflow-x-auto whitespace-pre-wrap p-4 font-mono text-xs leading-relaxed text-emerald-200 sm:px-6">
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
  questions: IonicQuizQuestion[]
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
      aria-labelledby="ionic-quiz-heading"
      className="rounded-2xl border border-blue-500/25 bg-[#091524] p-5 sm:p-7"
    >
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-white/[0.08] pb-4">
        <div>
          <p className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-wider text-blue-300">
            <ListChecks aria-hidden="true" className="size-4" />
            Knowledge check
          </p>
          <h2 className="mt-1 text-lg font-bold text-white" id="ionic-quiz-heading">
            {title}
          </h2>
          <p className="mt-1 text-xs text-slate-400">
            Answer each question, then submit to see feedback.
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
              <span className="mr-2 font-mono text-blue-300">Q{questionIndex + 1}</span>
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
                    ? 'border-blue-400/40 bg-blue-400/[0.07]'
                    : 'border-white/[0.06]'
                return (
                  <label
                    className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 text-xs leading-relaxed text-slate-300 transition ${resultStyle}`}
                    key={option.label}
                  >
                    <input
                      checked={selected}
                      className="mt-0.5 accent-blue-400"
                      disabled={submitted}
                      name={`ionic-question-${questionIndex}`}
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
          className="mt-5 inline-flex min-h-10 items-center gap-2 rounded-xl bg-blue-400 px-4 py-2 text-sm font-bold text-[#07121f] transition hover:bg-blue-300 disabled:cursor-not-allowed disabled:opacity-50"
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
      ionicLessons.filter((lesson) =>
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
          <BookOpen aria-hidden="true" className="size-4 text-blue-300" />
          Course lessons
        </span>
        <span className="flex items-center gap-2 text-xs font-normal text-slate-400">
          {ionicLessons.length} lessons <Menu aria-hidden="true" className="size-4 lg:hidden" />
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
          aria-label="Ionic lessons"
          className="mt-3 max-h-[65vh] space-y-1 overflow-y-auto pr-1"
        >
          {filteredLessons.length ? (
            filteredLessons.map((lesson) => {
              const active = lesson.slug === currentSlug
              const complete = completedLessons.includes(lesson.slug)
              return (
                <Link
                  className={`flex items-start gap-2 rounded-lg border px-2 py-2 text-xs transition ${active ? 'border-blue-400/30 bg-blue-500/10 text-blue-100' : 'border-transparent text-slate-300 hover:bg-white/[0.05]'}`}
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
                    <span className="font-mono text-[9px] text-blue-400">
                      {String(ionicLessons.indexOf(lesson) + 1).padStart(2, '0')}
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
            {quizScores['ionic-final-assessment'] !== undefined && (
              <span className="ml-auto text-[9px] text-slate-500">
                {quizScores['ionic-final-assessment']}%
              </span>
            )}
          </Link>
        </nav>
      </div>
    </aside>
  )
}

export function IonicLearningDashboard() {
  const { completedLessons, completedActivities, isLoaded, lastVisitedSlug, quizScores } =
    useMobileLearningProgress(IONIC_PROGRESS_SLUGS)
  const completed = ionicLessons.filter((lesson) => completedLessons.includes(lesson.slug)).length
  const activitiesCompleted = ionicLessons.filter((lesson) =>
    completedActivities.includes(lesson.slug),
  ).length
  const continueHref =
    lastVisitedSlug === 'ionic-final-assessment'
      ? `${COURSE_PATH}/assessment`
      : `${COURSE_PATH}/${lastVisitedSlug && ionicLessons.some((lesson) => lesson.slug === lastVisitedSlug) ? lastVisitedSlug : ionicLessons[0].slug}`
  const assessmentPassed = (quizScores['ionic-final-assessment'] ?? 0) >= PASSING_SCORE

  return (
    <main className="min-h-screen bg-[#07121f] px-4 py-6 text-[#e6f0fa] sm:px-6 lg:py-10">
      <div className="mx-auto max-w-7xl space-y-8">
        <Link
          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-300 transition hover:text-blue-100"
          href="/mobile-app-learning"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          Mobile App Development
        </Link>
        <header className="relative overflow-hidden rounded-[2rem] border border-blue-400/20 bg-gradient-to-br from-[#101d3c] via-[#111827] to-[#07121f] p-6 shadow-2xl sm:p-10">
          <div
            aria-hidden="true"
            className="absolute -right-14 -top-20 size-72 rounded-full bg-blue-400/[0.08] blur-3xl"
          />
          <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(260px,0.65fr)] lg:items-center">
            <div>
              <div className="flex items-center gap-4">
                <IonicMark />
                <div>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-blue-300">
                    Interactive programming course
                  </p>
                  <p className="mt-1 text-xs text-slate-400">Ionic · React · Angular · Capacitor</p>
                </div>
              </div>
              <h1 className="mt-6 max-w-3xl text-3xl font-black tracking-tight text-white sm:text-5xl">
                Build mobile apps with <span className="text-blue-300">Ionic</span>
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
                Learn Ionic Framework with HTML, CSS, JavaScript, and TypeScript—from your first
                component through native Capacitor features and a complete IoT sensor dashboard.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-gradient-to-r from-blue-300 to-violet-400 px-5 text-sm font-extrabold text-[#07121f] transition hover:brightness-110"
                  href={continueHref}
                >
                  {completed ? 'Continue learning' : 'Start the course'}
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
                <a
                  className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-4 text-sm font-semibold text-slate-200 transition hover:bg-white/[0.08]"
                  href="https://ionicframework.com/docs"
                  rel="noreferrer"
                  target="_blank"
                >
                  Official Ionic docs
                  <ExternalLink aria-hidden="true" className="size-3.5" />
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Guided lessons', value: '13' },
                { label: 'Estimated time', value: '10–13 hrs' },
                { label: 'Learning path', value: 'Beginner → Advanced' },
                { label: 'Final project', value: 'Ionic IoT app' },
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
        <ProgressBar completed={completed} loaded={isLoaded} total={ionicLessons.length} />
        <p className="text-xs text-slate-400">
          {activitiesCompleted} / {ionicLessons.length} practical activities completed
        </p>
        {assessmentPassed && (
          <p className="rounded-xl border border-emerald-400/25 bg-emerald-400/[0.06] p-4 text-sm font-semibold text-emerald-200">
            Course assessment passed with {quizScores['ionic-final-assessment']}%.
          </p>
        )}

        <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <FlowDiagram
            title="From first Ionic page to native IoT app"
            nodes={[
              'Create React or Angular web project',
              'Build responsive Ionic components',
              'Connect REST APIs and local storage',
              'Package Android with Capacitor',
            ]}
          />
          <div className="rounded-2xl border border-white/10 bg-[#091524] p-5 sm:p-6">
            <h2 className="flex items-center gap-2 text-base font-bold text-white">
              <Wrench aria-hidden="true" className="size-4 text-blue-300" />
              Prerequisites and tools
            </h2>
            <ul className="mt-4 space-y-2 text-xs leading-relaxed text-slate-300">
              <li>• Node.js LTS, npm, and Ionic CLI</li>
              <li>• VS Code and basic HTML/CSS/JavaScript (TypeScript taught here)</li>
              <li>• Browser for development and Android Studio/SDK for native builds</li>
              <li>• Optional FastAPI, Raspberry Pi, MQTT, and ESP32 sensors</li>
            </ul>
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                { label: 'Ionic React', href: 'https://ionicframework.com/docs/react' },
                { label: 'Ionic Angular', href: 'https://ionicframework.com/docs/angular' },
                { label: 'Capacitor', href: 'https://capacitorjs.com/docs' },
                { label: 'TypeScript', href: 'https://www.typescriptlang.org/docs/' },
                { label: 'Android Studio', href: 'https://developer.android.com/studio' },
              ].map((item) => (
                <a
                  className="inline-flex items-center gap-1 rounded-lg border border-white/10 px-2.5 py-2 text-[10px] font-semibold text-blue-200 hover:bg-white/[0.05]"
                  href={item.href}
                  key={item.label}
                  rel="noreferrer"
                  target="_blank"
                >
                  {item.label}
                  <ExternalLink aria-hidden="true" className="size-3" />
                </a>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="ionic-curriculum-title">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-blue-300">
                13 guided lessons + final assessment
              </p>
              <h2 className="mt-1 text-2xl font-bold text-white" id="ionic-curriculum-title">
                Your Ionic learning path
              </h2>
            </div>
            <span className="text-xs text-slate-400">
              Quiz scores and lesson progress are saved
            </span>
          </div>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {ionicLessons.map((lesson, index) => {
              const isComplete = completedLessons.includes(lesson.slug)
              const score = quizScores[lesson.slug]
              return (
                <Link
                  className="group flex min-h-48 flex-col rounded-2xl border border-white/10 bg-[#091524] p-5 transition hover:-translate-y-0.5 hover:border-blue-400/40 hover:bg-[#0b1a2b]"
                  href={`${COURSE_PATH}/${lesson.slug}`}
                  key={lesson.slug}
                >
                  <span className="flex items-center justify-between gap-3">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-blue-300">
                      Lesson {String(index + 1).padStart(2, '0')} · {lesson.level}
                    </span>
                    {isComplete ? (
                      <CheckCircle2 aria-label="Completed" className="size-4 text-emerald-300" />
                    ) : (
                      <Circle aria-hidden="true" className="size-4 text-slate-600" />
                    )}
                  </span>
                  <h3 className="mt-3 text-base font-bold text-white group-hover:text-blue-100">
                    {lesson.title}
                  </h3>
                  <p className="mt-2 flex-1 text-xs leading-relaxed text-slate-300">
                    {lesson.summary}
                  </p>
                  <span className="mt-4 flex items-center justify-between border-t border-white/[0.07] pt-3 text-[10px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock3 aria-hidden="true" className="size-3" />
                      {lesson.minutes} min{score !== undefined ? ` · Best quiz ${score}%` : ''}
                    </span>
                    <ArrowRight aria-hidden="true" className="size-3.5 text-blue-300" />
                  </span>
                </Link>
              )
            })}
          </div>
          <Link
            className="mt-4 flex items-center justify-between rounded-2xl border border-amber-400/20 bg-[#181711] p-5 transition hover:border-amber-300/40"
            href={`${COURSE_PATH}/assessment`}
          >
            <span className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl bg-amber-400/10">
                <Trophy aria-hidden="true" className="size-5 text-amber-300" />
              </span>
              <span>
                <strong className="block text-sm text-white">
                  Final Ionic Framework assessment
                </strong>
                <span className="mt-1 block text-xs text-slate-400">
                  Six questions · 70% passing score
                  {quizScores['ionic-final-assessment'] !== undefined
                    ? ` · Best score ${quizScores['ionic-final-assessment']}%`
                    : ''}
                </span>
              </span>
            </span>
            <ArrowRight aria-hidden="true" className="size-4 text-amber-300" />
          </Link>
        </section>
      </div>
    </main>
  )
}

export function IonicLessonPage({ lesson }: { lesson: IonicLesson }) {
  const index = ionicLessons.findIndex((item) => item.slug === lesson.slug)
  const previous = ionicLessons[index - 1]
  const next = ionicLessons[index + 1]
  const {
    completedLessons,
    completedActivities,
    isLoaded,
    quizScores,
    toggleLesson,
    toggleActivity,
    recordQuizScore,
    setLastVisitedSlug,
  } = useMobileLearningProgress(IONIC_PROGRESS_SLUGS)
  const complete = completedLessons.includes(lesson.slug)
  const activityComplete = completedActivities.includes(lesson.slug)

  useEffect(() => {
    setLastVisitedSlug(lesson.slug)
  }, [lesson.slug, setLastVisitedSlug])

  return (
    <main className="min-h-screen bg-[#07121f] px-4 py-6 text-[#e6f0fa] sm:px-6 lg:py-9">
      <div className="mx-auto max-w-7xl">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <Link
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-300 hover:text-blue-100"
            href={COURSE_PATH}
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            Ionic Learning Hub
          </Link>
          <span className="font-mono text-xs text-slate-400">
            {isLoaded
              ? completedLessons.filter(
                  (slug) => ionicLessonSlugs.includes(slug) && slug !== 'ionic-final-assessment',
                ).length
              : 0}
            /{ionicLessons.length} lessons complete
          </span>
        </div>
        <div className="grid items-start gap-6 lg:grid-cols-[290px_minmax(0,1fr)]">
          <LessonSidebar
            currentSlug={lesson.slug}
            completedLessons={completedLessons}
            quizScores={quizScores}
          />
          <article className="min-w-0 space-y-6">
            <header className="rounded-3xl border border-blue-500/25 bg-gradient-to-br from-[#101d3c] via-[#091524] to-[#050e18] p-5 shadow-2xl sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-blue-300 sm:text-xs">
                  Ionic · Lesson {String(index + 1).padStart(2, '0')} of {ionicLessons.length}
                </span>
                <span className="rounded-full border border-blue-500/25 bg-blue-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-200">
                  {lesson.level} · {lesson.minutes} min
                </span>
              </div>
              <h1 className="mt-5 text-2xl font-black tracking-tight text-white sm:text-4xl">
                {lesson.title}
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-300 sm:text-base">
                {lesson.summary}
              </p>
              <button
                aria-pressed={complete}
                className={`mt-5 inline-flex min-h-10 items-center gap-2 rounded-xl border px-4 py-2 text-sm font-bold transition ${complete ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-200' : 'border-blue-400/40 bg-blue-500/15 text-blue-100 hover:bg-blue-500/25'}`}
                onClick={() => toggleLesson(lesson.slug)}
                type="button"
              >
                {complete ? (
                  <CheckCircle2 aria-hidden="true" className="size-4 text-emerald-300" />
                ) : (
                  <Check aria-hidden="true" className="size-4" />
                )}
                {complete ? 'Lesson completed' : 'Mark lesson complete'}
              </button>
            </header>
            <section className="rounded-2xl border border-white/10 bg-[#091524] p-5 sm:p-7">
              <h2 className="text-lg font-bold text-white">Learning objectives</h2>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {lesson.objectives.map((item) => (
                  <li
                    className="flex items-start gap-2 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 text-xs leading-relaxed text-slate-300"
                    key={item}
                  >
                    <CheckCircle2
                      aria-hidden="true"
                      className="mt-0.5 size-4 shrink-0 text-blue-400"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
            <section className="rounded-2xl border border-white/10 bg-[#091524] p-5 sm:p-7">
              <div className="flex items-center gap-2">
                <Wrench aria-hidden="true" className="size-4 text-blue-300" />
                <h2 className="text-lg font-bold text-white">Prerequisites</h2>
              </div>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {lesson.prerequisites.map((item) => (
                  <li
                    className="rounded-xl border border-white/[0.06] bg-[#06101c] p-3 text-xs leading-relaxed text-slate-300"
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
                <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-300">
                  {section.body}
                </p>
                {section.bullets && (
                  <ul className="mt-4 space-y-2">
                    {section.bullets.map((bullet) => (
                      <li
                        className="flex gap-2 text-xs leading-relaxed text-slate-300"
                        key={bullet}
                      >
                        <span
                          aria-hidden="true"
                          className="mt-1.5 size-1.5 shrink-0 rounded-full bg-blue-400"
                        />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
                {section.note && (
                  <p className="mt-4 rounded-xl border border-amber-400/20 bg-amber-400/[0.05] p-4 text-xs leading-relaxed text-amber-100/90">
                    {section.note}
                  </p>
                )}
              </section>
            ))}
            <FlowDiagram title={lesson.diagram.title} nodes={lesson.diagram.nodes} />
            <section className="rounded-2xl border border-blue-500/20 bg-[#091524] p-5 sm:p-7">
              <h2 className="text-lg font-bold text-white">Step-by-step tutorial</h2>
              <ol className="mt-4 space-y-3">
                {lesson.steps.map((step, stepIndex) => (
                  <li className="flex gap-3" key={step.title}>
                    <span className="grid size-8 shrink-0 place-items-center rounded-xl border border-blue-400/25 bg-blue-500/10 font-mono text-xs font-bold text-blue-200">
                      {stepIndex + 1}
                    </span>
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
              <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                Practical activity
              </p>
              <h2 className="mt-1 text-lg font-bold text-white">Try it yourself</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">{lesson.activity}</p>
              <button
                aria-pressed={activityComplete}
                className={`mt-4 inline-flex min-h-10 items-center gap-2 rounded-xl border px-4 py-2 text-sm font-bold transition ${activityComplete ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-200' : 'border-emerald-400/30 bg-emerald-500/[0.06] text-emerald-100 hover:bg-emerald-500/15'}`}
                onClick={() => toggleActivity(lesson.slug)}
                type="button"
              >
                {activityComplete ? (
                  <CheckCircle2 aria-hidden="true" className="size-4" />
                ) : (
                  <Check aria-hidden="true" className="size-4" />
                )}
                {activityComplete ? 'Activity completed' : 'Mark activity complete'}
              </button>
            </section>
            <section className="rounded-2xl border border-white/10 bg-[#091524] p-5 sm:p-6">
              <h2 className="text-lg font-bold text-white">Official learning resources</h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {lesson.docs.map((item) => (
                  <li key={item.href}>
                    <a
                      className="inline-flex min-h-9 items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs font-semibold text-blue-200 transition hover:bg-white/[0.05]"
                      href={item.href}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {item.label}
                      <ExternalLink aria-hidden="true" className="size-3" />
                    </a>
                  </li>
                ))}
              </ul>
            </section>
            <LessonQuiz
              onScore={(score) => recordQuizScore(lesson.slug, score)}
              questions={lesson.quiz}
              score={quizScores[lesson.slug]}
              title={`${lesson.title} quiz`}
            />
            <nav aria-label="Lesson navigation" className="grid grid-cols-2 gap-3">
              {previous ? (
                <Link
                  className="flex min-h-14 items-center gap-2 rounded-xl border border-white/10 bg-[#091524] p-3 text-xs font-semibold text-slate-200 transition hover:border-blue-400/30"
                  href={`${COURSE_PATH}/${previous.slug}`}
                >
                  <ArrowLeft aria-hidden="true" className="size-4 shrink-0 text-blue-300" />
                  <span>
                    <span className="block text-[9px] uppercase text-slate-500">
                      Previous lesson
                    </span>
                    {previous.title}
                  </span>
                </Link>
              ) : (
                <span />
              )}
              {next ? (
                <Link
                  className="flex min-h-14 items-center justify-end gap-2 rounded-xl border border-blue-500/20 bg-blue-500/[0.05] p-3 text-right text-xs font-semibold text-blue-100 transition hover:border-blue-400/40"
                  href={`${COURSE_PATH}/${next.slug}`}
                >
                  <span>
                    <span className="block text-[9px] uppercase text-slate-500">Next lesson</span>
                    {next.title}
                  </span>
                  <ArrowRight aria-hidden="true" className="size-4 shrink-0 text-blue-300" />
                </Link>
              ) : (
                <Link
                  className="flex min-h-14 items-center justify-end gap-2 rounded-xl border border-amber-400/20 bg-amber-400/[0.04] p-3 text-xs font-semibold text-amber-100 hover:border-amber-300/40"
                  href={`${COURSE_PATH}/assessment`}
                >
                  <span>
                    <span className="block text-right text-[9px] uppercase text-slate-500">
                      Next up
                    </span>
                    Final assessment
                  </span>
                  <Trophy aria-hidden="true" className="size-4 shrink-0 text-amber-300" />
                </Link>
              )}
            </nav>
          </article>
        </div>
      </div>
    </main>
  )
}

export function IonicAssessmentPage() {
  const { completedLessons, isLoaded, quizScores, recordQuizScore, setLastVisitedSlug } =
    useMobileLearningProgress(IONIC_PROGRESS_SLUGS)
  const completed = ionicLessons.filter((lesson) => completedLessons.includes(lesson.slug)).length
  useEffect(() => {
    setLastVisitedSlug('ionic-final-assessment')
  }, [setLastVisitedSlug])
  return (
    <main className="min-h-screen bg-[#07121f] px-4 py-6 text-[#e6f0fa] sm:px-6 lg:py-9">
      <div className="mx-auto max-w-7xl">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <Link
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-300 hover:text-blue-100"
            href={COURSE_PATH}
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            Ionic Learning Hub
          </Link>
          <span className="font-mono text-xs text-slate-400">
            {isLoaded ? completed : 0}/{ionicLessons.length} lessons complete
          </span>
        </div>
        <div className="grid items-start gap-6 lg:grid-cols-[290px_minmax(0,1fr)]">
          <LessonSidebar
            currentSlug="assessment"
            completedLessons={completedLessons}
            quizScores={quizScores}
          />
          <article className="min-w-0 space-y-6">
            <header className="rounded-3xl border border-amber-400/20 bg-gradient-to-br from-[#242016] via-[#111722] to-[#07121f] p-6 sm:p-9">
              <div className="flex items-center gap-3">
                <span className="grid size-12 place-items-center rounded-2xl bg-amber-400/10">
                  <GraduationCap aria-hidden="true" className="size-6 text-amber-300" />
                </span>
                <div>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-amber-300">
                    Final course assessment
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    Six questions · {PASSING_SCORE}% to pass
                  </p>
                </div>
              </div>
              <h1 className="mt-5 text-2xl font-black text-white sm:text-4xl">
                Ionic Framework assessment
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-300">
                Check your understanding of Ionic architecture, components, TypeScript, REST APIs,
                persistence, Capacitor, Android builds, and IoT.
              </p>
            </header>
            <LessonQuiz
              onScore={(score) => recordQuizScore('ionic-final-assessment', score)}
              passingScore={PASSING_SCORE}
              questions={ionicFinalAssessment}
              score={quizScores['ionic-final-assessment']}
              title="Final Ionic Framework assessment"
            />
            <Link
              className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-white/15 px-4 py-2 text-sm font-semibold text-slate-200 hover:bg-white/[0.05]"
              href={`${COURSE_PATH}/${ionicLessons[ionicLessons.length - 1].slug}`}
            >
              <ArrowLeft aria-hidden="true" className="size-4" />
              Review the final IoT lesson
            </Link>
          </article>
        </div>
      </div>
    </main>
  )
}
