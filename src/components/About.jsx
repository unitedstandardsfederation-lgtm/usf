import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function About() {
  return (
    <section className="relative bg-usf-gray/60 py-24 md:py-32" id="about">
      {/* Decorative number behind */}
      <div className="pointer-events-none absolute right-0 top-12 hidden select-none font-display text-[180px] leading-none text-usf-blue/[0.05] md:block">
        USF
      </div>

      <div className="container-usf relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
          {/* Editorial side */}
          <div className="lg:col-span-5">
            <span className="eyebrow">About</span>
            <h2 className="display-h2 mt-6 text-usf-blue">
              About United Standards Federation
            </h2>

            <div className="mt-10 border-l-[3px] border-usf-red pl-6">
              <p className="font-display text-[22px] leading-[1.45] text-usf-text">
                A USA-based global alliance dedicated to strengthening standards, development,
                certification, innovation, education, workforce advancement, and international
                collaboration.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-8 border-t border-usf-blue/10 pt-8">
              <div>
                <div className="text-[10.5px] font-semibold uppercase tracking-eyebrow text-usf-muted">
                  Founded
                </div>
                <div className="mt-1 font-display text-[22px] text-usf-blue">United States</div>
              </div>
              <div>
                <div className="text-[10.5px] font-semibold uppercase tracking-eyebrow text-usf-muted">
                  Charter
                </div>
                <div className="mt-1 font-display text-[22px] text-usf-blue">Global Federation</div>
              </div>
              <div>
                <div className="text-[10.5px] font-semibold uppercase tracking-eyebrow text-usf-muted">
                  Governance
                </div>
                <div className="mt-1 text-[15px] text-usf-text/90">Council · Board · Committees</div>
              </div>
              <div>
                <div className="text-[10.5px] font-semibold uppercase tracking-eyebrow text-usf-muted">
                  Operating Model
                </div>
                <div className="mt-1 text-[15px] text-usf-text/90">Members · Working Groups</div>
              </div>
            </div>
          </div>

          {/* Long-form copy */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="space-y-7 text-[16.5px] leading-[1.85] text-usf-text/85"
            >
              <p>
                United Standards Federation (USF) is a USA-based global alliance dedicated to
                strengthening standards, development, certification, innovation, education,
                workforce advancement, and international collaboration. Through a deliberate
                multi-stakeholder model, USF convenes institutions that would not ordinarily share
                a table, and gives them a structured framework to act together.
              </p>
              <p>
                USF serves as a collaborative platform connecting organisations from diverse
                sectors to create synergy, improve quality systems, accelerate growth, support
                international expansion, and promote sustainable development. Members benefit from
                committee participation, sector working groups, peer review programmes, and
                regional councils that translate global priorities into local action.
              </p>
              <p className="text-usf-muted">
                Anchored in the United States and operating across North America, Europe, and Asia,
                the Federation maintains a quiet, principled posture: rigorous in process,
                expansive in collaboration, and uncompromising about outcomes that endure.
              </p>
            </motion.div>

            {/* Pull quote */}
            <motion.figure
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
              className="mt-14 border border-usf-blue/10 bg-white p-10"
            >
              <svg
                aria-hidden="true"
                className="h-7 w-7 text-usf-red"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M9 7H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2v2a2 2 0 0 1-2 2H4v2h1a4 4 0 0 0 4-4V9a2 2 0 0 0 0-2zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2v2a2 2 0 0 1-2 2h-1v2h1a4 4 0 0 0 4-4V9a2 2 0 0 0 0-2z" />
              </svg>
              <blockquote className="mt-5 font-display text-[24px] leading-[1.45] text-usf-blue md:text-[28px]">
                We bring standards, certification, and collaboration into a single, principled
                framework — so that organisations across borders can build with shared confidence.
              </blockquote>
              <figcaption className="mt-7 flex items-center gap-4 border-t border-usf-blue/10 pt-5 text-[12.5px] uppercase tracking-[0.18em] text-usf-muted">
                <span className="h-px w-8 bg-usf-red" />
                The USF Charter
              </figcaption>
            </motion.figure>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a href="#services" className="btn-ghost">
                Read the Charter <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#leadership" className="link-arrow">
                Meet the Leadership <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
