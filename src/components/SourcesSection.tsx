import { useTranslations, useMessages } from 'next-intl';

type SourceItem = { name: string; url: string };

/**
 * 资料来源板块（增强 E-E-A-T） + 权威出站链接
 * 对应模版：5. 地图嵌入与权威 .gob / .org 外链
 */
export default function SourcesSection() {
  const t = useTranslations('seo');
  const messages = useMessages() as any;
  const items = (messages?.seo?.sources || []) as SourceItem[];

  return (
    <section id="sources" className="section-padding" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('sourcesTitle')}
        </h2>
        <p className="mb-8 text-sm max-w-2xl" style={{ color: 'var(--text-muted)' }}>{t('sourcesSubtitle')}</p>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        <div
          className="rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8"
          style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--accent)' }}
        >
          <p
            className="text-base leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
            dangerouslySetInnerHTML={{
              __html: (messages?.seo?.sourcesNote || '').replace(/\*\*(.*?)\*\*/g, '<strong style="color: var(--text-primary)">$1</strong>'),
            }}
          />
        </div>

        <ul className="space-y-4">
          {items.map((item, i) => (
            <li key={i}>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-4 rounded-xl px-5 py-4 transition-shadow hover:shadow-md"
                style={{
                  background: 'var(--card-bg)',
                  boxShadow: 'var(--card-shadow)',
                  border: '1px solid var(--border-color)',
                }}
              >
                <span className="text-sm sm:text-base font-medium" style={{ color: 'var(--text-primary)' }}>
                  {item.name}
                </span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="2"
                  className="flex-shrink-0 group-hover:translate-x-0.5 transition-transform"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
