import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight, Compass } from 'lucide-react';
import WorldMap from './WorldMap.jsx';

const TRUST_INDICATORS = [
  'Global Standards',
  'Certification Support',
  'International Partnerships',
  'Cross-Industry Collaboration',
  'Research & Innovation',
  'Global Development',
];

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-usf-blue-dark text-white">
      {/* Background world map */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 bg-usf-hero"
          style={{
            background:
              'radial-gradient(ellipse at 20% 0%, rgba(18, 60, 120, 0.55) 0%, rgba(8, 30, 64, 0.92) 45%, #04122A 100%)',
          }}
        />
        <div className="absolute inset-0 opacity-[0.85]">
          <WorldMap
            className="absolute inset-0 h-full w-full"
            variant="dark"
            showLabels={false}
            showLines
            showPulses
          />
        </div>
        <div
          className="absolute inset-0 bg-usf-grid opacity-[0.08]"
          style={{ backgroundSize: '64px 64px' }}
        />
        {/* Bottom vignette to anchor content */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-usf-blue-dark to-transparent" />
      </div>

      <div className="container-usf relative pt-12 pb-20 md:pt-16 md:pb-28 lg:pt-20 lg:pb-32">
        {/* Top meta row */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="flex items-center gap-3 text-[11px] uppercase tracking-eyebrow text-white/65">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-usf-red" />
            United Standards Federation
            <span className="hidden h-3 w-px bg-white/20 sm:inline-block" />
            <span className="hidden sm:inline">USA · International Federation</span>
          </div>
          <div className="flex items-center gap-6 text-[11px] uppercase tracking-eyebrow text-white/55">
            <span>Est. Global Collaboration</span>
            <span className="hidden md:inline">25+ Countries · 100+ Partners</span>
          </div>
        </div>

        {/* Hero content */}
        <div className="grid gap-12 pt-14 md:pt-16 lg:grid-cols-12 lg:gap-10 lg:pt-20">
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <span className="eyebrow-light">
                A Global Federation for Standards & Collaboration
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
              className="display-h1 mt-6 max-w-[18ch] text-white"
            >
              Building Global Synergy Through{' '}
              <span className="relative inline-block">
                <span className="relative z-10">Standards</span>
                <span className="absolute inset-x-0 -bottom-1 h-[8px] bg-usf-red/40" />
              </span>
              , Collaboration & Growth
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              className="mt-8 max-w-2xl text-[17px] leading-[1.75] text-white/75 md:text-[18px]"
            >
              Welcome to the <span className="text-white">United Standards Federation (USF)</span>,
              a USA-based global federation committed to advancing international standards,
              certification, education, innovation, collaboration, workforce development, digital
              transformation, and sustainable growth.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
              className="mt-5 max-w-2xl text-[15.5px] leading-[1.8] text-white/55"
            >
              USF brings together governments, industries, academic institutions, non-profit
              organizations, healthcare systems, technology companies, and professional networks to
              create a powerful ecosystem for international cooperation and development.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <a href="#membership" className="btn-red">
                Become a Member <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#services" className="btn-ghost-light">
                Explore Services <ChevronRight className="h-4 w-4" />
              </a>
              <a
                href="#about"
                className="ml-2 hidden text-[12.5px] font-semibold uppercase tracking-[0.18em] text-white/55 hover:text-white sm:inline-flex"
              >
                <Compass className="mr-2 h-4 w-4 text-usf-red" />
                Federation Charter
              </a>
            </motion.div>
          </div>

          {/* Side stat panel */}
          <motion.aside
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: 'easeOut' }}
            className="lg:col-span-4"
          >
            <div className="relative border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm">
              <span className="absolute -left-px top-8 h-12 w-[3px] bg-usf-red" />
              <h3 className="text-[11px] font-semibold uppercase tracking-eyebrow text-white/55">
                Federation Brief
              </h3>
              <p className="mt-4 font-display text-[22px] leading-[1.3] text-white">
                A global platform connecting industries, governments, academia and non-profits
                under a unified framework of standards.
              </p>

              <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-white/10 pt-6">
                <div>
                  <dt className="text-[10px] font-semibold uppercase tracking-eyebrow text-white/45">
                    Headquarters
                  </dt>
                  <dd className="mt-1 text-[14px] text-white/90">United States</dd>
                </div>
                <div>
                  <dt className="text-[10px] font-semibold uppercase tracking-eyebrow text-white/45">
                    Federation Type
                  </dt>
                  <dd className="mt-1 text-[14px] text-white/90">Global Non-Profit</dd>
                </div>
                <div>
                  <dt className="text-[10px] font-semibold uppercase tracking-eyebrow text-white/45">
                    Member Sectors
                  </dt>
                  <dd className="mt-1 text-[14px] text-white/90">10+ Industries</dd>
                </div>
                <div>
                  <dt className="text-[10px] font-semibold uppercase tracking-eyebrow text-white/45">
                    Working Languages
                  </dt>
                  <dd className="mt-1 text-[14px] text-white/90">EN · DE · NL · DA</dd>
                </div>
              </dl>
            </div>
          </motion.aside>
        </div>

        {/* Trust indicators */}
        <div className="mt-16 border-t border-white/10 pt-8 md:mt-20">
          <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
            <span className="text-[10.5px] font-semibold uppercase tracking-eyebrow text-white/45">
              Federation Pillars
            </span>
            {TRUST_INDICATORS.map((label, idx) => (
              <div
                key={label}
                className="flex items-center gap-3 text-[12.5px] font-medium tracking-[0.04em] text-white/80"
              >
                <span className="inline-flex h-1 w-1 rounded-full bg-usf-red" />
                {label}
                {idx !== TRUST_INDICATORS.length - 1 && (
                  <span className="ml-4 hidden h-3 w-px bg-white/15 lg:inline-block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
