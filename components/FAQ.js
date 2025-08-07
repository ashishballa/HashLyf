'use client'
import { useState, useEffect, useMemo } from 'react'
import { Search, ChevronDown, ChevronUp, Filter, Star, BookOpen, Users, Heart, Calculator, Shield } from 'lucide-react'
import { faqData, searchFAQs, getCategories, getPopularFAQs } from '../data/faqData'

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
  return <Icon size={20} className="text-primary-500" />
}

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedSubcategory, setSelectedSubcategory] = useState('all')
  const [selectedAgeGroup, setSelectedAgeGroup] = useState('all')
  const [expandedItems, setExpandedItems] = useState(new Set())
  const [showFilters, setShowFilters] = useState(false)

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
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedItems(newExpanded)
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

  return (
    <section id="faq" className="section-padding gradient-bg relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-br from-primary-200 to-accent-200 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-gradient-to-br from-accent-100 to-primary-200 rounded-full blur-3xl opacity-20"></div>
      
      <div className="container-custom relative z-10">
        {/* Header with Gradient */}
        <div className="text-center mb-16 relative">
          {/* Gradient Background for Header */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 via-accent-400/15 to-primary-600/10 rounded-3xl blur-2xl"></div>
          
          <div className="relative z-10 p-8">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-100 to-accent-100 text-primary-700 px-6 py-3 rounded-full text-sm font-bold mb-6 shadow-lg">
              <BookOpen size={16} />
              <span>LIFE INSURANCE FAQ</span>
            </div>
            <h2 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6">
              Got <span className="gradient-text">Questions?</span>
              <span className="block">We've Got Answers</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Comprehensive answers to Ontario's most frequently asked life insurance questions. 
              Search by topic, age group, or specific situation to find exactly what you need to know.
            </p>
          </div>
        </div>

        {/* Popular Questions */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Star className="text-primary-500 mr-3" size={24} />
            Popular Questions
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularFAQs.map((faq) => (
              <button
                key={faq.id}
                onClick={() => {
                  setSearchQuery(faq.question)
                  setExpandedItems(new Set([faq.id]))
                }}
                className="text-left p-4 bg-white rounded-xl border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-all duration-300 group shadow-sm hover:shadow-md"
              >
                <p className="text-gray-800 font-medium group-hover:text-primary-600 transition-colors">
                  {faq.question}
                </p>
                <p className="text-sm text-gray-500 mt-2">{faq.category}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Enhanced Search and Filters Card */}
        <div className="bg-gradient-to-br from-white via-primary-50/30 to-accent-50/30 rounded-2xl p-6 shadow-lg border border-gray-100 mb-8 backdrop-blur-sm">
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search for specific questions, topics, or concerns..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 bg-white shadow-sm"
            />
          </div>

          {/* Filter Toggle */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors"
            >
              <Filter size={16} />
              <span>Advanced Filters</span>
              {showFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            
            {(selectedCategory !== 'all' || selectedSubcategory !== 'all' || selectedAgeGroup !== 'all' || searchQuery) && (
              <button
                onClick={resetFilters}
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Clear All Filters
              </button>
            )}
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="grid md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value)
                    setSelectedSubcategory('all')
                  }}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="all">All Categories</option>
                  {Object.keys(categories).map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Subcategory</label>
                <select
                  value={selectedSubcategory}
                  onChange={(e) => setSelectedSubcategory(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  disabled={selectedCategory === 'all'}
                >
                  <option value="all">All Subcategories</option>
                  {subcategories.map((subcategory) => (
                    <option key={subcategory} value={subcategory}>{subcategory}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Age Group</label>
                <select
                  value={selectedAgeGroup}
                  onChange={(e) => setSelectedAgeGroup(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="all">All Ages</option>
                  <option value="18-30">Young Adults (18-30)</option>
                  <option value="30-50">Middle Age (30-50)</option>
                  <option value="25-45">Families (25-45)</option>
                  <option value="50+">Seniors (50+)</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredFAQs.length} of {faqData.length} questions
            {searchQuery && <span className="font-semibold"> for "{searchQuery}"</span>}
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq) => (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-primary-300 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <button
                  onClick={() => toggleExpanded(faq.id)}
                  className="w-full p-6 text-left hover:bg-primary-50 transition-all duration-300"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 pr-4">
                      <div className="flex items-center space-x-3 mb-2">
                        <CategoryIcon category={faq.category} />
                        <span className="text-sm text-primary-600 font-medium">{faq.category}</span>
                        {faq.subcategory && (
                          <>
                            <span className="text-gray-400">•</span>
                            <span className="text-sm text-gray-500">{faq.subcategory}</span>
                          </>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {faq.question}
                      </h3>
                      {expandedItems.has(faq.id) && (
                        <div className="text-gray-700 leading-relaxed">
                          <p>{faq.answer}</p>
                          <div className="flex flex-wrap gap-2 mt-4">
                            {faq.tags.slice(0, 5).map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-1 bg-primary-100 text-primary-700 rounded-md text-xs"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex-shrink-0">
                      {expandedItems.has(faq.id) ? (
                        <ChevronUp className="text-primary-500" size={24} />
                      ) : (
                        <ChevronDown className="text-gray-400" size={24} />
                      )}
                    </div>
                  </div>
                </button>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <BookOpen className="mx-auto text-gray-400 mb-4" size={48} />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No questions found</h3>
              <p className="text-gray-500 mb-4">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
              <button
                onClick={resetFilters}
                className="btn-primary"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* Enhanced Contact CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-br from-primary-500 via-accent-500 to-primary-600 rounded-2xl p-8 text-white relative overflow-hidden">
            {/* Background gradient effects */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-6 -translate-y-6"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/10 rounded-full translate-x-8 translate-y-8"></div>
            
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
              <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
                Can't find what you're looking for? I'm here to help with personalized answers 
                and free quotes tailored to your specific situation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a href="#contact" className="bg-white text-primary-600 px-6 py-3 rounded-xl font-semibold hover:bg-primary-50 transition-colors shadow-lg">
                  Get Personal Answers
                </a>
                <a href="tel:9059226136" className="border-2 border-white text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10 transition-colors">
                  Call (905) 922-6136
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}