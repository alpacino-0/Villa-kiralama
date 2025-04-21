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

// Props tipi
interface VillaListingContainerProps {
  locale: string;
  dictionary: {
    villaListing?: {
      pageTitle?: string;
      errorMessage?: string;
      unknownError?: string;
      filters?: {
        title?: string;
        location?: string;
        checkIn?: string;
        checkOut?: string;
        guests?: string;
        price?: string;
        apply?: string;
        clear?: string;
        reset?: string;
        activeFilters?: string;
        region?: string;
        subRegion?: string;
        features?: string;
        minPrice?: string;
        maxPrice?: string;
        [key: string]: string | undefined;
      };
      noResults?: string;
      resultsCount?: string;
      sortBy?: string;
      sortOptions?: {
        newest?: string;
        priceAsc?: string;
        priceDesc?: string;
        rating?: string;
        [key: string]: string | undefined;
      };
      loadingMore?: string;
      [key: string]: unknown;
    };
    common?: {
      loading?: string;
      error?: string;
      success?: string;
      [key: string]: string | undefined;
    };
    [key: string]: unknown;
  };
}

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

export default function VillaListingContainer({ locale, dictionary }: VillaListingContainerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // URL'den filtreleri al
  const [filters, setFilters] = useState<FilterParams>(() => 
    parseUrlToFilters(searchParams)
  );

  // Çeviriler için varsayılan değerler oluştur
  const villaListTitle = dictionary.villaListing?.pageTitle || 'Kiralık Villalar';
  const errorMessage = dictionary.villaListing?.errorMessage || 'Villalar yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.';
  const unknownError = dictionary.villaListing?.unknownError || 'Bilinmeyen hata';

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
          prices:SeasonalPrice(*),
          tags:VillaTag(tagid, Tag(id, name))
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
        // Burada tag filtresi için VillaTag tablosunu kullanacağız
        // Önce filtredeki etiketlere sahip villa ID'lerini almalıyız
        const { data: villaIds, error: tagError } = await supabase
          .from('VillaTag')
          .select('villaid')
          .in('tagid', filters.tagIds);
          
        if (tagError) {
          throw new Error(`Etiket filtreleme hatası: ${tagError.message}`);
        }
        
        // Eğer etiket filtresi sonucunda villa bulunamazsa, boş bir sonuç göstermek için
        // olmayan bir ID kullanarak sorgulayabiliriz
        if (!villaIds || villaIds.length === 0) {
          query = query.eq('id', 'no-match'); // Hiçbir sonuç dönmeyecek
        } else {
          // Bulunan villaların ID'leri ile filtreleme yapalım
          // Eğer birden fazla etiket seçiliyse, tüm etiketlere sahip villaları göstermek istiyorsak
          // villaların kaç kez listelendiğini sayarak, seçilen etiket sayısı kadar olanları alabiliriz
          
          // Etiket sayısını sayalım ve seçilen tüm etiketlere sahip villaları bulalım
          const villaIdCounts = new Map<string, number>();
          
          for (const item of villaIds) {
            const id = item.villaid;
            villaIdCounts.set(id, (villaIdCounts.get(id) || 0) + 1);
          }
          
          // Seçilen tüm etiketlere sahip villa ID'lerini alalım
          const selectedTagCount = filters.tagIds?.length || 0;
          const filteredVillaIds = Array.from(villaIdCounts)
            .filter(([, count]) => count >= selectedTagCount)
            .map(([id]) => id);
            
          if (filteredVillaIds.length === 0) {
            query = query.eq('id', 'no-match');
          } else {
            query = query.in('id', filteredVillaIds);
          }
        }
      }
      
      // Tarih filtresi: checkIn ve checkOut tarihleri seçilmişse, bu aralıkta 
      // sadece AVAILABLE durumunda olan tarihleri olan villaları filtrele
      if (filters.checkIn && filters.checkOut) {
        try {
          console.log(`Tarih filtresi uygulanıyor: ${filters.checkIn.toISOString()} - ${filters.checkOut.toISOString()}`);
          
          // 1. Tüm villa ID'lerini alalım
          const { data: allVillaIds, error: villaIdError } = await supabase
            .from('Villa')
            .select('id')
            .eq('status', Status.ACTIVE);
            
          if (villaIdError) {
            throw new Error(`Villa ID'leri alınamadı: ${villaIdError.message}`);
          }

          // Tüm villalar için ID listesi
          const allVillas = allVillaIds?.map(v => v.id) || [];
          console.log(`Toplam villa sayısı: ${allVillas.length}`);
          
          // 2. Tarih aralığındaki gece sayısını hesapla (checkOut - checkIn)
          const startDate = new Date(filters.checkIn);
          const endDate = new Date(filters.checkOut);
          
          // Tarihleri UTC saat 14:00 (check-in saati) olarak ayarla
          startDate.setUTCHours(14, 0, 0, 0);
          endDate.setUTCHours(14, 0, 0, 0);
          
          // Hata ayıklama: Tarih bilgilerini yazdır
          console.log(`Check-in tarihi (UTC): ${startDate.toISOString()}`);
          console.log(`Check-out tarihi (UTC): ${endDate.toISOString()}`);
          
          // Gece sayısı = son gün - ilk gün
          // Örnek: 02.07-06.07 -> 4 gece (2-3, 3-4, 4-5, 5-6)
          const nightCount = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
          console.log(`Toplam seçilen gece sayısı: ${nightCount}`);
          
          // Check-in günlerini oluştur (her gece için bir tarih)
          if (nightCount < 1) {
            console.error('Geçersiz tarih aralığı: En az 1 gece olmalı');
            query = query.eq('id', 'no-match');
            return;
          }
          
          const checkInDates: string[] = [];
          const currentDate = new Date(startDate);
          
          for (let i = 0; i < nightCount; i++) {
            // Her tarihi UTC saat 14:00 olarak ayarla (veritabanı formatına uygun)
            currentDate.setUTCHours(14, 0, 0, 0);
            const dateStr = currentDate.toISOString().split('T')[0];
            checkInDates.push(dateStr);
            currentDate.setDate(currentDate.getDate() + 1);
          }
          
          console.log(`Gece başlangıç tarihleri: ${checkInDates.join(', ')}`);
          
          // 3. Seçilen tarih aralığında olan tüm takvim etkinliklerini alalım (check-in > date < check-out)
          // Tarihlerin saat bilgisini veritabanındaki saat bilgisine göre ayarla (14:00:00 UTC)
          const startDateStr = startDate.toISOString();
          const endDateStr = endDate.toISOString();
          
          console.log(`Sorgu tarih aralığı: ${startDateStr} - ${endDateStr}`);
          
          const { data: calendarEvents, error: calendarError } = await supabase
            .from('CalendarEvent')
            .select('villaId, date, status')
            .gte('date', startDateStr)
            .lt('date', endDateStr); // check-out günü dahil değil
            
          if (calendarError) {
            throw new Error(`Takvim verileri alınamadı: ${calendarError.message}`);
          }

          console.log(`Bulunan takvim kayıtları: ${calendarEvents?.length || 0}`);
          
          // Eğer kayıt bulunamadıysa, test amaçlı SQL sorgusunu logla
          if (!calendarEvents || calendarEvents.length === 0) {
            console.info(`SQL sorgu test: SELECT * FROM "CalendarEvent" WHERE date >= '${startDateStr}' AND date < '${endDateStr}'`);
          }

          // 4. Villa bazında müsaitlik durumunu kontrol et
          // Her villa için her gece için müsaitlik durumunu tutacağız
          const villaAvailabilityMap = new Map<string, Map<string, boolean>>();
          
          // İlk olarak, tüm villaların tüm gecelerde müsait olmadığını varsayalım
          for (const villaId of allVillas) {
            const dateStatusMap = new Map<string, boolean>();
            for (const dateStr of checkInDates) {
              dateStatusMap.set(dateStr, true); // Varsayılan olarak müsait (değiştirildi)
            }
            villaAvailabilityMap.set(villaId, dateStatusMap);
          }
          
          // CalendarEvent tablosundaki kayıtlara göre müsaitlik durumunu güncelle
          for (const event of calendarEvents || []) {
            const villaId = event.villaId;
            // ISO formatta ve sadece tarih kısmını al (YYYY-MM-DD)
            const eventDate = new Date(event.date);
            const dateStr = eventDate.toISOString().split('T')[0];
            
            console.log(`Kontrol ediliyor: VillaID=${villaId}, Tarih=${dateStr}, Durum=${event.status}`);
            
            // Bu villa için map'i al
            const dateStatusMap = villaAvailabilityMap.get(villaId);
            if (dateStatusMap && checkInDates.includes(dateStr)) {
              // Sadece AVAILABLE olanları müsait olarak işaretle, diğerlerini müsait değil olarak işaretle
              dateStatusMap.set(dateStr, event.status === 'AVAILABLE');
              console.log(`Villa ${villaId} için ${dateStr} tarihi '${event.status}' durumuna ayarlandı.`);
            }
          }
          
          // 5. Tüm GECELERDE AVAILABLE olan villaları belirle
          const availableVillaIds: string[] = [];
          
          for (const [villaId, dateStatusMap] of villaAvailabilityMap.entries()) {
            let isFullyAvailable = true;
            
            // Villa'nın seçilen tüm gecelerde müsait olup olmadığını kontrol et
            for (const dateStr of checkInDates) {
              if (!dateStatusMap.get(dateStr)) {
                isFullyAvailable = false;
                break;
              }
            }
            
            // Bu villa tüm gecelerde müsait ise listeye ekle
            if (isFullyAvailable) {
              availableVillaIds.push(villaId);
            }
          }
          
          console.log(`Tüm gecelerde müsait villa sayısı: ${availableVillaIds.length}`);
          
          // 6. Sonuçları filtrele
          if (availableVillaIds.length === 0) {
            console.log('Müsait villa bulunamadı, boş sonuç döndürülüyor.');
            query = query.eq('id', 'no-match'); // Hiçbir sonuç dönmeyecek
          } else {
            console.log(`${availableVillaIds.length} adet müsait villa bulundu.`);
            console.log(`Müsait villa ID'leri: ${availableVillaIds.join(', ')}`);
            query = query.in('id', availableVillaIds);
          }
        } catch (error) {
          console.error('Tarih filtreleme hatası:', error);
          // Hata durumunda boş sonuç döndür
          query = query.eq('id', 'no-match');
        }
      }
      
      // Yalnızca aktif villaları getir
      query = query.eq('status', Status.ACTIVE);
      
      // Sayfalama için sınırlar uygula
      const pageSize = filters.limit || 6; // Sayfa başına 6 villa
      const currentPage = filters.page || 1;
      const start = (currentPage - 1) * pageSize;
      
      query = query
        .range(start, start + pageSize - 1)
        .order('createdAt', { ascending: false });
      
      // Sorguyu çalıştır
      const { data, error } = await query;
      
      if (error) {
        throw new Error(`Villa verilerini getirirken hata oluştu: ${error.message}`);
      }
      
      // Toplam filtrelenmiş villa sayısını hesapla
      // Not: Tarih filtreleri veya karmaşık filtreler kullandığımızda
      // Supabase'in count özelliği tam olarak çalışmayabilir, bu nedenle
      // filtrelenmiş sonuçların toplam sayısını manuel hesaplıyoruz
      let total = 0;
      
      if (filters.checkIn && filters.checkOut || 
          (filters.tagIds && filters.tagIds.length > 0)) {
        // Karmaşık filtreler için, aynı filtreleri kullanarak toplam sayıyı alalım
        // ancak sayfalama olmadan
        const countQuery = supabase
          .from('Villa')
          .select('id', { count: 'exact' });
        
        // Aktif olma durumunu kontrol et
        countQuery.eq('status', Status.ACTIVE);
        
        // Bölge filtrelerini uygula
        if (filters.regionId) {
          countQuery.eq('regionId', filters.regionId);
        }
        
        if (filters.subRegionId) {
          countQuery.eq('subRegionId', filters.subRegionId);
        }
        
        if (filters.guests) {
          countQuery.gte('maxGuests', filters.guests);
        }
        
        // Bu aşamada bizim query içindeki id filtreleri (id in/not in) 
        // önceki filtrelerde oluşturuldu, bunları direkt olarak 
        // countQuery'ye ekleyemediğimiz için veri sonucunu kullanabiliriz
        if (data) {
          const filteredIds = data.map(item => item.id);
          if (filteredIds.length > 0) {
            total = filteredIds.length;
          } else {
            total = 0;
          }
        }
      } else {
        // Basit filtreler için standart count kullanılabilir
        const { count, error: countError } = await supabase
          .from('Villa')
          .select('*', { count: 'exact', head: true })
          .eq('status', Status.ACTIVE);
        
        if (countError) {
          console.error('Villa sayısı alınamadı:', countError);
          total = data ? data.length : 0;
        } else {
          total = count || 0;
        }
      }
      
      // Yanıtı oluştur
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
    router.push(`/${locale}/villa-kiralama${url ? `?${url}` : ''}`, { scroll: false });
  }, [filters, router, locale]);

  // Villa verileri ve sayfalama bilgileri
  const villas = villaData?.items || [];
  const totalVillas = villaData?.pagination.total || 0;

  return (
    <div className="py-4 sm:py-6 lg:py-8">
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 lg:mb-8">
        {villaListTitle}
      </h1>
      
      {/* Aktif Filtreler */}
      <ActiveFilters 
        filters={filters}
        onRemove={(key: keyof FilterParams) => {
          const newFilters = removeFilter(filters, key);
          setFilters(newFilters);
        }}
        onClear={() => setFilters({ page: 1, limit: 6 })} // Limit 6 villa
        dictionary={dictionary}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        {/* Sol taraf - Filtreler */}
        <aside className="lg:col-span-1 sticky lg:top-24 self-start h-auto">
          <VillaFilters 
            onFilterChange={setFilters} 
            currentFilters={filters}
            dictionary={dictionary}
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
            dictionary={dictionary}
            locale={locale}
          />
          
          {error && (
            <div className="mt-6 p-4 bg-red-50 text-red-600 rounded-md">
              <p>{errorMessage}</p>
              <p className="text-sm mt-2">{error instanceof Error ? error.message : unknownError}</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}