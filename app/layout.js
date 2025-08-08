import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'HashLife Insurance - LLQP Certified Life Insurance Agent Ontario | WhiteHorse Financial',
  description: 'Local LLQP certified life insurance agent in Ontario. Compare quotes from multiple providers for life insurance, travel insurance, funeral expense coverage. Serving Toronto, Ottawa, Hamilton, Mississauga & all Ontario cities.',
  keywords: 'life insurance Ontario, LLQP certified agent Ontario, travel insurance parents grandparents, funeral expense insurance, local insurance agent Toronto, insurance quotes Ontario, WhiteHorse Financial, super visa insurance Ontario',
  authors: [{ name: 'Harsha - HashLife Insurance' }],
  creator: 'HashLife Insurance',
  publisher: 'HashLife Insurance',
  robots: 'index, follow',
  viewport: 'width=device-width, initial-scale=1',
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    url: 'https://hashlife-insurance.com',
    siteName: 'HashLife Insurance',
    title: 'LLQP Certified Insurance Agent Ontario | HashLife Insurance',
    description: 'Local LLQP certified life insurance agent in Ontario. Compare quotes from multiple providers for life insurance, travel insurance, funeral expense coverage.',
    images: [
      {
        url: '/app/assets/HashLyf.png',
        width: 1200,
        height: 630,
        alt: 'HashLife Insurance - LLQP Certified Agent Ontario',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LLQP Certified Insurance Agent Ontario | HashLife Insurance',
    description: 'Local LLQP certified life insurance agent in Ontario. Compare quotes from multiple providers.',
    images: ['/app/assets/HashLyf.png'],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": "https://hashlife-insurance.com",
              "name": "HashLife Insurance",
              "alternateName": "HashLife Insurance Services",
              "description": "LLQP certified life insurance agent in Ontario offering life insurance, travel insurance, funeral expense coverage, and critical illness insurance.",
              "url": "https://hashlife-insurance.com",
              "telephone": "+1-XXX-XXX-XXXX",
              "email": "harsha.whf@gmail.com",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Ontario",
                "addressRegion": "ON",
                "addressCountry": "CA"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 43.6532,
                "longitude": -79.3832
              },
              "areaServed": [
                {
                  "@type": "State",
                  "name": "Ontario"
                },
                {
                  "@type": "City",
                  "name": "Toronto"
                },
                {
                  "@type": "City", 
                  "name": "Ottawa"
                },
                {
                  "@type": "City",
                  "name": "Hamilton"
                },
                {
                  "@type": "City",
                  "name": "Mississauga"
                }
              ],
              "serviceType": [
                "Life Insurance",
                "Travel Insurance", 
                "Funeral Expense Insurance",
                "Critical Illness Coverage",
                "Super Visa Insurance"
              ],
              "priceRange": "$$",
              "currenciesAccepted": "CAD",
              "paymentAccepted": [
                "Cash",
                "Credit Card",
                "Bank Transfer"
              ],
              "hasCredential": {
                "@type": "EducationalOccupationalCredential",
                "name": "LLQP Certification",
                "credentialCategory": "Professional License"
              },
              "memberOf": {
                "@type": "Organization",
                "name": "WhiteHorse Financial"
              },
              "sameAs": [
                "https://linkedin.com/company/hashlife-insurance",
                "https://facebook.com/hashlife-insurance"
              ],
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "5.0",
                "reviewCount": "25"
              }
            })
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}