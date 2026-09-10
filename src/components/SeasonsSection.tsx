import { useTranslations, useMessages } from 'next-intl';

type Row = { title: string; window: string; weather: string; nature: string; advice: string };

export default function SeasonsSection() {
  const t = useTranslations('seasons');
  const messages = useMessages() as any;
  const colHeaders = (messages?.seasons?.colHeaders || []) as string[];
  const rows = (messages?.seasons?.rows || []) as Row[];

  return (
    <section id="seasons" className="section-padding" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-5xl mx-auto">
        <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
          {t('title')}
        </h2>
        <p className="mb-8 text-sm max-w-2xl" style={{ color: 'var(--text-muted)' }}>{t('subtitle')}</p>
        <div className="w-12 h-0.5 mb-8" style={{ background: 'var(--accent)' }} />

        <div className="rounded-xl overflow-x-auto" style={{ border: '1px solid var(--border-color)' }}>
          <table className="w-full min-w-[760px] text-sm" style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--bg-tertiary)' }}>
                {colHeaders.map((h, i) => (
                  <th
                    key={i}
                    className="text-left font-display font-semibold px-5 py-4 whitespace-nowrap"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} style={{ background: 'var(--card-bg)', borderTop: '1px solid var(--border-color)' }}>
                  <td className="px-5 py-4 align-top whitespace-nowrap">
                    <span className="font-medium" style={{ color: 'var(--accent)' }}>{row.title}</span>
                    <span className="block text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{row.window}</span>
                  </td>
                  <td className="px-5 py-4 align-top" style={{ color: 'var(--text-secondary)' }}>{row.weather}</td>
                  <td className="px-5 py-4 align-top" style={{ color: 'var(--text-secondary)' }}>{row.nature}</td>
                  <td className="px-5 py-4 align-top" style={{ color: 'var(--text-secondary)' }}>{row.advice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-6 text-sm leading-relaxed flex items-start gap-2" style={{ color: 'var(--text-muted)' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0 mt-0.5">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4M12 16h.01" />
          </svg>
          {t('note')}
        </p>
      </div>
    </section>
  );
}
