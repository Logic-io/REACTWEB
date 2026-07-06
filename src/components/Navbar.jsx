import { useEffect, useState } from 'react'
import { portfolio } from '../data/portfolio'

function MenuIcon({ open }) {
  return (
    <span className="relative block size-5" aria-hidden="true">
      <span
        className={`absolute left-0 top-1 h-px w-5 bg-current transition-transform ${open ? 'translate-y-1.5 rotate-45' : ''}`}
      />
      <span className={`absolute left-0 top-2.5 h-px w-5 bg-current transition-opacity ${open ? 'opacity-0' : ''}`} />
      <span
        className={`absolute left-0 top-4 h-px w-5 bg-current transition-transform ${open ? '-translate-y-1.5 -rotate-45' : ''}`}
      />
    </span>
  )
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#050816]/80 backdrop-blur-xl">
      <nav className="mx-auto flex min-h-16 max-w-7xl items-center justify-between px-5 sm:px-8" aria-label="Primary navigation">
        <a href="#home" className="focus-ring flex items-center gap-3 rounded-md text-sm font-semibold tracking-[0.12em] text-white">
          <span className="grid size-8 place-items-center rounded-lg border border-cyan-300/30 bg-cyan-300/10 text-xs text-cyan-200">
            YL
          </span>
          <span>YURY LI</span>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {portfolio.navigation.map((item) => (
            <a
              className="focus-ring rounded-sm text-sm text-slate-400 transition hover:text-cyan-200"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </a>
          ))}
        </div>

        <button
          type="button"
          className="focus-ring grid size-11 place-items-center rounded-lg border border-white/10 text-slate-200 md:hidden"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((current) => !current)}
        >
          <MenuIcon open={menuOpen} />
        </button>
      </nav>

      <div
        id="mobile-navigation"
        className={`overflow-hidden border-t border-white/10 bg-[#070b18] transition-[max-height,opacity] duration-300 md:hidden ${
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="mx-auto grid max-w-7xl gap-1 px-5 py-4 sm:px-8">
          {portfolio.navigation.map((item) => (
            <a
              className="focus-ring rounded-lg px-3 py-3 text-base text-slate-200 transition hover:bg-white/5 hover:text-cyan-200"
              href={item.href}
              key={item.href}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  )
}
