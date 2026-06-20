import { motion } from 'framer-motion';
import WorldMap from './WorldMap.jsx';

const COUNTRIES = [
  { code: 'USA', name: 'United States', role: 'Federation Headquarters', region: 'North America' },
  { code: 'DEU', name: 'Germany', role: 'European Operations', region: 'Europe' },
  { code: 'DNK', name: 'Denmark', role: 'Nordic Council', region: 'Europe' },
  { code: 'NLD', name: 'Netherlands', role: 'Standards Liaison', region: 'Europe' },
  { code: 'GBR', name: 'United Kingdom', role: 'Research Partners', region: 'Europe' },
  { code: 'SGP', name: 'Singapore', role: 'Asia-Pacific Hub', region: 'Asia-Pacific' },
  { code: 'IND', name: 'India', role: 'South Asia Hub', region: 'Asia-Pacific' },
];

export default function GlobalPresence() {
  return (
    <section className="bg-usf-gray/60 py-24 md:py-32">
      <div className="container-usf">
        <div className="grid items-end gap-8 border-b border-usf-blue/10 pb-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <span className="eyebrow">Global Presence</span>
            <h2 className="display-h2 mt-6 text-usf-blue">
              Connecting Organisations Across Borders
            </h2>
          </div>
          <div className="md:col-span-5">
            <p className="text-[15.5px] leading-[1.8] text-usf-muted">
              Building partnerships that drive standards excellence, innovation, research,
              education, and sustainable development globally.
            </p>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative lg:col-span-8"
          >
            <div className="relative overflow-hidden border border-usf-blue/10 bg-white">
              <div className="absolute left-6 top-6 z-10 flex items-center gap-3 text-[10.5px] font-semibold uppercase tracking-eyebrow text-usf-blue">
                <span className="h-px w-8 bg-usf-red" />
                Federation Atlas
              </div>
              <div className="absolute right-6 top-6 z-10 text-[10.5px] font-semibold uppercase tracking-eyebrow text-usf-muted">
                7 Countries · 4 Regions
              </div>
              <WorldMap
                className="block h-auto w-full"
                variant="light"
                showLabels
                showLines
                showPulses
              />
              <div className="border-t border-usf-blue/10 bg-usf-gray/60 px-6 py-4 text-[11.5px] uppercase tracking-eyebrow text-usf-muted">
                <span className="text-usf-red">●</span> Federation Node ·{' '}
                <span className="ml-2">— Active Corridor</span>
              </div>
            </div>
          </motion.div>

          <div className="lg:col-span-4">
            <ol className="border-l border-usf-blue/10">
              {COUNTRIES.map((c, i) => (
                <motion.li
                  key={c.code}
                  initial={{ opacity: 0, x: 8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="group relative py-5 pl-6 pr-3 transition-colors hover:bg-white"
                >
                  <span className="absolute -left-[5px] top-7 h-2.5 w-2.5 rounded-full border border-usf-blue/20 bg-white transition-colors group-hover:border-usf-red group-hover:bg-usf-red" />
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-display text-[20px] leading-[1.2] text-usf-blue">
                      {c.name}
                    </h3>
                    <span className="text-[10.5px] font-semibold uppercase tracking-eyebrow text-usf-muted">
                      {c.code}
                    </span>
                  </div>
                  <div className="mt-1 text-[12.5px] text-usf-muted">
                    {c.role} <span className="divider-dot" /> {c.region}
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
