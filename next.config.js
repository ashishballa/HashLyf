/** @type {import('next').NextConfig} */
const nextConfig = {
  // Performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Internationalization for geo-targeting
  i18n: {
    locales: ['en-CA', 'fr-CA', 'en-US'],
    defaultLocale: 'en-CA',
    localeDetection: false,
  },
  
  // Dynamic geo-based redirects
  async redirects() {
    return [
      {
        source: '/us',
        destination: '/?geo=us',
        permanent: false,
      },
      {
        source: '/fr',
        destination: '/?geo=fr',
        permanent: false,
      },
    ]
  },
  
  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' *.googletagmanager.com *.google-analytics.com; style-src 'self' 'unsafe-inline' fonts.googleapis.com; font-src 'self' fonts.gstatic.com; img-src 'self' data: https: *.google-analytics.com; connect-src 'self' https: *.google-analytics.com *.analytics.google.com;",
          },
          {
            key: 'X-Geographic-Region',
            value: 'CA-ON',
          },
          {
            key: 'X-Robots-Tag',
            value: 'index, follow, max-snippet:200, max-image-preview:large',
          },
        ],
      },
    ]
  },
  
  // Compression
  compress: true,
  
  // Performance optimizations
  swcMinify: true,
  
  // Experimental features for better performance
  experimental: {
    scrollRestoration: true,
  },
  
  // Performance optimizations for global delivery
  poweredByHeader: false,
  generateEtags: true,
  
  // Resource optimization
  optimizeFonts: true,
  
  // Cache optimization
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 5,
  },
}

module.exports = nextConfig