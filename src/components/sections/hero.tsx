'use client'

import { Button } from '@/components/ui/button'
import { heroStats, personalInfo } from '@/lib/data'
import { ArrowDown, Mail, MapPin } from 'lucide-react'
import { useEffect, useState } from 'react'

const Hero = () => {
  const [mounted, setMounted] = useState(false)
  const [counts, setCounts] = useState({
    skills: 0,
    professionalProjects: 0,
    personalProjects: 0,
  })

  useEffect(() => {
    setMounted(true)

    // Animated counters
    const animateCounters = () => {
      const duration = 2000 // 2 seconds
      const steps = 60
      const stepTime = duration / steps

      let currentStep = 0

      const timer = setInterval(() => {
        currentStep++
        const progress = currentStep / steps

        setCounts({
          skills: Math.floor(heroStats.verified_skills * progress),
          professionalProjects: Math.floor(
            heroStats.professional_projects * progress
          ),
          personalProjects: Math.floor(heroStats.personal_projects * progress),
        })

        if (currentStep >= steps) {
          setCounts({
            skills: heroStats.verified_skills,
            professionalProjects: heroStats.professional_projects,
            personalProjects: heroStats.personal_projects,
          })
          clearInterval(timer)
        }
      }, stepTime)
    }

    const timeout = setTimeout(animateCounters, 500)
    return () => {
      clearTimeout(timeout)
    }
  }, [])

  const scrollToProjects = () => {
    const element = document.querySelector('#projects')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToContact = () => {
    const element = document.querySelector('#contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  if (!mounted) return null

  return (
    <section
      id='home'
      className='flex min-h-screen items-center justify-center pt-20'
    >
      <div className='container mx-auto px-6'>
        <div className='grid grid-cols-1 items-center gap-12 lg:grid-cols-2'>
          {/* Left Content */}
          <div className='space-y-6'>
            <div className='space-y-4'>
              <p className='text-space-gold text-lg font-medium'>
                👋 Greetings from the digital cosmos
              </p>

              <h1 className='text-4xl leading-tight font-bold text-white md:text-6xl lg:text-7xl'>
                I&apos;m{' '}
                <span className='bg-gradient-stellar animate-pulse-cosmic bg-clip-text text-transparent'>
                  {personalInfo.name}
                </span>
              </h1>

              <h2 className='text-xl font-medium text-gray-300 md:text-2xl lg:text-3xl'>
                {personalInfo.title}
              </h2>
            </div>

            <p className='max-w-2xl text-lg leading-relaxed text-gray-400'>
              {personalInfo.bio}
            </p>

            {/* Contact Info */}
            <div className='flex flex-col gap-4 text-gray-400 sm:flex-row'>
              <div className='flex items-center space-x-2'>
                <Mail className='text-space-gold h-5 w-5' />
                <a
                  href={`mailto:${personalInfo.email}`}
                  className='hover:text-space-gold transition-colors duration-300'
                >
                  {personalInfo.email}
                </a>
              </div>
              <div className='flex items-center space-x-2'>
                <MapPin className='text-space-gold h-5 w-5' />
                <span>{personalInfo.location}</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className='flex flex-col gap-4 pt-4 sm:flex-row'>
              <Button
                variant='cosmic'
                size='lg'
                onClick={scrollToProjects}
                className='group'
              >
                Explore My Universe
                <ArrowDown className='ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-y-1' />
              </Button>

              <Button
                variant='outline'
                size='lg'
                onClick={scrollToContact}
                className='border-space-gold text-space-gold hover:bg-space-gold hover:text-space-deep'
              >
                <Mail className='mr-2 h-5 w-5' />
                Launch Mission
              </Button>
            </div>
          </div>

          {/* Right Content - Stats */}
          <div className='space-y-8'>
            {/* Main Visual Element */}
            <div className='relative'>
              <div className='bg-gradient-cosmic animate-pulse-cosmic glass-cosmic mx-auto flex h-64 w-64 items-center justify-center rounded-full'>
                <div className='text-center'>
                  <div className='mb-2 text-6xl'>🚀</div>
                  <p className='font-semibold text-white'>Ready for Launch</p>
                </div>
              </div>

              {/* Floating elements around the main circle */}
              <div className='animate-float absolute top-10 right-10'>
                <div className='bg-space-accent flex h-12 w-12 items-center justify-center rounded-full text-2xl'>
                  ⭐
                </div>
              </div>
              <div
                className='animate-float absolute bottom-10 left-10'
                style={{ animationDelay: '1s' }}
              >
                <div className='bg-space-gold flex h-10 w-10 items-center justify-center rounded-full text-xl'>
                  🌟
                </div>
              </div>
              <div
                className='animate-float absolute top-1/2 right-0'
                style={{ animationDelay: '2s' }}
              >
                <div className='flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-lg'>
                  ✨
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className='grid grid-cols-3 gap-4'>
              <div className='glass-nebula rounded-lg p-4 text-center transition-transform duration-300 hover:scale-105'>
                <div className='text-space-gold text-2xl font-bold md:text-3xl'>
                  {counts.skills}+
                </div>
                <p className='mt-1 text-sm text-gray-400'>Skills Mastered</p>
              </div>

              <div className='glass-nebula rounded-lg p-4 text-center transition-transform duration-300 hover:scale-105'>
                <div className='text-space-gold text-2xl font-bold md:text-3xl'>
                  {counts.professionalProjects}+
                </div>
                <p className='mt-1 text-sm text-gray-400'>Pro Projects</p>
              </div>

              <div className='glass-nebula rounded-lg p-4 text-center transition-transform duration-300 hover:scale-105'>
                <div className='text-space-gold text-2xl font-bold md:text-3xl'>
                  {counts.personalProjects}+
                </div>
                <p className='mt-1 text-sm text-gray-400'>Personal Projects</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className='absolute bottom-8 left-1/2 -translate-x-1/2 transform animate-bounce'>
          <div className='flex flex-col items-center space-y-2 text-gray-400'>
            <span className='text-sm'>Scroll to explore</span>
            <ArrowDown className='h-5 w-5' />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
