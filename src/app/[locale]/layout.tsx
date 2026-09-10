import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';
import { site, heroImageUrl } from '@/config/site';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`@/messages/${locale}.json`)).default as any;
  const baseUrl = site.baseUrl;

  const zhUrl = `${baseUrl}/zh`;
  const enUrl = `${baseUrl}/en`;
  const esUrl = `${baseUrl}/es`;

  let selfUrl = esUrl;
  if (locale === 'zh') selfUrl = zhUrl;
  else if (locale === 'en') selfUrl = enUrl;

  const localeMap: Record<string, string> = {
    'es': 'es_MX',
    'zh': 'zh_CN',
    'en': 'en_US',
  };

  const title = messages.meta.title;
  const description = messages.meta.description;

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    alternates: {
      canonical: selfUrl,
      languages: {
        'es': esUrl,
        'zh': zhUrl,
        'en': enUrl,
        'x-default': esUrl,
      } as Record<string, string>,
    },
    openGraph: {
      title,
      description,
      url: selfUrl,
      siteName: site.fullName,
      images: [
        {
          url: heroImageUrl,
          width: 1200,
          height: 900,
          alt: `${site.fullName} - Main view in ${site.city}, ${site.country}`,
        },
      ],
      locale: localeMap[locale] || 'zh_CN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [heroImageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = (await getMessages()) as any;

  const langMap: Record<string, string> = {
    'zh': 'zh-CN',
    'en': 'en',
    'es': 'es',
  };

  /* ---------- 1. 结构化数据：TouristAttraction（实体绑定） ---------- */
  const touristAttractionLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    '@id': `${site.baseUrl}/#attraction`,
    name: site.fullName,
    alternateName: [
      site.shortName,
      site.fullNameZh,
      `${site.city} ${site.fullName}`,
    ],
    description: `Comprehensive visitor guide to ${site.fullName} in ${site.city}, ${site.region}, ${site.country}. National park on an extinct volcano with cloud forest and viewpoints over ${site.landmark1} and ${site.landmark2}.`,
    url: site.baseUrl,
    image: [heroImageUrl],
    isAccessibleForFree: true,
    telephone: site.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.fullName,
      addressLocality: site.city,
      addressRegion: site.region,
      addressCountry: site.countryCode,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: site.latitude,
      longitude: site.longitude,
    },
    hasMap: site.mapsUrl,
    sameAs: [site.mapsUrl, site.tourismUrl],
  };

  return (
    <html lang={langMap[locale] || 'zh-CN'} suppressHydrationWarning>
      <head>
        {/* AdSense 广告（占位，发布时替换正式 client id） */}
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX" crossOrigin="anonymous" />
        <meta name="google-adsense-account" content="ca-pub-XXXXXXXXXX" />

        {/* GA4 - G-HXM22WWPKP */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${site.ga4Id}`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${site.ga4Id}');
            `,
          }}
        />

        {/* Canonical 规范网址 */}
        {/* 由 generateMetadata 的 alternates.canonical 输出，这里保持 HTML 顺序稳定 */}

        {/* Open Graph Image 主图 */}
        <meta property="og:image" content={heroImageUrl} />
        <meta
          property="og:image:alt"
          content={`${site.fullName} - Main view in ${site.city}, ${site.country}`}
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="900" />

        {/* PWA */}
        <meta name="theme-color" content="#234830" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content={site.shortName} />
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="icon" href="/icons/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icons/icon.svg" />

        {/* 主题初始化（防闪烁） */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark') {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />

        {/* Service Worker 注册 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1')) {
                  window.addEventListener('load', function() {
                    navigator.serviceWorker.register('/sw.js').catch(function() {});
                  });
                }
              })();
            `,
          }}
        />

        {/* 结构化数据：TouristAttraction
            FAQPage 结构化数据由首页 FaqSection 与可见 FAQ 内容一同输出 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(touristAttractionLd) }}
        />
      </head>
      <body className="min-h-screen">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
