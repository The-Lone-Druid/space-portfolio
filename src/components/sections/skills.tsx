'use client'

import { Button } from '@/components/ui/button'
import { SectionCard, SkillCard } from '@/components/cards'
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
    <SectionCard
      id='skills'
      title='My'
      highlight='Skill Constellation'
      subtitle="Explore the technologies and tools I've mastered in my journey through the digital universe. Each skill represents countless hours of exploration and discovery."
    >
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

      {/* Skills Grid */}
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
        {filteredSkills.map((skill, index) => (
          <SkillCard
            key={skill.id}
            name={skill.name}
            category={skill.category || 'Other'}
            className='animate-fade-in'
            style={{ animationDelay: `${index * 0.1}s` }}
          />
        ))}
      </div>

      {filteredSkills.length === 0 && (
        <div className='py-20 text-center'>
          <p className='text-xl text-gray-400'>
            No skills found for &quot;{selectedCategory}&quot; category.
          </p>
        </div>
      )}
    </SectionCard>
  )
}

export default Skills
