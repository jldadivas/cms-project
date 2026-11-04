'use client'

import React, { useState, useMemo } from 'react'
import { Search, ChevronDown, ChevronUp, HelpCircle, Wrench } from 'lucide-react'
import { courseFAQList, type FAQItem } from '@/data/esp32-course-data'

export function FAQSection() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({ 'faq-4': true, 'faq-6': true })

  const categories = ['All', 'Hardware', 'Arduino IDE', 'Sensors & I2C', 'Wi-Fi & Network', 'Raspberry Pi & API', 'Mobile & Expo']

  const toggleAccordion = (id: string) => {
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const filteredFaqs = useMemo(() => {
    return courseFAQList.filter((item) => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory
      const query = searchQuery.toLowerCase().trim()
      const matchesSearch =
        !query ||
        item.question.toLowerCase().includes(query) ||
        item.answer.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)

      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchQuery])

  return (
    <section className="my-14 rounded-2xl border border-cyan-500/20 bg-[#071322] p-6 shadow-2xl backdrop-blur-xl sm:p-10" id="faq">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
            <Wrench className="size-4" />
            <span>TROUBLESHOOTING &amp; KNOWLEDGE BASE</span>
          </div>
          <h2 className="mt-1 text-2xl font-bold text-white sm:text-3xl">
            Frequently Encountered Issues &amp; Solutions
          </h2>
          <p className="mt-2 text-xs text-slate-300 sm:text-sm">
            Search our curated answers for hardware wiring, driver glitches, I2C bus conflicts, Wi-Fi errors, and FastAPI endpoints.
          </p>
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
          <input
            className="w-full rounded-xl border border-white/15 bg-white/[0.05] py-2 pl-10 pr-4 text-xs text-white placeholder-slate-400 focus:border-cyan-400 focus:bg-[#060e18] focus:outline-none"
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search errors or keywords..."
            type="text"
            value={searchQuery}
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="mt-6 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
              selectedCategory === cat
                ? 'bg-cyan-500 text-[#07121f] font-bold shadow-md shadow-cyan-500/25'
                : 'border border-white/10 bg-white/[0.03] text-slate-300 hover:bg-white/[0.08]'
            }`}
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            type="button"
          >
            {cat}
          </button>
        ))}
      </div>

      {/* FAQ Accordion List */}
      <div className="mt-6 space-y-3">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((item) => {
            const isOpen = !!openIds[item.id]

            return (
              <div
                className="overflow-hidden rounded-xl border border-white/[0.08] bg-[#06101c] transition-all"
                key={item.id}
              >
                <button
                  className="flex w-full items-center justify-between gap-4 p-4 text-left text-sm font-semibold text-white transition hover:text-cyan-300 sm:px-6"
                  onClick={() => toggleAccordion(item.id)}
                  type="button"
                >
                  <span className="flex items-center gap-3">
                    <span className="rounded bg-white/[0.05] px-2 py-0.5 font-mono text-[10px] text-cyan-300 border border-white/10 shrink-0">
                      {item.category}
                    </span>
                    <span>{item.question}</span>
                  </span>
                  {isOpen ? (
                    <ChevronUp className="size-4 shrink-0 text-cyan-400" />
                  ) : (
                    <ChevronDown className="size-4 shrink-0 text-slate-400" />
                  )}
                </button>

                {isOpen && (
                  <div className="border-t border-white/[0.05] bg-[#050b14]/70 p-4 sm:px-6 sm:py-5">
                    <p className="text-xs leading-relaxed text-slate-300 sm:text-sm">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            )
          })
        ) : (
          <div className="rounded-xl border border-white/10 bg-[#06101c] p-8 text-center text-slate-400 text-xs">
            No troubleshooting questions match "{searchQuery}". Try searching for terms like "COM port", "I2C", "Wi-Fi", or "ADC".
          </div>
        )}
      </div>
    </section>
  )
}
