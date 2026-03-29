import React from 'react';
import HeroSection         from '../components/HeroSection/HeroSection';
import MarqueeBar          from '../components/MarqueeBar/MarqueeBar';
import ServicesSection     from '../components/ServicesSection/ServicesSection';
import PortfolioSection    from '../components/PortfolioSection/PortfolioSection';
import ProcessSection      from '../components/ProcessSection/ProcessSection';
import AboutSection        from '../components/AboutSection/AboutSection';
import TestimonialsSection from '../components/TestimonialsSection/TestimonialsSection';
import TeamSection         from '../components/TeamSection/TeamSection';
import ContactSection      from '../components/ContactSection/ContactSection';

/**
 * HomePage — The flagship single-page scroll experience.
 * Sections flow in order to tell the full agency story:
 *   Hero → Trust marquee → Services → Portfolio preview →
 *   Process → About → Testimonials → Team → Contact
 */
const HomePage = () => (
  <>
    {/* 1. Hero — First impression, editorial full-bleed */}
    <HeroSection />

    {/* 2. Trust marquee — infinite scrolling service tags */}
    {/* <MarqueeBar /> */}

    {/* 3. Services — numbered accordion with per-service accents */}
    <ServicesSection />

    {/* 4. Portfolio — bento grid, filter tabs, API + fallback */}
    <PortfolioSection />

    {/* 5. Process — 5-step timeline (horizontal on desktop) */}
    <ProcessSection />

    {/* 6. About — editorial split with code card + stat grid */}
    <AboutSection />

    {/* 7. Testimonials — quote carousel with mini-stack navigation */}
    <TestimonialsSection />

    {/* 8. Team — tilt hover cards */}
    <TeamSection />

    {/* 9. Contact — CTA + full form with backend integration */}
    <ContactSection />
  </>
);

export default HomePage;
