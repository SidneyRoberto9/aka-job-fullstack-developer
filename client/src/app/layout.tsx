import type { Metadata } from 'next';

import '@/styles/globals.css';

import { PropsWithChildren } from 'react';
import { Roboto } from 'next/font/google';
import Favicon from '/public/favicon.ico';

const roboto = Roboto({ subsets: ['latin'], weight: ['300', '400', '500', '700'] });

export const metadata: Metadata = {
  title: 'AKASOFT - Cotação do Dólar',
  description: 'Desafio técnico para a vaga de desenvolvedor fullstack na AKASOFT',
  icons: [{ rel: 'icon', url: Favicon.src }],
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
