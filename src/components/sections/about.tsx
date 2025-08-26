'use client'

import { Badge } from '@/components/ui/badge'
import { Code, Mail, Rocket, Star, Zap, Orbit, Sparkles } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Hero } from '../../types'
import { SectionHeader } from '../shared/section-header'
import { StoryCard } from '../cards/story-card'

interface AboutProps {
  heroStats: Hero
}

const About = ({ heroStats }: AboutProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const highlights = [
    {
      icon: Code,
      title: 'Full Stack Expertise',
      description:
        'Proficient in both frontend and backend technologies, creating complete digital ecosystems.',
      gradient: 'from-blue-500 to-cyan-400',
      shadowColor: 'shadow-blue-500/20',
    },
    {
      icon: Rocket,
      title: 'Performance Focused',
      description:
        'Building lightning-fast applications optimized for stellar user experiences.',
      gradient: 'from-orange-500 to-red-400',
      shadowColor: 'shadow-orange-500/20',
    },
    {
      icon: Star,
      title: 'Modern Technologies',
      description:
        'Always exploring the latest frameworks and tools in the ever-evolving tech universe.',
      gradient: 'from-yellow-500 to-orange-400',
      shadowColor: 'shadow-yellow-500/20',
    },
    {
      icon: Zap,
      title: 'Problem Solver',
      description:
        'Transforming complex challenges into elegant, scalable solutions that deliver results.',
      gradient: 'from-purple-500 to-pink-400',
      shadowColor: 'shadow-purple-500/20',
    },
  ]

  const achievements = [
    {
      label: 'Years of Experience',
      value: `${heroStats.yearsOfExperience}+`,
      icon: '🚀',
      isNumeric: true,
    },
    {
      label: 'Technologies Mastered',
      value: `${heroStats.verifiedSkills}+`,
      icon: '⚡',
      isNumeric: true,
    },
    {
      label: 'Projects Completed',
      value: `${heroStats.professionalProjects + heroStats.personalProjects}+`,
      icon: '🌟',
      isNumeric: true,
    },
    { label: 'Coffee Consumed', value: '∞', icon: '☕', isNumeric: false },
  ]

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
        title='About My'
        highlight='Journey'
        subtitle='Discover the story behind the cosmic code explorer who transforms ideas into digital realities'
      />

      <div
        className={`mb-16 grid transform grid-cols-1 gap-12 transition-all duration-1000 lg:grid-cols-2 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
      >
        {/* Left - Enhanced Personal Story */}
        <div className='space-y-6'>
          <div className='relative'>
            {/* Cosmic accent elements */}
            <div className='from-space-gold/20 absolute -top-4 -left-4 h-8 w-8 rounded-full bg-gradient-to-br to-transparent blur-sm'></div>
            <div className='from-space-accent/20 absolute -right-4 -bottom-4 h-6 w-6 rounded-full bg-gradient-to-br to-transparent blur-sm'></div>

            <StoryCard
              title='My Cosmic Journey'
              titleIcon={Rocket}
              ctaText='Get In Touch'
              ctaIcon={Mail}
              ctaSection='#contact'
            >
              <div className='space-y-4'>
                <p className='leading-relaxed text-gray-300'>
                  My adventure in the digital cosmos began with a simple
                  curiosity about how websites work. What started as tinkering
                  with HTML and CSS evolved into a passionate journey through
                  the vast universe of web development.
                </p>
                <p className='leading-relaxed text-gray-300'>
                  Over the years, I&apos;ve navigated through different
                  technological galaxies - from mastering React and Next.js to
                  exploring the backend nebulae with Node.js and databases. Each
                  project has been a new mission, teaching me valuable lessons
                  about problem-solving and innovation.
                </p>
                <p className='leading-relaxed text-gray-300'>
                  Today, I specialize in creating full-stack applications that
                  not only look stellar but also perform at light speed. My
                  mission is to help businesses launch their digital presence
                  into orbit and reach new heights of success.
                </p>
              </div>
            </StoryCard>
          </div>
        </div>

        {/* Right - Enhanced Highlights */}
        <div className='space-y-6'>
          <div className='relative'>
            <h3 className='mb-6 flex items-center gap-3 text-2xl font-bold text-white'>
              <div className='from-space-gold flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br to-yellow-400'>
                <Sparkles className='h-4 w-4 text-white' />
              </div>
              What Makes Me <span className='text-space-gold'>Stellar</span>
            </h3>
            <div className='from-space-gold absolute -top-2 left-8 h-1 w-20 rounded-full bg-gradient-to-r to-transparent'></div>
          </div>

          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
            {highlights.map((highlight, index) => (
              <div
                key={index}
                className={`group glass-cosmic relative transform rounded-xl border p-6 transition-all duration-500 hover:scale-105 hover:${highlight.shadowColor} hover:shadow-2xl ${
                  hoveredCard === index
                    ? 'scale-105 border-white/30'
                    : 'border-white/10 hover:border-white/20'
                }`}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Background glow effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${highlight.gradient} rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-10`}
                ></div>

                {/* Icon with enhanced styling */}
                <div
                  className={`relative mb-4 h-12 w-12 rounded-lg bg-gradient-to-br ${highlight.gradient} flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl`}
                >
                  <highlight.icon className='h-6 w-6 text-white' />
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${highlight.gradient} rounded-lg opacity-50 blur-md transition-all duration-300 group-hover:blur-lg`}
                  ></div>
                </div>

                {/* Content */}
                <h4 className='group-hover:text-space-gold mb-2 text-lg font-semibold text-white transition-colors duration-300'>
                  {highlight.title}
                </h4>
                <p className='text-sm leading-relaxed text-gray-400 transition-colors duration-300 group-hover:text-gray-300'>
                  {highlight.description}
                </p>

                {/* Hover effect line */}
                <div
                  className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${highlight.gradient} w-0 rounded-b-xl transition-all duration-500 group-hover:w-full`}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Redesigned Statistics & Philosophy Section */}
      <div
        className={`transform space-y-8 transition-all delay-300 duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
      >
        {/* Mission Statistics - Redesigned as compact cards */}
        <div className='relative'>
          <h3 className='mb-8 flex items-center justify-center gap-3 text-center text-2xl font-bold text-white'>
            <div className='from-space-accent flex h-8 w-8 animate-pulse items-center justify-center rounded-full bg-gradient-to-br to-purple-400'>
              <Orbit className='h-4 w-4 text-white' />
            </div>
            Mission <span className='text-space-gold'>Statistics</span>
          </h3>

          <div className='mb-12 grid grid-cols-2 gap-4 md:grid-cols-4'>
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className='group relative transform transition-all duration-500 hover:scale-105'
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className='glass-cosmic rounded-xl border border-white/10 p-4 text-center transition-all duration-300 hover:border-white/20'>
                  <div className='mb-2 text-2xl'>{achievement.icon}</div>
                  <div className='text-space-gold mb-1 text-xl font-bold'>
                    {achievement.value}
                  </div>
                  <div className='text-xs font-medium text-gray-400'>
                    {achievement.label}
                  </div>
                </div>
                {/* Hover glow effect */}
                <div className='from-space-gold/20 to-space-accent/20 absolute inset-0 -z-10 rounded-xl bg-gradient-to-br opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100'></div>
              </div>
            ))}
          </div>
        </div>

        {/* Philosophy Section - Redesigned as an elegant card */}
        <div className='relative mx-auto max-w-5xl'>
          <div className='glass-nebula group relative overflow-hidden rounded-2xl border border-white/10 p-8 transition-all duration-500 hover:border-white/20'>
            {/* Animated background elements */}
            <div className='absolute inset-0 opacity-5 transition-opacity duration-500 group-hover:opacity-10'>
              <div className='bg-gradient-radial from-space-gold/30 absolute top-0 right-0 h-32 w-32 rounded-full to-transparent'></div>
              <div className='bg-gradient-radial from-space-accent/30 absolute bottom-0 left-0 h-24 w-24 rounded-full to-transparent'></div>
            </div>

            <div className='relative z-10'>
              {/* Header with icon */}
              <div className='mb-6 flex items-center justify-center gap-3'>
                <div className='from-space-gold flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br to-yellow-400 transition-transform duration-300 group-hover:scale-110'>
                  <Code className='h-5 w-5 text-white' />
                </div>
                <h3 className='text-2xl font-bold text-white'>
                  My Development{' '}
                  <span className='text-space-gold'>Philosophy</span>
                </h3>
              </div>

              {/* Quote content */}
              <div className='relative'>
                <div className='grid items-center gap-6 md:grid-cols-3'>
                  {/* Left decoration */}
                  <div className='hidden justify-center md:flex'>
                    <div className='from-space-gold/20 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br to-transparent'>
                      <div className='text-space-gold/60 font-serif text-3xl'>
                        &ldquo;
                      </div>
                    </div>
                  </div>

                  {/* Main quote */}
                  <div className='text-center'>
                    <p className='text-lg leading-relaxed text-gray-300 italic transition-colors duration-500 group-hover:text-white'>
                      Code is poetry written in logic. Every function is a
                      verse, every component is a stanza, and every application
                      is an epic that tells the story of solving real-world
                      problems.
                    </p>
                  </div>

                  {/* Right decoration */}
                  <div className='hidden justify-center md:flex'>
                    <div className='from-space-accent/20 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br to-transparent'>
                      <div className='text-space-accent/60 rotate-180 font-serif text-3xl'>
                        &rdquo;
                      </div>
                    </div>
                  </div>
                </div>

                {/* Badge */}
                <div className='mt-8 flex justify-center'>
                  <div className='group/badge relative'>
                    <Badge
                      variant='outline'
                      className='text-space-gold border-space-gold hover:bg-space-gold px-6 py-3 text-base font-medium transition-all duration-300 hover:text-white'
                    >
                      <Sparkles className='mr-2 h-4 w-4' />
                      Clean Code Advocate
                    </Badge>
                    <div className='bg-space-gold/20 absolute inset-0 -z-10 rounded-full opacity-0 blur-md transition-opacity duration-300 group-hover/badge:opacity-100'></div>
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

export default About
