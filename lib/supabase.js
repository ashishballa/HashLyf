import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

console.log('Supabase environment variables:')
console.log('URL:', supabaseUrl ? 'Set' : 'Missing')
console.log('Key:', supabaseKey ? 'Set (first 10 chars: ' + supabaseKey.substring(0, 10) + '...)' : 'Missing')

// Handle missing environment variables gracefully
export const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : null

console.log('Supabase client created:', Boolean(supabase))

// Helper function to check if Supabase is available
export const isSupabaseEnabled = () => {
  const enabled = Boolean(supabase)
  console.log('isSupabaseEnabled called, returning:', enabled)
  return enabled
}