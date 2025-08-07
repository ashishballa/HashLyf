import { Shield, Heart, Users, Sparkles, TrendingUp, Award } from 'lucide-react'

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Enhanced gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-800 via-primary-700 to-accent-800"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      
      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary-400/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-accent-400/20 rounded-full blur-2xl animate-pulse delay-500"></div>
      
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
            
            <p className="text-xl lg:text-2xl text-primary-100 leading-relaxed max-w-2xl">
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
                  <div className="text-primary-200 text-sm mt-1">Licensed Professional</div>
                </div>
              </div>
              <div className="text-center group">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 group-hover:bg-white/20 transition-all duration-300">
                  <Heart className="mx-auto mb-3 text-primary-400 group-hover:scale-110 transition-transform" size={36} />
                  <div className="text-white font-semibold">Family Focused</div>
                  <div className="text-primary-200 text-sm mt-1">Personal Approach</div>
                </div>
              </div>
              <div className="text-center group">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 group-hover:bg-white/20 transition-all duration-300">
                  <Users className="mx-auto mb-3 text-success-400 group-hover:scale-110 transition-transform" size={36} />
                  <div className="text-white font-semibold">Trusted Advisor</div>
                  <div className="text-primary-200 text-sm mt-1">Proven Results</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:text-right">
            {/* Enhanced Success Story Card with Beautiful Gradients */}
            <div className="relative rounded-3xl p-8 shadow-2xl border overflow-hidden">
              {/* Multi-layered gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-white via-primary-50/60 to-accent-50/60 backdrop-blur-sm"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-100/30 via-transparent to-accent-200/40"></div>
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-primary-300/20 to-accent-300/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-tr from-accent-200/20 to-primary-200/20 rounded-full blur-2xl"></div>
              
              <div className="relative z-10">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl">
                    <TrendingUp className="text-white" size={28} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">Recent Success Story</h3>
                </div>
                
                {/* Enhanced success story content with stunning gradients */}
                <div className="relative p-8 rounded-2xl mb-6 overflow-hidden">
                  {/* Gradient background for content area */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500 via-primary-400 to-accent-500 opacity-90"></div>
                  <div className="absolute inset-0 bg-gradient-to-tr from-accent-400/40 via-transparent to-primary-500/30"></div>
                  
                  {/* Floating elements for visual appeal */}
                  <div className="absolute top-4 right-4 w-16 h-16 bg-white/10 rounded-full blur-xl"></div>
                  <div className="absolute bottom-2 left-6 w-12 h-12 bg-accent-300/20 rounded-full blur-lg"></div>
                  
                  <div className="relative z-10 text-center">
                    <div className="text-6xl font-bold text-white mb-3 drop-shadow-lg">
                      $20,000
                    </div>
                    <div className="text-white font-semibold text-xl mb-2 drop-shadow-md">
                      Funeral Expense Policy
                    </div>
                    <div className="text-primary-100 leading-relaxed">
                      Recently helped a family secure comprehensive funeral coverage, 
                      providing peace of mind during difficult times.
                    </div>
                  </div>
                  
                  {/* Decorative border */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-white/20"></div>
                </div>
                
                {/* Enhanced CTA button */}
                <a href="#contact" className="relative w-full inline-flex items-center justify-center space-x-2 group overflow-hidden rounded-xl p-4 font-semibold text-white transition-all duration-300 hover:scale-105">
                  {/* Button gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-600 via-primary-500 to-accent-500"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-accent-500/0 via-white/10 to-primary-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <span className="relative z-10">👇 Start Your Quote Below</span>
                  <Sparkles className="relative z-10 group-hover:rotate-12 transition-transform" size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}