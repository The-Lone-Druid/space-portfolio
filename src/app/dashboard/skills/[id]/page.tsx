import { DashboardPageHeader } from '@/components/dashboard/page-header'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { getSkillByIdServer } from '@/services/skills-service'
import { formatDistanceToNow } from 'date-fns'
import {
  ArrowLeft,
  BarChart3,
  Calendar,
  Edit,
  Star,
  Target,
} from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { EditSkillDialog } from '../../../../components/dashboard/skill/edit-skill-dialog'

interface SkillPageProps {
  params: Promise<{
    id: string
  }>
}

// Helper function to get proficiency level description
function getProficiencyDescription(level: number) {
  if (level >= 4.5)
    return {
      label: 'Expert',
      color: 'text-green-400',
      description:
        'Highly proficient with deep expertise and ability to mentor others',
    }
  if (level >= 3.5)
    return {
      label: 'Advanced',
      color: 'text-blue-400',
      description:
        'Strong proficiency with ability to handle complex tasks independently',
    }
  if (level >= 2.5)
    return {
      label: 'Intermediate',
      color: 'text-orange-400',
      description:
        'Good understanding with moderate experience and growing confidence',
    }
  if (level >= 1.5)
    return {
      label: 'Beginner',
      color: 'text-yellow-400',
      description:
        'Basic understanding with limited experience but eager to learn',
    }
  return {
    label: 'Novice',
    color: 'text-red-400',
    description: 'Just starting to learn with fundamental concepts',
  }
}

export default async function SkillDetailPage({ params }: SkillPageProps) {
  const { id } = await params
  const skillId = parseInt(id)

  if (isNaN(skillId)) {
    notFound()
  }

  const skill = await getSkillByIdServer(skillId)

  if (!skill) {
    notFound()
  }

  const proficiency = getProficiencyDescription(skill.level)

  return (
    <div className='space-y-8'>
      {/* Header */}
      <DashboardPageHeader
        title={skill.name}
        description={`Skill details and proficiency information for ${skill.name}`}
      />

      {/* Navigation */}
      <div className='flex items-center justify-between'>
        <Button variant='outline' asChild>
          <Link href='/dashboard/skills'>
            <ArrowLeft className='mr-2 h-4 w-4' />
            Back to Skills
          </Link>
        </Button>

        <div className='flex gap-2'>
          <EditSkillDialog skill={skill}>
            <Button variant='stellar'>
              <Edit className='mr-2 h-4 w-4' />
              Edit Skill
            </Button>
          </EditSkillDialog>
        </div>
      </div>

      {/* Skill Overview Card */}
      <Card className='glass-nebula border-space-accent/30'>
        <CardHeader className='pb-4'>
          <div className='flex items-start justify-between'>
            <div className='space-y-3'>
              <div className='flex items-center gap-3'>
                <CardTitle className='text-2xl text-white'>
                  {skill.name}
                </CardTitle>
                <Badge
                  variant='secondary'
                  className='border-space-accent/30 bg-space-accent/20 text-space-accent'
                >
                  {skill.category}
                </Badge>
              </div>

              <div className='flex flex-wrap gap-4 text-sm'>
                <div className='flex items-center gap-2 text-white/70'>
                  <span className='font-medium'>Level:</span>
                  <span className={`font-semibold ${proficiency.color}`}>
                    {proficiency.label}
                  </span>
                </div>

                <div className='flex items-center gap-2 text-white/60'>
                  <span className='font-medium'>Last updated:</span>
                  <span>
                    {formatDistanceToNow(skill.updatedAt, { addSuffix: true })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Main Content Grid */}
      <div className='grid gap-8 lg:grid-cols-3'>
        {/* Left Column - Main Content */}
        <div className='space-y-8 lg:col-span-2'>
          {/* Proficiency Details */}
          <Card className='glass-cosmic border-white/10'>
            <CardHeader>
              <CardTitle className='text-white'>Proficiency Analysis</CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
              {/* Main Proficiency Display */}
              <div className='space-y-4 rounded-lg border border-white/10 bg-white/5 p-6 text-center'>
                <div className='flex items-center justify-center gap-4'>
                  <div className={`text-4xl font-bold ${proficiency.color}`}>
                    {skill.level}/5
                  </div>
                  <div className='text-center'>
                    <div
                      className={`text-lg font-semibold ${proficiency.color}`}
                    >
                      {proficiency.label}
                    </div>
                    <div className='text-sm text-white/60'>
                      Proficiency Level
                    </div>
                  </div>
                </div>
                <Progress value={(skill.level / 5) * 100} className='h-3' />
                <p className='mx-auto max-w-md text-sm leading-relaxed text-white/80'>
                  {proficiency.description}
                </p>
              </div>

              {/* Skill Metrics */}
              <div className='grid gap-4 md:grid-cols-2'>
                <div className='rounded-lg border border-white/10 bg-white/5 p-4'>
                  <div className='mb-2 flex items-center gap-2'>
                    <BarChart3 className='text-space-accent h-4 w-4' />
                    <span className='text-sm font-medium text-white/90'>
                      Category
                    </span>
                  </div>
                  <p className='font-semibold text-white'>{skill.category}</p>
                </div>

                <div className='rounded-lg border border-white/10 bg-white/5 p-4'>
                  <div className='mb-2 flex items-center gap-2'>
                    <Star className='h-4 w-4 text-yellow-400' />
                    <span className='text-sm font-medium text-white/90'>
                      Display Order
                    </span>
                  </div>
                  <p className='font-semibold text-white'>
                    Position {skill.order}
                  </p>
                </div>

                <div className='rounded-lg border border-white/10 bg-white/5 p-4'>
                  <div className='mb-2 flex items-center gap-2'>
                    <Calendar className='h-4 w-4 text-blue-400' />
                    <span className='text-sm font-medium text-white/90'>
                      Added
                    </span>
                  </div>
                  <p className='font-semibold text-white'>
                    {formatDistanceToNow(skill.createdAt, { addSuffix: true })}
                  </p>
                </div>

                <div className='rounded-lg border border-white/10 bg-white/5 p-4'>
                  <div className='mb-2 flex items-center gap-2'>
                    <Target className='h-4 w-4 text-green-400' />
                    <span className='text-sm font-medium text-white/90'>
                      Status
                    </span>
                  </div>
                  <Badge
                    variant={skill.isActive ? 'default' : 'secondary'}
                    className='font-semibold'
                  >
                    {skill.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Sidebar */}
        <div className='space-y-6'>
          {/* Quick Stats */}
          <Card className='glass-cosmic border-white/10'>
            <CardHeader>
              <CardTitle className='text-white'>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-3'>
                <span className='text-sm font-medium text-white/70'>
                  Proficiency
                </span>
                <span className={`text-lg font-bold ${proficiency.color}`}>
                  {skill.level}/5
                </span>
              </div>

              <div className='flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-3'>
                <span className='text-sm font-medium text-white/70'>Level</span>
                <span className={`text-sm font-semibold ${proficiency.color}`}>
                  {proficiency.label}
                </span>
              </div>

              <div className='flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-3'>
                <span className='text-sm font-medium text-white/70'>
                  Category
                </span>
                <span className='text-sm font-semibold text-white'>
                  {skill.category}
                </span>
              </div>

              <div className='flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-3'>
                <span className='text-sm font-medium text-white/70'>
                  Percentage
                </span>
                <span className={`text-sm font-semibold ${proficiency.color}`}>
                  {Math.round(skill.level)}%
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Skill Performance */}
          <Card className='glass-cosmic border-white/10'>
            <CardHeader>
              <CardTitle className='text-white'>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='rounded-lg border border-white/10 bg-white/5 p-4 text-center'>
                <div className={`text-2xl font-bold ${proficiency.color} mb-1`}>
                  {Math.round(skill.level)}%
                </div>
                <div className='text-xs text-white/60'>Overall Proficiency</div>
              </div>

              <div className='space-y-2'>
                <div className='flex justify-between text-xs'>
                  <span className='text-white/70'>Progress to Expert</span>
                  <span className='text-white/60'>
                    {Math.round(((5 - skill.level) / 5) * 100)}% remaining
                  </span>
                </div>
                <Progress value={(skill.level / 5) * 100} className='h-2' />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
