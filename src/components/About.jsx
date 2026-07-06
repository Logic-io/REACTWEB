import { portfolio } from '../data/portfolio'
import SectionHeading from './ui/SectionHeading'
import SpotlightCard from './ui/SpotlightCard'

export default function About() {
  const { about } = portfolio

  return (
    <section id="about" className="section-block">
      <div className="section-shell">
        <SectionHeading eyebrow="About" title={about.title} description={about.summary} />

        <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <SpotlightCard className="p-6 sm:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-slate-500">Operating principles</p>
            <div className="mt-8 grid gap-7 sm:grid-cols-3">
              {about.principles.map((principle) => (
                <div key={principle.label}>
                  <strong className="gradient-text text-4xl font-semibold tracking-[-0.04em]">{principle.value}</strong>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{principle.label}</p>
                </div>
              ))}
            </div>
          </SpotlightCard>

          <SpotlightCard className="p-6 sm:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-slate-500">Education</p>
            <div className="mt-7 grid gap-6">
              {about.education.map((item) => (
                <div className="border-l border-cyan-300/30 pl-5" key={item.degree}>
                  <p className="text-sm leading-6 text-slate-400">{item.degree}</p>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="focus-ring mt-1 inline-block rounded-sm font-medium text-white transition hover:text-cyan-200"
                  >
                    {item.school} <span aria-hidden="true">↗</span>
                  </a>
                </div>
              ))}
            </div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  )
}
