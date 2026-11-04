'use client'

import React, { useState } from 'react'
import { CheckCircle2, XCircle, HelpCircle, Award, RotateCcw, ArrowRight } from 'lucide-react'
import type { QuizQuestion } from '@/data/esp32-course-data'

interface QuizCardProps {
  moduleId: string
  title: string
  description: string
  passingScore: number
  questions: QuizQuestion[]
  onScoreSaved?: (score: number) => void
}

export function QuizCard({
  moduleId,
  title,
  description,
  passingScore,
  questions,
  onScoreSaved,
}: QuizCardProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showHints, setShowHints] = useState<Record<string, boolean>>({})

  const handleSelectOption = (questionId: string, optionId: string) => {
    if (isSubmitted) return
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionId }))
  }

  const toggleHint = (questionId: string) => {
    setShowHints((prev) => ({ ...prev, [questionId]: !prev[questionId] }))
  }

  const calculateScore = () => {
    let score = 0
    questions.forEach((q) => {
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
    if (onScoreSaved) {
      onScoreSaved(score)
    }
  }

  const handleReset = () => {
    setSelectedAnswers({})
    setIsSubmitted(false)
    setShowHints({})
  }

  const allAnswered = questions.every((q) => selectedAnswers[q.id])
  const currentScore = calculateScore()
  const isPassed = isSubmitted && currentScore >= passingScore

  return (
    <div className="my-10 rounded-2xl border border-cyan-500/30 bg-[#091524] p-6 shadow-2xl backdrop-blur-xl sm:p-8">
      {/* Header */}
      <div className="border-b border-white/[0.08] pb-5">
        <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
          <Award className="size-4" />
          <span>Knowledge Check Assessment</span>
        </div>
        <h3 className="mt-1 text-xl font-bold text-white sm:text-2xl">{title}</h3>
        <p className="mt-2 text-xs text-slate-300 sm:text-sm">{description}</p>
      </div>

      {/* Questions List */}
      <div className="mt-6 space-y-6">
        {questions.map((q, qIndex) => {
          const selectedOptionId = selectedAnswers[q.id]

          return (
            <div
              className="rounded-xl border border-white/[0.08] bg-[#06101c] p-4 sm:p-6"
              key={q.id}
            >
              <div className="flex items-start justify-between gap-4">
                <h4 className="text-sm font-semibold text-white sm:text-base">
                  <span className="font-mono text-cyan-400 mr-2">Q{qIndex + 1}.</span>
                  {q.question}
                </h4>
                {q.hint && (
                  <button
                    className="shrink-0 text-slate-400 hover:text-cyan-300 transition text-xs flex items-center gap-1 font-mono"
                    onClick={() => toggleHint(q.id)}
                    type="button"
                  >
                    <HelpCircle className="size-3.5" />
                    <span className="hidden sm:inline">Hint</span>
                  </button>
                )}
              </div>

              {/* Optional Hint */}
              {showHints[q.id] && q.hint && (
                <div className="mt-3 rounded-lg border border-amber-500/20 bg-amber-950/20 p-2.5 text-xs text-amber-200">
                  <strong>Hint:</strong> {q.hint}
                </div>
              )}

              {/* Options */}
              <div className="mt-4 space-y-2">
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
                      className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 text-xs leading-relaxed transition ${optionStyle} ${
                        isSubmitted ? 'cursor-default' : ''
                      }`}
                      key={opt.id}
                    >
                      <input
                        checked={isSelected}
                        className="sr-only"
                        disabled={isSubmitted}
                        name={`quiz-${q.id}`}
                        onChange={() => handleSelectOption(q.id, opt.id)}
                        type="radio"
                      />
                      <span className="grid size-5 shrink-0 place-items-center rounded-full border border-current font-mono text-[10px] mt-0.5">
                        {opt.id.toUpperCase()}
                      </span>
                      <div className="flex-1">
                        <span>{opt.text}</span>
                        {/* Explanation visible after submit */}
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

      {/* Action and Results Footer */}
      <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.08] pt-5">
        {!isSubmitted ? (
          <>
            <span className="text-xs text-slate-400">
              {allAnswered
                ? 'All questions answered! Click submit to calculate your score.'
                : `Select an answer for each question (${Object.keys(selectedAnswers).length}/${questions.length} completed)`}
            </span>
            <button
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-500 px-6 py-2.5 text-xs font-bold text-[#07121f] shadow-lg shadow-cyan-500/20 transition hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed"
              disabled={!allAnswered}
              onClick={handleSubmit}
              type="button"
            >
              Submit Assessment & Check Answers
            </button>
          </>
        ) : (
          <div className="flex w-full flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div
                className={`grid size-12 place-items-center rounded-xl text-lg font-bold font-mono ${
                  isPassed
                    ? 'bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-500/40'
                    : 'bg-amber-500/20 text-amber-300 ring-1 ring-amber-500/40'
                }`}
              >
                {currentScore}/{questions.length}
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">
                  {isPassed ? '🎉 Assessment Passed!' : 'Review and Try Again'}
                </h4>
                <p className="text-xs text-slate-300">
                  {isPassed
                    ? `Excellent work! You scored ${currentScore} out of ${questions.length}.`
                    : `You scored ${currentScore}/${questions.length}. Passing score is ${passingScore}.`}
                </p>
              </div>
            </div>

            <button
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-slate-200 transition hover:bg-white/[0.08]"
              onClick={handleReset}
              type="button"
            >
              <RotateCcw className="size-3.5" />
              Retake Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
