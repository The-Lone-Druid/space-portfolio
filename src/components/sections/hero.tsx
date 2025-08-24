'use client'

import { Button } from '@/components/ui/button'
import { ArrowDown, Mail, MapPin } from 'lucide-react'
import { useEffect, useState } from 'react'
import { scrollToSection } from '../../lib/utils'
import type { Hero as HeroType, PersonalInfo } from '../../types'
import { SpaceOrbital } from '../animations/space-orbital'

interface HeroProps {
  personalInfo: PersonalInfo
  heroStats: HeroType
}

const Hero = ({ personalInfo, heroStats }: HeroProps) => {
  const [counts, setCounts] = useState({
    skills: 0,
    professionalProjects: 0,
    personalProjects: 0,
  })

  useEffect(() => {
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
          skills: Math.floor(heroStats.verifiedSkills * progress),
          professionalProjects: Math.floor(
            heroStats.professionalProjects * progress
          ),
          personalProjects: Math.floor(heroStats.personalProjects * progress),
        })

        if (currentStep >= steps) {
          setCounts({
            skills: heroStats.verifiedSkills,
            professionalProjects: heroStats.professionalProjects,
            personalProjects: heroStats.personalProjects,
          })
          clearInterval(timer)
        }
      }, stepTime)
    }

    const timeout = setTimeout(animateCounters, 500)
    return () => {
      clearTimeout(timeout)
    }
  }, [heroStats])

  const handleScrollToProjects = () => {
    scrollToSection('#projects')
  }

  const handleScrollToContact = () => {
    scrollToSection('#contact')
  }

  const handleScrollToNext = () => {
    scrollToSection('#about')
  }

  return (
    <section
      id='home'
      className='relative flex min-h-screen items-center justify-center pt-20'
    >
      <div className='container mx-auto px-6'>
        <div className='grid grid-cols-1 items-center gap-12 lg:grid-cols-2'>
          {/* Left Content */}
          <div className='space-y-6'>
            <div className='space-y-4'>
              <p className='text-space-gold text-lg font-medium'>
                👋 Hello! Welcome to my portfolio
              </p>

              <h1 className='text-4xl leading-tight font-bold text-white md:text-6xl lg:text-7xl'>
                I&apos;m{' '}
                <span className='text-space-gold'>{personalInfo.name}</span>
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
                onClick={handleScrollToProjects}
                className='group'
              >
                View My Work
                <ArrowDown className='ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-y-1' />
              </Button>

              <Button
                variant='stellar'
                size='lg'
                onClick={handleScrollToContact}
                className='group'
              >
                <Mail className='mr-2 h-5 w-5 transition-transform duration-300 group-hover:scale-110' />
                Get In Touch
              </Button>
            </div>
          </div>

          {/* Right Content - Stats */}
          <div className='mt-16 space-y-8 lg:mt-0'>
            {/* Main Visual Element */}
            <div className='relative'>
              <SpaceOrbital />

              {/* Floating elements around the main circle */}
              <div className='animate-float absolute top-10 right-10 z-30'>
                <div className='bg-space-accent flex h-12 w-12 items-center justify-center rounded-full text-2xl shadow-lg shadow-purple-500/30'>
                  ⭐
                </div>
              </div>
              <div
                className='animate-float absolute bottom-10 left-10 z-30'
                style={{ animationDelay: '1s' }}
              >
                <div className='bg-space-gold flex h-10 w-10 items-center justify-center rounded-full text-xl shadow-lg shadow-yellow-500/30'>
                  🌟
                </div>
              </div>
              <div
                className='animate-float absolute top-1/2 right-0 z-30'
                style={{ animationDelay: '2s' }}
              >
                <div className='flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-lg shadow-lg shadow-blue-500/30'>
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
        <div className='mt-12 flex items-center justify-center lg:mt-0'>
          <div className='transform animate-bounce lg:absolute lg:bottom-8'>
            <button
              onClick={handleScrollToNext}
              className='hover:text-space-gold group flex cursor-pointer flex-col items-center space-y-2 text-gray-400 transition-all duration-300 hover:scale-110'
              aria-label='Scroll to next section'
            >
              <span className='group-hover:text-space-gold text-sm transition-colors duration-300'>
                Scroll to explore
              </span>
              <ArrowDown className='h-5 w-5 transition-transform duration-300 group-hover:translate-y-1' />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
