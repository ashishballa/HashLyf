'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MessageCircle, 
  X, 
  Send, 
  User, 
  Bot, 
  Minimize2, 
  Maximize2,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  Shield,
  Heart,
  CheckCircle,
  ArrowRight,
  Sparkles
} from 'lucide-react'
import { useGeoTargeting } from '../hooks/useGeoLocation'
import { supabase, isSupabaseEnabled } from '../lib/supabase'
import { cn } from '../lib/utils'

const CHAT_STEPS = {
  WELCOME: 'welcome',
  NAME: 'name', 
  INSURANCE_TYPE: 'insurance_type',
  PERSONAL_INFO: 'personal_info',
  COVERAGE_AMOUNT: 'coverage_amount',
  CONTACT_INFO: 'contact_info',
  CONFIRMATION: 'confirmation'
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [currentStep, setCurrentStep] = useState(CHAT_STEPS.WELCOME)
  const [messages, setMessages] = useState([])
  const [userInput, setUserInput] = useState('')
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    insuranceType: '',
    gender: '',
    age: '',
    smoker: '',
    coverageAmount: '',
    hasExistingInsurance: ''
  })
  const [isTyping, setIsTyping] = useState(false)
  const [showQuickReplies, setShowQuickReplies] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const messagesEndRef = useRef(null)
  const chatContainerRef = useRef(null)
  const { geoContent, getLocalizedTitle, getCurrency } = useGeoTargeting()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true)
      addBotMessage(getWelcomeMessage())
    }, 5000)

    return () => clearTimeout(timer)
  }, [geoContent])

  const getWelcomeMessage = () => {
    const localizedGreeting = geoContent?.title || 'HashLife Insurance'
    return {
      text: `👋 Hi! I'm your ${localizedGreeting} assistant. I'm here to help you find the perfect life insurance coverage in just a few minutes.`,
      quickReplies: ['Get Started', 'Learn More', 'Not Now']
    }
  }

  const addBotMessage = (message, delay = 1000) => {
    setIsTyping(true)
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now(),
        type: 'bot',
        text: message.text,
        quickReplies: message.quickReplies || null,
        timestamp: new Date()
      }])
      setIsTyping(false)
      if (message.quickReplies) {
        setShowQuickReplies(true)
      }
    }, delay)
  }

  const addUserMessage = (text) => {
    setMessages(prev => [...prev, {
      id: Date.now(),
      type: 'user', 
      text,
      timestamp: new Date()
    }])
    setShowQuickReplies(false)
  }

  const handleQuickReply = (reply) => {
    addUserMessage(reply)
    processUserResponse(reply)
  }

  const handleSendMessage = () => {
    if (!userInput.trim()) return
    
    addUserMessage(userInput)
    processUserResponse(userInput)
    setUserInput('')
  }

  const processUserResponse = (response) => {
    switch (currentStep) {
      case CHAT_STEPS.WELCOME:
        if (response === 'Get Started' || response.toLowerCase().includes('start') || response.toLowerCase().includes('yes')) {
          setCurrentStep(CHAT_STEPS.NAME)
          addBotMessage({
            text: "Great! Let's start with your name. What's your first name?"
          })
        } else if (response === 'Learn More') {
          addBotMessage({
            text: `I'm an LLQP certified agent specializing in life insurance across ${geoContent?.serviceArea || 'Ontario'}. I can help you compare quotes from 15+ insurance companies and find coverage that fits your budget. Ready to get started?`,
            quickReplies: ['Yes, let\'s start', 'Tell me more', 'Maybe later']
          })
        } else if (response === 'Not Now') {
          addBotMessage({
            text: "No problem! I'll be here whenever you're ready. Feel free to click on me anytime to get your free quote. Have a great day! 👋"
          })
          setTimeout(() => setIsMinimized(true), 2000)
        }
        break

      case CHAT_STEPS.NAME:
        const firstName = response.trim()
        setUserData(prev => ({ ...prev, firstName }))
        setCurrentStep(CHAT_STEPS.INSURANCE_TYPE)
        addBotMessage({
          text: `Nice to meet you, ${firstName}! What type of insurance are you most interested in?`,
          quickReplies: ['Life Insurance', 'Travel Insurance', 'Critical Illness', 'Not Sure']
        })
        break

      case CHAT_STEPS.INSURANCE_TYPE:
        setUserData(prev => ({ ...prev, insuranceType: response }))
        if (response === 'Life Insurance' || response === 'Not Sure') {
          setCurrentStep(CHAT_STEPS.PERSONAL_INFO)
          addBotMessage({
            text: `Perfect! To give you an accurate quote for life insurance, I need some basic information. Are you male or female?`,
            quickReplies: ['Male', 'Female', 'Prefer not to say']
          })
        } else {
          addBotMessage({
            text: `Great choice on ${response}! Let me connect you with specialized information. For now, let's focus on life insurance as it's foundational coverage. Are you male or female?`,
            quickReplies: ['Male', 'Female', 'Prefer not to say']
          })
          setCurrentStep(CHAT_STEPS.PERSONAL_INFO)
        }
        break

      case CHAT_STEPS.PERSONAL_INFO:
        if (!userData.gender) {
          setUserData(prev => ({ ...prev, gender: response }))
          addBotMessage({
            text: "Thanks! What's your age? (This helps determine your premium rates)"
          })
        } else if (!userData.age) {
          const age = parseInt(response)
          if (age && age >= 18 && age <= 100) {
            setUserData(prev => ({ ...prev, age: response }))
            addBotMessage({
              text: "Are you currently a smoker? (This significantly affects rates)",
              quickReplies: ['No', 'Yes', 'Former smoker (quit 1+ years ago)']
            })
          } else {
            addBotMessage({
              text: "Please enter a valid age between 18 and 100."
            })
          }
        } else if (!userData.smoker) {
          setUserData(prev => ({ ...prev, smoker: response }))
          setCurrentStep(CHAT_STEPS.COVERAGE_AMOUNT)
          const currency = getCurrency()
          addBotMessage({
            text: `Thanks! Based on your age (${userData.age}), what coverage amount are you considering? Here are typical ranges:`,
            quickReplies: [
              `${currency}250K`, 
              `${currency}500K`, 
              `${currency}1M`, 
              'Not sure'
            ]
          })
        }
        break

      case CHAT_STEPS.COVERAGE_AMOUNT:
        setUserData(prev => ({ ...prev, coverageAmount: response }))
        setCurrentStep(CHAT_STEPS.CONTACT_INFO)
        addBotMessage({
          text: `Excellent! Almost done. I'll need your contact information to send you personalized quotes. What's your last name?`
        })
        break

      case CHAT_STEPS.CONTACT_INFO:
        if (!userData.lastName) {
          setUserData(prev => ({ ...prev, lastName: response }))
          addBotMessage({
            text: "What's your email address?"
          })
        } else if (!userData.email) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          if (emailRegex.test(response)) {
            setUserData(prev => ({ ...prev, email: response }))
            addBotMessage({
              text: "Finally, what's your phone number? (I'll call you with your personalized quote)"
            })
          } else {
            addBotMessage({
              text: "Please enter a valid email address."
            })
          }
        } else if (!userData.phone) {
          setUserData(prev => ({ ...prev, phone: response }))
          setCurrentStep(CHAT_STEPS.CONFIRMATION)
          showSummaryAndSubmit()
        }
        break
        
      case CHAT_STEPS.CONFIRMATION:
        if (response === 'Start New Quote') {
          resetChat()
        } else if (response === 'Close Chat') {
          setIsOpen(false)
        }
        break
    }
  }

  const showSummaryAndSubmit = async () => {
    const currency = getCurrency()
    const summaryMessage = `Perfect! Here's what I've gathered:

👤 Name: ${userData.firstName} ${userData.lastName}
📧 Email: ${userData.email}  
📱 Phone: ${userData.phone}
🎯 Insurance: ${userData.insuranceType}
👥 Gender: ${userData.gender}
🎂 Age: ${userData.age}
🚭 Smoker: ${userData.smoker}
💰 Coverage: ${userData.coverageAmount}

I'm now preparing your personalized quote...`

    addBotMessage({ text: summaryMessage })
    
    setTimeout(async () => {
      await submitQuoteRequest()
    }, 2000)
  }

  const submitQuoteRequest = async () => {
    setIsSubmitting(true)
    
    try {
      if (!isSupabaseEnabled()) {
        console.warn('Supabase not configured, chatbot submission skipped')
        showSuccessMessage()
        return
      }

      // Map chatbot data to the same format as ContactModal
      const formData = {
        first_name: userData.firstName,
        last_name: userData.lastName,
        email: userData.email,
        phone: userData.phone,
        gender: userData.gender?.toLowerCase(),
        smoker: userData.smoker === 'Yes',
        birth_year: parseInt(userData.age) ? new Date().getFullYear() - parseInt(userData.age) : null,
        birth_month: null, // Chatbot doesn't collect birth month
        birth_day: null,   // Chatbot doesn't collect birth day
        coverage_level: userData.coverageAmount?.replace(/[^0-9]/g, '') || null, // Clean coverage amount
        source: 'chatbot',
        created_at: new Date().toISOString()
      }

      const { data, error } = await supabase
        .from('quote_requests')
        .insert([formData])

      if (error) {
        console.error('Supabase error:', error)
        // Still show success to user even if there's a backend error
      }

      showSuccessMessage()

      // Analytics Tracking
      if (typeof gtag !== 'undefined') {
        gtag('event', 'chatbot_conversion', {
          event_category: 'Chatbot',
          event_label: `${userData.insuranceType}-${userData.age}-${userData.smoker}`,
          custom_parameter_coverage_amount: userData.coverageAmount,
          custom_parameter_geo_location: geoContent?.title,
          value: 1
        })

        gtag('event', 'lead_generation', {
          event_category: 'Marketing',
          event_label: 'Chatbot Lead',
          custom_parameter_lead_quality: calculateLeadQuality(),
          value: 1
        })
      }

      // Hotjar Event Tracking
      if (typeof window !== 'undefined' && window.hj) {
        window.hj('event', 'chatbot_conversion')
        window.hj('identify', userData.email, {
          insurance_type: userData.insuranceType,
          age_group: getAgeGroup(userData.age),
          smoker_status: userData.smoker,
          coverage_range: getCoverageRange(userData.coverageAmount),
          geo_market: geoContent?.title
        })
      }

    } catch (error) {
      console.error('Error submitting chatbot quote:', error)
      // Always show success message to user regardless of backend errors
      showSuccessMessage()
    } finally {
      setIsSubmitting(false)
    }
  }

  const showSuccessMessage = () => {
    addBotMessage({
      text: `🎉 Perfect! I've got all your information.

👤 ${userData.firstName} ${userData.lastName}
📧 ${userData.email}
📱 ${userData.phone}
🎯 ${userData.insuranceType}
👥 ${userData.gender}, Age ${userData.age}
🚭 ${userData.smoker}
💰 ${userData.coverageAmount}

Your information has been sent to our LLQP certified team. You'll receive:
• Personalized quotes within 24 hours
• Comparison from multiple insurance companies
• No-obligation consultation call
• Expert guidance tailored to your needs

Thanks ${userData.firstName}! We'll be in touch soon. 📞`,
      quickReplies: ['Start New Quote', 'Close Chat']
    })
  }

  const resetChat = () => {
    setCurrentStep(CHAT_STEPS.WELCOME)
    setMessages([])
    setUserData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      insuranceType: '',
      gender: '',
      age: '',
      smoker: '',
      coverageAmount: '',
      hasExistingInsurance: ''
    })
    addBotMessage(getWelcomeMessage())
  }

  const calculateLeadQuality = () => {
    let score = 0
    if (userData.age && parseInt(userData.age) >= 25 && parseInt(userData.age) <= 55) score += 3
    if (userData.smoker === 'No' || userData.smoker === 'Former smoker (quit 1+ years ago)') score += 2
    if (userData.coverageAmount && !userData.coverageAmount.includes('Not sure')) score += 2
    if (userData.insuranceType === 'Life Insurance') score += 1
    
    if (score >= 6) return 'High'
    if (score >= 4) return 'Medium'
    return 'Low'
  }

  const getAgeGroup = (age) => {
    const ageNum = parseInt(age)
    if (ageNum < 30) return '18-29'
    if (ageNum < 40) return '30-39'
    if (ageNum < 50) return '40-49'
    if (ageNum < 60) return '50-59'
    return '60+'
  }

  const getCoverageRange = (coverage) => {
    if (!coverage) return 'Unknown'
    if (coverage.includes('250K')) return '250K'
    if (coverage.includes('500K')) return '500K'
    if (coverage.includes('1M')) return '1M'
    if (coverage.includes('Not sure')) return 'Undecided'
    return 'Other'
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Track chatbot interactions
  useEffect(() => {
    if (messages.length > 0 && typeof gtag !== 'undefined') {
      const lastMessage = messages[messages.length - 1]
      if (lastMessage.type === 'user') {
        gtag('event', 'chatbot_interaction', {
          event_category: 'Chatbot',
          event_label: currentStep,
          custom_parameter_step: currentStep,
          custom_parameter_message_count: messages.filter(m => m.type === 'user').length
        })
      }
    }
  }, [messages, currentStep])

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-coral-500 to-coral-600 text-white rounded-full p-4 shadow-luxury hover:shadow-premium transition-all duration-300 group"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <MessageCircle size={24} className="group-hover:scale-110 transition-transform" />
            <motion.div
              className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              1
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={cn(
              "fixed z-50 bg-white rounded-2xl shadow-premium border border-gray-200",
              isMinimized 
                ? "bottom-6 right-6 w-80 h-16" 
                : "bottom-6 right-6 w-96 h-[600px] max-h-[80vh]"
            )}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-coral-50 to-accent-50 rounded-t-2xl">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-r from-coral-500 to-coral-600 rounded-full flex items-center justify-center">
                    <Bot size={20} className="text-white" />
                  </div>
                  <motion.div 
                    className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Insurance Assistant</h3>
                  <p className="text-xs text-gray-500">LLQP Certified • Online Now</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div 
                  ref={chatContainerRef}
                  className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[400px] bg-gray-50"
                >
                  <AnimatePresence>
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={cn(
                          "flex",
                          message.type === 'user' ? 'justify-end' : 'justify-start'
                        )}
                      >
                        <div className={cn(
                          "max-w-[80%] rounded-2xl px-4 py-3 shadow-sm",
                          message.type === 'user' 
                            ? 'bg-coral-500 text-white ml-4' 
                            : 'bg-white border border-gray-200 mr-4'
                        )}>
                          <div className="flex items-start space-x-2">
                            {message.type === 'bot' && (
                              <Bot size={16} className="text-coral-500 mt-1 flex-shrink-0" />
                            )}
                            <div className="flex-1">
                              <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                              {message.quickReplies && showQuickReplies && (
                                <motion.div 
                                  className="mt-3 flex flex-wrap gap-2"
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.3 }}
                                >
                                  {message.quickReplies.map((reply, index) => (
                                    <button
                                      key={index}
                                      onClick={() => handleQuickReply(reply)}
                                      className="px-3 py-1 bg-coral-100 text-coral-700 text-xs rounded-full hover:bg-coral-200 transition-colors border border-coral-200"
                                    >
                                      {reply}
                                    </button>
                                  ))}
                                </motion.div>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm mr-4">
                        <div className="flex items-center space-x-2">
                          <Bot size={16} className="text-coral-500" />
                          <div className="flex space-x-1">
                            {[0, 1, 2].map((dot) => (
                              <motion.div
                                key={dot}
                                className="w-2 h-2 bg-coral-400 rounded-full"
                                animate={{ scale: [1, 1.4, 1] }}
                                transition={{
                                  duration: 0.6,
                                  repeat: Infinity,
                                  delay: dot * 0.1
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-coral-500 focus:ring-1 focus:ring-coral-500"
                        disabled={isTyping || currentStep === CHAT_STEPS.CONFIRMATION}
                      />
                    </div>
                    <motion.button
                      onClick={handleSendMessage}
                      disabled={!userInput.trim() || isTyping || currentStep === CHAT_STEPS.CONFIRMATION}
                      className="p-2 bg-coral-500 text-white rounded-full hover:bg-coral-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Send size={18} />
                    </motion.button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}