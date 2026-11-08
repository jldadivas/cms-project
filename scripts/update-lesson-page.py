import re

file_path = r'c:\Users\Dadivas\Desktop\expo\src\components\MobileAppLearning\index.tsx'

with open(file_path, 'r', encoding='utf-8') as f:
    code = f.read()

# Pattern for article inside MobileAppLessonPage
old_section_start = code.find('<article className="min-w-0 space-y-6">')
old_section_end = code.rfind('</article>')

if old_section_start != -1 and old_section_end != -1:
    article_inner = code[old_section_start:old_section_end + len('</article>')]
    print(f"Found article of length {len(article_inner)}")
    
    # We want to replace the article block
    new_article = '''<article className="min-w-0 space-y-6">
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
                        <span className="block text-[10px] uppercase text-slate-400">Previous lesson</span>
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
                        <span className="block text-[10px] uppercase text-cyan-300/70">Next lesson</span>
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
                        <CheckCircle2 aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-cyan-400" />
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
                      <li className="rounded-xl border border-white/[0.06] bg-[#06101c] p-3 text-sm text-slate-300" key={tool}>
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
                          <p className="mt-1.5 text-sm leading-relaxed text-slate-300">{step.detail}</p>
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
                      explanation: 'Run commands from the project directory indicated by the lesson. Commands that require platform-specific paths may need adjustment for your operating system.',
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
                  <h2 className="text-lg font-bold text-white">Troubleshooting and common issues</h2>
                  <dl className="mt-4 space-y-3">
                    {lesson.troubleshooting.map((item) => (
                      <div className="rounded-xl border border-white/[0.06] bg-[#06101c] p-4" key={item.problem}>
                        <dt className="text-sm font-semibold text-amber-200">{item.problem}</dt>
                        <dd className="mt-1.5 text-sm leading-relaxed text-slate-300">{item.solution}</dd>
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
                        <span className="block text-[10px] uppercase text-slate-400">Previous lesson</span>
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
                        <span className="block text-[10px] uppercase text-cyan-300/70">Next lesson</span>
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
          </article>'''

    updated_code = code[:old_section_start] + new_article + code[old_section_end + len('</article>'):]
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(updated_code)
    print("Successfully updated MobileAppLessonPage in index.tsx!")
else:
    print("Could not find article boundaries!")

