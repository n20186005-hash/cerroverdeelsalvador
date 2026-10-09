import { useTranslations } from 'next-intl';
import { site } from '@/config/site';

export default function Reviews() {
  const t = useTranslations('reviews');

  return (
    <section id="reviews" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-3xl mx-auto text-center">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-8 mx-auto" style={{ background: 'var(--accent)' }} />

        {/* Aggregate rating snapshot (verified Google Maps source) */}
        <div
          className="rounded-2xl p-8 mb-6"
          style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)' }}
        >
          <div className="flex items-center justify-center gap-1.5 mb-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <svg
                key={i}
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill={i <= Math.round(Number(site.rating)) ? '#f0b429' : 'var(--border-color)'}
                stroke="none"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            ))}
          </div>
          <div className="text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>
            {site.rating}
            <span className="text-xl font-medium" style={{ color: 'var(--text-muted)' }}>
              {' '}/ 5
            </span>
          </div>
          <p className="text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>
            {t('sourceNote', { count: site.reviewCount })}
          </p>
        </div>

        <p
          className="text-sm leading-relaxed mb-8 max-w-2xl mx-auto"
          style={{ color: 'var(--text-muted)' }}
        >
          {t('declaration')}
        </p>

        <a
          href={site.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all hover:opacity-90"
          style={{ background: 'var(--accent)', color: '#fff' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span>{t('moreReviews')}</span>
        </a>
      </div>
    </section>
  );
}
