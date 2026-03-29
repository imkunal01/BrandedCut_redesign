import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './TeamSection.css';

const teamMembers = [
  {
    id: 1, name: 'Alex Johnson', role: 'Creative Director',
    bio: 'Visionary leader with 10+ years in creative direction and brand strategy.',
    initials: 'AJ', accentColor: 'var(--electric)',
    social: { linkedin: '#', twitter: '#', dribbble: '#' }
  },
  {
    id: 2, name: 'Sarah Chen', role: 'Lead Developer',
    bio: 'Full-stack architect passionate about bleeding-edge technology and WebGL.',
    initials: 'SC', accentColor: 'rgba(192,132,252,1)',
    social: { linkedin: '#', github: '#', twitter: '#' }
  },
  {
    id: 3, name: 'Mike Rodriguez', role: 'Motion Director',
    bio: 'Award-winning video editor and motion graphics specialist with a cinematic lens.',
    initials: 'MR', accentColor: 'var(--electric)',
    social: { linkedin: '#', vimeo: '#', instagram: '#' }
  },
  {
    id: 4, name: 'Emma Wilson', role: 'UI/UX Lead',
    bio: 'UX systems designer focused on creating the most precise and intuitive interfaces.',
    initials: 'EW', accentColor: 'rgba(192,132,252,1)',
    social: { linkedin: '#', dribbble: '#', behance: '#' }
  }
];

const socialLabels = { linkedin: 'LI', twitter: 'TW', github: 'GH', dribbble: 'DR', vimeo: 'VI', instagram: 'IG', behance: 'BE' };

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
};
const riseItem = {
  hidden: { y: 80, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
};

const TeamSection = () => {
  const [hovered, setHovered] = useState(null);

  return (
    <section className="team-section">
      <div className="team-container">
        <motion.div className="team-header"
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="section-label-cyber">// THE CREW</span>
          <h2 className="team-title">
            MEET THE <span className="text-kinetic">UNIT.</span>
          </h2>
          <p className="team-subtitle">The creative engineers and digital architects behind BrandedCut.</p>
        </motion.div>

        <motion.div className="team-grid"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-5%' }}
        >
          {teamMembers.map((m) => (
            <motion.div key={m.id} className="team-card" variants={riseItem}
              onHoverStart={() => setHovered(m.id)}
              onHoverEnd={() => setHovered(null)}
              whileHover={{ y: -12 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Avatar */}
              <div className="team-card-avatar-wrap" style={{ '--accent': m.accentColor }}>
                <div className="team-card-avatar">
                  {m.initials}
                </div>
                {/* Animated ring on hover */}
                <motion.div className="team-card-ring"
                  animate={{ opacity: hovered === m.id ? 1 : 0, scale: hovered === m.id ? 1 : 0.8 }}
                  transition={{ duration: 0.4 }}
                  style={{ borderColor: m.accentColor }}
                />
              </div>

              <div className="team-card-info">
                <div className="team-card-role-tag" style={{ color: m.accentColor, borderColor: m.accentColor }}>
                  {m.role}
                </div>
                <h3 className="team-card-name">{m.name}</h3>
                <p className="team-card-bio">{m.bio}</p>
              </div>

              {/* Social links - appears on hover */}
              <motion.div className="team-card-social"
                animate={{ opacity: hovered === m.id ? 1 : 0, y: hovered === m.id ? 0 : 10 }}
                transition={{ duration: 0.3 }}
              >
                {Object.entries(m.social).map(([platform, url]) => (
                  <motion.a key={platform} href={url} className="team-social-btn"
                    style={{ '--btn-color': m.accentColor }}
                    whileHover={{ scale: 1.1, borderColor: m.accentColor }}
                    target="_blank" rel="noopener noreferrer"
                  >
                    {socialLabels[platform]}
                  </motion.a>
                ))}
              </motion.div>

              {/* Background glow */}
              <div className="team-card-glow" style={{ background: `radial-gradient(circle, ${m.accentColor} 0%, transparent 70%)` }} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;
