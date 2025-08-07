'use client'

import { motion } from 'framer-motion'
import { Loader2, Shield, Heart } from 'lucide-react'

const spinnerVariants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "linear"
    }
  }
}

const pulseVariants = {
  animate: {
    scale: [1, 1.2, 1],
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

const floatVariants = {
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

export default function LoadingSpinner({ size = 'medium', text = 'Loading...' }) {
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-10 h-10',
    large: 'w-16 h-16'
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {/* Premium loading animation */}
      <div className="relative">
        {/* Outer ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-coral-200"
          variants={pulseVariants}
          animate="animate"
        />
        
        {/* Spinning gradient ring */}
        <motion.div
          className={`relative ${sizeClasses[size]} rounded-full border-4 border-transparent bg-gradient-to-r from-coral-500 via-accent-500 to-coral-600 bg-clip-border`}
          variants={spinnerVariants}
          animate="animate"
          style={{
            background: 'conic-gradient(from 0deg, #ee6b6b, #ec4899, #ee6b6b)',
            WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 4px), #000 0)',
            mask: 'radial-gradient(farthest-side, transparent calc(100% - 4px), #000 0)',
          }}
        />
        
        {/* Center icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            variants={floatVariants}
            animate="animate"
          >
            <Shield className="w-4 h-4 text-coral-600" />
          </motion.div>
        </div>
      </div>
      
      {/* Loading text */}
      {text && (
        <motion.p 
          className="text-sm font-medium text-neutral-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {text}
        </motion.p>
      )}
      
      {/* Floating dots */}
      <div className="flex space-x-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-coral-400 rounded-full"
            animate={{
              y: [0, -10, 0],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </div>
  )
}

export function FullPageLoader({ message = "Loading your insurance solutions..." }) {
  return (
    <div className="fixed inset-0 bg-white/95 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="text-center">
        <LoadingSpinner size="large" />
        <motion.div
          className="mt-8 space-y-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-xl font-semibold text-neutral-800">{message}</h3>
          <p className="text-neutral-600">Please wait a moment...</p>
        </motion.div>
      </div>
    </div>
  )
}

export function InlineLoader({ size = 'small' }) {
  return (
    <motion.div
      className="inline-flex items-center space-x-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className={`${size === 'small' ? 'w-4 h-4' : 'w-6 h-6'} rounded-full border-2 border-coral-200 border-t-coral-500`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      <span className="text-sm text-neutral-600">Loading...</span>
    </motion.div>
  )
}