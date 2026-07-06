import { portfolio } from '../data/portfolio'
import SectionHeading from './ui/SectionHeading'
import SpotlightCard from './ui/SpotlightCard'

export default function Skills() {
  return (
    <section id="skills" className="section-block section-tint">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Skills"
          title="Capabilities built around useful outcomes."
          description="A mix of customer-facing experience, marketing execution, and practical systems thinking."
        />

        <div className="grid gap-5 md:grid-cols-2">
          {portfolio.skills.map((skill) => (
            <SpotlightCard className="p-6 sm:p-8" key={skill.title}>
              <div className="flex items-start justify-between gap-5">
                <h3 className="max-w-sm text-xl font-semibold tracking-[-0.025em] text-white sm:text-2xl">{skill.title}</h3>
                <span className="font-mono text-xs text-cyan-300/70">{skill.number}</span>
              </div>
              <div className="mt-7 flex flex-wrap gap-2">
                {skill.items.map((item) => (
                  <span className="rounded-lg border border-white/10 bg-white/[0.035] px-3 py-2 text-sm text-slate-300" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  )
}
