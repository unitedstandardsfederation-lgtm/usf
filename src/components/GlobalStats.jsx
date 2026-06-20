import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const STATS = [
  { value: 25, suffix: '+', label: 'Countries Connected', sub: 'Multi-region federation reach' },
  { value: 100, suffix: '+', label: 'Strategic Partnerships', sub: 'Industry, academic, public sector' },
  { value: 10, suffix: '+', label: 'Industry Sectors', sub: 'From healthcare to infrastructure' },
  { value: 24, suffix: ' Programs', label: 'Global Certifications', sub: 'Standards & accreditation tracks' },
];

const QUALITATIVE = [
  { label: 'International Collaboration Initiatives', value: 'Active' },
  { label: 'Research & Innovation Networks', value: 'Operating' },
  { label: 'Workforce Development Programs', value: 'Expanding' },
];

function Counter({ to, suffix = '', duration = 1600 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(to * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

export default function GlobalStats() {
  return (
    <section className="relative bg-white">
      <div className="container-usf -mt-14 md:-mt-20">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative border border-usf-blue/10 bg-white shadow-card"
        >
          <div className="absolute -top-px left-12 h-[3px] w-24 bg-usf-red" />

          <div className="grid grid-cols-2 divide-y divide-usf-blue/10 md:grid-cols-4 md:divide-x md:divide-y-0">
            {STATS.map((s, i) => (
              <div key={s.label} className="p-8 md:p-10">
                <div className="flex items-baseline gap-1 font-display text-[44px] font-semibold tracking-[-0.02em] text-usf-blue md:text-[52px]">
                  <Counter to={s.value} />
                  <span className="text-usf-red">{s.suffix}</span>
                </div>
                <div className="mt-3 text-[13.5px] font-semibold uppercase tracking-[0.1em] text-usf-text">
                  {s.label}
                </div>
                <div className="mt-2 text-[13px] leading-[1.6] text-usf-muted">{s.sub}</div>
                <div className="mt-6 text-[10.5px] font-semibold uppercase tracking-eyebrow text-usf-muted/70">
                  USF · 0{i + 1}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-usf-blue/10 bg-usf-gray/60 px-8 py-5 md:px-10">
            <div className="flex flex-wrap items-center gap-x-10 gap-y-3">
              <span className="text-[10.5px] font-semibold uppercase tracking-eyebrow text-usf-blue">
                Federation Activity
              </span>
              {QUALITATIVE.map((q) => (
                <div key={q.label} className="flex items-center gap-3 text-[12.5px] text-usf-text">
                  <span className="inline-flex h-1.5 w-1.5 rounded-full bg-usf-red" />
                  <span className="font-medium">{q.label}</span>
                  <span className="text-usf-muted">— {q.value}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
