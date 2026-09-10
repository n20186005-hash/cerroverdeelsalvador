import { useTranslations, useMessages } from 'next-intl';

type Plan = {
  title: string;
  time: string;
  level: string;
  summary: string;
  steps: string[];
};

export default function ItinerarySection() {
  const t = useTranslations('itinerary');
  const messages = useMessages() as any;
  const plans = (messages?.itinerary?.plans || []) as Plan[];
  const tips = (messages?.itinerary?.tips || []) as string[];

  return (
    <section id="itinerary" className="section-padding" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-5xl mx-auto">
        <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
          {t('title')}
        </h2>
        <p className="mb-8 text-sm max-w-2xl" style={{ color: 'var(--text-muted)' }}>{t('subtitle')}</p>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {plans.map((plan, i) => (
            <div
              key={i}
              className="rounded-xl p-6 sm:p-8 flex flex-col gap-4"
              style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', boxShadow: 'var(--card-shadow)' }}
            >
              <div>
                <h3 className="font-display text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                  {plan.title}
                </h3>
                <div className="flex flex-wrap gap-2 text-xs mb-4">
                  <span className="px-2.5 py-1 rounded-full" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}>
                    {t('timeLabel')}: {plan.time}
                  </span>
                  <span className="px-2.5 py-1 rounded-full" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}>
                    {t('levelLabel')}: {plan.level}
                  </span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{plan.summary}</p>
              </div>

              <ol className="relative flex flex-col gap-3 pl-6" style={{ color: 'var(--text-secondary)' }}>
                <span className="absolute left-[7px] top-2 bottom-2 w-px" style={{ background: 'var(--border-color)' }} />
                {plan.steps.map((step, j) => (
                  <li key={j} className="relative text-sm leading-relaxed">
                    <span
                      className="absolute -left-6 top-1 w-[15px] h-[15px] rounded-full border-2 flex items-center justify-center text-[9px] font-semibold"
                      style={{ background: 'var(--card-bg)', borderColor: 'var(--accent)', color: 'var(--accent)' }}
                    >
                      {j + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>

        <div
          className="mt-8 rounded-xl px-5 py-4 text-sm leading-relaxed"
          style={{ background: 'var(--bg-tertiary)', borderLeft: '3px solid var(--accent)', color: 'var(--text-secondary)' }}
        >
          {tips.map((tip, i) => (
            <span key={i}>
              {i > 0 && <span className="mx-2" style={{ color: 'var(--accent)' }}>·</span>}
              {tip}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
