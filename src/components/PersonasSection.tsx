import { useTranslations, useMessages } from 'next-intl';

type Persona = {
  name: string;
  audience: string;
  time: string;
  level: string;
  summary: string;
  points: string[];
};

export default function PersonasSection() {
  const t = useTranslations('personas');
  const messages = useMessages() as any;
  const items = (messages?.personas?.items || []) as Persona[];

  return (
    <section id="personas" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-5xl mx-auto">
        <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
          {t('title')}
        </h2>
        <p className="mb-8 text-sm max-w-2xl" style={{ color: 'var(--text-muted)' }}>{t('subtitle')}</p>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <div
              key={i}
              className="rounded-xl p-6 flex flex-col gap-4"
              style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', boxShadow: 'var(--card-shadow)' }}
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-display text-lg font-semibold leading-snug" style={{ color: 'var(--text-primary)' }}>{item.name}</h3>
                <span className="flex-shrink-0 text-xs px-2 py-1 rounded-full" style={{ background: 'var(--bg-tertiary)', color: 'var(--accent)' }}>
                  {item.audience}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-2.5 py-1 rounded-full" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}>
                  {t('timeLabel')}: {item.time}
                </span>
                <span className="px-2.5 py-1 rounded-full" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}>
                  {t('levelLabel')}: {item.level}
                </span>
              </div>

              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{item.summary}</p>

              <ul className="flex flex-col gap-2 text-sm">
                {item.points.map((point, j) => (
                  <li key={j} className="flex gap-2 leading-relaxed">
                    <span className="flex-shrink-0 mt-0.5 w-4 h-4 rounded-full flex items-center justify-center" style={{ background: 'var(--accent)' }}>
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span style={{ color: 'var(--text-secondary)' }}>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
