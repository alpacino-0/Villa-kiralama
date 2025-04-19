import { createClient } from '@supabase/supabase-js';
import type { Villa, VillaImage, VillaTag, SeasonalPrice, CalendarEvent, Region } from '@/types/villa';

// Supabase Database tipi
export interface Database {
  public: {
    Tables: {
      Villa: {
        Row: Villa;
        Insert: Omit<Villa, 'id' | 'createdAt' | 'updatedAt'>;
        Update: Partial<Omit<Villa, 'id' | 'createdAt' | 'updatedAt'>>;
      };
      CalendarEvent: {
        Row: CalendarEvent;
        Insert: Omit<CalendarEvent, 'id'>;
        Update: Partial<Omit<CalendarEvent, 'id'>>;
      };
      SeasonalPrice: {
        Row: SeasonalPrice;
        Insert: Omit<SeasonalPrice, 'id'>;
        Update: Partial<Omit<SeasonalPrice, 'id'>>;
      };
      VillaTag: {
        Row: VillaTag;
        Insert: Omit<VillaTag, 'id' | 'createdAt'>;
        Update: Partial<Omit<VillaTag, 'id' | 'createdAt'>>;
      };
      VillaImage: {
        Row: VillaImage;
        Insert: Omit<VillaImage, 'id' | 'createdAt'>;
        Update: Partial<Omit<VillaImage, 'id' | 'createdAt'>>;
      };
      Region: {
        Row: Region;
        Insert: Omit<Region, 'id' | 'createdAt' | 'updatedAt'>;
        Update: Partial<Omit<Region, 'id' | 'createdAt' | 'updatedAt'>>;
      };
    };
    Views: {
      [name: string]: {
        Row: Record<string, unknown>;
        Insert: Record<string, unknown>;
        Update: Record<string, unknown>;
      };
    };
    Functions: {
      [name: string]: {
        Args: Record<string, unknown>;
        Returns: unknown;
      };
    };
    Enums: {
      [name: string]: string[];
    };
  };
}

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