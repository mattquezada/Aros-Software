import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Aros Software',
    template: '%s | Aros Software',
  },
  description: 'We build custom websites, web applications, and digital experiences for businesses that want to stand out.',
  keywords: ['web development', 'custom websites', 'web apps', 'software development', 'Aros Software'],
  openGraph: {
    type: 'website',
    siteName: 'Aros Software',
    title: 'Aros Software',
    description: 'We build custom websites, web applications, and digital experiences.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
