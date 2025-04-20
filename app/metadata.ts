import type { Metadata, Viewport } from 'next';

// Varsayılan meta veriler
export const defaultMetadata: Metadata = {
  metadataBase: new URL('https://innelegance.com'),
  title: {
    default: 'Lüks Villa Kiralama | Özel Havuzlu & Deniz Manzaralı Villalar | Inn Elegance',
    template: '%s | Inn Elegance'
  },
  description: 'Inn Elegance ile lüks villa kiralama deneyimi. Özel havuzlu, deniz manzaralı ve tam donanımlı villarımızla unutulmaz bir tatil için hemen rezervasyon yapın.',
  keywords: [
    'lüks villa kiralama', 
    'özel villa tatili', 
    'premium villa konaklama', 
    'havuzlu villa', 
    'deniz manzaralı villa', 
    'özel plajlı villa', 
    'Türkiye\'de lüks villa kiralama', 
    'aileler için özel havuzlu villalar', 
    'güvenli villa tatil deneyimi'
  ],
  authors: [{ name: 'Inn Elegance', url: 'https://innelegance.com' }],
  creator: 'Inn Elegance',
  publisher: 'Inn Elegance',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
    languages: {
      'tr-TR': '/tr',
      'en-US': '/en',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://innelegance.com',
    title: 'Lüks Villa Kiralama | Inn Elegance',
    description: 'Inn Elegance ile lüks villa kiralama deneyimi. Özel havuzlu, deniz manzaralı villalarımızla unutulmaz bir tatil için rezervasyon yapın.',
    siteName: 'Inn Elegance',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Inn Elegance - Tatilin Lüks Yüzü',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lüks Villa Kiralama | Inn Elegance',
    description: 'Inn Elegance ile lüks villa kiralama deneyimi. Özel havuzlu, deniz manzaralı villalarımızla unutulmaz bir tatil için rezervasyon yapın.',
    images: ['/images/twitter-image.jpg'],
    creator: '@innelegance',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/apple-touch-icon-precomposed.png',
    },
  },
};

// Varsayılan görünüm meta verileri
export const defaultViewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFFFFF' },
    { media: '(prefers-color-scheme: dark)', color: '#100049' },
  ],
}; 