'use client'

import { ChevronRight, Home } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Breadcrumb({ items = [] }) {
  const defaultItems = [
    { name: 'Home', href: '#home', current: false },
    ...items
  ]

  return (
    <nav className="flex" aria-label="Breadcrumb">
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": defaultItems.map((item, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "name": item.name,
              "item": `https://hashlife-insurance.com${item.href}`
            }))
          })
        }}
      />
      
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {defaultItems.map((item, index) => (
          <motion.li 
            key={item.name} 
            className="inline-flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {index === 0 ? (
              <a
                href={item.href}
                className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-coral-600 transition-colors"
              >
                <Home className="w-4 h-4 mr-2" />
                {item.name}
              </a>
            ) : (
              <>
                <div className="flex items-center">
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                  {item.current ? (
                    <span className="ml-1 text-sm font-medium text-coral-600 md:ml-2">
                      {item.name}
                    </span>
                  ) : (
                    <a
                      href={item.href}
                      className="ml-1 text-sm font-medium text-gray-700 hover:text-coral-600 md:ml-2 transition-colors"
                    >
                      {item.name}
                    </a>
                  )}
                </div>
              </>
            )}
          </motion.li>
        ))}
      </ol>
    </nav>
  )
}