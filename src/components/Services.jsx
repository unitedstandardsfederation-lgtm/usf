import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Scale,
  BadgeCheck,
  Network,
  GraduationCap,
  Cpu,
  Users2,
  Handshake,
  FlaskConical,
  ArrowUpRight,
} from 'lucide-react';
import site from '../content/site.json';

const ICON_BY_ID = {
  standards: Scale,
  certification: BadgeCheck,
  membership: Network,
  training: GraduationCap,
  it: Cpu,
  resourcing: Users2,
  partnerships: Handshake,
  research: FlaskConical,
};

const SERVICES = site.services.items.map((s) => ({
  ...s,
  icon: ICON_BY_ID[s.id] || Scale,
}));

const MotionLink = motion(Link);

export default function Services() {
  return (
    <section className="section-pad relative bg-usf-blue text-white" id="services">
      <div
        className="absolute inset-0 -z-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />
      <div className="container-usf relative">
        <div className="grid items-end gap-10 border-b border-white/10 pb-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <span className="eyebrow-light">{site.services.eyebrow}</span>
            <h2 className="display-h2 mt-6 text-white">
              {site.services.headingStart}
              <span className="text-white/70">{site.services.headingHighlight}</span>
              {site.services.headingEnd}
            </h2>
          </div>
          <div className="md:col-span-5">
            <p className="text-[15.5px] leading-[1.8] text-white/70">{site.services.description}</p>
            <a href="/#contact" className="link-arrow mt-6 text-white hover:text-usf-red">
              {site.services.secretariatLink} <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, idx) => {
            const Icon = s.icon;
            return (
              <MotionLink
                key={s.title}
                to={s.href}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: (idx % 4) * 0.06, ease: 'easeOut' }}
                className="group relative flex h-full flex-col bg-usf-blue p-5 transition-colors duration-500 hover:bg-usf-blue-dark sm:p-6 md:p-8"
              >
                <span className="absolute left-0 top-0 h-[2px] w-0 bg-usf-red transition-all duration-500 group-hover:w-full" />
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center border border-white/20 text-white transition-colors group-hover:border-usf-red group-hover:text-usf-red">
                    <Icon className="h-5 w-5" strokeWidth={1.6} />
                  </div>
                  <span className="text-[11px] font-semibold uppercase tracking-eyebrow text-white/45">
                    {s.no}
                  </span>
                </div>

                <h3 className="mt-7 font-display text-[20px] leading-[1.25] text-white">
                  {s.title}
                </h3>
                <p className="mt-3 text-[13.5px] leading-[1.7] text-white/65">{s.summary}</p>

                <ul className="mt-6 flex-1 space-y-2 border-t border-white/10 pt-5 text-[12.5px] text-white/80">
                  {s.items.map((it) => (
                    <li key={it} className="flex items-start gap-2.5 leading-[1.55]">
                      <span className="mt-[7px] inline-flex h-1 w-1 flex-none rounded-full bg-usf-red" />
                      {it}
                    </li>
                  ))}
                </ul>

                <span className="mt-8 inline-flex items-center gap-2 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-white/70 transition-colors group-hover:text-white">
                  {site.services.readMoreLabel} <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </MotionLink>
            );
          })}
        </div>
      </div>
    </section>
  );
}
