'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Wifi, Coffee, Tv, Thermometer, ShowerHead } from "lucide-react";
import type { VillaAmenity } from "@/types/villa";
import type { ReactNode } from "react";

// Kategori ikon eşleşmelerini tanımla
const categoryIcons: Record<string, ReactNode> = {
  "internet": <Wifi className="w-5 h-5" />,
  "mutfak": <Coffee className="w-5 h-5" />,
  "eğlence": <Tv className="w-5 h-5" />,
  "sağlık": <Thermometer className="w-5 h-5" />,
  "banyo": <ShowerHead className="w-5 h-5" />,
  "genel": <Check className="w-5 h-5" />
};

// API'den dönen veri yapısını karşılamak için ek tür tanımlama
type RelationalVillaAmenity = {
  villaId?: string;
  amenityId?: string;
  amenity: {
    id: string;
    name: string;
    icon?: string;
    category?: string;
  };
};

// VillaAmenity'yi genişleterek category tipini ekleyelim
interface ExtendedVillaAmenity extends VillaAmenity {
  category?: string;
}

interface VillaAmenitiesProps {
  amenities: (ExtendedVillaAmenity | RelationalVillaAmenity)[];
}

export default function VillaAmenities({ amenities }: VillaAmenitiesProps) {
  const [isShowingAll, setIsShowingAll] = useState(false);
  
  // Eğer olanaklar yoksa bileşeni gösterme
  if (!amenities || amenities.length === 0) {
    return null;
  }
  
  // Gösterilecek özellik sayısını belirle
  const limitCount = 6; // Mobil için daha az özellik göster
  const displayAmenities = isShowingAll ? amenities : amenities.slice(0, limitCount);
  const hasMoreAmenities = amenities.length > limitCount;

  // Amenity adını ve diğer özelliklerini alma fonksiyonu
  const getAmenityName = (amenity: ExtendedVillaAmenity | RelationalVillaAmenity): string => {
    if ('amenity' in amenity && amenity.amenity) {
      return amenity.amenity.name;
    }
    return (amenity as ExtendedVillaAmenity).name || "";
  };

  const getAmenityIcon = (amenity: ExtendedVillaAmenity | RelationalVillaAmenity): string | undefined => {
    if ('amenity' in amenity && amenity.amenity) {
      return amenity.amenity.icon;
    }
    // icon string | null tipindeki değeri string | undefined tipine dönüştür
    const icon = (amenity as ExtendedVillaAmenity).icon;
    return icon === null ? undefined : icon;
  };

  const getAmenityCategory = (amenity: ExtendedVillaAmenity | RelationalVillaAmenity): string | undefined => {
    if ('amenity' in amenity && amenity.amenity) {
      return amenity.amenity.category;
    }
    return (amenity as ExtendedVillaAmenity).category;
  };

  // İkonları render eden fonksiyon
  const renderIcon = (amenity: ExtendedVillaAmenity | RelationalVillaAmenity) => {
    const icon = getAmenityIcon(amenity);
    if (icon) {
      return (
        <span className="flex items-center justify-center w-5 h-5">
          {icon}
        </span>
      );
    }
    
    const category = getAmenityCategory(amenity);
    return (
      <span>
        {categoryIcons[category || 'genel'] || <Check className="w-5 h-5" />}
      </span>
    );
  };

  // Her amenity için unique key oluştur
  const getAmenityKey = (amenity: ExtendedVillaAmenity | RelationalVillaAmenity, index: number): string => {
    if ('amenity' in amenity && amenity.amenity) {
      return `amenity-${amenity.amenity.id || index}`;
    }
    return `amenity-${(amenity as ExtendedVillaAmenity).id || index}`;
  };

  return (
    <div className="villa-amenities">
      <h2 className="text-lg font-semibold mb-3 sm:mb-4">Villa Olanakları</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 sm:gap-y-3 gap-x-4 mb-3 sm:mb-4">
        {displayAmenities.map((amenity, index) => (
          <div 
            key={getAmenityKey(amenity, index)} 
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="text-primary flex-shrink-0">
              {renderIcon(amenity)}
            </div>
            <span className="text-sm text-gray-600">{getAmenityName(amenity)}</span>
          </div>
        ))}
      </div>
      
      {hasMoreAmenities && !isShowingAll && (
        <Button
          variant="link"
          className="text-primary p-0 h-auto text-sm sm:text-base hover:text-primary/90 transition-colors"
          onClick={() => setIsShowingAll(true)}
        >
          {amenities.length - limitCount} özellik daha göster
        </Button>
      )}
    </div>
  );
} 