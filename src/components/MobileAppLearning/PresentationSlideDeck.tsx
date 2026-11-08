'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import {
  Download,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Layers,
  RotateCcw,
} from 'lucide-react'
import type { MobileAppPresentation } from '@/data/mobile-app-presentations'

interface PresentationSlideDeckProps {
  presentation: MobileAppPresentation
}

export function PresentationSlideDeck({ presentation }: PresentationSlideDeckProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const thumbnailsRef = useRef<HTMLDivElement>(null)

  const totalSlides = presentation.slideCount

  const goToPrev = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev > 0 ? prev - 1 : prev))
  }, [])

  const goToNext = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev < totalSlides - 1 ? prev + 1 : prev))
  }, [totalSlides])

  const goToSlide = (index: number) => {
    if (index >= 0 && index < totalSlides) {
      setCurrentSlideIndex(index)
    }
  }

  // Keyboard navigation (Arrow keys, Space, PageUp, PageDown)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') return

      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault()
        goToNext()
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault()
        goToPrev()
      } else if (e.key === 'Home') {
        e.preventDefault()
        setCurrentSlideIndex(0)
      } else if (e.key === 'End') {
        e.preventDefault()
        setCurrentSlideIndex(totalSlides - 1)
      } else if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goToNext, goToPrev, isFullscreen, totalSlides])

  // Scroll active thumbnail into view
  useEffect(() => {
    if (thumbnailsRef.current) {
      const activeThumb = thumbnailsRef.current.children[currentSlideIndex] as HTMLElement
      if (activeThumb) {
        activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
      }
    }
  }, [currentSlideIndex])

  const currentSlideNumber = currentSlideIndex + 1
  const slideImageUrl = `/presentations/slides/${presentation.id}/Slide${currentSlideNumber}.JPG`
  const nextSlideImageUrl =
    currentSlideIndex < totalSlides - 1
      ? `/presentations/slides/${presentation.id}/Slide${currentSlideNumber + 1}.JPG`
      : null

  return (
    <section
      aria-labelledby="presentation-deck-heading"
      className={`relative rounded-3xl border border-cyan-500/30 bg-[#06101c] shadow-2xl transition-all duration-300 ${
        isFullscreen
          ? 'fixed inset-0 z-50 flex flex-col justify-between rounded-none border-none bg-black/95 p-4 sm:p-6 backdrop-blur-2xl'
          : 'p-4 sm:p-6'
      }`}
      id="presentation"
      ref={containerRef}
    >
      {/* Prefetch next slide for instantaneous switching */}
      {nextSlideImageUrl && (
        <link as="image" href={nextSlideImageUrl} rel="prefetch" />
      )}

      {/* Top Header & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-3">
        <div className="flex items-center gap-3">
          <div className="grid size-9 place-items-center rounded-xl border border-cyan-400/30 bg-cyan-500/15 text-cyan-300">
            <Layers className="size-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-cyan-300">
                POWERPOINT PRESENTATION
              </span>
              <span className="rounded-full border border-cyan-500/25 bg-cyan-500/10 px-2 py-0.5 font-mono text-[9px] font-semibold text-cyan-200">
                {totalSlides} Slides
              </span>
            </div>
            <h2 className="text-sm font-bold text-white sm:text-base" id="presentation-deck-heading">
              {presentation.title}
            </h2>
          </div>
        </div>

        {/* Controls: Reset, Fullscreen, Download */}
        <div className="flex items-center gap-2">
          {currentSlideIndex > 0 && (
            <button
              aria-label="Restart from first slide"
              className="inline-flex min-h-8 items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 text-xs font-semibold text-slate-300 transition hover:border-cyan-400/30 hover:text-white"
              onClick={() => setCurrentSlideIndex(0)}
              title="First slide"
              type="button"
            >
              <RotateCcw className="size-3.5" />
              <span className="hidden sm:inline">First</span>
            </button>
          )}

          <button
            aria-label={isFullscreen ? 'Exit fullscreen' : 'View fullscreen presentation'}
            className="inline-flex min-h-8 items-center gap-1.5 rounded-lg border border-white/15 bg-white/[0.04] px-2.5 text-xs font-semibold text-slate-200 transition hover:border-cyan-400/40 hover:bg-white/[0.08]"
            onClick={() => setIsFullscreen((prev) => !prev)}
            type="button"
          >
            {isFullscreen ? (
              <>
                <Minimize2 className="size-3.5 text-cyan-400" />
                <span>Exit Fullscreen</span>
              </>
            ) : (
              <>
                <Maximize2 className="size-3.5 text-cyan-400" />
                <span>Fullscreen</span>
              </>
            )}
          </button>

          <a
            className="inline-flex min-h-8 items-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-400 px-3 py-1.5 text-xs font-bold text-[#07121f] shadow-[0_0_15px_rgba(34,211,238,0.3)] transition hover:brightness-110 active:scale-95"
            download={presentation.fileName}
            href={presentation.downloadUrl}
            title={`Download ${presentation.fileName}`}
          >
            <Download className="size-3.5" />
            <span>Download PPTX</span>
          </a>
        </div>
      </div>

      {/* Main Slide Viewer Canvas (16:9 Aspect Ratio) */}
      <div className={`relative mt-3 flex items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-black shadow-2xl ${
        isFullscreen ? 'flex-1 my-2 max-h-[calc(100vh-140px)]' : ''
      }`}>
        <div className="relative aspect-[16/9] w-full max-h-[75vh] flex items-center justify-center bg-black">
          {/* Actual PowerPoint Slide Image */}
          <img
            alt={`${presentation.title} - Slide ${currentSlideNumber} of ${totalSlides}`}
            className="h-full w-full object-contain select-none"
            key={slideImageUrl}
            src={slideImageUrl}
          />

          {/* Left Arrow Hover Overlay */}
          {currentSlideIndex > 0 && (
            <button
              aria-label="Previous slide"
              className="absolute left-2 top-1/2 -translate-y-1/2 grid size-11 place-items-center rounded-full bg-black/60 text-white shadow-lg backdrop-blur-md transition hover:bg-cyan-500 hover:text-black hover:scale-110 active:scale-95"
              onClick={goToPrev}
              type="button"
            >
              <ChevronLeft className="size-6" />
            </button>
          )}

          {/* Right Arrow Hover Overlay */}
          {currentSlideIndex < totalSlides - 1 && (
            <button
              aria-label="Next slide"
              className="absolute right-2 top-1/2 -translate-y-1/2 grid size-11 place-items-center rounded-full bg-black/60 text-white shadow-lg backdrop-blur-md transition hover:bg-cyan-500 hover:text-black hover:scale-110 active:scale-95"
              onClick={goToNext}
              type="button"
            >
              <ChevronRight className="size-6" />
            </button>
          )}

          {/* Slide Number Badge in Viewer */}
          <div className="absolute bottom-3 right-3 rounded-md bg-black/75 px-2.5 py-1 font-mono text-xs font-semibold text-cyan-300 backdrop-blur-md border border-white/10">
            Slide {currentSlideNumber} / {totalSlides}
          </div>
        </div>
      </div>

      {/* Slide Navigation Bottom Bar */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.08] pt-3">
        {/* Previous & Next Buttons */}
        <div className="flex items-center gap-2">
          <button
            aria-label="Previous slide"
            className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] px-4 text-xs font-bold text-white transition hover:border-cyan-400/40 hover:bg-white/[0.12] disabled:opacity-30 disabled:pointer-events-none active:scale-95"
            disabled={currentSlideIndex === 0}
            onClick={goToPrev}
            type="button"
          >
            <ChevronLeft className="size-4" />
            <span>Previous</span>
          </button>

          <button
            aria-label="Next slide"
            className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-400 px-5 text-xs font-bold text-[#07121f] shadow-[0_0_15px_rgba(34,211,238,0.25)] transition hover:brightness-110 disabled:opacity-30 disabled:pointer-events-none active:scale-95"
            disabled={currentSlideIndex === totalSlides - 1}
            onClick={goToNext}
            type="button"
          >
            <span>Next Slide</span>
            <ChevronRight className="size-4" />
          </button>
        </div>

        {/* Slide Counter & Progress */}
        <div className="flex items-center gap-2 font-mono text-xs text-slate-300">
          <span>Slide</span>
          <span className="font-bold text-cyan-300">{currentSlideNumber}</span>
          <span className="text-slate-500">/</span>
          <span>{totalSlides}</span>
        </div>

        {/* Keyboard shortcut hint */}
        <div className="hidden md:flex items-center gap-1.5 text-xs font-mono text-slate-400">
          <span>Press</span>
          <kbd className="rounded border border-white/15 bg-white/10 px-1.5 py-0.5 text-[11px] text-cyan-300">←</kbd>
          <kbd className="rounded border border-white/15 bg-white/10 px-1.5 py-0.5 text-[11px] text-cyan-300">→</kbd>
          <span>or Space to next slide</span>
        </div>
      </div>

      {/* Scrollable Slide Thumbnails Strip */}
      <div className="mt-3 border-t border-white/[0.06] pt-3">
        <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
          All Slides (Click to Jump)
        </p>
        <div
          className="flex gap-2 overflow-x-auto pb-2 [scrollbar-width:thin] [scrollbar-color:rgba(34,211,238,0.3)_transparent] [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-cyan-500/30"
          ref={thumbnailsRef}
        >
          {Array.from({ length: totalSlides }, (_, idx) => {
            const slideNum = idx + 1
            const thumbUrl = `/presentations/slides/${presentation.id}/Slide${slideNum}.JPG`
            const isSelected = idx === currentSlideIndex

            return (
              <button
                aria-label={`Jump to slide ${slideNum}`}
                className={`group relative shrink-0 overflow-hidden rounded-lg border transition-all ${
                  isSelected
                    ? 'border-cyan-400 ring-2 ring-cyan-400/50 scale-105'
                    : 'border-white/10 opacity-60 hover:opacity-100 hover:border-white/30'
                }`}
                key={slideNum}
                onClick={() => goToSlide(idx)}
                type="button"
              >
                <div className="h-14 w-24 bg-black">
                  <img
                    alt={`Slide ${slideNum}`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    src={thumbUrl}
                  />
                </div>
                <span className="absolute bottom-0.5 right-1 rounded bg-black/80 px-1 font-mono text-[9px] text-cyan-300">
                  {slideNum}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
