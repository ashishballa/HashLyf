import { getLocationFromIP } from '../../lib/geo'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }
  
  try {
    const forwarded = req.headers['x-forwarded-for']
    const ip = forwarded ? forwarded.split(',')[0] : req.connection.remoteAddress || req.socket.remoteAddress
    
    const clientIP = ip === '::1' || ip === '127.0.0.1' ? null : ip
    
    if (!clientIP) {
      return res.status(200).json({
        country: 'CA',
        region: 'ON',
        city: 'Toronto',
        postal: 'M5H',
        latitude: 43.6532,
        longitude: -79.3832,
        timezone: 'America/Toronto',
        source: 'default'
      })
    }
    
    const location = await getLocationFromIP(clientIP)
    
    if (!location) {
      return res.status(200).json({
        country: 'CA',
        region: 'ON', 
        city: 'Toronto',
        postal: 'M5H',
        latitude: 43.6532,
        longitude: -79.3832,
        timezone: 'America/Toronto',
        source: 'fallback'
      })
    }
    
    res.status(200).json({
      ...location,
      source: 'ip'
    })
    
  } catch (error) {
    console.error('Geo API Error:', error)
    res.status(200).json({
      country: 'CA',
      region: 'ON',
      city: 'Toronto', 
      postal: 'M5H',
      latitude: 43.6532,
      longitude: -79.3832,
      timezone: 'America/Toronto',
      source: 'error_fallback'
    })
  }
}