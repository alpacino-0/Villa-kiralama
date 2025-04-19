import type { Status, CalendarEventStatus } from '@/types/enums';

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
  weeklyPrice: number;
  currencyId: string;
  description: string;
  isActive: boolean;
}

export interface CalendarEvent {
  id: string;
  villaId: string;
  reservationId: string;
  date: string;
  status: CalendarEventStatus;
  price: number;
  note: string;
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