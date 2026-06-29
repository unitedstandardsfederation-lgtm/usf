import { motion } from 'framer-motion';
import {
  Briefcase,
  GraduationCap,
  Landmark,
  Heart,
  ArrowUpRight,
} from 'lucide-react';
import site from '../content/site.json';

const ICON_BY_ID = {
  industry: Briefcase,
  educational: GraduationCap,
  government: Landmark,
  nonprofit: Heart,
};

const CARDS = site.ecosystem.cards.map((c) => ({
  ...c,
  icon: ICON_BY_ID[c.id] || Briefcase,
}));

export default function Ecosystem() {
  return (
    <section className="section-pad bg-white" id="consortium-preview">
      <div className="container-usf">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <span className="eyebrow">{site.ecosystem.eyebrow}</span>
            <h2 className="display-h2 mt-6 text-usf-blue">
              {site.ecosystem.headlineStart}
              <span className="relative inline-block">
                <span className="relative z-10">{site.ecosystem.headlineHighlight}</span>
                <span className="absolute inset-x-0 bottom-1 -z-0 h-[10px] bg-usf-red/15" />
              </span>
            </h2>
            <p className="lead mt-7 max-w-md">{site.ecosystem.description}</p>
            <div className="mt-10 hidden h-px w-24 bg-usf-red lg:block" />
            <p className="mt-6 hidden max-w-sm text-[14px] leading-[1.75] text-usf-muted lg:block">
              {site.ecosystem.subDescription}
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="grid gap-px bg-usf-blue/10 sm:grid-cols-2">
              {CARDS.map((card, idx) => {
                const Icon = card.icon;
                return (
                  <motion.article
                    key={card.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: idx * 0.08, ease: 'easeOut' }}
                    className="group relative flex flex-col bg-white p-5 transition-colors duration-500 hover:bg-usf-gray/60 sm:p-6 md:p-7"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex h-12 w-12 items-center justify-center border border-usf-blue/15 bg-white text-usf-blue transition-colors group-hover:border-usf-red group-hover:text-usf-red">
                        <Icon className="h-5 w-5" strokeWidth={1.6} />
                      </div>
                      <span className="text-[11px] font-semibold uppercase tracking-eyebrow text-usf-muted/70">
                        {card.no}
                      </span>
                    </div>

                    <h3 className="mt-5 font-display text-[19px] leading-[1.25] text-usf-blue sm:mt-6 sm:text-[22px]">
                      {card.title}
                    </h3>
                    <p className="mt-3 text-[14px] leading-[1.7] text-usf-muted">
                      {card.description}
                    </p>

                    <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2 border-t border-usf-blue/10 pt-5 text-[12.5px] text-usf-text/80">
                      {card.items.map((it) => (
                        <li key={it} className="flex items-center gap-2">
                          <span className="inline-flex h-1 w-1 rounded-full bg-usf-red" />
                          {it}
                        </li>
                      ))}
                    </ul>

                    <a
                      href="#consortium"
                      className="link-arrow mt-7 self-start"
                      aria-label={`Learn more about ${card.title}`}
                    >
                      {site.ecosystem.engageLabel} <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
