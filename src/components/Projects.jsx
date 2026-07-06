import { portfolio } from '../data/portfolio'
import SectionHeading from './ui/SectionHeading'
import SpotlightCard from './ui/SpotlightCard'

export default function Projects() {
  return (
    <section id="projects" className="section-block">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Selected projects"
          title="Work at the intersection of communication and systems."
          description="Selected examples of how I turn complex information into clearer customer experiences and repeatable work."
        />

        <div className="grid gap-5 lg:grid-cols-2">
          {portfolio.projects.map((project) => (
            <SpotlightCard className="group flex min-h-80 flex-col overflow-hidden p-6 sm:p-8" key={project.title}>
              <div className="project-signal" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <div className="relative flex h-full flex-1 flex-col">
                <div className="flex items-center justify-between gap-5">
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-300">{project.type}</p>
                  <span className="font-mono text-xs text-slate-600">{project.number}</span>
                </div>
                <h3 className="mt-12 max-w-lg text-2xl font-semibold tracking-[-0.035em] text-white sm:text-3xl">{project.title}</h3>
                <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">{project.description}</p>
                <div className="mt-auto flex flex-wrap gap-2 pt-8">
                  {project.tags.map((tag) => (
                    <span className="text-xs text-slate-500" key={tag}># {tag}</span>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  )
}
