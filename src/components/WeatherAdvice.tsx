'use client';

import { useTranslations } from 'next-intl';

/**
 * 面向普通游客的「今日出行建议」：
 * 基于实时与当日预报数据（天气代码、温度、风、紫外线、降水概率），
 * 自动在「出行穿搭 / 游玩安排 / 随身物品 / 风险提醒」四类中只渲染命中项。
 * 不满足条件的内容不会出现，避免堆砌无用信息。
 */

export type WeatherAdviceProps = {
  /** 当前实时 WMO weather_code */
  code: number;
  /** 当前实时气温 ℃ */
  temp: number;
  /** 今日最高 / 最低气温 ℃ */
  tMax: number;
  tMin: number;
  /** 当前风速 km/h */
  wind: number;
  /** 今日紫外线指数峰值 */
  uv: number;
  /** 今日最大降水概率 % */
  precipProb: number;
  /** 当前是否白天 */
  isDay: boolean;
};

const LIGHT_RAIN = new Set([51, 53, 55, 57, 61, 80]); // 毛毛雨 / 小雨 / 小阵雨
const HEAVY_RAIN = new Set([63, 65, 66, 67, 81, 82]); // 中到大雨 / 冻雨 / 强阵雨
const SNOW = new Set([71, 72, 73, 75, 77, 85, 86]); // 雪
const FOG = new Set([45, 48]); // 雾 / 冻雾

const isRainyCode = (code: number) =>
  LIGHT_RAIN.has(code) || HEAVY_RAIN.has(code) || code >= 95 || SNOW.has(code);

export default function WeatherAdvice({
  code,
  temp,
  tMax,
  tMin,
  wind,
  uv,
  precipProb,
  isDay,
}: WeatherAdviceProps) {
  const t = useTranslations('weather');
  const A = (key: string, params?: Record<string, number>) => t(`adv.${key}`, params as never);

  const risks: string[] = [];
  const outfit: string[] = [];
  const plan: string[] = [];
  const gear: string[] = [];

  const rainingNow = isRainyCode(code);
  const isThunder = code >= 95;
  const isHeavyRain = HEAVY_RAIN.has(code);
  const isLightRain = LIGHT_RAIN.has(code);
  const isSnow = SNOW.has(code);
  const isFog = FOG.has(code);
  const diurnal = tMax - tMin;

  // ---- 风险提醒（命中才出现，置顶展示）----
  if (isThunder) risks.push(A('rThunder'));
  else if (isHeavyRain) risks.push(A('rHeavyRain'));
  else if (isSnow) risks.push(A('rSnow'));
  if (isFog) risks.push(A('rFog'));
  if (wind >= 50) risks.push(A('rWind'));

  // ---- 天气类型 / 游玩安排 ----
  if (!rainingNow && code <= 2) {
    plan.push(A('pSunny'));
  } else if (code === 3) {
    plan.push(A('pOvercast'));
  }

  if (isThunder) {
    plan.push(A('pThunder'));
  } else if (isHeavyRain) {
    plan.push(A('pHvyRain'));
    gear.push(A('gHvyRain'));
  } else if (isLightRain) {
    outfit.push(A('oDrizzle'));
    plan.push(A('pDrizzle'));
    gear.push(A('gDrizzle'));
  }

  if (isFog) plan.push(A('pFog'));

  // ---- 降水概率（预报型提醒，不写“一定会下雨”）----
  if (precipProb >= 60 && !rainingNow) {
    outfit.push(A('oPrecip', { p: precipProb }));
    plan.push(A('pPrecip'));
    gear.push(A('gPrecip'));
  }

  // ---- 风力 ----
  if (wind >= 29 && wind < 50) {
    plan.push(A('pWindMid'));
    gear.push(A('gWindMid'));
  }

  // ---- 高温 ----
  if (tMax >= 32) {
    outfit.push(A('oHeat'));
    plan.push(A('pHeat'));
    gear.push(A('gHeat'));
  }

  // ---- 紫外线（高海拔地区普遍偏强）----
  if (uv >= 5) gear.push(A('gUv'));
  if (uv >= 8) plan.push(A('pUv'));

  // ---- 温差与低温 ----
  if (diurnal > 8) outfit.push(A('oDiff', { diff: diurnal }));
  if (tMax <= 10) {
    outfit.push(A('oLowMax', { max: tMax }));
    gear.push(A('gLowMax'));
  } else if (isDay && temp <= 16) {
    outfit.push(A('oCoolNow', { now: Math.round(temp) }));
    gear.push(A('gCoolNow'));
  }

  const hasRisks = risks.length > 0;
  const hasAdvice = outfit.length > 0 || plan.length > 0 || gear.length > 0;

  if (!hasRisks && !hasAdvice) {
    // 全部未命中：只给一句平稳结论，不堆内容
    return (
      <div
        className="rounded-xl px-5 py-4 flex items-start gap-3 text-sm leading-relaxed"
        style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" className="flex-shrink-0 mt-0.5">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v4M12 16h.01" />
        </svg>
        <p>{t('neutral')}</p>
      </div>
    );
  }

  const groups: { key: string; label: string; items: string[] }[] = [];
  if (outfit.length) groups.push({ key: 'outfit', label: t('outfitLabel'), items: outfit });
  if (plan.length) groups.push({ key: 'plan', label: t('planLabel'), items: plan });
  if (gear.length) groups.push({ key: 'gear', label: t('gearLabel'), items: gear });

  const dotColors: Record<string, string> = {
    outfit: '#e8a33d',
    plan: '#3d9b5f',
    gear: '#3d7fd6',
  };

  return (
    <div className="rounded-xl p-5 sm:p-6 flex flex-col gap-4" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', boxShadow: 'var(--card-shadow)' }}>
      <div className="flex items-center gap-2">
        <span className="text-sm font-display font-semibold" style={{ color: 'var(--text-primary)' }}>
          {t('panelTitle')}
        </span>
        <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-muted)' }}>
          {t('autoLabel')}
        </span>
      </div>

      {/* 风险提醒：仅在命中时置顶显示 */}
      {hasRisks && (
        <div
          className="rounded-xl px-4 py-3 flex items-start gap-3"
          style={{ background: 'rgba(220,38,38,0.09)', border: '1px solid rgba(220,38,38,0.35)' }}
          role="alert"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2.2" className="flex-shrink-0 mt-0.5">
            <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
            <path d="M12 9v4M12 17h.01" />
          </svg>
          <div className="flex flex-col gap-1.5 min-w-0">
            <p className="text-sm font-semibold" style={{ color: '#dc2626' }}>{t('riskTitle')}</p>
            {risks.map((risk, i) => (
              <p key={i} className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{risk}</p>
            ))}
          </div>
        </div>
      )}

      {/* 三类出行建议 */}
      <div className={`grid gap-4 ${groups.length === 1 ? 'grid-cols-1' : groups.length === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-3'}`}>
        {groups.map((group) => (
          <div key={group.key} className="rounded-lg p-4" style={{ background: 'var(--bg-tertiary)' }}>
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: 'var(--text-muted)' }}>
              <span className="w-2 h-2 rounded-full" style={{ background: dotColors[group.key] }} />
              {group.label}
            </p>
            <ul className="flex flex-col gap-2">
              {group.items.map((item, i) => (
                <li key={i} className="flex gap-2 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={dotColors[group.key]} strokeWidth="2.6" className="flex-shrink-0 mt-1">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
