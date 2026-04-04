import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import AdminLogin from './admin/AdminLogin';
import AdminForms from './admin/AdminForms';
import { ThemeProvider } from './contexts/ThemeContext';
import CardNav from './components/CardNav';
import logo from './assets/logo4.png';
import HeroSection from './components/HeroSection';
import PhoneShowcaseSection from './components/PhoneShowcaseSection';
import CaseStudiesSection from './components/CaseStudiesSection/CaseStudiesSection';
import ServicesSection from './components/ServicesSection';
import PortfolioSection from './components/PortfolioSection';
import TestimonialsSection from './components/TestimonialsSection';
import ProcessSection from './components/ProcessSection';
import AboutSection from './components/AboutSection';
import TeamSection from './components/TeamSection';
import ContactSection from './components/ContactSection';
import CaseStudyDetailPage from './pages/CaseStudyDetailPage';
import Footer from './components/Footer';
import './styles/global.css';

const normalizePath = rawPath => {
  if (!rawPath) return '/';
  const trimmed = rawPath.replace(/\/+$/, '');
  return trimmed === '' ? '/' : trimmed;
};

function App() {
  const [path, setPath] = useState(
    normalizePath(typeof window !== 'undefined' ? window.location.pathname : '/')
  );

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

  useEffect(() => {
    const syncPathWithLocation = () => {
      setPath(normalizePath(window.location.pathname));
    };

    window.addEventListener('popstate', syncPathWithLocation);
    return () => window.removeEventListener('popstate', syncPathWithLocation);
  }, []);

  const caseStudyPrefix = '/case-studies/'
  const isCaseStudyDetail = path.startsWith(caseStudyPrefix)
  const caseStudySlug = isCaseStudyDetail ? path.slice(caseStudyPrefix.length) : ''
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

  const routeContent = () => {
    if (isCaseStudyDetail) {
      return <CaseStudyDetailPage slug={caseStudySlug} />
    }

    switch (path) {
      case '/':
        return (
          <>
            <HeroSection />
            <PhoneShowcaseSection />
            <CaseStudiesSection />
          </>
        );
      case '/case-studies':
        return <CaseStudiesSection />;
      case '/services':
        return <ServicesSection />;
      case '/portfolio':
        return <PortfolioSection />;
      case '/about':
        return <AboutSection />;
      case '/process':
        return <ProcessSection />;
      case '/testimonials':
        return <TestimonialsSection />;
      case '/team':
        return <TeamSection />;
      case '/contact':
        return <ContactSection />;
      default:
        return (
          <>
            <HeroSection />
            <PhoneShowcaseSection />
            <CaseStudiesSection />
          </>
        );
    }
  };

  const items = [
    {
      label: 'Services',
      href: '/services',
      links: [
        { label: 'All Services', ariaLabel: 'View all services', href: '/services' },
        { label: 'Process', ariaLabel: 'View our process', href: '/process' },
      ],
    },
    {
      label: 'Work',
      href: '/portfolio',
      links: [
        { label: 'Work Portfolio', ariaLabel: 'View work portfolio', href: '/portfolio' },
        { label: 'Testimonials', ariaLabel: 'Read testimonials', href: '/testimonials' },
      ],
    },
    {
      label: 'About',
      href: '/about',
      links: [
        { label: 'About Us', ariaLabel: 'Learn about BrandedCut', href: '/about' },
        { label: 'Team', ariaLabel: 'Meet the team', href: '/team' },
      ],
    },
    {
      label: 'Contact',
      href: '/contact',
      links: [
        { label: 'Get in Touch', ariaLabel: 'Contact BrandedCut', href: '/contact' },
      ],
    },
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
          {routeContent()}
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
