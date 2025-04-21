'use client';

import type { Villa, SeasonalPrice } from "@/types/villa";
import VillaInfo from "@/components/villa-kiralama/slug/info/VillaInfo";
import VillaRules from "@/components/villa-kiralama/slug/rules/VillaRules";
import VillaSeasonalPrices from "@/components/villa-kiralama/slug/pricing/VillaSeasonalPrices";
import VillaCalendar from "@/components/villa-kiralama/slug/calendar/VillaCalendar";
import VillaLocation from "@/components/villa-kiralama/slug/VillaLocation";
import { useEffect } from "react";

// Villa için genişletilmiş tipini tanımla
interface ExtendedVilla extends Villa {
  customRules?: string[];
  seasonalPrices?: SeasonalPrice[];
  mapUrl?: string;
}

interface LeftColumnProps {
  villa: ExtendedVilla;
}

export default function LeftColumn({ villa }: LeftColumnProps) {
  // Debug: Villa ID'sini loglama
  useEffect(() => {
    console.log(`[LeftColumn] Villa ID: ${villa.id}`);
  }, [villa.id]);
  
  return (
    <div className="villa-left-column space-y-5 sm:space-y-6 md:space-y-8">
      {/* Villa Bilgileri */}
      <VillaInfo 
        bedrooms={villa.bedrooms}
        bathrooms={villa.bathrooms}
        maxGuests={villa.maxGuests}
        description={villa.description}
        amenities={villa.amenities}
      />
      
      {/* Villa Kuralları */}
      <VillaRules 
        checkInTime={villa.checkInTime}
        checkOutTime={villa.checkOutTime}
        rules={villa.rules}
        customRules={villa.customRules || []}
      />
      
      {/* Sezonluk Fiyatlar */}
      <VillaSeasonalPrices 
        villaId={villa.id}
      />
      
      {/* Müsaitlik Takvimi */}
      <VillaCalendar 
        villaId={villa.id}
        minimumStay={villa.minimumStay}
      />
      
      {/* Villa Konumu */}
      <VillaLocation 
        mainRegion={villa.mainRegion}
        subRegion={villa.subRegion}
        mapUrl={villa.mapUrl || ''}
        embedCode={villa.embedCode}
      />
    </div>
  );
} 