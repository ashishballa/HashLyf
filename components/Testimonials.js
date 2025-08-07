import { Star, Quote, Heart, CheckCircle } from 'lucide-react'

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah M.",
      location: "Toronto, ON",
      text: "Working with this agent was exceptional. They helped us secure a comprehensive life insurance policy that perfectly fits our budget and needs. Highly professional and knowledgeable.",
      rating: 5,
      insuranceType: "Life Insurance",
      amount: "$100,000",
      avatar: "S",
      bgColor: "from-primary-500 to-primary-600"
    },
    {
      name: "David L.", 
      location: "Ottawa, ON",
      text: "After losing my father, I realized how important funeral expense insurance is. The agent walked me through everything and helped secure coverage that gives our family peace of mind.",
      rating: 5,
      insuranceType: "Funeral Expense",
      amount: "$15,000",
      avatar: "D",
      bgColor: "from-success-500 to-success-600"
    },
    {
      name: "Jennifer K.",
      location: "Mississauga, ON", 
      text: "The personalized service was outstanding. They took time to understand our family's unique situation and found coverage options we didn't even know existed. Good Job!",
      rating: 5,
      insuranceType: "Critical Illness",
      amount: "$50,000",
      avatar: "J",
      bgColor: "from-accent-500 to-accent-600"
    }
  ]

  return (
    <section id="testimonials" className="section-padding bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-br from-accent-100 to-primary-100 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-gradient-to-br from-primary-100 to-accent-100 rounded-full blur-3xl opacity-30"></div>
      
      <div className="container-premium relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 bg-accent-100 text-accent-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Heart size={16} />
            <span>Client Testimonials</span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            What Our Clients
            <span className="gradient-text block">Say About Us</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Real families sharing their experiences with our professional insurance services. 
            Their trust and satisfaction drive our commitment to excellence.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="group card-hover">
              <div className="relative bg-white rounded-3xl p-8 shadow-lg border border-gray-100 h-full overflow-hidden">
                {/* Quote decoration */}
                <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Quote size={48} className="text-primary-600" />
                </div>
                
                {/* Stars */}
                <div className="flex mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="text-yellow-400 fill-current group-hover:scale-110 transition-transform duration-300" 
                      size={20} 
                      style={{ transitionDelay: `${i * 50}ms` }}
                    />
                  ))}
                </div>
                
                {/* Testimonial text */}
                <blockquote className="text-gray-700 mb-8 text-lg leading-relaxed italic relative z-10">
                  "{testimonial.text}"
                </blockquote>
                
                {/* Success badge */}
                <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <CheckCircle className="text-green-600" size={16} />
                        <span className="text-green-800 font-semibold text-sm">{testimonial.insuranceType}</span>
                      </div>
                      <div className="text-green-700 font-bold text-lg">{testimonial.amount}</div>
                    </div>
                    <div className="text-green-600 text-2xl">✓</div>
                  </div>
                </div>
                
                {/* Client info */}
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.bgColor} flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform`}>
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-lg">{testimonial.name}</div>
                    <div className="text-gray-600 text-sm">{testimonial.location}</div>
                  </div>
                </div>
                
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-accent-50 opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-300"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <div className="glass-effect rounded-3xl p-8 shadow-2xl border max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Join Our Satisfied Clients</h3>
            <p className="text-gray-600 mb-6 text-lg">
              Ready to experience the same level of professional service and personalized attention? 
              Get your free insurance quote today.
            </p>
            <a href="#contact" className="btn-primary inline-flex items-center space-x-2 group">
              <span>Get Your Free Quote</span>
              <Heart className="group-hover:scale-110 transition-transform" size={20} />
            </a>
          </div>
        </div>

        {/* Trust indicators */}
        <div className="grid md:grid-cols-4 gap-8 mt-16 text-center">
          <div className="group">
            <div className="text-4xl font-bold text-primary-600 mb-2 group-hover:scale-110 transition-transform">50+</div>
            <div className="text-gray-600 font-medium">Happy Families</div>
          </div>
          <div className="group">
            <div className="text-4xl font-bold text-accent-600 mb-2 group-hover:scale-110 transition-transform">$2M+</div>
            <div className="text-gray-600 font-medium">Coverage Secured</div>
          </div>
          <div className="group">
            <div className="text-4xl font-bold text-accent-600 mb-2 group-hover:scale-110 transition-transform">24h</div>
            <div className="text-gray-600 font-medium">Response Time</div>
          </div>
          <div className="group">
            <div className="text-4xl font-bold text-green-600 mb-2 group-hover:scale-110 transition-transform">100%</div>
            <div className="text-gray-600 font-medium">Satisfaction</div>
          </div>
        </div>
      </div>
    </section>
  )
}