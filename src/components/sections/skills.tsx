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

  return (
    <section id='skills' className='py-20'>
      <div className='container mx-auto px-6'>
        {/* Section Header */}
        <div className='mb-16 text-center'>
          <h2 className='mb-4 text-4xl font-bold text-white md:text-5xl'>
            My <span className='text-space-gold'>Skill Constellation</span>
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
              variant={selectedCategory === category ? 'cosmic' : 'stellar'}
              onClick={() => setSelectedCategory(category ?? 'all')}
              className={`capitalize ${
                selectedCategory !== category
                  ? 'opacity-80 hover:opacity-100'
                  : ''
              }`}
            >
              {category === 'all' ? 'All Skills' : category}
            </Button>
          ))}
        </div>

        {/* Skills Grid - Unified Display */}
        <div className='grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
          {filteredSkills.map((skill, index) => (
            <Card
              key={skill.id}
              className='glass-nebula hover:border-space-gold/50 group cursor-pointer border-purple-500/20 transition-all duration-500 hover:scale-110 hover:shadow-xl'
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <CardContent className='p-6 text-center'>
                <div className='space-y-4'>
                  {/* Skill Icon/Visual */}
                  <div className='bg-gradient-cosmic group-hover:animate-pulse-cosmic mx-auto flex h-16 w-16 items-center justify-center rounded-full text-3xl transition-all duration-300 group-hover:scale-110'>
                    {skill.name.toLowerCase().includes('react') && '⚛️'}
                    {skill.name.toLowerCase().includes('next') && '▲'}
                    {skill.name.toLowerCase().includes('javascript') && '🟨'}
                    {skill.name.toLowerCase().includes('typescript') && '🔷'}
                    {skill.name.toLowerCase().includes('html') && '🟧'}
                    {skill.name.toLowerCase().includes('css') && '🎨'}
                    {skill.name.toLowerCase().includes('tailwind') && '🌊'}
                    {skill.name.toLowerCase().includes('node') && '🟢'}
                    {skill.name.toLowerCase().includes('express') && '�'}
                    {skill.name.toLowerCase().includes('mongo') && '�'}
                    {skill.name.toLowerCase().includes('postgres') && '�'}
                    {skill.name.toLowerCase().includes('mysql') && '🐬'}
                    {skill.name.toLowerCase().includes('git') && '📚'}
                    {skill.name.toLowerCase().includes('figma') && '🎭'}
                    {skill.name.toLowerCase().includes('firebase') && '🔥'}
                    {skill.name.toLowerCase().includes('aws') && '☁️'}
                    {skill.name.toLowerCase().includes('docker') && '🐳'}
                    {skill.name.toLowerCase().includes('python') && '🐍'}
                    {skill.name.toLowerCase().includes('java') && '☕'}
                    {skill.name.toLowerCase().includes('flutter') && '💙'}
                    {skill.name.toLowerCase().includes('android') && '🤖'}
                    {skill.name.toLowerCase().includes('ios') && '🍎'}
                    {skill.name.toLowerCase().includes('swift') && '🦉'}
                    {skill.name.toLowerCase().includes('kotlin') && '🎯'}
                    {skill.name.toLowerCase().includes('vue') && '�'}
                    {skill.name.toLowerCase().includes('angular') && '🅰️'}
                    {skill.name.toLowerCase().includes('redux') && '🔄'}
                    {skill.name.toLowerCase().includes('graphql') && '�'}
                    {skill.name.toLowerCase().includes('sass') && '�'}
                    {skill.name.toLowerCase().includes('webpack') && '📦'}
                    {skill.name.toLowerCase().includes('vite') && '⚡'}
                    {![
                      'react',
                      'next',
                      'javascript',
                      'typescript',
                      'html',
                      'css',
                      'tailwind',
                      'node',
                      'express',
                      'mongo',
                      'postgres',
                      'mysql',
                      'git',
                      'figma',
                      'firebase',
                      'aws',
                      'docker',
                      'python',
                      'java',
                      'flutter',
                      'android',
                      'ios',
                      'swift',
                      'kotlin',
                      'vue',
                      'angular',
                      'redux',
                      'graphql',
                      'sass',
                      'webpack',
                      'vite',
                    ].some(tech => skill.name.toLowerCase().includes(tech)) &&
                      '⭐'}
                  </div>

                  {/* Skill Name */}
                  <h4 className='group-hover:text-space-gold text-sm font-semibold text-white transition-colors duration-300'>
                    {skill.name}
                  </h4>

                  {/* Category Badge */}
                  <Badge
                    variant='outline'
                    className={`border-opacity-70 text-xs font-medium transition-all duration-300 ${skill.category === 'Frontend' ? 'border-blue-400/70 bg-blue-400/20 text-blue-200 hover:border-blue-400 hover:bg-blue-400/30' : ''} ${skill.category === 'Backend' ? 'border-green-400/70 bg-green-400/20 text-green-200 hover:border-green-400 hover:bg-green-400/30' : ''} ${skill.category === 'Mobile' ? 'border-purple-400/70 bg-purple-400/20 text-purple-200 hover:border-purple-400 hover:bg-purple-400/30' : ''} ${skill.category === 'Tools' ? 'border-orange-400/70 bg-orange-400/20 text-orange-200 hover:border-orange-400 hover:bg-orange-400/30' : ''} ${skill.category === 'Design' ? 'border-pink-400/70 bg-pink-400/20 text-pink-200 hover:border-pink-400 hover:bg-pink-400/30' : ''} ${skill.category === 'CMS' ? 'border-yellow-400/70 bg-yellow-400/20 text-yellow-200 hover:border-yellow-400 hover:bg-yellow-400/30' : ''} ${!skill.category || !['Frontend', 'Backend', 'Mobile', 'Tools', 'Design', 'CMS'].includes(skill.category) ? 'border-space-gold/70 bg-space-gold/20 text-space-gold hover:border-space-gold hover:bg-space-gold/30' : ''} `}
                  >
                    {skill.category || 'Other'}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

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
