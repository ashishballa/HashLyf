'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Menu, X, Phone, Mail, Shield, Sparkles, Sun, Moon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import HashLyfIcon from '../app/assets/HashLyf.png'
import { cn } from '../lib/utils'

export default function Header({ openModal }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleDarkMode = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle('dark')
  }

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Contact', href: '#contact' },
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Testimonials', href: '#testimonials' }
  ]

  return (
    <motion.header 
      className={cn(
        "fixed w-full top-0 z-50 transition-all duration-500",
        isScrolled 
          ? "glass-navbar shadow-premium backdrop-blur-lg" 
          : "bg-white/95 backdrop-blur-sm shadow-elegant"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="container-premium">
        {/* Premium top bar with enhanced styling */}
        <motion.div 
          className={cn(
            "hidden md:flex justify-between items-center py-3 text-sm border-b transition-all duration-500",
            isScrolled ? "border-white/20" : "border-neutral-200"
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center space-x-8">
            <motion.div 
              className="flex items-center space-x-2 group cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              <Mail size={16} className="text-coral-500 group-hover:scale-110 transition-transform" />
              <span className="font-medium text-neutral-700 hover:text-coral-600 transition-colors">
                harsha.whf@gmail.com
              </span>
            </motion.div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-neutral-600">
              <Shield size={16} className="text-coral-600" />
              <span className="font-semibold">LLQP Certified • Licensed in Ontario</span>
            </div>
            
            {/* Dark mode toggle */}
            <motion.button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-coral-50 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isDark ? (
                <Sun size={18} className="text-coral-500" />
              ) : (
                <Moon size={18} className="text-coral-500" />
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* Premium logo positioning */}
        <motion.div 
          className="hidden md:flex items-center absolute left-6 top-2 z-10"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
        >
          <motion.div
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Image 
              src={HashLyfIcon} 
              alt="HashLyf Logo" 
              width={130}
              height={130}
               // style={{
              //   filter: 'drop-shadow(0 0 20px rgba(238, 107, 107, 0.3))',
              //   background: 'rgba(255,255,255,0.1)',
              // }}
            />
          </motion.div>
        </motion.div>

        {/* Main navigation with premium styling */}
        <nav className="flex justify-between items-center py-4">
          <motion.div 
            className="flex items-center space-x-4"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            {/* Mobile logo */}
            <div className="md:hidden">
              <Image 
                src={HashLyfIcon} 
                alt="HashLyf Logo" 
                width={48} 
                height={48} 
                className="object-contain rounded-full shadow-glow-coral"
              />
            </div>
            
            <div className={cn(
              "heading-medium transition-colors duration-300",
              isScrolled ? "text-neutral-800" : "text-neutral-900"
            )}>
              <span className="text-gradient-coral">Hash</span>Life Insurance
            </div>
          </motion.div>

          {/* Desktop navigation with premium hover effects */}
          <motion.div 
            className="hidden lg:flex items-center space-x-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, staggerChildren: 0.1 }}
          >
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="relative font-semibold transition-all duration-300 hover:text-coral-600 group text-neutral-700 py-2"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ y: -2 }}
              >
                {item.name}
                <motion.span 
                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-coral-500 to-accent-500 rounded-full"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </motion.div>

          <div className="flex items-center space-x-4">
            {/* Premium CTA button */}
            <motion.div 
              className="hidden lg:block"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
            >
              <motion.button 
                onClick={openModal}
                className="btn-premium group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Get Free Quote</span>
                <Sparkles className="group-hover:rotate-12 transition-transform" size={18} />
              </motion.button>
            </motion.div>

            {/* Premium mobile menu button */}
            <motion.button 
              className={cn(
                "lg:hidden p-3 rounded-xl transition-all duration-300 shadow-elegant",
                isOpen 
                  ? "bg-coral-500 text-white shadow-glow-coral" 
                  : "hover:bg-coral-50 text-neutral-700 hover:shadow-luxury"
              )}
              onClick={() => setIsOpen(!isOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </nav>

        {/* Premium mobile menu with advanced animations */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              className="lg:hidden pb-6"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="card-premium mx-4 overflow-hidden"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex flex-col space-y-2">
                  {navItems.map((item, index) => (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      className="py-4 px-6 text-neutral-700 hover:text-coral-600 hover:bg-coral-50 rounded-xl transition-all duration-300 font-semibold group"
                      onClick={() => setIsOpen(false)}
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 + index * 0.1 }}
                      whileHover={{ x: 10 }}
                    >
                      <span className="flex items-center justify-between">
                        {item.name}
                        <motion.div
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          className="w-2 h-2 bg-coral-500 rounded-full"
                        />
                      </span>
                    </motion.a>
                  ))}
                  
                  <motion.div 
                    className="pt-6 border-t border-neutral-200"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    <motion.button 
                      onClick={() => { setIsOpen(false); openModal(); }}
                      className="btn-premium w-full"
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>Get Free Quote</span>
                      <Sparkles size={18} />
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
