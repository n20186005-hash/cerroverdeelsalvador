import { setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
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

  return (
    <>
      <Header />
      <main>
        <Hero />
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
