import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import site from '../content/site.json';

const about = site.about;

export default function About() {
  return (
    <section className="section-pad relative bg-usf-gray/60" id="about">
      {/* Decorative number behind */}
      <div className="pointer-events-none absolute right-0 top-12 hidden select-none font-display text-[180px] leading-none text-usf-blue/[0.05] md:block">
        USF
      </div>

      <div className="container-usf relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
          {/* Editorial side */}
          <div className="lg:col-span-5">
            <span className="eyebrow">{about.eyebrow}</span>
            <h2 className="display-h2 mt-6 text-usf-blue">{about.heading}</h2>

            <div className="mt-8 border-l-[3px] border-usf-red pl-4 sm:mt-10 sm:pl-6">
              <p className="font-display text-[18px] leading-[1.45] text-usf-text sm:text-[20px] md:text-[22px]">
                {about.leadParagraph}
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 border-t border-usf-blue/10 pt-6 sm:grid-cols-2 sm:gap-8 sm:pt-8">
              {about.facts.map((fact) => (
                <div key={fact.label}>
                  <div className="text-[10.5px] font-semibold uppercase tracking-eyebrow text-usf-muted">
                    {fact.label}
                  </div>
                  {fact.display === 'large' ? (
                    <div className="mt-1 font-display text-[22px] text-usf-blue">{fact.value}</div>
                  ) : (
                    <div className="mt-1 text-[15px] text-usf-text/90">{fact.value}</div>
                  )}
                </div>
              ))}
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
              {about.paragraphs.map((para, i) => (
                <p
                  key={i}
                  className={i === about.paragraphs.length - 1 ? 'text-usf-muted' : undefined}
                >
                  {para}
                </p>
              ))}
            </motion.div>

            {/* Pull quote */}
            <motion.figure
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
              className="mt-10 border border-usf-blue/10 bg-white p-6 sm:mt-14 sm:p-8 md:p-10"
            >
              <svg
                aria-hidden="true"
                className="h-7 w-7 text-usf-red"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M9 7H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2v2a2 2 0 0 1-2 2H4v2h1a4 4 0 0 0 4-4V9a2 2 0 0 0 0-2zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2v2a2 2 0 0 1-2 2h-1v2h1a4 4 0 0 0 4-4V9a2 2 0 0 0 0-2z" />
              </svg>
              <blockquote className="mt-4 font-display text-[20px] leading-[1.45] text-usf-blue sm:mt-5 sm:text-[24px] md:text-[28px]">
                {about.pullQuote}
              </blockquote>
              <figcaption className="mt-7 flex items-center gap-4 border-t border-usf-blue/10 pt-5 text-[12.5px] uppercase tracking-[0.18em] text-usf-muted">
                <span className="h-px w-8 bg-usf-red" />
                {about.pullQuoteAttribution}
              </figcaption>
            </motion.figure>

            <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <a href="#services" className="btn-ghost">
                {about.ctaPrimary} <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#leadership" className="link-arrow">
                {about.ctaSecondary} <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
