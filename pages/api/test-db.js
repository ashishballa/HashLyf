import { supabase, isSupabaseEnabled } from '../../lib/supabase'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }
  
  try {
    if (!isSupabaseEnabled()) {
      return res.status(200).json({ 
        success: false, 
        message: 'Supabase not configured',
        configured: false
      })
    }

    // Test database connection by selecting from quote_requests table
    const { data, error, count } = await supabase
      .from('quote_requests')
      .select('id, first_name, created_at', { count: 'exact' })
      .limit(5)

    if (error) {
      console.error('Database test error:', error)
      return res.status(200).json({
        success: false,
        configured: true,
        error: error.message,
        details: error
      })
    }

    res.status(200).json({
      success: true,
      configured: true,
      message: 'Database connection successful',
      totalRecords: count,
      sampleRecords: data?.length || 0,
      latestRecords: data
    })

  } catch (error) {
    console.error('Test API error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    })
  }
}