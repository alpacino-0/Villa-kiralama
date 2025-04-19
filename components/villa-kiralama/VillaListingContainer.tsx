'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase/client';
import type { FilterParams } from '@/types/filter';
import type { Villa, VillaListResponse } from '@/types/villa';
import { VillaFilters } from '@/components/villa-kiralama/filters/VillaFilters';
import { VillaGrid } from '@/components/villa-kiralama/grid/VillaGrid';
import { ActiveFilters } from '@/components/villa-kiralama/filters/ActiveFilters';
import { Status } from '@/types/enums';

// URL'den filtre parametrelerini parse etme
function parseUrlToFilters(searchParams: URLSearchParams): FilterParams {
  const checkInStr = searchParams.get('checkIn');
  const checkOutStr = searchParams.get('checkOut');
  const guestsStr = searchParams.get('guests');
  const regionIdStr = searchParams.get('regionId');
  const subRegionIdStr = searchParams.get('subRegionId');
  const tagIdsStr = searchParams.get('tagIds');
  const pageStr = searchParams.get('page');
  const limitStr = searchParams.get('limit');

  return {
    checkIn: checkInStr ? new Date(checkInStr) : undefined,
    checkOut: checkOutStr ? new Date(checkOutStr) : undefined,
    guests: guestsStr ? Number.parseInt(guestsStr, 10) : undefined,
    regionId: regionIdStr || undefined,
    subRegionId: subRegionIdStr || undefined,
    tagIds: tagIdsStr?.split(','),
    page: pageStr ? Number.parseInt(pageStr, 10) : 1,
    limit: limitStr ? Number.parseInt(limitStr, 10) : 6 // Sayfa başına villa sayısını 6'ya düşürdük
  };
}

// Filtreleri URL'e dönüştürme
function filtersToUrl(filters: FilterParams): string {
  const params = new URLSearchParams();

  if (filters.checkIn) params.set('checkIn', filters.checkIn.toISOString());
  if (filters.checkOut) params.set('checkOut', filters.checkOut.toISOString());
  if (filters.guests) params.set('guests', filters.guests.toString());
  if (filters.regionId) params.set('regionId', filters.regionId);
  if (filters.subRegionId) params.set('subRegionId', filters.subRegionId);
  if (filters.tagIds?.length) params.set('tagIds', filters.tagIds.join(','));
  if (filters.page) params.set('page', filters.page.toString());
  if (filters.limit) params.set('limit', filters.limit.toString());

  return params.toString();
}

// Filtre kaldırma fonksiyonu
function removeFilter(filters: FilterParams, key: keyof FilterParams): FilterParams {
  const newFilters = { ...filters };

  switch (key) {
    case 'checkIn':
    case 'checkOut':
      newFilters.checkIn = undefined;
      newFilters.checkOut = undefined;
      break;
    case 'regionId':
      newFilters.regionId = undefined;
      newFilters.subRegionId = undefined;
      break;
    case 'subRegionId':
      newFilters.subRegionId = undefined;
      break;
    case 'tagIds':
      newFilters.tagIds = undefined;
      break;
    default:
      newFilters[key] = undefined;
  }

  newFilters.page = 1;
  return newFilters;
}

export default function VillaListingContainer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // URL'den filtreleri al
  const [filters, setFilters] = useState<FilterParams>(() => 
    parseUrlToFilters(searchParams)
  );

  // Villa verilerini getir (Supabase)
  const {
    data: villaData,
    isLoading,
    error
  } = useQuery({
    queryKey: ['villas', filters],
    queryFn: async () => {
      let query = supabase
        .from('Villa')
        .select(`
          *,
          images:VillaImage(*),
          prices:SeasonalPrice(*)
        `);
      
      // Filtreleri uygula
      if (filters.regionId) {
        query = query.eq('regionId', filters.regionId);
      }
      
      if (filters.subRegionId) {
        query = query.eq('subRegionId', filters.subRegionId);
      }
      
      if (filters.guests) {
        query = query.gte('maxGuests', filters.guests);
      }
      
      if (filters.tagIds && filters.tagIds.length > 0) {
        // Tag filtresini uygulamak için özel sorgu gerekebilir
        // Bu örnekte basit bir contains kullanıyoruz
        query = query.contains('tags', filters.tagIds);
      }
      
      // Yalnızca aktif villaları getir
      query = query.eq('status', Status.ACTIVE);
      
      // Toplam villa sayısını al
      const { count } = await supabase
        .from('Villa')
        .select('*', { count: 'exact', head: true });
      
      // Sayfalama için sınırlar uygula
      const pageSize = filters.limit || 6; // Sayfa başına 6 villa
      const currentPage = filters.page || 1;
      const start = (currentPage - 1) * pageSize;
      
      query = query
        .range(start, start + pageSize - 1)
        .order('createdAt', { ascending: false });
      
      const { data, error } = await query;
      
      if (error) {
        throw new Error(`Villa verilerini getirirken hata oluştu: ${error.message}`);
      }
      
      // Yanıtı oluştur
      const total = count || 0;
      
      const response: VillaListResponse = {
        items: data as Villa[],
        pagination: {
          total,
          page: currentPage,
          limit: pageSize,
          totalPages: Math.ceil(total / pageSize)
        }
      };
      
      return response;
    }
  });
  
  // Filtreler değiştiğinde URL'i güncelle
  useEffect(() => {
    const url = filtersToUrl(filters);
    router.push(`/villa-kiralama${url ? `?${url}` : ''}`, { scroll: false });
  }, [filters, router]);

  // Villa verileri ve sayfalama bilgileri
  const villas = villaData?.items || [];
  const totalVillas = villaData?.pagination.total || 0;

  return (
    <div className="py-4 sm:py-6 lg:py-8">
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 lg:mb-8">
        Kiralık Villalar
      </h1>
      
      {/* Aktif Filtreler */}
      <ActiveFilters 
        filters={filters}
        onRemove={(key: keyof FilterParams) => {
          const newFilters = removeFilter(filters, key);
          setFilters(newFilters);
        }}
        onClear={() => setFilters({ page: 1, limit: 6 })} // Limit 6 villa
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        {/* Sol taraf - Filtreler */}
        <aside className="lg:col-span-1 sticky lg:top-24 self-start h-auto">
          <VillaFilters 
            onFilterChange={setFilters} 
            currentFilters={filters} 
          />
        </aside>
        
        {/* Sağ taraf - Villa Listesi */}
        <main className="lg:col-span-3">
          <VillaGrid 
            villas={villas} 
            loading={isLoading} 
            totalVillas={totalVillas}
            page={filters.page || 1}
            limit={filters.limit || 6} // Limit 6 villa
            onPageChange={(page: number) => setFilters({...filters, page})}
            layout="horizontal" // Tek yatay satırda 2 villa gösterme layout prop'u
          />
          
          {error && (
            <div className="mt-6 p-4 bg-red-50 text-red-600 rounded-md">
              <p>Villalar yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.</p>
              <p className="text-sm mt-2">{error instanceof Error ? error.message : 'Bilinmeyen hata'}</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}