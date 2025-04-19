export interface FilterParams {
  checkIn?: Date;
  checkOut?: Date;
  guests?: number;
  regionId?: string;
  subRegionId?: string;
  tagIds?: string[];
  page?: number;
  limit?: number;
}

export interface FilterOption {
  id: string;
  name: string;
  count?: number;
}

export interface RegionOption extends FilterOption {
  subRegions?: FilterOption[];
}

export interface ActiveFilter {
  key: keyof FilterParams;
  label: string;
  value: string;
} 