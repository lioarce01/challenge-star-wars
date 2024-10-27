import type { Metadata } from 'next';
import ClientWrapper from './components/ClientWrapper';
import './globals.css';
import Providers from './components/Providers';

export const metadata: Metadata = {
  title: 'Starwars - Lionel Arce',
  description: 'Nextjs starwars web',
  icons: '/icon.png',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en">
        <body>
          <Providers>
            {children}
            <ClientWrapper />
          </Providers>
        </body>
      </html>
    </>
  );
}
