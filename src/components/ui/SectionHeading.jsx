export default function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="mb-10 max-w-3xl sm:mb-14">
      <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">
        <span className="mr-2 text-violet-400">//</span>
        {eyebrow}
      </p>
      <h2 className="text-balance text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && <p className="mt-5 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">{description}</p>}
    </div>
  )
}
