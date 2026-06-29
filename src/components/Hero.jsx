import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight, Compass } from 'lucide-react';
import EarthGlobe from './EarthGlobe.jsx';
import site from '../content/site.json';

const hero = site.hero;
const TRUST_INDICATORS = hero.pillars;

// Flip to `true` to bring the right-side "Federation Brief" card back.
const SHOW_SIDE_PANEL = false;

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-usf-blue-dark text-white">
      {/* Background — institutional 3D globe + atmospheric layering */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {/* Base radial gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 18% 0%, rgba(18, 60, 120, 0.55) 0%, rgba(8, 30, 64, 0.92) 50%, #04122A 100%)',
          }}
        />

        {/* The globe — anchored to the right so the headline reads against
            a calm left field while the network sits on the right */}
        <div
          className="absolute top-1/2 right-[-35%] aspect-square h-[90%] -translate-y-1/2 opacity-70 sm:right-[-18%] sm:h-[115%] sm:opacity-90 md:right-[-4%] md:h-[105%] md:opacity-95 lg:right-[2%] lg:h-[105%] xl:right-[6%] xl:h-[100%]"
        >
          <EarthGlobe />
        </div>

        {/* Left-side vignette — keeps the headline perfectly readable while
            the globe is still felt behind it */}
        <div className="absolute inset-y-0 left-0 right-1/2 bg-gradient-to-r from-usf-blue-dark/95 via-usf-blue-dark/60 to-transparent" />

        {/* Faint engineering grid */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />

        {/* Bottom vignette to anchor content */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-usf-blue-dark to-transparent" />
      </div>

      <div className="container-usf relative pt-6 pb-10 sm:pt-8 sm:pb-12 md:pt-10 md:pb-16 lg:pt-12 lg:pb-20">
        {/* Top meta row */}
        <div className="flex flex-col gap-2 border-b border-white/10 pb-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-3">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] uppercase tracking-eyebrow text-white/65 sm:text-[11px]">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-usf-red" />
            {hero.metaLeft}
            <span className="hidden h-3 w-px bg-white/20 sm:inline-block" />
            <span className="hidden sm:inline">{hero.metaLeftSub}</span>
          </div>
          <div className="text-[10px] uppercase tracking-eyebrow text-white/55 sm:text-[11px]">
            {hero.metaRight}
          </div>
        </div>

        {/* Hero content */}
        <div className="grid gap-10 pt-8 md:pt-10 lg:grid-cols-12 lg:gap-10 lg:pt-12">
          <div className={SHOW_SIDE_PANEL ? 'lg:col-span-8' : 'lg:col-span-7'}>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <span className="eyebrow-light">{hero.eyebrow}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
              className="mt-5 max-w-[22ch] font-display text-[32px] leading-[1.05] tracking-[-0.02em] text-white sm:text-[40px] md:text-[56px] lg:text-[60px]"
            >
              {hero.headlineStart}
              <span className="relative inline-block">
                <span className="relative z-10">{hero.headlineHighlight}</span>
                <span className="absolute inset-x-0 -bottom-1 h-[7px] bg-usf-red/40" />
              </span>
              {hero.headlineEnd}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              className="mt-6 max-w-2xl text-[15px] leading-[1.7] text-white/75 sm:text-[16px] md:text-[17px]"
            >
              {hero.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
              className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
            >
              <a href="#membership" className="btn-red">
                {hero.ctaPrimary} <ArrowRight className="h-4 w-4" />
              </a>
              <Link to="/services" className="btn-ghost-light">
                {hero.ctaSecondary} <ChevronRight className="h-4 w-4" />
              </Link>
              <a
                href="#about"
                className="ml-2 hidden text-[12.5px] font-semibold uppercase tracking-[0.18em] text-white/55 hover:text-white sm:inline-flex"
              >
                <Compass className="mr-2 h-4 w-4 text-usf-red" />
                {hero.ctaTertiary}
              </a>
            </motion.div>
          </div>

          {/* Side stat panel — toggled by SHOW_SIDE_PANEL above. */}
          {SHOW_SIDE_PANEL && (
          <motion.aside
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: 'easeOut' }}
            className="lg:col-span-4"
          >
            <div className="relative flex h-full flex-col border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm">
              <span className="absolute -left-px top-7 h-10 w-[3px] bg-usf-red" />
              <h3 className="text-[10.5px] font-semibold uppercase tracking-eyebrow text-white/55">
                {hero.sidePanel.eyebrow}
              </h3>
              <p className="mt-3 font-display text-[19px] leading-[1.35] text-white">
                {hero.sidePanel.lead}
              </p>

              <dl className="mt-6 grid grid-cols-2 gap-x-5 gap-y-4 border-t border-white/10 pt-5">
                {hero.sidePanel.facts.map((fact) => (
                  <div key={fact.label}>
                    <dt className="text-[10px] font-semibold uppercase tracking-eyebrow text-white/45">
                      {fact.label}
                    </dt>
                    <dd className="mt-1 text-[13.5px] text-white/90">{fact.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-auto border-t border-white/10 pt-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-eyebrow text-white/45">
                      {hero.sidePanel.governanceLabel}
                    </div>
                    <div className="mt-1 text-[13.5px] text-white/90">
                      {hero.sidePanel.governanceValue}
                    </div>
                  </div>
                  <a
                    href="#about"
                    className="inline-flex items-center gap-2 whitespace-nowrap text-[11px] font-semibold uppercase tracking-eyebrow text-white/70 transition-colors hover:text-usf-red"
                  >
                    {hero.sidePanel.charterLink}
                    <ChevronRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </motion.aside>
          )}
        </div>

        {/* Trust indicators */}
        <div className="mt-10 overflow-hidden border-t border-white/10 pt-6 pb-5 md:mt-12">
          <div className="marquee-track flex w-max flex-nowrap items-center">
            {[0, 1].map((group) => (
              <div
                key={group}
                className="flex flex-none flex-nowrap items-center gap-x-5 pr-5"
                aria-hidden={group === 1 ? 'true' : undefined}
              >
                <span className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.18em] text-white/45">
                  {hero.pillarsLabel}
                </span>
                {TRUST_INDICATORS.map((label) => (
                  <div
                    key={`${group}-${label}`}
                    className="flex flex-none items-center gap-2.5 whitespace-nowrap text-[11.5px] font-medium tracking-[0.03em] text-white/80 xl:text-[12px] xl:tracking-[0.04em]"
                  >
                    <span className="inline-flex h-1 w-1 rounded-full bg-usf-red" />
                    {label}
                    <span className="ml-2 h-3 w-px bg-white/15" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
