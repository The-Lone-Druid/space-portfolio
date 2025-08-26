import { DashboardPageHeader } from '@/components/dashboard/page-header'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
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

interface SkillPageProps {
  params: Promise<{
    id: string
  }>
}

// Helper function to get proficiency level description
function getProficiencyDescription(level: number) {
  if (level >= 90)
    return {
      label: 'Expert',
      color: 'text-green-400',
      description:
        'Highly proficient with deep expertise and ability to mentor others',
    }
  if (level >= 75)
    return {
      label: 'Advanced',
      color: 'text-blue-400',
      description:
        'Strong proficiency with ability to handle complex tasks independently',
    }
  if (level >= 50)
    return {
      label: 'Intermediate',
      color: 'text-orange-400',
      description:
        'Good understanding with moderate experience and growing confidence',
    }
  return {
    label: 'Beginner',
    color: 'text-red-400',
    description:
      'Basic understanding with limited experience but eager to learn',
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
    <div className='space-y-6'>
      {/* Header */}
      <DashboardPageHeader
        title={skill.name}
        description={`Skill details and proficiency information for ${skill.name}`}
      />

      {/* Back Button */}
      <Button variant='link' asChild>
        <Link href='/dashboard/skills'>
          <ArrowLeft className='mr-2 h-4 w-4' />
          Back to Skills
        </Link>
      </Button>

      {/* Skill Details */}
      <div className='grid gap-6 lg:grid-cols-3'>
        {/* Main Skill Info */}
        <div className='lg:col-span-2'>
          <Card className='glass-nebula border-space-accent/30'>
            <CardHeader>
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
                  <CardDescription className='text-white/60'>
                    Last updated:{' '}
                    {formatDistanceToNow(skill.updatedAt, { addSuffix: true })}
                  </CardDescription>
                </div>
                <Button size='sm' variant='stellar'>
                  <Edit className='mr-2 h-4 w-4' />
                  Edit Skill
                </Button>
              </div>
            </CardHeader>
            <CardContent className='space-y-6'>
              {/* Proficiency Section */}
              <div>
                <h3 className='mb-4 text-lg font-semibold text-white'>
                  Proficiency Level
                </h3>
                <div className='space-y-4'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                      <div
                        className={`text-2xl font-bold ${proficiency.color}`}
                      >
                        {skill.level}%
                      </div>
                      <div>
                        <div
                          className={`text-sm font-semibold ${proficiency.color}`}
                        >
                          {proficiency.label}
                        </div>
                      </div>
                    </div>
                    <div className='flex items-center gap-2'>
                      <Target className='text-space-gold h-5 w-5' />
                      <span className='text-sm text-white/70'>Proficiency</span>
                    </div>
                  </div>
                  <Progress value={skill.level} className='h-3' />
                  <p className='text-sm text-white/70'>
                    {proficiency.description}
                  </p>
                </div>
              </div>

              {/* Additional Details */}
              <div className='grid gap-4 md:grid-cols-2'>
                <div className='space-y-2'>
                  <div className='flex items-center gap-2 text-sm font-medium text-white/90'>
                    <BarChart3 className='h-4 w-4' />
                    Category
                  </div>
                  <p className='text-white/70'>{skill.category}</p>
                </div>

                <div className='space-y-2'>
                  <div className='flex items-center gap-2 text-sm font-medium text-white/90'>
                    <Star className='h-4 w-4' />
                    Display Order
                  </div>
                  <p className='text-white/70'>Position {skill.order}</p>
                </div>

                <div className='space-y-2'>
                  <div className='flex items-center gap-2 text-sm font-medium text-white/90'>
                    <Calendar className='h-4 w-4' />
                    Added
                  </div>
                  <p className='text-white/70'>
                    {formatDistanceToNow(skill.createdAt, { addSuffix: true })}
                  </p>
                </div>

                <div className='space-y-2'>
                  <div className='flex items-center gap-2 text-sm font-medium text-white/90'>
                    <Target className='h-4 w-4' />
                    Status
                  </div>
                  <Badge variant={skill.isActive ? 'default' : 'secondary'}>
                    {skill.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className='space-y-6'>
          {/* Quick Stats */}
          <Card className='glass-nebula border-space-accent/30'>
            <CardHeader>
              <CardTitle className='text-white'>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-white/70'>Proficiency</span>
                <span className={`font-semibold ${proficiency.color}`}>
                  {skill.level}%
                </span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-white/70'>Level</span>
                <span className={`text-sm font-medium ${proficiency.color}`}>
                  {proficiency.label}
                </span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-white/70'>Category</span>
                <span className='text-sm text-white'>{skill.category}</span>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card className='glass-nebula border-space-accent/30'>
            <CardHeader>
              <CardTitle className='text-white'>Actions</CardTitle>
            </CardHeader>
            <CardContent className='space-y-3'>
              <Button variant='stellar' className='w-full'>
                <Edit className='mr-2 h-4 w-4' />
                Edit Skill
              </Button>
              <Button variant='link' className='w-full' asChild>
                <Link href='/dashboard/skills'>
                  <ArrowLeft className='mr-2 h-4 w-4' />
                  Back to Skills
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
