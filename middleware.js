import { NextResponse } from 'next/server'

export function middleware(request) {
  const response = NextResponse.next()
  
  const country = request.headers.get('cf-ipcountry') || 
                  request.headers.get('x-vercel-ip-country') ||
                  request.geo?.country ||
                  'CA'
  
  const region = request.headers.get('cf-region') || 
                 request.headers.get('x-vercel-ip-country-region') ||
                 request.geo?.region ||
                 'ON'
  
  const city = request.headers.get('cf-city') || 
               request.headers.get('x-vercel-ip-city') ||
               request.geo?.city ||
               'Toronto'

  response.headers.set('x-geo-country', country)
  response.headers.set('x-geo-region', region)
  response.headers.set('x-geo-city', city)
  
  const isLocalMarket = country === 'CA' && region === 'ON'
  response.headers.set('x-local-market', isLocalMarket ? 'true' : 'false')
  
  if (country === 'US') {
    response.headers.set('x-content-variation', 'us-visitor')
  } else if (country === 'CA' && region === 'QC') {
    response.headers.set('x-content-variation', 'quebec-bilingual')
  } else if (isLocalMarket) {
    response.headers.set('x-content-variation', 'ontario-local')
  } else {
    response.headers.set('x-content-variation', 'international')
  }
  
  response.headers.set('Cache-Control', 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800')
  
  if (request.nextUrl.pathname.startsWith('/api/')) {
    response.headers.set('Cache-Control', 'public, max-age=300, s-maxage=3600')
  }
  
  if (request.nextUrl.pathname.match(/\.(css|js|png|jpg|jpeg|gif|ico|svg|woff|woff2)$/)) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
  }
  
  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}