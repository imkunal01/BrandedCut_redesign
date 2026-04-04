import React, { useState } from 'react';
import './ProcessSection.css';

const processSteps = [
  {
    id: 1,
    eyebrow: 'THE FOUNDATION OF SUCCESS',
    title: 'Research & Strategy',
    description:
      'We dive into your customer\'s mindset to uncover pain points and emotional motivators. Then we analyze your current ads, competitors, and platform trends to define phase one of your creative testing plan.',
    media:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
    mediaAlt: 'Research dashboard and planning board',
  },
  {
    id: 2,
    eyebrow: 'LIGHTS, CAMERA, ACTION!',
    title: 'Full In-House Production',
    description:
      'We built a custom studio, so we\'re in full control of content creation and delivery speed. Producers handle casting, props, styling, and set design so each shot is planned and executed with precision.',
    media:
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80',
    mediaAlt: 'In-house production setup',
  },
  {
    id: 3,
    eyebrow: 'PERFORMANCE DESIGN EXCELLENCE',
    title: 'Post-Production',
    description:
      'We are not just creatives, but social creatives. Our team blends algorithm insight with performance design best practices to turn raw footage into top-tier ads built for platform conversion.',
    media:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
    mediaAlt: 'Editing and post-production workflow',
  },
  {
    id: 4,
    eyebrow: 'TESTING OUR HYPOTHESIS',
    title: 'Creative Testing',
    description:
      'Every ad creative is a hypothesis that needs to be tested. We intentionally test angles, personas, visuals, and execution styles, then use data to decide what goes to market next.',
    media:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    mediaAlt: 'Campaign testing dashboard',
  },
  {
    id: 5,
    eyebrow: 'THE FEEDBACK LOOP',
    title: 'Analysis & Iteration',
    description:
      'We use custom metrics to analyze each creative, identify what worked and what did not, and continuously optimize the next batch. This keeps media buyers supplied with better-performing assets.',
    media:
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80',
    mediaAlt: 'Creative analysis and iteration',
  },
];

const leftSignals = [
  { title: 'Authenticity', icon: '🛡' },
  { title: 'Social Proof', icon: '⤴' },
  { title: 'Native Content', icon: '🤝' },
];

const rightSignals = [
  { title: 'High-Quality Production', icon: '★' },
  { title: 'Full Execution Control', icon: '☑' },
  { title: 'Experienced Talent', icon: '◔' },
];

const faqs = [
  {
    q: 'What is BrandedCut?',
    a: 'BrandedCut is a creative performance studio that combines strategy, production, and testing to scale paid social outcomes.',
  },
  {
    q: 'Can you work with my existing content?',
    a: 'Yes. We can repurpose your current footage and build new winning variants that fit platform-native formats.',
  },
  {
    q: 'How long will the process take?',
    a: 'Most teams start with strategy and test-ready assets in 2-3 weeks depending on scope and production complexity.',
  },
  {
    q: 'Can I customize content packages?',
    a: 'Absolutely. We tailor output volume, production cadence, and deliverables to your growth stage and budget.',
  },
  {
    q: 'Can I send scripts for video ads?',
    a: 'Yes. You can provide scripts, or we can write and iterate hooks, angles, and variants with your team.',
  },
  {
    q: 'Do you offer revisions?',
    a: 'Yes. Revisions are built into our workflow to ensure each creative batch meets your brand and performance goals.',
  },
];

const ProcessSection = () => {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <section className="process-page" aria-label="Our process">
      <div className="process-page__light">
        <div className="process-page__container">
          <header className="process-page__header">
            <h2>Our Process</h2>
            <p>
              Our team includes strategists, producers, editors, and operators who handle the full process from ideation to final delivery.
            </p>
          </header>

          <div className="timeline" aria-hidden="true" />

          <div className="process-rows">
            {processSteps.map((step, index) => (
              <article
                key={step.id}
                className={`process-row ${index % 2 === 1 ? 'process-row--reverse' : ''}`}
              >
                <figure className="process-row__media">
                  <img src={step.media} alt={step.mediaAlt} loading="lazy" />
                </figure>

                <div className="process-row__center" aria-hidden="true">
                  <span>{step.id}</span>
                </div>

                <div className="process-row__content">
                  <h3>{step.eyebrow}</h3>
                  <h4>{step.title}</h4>
                  <p>{step.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className="process-page__dark">
        <div className="process-page__container process-page__container--narrow">
          <header className="why-header">
            <h2>Why we&rsquo;re different</h2>
            <p>
              Our team combines paid media execution and creative systems so your brand receives high-quality assets with measurable performance.
            </p>
          </header>

          <div className="why-map">
            <div className="why-map__side why-map__side--left">
              {leftSignals.map((item) => (
                <div className="why-node" key={item.title}>
                  <span className="why-node__icon" aria-hidden="true">{item.icon}</span>
                  <span>{item.title}</span>
                </div>
              ))}
            </div>

            <div className="why-map__center">
              <div className="ring ring--one" />
              <div className="ring ring--two" />
              <div className="center-core">!</div>
              <span className="core-chip chip--top">Direct Response</span>
              <span className="core-chip chip--bottom">Data-Driven</span>
            </div>

            <div className="why-map__side why-map__side--right">
              {rightSignals.map((item) => (
                <div className="why-node" key={item.title}>
                  <span className="why-node__icon" aria-hidden="true">{item.icon}</span>
                  <span>{item.title}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="why-pill-row">
            <span>UGC Marketplace</span>
            <span>Studio Production</span>
          </div>
        </div>
      </div>

      <div className="process-page__cta-wrap">
        <div className="process-page__container">
          <section className="process-cta-card" aria-label="Creative team call to action">
            <img
              className="process-cta-card__avatar process-cta-card__avatar--one"
              src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=300&q=80"
              alt="Team member"
              loading="lazy"
            />
            <img
              className="process-cta-card__avatar process-cta-card__avatar--two"
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80"
              alt="Team member"
              loading="lazy"
            />

            <div className="process-cta-card__bubble process-cta-card__bubble--one">Let&rsquo;s split test this!</div>
            <div className="process-cta-card__bubble process-cta-card__bubble--two">Love this script!</div>

            <h3>
              Your on-demand
              <br />
              creatives are standing
              <br />
              by for your next project.
            </h3>
            <p>The experts in creative strategy and production in one place.</p>

            <div className="process-cta-card__actions">
              <a href="/portfolio">View Our Work</a>
              <a href="/contact">Get Started</a>
            </div>
          </section>
        </div>
      </div>

      <div className="process-page__faq-wrap">
        <div className="process-page__container">
          <section className="process-faq" aria-label="Frequently asked questions">
            <h2>Frequently Asked Questions</h2>
            <div className="process-faq__list">
              {faqs.map((item, index) => {
                const isOpen = openFaq === index;
                return (
                  <article key={item.q} className={`faq-item ${isOpen ? 'faq-item--open' : ''}`}>
                    <button
                      type="button"
                      className="faq-item__question"
                      onClick={() => setOpenFaq(isOpen ? -1 : index)}
                      aria-expanded={isOpen}
                    >
                      <span>{item.q}</span>
                      <span className="faq-item__icon" aria-hidden="true">{isOpen ? '−' : '+'}</span>
                    </button>
                    {isOpen ? <p className="faq-item__answer">{item.a}</p> : null}
                  </article>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
