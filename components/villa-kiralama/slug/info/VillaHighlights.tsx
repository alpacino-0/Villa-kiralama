'use client';

import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import type { VillaTag } from "@/types/villa";

interface VillaHighlightsProps {
  tags: VillaTag[];
}

export default function VillaHighlights({ tags }: VillaHighlightsProps) {
  // Etiket yoksa bileşeni gösterme
  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <div className="villa-highlights">
      <h2 className="text-lg font-semibold mb-4">Öne Çıkan Özellikler</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {tags.map((tag) => (
          <div key={tag.id} className="flex items-center gap-2">
            <Star className="w-4 h-4 text-primary flex-shrink-0" />
            <span className="text-sm">{tag.name}</span>
          </div>
        ))}
      </div>
      
      <div className="flex flex-wrap gap-2 mt-4">
        {tags.map((tag) => (
          <Badge key={tag.id} variant="outline" className="bg-primary/5 hover:bg-primary/10">
            {tag.name}
          </Badge>
        ))}
      </div>
    </div>
  );
} 