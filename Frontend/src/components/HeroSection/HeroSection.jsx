import React from 'react';
import { motion } from 'framer-motion';
import './HeroSection.css';

const floatingApps = [
  { id: 'slack', label: 'S', top: '24%', left: '14%', color: '#6366f1' },
  { id: 'qb', label: 'qb', top: '42%', left: '8%', color: '#22c55e' },
  { id: 'shop', label: 'S', top: '66%', left: '18%', color: '#84cc16' },
  { id: 'excel', label: 'X', top: '26%', right: '14%', color: '#16a34a' },
  { id: 'airtable', label: 'A', top: '44%', right: '8%', color: '#ec4899' },
  { id: 'sheets', label: 'G', top: '66%', right: '18%', color: '#22c55e' },
];

const HeroSection = () => {
  return (
    <section id="home" className="hero-clean">
      <div className="hero-clean__grain" aria-hidden="true" />

      {floatingApps.map((app, index) => (
        <motion.div
          key={app.id}
          className="hero-clean__floating-app"
          style={{
            top: app.top,
            left: app.left,
            right: app.right,
            '--chip-color': app.color,
          }}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.2 + index * 0.08 }}
        >
          <span>{app.label}</span>
        </motion.div>
      ))}

      <div className="hero-clean__content">
        <motion.h1
          className="hero-clean__title"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          We Make <span>Names </span> turns
          <br />
          into <span>Brands</span> with a click
        </motion.h1>

        <motion.p
          className="hero-clean__subtitle"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12 }}
        >
          Build custom Videos, Websites, and Designs  effortlessly. From
          concept to reality.
        </motion.p>

        <motion.button
          type="button"
          className="hero-clean__demo-btn"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.25 }}
        >
          <span className="hero-clean__play">▶</span>
          <span>Watch Demo</span>
          <small>3mins</small>
        </motion.button>
      </div>

      <div className="hero-clean__bottom-glow" aria-hidden="true" />

      <motion.div
        className="hero-clean__dashboard"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.3 }}
      >
        <div className="hero-clean__dashboard-top">
          <span />
          <span />
          <span />
        </div>
        <div className="hero-clean__dashboard-body">
          <article className="hero-clean__panel hero-clean__panel--support">
            <div className="hero-clean__avatars">
              <span className="avatar avatar--one" />
              <span className="avatar avatar--two" />
              <span className="avatar avatar--three" />
              <span className="avatar avatar--four" />
            </div>
            <h4>Personalized Support</h4>
            <p>Work with dedicated consultants who understand your business goals.</p>
          </article>

          <article className="hero-clean__panel hero-clean__panel--chat">
            <div className="chat-bubble chat-bubble--strong">Hi, Daniel! Your design draft is ready.</div>
            <div className="chat-bubble">Want feedback before next step?</div>
            <div className="chat-dots"><span /><span /><span /></div>
            <h4>With You Every Step</h4>
            <p>We stay with you from first consultation to post-launch support.</p>
          </article>

          <article className="hero-clean__panel hero-clean__panel--impact">
            <div className="impact-bars" aria-hidden="true">
              {Array.from({ length: 18 }).map((_, i) => (
                <span key={`impact-${i}`} style={{ '--i': i }} />
              ))}
            </div>
            <h4>Measurable Impact</h4>
            <p>We track progress and show ROI at every stage for lasting growth.</p>
          </article>

          <article className="hero-clean__panel hero-clean__panel--future">
            <div className="future-core" aria-hidden="true">
              <span className="core" />
              <span className="node n1" />
              <span className="node n2" />
              <span className="node n3" />
              <span className="node n4" />
            </div>
            <h4>Future-Ready Solutions</h4>
            <p>We design scalable systems that keep you competitive tomorrow.</p>
          </article>

          <article className="hero-clean__panel hero-clean__panel--timeline">
            <div className="timeline-track" aria-hidden="true">
              <span style={{ '--x': '4%' }}>Brief approval</span>
              <span style={{ '--x': '25%' }}>Content plan</span>
              <span style={{ '--x': '42%' }}>Internal review</span>
              <span style={{ '--x': '58%' }}>Client feedback</span>
              <span style={{ '--x': '74%' }}>Asset export</span>
              <span style={{ '--x': '88%' }}>Launch setup</span>
            </div>
            <h4>Transparent Process</h4>
            <p>You always know what is happening with clear timelines and regular updates.</p>
          </article>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
