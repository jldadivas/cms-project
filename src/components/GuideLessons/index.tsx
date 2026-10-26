import Link from 'next/link'
import type { Page } from '@/payload-types'
import { ArrowRight } from 'lucide-react'
import { toLessonSlug } from '@/utilities/toLessonSlug'

type LessonSection = NonNullable<Page['topicSections']>[number]

export function GuideLessons({
  sections,
  topicSlug,
}: {
  sections: readonly LessonSection[]
  topicSlug: string
}) {
  return (
    <div className="space-y-4">
      {sections.map((section, index) => {
        const lessonSlug = section.lessonSlug?.trim() || toLessonSlug(section.heading)
        const description = section.description?.trim() || getPreview(section.body)

        return (
          <Link
            className="group block overflow-hidden rounded-lg border border-[#c9d5cd] bg-[#fbfbf5] transition duration-200 hover:-translate-y-0.5 hover:border-[#8ba99c] hover:bg-white hover:shadow-md"
            href={`/${topicSlug}/lesson/${lessonSlug}`}
            key={section.id || `${lessonSlug}-${index}`}
          >
            <div className="flex items-start gap-4 px-5 py-5 md:px-7 md:py-6">
              <span className="pt-1 font-mono text-sm text-[#6e8d7f]">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-xl leading-snug font-semibold text-[#173a32] md:text-2xl">
                  {section.heading}
                </span>
                <span className="mt-2 block max-w-3xl text-sm leading-6 text-[#58746a] md:text-base">
                  {description}
                </span>
              </span>
              <ArrowRight
                aria-hidden="true"
                className="mt-1 size-5 shrink-0 text-[#6e8d7f] transition-transform group-hover:translate-x-1"
              />
            </div>
            <div className="h-px bg-[#d9e1da] transition-colors group-hover:bg-[#8ba99c]" />
            <div className="flex items-center justify-between px-5 py-3 text-xs text-[#6e8d7f] md:px-7">
              <span>Lesson {String(index + 1).padStart(2, '0')}</span>
              <span className="font-semibold uppercase tracking-[0.1em]">Open lesson</span>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

function getPreview(body: string): string {
  const preview = body.trim()
  return preview.length > 150 ? `${preview.slice(0, 147).trimEnd()}...` : preview
}
