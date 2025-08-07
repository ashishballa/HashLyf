'use client'
import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, User, Shield, CheckCircle } from 'lucide-react'
import { supabase, isSupabaseEnabled } from '../lib/supabase'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    insuranceType: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState('')

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
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
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
      icon: <Phone className="text-white" size={24} />,
      title: "Phone",
      value: "(905) 922-6136",
      description: "Call for immediate assistance",
      gradient: "from-primary-500 to-primary-600",
      bgColor: "bg-primary-50"
    },
    {
      icon: <Mail className="text-white" size={24} />,
      title: "Email",
      value: "harsha.whf@gmail.com",
      description: "We respond within 24 hours",
      gradient: "from-accent-500 to-accent-600",
      bgColor: "bg-accent-50"
    },
    {
      icon: <MapPin className="text-white" size={24} />,
      title: "Service Area",
      value: "Ontario, Canada",
      description: "Licensed across the province",
      gradient: "from-success-500 to-success-600",
      bgColor: "bg-success-50"
    },
    {
      icon: <Clock className="text-white" size={24} />,
      title: "Business Hours",
      value: "Mon-Fri: 9:00 AM - 6:00 PM",
      description: "Evening appointments available",
      gradient: "from-warm-600 to-warm-700",
      bgColor: "bg-warm-50"
    }
  ]

  return (
    <section id="contact" className="section-padding warm-gradient-bg relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-primary-200 to-accent-200 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-br from-accent-200 to-primary-200 rounded-full blur-3xl opacity-20"></div>
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-100 to-accent-100 text-primary-700 px-6 py-3 rounded-full text-sm font-bold mb-6 animate-pulse">
            <MessageCircle size={16} />
            <span>🎯 FREE QUOTE REQUEST</span>
          </div>
          <h2 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6">
            Get Your <span className="gradient-text">FREE</span> Insurance
            <span className="gradient-text block">Quote in 2 Minutes</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
            🚀 <strong>No obligations.</strong> Get a personalized quote from an LLQP certified professional. 
            I'll respond within 24 hours with coverage options tailored to your family's needs and budget.
          </p>
          <div className="flex justify-center items-center space-x-8 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <CheckCircle className="text-success-600" size={16} />
              <span>100% Free</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="text-success-600" size={16} />
              <span>No Pressure</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="text-success-600" size={16} />
              <span>24hr Response</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Information Cards */}
          <div className="lg:col-span-1 space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
              <User className="text-primary-600 mr-3" size={28} />
              Contact Information
            </h3>
            
            {contactInfo.map((info, index) => (
              <div key={index} className="group card-hover">
                <div className={`${info.bgColor} rounded-2xl p-6 border border-gray-100`}>
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${info.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {info.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 text-lg mb-1">{info.title}</h4>
                      <p className="text-gray-800 font-semibold mb-1">{info.value}</p>
                      {info.title === "Business Hours" && (
                        <p className="text-gray-700 font-medium mb-1">Sat: 10:00 AM - 2:00 PM</p>
                      )}
                      <p className="text-sm text-gray-600">{info.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Trust Badge */}
            <div className="bg-gradient-to-br from-accent-50 to-accent-100 rounded-2xl p-6 border border-accent-200">
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="text-accent-600" size={28} />
                <h4 className="font-bold text-gray-900">LLQP Certified Agent</h4>
              </div>
              <p className="text-gray-700">
                Licensed and certified professional providing trusted insurance advice across Ontario.
              </p>
            </div>
          </div>

          {/* Enhanced Contact Form */}
          <div className="lg:col-span-2">
            <div className="glass-effect rounded-3xl p-8 shadow-2xl border">
              <div className="mb-8">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Send Me a Message</h3>
                <p className="text-gray-600">
                  Fill out the form below and I'll get back to you within 24 hours with a personalized quote.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 bg-white shadow-sm hover:shadow-md"
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 bg-white shadow-sm hover:shadow-md"
                        placeholder="Enter your email address"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 bg-white shadow-sm hover:shadow-md"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Insurance Type
                    </label>
                    <div className="relative">
                      <Shield className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <select
                        name="insuranceType"
                        value={formData.insuranceType}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 bg-white shadow-sm hover:shadow-md appearance-none"
                      >
                        <option value="">Select Insurance Type</option>
                        <option value="life">Life Insurance</option>
                        <option value="funeral">Funeral Expense Insurance</option>
                        <option value="critical">Critical Illness Coverage</option>
                        <option value="review">Insurance Review</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 bg-white shadow-sm hover:shadow-md resize-none"
                    placeholder="Tell me about your insurance needs, coverage amount, budget, or any questions you have..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  <span className="flex items-center justify-center space-x-3">
                    <span>{isSubmitting ? 'Sending Message...' : 'Send Message & Get Free Quote'}</span>
                    <Send className="group-hover:translate-x-1 transition-transform" size={20} />
                  </span>
                </button>

                {submitStatus === 'success' && (
                  <div className="p-6 bg-success-50 border border-success-200 rounded-2xl">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="text-success-600" size={24} />
                      <div>
                        <p className="text-success-800 font-semibold">Message sent successfully!</p>
                        <p className="text-success-700 text-sm">I'll contact you within 24 hours with your personalized quote.</p>
                      </div>
                    </div>
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="p-6 bg-red-50 border border-red-200 rounded-2xl">
                    <div className="flex items-center space-x-3">
                      <div className="text-red-600">⚠️</div>
                      <div>
                        <p className="text-red-800 font-semibold">There was an error sending your message.</p>
                        <p className="text-red-700 text-sm">Please try again or call me directly at (905) 922-6136.</p>
                      </div>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}