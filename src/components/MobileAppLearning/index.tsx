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
  Copy,
  Cpu,
  Download,
  GraduationCap,
  Layers,
  Radio,
  Server,
  Smartphone,
  Sparkles,
  Terminal,
  Wrench,
  Youtube,
} from 'lucide-react'
import {
  mobileAppLessons,
  mobileAppLessonSlugs,
  mobileLearningLevels,
  mobileTechnologyTracks,
  type MobileAppLesson,
} from '@/data/mobile-app-course-data'
import { mobileAppPresentations, getPresentationForLesson } from '@/data/mobile-app-presentations'
import { PresentationSlideDeck } from './PresentationSlideDeck'
import { useMobileLearningProgress } from './useMobileLearningProgress'

function CourseProgress({ completed, loaded }: { completed: number; loaded: boolean }) {
  const percent = Math.round((completed / mobileAppLessons.length) * 100)

  return (
    <section
      aria-label="Mobile app course progress"
      className="rounded-2xl border border-white/10 bg-[#091524] p-5 sm:p-7"
    >
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-mono text-xs font-bold uppercase tracking-wider text-cyan-400">
            YOUR COURSE PROGRESS
          </p>
          <h2 className="mt-1 text-xl font-bold text-white">
            {loaded ? completed : 0} of {mobileAppLessons.length} lessons complete
          </h2>
        </div>
        <span className="font-mono text-sm font-bold text-cyan-300">{percent}%</span>
      </div>
      <div
        aria-label={`${percent}% of lessons completed`}
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={percent}
        className="mt-4 h-2.5 overflow-hidden rounded-full bg-slate-800"
        role="progressbar"
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="mt-2 text-xs text-slate-400">Completed lessons are saved in this browser.</p>
    </section>
  )
}

function ArchitectureDiagram() {
  const nodes = [
    { title: 'Sensors', detail: 'ToF · light · soil', icon: Radio },
    { title: 'ESP32', detail: 'I²C · ADC · Wi-Fi', icon: Cpu },
    { title: 'Raspberry Pi', detail: 'MQTT · SQLite · FastAPI', icon: Server },
    { title: 'Mobile app', detail: 'Flutter or Ionic', icon: Smartphone },
  ]

  return (
    <section
      aria-labelledby="architecture-title"
      className="rounded-2xl border border-cyan-500/25 bg-[#091524] p-5 sm:p-7"
    >
      <div className="flex items-center gap-2">
        <Layers aria-hidden="true" className="size-5 text-cyan-400" />
        <div>
          <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-cyan-300">
            COURSE ARCHITECTURE
          </p>
          <h2 className="text-lg font-bold text-white" id="architecture-title">
            From physical sensor to mobile screen
          </h2>
        </div>
      </div>
      <ol className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {nodes.map(({ title, detail, icon: Icon }, index) => (
          <li
            className="relative flex min-w-0 items-center gap-3 rounded-xl border border-cyan-400/15 bg-[#06101c] p-4"
            key={title}
          >
            <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-cyan-500/10 text-cyan-300">
              <Icon aria-hidden="true" className="size-5" />
            </span>
            <span className="min-w-0">
              <strong className="block text-sm text-white">{title}</strong>
              <span className="mt-1 block text-xs text-slate-400">{detail}</span>
            </span>
            {index < nodes.length - 1 && (
              <ArrowRight
                aria-hidden="true"
                className="absolute -right-3 z-10 hidden size-5 text-cyan-400 xl:block"
              />
            )}
          </li>
        ))}
      </ol>
      <p className="mt-4 text-xs leading-relaxed text-slate-400">
        The phone reads the Pi API. The current backend exposes REST endpoints; WebSocket streaming
        is an optional extension covered in the lessons.
      </p>
    </section>
  )
}

function CourseVideo({
  title,
  description,
  src,
  poster,
}: {
  title: string
  description: string
  src: string
  poster: string
}) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-cyan-500/25 bg-[#091524]">
      <video
        aria-label={title}
        className="aspect-video w-full bg-black object-contain"
        controls
        playsInline
        poster={poster}
        preload="metadata"
        src={src}
      >
        Your browser does not support embedded video.
      </video>
      <figcaption className="border-t border-white/[0.08] p-4 sm:p-5">
        <h3 className="font-bold text-white">{title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-slate-300">{description}</p>
      </figcaption>
    </figure>
  )
}

function YouTubeLessonVideo({
  video,
}: {
  video: (typeof mobileTechnologyTracks)[number]['video']
}) {
  const watchUrl = `https://www.youtube.com/watch?v=${video.id}`

  return (
    <section
      aria-labelledby="youtube-video-heading"
      className="rounded-2xl border border-red-500/20 bg-[#091524] p-5 sm:p-7"
      id="youtube-video"
    >
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-wider text-red-300">
            <Youtube aria-hidden="true" className="size-4" />
            YouTube tutorial
          </p>
          <h2 className="mt-1 text-lg font-bold text-white" id="youtube-video-heading">
            {video.title}
          </h2>
          <p className="mt-1 text-xs text-slate-400">Video by {video.channel}</p>
        </div>
        <a
          className="inline-flex min-h-9 items-center rounded-lg border border-white/15 bg-white/[0.04] px-3 text-xs font-semibold text-slate-200 transition hover:border-red-400/40 hover:text-white"
          href={watchUrl}
          rel="noreferrer"
          target="_blank"
        >
          Watch on YouTube
        </a>
      </div>
      <div className="aspect-video overflow-hidden rounded-xl border border-white/10 bg-black">
        <iframe
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="size-full"
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          src={`https://www.youtube-nocookie.com/embed/${video.id}`}
          title={video.title}
        />
      </div>
      <p className="mt-3 text-sm leading-relaxed text-slate-300">{video.description}</p>
    </section>
  )
}

export function MobileAppLearningHub() {
  const { completedLessons, isLoaded } = useMobileLearningProgress(mobileAppLessonSlugs)
  const nextLesson =
    mobileAppLessons.find((lesson) => !completedLessons.includes(lesson.slug)) ??
    mobileAppLessons[0]

  return (
    <main className="min-h-screen bg-[#07121f] px-4 py-8 text-[#e6f0fa] sm:px-6 lg:py-12">
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="relative overflow-hidden rounded-3xl border border-cyan-500/25 bg-gradient-to-br from-[#081525] via-[#071322] to-[#050c16] p-6 shadow-2xl sm:p-10">
          <div className="pointer-events-none absolute -right-20 -top-20 size-80 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="relative max-w-4xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-300">
              <Sparkles aria-hidden="true" className="size-3.5" />
              PROJECT-BASED MOBILE DEVELOPMENT COURSE
            </span>
            <h1 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-5xl">
              Mobile App <span className="text-cyan-400">Development</span>
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-300 sm:text-base">
              Learn Flutter with Dart or Ionic with React, configure Android tools, and build mobile
              dashboards that display real sensor readings from an ESP32 and Raspberry Pi.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-500 px-5 py-3 text-sm font-bold text-[#07121f] transition hover:brightness-110"
                href={`/mobile-app-learning/${nextLesson.slug}`}
              >
                <BookOpen aria-hidden="true" className="size-4" />
                {completedLessons.length ? 'Continue learning' : 'Start learning'}
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
              <Link
                className="inline-flex items-center gap-2 rounded-xl border border-cyan-400/30 bg-cyan-500/10 px-5 py-3 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-500/20"
                href="/mobile-app-learning/flutter-iot-application"
              >
                <Smartphone aria-hidden="true" className="size-4" />
                Flutter IoT project
              </Link>
            </div>
          </div>
        </section>

        <CourseProgress completed={completedLessons.length} loaded={isLoaded} />
        <ArchitectureDiagram />

        <section aria-labelledby="mobile-demo-heading">
          <div className="mb-4">
            <p className="font-mono text-xs font-bold uppercase tracking-wider text-cyan-400">
              PROJECT VIDEO
            </p>
            <h2 className="mt-1 text-2xl font-bold text-white" id="mobile-demo-heading">
              See the mobile app in action
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-300">
              Watch the existing Expo Go app display live sensor readings supplied by the Raspberry
              Pi API. This is a demonstration of the project mobile client, not a recording of the
              Flutter or Ionic lessons.
            </p>
          </div>
          <CourseVideo
            description="The mobile dashboard presents the project's sensor readings on a phone. Use the controls to play, pause, adjust volume, seek, or enter fullscreen."
            poster="/docs/expo-go-mobile-dashboard-screenshot.jpg"
            src="/docs/expo-go-app-demo.mp4"
            title="Expo Go mobile app demonstration"
          />
        </section>

        <section aria-labelledby="technology-paths">
          <div className="mb-5">
            <p className="font-mono text-xs font-bold uppercase tracking-wider text-cyan-400">
              EXPLORE THE TOOLKIT
            </p>
            <h2 className="mt-1 text-2xl font-bold text-white" id="technology-paths">
              Choose a technology
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {mobileTechnologyTracks.map((track) => (
              <Link
                className="group rounded-2xl border border-white/10 bg-[#091524] p-5 transition hover:-translate-y-0.5 hover:border-cyan-400/40 hover:bg-[#0b1a2b]"
                href={
                  track.id === 'capacitor'
                    ? '/mobile-app-learning/capacitor'
                    : track.id === 'flutter'
                      ? '/mobile-app-learning/flutter'
                      : track.id === 'ionic'
                        ? '/mobile-app-learning/ionic'
                        : track.id === 'android-studio'
                          ? '/mobile-app-learning/android-studio'
                          : track.id === 'visual-studio-code'
                            ? '/mobile-app-learning/vscode'
                            : `/mobile-app-learning/${track.lessonSlug}`
                }
                id={track.id}
                key={track.id}
              >
                <span className="inline-flex size-10 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-500/10 text-cyan-300">
                  {track.id === 'flutter' ? (
                    <Layers aria-hidden="true" className="size-5" />
                  ) : track.id === 'ionic' || track.id === 'capacitor' ? (
                    <Smartphone aria-hidden="true" className="size-5" />
                  ) : track.id === 'android-studio' ? (
                    <Wrench aria-hidden="true" className="size-5" />
                  ) : track.id === 'visual-studio-code' ? (
                    <Terminal aria-hidden="true" className="size-5" />
                  ) : track.id === 'complete-iot-mobile-app' ? (
                    <GraduationCap aria-hidden="true" className="size-5" />
                  ) : (
                    <Cpu aria-hidden="true" className="size-5" />
                  )}
                </span>
                <h3 className="mt-4 text-lg font-bold text-white group-hover:text-cyan-100">
                  {track.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{track.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-cyan-300">
                  {track.id === 'flutter'
                    ? 'Open the complete Flutter course'
                    : track.id === 'ionic'
                      ? 'Open the complete Ionic course'
                      : track.id === 'android-studio'
                        ? 'Open the complete Android course'
                        : track.id === 'visual-studio-code'
                          ? 'Open the complete VS Code course'
                          : 'Lesson and YouTube tutorial'}
                  <ArrowRight
                    aria-hidden="true"
                    className="size-3.5 transition-transform group-hover:translate-x-0.5"
                  />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Course Presentation Slide Decks Section */}
        <section aria-labelledby="presentations-heading">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-wider text-cyan-400">
                COURSE PRESENTATION SLIDE DECKS (7 DECKS)
              </p>
              <h2
                className="mt-1 text-2xl font-bold text-white sm:text-3xl"
                id="presentations-heading"
              >
                Download & View PowerPoint Decks
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-300">
                Official PowerPoint (.pptx) presentations aligned with each module. Download the
                slides for offline studying and lecturing, or view the interactive slide player
                embedded directly inside each lesson page.
              </p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {mobileAppPresentations.map((ppt) => (
              <div
                className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-[#091524] p-5 shadow-xl transition hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-[#0b1a2b]"
                key={ppt.id}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-md border border-cyan-500/25 bg-cyan-500/10 px-2 py-0.5 font-mono text-[10px] font-bold uppercase text-cyan-300">
                      {ppt.badge}
                    </span>
                    <span className="font-mono text-[11px] text-slate-400">
                      {ppt.slideCount} Slides • {ppt.fileSize}
                    </span>
                  </div>
                  <h3 className="mt-3 text-base font-bold text-white group-hover:text-cyan-200">
                    {ppt.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-300 line-clamp-2">
                    {ppt.subtitle}
                  </p>
                </div>
                <div className="mt-5 flex items-center gap-2 border-t border-white/[0.08] pt-3">
                  <Link
                    className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-cyan-400/30 bg-cyan-500/10 px-3 py-2 text-xs font-semibold text-cyan-200 transition hover:bg-cyan-500/20"
                    href={`/mobile-app-learning/${ppt.lessonSlug}#presentation`}
                  >
                    <span>View Slides</span>
                    <ArrowRight className="size-3" />
                  </Link>
                  <a
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-400 px-3 py-2 text-xs font-bold text-[#07121f] transition hover:brightness-110"
                    download={ppt.fileName}
                    href={ppt.downloadUrl}
                    title={`Download ${ppt.fileName}`}
                  >
                    <Download className="size-3.5" />
                    <span>PPTX</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="curriculum-heading" className="space-y-8">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-wider text-cyan-400">
              18 GUIDED LESSONS
            </p>
            <h2 className="mt-1 text-2xl font-bold text-white" id="curriculum-heading">
              Follow the learning path
            </h2>
          </div>
          {mobileLearningLevels.map(({ level, description }) => {
            const lessons = mobileAppLessons.filter((lesson) => lesson.level === level)

            return (
              <section aria-label={`${level} lessons`} key={level}>
                <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
                  <div>
                    <h3 className="text-xl font-bold text-white">{level}</h3>
                    <p className="mt-1 text-sm text-slate-400">{description}</p>
                  </div>
                  <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 font-mono text-xs text-cyan-200">
                    {lessons.length} lessons
                  </span>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  {lessons.map((lesson) => {
                    const complete = completedLessons.includes(lesson.slug)
                    const lessonNumber = mobileAppLessons.indexOf(lesson) + 1

                    return (
                      <Link
                        className="group flex h-full gap-4 rounded-2xl border border-white/10 bg-[#091524] p-4 transition hover:border-cyan-400/40 hover:bg-[#0b1a2b] sm:p-5"
                        href={`/mobile-app-learning/${lesson.slug}`}
                        key={lesson.slug}
                      >
                        <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-cyan-400/20 bg-cyan-500/10 font-mono text-sm font-bold text-cyan-300">
                          {complete ? (
                            <CheckCircle2
                              aria-label="Completed"
                              className="size-5 text-emerald-300"
                            />
                          ) : (
                            String(lessonNumber).padStart(2, '0')
                          )}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex flex-wrap items-center gap-2">
                            <span className="font-bold text-white group-hover:text-cyan-100">
                              {lesson.title}
                            </span>
                            <span className="rounded-full border border-white/10 px-2 py-0.5 font-mono text-[9px] text-slate-400">
                              {lesson.minutes} min
                            </span>
                          </span>
                          <span className="mt-1 block text-sm leading-relaxed text-slate-400">
                            {lesson.summary}
                          </span>
                          <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-cyan-300">
                            Open lesson
                            <ArrowRight
                              aria-hidden="true"
                              className="size-3.5 transition-transform group-hover:translate-x-0.5"
                            />
                          </span>
                        </span>
                      </Link>
                    )
                  })}
                </div>
              </section>
            )
          })}
        </section>
      </div>
    </main>
  )
}

function CodeExample({ example }: { example: MobileAppLesson['examples'][number] }) {
  const [copied, setCopied] = useState(false)
  const [copyError, setCopyError] = useState<string | null>(null)

  async function copyCode() {
    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error('Clipboard access is unavailable in this browser.')
      }
      await navigator.clipboard.writeText(example.code)
      setCopied(true)
      setCopyError(null)
      window.setTimeout(() => setCopied(false), 1800)
    } catch (error) {
      setCopyError(error instanceof Error ? error.message : 'Could not copy this example.')
    }
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-cyan-500/25 bg-[#091524]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] bg-[#07111e] px-4 py-3">
        <div className="flex flex-wrap items-center gap-2">
          <Terminal aria-hidden="true" className="size-4 text-cyan-400" />
          <span className="font-mono text-xs font-semibold text-white">{example.filename}</span>
          <span className="rounded border border-cyan-500/30 bg-cyan-500/10 px-2 py-0.5 font-mono text-[10px] uppercase text-cyan-300">
            {example.language}
          </span>
        </div>
        <button
          aria-label={copied ? 'Code copied' : 'Copy code'}
          className="inline-flex min-h-9 items-center gap-2 rounded-lg border border-white/15 bg-white/[0.04] px-3 text-xs font-semibold text-slate-200 transition hover:border-cyan-400/40 hover:text-white"
          onClick={copyCode}
          type="button"
        >
          {copied ? (
            <Check aria-hidden="true" className="size-3.5 text-emerald-300" />
          ) : (
            <Copy aria-hidden="true" className="size-3.5 text-cyan-300" />
          )}
          {copied ? 'Copied' : 'Copy code'}
        </button>
      </div>
      <p className="border-b border-white/[0.06] px-4 py-3 text-xs leading-relaxed text-slate-300 sm:px-5 sm:text-sm">
        {example.explanation}
      </p>
      <Highlight code={example.code} language={example.language} theme={themes.vsDark}>
        {({ getLineProps, getTokenProps, tokens }) => (
          <pre className="max-h-[36rem] overflow-auto bg-[#050c14] p-4 font-mono text-xs leading-6 sm:p-5 sm:text-sm">
            {tokens.map((line, lineIndex) => (
              <div key={lineIndex} {...getLineProps({ className: 'table-row', line })}>
                <span className="table-cell select-none pr-4 text-right text-slate-600">
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
      {copyError && (
        <p className="border-t border-rose-500/20 px-4 py-2 text-xs text-rose-200" role="alert">
          {copyError}
        </p>
      )}
    </section>
  )
}

export function MobileAppLessonPage({ lesson }: { lesson: MobileAppLesson }) {
  const index = mobileAppLessons.findIndex((item) => item.slug === lesson.slug)
  const previous = mobileAppLessons[index - 1] ?? null
  const next = mobileAppLessons[index + 1] ?? null
  const technologyTrack = mobileTechnologyTracks.find((track) => track.lessonSlug === lesson.slug)
  const presentation = getPresentationForLesson(lesson.slug)
  const [activeTab, setActiveTab] = useState<'presentation' | 'written'>(
    presentation ? 'presentation' : 'written',
  )

  useEffect(() => {
    setActiveTab(presentation ? 'presentation' : 'written')
  }, [lesson.slug, presentation])

  const { completedLessons, isLoaded, toggleLesson } =
    useMobileLearningProgress(mobileAppLessonSlugs)
  const isComplete = completedLessons.includes(lesson.slug)
  const levelNumber = mobileLearningLevels.findIndex((item) => item.level === lesson.level) + 1

  return (
    <main className="min-h-screen bg-[#07121f] px-4 py-6 text-[#e6f0fa] sm:px-6 lg:py-9">
      <div className="mx-auto max-w-7xl">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <Link
            className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 hover:text-cyan-100"
            href="/mobile-app-learning"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            Mobile App Learning Center
          </Link>
          <span className="font-mono text-xs text-slate-400">
            {isLoaded ? completedLessons.length : 0}/{mobileAppLessons.length} complete
          </span>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[290px_minmax(0,1fr)]">
          <aside className="rounded-2xl border border-white/10 bg-[#091524] p-4 lg:sticky lg:top-24">
            <div className="mb-3 flex items-center gap-2 border-b border-white/[0.08] pb-3">
              <BookOpen aria-hidden="true" className="size-4 text-cyan-300" />
              <h2 className="text-sm font-bold text-white">Course lessons</h2>
            </div>
            <nav
              aria-label="Mobile app course lessons"
              className="max-h-[45vh] space-y-1 overflow-y-auto pr-1 lg:max-h-[calc(100vh-11rem)]"
            >
              {mobileLearningLevels.map(({ level }) => (
                <div className="mb-3" key={level}>
                  <p className="mb-1 px-2 font-mono text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                    {level}
                  </p>
                  {mobileAppLessons
                    .filter((item) => item.level === level)
                    .map((item) => {
                      const complete = completedLessons.includes(item.slug)
                      const current = lesson.slug === item.slug
                      return (
                        <Link
                          aria-current={current ? 'page' : undefined}
                          className={`flex items-start gap-2 rounded-lg px-2 py-2 text-xs leading-snug transition ${
                            current
                              ? 'border border-cyan-400/30 bg-cyan-500/10 font-semibold text-cyan-100'
                              : 'text-slate-300 hover:bg-white/[0.05]'
                          }`}
                          href={`/mobile-app-learning/${item.slug}`}
                          key={item.slug}
                        >
                          {complete ? (
                            <CheckCircle2
                              aria-hidden="true"
                              className="mt-0.5 size-3.5 shrink-0 text-emerald-300"
                            />
                          ) : (
                            <Circle
                              aria-hidden="true"
                              className="mt-0.5 size-3.5 shrink-0 text-slate-600"
                            />
                          )}
                          {item.title}
                        </Link>
                      )
                    })}
                </div>
              ))}
            </nav>
          </aside>

          <article className="min-w-0 space-y-6">
            {/* View Switcher if presentation exists */}
            {presentation && (
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[#091524] p-2 sm:p-2.5">
                <div className="flex items-center gap-1.5">
                  <button
                    className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition ${
                      activeTab === 'presentation'
                        ? 'border border-cyan-400/40 bg-cyan-500/20 text-cyan-200 shadow-sm'
                        : 'text-slate-400 hover:bg-white/[0.04] hover:text-white'
                    }`}
                    onClick={() => setActiveTab('presentation')}
                    type="button"
                  >
                    <Layers className="size-3.5 text-cyan-300" />
                    <span>PowerPoint Slides ({presentation.slideCount} Slides)</span>
                  </button>
                  <button
                    className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition ${
                      activeTab === 'written'
                        ? 'border border-cyan-400/40 bg-cyan-500/20 text-cyan-200 shadow-sm'
                        : 'text-slate-400 hover:bg-white/[0.04] hover:text-white'
                    }`}
                    onClick={() => setActiveTab('written')}
                    type="button"
                  >
                    <BookOpen className="size-3.5 text-cyan-300" />
                    <span>Written Lesson &amp; Code</span>
                  </button>
                </div>

                <button
                  aria-pressed={isComplete}
                  className={`inline-flex min-h-8 items-center gap-1.5 rounded-xl border px-3 text-xs font-semibold transition ${
                    isComplete
                      ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-200'
                      : 'border-white/10 bg-white/[0.04] text-slate-300 hover:border-cyan-400/30 hover:text-white'
                  }`}
                  onClick={() => toggleLesson(lesson.slug)}
                  type="button"
                >
                  <CheckCircle2
                    className={`size-3.5 ${isComplete ? 'text-emerald-400' : 'text-slate-500'}`}
                  />
                  <span>{isComplete ? 'Completed' : 'Mark complete'}</span>
                </button>
              </div>
            )}

            {/* If presentation tab is active: SHOW JUST THE PPT SLIDE DECK WITH NEXT SLIDE */}
            {presentation && activeTab === 'presentation' ? (
              <div className="space-y-6">
                <PresentationSlideDeck presentation={presentation} />

                {/* Bottom Navigation */}
                <nav
                  aria-label="Previous and next lesson"
                  className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5"
                >
                  {previous ? (
                    <Link
                      className="inline-flex max-w-[48%] items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-3 text-sm text-slate-200 transition hover:border-cyan-400/30 hover:bg-white/[0.06]"
                      href={`/mobile-app-learning/${previous.slug}`}
                    >
                      <ArrowLeft aria-hidden="true" className="size-4 shrink-0 text-cyan-400" />
                      <span className="min-w-0">
                        <span className="block text-[10px] uppercase text-slate-400">
                          Previous lesson
                        </span>
                        <span className="block truncate font-semibold">{previous.title}</span>
                      </span>
                    </Link>
                  ) : (
                    <span />
                  )}
                  {next ? (
                    <Link
                      className="inline-flex max-w-[48%] items-center gap-2 rounded-xl border border-cyan-500/30 bg-cyan-500/10 p-3 text-sm text-cyan-100 transition hover:bg-cyan-500/20"
                      href={`/mobile-app-learning/${next.slug}`}
                    >
                      <span className="min-w-0 text-right">
                        <span className="block text-[10px] uppercase text-cyan-300/70">
                          Next lesson
                        </span>
                        <span className="block truncate font-semibold">{next.title}</span>
                      </span>
                      <ArrowRight aria-hidden="true" className="size-4 shrink-0 text-cyan-300" />
                    </Link>
                  ) : (
                    <Link
                      className="inline-flex items-center gap-2 rounded-xl border border-cyan-500/30 bg-cyan-500/10 p-3 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-500/20"
                      href="/mobile-app-learning"
                    >
                      Finish course
                      <CheckCircle2 aria-hidden="true" className="size-4 text-cyan-300" />
                    </Link>
                  )}
                </nav>
              </div>
            ) : (
              <>
                <header className="rounded-3xl border border-cyan-500/25 bg-gradient-to-br from-[#091524] via-[#071322] to-[#050e18] p-5 shadow-2xl sm:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-cyan-300 sm:text-xs">
                      MOBILE APP DEVELOPMENT · LESSON {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="rounded-full border border-cyan-500/25 bg-cyan-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-cyan-200">
                      {lesson.level} · LEVEL {levelNumber}
                    </span>
                  </div>
                  <h1 className="mt-5 text-2xl font-black tracking-tight text-white sm:text-4xl">
                    {lesson.title}
                  </h1>
                  <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-300 sm:text-base">
                    {lesson.summary}
                  </p>
                  <button
                    aria-pressed={isComplete}
                    className={`mt-5 inline-flex min-h-10 items-center gap-2 rounded-xl border px-4 py-2 text-sm font-bold transition ${
                      isComplete
                        ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-200'
                        : 'border-cyan-400/40 bg-cyan-500/15 text-cyan-100 hover:bg-cyan-500/25'
                    }`}
                    onClick={() => toggleLesson(lesson.slug)}
                    type="button"
                  >
                    {isComplete ? (
                      <CheckCircle2 aria-hidden="true" className="size-4 text-emerald-300" />
                    ) : (
                      <Check aria-hidden="true" className="size-4" />
                    )}
                    {isComplete ? 'Lesson completed' : 'Mark lesson complete'}
                  </button>
                </header>

                <section className="rounded-2xl border border-white/10 bg-[#091524] p-5 sm:p-7">
                  <h2 className="text-lg font-bold text-white">Learning objectives</h2>
                  <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                    {lesson.objectives.map((objective) => (
                      <li
                        className="flex items-start gap-2 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 text-sm leading-relaxed text-slate-300"
                        key={objective}
                      >
                        <CheckCircle2
                          aria-hidden="true"
                          className="mt-0.5 size-4 shrink-0 text-cyan-400"
                        />
                        {objective}
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="rounded-2xl border border-white/10 bg-[#091524] p-5 sm:p-7">
                  <h2 className="text-lg font-bold text-white">Introduction</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{lesson.introduction}</p>
                  <h3 className="mt-5 text-base font-semibold text-cyan-200">How it works</h3>
                  <p className="mt-2 whitespace-pre-line text-sm leading-7 text-slate-300">
                    {lesson.explanation}
                  </p>
                </section>

                {technologyTrack && <YouTubeLessonVideo video={technologyTrack.video} />}

                {lesson.slug === 'end-to-end-integration' && (
                  <section aria-labelledby="end-to-end-video-heading">
                    <div className="mb-3">
                      <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-cyan-300">
                        SYSTEM DEMONSTRATION
                      </p>
                      <h2
                        className="mt-1 text-lg font-bold text-white"
                        id="end-to-end-video-heading"
                      >
                        Watch the IoT system integration
                      </h2>
                    </div>
                    <CourseVideo
                      description="This existing project video demonstrates the IoT system as a whole; it complements the mobile app walkthrough but is not a Flutter-specific tutorial."
                      poster="/docs/iot-video-poster.jpg"
                      src="/docs/iot-system-live-demo.mp4"
                      title="ESP32, Raspberry Pi, and mobile system demo"
                    />
                  </section>
                )}

                <section className="rounded-2xl border border-white/10 bg-[#091524] p-5 sm:p-7">
                  <div className="flex items-center gap-2">
                    <Wrench aria-hidden="true" className="size-4 text-cyan-300" />
                    <h2 className="text-lg font-bold text-white">Required software and tools</h2>
                  </div>
                  <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                    {lesson.tools.map((tool) => (
                      <li
                        className="rounded-xl border border-white/[0.06] bg-[#06101c] p-3 text-sm text-slate-300"
                        key={tool}
                      >
                        {tool}
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="rounded-2xl border border-cyan-500/20 bg-[#091524] p-5 sm:p-7">
                  <h2 className="text-lg font-bold text-white">Step-by-step tutorial</h2>
                  <ol className="mt-4 space-y-3">
                    {lesson.steps.map((step, stepIndex) => (
                      <li className="flex gap-3" key={step.title}>
                        <span className="grid size-8 shrink-0 place-items-center rounded-xl border border-cyan-400/25 bg-cyan-500/10 font-mono text-xs font-bold text-cyan-200">
                          {stepIndex + 1}
                        </span>
                        <div className="min-w-0 flex-1 rounded-xl border border-white/[0.07] bg-[#06101c] p-4">
                          <h3 className="text-sm font-semibold text-white">{step.title}</h3>
                          <p className="mt-1.5 text-sm leading-relaxed text-slate-300">
                            {step.detail}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </section>

                <section>
                  <h2 className="mb-3 text-lg font-bold text-white">Installation commands</h2>
                  <CodeExample
                    example={{
                      filename: 'Terminal',
                      language: 'bash',
                      code: lesson.commands,
                      explanation:
                        'Run commands from the project directory indicated by the lesson. Commands that require platform-specific paths may need adjustment for your operating system.',
                    }}
                  />
                </section>

                <section className="space-y-4">
                  <div>
                    <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-cyan-300">
                      CODE EXAMPLES
                    </p>
                    <h2 className="mt-1 text-lg font-bold text-white">Working implementation</h2>
                  </div>
                  <div className="space-y-4">
                    {lesson.examples.map((example) => (
                      <CodeExample example={example} key={example.filename} />
                    ))}
                  </div>
                </section>

                <section className="rounded-2xl border border-white/10 bg-[#091524] p-5 sm:p-7">
                  <h2 className="text-lg font-bold text-white">Expected output</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{lesson.expectedOutput}</p>
                </section>

                <section className="rounded-2xl border border-cyan-500/20 bg-[#091524] p-5 sm:p-7">
                  <div className="flex items-center gap-2">
                    <Sparkles aria-hidden="true" className="size-4 text-cyan-300" />
                    <h2 className="text-lg font-bold text-white">Hands-on activity</h2>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{lesson.activity}</p>
                </section>

                <section className="rounded-2xl border border-white/10 bg-[#091524] p-5 sm:p-7">
                  <h2 className="text-lg font-bold text-white">
                    Troubleshooting and common issues
                  </h2>
                  <dl className="mt-4 space-y-3">
                    {lesson.troubleshooting.map((item) => (
                      <div
                        className="rounded-xl border border-white/[0.06] bg-[#06101c] p-4"
                        key={item.problem}
                      >
                        <dt className="text-sm font-semibold text-amber-200">{item.problem}</dt>
                        <dd className="mt-1.5 text-sm leading-relaxed text-slate-300">
                          {item.solution}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </section>

                <details className="group rounded-2xl border border-white/10 bg-[#091524] p-5 sm:p-7">
                  <summary className="cursor-pointer list-none text-lg font-bold text-white">
                    Knowledge check
                    <span className="ml-2 text-xs font-normal text-cyan-300">Show question</span>
                  </summary>
                  <p className="mt-4 text-sm leading-relaxed text-slate-200">
                    {lesson.assessment.question}
                  </p>
                  <details className="mt-3 rounded-xl border border-white/[0.06] bg-[#06101c] p-4">
                    <summary className="cursor-pointer text-xs font-semibold text-cyan-200">
                      Reveal answer
                    </summary>
                    <p className="mt-2 text-sm leading-relaxed text-slate-300">
                      {lesson.assessment.answer}
                    </p>
                  </details>
                </details>

                <nav
                  aria-label="Previous and next lesson"
                  className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5"
                >
                  {previous ? (
                    <Link
                      className="inline-flex max-w-[48%] items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-3 text-sm text-slate-200 transition hover:border-cyan-400/30 hover:bg-white/[0.06]"
                      href={`/mobile-app-learning/${previous.slug}`}
                    >
                      <ArrowLeft aria-hidden="true" className="size-4 shrink-0 text-cyan-400" />
                      <span className="min-w-0">
                        <span className="block text-[10px] uppercase text-slate-400">
                          Previous lesson
                        </span>
                        <span className="block truncate font-semibold">{previous.title}</span>
                      </span>
                    </Link>
                  ) : (
                    <span />
                  )}
                  {next ? (
                    <Link
                      className="inline-flex max-w-[48%] items-center gap-2 rounded-xl border border-cyan-500/30 bg-cyan-500/10 p-3 text-sm text-cyan-100 transition hover:bg-cyan-500/20"
                      href={`/mobile-app-learning/${next.slug}`}
                    >
                      <span className="min-w-0 text-right">
                        <span className="block text-[10px] uppercase text-cyan-300/70">
                          Next lesson
                        </span>
                        <span className="block truncate font-semibold">{next.title}</span>
                      </span>
                      <ArrowRight aria-hidden="true" className="size-4 shrink-0 text-cyan-300" />
                    </Link>
                  ) : (
                    <Link
                      className="inline-flex items-center gap-2 rounded-xl border border-cyan-500/30 bg-cyan-500/10 p-3 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-500/20"
                      href="/mobile-app-learning"
                    >
                      Finish course
                      <CheckCircle2 aria-hidden="true" className="size-4 text-cyan-300" />
                    </Link>
                  )}
                </nav>
              </>
            )}
          </article>
        </div>
      </div>
    </main>
  )
}
