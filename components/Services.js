import { Shield, Heart, Umbrella, FileText, CheckCircle, ArrowRight } from 'lucide-react'

export default function Services() {
  const services = [
    {
      icon: <Shield className="text-white" size={48} />,
      title: "Life Insurance",
      description: "Comprehensive life insurance policies to provide financial security for your loved ones when they need it most.",
      features: ["Term Life Insurance", "Whole Life Insurance", "Universal Life Insurance", "Customized Coverage"],
      gradient: "from-primary-600 to-primary-700",
      bgGradient: "from-primary-50 to-primary-100"
    },
    {
      icon: <Heart className="text-white" size={48} />,
      title: "Funeral Expense Insurance", 
      description: "Dedicated coverage for funeral and burial expenses, ensuring your family isn't burdened with unexpected costs.",
      features: ["Up to $25,000 Coverage", "No Medical Exam Options", "Guaranteed Acceptance", "Immediate Benefits"],
      gradient: "from-primary-500 to-primary-600",
      bgGradient: "from-primary-50 to-primary-100"
    },
    {
      icon: <Umbrella className="text-white" size={48} />,
      title: "Critical Illness Coverage",
      description: "Protection against major health events that could impact your family's financial stability.",
      features: ["Cancer Coverage", "Heart Attack Protection", "Stroke Benefits", "Return of Premium Options"],
      gradient: "from-success-600 to-success-700",
      bgGradient: "from-success-50 to-success-100"
    },
    {
      icon: <FileText className="text-white" size={48} />,
      title: "Insurance Review & Planning",
      description: "Comprehensive review of your existing coverage and personalized planning for your family's unique needs.",
      features: ["Free Policy Review", "Needs Assessment", "Coverage Gap Analysis", "Ongoing Support"],
      gradient: "from-accent-600 to-accent-700",
      bgGradient: "from-accent-50 to-accent-100"
    }
  ]

  return (
    <section id="services" className="section-premium warm-gradient-bg">
      <div className="container-premium">
        <div className="text-center mb-20">
          <div className="badge-premium mb-6">
            <Shield size={16} />
            <span>Professional Services</span>
          </div>
          <h2 className="heading-display text-gray-900 mb-6">
            Comprehensive Insurance
            <span className="gradient-text block">Solutions</span>
          </h2>
          <p className="text-body-large text-gray-600 max-w-4xl mx-auto">
            As an LLQP certified agent with WhiteHorse Financial, I compare quotes from 
            multiple insurance providers to find you the best possible coverage and rates 
            tailored to protect what matters most to you and your family.
          </p>
        </div>

        <div className="grid-cards-4">
          {services.map((service, index) => (
            <div key={index} className="group card-hover">
              <div className="card-premium h-full">
                {/* Icon container */}
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${service.gradient} shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {service.icon}
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center text-gray-700">
                      <CheckCircle className="text-green-500 mr-3 flex-shrink-0" size={18} />
                      <span className="text-sm font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {/* Hover arrow */}
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1">
                  <ArrowRight className="text-primary-600" size={24} />
                </div>
                
                {/* Background gradient on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.bgGradient} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-300`}></div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h3>
            <p className="text-gray-600 mb-6">
              Schedule your free consultation today and discover the perfect insurance solution for your family.
            </p>
            <a href="#contact" className="btn-primary inline-flex items-center justify-center space-x-2">
              <span>Schedule Your Free Consultation</span>
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}