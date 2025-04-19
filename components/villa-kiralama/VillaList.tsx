'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import VillaListingContainer from './VillaListingContainer';

/**
 * Villa Listesi Bileşeni
 * 
 * Bu bileşen, VillaListingContainer'ı sararak, eski VillaList bileşeninin yerine geçer.
 * Eski kodu bozmadan yeni bileşenlere geçiş için köprü sağlar.
 */
export function VillaList() {
  const [isClient, setIsClient] = useState(false);
  const params = useParams();
  
  // Locale'i URL parametrelerinden al veya varsayılan değer kullan
  const locale = typeof params?.locale === 'string' ? params.locale : 'tr';
  
  // Dictionary'i tanımlayalım (gerçek bir uygulamada bu bilgiler i18n servisinden gelebilir)
  const dictionary = {
    villaListing: {
      pageTitle: 'Kiralık Villalar',
      filters: {
        title: 'Filtreler',
        location: 'Konum',
        date: 'Tarih',
        guests: 'Misafir Sayısı',
        features: 'Villa Özellikleri'
      }
    }
  };
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Sadece istemci tarafında render et
  if (!isClient) {
    return null;
  }
  
  return <VillaListingContainer locale={locale} dictionary={dictionary} />;
} 