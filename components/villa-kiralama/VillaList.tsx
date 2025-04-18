'use client';

import { useVillaList } from '@/lib/hooks/use-villas';
import { VillaCard } from '@/components/villa-kiralama/VillaCard';

/**
 * Villa Listesi Bileşeni
 * 
 * React Query ile villa verilerini çeken istemci bileşeni.
 * Bu bileşen 'use client' direktifiyle işaretlenmiştir ve 
 * sunucu bileşeni içinden kullanılabilir.
 */
export function VillaList() {
  const { data: villas, isLoading, error } = useVillaList();

  if (isLoading) return <p>Yükleniyor...</p>;
  if (error) return <p>Bir hata oluştu.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {villas?.map((villa) => (
        <VillaCard key={villa.id} villa={villa} />
      ))}
    </div>
  );
} 