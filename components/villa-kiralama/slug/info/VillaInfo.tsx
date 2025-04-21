'use client';

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import VillaSpecs from "./VillaSpecs";
import VillaDescription from "./VillaDescription";
import VillaAmenities from "./VillaAmenities";
import type { VillaAmenity } from "@/types/villa";

interface VillaInfoProps {
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  description?: string;
  amenities?: VillaAmenity[];
}

export default function VillaInfo({ 
  bedrooms,
  bathrooms,
  maxGuests,
  description,
  amenities 
}: VillaInfoProps) {
  return (
    <Card className="overflow-hidden bg-white shadow-sm">
      <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        {/* Villa Özellikleri (Yatak, Banyo, Misafir) */}
        <VillaSpecs 
          bedrooms={bedrooms}
          bathrooms={bathrooms}
          maxGuests={maxGuests}
        />

        <Separator className="my-2 sm:my-4" />
        
        {/* Villa Açıklaması */}
        <VillaDescription description={description} />
        
        <Separator className="my-2 sm:my-4" />
        
        {/* Villa Olanakları */}
        <VillaAmenities amenities={amenities || []} />
      </CardContent>
    </Card>
  );
} 