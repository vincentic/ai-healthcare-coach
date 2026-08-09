import type { ReactNode } from 'react';

type SystemNodeIntroProps = {
  icon: ReactNode;
  kicker: string;
  title: string;
  description: string;
  points: string[];
  steps?: Array<{
    title: string;
    detail: string;
  }>;
};

export function SystemNodeIntro({ icon, kicker, title, description, points, steps = [] }: SystemNodeIntroProps) {
  return (
    <section className="system-node-panel-wrapper">
      <div className="system-node-panel">
        <div>
          <p className="page-kicker">{icon} {kicker}</p>
          <h2>{title}</h2>
          <p className="page-intro">{description}</p>
        </div>
        <div className="node-point-grid">
          {points.map((point) => (
            <span key={point}>{point}</span>
          ))}
        </div>
      </div>

      {steps.length > 0 && (
        <div className="node-step-grid">
          {steps.map((step) => (
            <article key={step.title} className="node-step-card">
              <strong>{step.title}</strong>
              <span>{step.detail}</span>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
