'use client';

import { useState } from 'react';

interface GuestPickerProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export function GuestPicker({ 
  value, 
  onChange, 
  min = 1, 
  max = 20 
}: GuestPickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const increment = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const decrement = () => {
    if (value > min) {
      onChange(value - 1);
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span>{value} Misafir</span>
        </span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Misafir Sayısı</span>
            
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={decrement}
                disabled={value <= min}
                className={`rounded-full w-8 h-8 flex items-center justify-center border ${
                  value <= min 
                    ? 'border-gray-200 text-gray-300 cursor-not-allowed' 
                    : 'border-gray-300 text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className="sr-only">Azalt</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              
              <span className="text-sm font-medium w-6 text-center">{value}</span>
              
              <button
                type="button"
                onClick={increment}
                disabled={value >= max}
                className={`rounded-full w-8 h-8 flex items-center justify-center border ${
                  value >= max 
                    ? 'border-gray-200 text-gray-300 cursor-not-allowed' 
                    : 'border-gray-300 text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className="sr-only">Arttır</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="mt-4 flex justify-end">
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
  );
} 