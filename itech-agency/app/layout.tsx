import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'iTech Digital Agency - SEO Management Platform',
  description: 'Comprehensive SEO agency management platform with AI-powered insights',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
