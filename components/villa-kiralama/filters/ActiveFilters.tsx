'use client';

import { Fragment } from 'react';
import type { FilterParams } from '@/types/filter';

interface ActiveFiltersProps {
  filters: FilterParams;
  onRemove: (key: keyof FilterParams) => void;
  onClear: () => void;
}

export function ActiveFilters({ filters, onRemove, onClear }: ActiveFiltersProps) {
  // Aktif filtreler listesi
  const activeFilters: Array<{ key: keyof FilterParams; label: string; value: string }> = [];

  // Tarih filtresi
  if (filters.checkIn && filters.checkOut) {
    const checkInDate = new Date(filters.checkIn);
    const checkOutDate = new Date(filters.checkOut);
    
    activeFilters.push({
      key: 'checkIn',
      label: 'Tarih',
      value: `${checkInDate.toLocaleDateString('tr-TR')} - ${checkOutDate.toLocaleDateString('tr-TR')}`
    });
  }

  // Misafir sayısı filtresi
  if (filters.guests) {
    activeFilters.push({
      key: 'guests',
      label: 'Misafir',
      value: `${filters.guests} kişi`
    });
  }

  // Bölge filtresi
  if (filters.regionId) {
    activeFilters.push({
      key: 'regionId',
      label: 'Bölge',
      value: filters.regionId
    });
  }

  // Alt bölge filtresi
  if (filters.subRegionId) {
    activeFilters.push({
      key: 'subRegionId',
      label: 'Alt Bölge',
      value: filters.subRegionId
    });
  }

  // Etiket filtreleri
  if (filters.tagIds?.length) {
    activeFilters.push({
      key: 'tagIds',
      label: 'Özellikler',
      value: `${filters.tagIds.length} özellik seçildi`
    });
  }

  // Aktif filtre yoksa boş dön
  if (activeFilters.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-50 rounded-lg p-3 mb-4 sm:mb-6 lg:mb-8">
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-sm text-gray-700 mr-2">Aktif Filtreler:</span>
        
        {activeFilters.map((filter) => (
          <Fragment key={filter.key}>
            <span className="inline-flex items-center rounded-full bg-white px-2 py-1 text-xs font-medium text-gray-700 ring-1 ring-inset ring-gray-300">
              <span>{filter.label}: {filter.value}</span>
              <button
                type="button"
                onClick={() => onRemove(filter.key)}
                className="ml-1 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full text-gray-400 hover:bg-gray-200 hover:text-gray-500 focus:outline-none focus:bg-gray-500 focus:text-white"
              >
                <span className="sr-only">Filtreyi kaldır</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-3 w-3">
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
            Tüm filtreleri temizle
          </button>
        )}
      </div>
    </div>
  );
} 