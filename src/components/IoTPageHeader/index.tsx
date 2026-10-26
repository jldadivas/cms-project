export function IoTPageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <header className="max-w-3xl">
      <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 font-mono text-[11px] font-semibold tracking-wider text-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.15)]">
        <span className="size-1.5 rounded-full bg-cyan-400 animate-pulse" />
        <span>{eyebrow}</span>
      </div>
      <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
        {title}
      </h1>
      <p className="mt-4 text-sm leading-relaxed text-slate-300 sm:text-base">{description}</p>
    </header>
  )
}
