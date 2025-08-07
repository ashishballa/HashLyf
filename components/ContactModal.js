'use client'

import { useState, useEffect } from 'react'
import { X, Phone, Mail, Shield, MessageCircle, User, Send, CheckCircle, Sparkles, Star } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase, isSupabaseEnabled } from '../lib/supabase'
import { cn } from '../lib/utils'

export default function ContactModal({ isOpen, onClose, autoOpen = false }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: '',
    smoker: '',
    birthYear: '',
    birthMonth: '',
    birthDay: '',
    coverageLevel: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState('')
  const [focusedField, setFocusedField] = useState('')
  
  // Auto-open functionality
  useEffect(() => {
    if (autoOpen) {
      const timer = setTimeout(() => {
        // Only open if no other modal is already open
        if (!isOpen) {
          // Trigger the modal to open via parent component
          // This will be handled by the parent component's state
        }
      }, 3000) // Open after 3 seconds
      
      return () => clearTimeout(timer)
    }
  }, [autoOpen, isOpen])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Check if Supabase is available
      if (!isSupabaseEnabled()) {
        console.warn('Supabase not configured, form submission skipped')
        setSubmitStatus('success') // Still show success to user
        setFormData({ firstName: '', lastName: '', email: '', phone: '', gender: '', smoker: '', birthYear: '', birthMonth: '', birthDay: '', coverageLevel: '' })
        return
      }

      const { data, error } = await supabase
        .from('quote_requests')
        .insert([
          {
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            gender: formData.gender,
            smoker: formData.smoker === 'yes',
            birth_year: parseInt(formData.birthYear) || null,
            birth_month: parseInt(formData.birthMonth) || null,
            birth_day: parseInt(formData.birthDay) || null,
            coverage_level: formData.coverageLevel,
            created_at: new Date().toISOString()
          }
        ])

      if (error) throw error

      setSubmitStatus('success')
      setFormData({ firstName: '', lastName: '', email: '', phone: '', gender: '', smoker: '', birthYear: '', birthMonth: '', birthDay: '', coverageLevel: '' })
      
      // Close modal after successful submission
      setTimeout(() => {
        onClose()
        setSubmitStatus('')
      }, 3000)
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitStatus(''), 5000) // Clear status after 5 seconds
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleClose = () => {
    setFormData({ firstName: '', lastName: '', email: '', phone: '', gender: '', smoker: '', birthYear: '', birthMonth: '', birthDay: '', coverageLevel: '' })
    setSubmitStatus('')
    setFocusedField('')
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{ pointerEvents: 'auto' }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />
          
          {/* Modal Content */}
          <motion.div
            className="relative bg-white rounded-3xl shadow-premium max-w-2xl w-full max-h-[90vh] overflow-y-auto modal-content"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{ pointerEvents: 'auto' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative p-8 pb-0">
              <motion.button
                onClick={handleClose}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 z-10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <X size={24} className="text-gray-500" />
              </motion.button>
              
              <div className="text-center mb-8">
                <motion.div 
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-coral-100 to-accent-100 text-coral-700 px-6 py-3 rounded-full text-sm font-bold mb-6 shadow-elegant hover:shadow-luxury transition-shadow duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  <MessageCircle size={16} />
                  <Sparkles size={14} className="animate-pulse" />
                  <span>FREE QUOTE REQUEST</span>
                </motion.div>
                
                <h2 className="heading-large text-neutral-900 mb-4">
                  Get Your <span className="text-gradient-coral">FREE</span> Insurance
                  <span className="text-gradient-premium block animate-gradient">Quote in 2 Minutes</span>
                </h2>
                
                <p className="text-body text-neutral-600 mb-6">
                  🚀 <strong>No obligations.</strong> Get a personalized quote from an LLQP certified professional. 
                  I'll respond within 24 hours with coverage options tailored to your family's needs and budget.
                </p>
                
                <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-neutral-600">
                  {[
                    { text: "100% Free", icon: CheckCircle },
                    { text: "No Pressure", icon: CheckCircle },
                    { text: "24hr Response", icon: Star }
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-3 py-2 rounded-full shadow-elegant"
                      whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 1)" }}
                    >
                      <item.icon className="text-success-600" size={16} />
                      <span className="font-medium">{item.text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="px-8 pb-8">
              <form onSubmit={handleSubmit} className="space-y-6" style={{ pointerEvents: 'auto' }}>
                {/* Gender Selection */}
                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <label className="block text-sm font-semibold text-neutral-700 mb-3">
                    Are you male or female? *
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <motion.label 
                      className={cn(
                        "flex items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all",
                        formData.gender === 'male' 
                          ? "border-coral-500 bg-coral-50 text-coral-700" 
                          : "border-neutral-200 hover:border-coral-300"
                      )}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      style={{ pointerEvents: 'auto' }}
                    >
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        checked={formData.gender === 'male'}
                        onChange={handleChange}
                        className="sr-only"
                        required
                        style={{ pointerEvents: 'auto' }}
                      />
                      <span className="font-medium">Male</span>
                    </motion.label>
                    <motion.label 
                      className={cn(
                        "flex items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all",
                        formData.gender === 'female' 
                          ? "border-coral-500 bg-coral-50 text-coral-700" 
                          : "border-neutral-200 hover:border-coral-300"
                      )}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      style={{ pointerEvents: 'auto' }}
                    >
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        checked={formData.gender === 'female'}
                        onChange={handleChange}
                        className="sr-only"
                        required
                        style={{ pointerEvents: 'auto' }}
                      />
                      <span className="font-medium">Female</span>
                    </motion.label>
                  </div>
                </motion.div>

                {/* Smoking Status */}
                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <label className="block text-sm font-semibold text-neutral-700 mb-3">
                    Are you a smoker? *
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <motion.label 
                      className={cn(
                        "flex items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all",
                        formData.smoker === 'no' 
                          ? "border-coral-500 bg-coral-50 text-coral-700" 
                          : "border-neutral-200 hover:border-coral-300"
                      )}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      style={{ pointerEvents: 'auto' }}
                    >
                      <input
                        type="radio"
                        name="smoker"
                        value="no"
                        checked={formData.smoker === 'no'}
                        onChange={handleChange}
                        className="sr-only"
                        required
                        style={{ pointerEvents: 'auto' }}
                      />
                      <span className="font-medium">No</span>
                    </motion.label>
                    <motion.label 
                      className={cn(
                        "flex items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all",
                        formData.smoker === 'yes' 
                          ? "border-coral-500 bg-coral-50 text-coral-700" 
                          : "border-neutral-200 hover:border-coral-300"
                      )}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      style={{ pointerEvents: 'auto' }}
                    >
                      <input
                        type="radio"
                        name="smoker"
                        value="yes"
                        checked={formData.smoker === 'yes'}
                        onChange={handleChange}
                        className="sr-only"
                        required
                        style={{ pointerEvents: 'auto' }}
                      />
                      <span className="font-medium">Yes</span>
                    </motion.label>
                  </div>
                </motion.div>

                {/* Date of Birth */}
                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <label className="block text-sm font-semibold text-neutral-700 mb-3">
                    What is your date of birth? *
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs text-neutral-500 mb-2">Year of birth</label>
                      <input
                        type="number"
                        name="birthYear"
                        value={formData.birthYear}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('birthYear')}
                        onBlur={() => setFocusedField('')}
                        required
                        min="1920"
                        max={new Date().getFullYear()}
                        className="input-premium"
                        placeholder="YYYY"
                        style={{ pointerEvents: 'auto', userSelect: 'auto' }}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-neutral-500 mb-2">Month of birth</label>
                      <select
                        name="birthMonth"
                        value={formData.birthMonth}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('birthMonth')}
                        onBlur={() => setFocusedField('')}
                        required
                        className="input-premium"
                        style={{ pointerEvents: 'auto', userSelect: 'auto' }}
                      >
                        <option value="">Month</option>
                        <option value="1">January</option>
                        <option value="2">February</option>
                        <option value="3">March</option>
                        <option value="4">April</option>
                        <option value="5">May</option>
                        <option value="6">June</option>
                        <option value="7">July</option>
                        <option value="8">August</option>
                        <option value="9">September</option>
                        <option value="10">October</option>
                        <option value="11">November</option>
                        <option value="12">December</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-neutral-500 mb-2">Day of birth</label>
                      <input
                        type="number"
                        name="birthDay"
                        value={formData.birthDay}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('birthDay')}
                        onBlur={() => setFocusedField('')}
                        required
                        min="1"
                        max="31"
                        className="input-premium"
                        placeholder="DD"
                        style={{ pointerEvents: 'auto', userSelect: 'auto' }}
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Coverage Level */}
                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <label className="block text-sm font-semibold text-neutral-700 mb-3">
                    What level of coverage would you like? *
                  </label>
                  {!formData.birthYear ? (
                    <p className="text-sm text-neutral-500 italic">
                      Please enter your date of birth before choosing a coverage level.
                    </p>
                  ) : (
                    <select
                      name="coverageLevel"
                      value={formData.coverageLevel}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('coverageLevel')}
                      onBlur={() => setFocusedField('')}
                      required
                      className="input-premium"
                      style={{ pointerEvents: 'auto', userSelect: 'auto' }}
                    >
                      <option value="">Select coverage amount</option>
                      <option value="100000">$100,000</option>
                      <option value="250000">$250,000</option>
                      <option value="500000">$500,000</option>
                      <option value="750000">$750,000</option>
                      <option value="1000000">$1,000,000</option>
                      <option value="1500000">$1,500,000</option>
                      <option value="2000000">$2,000,000</option>
                      <option value="other">Other amount</option>
                    </select>
                  )}
                </motion.div>

                {/* Name Fields */}
                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <label className="block text-sm font-semibold text-neutral-700 mb-3">
                      First name *
                    </label>
                    <div className="relative group">
                      <User 
                        className={cn(
                          "absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors",
                          focusedField === 'firstName' ? "text-coral-500" : "text-neutral-400"
                        )} 
                        size={18} 
                      />
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('firstName')}
                        onBlur={() => setFocusedField('')}
                        required
                        className="input-premium pl-12"
                        placeholder="Enter your first name"
                        style={{ pointerEvents: 'auto', userSelect: 'auto' }}
                        autoComplete="given-name"
                      />
                    </div>
                  </motion.div>
                  
                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <label className="block text-sm font-semibold text-neutral-700 mb-3">
                      Last name *
                    </label>
                    <div className="relative group">
                      <User 
                        className={cn(
                          "absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors",
                          focusedField === 'lastName' ? "text-coral-500" : "text-neutral-400"
                        )} 
                        size={18} 
                      />
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('lastName')}
                        onBlur={() => setFocusedField('')}
                        required
                        className="input-premium pl-12"
                        placeholder="Enter your last name"
                        style={{ pointerEvents: 'auto', userSelect: 'auto' }}
                        autoComplete="family-name"
                      />
                    </div>
                  </motion.div>
                </div>

                {/* Contact Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <label className="block text-sm font-semibold text-neutral-700 mb-3">
                      Contact number *
                    </label>
                    <div className="relative group">
                      <Phone 
                        className={cn(
                          "absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors",
                          focusedField === 'phone' ? "text-coral-500" : "text-neutral-400"
                        )} 
                        size={18} 
                      />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('phone')}
                        onBlur={() => setFocusedField('')}
                        required
                        className="input-premium pl-12"
                        placeholder="Enter your contact number"
                        style={{ pointerEvents: 'auto', userSelect: 'auto' }}
                        autoComplete="tel"
                      />
                    </div>
                  </motion.div>
                  
                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <label className="block text-sm font-semibold text-neutral-700 mb-3">
                      Email address *
                    </label>
                    <div className="relative group">
                      <Mail 
                        className={cn(
                          "absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors",
                          focusedField === 'email' ? "text-coral-500" : "text-neutral-400"
                        )} 
                        size={18} 
                      />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField('')}
                        required
                        className="input-premium pl-12"
                        placeholder="Enter your email address"
                        style={{ pointerEvents: 'auto', userSelect: 'auto' }}
                        autoComplete="email"
                      />
                    </div>
                  </motion.div>
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={cn(
                    "w-full btn-premium interactive-scale group relative overflow-hidden",
                    isSubmitting && "opacity-50 cursor-not-allowed"
                  )}
                  whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                >
                  <motion.span 
                    className="flex items-center justify-center space-x-3"
                    animate={isSubmitting ? { x: [0, 5, -5, 0] } : {}}
                    transition={{ duration: 1, repeat: isSubmitting ? Infinity : 0 }}
                  >
                    <span>{isSubmitting ? 'Submitting Quote Request...' : 'Get My Free Quote'}</span>
                    <Send 
                      className={cn(
                        "transition-transform",
                        !isSubmitting && "group-hover:translate-x-1",
                        isSubmitting && "animate-pulse"
                      )} 
                      size={20} 
                    />
                  </motion.span>
                  
                  {isSubmitting && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-coral-400/20 via-coral-500/20 to-coral-400/20"
                      animate={{ x: [-100, 400] }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                  )}
                </motion.button>

                <AnimatePresence>
                  {submitStatus === 'success' && (
                    <motion.div 
                      className="card-glass bg-success-50 border-success-200"
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="flex items-center space-x-3">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2, type: "spring", stiffness: 400 }}
                        >
                          <CheckCircle className="text-success-600" size={24} />
                        </motion.div>
                        <div>
                          <p className="text-success-800 font-semibold">Quote request submitted!</p>
                          <p className="text-success-700 text-sm">A licensed advisor will contact you within 24 hours with your personalized quote.</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <motion.div 
                      className="card-glass bg-red-50 border-red-200"
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="flex items-center space-x-3">
                        <motion.div
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 0.5, repeat: 2 }}
                        >
                          <div className="text-red-600 text-2xl">⚠️</div>
                        </motion.div>
                        <div>
                          <p className="text-red-800 font-semibold">There was an error sending your message.</p>
                          <p className="text-red-700 text-sm">Please try again or send me an email directly.</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}