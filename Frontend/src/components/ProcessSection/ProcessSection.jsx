import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './ProcessSection.css';

const processSteps = [
  {
    id: '01', title: 'CONCEPT',
    description: 'We deep-dive into your vision, goals, and audience — mapping a technical strategy that is engineered to win.',
    details: ['Initial Consultation', 'Project Analysis', 'Strategy Planning', 'Timeline Architecture'],
    icon: '💡'
  },
  {
    id: '02', title: 'DESIGN',
    description: 'Our brutalist design engine pushes boundaries. Concepts, prototypes, and brand systems built at signal speed.',
    details: ['Visual Concepts', 'Prototyping', 'Brand Integration', 'System Design'],
    icon: '✦'
  },
  {
    id: '03', title: 'DEVELOP',
    description: 'Code, craft, and architecture: cutting-edge stacks, meticulous attention to performance, and scalable infrastructure.',
    details: ['Technical Architecture', 'Quality Assurance', 'Performance Optimization', 'Cross-Device Testing'],
    icon: '⚡'
  },
  {
    id: '04', title: 'DELIVER',
    description: 'We don\'t just launch — we ensure continual growth. Comprehensive handover, training, and ongoing evolution.',
    details: ['Project Launch', 'Training & Docs', 'Ongoing Support', 'Future Enhancements'],
    icon: '→'
  }
];

const ProcessSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const lineScale = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);

  const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const stepAnim = {
    hidden: { y: 80, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section className="process-section" ref={sectionRef}>
      <div className="process-container">
        <motion.div className="process-header"
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="section-label-cyber">// PROTOCOL</span>
          <h2 className="process-title">THE SYSTEM <span className="text-kinetic">WORKS.</span></h2>
          <p className="process-subtitle">Four phases. Engineered for excellence. Every time.</p>
        </motion.div>

        {/* Vertical timeline */}
        <div className="process-timeline-wrapper">
          {/* Animated vertical line */}
          <div className="process-line-track" aria-hidden="true">
            <motion.div className="process-line-fill" style={{ scaleY: lineScale }} />
          </div>

          <motion.div className="process-steps"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-5%' }}
          >
            {processSteps.map((step, i) => (
              <motion.div key={step.id} className="process-step" variants={stepAnim}>
                <div className="process-step-node">
                  <div className="node-dot">
                    <span className="node-icon">{step.icon}</span>
                  </div>
                  <div className="node-id">{step.id}</div>
                </div>

                <motion.div className="process-step-card"
                  whileHover={{ x: 8, borderColor: 'rgba(0, 245, 212, 0.5)' }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="step-card-inner">
                    <h3 className="step-title">{step.title}</h3>
                    <p className="step-description">{step.description}</p>
                    <div className="step-details">
                      {step.details.map((d, di) => (
                        <motion.span key={di} className="step-detail-tag"
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1 + di * 0.05 }}
                        >
                          {d}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                  <div className="step-card-glow" aria-hidden="true" />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div className="process-cta"
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <h3 className="process-cta-title">READY TO INITIATE?</h3>
          <motion.button
            className="cyber-btn-cta"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            START THE SEQUENCE →
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;
