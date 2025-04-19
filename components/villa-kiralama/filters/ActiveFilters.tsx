'use client';

import { Fragment } from 'react';
import type { FilterParams } from '@/types/filter';
import { useRegions } from '@/lib/hooks/use-regions';
import { useTags } from '@/lib/hooks/use-tags';

// Dictionary tipini ekleyelim
interface Dictionary {
  villaListing?: {
    filters?: {
      activeFilters?: string;
      region?: string;
      subRegion?: string;
      features?: string;
      clear?: string;
      guests?: string;
      date?: string;
      removeFilter?: string;
      person?: string;
      featureSelected?: string;
      clearAllFilters?: string;
      [key: string]: string | undefined;
    };
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

interface ActiveFiltersProps {
  filters: FilterParams;
  onRemove: (key: keyof FilterParams) => void;
  onClear: () => void;
  dictionary?: Dictionary;
}

export function ActiveFilters({ filters, onRemove, onClear, dictionary }: ActiveFiltersProps) {
  // Dictionary'den metinleri al veya varsayılan değerleri kullan
  const filtersDict = dictionary?.villaListing?.filters || {};
  
  const activeFiltersText = filtersDict.activeFilters || 'Aktif Filtreler:';
  const regionText = filtersDict.region || 'Bölge';
  const subRegionText = filtersDict.subRegion || 'Alt Bölge';
  const featuresText = filtersDict.features || 'Özellikler';
  const guestsText = filtersDict.guests || 'Misafir';
  const dateText = filtersDict.date || 'Tarih';
  const removeFilterText = filtersDict.removeFilter || 'Filtreyi kaldır';
  const personText = filtersDict.person || 'kişi';
  const featureSelectedText = filtersDict.featureSelected || 'özellik seçildi';
  const clearAllFiltersText = filtersDict.clearAllFilters || 'Tüm filtreleri temizle';

  // Bölge verilerini API'den çek
  const { data: regions = [] } = useRegions();
  // Etiket verilerini API'den çek
  const { data: tags = [] } = useTags();

  // Seçili bölge ve alt bölge adlarını bul
  const selectedRegion = regions.find(r => r.id === filters.regionId);
  const selectedSubRegion = selectedRegion?.subRegions?.find(sr => sr.id === filters.subRegionId);

  // Aktif filtreler listesi
  const activeFilters: Array<{ key: keyof FilterParams; label: string; value: string }> = [];

  // Tarih filtresi
  if (filters.checkIn && filters.checkOut) {
    const checkInDate = new Date(filters.checkIn);
    const checkOutDate = new Date(filters.checkOut);
    
    activeFilters.push({
      key: 'checkIn',
      label: dateText,
      value: `${checkInDate.toLocaleDateString()} - ${checkOutDate.toLocaleDateString()}`
    });
  }

  // Misafir sayısı filtresi
  if (filters.guests) {
    activeFilters.push({
      key: 'guests',
      label: guestsText,
      value: `${filters.guests} ${personText}`
    });
  }

  // Bölge filtresi
  if (filters.regionId && selectedRegion) {
    activeFilters.push({
      key: 'regionId',
      label: regionText,
      value: selectedRegion.name
    });
  }

  // Alt bölge filtresi
  if (filters.subRegionId && selectedSubRegion) {
    activeFilters.push({
      key: 'subRegionId',
      label: subRegionText,
      value: selectedSubRegion.name
    });
  }

  // Etiket filtreleri
  if (filters.tagIds?.length) {
    // Eğer sadece sayıyı göstermek istiyorsanız
    if (filters.tagIds.length > 3) {
      activeFilters.push({
        key: 'tagIds',
        label: featuresText,
        value: `${filters.tagIds.length} ${featureSelectedText}`
      });
    } else {
      // Seçili etiketleri bul
      const selectedTagNames = filters.tagIds
        .map(tagId => tags.find(tag => tag.id === tagId)?.name || tagId)
        .join(', ');
      
      activeFilters.push({
        key: 'tagIds',
        label: featuresText,
        value: selectedTagNames
      });
    }
  }

  // Aktif filtre yoksa boş dön
  if (activeFilters.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-50 rounded-lg p-3 mb-4 sm:mb-6 lg:mb-8">
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-sm text-gray-700 mr-2">{activeFiltersText}</span>
        
        {activeFilters.map((filter) => (
          <Fragment key={filter.key}>
            <span className="inline-flex items-center rounded-full bg-white px-2 py-1 text-xs font-medium text-gray-700 ring-1 ring-inset ring-gray-300">
              <span>{filter.label}: {filter.value}</span>
              <button
                type="button"
                onClick={() => onRemove(filter.key)}
                className="ml-1 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full text-gray-400 hover:bg-gray-200 hover:text-gray-500 focus:outline-none focus:bg-gray-500 focus:text-white"
                aria-label={`${removeFilterText}: ${filter.label}`}
              >
                <span className="sr-only">{`${removeFilterText}: ${filter.label}`}</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-3 w-3" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </span>
          </Fragment>
        ))}
        
        {activeFilters.length > 1 && (
          <button
            type="button"
            className="text-xs text-blue-600 font-medium hover:text-blue-800 ml-2"
            onClick={onClear}
          >
            {clearAllFiltersText}
          </button>
        )}
      </div>
    </div>
  );
} 