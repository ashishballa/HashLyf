'use client'

import { useEffect } from 'react'

export const ChatbotPersonalization = ({ userData, geoContent }) => {
  
  const getPersonalizedGreeting = () => {
    const hour = new Date().getHours()
    let timeGreeting = 'Hello'
    
    if (hour < 12) timeGreeting = 'Good morning'
    else if (hour < 17) timeGreeting = 'Good afternoon'  
    else timeGreeting = 'Good evening'
    
    const locationText = geoContent?.title ? ` I see you're in ${geoContent.title.split('|')[0].trim()}. ` : ' '
    
    return `${timeGreeting}!${locationText}I'm here to help you find the perfect life insurance coverage.`
  }

  const getLocalizedQuestions = () => {
    const isLocalMarket = geoContent?.title?.includes('Ontario')
    
    return {
      smokingQuestion: isLocalMarket 
        ? "Are you currently a smoker? (This affects your rates in Ontario)"
        : "Are you currently a smoker? (This significantly affects premium rates)",
      
      coverageQuestion: isLocalMarket
        ? "What coverage amount are you considering? Here are typical ranges for Ontario residents:"
        : "What coverage amount are you considering? Here are common coverage levels:",
        
      followUpMessage: isLocalMarket
        ? "As an LLQP certified agent in Ontario, I can help you navigate the local insurance landscape and compare quotes from multiple Ontario-licensed providers."
        : "I can help you find coverage that meets your needs and compare options from multiple insurance providers."
    }
  }

  return { getPersonalizedGreeting, getLocalizedQuestions }
}

export const ChatbotAnalytics = () => {
  
  const trackChatbotEvent = (eventType, data = {}) => {
    // Google Analytics 4 Events
    if (typeof gtag !== 'undefined') {
      gtag('event', eventType, {
        event_category: 'Chatbot',
        ...data
      })
    }

    // Hotjar Events  
    if (typeof window !== 'undefined' && window.hj) {
      window.hj('event', eventType, data)
    }
  }

  const trackConversationFlow = (step, userResponse) => {
    trackChatbotEvent('chatbot_step_completion', {
      step: step,
      response: userResponse?.substring(0, 50), // Limit length for privacy
      custom_parameter_conversion_funnel: step
    })
  }

  const trackAbandon = (step, timeSpent) => {
    trackChatbotEvent('chatbot_abandon', {
      abandon_step: step,
      time_spent: timeSpent,
      custom_parameter_abandon_reason: 'user_exit'
    })
  }

  const trackConversion = (userData, estimatedValue) => {
    trackChatbotEvent('chatbot_lead_generated', {
      lead_value: estimatedValue,
      insurance_type: userData.insuranceType,
      coverage_amount: userData.coverageAmount,
      custom_parameter_lead_score: calculateLeadScore(userData)
    })
  }

  const calculateLeadScore = (userData) => {
    let score = 0
    
    // Age scoring (peak insurance buying age gets higher score)
    const age = parseInt(userData.age)
    if (age >= 25 && age <= 45) score += 30
    else if (age >= 18 && age <= 55) score += 20
    else score += 10
    
    // Non-smoker bonus
    if (userData.smoker === 'No') score += 25
    else if (userData.smoker?.includes('Former')) score += 15
    
    // Coverage amount commitment
    if (userData.coverageAmount && !userData.coverageAmount.includes('Not sure')) score += 25
    else score += 10
    
    // Complete contact info
    if (userData.email && userData.phone) score += 20
    
    return Math.min(score, 100) // Cap at 100
  }

  return {
    trackChatbotEvent,
    trackConversationFlow, 
    trackAbandon,
    trackConversion,
    calculateLeadScore
  }
}

export const ChatbotValidation = () => {
  
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return emailRegex.test(email)
  }

  const validatePhone = (phone) => {
    // Canadian and US phone number validation
    const phoneRegex = /^[\+]?[1]?[-.\s]?[(]?[0-9]{3}[)]?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}$/
    const cleanPhone = phone.replace(/\D/g, '')
    return cleanPhone.length >= 10 && phoneRegex.test(phone)
  }

  const validateAge = (age) => {
    const ageNum = parseInt(age)
    return ageNum >= 18 && ageNum <= 100
  }

  const sanitizeInput = (input) => {
    return input.trim()
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .substring(0, 200) // Limit length
  }

  const formatPhone = (phone) => {
    const cleanPhone = phone.replace(/\D/g, '')
    if (cleanPhone.length === 10) {
      return `(${cleanPhone.slice(0,3)}) ${cleanPhone.slice(3,6)}-${cleanPhone.slice(6)}`
    }
    if (cleanPhone.length === 11 && cleanPhone[0] === '1') {
      return `+1 (${cleanPhone.slice(1,4)}) ${cleanPhone.slice(4,7)}-${cleanPhone.slice(7)}`
    }
    return phone
  }

  return {
    validateEmail,
    validatePhone,
    validateAge,
    sanitizeInput,
    formatPhone
  }
}

export const ChatbotAI = () => {
  
  const detectIntent = (userMessage) => {
    const msg = userMessage.toLowerCase()
    
    if (msg.includes('price') || msg.includes('cost') || msg.includes('premium') || msg.includes('$')) {
      return 'pricing_inquiry'
    }
    
    if (msg.includes('cancel') || msg.includes('stop') || msg.includes('no thank')) {
      return 'cancellation'
    }
    
    if (msg.includes('help') || msg.includes('support') || msg.includes('agent')) {
      return 'help_request'  
    }
    
    if (msg.includes('travel') || msg.includes('visitor') || msg.includes('parent')) {
      return 'travel_insurance'
    }
    
    return 'standard'
  }

  const generateSmartResponse = (intent, context) => {
    switch (intent) {
      case 'pricing_inquiry':
        return {
          text: "I understand you're interested in pricing. Let me gather some quick details to give you an accurate estimate. Insurance premiums depend on factors like age, health status, and coverage amount.",
          quickReplies: ['Get Quick Quote', 'Explain Factors', 'Compare Options']
        }
        
      case 'cancellation':
        return {
          text: "No worries at all! You're under no obligation. If you change your mind later, I'll be here to help. Would you like me to save your progress for later?",
          quickReplies: ['Save for Later', 'Continue Anyway', 'Close Chat']
        }
        
      case 'help_request':
        return {
          text: "I'm here to help! I'm an AI assistant that can help you get insurance quotes, but I work with LLQP certified agents who will provide personalized service. What specific help do you need?",
          quickReplies: ['Get Quote', 'Speak to Agent', 'Learn About Insurance']
        }
        
      case 'travel_insurance':
        return {
          text: "Great! I can definitely help with travel insurance, especially for parents and grandparents visiting Canada or Super Visa requirements. Let me connect you with specialized travel insurance options.",
          quickReplies: ['Super Visa Insurance', 'Visitor Insurance', 'General Travel']
        }
        
      default:
        return null
    }
  }

  return {
    detectIntent,
    generateSmartResponse
  }
}

// Export utilities for use in main Chatbot component
export default {
  ChatbotPersonalization,
  ChatbotAnalytics,
  ChatbotValidation,
  ChatbotAI
}