'use client';

import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase/client';
import type { VillaImage } from '@/lib/supabase/types';

/**
 * useVillaImages
 * 
 * Belirli bir villa için fotoğrafları getiren hook
 * @param villaId - Villa ID'si
 * @returns Villa fotoğrafları ve sorgu durumu
 */
export function useVillaImages(villaId: string) {
  return useQuery({
    queryKey: ['villaImages', villaId],
    queryFn: async (): Promise<VillaImage[]> => {
      const { data, error } = await supabase
        .from('VillaImage')
        .select('*')
        .eq('villaId', villaId)
        .order('order', { ascending: true });
      
      if (error) {
        console.error('Villa fotoğrafları alınırken hata oluştu:', error);
        return [];
      }
      
      return data || [];
    },
    enabled: !!villaId, // villaId varsa sorgu çalıştır
  });
}

/**
 * useCoverImage
 * 
 * Belirli bir villa için kapak fotoğrafını getiren hook
 * @param villaId - Villa ID'si
 * @returns Kapak fotoğrafı ve sorgu durumu
 */
export function useCoverImage(villaId: string) {
  return useQuery({
    queryKey: ['villaCoverImage', villaId],
    queryFn: async (): Promise<VillaImage | null> => {
      const { data, error } = await supabase
        .from('VillaImage')
        .select('*')
        .eq('villaId', villaId)
        .eq('isCoverImage', true)
        .single();
      
      if (error) {
        if (error.code === 'PGRST116') { // Kapak fotoğrafı yoksa
          // Kapak fotoğrafı yoksa, herhangi bir fotoğrafı getir
          const { data: fallbackData, error: fallbackError } = await supabase
            .from('VillaImage')
            .select('*')
            .eq('villaId', villaId)
            .order('order', { ascending: true })
            .limit(1)
            .single();
            
          if (fallbackError) {
            console.error('Villa için yedek fotoğraf alınırken hata oluştu:', fallbackError);
            return null;
          }
          
          return fallbackData || null;
        }
        
        console.error('Villa kapak fotoğrafı alınırken hata oluştu:', error);
        return null;
      }
      
      return data;
    },
    enabled: !!villaId, // villaId varsa sorgu çalıştır
  });
} 