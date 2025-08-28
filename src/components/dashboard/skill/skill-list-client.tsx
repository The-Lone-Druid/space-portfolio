'use client'

import { EditSkillDialog } from '@/components/dashboard/skill/edit-skill-dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { useSkills } from '@/hooks/use-skills'
import type { Skill } from '@/types'
import { Edit, Search, Trash2, X, Target, Filter } from 'lucide-react'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { toast } from 'sonner'

interface SkillListClientProps {
  skills: Skill[]
}

// Define proficiency levels based on percentage
const PROFICIENCY_LEVELS = [
  { label: 'Beginner', min: 1, max: 2, color: 'bg-red-500' },
  { label: 'Novice', min: 2, max: 3, color: 'bg-orange-500' },
  { label: 'Intermediate', min: 3, max: 4, color: 'bg-yellow-500' },
  { label: 'Advanced', min: 4, max: 5, color: 'bg-blue-500' },
  { label: 'Expert', min: 5, max: 5, color: 'bg-green-500' },
]

function getProficiencyLevel(level: number) {
  if (level === 5) return PROFICIENCY_LEVELS[4] // Expert
  if (level >= 4) return PROFICIENCY_LEVELS[3] // Advanced
  if (level >= 3) return PROFICIENCY_LEVELS[2] // Intermediate
  if (level >= 2) return PROFICIENCY_LEVELS[1] // Novice
  return PROFICIENCY_LEVELS[0] // Beginner
}

function getProficiencyColor(level: number) {
  if (level === 5) return 'text-green-400'
  if (level >= 4) return 'text-blue-400'
  if (level >= 3) return 'text-yellow-400'
  if (level >= 2) return 'text-orange-400'
  return 'text-red-400'
}

const ITEMS_PER_PAGE = 9 // 3x3 grid

export function SkillListClient({ skills }: SkillListClientProps) {
  const { deleteSkill } = useSkills()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedProficiency, setSelectedProficiency] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)

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
        selectedCategory === 'all' || skill.category === selectedCategory

      const matchesProficiency =
        selectedProficiency === 'all' ||
        getProficiencyLevel(skill.level).label === selectedProficiency

      return matchesSearch && matchesCategory && matchesProficiency
    })
  }, [skills, searchQuery, selectedCategory, selectedProficiency])

  // Pagination calculations
  const totalPages = Math.ceil(filteredSkills.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const paginatedSkills = filteredSkills.slice(startIndex, endIndex)

  // Reset to first page when filters change
  const handleFilterChange = () => {
    setCurrentPage(1)
  }

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('all')
    setSelectedProficiency('all')
    setCurrentPage(1)
  }

  return (
    <div className='space-y-6'>
      {/* Search and Filter Controls */}
      <div className='space-y-4'>
        {/* Header Filter Controls */}
        <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
          <div className='flex items-center gap-2'>
            <Filter className='h-4 w-4 text-white/70' />
            <span className='text-sm font-medium text-white'>Filters</span>
          </div>

          {/* Filter Row */}
          <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
            <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
              {/* Category Filter */}
              <div className='flex items-center gap-2'>
                <Select
                  value={selectedCategory}
                  onValueChange={value => {
                    setSelectedCategory(value)
                    handleFilterChange()
                  }}
                >
                  <SelectTrigger className='w-[180px] border-white/20 bg-white/5 text-white'>
                    <SelectValue placeholder='All Categories' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='all'>All Categories</SelectItem>
                    {availableCategories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Proficiency Filter */}
              <div className='flex items-center gap-2'>
                <Select
                  value={selectedProficiency}
                  onValueChange={value => {
                    setSelectedProficiency(value)
                    handleFilterChange()
                  }}
                >
                  <SelectTrigger className='w-[140px] border-white/20 bg-white/5 text-white'>
                    <SelectValue placeholder='All Levels' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='all'>All Levels</SelectItem>
                    {PROFICIENCY_LEVELS.map(level => (
                      <SelectItem key={level.label} value={level.label}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Clear Filters */}
            {(searchQuery ||
              selectedCategory !== 'all' ||
              selectedProficiency !== 'all') && (
              <Button variant='outline' size='sm' onClick={clearFilters}>
                <X className='mr-2 h-4 w-4' />
                Clear Filters
              </Button>
            )}
          </div>
        </div>
        {/* Search Input */}
        <div className='relative'>
          <Search className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-white/50' />
          <Input
            placeholder='Search skills by name or category...'
            value={searchQuery}
            onChange={e => {
              setSearchQuery(e.target.value)
              handleFilterChange()
            }}
            className='border-white/20 bg-white/5 pl-10 text-white placeholder:text-white/50'
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('')
                handleFilterChange()
              }}
              className='absolute top-1/2 right-3 -translate-y-1/2 text-white/50 hover:text-white'
            >
              <X className='h-4 w-4' />
            </button>
          )}
        </div>
      </div>

      {/* Results Summary */}
      <div className='flex items-center justify-between text-sm text-white/70'>
        <span>
          {filteredSkills.length === skills.length
            ? `Showing all ${skills.length} skills`
            : `Showing ${filteredSkills.length} of ${skills.length} skills`}
        </span>
        {totalPages > 1 && (
          <span>
            Page {currentPage} of {totalPages}
          </span>
        )}
      </div>

      {/* Skills Grid */}
      {filteredSkills.length === 0 ? (
        <div className='flex min-h-[300px] flex-col items-center justify-center rounded-lg border border-dashed border-white/20 bg-white/5 p-8 text-center'>
          <Target className='mb-4 h-12 w-12 text-white/40' />
          <h3 className='mb-2 text-lg font-semibold text-white'>
            No skills found
          </h3>
          <p className='mb-4 text-sm text-white/70'>
            {searchQuery ||
            selectedCategory !== 'all' ||
            selectedProficiency !== 'all'
              ? 'Try adjusting your search criteria or filters.'
              : 'Start building your skill portfolio by adding your first skill.'}
          </p>
          <Button onClick={clearFilters} variant='stellar'>
            {searchQuery ||
            selectedCategory !== 'all' ||
            selectedProficiency !== 'all'
              ? 'Clear Filters'
              : 'Add Your First Skill'}
          </Button>
        </div>
      ) : (
        <div className='space-y-6'>
          {/* Skills Grid */}
          <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {paginatedSkills.map(skill => (
              <Card
                key={skill.id}
                className='glass-cosmic hover:border-space-accent/50 border-white/10 transition-all duration-300 hover:scale-[1.02]'
              >
                <CardHeader className='pb-3'>
                  <div className='flex items-start justify-between'>
                    <div className='flex-1 space-y-2'>
                      <CardTitle className='text-lg leading-tight text-white'>
                        {skill.name}
                      </CardTitle>
                      <Badge variant='outline'>{skill.category}</Badge>
                    </div>
                    <div className='ml-3 flex-shrink-0 text-right'>
                      <div
                        className={`text-lg font-bold ${getProficiencyColor(skill.level)}`}
                      >
                        {skill.level}/5
                      </div>
                      <div className='text-xs text-white/60'>
                        {getProficiencyLevel(skill.level).label}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className='space-y-4'>
                  {/* Proficiency Progress Bar */}
                  <div className='space-y-2'>
                    <div className='flex items-center justify-between'>
                      <span className='text-xs text-white/70'>Proficiency</span>
                      <span
                        className={`text-xs font-medium ${getProficiencyColor(skill.level)}`}
                      >
                        {Math.round((skill.level / 5) * 100)}%
                      </span>
                    </div>
                    <Progress value={(skill.level / 5) * 100} className='h-2' />
                  </div>

                  {/* Actions */}
                  <div className='flex items-center gap-2'>
                    <Button
                      size='sm'
                      variant='outline'
                      asChild
                      className='flex-1'
                    >
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

          {/* Pagination */}
          {totalPages > 1 && (
            <div className='flex justify-center'>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() =>
                        setCurrentPage(Math.max(1, currentPage - 1))
                      }
                      className={
                        currentPage === 1
                          ? 'pointer-events-none opacity-50'
                          : 'cursor-pointer'
                      }
                    />
                  </PaginationItem>

                  {/* Page Numbers */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(page => {
                      // Show first page, last page, current page, and pages around current
                      return (
                        page === 1 ||
                        page === totalPages ||
                        Math.abs(page - currentPage) <= 1
                      )
                    })
                    .map((page, index, array) => (
                      <div key={page}>
                        {/* Add ellipsis if there's a gap */}
                        {index > 0 && array[index - 1] < page - 1 && (
                          <PaginationItem>
                            <PaginationEllipsis />
                          </PaginationItem>
                        )}
                        <PaginationItem>
                          <PaginationLink
                            onClick={() => setCurrentPage(page)}
                            isActive={currentPage === page}
                            className='cursor-pointer'
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      </div>
                    ))}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        setCurrentPage(Math.min(totalPages, currentPage + 1))
                      }
                      className={
                        currentPage === totalPages
                          ? 'pointer-events-none opacity-50'
                          : 'cursor-pointer'
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
