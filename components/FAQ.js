'use client'

import { useState, useEffect, useMemo } from 'react'
import { Search, ChevronDown, ChevronUp, Filter, Star, BookOpen, Users, Heart, Calculator, Shield, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { faqData, searchFAQs, getCategories, getPopularFAQs } from '../data/faqData'
import { cn } from '../lib/utils'

const CategoryIcon = ({ category }) => {
  const icons = {
    'Age-Related': Users,
    'Policy Types': Shield,
    'Medical Conditions': Heart,
    'Underwriting Process': BookOpen,
    'Business Insurance': Calculator,
    'Tax Implications': Calculator,
    'Claims and Beneficiaries': Shield,
    'Seniors and Retirement': Users,
    'Young Families': Users,
    'Common Mistakes': Star,
    'Final Considerations': BookOpen
  }
  
  const Icon = icons[category] || BookOpen
  return (
    <motion.div
      whileHover={{ scale: 1.2, rotate: 5 }}
      transition={{ type: "spring", stiffness: 400 }}
    >
      <Icon size={20} className="text-coral-500" />
    </motion.div>
  )
}

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedSubcategory, setSelectedSubcategory] = useState('all')
  const [selectedAgeGroup, setSelectedAgeGroup] = useState('all')
  const [expandedItems, setExpandedItems] = useState(new Set())
  const [showFilters, setShowFilters] = useState(false)

  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const categories = useMemo(() => getCategories(), [])
  const popularFAQs = useMemo(() => getPopularFAQs(), [])

  const filteredFAQs = useMemo(() => {
    let filtered = searchFAQs(searchQuery, faqData)
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(faq => faq.category === selectedCategory)
    }
    
    if (selectedSubcategory !== 'all') {
      filtered = filtered.filter(faq => faq.subcategory === selectedSubcategory)
    }
    
    if (selectedAgeGroup !== 'all') {
      filtered = filtered.filter(faq => 
        faq.ageGroup === selectedAgeGroup || faq.ageGroup === 'all'
      )
    }
    
    return filtered
  }, [searchQuery, selectedCategory, selectedSubcategory, selectedAgeGroup])

  const toggleExpanded = (id) => {
    setExpandedItems(prevExpanded => {
      const newExpanded = new Set(prevExpanded)
      if (newExpanded.has(id)) {
        newExpanded.delete(id)
      } else {
        newExpanded.add(id)
      }
      return newExpanded
    })
  }

  const resetFilters = () => {
    setSearchQuery('')
    setSelectedCategory('all')
    setSelectedSubcategory('all')
    setSelectedAgeGroup('all')
  }

  const subcategories = selectedCategory !== 'all' && categories[selectedCategory] 
    ? categories[selectedCategory] 
    : []

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
    <section ref={ref} id="faq" className="section-premium bg-mesh relative overflow-hidden">
      {/* Premium Background decoration */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-br from-coral-200/30 to-accent-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-gradient-to-br from-accent-100/30 to-coral-200/30 rounded-full blur-3xl"></div>
      
      <div className="container-premium relative z-10">
        {/* Premium Header with Enhanced Gradient */}
        <motion.div 
          className="text-center mb-16 relative"
          variants={staggerContainer}
          initial="initial"
          animate={inView ? "animate" : "initial"}
        >
          {/* Enhanced Gradient Background for Header */}
          <div className="absolute inset-0 bg-gradient-to-r from-coral-500/10 via-accent-400/15 to-coral-600/10 rounded-3xl blur-2xl"></div>
          
          <div className="relative z-10 p-8">
            <motion.div 
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-coral-100 to-accent-100 text-coral-700 px-6 py-3 rounded-full text-sm font-bold mb-6 shadow-luxury hover:shadow-glow-coral transition-shadow duration-300"
              variants={fadeUp}
              whileHover={{ scale: 1.05 }}
            >
              <BookOpen size={16} />
              <Sparkles size={14} className="animate-pulse" />
              <span>LIFE INSURANCE FAQ</span>
            </motion.div>
            
            <motion.h2 
              className="heading-display text-neutral-900 mb-6"
              variants={fadeUp}
            >
              Got <span className="text-gradient-coral">Questions?</span>
              <span className="block text-gradient-premium animate-gradient">We've Got Answers</span>
            </motion.h2>
            
            <motion.p 
              className="text-body-large text-neutral-600 max-w-4xl mx-auto"
              variants={fadeUp}
            >
              Comprehensive answers to Ontario's most frequently asked life insurance questions. 
              Search by topic, age group, or specific situation to find exactly what you need to know.
            </motion.p>
          </div>
        </motion.div>

        {/* Premium Popular Questions */}
        <motion.div 
          className="mb-12"
          variants={fadeUp}
          initial="initial"
          animate={inView ? "animate" : "initial"}
        >
          <h3 className="heading-medium text-neutral-900 mb-6 flex items-center">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Star className="text-coral-500 mr-3" size={24} />
            </motion.div>
            Popular Questions
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularFAQs.map((faq, index) => (
              <motion.button
                key={faq.id}
                onClick={() => {
                  setSearchQuery(faq.question)
                  setExpandedItems(new Set([faq.id]))
                }}
                className="card-premium text-left hover:shadow-glow-coral transition-all duration-300 group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{ pointerEvents: 'auto', cursor: 'pointer' }}
              >
                <p className="text-neutral-800 font-medium group-hover:text-coral-600 transition-colors">
                  {faq.question}
                </p>
                <p className="text-sm text-neutral-500 mt-2 flex items-center">
                  <span className="w-2 h-2 bg-coral-400 rounded-full mr-2"></span>
                  {faq.category}
                </p>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Premium Search and Filters Card */}
        <motion.div 
          className="card-premium bg-gradient-to-br from-white via-coral-50/30 to-accent-50/30 shadow-premium border-0 mb-8"
          variants={fadeUp}
          initial="initial"
          animate={inView ? "animate" : "initial"}
        >
          {/* Premium Search Bar */}
          <div className="relative mb-6">
            <Search className={cn(
              "absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors",
              searchQuery ? "text-coral-500" : "text-neutral-400"
            )} size={20} />
            <input
              type="text"
              placeholder="Search for specific questions, topics, or concerns..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-premium pl-12 text-base"
              style={{ pointerEvents: 'auto', userSelect: 'auto' }}
            />
          </div>

          {/* Premium Filter Toggle */}
          <div className="flex justify-between items-center">
            <motion.button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 text-neutral-600 hover:text-coral-600 transition-colors font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Filter size={16} />
              <span>Advanced Filters</span>
              <motion.div
                animate={{ rotate: showFilters ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown size={16} />
              </motion.div>
            </motion.button>
            
            <AnimatePresence>
              {(selectedCategory !== 'all' || selectedSubcategory !== 'all' || selectedAgeGroup !== 'all' || searchQuery) && (
                <motion.button
                  onClick={resetFilters}
                  className="text-coral-600 hover:text-coral-700 font-medium"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Clear All Filters
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Premium Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div 
                className="grid md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-neutral-200"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => {
                      setSelectedCategory(e.target.value)
                      setSelectedSubcategory('all')
                    }}
                    className="input-premium cursor-pointer appearance-none"
                    style={{ pointerEvents: 'auto', userSelect: 'auto' }}
                  >
                    <option value="all">All Categories</option>
                    {Object.keys(categories).map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">Subcategory</label>
                  <select
                    value={selectedSubcategory}
                    onChange={(e) => setSelectedSubcategory(e.target.value)}
                    className="input-premium cursor-pointer appearance-none disabled:opacity-50"
                    disabled={selectedCategory === 'all'}
                    style={{ pointerEvents: 'auto', userSelect: 'auto' }}
                  >
                    <option value="all">All Subcategories</option>
                    {subcategories.map((subcategory) => (
                      <option key={subcategory} value={subcategory}>{subcategory}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">Age Group</label>
                  <select
                    value={selectedAgeGroup}
                    onChange={(e) => setSelectedAgeGroup(e.target.value)}
                    className="input-premium cursor-pointer appearance-none"
                    style={{ pointerEvents: 'auto', userSelect: 'auto' }}
                  >
                    <option value="all">All Ages</option>
                    <option value="18-30">Young Adults (18-30)</option>
                    <option value="30-50">Middle Age (30-50)</option>
                    <option value="25-45">Families (25-45)</option>
                    <option value="50+">Seniors (50+)</option>
                  </select>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Premium Results Count */}
        <motion.div 
          className="mb-6"
          variants={fadeUp}
          initial="initial"
          animate={inView ? "animate" : "initial"}
        >
          <p className="text-neutral-600 font-medium">
            Showing <span className="text-coral-600 font-bold">{filteredFAQs.length}</span> of <span className="font-bold">{faqData.length}</span> questions
            {searchQuery && <span className="font-semibold"> for "<span className="text-coral-600">{searchQuery}</span>"</span>}
          </p>
        </motion.div>

        {/* Premium FAQ Items */}
        <div className="space-y-4">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq, index) => (
              <motion.div
                key={faq.id}
                className="card-premium overflow-hidden hover:shadow-glow-coral transition-all duration-300 faq-item"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: index * 0.05 }}
                style={{ pointerEvents: 'auto' }}
              >
                <div className="w-full">
                  <button 
                    onClick={() => toggleExpanded(faq.id)}
                    className="w-full p-6 cursor-pointer hover:bg-coral-50/30 transition-all duration-300 text-left"
                    style={{ pointerEvents: 'auto', cursor: 'pointer' }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 pr-4">
                        <div className="flex items-center space-x-3 mb-2">
                          <CategoryIcon category={faq.category} />
                          <span className="text-sm text-coral-600 font-medium">{faq.category}</span>
                          {faq.subcategory && (
                            <>
                              <span className="text-neutral-400">•</span>
                              <span className="text-sm text-neutral-500">{faq.subcategory}</span>
                            </>
                          )}
                        </div>
                        <h3 className="text-lg font-semibold text-neutral-900 mb-2 hover:text-coral-700 transition-colors">
                          {faq.question}
                        </h3>
                      </div>
                      <div className="flex-shrink-0">
                        <motion.div
                          animate={{ rotate: expandedItems.has(faq.id) ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown className={cn(
                            "transition-colors",
                            expandedItems.has(faq.id) ? "text-coral-500" : "text-neutral-400"
                          )} size={24} />
                        </motion.div>
                      </div>
                    </div>
                  </button>
                  
                  <AnimatePresence>
                    {expandedItems.has(faq.id) && (
                      <motion.div 
                        className="px-6 pb-6 text-neutral-700 leading-relaxed"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="mb-4">{faq.answer}</p>
                        <div className="flex flex-wrap gap-2">
                          {faq.tags.slice(0, 5).map((tag, tagIndex) => (
                            <motion.span
                              key={tag}
                              className="px-3 py-1 bg-coral-100 text-coral-700 rounded-full text-xs font-medium"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: tagIndex * 0.1 }}
                            >
                              {tag}
                            </motion.span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <BookOpen className="mx-auto text-neutral-400 mb-4" size={48} />
              </motion.div>
              <h3 className="text-xl font-semibold text-neutral-700 mb-2">No questions found</h3>
              <p className="text-neutral-500 mb-6">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
              <motion.button
                onClick={resetFilters}
                className="btn-premium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Reset Filters
              </motion.button>
            </motion.div>
          )}
        </div>

        {/* Premium Contact CTA */}
        <motion.div 
          className="mt-16 text-center"
          variants={fadeUp}
          initial="initial"
          animate={inView ? "animate" : "initial"}
        >
          <div className="relative bg-gradient-to-br from-coral-500 via-accent-500 to-coral-600 rounded-3xl p-8 text-white overflow-hidden shadow-premium">
            {/* Premium background gradient effects */}
            <motion.div 
              className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-6 -translate-y-6"
              animate={{ rotate: 360, scale: [1, 1.2, 1] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <motion.div 
              className="absolute bottom-0 right-0 w-40 h-40 bg-white/10 rounded-full translate-x-8 translate-y-8"
              animate={{ rotate: -360, scale: [1.2, 1, 1.2] }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Floating sparkles */}
            <motion.div
              className="absolute top-4 right-4"
              animate={{ rotate: [0, 360], scale: [1, 1.5, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Sparkles className="text-white/60" size={20} />
            </motion.div>
            
            <div className="relative z-10">
              <motion.h3 
                className="heading-large mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.2 }}
              >
                Still have questions?
              </motion.h3>
              
              <motion.p 
                className="text-coral-100 mb-6 max-w-2xl mx-auto text-body"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.3 }}
              >
                Can't find what you're looking for? I'm here to help with personalized answers 
                and free quotes tailored to your specific situation.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.4 }}
              >
                <motion.a 
                  href="#contact" 
                  className="bg-white text-coral-600 px-8 py-4 rounded-xl font-semibold shadow-luxury hover:shadow-glow-coral transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get Personal Answers
                </motion.a>
                
                <motion.a 
                  href="#contact" 
                  className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Message
                </motion.a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}