'use client'

import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Services from '../components/Services'
import About from '../components/About'
import FAQ from '../components/FAQ'
import Testimonials from '../components/Testimonials'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import ContactModal from '../components/ContactModal'
import Breadcrumb from '../components/Breadcrumb'
import GeoOptimizer from '../components/GeoOptimizer'
import GeoAnalytics from '../components/GeoAnalytics'
import Chatbot from '../components/Chatbot'

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  // Remove auto-open modal functionality - replaced with chatbot

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <main className="min-h-screen responsive-width">
      <GeoOptimizer />
      <GeoAnalytics />
      <Header openModal={openModal} />
      
      {/* Breadcrumb Navigation */}
      <div className="pt-24 pb-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb items={[]} />
        </div>
      </div>
      
      <Hero openModal={openModal} />
      <Contact />
      <Services />
      <About />
      <FAQ />
      <Testimonials />
      <Footer />
      <Chatbot />
    </main>
  )
}