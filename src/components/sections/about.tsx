'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { heroStats } from '@/lib/data'
import { Code, Download, Rocket, Star, Zap } from 'lucide-react'

const About = () => {
  const highlights = [
    {
      icon: Code,
      title: 'Full Stack Expertise',
      description:
        'Proficient in both frontend and backend technologies, creating complete digital ecosystems.',
    },
    {
      icon: Rocket,
      title: 'Performance Focused',
      description:
        'Building lightning-fast applications optimized for stellar user experiences.',
    },
    {
      icon: Star,
      title: 'Modern Technologies',
      description:
        'Always exploring the latest frameworks and tools in the ever-evolving tech universe.',
    },
    {
      icon: Zap,
      title: 'Problem Solver',
      description:
        'Transforming complex challenges into elegant, scalable solutions that deliver results.',
    },
  ]

  const achievements = [
    { label: 'Years of Experience', value: '4+', icon: '🚀' },
    {
      label: 'Technologies Mastered',
      value: `${heroStats.verified_skills}+`,
      icon: '⚡',
    },
    {
      label: 'Projects Completed',
      value: `${heroStats.professional_projects + heroStats.personal_projects}+`,
      icon: '🌟',
    },
    { label: 'Coffee Consumed', value: '∞', icon: '☕' },
  ]

  return (
    <section id='about' className='py-20'>
      <div className='container mx-auto px-6'>
        {/* Section Header */}
        <div className='mb-16 text-center'>
          <h2 className='mb-4 text-4xl font-bold text-white md:text-5xl'>
            About My{' '}
            <span className='bg-gradient-stellar bg-clip-text text-transparent'>
              Journey
            </span>
          </h2>
          <div className='bg-gradient-stellar mx-auto mb-6 h-1 w-24'></div>
          <p className='mx-auto max-w-3xl text-lg text-gray-400'>
            Discover the story behind the cosmic code explorer who transforms
            ideas into digital realities
          </p>
        </div>

        <div className='mb-16 grid grid-cols-1 gap-12 lg:grid-cols-2'>
          {/* Left - Personal Story */}
          <div className='space-y-6'>
            <div className='glass-cosmic rounded-2xl p-8'>
              <h3 className='mb-4 flex items-center text-2xl font-bold text-white'>
                <Rocket className='text-space-gold mr-3 h-8 w-8' />
                My Cosmic Journey
              </h3>
              <div className='space-y-4 leading-relaxed text-gray-300'>
                <p>
                  My adventure in the digital cosmos began with a simple
                  curiosity about how websites work. What started as tinkering
                  with HTML and CSS evolved into a passionate journey through
                  the vast universe of web development.
                </p>
                <p>
                  Over the years, I&apos;ve navigated through different
                  technological galaxies - from mastering React and Next.js to
                  exploring the backend nebulae with Node.js and databases. Each
                  project has been a new mission, teaching me valuable lessons
                  about problem-solving and innovation.
                </p>
                <p>
                  Today, I specialize in creating full-stack applications that
                  not only look stellar but also perform at light speed. My
                  mission is to help businesses launch their digital presence
                  into orbit and reach new heights of success.
                </p>
              </div>

              <div className='mt-6'>
                <Button variant='stellar' className='group'>
                  <Download className='mr-2 h-5 w-5 group-hover:animate-bounce' />
                  Download Resume
                </Button>
              </div>
            </div>
          </div>

          {/* Right - Highlights */}
          <div className='space-y-6'>
            <h3 className='mb-6 text-2xl font-bold text-white'>
              What Makes Me <span className='text-space-gold'>Stellar</span>
            </h3>

            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
              {highlights.map((highlight, index) => {
                const IconComponent = highlight.icon
                return (
                  <Card
                    key={index}
                    className='glass-nebula hover:border-space-gold/50 group border-purple-500/20 transition-all duration-300 hover:scale-105'
                  >
                    <CardContent className='p-6'>
                      <div className='flex items-start space-x-4'>
                        <div className='bg-space-accent group-hover:animate-pulse-cosmic flex h-12 w-12 items-center justify-center rounded-lg'>
                          <IconComponent className='h-6 w-6 text-white' />
                        </div>
                        <div className='flex-1'>
                          <h4 className='mb-2 font-semibold text-white'>
                            {highlight.title}
                          </h4>
                          <p className='text-sm text-gray-400'>
                            {highlight.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>

        {/* Achievements Section */}
        <div className='glass-cosmic rounded-2xl p-8'>
          <h3 className='mb-8 text-center text-2xl font-bold text-white'>
            Mission <span className='text-space-gold'>Statistics</span>
          </h3>

          <div className='grid grid-cols-2 gap-6 md:grid-cols-4'>
            {achievements.map((achievement, index) => (
              <div key={index} className='group text-center'>
                <div className='bg-gradient-nebula group-hover:animate-pulse-cosmic mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full text-3xl transition-all duration-300'>
                  {achievement.icon}
                </div>
                <div className='text-space-gold mb-2 text-3xl font-bold'>
                  {achievement.value}
                </div>
                <p className='text-sm text-gray-400'>{achievement.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Philosophy */}
        <div className='mt-16 text-center'>
          <div className='glass-nebula mx-auto max-w-4xl rounded-2xl p-8'>
            <h3 className='mb-4 text-2xl font-bold text-white'>
              My Development <span className='text-space-gold'>Philosophy</span>
            </h3>
            <p className='text-lg leading-relaxed text-gray-300'>
              &quot;Code is poetry written in logic. Every function is a verse,
              every component is a stanza, and every application is an epic that
              tells the story of solving real-world problems. I believe in
              writing code that is not just functional, but beautiful,
              maintainable, and scalable - code that future developers will
              appreciate exploring.&quot;
            </p>
            <div className='mt-6 flex justify-center'>
              <Badge
                variant='outline'
                className='text-space-gold border-space-gold'
              >
                ✨ Clean Code Advocate
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
