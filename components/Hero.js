import { Shield, Heart, Users, Sparkles, TrendingUp, Award } from 'lucide-react'

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Enhanced gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-primary-800 to-purple-900"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      
      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary-400/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-purple-400/20 rounded-full blur-2xl animate-pulse delay-500"></div>
      
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/20">
              <Award className="text-accent-400" size={20} />
              <span className="text-white font-semibold">LLQP Certified Professional</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              <span className="text-white">Protect Your Family's</span>
              <span className="block gradient-text mt-2">Future Today</span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-blue-100 leading-relaxed max-w-2xl">
              Expert life insurance solutions across Ontario. From comprehensive life coverage 
              to funeral expense policies, I help families secure their financial future with 
              personalized protection plans that matter.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <a href="#contact" className="btn-primary inline-flex items-center justify-center space-x-2 group">
                <span>Get Your FREE Quote Below</span>
                <Sparkles className="group-hover:rotate-12 transition-transform" size={20} />
              </a>
              <a href="#services" className="btn-secondary inline-flex items-center justify-center space-x-2">
                <span>Learn About Our Services</span>
              </a>
            </div>
            
            {/* Enhanced trust indicators */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center group">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 group-hover:bg-white/20 transition-all duration-300">
                  <Shield className="mx-auto mb-3 text-accent-400 group-hover:scale-110 transition-transform" size={36} />
                  <div className="text-white font-semibold">LLQP Certified</div>
                  <div className="text-blue-200 text-sm mt-1">Licensed Professional</div>
                </div>
              </div>
              <div className="text-center group">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 group-hover:bg-white/20 transition-all duration-300">
                  <Heart className="mx-auto mb-3 text-red-400 group-hover:scale-110 transition-transform" size={36} />
                  <div className="text-white font-semibold">Family Focused</div>
                  <div className="text-blue-200 text-sm mt-1">Personal Approach</div>
                </div>
              </div>
              <div className="text-center group">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 group-hover:bg-white/20 transition-all duration-300">
                  <Users className="mx-auto mb-3 text-green-400 group-hover:scale-110 transition-transform" size={36} />
                  <div className="text-white font-semibold">Trusted Advisor</div>
                  <div className="text-blue-200 text-sm mt-1">Proven Results</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:text-right">
            <div className="glass-effect rounded-3xl p-8 shadow-2xl border">
              <div className="flex items-center space-x-3 mb-6">
                <TrendingUp className="text-accent-600" size={28} />
                <h3 className="text-2xl font-bold text-gray-800">Recent Success Story</h3>
              </div>
              
              <div className="bg-gradient-to-br from-accent-50 to-accent-100 p-8 rounded-2xl mb-6 border border-accent-200">
                <div className="text-5xl font-bold bg-gradient-to-r from-accent-600 to-accent-700 bg-clip-text text-transparent mb-3">
                  $20,000
                </div>
                <div className="text-gray-800 font-semibold text-lg mb-2">Funeral Expense Policy</div>
                <div className="text-gray-600">
                  Recently helped a family secure comprehensive funeral coverage, 
                  providing peace of mind during difficult times.
                </div>
              </div>
              
              <a href="#contact" className="btn-primary w-full inline-flex items-center justify-center space-x-2 group">
                <span>👇 Start Your Quote Below</span>
                <Sparkles className="group-hover:rotate-12 transition-transform" size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}