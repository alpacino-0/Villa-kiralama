// pages/villalar.tsx
import { VillaList } from '@/components/villa-kiralama/VillaList';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Villa Kiralama | Tüm Villalar',
  description: 'Tatil için kiralık villaları keşfedin. Konforlu ve lüks villalarla unutulmaz bir tatil deneyimi yaşayın.',
};

/**
 * Villa Listeleme Sayfası
 * 
 * Bu bir sunucu bileşenidir ve istemci bileşeni olan VillaList'i içerir.
 * React Query hook'ları sadece istemci bileşenlerinde kullanılabilir.
 */
export default function VillaListPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Kiralık Villalar</h1>
      <VillaList />
    </div>
  );
}
