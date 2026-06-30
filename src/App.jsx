import { Routes, Route } from 'react-router-dom';

import ScrollToHash from './components/ScrollToHash.jsx';
import HomePage from './pages/HomePage.jsx';
import ServicesPage from './pages/ServicesPage.jsx';
import GlobalResourcingPage from './pages/GlobalResourcingPage.jsx';
import ServiceDetailPage from './pages/ServiceDetailPage.jsx';

export default function App() {
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

