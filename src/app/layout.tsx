import AuthProvider from '@/components/auth/auth-provider'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Toaster } from 'sonner'
import './globals.css'
import { ThemeProvider } from '../components/theme/theme-provider'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://zahidshaikh.space'),
  title: {
    default: 'Zahid Shaikh | Full Stack Developer & Software Engineer',
    template: '%s | Zahid Shaikh - Full Stack Developer',
  },
  description:
    'Zahid Shaikh - Expert Full Stack Developer specializing in React, Next.js, TypeScript, Node.js, and modern web technologies. Building scalable applications and delivering exceptional digital experiences. Available for freelance projects and full-time opportunities.',
  keywords: [
    'zahid shaikh',
    'full stack developer',
    'react developer',
    'next.js developer',
    'typescript developer',
    'node.js developer',
    'web developer',
    'software engineer',
    'frontend developer',
    'backend developer',
    'javascript developer',
    'freelance developer',
    'remote developer',
    'portfolio',
    'web applications',
    'responsive design',
    'API development',
    'database design',
    'modern web technologies',
  ],
  authors: [{ name: 'Zahid Shaikh', url: 'https://zahidshaikh.space' }],
  creator: 'Zahid Shaikh',
  publisher: 'Zahid Shaikh',
  category: 'Technology',
  classification: 'Portfolio Website',
  icons: {
    icon: [
      { url: '/rocket.ico', sizes: '16x16', type: 'image/x-icon' },
      { url: '/rocket.ico', sizes: '32x32', type: 'image/x-icon' },
      { url: '/rocket.ico', sizes: '48x48', type: 'image/x-icon' },
    ],
    shortcut: '/rocket.ico',
    apple: [{ url: '/rocket.ico', sizes: '180x180', type: 'image/x-icon' }],
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://zahidshaikh.space',
    title: 'Zahid Shaikh | Full Stack Developer & Software Engineer',
    description:
      'Expert Full Stack Developer specializing in React, Next.js, TypeScript, and modern web technologies. Building scalable applications and delivering exceptional digital experiences.',
    siteName: 'Zahid Shaikh - Full Stack Developer Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Zahid Shaikh - Full Stack Developer Portfolio',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zahid Shaikh | Full Stack Developer & Software Engineer',
    description:
      'Expert Full Stack Developer specializing in React, Next.js, TypeScript, and modern web technologies. Building scalable applications and delivering exceptional digital experiences.',
    creator: '@zahidshaikh',
    site: '@zahidshaikh',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://zahidshaikh.space',
  },
  verification: {
    google: 'google-site-verification-code', // Replace with actual code
    yandex: 'yandex-verification-code', // Replace with actual code
  },
  other: {
    'theme-color': '#0F172A', // Your space theme primary color
    'color-scheme': 'dark light',
    'format-detection': 'telephone=no',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} relative antialiased`}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
          storageKey='space-portfolio-theme'
        >
          <AuthProvider>
            <main className='relative z-10'>{children}</main>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>

        {/* Vercel features */}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
