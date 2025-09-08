export const getLocationFromIP = async (ip) => {
  try {
    const response = await fetch(`https://ipapi.co/${ip}/json/`)
    const data = await response.json()
    return {
      country: data.country_code,
      region: data.region,
      city: data.city,
      postal: data.postal,
      latitude: data.latitude,
      longitude: data.longitude,
      timezone: data.timezone
    }
  } catch (error) {
    console.error('Error getting location:', error)
    return null
  }
}

export const getClientLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation not supported'))
      return
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy
        })
      },
      (error) => reject(error),
      { 
        enableHighAccuracy: true, 
        timeout: 10000, 
        maximumAge: 300000 
      }
    )
  })
}

export const getDistanceToService = (userLat, userLng, serviceLat, serviceLng) => {
  const R = 6371
  const dLat = (serviceLat - userLat) * Math.PI / 180
  const dLng = (serviceLng - userLng) * Math.PI / 180
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(userLat * Math.PI / 180) * Math.cos(serviceLat * Math.PI / 180) *
    Math.sin(dLng/2) * Math.sin(dLng/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  return R * c
}

export const getGeoTargetedContent = (location) => {
  const geoContent = {
    'CA-ON': {
      title: 'LLQP Certified Life Insurance Agent Ontario',
      description: 'Local LLQP certified agent serving Toronto, Ottawa, Hamilton, Mississauga',
      currency: 'CAD',
      timezone: 'America/Toronto',
      services: ['Life Insurance', 'Travel Insurance', 'Super Visa Insurance', 'Funeral Expense'],
      localNumbers: ['+1-416-XXX-XXXX', '+1-613-XXX-XXXX'],
      languages: ['English', 'French']
    },
    'CA-QC': {
      title: 'Agent d\'assurance vie certifié LLQP Québec',
      description: 'Agent certifié local servant Montréal, Québec, Laval, Gatineau',
      currency: 'CAD',
      timezone: 'America/Toronto',
      services: ['Assurance vie', 'Assurance voyage', 'Assurance Super Visa'],
      localNumbers: ['+1-514-XXX-XXXX', '+1-418-XXX-XXXX'],
      languages: ['Français', 'English']
    },
    'US': {
      title: 'Canadian Life Insurance for US Visitors',
      description: 'Life insurance services for US residents visiting or immigrating to Canada',
      currency: 'USD',
      timezone: 'America/New_York',
      services: ['Visitor Life Insurance', 'Immigration Insurance', 'Cross-Border Coverage'],
      localNumbers: ['+1-XXX-XXX-XXXX'],
      languages: ['English']
    },
    'default': {
      title: 'International Life Insurance Services',
      description: 'Professional insurance services for international clients',
      currency: 'CAD',
      timezone: 'America/Toronto',
      services: ['International Life Insurance', 'Travel Insurance', 'Global Coverage'],
      localNumbers: ['+1-XXX-XXX-XXXX'],
      languages: ['English']
    }
  }
  
  const region = location?.country === 'CA' ? `${location.country}-${location.region}` : location?.country || 'default'
  return geoContent[region] || geoContent['default']
}

export const generateLocalBusinessSchema = (location, geoContent) => {
  const baseSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "HashLife Insurers",
    "description": geoContent.description,
    "url": "https://hashlife-insurance.com",
    "telephone": geoContent.localNumbers[0],
    "priceRange": "$$",
    "currenciesAccepted": geoContent.currency,
    "serviceType": geoContent.services,
    "areaServed": {
      "@type": location?.country === 'CA' ? "State" : "Country",
      "name": location?.country === 'CA' ? getProvinceName(location.region) : location?.country
    }
  }
  
  if (location?.latitude && location?.longitude) {
    baseSchema.geo = {
      "@type": "GeoCoordinates",
      "latitude": location.latitude,
      "longitude": location.longitude
    }
  }
  
  return baseSchema
}

const getProvinceName = (code) => {
  const provinces = {
    'ON': 'Ontario',
    'QC': 'Quebec',
    'BC': 'British Columbia',
    'AB': 'Alberta',
    'SK': 'Saskatchewan',
    'MB': 'Manitoba',
    'NB': 'New Brunswick',
    'NS': 'Nova Scotia',
    'PE': 'Prince Edward Island',
    'NL': 'Newfoundland and Labrador',
    'YT': 'Yukon',
    'NT': 'Northwest Territories',
    'NU': 'Nunavut'
  }
  return provinces[code] || code
}