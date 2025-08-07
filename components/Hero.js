'use client'

import { Shield, Heart, Users, Sparkles, TrendingUp, Award, ArrowDown } from 'lucide-react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { cn } from '../lib/utils'

export default function Hero({ openModal }) {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

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

  const floatingAnimation = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
    <section ref={ref} className="section-hero min-h-screen flex items-center bg-mesh">
      {/* Premium gradient background with mesh overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-coral-900 via-coral-800 to-accent-900"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
      
      {/* Floating background elements with enhanced animations */}
      <motion.div 
        className="absolute top-20 left-10 w-32 h-32 bg-coral-400/20 rounded-full blur-3xl"
        {...floatingAnimation}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-40 h-40 bg-accent-400/20 rounded-full blur-3xl"
        animate={{
          y: [15, -15, 15],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute top-1/2 left-1/3 w-24 h-24 bg-accent-400/15 rounded-full blur-2xl"
        animate={{
          x: [-20, 20, -20],
          y: [10, -10, 10],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <div className="container-premium relative z-10">
        <motion.div 
          className="responsive-two-col items-center max-w-none"
          variants={staggerContainer}
          initial="initial"
          animate={inView ? "animate" : "initial"}
        >
          <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
            {/* Professional badge with premium styling */}
            <motion.div 
              className="badge-glass text-white"
              variants={fadeUp}
            >
              <Award className="text-accent-400 animate-pulse" size={20} />
              <span className="text-white font-semibold">LLQP Certified Professional</span>
            </motion.div>
            
            <motion.h1 
              className="heading-hero text-white"
              variants={fadeUp}
            >
              <span className="block drop-shadow-2xl text-shadow-strong">Protect Your Family's</span>
              <span className="block text-gradient-premium mt-2 animate-gradient drop-shadow-2xl">
                Future Today
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-body-large text-coral-100 max-w-2xl mx-auto lg:mx-0"
              variants={fadeUp}
            >
              Expert life insurance solutions across Ontario. From comprehensive life coverage 
              to funeral expense policies, I help families secure their financial future with 
              personalized protection plans that matter.
            </motion.p>
            
            <motion.div 
              className="responsive-flex justify-center lg:justify-start"
              variants={fadeUp}
            >
              <button 
                onClick={openModal}
                className={cn("btn-premium interactive-scale group")}
              >
                <span>Get Your FREE Quote Below</span>
                <Sparkles className="group-hover:rotate-12 transition-transform" size={20} />
              </button>
              <a 
                href="#services" 
                className="btn-glass interactive-scale"
              >
                <span>Learn About Our Services</span>
              </a>
            </motion.div>
            
            {/* Enhanced trust indicators with premium cards */}
            <motion.div 
              className="flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-3 sm:gap-4 lg:gap-6 pt-6 sm:pt-8"
              variants={fadeUp}
            >
              {[
                { icon: Shield, title: "LLQP Certified", subtitle: "Licensed Professional", color: "text-emerald-400", bgColor: "from-emerald-500/20 to-emerald-600/20" },
                { icon: Heart, title: "Family Focused", subtitle: "Personal Approach", color: "text-coral-300", bgColor: "from-coral-500/20 to-coral-600/20" },
                { icon: Users, title: "Trusted Advisor", subtitle: "Customer Proven Results", color: "text-amber-400", bgColor: "from-amber-500/20 to-amber-600/20" }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className="flex-1 text-center group cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="relative card-glass p-3 sm:p-4 lg:p-6 group-hover:bg-white/20 transition-all duration-300 overflow-hidden">
                    {/* Gradient background for each card */}
                    <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500", item.bgColor)}></div>
                    <item.icon className={cn("relative z-10 mx-auto mb-2 sm:mb-3 group-hover:scale-110 transition-transform drop-shadow-lg", item.color)} size={28} />
                    <div className="relative z-10 text-white font-bold text-sm sm:text-base lg:text-lg drop-shadow-md">{item.title}</div>
                    <div className="relative z-10 text-white/90 text-xs sm:text-sm mt-1 font-medium drop-shadow-sm">{item.subtitle}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
          
          <motion.div 
            className="text-center lg:text-right order-first lg:order-last"
            variants={fadeUp}
          >
            {/* Premium success story card */}
            <div className="card-premium relative overflow-hidden mx-auto max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-none mt-8 lg:mt-0">
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-white via-coral-50/80 to-accent-50/60"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-coral-100/40 via-transparent to-accent-100/40"></div>
              
              {/* Floating decorative elements */}
              <motion.div 
                className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-coral-300/30 to-accent-300/30 rounded-full blur-3xl"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <motion.div 
                className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-tr from-accent-200/30 to-coral-200/30 rounded-full blur-2xl"
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />
              
              <div className="relative z-10">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-gradient-to-r from-coral-500 to-accent-500 rounded-xl shadow-glow-coral">
                    <TrendingUp className="text-white" size={28} />
                  </div>
                  <h3 className="heading-medium text-coral-900">Recent Success Story</h3>
                </div>
                
                {/* Enhanced success story with premium styling */}
                <div className="relative p-8 rounded-2xl mb-6 overflow-hidden shadow-luxury">
                  <div className="absolute inset-0 bg-gradient-to-br from-coral-500 via-coral-600 to-accent-600"></div>
                  <div className="absolute inset-0 bg-gradient-to-tr from-accent-400/50 via-transparent to-coral-500/40"></div>
                  
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-shimmer bg-300% opacity-20"></div>
                  
                  <motion.div 
                    className="relative z-10 text-center"
                    whileHover={{ scale: 1.02 }}
                  >
                    <motion.div 
                      className="text-6xl lg:text-7xl font-bold text-white mb-3 drop-shadow-2xl"
                      initial={{ scale: 0 }}
                      animate={inView ? { scale: 1 } : { scale: 0 }}
                      transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                    >
                      $175,000
                    </motion.div>
                    <div className="text-white font-semibold text-xl mb-2 drop-shadow-md">
                      Life Insurance + Funeral Coverage
                    </div>
                    <div className="text-coral-100 leading-relaxed">
                      Helped the Martinez family restructure their existing policies into 
                      a comprehensive $150K term life + $25K funeral plan, saving them 
                      $180/month while doubling their coverage protection.
                    </div>
                  </motion.div>
                  
                  {/* Premium border with gradient */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-white/30"></div>
                </div>
                
                {/* Enhanced CTA with premium animations */}
                <motion.button 
                  onClick={openModal}
                  className="relative w-full inline-flex items-center justify-center space-x-2 group overflow-hidden rounded-xl p-4 font-semibold text-white transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-coral-600 via-coral-500 to-accent-500"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-accent-500/0 via-white/20 to-coral-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <span className="relative z-10">👇 Start Your Quote Below</span>
                  <motion.div
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <ArrowDown className="relative z-10" size={18} />
                  </motion.div>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}