import { portfolio } from '../data/portfolio'

export default function Contact() {
  const { contact } = portfolio

  return (
    <section id="contact" className="section-block">
      <div className="section-shell">
        <div className="contact-panel">
          <div className="relative z-10">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">
              <span className="mr-2 text-violet-400">//</span>
              Contact
            </p>
            <h2 className="mt-6 max-w-4xl text-balance text-3xl font-semibold tracking-[-0.045em] text-white sm:text-5xl lg:text-6xl">
              {contact.title}
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">{contact.description}</p>
            <a className="button-primary mt-9" href={`mailto:${contact.email}`}>
              Start a conversation <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="contact-grid" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}
