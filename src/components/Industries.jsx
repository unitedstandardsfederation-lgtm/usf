import { motion } from 'framer-motion';
import {
  HeartPulse,
  FlaskConical,
  BookOpen,
  Cpu,
  Factory,
  Leaf,
  Briefcase,
  Globe,
  Building2,
  HandHeart,
  Landmark,
  Lightbulb,
} from 'lucide-react';
import site from '../content/site.json';

const ICON_BY_ID = {
  healthcare: HeartPulse,
  pharma: FlaskConical,
  education: BookOpen,
  it: Cpu,
  manufacturing: Factory,
  sustainability: Leaf,
  consulting: Briefcase,
  trade: Globe,
  infrastructure: Building2,
  nonprofit: HandHeart,
  government: Landmark,
  innovation: Lightbulb,
};

const SECTORS = site.industries.items.map((s) => ({
  ...s,
  icon: ICON_BY_ID[s.id] || Briefcase,
}));

export default function Industries() {
  return (
    <section className="section-pad bg-white">
      <div className="container-usf">
        <div className="grid items-end gap-8 border-b border-usf-blue/10 pb-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <span className="eyebrow">{site.industries.eyebrow}</span>
            <h2 className="display-h2 mt-6 text-usf-blue">{site.industries.heading}</h2>
          </div>
          <div className="md:col-span-5">
            <p className="text-[15.5px] leading-[1.8] text-usf-muted">{site.industries.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-px bg-usf-blue/10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {SECTORS.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.05, ease: 'easeOut' }}
                className="group relative bg-white p-5 transition-colors duration-500 hover:bg-usf-gray/70 sm:p-6 md:p-7"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center border border-usf-blue/15 text-usf-blue transition-colors group-hover:border-usf-red group-hover:text-usf-red">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <span className="text-[10.5px] font-semibold uppercase tracking-eyebrow text-usf-muted/80">
                    {s.tag}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-[16px] leading-[1.3] text-usf-blue sm:mt-7 sm:text-[17px]">
                  {s.name}
                </h3>
                <div className="mt-5 flex items-center justify-between border-t border-usf-blue/10 pt-4 text-[11px] uppercase tracking-eyebrow text-usf-muted/70">
                  <span>{site.industries.committeeLabel} · {String(i + 1).padStart(2, '0')}</span>
                  <span className="h-px w-8 bg-usf-red transition-all group-hover:w-12" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
