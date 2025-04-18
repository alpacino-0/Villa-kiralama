'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { Villa } from '@/lib/supabase/types';
import { BedDouble, Bath, Users } from 'lucide-react';
import { useMinimumSeasonalPrice } from '@/lib/hooks/use-seasonal-price';
import { useCoverImage } from '@/lib/hooks/use-villa-images';

/**
 * Fiyatı Türkçe para birimi formatında formatlayan fonksiyon
 * Örnek: 100500 -> 100.500
 */
const formatPrice = (price: number): string => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

/**
 * Villa Kartı Bileşeni
 * 
 * Her bir villa için bilgileri gösteren kart bileşeni.
 */
export const VillaCard = ({ villa }: { villa: Villa }) => {
  const { data: minPrice, isLoading } = useMinimumSeasonalPrice(villa.id);
  const { data: coverImage, isLoading: isImageLoading } = useCoverImage(villa.id);
  
  return (
    <div className="rounded-2xl shadow-md border overflow-hidden flex flex-col">
      {/* Villa Fotoğrafı */}
      <div className="relative w-full h-48">
        {isImageLoading ? (
          <div className="w-full h-full bg-gray-200 animate-pulse flex items-center justify-center">
            <span className="text-gray-400">Yükleniyor...</span>
          </div>
        ) : coverImage ? (
          <Image
            src={coverImage.imageUrl}
            alt={coverImage.altText || villa.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">Fotoğraf mevcut değil</span>
          </div>
        )}
      </div>
      
      {/* Villa Bilgileri */}
      <div className="p-4 flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold font-montserrat">{villa.title}</h2>
          <p className="text-sm text-gray-600 font-nunito">{villa.mainRegion} / {villa.subRegion}</p>
        </div>
         
        <div className="flex gap-4 text-sm text-gray-700 font-nunito">
          <div className="flex items-center gap-1"><Users size={16} /> {villa.maxGuests}</div>
          <div className="flex items-center gap-1"><BedDouble size={16} /> {villa.bedrooms}</div>
          <div className="flex items-center gap-1"><Bath size={16} /> {villa.bathrooms}</div>
        </div>
         
        <div className="flex items-center mt-2">
          <p className="text-[#180675] font-medium font-nunito">
            {isLoading ? (
              <span className="text-sm text-gray-400">Fiyat yükleniyor...</span>
            ) : minPrice ? (
              <>₺{formatPrice(minPrice)}&apos;den başlayan fiyatlarla</>
            ) : (
              <span className="text-sm text-gray-500">Fiyat bilgisi mevcut değil</span>
            )}
          </p>
        </div>

        <Link 
          href={`/tr/villa-kiralama/${villa.slug}`}
          className="bg-[#180675] text-white py-2 px-4 rounded-md text-sm mt-auto self-start"
        >
          Detayları Gör
        </Link>
      </div>
    </div>
  );
};
