import { portfolio } from '../data/portfolio'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-8">
      <div className="section-shell flex flex-col gap-3 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Yury Li. Built with React.</p>
        <a className="focus-ring rounded-sm transition hover:text-cyan-200" href={`mailto:${portfolio.contact.email}`}>
          {portfolio.contact.email}
        </a>
      </div>
    </footer>
  )
}
