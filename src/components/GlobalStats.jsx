import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import site from '../content/site.json';

const STATS = site.stats.items;
const QUALITATIVE = site.stats.activities;

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
      <div className="container-usf -mt-10 sm:-mt-14 md:-mt-20">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative border border-usf-blue/10 bg-white shadow-card"
        >
          <div className="grid grid-cols-1 divide-y divide-usf-blue/10 sm:grid-cols-2 md:grid-cols-4 md:divide-x md:divide-y-0">
            {STATS.map((s, i) => (
              <div key={s.label} className="p-5 sm:p-6 md:p-8 lg:p-10">
                <div className="flex flex-wrap items-baseline gap-x-1 font-display font-semibold tracking-[-0.02em] text-usf-blue">
                  <span className="text-[36px] sm:text-[44px] md:text-[52px]">
                    <Counter to={s.value} />
                  </span>
                  <span
                    className={
                      s.suffix.trim() === 'Programs'
                        ? 'text-[22px] leading-none text-usf-red sm:text-[28px] md:text-[34px]'
                        : 'text-[36px] text-usf-red sm:text-[44px] md:text-[52px]'
                    }
                  >
                    {s.suffix}
                  </span>
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

          <div className="border-t border-usf-blue/10 bg-usf-gray/60 px-5 py-4 sm:px-6 md:px-8 lg:px-10 md:py-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-10 sm:gap-y-3">
              <span className="text-[10.5px] font-semibold uppercase tracking-eyebrow text-usf-blue">
                {site.stats.activityLabel}
              </span>
              {QUALITATIVE.map((q) => (
                <div key={q.label} className="flex items-center gap-3 text-[12.5px] text-usf-text">
                  <span className="inline-flex h-1.5 w-1.5 rounded-full bg-usf-red" />
                  <span className="font-semibold text-usf-blue">{q.value}</span>
                  <span className="font-medium">{q.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
