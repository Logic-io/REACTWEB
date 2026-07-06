import { portfolio } from '../data/portfolio'
import BlurText from './ui/BlurText'
import DotGrid from './ui/DotGrid'

export default function Hero() {
  const { hero } = portfolio

  return (
    <section id="home" className="relative flex min-h-screen scroll-mt-20 items-center overflow-hidden pb-20 pt-32">
      <div className="absolute inset-0 z-0 opacity-55" aria-hidden="true">
        <DotGrid
          dotSize={3}
          gap={25}
          baseColor="#172554"
          activeColor="#67e8f9"
          proximity={140}
          speedTrigger={120}
          shockRadius={220}
          shockStrength={3}
          resistance={800}
          returnDuration={1.2}
        />
      </div>
      <div className="hero-orb hero-orb-one" aria-hidden="true" />
      <div className="hero-orb hero-orb-two" aria-hidden="true" />

      <div className="section-shell relative z-10 grid items-center gap-14 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="mb-6 flex items-center gap-3 font-mono text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">
            <span className="size-2 rounded-full bg-emerald-300 shadow-[0_0_16px_#6ee7b7]" aria-hidden="true" />
            {hero.eyebrow}
          </p>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[0.96] tracking-[-0.06em] text-white sm:text-6xl lg:text-7xl xl:text-8xl">
            <BlurText text={hero.name} />
          </h1>
          <p className="mt-6 max-w-3xl text-xl font-medium leading-tight text-slate-200 sm:text-2xl lg:text-3xl">
            <span className="gradient-text">Marketing, Sales</span>
            <span className="text-slate-500"> & </span>
            <span className="gradient-text">AI Workflow Specialist</span>
          </p>
          <p className="mt-7 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">{hero.intro}</p>

          <div className="mt-9 flex flex-wrap gap-3">
            {hero.highlights.map((highlight) => (
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-300" key={highlight}>
                {highlight}
              </span>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <a className="button-primary" href="#projects">View projects <span aria-hidden="true">↗</span></a>
            <a className="button-secondary" href="#contact">Contact me</a>
            <a className="button-quiet" href={`${import.meta.env.BASE_URL}assets/Yury-Li-Resume.pdf`} download>
              Download résumé <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:justify-self-end">
          <div className="profile-frame">
            <div className="absolute inset-0 bg-gradient-to-t from-[#080d1d] via-transparent to-transparent" aria-hidden="true" />
            <img
              src={`${import.meta.env.BASE_URL}assets/profile-photo.png`}
              alt="Professional portrait of Yury Li"
              className="h-full w-full object-cover object-top"
            />
            <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/10 bg-[#060a16]/85 p-4 backdrop-blur-lg">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-white">Customer-focused strategy</p>
                  <p className="mt-1 text-xs text-slate-400">Marketing · Sales · AI systems</p>
                </div>
                <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-emerald-200">
                  Available
                </span>
              </div>
            </div>
          </div>
          <div className="absolute -left-5 top-8 hidden rounded-xl border border-cyan-300/20 bg-[#08101f]/90 px-4 py-3 font-mono text-xs text-cyan-200 shadow-xl backdrop-blur sm:block">
            signal / insight / action
          </div>
        </div>
      </div>
    </section>
  )
}
