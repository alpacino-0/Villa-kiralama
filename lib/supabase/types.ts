export enum VillaStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}

export type Villa = {
  id: string;
  title: string;
  description: string;
  slug: string;
  mainRegion: string;
  subRegion: string;
  regionId: string;
  subRegionId: string;
  deposit: number;
  cleaningFee: number;
  shortStayDayLimit: number;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  checkInTime: string;
  checkOutTime: string;
  minimumStay: number;
  rules: string[];
  tags: string[];
  embedCode: string;
  status: VillaStatus;
  isPromoted: boolean;
  createdAt: string; // timestamp with time zone
  updatedAt: string; // timestamp with time zone
  advancePaymentRate: number;
  checkInNotes: string;
  checkOutNotes: string;
  houseRules: string[];
  cancellationNotes: string;
  managerId: string;
  translations: Record<string, unknown>; // jsonb
};

/**
 * SeasonalPrice
 * 
 * Villa için sezonluk fiyatlandırma bilgilerini içeren tablo tipi.
 */
export type SeasonalPrice = {
  id: string;
  villaId: string;
  seasonName: string;
  startDate: string; // timestamp with time zone
  endDate: string; // timestamp with time zone
  nightlyPrice: number;
  weeklyPrice: number;
  currencyId: string;
  description: string;
  isActive: boolean;
};

/**
 * VillaImage
 * 
 * Villa için resim bilgilerini içeren tablo tipi.
 */
export type VillaImage = {
  id: string;
  villaId: string;
  imageUrl: string;
  title: string;
  altText: string;
  order: number;
  isCoverImage: boolean;
  createdAt: string; // timestamp with time zone
};

export interface Database {
  public: {
    Tables: {
      Villa: {
        Row: Villa;
        Insert: Omit<Villa, 'id' | 'createdAt' | 'updatedAt'>;
        Update: Partial<Omit<Villa, 'id' | 'createdAt' | 'updatedAt'>>;
      };
      SeasonalPrice: {
        Row: SeasonalPrice;
        Insert: Omit<SeasonalPrice, 'id'>;
        Update: Partial<Omit<SeasonalPrice, 'id'>>;
      };
      VillaImage: {
        Row: VillaImage;
        Insert: Omit<VillaImage, 'id' | 'createdAt'>;
        Update: Partial<Omit<VillaImage, 'id' | 'createdAt'>>;
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
