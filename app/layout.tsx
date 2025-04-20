import './globals.css';
import { Geist, Geist_Mono } from "next/font/google";
import { defaultLocale } from "./i18n";
import { Nunito, Montserrat } from "next/font/google";
import { Providers } from '@/lib/providers';
import { defaultMetadata, defaultViewport } from './metadata';

// Font tanımlamaları
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-nunito",
  weight: ["300", "400", "500", "600"]
});

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
  weight: ["600", "700"]
});

// Varsayılan metadata ve viewport yapılandırması
export const metadata = defaultMetadata;
export const viewport = defaultViewport;

/**
 * Root Layout
 * 
 * Bu bileşen, Next.js 15.3.0 App Router mimarisi için gerekli olan kök layout.
 * HTML ve body yapısını burada tanımlıyoruz.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={defaultLocale} suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} ${nunito.variable} ${montserrat.variable} antialiased`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
