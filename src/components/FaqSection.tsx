import { useTranslations, useMessages } from 'next-intl';

type FaqItem = { q: string; a: string };

/**
 * FAQ 可见板块 + FAQPage 结构化数据（与可见内容同源，便于搜索引擎抓取 Featured Snippet）
 */
export default function FaqSection() {
  const t = useTranslations('seo');
  const messages = useMessages() as any;
  const items = (messages?.seo?.faq || []) as FaqItem[];

  const faqLd =
    items.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: items.map((item) => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.a,
            },
          })),
        }
      : null;

  return (
    <section id="faq" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      {/* FAQPage 结构化数据 */}
      {faqLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      )}
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('faqTitle')}
        </h2>
        <p className="mb-8 text-sm max-w-2xl" style={{ color: 'var(--text-muted)' }}>{t('faqSubtitle')}</p>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        <div className="space-y-4">
          {items.map((item, i) => (
            <details
              key={i}
              className="faq-item rounded-xl overflow-hidden"
              style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)' }}
            >
              <summary className="flex items-center justify-between gap-4 cursor-pointer px-5 py-4 sm:px-6 sm:py-5 select-none">
                <span className="font-medium sm:text-lg" style={{ color: 'var(--text-primary)' }}>
                  {item.q}
                </span>
                <span
                  className="faq-icon flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-lg font-light"
                  style={{ background: 'var(--bg-tertiary)', color: 'var(--accent)' }}
                >
                  +
                </span>
              </summary>
              <p
                className="px-5 sm:px-6 pb-5 sm:pb-6 text-sm sm:text-base leading-relaxed"
                style={{ color: 'var(--text-secondary)' }}
              >
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
