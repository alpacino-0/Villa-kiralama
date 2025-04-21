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

/**
 * useVillaBySlug
 * 
 * Belirli bir slug'a sahip villayı getiren TanStack Query hook'u
 * @param slug Villa slug'ı
 * @returns Villa verisi ve ilgili durum bilgileri
 */
export function useVillaBySlug(slug: string) {
  return useQuery({
    queryKey: ['villa', 'slug', slug],
    queryFn: async (): Promise<Villa | null> => {
      console.log(`DEBUG - useVillaBySlug çalıştı: slug=${slug}`);
      
      // Önce villa verisini al
      const { data: villa, error } = await supabase
        .from('Villa')
        .select('*')
        .eq('slug', slug)
        .single();
      
      if (error) {
        if (error.code === 'PGRST116') { // Kayıt bulunamadı
          console.log(`DEBUG - Villa bulunamadı (PGRST116)`);
          return null;
        }
        console.log(`DEBUG - Villa verisi getirirken hata oluştu: ${error.message}`);
        throw new Error(`Villa verisi getirirken hata oluştu: ${error.message}`);
      }
      
      console.log(`DEBUG - useVillaBySlug villa bulundu:`, { 
        villaFound: !!villa,
        villaData: villa ? { id: villa.id, title: villa.title, slug: villa.slug } : 'bulunamadı'
      });
      
      // Villa bulunduysa, görsellerini ve olanaklarını ayrı sorgularla al
      if (villa) {
        // Villa verisini zenginleştirecek nesne
        const enrichedVilla = { ...villa };
        
        // Görselleri al
        try {
          const { data: images, error: imagesError } = await supabase
            .from('VillaImage')
            .select('*')
            .eq('villaId', villa.id);
            
          if (imagesError) {
            console.log(`DEBUG - Villa görselleri alınırken hata: ${imagesError.message}`);
          } else if (images && images.length > 0) {
            console.log(`DEBUG - Villa görselleri bulundu: ${images.length} adet`);
            // Villa nesnesine görselleri ekle
            enrichedVilla.images = images;
          }
        } catch (imageError) {
          console.log(`DEBUG - Villa görselleri alınırken hata:`, imageError);
        }
        
        // Olanakları al
        try {
          const { data: amenities, error: amenitiesError } = await supabase
            .from('VillaAmenity')
            .select('*')
            .eq('villaId', villa.id);
            
          if (amenitiesError) {
            console.log(`DEBUG - Villa olanakları alınırken hata: ${amenitiesError.message}`);
          } else if (amenities && amenities.length > 0) {
            console.log(`DEBUG - Villa olanakları bulundu: ${amenities.length} adet`);
            // Villa nesnesine olanakları ekle
            enrichedVilla.amenities = amenities;
          }
        } catch (amenitiesError) {
          console.log(`DEBUG - Villa olanakları alınırken hata:`, amenitiesError);
        }
        
        return enrichedVilla as Villa;
      }
      
      return villa as Villa;
    },
    enabled: !!slug // slug varsa query'i çalıştır
  });
} 