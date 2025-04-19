import { supabase } from './client';
import type { Villa } from '@/types/villa';

/**
 * Villa listesini getir
 * 
 * @param limit - Sayfalama limiti
 * @param offset - Sayfalama başlangıç noktası
 * @returns Villa listesi
 */
export async function getVillas(limit = 10, offset = 0): Promise<Villa[]> {
  const { data, error } = await supabase
    .from('villas')
    .select('*')
    .range(offset, offset + limit - 1)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Villalar alınırken hata oluştu:', error);
    throw error;
  }

  return data || [];
}

/**
 * Villa detaylarını getir
 * 
 * @param id - Villa ID
 * @returns Villa bilgileri veya null
 */
export async function getVillaById(id: number): Promise<Villa | null> {
  const { data, error } = await supabase
    .from('villas')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(`${id} ID'li villa alınırken hata oluştu:`, error);
    throw error;
  }

  return data;
}
