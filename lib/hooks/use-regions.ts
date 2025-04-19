'use client';

import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase/client';
import type { Region } from '@/types/villa';
import type { RegionOption } from '@/types/filter';

/**
 * useRegions
 * 
 * Tüm bölgeleri getiren hook
 * @returns Bölge listesi ve sorgu durumu
 */
export function useRegions() {
  return useQuery<RegionOption[]>({
    queryKey: ['regions'],
    queryFn: async () => {
      // Ana bölgeleri getir
      const { data: mainRegions, error: mainError } = await supabase
        .from('Region')
        .select('*')
        .eq('isMainRegion', true)
        .eq('isActive', true)
        .order('name', { ascending: true });
      
      if (mainError) {
        console.error('Ana bölgeler alınırken hata oluştu:', mainError);
        return [];
      }
      
      // Her ana bölge için alt bölgeleri getir
      const regionsWithSubRegions = await Promise.all(
        (mainRegions || []).map(async (region: Region) => {
          const { data: subRegions, error: subError } = await supabase
            .from('Region')
            .select('*')
            .eq('parentId', region.id)
            .eq('isActive', true)
            .order('name', { ascending: true });
          
          if (subError) {
            console.error(`${region.name} için alt bölgeler alınırken hata oluştu:`, subError);
            return {
              ...region,
              subRegions: []
            };
          }
          
          // RegionOption formatına çevir
          return {
            id: region.id,
            name: region.name,
            isMainRegion: region.isMainRegion,
            parentId: region.parentId,
            description: region.description,
            imageUrl: region.imageUrl,
            isPromoted: region.isPromoted,
            slug: region.slug,
            villaCount: region.villaCount,
            isActive: region.isActive,
            metaTitle: region.metaTitle,
            metaDesc: region.metaDesc,
            subRegions: (subRegions || []).map(subRegion => ({
              id: subRegion.id,
              name: subRegion.name,
              count: subRegion.villaCount || 0
            }))
          };
        })
      );
      
      return regionsWithSubRegions;
    },
    staleTime: 60 * 1000, // 1 dakika boyunca önbellekte tut
  });
}

/**
 * useMainRegions
 * 
 * Sadece ana bölgeleri getiren hook
 * @returns Ana bölge listesi ve sorgu durumu
 */
export function useMainRegions() {
  return useQuery<Region[]>({
    queryKey: ['mainRegions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('Region')
        .select('*')
        .eq('isMainRegion', true)
        .eq('isActive', true)
        .order('name', { ascending: true });
      
      if (error) {
        console.error('Ana bölgeler alınırken hata oluştu:', error);
        return [];
      }
      
      return data || [];
    },
    staleTime: 60 * 1000, // 1 dakika boyunca önbellekte tut
  });
}

/**
 * useSubRegions
 * 
 * Belirli bir ana bölgeye ait alt bölgeleri getiren hook
 * @param parentId - Ana bölge ID'si
 * @returns Alt bölge listesi ve sorgu durumu
 */
export function useSubRegions(parentId: string) {
  return useQuery<Region[]>({
    queryKey: ['subRegions', parentId],
    queryFn: async () => {
      if (!parentId) return [];
      
      const { data, error } = await supabase
        .from('Region')
        .select('*')
        .eq('parentId', parentId)
        .eq('isActive', true)
        .order('name', { ascending: true });
      
      if (error) {
        console.error('Alt bölgeler alınırken hata oluştu:', error);
        return [];
      }
      
      return data || [];
    },
    enabled: !!parentId, // parentId varsa sorgu çalıştır
    staleTime: 60 * 1000, // 1 dakika boyunca önbellekte tut
  });
} 