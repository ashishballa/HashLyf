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

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  // Auto-open modal on page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsModalOpen(true)
    }, 3000) // Open after 3 seconds
    
    return () => clearTimeout(timer)
  }, [])

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <main className="min-h-screen responsive-width">
      <Header openModal={openModal} />
      <Hero openModal={openModal} />
      <Contact />
      <Services />
      <About />
      <FAQ />
      <Testimonials />
      <Footer />
      <ContactModal 
        isOpen={isModalOpen} 
        onClose={closeModal}
        autoOpen={true}
      />
    </main>
  )
}