import { setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import VisitorInfo from '@/components/VisitorInfo';
import Intro from '@/components/Intro';
import WeatherSection from '@/components/WeatherSection';
import AboutSection from '@/components/AboutSection';
import BasicInfo from '@/components/BasicInfo';
import HistoryTimeline from '@/components/HistoryTimeline';
import RouteSection from '@/components/RouteSection';
import HoursSection from '@/components/HoursSection';
import TicketsSection from '@/components/TicketsSection';
import TransportSection from '@/components/TransportSection';
import ServicesSection from '@/components/ServicesSection';
import Gallery from '@/components/Gallery';
import Reviews from '@/components/Reviews';
import MapEmbed from '@/components/MapEmbed';
import NearbySection from '@/components/NearbySection';
import SeasonsSection from '@/components/SeasonsSection';
import PersonasSection from '@/components/PersonasSection';
import ItinerarySection from '@/components/ItinerarySection';
import ScienceSection from '@/components/ScienceSection';
import FaqSection from '@/components/FaqSection';
import SourcesSection from '@/components/SourcesSection';
import Footer from '@/components/Footer';
import { fetchWeatherData, WeatherData } from '@/lib/weather';

const hikingNotice = {
  es: {
    title: 'Antes de subir a los volcanes',
    santa: 'Santa Ana (Ilamatepec): dificultad media (5/10).',
    izalco: 'Izalco: ascenso exigente y complejo, más difícil que Santa Ana.',
    health: 'No se recomienda el ascenso a personas con dolor de rodillas, hipertensión, problemas cardíacos u otras condiciones que puedan agravarse con el esfuerzo. Consulta a un profesional de salud antes de decidir y habla con el guía sobre tu condición.',
    credit: 'Recomendación de salud: Lic. José Antonio Méndez Molina, presidente de ASOTUR-El Salvador, por comunicación directa.',
    sources: 'Fuentes sobre dificultad:',
    santaLink: 'Ministerio de Medio Ambiente (Santa Ana)',
    izalcoLink: 'El Salvador Travel (Izalco)',
  },
  en: {
    title: 'Before hiking the volcanoes',
    santa: 'Santa Ana (Ilamatepec): moderate difficulty (5/10).',
    izalco: 'Izalco: a demanding, complex ascent, harder than Santa Ana.',
    health: 'The ascent is not recommended for people with knee pain, high blood pressure, heart problems or other conditions that exertion could worsen. Consult a health professional before deciding and tell your guide about your condition.',
    credit: 'Health advice provided directly by Lic. José Antonio Méndez Molina, president of ASOTUR-El Salvador.',
    sources: 'Difficulty sources:',
    santaLink: 'Ministry of Environment (Santa Ana)',
    izalcoLink: 'El Salvador Travel (Izalco)',
  },
  zh: {
    title: '登山前请注意',
    santa: '圣安娜火山（Ilamatepec）：中等难度（5/10）。',
    izalco: '伊萨尔科火山：攀登艰辛且复杂，难度高于圣安娜火山。',
    health: '不建议膝盖疼痛、高血压、心脏问题或患有其他可能因体力活动而加重的疾病的人登山。决定前请咨询医疗专业人员，并向向导说明身体状况。',
    credit: '健康建议由萨尔瓦多旅游经营者协会（ASOTUR-El Salvador）主席 José Antonio Méndez Molina 先生直接提供。',
    sources: '难度信息来源：',
    santaLink: '环境部（圣安娜火山）',
    izalcoLink: 'El Salvador Travel（伊萨尔科火山）',
  },
} as const;

/** 服务端取天气初始数据（静态生成前获取一次；失败时由前端组件按缓存回退拉取） */
async function getInitialWeather(): Promise<WeatherData | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 7000);
  try {
    return await fetchWeatherData(controller.signal);
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const initialWeather = await getInitialWeather();
  const notice = hikingNotice[locale as keyof typeof hikingNotice] ?? hikingNotice.es;

  return (
    <>
      <Header />
      <main>
        <Hero />
        <section aria-labelledby="hiking-notice-title" className="px-4 sm:px-6 pt-8">
          <div className="max-w-4xl mx-auto rounded-xl border p-6 sm:p-8" style={{ borderColor: 'var(--accent)', background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}>
            <h2 id="hiking-notice-title" className="font-display text-xl sm:text-2xl font-semibold mb-4">{notice.title}</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>{notice.santa}</li>
              <li>{notice.izalco}</li>
            </ul>
            <p className="mt-4 leading-relaxed">{notice.health}</p>
            <p className="mt-4 text-sm leading-relaxed">{notice.credit}</p>
            <p className="mt-2 text-sm leading-relaxed">
              {notice.sources}{' '}
              <a className="underline" href="https://www.ambiente.gob.sv/volcan-de-santa-ana-conquista-el-volcan-mas-alto-de-el-salvador/">{notice.santaLink}</a>
              {' · '}
              <a className="underline" href="https://elsalvador.travel/article/a-family-day-at-the-cerro-verde-natural-park/es/">{notice.izalcoLink}</a>
            </p>
          </div>
        </section>
        <VisitorInfo />
        <Intro />
        <WeatherSection locale={locale} initial={initialWeather} />
        <AboutSection />
        <BasicInfo />
        <HistoryTimeline />
        <RouteSection />
        <HoursSection />
        <TicketsSection />
        <TransportSection />
        <ServicesSection />
        <Gallery />
        <Reviews />
        <MapEmbed />
        <NearbySection />
        <SeasonsSection />
        <PersonasSection />
        <ItinerarySection />
        <ScienceSection />
        <FaqSection />
        <SourcesSection />
      </main>
      <Footer />
    </>
  );
}
