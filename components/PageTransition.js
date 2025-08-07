'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

const pageVariants = {
  initial: { 
    opacity: 0,
    y: 20,
    scale: 0.98
  },
  enter: { 
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  },
  exit: { 
    opacity: 0,
    y: -20,
    scale: 1.02,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
}

const overlayVariants = {
  initial: { scaleX: 0 },
  animate: { 
    scaleX: [0, 1, 0],
    transition: {
      duration: 0.8,
      times: [0, 0.5, 1],
      ease: "easeInOut"
    }
  }
}

export default function PageTransition({ children }) {
  const pathname = usePathname()

  return (
    <>
      {/* Page transition overlay */}
      <motion.div
        className="fixed inset-0 bg-gradient-to-r from-coral-500 via-coral-600 to-accent-500 z-[100] origin-left"
        variants={overlayVariants}
        initial="initial"
        animate="animate"
        key={pathname}
      />
      
      {/* Page content */}
      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          variants={pageVariants}
          initial="initial"
          animate="enter"
          exit="exit"
        >
          {children}
        </motion.main>
      </AnimatePresence>
    </>
  )
}