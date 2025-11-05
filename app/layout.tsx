import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'
import { AuthProvider } from '@/components/providers/AuthProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'iTech Digital Agency',
  description: 'Digital Agency Management Platform - SEO Analytics, Client Management & Reporting',
  keywords: 'SEO, Digital Agency, Analytics, Client Management, Reporting',
  authors: [{ name: 'iTech Digital Agency' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <Toaster 
            position="top-right"
            expand={false}
            richColors
            closeButton
          />
        </AuthProvider>
      </body>
    </html>
  )
}