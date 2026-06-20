import { motion } from 'framer-motion';
import { Linkedin, Mail } from 'lucide-react';

const LEADERS = [
  {
    name: 'Varsha Harle',
    role: 'Founder',
    initials: 'VH',
    bio: 'Founder of the United Standards Federation, leading the institutional vision for global standards, certification, and collaboration.',
    region: 'United States',
  },
  {
    name: 'Piyushkumar Rawal',
    role: 'Secretary',
    initials: 'PR',
    bio: 'Secretary of the Federation, responsible for governance, council operations, and member institution relations.',
    region: 'United States',
  },
  {
    name: 'Rakesh',
    role: 'Executive Director',
    initials: 'RK',
    bio: 'Executive Director overseeing Federation programmes, certification frameworks, and international development initiatives.',
    region: 'United States',
  },
  {
    name: 'Dhawal Patel',
    role: 'Director',
    initials: 'DP',
    bio: 'Director leading strategic partnerships, member growth, and cross-sector collaboration across the Federation network.',
    region: 'United States',
  },
];

function Portrait({ initials }) {
  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden bg-usf-blue">
      {/* Stylised institutional portrait placeholder */}
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 30% 30%, rgba(253,253,253,0.5), transparent 55%), radial-gradient(circle at 70% 80%, rgba(214,20,27,0.45), transparent 55%)',
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
      <div className="absolute inset-0 grid place-items-center">
        <div className="relative">
          <div className="font-display text-[88px] font-light leading-none tracking-[-0.04em] text-white/85">
            {initials}
          </div>
          <div className="mx-auto mt-3 h-[3px] w-10 bg-usf-red" />
        </div>
      </div>
      <div className="absolute bottom-3 left-3 text-[10px] font-semibold uppercase tracking-eyebrow text-white/55">
        USF · Council Portrait
      </div>
    </div>
  );
}

export default function Leadership() {
  return (
    <section id="leadership" className="bg-white py-24 md:py-32">
      <div className="container-usf">
        <div className="grid items-end gap-8 border-b border-usf-blue/10 pb-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <span className="eyebrow">Leadership</span>
            <h2 className="display-h2 mt-6 text-usf-blue">The Federation Council</h2>
          </div>
          <div className="md:col-span-5">
            <p className="text-[15.5px] leading-[1.8] text-usf-muted">
              USF is led by a council of accomplished leaders across industry, governance, and
              international development — guiding the Federation&apos;s strategy and member work.
            </p>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {LEADERS.map((l, i) => (
            <motion.article
              key={l.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: 'easeOut' }}
              className="group relative"
            >
              <div className="relative overflow-hidden border border-usf-blue/10 transition-shadow duration-500 group-hover:shadow-card-hover">
                <Portrait initials={l.initials} />
                <div className="bg-white p-6">
                  <div className="text-[10.5px] font-semibold uppercase tracking-eyebrow text-usf-red">
                    {l.role}
                  </div>
                  <h3 className="mt-2 font-display text-[22px] leading-[1.2] text-usf-blue">
                    {l.name}
                  </h3>
                  <p className="mt-3 text-[13.5px] leading-[1.65] text-usf-muted">{l.bio}</p>
                  <div className="mt-6 flex items-center justify-between border-t border-usf-blue/10 pt-4">
                    <span className="text-[11px] font-semibold uppercase tracking-eyebrow text-usf-muted/80">
                      {l.region}
                    </span>
                    <div className="flex items-center gap-2">
                      <a
                        href="#"
                        aria-label={`LinkedIn — ${l.name}`}
                        className="grid h-8 w-8 place-items-center border border-usf-blue/15 text-usf-blue transition-colors hover:border-usf-red hover:bg-usf-red hover:text-white"
                      >
                        <Linkedin className="h-3.5 w-3.5" />
                      </a>
                      <a
                        href="#contact"
                        aria-label={`Email ${l.name}`}
                        className="grid h-8 w-8 place-items-center border border-usf-blue/15 text-usf-blue transition-colors hover:border-usf-red hover:bg-usf-red hover:text-white"
                      >
                        <Mail className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
