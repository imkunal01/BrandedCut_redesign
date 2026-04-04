import React, { useEffect, useMemo, useRef, useState } from 'react';
import './PhoneShowcaseSection.css';

const phoneItems = [
  { id: 1, label: 'Gaming', placeholder: 'GIF Placeholder 01', accent: 'a1' },
  { id: 2, label: 'E-commerce', placeholder: 'GIF Placeholder 02', accent: 'a2' },
  { id: 3, label: 'Finance', placeholder: 'GIF Placeholder 03', accent: 'a3' },
  { id: 4, label: 'SaaS & B2B', placeholder: 'GIF Placeholder 04', accent: 'a4' },
  { id: 5, label: 'Lifestyle', placeholder: 'GIF Placeholder 05', accent: 'a5' },
  { id: 6, label: 'Healthcare', placeholder: 'GIF Placeholder 06', accent: 'a6' },
  { id: 7, label: 'Gaming', placeholder: 'GIF Placeholder 07', accent: 'a7' },
  { id: 8, label: 'E-commerce', placeholder: 'GIF Placeholder 08', accent: 'a8' },
  { id: 9, label: 'Finance', placeholder: 'GIF Placeholder 09', accent: 'a9' },
  { id: 10, label: 'SaaS & B2B', placeholder: 'GIF Placeholder 10', accent: 'a10' },
];

const testimonials = [
  {
    id: 1,
    name: 'Farah Al-Eryani',
    handle: '@drsmile.nl',
    quote: 'The ad performance was outstanding. They moved fast, stayed focused, and delivered exactly what was needed.',
  },
  {
    id: 2,
    name: 'Annelise Falzer',
    handle: '@miracle.brand',
    quote: 'Communication and execution were top-tier. Every sprint had clear outcomes and measurable creative wins.',
  },
  {
    id: 3,
    name: 'Tiana Westwood',
    handle: '@sittingprettyhalohair',
    quote: 'They understand social trend velocity and still keep strategy sharp. Results felt intentional, not random.',
  },
  {
    id: 4,
    name: 'Alex Georgiades',
    handle: '@wiseaccount',
    quote: 'Rare mix of creative intuition and paid media clarity. Fast testing loop and strong conversion outcomes.',
  },
  {
    id: 5,
    name: 'Laurence Dochy',
    handle: '@loopearplugs',
    quote: 'They quickly understood the product and audience. The campaigns became more structured and scalable.',
  },
  {
    id: 6,
    name: 'Donna Ledwidge',
    handle: '@keyforher',
    quote: 'From concept to performance edits, the process was clean and collaborative. Great quality at speed.',
  },
];

const CLONES = 5;

const PhoneShowcaseSection = () => {
  const trackRef = useRef(null);
  const [stepSize, setStepSize] = useState(260);
  const [isAnimating, setIsAnimating] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [index, setIndex] = useState(CLONES);

  const extendedItems = useMemo(
    () => [
      ...phoneItems.slice(-CLONES),
      ...phoneItems,
      ...phoneItems.slice(0, CLONES),
    ],
    []
  );

  useEffect(() => {
    const measureStep = () => {
      if (!trackRef.current) return;
      const firstSlide = trackRef.current.querySelector('.phone-slide');
      if (!firstSlide) return;

      const trackStyles = window.getComputedStyle(trackRef.current);
      const gapRaw = trackStyles.gap || trackStyles.columnGap || '0px';
      const gap = Number.parseFloat(gapRaw) || 0;
      const width = firstSlide.getBoundingClientRect().width || firstSlide.offsetWidth;

      if (width > 0) {
        setStepSize(width + gap);
      }
    };

    measureStep();
    window.addEventListener('resize', measureStep);
    return () => window.removeEventListener('resize', measureStep);
  }, []);

  useEffect(() => {
    if (isPaused) return undefined;

    const timer = window.setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 2400);

    return () => window.clearInterval(timer);
  }, [isPaused]);

  const jumpWithoutAnimation = (nextIndex) => {
    setIsAnimating(false);
    setIndex(nextIndex);
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => setIsAnimating(true));
    });
  };

  const handleTransitionEnd = () => {
    const total = phoneItems.length;
    if (index >= total + CLONES) {
      jumpWithoutAnimation(CLONES);
      return;
    }
    if (index < CLONES) {
      jumpWithoutAnimation(total + CLONES - 1);
    }
  };

  const handlePrev = () => {
    setIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    setIndex((prev) => prev + 1);
  };

  return (
    <section className="phone-showcase" aria-label="Mobile creative showcase">
      <div className="phone-showcase__container">
        <header className="phone-showcase__header">
          <h2>Move fast, test smarter, with data-backed creative and media execution</h2>
          <p>
            We combine strategy and paid media execution to ship high-performing creative across verticals.
          </p>
          <a className="phone-showcase__cta" href="/portfolio">View Portfolio</a>
        </header>

        <div
          className="phone-showcase__carousel-shell"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <button
            type="button"
            className="phone-showcase__arrow phone-showcase__arrow--left"
            onClick={handlePrev}
            aria-label="Previous phone"
          >
            <span aria-hidden="true">&#8592;</span>
          </button>

          <button
            type="button"
            className="phone-showcase__arrow phone-showcase__arrow--right"
            onClick={handleNext}
            aria-label="Next phone"
          >
            <span aria-hidden="true">&#8594;</span>
          </button>

          <div className="phone-showcase__viewport">
            <div
              className="phone-showcase__track"
              ref={trackRef}
              style={{
                transform: `translate3d(${-index * stepSize}px, 0, 0)`,
                transition: isAnimating ? 'transform 720ms cubic-bezier(0.22, 1, 0.36, 1)' : 'none',
              }}
              onTransitionEnd={handleTransitionEnd}
              role="list"
            >
              {extendedItems.map((item, itemIndex) => (
                <article className="phone-slide" key={`${item.id}-${itemIndex}`} role="listitem">
                  <span className="phone-card__tag">{item.label}</span>

                  <div className="phone-frame">
                    <div className="phone-frame__status" aria-hidden="true" />
                    <div className="phone-frame__screen">
                      <div className={`phone-frame__placeholder ${item.accent}`}>
                        <span>{item.placeholder}</span>
                        <small>Drop GIF or vertical MP4</small>
                      </div>
                    </div>
                    <div className="phone-frame__home" aria-hidden="true" />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        <section className="phone-showcase__testimonials" aria-label="Client testimonials">
          <h3>Trusted by 500+ leading performance brands</h3>

          <div className="phone-showcase__bento" role="list">
            {testimonials.map((testimonial) => (
              <article className="testimonial-tile" key={testimonial.id} role="listitem">
                <div className="testimonial-tile__top">
                  <div className="testimonial-tile__avatar" aria-hidden="true">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <strong>{testimonial.name}</strong>
                    <span>{testimonial.handle}</span>
                  </div>
                </div>
                <p>{testimonial.quote}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
};

export default PhoneShowcaseSection;
