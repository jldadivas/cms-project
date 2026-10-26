import { AlertTriangle, ExternalLink, Lightbulb } from 'lucide-react'

export type LessonGuideBlock =
  | { type: 'heading'; text: string }
  | { type: 'paragraph'; parts: { text: string; bold?: boolean; href?: string }[] }
  | { type: 'list'; items: string[] }
  | { type: 'quote'; text: string }
  | { type: 'note'; tone: 'info' | 'warning'; title: string; text: string }

export function GuideLessonGuide({ blocks }: { blocks: LessonGuideBlock[] }) {
  return (
    <div className="mt-10 max-w-3xl space-y-8 border-t border-[#bac8b9] pt-8">
      {blocks.map((block, index) => {
        if (block.type === 'heading') {
          return (
            <h2 className="text-2xl font-semibold text-[#173a32]" key={`${block.text}-${index}`}>
              {block.text}
            </h2>
          )
        }

        if (block.type === 'paragraph') {
          return (
            <p className="text-base leading-8 text-[#405d53]" key={`paragraph-${index}`}>
              {block.parts.map((part, partIndex) => {
                if (part.href) {
                  return (
                    <a
                      className="inline-flex items-center gap-1 font-semibold text-[#31594b] underline underline-offset-4 hover:text-[#173a32]"
                      href={part.href}
                      key={`${part.text}-${partIndex}`}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {part.text}
                      <ExternalLink aria-hidden="true" className="size-3.5" />
                    </a>
                  )
                }

                return part.bold ? (
                  <strong
                    className="font-semibold text-[#173a32]"
                    key={`${part.text}-${partIndex}`}
                  >
                    {part.text}
                  </strong>
                ) : (
                  <span key={`${part.text}-${partIndex}`}>{part.text}</span>
                )
              })}
            </p>
          )
        }

        if (block.type === 'list') {
          return (
            <ul className="space-y-3" key={`list-${index}`}>
              {block.items.map((item, itemIndex) => (
                <li className="flex gap-3 text-base leading-7 text-[#405d53]" key={item}>
                  <span
                    aria-hidden="true"
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-[#719181]"
                  />
                  <span>
                    <span className="mr-3 font-mono text-xs text-[#789083]">
                      {String(itemIndex + 1).padStart(2, '0')}
                    </span>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          )
        }

        if (block.type === 'quote') {
          return (
            <blockquote
              className="border-l-4 border-[#8eaa95] bg-[#e7eddd] px-5 py-4 text-lg leading-8 font-medium text-[#31594b]"
              key={`quote-${index}`}
            >
              “{block.text}”
            </blockquote>
          )
        }

        const Icon = block.tone === 'warning' ? AlertTriangle : Lightbulb

        return (
          <aside
            className={`flex gap-4 rounded-md border px-5 py-4 ${
              block.tone === 'warning'
                ? 'border-[#dfc9a5] bg-[#f7f0df] text-[#69563a]'
                : 'border-[#b9d2c3] bg-[#e5f0e7] text-[#31594b]'
            }`}
            key={`note-${index}`}
          >
            <Icon aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
            <div>
              <h3 className="font-semibold">{block.title}</h3>
              <p className="mt-1 text-sm leading-6">{block.text}</p>
            </div>
          </aside>
        )
      })}
    </div>
  )
}
