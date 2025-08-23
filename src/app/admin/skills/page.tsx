'use client'

import { DashboardLayout } from '@/components/dashboard'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import { Edit, Plus, Star, Trash2 } from 'lucide-react'

// Sample skills data organized by category
const skillsData = {
  Frontend: [
    { id: 1, name: 'React', level: 95, experience: '5+ years' },
    { id: 2, name: 'Next.js', level: 90, experience: '3+ years' },
    { id: 3, name: 'TypeScript', level: 85, experience: '4+ years' },
    { id: 4, name: 'Tailwind CSS', level: 88, experience: '3+ years' },
    { id: 5, name: 'HTML/CSS', level: 98, experience: '6+ years' },
  ],
  Backend: [
    { id: 6, name: 'Node.js', level: 80, experience: '3+ years' },
    { id: 7, name: 'PostgreSQL', level: 75, experience: '2+ years' },
    { id: 8, name: 'Prisma', level: 70, experience: '1+ years' },
    { id: 9, name: 'REST APIs', level: 85, experience: '4+ years' },
  ],
  Tools: [
    { id: 10, name: 'Git', level: 90, experience: '5+ years' },
    { id: 11, name: 'VS Code', level: 95, experience: '6+ years' },
    { id: 12, name: 'Figma', level: 75, experience: '2+ years' },
    { id: 13, name: 'Docker', level: 65, experience: '1+ years' },
  ],
  Mobile: [
    { id: 14, name: 'React Native', level: 80, experience: '2+ years' },
    { id: 15, name: 'Ionic', level: 70, experience: '1+ years' },
  ],
}

const getLevelColor = (level: number) => {
  if (level >= 90) return 'text-green-600'
  if (level >= 75) return 'text-blue-600'
  if (level >= 60) return 'text-yellow-600'
  return 'text-gray-600'
}

const getLevelBadge = (level: number) => {
  if (level >= 90) return { label: 'Expert', variant: 'default' as const }
  if (level >= 75) return { label: 'Advanced', variant: 'secondary' as const }
  if (level >= 60) return { label: 'Intermediate', variant: 'outline' as const }
  return { label: 'Beginner', variant: 'outline' as const }
}

export default function SkillsPage() {
  const totalSkills = Object.values(skillsData).flat().length
  const expertSkills = Object.values(skillsData)
    .flat()
    .filter(skill => skill.level >= 90).length
  const averageLevel = Math.round(
    Object.values(skillsData)
      .flat()
      .reduce((acc, skill) => acc + skill.level, 0) / totalSkills
  )

  return (
    <DashboardLayout title='Skills Management'>
      <div className='space-y-6'>
        {/* Header */}
        <div className='flex items-center justify-between'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Skills</h2>
            <p className='text-muted-foreground'>
              Manage your technical skills and expertise levels.
            </p>
          </div>
          <Button>
            <Plus className='mr-2 h-4 w-4' />
            Add Skill
          </Button>
        </div>

        {/* Stats */}
        <div className='grid gap-4 md:grid-cols-4'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Total Skills
              </CardTitle>
              <Star className='text-muted-foreground h-4 w-4' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{totalSkills}</div>
              <p className='text-muted-foreground text-xs'>
                Across all categories
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Expert Level
              </CardTitle>
              <Star className='text-muted-foreground h-4 w-4' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{expertSkills}</div>
              <p className='text-muted-foreground text-xs'>90%+ proficiency</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Average Level
              </CardTitle>
              <Star className='text-muted-foreground h-4 w-4' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{averageLevel}%</div>
              <p className='text-muted-foreground text-xs'>
                Overall proficiency
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Categories</CardTitle>
              <Star className='text-muted-foreground h-4 w-4' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {Object.keys(skillsData).length}
              </div>
              <p className='text-muted-foreground text-xs'>Skill categories</p>
            </CardContent>
          </Card>
        </div>

        {/* Skills by Category */}
        <div className='space-y-6'>
          {Object.entries(skillsData).map(([category, skills]) => (
            <Card key={category}>
              <CardHeader>
                <CardTitle className='text-lg'>{category}</CardTitle>
                <p className='text-muted-foreground text-sm'>
                  {skills.length} skills in this category
                </p>
              </CardHeader>
              <CardContent>
                <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
                  {skills.map(skill => {
                    const levelBadge = getLevelBadge(skill.level)
                    return (
                      <div
                        key={skill.id}
                        className='space-y-3 rounded-lg border p-4 transition-shadow hover:shadow-md'
                      >
                        <div className='flex items-center justify-between'>
                          <h4 className='font-medium'>{skill.name}</h4>
                          <Badge variant={levelBadge.variant}>
                            {levelBadge.label}
                          </Badge>
                        </div>

                        <div className='space-y-2'>
                          <div className='flex items-center justify-between text-sm'>
                            <span className='text-muted-foreground'>
                              Proficiency
                            </span>
                            <span
                              className={cn(
                                'font-medium',
                                getLevelColor(skill.level)
                              )}
                            >
                              {skill.level}%
                            </span>
                          </div>
                          <Progress value={skill.level} className='h-2' />
                        </div>

                        <div className='flex items-center justify-between'>
                          <span className='text-muted-foreground text-xs'>
                            {skill.experience}
                          </span>
                          <div className='flex gap-1'>
                            <Button variant='ghost' size='sm'>
                              <Edit className='h-3 w-3' />
                            </Button>
                            <Button variant='ghost' size='sm'>
                              <Trash2 className='h-3 w-3' />
                            </Button>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
