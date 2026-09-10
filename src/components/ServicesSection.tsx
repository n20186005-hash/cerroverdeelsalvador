import { useTranslations, useMessages } from 'next-intl';

type Item = { name: string; description: string };

const iconPaths = [
  // 卫生间/服务
  'M10 4a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM4 21l3-10M7 21l-3.5-14M17 21l3-10M17 21l3.5-14M15 21H7M9.5 11h4.5',
  // 停车
  'M3 19V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v12M3 19h18M3 19v2M21 19v2M9 11h6',
  // 餐饮
  'M18 8h1a4 4 0 0 1 0 8h-1M18 8v13M18 4v4M4 8h14v1a6 6 0 0 1-12 0V8ZM6 21h12',
  // 住宿
  'M3 21h18M3 10h18M5 10V7a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v3M12 7v3',
  // 商超
  'M6 2L4 8M18 2l2 6M4 8h16l-2 12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L4 8ZM4 8c0 2 2 3.5 4 3.5S12 10 12 8s2 3.5 4 3.5S20 10 20 8',
  // 加油充电
  'M12 21V8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v13M3 21h12M5 6V4h4v2M17 12V5a2 2 0 0 0-2-2M19 17a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z',
  // 医疗
  'M9 3h6M10 3v6l-3 6a4 4 0 0 0 10 0l-3-6V3M8 21h8',
];

export default function ServicesSection() {
  const t = useTranslations('services');
  const messages = useMessages() as any;
  const items = (messages?.services?.items || []) as Item[];

  return (
    <section id="services" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-5xl mx-auto">
        <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
          {t('title')}
        </h2>
        <p className="mb-8 text-sm max-w-2xl" style={{ color: 'var(--text-muted)' }}>{t('subtitle')}</p>
        <div className="w-12 h-0.5 mb-8" style={{ background: 'var(--accent)' }} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item, i) => (
            <div
              key={i}
              className="rounded-xl p-6 flex flex-col gap-3"
              style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', boxShadow: 'var(--card-shadow)' }}
            >
              <div className="flex items-center gap-3">
                <span className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--bg-tertiary)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d={iconPaths[i % iconPaths.length]} />
                  </svg>
                </span>
                <h3 className="font-display font-semibold leading-snug" style={{ color: 'var(--text-primary)' }}>{item.name}</h3>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{item.description}</p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-sm leading-relaxed rounded-xl px-5 py-4" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}>
          {t('note')}
        </p>
      </div>
    </section>
  );
}
