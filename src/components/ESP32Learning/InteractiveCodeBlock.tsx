'use client'

import React, { useState } from 'react'
import { Check, Copy, ChevronDown, ChevronUp, Terminal, FileCode } from 'lucide-react'
import { Highlight, themes } from 'prism-react-renderer'
import type { CodeBlockItem } from '@/data/esp32-course-data'

export function InteractiveCodeBlock({ item }: { item: CodeBlockItem }) {
  const [copied, setCopied] = useState(false)
  const [notesExpanded, setNotesExpanded] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(item.code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch (err) {
      console.warn('Failed to copy to clipboard:', err)
    }
  }

  return (
    <div className="my-6 overflow-hidden rounded-2xl border border-cyan-500/25 bg-[#091524] shadow-2xl backdrop-blur-xl transition-all">
      {/* Code Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] bg-[#07111e] px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-rose-500/80" />
            <span className="size-2.5 rounded-full bg-amber-500/80" />
            <span className="size-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <div className="flex items-center gap-2">
            <FileCode className="size-4 text-cyan-400" />
            <span className="font-mono text-xs font-semibold text-white">
              {item.filename || item.title}
            </span>
          </div>
          <span className="rounded border border-cyan-500/30 bg-cyan-500/10 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-cyan-300">
            {item.language}
          </span>
        </div>

        {/* Copy Button */}
        <button
          className="group inline-flex min-h-8 shrink-0 items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-3.5 text-xs font-semibold text-slate-200 transition hover:border-cyan-400/50 hover:bg-white/[0.08] hover:text-white"
          onClick={copyToClipboard}
          type="button"
        >
          {copied ? (
            <>
              <Check aria-hidden="true" className="size-3.5 text-emerald-400" />
              <span className="text-emerald-300">Copied to Clipboard!</span>
            </>
          ) : (
            <>
              <Copy aria-hidden="true" className="size-3.5 text-cyan-400 transition-transform group-hover:scale-110" />
              <span>Copy Code</span>
            </>
          )}
        </button>
      </div>

      {/* Code Explanation Bar */}
      {item.explanation && (
        <div className="border-b border-white/[0.06] bg-[#071322]/60 px-4 py-2.5 sm:px-6">
          <p className="text-xs leading-relaxed text-slate-300 sm:text-sm">
            {item.explanation}
          </p>
        </div>
      )}

      {/* Prism Syntax Highlighted Pre/Code Block */}
      <Highlight code={item.code} language={item.language} theme={themes.vsDark}>
        {({ getLineProps, getTokenProps, tokens }) => (
          <pre className="max-h-[38rem] overflow-auto bg-[#050c14] p-4 text-xs font-mono leading-6 sm:p-6 sm:text-sm">
            {tokens.map((line, lineIndex) => (
              <div key={lineIndex} {...getLineProps({ className: 'table-row', line })}>
                <span className="table-cell select-none pr-5 text-right font-mono text-xs text-slate-600">
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

      {/* Expected Output Console View */}
      {item.expectedOutput && (
        <div className="border-t border-white/[0.08] bg-[#050e18]">
          <div className="flex items-center gap-2 border-b border-white/[0.05] px-4 py-2 text-[11px] font-mono font-semibold uppercase tracking-wider text-emerald-400 sm:px-6">
            <Terminal className="size-3.5" />
            <span>Expected Serial Monitor Output (115200 Baud)</span>
          </div>
          <pre className="max-h-48 overflow-auto p-4 font-mono text-xs text-emerald-300/90 sm:px-6">
            <code>{item.expectedOutput}</code>
          </pre>
        </div>
      )}

      {/* Expandable Line-by-Line Breakdown */}
      {item.expandableNotes && item.expandableNotes.length > 0 && (
        <div className="border-t border-white/[0.08] bg-[#06101c]">
          <button
            className="flex w-full items-center justify-between px-4 py-3 text-left text-xs font-semibold text-cyan-300 hover:bg-white/[0.02] sm:px-6"
            onClick={() => setNotesExpanded(!notesExpanded)}
            type="button"
          >
            <span className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-cyan-400" />
              Detailed Line-by-Line Code Breakdown ({item.expandableNotes.length} sections)
            </span>
            {notesExpanded ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
          </button>

          {notesExpanded && (
            <div className="space-y-3 px-4 pb-4 pt-1 sm:px-6">
              {item.expandableNotes.map((note, idx) => (
                <div
                  className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 text-xs leading-relaxed"
                  key={idx}
                >
                  <strong className="block font-semibold text-cyan-200">{note.title}</strong>
                  <p className="mt-1 text-slate-300">{note.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
