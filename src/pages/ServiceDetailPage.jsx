import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import site from '../content/site.json';
import { applySeo, buildServiceSchema } from '../utils/seo.js';

export default function ServiceDetailPage() {
  const { serviceId } = useParams();
  const service = site.services.items.find((s) => s.id === serviceId);
  const detail = site.services.detailPage;

  useEffect(() => {
    if (!service) {
      applySeo({
        title: `${detail.notFoundTitle} | ${site.site.name}`,
        description: detail.notFoundBody,
        path: '/services',
      });
      return;
    }

    const path = service.href === '/services' ? '/services' : service.href;
    applySeo({
      title: `${service.title} | ${site.site.name}`,
      description: service.summary,
      path,
      jsonLd: [
        buildServiceSchema({
          title: service.title,
          description: service.summary,
          path,
          services: service.items,
        }),
      ],
    });
  }, [detail.notFoundBody, detail.notFoundTitle, service]);

  if (!service) {
    return (
      <div className="min-h-screen overflow-x-clip bg-white text-usf-text">
        <Navbar />
        <main className="container-usf py-16 sm:py-24 md:py-32">
          <span className="eyebrow">{site.services.eyebrow}</span>
          <h1 className="display-h2 mt-6 text-usf-blue">{detail.notFoundTitle}</h1>
          <p className="mt-6 max-w-xl text-[16px] leading-[1.8] text-usf-muted">{detail.notFoundBody}</p>
          <Link to="/services" className="btn-red mt-10 inline-flex">
            {detail.notFoundLink}
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-usf-text">
      <Navbar />

      <header className="relative bg-usf-blue py-14 text-white sm:py-16 md:py-20 lg:py-28">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
          }}
        />
        <div className="container-usf relative">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-white/70 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {detail.backLabel}
          </Link>

          <div className="mt-8 flex flex-col gap-4 sm:mt-10 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
            <div className="max-w-3xl">
              <span className="eyebrow-light">{site.services.eyebrow}</span>
              <h1 className="display-h2 mt-6 text-white">{service.title}</h1>
              <p className="mt-6 text-[16.5px] leading-[1.85] text-white/75">{service.summary}</p>
            </div>
            <span className="hidden font-display text-[72px] leading-none text-white/10 md:block">
              {service.no}
            </span>
          </div>
        </div>
      </header>

      <main className="container-usf py-12 sm:py-16 md:py-20 lg:py-28">
        <div className="grid gap-10 sm:gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-7">
            <p className="text-[17px] leading-[1.85] text-usf-text">{service.detail.intro}</p>
            <div className="mt-8 space-y-6 text-[16.5px] leading-[1.85] text-usf-text/85">
              {service.detail.paragraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <Link to="/#contact" className="btn-red mt-12 inline-flex">
              {detail.contactLabel}
            </Link>
          </div>

          <aside className="lg:col-span-5">
            <div className="border border-usf-blue/10 bg-usf-gray/40 p-5 sm:p-6 md:p-8 lg:p-10">
              <h2 className="text-[11px] font-semibold uppercase tracking-eyebrow text-usf-muted">
                {detail.offeringsLabel}
              </h2>
              <ul className="mt-6 space-y-3">
                {service.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[14.5px] leading-[1.6] text-usf-text/90">
                    <span className="mt-[9px] inline-flex h-1.5 w-1.5 flex-none rounded-full bg-usf-red" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <Link to="/services" className="link-arrow mt-8 inline-flex text-usf-blue">
              {detail.backLabel} <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
