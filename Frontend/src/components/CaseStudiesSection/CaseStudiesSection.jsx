import React, { useEffect, useState } from 'react';
import { caseStudies } from '../../data/caseStudies';
import './CaseStudiesSection.css';

const AUTO_INTERVAL = 3400;

const mod = (value, total) => (value % total + total) % total;

const CaseStudiesSection = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return undefined;

    const timer = window.setInterval(() => {
      setIndex((prev) => mod(prev + 1, caseStudies.length));
    }, AUTO_INTERVAL);

    return () => window.clearInterval(timer);
  }, [paused]);

  const prev = () => setIndex((prevIndex) => mod(prevIndex - 1, caseStudies.length));
  const next = () => setIndex((prevIndex) => mod(prevIndex + 1, caseStudies.length));

  return (
    <section className="case-studies" id="case-studies" aria-label="Case studies carousel">
      <div className="case-studies__container">
        <header className="case-studies__header">
          <h2>Case Studies</h2>
          <p>See how our ads help brands scale paid social.</p>
        </header>

        <div
          className="case-studies__stage"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <button type="button" className="case-studies__arrow case-studies__arrow--left" onClick={prev} aria-label="Previous case study">
            <span aria-hidden="true">&#8249;</span>
          </button>

          <button type="button" className="case-studies__arrow case-studies__arrow--right" onClick={next} aria-label="Next case study">
            <span aria-hidden="true">&#8250;</span>
          </button>

          <div className="case-studies__viewport">
            {caseStudies.map((item, itemIndex) => {
              const offset = mod(itemIndex - index, caseStudies.length);
              const rel = offset === 0 ? 0 : offset <= caseStudies.length / 2 ? offset : offset - caseStudies.length;
              const isActive = rel === 0;

              return (
                <a
                  key={item.id}
                  href={`/case-studies/${item.slug}`}
                  className={`case-card ${isActive ? 'case-card--active' : ''}`}
                  style={{
                    '--x': rel,
                    '--abs': Math.abs(rel),
                  }}
                  aria-label={`Open case study: ${item.title}`}
                >
                  <img src={item.image} alt={item.title} loading="lazy" />
                  <div className="case-card__overlay" />
                  <div className="case-card__content">
                    <span className="case-card__client">{item.client}</span>
                    <h3>{item.title}</h3>
                    <p>{item.summary}</p>
                    <span className="case-card__cta">Read More</span>
                  </div>
                </a>
              );
            })}
          </div>

          <div className="case-studies__dots" role="tablist" aria-label="Select case study">
            {caseStudies.map((item, dotIndex) => (
              <button
                key={item.id}
                type="button"
                className={`case-dot ${dotIndex === index ? 'case-dot--active' : ''}`}
                onClick={() => setIndex(dotIndex)}
                aria-label={`Show ${item.client} case study`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
