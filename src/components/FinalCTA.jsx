import { motion } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';
import site from '../content/site.json';

const finalCta = site.finalCta;

export default function FinalCTA() {
  return (
    <section className="section-pad relative isolate overflow-hidden bg-usf-blue-dark text-white" id="contact">
      <div
        className="absolute inset-0 -z-10 opacity-[0.08]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />
      <div
        className="absolute -left-32 -bottom-32 -z-10 h-[460px] w-[460px] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            'radial-gradient(circle at center, rgba(214,20,27,0.35) 0%, rgba(214,20,27,0) 70%)',
        }}
      />
      <div
        className="absolute right-0 top-0 -z-10 h-full w-1/2 opacity-30"
        style={{
          background:
            'radial-gradient(ellipse at right, rgba(18,60,120,0.65) 0%, rgba(8,30,64,0) 70%)',
        }}
      />

      <div className="container-usf">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="lg:col-span-7"
          >
            <span className="eyebrow-light">{finalCta.eyebrow}</span>
            <h2 className="display-h2 mt-6 max-w-3xl text-white">{finalCta.heading}</h2>
            <p className="mt-7 max-w-2xl text-[16.5px] leading-[1.85] text-white/75">
              {finalCta.description}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <a href="#membership" className="btn-red">
                {finalCta.ctaPrimary} <ArrowRight className="h-4 w-4" />
              </a>
              <a href={`mailto:${site.contact.email}`} className="btn-ghost-light">
                <Mail className="h-4 w-4" /> {finalCta.ctaSecondary}
              </a>
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="lg:col-span-5"
          >
            <div className="border border-white/15 bg-white/[0.04] p-5 backdrop-blur-sm sm:p-6 md:p-8">
              <div className="text-[10.5px] font-semibold uppercase tracking-eyebrow text-white/55">
                {finalCta.secretariat.eyebrow}
              </div>
              <p className="mt-3 font-display text-[19px] leading-[1.3] text-white sm:text-[22px]">
                {finalCta.secretariat.lead}
              </p>
              <dl className="mt-6 space-y-4 border-t border-white/10 pt-5 text-[13px] sm:mt-7 sm:pt-6 sm:text-[14px]">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <dt className="text-white/55">{finalCta.secretariat.labels.email}</dt>
                  <dd className="break-all text-white/90 sm:text-right">{site.contact.email}</dd>
                </div>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <dt className="text-white/55">{finalCta.secretariat.labels.phone}</dt>
                  <dd className="text-white/90 sm:text-right">{site.contact.phone}</dd>
                </div>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <dt className="text-white/55">{finalCta.secretariat.labels.address}</dt>
                  <dd className="max-w-none whitespace-pre-line text-white/90 sm:max-w-[14rem] sm:text-right">
                    {site.contact.address}
                  </dd>
                </div>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <dt className="text-white/55">{finalCta.secretariat.labels.hours}</dt>
                  <dd className="text-white/90 sm:text-right">{site.contact.hours}</dd>
                </div>
              </dl>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
