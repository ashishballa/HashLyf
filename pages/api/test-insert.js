import { supabase, isSupabaseEnabled } from '../../lib/supabase'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }
  
  try {
    if (!isSupabaseEnabled()) {
      return res.status(200).json({ 
        success: false, 
        message: 'Supabase not configured'
      })
    }

    // Test data matching chatbot format
    const testData = {
      first_name: 'Test',
      last_name: 'User',
      email: 'test@example.com',
      phone: '1234567890',
      gender: 'male',
      smoker: false,
      birth_year: 1990,
      birth_month: 1,
      birth_day: 1,
      coverage_level: '250000',
      created_at: new Date().toISOString()
    }

    console.log('Attempting to insert test data:', JSON.stringify(testData, null, 2))

    const { data, error } = await supabase
      .from('quote_requests')
      .insert([testData])

    if (error) {
      console.error('Test insert error:', error)
      return res.status(400).json({
        success: false,
        error: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
        testData
      })
    }

    res.status(200).json({
      success: true,
      message: 'Test insert successful',
      insertedData: data,
      testData
    })

  } catch (error) {
    console.error('Test insert API error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    })
  }
}