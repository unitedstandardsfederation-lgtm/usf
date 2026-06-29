import { motion } from 'framer-motion';
import WorldMap from './WorldMap.jsx';
import site from '../content/site.json';

const COUNTRIES = site.globalPresence.countries;

export default function GlobalPresence() {
  return (
    <section className="section-pad bg-usf-gray/60">
      <div className="container-usf">
        <div className="grid items-end gap-8 border-b border-usf-blue/10 pb-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <span className="eyebrow">{site.globalPresence.eyebrow}</span>
            <h2 className="display-h2 mt-6 text-usf-blue">{site.globalPresence.heading}</h2>
          </div>
          <div className="md:col-span-5">
            <p className="text-[15.5px] leading-[1.8] text-usf-muted">
              {site.globalPresence.description}
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
              <div className="flex flex-col gap-2 border-b border-usf-blue/10 bg-usf-gray/40 px-4 py-3 sm:absolute sm:left-6 sm:top-6 sm:z-10 sm:flex-row sm:items-center sm:gap-3 sm:border-0 sm:bg-transparent sm:p-0">
                <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-eyebrow text-usf-blue sm:gap-3 sm:text-[10.5px]">
                  <span className="h-px w-6 bg-usf-red sm:w-8" />
                  {site.globalPresence.atlasLabel}
                </div>
                <div className="text-[10px] font-semibold uppercase tracking-eyebrow text-usf-muted sm:text-[10.5px]">
                  {site.globalPresence.atlasMeta}
                </div>
              </div>
              <WorldMap
                className="block h-auto w-full pt-0 sm:pt-10"
                variant="light"
                showLabels
                showLines
                showPulses
              />
              <div className="border-t border-usf-blue/10 bg-usf-gray/60 px-4 py-3 text-[10px] uppercase tracking-eyebrow text-usf-muted sm:px-6 sm:py-4 sm:text-[11.5px]">
                <span className="text-usf-red">●</span> {site.globalPresence.atlasLegendNode} ·{' '}
                <span className="ml-2">— {site.globalPresence.atlasLegendCorridor}</span>
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
                  className="group relative py-4 pl-5 pr-2 transition-colors hover:bg-white sm:py-5 sm:pl-6 sm:pr-3"
                >
                  <span className="absolute -left-[5px] top-7 h-2.5 w-2.5 rounded-full border border-usf-blue/20 bg-white transition-colors group-hover:border-usf-red group-hover:bg-usf-red" />
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-display text-[17px] leading-[1.2] text-usf-blue sm:text-[20px]">
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
