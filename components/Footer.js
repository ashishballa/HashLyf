export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Whitehorse Financial</h3>
            <p className="text-gray-300 mb-4">
              LLQP certified life insurance agent providing comprehensive 
              protection solutions across Ontario.
            </p>
            <div className="text-sm text-gray-400">
              Licensed in Ontario, Canada
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Life Insurance</li>
              <li>Funeral Expense Insurance</li>
              <li>Critical Illness Coverage</li>
              <li>Insurance Reviews</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#home" className="hover:text-white">Home</a></li>
              <li><a href="#services" className="hover:text-white">Services</a></li>
              <li><a href="#about" className="hover:text-white">About</a></li>
              <li><a href="#contact" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <div className="space-y-2 text-gray-300">
              <div>Phone: (905) 922-6136</div>
              <div>Email: harsha.whf@gmail.com</div>
              <div>Ontario, Canada</div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Whitehorse Financial. All rights reserved. LLQP Licensed Agent.</p>
          <p className="mt-2 text-sm">
            This website is for informational purposes. Insurance products subject to underwriting approval.
          </p>
        </div>
      </div>
    </footer>
  )
}