import React, { useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import InfiniteMenu from '../InfiniteMenu/InfiniteMenu';
import SoftAurora from '../SoftAurora/SoftAurora';
import './HeroSection.css';
import showcaseImageMain from '../../assets/2Uiplaceholder.png';

/* ── Bento micro-animation visuals ─────────────────────────── */
const VideoCard = () => (
  <div className="bento-micro video-micro">
    <div className="film-strip">
      {[...Array(6)].map((_, i) => (
        <motion.div key={i} className="film-frame"
          animate={{ opacity: [0.25, 1, 0.25] }}
          transition={{ duration: 1.8, delay: i * 0.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
    <motion.div className="play-btn-pulse"
      animate={{ scale: [1, 1.12, 1], boxShadow: ['0 0 0px #00f5d4', '0 0 20px rgba(0,245,212,0.6)', '0 0 0px #00f5d4'] }}
      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
    >
      <span className="play-icon">▶</span>
    </motion.div>
    <div className="waveform">
      {[...Array(14)].map((_, i) => (
        <motion.div key={i} className="wave-bar"
          animate={{ scaleY: [0.2, 1, 0.4, 0.8, 0.2] }}
          transition={{ duration: 0.8 + i * 0.05, repeat: Infinity, ease: 'easeInOut', delay: i * 0.04 }}
        />
      ))}
    </div>
  </div>
);

const WebCard = () => (
  <div className="bento-micro web-micro">
    <div className="code-window">
      <div className="code-dots"><span /><span /><span /></div>
      <div className="code-lines">
        {[
          { w: '72%', color: '#c792ea' }, { w: '55%', color: '#82aaff' },
          { w: '85%', color: '#c3e88d' }, { w: '40%', color: '#f78c6c' },
          { w: '60%', color: '#89ddff' },
        ].map((l, i) => (
          <motion.div key={i} className="code-line" style={{ background: l.color }}
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: l.w, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
      </div>
    </div>
    {[{ label: 'GL', d: 0 }, { label: 'Next', d: 0.25 }, { label: 'TS', d: 0.5 }, { label: 'React', d: 0.75 }].map((o, i) => (
      <motion.div key={i} className="tech-orb"
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 2.4, delay: o.d, repeat: Infinity, ease: 'easeInOut' }}
      >{o.label}</motion.div>
    ))}
  </div>
);

const DesignCard = () => (
  <div className="bento-micro design-micro">
    <div className="palette-row">
      {['#00f5d4', '#c084fc', '#facc15', '#f43f5e', '#38bdf8'].map((c, i) => (
        <motion.div key={i} className="palette-swatch" style={{ background: c }}
          initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.08 + i * 0.09 }}
          whileHover={{ scaleY: 1.25 }}
        />
      ))}
    </div>
    <div className="design-orbit">
      <motion.div className="orbit-ring" animate={{ rotate: 360 }} transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}>
        {['✦', '◈', '◉', '✧'].map((s, i) => (
          <span key={i} className="orbit-node" style={{ '--i': i }}>{s}</span>
        ))}
      </motion.div>
      <div className="orbit-center">Ds</div>
    </div>
    <motion.div className="design-cursor" animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.85, repeat: Infinity }}>|</motion.div>
  </div>
);

/* Featured center card — "Everything in one place" style */
const FeaturedCard = () => (
  <motion.div className="bento-card bento-featured"
    initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}
    whileHover={{ y: -6, transition: { duration: 0.3 } }}
  >
    <div className="featured-inner">
      <motion.div className="featured-glow"
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="featured-tag">// ALL-IN-ONE</div>
      <h3 className="featured-title">Everything<br />in One Place</h3>
      <p className="featured-desc">Video. Web. Brand. Design. One collective. Zero compromise.</p>
      <a href="#contact" className="featured-cta">Start a Project <span>↗</span></a>
    </div>
    <div className="bento-glow" />
  </motion.div>
);

/* Bottom-right card — branding visual */
const BrandingCard = () => (
  <motion.div className="bento-card bento-branding"
    initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.35 }}
    whileHover={{ y: -6, transition: { duration: 0.3 } }}
  >
    <div className="bento-text-section">
      <span className="bento-icon">◈</span>
      <h3 className="bento-title">Branding</h3>
      <p className="bento-desc">Cohesive brand identity crafted with purpose.</p>
      <a href="#contact" className="bento-see-more">See More <span className="bento-see-more-arrow">↗</span></a>
    </div>
    <div className="bento-visual-section">
      <div className="branding-visual">
        {['#00f5d4', '#c084fc', '#6366f1', '#facc15'].map((c, i) => (
          <motion.div key={i} className="brand-swatch-card"
            style={{ background: c, borderRadius: 8 }}
            animate={{ y: [0, -5, 0], rotate: [i % 2 === 0 ? -3 : 3, 0, i % 2 === 0 ? -3 : 3] }}
            transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
          />
        ))}
      </div>
    </div>
    <div className="bento-glow" />
  </motion.div>
);

/* ── Main HeroSection ───────────────────────────────────────── */
const HeroSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const imageY = useTransform(scrollYProgress, [0, 0.5], ['20%', '-20%']);
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);

  const scrollToContact = () => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });

  const services = [
    {
      id: 'video', title: 'Video Production',
      description: 'Cinematic storytelling through color grading, VFX, and motion graphics.',
      icon: '🎬', features: ['4K Editing', 'VFX & Motion', 'Color Grading'],
      Micro: VideoCard, link: '#contact'
    },
    {
      id: 'web', title: 'Web Engineering',
      description: 'Blazing fast, SEO-optimized experiences. Built for scale and total immersion.',
      icon: '💻', features: ['WebGL', 'Next.js', 'Performance'],
      Micro: WebCard, link: '#contact'
    },
    {
      id: 'design', title: 'Digital Brutalism',
      description: 'User-centric interfaces that convert and premium brand identities.',
      icon: '✦', features: ['Brand Identity', 'Micro-Interactions'],
      Micro: DesignCard, link: '#contact'
    }
  ];

  const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.05 } }
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="agency-landing" ref={containerRef}>

      {/* SOFT AURORA BG */}
      <div className="hero-pillar-bg" aria-hidden="true">
        <SoftAurora
          speed={0.6}
          scale={1.5}
          brightness={1}
          color1="#00f5d4"
          color2="#e100ff"
          noiseFrequency={2.5}
          noiseAmplitude={1}
          bandHeight={0.5}
          bandSpread={1}
          octaveDecay={0.1}
          layerOffset={0}
          colorSpeed={1}
          enableMouseInteraction
          mouseInfluence={0.25}
        />
      </div>
      <div className="cyber-glow-top" />

      {/* ─── 1. HERO ─── */}
      <motion.div className="hero-fullscreen" style={{ y: heroY, opacity: heroOpacity }}>
        <motion.div className="hero-content" variants={stagger} initial="hidden" animate="visible">
          <motion.div className="hero-badge" variants={fadeUp}>
            <span className="hero-badge__indicator" />BRANDEDCUT AGENCY // 2026
          </motion.div>
          <motion.h1 className="hero-title" variants={fadeUp}>
            We Create <br /><span className="text-kinetic">Digital Experiences.</span>
          </motion.h1>
          <motion.p className="hero-desc" variants={fadeUp}>
            A premium digital collective turning complex technical challenges into immersive, high-converting digital realities.
          </motion.p>
          <motion.div className="hero-actions" variants={fadeUp}>
            <button className="magnetic-btn primary-btn" onClick={scrollToContact}>INITIATE PROJECT</button>
          </motion.div>
        </motion.div>
      </motion.div>

      <div className="agency-container">

        {/* ─── 2. SHOWCASE ─── */}
        <motion.div className="showcase-wrapper" style={{ y: imageY, scale: imageScale }}>
          <div className="showcase-inner">
            <img src={showcaseImageMain} alt="Agency Showcase" className="showcase-img" />
            <div className="showcase-overlay-cyber" />
          </div>
        </motion.div>

        {/* ─── 3. BENTO GRID ─── */}
        <div className="bento-services-wrapper">
          <motion.div className="services-header"
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }} transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <span className="section-label-cyber">// EXPERTISE</span>
            <h2 className="section-title-cyber">
              SYSTEMS BUILT FOR <span className="text-neon">IMPACT.</span>
            </h2>
          </motion.div>

          {/* 3-column grid — row 1: Video (col1 rowspan2) | Web (col2) | Design (col3)
                             row 2:                         | Featured  | Branding        */}
          <motion.div className="bento-grid" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-8%' }}>

            {/* ── Video — left col, spans 2 rows ── */}
            <motion.div className="bento-card bento-video" variants={fadeUp}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
            >
              <div className="bento-text-section">
                <span className="bento-icon">{services[0].icon}</span>
                <h3 className="bento-title">{services[0].title}</h3>
                <p className="bento-desc">{services[0].description}</p>
                <div className="bento-tags">
                  {services[0].features.map((f, i) => <span key={i} className="bento-tag">{f}</span>)}
                </div>
                <a href={services[0].link} className="bento-see-more">See More <span className="bento-see-more-arrow">↗</span></a>
              </div>
              <div className="bento-visual-section"><VideoCard /></div>
              <div className="bento-glow" />
              <div className="bento-border-sweep" />
            </motion.div>

            {/* ── Web — center top ── */}
            <motion.div className="bento-card bento-web" variants={fadeUp}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
            >
              <div className="bento-text-section">
                <span className="bento-icon">{services[1].icon}</span>
                <h3 className="bento-title">{services[1].title}</h3>
                <p className="bento-desc">{services[1].description}</p>
                <div className="bento-tags">
                  {services[1].features.map((f, i) => <span key={i} className="bento-tag">{f}</span>)}
                </div>
                <a href={services[1].link} className="bento-see-more">See More <span className="bento-see-more-arrow">↗</span></a>
              </div>
              <div className="bento-visual-section"><WebCard /></div>
              <div className="bento-glow" />
              <div className="bento-border-sweep" />
            </motion.div>

            {/* ── Design — right top ── */}
            <motion.div className="bento-card bento-design" variants={fadeUp}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
            >
              <div className="bento-text-section">
                <span className="bento-icon">{services[2].icon}</span>
                <h3 className="bento-title">{services[2].title}</h3>
                <p className="bento-desc">{services[2].description}</p>
                <div className="bento-tags">
                  {services[2].features.map((f, i) => <span key={i} className="bento-tag">{f}</span>)}
                </div>
                <a href={services[2].link} className="bento-see-more">See More <span className="bento-see-more-arrow">↗</span></a>
              </div>
              <div className="bento-visual-section"><DesignCard /></div>
              <div className="bento-glow" />
              <div className="bento-border-sweep" />
            </motion.div>

            {/* ── Featured center card — row 2 col 2 ── */}
            <FeaturedCard />

            {/* ── Branding — row 2 col 3 ── */}
            <BrandingCard />

          </motion.div>
        </div>

        {/* ─── 4. INFINITE SPHERE ─── */}
        <div className="infinite-menu-section">
          <motion.div className="infinite-menu-header"
            initial={{ y: 60, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: '-10%' }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="section-label-cyber">// FEATURED WORK</span>
            <h2 className="section-title-cyber">SPIN THE <span className="text-neon">ARCHIVE.</span></h2>
            <p className="infinite-menu-subtitle">Drag to explore. Click to visit.</p>
          </motion.div>
          <motion.div className="infinite-menu-canvas-wrapper"
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-10%' }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <InfiniteMenu
              items={[
                { image: 'https://picsum.photos/600/600?grayscale&random=1', link: 'https://my-portfolio-two-cyan-79.vercel.app/', title: 'TechFlow', description: 'React Analytics Dashboard' },
                { image: 'https://picsum.photos/600/600?grayscale&random=2', link: 'https://petv-88-g8qr.vercel.app/', title: "McDonald's", description: 'E-Commerce Next.js' },
                { image: 'https://picsum.photos/600/600?grayscale&random=3', link: 'https://www.behance.net/gallery/238365077', title: 'EcoVision', description: 'Brand Identity' },
                { image: 'https://picsum.photos/600/600?grayscale&random=4', link: 'https://www.figma.com/file/3X4LDeFadKoiCbNQU0fZ9h', title: 'Minimalist UI', description: 'App Design System' }
              ]}
              scale={1}
            />
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default HeroSection;