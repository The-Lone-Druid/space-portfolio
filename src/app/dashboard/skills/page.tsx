import { DashboardPageHeader } from '@/components/dashboard/page-header'
import { CreateSkillDialog } from '@/components/dashboard/skill/create-skill-dialog'
import { SkillListClient } from '@/components/dashboard/skill/skill-list-client'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getSkillsServer, getSkillsStats } from '@/services/skills-service'
import { formatDistanceToNow } from 'date-fns'
import { BarChart3, Calendar, Plus, Star, Target } from 'lucide-react'

export default async function SkillsPage() {
  // Server-side data fetching
  const [skills, stats] = await Promise.all([
    getSkillsServer(),
    getSkillsStats(),
  ])

  return (
    <div className='space-y-6'>
      {/* Header */}
      <DashboardPageHeader
        title='Skills & Expertise'
        description='Manage your technical skills and proficiency levels across the galaxy of technologies.'
      />

      {/* Stats Overview */}
      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
        <Card className='glass-cosmic hover:border-space-accent/30 border-white/10 transition-colors'>
          <CardContent className='p-6'>
            <div className='flex items-center justify-between'>
              <div className='space-y-1'>
                <p className='text-sm font-medium text-white/70'>
                  Total Skills
                </p>
                <p className='text-2xl font-bold text-white'>
                  {stats.totalSkills}
                </p>
                <p className='text-xs text-white/60'>Across all categories</p>
              </div>
              <div className='bg-space-accent/20 rounded-full p-3'>
                <Target className='text-space-accent h-6 w-6' />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className='glass-cosmic hover:border-space-accent/30 border-white/10 transition-colors'>
          <CardContent className='p-6'>
            <div className='flex items-center justify-between'>
              <div className='space-y-1'>
                <p className='text-sm font-medium text-white/70'>Categories</p>
                <p className='text-2xl font-bold text-white'>
                  {stats.totalCategories}
                </p>
                <p className='text-xs text-white/60'>Technology domains</p>
              </div>
              <div className='rounded-full bg-blue-500/20 p-3'>
                <BarChart3 className='h-6 w-6 text-blue-400' />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className='glass-cosmic hover:border-space-accent/30 border-white/10 transition-colors'>
          <CardContent className='p-6'>
            <div className='flex items-center justify-between'>
              <div className='space-y-1'>
                <p className='text-sm font-medium text-white/70'>
                  Avg Proficiency
                </p>
                <p className='text-2xl font-bold text-white'>
                  {stats.avgProficiency}%
                </p>
                <p className='text-xs text-white/60'>Overall skill level</p>
              </div>
              <div className='rounded-full bg-yellow-500/20 p-3'>
                <Star className='h-6 w-6 text-yellow-400' />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className='glass-cosmic hover:border-space-accent/30 border-white/10 transition-colors'>
          <CardContent className='p-6'>
            <div className='flex items-center justify-between'>
              <div className='space-y-1'>
                <p className='text-sm font-medium text-white/70'>
                  Expert Level
                </p>
                <p className='text-2xl font-bold text-white'>
                  {stats.expertSkills}
                </p>
                <p className='text-xs text-white/60'>Level 5 skills</p>
              </div>
              <div className='rounded-full bg-green-500/20 p-3'>
                <Star className='h-6 w-6 text-green-400' />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Skills List */}
      <Card className='glass-cosmic border-white/10'>
        <CardHeader className='pb-4'>
          <div className='flex items-center justify-between'>
            <div className='space-y-2'>
              <CardTitle className='text-xl text-white'>
                Technical Skills
              </CardTitle>
              <CardDescription className='text-white/70'>
                Your proficiency levels across different technologies and tools
              </CardDescription>
            </div>
            <CreateSkillDialog>
              <Button variant='stellar' size='lg'>
                <Plus className='mr-2 h-4 w-4' />
                Add Skill
              </Button>
            </CreateSkillDialog>
          </div>
          {stats.lastUpdated && (
            <div className='flex items-center gap-2 border-t border-white/10 pt-2 text-xs text-white/60'>
              <Calendar className='h-3 w-3' />
              <span>
                Last updated:{' '}
                {formatDistanceToNow(stats.lastUpdated, { addSuffix: true })}
              </span>
            </div>
          )}
        </CardHeader>
        <CardContent className='pt-2'>
          {skills.length === 0 ? (
            <div className='flex min-h-[300px] flex-col items-center justify-center rounded-lg border border-dashed border-white/20 bg-white/5 p-8 text-center'>
              <div className='mb-4 rounded-full bg-white/10 p-4'>
                <Target className='h-12 w-12 text-white/40' />
              </div>
              <h3 className='mb-2 text-xl font-semibold text-white'>
                No skills yet
              </h3>
              <p className='mb-6 max-w-md text-sm text-white/70'>
                Start building your skill portfolio by adding your first
                technical skill. Track your proficiency and growth across
                different technologies.
              </p>
              <CreateSkillDialog>
                <Button variant='stellar' size='lg'>
                  <Plus className='mr-2 h-4 w-4' />
                  Add Your First Skill
                </Button>
              </CreateSkillDialog>
            </div>
          ) : (
            <SkillListClient skills={skills} />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
