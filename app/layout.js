import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'HashLife Insurance - Life Insurance & Funeral Expense Coverage',
  description: 'LLQP certified life insurance agent in Ontario. Get comprehensive life insurance and funeral expense coverage to protect your family\'s future.',
  keywords: 'life insurance Ontario, funeral expense insurance, LLQP certified, HashLife Insurance'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}