import { SITE_CONFIG } from '@/lib/constants';
import type { Metadata } from 'next';
import './globals.css';

/**
 * Site-wide metadata for SEO and social sharing
 */
export const metadata: Metadata = {
  title: {
    default: SITE_CONFIG.name,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    'Navigate Tech Hub',
    'Northeastern CS',
    'ColorStack',
    'Black CS students',
    'Latinx CS students',
    'tech resources',
    'interview prep',
    'LeetCode',
  ], // Subject to change
  authors: [
    {
      name: 'Adesola Odubiyi',
      url: SITE_CONFIG.social.github,
    },
  ],
  creator: 'Northeastern ColorStack Navigate Tech Hub Team',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_CONFIG.url,
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * Root layout component
 * Wraps all pages with consistent layout and styling
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}