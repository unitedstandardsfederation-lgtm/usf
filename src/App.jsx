import { useEffect } from 'react';

import { Routes, Route } from 'react-router-dom';

import ScrollToHash from './components/ScrollToHash.jsx';
import HomePage from './pages/HomePage.jsx';
import ServicesPage from './pages/ServicesPage.jsx';
import GlobalResourcingPage from './pages/GlobalResourcingPage.jsx';
import ServiceDetailPage from './pages/ServiceDetailPage.jsx';

import site from './content/site.json';

import { usfLogo } from './config/brand.js';



export default function App() {

  useEffect(() => {

    if (site.site?.metaTitle) {

      document.title = site.site.metaTitle;

    }

    if (site.site?.metaDescription) {

      let meta = document.querySelector('meta[name="description"]');

      if (!meta) {

        meta = document.createElement('meta');

        meta.setAttribute('name', 'description');

        document.head.appendChild(meta);

      }

      meta.setAttribute('content', site.site.metaDescription);

    }

    const icon = document.querySelector('link[rel="icon"]');

    if (icon) icon.setAttribute('href', usfLogo);

  }, []);



  return (

    <>

      <ScrollToHash />

      <Routes>

        <Route path="/" element={<HomePage />} />

        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/resourcing" element={<GlobalResourcingPage />} />
        <Route path="/services/:serviceId" element={<ServiceDetailPage />} />

      </Routes>

    </>

  );

}

