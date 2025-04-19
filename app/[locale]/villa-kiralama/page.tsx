// pages/villalar.tsx
import { Suspense } from 'react';
import VillaListingContainer from '@/components/villa-kiralama/VillaListingContainer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Villa Kiralama | Tüm Villalar',
  description: 'Tatil için kiralık villaları keşfedin. Konforlu ve lüks villalarla unutulmaz bir tatil deneyimi yaşayın.',
};

/**
 * Villa Listeleme Sayfası
 * 
 * Bu bir sunucu bileşenidir. İstemci tarafında çalışan VillaListingContainer
 * bileşeni, filtreleme, listeleme ve sayfalama özelliklerini yönetir.
 * useSearchParams() hook'u Suspense sınırı içinde kullanılması gerektiği için
 * VillaListingContainer bileşeni bir Suspense içine alınmıştır.
 */
export default function VillaListPage() {
  return (
    <div className="py-8 px-4 sm:px-6 md:px-8 mx-auto max-w-7xl">
      <Suspense fallback={<div className="h-screen flex items-center justify-center">Yükleniyor...</div>}>
        <VillaListingContainer />
      </Suspense>
    </div>
  );
}
