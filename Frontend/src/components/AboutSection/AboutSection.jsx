import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import './AboutSection.css';

const values = [
  { title: 'INNOVATION', description: 'We constantly push boundaries and explore new technologies to deliver cutting-edge solutions.', icon: '🚀', accent: 'var(--electric)', accentRgb: '0, 245, 212' },
  { title: 'QUALITY', description: 'Every project is crafted with meticulous attention to detail. No corners cut, ever.', icon: '✦', accent: 'rgba(192,132,252,1)', accentRgb: '192, 132, 252' },
  { title: 'COLLABORATION', description: 'We work as an extension of your team — your vision becomes our relentless mission.', icon: '◈', accent: 'var(--electric)', accentRgb: '0, 245, 212' },
  { title: 'EXCELLENCE', description: 'We strive for excellence in everything: from initial concept to the final deployment.', icon: '◉', accent: 'rgba(192,132,252,1)', accentRgb: '192, 132, 252' }
];

const stats = [
  { number: 50, suffix: '+', label: 'Projects Delivered', accent: 'var(--electric)' },
  { number: 30, suffix: '+', label: 'Happy Clients', accent: 'rgba(192,132,252,1)' },
  { number: 4, suffix: 'yrs', label: 'Years on the Grid', accent: 'var(--gold)' },
  { number: 100, suffix: '%', label: 'Client Satisfaction', accent: 'var(--electric)' },
];

// Animated counter component
const AnimatedCounter = ({ target, suffix, accent }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1600;
    const step = 16;
    const increment = target / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, step);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref} className="stat-number" style={{ color: accent }}>
      {count}{suffix}
    </span>
  );
};

const AboutSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const textY = useTransform(scrollYProgress, [0, 1], ['5%', '-5%']);
  const statsY = useTransform(scrollYProgress, [0.3, 1], ['30px', '-10px']);

  const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
  };
  const riseItem = {
    hidden: { y: 60, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section id="about" className="about-section" ref={sectionRef}>
      {/* Background orb */}
      <div className="about-bg-orb" aria-hidden="true" />

      <div className="about-container">

        {/* --- HEADER --- */}
        <motion.div className="about-header"
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="section-label-cyber">// THE COLLECTIVE</span>
          <h2 className="about-title">
            WHO WE <span className="text-shimmer">ARE.</span>
          </h2>
        </motion.div>

        {/* --- STORY + ILLUSTRATION ROW --- */}
        <div className="about-story-row">
          <motion.div className="about-story-text" style={{ y: textY }}>
            <motion.p className="about-story-lead"
              initial={{ x: -40, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              Founded in 2020, BrandedCut emerged from a simple conviction — that great design and technology&nbsp;can&nbsp;transform ideas into extraordinary experiences.
            </motion.p>
            <motion.p className="about-story-body"
              initial={{ x: -40, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              We started as a small team of passionate creators and evolved into a full-service creative powerhouse. Our journey is marked by continuous learning, bold innovation, and an obsessive commitment to delivering exceptional results.
            </motion.p>
            <motion.p className="about-story-body"
              initial={{ x: -40, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              Today, we combine creativity with cutting-edge technology to craft solutions that don't just meet expectations — they obliterate them.
            </motion.p>
          </motion.div>

          {/* Abstract decorative element */}
          <motion.div className="about-decorative"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="about-grid-art" aria-hidden="true">
              {Array.from({ length: 25 }).map((_, i) => (
                <motion.div key={i} className="grid-art-cell"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: Math.random() * 0.6 + 0.1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.02, duration: 0.5 }}
                />
              ))}
            </div>
            <div className="about-tagline-block">
              <span className="about-tagline">KINETIC LIGHT</span>
              <span className="about-tagline-sub">EST. 2020 // PUNJAB, IN</span>
            </div>
          </motion.div>
        </div>

        {/* --- STATS BENTO GRID --- */}
        <motion.div className="about-stats-bento"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-5%' }}
          style={{ y: statsY }}
        >
          {stats.map((s, i) => (
            <motion.div key={i} className="about-stat-card" variants={riseItem}
              whileHover={{ borderColor: s.accent, y: -4, transition: { duration: 0.3 } }}
              style={{ '--stat-accent-rgb': s.accent }}
            >
              <AnimatedCounter target={s.number} suffix={s.suffix} accent={s.accent} />
              <div className="stat-label">{s.label}</div>
              <div className="stat-card-glow" style={{ background: `radial-gradient(circle, ${s.accent} 0%, transparent 70%)` }} />
            </motion.div>
          ))}
        </motion.div>

        {/* --- VALUES BENTO GRID --- */}
        <motion.div className="about-values-header"
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="section-label-cyber">// CORE PROTOCOLS</span>
        </motion.div>

        <motion.div className="about-values-grid"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-5%' }}
        >
          {values.map((v, i) => (
            <motion.div key={i} className="value-card border-beam-card" variants={riseItem}
              whileHover={{ borderColor: v.accent, transition: { duration: 0.3 } }}
              style={{ '--accent-rgb': v.accentRgb }}
            >
              <div className="value-icon" style={{ color: v.accent }}>{v.icon}</div>
              <h4 className="value-title">{v.title}</h4>
              <p className="value-description">{v.description}</p>
              <div className="value-glow" style={{ background: `radial-gradient(circle, ${v.accent} 0%, transparent 70%)` }} />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default AboutSection;
