'use client'

import { EditSkillDialog } from '@/components/dashboard/skill/edit-skill-dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { useSkills } from '@/hooks/use-skills'
import type { Skill } from '@/types'
import { Edit, Search, Trash2, X } from 'lucide-react'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { toast } from 'sonner'

interface SkillListClientProps {
  skills: Skill[]
}

// Define proficiency levels based on percentage
const PROFICIENCY_LEVELS = [
  { label: 'Beginner', min: 1, max: 25, color: 'bg-red-500' },
  { label: 'Novice', min: 26, max: 45, color: 'bg-orange-500' },
  { label: 'Intermediate', min: 46, max: 65, color: 'bg-yellow-500' },
  { label: 'Advanced', min: 66, max: 85, color: 'bg-blue-500' },
  { label: 'Expert', min: 86, max: 100, color: 'bg-green-500' },
]

function getProficiencyLevel(level: number) {
  return (
    PROFICIENCY_LEVELS.find(p => level >= p.min && level <= p.max) ||
    PROFICIENCY_LEVELS[0]
  )
}

function getProficiencyColor(level: number) {
  if (level >= 86) return 'text-green-400'
  if (level >= 66) return 'text-blue-400'
  if (level >= 46) return 'text-yellow-400'
  if (level >= 26) return 'text-orange-400'
  return 'text-red-400'
}

export function SkillListClient({ skills }: SkillListClientProps) {
  const { deleteSkill } = useSkills()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedProficiency, setSelectedProficiency] = useState<string | null>(
    null
  )

  const handleDeleteSkill = async (skillId: number, skillName: string) => {
    if (confirm(`Are you sure you want to delete "${skillName}"?`)) {
      try {
        await deleteSkill(skillId)
        toast.success('Skill deleted successfully!')
      } catch (error) {
        console.error('Failed to delete skill:', error)
        toast.error('Failed to delete skill. Please try again.')
      }
    }
  }

  // Get all unique categories from skills
  const availableCategories = useMemo(() => {
    const categoriesSet = new Set<string>()
    skills.forEach(skill => {
      categoriesSet.add(skill.category)
    })
    return Array.from(categoriesSet).sort()
  }, [skills])

  // Filter skills based on search query, category, and proficiency level
  const filteredSkills = useMemo(() => {
    return skills.filter(skill => {
      const matchesSearch =
        searchQuery === '' ||
        skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.category.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory =
        selectedCategory === null || skill.category === selectedCategory

      const matchesProficiency =
        selectedProficiency === null ||
        getProficiencyLevel(skill.level).label === selectedProficiency

      return matchesSearch && matchesCategory && matchesProficiency
    })
  }, [skills, searchQuery, selectedCategory, selectedProficiency])

  return (
    <div className='space-y-4'>
      {/* Search and Filter Controls */}
      <div className='space-y-4'>
        {/* Search Input */}
        <div className='relative'>
          <Search className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-white/50' />
          <Input
            placeholder='Search skills by name or category...'
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className='border-white/20 bg-white/5 pl-10 text-white placeholder:text-white/50'
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className='absolute top-1/2 right-3 -translate-y-1/2 text-white/50 hover:text-white'
            >
              <X className='h-4 w-4' />
            </button>
          )}
        </div>

        {/* Category Filter */}
        {availableCategories.length > 0 && (
          <div className='space-y-2'>
            <div className='text-sm text-white/70'>Filter by category:</div>
            <div className='flex flex-wrap gap-2'>
              <Button
                size='sm'
                variant={selectedCategory === null ? 'space' : 'link'}
                onClick={() => setSelectedCategory(null)}
              >
                All Categories
              </Button>
              {availableCategories.map(category => (
                <Button
                  key={category}
                  size='sm'
                  variant={selectedCategory === category ? 'space' : 'link'}
                  onClick={() =>
                    setSelectedCategory(
                      selectedCategory === category ? null : category
                    )
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Proficiency Filter */}
        <div className='space-y-2'>
          <div className='text-sm text-white/70'>Filter by proficiency:</div>
          <div className='flex flex-wrap gap-2'>
            <Button
              size='sm'
              variant={selectedProficiency === null ? 'space' : 'link'}
              onClick={() => setSelectedProficiency(null)}
            >
              All Levels
            </Button>
            {PROFICIENCY_LEVELS.map(level => (
              <Button
                key={level.label}
                size='sm'
                variant={selectedProficiency === level.label ? 'space' : 'link'}
                onClick={() =>
                  setSelectedProficiency(
                    selectedProficiency === level.label ? null : level.label
                  )
                }
              >
                {level.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className='text-sm text-white/70'>
        {filteredSkills.length === skills.length
          ? `Showing all ${skills.length} skills`
          : `Showing ${filteredSkills.length} of ${skills.length} skills`}
      </div>

      {/* Skills List */}
      {filteredSkills.length === 0 ? (
        <div className='flex min-h-[200px] flex-col items-center justify-center rounded-lg border border-dashed border-white/20 bg-white/5 p-8 text-center'>
          <Search className='mb-4 h-12 w-12 text-white/40' />
          <h3 className='mb-2 text-lg font-semibold text-white'>
            No skills found
          </h3>
          <p className='mb-4 text-sm text-white/70'>
            Try adjusting your search criteria or filters.
          </p>
          <Button
            onClick={() => {
              setSearchQuery('')
              setSelectedCategory(null)
              setSelectedProficiency(null)
            }}
            variant='space'
          >
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {filteredSkills.map(skill => (
            <Card
              key={skill.id}
              className='glass-nebula hover:border-space-accent/50 border-white/10 transition-all'
            >
              <CardHeader className='pb-3'>
                <div className='flex items-start justify-between'>
                  <div className='space-y-2'>
                    <CardTitle className='text-lg text-white'>
                      {skill.name}
                    </CardTitle>
                    <Badge
                      variant='secondary'
                      className='border-space-accent/30 bg-space-accent/20 text-space-accent'
                    >
                      {skill.category}
                    </Badge>
                  </div>
                  <div className='text-right'>
                    <div
                      className={`text-sm font-semibold ${getProficiencyColor(skill.level)}`}
                    >
                      {skill.level}/5
                    </div>
                    <div className='text-xs text-white/60'>
                      {getProficiencyLevel(skill.level).label}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className='space-y-3'>
                {/* Proficiency Progress Bar */}
                <div className='space-y-2'>
                  <div className='text-xs text-white/70'>Proficiency Level</div>
                  <Progress value={skill.level} className='h-2' />
                </div>

                {/* Actions */}
                <div className='flex items-center gap-2 pt-2'>
                  <Button size='sm' variant='outline' asChild>
                    <Link href={`/dashboard/skills/${skill.id}`}>
                      View Details
                    </Link>
                  </Button>
                  <EditSkillDialog skill={skill}>
                    <Button size='sm' variant='stellar'>
                      <Edit className='h-3 w-3' />
                    </Button>
                  </EditSkillDialog>
                  <Button
                    size='sm'
                    variant='destructive'
                    onClick={() => handleDeleteSkill(skill.id, skill.name)}
                  >
                    <Trash2 className='h-3 w-3' />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
