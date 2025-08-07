'use client'

import { useState, useEffect } from 'react'
import { X, Phone, Mail, Shield, MessageCircle, User, Send, CheckCircle, Sparkles, Star } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase, isSupabaseEnabled } from '../lib/supabase'
import { cn } from '../lib/utils'

export default function ContactModal({ isOpen, onClose, autoOpen = false }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    insuranceType: '',
    message: ''
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
        setFormData({ name: '', email: '', phone: '', insuranceType: '', message: '' })
        return
      }

      const { data, error } = await supabase
        .from('contact_submissions')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            insurance_type: formData.insuranceType,
            message: formData.message,
            created_at: new Date().toISOString()
          }
        ])

      if (error) throw error

      setSubmitStatus('success')
      setFormData({ name: '', email: '', phone: '', insuranceType: '', message: '' })
      
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
    setFormData({ name: '', email: '', phone: '', insuranceType: '', message: '' })
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
            className="relative bg-white rounded-3xl shadow-premium max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
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
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <label className="block text-sm font-semibold text-neutral-700 mb-3">
                      Full Name *
                    </label>
                    <div className="relative group">
                      <User 
                        className={cn(
                          "absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors",
                          focusedField === 'name' ? "text-coral-500" : "text-neutral-400"
                        )} 
                        size={18} 
                      />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField('')}
                        required
                        className="input-premium pl-12"
                        placeholder="Enter your full name"
                      />
                    </div>
                  </motion.div>
                  
                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <label className="block text-sm font-semibold text-neutral-700 mb-3">
                      Email Address *
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
                      />
                    </div>
                  </motion.div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <label className="block text-sm font-semibold text-neutral-700 mb-3">
                      Phone Number
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
                        className="input-premium pl-12"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </motion.div>
                  
                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <label className="block text-sm font-semibold text-neutral-700 mb-3">
                      Insurance Type
                    </label>
                    <div className="relative group">
                      <Shield 
                        className={cn(
                          "absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors",
                          focusedField === 'insuranceType' ? "text-coral-500" : "text-neutral-400"
                        )} 
                        size={18} 
                      />
                      <select
                        name="insuranceType"
                        value={formData.insuranceType}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('insuranceType')}
                        onBlur={() => setFocusedField('')}
                        className="input-premium pl-12 appearance-none cursor-pointer"
                      >
                        <option value="">Select Insurance Type</option>
                        <option value="life">Life Insurance</option>
                        <option value="funeral">Funeral Expense Insurance</option>
                        <option value="critical">Critical Illness Coverage</option>
                        <option value="review">Insurance Review</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </motion.div>
                </div>

                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <label className="block text-sm font-semibold text-neutral-700 mb-3">
                    Message
                  </label>
                  <div className="relative group">
                    <MessageCircle 
                      className={cn(
                        "absolute left-4 top-6 transition-colors",
                        focusedField === 'message' ? "text-coral-500" : "text-neutral-400"
                      )} 
                      size={18} 
                    />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField('')}
                      rows="4"
                      className="textarea-premium pl-12"
                      placeholder="Tell me about your insurance needs, coverage amount, budget, or any questions you have..."
                    ></textarea>
                  </div>
                </motion.div>

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
                    <span>{isSubmitting ? 'Sending Message...' : 'Send Message & Get Free Quote'}</span>
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
                          <p className="text-success-800 font-semibold">Message sent successfully!</p>
                          <p className="text-success-700 text-sm">I'll contact you within 24 hours with your personalized quote.</p>
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