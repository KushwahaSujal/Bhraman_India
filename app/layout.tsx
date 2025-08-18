import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/lib/providers/auth-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Bhromon - West Bengal Tourism',
  description: 'Discover the heritage and culture of West Bengal with Bhromon - Your complete tourism companion',
  keywords: 'West Bengal, Tourism, Heritage, Culture, Bengal, Travel, India',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
