import { motion } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';

export default function FinalCTA() {
  return (
    <section className="relative isolate overflow-hidden bg-usf-blue-dark py-24 text-white md:py-32" id="contact">
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
            <span className="eyebrow-light">Join the Federation</span>
            <h2 className="display-h2 mt-6 max-w-3xl text-white">
              Join a Growing Global Federation
            </h2>
            <p className="mt-7 max-w-2xl text-[16.5px] leading-[1.85] text-white/75">
              Become part of a trusted international network dedicated to standards, certification,
              innovation, education, workforce development, technology advancement, and sustainable
              growth.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a href="#membership" className="btn-red">
                Become a Member <ArrowRight className="h-4 w-4" />
              </a>
              <a href="mailto:secretariat@usfederation.org" className="btn-ghost-light">
                <Mail className="h-4 w-4" /> Contact Us
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
            <div className="border border-white/15 bg-white/[0.04] p-8 backdrop-blur-sm">
              <div className="text-[10.5px] font-semibold uppercase tracking-eyebrow text-white/55">
                Secretariat Office
              </div>
              <p className="mt-3 font-display text-[22px] leading-[1.3] text-white">
                The USF Secretariat is the first point of contact for prospective members and
                partners.
              </p>
              <dl className="mt-7 space-y-4 border-t border-white/10 pt-6 text-[14px]">
                <div className="flex items-baseline justify-between gap-6">
                  <dt className="text-white/55">Email</dt>
                  <dd className="text-right text-white/90">secretariat@usfederation.org</dd>
                </div>
                <div className="flex items-baseline justify-between gap-6">
                  <dt className="text-white/55">Phone</dt>
                  <dd className="text-right text-white/90">+1 (202) 555-USF1</dd>
                </div>
                <div className="flex items-baseline justify-between gap-6">
                  <dt className="text-white/55">Headquarters</dt>
                  <dd className="text-right text-white/90">Washington · United States</dd>
                </div>
                <div className="flex items-baseline justify-between gap-6">
                  <dt className="text-white/55">Hours</dt>
                  <dd className="text-right text-white/90">Mon–Fri · 09:00–18:00 ET</dd>
                </div>
              </dl>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
