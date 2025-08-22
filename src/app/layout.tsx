import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import SpaceBackground from '@/components/shared/background'
import Header from '@/components/shared/header'
import Footer from '@/components/shared/footer'
import { Toaster } from '@/components/ui/sonner'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Zahid Shaikh | Space Portfolio - Full Stack Developer',
  description:
    'Explore the digital cosmos with Zahid Shaikh - A passionate full stack developer creating stellar web experiences and launching innovative solutions with React, Next.js, TypeScript, and modern web technologies.',
  keywords: [
    'full stack developer',
    'web developer',
    'react developer',
    'next.js developer',
    'typescript',
    'portfolio',
    'zahid shaikh',
    'frontend developer',
    'backend developer',
  ],
  authors: [{ name: 'Zahid Shaikh', url: 'https://zahidshaikh.space' }],
  creator: 'Zahid Shaikh',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://zahidshaikh.space',
    title: 'Zahid Shaikh | Space Portfolio - Full Stack Developer',
    description:
      'Explore the digital cosmos with Zahid Shaikh - A passionate full stack developer creating stellar web experiences.',
    siteName: 'Zahid Shaikh Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zahid Shaikh | Space Portfolio - Full Stack Developer',
    description:
      'Explore the digital cosmos with Zahid Shaikh - A passionate full stack developer creating stellar web experiences.',
    creator: '@zahidshaikh',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' className='scroll-smooth'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} relative min-h-screen antialiased`}
      >
        <SpaceBackground />
        <Header />
        <main className='relative z-10'>{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  )
}
