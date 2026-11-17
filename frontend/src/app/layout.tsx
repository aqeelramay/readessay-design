import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { fetchServiceTree } from '@/lib/data-fetchers';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://readessay.com'),
  title: "ReadEssay - USA's No.1 Academic Platform & Coursework Support",
  description:
    'Trusted academic helpers ensuring top grades, verified confidentiality, and zero stress across all collegiate platforms. 24/7 dedicated Ph.D. experts.',
  openGraph: {
    title: "ReadEssay - USA's No.1 Academic Platform",
    description:
      'Premier academic support, online class help, protected exams, assignments, and verified grade results.',
    url: 'https://readessay.com',
    siteName: 'ReadEssay',
    images: [
      {
        url: '/images/readessay-logo.png',
        width: 300,
        height: 100,
        alt: 'ReadEssay Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch dynamic service tree on the server with graceful offline fallback
  const serviceTree = await fetchServiceTree();

  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="min-h-screen bg-white text-[#243445] font-sans antialiased flex flex-col">
        <Header serviceTree={serviceTree} />
        <main className="flex-1 w-full pt-28 bg-[#FFFFFF]">{children}</main>
        <Footer serviceTree={serviceTree} />
      </body>
    </html>
  );
}
