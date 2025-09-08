import { useState, useEffect } from 'react'
import { getLocationFromIP, getClientLocation, getGeoTargetedContent } from '../lib/geo'

export const useGeoLocation = () => {
  const [location, setLocation] = useState(null)
  const [geoContent, setGeoContent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const detectLocation = async () => {
      try {
        setLoading(true)
        
        let detectedLocation = null
        
        try {
          const position = await getClientLocation()
          detectedLocation = {
            latitude: position.latitude,
            longitude: position.longitude,
            source: 'gps'
          }
        } catch (gpsError) {
          console.log('GPS location not available, falling back to IP detection')
          
          try {
            const response = await fetch('/api/geo')
            const ipLocation = await response.json()
            detectedLocation = { ...ipLocation, source: 'ip' }
          } catch (ipError) {
            console.log('IP location detection failed')
            detectedLocation = {
              country: 'CA',
              region: 'ON',
              city: 'Toronto',
              source: 'default'
            }
          }
        }
        
        setLocation(detectedLocation)
        const content = getGeoTargetedContent(detectedLocation)
        setGeoContent(content)
        
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('userLocation', JSON.stringify(detectedLocation))
          sessionStorage.setItem('geoContent', JSON.stringify(content))
        }
        
      } catch (err) {
        setError(err.message)
        setGeoContent(getGeoTargetedContent(null))
      } finally {
        setLoading(false)
      }
    }

    if (typeof window !== 'undefined') {
      const cached = sessionStorage.getItem('userLocation')
      const cachedContent = sessionStorage.getItem('geoContent')
      
      if (cached && cachedContent) {
        setLocation(JSON.parse(cached))
        setGeoContent(JSON.parse(cachedContent))
        setLoading(false)
        return
      }
    }

    detectLocation()
  }, [])

  return { location, geoContent, loading, error }
}

export const useGeoTargeting = () => {
  const { location, geoContent, loading } = useGeoLocation()
  
  const getLocalizedTitle = (baseTitle) => {
    if (!geoContent) return baseTitle
    return geoContent.title || baseTitle
  }
  
  const getLocalizedDescription = (baseDescription) => {
    if (!geoContent) return baseDescription
    return geoContent.description || baseDescription
  }
  
  const getCurrency = () => {
    return geoContent?.currency || 'CAD'
  }
  
  const getTimezone = () => {
    return geoContent?.timezone || 'America/Toronto'
  }
  
  const getLocalPhoneNumber = () => {
    return geoContent?.localNumbers?.[0] || '+1-XXX-XXX-XXXX'
  }
  
  const isLocalMarket = () => {
    return location?.country === 'CA' && location?.region === 'ON'
  }
  
  const getSupportedLanguages = () => {
    return geoContent?.languages || ['English']
  }
  
  return {
    location,
    geoContent,
    loading,
    getLocalizedTitle,
    getLocalizedDescription,
    getCurrency,
    getTimezone,
    getLocalPhoneNumber,
    isLocalMarket,
    getSupportedLanguages
  }
}