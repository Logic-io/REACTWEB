import { portfolio } from '../data/portfolio'
import SectionHeading from './ui/SectionHeading'

export default function AIWorkflow() {
  return (
    <section id="ai-workflow" className="section-block section-tint overflow-hidden">
      <div className="section-shell">
        <SectionHeading
          eyebrow="AI workflow"
          title="AI is most useful when the workflow is clear."
          description="A human-led process for moving from scattered information to reviewed, reusable output."
        />

        <ol className="relative grid gap-4 lg:grid-cols-5">
          <div className="absolute left-[10%] right-[10%] top-7 hidden h-px bg-gradient-to-r from-cyan-300/10 via-cyan-300/50 to-violet-400/10 lg:block" aria-hidden="true" />
          {portfolio.workflow.map((step) => (
            <li className="workflow-step" key={step.number}>
              <span className="workflow-number">{step.number}</span>
              <h3 className="mt-6 text-lg font-semibold text-white">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">{step.description}</p>
              <p className="mt-5 font-mono text-[11px] leading-5 text-cyan-200/70">{step.tools}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
