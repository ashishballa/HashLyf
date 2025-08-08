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
    
    // Initialize dark mode from localStorage - default to light mode
    const savedTheme = localStorage.getItem('theme')
    
    if (savedTheme === 'dark') {
      setIsDark(true)
      document.documentElement.classList.add('dark')
    } else {
      // Default to light mode (ignore system preferences)
      setIsDark(false)
      document.documentElement.classList.remove('dark')
      // Set light mode as default if no preference is saved
      if (!savedTheme) {
        localStorage.setItem('theme', 'light')
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleDarkMode = () => {
    const newDarkMode = !isDark
    setIsDark(newDarkMode)
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  const navItems = [
    
    { name: 'Contact', href: '#contact' },
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Testimonials', href: '#testimonials' }
  ]

  return (
    <motion.header 
      className={cn(
        "fixed w-full top-0 z-[100] transition-all duration-500",
        isScrolled 
          ? "glass-navbar shadow-premium backdrop-blur-lg dark:bg-gray-900/80 dark:border-gray-700" 
          : "bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-elegant dark:shadow-glow-coral"
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
            isScrolled ? "border-white/20 dark:border-gray-700/50" : "border-neutral-200 dark:border-gray-700"
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center space-x-8">
            <motion.a 
              href="mailto:harsha.whf@gmail.com"
              className="flex items-center space-x-2 group cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              <Mail size={16} className="text-coral-500 group-hover:scale-110 transition-transform" />
              <span className="font-medium text-neutral-700 dark:text-neutral-300 hover:text-coral-600 dark:hover:text-coral-400 transition-colors">
                harsha.whf@gmail.com
              </span>
            </motion.a>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-neutral-600 dark:text-neutral-400">
              <Shield size={16} className="text-coral-600 dark:text-coral-400" />
              <span className="font-semibold">LLQP Certified • Licensed in Ontario</span>
            </div>
            
            {/* Dark mode toggle */}
            <motion.button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-coral-50 dark:hover:bg-gray-700 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? (
                <Sun size={18} className="text-coral-500 dark:text-coral-400" />
              ) : (
                <Moon size={18} className="text-coral-500 dark:text-coral-400" />
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* Main navigation with premium styling */}
        <nav className="flex justify-between items-center py-4 relative">
          <motion.div 
            className="flex items-center space-x-3 md:space-x-4 flex-shrink-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            {/* Logo for all screen sizes */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
              whileHover={{ scale: 1.05, rotate: 5 }}
            >
              <Image 
                src={HashLyfIcon} 
                alt="HashLife Insurance - LLQP Certified Life Insurance Agent Ontario" 
                width={48} 
                height={48} 
                className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain rounded-full shadow-glow-coral flex-shrink-0"
              />
            </motion.div>
            
            <div className={cn(
              "text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold transition-colors duration-300 flex-shrink-0",
              isScrolled ? "text-neutral-800 dark:text-neutral-200" : "text-neutral-900 dark:text-white"
            )}>
              <span className="text-coral-600 dark:text-coral-400 font-bold">Hash</span>Life Insurers
            </div>
          </motion.div>

          {/* Desktop navigation with premium hover effects */}
          <motion.div 
            className="hidden lg:flex items-center space-x-8 flex-1 justify-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, staggerChildren: 0.1 }}
          >
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="relative font-semibold transition-all duration-300 hover:text-coral-600 dark:hover:text-coral-400 group text-neutral-700 dark:text-neutral-300 py-2"
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

          <div className="flex items-center space-x-4 flex-shrink-0">
            {/* Premium CTA button */}
            <motion.div 
              className="hidden lg:block flex-shrink-0"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
            >
              <motion.button 
                onClick={openModal}
                className="btn-premium group relative z-10"
                whileHover={{ scale: 1.02 }}
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
                  : "hover:bg-coral-50 dark:hover:bg-gray-700 text-neutral-700 dark:text-neutral-300 hover:shadow-luxury"
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
                      className="py-4 px-6 text-neutral-700 dark:text-neutral-300 hover:text-coral-600 dark:hover:text-coral-400 hover:bg-coral-50 dark:hover:bg-gray-700 rounded-xl transition-all duration-300 font-semibold group"
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
