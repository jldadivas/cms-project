'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Award,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Printer,
  Sparkles,
  ChevronLeft,
  ShieldCheck,
  Cpu,
} from 'lucide-react'
import { finalAssessmentQuestions } from '@/data/esp32-course-data'
import { useCourseProgress } from './useCourseProgress'

export function FinalAssessmentView() {
  const { progress, recordFinalExamScore, currentUser } = useCourseProgress()

  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [studentName, setStudentName] = useState(
    progress.userName || currentUser?.name || 'ESP32 IoT Developer'
  )

  const handleSelectOption = (questionId: string, optionId: string) => {
    if (isSubmitted) return
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionId }))
  }

  const calculateScore = () => {
    let score = 0
    finalAssessmentQuestions.forEach((q) => {
      const selected = selectedAnswers[q.id]
      const correctOption = q.options.find((o) => o.isCorrect)
      if (selected && correctOption && selected === correctOption.id) {
        score++
      }
    })
    return score
  }

  const handleSubmit = () => {
    const score = calculateScore()
    setIsSubmitted(true)
    recordFinalExamScore(score, studentName)
  }

  const handleReset = () => {
    setSelectedAnswers({})
    setIsSubmitted(false)
  }

  const currentScore = calculateScore()
  const totalQuestions = finalAssessmentQuestions.length
  const percentage = Math.round((currentScore / totalQuestions) * 100)
  const isPassed = isSubmitted && percentage >= 80
  const allAnswered = finalAssessmentQuestions.every((q) => selectedAnswers[q.id])

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Breadcrumb & Header */}
      <div>
        <Link
          className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:underline mb-3"
          href="/esp32-learning"
        >
          <ChevronLeft className="size-3.5" /> Back to Learning Center Hub
        </Link>
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
              <Award className="size-4" />
              <span>CAPSTONE CERTIFICATION EXAM</span>
            </div>
            <h1 className="mt-1 text-2xl font-black text-white sm:text-4xl">
              ESP32 &amp; IoT System Final Assessment
            </h1>
            <p className="mt-2 text-xs text-slate-300 sm:text-sm max-w-3xl">
              Answer all 10 questions covering ESP32 silicon specifications, dual-bus I2C sensors, ADC1 calibration, non-blocking C++, Raspberry Pi FastAPI endpoints, and Expo Go visualization.
            </p>
          </div>

          <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 px-4 py-2 text-right">
            <span className="block font-mono text-[10px] text-amber-300 uppercase">Passing Threshold</span>
            <span className="font-mono text-base font-bold text-white">80% (8 / 10 Correct)</span>
          </div>
        </div>
      </div>

      {/* Name Input Section */}
      {!isSubmitted && (
        <div className="rounded-2xl border border-white/10 bg-[#081322] p-5 sm:p-6">
          <label className="block text-xs font-mono uppercase tracking-wider text-cyan-300 mb-2 font-semibold">
            Your Full Name (For Certificate of Completion):
          </label>
          <input
            className="w-full max-w-md rounded-xl border border-white/15 bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="e.g. Alex Mercer"
            type="text"
            value={studentName}
          />
        </div>
      )}

      {/* When Passed: Render Certificate of Completion */}
      {isSubmitted && isPassed && (
        <section className="print:m-0 print:p-0 my-8 overflow-hidden rounded-3xl border-2 border-amber-400/60 bg-gradient-to-br from-[#0a1827] via-[#081320] to-[#040b14] p-8 shadow-2xl backdrop-blur-2xl sm:p-12 text-center relative">
          <div className="absolute inset-0 bg-tech-grid opacity-30 pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <div className="mx-auto grid size-16 place-items-center rounded-2xl bg-amber-400/20 text-amber-300 ring-2 ring-amber-400/50 shadow-lg shadow-amber-500/20">
              <Award className="size-10" />
            </div>

            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-amber-300">
                OFFICIAL CERTIFICATE OF COMPLETION
              </span>
              <h2 className="mt-2 text-3xl font-black text-white sm:text-5xl">
                ESP32 IoT Systems Specialist
              </h2>
            </div>

            <p className="text-xs uppercase tracking-widest text-slate-400 font-mono">
              THIS CERTIFIES THAT
            </p>

            <div className="py-2 border-b-2 border-amber-400/40 inline-block px-10">
              <span className="text-2xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-amber-300 font-mono">
                {studentName}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Has successfully mastered embedded microcontroller architecture, dual-bus I2C laser &amp; ambient sensors, ADC1 Wi-Fi isolated sampling, asynchronous Python FastAPI edge servers on Raspberry Pi, and cross-platform mobile telemetry visualization in Expo Go.
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-8 font-mono text-xs border-t border-white/10 text-slate-400">
              <div>
                <span className="block text-slate-500 text-[10px] uppercase">Score Achieved</span>
                <span className="font-bold text-emerald-400 text-sm">{currentScore} / {totalQuestions} ({percentage}%)</span>
              </div>
              <div>
                <span className="block text-slate-500 text-[10px] uppercase">Awarded On</span>
                <span className="font-bold text-white text-sm">{new Date().toLocaleDateString()}</span>
              </div>
              <div>
                <span className="block text-slate-500 text-[10px] uppercase">Curriculum Version</span>
                <span className="font-bold text-cyan-300 text-sm">v2.4 LTS</span>
              </div>
            </div>

            <div className="pt-4 flex justify-center gap-4 print:hidden">
              <button
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 px-6 py-2.5 text-xs font-bold text-[#07121f] shadow-lg shadow-amber-500/20 transition hover:brightness-110"
                onClick={() => window.print()}
                type="button"
              >
                <Printer className="size-4" />
                <span>Print or Save Certificate</span>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Result Status Banner if Not Passed */}
      {isSubmitted && !isPassed && (
        <div className="rounded-2xl border border-amber-500/30 bg-amber-950/20 p-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="grid size-12 place-items-center rounded-xl bg-amber-500/20 text-amber-300 font-mono font-bold text-lg">
              {percentage}%
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Almost there! You scored {currentScore} of {totalQuestions}.</h3>
              <p className="text-xs text-slate-300">Passing score is 80% (8 correct). Review the explanations below and try again!</p>
            </div>
          </div>
          <button
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-white hover:bg-white/[0.08]"
            onClick={handleReset}
            type="button"
          >
            <RotateCcw className="size-3.5" /> Retake Exam
          </button>
        </div>
      )}

      {/* Questions List */}
      <div className="space-y-6">
        {finalAssessmentQuestions.map((q, idx) => {
          const selectedOptionId = selectedAnswers[q.id]

          return (
            <div
              className="rounded-2xl border border-white/10 bg-[#06101c] p-5 sm:p-7 shadow-xl"
              key={q.id}
            >
              <h3 className="text-base font-bold text-white sm:text-lg">
                <span className="font-mono text-cyan-400 mr-2">Q{idx + 1}.</span>
                {q.question}
              </h3>

              <div className="mt-4 space-y-2.5">
                {q.options.map((opt) => {
                  const isSelected = selectedOptionId === opt.id
                  let optionStyle =
                    'border-white/10 bg-white/[0.02] text-slate-300 hover:bg-white/[0.06] hover:border-cyan-500/30'

                  if (isSubmitted) {
                    if (opt.isCorrect) {
                      optionStyle = 'border-emerald-500/60 bg-emerald-950/30 text-emerald-200 font-semibold'
                    } else if (isSelected && !opt.isCorrect) {
                      optionStyle = 'border-rose-500/60 bg-rose-950/30 text-rose-200'
                    } else {
                      optionStyle = 'border-white/5 bg-white/[0.01] text-slate-500 opacity-60'
                    }
                  } else if (isSelected) {
                    optionStyle =
                      'border-cyan-400 bg-cyan-500/15 text-cyan-200 font-semibold shadow-[0_0_12px_rgba(34,211,238,0.2)]'
                  }

                  return (
                    <label
                      className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 text-xs leading-relaxed transition ${optionStyle} ${
                        isSubmitted ? 'cursor-default' : ''
                      }`}
                      key={opt.id}
                    >
                      <input
                        checked={isSelected}
                        className="sr-only"
                        disabled={isSubmitted}
                        name={`final-${q.id}`}
                        onChange={() => handleSelectOption(q.id, opt.id)}
                        type="radio"
                      />
                      <span className="grid size-5 shrink-0 place-items-center rounded-full border border-current font-mono text-[10px] mt-0.5">
                        {opt.id.toUpperCase()}
                      </span>
                      <div className="flex-1">
                        <span>{opt.text}</span>
                        {isSubmitted && (opt.isCorrect || isSelected) && (
                          <p
                            className={`mt-1.5 text-[11px] ${
                              opt.isCorrect ? 'text-emerald-300' : 'text-rose-300'
                            }`}
                          >
                            {opt.explanation}
                          </p>
                        )}
                      </div>
                      {isSubmitted && opt.isCorrect && (
                        <CheckCircle2 className="size-4 shrink-0 text-emerald-400 mt-0.5" />
                      )}
                      {isSubmitted && isSelected && !opt.isCorrect && (
                        <XCircle className="size-4 shrink-0 text-rose-400 mt-0.5" />
                      )}
                    </label>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      {/* Submit Button Bar */}
      {!isSubmitted && (
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
          <span className="text-xs text-slate-400">
            {allAnswered
              ? 'All 10 questions answered! Ready to submit.'
              : `Answered: ${Object.keys(selectedAnswers).length} / ${totalQuestions} questions`}
          </span>

          <button
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-500 px-8 py-3 text-xs font-bold text-[#07121f] shadow-lg shadow-cyan-500/25 transition hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed"
            disabled={!allAnswered}
            onClick={handleSubmit}
            type="button"
          >
            <ShieldCheck className="size-4" />
            <span>Submit Final Exam</span>
          </button>
        </div>
      )}
    </div>
  )
}
