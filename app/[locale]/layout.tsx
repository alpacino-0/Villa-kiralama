import "../globals.css";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { locales, defaultLocale, type Locale } from "../i18n";
import HeaderComponent from "@/components/layout/HeaderComponent";
import FooterComponent from "@/components/layout/FooterComponent";
import { getDictionary } from "../dictionaries";

// Statik olarak desteklenen diller
export function generateStaticParams() {  
  return locales.map(locale => ({ locale }));
}

// Metadata tanımı
export const metadata: Metadata = {
  title: 'Villa Kiralama',
  description: 'En güzel villalar burada',
};

// Next.js 15.3.0 için tip tanımını yeni yöntemle güncelliyoruz
type LayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

// Locale bazlı layout
export default async function LocaleLayout({
  children,
  params,
}: LayoutProps) {
  // Next.js 15.3.0'da params bir Promise olarak geliyor
  const resolvedParams = await params;
  const locale = locales.includes(resolvedParams.locale as Locale) 
    ? resolvedParams.locale 
    : defaultLocale;
    
  // Sözlüğü getir
  const dictionary = await getDictionary(locale);

  // Sadece içerik kısmını döndürüyoruz, html/body yapısı RootLayout'ta
  return (
    <div className="w-screen h-screen" data-locale={locale}>
      <HeaderComponent locale={locale} dictionary={dictionary} />
      {children}
      <FooterComponent locale={locale} dictionary={dictionary} />
    </div>
  );
}
