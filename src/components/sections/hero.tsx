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
    // Trigger entrance animations

    // Simplified, performance-optimized counters
    const animateCounters = () => {
      const duration = 1000 // Faster animation
      const steps = 30 // Fewer steps for better performance
      const stepTime = duration / steps

      let currentStep = 0

      const timer = setInterval(() => {
        currentStep++
        // Simple linear easing for better performance
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

    // Start immediately for faster perceived performance
    const timeout = setTimeout(animateCounters, 100)
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

  return (
    <>
      <div className='relative z-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-2'>
        {/* Left Content */}
        <div className={`space-y-6 transition-opacity duration-500`}>
          <div className='space-y-4'>
            {/* Simplified Greeting */}
            <div className='relative'>
              <p className='text-space-gold flex items-center gap-2 text-lg font-medium'>
                <span>✨</span>
                <span className='text-space-gold'>
                  Welcome to my humble cosmos
                </span>
                <span>💫</span>
              </p>
            </div>

            {/* Simplified Name Display */}
            <div className='relative'>
              <h1 className='text-4xl leading-tight font-bold text-white md:text-6xl lg:text-7xl'>
                I&apos;m{' '}
                <span className='text-space-gold'>{personalInfo.name}</span>
              </h1>
            </div>

            {/* Title */}
            <h2 className='text-xl font-medium text-gray-300 md:text-2xl lg:text-3xl'>
              {personalInfo.title}
            </h2>
          </div>

          {/* Simplified Bio */}
          <div className='relative'>
            <p className='max-w-2xl rounded-lg bg-white/5 p-4 text-lg leading-relaxed'>
              {personalInfo.bio}
            </p>
          </div>

          {/* Simplified Contact Info */}
          <div className='flex flex-col gap-4 sm:flex-row'>
            <div className='flex items-center space-x-3 rounded-full bg-white/5 px-4 py-2 transition-colors hover:bg-white/10'>
              <div className='bg-space-gold/20 rounded-full p-1'>
                <Mail className='text-space-gold h-4 w-4' />
              </div>
              <a
                href={`mailto:${personalInfo.email}`}
                className='hover:text-space-gold text-sm font-medium transition-colors'
              >
                {personalInfo.email}
              </a>
            </div>
            <div className='flex items-center space-x-3 rounded-full bg-white/5 px-4 py-2 transition-colors hover:bg-white/10'>
              <div className='bg-space-accent/20 rounded-full p-1'>
                <MapPin className='text-space-accent h-4 w-4' />
              </div>
              <span className='text-sm font-medium'>
                {personalInfo.location}
              </span>
            </div>
          </div>

          {/* Simplified CTA Buttons */}
          <div className='flex flex-col gap-4 pt-4 sm:flex-row'>
            <Button
              variant='cosmic'
              size='lg'
              onClick={handleScrollToProjects}
              className='group'
            >
              <span>View My Work</span>
              <ArrowDown className='ml-2 h-5 w-5 transition-transform group-hover:translate-y-1' />
            </Button>

            <Button
              variant='stellar'
              size='lg'
              onClick={handleScrollToContact}
              className='group'
            >
              <Mail className='mr-2 h-5 w-5 transition-transform group-hover:scale-110' />
              <span>Get In Touch</span>
            </Button>
          </div>
        </div>

        {/* Right Content - Enhanced Stats & Visual */}
        <div
          className={`mt-16 space-y-8 transition-all delay-300 duration-1000 lg:mt-0`}
        >
          {/* Enhanced Main Visual Element */}
          <div className='group relative'>
            <SpaceOrbital />

            {/* Enhanced floating elements with improved animations */}
            <div className='animate-float absolute top-8 right-8 z-30 transition-transform duration-300 group-hover:scale-110'>
              <div className='from-space-accent flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br to-purple-600 text-2xl shadow-xl shadow-purple-500/40'>
                <span className='animate-pulse'>⭐</span>
              </div>
            </div>
            <div
              className='animate-float absolute bottom-8 left-8 z-30 transition-transform duration-300 group-hover:scale-110'
              style={{ animationDelay: '1s' }}
            >
              <div className='from-space-gold flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br to-yellow-500 text-xl shadow-xl shadow-yellow-500/40'>
                <span className='animate-pulse'>🌟</span>
              </div>
            </div>
            <div
              className='animate-float absolute top-1/2 right-0 z-30 transition-transform duration-300 group-hover:scale-110'
              style={{ animationDelay: '2s' }}
            >
              <div className='flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 text-lg shadow-xl shadow-blue-500/40'>
                <span className='animate-pulse'>✨</span>
              </div>
            </div>

            {/* Additional cosmic elements */}
            <div
              className='animate-float absolute top-1/4 left-4 z-30'
              style={{ animationDelay: '0.5s' }}
            >
              <div className='flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-rose-400 shadow-lg shadow-pink-500/30'>
                <span className='animate-spin-slow text-xs'>💫</span>
              </div>
            </div>
            <div
              className='animate-float absolute right-12 bottom-1/4 z-30'
              style={{ animationDelay: '1.5s' }}
            >
              <div className='flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 shadow-lg shadow-indigo-500/30'>
                <span className='animate-pulse text-sm'>🚀</span>
              </div>
            </div>
          </div>

          {/* Enhanced Stats Grid */}
          <div className='grid grid-cols-3 gap-4'>
            <div className='group glass-nebula hover:shadow-space-gold/20 rounded-xl p-5 text-center transition-all duration-500 hover:scale-105 hover:shadow-2xl'>
              <div className='relative'>
                <div className='text-space-gold from-space-gold bg-gradient-to-br to-yellow-300 bg-clip-text text-3xl font-bold text-transparent md:text-4xl'>
                  {counts.skills}+
                </div>
                <div className='bg-space-gold/10 absolute inset-0 rounded-lg opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100'></div>
              </div>
              <p className='mt-2 text-sm font-medium text-gray-300 transition-colors group-hover:text-white'>
                Skills Mastered
              </p>
              <div className='via-space-gold mt-2 h-1 w-full rounded-full bg-gradient-to-r from-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100'></div>
            </div>

            <div className='group glass-nebula hover:shadow-space-accent/20 rounded-xl p-5 text-center transition-all duration-500 hover:scale-105 hover:shadow-2xl'>
              <div className='relative'>
                <div className='text-space-accent from-space-accent bg-gradient-to-br to-purple-300 bg-clip-text text-3xl font-bold text-transparent md:text-4xl'>
                  {counts.professionalProjects}+
                </div>
                <div className='bg-space-accent/10 absolute inset-0 rounded-lg opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100'></div>
              </div>
              <p className='mt-2 text-sm font-medium text-gray-300 transition-colors group-hover:text-white'>
                Pro Projects
              </p>
              <div className='via-space-accent mt-2 h-1 w-full rounded-full bg-gradient-to-r from-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100'></div>
            </div>

            <div className='group glass-nebula rounded-xl p-5 text-center transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20'>
              <div className='relative'>
                <div className='bg-gradient-to-br from-blue-400 to-cyan-300 bg-clip-text text-3xl font-bold text-transparent md:text-4xl'>
                  {counts.personalProjects}+
                </div>
                <div className='absolute inset-0 rounded-lg bg-blue-500/10 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100'></div>
              </div>
              <p className='mt-2 text-sm font-medium text-gray-300 transition-colors group-hover:text-white'>
                Personal Projects
              </p>
              <div className='mt-2 h-1 w-full rounded-full bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100'></div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Hero
