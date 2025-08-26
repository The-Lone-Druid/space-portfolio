'use client'

import { Button } from '@/components/ui/button'
import { scrollToSection } from '../../lib/utils'
import { Service } from '../../types'
import { SectionHeader } from '../shared/section-header'
import { ServiceCard } from '../cards/service-card'
import { Rocket, Sparkles, ArrowRight } from 'lucide-react'
import { useState, useEffect } from 'react'

interface ServicesProps {
  services: Service[]
}

const Services = ({ services }: ServicesProps) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleGetStarted = () => {
    scrollToSection('#contact')
  }

  return (
    <>
      {/* Background Effects */}
      <div className='pointer-events-none absolute inset-0 overflow-hidden'>
        <div className='bg-space-gold/20 animate-float absolute top-20 right-10 h-4 w-4 rounded-full'></div>
        <div
          className='bg-space-accent/30 animate-float absolute bottom-32 left-20 h-2 w-2 rounded-full'
          style={{ animationDelay: '2s' }}
        ></div>
        <div
          className='animate-float absolute top-1/2 right-1/4 h-3 w-3 rounded-full bg-blue-400/20'
          style={{ animationDelay: '4s' }}
        ></div>
      </div>

      <SectionHeader
        title='Services I'
        highlight='Offer'
        subtitle='From concept to deployment, I provide comprehensive solutions to launch your digital presence into the stratosphere of success'
      />

      {/* Services Grid */}
      <div
        className={`mb-16 grid transform grid-cols-1 gap-8 transition-all duration-1000 md:grid-cols-2 lg:grid-cols-3 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
      >
        {services.map((service, index) => (
          <ServiceCard
            key={service.id}
            {...service}
            onGetStarted={handleGetStarted}
            animationDelay={index * 0.1}
          />
        ))}
      </div>

      {/* Enhanced Call to Action */}
      <div
        className={`transform text-center transition-all delay-300 duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
      >
        <div className='relative mx-auto max-w-4xl'>
          {/* Background glow effect */}
          <div className='from-space-gold/20 to-space-accent/20 absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br opacity-0 blur-xl transition-opacity duration-500 hover:opacity-100'></div>

          <div className='glass-nebula group relative overflow-hidden rounded-3xl border border-purple-500/30 p-12 transition-all duration-500 hover:border-purple-500/50'>
            {/* Animated background elements */}
            <div className='absolute inset-0 opacity-5 transition-opacity duration-500 group-hover:opacity-10'>
              <div className='bg-gradient-radial from-space-gold/30 absolute top-0 right-0 h-32 w-32 rounded-full to-transparent'></div>
              <div className='bg-gradient-radial from-space-accent/30 absolute bottom-0 left-0 h-24 w-24 rounded-full to-transparent'></div>
            </div>

            <div className='relative z-10'>
              {/* Header with enhanced styling */}
              <div className='mb-6 flex items-center justify-center gap-3'>
                <div className='from-space-gold flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br to-yellow-400 shadow-lg transition-transform duration-300 group-hover:scale-110'>
                  <Rocket className='h-6 w-6 text-white' />
                </div>
                <div className='from-space-gold/20 flex h-10 w-10 animate-pulse items-center justify-center rounded-full bg-gradient-to-br to-transparent'>
                  <Sparkles className='text-space-gold h-5 w-5' />
                </div>
              </div>

              <h3 className='group-hover:text-space-gold mb-4 text-3xl font-bold text-white transition-colors duration-300'>
                Ready to Launch Your Project?
              </h3>
              <p className='mb-8 text-xl leading-relaxed text-gray-300 transition-colors duration-300 group-hover:text-gray-200'>
                Let&apos;s discuss your vision and bring it to life together.
                From initial concept to stellar deployment, I&apos;ll guide your
                project through every phase of its cosmic journey.
              </p>

              {/* Enhanced Button */}
              <div className='relative inline-block'>
                <Button
                  onClick={handleGetStarted}
                  variant='cosmic'
                  size='lg'
                  className='group/button relative overflow-hidden px-8 py-4 text-lg font-semibold'
                >
                  <div className='from-space-gold/20 to-space-accent/20 absolute inset-0 bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover/button:opacity-100' />
                  <div className='relative z-10 flex items-center gap-3'>
                    <span>Start Your Journey</span>
                    <ArrowRight className='h-5 w-5 transition-transform duration-300 group-hover/button:translate-x-1' />
                  </div>
                  <div className='from-space-gold to-space-accent absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r transition-all duration-500 group-hover/button:w-full'></div>
                </Button>
                <div className='from-space-gold/20 to-space-accent/20 absolute inset-0 -z-10 rounded-xl bg-gradient-to-br opacity-0 blur-xl transition-opacity duration-500 group-hover/button:opacity-100'></div>
              </div>

              {/* Quote or testimonial element */}
              <div className='mt-8 flex justify-center'>
                <div className='group/quote relative'>
                  <div className='text-space-gold/60 rotate-180 font-serif text-lg'>
                    &ldquo;
                  </div>
                  <p className='mx-4 inline text-gray-400 italic transition-colors duration-300 group-hover:text-gray-300'>
                    Every great project starts with a single conversation
                  </p>
                  <div className='text-space-gold/60 font-serif text-lg'>
                    &rdquo;
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Services
