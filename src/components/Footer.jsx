import { Facebook, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import site from '../content/site.json';
import { usfLogo } from '../config/brand.js';

const FootLogoX = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.244 2H21.5l-7.5 8.57L22.5 22H15.7l-5.36-6.93L4.2 22H.94l8.05-9.2L.5 2h6.94l4.85 6.36L18.24 2zm-1.18 18h1.92L7.07 4H5.07l11.99 16z" />
  </svg>
);

const COLUMNS = site.footer.columns;

export default function Footer() {
  return (
    <footer className="relative bg-usf-blue-dark text-white">
      {/* Accent line */}
      <div className="h-[3px] w-full bg-usf-red" />

      {/* Top band — white strip above main footer */}
      <div className="border-b border-usf-blue/10 bg-white">
        <div className="container-usf flex flex-col items-start gap-5 py-5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-6 sm:py-7">
          <a href="/" className="flex items-center" aria-label={`${site.site.shortName} Home`}>
            <span className="inline-flex items-center bg-white px-4 py-2.5 sm:px-5 sm:py-3">
              <img
                src={usfLogo}
                alt={site.site.name}
                className="h-10 w-auto sm:h-12 md:h-14"
                loading="lazy"
                decoding="async"
              />
            </span>
          </a>

          <div className="flex w-full flex-col gap-3 text-[12.5px] text-usf-text sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-3 sm:text-[13px]">
            <span className="flex items-start gap-2 sm:items-center">
              <MapPin className="mt-0.5 h-3.5 w-3.5 flex-none text-usf-red sm:mt-0" /> {site.contact.address}
            </span>
            <span className="flex items-center gap-2 break-all">
              <Mail className="h-3.5 w-3.5 flex-none text-usf-red" /> {site.contact.email}
            </span>
            <span className="flex items-center gap-2">
              <Phone className="h-3.5 w-3.5 flex-none text-usf-red" /> {site.contact.phone}
            </span>
          </div>
        </div>
      </div>

      {/* Main grid */}
      <div className="container-usf grid gap-8 py-10 sm:gap-10 sm:py-12 md:grid-cols-2 md:py-16 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <h3 className="font-display text-[20px] leading-[1.3] text-white">
            {site.footer.tagline}
          </h3>
          <p className="mt-4 text-[13.5px] leading-[1.75] text-white/65">
            {site.footer.description}
          </p>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-6 flex flex-col border border-white/15 bg-white/[0.04] sm:mt-7 sm:flex-row"
          >
            <input
              type="email"
              required
              placeholder={site.footer.newsletterPlaceholder}
              className="w-full bg-transparent px-4 py-3 text-[13px] text-white placeholder:text-white/40 focus:outline-none sm:text-[13.5px]"
            />
            <button
              type="submit"
              className="bg-usf-red px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-usf-red-dark sm:py-0 sm:text-[12px]"
            >
              {site.footer.newsletterButton}
            </button>
          </form>
          <p className="mt-3 text-[11.5px] leading-[1.6] text-white/45">
            {site.footer.newsletterNote}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 sm:gap-x-8 lg:col-span-9 lg:grid-cols-6">
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
            © {new Date().getFullYear()} {site.site.copyright}
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[12px] text-white/55">
            {site.footer.legalLinks.map((l) => (
              <a key={l} href="#" className="hover:text-white">{l}</a>
            ))}
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
