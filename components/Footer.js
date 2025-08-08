export default function Footer() {
  return (
    <footer className="section-compact bg-gray-900 text-white">
      <div className="container-premium">
        <div className="grid-cards-4">
          <div>
            <h3 className="heading-small mb-4">HashLife Insurance</h3>
            <p className="text-body-small text-gray-300 mb-4">
              Local LLQP certified life insurance agent with WhiteHorse Financial serving Toronto, Ottawa, Hamilton, Mississauga and all Ontario communities. I compare multiple providers to find you the best coverage and rates for life insurance, travel insurance, and funeral expense coverage.
            </p>
            <div className="text-sm text-gray-400">
              Licensed Insurance Agent • Ontario, Canada • LLQP Certified
            </div>
          </div>
          
          <div>
            <h4 className="heading-small mb-4">Services</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Life Insurance Ontario</li>
              <li>Parents & Grandparents Travel Insurance</li>
              <li>Funeral Expense Insurance</li>
              <li>Critical Illness Coverage</li>
              <li>Super Visa Insurance</li>
              <li>Insurance Reviews & Planning</li>
            </ul>
          </div>
          
          <div>
            <h4 className="heading-small mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#home" className="hover:text-white">Home</a></li>
              <li><a href="#services" className="hover:text-white">Services</a></li>
              <li><a href="#about" className="hover:text-white">About</a></li>
              <li><a href="#contact" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="heading-small mb-4">Contact Info</h4>
            <div className="space-y-2 text-gray-300">
              <div>📧 Email: <a href="mailto:harsha.whf@gmail.com" className="text-coral-300 hover:text-coral-200 transition-colors">harsha.whf@gmail.com</a></div>
              <div>📍 Serving: Toronto, Ottawa, Hamilton, Mississauga</div>
              <div>🏠 Ontario, Canada</div>
              <div className="mt-4">
                <a href="https://www.google.com/search?q=HashLife+Insurance+Ontario" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                  📍 Find us on Google
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 HashLife Insurance. All rights reserved. LLQP Licensed Agent.</p>
          <p className="mt-2 text-sm">
            This website is for informational purposes. Insurance products subject to underwriting approval.
          </p>
        </div>
      </div>
    </footer>
  )
}