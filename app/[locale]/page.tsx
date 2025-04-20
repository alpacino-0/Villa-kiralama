import { getDictionary } from "../dictionaries";
import type { Metadata } from "next";
import { defaultMetadata } from "../metadata";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

// Sayfa için metadata oluşturma
export const metadata: Metadata = {
  ...defaultMetadata,
};

export default async function HomePage({
  params,
}: HomePageProps) {
  // Next.js 15.3.0'da params bir Promise olarak geliyor
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const dict = await getDictionary(locale);
  
  // Dinamik olarak metadata oluşturamıyoruz, bu nedenle temel içerikleri sayfa içeriklerinde gösteriyoruz
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center flex-1 px-4 sm:px-20 text-center">
        <h1 className="text-4xl font-bold mb-6 font-heading">{dict.greeting}</h1>
        <p className="text-lg font-sans">
          {locale === "tr" ? "Tatilin Lüks Yüzü" : "Luxury Redefined in Vacation"}
        </p>
        <div className="mt-6">
        </div>
      </main>
    </div>
  );
} 