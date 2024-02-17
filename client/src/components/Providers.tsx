'use client';

import { PropsWithChildren } from 'react';
import { SessionProvider } from 'next-auth/react';

export function NextAuthSessionProvider({ children }: PropsWithChildren) {
  return <SessionProvider>{children}</SessionProvider>;
}
