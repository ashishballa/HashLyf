import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'HashLife Insurance - Life Insurance & Funeral Expense Coverage',
  description: 'LLQP certified life insurance agent with WhiteHorse Financial in Ontario. I compare multiple providers to find you the best life insurance and funeral expense coverage at competitive rates.',
  keywords: 'life insurance Ontario, funeral expense insurance, LLQP certified, WhiteHorse Financial, compare insurance quotes, best insurance rates Ontario'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}