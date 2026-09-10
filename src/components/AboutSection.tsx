import { useTranslations } from 'next-intl';

/**
 * 正文语义绑定：首段等位声明 + 地理面包屑
 * 对应模版：H2 "About {{ATTRACTION_FULL_NAME}}"、4.1 首段等位声明、4.2 地理面包屑
 */
export default function AboutSection() {
  const t = useTranslations('seo');
  const crumbs = (t.raw('crumbs') as string[]) || [];

  return (
    <section id="about" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('aboutTitle')}
        </h2>
        <div className="w-12 h-0.5 mb-8" style={{ background: 'var(--accent)' }} />

        <p
          className="text-lg leading-relaxed mb-10"
          style={{ color: 'var(--text-secondary)' }}
          dangerouslySetInnerHTML={{
            __html: t('aboutLead').replace(/\*\*(.*?)\*\*/g, '<strong style="color: var(--text-primary)">$1</strong>'),
          }}
        />

        {/* 地理归属层级：全称 → 城市 → 省/州 → 国家 */}
        <div className="flex flex-wrap items-center gap-2 rounded-xl p-5" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" className="flex-shrink-0">
            <polygon points="3 11 22 2 13 21 11 13 3 11"/>
          </svg>
          <span className="text-sm mr-2" style={{ color: 'var(--text-muted)' }}>{t('crumbLabel')}</span>
          {crumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-2">
              {i > 0 && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              )}
              <span
                className={`text-sm px-3 py-1 rounded-full ${i === 0 ? 'font-semibold' : ''}`}
                style={
                  i === 0
                    ? { background: 'var(--accent)', color: '#fff' }
                    : { background: 'var(--bg-primary)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)' }
                }
              >
                {crumb}
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
