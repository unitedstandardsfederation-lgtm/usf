import { motion } from 'framer-motion';
import {
  Building,
  Scale,
  Users,
  Building2,
  Leaf,
  Globe2,
} from 'lucide-react';
import site from '../content/site.json';

const ICON_BY_ID = {
  capacity: Building,
  governance: Scale,
  community: Users,
  institutional: Building2,
  sustainability: Leaf,
  cooperation: Globe2,
};

const PILLARS = site.internationalDevelopment.items.map((p) => ({
  ...p,
  icon: ICON_BY_ID[p.id] || Building,
}));

export default function InternationalDevelopment() {
  return (
    <section className="section-pad bg-white">
      <div className="container-usf">
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow justify-center">{site.internationalDevelopment.eyebrow}</span>
          <h2 className="display-h2 mt-6 text-usf-blue">
            {site.internationalDevelopment.heading}
          </h2>
          <p className="lead mt-6">{site.internationalDevelopment.description}</p>
          <div className="mx-auto mt-8 h-[3px] w-12 bg-usf-red" />
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.article
                key={p.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: (i % 3) * 0.08, ease: 'easeOut' }}
                className="card-institutional flex h-full flex-col"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center border border-usf-blue/15 text-usf-blue">
                    <Icon className="h-5 w-5" strokeWidth={1.6} />
                  </div>
                  <span className="font-display text-[28px] font-light text-usf-red/80">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="mt-7 font-display text-[22px] leading-[1.25] text-usf-blue">
                  {p.title}
                </h3>
                <p className="mt-3 flex-1 text-[14.5px] leading-[1.75] text-usf-muted">{p.body}</p>
                <div className="mt-7 h-px w-10 bg-usf-blue/15" />
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
