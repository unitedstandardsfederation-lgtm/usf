import { motion } from 'framer-motion';
import {
  Scale,
  BadgeCheck,
  Network,
  GraduationCap,
  Cpu,
  Users2,
  Handshake,
  FlaskConical,
  ArrowUpRight,
} from 'lucide-react';

const SERVICES = [
  {
    no: '01',
    icon: Scale,
    title: 'Standards & Compliance',
    summary:
      'Frameworks, governance, and quality systems that align organisations with international expectations.',
    items: [
      'Standards Alignment',
      'Governance Frameworks',
      'Compliance Readiness',
      'Quality Systems',
      'Process Improvement',
      'Best Practices',
    ],
  },
  {
    no: '02',
    icon: BadgeCheck,
    title: 'Certification & Accreditation',
    summary:
      'Structured pathways for recognition, assessment, and accreditation across regulated sectors.',
    items: [
      'Certification Support',
      'Accreditation Programs',
      'Compliance Verification',
      'Quality Recognition',
      'Standards Assessment',
    ],
  },
  {
    no: '03',
    icon: Network,
    title: 'Membership & Global Networking',
    summary:
      'Strategic alliances, committee participation, and international visibility for member organisations.',
    items: [
      'Membership Programs',
      'Strategic Alliances',
      'International Networking',
      'Global Visibility',
      'Committee Participation',
    ],
  },
  {
    no: '04',
    icon: GraduationCap,
    title: 'Training & Education',
    summary:
      'Professional development, executive education, and academic exchange across the Federation network.',
    items: [
      'Professional Training',
      'Leadership Development',
      'Workshops',
      'Seminars',
      'Academic Collaboration',
      'Exchange Programs',
    ],
  },
  {
    no: '05',
    icon: Cpu,
    title: 'IT & Data Services',
    summary:
      'Digital transformation, intelligent automation, and data governance to modernise institutional operations.',
    items: [
      'Digital Transformation',
      'Enterprise IT Solutions',
      'Cloud Integration',
      'Business Intelligence',
      'Data Governance',
      'Artificial Intelligence',
      'Intelligent Automation',
      'Cybersecurity Awareness',
    ],
  },
  {
    no: '06',
    icon: Users2,
    title: 'Global Resourcing Services',
    summary:
      'Workforce development, talent networks, and international exchange programmes for member institutions.',
    items: [
      'Talent Networking',
      'Workforce Development',
      'International Staffing',
      'Executive Search Partnerships',
      'Professional Exchange Programs',
    ],
  },
  {
    no: '07',
    icon: Handshake,
    title: 'Strategic Partnerships & Collaboration',
    summary:
      'Cross-sector partnerships with governments, industries, and academic institutions worldwide.',
    items: [
      'Government Collaboration',
      'Industry Alliances',
      'Academic Partnerships',
      'Global Programs',
      'International Cooperation',
    ],
  },
  {
    no: '08',
    icon: FlaskConical,
    title: 'Research & Innovation',
    summary:
      'Research partnerships, technology transfer, and innovation programmes that shape future standards.',
    items: [
      'Research Partnerships',
      'Innovation Ecosystems',
      'Technology Transfer',
      'Knowledge Exchange',
      'Collaborative Research',
      'Future Technologies',
    ],
  },
];

export default function Services() {
  return (
    <section className="relative bg-usf-blue py-24 text-white md:py-32" id="services">
      <div
        className="absolute inset-0 -z-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />
      <div className="container-usf relative">
        <div className="grid items-end gap-10 border-b border-white/10 pb-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <span className="eyebrow-light">What We Do</span>
            <h2 className="display-h2 mt-6 text-white">
              Driving Standards, Innovation, Collaboration &{' '}
              <span className="text-white/70">Sustainable Development</span> Across Industries.
            </h2>
          </div>
          <div className="md:col-span-5">
            <p className="text-[15.5px] leading-[1.8] text-white/70">
              Eight core service lines codify how USF supports member organisations — from
              foundational standards work to advanced research and innovation. Each line operates
              under federation-wide governance and is delivered through dedicated working groups.
            </p>
            <a href="#contact" className="link-arrow mt-6 text-white hover:text-usf-red">
              Speak to the Secretariat <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, idx) => {
            const Icon = s.icon;
            return (
              <motion.article
                key={s.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: (idx % 4) * 0.06, ease: 'easeOut' }}
                className="group relative flex h-full flex-col bg-usf-blue p-8 transition-colors duration-500 hover:bg-usf-blue-dark"
              >
                <span className="absolute left-0 top-0 h-[2px] w-0 bg-usf-red transition-all duration-500 group-hover:w-full" />
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center border border-white/20 text-white transition-colors group-hover:border-usf-red group-hover:text-usf-red">
                    <Icon className="h-5 w-5" strokeWidth={1.6} />
                  </div>
                  <span className="text-[11px] font-semibold uppercase tracking-eyebrow text-white/45">
                    {s.no}
                  </span>
                </div>

                <h3 className="mt-7 font-display text-[20px] leading-[1.25] text-white">
                  {s.title}
                </h3>
                <p className="mt-3 text-[13.5px] leading-[1.7] text-white/65">{s.summary}</p>

                <ul className="mt-6 flex-1 space-y-2 border-t border-white/10 pt-5 text-[12.5px] text-white/80">
                  {s.items.map((it) => (
                    <li key={it} className="flex items-start gap-2.5 leading-[1.55]">
                      <span className="mt-[7px] inline-flex h-1 w-1 flex-none rounded-full bg-usf-red" />
                      {it}
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className="mt-8 inline-flex items-center gap-2 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-white/70 transition-colors hover:text-white"
                >
                  Engage Service <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
