import Navbar from '../components/Navbar.jsx';
import Hero from '../components/Hero.jsx';
import GlobalStats from '../components/GlobalStats.jsx';
import Ecosystem from '../components/Ecosystem.jsx';
import About from '../components/About.jsx';
import MissionVision from '../components/MissionVision.jsx';
import Services from '../components/Services.jsx';
import WhyJoin from '../components/WhyJoin.jsx';
import Industries from '../components/Industries.jsx';
import GlobalConsortium from '../components/GlobalConsortium.jsx';
import InternationalDevelopment from '../components/InternationalDevelopment.jsx';
import GlobalPresence from '../components/GlobalPresence.jsx';
import Leadership from '../components/Leadership.jsx';
import Membership from '../components/Membership.jsx';
import FinalCTA from '../components/FinalCTA.jsx';
import Footer from '../components/Footer.jsx';

export default function HomePage() {
  return (
    <div className="min-h-screen overflow-x-clip bg-white text-usf-text">
      <Navbar />
      <main>
        <Hero />
        <GlobalStats />
        <Ecosystem />
        <About />
        <MissionVision />
        <Services />
        <WhyJoin />
        <Industries />
        <GlobalConsortium />
        <InternationalDevelopment />
        <GlobalPresence />
        <Leadership />
        <Membership />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
