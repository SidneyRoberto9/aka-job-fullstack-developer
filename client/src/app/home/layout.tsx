import { PropsWithChildren } from 'react';
import { Metadata } from 'next';

import { isNotAuthenticateRedirect } from '@/server/auth';

export const metadata: Metadata = {
  title: 'Home | AKASOFT - Cotação do Dólar',
};

export default async function Layout({ children }: PropsWithChildren) {
  await isNotAuthenticateRedirect();

  return <div className="min-h-screen flex items-start justify-center">{children}</div>;
}
