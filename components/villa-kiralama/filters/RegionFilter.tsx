'use client';

import { useState, useEffect } from 'react';
import type { RegionOption } from '@/types/filter';

interface RegionFilterProps {
  regions: RegionOption[];
  selectedRegionId?: string;
  selectedSubRegionId?: string;
  isLoading: boolean;
  onChange: (regionId?: string, subRegionId?: string) => void;
}

export function RegionFilter({
  regions,
  selectedRegionId,
  selectedSubRegionId,
  isLoading,
  onChange
}: RegionFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeRegion, setActiveRegion] = useState<RegionOption | undefined>();

  // Seçili bölgeyi takip et
  useEffect(() => {
    if (selectedRegionId) {
      const region = regions.find(r => r.id === selectedRegionId);
      setActiveRegion(region);
    } else {
      setActiveRegion(undefined);
    }
  }, [selectedRegionId, regions]);

  // Seçili bölge ve alt bölgeyi metin olarak göster
  const getDisplayText = (): string => {
    if (selectedSubRegionId && activeRegion) {
      const subRegion = activeRegion.subRegions?.find(sr => sr.id === selectedSubRegionId);
      if (subRegion) {
        return `${activeRegion.name} - ${subRegion.name}`;
      }
    }
    
    if (selectedRegionId && activeRegion) {
      return activeRegion.name;
    }
    
    return 'Konum seçin';
  };

  // Bölge seçimi
  const handleRegionSelect = (regionId: string) => {
    const newRegion = regions.find(r => r.id === regionId);
    setActiveRegion(newRegion);
    
    if (selectedRegionId === regionId) {
      // Aynı bölge tekrar seçilirse, seçimi temizle
      onChange(undefined, undefined);
    } else {
      // Yeni bölge seçilirse, alt bölge seçimini temizle
      onChange(regionId, undefined);
    }
  };

  // Alt bölge seçimi
  const handleSubRegionSelect = (subRegionId: string) => {
    if (selectedRegionId) {
      if (selectedSubRegionId === subRegionId) {
        // Aynı alt bölge tekrar seçilirse, alt bölge seçimini temizle
        onChange(selectedRegionId, undefined);
      } else {
        // Yeni alt bölge seç
        onChange(selectedRegionId, subRegionId);
      }
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <span className="inline-flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{getDisplayText()}</span>
        </span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 p-4">
          {isLoading ? (
            <div className="flex justify-center py-4">
              <svg className="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          ) : (
            <div>
              <div className="mb-3">
                <p className="text-xs font-medium text-gray-500 mb-2">Bölgeler</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {regions.map(region => (
                    <button
                      key={region.id}
                      type="button"
                      onClick={() => handleRegionSelect(region.id)}
                      className={`px-3 py-1 text-sm rounded-full ${
                        selectedRegionId === region.id
                          ? 'bg-blue-100 text-blue-800 font-medium'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      {region.name}
                    </button>
                  ))}
                </div>
              </div>

              {activeRegion && activeRegion.subRegions && activeRegion.subRegions.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-2">Alt Bölgeler</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {activeRegion.subRegions.map(subRegion => (
                      <button
                        key={subRegion.id}
                        type="button"
                        onClick={() => handleSubRegionSelect(subRegion.id)}
                        className={`px-3 py-1 text-sm rounded-full ${
                          selectedSubRegionId === subRegion.id
                            ? 'bg-blue-100 text-blue-800 font-medium'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                      >
                        {subRegion.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    onChange(undefined, undefined);
                    setIsOpen(false);
                  }}
                  className="text-xs mr-2 text-gray-600 hover:text-gray-800"
                >
                  Temizle
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="text-xs bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                >
                  Uygula
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 