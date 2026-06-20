import { motion } from 'framer-motion';
import { ArrowRight, Building2, GraduationCap, Heart, Landmark, Cpu, Globe } from 'lucide-react';

const NODES = [
  { id: 'gov', label: 'Governments', icon: Landmark, x: 50, y: 18 },
  { id: 'ind', label: 'Industries', icon: Building2, x: 88, y: 38 },
  { id: 'aca', label: 'Universities', icon: GraduationCap, x: 80, y: 80 },
  { id: 'ngo', label: 'NGOs', icon: Heart, x: 36, y: 88 },
  { id: 'tech', label: 'Technology', icon: Cpu, x: 12, y: 60 },
  { id: 'dev', label: 'Development Partners', icon: Globe, x: 18, y: 22 },
];

export default function GlobalConsortium() {
  return (
    <section id="consortium" className="relative overflow-hidden bg-usf-blue-dark py-24 text-white md:py-32">
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
            <span className="eyebrow-light">Global Consortium</span>
            <h2 className="display-h2 mt-6 text-white">Building Global Partnerships</h2>
            <p className="mt-7 text-[16.5px] leading-[1.8] text-white/75">
              USF facilitates collaboration among governments, industries, universities, NGOs,
              technology organisations, and development partners to create sustainable impact and
              international growth.
            </p>

            <ul className="mt-10 space-y-4 border-t border-white/10 pt-6">
              {[
                'Multi-stakeholder working groups for every priority area',
                'Cross-border committees that translate principles into outcomes',
                'Joint programmes with regional councils and partner federations',
                'Independent advisory boards composed of distinguished members',
              ].map((line) => (
                <li
                  key={line}
                  className="flex items-start gap-4 text-[14.5px] leading-[1.7] text-white/80"
                >
                  <span className="mt-[10px] inline-flex h-[2px] w-5 flex-none bg-usf-red" />
                  {line}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a href="#membership" className="btn-red">
                Join the Consortium <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#contact" className="btn-ghost-light">
                Partner With USF
              </a>
            </div>
          </div>

          {/* Connection diagram */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="relative aspect-square w-full max-w-[640px] mx-auto"
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
                    <div className="group flex items-center gap-2 border border-white/15 bg-white/[0.06] px-3 py-2 text-[11.5px] font-semibold uppercase tracking-[0.1em] text-white backdrop-blur-sm transition-colors hover:border-usf-red hover:bg-usf-red">
                      <Icon className="h-3.5 w-3.5 text-usf-red transition-colors group-hover:text-white" />
                      {n.label}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            <div className="mt-6 grid grid-cols-3 gap-3 text-center text-[11px] uppercase tracking-eyebrow text-white/50">
              <div>Council Tier</div>
              <div className="text-usf-red">Working Groups</div>
              <div>Regional Councils</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
