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
      {/* Section Header */}
      <div className='mb-12 sm:mb-16'>
        <SectionHeader
          title='Services I'
          highlight='Offer'
          subtitle='From concept to deployment, I provide comprehensive solutions to launch your digital presence into the stratosphere of success'
        />
      </div>

      {/* Services Grid */}
      <div
        className={`mb-16 grid transform grid-cols-1 gap-4 transition-all duration-1000 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 xl:gap-8 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
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

      {/* Enhanced Call to Action Section */}
      <div
        className={`transform transition-all delay-300 duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
      >
        <div className='relative'>
          {/* Floating Background Particles */}
          <div className='pointer-events-none absolute inset-0 overflow-hidden'>
            <div className='animate-float bg-space-gold/20 absolute top-10 right-8 h-3 w-3 rounded-full sm:right-12 sm:h-4 sm:w-4'></div>
            <div
              className='animate-float bg-space-accent/30 absolute bottom-16 left-8 h-2 w-2 rounded-full sm:left-12'
              style={{ animationDelay: '2s' }}
            ></div>
            <div
              className='animate-float absolute top-1/3 right-1/4 h-2 w-2 rounded-full bg-blue-400/20 sm:h-3 sm:w-3'
              style={{ animationDelay: '4s' }}
            ></div>
            <div
              className='animate-float absolute bottom-1/3 left-1/4 h-1.5 w-1.5 rounded-full bg-purple-400/30'
              style={{ animationDelay: '6s' }}
            ></div>
            <div
              className='animate-float absolute top-20 left-16 h-1 w-1 rounded-full bg-cyan-400/40'
              style={{ animationDelay: '8s' }}
            ></div>
          </div>

          <div className='glass-cosmic group hover:shadow-space-accent/10 relative overflow-hidden rounded-xl transition-all duration-500 hover:shadow-2xl sm:rounded-2xl'>
            {/* Content Container */}
            <div className='relative z-10 px-4 py-8 text-center sm:px-8 sm:py-12 md:px-12 md:py-16'>
              {/* Icon Header with Orbital Animation */}
              <div className='mb-6 flex items-center justify-center gap-2 sm:mb-8 sm:gap-4'>
                <div className='relative h-20 w-20 sm:h-24 sm:w-24'>
                  {/* Outer Orbital Ring */}
                  <div className='animate-spin-slow border-space-gold/50 absolute inset-0 rounded-full border-2 border-dashed'>
                    <div className='absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 animate-pulse rounded-full bg-gradient-to-r from-orange-500 to-red-600 shadow-lg shadow-orange-500/60'></div>
                    <div
                      className='absolute top-1/2 -right-1 h-2 w-2 -translate-y-1/2 animate-pulse rounded-full bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg shadow-blue-500/60'
                      style={{ animationDelay: '0.5s' }}
                    ></div>
                    <div
                      className='absolute -bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 animate-pulse rounded-full bg-gradient-to-r from-green-500 to-teal-600 shadow-lg shadow-green-500/60'
                      style={{ animationDelay: '1s' }}
                    ></div>
                    <div
                      className='absolute top-1/2 -left-1 h-1.5 w-1.5 -translate-y-1/2 animate-pulse rounded-full bg-gradient-to-r from-yellow-500 to-orange-600 shadow-lg shadow-yellow-500/60'
                      style={{ animationDelay: '1.5s' }}
                    ></div>
                  </div>

                  {/* Inner Orbital Ring */}
                  <div className='animate-spin-reverse absolute inset-3 rounded-full border border-dashed border-purple-400/40'>
                    <div className='absolute -top-0.5 left-1/2 h-1 w-1 -translate-x-1/2 animate-pulse rounded-full bg-gradient-to-r from-pink-500 to-rose-600 shadow-md shadow-pink-500/50'></div>
                    <div
                      className='absolute top-1/2 -right-0.5 h-1 w-1 -translate-y-1/2 animate-pulse rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 shadow-md shadow-cyan-500/50'
                      style={{ animationDelay: '0.7s' }}
                    ></div>
                    <div
                      className='absolute -bottom-0.5 left-1/2 h-0.5 w-0.5 -translate-x-1/2 animate-pulse rounded-full bg-gradient-to-r from-violet-500 to-purple-600 shadow-md shadow-violet-500/50'
                      style={{ animationDelay: '1.3s' }}
                    ></div>
                    <div
                      className='absolute top-1/2 -left-0.5 h-0.5 w-0.5 -translate-y-1/2 animate-pulse rounded-full bg-gradient-to-r from-indigo-500 to-blue-600 shadow-md shadow-indigo-500/50'
                      style={{ animationDelay: '1.8s' }}
                    ></div>
                  </div>

                  {/* Central Icon Container */}
                  <div className='from-space-gold group-hover:shadow-space-gold/25 absolute inset-4 z-10 flex items-center justify-center rounded-full bg-gradient-to-br to-amber-500 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl sm:inset-5'>
                    <Rocket className='h-6 w-6 text-white sm:h-8 sm:w-8' />
                  </div>

                  {/* Floating Sparkle */}
                  <div className='from-space-accent absolute -top-2 -right-2 h-6 w-6 animate-pulse rounded-full bg-gradient-to-br to-purple-500 opacity-80 sm:h-7 sm:w-7'>
                    <Sparkles className='m-1 h-4 w-4 text-white sm:m-1.5 sm:h-5 sm:w-5' />
                  </div>
                </div>
              </div>

              {/* Main Heading */}
              <h3 className='group-hover:from-space-gold group-hover:to-space-accent mb-4 bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-2xl font-bold text-transparent transition-all duration-300 group-hover:via-white sm:mb-6 sm:text-3xl md:text-4xl lg:text-5xl'>
                Ready to Launch Your Project?
              </h3>

              {/* Subtitle */}
              <p className='mx-auto mb-6 max-w-2xl text-base leading-relaxed text-gray-300 transition-colors duration-300 group-hover:text-gray-200 sm:mb-8 sm:text-lg md:mb-10 md:text-xl'>
                Transform your vision into a stellar digital experience. From
                conception to deployment, let&apos;s navigate the cosmos of
                possibilities together.
              </p>

              {/* Action Button with enhanced styling */}
              <div className='mb-6 flex justify-center sm:mb-8'>
                <div className='group/button relative'>
                  {/* Button glow effect */}
                  <div className='from-space-gold/30 to-space-accent/30 absolute -inset-1 rounded-lg bg-gradient-to-r opacity-0 blur-lg transition-all duration-500 group-hover/button:opacity-100 sm:-inset-2 sm:rounded-xl'></div>

                  <Button
                    onClick={handleGetStarted}
                    variant='cosmic'
                    size='lg'
                    className='relative h-12 overflow-hidden px-6 text-base font-semibold shadow-xl transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/25 sm:h-14 sm:px-8 sm:text-lg'
                  >
                    {/* Button background gradient overlay */}
                    <div className='absolute inset-0 bg-gradient-to-r from-purple-600/0 via-blue-500/20 to-purple-600/0 opacity-0 transition-opacity duration-300 group-hover/button:opacity-100' />

                    <div className='relative z-10 flex items-center gap-2 sm:gap-3'>
                      <span className='tracking-wide'>Start Your Journey</span>
                      <ArrowRight className='h-4 w-4 transition-all duration-300 group-hover/button:translate-x-2 group-hover/button:scale-110 sm:h-5 sm:w-5' />
                    </div>
                  </Button>
                </div>
              </div>

              {/* Features highlight */}
              <div className='mb-6 grid gap-3 text-xs text-gray-400 sm:gap-4 sm:text-sm md:grid-cols-3'>
                <div className='flex items-center justify-center gap-2'>
                  <div className='bg-space-gold h-1.5 w-1.5 rounded-full sm:h-2 sm:w-2'></div>
                  <span>Free Consultation</span>
                </div>
                <div className='flex items-center justify-center gap-2'>
                  <div className='bg-space-accent h-1.5 w-1.5 rounded-full sm:h-2 sm:w-2'></div>
                  <span>Custom Solutions</span>
                </div>
                <div className='flex items-center justify-center gap-2'>
                  <div className='h-1.5 w-1.5 rounded-full bg-purple-400 sm:h-2 sm:w-2'></div>
                  <span>Ongoing Support</span>
                </div>
              </div>

              {/* Inspirational quote */}
              <div className='pt-4 sm:mt-8 sm:pt-6'>
                <blockquote className='text-xs text-gray-500 italic transition-colors duration-300 group-hover:text-gray-400 sm:text-sm'>
                  &ldquo;Every extraordinary project begins with a single spark
                  of imagination&rdquo;
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Services
