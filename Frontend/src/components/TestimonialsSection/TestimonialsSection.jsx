import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import './TestimonialsSection.css';

const testimonials = [
  {
    id: 1, name: 'Sarah Johnson', role: 'CEO', company: 'TechStart Inc.',
    quote: 'BrandedCut transformed our brand identity completely. Their attention to detail and creative vision exceeded our expectations. The team delivered beyond what we imagined.',
    rating: 5, project: 'Brand Identity & Web Design', initials: 'SJ',
  },
  {
    id: 2, name: 'Michael Chen', role: 'Marketing Director', company: 'Creative Agency',
    quote: 'The video production quality is outstanding. They captured our vision perfectly and delivered a cinematic experience that elevated our product launch to another level.',
    rating: 5, project: 'Product Launch Video', initials: 'MC',
  },
  {
    id: 3, name: 'Emily Rodriguez', role: 'Founder', company: 'EcoVision',
    quote: 'Working with BrandedCut was a game-changer. Their web development skills and design expertise helped us create a platform that truly represents our mission.',
    rating: 5, project: 'E-commerce Platform', initials: 'ER',
  },
  {
    id: 4, name: 'David Thompson', role: 'Creative Director', company: 'Fashion Forward',
    quote: "The team's creativity and technical expertise are unmatched. They brought our fashion campaign to life with stunning visuals and seamless execution.",
    rating: 5, project: 'Fashion Campaign', initials: 'DT',
  },
];

const TestimonialsSection = () => {
  const [active, setActive] = useState(0);
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['5%', '-5%']);

  useEffect(() => {
    const t = setInterval(() => setActive(p => (p + 1) % testimonials.length), 6000);
    return () => clearInterval(t);
  }, []);

  const slideVariants = {
    enter: { x: 60, opacity: 0 },
    center: { x: 0, opacity: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
    exit: { x: -60, opacity: 0, transition: { duration: 0.4, ease: 'easeIn' } },
  };

  return (
    <section className="testimonials-section" ref={sectionRef}>
      <motion.div className="testimonials-bg-orb" style={{ y: bgY }} />

      <div className="testimonials-container">
        <motion.div className="testimonials-header"
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="section-label-cyber">// CLIENT LOG</span>
          <h2 className="testimonials-title">
            SIGNAL FROM THE <span className="text-shimmer">FIELD.</span>
          </h2>
        </motion.div>

        <div className="testimonials-layout">
          {/* Left: Large quote */}
          <motion.div className="testimonials-main"
            initial={{ x: -60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="testimonials-quote-mark">"</div>

            <AnimatePresence mode="wait">
              <motion.blockquote
                key={active}
                className="testimonials-quote"
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                {testimonials[active].quote}
              </motion.blockquote>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={`author-${active}`}
                className="testimonials-author"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.5 } }}
                exit={{ opacity: 0 }}
              >
                <div className="testimonials-avatar">
                  {testimonials[active].initials}
                </div>
                <div>
                  <div className="testimonials-author-name">{testimonials[active].name}</div>
                  <div className="testimonials-author-role">{testimonials[active].role} — {testimonials[active].company}</div>
                </div>
                <div className="testimonials-project-tag">
                  {testimonials[active].project}
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="testimonials-stars">
              {[...Array(5)].map((_, i) => (
                <motion.span key={i} className="star" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 + i * 0.06 }}>★</motion.span>
              ))}
            </div>
          </motion.div>

          {/* Right: Sidebar cards */}
          <motion.div className="testimonials-sidebar"
            initial={{ x: 60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {testimonials.map((t, i) => (
              <motion.button
                key={t.id}
                className={`testimonials-sidebar-card ${i === active ? 'active' : ''}`}
                onClick={() => setActive(i)}
                whileHover={{ x: 6 }}
                transition={{ duration: 0.3 }}
              >
                <div className="sidebar-card-avatar">{t.initials}</div>
                <div>
                  <div className="sidebar-card-name">{t.name}</div>
                  <div className="sidebar-card-role">{t.company}</div>
                </div>
                {i === active && (
                  <motion.div className="sidebar-card-active-glow" layoutId="activeGlow" />
                )}
              </motion.button>
            ))}

            {/* Progress bar */}
            <div className="testimonials-progress-bar">
              <motion.div className="testimonials-progress-fill"
                key={active}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 6, ease: 'linear' }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
