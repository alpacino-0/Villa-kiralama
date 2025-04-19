// pages/villalar.tsx
import { Suspense } from 'react';
import VillaListingContainer from '@/components/villa-kiralama/VillaListingContainer';
import type { Metadata } from 'next';
import { getDictionary } from '@/app/dictionaries';

// Next.js 15 için awaitable params
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  // Dictionary verilerini al
  const { locale } = await params;
  const dictionary = await getDictionary(locale);
  
  return {
    title: dictionary.villaListing?.pageTitle || 'Villa Kiralama | Tüm Villalar',
    description: dictionary.villaListing?.pageDescription || 'Tatil için kiralık villaları keşfedin. Konforlu ve lüks villalarla unutulmaz bir tatil deneyimi yaşayın.',
  };
}

/**
 * Villa Listeleme Sayfası
 * 
 * Bu bir sunucu bileşenidir. İstemci tarafında çalışan VillaListingContainer
 * bileşeni, filtreleme, listeleme ve sayfalama özelliklerini yönetir.
 * useSearchParams() hook'u Suspense sınırı içinde kullanılması gerektiği için
 * VillaListingContainer bileşeni bir Suspense içine alınmıştır.
 */
export default async function VillaListPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  // Dictionary verilerini al
  const { locale } = await params;
  const dictionary = await getDictionary(locale);
  const loadingText = dictionary.common?.loading || 'Yükleniyor...';
  
  return (
    <div className="py-8 px-4 sm:px-6 md:px-8 mx-auto max-w-7xl">
      <Suspense fallback={<div className="h-screen flex items-center justify-center">{loadingText}</div>}>
        <VillaListingContainer locale={locale} dictionary={dictionary} />
      </Suspense>
    </div>
  );
}
