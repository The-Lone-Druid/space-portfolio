'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { skills } from '@/lib/data'
import { useState } from 'react'

const Skills = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Get unique categories
  const categories = [
    'all',
    ...Array.from(new Set(skills.map(skill => skill.category))),
  ]

  // Filter skills based on selected category
  const filteredSkills =
    selectedCategory === 'all'
      ? skills
      : skills.filter(skill => skill.category === selectedCategory)

  // Group skills by category for display
  const skillsByCategory = filteredSkills.reduce(
    (acc, skill) => {
      const category = skill.category || 'Other'
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(skill)
      return acc
    },
    {} as Record<string, typeof skills>
  )

  return (
    <section id='skills' className='py-20'>
      <div className='container mx-auto px-6'>
        {/* Section Header */}
        <div className='mb-16 text-center'>
          <h2 className='mb-4 text-4xl font-bold text-white md:text-5xl'>
            My{' '}
            <span className='bg-gradient-stellar bg-clip-text text-transparent'>
              Skill Constellation
            </span>
          </h2>
          <div className='bg-gradient-stellar mx-auto mb-6 h-1 w-24'></div>
          <p className='mx-auto max-w-3xl text-lg text-gray-400'>
            Explore the technologies and tools I&apos;ve mastered in my journey
            through the digital universe. Each skill represents countless hours
            of exploration and discovery.
          </p>
        </div>

        {/* Category Filter */}
        <div className='mb-12 flex flex-wrap justify-center gap-4'>
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'cosmic' : 'outline'}
              onClick={() => setSelectedCategory(category ?? 'all')}
              className={`capitalize ${
                selectedCategory !== category
                  ? 'border-space-gold/30 hover:text-space-gold hover:border-space-gold text-gray-400'
                  : ''
              }`}
            >
              {category === 'all' ? 'All Skills' : category}
            </Button>
          ))}
        </div>

        {/* Skills Grid */}
        {selectedCategory === 'all' ? (
          // Show categorized view when "all" is selected
          <div className='space-y-12'>
            {Object.entries(skillsByCategory).map(
              ([category, categorySkills]) => (
                <div key={category}>
                  <h3 className='mb-6 flex items-center text-2xl font-bold text-white'>
                    <span className='text-space-gold mr-3'>
                      {category === 'Frontend' && '🎨'}
                      {category === 'Backend' && '⚙️'}
                      {category === 'Mobile' && '📱'}
                      {category === 'Tools' && '🛠️'}
                      {category === 'Design' && '✨'}
                      {category === 'CMS' && '📄'}
                      {![
                        'Frontend',
                        'Backend',
                        'Mobile',
                        'Tools',
                        'Design',
                        'CMS',
                      ].includes(category) && '🔧'}
                    </span>
                    {category}
                  </h3>

                  <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
                    {categorySkills.map((skill, index) => (
                      <Card
                        key={skill.id}
                        className='glass-nebula hover:border-space-gold/50 group cursor-pointer border-purple-500/20 transition-all duration-500 hover:scale-110 hover:shadow-xl'
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <CardContent className='p-6 text-center'>
                          <div className='space-y-3'>
                            {/* Skill Icon/Visual */}
                            <div className='bg-gradient-cosmic group-hover:animate-pulse-cosmic mx-auto flex h-12 w-12 items-center justify-center rounded-full text-2xl'>
                              {/* You can add specific icons for each technology here */}
                              {skill.name.toLowerCase().includes('react') &&
                                '⚛️'}
                              {skill.name.toLowerCase().includes('next') && '▲'}
                              {skill.name
                                .toLowerCase()
                                .includes('javascript') && '🟨'}
                              {skill.name
                                .toLowerCase()
                                .includes('typescript') && '🔷'}
                              {skill.name.toLowerCase().includes('html') &&
                                '🟧'}
                              {skill.name.toLowerCase().includes('css') && '🎨'}
                              {skill.name.toLowerCase().includes('node') &&
                                '🟢'}
                              {skill.name.toLowerCase().includes('git') && '📚'}
                              {skill.name.toLowerCase().includes('figma') &&
                                '🎭'}
                              {skill.name.toLowerCase().includes('firebase') &&
                                '🔥'}
                              {![
                                'react',
                                'next',
                                'javascript',
                                'typescript',
                                'html',
                                'css',
                                'node',
                                'git',
                                'figma',
                                'firebase',
                              ].some(tech =>
                                skill.name.toLowerCase().includes(tech)
                              ) && '⭐'}
                            </div>

                            {/* Skill Name */}
                            <h4 className='group-hover:text-space-gold font-semibold text-white transition-colors duration-300'>
                              {skill.name}
                            </h4>

                            {/* Skill Level Indicator */}
                            <div className='flex justify-center space-x-1'>
                              {[...Array(5)].map((_, i) => (
                                <div
                                  key={i}
                                  className={`h-2 w-2 rounded-full ${
                                    i < (skill.name.length % 4) + 2 // Simple skill level based on name length
                                      ? 'bg-space-gold'
                                      : 'bg-gray-600'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        ) : (
          // Show filtered view for specific categories
          <div className='grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
            {filteredSkills.map((skill, index) => (
              <Card
                key={skill.id}
                className='glass-nebula hover:border-space-gold/50 group cursor-pointer border-purple-500/20 transition-all duration-500 hover:scale-110 hover:shadow-xl'
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className='p-6 text-center'>
                  <div className='space-y-3'>
                    {/* Skill Icon/Visual */}
                    <div className='bg-gradient-cosmic group-hover:animate-pulse-cosmic mx-auto flex h-16 w-16 items-center justify-center rounded-full text-3xl'>
                      {skill.name.toLowerCase().includes('react') && '⚛️'}
                      {skill.name.toLowerCase().includes('next') && '▲'}
                      {skill.name.toLowerCase().includes('javascript') && '🟨'}
                      {skill.name.toLowerCase().includes('typescript') && '🔷'}
                      {skill.name.toLowerCase().includes('html') && '🟧'}
                      {skill.name.toLowerCase().includes('css') && '🎨'}
                      {skill.name.toLowerCase().includes('node') && '🟢'}
                      {skill.name.toLowerCase().includes('git') && '📚'}
                      {skill.name.toLowerCase().includes('figma') && '🎭'}
                      {skill.name.toLowerCase().includes('firebase') && '🔥'}
                      {![
                        'react',
                        'next',
                        'javascript',
                        'typescript',
                        'html',
                        'css',
                        'node',
                        'git',
                        'figma',
                        'firebase',
                      ].some(tech => skill.name.toLowerCase().includes(tech)) &&
                        '⭐'}
                    </div>

                    {/* Skill Name */}
                    <h4 className='group-hover:text-space-gold font-semibold text-white transition-colors duration-300'>
                      {skill.name}
                    </h4>

                    {/* Category Badge */}
                    <Badge
                      variant='outline'
                      className='border-space-accent/30 text-space-accent text-xs'
                    >
                      {skill.category}
                    </Badge>

                    {/* Skill Level Indicator */}
                    <div className='flex justify-center space-x-1'>
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`h-2 w-2 rounded-full ${
                            i < (skill.name.length % 4) + 2
                              ? 'bg-space-gold'
                              : 'bg-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Skills Summary */}
        <div className='mt-16'>
          <div className='glass-cosmic mx-auto max-w-4xl rounded-2xl p-8'>
            <div className='grid grid-cols-1 gap-8 text-center md:grid-cols-3'>
              <div>
                <div className='text-space-gold mb-2 text-3xl font-bold'>
                  {skills.filter(s => s.category === 'Frontend').length}+
                </div>
                <p className='text-gray-400'>Frontend Technologies</p>
              </div>
              <div>
                <div className='text-space-gold mb-2 text-3xl font-bold'>
                  {skills.filter(s => s.category === 'Backend').length}+
                </div>
                <p className='text-gray-400'>Backend Technologies</p>
              </div>
              <div>
                <div className='text-space-gold mb-2 text-3xl font-bold'>
                  {skills.length}+
                </div>
                <p className='text-gray-400'>Total Skills</p>
              </div>
            </div>

            <div className='mt-8 text-center'>
              <h3 className='mb-4 text-xl font-bold text-white'>
                Always Learning, Always{' '}
                <span className='text-space-gold'>Growing</span>
              </h3>
              <p className='text-gray-400'>
                The tech universe is constantly expanding, and so am I.
                Currently exploring new frontiers in AI, Web3, and cutting-edge
                frameworks to stay ahead of the curve.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills
