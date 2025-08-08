import { Shield, Heart, Umbrella, FileText, CheckCircle, ArrowRight, Plane } from 'lucide-react'

export default function Services() {
  const services = [
    {
      icon: <Shield className="text-white" size={48} />,
      title: "Life Insurance Ontario",
      description: "Affordable term life insurance, permanent whole life, and universal life insurance policies to provide financial protection and security for your family when they need it most. Compare rates from top Canadian insurance companies.",
      features: ["Affordable Term Life Insurance", "Permanent Whole Life Insurance", "Universal Life Insurance", "Mortgage Protection Insurance"],
      gradient: "from-primary-600 to-primary-700",
      bgGradient: "from-primary-50 to-primary-100"
    },
    {
      icon: <Heart className="text-white" size={48} />,
      title: "Final Expense & Burial Insurance", 
      description: "Affordable funeral expense insurance and burial coverage to protect your family from unexpected final costs. No medical exam options available with guaranteed acceptance policies.",
      features: ["Up to $25,000 Burial Coverage", "No Medical Exam Final Expense", "Guaranteed Acceptance Policies", "Immediate Death Benefits"],
      gradient: "from-primary-500 to-primary-600",
      bgGradient: "from-primary-50 to-primary-100"
    },
    {
      icon: <Umbrella className="text-white" size={48} />,
      title: "Critical Illness & Disability Insurance",
      description: "Comprehensive critical illness insurance and disability coverage to protect against major health events like cancer, heart attack, and stroke that could impact your family's financial stability and income.",
      features: ["Cancer Insurance Coverage", "Heart Attack & Stroke Protection", "Disability Income Benefits", "Return of Premium Options"],
      gradient: "from-success-600 to-success-700",
      bgGradient: "from-success-50 to-success-100"
    },
    {
      icon: <Plane className="text-white" size={48} />,
      title: "Super Visa & Visitor Travel Insurance",
      description: "Specialized travel medical insurance for visiting parents and grandparents to Canada, including mandatory Super Visa insurance requirements, visitor insurance, and emergency travel coverage for extended stays.",
      features: ["Mandatory Super Visa Insurance", "Up to $100,000 Medical Coverage", "Pre-existing Medical Conditions", "Multi-Trip & Extended Stay Options"],
      gradient: "from-blue-600 to-blue-700",
      bgGradient: "from-blue-50 to-blue-100"
    },
    {
      icon: <FileText className="text-white" size={48} />,
      title: "Insurance Consultation & Policy Review",
      description: "Free comprehensive insurance consultation, policy review services, and personalized insurance planning to assess your coverage gaps and optimize your family's financial protection strategy.",
      features: ["Free Insurance Consultation", "Policy Needs Assessment", "Coverage Gap Analysis", "Ongoing Insurance Support"],
      gradient: "from-accent-600 to-accent-700",
      bgGradient: "from-accent-50 to-accent-100"
    }
  ]

  return (
    <section id="services" className="section-premium warm-gradient-bg dark:bg-gray-900">
      <div className="container-premium">
        <div className="text-center mb-20">
          <div className="badge-premium mb-6">
            <Shield size={16} />
            <span>Professional Services</span>
          </div>
          <h2 className="heading-display text-gray-900 dark:text-white mb-6">
            Comprehensive Insurance
            <span className="gradient-text block">Solutions</span>
          </h2>
          <p className="text-body-large text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
            As a licensed LLQP certified insurance broker with WhiteHorse Financial, I provide comprehensive insurance solutions across Ontario. From affordable term life insurance and permanent whole life coverage to specialized travel insurance for visiting family members, I compare quotes from multiple insurance companies and providers to find you the best possible coverage, competitive rates, and personalized protection plans tailored to safeguard what matters most to you and your loved ones.
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
                
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center text-gray-700 dark:text-gray-300">
                      <CheckCircle className="text-green-500 dark:text-green-400 mr-3 flex-shrink-0" size={18} />
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