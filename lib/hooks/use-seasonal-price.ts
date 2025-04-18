'use client';

import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase/client';

/**
 * useMinimumSeasonalPrice
 * 
 * Belirli bir villa için en düşük gecelik fiyatı getiren hook
 * @param villaId - Villa ID'si
 * @returns En düşük fiyat bilgisi ve sorgu durumu
 */
export function useMinimumSeasonalPrice(villaId: string) {
  return useQuery({
    queryKey: ['minSeasonalPrice', villaId],
    queryFn: async (): Promise<number | null> => {
      const { data, error } = await supabase
        .from('SeasonalPrice')
        .select('nightlyPrice')
        .eq('villaId', villaId)
        .eq('isActive', true)
        .order('nightlyPrice', { ascending: true })
        .limit(1);
      
      if (error) {
        console.error('Minimum fiyat bilgisi getirilemedi:', error);
        return null;
      }
      
      return data && data.length > 0 ? data[0].nightlyPrice : null;
    },
    enabled: !!villaId, // villaId varsa sorgu çalıştır
  });
} 