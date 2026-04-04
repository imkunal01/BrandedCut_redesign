import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './ServicesSection.css';

const services = [
  {
    id: 'video',
    title: 'Video Production',
    number: '01',
    description: 'Cinematic storytelling through high-end editing, color grading, and motion graphics that captivate your audience.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/>
        <line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/>
        <line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/>
        <line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="17" x2="22" y2="17"/>
        <line x1="17" y1="7" x2="22" y2="7"/>
      </svg>
    ),
    features: ['4K Editing', 'VFX & Motion', 'Sound Design', 'Color Grading'],
    accent: 'var(--electric)',
    accentRgb: '0, 245, 212',
    size: 'large', // spans 2 rows
  },
  {
    id: 'web',
    title: 'Web Engineering',
    number: '02',
    description: 'Blazing fast, SEO-optimized digital experiences built with cutting-edge stacks. Built for scale, immersion and performance.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    features: ['React / Next.js', 'WebGL & Three.js', 'Performance', 'SEO'],
    accent: 'var(--violet)',
    accentRgb: '192, 132, 252',
    size: 'small',
  },
  {
    id: 'design',
    title: 'UI/UX & Brand Identity',
    number: '03',
    description: 'User-centric interfaces that convert. We craft design systems, logos, and identities that define brands.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19l7-7 3 3-7 7-3-3z"/>
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/>
        <path d="M2 2l7.586 7.586"/>
        <circle cx="11" cy="11" r="2"/>
      </svg>
    ),
    features: ['Brand Identity', 'Prototyping', 'Mobile Apps', 'Design Systems'],
    accent: 'var(--gold)',
    accentRgb: '255, 209, 102',
    size: 'small',
  },
];

// Animated micro-visuals per service
const VideoMicro = () => (
  <div className="svc-micro video-svc-micro">
    <div className="svc-monitor">
      <div className="svc-monitor-screen">
        <div className="svc-playhead-line" />
        <div className="svc-waveform">
          {[...Array(18)].map((_, i) => (
            <motion.div key={i} className="svc-wave-bar"
              animate={{ scaleY: [0.2, 1, 0.3, 0.8, 0.2] }}
              transition={{ duration: 0.6 + i * 0.04, repeat: Infinity, ease: 'easeInOut', delay: i * 0.035 }}
            />
          ))}
        </div>
      </div>
      <div className="svc-monitor-footer">
        <motion.span className="svc-rec-dot"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        />
        <span className="svc-rec-label">REC</span>
        <span className="svc-timecode">00:04:32:12</span>
      </div>
    </div>
    <div className="svc-color-wheels">
      {['#00f5d4', '#c084fc', '#facc15', '#f43f5e'].map((c, i) => (
        <motion.div key={i} className="svc-color-wheel"
          style={{ background: `radial-gradient(circle, ${c} 0%, transparent 70%)` }}
          animate={{ rotate: 360 * (i % 2 === 0 ? 1 : -1) }}
          transition={{ duration: 8 + i * 2, repeat: Infinity, ease: 'linear' }}
        />
      ))}
    </div>
  </div>
);

const WebMicro = () => (
  <div className="svc-micro web-svc-micro">
    <div className="svc-code-window">
      <div className="svc-dots"><span /><span /><span /></div>
      <div className="svc-code-lines">
        {[
          { w: '72%', color: '#c792ea' }, { w: '55%', color: '#82aaff' },
          { w: '88%', color: '#c3e88d' }, { w: '42%', color: '#f78c6c' },
          { w: '60%', color: '#89ddff' },
        ].map((l, i) => (
          <motion.div key={i} className="svc-code-line" style={{ background: l.color }}
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: l.w, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 + i * 0.12 }}
          />
        ))}
      </div>
    </div>
    {['Next.js', 'WebGL', 'TS'].map((t, i) => (
      <motion.div key={i} className="svc-tech-badge"
        style={{ '--badge-color': ['#c084fc', '#00f5d4', '#facc15'][i] }}
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2.5, delay: i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
      >{t}</motion.div>
    ))}
  </div>
);

const DesignMicro = () => (
  <div className="svc-micro design-svc-micro">
    <div className="svc-palette">
      {['#00f5d4', '#c084fc', '#facc15', '#f43f5e', '#38bdf8'].map((c, i) => (
        <motion.div key={i} className="svc-swatch" style={{ background: c }}
          initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.05 + i * 0.08 }}
          whileHover={{ scaleY: 1.3 }}
        />
      ))}
    </div>
    <motion.div className="svc-orbit"
      animate={{ rotate: 360 }}
      transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
    >
      {['✦', '◈', '◉', '✧'].map((s, i) => (
        <span key={i} className="svc-orbit-node" style={{ '--i': i }}>{s}</span>
      ))}
    </motion.div>
    <div className="svc-orbit-center">Ds</div>
  </div>
);

const microComponents = { video: VideoMicro, web: WebMicro, design: DesignMicro };

const cardVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: (i) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }
  })
};

const ServicesSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['3%', '-3%']);

  return (
    <section id="services" className="svc-section" ref={sectionRef}>
      {/* Ambient background orbs */}
      <motion.div className="svc-bg-orb svc-bg-orb--1" style={{ y: bgY }} />
      <motion.div className="svc-bg-orb svc-bg-orb--2" style={{ y: bgY }} />

      <div className="svc-container">
        {/* Header */}
        <motion.div className="svc-header"
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="section-label-cyber">// EXPERTISE</span>
          <h2 className="svc-title">
            SOLUTIONS THAT <span className="text-shimmer">SCALE.</span>
          </h2>
          <p className="svc-subtitle">
            We combine technical precision with creative flair to deliver products that leave a lasting impact.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="svc-bento">
          {services.map((service, i) => {
            const MicroComp = microComponents[service.id];
            return (
              <motion.div
                key={service.id}
                className={`svc-card svc-card--${service.id} svc-card--${service.size} border-beam-card`}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-5%' }}
                whileHover={{ y: -8, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }}
                style={{ '--accent': service.accent, '--accent-rgb': service.accentRgb }}
              >
                {/* Number */}
                <span className="svc-card-number">{service.number}</span>

                {/* Icon */}
                <div className="svc-card-icon-wrap">
                  {service.icon}
                </div>

                {/* Content */}
                <div className="svc-card-content">
                  <h3 className="svc-card-title">{service.title}</h3>
                  <p className="svc-card-desc">{service.description}</p>
                  <div className="svc-card-tags">
                    {service.features.map((f, fi) => (
                      <span key={fi} className="svc-tag">{f}</span>
                    ))}
                  </div>
                  <button
                    className="svc-card-cta"
                    onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Explore → 
                  </button>
                </div>

                {/* Micro visual */}
                <div className="svc-card-visual">
                  <MicroComp />
                </div>

                {/* Corner glow */}
                <div className="svc-card-glow" />
              </motion.div>
            );
          })}

          {/* Stats card */}
          <motion.div className="svc-card svc-card--stats"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: '-5%' }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="svc-stats-grid">
              {[
                { n: '50+', label: 'Projects' },
                { n: '30+', label: 'Clients' },
                { n: '4yrs', label: 'Experience' },
                { n: '100%', label: 'Satisfaction' },
              ].map((s, i) => (
                <motion.div key={i} className="svc-stat-item"
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.08 }}
                >
                  <div className="svc-stat-num">{s.n}</div>
                  <div className="svc-stat-label">{s.label}</div>
                </motion.div>
              ))}
            </div>
            <div className="svc-stats-cta">
              <p>Got a specific challenge?</p>
              <button
                className="svc-cta-link"
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              >Let's talk about it →</button>
            </div>
            <div className="svc-card-glow" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;