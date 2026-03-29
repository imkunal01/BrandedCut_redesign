import React from 'react';
import './MarqueeBar.css';

const ITEMS = [
  '⚡ Web Development',
  '🎨 UI/UX Design',
  '🎬 Video Production',
  '🧠 Brand Strategy',
  '📐 Motion Design',
  '🚀 Performance SEO',
  '💎 Product Design',
  '🌐 Digital Strategy',
];

const MarqueeBar = () => {
  const doubled = [...ITEMS, ...ITEMS];
  return (
    <div className="marquee-bar" aria-hidden="true">
      <div className="marquee-bar__track">
        {doubled.map((item, i) => (
          <span key={i} className="marquee-bar__item">
            {item}
            <span className="marquee-bar__sep">·</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default MarqueeBar;
