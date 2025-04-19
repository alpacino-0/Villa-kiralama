'use client';

import { useState } from 'react';

interface DateRangePickerProps {
  startDate?: Date;
  endDate?: Date;
  onChange: (startDate?: Date, endDate?: Date) => void;
}

export function DateRangePicker({ startDate, endDate, onChange }: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Tarihleri yerelleştirme ve formatlama
  const formatDate = (date?: Date): string => {
    if (!date) return '';
    return date.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const formattedStartDate = formatDate(startDate);
  const formattedEndDate = formatDate(endDate);
  
  // Placeholder metin
  const placeholder = startDate && endDate 
    ? `${formattedStartDate} - ${formattedEndDate}`
    : 'Giriş - Çıkış tarihi seçin';

  // Tarih seçimini açıp kapatan fonksiyon
  const toggleDatePicker = () => {
    setIsOpen(!isOpen);
  };

  // Geçici UI - tam bir tarih seçici entegrasyonu için özelleştirilmelidir
  return (
    <div className="relative">
      <button 
        type="button"
        onClick={toggleDatePicker}
        className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <span className="inline-flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{placeholder}</span>
        </span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 p-4">
          <div className="text-center">
            <p className="mb-4 text-sm text-gray-500">Basit tarih seçici örneği</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Giriş Tarihi</label>
                <input
                  type="date"
                  value={startDate ? startDate.toISOString().split('T')[0] : ''}
                  onChange={(e) => {
                    const newStartDate = e.target.value ? new Date(e.target.value) : undefined;
                    onChange(newStartDate, endDate);
                  }}
                  className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Çıkış Tarihi</label>
                <input
                  type="date"
                  value={endDate ? endDate.toISOString().split('T')[0] : ''}
                  onChange={(e) => {
                    const newEndDate = e.target.value ? new Date(e.target.value) : undefined;
                    onChange(startDate, newEndDate);
                  }}
                  className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                />
              </div>
            </div>
            
            <div className="mt-4 flex justify-between">
              <button
                type="button"
                onClick={() => {
                  onChange(undefined, undefined);
                  setIsOpen(false);
                }}
                className="text-xs text-gray-600 hover:text-gray-800"
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
        </div>
      )}
    </div>
  );
} 