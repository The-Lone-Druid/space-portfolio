'use client'

import { ServiceCard, SectionCard } from '@/components/cards'
import { services } from '@/lib/data'
import { useScrollToSection } from '@/hooks'

const Services = () => {
  const { scrollToSection } = useScrollToSection()

  const handleGetStarted = () => {
    scrollToSection('contact')
  }

  return (
    <SectionCard
      id='services'
      title='Services I'
      highlight='Offer'
      subtitle='From concept to deployment, I provide comprehensive solutions to launch your digital presence into the stratosphere of success'
    >
      {/* Services Grid */}
      <div className='mb-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
        {services.map((service, index) => (
          <ServiceCard
            key={service.id}
            {...service}
            onGetStarted={handleGetStarted}
            animationDelay={index * 0.1}
          />
        ))}
      </div>

      {/* Call to Action */}
      <div className='text-center'>
        <div className='glass-cosmic rounded-3xl border-purple-500/30 p-12'>
          <h3 className='mb-4 text-3xl font-bold text-white'>
            Ready to Launch Your Project?
          </h3>
          <p className='mb-8 text-xl text-gray-300'>
            Let&apos;s discuss your vision and bring it to life together
          </p>
          <button
            onClick={handleGetStarted}
            className='bg-gradient-cosmic hover:shadow-space-gold/50 inline-flex items-center rounded-full px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl'
          >
            Start Your Journey
            <svg
              className='ml-3 h-6 w-6 transition-transform duration-300 group-hover:translate-x-1'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M13 7l5 5m0 0l-5 5m5-5H6'
              />
            </svg>
          </button>
        </div>
      </div>
    </SectionCard>
  )
}

export default Services
