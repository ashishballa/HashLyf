import { Award, MapPin, Phone, Users, Target, Clock, CheckCircle2, Star, TrendingUp } from 'lucide-react'

export default function About() {
  const achievements = [
    { icon: <Award className="text-yellow-600" size={24} />, label: "LLQP Certified", value: "Professional" },
    { icon: <MapPin className="text-blue-600" size={24} />, label: "Licensed Across", value: "Ontario" },
    { icon: <Users className="text-green-600" size={24} />, label: "Families", value: "Protected" },
    { icon: <TrendingUp className="text-purple-600" size={24} />, label: "Success", value: "Rate" }
  ]

  const whyChooseMe = [
    {
      icon: <Award className="text-primary-600" size={32} />,
      title: "Expert Knowledge",
      description: "LLQP certification ensures you receive professional, knowledgeable advice on all insurance matters with up-to-date industry insights."
    },
    {
      icon: <Target className="text-accent-600" size={32} />,
      title: "Personalized Approach",
      description: "Every family is unique. I take time to understand your specific needs, goals, and budget to create tailored solutions."
    },
    {
      icon: <Clock className="text-blue-600" size={32} />,
      title: "Ongoing Support",
      description: "Your insurance needs evolve. I provide continuous support, policy reviews, and adjustments as your life changes."
    },
    {
      icon: <CheckCircle2 className="text-green-600" size={32} />,
      title: "Proven Results",
      description: "Recent success stories like securing comprehensive funeral expense coverage demonstrate my commitment to client success."
    }
  ]

  return (
    <section id="about" className="section-padding bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-primary-100 to-accent-100 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-20 left-10 w-56 h-56 bg-gradient-to-br from-accent-100 to-purple-100 rounded-full blur-3xl opacity-30"></div>
      
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <div>
              <div className="inline-flex items-center space-x-2 bg-accent-100 text-accent-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Star size={16} />
                <span>About Your Agent</span>
              </div>
              <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Your Trusted Insurance
                <span className="gradient-text block">Partner in Ontario</span>
              </h2>
            </div>
            
            <div className="space-y-6">
              <p className="text-xl text-gray-600 leading-relaxed">
                As an LLQP certified life insurance agent with Whitehorse Financial, 
                I bring years of dedicated experience helping families across Ontario secure 
                their financial future through comprehensive insurance solutions.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                My recent success in securing a $20,000 funeral expense policy demonstrates 
                my commitment to understanding each client's unique needs and finding the 
                right coverage to protect what matters most to your family.
              </p>
            </div>
            
            {/* Achievement stats */}
            <div className="grid grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <div key={index} className="bg-gray-50 rounded-2xl p-6 text-center group hover:bg-white hover:shadow-lg transition-all duration-300">
                  <div className="flex justify-center mb-3 group-hover:scale-110 transition-transform">
                    {achievement.icon}
                  </div>
                  <div className="text-sm text-gray-600 mb-1">{achievement.label}</div>
                  <div className="font-bold text-gray-900">{achievement.value}</div>
                </div>
              ))}
            </div>

            {/* Contact CTA */}
            <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-6 border border-primary-100">
              <div className="flex items-center space-x-4">
                <Phone className="text-primary-600" size={32} />
                <div>
                  <div className="font-semibold text-gray-900">Ready to get started?</div>
                  <div className="text-gray-600">Call (905) 922-6136 for immediate assistance</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="glass-effect rounded-3xl p-8 shadow-2xl border">
              <h3 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                <Star className="text-yellow-500 mr-3" size={32} />
                Why Choose Me?
              </h3>
              
              <div className="space-y-6">
                {whyChooseMe.map((item, index) => (
                  <div key={index} className="group p-6 rounded-2xl hover:bg-gray-50 transition-all duration-300 border border-transparent hover:border-gray-200">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 p-3 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 group-hover:from-primary-50 group-hover:to-accent-50 transition-all duration-300">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-gray-600 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust badge */}
            <div className="text-center">
              <div className="inline-flex items-center space-x-3 bg-green-50 text-green-700 px-6 py-4 rounded-2xl border border-green-200">
                <CheckCircle2 className="text-green-600" size={24} />
                <span className="font-semibold">Licensed & Certified Professional</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}