'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Menu, X, Phone, Mail, Shield, Sparkles } from 'lucide-react'
import HashLyfIcon from 'D:/Projects/LLQP/app/assets/HashLyf.png'  

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'glass-effect shadow-2xl' : 'bg-white/95 backdrop-blur-sm shadow-lg'
    }`}>
      <div className="container-custom">

        {/* Top bar */}
        <div className={`hidden md:flex justify-between items-center py-3 text-sm border-b transition-all duration-300 ${
          isScrolled ? 'border-white/20' : 'border-gray-200'
        }`}>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 group">
              <Phone size={16} className="text-primary-600 group-hover:scale-110 transition-transform" />
              <span className="font-medium text-gray-700">Call: (905) 922-6136</span>
            </div>
            <div className="flex items-center space-x-2 group">
              <Mail size={16} className="text-primary-600 group-hover:scale-110 transition-transform" />
              <span className="font-medium text-gray-700">harsha.whf@gmail.com</span>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <Shield size={16} className="text-accent-600" />
            <span className="font-semibold">LLQP Certified • Licensed in Ontario</span>
          </div>
        </div>
        {/* Logo beside contact info (top bar) */}
        <div className="hidden md:flex items-center absolute left-4 top-1/2 -translate-y-1/2">
          <Image 
            src={HashLyfIcon} 
            alt="HashLyf Logo" 
            width={120} 
            height={120} 
            className="rounded-full shadow-md"
          />
        </div>
        {/* Main navigation */}
        <nav className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
        
              {/* ✅ Replaced Shield icon with image */}
              
           
            <div className={`text-2xl lg:text-3xl font-bold transition-colors ${
              isScrolled ? 'text-gray-800' : 'black'
            }`}>
              HashLife Insurers
            </div>
          </div>

          {/* Desktop menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {['Home', 'Contact', 'Services', 'About', 'Testimonials'].map((item, index) => (
              <a 
                key={index}
                href={`#${item.toLowerCase()}`} 
                className={`relative font-medium transition-all duration-300 hover:text-primary-600 group text-gray-700`}
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-600 to-accent-600 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </div>

          <div className="hidden lg:block">
            <a href="#contact" className="btn-primary inline-flex items-center justify-center space-x-2 group">
              <span>Get Free Quote</span>
              <Sparkles className="group-hover:rotate-12 transition-transform" size={18} />
            </a>
          </div>

          {/* Mobile menu button */}
          <button 
            className={`lg:hidden p-2 rounded-xl transition-all duration-300 ${
              isOpen 
                ? 'bg-primary-600 text-white' 
                : 'hover:bg-gray-100 text-gray-700'
            }`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Enhanced Mobile menu */}
        {isOpen && (
          <div className="lg:hidden pb-6 animate-in slide-in-from-top-2 duration-300">
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-gray-200 mx-4">
              <div className="flex flex-col space-y-4">
                {['Home', 'Contact', 'Services', 'About', 'Testimonials'].map((item, index) => (
                  <a 
                    key={index}
                    href={`#${item.toLowerCase()}`}
                    className="py-3 px-4 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all duration-300 font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {item}
                  </a>
                ))}
                <div className="pt-4 border-t border-gray-200">
                  <a 
                    href="#contact" 
                    className="btn-primary w-full inline-flex items-center justify-center space-x-2"
                    onClick={() => setIsOpen(false)}
                  >
                    <span>Get Free Quote</span>
                    <Sparkles size={18} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
