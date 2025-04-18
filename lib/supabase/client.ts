import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/lib/supabase/types';

/**
 * Supabase istemcisini oluşturan fonksiyon
 * 
 * Bu fonksiyon, Supabase istemcisini oluşturur ve döndürür.
 * Ortam değişkenlerinden URL ve API anahtarını alır.
 */
export const createSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase URL veya API anahtarı tanımlanmamış');
  }
  
  return createClient<Database>(supabaseUrl, supabaseAnonKey);
};

// Supabase URL ve anahtar bilgilerini ortam değişkenlerinden al
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Supabase istemcisini oluştur
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Varsayılan olarak dışa aktar
export default supabase; 