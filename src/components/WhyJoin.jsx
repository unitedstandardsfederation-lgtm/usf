import { motion } from 'framer-motion';
import {
  Globe,
  Eye,
  Handshake,
  ScrollText,
  Network,
  TrendingUp,
} from 'lucide-react';
import site from '../content/site.json';

const ICON_BY_ID = {
  recognition: Globe,
  visibility: Eye,
  partnerships: Handshake,
  standards: ScrollText,
  networking: Network,
  growth: TrendingUp,
};

const BENEFITS = site.whyJoin.items.map((b) => ({
  ...b,
  icon: ICON_BY_ID[b.id] || Globe,
}));

export default function WhyJoin() {
  return (
    <section className="section-pad bg-usf-gray/60">
      <div className="container-usf">
        <div className="grid items-end gap-8 md:grid-cols-2">
          <div>
            <span className="eyebrow">{site.whyJoin.eyebrow}</span>
            <h2 className="display-h2 mt-6 max-w-xl text-usf-blue">{site.whyJoin.heading}</h2>
          </div>
          <p className="max-w-md justify-self-start text-[15.5px] leading-[1.8] text-usf-muted md:justify-self-end md:text-right">
            {site.whyJoin.description}
          </p>
        </div>

        <div className="mt-14 grid gap-px border border-usf-blue/10 bg-usf-blue/10 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((b, i) => {
            const Icon = b.icon;
            return (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, delay: (i % 3) * 0.08, ease: 'easeOut' }}
                className="group relative bg-white p-6 transition-colors duration-500 hover:bg-usf-blue hover:text-white sm:p-7 md:p-9"
              >
                <span className="absolute right-7 top-7 text-[11px] font-semibold uppercase tracking-eyebrow text-usf-muted/70 group-hover:text-white/45">
                  0{i + 1}
                </span>
                <div className="flex h-14 w-14 items-center justify-center border border-usf-blue/15 text-usf-blue transition-colors group-hover:border-usf-red group-hover:bg-usf-red group-hover:text-white">
                  <Icon className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <h3 className="mt-7 font-display text-[22px] leading-[1.25] text-usf-blue group-hover:text-white">
                  {b.title}
                </h3>
                <p className="mt-3 text-[14.5px] leading-[1.75] text-usf-muted group-hover:text-white/75">
                  {b.body}
                </p>
                <div className="mt-7 h-px w-10 bg-usf-red transition-all group-hover:w-16" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
