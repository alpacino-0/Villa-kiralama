'use client';

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/supabase/client';
import type { SeasonalPrice } from '@/types/villa';

export function useSeasonalPrices(villaId: string) {
  const [seasonalPrices, setSeasonalPrices] = useState<SeasonalPrice[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClientComponentClient<Database>();

  useEffect(() => {
    const fetchSeasonalPrices = async () => {
      if (!villaId) {
        setIsLoading(false);
        return;
      }

      // Villa ID'sini loglama
      console.log(`[useSeasonalPrices] Fiyat bilgileri alınıyor: villaId=${villaId}`);

      try {
        setIsLoading(true);
        setError(null);

        const { data, error } = await supabase
          .from('SeasonalPrice')
          .select(`
            *,
            Currency (
              symbol,
              code
            )
          `)
          .eq('villaId', villaId)
          .eq('isActive', true)
          .order('startDate', { ascending: true });

        if (error) {
          throw new Error(error.message);
        }

        console.log(`[useSeasonalPrices] Bulunan fiyat sayısı: ${data?.length || 0}`);
        if (data && data.length > 0) {
          // İlk kaydın fiyat bilgilerini örnek olarak logla
          console.log(`[useSeasonalPrices] Örnek fiyat: `, {
            villaId: data[0].villaId, 
            nightlyPrice: data[0].nightlyPrice,
            startDate: data[0].startDate
          });
        }

        // Tip dönüşümünü işle
        const formattedData = data.map(item => ({
          ...item,
          currency: item.Currency
        })) as SeasonalPrice[];

        setSeasonalPrices(formattedData);
      } catch (err) {
        console.error('[useSeasonalPrices] Fiyat yükleme hatası:', err);
        setError(err instanceof Error ? err.message : 'Sezonsal fiyatlar yüklenemedi');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSeasonalPrices();
  }, [villaId, supabase]);

  return {
    seasonalPrices,
    isLoading,
    error
  };
} 