import Header from '../components/Header'
import Hero from '../components/Hero'
import Services from '../components/Services'
import About from '../components/About'
import FAQ from '../components/FAQ'
import Testimonials from '../components/Testimonials'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Contact />
      <Services />
      <About />
      <FAQ />
      <Testimonials />
      <Footer />
    </main>
  )
}