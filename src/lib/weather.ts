/**
 * 天气数据层：Open-Meteo 接口参数、WMO 天气码分类与数据规整。
 * 注意：页面不出现任何接口来源/免费声明类文案。
 */

export type WeatherKind =
  | 'sunny'
  | 'partly'
  | 'cloudy'
  | 'overcast'
  | 'fog'
  | 'drizzle'
  | 'rain'
  | 'showers'
  | 'thunder'
  | 'snow'
  | 'freezing';

export type CurrentData = {
  temp: number;
  feels: number;
  humidity: number;
  wind: number;
  code: number;
  isDay: boolean;
  precip: number;
  time: string;
};

export type DailyData = {
  date: string;
  max: number;
  min: number;
  precipProb: number;
  uv: number;
  code: number;
};

export type WeatherData = {
  current: CurrentData | null;
  daily: DailyData[];
};

export const WEATHER_ENDPOINT = 'https://api.open-meteo.com/v1/forecast';
const CACHE_KEY = 'cerroverde-weather-v1';
export const WEATHER_CACHE_MS = 30 * 60 * 1000; // 半小时本地缓存

export function buildWeatherUrl() {
  const params = new URLSearchParams({
    latitude: '13.8259',
    longitude: '-89.6247',
    timezone: 'America/El_Salvador',
    forecast_days: '7',
    current:
      'temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,weather_code,wind_speed_10m,is_day',
    daily:
      'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,uv_index_max',
  });
  return `${WEATHER_ENDPOINT}?${params.toString()}`;
}

/** WMO weather_code → 简化天气类别 */
export function wmoCategory(code: number): WeatherKind {
  if (code === 0) return 'sunny';
  if (code === 1 || code === 2) return 'partly';
  if (code === 3) return 'overcast';
  if (code === 45 || code === 48) return 'fog';
  if (code >= 51 && code <= 57) return 'drizzle';
  if (code >= 61 && code <= 67) return 'rain';
  if (code >= 71 && code <= 77) return 'snow';
  if (code >= 80 && code <= 82) return 'showers';
  if (code >= 85 && code <= 86) return 'snow';
  if (code >= 95 && code <= 99) return 'thunder';
  return 'cloudy';
}

type RawWeather = {
  current?: {
    temperature_2m?: number;
    apparent_temperature?: number;
    relative_humidity_2m?: number;
    precipitation?: number;
    weather_code?: number;
    wind_speed_10m?: number;
    is_day?: number;
    time?: string;
  };
  daily?: {
    time?: string[];
    weather_code?: number[];
    temperature_2m_max?: number[];
    temperature_2m_min?: number[];
    precipitation_probability_max?: (number | null)[];
    uv_index_max?: (number | null)[];
  };
};

export function normalizeWeather(raw: RawWeather | null): WeatherData | null {
  if (!raw || !raw.current || !raw.daily) return null;
  const c = raw.current;
  const d = raw.daily;
  if (!d.time || !d.weather_code) return null;

  return {
    current: {
      temp: c.temperature_2m ?? 0,
      feels: c.apparent_temperature ?? c.temperature_2m ?? 0,
      humidity: c.relative_humidity_2m ?? 0,
      wind: c.wind_speed_10m ?? 0,
      code: c.weather_code ?? 0,
      isDay: (c.is_day ?? 1) === 1,
      precip: c.precipitation ?? 0,
      time: c.time ?? '',
    },
    daily: d.time.map((date, i) => ({
      date,
      max: d.temperature_2m_max?.[i] ?? 0,
      min: d.temperature_2m_min?.[i] ?? 0,
      precipProb: d.precipitation_probability_max?.[i] ?? 0,
      uv: d.uv_index_max?.[i] ?? 0,
      code: d.weather_code?.[i] ?? 0,
    })),
  };
}

export async function fetchWeatherData(signal?: AbortSignal): Promise<WeatherData | null> {
  try {
    const res = await fetch(buildWeatherUrl(), { signal });
    if (!res.ok) return null;
    const raw = (await res.json()) as RawWeather;
    return normalizeWeather(raw);
  } catch {
    return null;
  }
}

export function readWeatherCache(): WeatherData | null {
  if (typeof window === 'undefined') return null;
  try {
    const item = window.localStorage.getItem(CACHE_KEY);
    if (!item) return null;
    const parsed = JSON.parse(item) as { ts: number; data: WeatherData };
    if (!parsed.ts || Date.now() - parsed.ts > WEATHER_CACHE_MS) return null;
    return parsed.data;
  } catch {
    return null;
  }
}

export function writeWeatherCache(data: WeatherData) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data }));
  } catch {
    /* ignore */
  }
}
