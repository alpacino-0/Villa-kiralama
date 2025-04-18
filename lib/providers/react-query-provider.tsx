'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState, type ReactNode } from 'react';

type ReactQueryProviderProps = {
  children: ReactNode;
};

/**
 * React Query Provider
 * 
 * Bu bileşen, TanStack Query (React Query) için gerekli Provider'ı sağlar.
 * Her istemci bileşeni için yeni bir QueryClient örneği oluşturur.
 */
export function ReactQueryProvider({ children }: ReactQueryProviderProps) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 dakika
        refetchOnWindowFocus: false,
        retry: 1
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
} 