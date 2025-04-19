'use client';

import { useEffect, useState } from 'react';
import VillaListingContainer from './VillaListingContainer';

/**
 * Villa Listesi Bileşeni
 * 
 * Bu bileşen, VillaListingContainer'ı sararak, eski VillaList bileşeninin yerine geçer.
 * Eski kodu bozmadan yeni bileşenlere geçiş için köprü sağlar.
 */
export function VillaList() {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Sadece istemci tarafında render et
  if (!isClient) {
    return null;
  }
  
  return <VillaListingContainer />;
} 