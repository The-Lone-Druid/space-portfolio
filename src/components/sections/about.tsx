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
      {/* Section Header */}
      <div className='mb-12 sm:mb-16'>
        <SectionHeader
          title='About My'
          highlight='Journey'
          subtitle='Discover the story behind the cosmic code explorer who transforms ideas into digital realities'
        />
      </div>

      <div
        className={`mb-12 grid transform grid-cols-1 gap-8 transition-all duration-1000 lg:mb-16 lg:grid-cols-2 lg:gap-12 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
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

          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6'>
            {highlights.map((highlight, index) => (
              <div
                key={index}
                className={`group glass-cosmic relative transform rounded-xl p-4 transition-all duration-500 hover:scale-105 hover:${highlight.shadowColor} hover:shadow-2xl sm:p-6 ${
                  hoveredCard === index ? 'scale-105' : ''
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
        className={`transform space-y-8 transition-all delay-300 duration-1000 sm:space-y-12 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
      >
        {/* Mission Statistics - Enhanced Responsive Design */}
        <div className='relative'>
          <h3 className='mb-6 flex items-center justify-center gap-3 text-center text-xl font-bold text-white sm:mb-8 sm:text-2xl'>
            <div className='from-space-accent flex h-7 w-7 animate-pulse items-center justify-center rounded-full bg-gradient-to-br to-purple-400 sm:h-8 sm:w-8'>
              <Orbit className='h-3.5 w-3.5 text-white sm:h-4 sm:w-4' />
            </div>
            Mission <span className='text-space-gold'>Statistics</span>
          </h3>

          <div className='mb-10 grid grid-cols-2 gap-3 sm:mb-12 sm:gap-4 md:grid-cols-4'>
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className='group relative transform transition-all duration-500 hover:scale-105'
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className='glass-cosmic rounded-lg p-3 text-center transition-all duration-300 sm:rounded-xl sm:p-4'>
                  <div className='mb-2 text-xl sm:text-2xl'>
                    {achievement.icon}
                  </div>
                  <div className='text-space-gold mb-1 text-lg font-bold sm:text-xl'>
                    {achievement.value}
                  </div>
                  <div className='text-xs font-medium text-gray-400 sm:text-sm'>
                    {achievement.label}
                  </div>
                </div>
                {/* Hover glow effect */}
                <div className='from-space-gold/20 to-space-accent/20 absolute inset-0 -z-10 rounded-lg bg-gradient-to-br opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100 sm:rounded-xl'></div>
              </div>
            ))}
          </div>
        </div>

        {/* Philosophy Section - Enhanced Visual Design */}
        <div className='relative'>
          <div className='glass-cosmic group relative overflow-hidden rounded-3xl transition-all duration-500'>
            {/* Enhanced Background Effects */}
            <div className='absolute inset-0 opacity-10 transition-opacity duration-700'>
              <div className='from-space-gold/10 to-space-accent/10 absolute inset-0 bg-gradient-to-br via-transparent'></div>
              <div className='bg-gradient-radial from-space-gold/20 absolute top-0 right-0 h-40 w-40 rounded-full to-transparent opacity-60'></div>
              <div className='bg-gradient-radial from-space-accent/20 absolute bottom-0 left-0 h-32 w-32 rounded-full to-transparent opacity-40'></div>
              <div className='bg-gradient-radial absolute top-1/2 left-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full from-purple-500/10 to-transparent opacity-50'></div>
            </div>

            {/* Decorative Header Bar */}
            <div className='via-space-gold h-1 w-full bg-gradient-to-r from-transparent to-transparent'></div>

            <div className='relative z-10 px-6 py-10 sm:px-8 sm:py-12 md:px-12 md:py-16'>
              {/* Enhanced Header */}
              <div className='mb-10 text-center sm:mb-12'>
                <div className='mb-6 flex items-center justify-center gap-4'>
                  <div className='relative'>
                    <div className='from-space-gold group-hover:shadow-space-gold/30 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br to-amber-500 shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl sm:h-20 sm:w-20'>
                      <Code className='h-8 w-8 text-white sm:h-10 sm:w-10' />
                    </div>
                    <div className='from-space-accent absolute -top-1 -right-1 h-6 w-6 animate-pulse rounded-full bg-gradient-to-br to-purple-500 opacity-80 sm:h-8 sm:w-8'>
                      <Sparkles className='m-1 h-4 w-4 text-white sm:m-1.5 sm:h-5 sm:w-5' />
                    </div>
                  </div>
                </div>

                <h3 className='via-space-gold mb-4 bg-gradient-to-r from-white to-white bg-clip-text text-2xl font-bold text-transparent transition-all duration-300 sm:text-3xl md:text-4xl'>
                  My Development Philosophy
                </h3>

                <div className='from-space-gold via-space-accent mx-auto h-1 w-32 rounded-full bg-gradient-to-r to-purple-500 sm:w-40'></div>
              </div>

              {/* Enhanced Quote Layout */}
              <div className='group/point relative mb-10 overflow-hidden rounded-xl bg-white/5 p-4 text-center transition-all duration-300 hover:scale-105 hover:bg-white/10 hover:shadow-lg hover:shadow-white/10'>
                <div className='mx-auto max-w-4xl'>
                  {/* Mobile Quote Marks */}
                  <div className='mb-6 flex justify-center md:hidden'>
                    <div className='from-space-gold/20 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br to-transparent'>
                      <div className='text-space-gold/60 font-serif text-2xl'>
                        &ldquo;
                      </div>
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className='hidden items-center gap-8 md:grid md:grid-cols-7'>
                    {/* Left Quote Mark */}
                    <div className='flex justify-center'>
                      <div className='group/quote relative'>
                        <div className='from-space-gold/20 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br to-transparent transition-all duration-300 group-hover/quote:scale-110'>
                          <div className='text-space-gold/60 group-hover:text-space-gold/80 font-serif text-4xl transition-colors duration-300'>
                            &ldquo;
                          </div>
                        </div>
                        <div className='from-space-gold/10 absolute inset-0 rounded-full bg-gradient-to-br to-transparent opacity-0 blur-lg transition-opacity duration-300 group-hover/quote:opacity-100'></div>
                      </div>
                    </div>

                    {/* Main Quote Content */}
                    <div className='col-span-5 px-4'>
                      <blockquote className='text-center text-lg leading-relaxed text-gray-300 italic transition-colors duration-500 group-hover:text-white sm:text-xl md:text-2xl'>
                        Code is poetry written in logic. Every function is a
                        verse, every component is a stanza, and every
                        application is an epic that tells the story of solving
                        real-world problems.
                      </blockquote>
                    </div>

                    {/* Right Quote Mark */}
                    <div className='flex justify-center'>
                      <div className='group/quote relative'>
                        <div className='from-space-accent/20 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br to-transparent transition-all duration-300 group-hover/quote:scale-110'>
                          <div className='text-space-accent/60 group-hover:text-space-accent/80 rotate-180 font-serif text-4xl transition-colors duration-300'>
                            &rdquo;
                          </div>
                        </div>
                        <div className='from-space-accent/10 absolute inset-0 rounded-full bg-gradient-to-br to-transparent opacity-0 blur-lg transition-opacity duration-300 group-hover/quote:opacity-100'></div>
                      </div>
                    </div>
                  </div>

                  {/* Mobile Quote Content */}
                  <div className='px-4 text-center md:hidden'>
                    <blockquote className='text-base leading-relaxed text-gray-300 italic transition-colors duration-500 group-hover:text-white sm:text-lg'>
                      Code is poetry written in logic. Every function is a
                      verse, every component is a stanza, and every application
                      is an epic that tells the story of solving real-world
                      problems.
                    </blockquote>
                  </div>

                  {/* Mobile Closing Quote */}
                  <div className='mt-6 flex justify-center md:hidden'>
                    <div className='from-space-accent/20 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br to-transparent'>
                      <div className='text-space-accent/60 rotate-180 font-serif text-2xl'>
                        &rdquo;
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Badge Section */}
              <div className='flex justify-center'>
                <div className='group/badge relative'>
                  {/* Outer glow effect */}
                  <div className='from-space-gold/20 via-space-accent/20 absolute -inset-4 rounded-2xl bg-gradient-to-r to-purple-500/20 opacity-0 blur-xl transition-opacity duration-500 group-hover/badge:opacity-100'></div>

                  <Badge
                    variant='outline'
                    className='bg-space-gold/5 text-space-gold hover:bg-space-gold hover:shadow-space-gold/25 relative px-6 py-3 text-base font-semibold backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:text-white hover:shadow-xl sm:px-8 sm:py-4 sm:text-lg'
                  >
                    <Sparkles className='mr-3 h-5 w-5 animate-pulse' />
                    Clean Code Advocate
                    <div className='ml-2 h-2 w-2 animate-ping rounded-full bg-current opacity-75'></div>
                  </Badge>
                </div>
              </div>

              {/* Additional Philosophy Points */}
              <div className='mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
                {[
                  {
                    icon: '🎯',
                    title: 'Purpose-Driven',
                    desc: 'Every line of code serves a purpose',
                  },
                  {
                    icon: '🔧',
                    title: 'Clean & Maintainable',
                    desc: 'Building for the future, not just today',
                  },
                  {
                    icon: '🚀',
                    title: 'Performance First',
                    desc: 'Optimized for speed and efficiency',
                  },
                ].map((point, index) => (
                  <div
                    key={index}
                    className='group/point relative overflow-hidden rounded-xl bg-white/5 p-4 text-center transition-all duration-300 hover:scale-105 hover:bg-white/10 hover:shadow-lg hover:shadow-white/10'
                  >
                    <div className='mb-3 text-2xl'>{point.icon}</div>
                    <h4 className='mb-2 text-sm font-semibold text-white'>
                      {point.title}
                    </h4>
                    <p className='text-xs text-gray-400'>{point.desc}</p>
                    <div className='from-space-gold to-space-accent absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r transition-all duration-300 group-hover/point:w-full'></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default About
