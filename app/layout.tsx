import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import SmoothScroll from '@/components/SmoothScroll'
import './globals.css'

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: 'Matheus Damodara - Full-Stack Developer & DevOps Engineer',
  description: 'Desenvolvedor full-stack especializado em sistemas escaláveis, APIs robustas e infraestrutura cloud. Construo produtos do código à produção.',
  keywords: ['Full-Stack Developer', 'DevOps', 'Node.js', 'React', 'Next.js', 'AWS', 'Kubernetes', 'Freelance Developer', 'Consultoria Tech'],
  authors: [{ name: 'Matheus Damodara' }],
  creator: 'Matheus Damodara',
  manifest: '/site.webmanifest',
  alternates: {
    canonical: 'https://damodara.xyz',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://damodara.xyz',
    title: 'Matheus Damodara - Full-Stack Developer & DevOps',
    description: 'Desenvolvedor full-stack especializado em sistemas escaláveis, APIs robustas e infraestrutura cloud.',
    siteName: 'Matheus Damodara Portfolio',
    images: [
      {
        url: '/images/matheusdamodara.webp',
        width: 1200,
        height: 630,
        alt: 'Matheus Damodara - Full-Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Matheus Damodara - Full-Stack Developer & DevOps',
    description: 'Desenvolvedor full-stack especializado em sistemas escaláveis e infraestrutura cloud.',
    images: ['/images/matheusdamodara.webp'],
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
    <html lang="pt-BR" className="bg-background" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Matheus Damodara",
              "url": "https://damodara.xyz",
              "image": "https://damodara.xyz/images/matheusdamodara.webp",
              "jobTitle": "Full-Stack Developer & DevOps Engineer",
              "sameAs": [
                "https://github.com/aMathyzinn",
                "https://www.linkedin.com/in/matheus-damodara-a866a9362/"
              ]
            })
          }}
        />
      </head>
      <body className={`${geist.variable} ${geistMono.variable} font-sans antialiased`} suppressHydrationWarning>
        <SmoothScroll>
          {children}
          <Analytics />
        </SmoothScroll>
      </body>
    </html>
  )
}
