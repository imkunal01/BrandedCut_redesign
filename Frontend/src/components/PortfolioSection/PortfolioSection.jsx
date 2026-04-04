import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import GradualBlur from '../GradualBlur';
import './PortfolioSection.css';

const createMockupImage = (title, colorA, colorB) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1000" viewBox="0 0 1600 1000">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${colorA}"/>
        <stop offset="100%" stop-color="${colorB}"/>
      </linearGradient>
    </defs>
    <rect width="1600" height="1000" fill="url(#bg)"/>
    <rect x="110" y="110" width="1380" height="780" rx="28" fill="#ffffff" fill-opacity="0.92"/>
    <rect x="150" y="170" width="420" height="40" rx="10" fill="#dbeafe"/>
    <rect x="150" y="232" width="560" height="28" rx="8" fill="#e2e8f0"/>
    <rect x="150" y="282" width="500" height="28" rx="8" fill="#e2e8f0"/>
    <rect x="150" y="360" width="1280" height="460" rx="18" fill="#f8fafc" stroke="#cbd5e1"/>
    <text x="150" y="110" fill="#0f172a" font-family="Arial, sans-serif" font-size="44" font-weight="700">${title}</text>
  </svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};

// --- Project Data (PRESERVED) ---
const projects = [
  {
    id: 1,
    title: 'EcoVision Brand Identity',
    category: 'design',
    image: '/api/placeholder/800/600',
    description: 'Complete brand identity design for sustainable energy company',
    tags: ['Branding', 'Logo Design', 'UI/UX'],
    year: '2026',
    embedSrc: 'https://www.behance.net/embed/project/238365077?ilo0=1',
    externalUrl: 'https://www.behance.net/gallery/238365077'
  },
  {
    id: 2,
    title: 'TechFlow Dashboard',
    category: 'web',
    image: createMockupImage('TechFlow Dashboard', '#dcfce7', '#dbeafe'),
    description: 'Modern admin dashboard with real-time analytics engine',
    tags: ['React', 'Dashboard', 'Analytics'],
    year: '2026',
    externalUrl: 'https://my-portfolio-two-cyan-79.vercel.app/'
  },
  {
    id: 3,
    title: 'Cinematic Product Launch',
    category: 'video',
    image: '/api/placeholder/800/600',
    description: 'High-end product launch video with motion graphics',
    tags: ['Video Editing', 'Motion Graphics', 'Color Grading'],
    year: '2025',
    embedSrc: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 4,
    title: 'Mc Donalds E-commerce',
    category: 'web',
    image: createMockupImage('McDonalds E-commerce', '#fee2e2', '#ffedd5'),
    description: 'E-commerce website for a fast-food brand concept',
    tags: ['E-commerce', 'Responsive', 'Next.js'],
    year: '2025',
    externalUrl: 'https://petv-88-g8qr.vercel.app/'
  },
  {
    id: 5,
    title: 'Fashion Week Campaign',
    category: 'video',
    image: '/api/placeholder/800/600',
    description: 'Fashion week promotional video series',
    tags: ['Video Production', 'Fashion', 'Social Media'],
    year: '2025',
    embedSrc: 'https://player.vimeo.com/video/899121855?h=b1368940e4'
  },
  {
    id: 6,
    title: 'Minimalist App UI/UX',
    category: 'design',
    image: '/api/placeholder/800/600',
    description: 'Mobile app UI/UX design for productivity tool',
    tags: ['Mobile App', 'UI/UX', 'Figma'],
    year: '2025',
    embedSrc: 'https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fdesign%2F3X4LDeFadKoiCbNQU0fZ9h%2FUntitled%3Fnode-id%3D0-1%26m%3Ddev%26t%3DdIBXPi3LCnVqR4i6-1',
    externalUrl: 'https://www.figma.com/file/3X4LDeFadKoiCbNQU0fZ9h/Untitled'
  }
];

const filters = [
  { id: 'web', label: 'Web Systems', icon: '💻' },
  { id: 'design', label: 'Brand Identity', icon: '🎨' },
  { id: 'video', label: 'Video & Motion', icon: '🎬' },
];

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { y: 60, opacity: 0, scale: 0.95 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

// --- Sub-Components with Parallax Effects ---

const ParallaxCard = ({ children, className, layoutId }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yParallax = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <motion.div 
      ref={ref}
      className={`cyber-card ${className}`} 
      variants={itemVariants} 
      layout
      style={{ y: yParallax }}
    >
      {children}
    </motion.div>
  );
};

const VideoProject = ({ project }) => (
  <ParallaxCard className="video-card">
    <div className="cyber-card__media-container">
      <iframe
        className="cyber-card__iframe"
        src={project.embedSrc}
        title={project.title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
      />
    </div>
    <div className="cyber-card__info">
      <div className="cyber-card__meta">
        <span className="cyber-card__year">{project.year}</span>
        <span className="cyber-card__category">Motion</span>
      </div>
      <h3 className="cyber-card__title">{project.title}</h3>
      <p className="cyber-card__description">{project.description}</p>
      <div className="cyber-card__tags">
        {project.tags.map((tag, i) => <span key={i} className="cyber-card__tag">{tag}</span>)}
      </div>
      <motion.button
        className="cyber-btn"
        onClick={() => window.open(project.externalUrl || project.embedSrc, '_blank')}
        whileHover={{ scale: 1.05 }}
      >
        VIEW PROJECT
      </motion.button>
    </div>
  </ParallaxCard>
);

const DesignProject = ({ project }) => (
  <ParallaxCard className="design-card">
    <div className="cyber-card__media-container cyber-card__media-container--design">
      <iframe
        className="cyber-card__iframe"
        src={project.embedSrc}
        title={project.title}
        frameBorder="0"
        allowFullScreen
        loading="lazy"
      />
      <div className="glass-overlay"></div>
    </div>
    <div className="cyber-card__info">
      <div className="cyber-card__meta">
        <span className="cyber-card__year">{project.year}</span>
        <span className="cyber-card__category">Identity</span>
      </div>
      <h3 className="cyber-card__title">{project.title}</h3>
      <p className="cyber-card__description">{project.description}</p>
      <div className="cyber-card__tags">
        {project.tags.map((tag, i) => <span key={i} className="cyber-card__tag">{tag}</span>)}
      </div>
      <motion.button
        className="cyber-btn"
        onClick={() => window.open(project.externalUrl, '_blank')}
        whileHover={{ scale: 1.05 }}
      >
        CASE STUDY
      </motion.button>
    </div>
  </ParallaxCard>
);

const WebProject = ({ project }) => (
  <ParallaxCard className="web-card">
    <motion.div 
      className="cyber-card__media-container cyber-card__image-container"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.4 }}
    >
      <img src={project.image} alt={project.title} className="cyber-card__img" loading="lazy" />
      <div className="hover-glitch"></div>
    </motion.div>
    <div className="cyber-card__info">
      <div className="cyber-card__meta">
        <span className="cyber-card__year">{project.year}</span>
        <span className="cyber-card__category">Digital Realities</span>
      </div>
      <h3 className="cyber-card__title">{project.title}</h3>
      <p className="cyber-card__description">{project.description}</p>
      <div className="cyber-card__tags">
        {project.tags.map((tag, i) => <span key={i} className="cyber-card__tag">{tag}</span>)}
      </div>
      <motion.button
        className="cyber-btn primary-cyber-btn"
        onClick={() => window.open(project.externalUrl, '_blank')}
        whileHover={{ scale: 1.05 }}
      >
        LIVELINK
      </motion.button>
    </div>
  </ParallaxCard>
);

const PortfolioSection = () => {
  // Logic PRESERVED from original
  const [activeFilter, setActiveFilter] = useState('web');

  const filteredProjects = projects.filter(project => project.category === activeFilter);

  const getGridClass = (filter) => {
    switch (filter) {
      case 'video': return 'portfolio-cyber--video';
      case 'design': return 'portfolio-cyber--design';
      default: return 'portfolio-cyber--web';
    }
  };

  const renderProject = (project) => {
    switch (project.category) {
      case 'video': return <VideoProject key={project.id} project={project} />;
      case 'design': return <DesignProject key={project.id} project={project} />;
      default: return <WebProject key={project.id} project={project} />;
    }
  };

  return (
    <section id="portfolio" className="portfolio-section">
      <div className="portfolio-section__container">
        <motion.div
          className="portfolio-section__header"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8 }}
        >
          <span className="section-label-cyber">// ARCHIVES</span>
          <h2 className="portfolio-section__title">
            SELECTED <span className="text-kinetic">WORKS.</span>
          </h2>
          <p className="portfolio-section__subtitle">
            A curated database of our engineering and artistic achievements.
          </p>
        </motion.div>

        <motion.div
          className="portfolio-section__tabs"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {filters.map((filter) => (
            <motion.button
              key={filter.id}
              className={`cyber-tab ${activeFilter === filter.id ? 'cyber-tab--active' : ''}`}
              onClick={() => setActiveFilter(filter.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="cyber-tab-icon">{filter.icon}</span>
              <span className="cyber-tab-label">{filter.label}</span>
              <span className="cyber-tab-count">
                [{projects.filter(p => p.category === filter.id).length}]
              </span>
            </motion.button>
          ))}
        </motion.div>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            className={`portfolio-section__grid ${getGridClass(activeFilter)}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -20, transition: { duration: 0.4 } }}
            layout
          >
            {filteredProjects.map(renderProject)}
          </motion.div>
        </AnimatePresence>
        
        <motion.div
          className="portfolio-section__cta"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className="portfolio-section__cta-text">
            READY FOR SCALABLE ARCHITECTURE?
          </p>
          <motion.button
            className="magnetic-btn outline-btn"
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            PING US
          </motion.button>
        </motion.div>
      </div>
      
      <GradualBlur
        target="parent"
        position="bottom"
        height="12rem"
        strength={3}
        divCount={5}
        curve="bezier"
        exponential={true}
        opacity={0.8}
      />
    </section>
  );
};

export default PortfolioSection;