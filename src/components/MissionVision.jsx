import { motion } from 'framer-motion';
import { Compass, Telescope } from 'lucide-react';
import site from '../content/site.json';

const ICON_BY_ID = { mission: Compass, vision: Telescope };

const ITEMS = site.missionVision.items.map((item) => ({
  ...item,
  icon: ICON_BY_ID[item.id] || Compass,
}));

export default function MissionVision() {
  return (
    <section className="section-pad bg-white">
      <div className="container-usf">
        <div className="grid items-end gap-8 border-b border-usf-blue/10 pb-10 md:grid-cols-2">
          <div>
            <span className="eyebrow">{site.missionVision.eyebrow}</span>
            <h2 className="display-h2 mt-6 max-w-2xl text-usf-blue">{site.missionVision.heading}</h2>
          </div>
          <p className="text-[15.5px] leading-[1.8] text-usf-muted md:text-right">
            {site.missionVision.description}
          </p>
        </div>

        <div className="grid gap-px bg-usf-blue/10 md:grid-cols-2">
          {ITEMS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: idx * 0.1, ease: 'easeOut' }}
                className={`relative bg-white p-6 sm:p-8 md:p-10 lg:p-12 ${
                  idx === 0 ? 'md:pr-14' : 'md:pl-14'
                }`}
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <span className="font-display text-[32px] font-light leading-none text-usf-red sm:text-[42px]">
                      {item.no}
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-eyebrow text-usf-muted">
                      {item.label}
                    </span>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center border border-usf-blue/15 text-usf-blue">
                    <Icon className="h-5 w-5" strokeWidth={1.6} />
                  </div>
                </div>

                <p className="mt-6 font-display text-[20px] leading-[1.4] text-usf-blue sm:mt-8 sm:text-[24px] md:text-[26px]">
                  {item.title}
                </p>

                <ul className="mt-10 space-y-3 border-t border-usf-blue/10 pt-6 text-[14.5px] text-usf-text/85">
                  {item.points.map((p) => (
                    <li key={p} className="flex items-start gap-3 leading-[1.7]">
                      <span className="mt-[10px] inline-flex h-[2px] w-4 flex-none bg-usf-red" />
                      {p}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
