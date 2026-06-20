import { motion } from 'framer-motion';
import {
  Globe,
  Eye,
  Handshake,
  ScrollText,
  Network,
  TrendingUp,
} from 'lucide-react';

const BENEFITS = [
  {
    icon: Globe,
    title: 'Global Recognition',
    body: 'Be associated with a Federation that signals rigour, governance, and international credibility.',
  },
  {
    icon: Eye,
    title: 'International Visibility',
    body: 'Reach decision-makers, peer institutions, and prospective partners across 25+ countries.',
  },
  {
    icon: Handshake,
    title: 'Strategic Partnerships',
    body: 'Move from transactional outreach to long-term alliances with industry, academia, and government.',
  },
  {
    icon: ScrollText,
    title: 'Standards Guidance',
    body: 'Direct access to working groups, frameworks, and advisory services that shape your standards journey.',
  },
  {
    icon: Network,
    title: 'Industry Networking',
    body: 'Closed-door forums, committee tables, and curated convenings across sectors and regions.',
  },
  {
    icon: TrendingUp,
    title: 'Growth Opportunities',
    body: 'Pathways into new markets, talent pools, and collaborative R&D programmes.',
  },
];

export default function WhyJoin() {
  return (
    <section className="bg-usf-gray/60 py-24 md:py-32">
      <div className="container-usf">
        <div className="grid items-end gap-8 md:grid-cols-2">
          <div>
            <span className="eyebrow">Member Value</span>
            <h2 className="display-h2 mt-6 max-w-xl text-usf-blue">
              Why Organisations Join USF
            </h2>
          </div>
          <p className="max-w-md justify-self-start text-[15.5px] leading-[1.8] text-usf-muted md:justify-self-end md:text-right">
            Federation membership is built around six durable advantages — each backed by formal
            programmes, working groups, and partner institutions.
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
                className="group relative bg-white p-9 transition-colors duration-500 hover:bg-usf-blue hover:text-white"
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
