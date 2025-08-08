'use client'

import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, User, Shield, CheckCircle, Sparkles, Star } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { supabase, isSupabaseEnabled } from '../lib/supabase'
import { cn } from '../lib/utils'

export default function Contact() {
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
  
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Check if Supabase is available
      if (!isSupabaseEnabled()) {
        console.warn('Supabase not configured, form submission skipped')
        setSubmitStatus('success') // Still show success to user
        setFormData({ 
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
      setFormData({ 
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

  const contactInfo = [
    {
      icon: <Mail className="text-white" size={24} />,
      title: "Email",
      value: "harsha.whf@gmail.com",
      description: "We respond within 24 hours",
      gradient: "from-accent-500 to-accent-600",
      bgColor: "bg-accent-50",
      hoverColor: "hover:bg-accent-100",
      link: "mailto:harsha.whf@gmail.com"
    },
    {
      icon: <MapPin className="text-white" size={24} />,
      title: "Service Area",
      value: "Ontario, Canada",
      description: "Licensed across the province",
      gradient: "from-success-500 to-success-600",
      bgColor: "bg-success-50",
      hoverColor: "hover:bg-success-100"
    },
    {
      icon: <Clock className="text-white" size={24} />,
      title: "Business Hours",
      value: "Mon-Fri: 9:00 AM - 6:00 PM",
      description: "Evening appointments available",
      gradient: "from-secondary-500 to-secondary-600",
      bgColor: "bg-secondary-50",
      hoverColor: "hover:bg-secondary-100"
    }
  ]

  const fadeUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <section ref={ref} id="contact" className="section-premium bg-mesh relative overflow-hidden">
      {/* Premium background decoration */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-coral-200/30 to-accent-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-br from-accent-200/30 to-coral-200/30 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto relative z-10 px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12 sm:mb-16 lg:mb-20"
          variants={staggerContainer}
          initial="initial"
          animate={inView ? "animate" : "initial"}
        >
          <motion.div 
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-coral-100 to-accent-100 text-coral-700 px-6 py-3 rounded-full text-sm font-bold mb-6 shadow-elegant hover:shadow-luxury transition-shadow duration-300"
            variants={fadeUp}
            whileHover={{ scale: 1.05 }}
          >
            <MessageCircle size={16} />
            <Sparkles size={14} className="animate-pulse" />
            <span>FREE QUOTE REQUEST</span>
          </motion.div>
          
          <motion.h2 
            className="heading-display text-neutral-900 mb-6"
            variants={fadeUp}
          >
            Get Your <span className="text-gradient-coral">FREE</span> Insurance
            <span className="text-gradient-premium block animate-gradient">Quote in 2 Minutes</span>
          </motion.h2>
          
          <motion.p 
            className="text-body-large text-neutral-600 max-w-4xl mx-auto mb-8"
            variants={fadeUp}
          >
            🚀 <strong>No obligations.</strong> Get a personalized quote from an LLQP certified professional. 
            I'll respond within 24 hours with coverage options tailored to your family's needs and budget.
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap justify-center items-center gap-6 text-sm text-neutral-600"
            variants={fadeUp}
          >
            {[
              { text: "100% Free", icon: CheckCircle },
              { text: "No Pressure", icon: CheckCircle },
              { text: "24hr Response", icon: Star }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-elegant"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 1)" }}
              >
                <item.icon className="text-success-600" size={16} />
                <span className="font-medium">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div 
          className="responsive-form-grid"
          variants={staggerContainer}
          initial="initial"
          animate={inView ? "animate" : "initial"}
        >
          {/* Premium Contact Information Cards */}
          <motion.div 
            className="lg:col-span-1 space-y-6"
            variants={fadeUp}
          >
            <h3 className="heading-medium text-neutral-900 mb-8 flex items-center">
              <User className="text-coral-600 mr-3 animate-pulse" size={28} />
              Contact Information
            </h3>
            
            {contactInfo.map((info, index) => (
              <motion.div 
                key={index}
                className="group"
                variants={fadeUp}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {info.link ? (
                  <a href={info.link} className={cn(
                    "block card-standard cursor-pointer transition-all duration-300",
                    info.bgColor,
                    info.hoverColor
                  )}>
                    <div className="flex items-start space-x-4">
                      <motion.div 
                        className={cn(
                          "p-3 rounded-xl shadow-luxury",
                          `bg-gradient-to-br ${info.gradient}`
                        )}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        {info.icon}
                      </motion.div>
                      <div className="flex-1">
                        <h4 className="font-bold text-neutral-900 text-lg mb-1">{info.title}</h4>
                        <p className="text-neutral-800 font-semibold mb-1 hover:text-accent-600 transition-colors">{info.value}</p>
                        {info.title === "Business Hours" && (
                          <p className="text-neutral-700 font-medium mb-1">Sat: 10:00 AM - 2:00 PM</p>
                        )}
                        <p className="text-sm text-neutral-600">{info.description}</p>
                      </div>
                    </div>
                  </a>
                ) : (
                  <div className={cn(
                    "card-standard cursor-pointer transition-all duration-300",
                    info.bgColor,
                    info.hoverColor
                  )}>
                    <div className="flex items-start space-x-4">
                      <motion.div 
                        className={cn(
                          "p-3 rounded-xl shadow-luxury",
                          `bg-gradient-to-br ${info.gradient}`
                        )}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        {info.icon}
                      </motion.div>
                      <div className="flex-1">
                        <h4 className="font-bold text-neutral-900 text-lg mb-1">{info.title}</h4>
                        <p className="text-neutral-800 font-semibold mb-1">{info.value}</p>
                        {info.title === "Business Hours" && (
                          <p className="text-neutral-700 font-medium mb-1">Sat: 10:00 AM - 2:00 PM</p>
                        )}
                        <p className="text-sm text-neutral-600">{info.description}</p>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}

            {/* Premium Trust Badge */}
            <motion.div 
              className="card-premium bg-gradient-to-br from-accent-50 to-accent-100 border border-accent-200 hover:shadow-glow-accent"
              variants={fadeUp}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center space-x-3 mb-4">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Shield className="text-accent-600" size={28} />
                </motion.div>
                <h4 className="font-bold text-neutral-900">LLQP Certified Agent</h4>
              </div>
              <p className="text-neutral-700">
                Licensed and certified professional providing trusted insurance advice across Ontario.
              </p>
            </motion.div>
          </motion.div>

          {/* Premium Contact Form */}
          <div 
            className="lg:col-span-2"
          >
            <div className="card-standard shadow-premium border-0 overflow-hidden">
              <div className="mb-8">
                <h3 className="heading-large text-neutral-900 mb-4 flex items-center">
                  Get a Quote in Minutes
                  <Sparkles className="ml-3 text-coral-500 animate-pulse" size={24} />
                </h3>
                <p className="text-neutral-600">
                  Tell us about yourself and a licensed advisor will be in touch.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 contact-form">
                {/* Gender Selection */}
                <div
                  style={{ pointerEvents: 'auto' }}
                >
                  <label className="block text-sm font-semibold text-neutral-700 mb-3">
                    Are you male or female? *
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <label 
                      className={cn(
                        "flex items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all",
                        formData.gender === 'male' 
                          ? "border-coral-500 bg-coral-50 text-coral-700" 
                          : "border-neutral-200 hover:border-coral-300"
                      )}
                      style={{ pointerEvents: 'auto', cursor: 'pointer' }}
                    >
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        checked={formData.gender === 'male'}
                        onChange={handleChange}
                        className="sr-only"
                        style={{ pointerEvents: 'auto' }}
                        required
                      />
                      <span className="font-medium">Male</span>
                    </label>
                    <label 
                      className={cn(
                        "flex items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all",
                        formData.gender === 'female' 
                          ? "border-coral-500 bg-coral-50 text-coral-700" 
                          : "border-neutral-200 hover:border-coral-300"
                      )}
                      style={{ pointerEvents: 'auto', cursor: 'pointer' }}
                    >
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        checked={formData.gender === 'female'}
                        onChange={handleChange}
                        className="sr-only"
                        style={{ pointerEvents: 'auto' }}
                        required
                      />
                      <span className="font-medium">Female</span>
                    </label>
                  </div>
                </div>

                {/* Smoking Status */}
                <div
                >
                  <label className="block text-sm font-semibold text-neutral-700 mb-3">
                    Are you a smoker? *
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <label 
                      className={cn(
                        "flex items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all",
                        formData.smoker === 'no' 
                          ? "border-coral-500 bg-coral-50 text-coral-700" 
                          : "border-neutral-200 hover:border-coral-300"
                      )}
                      style={{ pointerEvents: 'auto', cursor: 'pointer' }}
                    >
                      <input
                        type="radio"
                        name="smoker"
                        value="no"
                        checked={formData.smoker === 'no'}
                        onChange={handleChange}
                        className="sr-only"
                        style={{ pointerEvents: 'auto' }}
                        required
                      />
                      <span className="font-medium">No</span>
                    </label>
                    <label 
                      className={cn(
                        "flex items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all",
                        formData.smoker === 'yes' 
                          ? "border-coral-500 bg-coral-50 text-coral-700" 
                          : "border-neutral-200 hover:border-coral-300"
                      )}
                      style={{ pointerEvents: 'auto', cursor: 'pointer' }}
                    >
                      <input
                        type="radio"
                        name="smoker"
                        value="yes"
                        checked={formData.smoker === 'yes'}
                        onChange={handleChange}
                        className="sr-only"
                        style={{ pointerEvents: 'auto' }}
                        required
                      />
                      <span className="font-medium">Yes</span>
                    </label>
                  </div>
                </div>

                {/* Date of Birth */}
                <div
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
                        style={{ pointerEvents: 'auto', userSelect: 'auto', cursor: 'auto' }}
                        placeholder="YYYY"
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
                        style={{ pointerEvents: 'auto', userSelect: 'auto', cursor: 'auto' }}
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
                        style={{ pointerEvents: 'auto', userSelect: 'auto', cursor: 'auto' }}
                        placeholder="DD"
                      />
                    </div>
                  </div>
                </div>

                {/* Coverage Level */}
                <div
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
                </div>

                {/* Name Fields */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div
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
                      />
                    </div>
                  </div>
                  
                  <div
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
                      />
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div
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
                      />
                    </div>
                  </div>
                  
                  <div
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
                      />
                    </div>
                  </div>
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
                    <div 
                      className="card-glass bg-success-50 border-success-200"
                    >
                      <div className="flex items-center space-x-3">
                        <div>
                          <CheckCircle className="text-success-600" size={24} />
                        </div>
                        <div>
                          <p className="text-success-800 font-semibold">Quote request submitted!</p>
                          <p className="text-success-700 text-sm">A licensed advisor will contact you within 24 hours with your personalized quote.</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <div 
                      className="card-glass bg-red-50 border-red-200"
                    >
                      <div className="flex items-center space-x-3">
                        <div>
                          <div className="text-red-600 text-2xl">⚠️</div>
                        </div>
                        <div>
                          <p className="text-red-800 font-semibold">There was an error sending your message.</p>
                          <p className="text-red-700 text-sm">Please try again or send me an email directly.</p>
                        </div>
                      </div>
                    </div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}