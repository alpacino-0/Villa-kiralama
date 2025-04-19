'use client';

import type { FilterParams, FilterOption, RegionOption } from '@/types/filter';
import { DateRangePicker } from '@/components/villa-kiralama/filters/DateRangePicker';
import { GuestPicker } from '@/components/villa-kiralama/filters/GuestPicker';
import { RegionFilter } from '@/components/villa-kiralama/filters/RegionFilter';
import { TagFilter } from '@/components/villa-kiralama/filters/TagFilter';

interface VillaFiltersProps {
  currentFilters: FilterParams;
  onFilterChange: (filters: FilterParams) => void;
}

export function VillaFilters({ currentFilters, onFilterChange }: VillaFiltersProps) {
  // isLoading durumunu sabit değer olarak tanımla (sonraki aşamalarda API entegrasyonu yapılabilir)
  const isLoading = {
    regions: false,
    tags: false,
  };

  // Örnek bölge verileri (normalde API'den gelir)
  const regions: RegionOption[] = [
    {
      id: 'region1',
      name: 'Muğla',
      subRegions: [
        { id: 'subregion1', name: 'Bodrum' },
        { id: 'subregion2', name: 'Fethiye' },
        { id: 'subregion3', name: 'Marmaris' },
      ],
    },
    {
      id: 'region2',
      name: 'Antalya',
      subRegions: [
        { id: 'subregion4', name: 'Kaş' },
        { id: 'subregion5', name: 'Kalkan' },
        { id: 'subregion6', name: 'Kemer' },
      ],
    },
  ];

  // Örnek etiket verileri (normalde API'den gelir)
  const tags: FilterOption[] = [
    { id: 'tag1', name: 'Havuzlu', count: 27 },
    { id: 'tag2', name: 'Denize Sıfır', count: 15 },
    { id: 'tag3', name: 'Jakuzili', count: 9 },
    { id: 'tag4', name: 'Şömineli', count: 6 },
    { id: 'tag5', name: 'Sauna', count: 4 },
    { id: 'tag6', name: 'Muhafazakar', count: 3 },
  ];

  const handleDateChange = (checkIn?: Date, checkOut?: Date) => {
    onFilterChange({
      ...currentFilters,
      checkIn,
      checkOut,
      page: 1,
    });
  };

  const handleGuestCountChange = (guests: number) => {
    onFilterChange({
      ...currentFilters,
      guests,
      page: 1,
    });
  };

  const handleRegionChange = (regionId?: string, subRegionId?: string) => {
    onFilterChange({
      ...currentFilters,
      regionId,
      subRegionId,
      page: 1,
    });
  };

  const handleTagsChange = (tagIds: string[]) => {
    onFilterChange({
      ...currentFilters,
      tagIds,
      page: 1,
    });
  };

  return (
    <div className="space-y-6 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold border-b pb-2">Filtreler</h2>
      
      {/* Tarih Seçici */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Tarih</h3>
        <DateRangePicker
          startDate={currentFilters.checkIn}
          endDate={currentFilters.checkOut}
          onChange={handleDateChange}
        />
      </div>
      
      {/* Misafir Sayısı Seçici */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Misafir Sayısı</h3>
        <GuestPicker
          value={currentFilters.guests || 1}
          onChange={handleGuestCountChange}
        />
      </div>
      
      {/* Bölge Filtresi */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Konum</h3>
        <RegionFilter
          regions={regions}
          selectedRegionId={currentFilters.regionId}
          selectedSubRegionId={currentFilters.subRegionId}
          isLoading={isLoading.regions}
          onChange={handleRegionChange}
        />
      </div>
      
      {/* Özellik Filtreleri */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Villa Özellikleri</h3>
        <TagFilter
          tags={tags}
          selectedTagIds={currentFilters.tagIds || []}
          isLoading={isLoading.tags}
          onChange={handleTagsChange}
        />
      </div>
    </div>
  );
} 