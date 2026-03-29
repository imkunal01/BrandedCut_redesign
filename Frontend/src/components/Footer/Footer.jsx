import React from 'react';
import { motion } from 'framer-motion';
import './Footer.css';

const footerLinks = {
  services: [
    { name: 'Video Editing', href: '#services' },
    { name: 'Web Development', href: '#services' },
    { name: 'Graphic Design', href: '#services' },
    { name: 'Brand Identity', href: '#services' }
  ],
  company: [
    { name: 'About Us', href: '#about' },
    { name: 'Our Team', href: '#about' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Contact', href: '#contact' }
  ],
  resources: [
    { name: 'Blog', href: '#' },
    { name: 'Case Studies', href: '#' },
    { name: 'Documentation', href: '#' },
    { name: 'Support', href: '#' }
  ]
};

const socialLinks = [
  { name: 'LI', label: 'LinkedIn', href: '#' },
  { name: 'TW', label: 'Twitter', href: '#' },
  { name: 'IG', label: 'Instagram', href: '#' },
  { name: 'GH', label: 'GitHub', href: '#' },
];

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};
const fadeUp = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
};

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="footer">
      {/* Mega CTA block */}
      <div className="footer-mega-cta">
        <motion.div className="footer-cta-inner"
          initial={{ y: 80, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="section-label-cyber footer-cta-label">// READY TO TRANSMIT?</span>
          <h2 className="footer-cta-text">
            LET'S MAKE<br /><span className="text-kinetic">SOMETHING.</span>
          </h2>
          <motion.a
            href="#contact"
            className="footer-cta-btn"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
          >
            OPEN A LINE →
          </motion.a>
        </motion.div>
        <div className="footer-cta-glow" aria-hidden="true" />
      </div>

      {/* Main footer body */}
      <div className="footer-body">
        <div className="footer-container">
          <motion.div className="footer-grid"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Brand column */}
            <motion.div className="footer-brand-col" variants={fadeUp}>
              <div className="footer-logo">BRANDEDCUT</div>
              <p className="footer-tagline">
                Premium digital engineering & creative systems. Built to disrupt, engineered to last.
              </p>
              <div className="footer-social-row">
                {socialLinks.map((s, i) => (
                  <motion.a key={i} href={s.href} className="footer-social-chip"
                    whileHover={{ y: -4, borderColor: 'var(--electric)', color: 'var(--electric)' }}
                    transition={{ duration: 0.3 }}
                    aria-label={s.label}
                  >
                    {s.name}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Link columns */}
            {Object.entries(footerLinks).map(([group, links]) => (
              <motion.div key={group} className="footer-link-col" variants={fadeUp}>
                <h4 className="footer-link-heading">{group.toUpperCase()}</h4>
                <ul className="footer-link-list">
                  {links.map((link, i) => (
                    <li key={i}>
                      <a href={link.href} className="footer-link">{link.name}</a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom bar */}
          <div className="footer-bottom">
            <span className="footer-copyright">
              © 2026 BRANDEDCUT // ALL SYSTEMS OPERATIONAL
            </span>
            <div className="footer-legal">
              <a href="#" className="footer-legal-link">Privacy</a>
              <a href="#" className="footer-legal-link">Terms</a>
              <a href="#" className="footer-legal-link">Cookies</a>
            </div>
            <motion.button className="footer-scroll-top" onClick={scrollToTop}
              whileHover={{ y: -4, borderColor: 'var(--electric)' }}
              transition={{ duration: 0.3 }}
              aria-label="Scroll to top"
            >
              ↑
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
