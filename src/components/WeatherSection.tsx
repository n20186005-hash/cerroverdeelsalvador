import { useTranslations } from 'next-intl';
import { WeatherData } from '@/lib/weather';
import WeatherWidget from './WeatherWidget';

/**
 * 天气板块（服务端展示组件）：
 * 实时天气数据由服务端在页面静态生成前获取（见页面文件的 getInitialWeather），
 * 此处负责版面结构与文案；页面渲染后 WeatherWidget 会按缓存策略保持数据新鲜。
 * 页面不展示任何接口与技术的说明文字。
 */
export default function WeatherSection({
  locale,
  initial,
}: {
  locale: string;
  initial: WeatherData | null;
}) {
  const t = useTranslations('weather');

  return (
    <section id="weather" className="section-padding" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-5xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <p className="mb-8 text-sm max-w-2xl" style={{ color: 'var(--text-muted)' }}>{t('subtitle')}</p>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        <WeatherWidget locale={locale} initial={initial} />
      </div>
    </section>
  );
}
