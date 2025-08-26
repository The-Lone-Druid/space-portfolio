'use client'

import { Badge } from '@/components/ui/badge'
import { Code, Mail, Rocket, Star, Zap } from 'lucide-react'
import { Hero } from '../../types'
import { AchievementCard } from '../cards/achievement-card'
import { HighlightCard } from '../cards/highlight-card'
import { SectionHeader } from '../shared/section-header'
import { StoryCard } from '../cards/story-card'

interface AboutProps {
  heroStats: Hero
}

const About = ({ heroStats }: AboutProps) => {
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
    {
      label: 'Years of Experience',
      value: `${heroStats.yearsOfExperience}+`,
      icon: '🚀',
      isNumeric: true,
    },
    {
      label: 'Technologies Mastered',
      value: `${heroStats.verifiedSkills}`,
      icon: '⚡',
      isNumeric: true,
    },
    {
      label: 'Projects Completed',
      value: `${heroStats.professionalProjects + heroStats.personalProjects}`,
      icon: '🌟',
      isNumeric: true,
    },
    { label: 'Coffee Consumed', value: '∞', icon: '☕', isNumeric: false },
  ]

  return (
    <>
      <SectionHeader
        title='About My'
        highlight='Journey'
        subtitle='Discover the story behind the cosmic code explorer who transforms ideas into digital realities'
      />

      <div className='mb-16 grid grid-cols-1 gap-12 lg:grid-cols-2'>
        {/* Left - Personal Story */}
        <div className='space-y-6'>
          <StoryCard
            title='My Cosmic Journey'
            titleIcon={Rocket}
            ctaText='Get In Touch'
            ctaIcon={Mail}
            ctaSection='#contact'
          >
            <p>
              My adventure in the digital cosmos began with a simple curiosity
              about how websites work. What started as tinkering with HTML and
              CSS evolved into a passionate journey through the vast universe of
              web development.
            </p>
            <p>
              Over the years, I&apos;ve navigated through different
              technological galaxies - from mastering React and Next.js to
              exploring the backend nebulae with Node.js and databases. Each
              project has been a new mission, teaching me valuable lessons about
              problem-solving and innovation.
            </p>
            <p>
              Today, I specialize in creating full-stack applications that not
              only look stellar but also perform at light speed. My mission is
              to help businesses launch their digital presence into orbit and
              reach new heights of success.
            </p>
          </StoryCard>
        </div>

        {/* Right - Highlights */}
        <div className='space-y-6'>
          <h3 className='mb-6 text-2xl font-bold text-white'>
            What Makes Me <span className='text-space-gold'>Stellar</span>
          </h3>

          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
            {highlights.map((highlight, index) => (
              <HighlightCard
                key={index}
                icon={highlight.icon}
                title={highlight.title}
                description={highlight.description}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Achievements Section */}
      <div className='glass-cosmic mb-16 rounded-2xl p-8'>
        <h3 className='mb-8 text-center text-2xl font-bold text-white'>
          Mission <span className='text-space-gold'>Statistics</span>
        </h3>

        <div className='grid grid-cols-2 gap-6 md:grid-cols-4'>
          {achievements.map((achievement, index) => (
            <AchievementCard
              key={index}
              label={achievement.label}
              value={achievement.value}
              icon={achievement.icon}
              isNumeric={achievement.isNumeric}
            />
          ))}
        </div>
      </div>

      {/* Tech Philosophy */}
      <div className='text-center'>
        <div className='glass-nebula mx-auto max-w-4xl rounded-2xl p-8'>
          <h3 className='mb-4 text-2xl font-bold text-white'>
            My Development <span className='text-space-gold'>Philosophy</span>
          </h3>
          <p className='text-lg leading-relaxed text-gray-300'>
            &quot;Code is poetry written in logic. Every function is a verse,
            every component is a stanza, and every application is an epic that
            tells the story of solving real-world problems. I believe in writing
            code that is not just functional, but beautiful, maintainable, and
            scalable - code that future developers will appreciate
            exploring.&quot;
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
    </>
  )
}

export default About
