import { Facebook, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

const FootLogoX = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.244 2H21.5l-7.5 8.57L22.5 22H15.7l-5.36-6.93L4.2 22H.94l8.05-9.2L.5 2h6.94l4.85 6.36L18.24 2zm-1.18 18h1.92L7.07 4H5.07l11.99 16z" />
  </svg>
);

const COLUMNS = [
  {
    title: 'About USF',
    links: ['The Federation', 'Charter', 'Council', 'Governance', 'Annual Report'],
  },
  {
    title: 'Standards & Certification',
    links: ['Standards Programs', 'Certification', 'Accreditation', 'Quality Systems', 'Compliance'],
  },
  {
    title: 'Membership',
    links: ['Institutional', 'Affiliate', 'Strategic Partner', 'Benefits', 'Apply Now'],
  },
  {
    title: 'Services',
    links: ['Standards & Compliance', 'IT & Data Services', 'Global Resourcing', 'Research & Innovation', 'Training & Education'],
  },
  {
    title: 'Global Consortium',
    links: ['Governments', 'Industries', 'Academia', 'NGOs', 'Development Partners'],
  },
  {
    title: 'News & Contact',
    links: ['News & Publications', 'Insights', 'Events', 'Press Room', 'Contact'],
  },
];

export default function Footer() {
  return (
    <footer className="relative bg-usf-blue-dark text-white">
      {/* Accent line */}
      <div className="h-[3px] w-full bg-usf-red" />

      {/* Top band */}
      <div className="border-b border-white/10">
        <div className="container-usf flex flex-wrap items-center justify-between gap-6 py-7">
          <a href="#home" className="flex items-center" aria-label="USF Home">
            <span className="inline-flex items-center bg-white px-5 py-3">
              <img
                src="/usf-logo.png"
                alt="United Standards Federation"
                className="h-12 w-auto sm:h-14"
                loading="lazy"
                decoding="async"
              />
            </span>
          </a>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-[13px] text-white/70">
            <span className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-usf-red" /> Washington, United States
            </span>
            <span className="flex items-center gap-2">
              <Mail className="h-3.5 w-3.5 text-usf-red" /> secretariat@usfederation.org
            </span>
            <span className="flex items-center gap-2">
              <Phone className="h-3.5 w-3.5 text-usf-red" /> +1 (202) 555-USF1
            </span>
          </div>
        </div>
      </div>

      {/* Main grid */}
      <div className="container-usf grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <h3 className="font-display text-[20px] leading-[1.3] text-white">
            A global federation for standards, certification, and collaboration.
          </h3>
          <p className="mt-4 text-[13.5px] leading-[1.75] text-white/65">
            USF convenes governments, industries, academic institutions, and civil society to
            advance international standards, certification, and sustainable development.
          </p>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-7 flex border border-white/15 bg-white/[0.04]"
          >
            <input
              type="email"
              required
              placeholder="Your work email"
              className="w-full bg-transparent px-4 py-3 text-[13.5px] text-white placeholder:text-white/40 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-usf-red px-5 text-[12px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-usf-red-dark"
            >
              Subscribe
            </button>
          </form>
          <p className="mt-3 text-[11.5px] leading-[1.6] text-white/45">
            Receive Federation briefings, programme updates, and member announcements.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:col-span-9 lg:grid-cols-6">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-[11px] font-semibold uppercase tracking-eyebrow text-white/55">
                {col.title}
              </h4>
              <ul className="mt-5 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-[13px] text-white/80 transition-colors hover:text-white"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom strip */}
      <div className="border-t border-white/10">
        <div className="container-usf flex flex-col items-start justify-between gap-4 py-6 md:flex-row md:items-center">
          <div className="text-[12.5px] text-white/55">
            © {new Date().getFullYear()} United Standards Federation (USF). All Rights Reserved.
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[12px] text-white/55">
            <a href="#" className="hover:text-white">Privacy Notice</a>
            <a href="#" className="hover:text-white">Terms of Use</a>
            <a href="#" className="hover:text-white">Code of Conduct</a>
            <a href="#" className="hover:text-white">Accessibility</a>
          </div>
          <div className="flex items-center gap-2">
            {[
              { Icon: Linkedin, label: 'LinkedIn' },
              { Icon: Facebook, label: 'Facebook' },
              { Icon: FootLogoX, label: 'X' },
            ].map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="grid h-9 w-9 place-items-center border border-white/15 text-white/75 transition-colors hover:border-usf-red hover:bg-usf-red hover:text-white"
              >
                <Icon className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
