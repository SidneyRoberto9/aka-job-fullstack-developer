import { PropsWithChildren } from 'react';
import { Metadata } from 'next';

import { isAuthenticateRedirect } from '@/server/auth';
import { CenterBox } from '@/components/CenterBox';

export const metadata: Metadata = {
  title: 'Sign Up | AKASOFT - Cotação do Dólar',
};

export default async function Layout({ children }: PropsWithChildren) {
  await isAuthenticateRedirect();

  return <CenterBox>{children}</CenterBox>;
}
