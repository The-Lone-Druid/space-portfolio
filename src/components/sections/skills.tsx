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
import { Zap, Sparkles, Code, Grid3X3, Search, X } from 'lucide-react'
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
    if (level >= 90) return 'bg-green-500/20 text-green-400 border-green-500/30'
    if (level >= 80) return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
    if (level >= 70)
      return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
    if (level >= 60)
      return 'bg-orange-500/20 text-orange-400 border-orange-500/30'
    return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
  }

  const getProficiencyLevel = (level: number) => {
    if (level >= 90) return 'Expert'
    if (level >= 80) return 'Advanced'
    if (level >= 70) return 'Intermediate'
    if (level >= 60) return 'Proficient'
    return 'Beginner'
  }

  const getSkillSlug = () => {
    return skill.name
      .toLowerCase()
      .replace(/\./g, 'dot')
      .replace(/\s+/g, '')
      .replace(/[^a-z0-9]/g, '')
  }

  return (
    <Card
      className={`group animate-fade-in glass-cosmic border-space-accent/30 hover:border-space-accent/50 hover:shadow-space-accent/25 relative transform overflow-hidden transition-all duration-500 hover:scale-110 hover:shadow-lg`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Background glow effect */}
      <div className='from-space-gold/10 to-space-accent/10 absolute inset-0 -z-10 bg-gradient-to-br opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100'></div>

      <CardContent className='p-4 text-center'>
        {/* Skill Icon from Simple Icons */}
        <div className='from-space-accent/20 to-space-gold/20 relative mx-auto mb-3 flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br transition-transform duration-300 group-hover:scale-110'>
          {!imageError ? (
            <Image
              src={`https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/${getSkillSlug()}.svg`}
              alt={skill.name}
              width={34}
              height={34}
              className='brightness-0 invert filter transition-all duration-300 group-hover:drop-shadow-lg'
              style={{ filter: 'brightness(0) invert(1)' }}
              onError={() => setImageError(true)}
              unoptimized
            />
          ) : (
            <Code className='h-6 w-6 text-white' />
          )}
        </div>

        {/* Skill Name */}
        <h3 className='group-hover:text-space-accent mb-2 truncate text-sm font-semibold text-white transition-colors duration-300'>
          {skill.name}
        </h3>

        {/* Proficiency Badge */}
        <Badge
          variant='outline'
          className={`text-xs font-medium ${getProficiencyColor(skill.level)}`}
        >
          <Zap className='mr-1 h-2 w-2' />
          {getProficiencyLevel(skill.level)}
        </Badge>

        {/* Sparkle effects on hover */}
        <div className='absolute top-2 right-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
          <Sparkles className='text-space-gold h-3 w-3 animate-pulse' />
        </div>
      </CardContent>
    </Card>
  )
}

const Skills = ({ skills }: SkillProps) => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Sort skills by level (highest first) and take top 10 for main display
  const topSkills = skills.sort((a, b) => b.level - a.level).slice(0, 10)

  // Get unique categories for filter in dialog
  const categories = [
    'all',
    ...Array.from(new Set(skills.map(skill => skill.category))),
  ]

  // Filter skills for dialog
  const filteredSkills = skills.filter(skill => {
    const matchesSearch =
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory =
      selectedCategory === 'all' || skill.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Group skills by category for stats
  const skillStats = skills.reduce(
    (acc, skill) => {
      const category = skill.category
      acc[category] = (acc[category] || 0) + 1
      return acc
    },
    {} as Record<string, number>
  )

  return (
    <>
      <SectionHeader
        title='My'
        highlight='Tech Arsenal'
        subtitle='Discover the cutting-edge technologies and tools that power my digital creations across the cosmos.'
      />

      {/* Skills Statistics */}
      <div className='mb-8 grid grid-cols-2 gap-4 md:grid-cols-4'>
        <div className='glass-cosmic border-space-accent/30 rounded-lg p-4 text-center'>
          <div className='text-space-accent mb-1 text-2xl font-bold'>
            {skills.length}
          </div>
          <div className='text-sm text-gray-400'>Total Skills</div>
        </div>
        <div className='glass-cosmic border-space-accent/30 rounded-lg p-4 text-center'>
          <div className='text-space-gold mb-1 text-2xl font-bold'>
            {categories.length - 1}
          </div>
          <div className='text-sm text-gray-400'>Categories</div>
        </div>
        <div className='glass-cosmic border-space-accent/30 rounded-lg p-4 text-center'>
          <div className='mb-1 text-2xl font-bold text-green-400'>
            {skills.filter(s => s.level >= 80).length}
          </div>
          <div className='text-sm text-gray-400'>Advanced+</div>
        </div>
        <div className='glass-cosmic border-space-accent/30 rounded-lg p-4 text-center'>
          <div className='mb-1 text-2xl font-bold text-purple-400'>
            {Math.round(
              skills.reduce((sum, skill) => sum + skill.level, 0) /
                skills.length
            )}
            %
          </div>
          <div className='text-sm text-gray-400'>Avg Level</div>
        </div>
      </div>

      {/* Top 10 Skills Grid */}
      <div className='mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5'>
        {topSkills.map((skill, index) => (
          <SkillCardCompact key={skill.id} skill={skill} index={index} />
        ))}
      </div>

      {/* View All Skills Button */}
      {skills.length > 10 && (
        <div className='text-center'>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                size='lg'
                variant='cosmic'
                className='group relative overflow-hidden'
              >
                View All Skills ({skills.length})
                <div className='from-space-gold/20 to-space-accent/20 absolute inset-0 bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
              </Button>
            </DialogTrigger>
            <DialogContent className='border-space-accent/30 from-space-cosmic/70 h-[95vh] max-h-[95vh] w-[98vw] max-w-[98vw] bg-gradient-to-br to-gray-900/80 p-0 backdrop-blur-xl sm:h-[90vh] sm:w-[95vw] sm:max-w-[95vw] lg:h-[85vh] lg:w-[90vw] lg:max-w-[90vw] xl:max-w-7xl'>
              <DialogHeader className='border-space-accent/20 border-b p-3 sm:p-4 lg:p-6'>
                <DialogTitle>All Skills</DialogTitle>
              </DialogHeader>

              {/* Scrollable Content Area */}
              <div className='flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6'>
                {filteredSkills.length > 0 ? (
                  <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10'>
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

              {/* Footer with Close Button */}
              <div className='border-space-accent/20 flex justify-center border-t p-3 sm:p-4 lg:p-6'>
                <DialogClose asChild>
                  <Button
                    variant='outline'
                    size='sm'
                    className='border-space-accent/50 hover:bg-space-accent/20 hover:border-space-accent/70 w-full text-white sm:w-auto'
                  >
                    <X className='mr-2 h-4 w-4' />
                    Close
                  </Button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
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
