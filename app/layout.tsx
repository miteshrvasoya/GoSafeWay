import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'
import './globals.css'
import { GA_MEASUREMENT_ID } from '@/lib/analytics'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'GoSafeway - Safety Without Surveillance',
  description: 'GoSafeway helps you ensure your loved ones reach safely without constantly checking location or feeling like surveillance.',
  metadataBase: new URL('https://gosafeway.onrender.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'GoSafeway - Safety Without Surveillance',
    description: 'Ensure your loved ones reach safely without feeling monitored.',
    url: 'https://gosafeway.onrender.com',
    siteName: 'GoSafeway',
    images: [
      {
        url: 'https://pub-2a4eb4e23d7d4d18bc7ca5d587d38902.r2.dev/Screenshot%202026-04-07%20085611.png',
        width: 1200,
        height: 630,
        alt: 'GoSafeway - Safety Without Surveillance',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GoSafeway - Safety Without Surveillance',
    description: 'Protect your family without constant surveillance.',
    images: ['https://pub-2a4eb4e23d7d4d18bc7ca5d587d38902.r2.dev/Screenshot%202026-04-07%20085611.png'],
    creator: '@gosafeway',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}

        {/* Google Analytics — loads after page is interactive */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-N5X5LGHWDB`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-N5X5LGHWDB', {
              page_path: window.location.pathname,
              send_page_view: true,
            });
          `}
        </Script>
      </body>
    </html>
  )
}
