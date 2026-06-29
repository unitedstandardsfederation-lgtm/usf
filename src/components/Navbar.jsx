import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { ChevronDown, Globe2, Mail, Menu, Phone, X } from 'lucide-react';
import site from '../content/site.json';
import { usfLogo } from '../config/brand.js';

const NAV_ITEMS = site.nav.items;
const SERVICES_MENU = site.nav.menus?.services;

const SERVICES_DROPDOWN_ITEMS = site.services.items.map((s) => ({
  label: s.title,
  href: s.id === 'it' ? '/services' : s.href,
}));

const NAV_LINK_CLASS =
  'group relative flex-none whitespace-nowrap px-2 py-[14px] text-[11px] font-semibold uppercase tracking-[0.03em] text-usf-text/80 transition-colors hover:text-usf-blue lg:px-[8px] xl:px-[10px] xl:text-[11.5px] xl:tracking-[0.04em] 2xl:px-3 2xl:text-[12px] 2xl:tracking-[0.06em]';

function Logo({ className = '' }) {
  return (
    <a
      href="/"
      className={`flex flex-none items-center ${className}`}
      aria-label={`${site.site.name} — Home`}
    >
      <span className="inline-flex items-center bg-white px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3">
        <img
          src={usfLogo}
          alt={site.site.name}
          className="h-10 w-auto sm:h-12 md:h-14 lg:h-[60px] xl:h-[64px]"
          loading="eager"
          decoding="async"
        />
      </span>
    </a>
  );
}

function MenuLink({ href, className, children, onClick }) {
  if (href.startsWith('/#')) {
    return (
      <a href={href} className={className} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <Link to={href} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

function ServicesDropdownPanel({ open, anchorRect, onClose, onMouseEnter, onMouseLeave }) {
  if (!open || !anchorRect) return null;

  return createPortal(
    <div
      className="nav-services-menu"
      style={{
        position: 'fixed',
        top: anchorRect.bottom,
        left: anchorRect.left,
        minWidth: Math.max(anchorRect.width, 300),
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <ul role="menu">
        {SERVICES_DROPDOWN_ITEMS.map((entry) => (
          <li key={entry.label} role="none">
            <MenuLink
              href={entry.href}
              className="nav-services-menu-link"
              onClick={onClose}
            >
              {entry.label}
            </MenuLink>
          </li>
        ))}
      </ul>
    </div>,
    document.body,
  );
}

function ServicesNavItem({ item }) {
  const [open, setOpen] = useState(false);
  const [anchorRect, setAnchorRect] = useState(null);
  const triggerRef = useRef(null);
  const closeTimer = useRef(null);

  const updateRect = () => {
    if (triggerRef.current) {
      setAnchorRect(triggerRef.current.getBoundingClientRect());
    }
  };

  const openMenu = () => {
    clearTimeout(closeTimer.current);
    updateRect();
    setOpen(true);
  };

  const closeMenu = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  const cancelClose = () => {
    clearTimeout(closeTimer.current);
  };

  useEffect(() => {
    if (!open) return undefined;

    const onScrollOrResize = () => updateRect();
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const onPointerDown = (e) => {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(e.target) &&
        !e.target.closest('.nav-services-menu')
      ) {
        setOpen(false);
      }
    };

    updateRect();
    window.addEventListener('scroll', onScrollOrResize, true);
    window.addEventListener('resize', onScrollOrResize);
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', onPointerDown);

    return () => {
      window.removeEventListener('scroll', onScrollOrResize, true);
      window.removeEventListener('resize', onScrollOrResize);
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', onPointerDown);
    };
  }, [open]);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  if (!SERVICES_DROPDOWN_ITEMS.length) {
    return (
      <a href={item.href} className={NAV_LINK_CLASS}>
        {item.label}
      </a>
    );
  }

  const triggerClass = open
    ? 'bg-usf-blue text-white hover:text-white'
    : 'text-usf-text/80 hover:bg-usf-gray/40 hover:text-usf-blue';

  return (
    <>
      <div
        ref={triggerRef}
        className="relative flex flex-none items-center"
        onMouseEnter={openMenu}
        onMouseLeave={closeMenu}
      >
        <div className={`flex items-center transition-colors ${triggerClass}`}>
          <a
            href={item.href}
            className={`px-2 py-[14px] text-[11px] font-semibold uppercase tracking-[0.03em] lg:px-[8px] xl:px-[10px] xl:text-[11.5px] 2xl:px-3 2xl:text-[12px] ${
              open ? 'text-white' : ''
            }`}
          >
            {item.label}
          </a>
          <button
            type="button"
            className={`inline-flex items-center self-stretch py-[14px] pr-2 pl-0.5 lg:pr-[8px] xl:pr-[10px] 2xl:pr-3 ${
              open ? 'text-white' : 'text-usf-text/70'
            }`}
            aria-expanded={open}
            aria-haspopup="menu"
            aria-label={SERVICES_MENU?.buttonAriaLabel || 'Show all services'}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (open) setOpen(false);
              else openMenu();
            }}
          >
            <ChevronDown
              className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
              strokeWidth={2.5}
            />
          </button>
        </div>
      </div>

      <ServicesDropdownPanel
        open={open}
        anchorRect={anchorRect}
        onClose={() => setOpen(false)}
        onMouseEnter={cancelClose}
        onMouseLeave={closeMenu}
      />
    </>
  );
}

function ServicesMobileSection({ onNavigate }) {
  const [open, setOpen] = useState(false);

  const close = () => {
    setOpen(false);
    onNavigate?.();
  };

  return (
    <div className="border-b border-usf-blue/5 pb-2">
      <div className="flex items-center gap-1">
        <a
          href="/#services"
          className="flex-1 py-3 text-[14px] font-medium text-usf-text/90 hover:text-usf-blue"
          onClick={close}
        >
          Services
        </a>
        <button
          type="button"
          className="inline-flex items-center gap-1 py-3 pr-1 text-usf-text/70"
          aria-expanded={open}
          aria-label={SERVICES_MENU?.buttonAriaLabel || 'Show all services'}
          onClick={() => setOpen((v) => !v)}
        >
          <ChevronDown className={`h-4 w-4 text-usf-red transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
      </div>
      {open && (
        <ul className="mb-2 overflow-hidden rounded-sm border border-usf-blue/10 bg-usf-blue-dark py-1">
          {SERVICES_DROPDOWN_ITEMS.map((entry) => (
            <li key={entry.label}>
              <MenuLink
                href={entry.href}
                className="nav-services-menu-link"
                onClick={close}
              >
                {entry.label}
              </MenuLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function NavItem({ item }) {
  if (item.menu === 'services') {
    return <ServicesNavItem item={item} />;
  }

  return (
    <a href={item.href} className={NAV_LINK_CLASS}>
      {item.label}
      <span className="absolute inset-x-[10px] -bottom-px block h-[2px] origin-left scale-x-0 bg-usf-red transition-transform duration-300 group-hover:scale-x-100 xl:inset-x-[13px] 2xl:inset-x-4" />
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

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <div
        className={`hidden border-b border-white/10 bg-usf-blue-dark text-[12px] text-white/75 lg:block ${
          scrolled ? 'h-0 overflow-hidden border-0' : 'h-10'
        } transition-[height] duration-300 ease-out`}
      >
        <div className="container-usf flex h-10 items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <Globe2 className="h-3.5 w-3.5 text-usf-red" />
              <span>{site.nav.utility.tagline}</span>
            </span>
            <span className="flex items-center gap-2">
              <Mail className="h-3.5 w-3.5 text-white/55" />
              <a href={`mailto:${site.contact.email}`} className="hover:text-white">
                {site.contact.email}
              </a>
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a href="/#news" className="hover:text-white">
              {site.nav.utility.newsroomLabel}
            </a>
            <span className="flex items-center gap-2">
              <Phone className="h-3.5 w-3.5 text-white/55" />
              {site.contact.phone}
            </span>
          </div>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 w-full overflow-visible border-b transition-all duration-300 ${
          scrolled
            ? 'border-usf-blue/10 bg-white shadow-[0_1px_0_rgba(12,43,91,0.04)]'
            : 'border-transparent bg-white'
        }`}
        id="home"
      >
        <div className="container-usf flex h-[72px] items-center justify-between gap-4 sm:h-[80px] sm:gap-6 md:h-[92px]">
          <Logo />

          <div className="hidden items-center gap-3 lg:flex">
            <a href="/#membership" className="btn-red !w-auto whitespace-nowrap">
              {site.nav.becomeMemberLabel}
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

        <nav className="hidden border-t border-usf-blue/10 bg-white lg:block">
          <div className="container-usf flex justify-center">
            <div className="flex flex-nowrap items-center justify-center">
              {NAV_ITEMS.map((item) => (
                <NavItem key={item.label} item={item} />
              ))}
            </div>
          </div>
        </nav>

        {mobileOpen && (
          <div className="border-t border-usf-blue/10 bg-white lg:hidden">
            <div className="container-usf flex flex-col py-4">
              {NAV_ITEMS.map((item) =>
                item.menu === 'services' ? (
                  <ServicesMobileSection key={item.label} onNavigate={closeMobile} />
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={closeMobile}
                    className="border-b border-usf-blue/5 py-3 text-[14px] font-medium text-usf-text/90 hover:text-usf-blue"
                  >
                    {item.label}
                  </a>
                ),
              )}
              <a
                href="/#membership"
                className="btn-red mt-4 w-full justify-center"
                onClick={closeMobile}
              >
                {site.nav.becomeMemberLabel}
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

export { Logo };
