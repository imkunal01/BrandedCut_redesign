import React from 'react';
import { caseStudies } from '../data/caseStudies';
import './CaseStudyDetailPage.css';

const CaseStudyDetailPage = ({ slug }) => {
  const caseStudy = caseStudies.find((item) => item.slug === slug);

  if (!caseStudy) {
    return (
      <section className="case-detail case-detail--missing">
        <div className="case-detail__container">
          <h1>Case Study Not Found</h1>
          <p>The page you are looking for does not exist yet.</p>
          <a href="/">Back to Home</a>
        </div>
      </section>
    );
  }

  return (
    <section className="case-detail" aria-label="Case study detail">
      <div className="case-detail__container">
        <a className="case-detail__back" href="/">Back to Home</a>

        <header className="case-detail__header">
          <span>{caseStudy.client}</span>
          <h1>{caseStudy.title}</h1>
          <p>{caseStudy.summary}</p>
        </header>

        <figure className="case-detail__hero">
          <img src={caseStudy.image} alt={caseStudy.title} />
        </figure>

        <div className="case-detail__stats">
          <article>
            <h2>{caseStudy.metric}</h2>
            <p>{caseStudy.metricLabel}</p>
          </article>
          <article>
            <h3>Challenge</h3>
            <p>{caseStudy.challenge}</p>
          </article>
          <article>
            <h3>Approach</h3>
            <p>{caseStudy.approach}</p>
          </article>
          <article>
            <h3>Outcome</h3>
            <p>{caseStudy.outcome}</p>
          </article>
        </div>
      </div>
    </section>
  );
};

export default CaseStudyDetailPage;
