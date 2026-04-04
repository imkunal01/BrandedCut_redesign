import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './ContactSection.css';

const ContactSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  const [formData, setFormData] = useState({ name: '', email: '', company: '', service: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const backendBaseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      const structuredMessage = `Company: ${formData.company || 'N/A'}\nService: ${formData.service || 'N/A'}\n\nProject Details:\n${formData.message}`.trim();
      const res = await fetch(`${backendBaseUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: formData.name, email: formData.email, message: structuredMessage })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', company: '', service: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (err) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  const services = ['Web Development', 'Video Production', 'UI/UX Design', 'Brand Identity', 'SEO & Marketing', 'Consultation'];
  const contactDetails = [
    { label: '// EMAIL', value: 'contact@brandedcut.com', href: 'mailto:contact@brandedcut.com' },
    { label: '// PHONE', value: '+91 62660 89196', href: 'tel:+916266089196' },
    { label: '// LOCATION', value: 'Punjab, India', href: '#' },
  ];

  const fadeUp = { hidden: { y: 60, opacity: 0 }, visible: (i) => ({ y: 0, opacity: 1, transition: { duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] } }) };

  return (
    <section id="contact" className="contact-section" ref={sectionRef}>
      <motion.div className="contact-bg-orb" style={{ y: bgY }} />
      <div className="contact-container">

        {/* Header */}
        <motion.div className="contact-header-block"
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="section-label-cyber">// INITIATE</span>
          <h2 className="contact-heading">
            BUILD THE <span className="text-shimmer">FUTURE.</span>
          </h2>
        </motion.div>

        <div className="contact-grid">
          {/* LEFT — Info */}
          <motion.div className="contact-left"
            initial={{ x: -60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="contact-info-list">
              {contactDetails.map((item, i) => (
                <motion.div key={i} className="contact-info-item" custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                  <span className="info-label">{item.label}</span>
                  <a href={item.href} className="info-value">{item.value}</a>
                </motion.div>
              ))}
            </div>

            <div className="contact-socials">
              {['LinkedIn', 'Instagram', 'Twitter'].map((s, i) => (
                <motion.a key={s} href="#" className="social-link-cyber"
                  custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                  whileHover={{ x: 6 }}
                >
                  {s} <span className="arrow-glyph">→</span>
                </motion.a>
              ))}
            </div>

            {/* Decorative grid lines */}
            <div className="contact-decorative-grid" aria-hidden="true">
              <div /><div /><div /><div />
            </div>
          </motion.div>

          {/* RIGHT — Form */}
          <motion.div className="contact-right"
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="cyber-form-card">
              <div className="cyber-form-header">
                <span className="cyber-form-label">NEW_MESSAGE.SYS</span>
                <div className="cyber-dots"><span /><span /><span /></div>
              </div>

              <form className="cyber-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="cyber-input-group">
                    <label className="cyber-label">YOUR NAME</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="John Doe" required className="cyber-input" />
                  </div>
                  <div className="cyber-input-group">
                    <label className="cyber-label">EMAIL ADDRESS</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="you@company.com" required className="cyber-input" />
                  </div>
                </div>

                <div className="form-row">
                  <div className="cyber-input-group">
                    <label className="cyber-label">COMPANY (OPTIONAL)</label>
                    <input type="text" name="company" value={formData.company} onChange={handleInputChange} placeholder="Agency Ltd." className="cyber-input" />
                  </div>
                  <div className="cyber-input-group">
                    <label className="cyber-label">SERVICE</label>
                    <select name="service" value={formData.service} onChange={handleInputChange} className="cyber-input cyber-select">
                      <option value="">SELECT SERVICE</option>
                      {services.map((s, i) => <option key={i} value={s}>{s.toUpperCase()}</option>)}
                    </select>
                  </div>
                </div>

                <div className="cyber-input-group">
                  <label className="cyber-label">PROJECT BRIEF</label>
                  <textarea name="message" value={formData.message} onChange={handleInputChange} rows="5" placeholder="Tell us about your project goals, timeframe, and budget..." required className="cyber-input cyber-textarea" />
                </div>

                <motion.button
                  type="submit"
                  className={`cyber-submit-btn ${isSubmitting ? 'loading' : ''} ${submitStatus || ''}`}
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? 'TRANSMITTING...' : submitStatus === 'success' ? 'SIGNAL RECEIVED ✓' : submitStatus === 'error' ? 'RETRY ✕' : 'TRANSMIT →'}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;