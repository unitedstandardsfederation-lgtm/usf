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

const SECTORS = [
  { icon: HeartPulse, name: 'Healthcare & Life Sciences', tag: 'Regulated' },
  { icon: FlaskConical, name: 'Pharmaceuticals & Biotechnology', tag: 'Regulated' },
  { icon: BookOpen, name: 'Education & Research', tag: 'Academic' },
  { icon: Cpu, name: 'Information Technology', tag: 'Tech' },
  { icon: Factory, name: 'Manufacturing & Engineering', tag: 'Industrial' },
  { icon: Leaf, name: 'Sustainability & Environment', tag: 'ESG' },
  { icon: Briefcase, name: 'Consulting & Professional Services', tag: 'Advisory' },
  { icon: Globe, name: 'International Trade', tag: 'Cross-Border' },
  { icon: Building2, name: 'Infrastructure & Development', tag: 'Public Works' },
  { icon: HandHeart, name: 'Non-Profit & Social Impact', tag: 'Civil Society' },
  { icon: Landmark, name: 'Government Institutions', tag: 'Public Sector' },
  { icon: Lightbulb, name: 'Innovation & Technology', tag: 'R&D' },
];

export default function Industries() {
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="container-usf">
        <div className="grid items-end gap-8 border-b border-usf-blue/10 pb-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <span className="eyebrow">Sector Coverage</span>
            <h2 className="display-h2 mt-6 text-usf-blue">Industries We Support</h2>
          </div>
          <div className="md:col-span-5">
            <p className="text-[15.5px] leading-[1.8] text-usf-muted">
              Twelve sectors anchor USF&apos;s standards and certification work, each represented by
              committees, technical advisors, and partner institutions across the Federation.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-px bg-usf-blue/10 sm:grid-cols-3 lg:grid-cols-4">
          {SECTORS.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.05, ease: 'easeOut' }}
                className="group relative bg-white p-7 transition-colors duration-500 hover:bg-usf-gray/70"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center border border-usf-blue/15 text-usf-blue transition-colors group-hover:border-usf-red group-hover:text-usf-red">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <span className="text-[10.5px] font-semibold uppercase tracking-eyebrow text-usf-muted/80">
                    {s.tag}
                  </span>
                </div>
                <h3 className="mt-7 font-display text-[17px] leading-[1.3] text-usf-blue">
                  {s.name}
                </h3>
                <div className="mt-5 flex items-center justify-between border-t border-usf-blue/10 pt-4 text-[11px] uppercase tracking-eyebrow text-usf-muted/70">
                  <span>Committee · {String(i + 1).padStart(2, '0')}</span>
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
