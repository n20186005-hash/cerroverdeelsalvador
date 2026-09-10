import { useTranslations, useMessages } from 'next-intl';

type Card = { title: string; body: string };
type Item = { title: string; body: string };

export default function ScienceSection() {
  const t = useTranslations('science');
  const messages = useMessages() as any;
  const topics = (messages?.science?.topics || []) as Card[];
  const duties = (messages?.science?.duties || []) as string[];

  return (
    <section id="science" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-5xl mx-auto">
        <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
          {t('title')}
        </h2>
        <p className="mb-8 text-sm max-w-2xl" style={{ color: 'var(--text-muted)' }}>{t('subtitle')}</p>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        {/* 科普话题 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {topics.map((topic, i) => (
            <div
              key={i}
              className="rounded-xl p-6 flex flex-col gap-3"
              style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', boxShadow: 'var(--card-shadow)' }}
            >
              <span className="font-display text-2xl font-bold" style={{ color: 'var(--accent)' }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="font-display text-lg font-semibold leading-snug" style={{ color: 'var(--text-primary)' }}>{topic.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{topic.body}</p>
            </div>
          ))}
        </div>

        {/* 访客责任 */}
        <div className="rounded-xl p-6 sm:p-8" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}>
          <h3 className="font-display text-xl font-semibold mb-5" style={{ color: 'var(--text-primary)' }}>{t('dutyTitle')}</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {duties.map((duty, i) => (
              <li key={i} className="flex gap-3 text-sm leading-relaxed">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span style={{ color: 'var(--text-secondary)' }}>{duty}</span>
              </li>
            ))}
          </ul>
        </div>

        {t('note') && (
          <p
            className="mt-8 text-center font-display text-lg font-medium"
            style={{ color: 'var(--text-muted)' }}
          >
            {t('note')}
          </p>
        )}
      </div>
    </section>
  );
}
