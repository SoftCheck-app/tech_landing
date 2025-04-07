import type { Metadata } from 'next'
import { Inter, Space_Mono } from 'next/font/google'
import './globals.css'
import { ContactFormProvider } from '@/contexts/ContactFormContext'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap' 
})

const spaceMono = Space_Mono({ 
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'SoftCheck - Aprobación de Software Empresarial',
  description: 'Plataforma inteligente para la gestión y aprobación automática de solicitudes de software en empresas',
  icons: {
    icon: '/logo_notext.png',
    shortcut: '/logo_notext.png',
    apple: '/logo_notext.png',
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`scroll-smooth ${inter.variable} ${spaceMono.variable}`}>
      <body className="antialiased">
        {/* Grid tecnológico de fondo */}
        <div className="fixed inset-0 tech-grid -z-10"></div>
        {/* Gradiente de fondo */}
        <div className="fixed inset-0 gradient-mesh opacity-40 -z-20"></div>
        {/* Puntos de fondo */}
        <div className="fixed inset-0 dot-background opacity-30 -z-30"></div>
        
        <ContactFormProvider>
          <main className="relative z-0">{children}</main>
        </ContactFormProvider>
      </body>
    </html>
  )
} 