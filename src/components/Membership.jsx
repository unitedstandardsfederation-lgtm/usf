import { motion } from 'framer-motion';
import {
  ArrowRight,
  Globe2,
  Eye,
  Vote,
  Handshake,
  GraduationCap,
  Network,
  BadgeCheck,
  TrendingUp,
} from 'lucide-react';

const BENEFITS = [
  { icon: Globe2, label: 'Global Networking' },
  { icon: Eye, label: 'International Exposure' },
  { icon: Vote, label: 'Committee Participation' },
  { icon: Handshake, label: 'Strategic Partnerships' },
  { icon: GraduationCap, label: 'Educational Collaboration' },
  { icon: Network, label: 'Industry Alliances' },
  { icon: BadgeCheck, label: 'Certification Support' },
  { icon: TrendingUp, label: 'Growth Opportunities' },
];

const TIERS = [
  {
    name: 'Institutional',
    tag: 'Organisations',
    description:
      'For corporations, agencies, universities, and NGOs joining the Federation as full institutional members.',
    highlights: [
      'Council & committee participation',
      'All eight federation benefits',
      'Co-branded programmes and convenings',
    ],
    cta: 'Apply for Membership',
  },
  {
    name: 'Affiliate',
    tag: 'Professional',
    description:
      'For senior professionals contributing to working groups, advisory roles, and Federation-led research.',
    highlights: [
      'Working group access',
      'Member-only convenings',
      'Certification & training pathways',
    ],
    cta: 'Become an Affiliate',
  },
  {
    name: 'Partner',
    tag: 'Strategic',
    description:
      'For governments, foundations, and partner federations entering long-term programme partnerships with USF.',
    highlights: [
      'Bilateral programme design',
      'Joint research & publications',
      'Co-hosted regional initiatives',
    ],
    cta: 'Partner with USF',
  },
];

export default function Membership() {
  return (
    <section id="membership" className="relative overflow-hidden bg-usf-gray/60 py-24 md:py-32">
      <div className="container-usf">
        <div className="grid items-end gap-8 border-b border-usf-blue/10 pb-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <span className="eyebrow">Membership</span>
            <h2 className="display-h2 mt-6 text-usf-blue">
              Eight Benefits. One Federation.
            </h2>
          </div>
          <div className="md:col-span-5">
            <p className="text-[15.5px] leading-[1.8] text-usf-muted">
              Members access a coherent set of benefits — designed for institutions that want their
              outcomes recognised across borders, sectors, and standards regimes.
            </p>
          </div>
        </div>

        {/* Eight benefit chips */}
        <div className="grid grid-cols-2 gap-px border border-usf-blue/10 bg-usf-blue/10 sm:grid-cols-4">
          {BENEFITS.map((b, i) => {
            const Icon = b.icon;
            return (
              <motion.div
                key={b.label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.05 }}
                className="group flex items-center gap-4 bg-white px-6 py-5 transition-colors hover:bg-usf-blue hover:text-white"
              >
                <div className="flex h-10 w-10 flex-none items-center justify-center border border-usf-blue/15 text-usf-blue transition-colors group-hover:border-usf-red group-hover:bg-usf-red group-hover:text-white">
                  <Icon className="h-4 w-4" strokeWidth={1.6} />
                </div>
                <div className="text-[13.5px] font-semibold text-usf-blue group-hover:text-white">
                  {b.label}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Membership tiers */}
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {TIERS.map((t, i) => (
            <motion.article
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className={`relative flex h-full flex-col border bg-white p-10 transition-shadow duration-500 ${
                i === 0
                  ? 'border-usf-blue bg-usf-blue text-white'
                  : 'border-usf-blue/10 hover:shadow-card-hover'
              }`}
            >
              {i === 0 && (
                <span className="absolute right-8 top-8 inline-flex items-center bg-usf-red px-2.5 py-1 text-[10px] font-semibold uppercase tracking-eyebrow text-white">
                  Flagship
                </span>
              )}
              <div
                className={`text-[10.5px] font-semibold uppercase tracking-eyebrow ${
                  i === 0 ? 'text-white/60' : 'text-usf-muted'
                }`}
              >
                {t.tag}
              </div>
              <h3
                className={`mt-3 font-display text-[28px] leading-[1.15] ${
                  i === 0 ? 'text-white' : 'text-usf-blue'
                }`}
              >
                {t.name}
              </h3>
              <p
                className={`mt-4 text-[14.5px] leading-[1.75] ${
                  i === 0 ? 'text-white/75' : 'text-usf-muted'
                }`}
              >
                {t.description}
              </p>

              <ul
                className={`mt-7 space-y-3 border-t pt-5 text-[14px] ${
                  i === 0
                    ? 'border-white/15 text-white/85'
                    : 'border-usf-blue/10 text-usf-text/80'
                }`}
              >
                {t.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 leading-[1.65]">
                    <span
                      className={`mt-[9px] inline-flex h-[2px] w-4 flex-none ${
                        i === 0 ? 'bg-usf-red' : 'bg-usf-red'
                      }`}
                    />
                    {h}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-10">
                <a
                  href="#contact"
                  className={
                    i === 0
                      ? 'btn-red w-full justify-center'
                      : 'btn-ghost w-full justify-center'
                  }
                >
                  {t.cta} <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
