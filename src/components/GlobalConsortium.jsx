import { motion } from 'framer-motion';
import { ArrowRight, Building2, GraduationCap, Heart, Landmark, Cpu, Globe } from 'lucide-react';
import site from '../content/site.json';

const ICON_BY_ID = {
  gov: Landmark,
  ind: Building2,
  aca: GraduationCap,
  ngo: Heart,
  tech: Cpu,
  dev: Globe,
};

/** Even placement on a ring — 60° apart, first node at 12 o'clock. */
const RING = { cx: 50, cy: 50, r: 41 };

function ringPosition(index, total) {
  const angle = -Math.PI / 2 + (index * 2 * Math.PI) / total;
  return {
    x: RING.cx + RING.r * Math.cos(angle),
    y: RING.cy + RING.r * Math.sin(angle),
  };
}

const NODES = site.consortium.nodes.map((n, i) => ({
  ...n,
  icon: ICON_BY_ID[n.id] || Landmark,
  ...ringPosition(i, site.consortium.nodes.length),
}));

export default function GlobalConsortium() {
  return (
    <section id="consortium" className="section-pad relative overflow-hidden bg-usf-blue-dark text-white">
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />
      <div
        className="absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full opacity-30 blur-3xl"
        style={{
          background:
            'radial-gradient(circle at center, rgba(214,20,27,0.35) 0%, rgba(214,20,27,0) 70%)',
        }}
      />

      <div className="container-usf relative">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <span className="eyebrow-light">{site.consortium.eyebrow}</span>
            <h2 className="display-h2 mt-6 text-white">{site.consortium.heading}</h2>
            <p className="mt-7 text-[16.5px] leading-[1.8] text-white/75">
              {site.consortium.description}
            </p>

            <ul className="mt-10 space-y-4 border-t border-white/10 pt-6">
              {site.consortium.bullets.map((line) => (
                <li
                  key={line}
                  className="flex items-start gap-4 text-[14.5px] leading-[1.7] text-white/80"
                >
                  <span className="mt-[10px] inline-flex h-[2px] w-5 flex-none bg-usf-red" />
                  {line}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <a href="#membership" className="btn-red">
                {site.consortium.ctaPrimary} <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#contact" className="btn-ghost-light">
                {site.consortium.ctaSecondary}
              </a>
            </div>
          </div>

          {/* Connection diagram — desktop/tablet */}
          <div className="lg:col-span-7">
            {/* Mobile: compact node list */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:hidden">
              {NODES.map((n, i) => {
                const Icon = n.icon;
                return (
                  <motion.div
                    key={`mobile-${n.id}`}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                    className="flex items-center gap-3 border border-white/15 bg-white/[0.06] px-4 py-3 backdrop-blur-sm"
                  >
                    <Icon className="h-4 w-4 flex-none text-usf-red" />
                    <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-white">
                      {n.label}
                    </span>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="relative mx-auto hidden aspect-square w-full max-w-[640px] md:block"
            >
              <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
                <defs>
                  <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#D6141B" stopOpacity="0.5" />
                    <stop offset="60%" stopColor="#D6141B" stopOpacity="0.05" />
                    <stop offset="100%" stopColor="#D6141B" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Concentric institutional rings */}
                {[42, 32, 22, 12].map((r, i) => (
                  <circle
                    key={r}
                    cx="50"
                    cy="50"
                    r={r}
                    fill="none"
                    stroke="rgba(255,255,255,0.10)"
                    strokeWidth="0.2"
                    strokeDasharray={i === 0 ? '0.6 0.6' : i === 1 ? '0' : '0.4 0.8'}
                  />
                ))}

                {/* Lines from center to each node */}
                {NODES.map((n) => (
                  <line
                    key={`l-${n.id}`}
                    x1="50"
                    y1="50"
                    x2={n.x}
                    y2={n.y}
                    stroke="rgba(214,20,27,0.55)"
                    strokeWidth="0.25"
                    strokeDasharray="0.7 0.7"
                  />
                ))}

                {/* Center halo */}
                <circle cx="50" cy="50" r="18" fill="url(#centerGlow)" />
                <circle cx="50" cy="50" r="5" fill="#0C2B5B" stroke="#D6141B" strokeWidth="0.4" />
                <text
                  x="50"
                  y="51.5"
                  textAnchor="middle"
                  fill="#FDFDFD"
                  style={{ fontFamily: 'Inter, sans-serif', fontSize: 2.4, fontWeight: 700, letterSpacing: '0.2em' }}
                >
                  USF
                </text>
              </svg>

              {/* Node pills */}
              {NODES.map((n, i) => {
                const Icon = n.icon;
                return (
                  <motion.div
                    key={n.id}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 + i * 0.08 }}
                    className="absolute"
                    style={{
                      left: `${n.x}%`,
                      top: `${n.y}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <div className="group flex max-w-[120px] flex-col items-center gap-1 border border-white/15 bg-white/[0.06] px-2 py-1.5 text-center text-[9px] font-semibold uppercase leading-tight tracking-[0.06em] text-white backdrop-blur-sm transition-colors hover:border-usf-red hover:bg-usf-red sm:max-w-none sm:flex-row sm:gap-2 sm:whitespace-nowrap sm:px-3 sm:py-2 sm:text-[10px] lg:text-[11.5px] lg:tracking-[0.1em]">
                      <Icon className="h-3 w-3 flex-none text-usf-red transition-colors group-hover:text-white sm:h-3.5 sm:w-3.5" />
                      {n.label}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            <div className="mt-6 hidden grid-cols-3 gap-2 text-center text-[10px] uppercase tracking-eyebrow text-white/50 md:grid sm:gap-3 sm:text-[11px]">
              {site.consortium.diagramFooter.map((label, i) => (
                <div key={label} className={i === 1 ? 'text-usf-red' : undefined}>
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
