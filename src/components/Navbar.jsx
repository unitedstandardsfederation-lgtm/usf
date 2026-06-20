import { useEffect, useState } from 'react';
import { Globe2, Mail, Menu, Phone, Search, X } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'About USF', href: '#about' },
  { label: 'Standards & Certification', href: '#services' },
  { label: 'Membership', href: '#membership' },
  { label: 'Global Consortium', href: '#consortium' },
  { label: 'Services', href: '#services' },
  { label: 'Training & Education', href: '#services' },
  { label: 'News & Publications', href: '#news' },
  { label: 'Contact', href: '#contact' },
];

function Logo({ className = '' }) {
  return (
    <a
      href="#home"
      className={`flex flex-none items-center ${className}`}
      aria-label="United Standards Federation — Home"
    >
      <img
        src="/usf-logo.png"
        alt="United Standards Federation"
        className="h-[52px] w-auto sm:h-14 md:h-[60px] lg:h-[64px]"
        loading="eager"
        decoding="async"
      />
    </a>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Utility bar */}
      <div
        className={`hidden border-b border-white/10 bg-usf-blue-dark text-[12px] text-white/75 lg:block ${
          scrolled ? 'h-0 overflow-hidden border-0' : 'h-10'
        } transition-[height] duration-300 ease-out`}
      >
        <div className="container-usf flex h-10 items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <Globe2 className="h-3.5 w-3.5 text-usf-red" />
              <span>An international federation · 25+ countries</span>
            </span>
            <span className="flex items-center gap-2">
              <Mail className="h-3.5 w-3.5 text-white/55" />
              <a href="mailto:secretariat@usfederation.org" className="hover:text-white">
                secretariat@usfederation.org
              </a>
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#news" className="hover:text-white">Newsroom</a>
            <a href="#contact" className="hover:text-white">Member Portal</a>
            <span className="flex items-center gap-2">
              <Phone className="h-3.5 w-3.5 text-white/55" />
              +1 (202) 555-USF1
            </span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header
        className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
          scrolled
            ? 'border-usf-blue/10 bg-white/95 backdrop-blur-md shadow-[0_1px_0_rgba(12,43,91,0.04)]'
            : 'border-transparent bg-white'
        }`}
        id="home"
      >
        {/* Brand row */}
        <div className="container-usf flex h-[92px] items-center justify-between gap-6">
          <Logo />

          <div className="hidden items-center gap-3 lg:flex">
            <button
              type="button"
              aria-label="Search"
              className="grid h-10 w-10 place-items-center border border-usf-blue/15 text-usf-blue transition-colors hover:border-usf-blue hover:bg-usf-blue hover:text-white"
            >
              <Search className="h-4 w-4" />
            </button>
            <a
              href="#news"
              className="hidden px-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-usf-text/75 hover:text-usf-blue xl:inline-flex"
            >
              Member Portal
            </a>
            <a href="#membership" className="btn-red">
              Become a Member
            </a>
          </div>

          <button
            type="button"
            className="grid h-10 w-10 place-items-center border border-usf-blue/15 text-usf-blue lg:hidden"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Full nav row */}
        <nav className="hidden border-t border-usf-blue/10 bg-white lg:block">
          <div className="container-usf flex items-center gap-2">
            <div className="flex flex-1 items-center overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="group relative flex-none whitespace-nowrap px-[10px] py-[14px] text-[11.5px] font-semibold uppercase tracking-[0.04em] text-usf-text/80 transition-colors hover:text-usf-blue xl:px-[13px] xl:text-[12px] xl:tracking-[0.06em] 2xl:px-4 2xl:text-[12.5px] 2xl:tracking-[0.08em]"
                >
                  {item.label}
                  <span className="absolute inset-x-[10px] -bottom-px block h-[2px] origin-left scale-x-0 bg-usf-red transition-transform duration-300 group-hover:scale-x-100 xl:inset-x-[13px] 2xl:inset-x-4" />
                </a>
              ))}
            </div>
            <a
              href="#contact"
              className="hidden flex-none whitespace-nowrap pl-4 text-[11px] font-semibold uppercase tracking-eyebrow text-usf-muted transition-colors hover:text-usf-blue 2xl:inline-flex"
            >
              Council Login
            </a>
          </div>
        </nav>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="border-t border-usf-blue/10 bg-white lg:hidden">
            <div className="container-usf flex flex-col py-4">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="border-b border-usf-blue/5 py-3 text-[14px] font-medium text-usf-text/90 last:border-0 hover:text-usf-blue"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#membership"
                className="btn-red mt-4 w-full justify-center"
                onClick={() => setMobileOpen(false)}
              >
                Become a Member
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

export { Logo };
