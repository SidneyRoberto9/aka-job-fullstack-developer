'use client';

import { PropsWithChildren } from 'react';
import { SessionProvider } from 'next-auth/react';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient();

export async function NextAuthSessionProvider({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>{children}</SessionProvider>
    </QueryClientProvider>
  );
}
