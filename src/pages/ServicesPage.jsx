import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BarChart3,
  ChevronDown,
  Cpu,
  Database,
  Globe2,
  Handshake,
  Layers,
  LayoutTemplate,
  PenTool,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Users,
} from 'lucide-react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import site from '../content/site.json';
import { applySeo, buildServiceSchema } from '../utils/seo.js';

const page = site.servicesPage;

const STRIP_ICONS = {
  web: LayoutTemplate,
  app: Smartphone,
  ui: PenTool,
  erp: Layers,
  ai: Sparkles,
  data: BarChart3,
};

const SERVICE_ICONS = {
  'web-development': LayoutTemplate,
  'app-development': Smartphone,
  'ui-ux-design': PenTool,
  'erp-crm': Layers,
  'ai-automation': Sparkles,
  'data-science': BarChart3,
};

const WHY_ICONS = {
  global: Globe2,
  disciplines: Layers,
  security: ShieldCheck,
  partners: Handshake,
};

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.55, ease: 'easeOut' },
};

function ServiceVisual({ service }) {
  const Icon = SERVICE_ICONS[service.id] || LayoutTemplate;
  return (
    <div
      className="relative flex min-h-[280px] w-full items-center justify-center overflow-hidden border border-usf-blue/10 bg-usf-blue sm:min-h-[320px] lg:min-h-full lg:h-full lg:self-stretch"
    >
      <div
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(circle at 30% 30%, rgba(214,20,27,0.35), transparent 55%), radial-gradient(circle at 70% 70%, rgba(253,253,253,0.12), transparent 50%)',
        }}
      />
      <div className="relative text-center text-white">
        <div className="mx-auto flex h-16 w-16 items-center justify-center border border-white/20 bg-white/5">
          <Icon className="h-7 w-7 text-usf-red" strokeWidth={1.5} />
        </div>
        <div className="mt-6 font-display text-[72px] font-light leading-none tracking-[-0.04em] text-white/20 sm:text-[88px]">
          {service.no}
        </div>
        <div className="mx-auto mt-4 h-[3px] w-10 bg-usf-red" />
        <p className="mt-4 text-[11px] font-semibold uppercase tracking-eyebrow text-white/55">
          {service.eyebrow}
        </p>
      </div>
    </div>
  );
}

function ServiceBlock({ service, index }) {
  const reversed = index % 2 === 1;
  const ctaIsHash = service.ctaHref.startsWith('/#') || service.ctaHref.startsWith('#');

  return (
    <section
      id={service.id}
      className={`section-pad scroll-mt-28 border-b border-usf-blue/10 sm:scroll-mt-32 ${
        index % 2 === 0 ? 'bg-white' : 'bg-usf-gray/50'
      }`}
    >
      <div className="container-usf">
        <div className="grid items-stretch gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div
            {...fadeUp}
            className={`flex flex-col ${reversed ? 'lg:order-2' : 'lg:order-1'}`}
          >
            <span className="eyebrow">
              {service.no} · {service.eyebrow}
            </span>
            <h2 className="display-h2 mt-5 text-usf-blue lg:mt-6">{service.headline}</h2>
            <p className="mt-4 text-[15.5px] leading-[1.75] text-usf-text/88 sm:text-[16px]">
              {service.body}
            </p>

            <div className="mt-6 border-t border-usf-blue/10 pt-5">
              <h3 className="text-[11px] font-semibold uppercase tracking-eyebrow text-usf-muted">
                {page.featuresLabel}
              </h3>
              <ul className="mt-3 space-y-2">
                {service.features.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-[13.5px] leading-[1.55] text-usf-text/85 sm:text-[14px]"
                  >
                    <span className="mt-[6px] inline-flex h-1.5 w-1.5 flex-none rounded-full bg-usf-red" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 border-t border-usf-blue/10 pt-5">
              <h3 className="text-[11px] font-semibold uppercase tracking-eyebrow text-usf-muted">
                {page.audienceLabel}
              </h3>
              <p className="mt-2 text-[14px] leading-[1.65] text-usf-muted">{service.audience}</p>
            </div>

            {ctaIsHash ? (
              <a href={service.ctaHref} className="btn-red mt-6 inline-flex sm:mt-8">
                {service.cta} <ArrowRight className="h-4 w-4" />
              </a>
            ) : (
              <Link to={service.ctaHref} className="btn-red mt-6 inline-flex sm:mt-8">
                {service.cta} <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.08 }}
            className={`h-full ${reversed ? 'lg:order-1' : 'lg:order-2'}`}
          >
            <ServiceVisual service={service} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const HERO_HUB = { x: 150, y: 215, Icon: Cpu };

const HERO_INPUTS = [
  { id: 'data', x: 44, y: 150, Icon: Database },
  { id: 'teams', x: 44, y: 280, Icon: Users },
];

const HERO_OUTPUTS = [
  { id: 'web', x: 372, y: 56, Icon: LayoutTemplate },
  { id: 'app', x: 372, y: 120, Icon: Smartphone },
  { id: 'uiux', x: 372, y: 184, Icon: PenTool },
  { id: 'erp', x: 372, y: 248, Icon: Layers },
  { id: 'ai', x: 372, y: 312, Icon: Sparkles },
  { id: 'data-out', x: 372, y: 376, Icon: BarChart3 },
];

function heroEdgePath(a, b) {
  const mx = (a.x + b.x) / 2;
  return `M ${a.x} ${a.y} C ${mx} ${a.y} ${mx} ${b.y} ${b.x} ${b.y}`;
}

const HERO_EDGES = [
  ...HERO_INPUTS.map((node) => ({ id: `in-${node.id}`, from: node, to: HERO_HUB })),
  ...HERO_OUTPUTS.map((node) => ({ id: `out-${node.id}`, from: HERO_HUB, to: node })),
];

function HeroNode({ x, y, r, Icon, accent }) {
  const iconSize = r >= 24 ? 26 : 18;
  return (
    <g>
      <circle
        cx={x}
        cy={y}
        r={r + 6}
        fill="none"
        stroke={accent ? 'rgba(214,20,27,0.45)' : 'rgba(255,255,255,0.16)'}
        strokeWidth="1"
      >
        <animate
          attributeName="r"
          values={`${r + 4};${r + 12};${r + 4}`}
          dur="3.2s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.6;0;0.6"
          dur="3.2s"
          repeatCount="indefinite"
        />
      </circle>
      <circle
        cx={x}
        cy={y}
        r={r}
        fill={accent ? 'rgba(214,20,27,0.16)' : 'rgba(255,255,255,0.06)'}
        stroke={accent ? 'rgba(214,20,27,0.8)' : 'rgba(255,255,255,0.28)'}
        strokeWidth="1.2"
      />
      <foreignObject x={x - iconSize / 2} y={y - iconSize / 2} width={iconSize} height={iconSize}>
        <div className="flex h-full w-full items-center justify-center">
          <Icon
            className={accent ? 'text-white' : 'text-white/75'}
            style={{ width: iconSize, height: iconSize }}
            strokeWidth={1.6}
          />
        </div>
      </foreignObject>
    </g>
  );
}

function TechHeroVisual() {
  return (
    <div className="pointer-events-none relative hidden opacity-85 lg:block" aria-hidden="true">
      <div className="relative mx-auto w-[440px] max-w-full overflow-hidden rounded-xl border border-white/12 bg-white/[0.04] shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)] backdrop-blur-sm">
        <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.05] px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <span className="ml-3 h-2 w-32 rounded-full bg-white/10" />
        </div>

        <svg viewBox="0 0 430 430" className="relative h-auto w-full p-5" fill="none">
          {HERO_EDGES.map((edge) => (
              <path
                key={edge.id}
                id={`hero-edge-${edge.id}`}
                d={heroEdgePath(edge.from, edge.to)}
                fill="none"
                stroke="rgba(255,255,255,0.18)"
                strokeWidth="1.4"
              />
            ))}

            {HERO_EDGES.map((edge, index) => (
              <circle key={`dot-${edge.id}`} r="3.2" fill="#D6141B">
                <animateMotion
                  dur="2.6s"
                  begin={`${index * 0.32}s`}
                  repeatCount="indefinite"
                  keyPoints="0;1"
                  keyTimes="0;1"
                  calcMode="linear"
                >
                  <mpath href={`#hero-edge-${edge.id}`} />
                </animateMotion>
                <animate
                  attributeName="opacity"
                  values="0;1;1;0"
                  keyTimes="0;0.1;0.9;1"
                  dur="2.6s"
                  begin={`${index * 0.32}s`}
                  repeatCount="indefinite"
                />
              </circle>
            ))}

            {HERO_INPUTS.map((node) => (
              <HeroNode key={node.id} x={node.x} y={node.y} r={17} Icon={node.Icon} />
            ))}
          <HeroNode x={HERO_HUB.x} y={HERO_HUB.y} r={28} Icon={HERO_HUB.Icon} accent />
          {HERO_OUTPUTS.map((node) => (
            <HeroNode key={node.id} x={node.x} y={node.y} r={17} Icon={node.Icon} />
          ))}
        </svg>
      </div>
    </div>
  );
}

function TechHeroVisualMobile() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden lg:hidden" aria-hidden="true">
      <svg
        viewBox="0 0 430 430"
        className="absolute right-[-140px] top-[-36px] h-[360px] w-[360px] opacity-[0.18]"
        fill="none"
      >
        {HERO_EDGES.map((edge) => (
          <path
            key={`m-${edge.id}`}
            id={`hero-edge-mobile-${edge.id}`}
            d={heroEdgePath(edge.from, edge.to)}
            fill="none"
            stroke="rgba(255,255,255,0.24)"
            strokeWidth="1.5"
          />
        ))}

        {HERO_EDGES.map((edge, index) => (
          <circle key={`m-dot-${edge.id}`} r="2.6" fill="#D6141B">
            <animateMotion
              dur="3s"
              begin={`${index * 0.36}s`}
              repeatCount="indefinite"
              keyPoints="0;1"
              keyTimes="0;1"
              calcMode="linear"
            >
              <mpath href={`#hero-edge-mobile-${edge.id}`} />
            </animateMotion>
            <animate
              attributeName="opacity"
              values="0;1;1;0"
              keyTimes="0;0.1;0.9;1"
              dur="3s"
              begin={`${index * 0.36}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}

        {HERO_INPUTS.map((node) => (
          <HeroNode key={`m-${node.id}`} x={node.x} y={node.y} r={16} Icon={node.Icon} />
        ))}
        <HeroNode x={HERO_HUB.x} y={HERO_HUB.y} r={24} Icon={HERO_HUB.Icon} accent />
        {HERO_OUTPUTS.map((node) => (
          <HeroNode key={`m-out-${node.id}`} x={node.x} y={node.y} r={16} Icon={node.Icon} />
        ))}
      </svg>
    </div>
  );
}

export default function ServicesPage() {
  useEffect(() => {
    applySeo({
      title: page.metaTitle,
      description: page.metaDescription,
      path: '/services',
      jsonLd: [
        buildServiceSchema({
          title: page.metaTitle,
          description: page.metaDescription,
          path: '/services',
          services: page.services.map((service) => service.eyebrow),
        }),
      ],
    });
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen overflow-x-clip bg-usf-white text-usf-text">
      <Navbar />

      {/* Hero */}
      <header className="relative overflow-hidden bg-usf-blue-dark text-white">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 18% 0%, rgba(18, 60, 120, 0.55) 0%, rgba(8, 30, 64, 0.92) 50%, #04122A 100%)',
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-usf-blue-dark to-transparent" />

        <div className="container-usf relative grid items-center gap-12 py-12 sm:py-16 md:py-24 lg:grid-cols-[minmax(0,1fr)_430px] lg:py-28">
          <div className="relative isolate">
            <TechHeroVisualMobile />
            <motion.span {...fadeUp} className="eyebrow-light">
              {page.hero.eyebrow}
            </motion.span>
            <motion.h1
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.08 }}
              className="display-h1 mt-6 max-w-4xl text-white"
            >
              {page.hero.headline}
            </motion.h1>
            <motion.p
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.14 }}
              className="mt-7 max-w-3xl text-[15.5px] leading-[1.85] text-white/84 sm:text-[16.5px] md:text-[17px]"
            >
              {page.hero.description}
            </motion.p>
            <motion.div
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.22 }}
              className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4"
            >
              <Link to={page.hero.ctaPrimaryHref} className="btn-red">
                {page.hero.ctaPrimary} <ArrowRight className="h-4 w-4" />
              </Link>
              <a href={page.hero.ctaSecondaryHref} className="btn-ghost-light">
                {page.hero.ctaSecondary} <ChevronDown className="h-4 w-4" />
              </a>
            </motion.div>
          </div>

          <TechHeroVisual />
        </div>
      </header>

      {/* Overview strip */}
      <div className="border-b border-usf-blue/10 bg-white">
        <div className="container-usf py-8 sm:py-10">
          <div className="grid grid-cols-2 gap-px border border-usf-blue/10 bg-usf-blue/10 sm:grid-cols-3 lg:grid-cols-6">
            {page.overviewStrip.items.map((item) => {
              const Icon = STRIP_ICONS[item.id] || LayoutTemplate;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  className="group flex flex-col items-center bg-white px-4 py-6 text-center transition-colors hover:bg-usf-gray/40 sm:px-6 sm:py-8"
                >
                  <div className="flex h-12 w-12 items-center justify-center border border-usf-blue/15 text-usf-blue transition-colors group-hover:border-usf-red group-hover:text-usf-red">
                    <Icon className="h-5 w-5" strokeWidth={1.6} />
                  </div>
                  <span className="mt-4 text-[12.5px] font-semibold uppercase tracking-[0.08em] text-usf-blue sm:text-[13px]">
                    {item.label}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Service sections */}
      {page.services.map((service, index) => (
        <ServiceBlock key={service.id} service={service} index={index} />
      ))}

      {/* Why USF — pillars-style strip */}
      <section className="relative overflow-hidden bg-usf-blue-dark py-12 text-white md:py-16">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
          }}
        />
        <div className="container-usf relative">
          <h2 className="display-h3 text-center text-white">{page.whyUsf.heading}</h2>
          <div className="mt-10 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {page.whyUsf.items.map((item, i) => {
              const Icon = WHY_ICONS[item.id] || Globe2;
              return (
                <motion.div
                  key={item.id}
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: i * 0.06 }}
                  className="bg-usf-blue-dark p-6 sm:p-7"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-4 w-4 flex-none text-usf-red" strokeWidth={1.6} />
                    <span className="text-[12px] font-semibold uppercase tracking-[0.1em] text-white/90">
                      {item.stat}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-[19px] leading-[1.25] text-white sm:text-[20px]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[13.5px] leading-[1.65] text-white/65">{item.body}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Industry coverage */}
      <section className="section-pad bg-white">
        <div className="container-usf">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="display-h2 text-usf-blue">{page.industries.heading}</h2>
            <p className="mt-6 text-[15.5px] leading-[1.85] text-usf-muted sm:text-[16px]">
              {page.industries.description}
            </p>
          </div>
          <ul className="mt-10 flex flex-wrap justify-center gap-3 sm:mt-12">
            {page.industries.items.map((name, i) => (
              <motion.li
                key={name}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: (i % 6) * 0.03 }}
                className="border border-usf-blue/15 bg-white px-4 py-2.5 text-[13px] font-medium text-usf-text/90 transition-colors hover:border-usf-blue/30 hover:bg-usf-gray/40 sm:px-5 sm:py-3 sm:text-[13.5px]"
              >
                {name}
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* Process */}
      <section className="section-pad border-y border-usf-blue/10 bg-usf-gray/50">
        <div className="container-usf">
          <div className="max-w-2xl">
            <span className="eyebrow">Our Process</span>
            <h2 className="display-h2 mt-6 text-usf-blue">{page.process.heading}</h2>
          </div>

          <div className="process-timeline mt-12 lg:mt-16">
            {page.process.steps.map((step, i) => (
              <motion.div
                key={step.id}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.06 }}
                className="process-timeline-step"
              >
                <div className="process-timeline-marker">{step.no}</div>
                <h3 className="font-display text-[19px] leading-[1.25] text-usf-blue sm:text-[21px]">
                  {step.title}
                </h3>
                <p className="mt-3 text-[14.5px] leading-[1.75] text-usf-muted">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="section-pad relative overflow-hidden bg-usf-blue-dark text-white">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div
          className="absolute -left-32 -bottom-32 h-[420px] w-[420px] rounded-full opacity-30 blur-3xl"
          style={{
            background:
              'radial-gradient(circle at center, rgba(214,20,27,0.35) 0%, rgba(214,20,27,0) 70%)',
          }}
        />
        <div className="container-usf relative text-center">
          <h2 className="display-h2 mx-auto max-w-3xl text-white">{page.finalCta.heading}</h2>
          <p className="mx-auto mt-6 max-w-2xl text-[15.5px] leading-[1.85] text-white/72 sm:text-[16.5px]">
            {page.finalCta.description}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4">
            <Link to={page.finalCta.ctaPrimaryHref} className="btn-red">
              {page.finalCta.ctaPrimary} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to={page.finalCta.ctaSecondaryHref} className="btn-ghost-light">
              {page.finalCta.ctaSecondary}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
