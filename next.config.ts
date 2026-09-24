import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https' as const, hostname: 'images.unsplash.com' },
    ],
  },
  // OpenNext for Cloudflare 需要 standalone 输出才能生成 .next/standalone/.next/server/pages-manifest.json
  output: 'standalone',
  // 解决多lockfile警告
  outputFileTracingRoot: process.cwd(),
};

export default withNextIntl(nextConfig);
