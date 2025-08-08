import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Best Life Insurance Agent Ontario | LLQP Certified | Compare Quotes | HashLife Insurers',
  description: 'Looking for affordable life insurance in Ontario? Local LLQP certified agent compares quotes from 15+ insurance companies. Specializing in term life insurance, whole life insurance, travel insurance for parents visiting Canada, Super Visa insurance, funeral expense coverage. Get free quotes in Toronto, Ottawa, Hamilton, Mississauga. Licensed by FSRAO with WhiteHorse Financial.',
  keywords: 'life insurance Ontario, LLQP certified agent Ontario, travel insurance parents grandparents, funeral expense insurance, local insurance agent Toronto, insurance quotes Ontario, WhiteHorse Financial, super visa insurance Ontario, term life insurance Toronto, whole life insurance Ottawa, visitor insurance Canada, insurance broker Hamilton, life insurance advisor Mississauga, affordable life insurance Ontario, best life insurance rates Canada, family life insurance protection, critical illness insurance Ontario, disability insurance coverage, insurance needs assessment, life insurance comparison Ontario, insurance agent near me, licensed insurance professional, FSRAO licensed agent, insurance consultation Ontario, life insurance underwriting, policy review services, insurance claims assistance, group life insurance Ontario, individual life insurance plans, seniors life insurance, young family insurance, mortgage protection insurance, final expense insurance, burial insurance Ontario, travel medical insurance, emergency travel coverage, multi-trip travel insurance, annual travel insurance, visitor to Canada insurance, parent sponsor insurance, immigration insurance requirements',
  authors: [{ name: 'Harsha - HashLife Insurers' }],
  creator: 'HashLife Insurers',
  publisher: 'HashLife Insurers',
  robots: 'index, follow',
  viewport: 'width=device-width, initial-scale=1',
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    url: 'https://hashlife-insurance.com',
    siteName: 'HashLife Insurers',
    title: 'LLQP Certified Insurance Agent Ontario | HashLife Insurers',
    description: 'Local LLQP certified life insurance agent in Ontario. Compare quotes from multiple providers for life insurance, travel insurance, funeral expense coverage.',
    images: [
      {
        url: '/app/assets/HashLyf.png',
        width: 1200,
        height: 630,
        alt: 'HashLife Insurers - LLQP Certified Agent Ontario',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LLQP Certified Insurance Agent Ontario | HashLife Insurers',
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
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "LocalBusiness",
                "@id": "https://hashlife-insurance.com/#business",
                "name": "HashLife Insurers",
                "alternateName": ["HashLife Insurance Services", "Harsha - HashLife Insurers", "LLQP Certified Agent Ontario"],
                "description": "LLQP certified life insurance agent in Ontario offering life insurance, travel insurance for parents and grandparents, funeral expense coverage, critical illness insurance, and Super Visa insurance. Serving Toronto, Ottawa, Hamilton, Mississauga and all Ontario cities.",
                "url": "https://hashlife-insurance.com",
                "telephone": "+1-XXX-XXX-XXXX",
                "email": "harsha.whf@gmail.com",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Ontario",
                  "addressRegion": "ON",
                  "addressCountry": "CA"
                },
                "geo": [
                  {
                    "@type": "GeoCoordinates",
                    "latitude": 43.6532,
                    "longitude": -79.3832,
                    "address": "Toronto, ON"
                  },
                  {
                    "@type": "GeoCoordinates", 
                    "latitude": 45.4215,
                    "longitude": -75.6972,
                    "address": "Ottawa, ON"
                  },
                  {
                    "@type": "GeoCoordinates",
                    "latitude": 43.2557,
                    "longitude": -79.8711,
                    "address": "Hamilton, ON"
                  },
                  {
                    "@type": "GeoCoordinates",
                    "latitude": 43.5890,
                    "longitude": -79.6441,
                    "address": "Mississauga, ON"
                  }
                ],
                "areaServed": [
                  {
                    "@type": "State",
                    "name": "Ontario",
                    "containsPlace": [
                      {"@type": "City", "name": "Toronto"},
                      {"@type": "City", "name": "Ottawa"},
                      {"@type": "City", "name": "Hamilton"},
                      {"@type": "City", "name": "Mississauga"},
                      {"@type": "City", "name": "London"},
                      {"@type": "City", "name": "Windsor"},
                      {"@type": "City", "name": "Kitchener"},
                      {"@type": "City", "name": "Waterloo"},
                      {"@type": "City", "name": "Brampton"},
                      {"@type": "City", "name": "Markham"}
                    ]
                  }
                ],
                "serviceType": [
                  "Life Insurance Ontario",
                  "Travel Insurance for Parents and Grandparents", 
                  "Super Visa Insurance Canada",
                  "Funeral Expense Insurance",
                  "Critical Illness Coverage",
                  "Term Life Insurance",
                  "Whole Life Insurance",
                  "Visitor Insurance Canada"
                ],
                "knowsAbout": [
                  "LLQP License Ontario",
                  "Life Insurance Underwriting",
                  "Travel Insurance Requirements",
                  "Super Visa Compliance",
                  "Insurance Needs Assessment",
                  "Policy Comparison",
                  "Risk Assessment"
                ],
                "priceRange": "$$",
                "currenciesAccepted": "CAD",
                "paymentAccepted": ["Cash", "Credit Card", "Bank Transfer", "Online Payment"],
                "hasCredential": {
                  "@type": "EducationalOccupationalCredential",
                  "name": "Life License Qualification Program (LLQP)",
                  "credentialCategory": "Professional License",
                  "recognizedBy": {
                    "@type": "Organization",
                    "name": "Financial Services Regulatory Authority of Ontario (FSRAO)"
                  }
                },
                "memberOf": {
                  "@type": "Organization",
                  "name": "WhiteHorse Financial",
                  "url": "https://whitehorsefinancial.com"
                },
                "sameAs": [
                  "https://linkedin.com/company/hashlife-insurance",
                  "https://facebook.com/hashlife-insurance",
                  "https://www.google.com/search?q=HashLife+Insurance+Ontario"
                ],
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "5.0",
                  "reviewCount": "32",
                  "bestRating": "5",
                  "worstRating": "1"
                },
                "review": [
                  {
                    "@type": "Review",
                    "author": {
                      "@type": "Person",
                      "name": "Johnson Family"
                    },
                    "reviewRating": {
                      "@type": "Rating",
                      "ratingValue": "5",
                      "bestRating": "5"
                    },
                    "reviewBody": "Harsha helped us restructure our life insurance into a comprehensive $150K term life + $25K funeral plan, saving us $180/month while doubling our coverage protection."
                  }
                ],
                "openingHours": [
                  "Mo-Fr 09:00-18:00",
                  "Sa 10:00-14:00"
                ],
                "hasOfferCatalog": {
                  "@type": "OfferCatalog",
                  "name": "Insurance Services",
                  "itemListElement": [
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Life Insurance Ontario",
                        "description": "Term and permanent life insurance policies for Ontario residents",
                        "serviceType": "Life Insurance"
                      }
                    },
                    {
                      "@type": "Offer", 
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Parents & Grandparents Travel Insurance",
                        "description": "Travel insurance for visiting parents and grandparents including Super Visa requirements",
                        "serviceType": "Travel Insurance"
                      }
                    }
                  ]
                }
              },
              {
                "@context": "https://schema.org",
                "@type": "Person",
                "@id": "https://hashlife-insurance.com/#person",
                "name": "Harsha",
                "jobTitle": "LLQP Certified Life Insurance Agent",
                "worksFor": {
                  "@type": "Organization",
                  "name": "WhiteHorse Financial"
                },
                "hasCredential": {
                  "@type": "EducationalOccupationalCredential",
                  "name": "LLQP Certification"
                },
                "knowsAbout": [
                  "Life Insurance",
                  "Travel Insurance", 
                  "Super Visa Requirements",
                  "Funeral Expense Insurance",
                  "Critical Illness Coverage"
                ],
                "serviceArea": "Ontario, Canada",
                "email": "harsha.whf@gmail.com",
                "makesOffer": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Free Insurance Consultation",
                      "description": "Complimentary insurance needs assessment and quote comparison"
                    },
                    "priceSpecification": {
                      "@type": "PriceSpecification",
                      "price": "0",
                      "priceCurrency": "CAD"
                    }
                  }
                ]
              },
              {
                "@context": "https://schema.org",
                "@type": "WebPage",
                "@id": "https://hashlife-insurance.com/#webpage",
                "url": "https://hashlife-insurance.com",
                "name": "LLQP Certified Life Insurance Agent Ontario | HashLife Insurance",
                "description": "Local LLQP certified life insurance agent in Ontario. Compare quotes from multiple providers for life insurance, travel insurance for parents and grandparents, funeral expense coverage.",
                "keywords": "life insurance Ontario, LLQP certified agent, travel insurance parents grandparents, super visa insurance, funeral expense insurance, local insurance agent Toronto Ottawa Hamilton Mississauga",
                "inLanguage": "en-CA",
                "isPartOf": {
                  "@type": "WebSite",
                  "@id": "https://hashlife-insurance.com/#website",
                  "url": "https://hashlife-insurance.com",
                  "name": "HashLife Insurers",
                  "potentialAction": {
                    "@type": "SearchAction",
                    "target": "https://hashlife-insurance.com/?s={search_term_string}",
                    "query-input": "required name=search_term_string"
                  }
                },
                "mainEntity": {
                  "@id": "https://hashlife-insurance.com/#business"
                },
                "breadcrumb": {
                  "@type": "BreadcrumbList",
                  "itemListElement": [
                    {
                      "@type": "ListItem",
                      "position": 1,
                      "name": "Home",
                      "item": "https://hashlife-insurance.com"
                    },
                    {
                      "@type": "ListItem",
                      "position": 2, 
                      "name": "Services",
                      "item": "https://hashlife-insurance.com#services"
                    },
                    {
                      "@type": "ListItem",
                      "position": 3,
                      "name": "Contact",
                      "item": "https://hashlife-insurance.com#contact"
                    }
                  ]
                }
              }
            ])
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}