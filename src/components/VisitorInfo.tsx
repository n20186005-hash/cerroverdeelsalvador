'use client';

import { useTranslations } from 'next-intl';

export default function VisitorInfo() {
  const t = useTranslations('visitorInfo');

  const cards = [
    {
      icon: (
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      ),
      label: t('hoursLabel'),
      value: t('hoursValue'),
      note: t('hoursNote'),
    },
    {
      icon: (
        <path d="M2 9h13M15 9l-3-3M15 9l-3 3M5 5h9a2 2 0 0 1 2 2v12H4V7a2 2 0 0 1 1-2z" />
      ),
      label: t('entryLabel'),
      value: t('entryValue'),
      note: t('entryNote'),
    },
    {
      icon: (
        <path d="M5 11l1-5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2l1 5M3 11h18v6a1 1 0 0 1-1 1h-1M4 11v6m16-6v6m-9-6v6M6 18v2m12-2v2" />
      ),
      label: t('parkingLabel'),
      value: t('parkingValue'),
      note: t('parkingNote'),
    },
    {
      icon: (
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      ),
      label: t('locationLabel'),
      value: t('locationValue'),
      note: t('locationNote'),
    },
  ];

  return (
    <section id="visitante" className="section-padding" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-5xl mx-auto">
        <h2
          className="font-display text-2xl sm:text-3xl font-semibold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <p className="text-sm mb-8 max-w-2xl" style={{ color: 'var(--text-muted)' }}>
          {t('subtitle')}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {cards.map((card, i) => (
            <div
              key={i}
              className="rounded-2xl p-5 flex flex-col"
              style={{
                background: 'var(--card-bg)',
                boxShadow: 'var(--card-shadow)',
                border: '1px solid var(--border-color)',
              }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center mb-3"
                style={{ background: 'color-mix(in srgb, var(--accent) 14%, transparent)' }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {card.icon}
                </svg>
              </div>
              <span className="text-xs font-medium uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>
                {card.label}
              </span>
              <span className="text-lg font-bold mt-1" style={{ color: 'var(--text-primary)' }}>
                {card.value}
              </span>
              <span className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
                {card.note}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-xs leading-relaxed max-w-2xl" style={{ color: 'var(--text-muted)' }}>
            {t('verifyNote')}
          </p>
          <a
            href="#map"
            className="shrink-0 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all hover:opacity-90"
            style={{ background: 'var(--accent)', color: '#fff' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {t('ctaLabel')}
          </a>
        </div>
      </div>
    </section>
  );
}
