'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Menu, X, Phone, Mail, Shield, Sparkles } from 'lucide-react'
import HashLyfIcon from '../app/assets/HashLyf.png'  

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
              <Phone size={16} className="text-coral-500 group-hover:scale-110 transition-transform" />
              <span className="font-medium text-gray-700">Call: (905) 922-6136</span>
            </div>
            <div className="flex items-center space-x-2 group">
              <Mail size={16} className="text-coral-500 group-hover:scale-110 transition-transform" />
              <span className="font-medium text-gray-700">harsha.whf@gmail.com</span>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <Shield size={16} className="text-primary-600" />
            <span className="font-semibold">LLQP Certified • Licensed in Ontario</span>
          </div>
        </div>
        {/* Logo beside contact info (top bar) */}
        <div className="hidden md:flex items-center absolute left-4 top-2">
          <Image 
            src={HashLyfIcon} 
            alt="HashLyf Logo" 
            width={200} 
            height={200} 
            className="object-contain drop-shadow-lg"
            style={{
              filter: 'blur(0px)',
              boxShadow: '0 0 60px 20px rgba(255, 127, 80, 0.25), 0 0 120px 40px rgba(255, 127, 80, 0.15)',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.2)'
            }}
           
            
          />
        </div>
        {/* Main navigation */}
        <nav className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <div className="md:hidden">
              <Image 
                src={HashLyfIcon} 
                alt="HashLyf Logo" 
                width={40} 
                height={40} 
                className="object-contain"
              />
            </div>
            <div className={`text-2xl lg:text-3xl font-bold transition-colors ${
              isScrolled ? 'text-gray-800' : 'black'
            }`}>
              <span className="text-coral-500">Hash</span>Life Insurers
            </div>
          </div>

          {/* Desktop menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {['Home', 'Contact', 'Services', 'About', 'FAQ', 'Testimonials'].map((item, index) => (
              <a 
                key={index}
                href={`#${item.toLowerCase()}`} 
                className={`relative font-medium transition-all duration-300 hover:text-coral-500 group text-gray-700`}
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-coral-500 to-coral-400 group-hover:w-full transition-all duration-300"></span>
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
                ? 'bg-coral-500 text-white' 
                : 'hover:bg-coral-50 text-gray-700'
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
                {['Home', 'Contact', 'Services', 'About', 'FAQ', 'Testimonials'].map((item, index) => (
                  <a 
                    key={index}
                    href={`#${item.toLowerCase()}`}
                    className="py-3 px-4 text-gray-700 hover:text-coral-600 hover:bg-coral-50 rounded-xl transition-all duration-300 font-medium"
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
