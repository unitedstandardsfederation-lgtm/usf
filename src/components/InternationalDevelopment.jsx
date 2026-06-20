import { motion } from 'framer-motion';
import {
  Building,
  Scale,
  Users,
  Building2,
  Leaf,
  Globe2,
} from 'lucide-react';

const PILLARS = [
  {
    icon: Building,
    title: 'Capacity Building',
    body: 'Long-term programmes that strengthen institutional capabilities across emerging and established economies.',
  },
  {
    icon: Scale,
    title: 'Governance Programs',
    body: 'Frameworks, advisory work, and peer review to advance transparent, accountable institutions.',
  },
  {
    icon: Users,
    title: 'Community Development',
    body: 'Locally rooted initiatives co-designed with civil society to deliver measurable outcomes.',
  },
  {
    icon: Building2,
    title: 'Institutional Development',
    body: 'Modernisation pathways for public agencies, universities, and large multi-mandate organisations.',
  },
  {
    icon: Leaf,
    title: 'Sustainability Initiatives',
    body: 'ESG, climate, and circularity programmes that turn ambition into reportable outcomes.',
  },
  {
    icon: Globe2,
    title: 'International Cooperation',
    body: 'Bilateral and multilateral cooperation channels that move work from policy intent to programme delivery.',
  },
];

export default function InternationalDevelopment() {
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="container-usf">
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow justify-center">International Development</span>
          <h2 className="display-h2 mt-6 text-usf-blue">
            Supporting Sustainable Development Worldwide
          </h2>
          <p className="lead mt-6">
            Six development pillars guide the Federation&apos;s long-horizon work — operationalised
            through partner programmes, regional councils, and dedicated technical teams.
          </p>
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
