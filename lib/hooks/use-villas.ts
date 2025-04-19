import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase/client';
import type { Villa } from '@/types/villa';

/**
 * useVillaList
 * 
 * Tüm villa verilerini getiren TanStack Query hook'u
 * @returns Villa listesi ve ilgili durum bilgileri
 */
export function useVillaList() {
  return useQuery({
    queryKey: ['villas'],
    queryFn: async (): Promise<Villa[]> => {
      const { data, error } = await supabase
        .from('Villa')
        .select('*');
      
      if (error) {
        throw new Error(`Villa verilerini getirirken hata oluştu: ${error.message}`);
      }
      
      return data as Villa[];
    }
  });
}

/**
 * useVillaById
 * 
 * Belirli bir ID'ye sahip villayı getiren TanStack Query hook'u
 * @param id Villa ID'si
 * @returns Villa verisi ve ilgili durum bilgileri
 */
export function useVillaById(id: string) {
  return useQuery({
    queryKey: ['villa', id],
    queryFn: async (): Promise<Villa | null> => {
      const { data, error } = await supabase
        .from('Villa')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        if (error.code === 'PGRST116') { // Kayıt bulunamadı
          return null;
        }
        throw new Error(`Villa verisi getirirken hata oluştu: ${error.message}`);
      }
      
      return data as Villa;
    },
    enabled: !!id // id varsa query'i çalıştır
  });
} 