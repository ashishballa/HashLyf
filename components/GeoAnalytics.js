'use client'

import { useEffect } from 'react'
import { useGeoTargeting } from '../hooks/useGeoLocation'

export default function GeoAnalytics() {
  const { location, geoContent, loading } = useGeoTargeting()

  useEffect(() => {
    if (!loading && location && typeof window !== 'undefined') {
      const script = document.createElement('script')
      script.async = true
      script.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID || 'GA_MEASUREMENT_ID'}`
      document.head.appendChild(script)

      script.onload = () => {
        window.dataLayer = window.dataLayer || []
        function gtag() {
          dataLayer.push(arguments)
        }
        window.gtag = gtag

        gtag('js', new Date())
        gtag('config', process.env.NEXT_PUBLIC_GA_ID || 'GA_MEASUREMENT_ID', {
          page_title: geoContent?.title,
          custom_map: {
            dimension1: location.country,
            dimension2: location.region, 
            dimension3: location.city,
            dimension4: location.source,
            dimension5: geoContent?.currency
          },
          geo_country: location.country,
          geo_region: location.region,
          geo_city: location.city
        })

        gtag('event', 'geo_optimization_load', {
          event_category: 'Geography',
          event_label: `${location.country}-${location.region}-${location.city}`,
          custom_parameter_geo_source: location.source,
          custom_parameter_market_type: location.country === 'CA' && location.region === 'ON' ? 'local' : 'international',
          custom_parameter_content_variation: getContentVariation()
        })

        if (location.latitude && location.longitude) {
          gtag('event', 'precise_location_detected', {
            event_category: 'Geography',
            event_label: 'GPS_Coordinates',
            custom_parameter_accuracy: location.accuracy || 'unknown'
          })
        }

        gtag('event', 'page_view', {
          page_title: geoContent?.title,
          page_location: window.location.href,
          geo_country: location.country,
          geo_region: location.region,
          geo_city: location.city,
          content_group1: getContentVariation(),
          content_group2: geoContent?.currency,
          content_group3: location.source
        })
      }

      const hotjarScript = document.createElement('script')
      hotjarScript.innerHTML = `
        (function(h,o,t,j,a,r){
          h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
          h._hjSettings={hjid:${process.env.NEXT_PUBLIC_HOTJAR_ID || '0'},hjsv:6};
          a=o.getElementsByTagName('head')[0];
          r=o.createElement('script');r.async=1;
          r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
          a.appendChild(r);
        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
        
        if (window.hj) {
          hj('identify', 'geo_user_${location.country}_${location.region}', {
            geo_country: '${location.country}',
            geo_region: '${location.region}', 
            geo_city: '${location.city}',
            market_type: '${location.country === 'CA' && location.region === 'ON' ? 'local' : 'international'}',
            content_variation: '${getContentVariation()}',
            detection_source: '${location.source}'
          });
        }
      `
      document.head.appendChild(hotjarScript)

      if (location.country === 'CA' && location.region === 'ON') {
        gtag('event', 'local_market_visitor', {
          event_category: 'Marketing',
          event_label: 'Ontario_Local_Market',
          value: 100
        })
      } else if (location.country === 'US') {
        gtag('event', 'international_visitor', {
          event_category: 'Marketing', 
          event_label: 'US_Visitor',
          value: 50
        })
      }

      const performanceObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'navigation') {
            gtag('event', 'page_load_performance', {
              event_category: 'Performance',
              event_label: `${location.country}-${location.region}`,
              custom_parameter_load_time: Math.round(entry.loadEventEnd - entry.loadEventStart),
              custom_parameter_dns_time: Math.round(entry.domainLookupEnd - entry.domainLookupStart),
              custom_parameter_connect_time: Math.round(entry.connectEnd - entry.connectStart),
              custom_parameter_ttfb: Math.round(entry.responseStart - entry.requestStart)
            })
          }
        }
      })
      
      performanceObserver.observe({ entryTypes: ['navigation'] })

      return () => {
        performanceObserver.disconnect()
      }
    }
  }, [location, geoContent, loading])

  const getContentVariation = () => {
    if (!location) return 'default'
    if (location.country === 'US') return 'us_visitor'
    if (location.country === 'CA' && location.region === 'QC') return 'quebec_bilingual'
    if (location.country === 'CA' && location.region === 'ON') return 'ontario_local'
    return 'international'
  }

  return null
}