'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  WeatherData,
  fetchWeatherData,
  readWeatherCache,
  writeWeatherCache,
  wmoCategory,
  WeatherKind,
} from '@/lib/weather';
import WeatherAdvice from './WeatherAdvice';

/* ---------- 天气图标（轻量内联 SVG） ---------- */
const glyphProps = {
  width: 22,
  height: 22,
  viewBox: '0 0 48 48',
  fill: 'none',
  strokeWidth: 2.4,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

function Glyph({ kind }: { kind: WeatherKind }) {
  const common = { ...glyphProps };
  switch (kind) {
    case 'sunny':
      return (
        <svg {...common} stroke="#f0b429">
          <circle cx="24" cy="24" r="9" fill="#f0b429" stroke="none" />
          <path d="M24 4v6M24 38v6M4 24h6M38 24h6M9.9 9.9l4.2 4.2M33.9 33.9l4.2 4.2M38.1 9.9l-4.2 4.2M14.1 33.9l-4.2 4.2" />
        </svg>
      );
    case 'partly':
      return (
        <svg {...common}>
          <circle cx="31" cy="16" r="6" fill="#f0b429" stroke="none" />
          <path d="M31 5v3M31 24v3M20 16h3M39 16h3M23.4 8.4l2.1 2.1M37.5 22.5l2.1 2.1" stroke="#f0b429" />
          <path d="M34 44H15a9 9 0 0 1-3.4-17.3A12.5 12.5 0 0 1 35.6 26 9 9 0 0 1 34 44Z" fill="#dce5ff" stroke="#a9c1ff" />
        </svg>
      );
    case 'cloudy':
    case 'overcast':
      return (
        <svg {...common} stroke="#a9c1ff">
          <path d="M32 41H14a8.5 8.5 0 0 1-3.6-16.2A11.5 11.5 0 0 1 33 22.8 8.8 8.8 0 0 1 32 41Z" fill="#dce5ff" stroke="#a9c1ff" />
        </svg>
      );
    case 'fog':
      return (
        <svg {...common} stroke="#b8c4e0">
          <path d="M31 30H13a7.5 7.5 0 0 1-3-14.3A10.5 10.5 0 0 1 31.6 16 7.6 7.6 0 0 1 31 30Z" fill="#e3e9f5" stroke="#b8c4e0" />
          <path d="M12 36h24M14 40h20M16 44h16" stroke="#8fa0c4" />
        </svg>
      );
    case 'drizzle':
      return (
        <svg {...common} stroke="#8fb0f7">
          <path d="M30 30H13a7.5 7.5 0 0 1-2.7-14.5A11 11 0 0 1 32 17.2 8.3 8.3 0 0 1 30 30Z" fill="#dce5ff" stroke="#8fb0f7" />
          <path d="M18 36l-2 4M26 36l-2 4M34 36l-2 4" stroke="#6d9bff" strokeWidth="2.6" />
        </svg>
      );
    case 'rain':
      return (
        <svg {...common} stroke="#6d9bff">
          <path d="M30 28H13a7.5 7.5 0 0 1-2.7-14.5A11 11 0 0 1 32 15.2 8.3 8.3 0 0 1 30 28Z" fill="#d0def7" stroke="#6d9bff" />
          <path d="M16 34l-3 6M25 34l-3 6M34 34l-3 6" stroke="#4c82e8" strokeWidth="2.6" />
        </svg>
      );
    case 'showers':
      return (
        <svg {...common} stroke="#4c82e8">
          <path d="M31 30H14a8 8 0 0 1-2.9-15.5A11.5 11.5 0 0 1 33 18.5 8.6 8.6 0 0 1 31 30Z" fill="#d0def7" stroke="#4c82e8" />
          <path d="M20 24c0 3 1.5 4.5 1.5 6 0 1.8-1.5 3.3-1.5 3.3s-1.5-1.5-1.5-3.3c0-1.5 1.5-3 1.5-6ZM30 24c0 3 1.5 4.5 1.5 6 0 1.8-1.5 3.3-1.5 3.3s-1.5-1.5-1.5-3.3c0-1.5 1.5-3 1.5-6Z" fill="#4c82e8" stroke="none" />
        </svg>
      );
    case 'thunder':
      return (
        <svg {...common} stroke="#6d9bff">
          <path d="M31 28H13a8 8 0 0 1-2.8-15.5A11 11 0 0 1 32.6 15 8.4 8.4 0 0 1 31 28Z" fill="#e8edfb" stroke="#6d9bff" />
          <path d="M23 30l-6 10h6l-3 8 10-12h-6l4-6z" fill="#f0b429" stroke="#f0a812" strokeWidth="1.8" />
        </svg>
      );
    case 'snow':
      return (
        <svg {...common} stroke="#8fb0f7">
          <path d="M30 29H13a7.5 7.5 0 0 1-2.7-14.5A11 11 0 0 1 32 16.2 8.3 8.3 0 0 1 30 29Z" fill="#e3e9f5" stroke="#8fb0f7" />
          <g stroke="#8fb0f7" strokeWidth="2.2">
            <path d="M19 36l4 4M23 36l-4 4" />
            <path d="M27 36l4 4M31 36l-4 4" />
            <path d="M35 36l4 4M39 36l-4 4" />
          </g>
        </svg>
      );
    case 'freezing':
      return (
        <svg {...common} stroke="#8fb0f7">
          <path d="M30 28H13a7.5 7.5 0 0 1-2.7-14.5A11 11 0 0 1 32 15.2 8.3 8.3 0 0 1 30 28Z" fill="#e3e9f5" stroke="#8fb0f7" />
          <path d="M22 38v8M18 42h8" stroke="#4c82e8" strokeWidth="2.2" />
        </svg>
      );
  }
}

/* ---------- 工具 ---------- */
const INTl_LOCALES: Record<string, string> = {
  zh: 'zh-CN',
  en: 'en',
  es: 'es',
};

function fmtDay(dateStr: string, locale: string) {
  const d = new Date(dateStr + 'T12:00:00');
  const l = INTl_LOCALES[locale] || 'zh-CN';
  const wd = d.toLocaleDateString(l, { weekday: 'short' });
  const md = d.toLocaleDateString(l, { month: 'short', day: 'numeric' });
  return { wd, md };
}

function KindBadge({ kind, t }: { kind: WeatherKind; t: (key: string) => string }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
      style={{ background: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}
    >
      <Glyph kind={kind} />
      {t(`cond.${kind}`)}
    </span>
  );
}

/* ---------- 组件 ---------- */
export default function WeatherWidget({
  locale,
  initial,
}: {
  locale: string;
  initial: WeatherData | null;
}) {
  const t = useTranslations('weather');
  const [data, setData] = useState<WeatherData | null>(initial);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let alive = true;

    async function refresh() {
      const cached = readWeatherCache();
      if (cached) {
        if (alive) {
          setData(cached);
          setFailed(false);
        }
        return;
      }
      const fresh = await fetchWeatherData();
      if (!fresh) {
        if (alive) setFailed(true);
        return;
      }
      writeWeatherCache(fresh);
      if (alive) {
        setData(fresh);
        setFailed(false);
      }
    }

    refresh();
    const timer = window.setInterval(refresh, 30 * 60 * 1000);
    return () => {
      alive = false;
      window.clearInterval(timer);
    };
  }, []);

  if (!data || !data.current) {
    return (
      <div
        className="rounded-xl p-8 text-center text-sm"
        style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}
      >
        {failed ? t('unavailable') : t('loading')}
      </div>
    );
  }

  const cur = data.current;
  const today = data.daily[0];
  const condNow = wmoCategory(cur.code);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      {/* 当前实况 */}
      <div
        className="lg:col-span-2 rounded-xl p-6 flex flex-col gap-5"
        style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', boxShadow: 'var(--card-shadow)' }}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm mb-1" style={{ color: 'var(--text-muted)' }}>{t('current')}</p>
            <div className="flex items-end gap-2">
              <span className="font-display text-5xl font-semibold leading-none" style={{ color: 'var(--text-primary)' }}>
                {Math.round(cur.temp)}
              </span>
              <span className="text-2xl mb-0.5" style={{ color: 'var(--text-muted)' }}>°C</span>
            </div>
          </div>
          <span className="flex-shrink-0 w-14 h-14 flex items-center justify-center rounded-2xl" style={{ background: 'var(--bg-tertiary)' }}>
            <Glyph kind={condNow} />
          </span>
        </div>

        <KindBadge kind={condNow} t={(k) => t(k)} />

        <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
          <span className="flex justify-between gap-2">
            <span style={{ color: 'var(--text-muted)' }}>{t('feels')}</span>
            <b style={{ color: 'var(--text-primary)' }}>{Math.round(cur.feels)}°C</b>
          </span>
          <span className="flex justify-between gap-2">
            <span style={{ color: 'var(--text-muted)' }}>{t('humidity')}</span>
            <b style={{ color: 'var(--text-primary)' }}>{Math.round(cur.humidity)}%</b>
          </span>
          <span className="flex justify-between gap-2">
            <span style={{ color: 'var(--text-muted)' }}>{t('wind')}</span>
            <b style={{ color: 'var(--text-primary)' }}>{Math.round(cur.wind)} {t('windUnit')}</b>
          </span>
          <span className="flex justify-between gap-2">
            <span style={{ color: 'var(--text-muted)' }}>{t('precipitation')}</span>
            <b style={{ color: 'var(--text-primary)' }}>{cur.precip > 0 ? `${cur.precip.toFixed(1)} mm` : t('precipNone')}</b>
          </span>
        </div>

        {cur.time && (
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            {t('updated')} {cur.time.length >= 16 ? cur.time.slice(11, 16) : cur.time}
          </p>
        )}
      </div>

      {/* 未来多日预报 */}
      <div className="lg:col-span-3 rounded-xl p-6" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', boxShadow: 'var(--card-shadow)' }}>
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-display text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>{t('forecastTitle')}</h3>
          <span className="text-xs px-2.5 py-1 rounded-full" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-muted)' }}>
            {t('forecastDays', { count: data.daily.length })}
          </span>
        </div>

        <ul className="divide-y" style={{ borderColor: 'var(--border-color)' }}>
          {data.daily.map((d, i) => {
            const kind = wmoCategory(d.code);
            const { wd, md } = fmtDay(d.date, locale);
            return (
              <li key={d.date} className="py-3 flex items-center gap-3" style={{ borderColor: 'var(--border-color)' }}>
                <div className="w-16 flex-shrink-0">
                  <p className="text-sm font-medium" style={{ color: i === 0 ? 'var(--accent)' : 'var(--text-primary)' }}>
                    {i === 0 ? t('today') : wd}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{md}</p>
                </div>
                <span className="w-9 h-9 flex-shrink-0 flex items-center justify-center">
                  <Glyph kind={kind} />
                </span>
                <div className="hidden sm:block flex-1 min-w-0 text-xs" style={{ color: 'var(--text-muted)' }}>
                  {t(`cond.${kind}`)}
                </div>
                <div className="flex-1 text-right flex items-center justify-end gap-3">
                  <span className="text-xs flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 16.6A5 5 0 0 0 18 7h-1.3A8 8 0 1 0 4 15.3" />
                    </svg>
                    {d.precipProb}%
                  </span>
                  <span className="w-24 flex-shrink-0 text-right">
                    <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{Math.round(d.max)}°</span>
                    <span className="mx-1" style={{ color: 'var(--border-color)' }}>/</span>
                    <span style={{ color: 'var(--text-muted)' }}>{Math.round(d.min)}°</span>
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* 智能出行建议：只显示与当天天气匹配的内容 */}
      {today && (
        <div className="lg:col-span-5">
          <WeatherAdvice
            code={cur.code}
            temp={cur.temp}
            tMax={today.max}
            tMin={today.min}
            wind={cur.wind}
            uv={today.uv}
            precipProb={today.precipProb}
            isDay={cur.isDay}
          />
        </div>
      )}
    </div>
  );
}
