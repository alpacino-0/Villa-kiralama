import { createClient } from '@supabase/supabase-js';
import type { Villa, VillaImage, VillaTag, CalendarEvent, Region, VillaAmenity } from '@/types/villa';

// Supabase Database tipi
export type Database = {
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
        Row: {
          id: string;
          villaId: string;
          seasonName: string;
          startDate: string;
          endDate: string;
          nightlyPrice: number;
          weeklyPrice: number | null;
          currencyId: string;
          description: string | null;
          isActive: boolean;
        };
        Insert: {
          id?: string;
          villaId: string;
          seasonName: string;
          startDate: string;
          endDate: string;
          nightlyPrice: number;
          weeklyPrice?: number | null;
          currencyId: string;
          description?: string | null;
          isActive?: boolean;
        };
        Update: {
          id?: string;
          villaId?: string;
          seasonName?: string;
          startDate?: string;
          endDate?: string;
          nightlyPrice?: number;
          weeklyPrice?: number | null;
          currencyId?: string;
          description?: string | null;
          isActive?: boolean;
        };
        Relationships: [
          {
            foreignKeyName: "SeasonalPrice_villaId_fkey";
            columns: ["villaId"];
            referencedRelation: "Villa";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "SeasonalPrice_currencyId_fkey";
            columns: ["currencyId"];
            referencedRelation: "Currency";
            referencedColumns: ["id"];
          }
        ];
      };
      Currency: {
        Row: {
          id: string;
          code: string;
          symbol: string;
          name: string;
          isActive: boolean;
        };
        Insert: {
          id?: string;
          code: string;
          symbol: string;
          name: string;
          isActive?: boolean;
        };
        Update: {
          id?: string;
          code?: string;
          symbol?: string;
          name?: string;
          isActive?: boolean;
        };
        Relationships: [];
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
      VillaAmenity: {
        Row: VillaAmenity;
        Insert: Omit<VillaAmenity, 'id' | 'createdAt'>;
        Update: Partial<Omit<VillaAmenity, 'id' | 'createdAt'>>;
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
      CalendarStatus: 'AVAILABLE' | 'RESERVED' | 'BLOCKED';
      EventType: 'CHECKIN' | 'CHECKOUT' | 'SPECIAL_OFFER';
      Status: 'ACTIVE' | 'INACTIVE' | 'PENDING' | 'DELETED';
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