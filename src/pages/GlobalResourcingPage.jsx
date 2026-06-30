import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowUpRight,
  BadgeCheck,
  Briefcase,
  Building2,
  ChevronDown,
  Crown,
  FolderKanban,
  Globe2,
  GraduationCap,
  Handshake,
  Landmark,
  Layers,
  LineChart,
  Microscope,
  Scale,
  Shield,
  UserCheck,
  UserSearch,
  Users,
} from 'lucide-react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import WorldMap from '../components/WorldMap.jsx';
import site from '../content/site.json';
import { applySeo, buildServiceSchema } from '../utils/seo.js';

const page = site.globalResourcing;

const CORE_SERVICE_ICONS = {
  staffing: Users,
  recruiting: UserSearch,
  consulting: LineChart,
  'direct-hire': UserCheck,
};

const OFFER_ICONS = {
  'international-collaboration': Globe2,
  'executive-search': Crown,
  'project-resources': FolderKanban,
  'academia-partnerships': GraduationCap,
};

const CHOOSE_ICONS = {
  'international-network': Globe2,
  'quality-selection': BadgeCheck,
  'cross-industry': Layers,
  'global-standards': Scale,
  collaborative: Handshake,
  'long-term': Users,
};

const PARTNER_ICONS = {
  corporations: Building2,
  government: Landmark,
  healthcare: Shield,
  pharma: Microscope,
  technology: Briefcase,
  engineering: Layers,
  universities: GraduationCap,
  research: Microscope,
  consulting: LineChart,
  associations: Users,
  ngos: Handshake,
  development: Globe2,
};

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.55, ease: 'easeOut' },
};

function FaqItem({ question, answer, open, onToggle }) {
  return (
    <div className="border-b border-usf-blue/10">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-start justify-between gap-4 py-5 text-left transition-colors hover:text-usf-blue sm:gap-6 sm:py-6"
        aria-expanded={open}
      >
        <span className="font-display text-[16px] leading-[1.35] text-usf-blue sm:text-[18px] md:text-[20px]">
          {question}
        </span>
        <ChevronDown
          className={`mt-1 h-5 w-5 flex-none text-usf-red transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="overflow-hidden"
      >
        <p className="pb-6 text-[15.5px] leading-[1.8] text-usf-muted">{answer}</p>
      </motion.div>
    </div>
  );
}

export default function GlobalResourcingPage() {
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    applySeo({
      title: page.metaTitle,
      description: page.metaDescription,
      path: '/services/resourcing',
      jsonLd: [
        buildServiceSchema({
          title: page.metaTitle,
          description: page.metaDescription,
          path: '/services/resourcing',
          services: page.hero.servicePillars,
        }),
      ],
    });
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen overflow-x-clip bg-usf-white text-usf-text">
      <Navbar />

      {/* Hero */}
      <header className="relative overflow-hidden bg-usf-blue text-white">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-usf-blue/40 to-usf-blue" />

        <div className="absolute inset-0 flex items-center justify-center opacity-[0.35]">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="h-full w-full max-w-[1400px] px-6"
          >
            <WorldMap className="h-full w-full" variant="dark" showLines showPulses />
          </motion.div>
        </div>

        <div className="container-usf relative py-12 sm:py-16 md:py-24 lg:py-28">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-white/70 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {page.hero.backLabel}
          </Link>

          <div className="mt-12 max-w-3xl">
            <motion.span {...fadeUp} className="eyebrow-light">
              {page.hero.eyebrow}
            </motion.span>
            <motion.h1
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.08 }}
              className="display-h1 mt-6 text-white"
            >
              {page.hero.headline}
            </motion.h1>
            <motion.p
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.16 }}
              className="mt-7 text-[16.5px] leading-[1.85] text-white/78 md:text-[17.5px]"
            >
              {page.hero.description}
            </motion.p>
            <motion.ul
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.2 }}
              className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-3"
              aria-label="Core workforce services"
            >
              {page.hero.servicePillars.map((pillar) => (
                <li key={pillar}>
                  <a
                    href={`#${pillar.toLowerCase().replace(/\s+/g, '-')}`}
                    className="inline-flex border border-white/25 bg-white/10 px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:border-usf-red hover:bg-usf-red"
                  >
                    {pillar}
                  </a>
                </li>
              ))}
            </motion.ul>
            <motion.div
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.28 }}
              className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4"
            >
              <Link to="/#contact" className="btn-red">
                {page.hero.ctaPrimary}
              </Link>
              <Link to="/#membership" className="btn-ghost-light">
                {page.hero.ctaSecondary}
              </Link>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Core services — staffing, recruiting, consulting, direct hire */}
      <section className="section-pad border-b border-usf-blue/10 bg-white" id="core-services">
        <div className="container-usf">
          <div className="max-w-3xl">
            <span className="eyebrow">{page.coreServices.eyebrow}</span>
            <h2 className="display-h2 mt-6 text-usf-blue">{page.coreServices.heading}</h2>
            <p className="mt-6 text-[16.5px] leading-[1.85] text-usf-muted">{page.coreServices.description}</p>
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-2">
            {page.coreServices.items.map((service, i) => {
              const Icon = CORE_SERVICE_ICONS[service.id] || Briefcase;
              return (
                <motion.article
                  key={service.id}
                  id={service.id}
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: (i % 2) * 0.08 }}
                  className="scroll-mt-28 border border-usf-blue/10 bg-usf-gray/30 p-5 sm:scroll-mt-32 sm:p-6 md:p-8 lg:p-10"
                >
                  <div className="flex items-start gap-5">
                    <div className="flex h-14 w-14 flex-none items-center justify-center border border-usf-blue/15 bg-white text-usf-blue">
                      <Icon className="h-6 w-6" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="font-display text-[22px] leading-[1.15] text-usf-blue sm:text-[26px] md:text-[28px]">{service.title}</h3>
                      <p className="mt-1 text-[13px] font-semibold uppercase tracking-[0.1em] text-usf-red">
                        {service.tagline}
                      </p>
                    </div>
                  </div>

                  <p className="mt-6 text-[15.5px] leading-[1.8] text-usf-text/88">{service.summary}</p>

                  <div className="mt-8 border-t border-usf-blue/10 pt-7">
                    <h4 className="text-[11px] font-semibold uppercase tracking-eyebrow text-usf-muted">
                      {page.coreServices.includesLabel}
                    </h4>
                    <ul className="mt-4 space-y-2.5">
                      {service.includes.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-[14px] leading-[1.6] text-usf-text/85">
                          <span className="mt-[7px] inline-flex h-1.5 w-1.5 flex-none rounded-full bg-usf-red" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link to="/#contact" className="btn-red mt-8 inline-flex">
                    {service.ctaLabel}
                  </Link>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <div className="border-b border-usf-blue/10 bg-white">
        <div className="container-usf py-6 sm:py-8">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {page.trustStrip.items.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 text-[12.5px] font-semibold uppercase tracking-[0.08em] text-usf-blue/85"
              >
                <span className="inline-flex h-1.5 w-1.5 flex-none rounded-full bg-usf-red" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Why USF */}
      <section className="section-pad">
        <div className="container-usf">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-5">
              <span className="eyebrow">{page.whyUsf.eyebrow}</span>
              <h2 className="display-h2 mt-6 text-usf-blue">{page.whyUsf.heading}</h2>
            </div>
            <div className="space-y-6 lg:col-span-7">
              {page.whyUsf.paragraphs.map((para, i) => (
                <motion.p
                  key={i}
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: i * 0.08 }}
                  className="text-[16.5px] leading-[1.85] text-usf-text/85"
                >
                  {para}
                </motion.p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Extended capabilities */}
      <section className="section-pad bg-usf-gray/60">
        <div className="container-usf">
          <div className="max-w-2xl">
            <span className="eyebrow">{page.whatWeOffer.eyebrow}</span>
            <h2 className="display-h2 mt-6 text-usf-blue">{page.whatWeOffer.heading}</h2>
            <p className="mt-5 text-[15.5px] leading-[1.8] text-usf-muted">{page.whatWeOffer.description}</p>
          </div>

          <div className="mt-14 grid gap-px border border-usf-blue/10 bg-usf-blue/10 sm:grid-cols-2">
            {page.whatWeOffer.items.map((item, i) => {
              const Icon = OFFER_ICONS[item.id] || Briefcase;
              return (
                <motion.article
                  key={item.id}
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: (i % 3) * 0.06 }}
                  className="group relative bg-white p-6 transition-colors duration-500 hover:bg-usf-blue sm:p-7 md:p-9"
                >
                  <span className="absolute right-7 top-7 text-[11px] font-semibold uppercase tracking-eyebrow text-usf-muted/70 group-hover:text-white/45">
                    0{i + 1}
                  </span>
                  <div className="flex h-14 w-14 items-center justify-center border border-usf-blue/15 text-usf-blue transition-colors group-hover:border-usf-red group-hover:bg-usf-red group-hover:text-white">
                    <Icon className="h-6 w-6" strokeWidth={1.5} />
                  </div>
                  <h3 className="mt-7 font-display text-[22px] leading-[1.25] text-usf-blue group-hover:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-[14.5px] leading-[1.75] text-usf-muted group-hover:text-white/75">
                    {item.summary}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="section-pad">
        <div className="container-usf">
          <div className="text-center">
            <div className="flex justify-center">
              <span className="eyebrow">{page.industries.eyebrow}</span>
            </div>
            <h2 className="display-h2 mt-6 text-usf-blue">{page.industries.heading}</h2>
          </div>
          <ul className="mt-10 grid grid-cols-1 gap-3 sm:mt-14 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {page.industries.items.map((name, i) => (
              <motion.li
                key={name}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: (i % 8) * 0.03 }}
                className="border border-usf-blue/10 bg-white px-5 py-4 text-center text-[13.5px] font-medium leading-[1.4] text-usf-text/90 transition-colors hover:border-usf-blue/25 hover:bg-usf-gray/40"
              >
                {name}
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* Process timeline */}
      <section className="section-pad border-y border-usf-blue/10 bg-usf-blue text-white">
        <div className="container-usf">
          <div className="max-w-2xl">
            <span className="eyebrow-light">{page.process.eyebrow}</span>
            <h2 className="display-h2 mt-6 text-white">{page.process.heading}</h2>
          </div>

          <div className="resourcing-timeline mt-16">
            {page.process.steps.map((step, i) => (
              <motion.div
                key={step}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.05 }}
                className="resourcing-timeline-step"
              >
                <div className="resourcing-timeline-marker">
                  <span className="text-[11px] font-semibold text-white/50">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <p className="text-[14px] font-medium leading-[1.45] text-white/90 md:text-[15px]">{step}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose */}
      <section className="section-pad">
        <div className="container-usf">
          <div className="grid items-end gap-8 md:grid-cols-2">
            <div>
              <span className="eyebrow">{page.whyChoose.eyebrow}</span>
              <h2 className="display-h2 mt-6 text-usf-blue">{page.whyChoose.heading}</h2>
            </div>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {page.whyChoose.items.map((item, i) => {
              const Icon = CHOOSE_ICONS[item.id] || Globe2;
              return (
                <motion.div
                  key={item.id}
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: (i % 3) * 0.06 }}
                  className="card-institutional"
                >
                  <div className="flex h-12 w-12 items-center justify-center border border-usf-blue/15 text-usf-blue">
                    <Icon className="h-5 w-5" strokeWidth={1.6} />
                  </div>
                  <h3 className="mt-6 font-display text-[20px] leading-[1.3] text-usf-blue">{item.title}</h3>
                  <p className="mt-3 text-[14.5px] leading-[1.7] text-usf-muted">{item.body}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Global network */}
      <section className="section-pad bg-usf-gray/60">
        <div className="container-usf">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <span className="eyebrow">{page.globalNetwork.eyebrow}</span>
              <h2 className="display-h2 mt-6 text-usf-blue">{page.globalNetwork.heading}</h2>
              <p className="mt-6 text-[16.5px] leading-[1.85] text-usf-text/85">{page.globalNetwork.description}</p>
              <ul className="mt-8 grid grid-cols-1 gap-3 sm:mt-10 sm:grid-cols-2">
                {page.globalNetwork.regions.map((region) => (
                  <li
                    key={region}
                    className="flex items-center gap-2.5 border border-usf-blue/10 bg-white px-4 py-3 text-[13.5px] font-medium text-usf-blue"
                  >
                    <Globe2 className="h-3.5 w-3.5 flex-none text-usf-red" />
                    {region}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative border border-usf-blue/10 bg-white p-4 sm:p-6 md:p-10">
              <WorldMap className="w-full" variant="light" showLines showPulses={false} />
            </div>
          </div>
        </div>
      </section>

      {/* Who we work with */}
      <section className="section-pad">
        <div className="container-usf">
          <div className="text-center">
            <div className="flex justify-center">
              <span className="eyebrow">{page.whoWeWorkWith.eyebrow}</span>
            </div>
            <h2 className="display-h2 mt-6 text-usf-blue">{page.whoWeWorkWith.heading}</h2>
          </div>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {page.whoWeWorkWith.items.map((item, i) => {
              const Icon = PARTNER_ICONS[item.id] || Building2;
              return (
                <motion.div
                  key={item.id}
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: (i % 4) * 0.04 }}
                  className="group flex items-center gap-3 border border-usf-blue/10 bg-white p-4 transition-all hover:border-usf-blue/25 hover:shadow-card sm:gap-4 sm:p-6"
                >
                  <div className="flex h-11 w-11 flex-none items-center justify-center border border-usf-blue/15 text-usf-blue transition-colors group-hover:border-usf-red group-hover:text-usf-red">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <span className="text-[14.5px] font-medium leading-[1.4] text-usf-text">{item.name}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Service quick reference */}
      <section className="section-pad border-t border-usf-blue/10 bg-usf-blue text-white">
        <div className="container-usf">
          <div className="max-w-2xl">
            <span className="eyebrow-light">{page.featuredSolutions.eyebrow}</span>
            <h2 className="display-h2 mt-6 text-white">{page.featuredSolutions.heading}</h2>
          </div>
          <div className="mt-14 grid gap-px bg-white/10 sm:grid-cols-2">
            {page.featuredSolutions.items.map((item, i) => (
              <motion.a
                key={item.id}
                href={`#${item.id}`}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: (i % 2) * 0.06 }}
                  className="group bg-usf-blue p-5 transition-colors hover:bg-usf-blue-dark sm:p-6 md:p-8 lg:p-10"
              >
                <span className="text-[11px] font-semibold uppercase tracking-eyebrow text-white/40">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-4 font-display text-[24px] leading-[1.25] text-white">{item.title}</h3>
                <p className="mt-3 text-[14.5px] leading-[1.7] text-white/70">{item.summary}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/50 transition-colors group-hover:text-usf-red">
                  {page.featuredSolutions.learnMoreLabel} <ArrowUpRight className="h-3 w-3" />
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial */}
      <section className="section-pad">
        <div className="container-usf">
          <div className="mx-auto max-w-3xl text-center">
            <div className="flex justify-center">
              <span className="eyebrow">{page.editorial.eyebrow}</span>
            </div>
            <h2 className="display-h2 mt-6 text-usf-blue">{page.editorial.heading}</h2>
            <div className="mt-10 space-y-6">
              {page.editorial.paragraphs.map((para, i) => (
                <p key={i} className="text-[17px] leading-[1.85] text-usf-text/85">
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Client engagement */}
      <section className="section-pad border-y border-usf-blue/10 bg-usf-gray/60">
        <div className="container-usf text-center">
          <div className="flex justify-center">
            <span className="eyebrow">{page.clientEngagement.eyebrow}</span>
          </div>
          <h2 className="display-h2 mt-6 text-usf-blue">{page.clientEngagement.headline}</h2>
          <p className="mx-auto mt-6 max-w-2xl text-[16.5px] leading-[1.85] text-usf-muted">
            {page.clientEngagement.description}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4">
            <Link to="/#contact" className="btn-red">
              {page.clientEngagement.ctaPrimary}
            </Link>
            <Link to="/#membership" className="btn-ghost">
              {page.clientEngagement.ctaSecondary}
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-pad">
        <div className="container-usf">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-4">
              <span className="eyebrow">{page.faq.eyebrow}</span>
              <h2 className="display-h2 mt-6 text-usf-blue">{page.faq.heading}</h2>
            </div>
            <div className="lg:col-span-8">
              {page.faq.items.map((item, i) => (
                <FaqItem
                  key={item.question}
                  question={item.question}
                  answer={item.answer}
                  open={openFaq === i}
                  onToggle={() => setOpenFaq(openFaq === i ? -1 : i)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-pad relative overflow-hidden bg-usf-blue-dark text-white">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div className="container-usf relative text-center">
          <h2 className="display-h2 mx-auto max-w-3xl text-white">{page.finalCta.headline}</h2>
          <p className="mx-auto mt-6 max-w-2xl text-[16.5px] leading-[1.85] text-white/72">
            {page.finalCta.description}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4">
            <Link to="/#contact" className="btn-red">
              {page.finalCta.ctaPrimary}
            </Link>
            <Link to="/#membership" className="btn-ghost-light">
              {page.finalCta.ctaSecondary}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
