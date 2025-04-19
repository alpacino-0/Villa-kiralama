'use client';

import { useState } from 'react';
import type { FilterOption } from '@/types/filter';

interface TagFilterProps {
  tags: FilterOption[];
  selectedTagIds: string[];
  isLoading: boolean;
  onChange: (tagIds: string[]) => void;
}

export function TagFilter({
  tags,
  selectedTagIds,
  isLoading,
  onChange
}: TagFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState('');

  // Etiketleri filtrele
  const filteredTags = searchText
    ? tags.filter(tag => tag.name.toLowerCase().includes(searchText.toLowerCase()))
    : tags;

  // Etiket seçimini değiştirme
  const toggleTag = (tagId: string) => {
    if (selectedTagIds.includes(tagId)) {
      onChange(selectedTagIds.filter(id => id !== tagId));
    } else {
      onChange([...selectedTagIds, tagId]);
    }
  };

  // Gösterilecek metin
  const displayText = selectedTagIds.length 
    ? `${selectedTagIds.length} özellik seçildi` 
    : 'Villa özellikleri seçin';

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <span className="inline-flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
          <span>{displayText}</span>
        </span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 p-4">
          {/* Arama */}
          <div className="mb-3">
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Özellik ara..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {isLoading ? (
            <div className="flex justify-center py-4">
              <svg className="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            </div>
          ) : (
            <div>
              {filteredTags.length === 0 ? (
                <p className="text-sm text-gray-500 py-2 text-center">Aranan özelliklere uygun sonuç bulunamadı</p>
              ) : (
                <div className="grid grid-cols-2 gap-2 max-h-56 overflow-y-auto">
                  {filteredTags.map(tag => (
                    <div key={tag.id} className="flex items-start">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedTagIds.includes(tag.id)}
                          onChange={() => toggleTag(tag.id)}
                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm">{tag.name}</span>
                        {tag.count !== undefined && (
                          <span className="text-xs text-gray-500">({tag.count})</span>
                        )}
                      </label>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="mt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => {
                    onChange([]);
                    setSearchText('');
                  }}
                  className="text-xs text-gray-600 hover:text-gray-800"
                  disabled={selectedTagIds.length === 0}
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