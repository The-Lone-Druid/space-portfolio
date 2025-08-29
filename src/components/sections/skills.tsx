'use client'

import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog'
import { useState } from 'react'
import { Zap, Sparkles, Code, Search, X, Rocket } from 'lucide-react'
import { Skill } from '../../types'
import { SectionHeader } from '../shared/section-header'

interface SkillProps {
  skills: Skill[]
}

interface SkillCardCompactProps {
  skill: Skill
  index: number
}

function SkillCardCompact({ skill, index }: SkillCardCompactProps) {
  const [imageError, setImageError] = useState(false)

  // Proficiency level for badge color
  const getProficiencyColor = (level: number) => {
    if (level >= 90)
      return 'bg-green-500/20 text-green-400 shadow-md shadow-green-500/20'
    if (level >= 80)
      return 'bg-blue-500/20 text-blue-400 shadow-md shadow-blue-500/20'
    if (level >= 70)
      return 'bg-yellow-500/20 text-yellow-400 shadow-md shadow-yellow-500/20'
    if (level >= 60)
      return 'bg-orange-500/20 text-orange-400 shadow-md shadow-orange-500/20'
    return 'bg-gray-500/20 text-gray-400 shadow-md shadow-gray-500/20'
  }

  const getProficiencyLevel = (level: number) => {
    if (level >= 90) return 'Expert'
    if (level >= 80) return 'Advanced'
    if (level >= 70) return 'Intermediate'
    if (level >= 60) return 'Proficient'
    return 'Beginner'
  }

  return (
    <Card
      className={`group animate-fade-in glass-cosmic hover:shadow-space-accent/30 relative transform overflow-hidden border border-white/10 transition-all duration-500 hover:scale-105 hover:border-white/20 hover:shadow-xl`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <CardContent className='relative p-4 text-center'>
        {/* Background glow effect */}
        <div className='from-space-accent/5 to-space-gold/5 absolute inset-0 rounded-xl bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100'></div>
        {/* Skill Icon from Simple Icons with Orbital Animation */}
        <div className='relative mx-auto mb-3 h-20 w-20'>
          {/* Outer Orbital Ring - Matching space-orbital timing */}
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

          {/* Inner Orbital Ring - Matching space-orbital reverse timing */}
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

          {/* Central Icon Container - Enhanced presentation */}
          <div className='absolute inset-4 z-10 flex items-center justify-center rounded-full shadow-inner transition-all duration-300 group-hover:scale-110 group-hover:from-white/25 group-hover:to-white/10 group-hover:shadow-lg group-hover:shadow-white/20'>
            {/* Inner glow container for better icon visibility */}
            <div className='flex h-10 w-10 items-center justify-center rounded-full p-2 shadow-md ring-1 ring-white/20 backdrop-blur-sm transition-all duration-300 group-hover:ring-white/40'>
              {!imageError ? (
                <Image
                  src={`https://cdn.simpleicons.org/${skill.iconName}`}
                  alt={skill.name}
                  width={28}
                  height={28}
                  className='h-full w-full object-contain transition-all duration-300 group-hover:scale-110 group-hover:brightness-110 group-hover:drop-shadow-md'
                  onError={() => setImageError(true)}
                  unoptimized
                />
              ) : (
                <Code className='h-6 w-6 text-white' />
              )}
            </div>
          </div>
        </div>

        {/* Skill Name */}
        <h3 className='group-hover:text-space-accent relative z-10 mb-2 truncate text-sm font-semibold text-white transition-colors duration-300'>
          {skill.name}
        </h3>

        {/* Proficiency Badge */}
        <Badge
          variant='outline'
          className={`relative z-10 text-xs font-medium ${getProficiencyColor(skill.level)}`}
        >
          <Zap className='mr-1 h-2 w-2' />
          {getProficiencyLevel(skill.level)}
        </Badge>

        {/* Enhanced sparkle effects on hover */}
        <div className='absolute top-2 right-2 z-20 opacity-0 transition-all duration-300 group-hover:scale-110 group-hover:opacity-100'>
          <Sparkles className='text-space-gold h-3 w-3 animate-pulse drop-shadow-sm' />
        </div>
      </CardContent>
    </Card>
  )
}

const Skills = ({ skills }: SkillProps) => {
  const [selectedCategory] = useState('all')
  const [searchQuery] = useState('')

  // Sort skills by level (highest first) and take top 10 for main display
  const topSkills = skills.sort((a, b) => b.level - a.level).slice(0, 10)

  // Filter skills for dialog
  const filteredSkills = skills.filter(skill => {
    const matchesSearch =
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory =
      selectedCategory === 'all' || skill.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <>
      <SectionHeader
        title='My'
        highlight='Tech Arsenal'
        subtitle='Discover the cutting-edge technologies and tools that power my digital creations across the cosmos.'
      />

      {/* Top 10 Skills Grid */}
      <div className='mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5'>
        {topSkills.map((skill, index) => (
          <SkillCardCompact key={skill.id} skill={skill} index={index} />
        ))}
      </div>

      {/* View All Skills Button - Enhanced */}
      {skills.length > 10 && (
        <div className='text-center'>
          <div className='relative inline-block'>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant='cosmic'>
                  Explore All Skills
                  <span className='text-space-gold'>({skills.length})</span>
                </Button>
              </DialogTrigger>
              <DialogContent className='from-space-cosmic/70 shadow-space-accent/20 flex h-screen max-h-screen w-screen min-w-screen flex-col gap-0 bg-gradient-to-br to-gray-900/80 p-0 shadow-2xl backdrop-blur-xl'>
                <DialogHeader className='shadow-space-accent/10 flex-shrink-0 p-3 shadow-sm'>
                  <DialogTitle className='flex flex-col gap-2 text-lg font-bold text-white sm:flex-row sm:items-center sm:gap-3 sm:text-xl'>
                    <div className='flex items-center gap-2 sm:gap-3'>
                      <div className='from-space-accent flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br to-purple-500 sm:h-8 sm:w-8'>
                        <Code className='h-4 w-4 text-white' />
                      </div>
                      <span>
                        All Skills
                        <span className='text-space-gold ms-1'>
                          ({filteredSkills.length})
                        </span>
                      </span>
                    </div>
                  </DialogTitle>
                </DialogHeader>

                {/* Scrollable Content Area */}
                <div className='flex-1 overflow-y-auto p-3'>
                  {filteredSkills.length > 0 ? (
                    <div className='grid grid-cols-3 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8'>
                      {filteredSkills.map((skill, index) => (
                        <SkillCardCompact
                          key={skill.id}
                          skill={skill}
                          index={index}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className='flex flex-col items-center justify-center py-8 sm:py-12 lg:py-16'>
                      <div className='mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-gray-800 to-gray-900 sm:mb-4 sm:h-16 sm:w-16 lg:mb-6 lg:h-20 lg:w-20'>
                        <Search className='h-6 w-6 text-gray-500 sm:h-8 sm:w-8 lg:h-10 lg:w-10' />
                      </div>
                      <h3 className='mb-1 text-base font-semibold text-gray-300 sm:mb-2 sm:text-lg lg:text-xl'>
                        No skills found
                      </h3>
                      <p className='text-center text-xs text-gray-500 sm:text-sm lg:text-base'>
                        Try adjusting your search terms or
                        <br />
                        select a different category filter
                      </p>
                    </div>
                  )}
                </div>

                {/* Enhanced Footer with Close Button */}
                <div className='shadow-space-accent/10 flex flex-shrink-0 justify-center p-3 shadow-sm'>
                  <DialogClose asChild>
                    <Button
                      variant='outline'
                      className='group hover:bg-space-accent/20 hover:shadow-space-accent/20 relative w-full overflow-hidden text-white hover:shadow-lg sm:w-auto'
                    >
                      <div className='from-space-accent/10 absolute inset-0 bg-gradient-to-r to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100'></div>
                      <div className='relative z-10 flex items-center gap-2'>
                        <X className='h-4 w-4' />
                        Close Details
                      </div>
                    </Button>
                  </DialogClose>
                </div>
              </DialogContent>
            </Dialog>
            <div className='from-space-gold/20 to-space-accent/20 absolute inset-0 -z-10 rounded-xl bg-gradient-to-br opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100'></div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {skills.length === 0 && (
        <div className='py-20 text-center'>
          <div className='mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-800'>
            <Code className='h-10 w-10 text-gray-500' />
          </div>
          <p className='mb-2 text-xl text-gray-400'>No skills available</p>
          <p className='text-gray-500'>
            Skills will appear here once they are added.
          </p>
        </div>
      )}
    </>
  )
}

export default Skills
