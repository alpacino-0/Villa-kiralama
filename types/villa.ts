import type { Status, CalendarStatus, EventType } from '@/types/enums';

export interface Villa {
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
  status: Status;
  isPromoted: boolean;
  createdAt: string;
  updatedAt: string;
  advancePaymentRate: number;
  checkInNotes: string;
  checkOutNotes: string;
  houseRules: string[];
  cancellationNotes: string;
  managerId: string;
  translations: Record<string, unknown>;
  images?: VillaImage[];
  prices?: SeasonalPrice[];
  amenities?: VillaAmenity[];
}

export interface VillaImage {
  id: string;
  villaId: string;
  imageUrl: string;
  title: string;
  altText: string;
  order: number;
  isCoverImage: boolean;
  createdAt: string;
}

export interface VillaTag {
  id: string;
  villaId: string;
  name: string;
  createdAt: string;
}

export interface SeasonalPrice {
  id: string;
  villaId: string;
  seasonName: string;
  startDate: string;
  endDate: string;
  nightlyPrice: number;
  weeklyPrice?: number | null;
  currencyId: string;
  description?: string | null;
  isActive: boolean;
  currency?: {
    symbol: string;
    code: string;
  };
}

export interface CalendarEvent {
  id: string;
  villaId: string;
  reservationId: string | null;
  date: Date;
  status: CalendarStatus;
  price: number | null;
  note: string | null;
  eventType: EventType[] | null;
}

/**
 * VillaAmenity - Villa olanakları/özellikleri
 * 
 * Villa'nın sahip olduğu özellikler (örn. wifi, havuz, jakuzi vb.)
 */
export interface VillaAmenity {
  id: string;
  villaId: string;
  name: string;
  icon: string | null;
  createdAt: string;
}

export interface VillaListResponse {
  items: Villa[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface Region {
  id: string;
  name: string;
  isMainRegion: boolean;
  parentId: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  imageUrl: string;
  isPromoted: boolean;
  slug: string;
  villaCount: number;
  isActive: boolean;
  metaTitle: string;
  metaDesc: string;
} 