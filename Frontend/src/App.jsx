import React, { useEffect } from 'react';
import Lenis from 'lenis';
import AdminLogin from './admin/AdminLogin';
import AdminForms from './admin/AdminForms';
import { ThemeProvider } from './contexts/ThemeContext';
import CardNav from './components/CardNav';
import logo from './assets/logo3.png';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import PortfolioSection from './components/PortfolioSection';
import TestimonialsSection from './components/TestimonialsSection';
import ProcessSection from './components/ProcessSection';
import AboutSection from './components/AboutSection';
import TeamSection from './components/TeamSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import './styles/global.css';

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.0,           // slightly snappier = fewer composited frames
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      smoothTouch: false,
      touchMultiplier: 1.5,
      infinite: false,
    });

    let rafId;
    function raf(time) {
      if (!document.hidden) lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  const path = typeof window !== 'undefined' ? window.location.pathname : '/'
  const isAdmin = path.startsWith('/admin')
  if (isAdmin) {
    if (path === '/admin' || path === '/admin/') {
      return <AdminLogin />
    }
    if (path.startsWith('/admin/forms')) {
      return <AdminForms />
    }
    return <AdminLogin />
  }
  const items = [
    {
      label: "About",
      bgColor: "#0D0716",
      textColor: "#fff",
      links: [
        { label: "Company", ariaLabel: "About Company", href: "#about" },
        { label: "Careers", ariaLabel: "About Careers", href: "#careers" }
      ]
    },
    {
      label: "Projects", 
      bgColor: "#170D27",
      textColor: "#fff",
      links: [
        { label: "Featured", ariaLabel: "Featured Projects", href: "#portfolio" },
        { label: "Case Studies", ariaLabel: "Project Case Studies", href: "#case-studies" }
      ]
    },
    {
      label: "Contact",
      bgColor: "#271E37", 
      textColor: "#fff",
      links: [
        { label: "Email", ariaLabel: "Email us", href: "#contact" },
        { label: "Twitter", ariaLabel: "Twitter", href: "#twitter" },
        { label: "LinkedIn", ariaLabel: "LinkedIn", href: "#linkedin" }
      ]
    }
  ];

  return (
    <ThemeProvider>
      <div className="app">
        <CardNav
          logo={logo}
          logoAlt="BrandedCut Logo"
          items={items}
          ease="power3.out"
        />
        <main>
          <HeroSection />
          <PortfolioSection />
          <AboutSection />
          <ProcessSection />
          <TestimonialsSection />
          <TeamSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
