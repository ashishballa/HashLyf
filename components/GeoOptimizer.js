'use client'

import { useEffect } from 'react'
import { useGeoTargeting } from '../hooks/useGeoLocation'
import Head from 'next/head'

export default function GeoOptimizer() {
  const { 
    location, 
    geoContent, 
    loading, 
    getLocalizedTitle, 
    getLocalizedDescription,
    getCurrency,
    getTimezone,
    isLocalMarket
  } = useGeoTargeting()

  useEffect(() => {
    if (!loading && location) {
      const event = new CustomEvent('geoLocationDetected', { 
        detail: { location, geoContent } 
      })
      window.dispatchEvent(event)
      
      if (typeof gtag !== 'undefined') {
        gtag('config', 'GA_MEASUREMENT_ID', {
          custom_map: {
            dimension1: location.country,
            dimension2: location.region,
            dimension3: location.city,
            dimension4: location.source
          }
        })
        
        gtag('event', 'geo_detection', {
          event_category: 'Geography',
          event_label: `${location.country}-${location.region}`,
          custom_parameter_1: location.source
        })
      }
      
      document.documentElement.setAttribute('data-geo-region', location.country)
      document.documentElement.setAttribute('data-geo-market', isLocalMarket() ? 'local' : 'international')
    }
  }, [location, geoContent, loading, isLocalMarket])

  if (loading) {
    return (
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const style = document.createElement('style');
                style.innerHTML = '.geo-content { opacity: 0; transition: opacity 0.3s ease; }';
                document.head.appendChild(style);
              })();
            `
          }}
        />
      </Head>
    )
  }

  const generateLocalBusinessLD = () => {
    if (!location || !geoContent) return null

    const businessSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": "https://hashlife-insurance.com/#localbusiness",
      "name": "HashLife Insurers",
      "alternateName": geoContent.title,
      "description": geoContent.description,
      "url": "https://hashlife-insurance.com",
      "telephone": geoContent.localNumbers?.[0],
      "email": "harsha.whf@gmail.com",
      "priceRange": "$$",
      "currenciesAccepted": geoContent.currency,
      "paymentAccepted": ["Cash", "Credit Card", "Bank Transfer"],
      "address": {
        "@type": "PostalAddress",
        "addressCountry": location.country,
        "addressRegion": location.region,
        "addressLocality": location.city || "Ontario"
      },
      "areaServed": {
        "@type": location.country === 'CA' ? "State" : "Country", 
        "name": location.country === 'CA' ? getProvinceName(location.region) : location.country
      },
      "serviceType": geoContent.services,
      "knowsLanguage": geoContent.languages,
      "openingHours": [
        "Mo-Fr 09:00-18:00",
        "Sa 10:00-14:00"
      ]
    }

    if (location.latitude && location.longitude) {
      businessSchema.geo = {
        "@type": "GeoCoordinates",
        "latitude": location.latitude,
        "longitude": location.longitude
      }
    }

    return businessSchema
  }

  const getProvinceName = (code) => {
    const provinces = {
      'ON': 'Ontario', 'QC': 'Quebec', 'BC': 'British Columbia', 'AB': 'Alberta',
      'SK': 'Saskatchewan', 'MB': 'Manitoba', 'NB': 'New Brunswick', 'NS': 'Nova Scotia',
      'PE': 'Prince Edward Island', 'NL': 'Newfoundland and Labrador'
    }
    return provinces[code] || code
  }

  return (
    <Head>
      {geoContent && (
        <>
          <meta name="geo.region" content={`${location?.country}-${location?.region}`} />
          <meta name="geo.placename" content={location?.city} />
          <meta name="geo.position" content={location?.latitude && location?.longitude ? `${location.latitude};${location.longitude}` : undefined} />
          <meta name="ICBM" content={location?.latitude && location?.longitude ? `${location.latitude}, ${location.longitude}` : undefined} />
          
          <meta property="business:contact_data:locality" content={location?.city} />
          <meta property="business:contact_data:region" content={location?.region} />
          <meta property="business:contact_data:country_name" content={location?.country} />
          
          {location?.country !== 'CA' && (
            <meta name="robots" content="index, follow, max-snippet:200" />
          )}
          
          <link rel="alternate" hrefLang="en-ca" href="https://hashlife-insurance.com/" />
          <link rel="alternate" hrefLang="fr-ca" href="https://hashlife-insurance.com/fr" />
          <link rel="alternate" hrefLang="en-us" href="https://hashlife-insurance.com/us" />
          <link rel="alternate" hrefLang="x-default" href="https://hashlife-insurance.com/" />
          
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(generateLocalBusinessLD())
            }}
          />
          
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  const style = document.createElement('style');
                  style.innerHTML = \`
                    .geo-content { opacity: 1 !important; }
                    [data-geo-region="CA"] .ca-only { display: block !important; }
                    [data-geo-region="US"] .us-only { display: block !important; }
                    [data-geo-market="local"] .local-only { display: block !important; }
                    [data-geo-market="international"] .international-only { display: block !important; }
                    .ca-only, .us-only, .local-only, .international-only { display: none; }
                  \`;
                  document.head.appendChild(style);
                })();
              `
            }}
          />
        </>
      )}
    </Head>
  )
}