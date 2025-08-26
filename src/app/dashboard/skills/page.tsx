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
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <Card className='glass-nebula border-space-accent/30'>
          <CardContent className='p-4'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-white/70'>Total Skills</p>
                <p className='font-semibold text-white'>{stats.totalSkills}</p>
              </div>
              <Target className='text-space-gold h-5 w-5' />
            </div>
          </CardContent>
        </Card>

        <Card className='glass-nebula border-space-accent/30'>
          <CardContent className='p-4'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-white/70'>Categories</p>
                <p className='font-semibold text-white'>
                  {stats.totalCategories}
                </p>
              </div>
              <BarChart3 className='text-space-gold h-5 w-5' />
            </div>
          </CardContent>
        </Card>

        <Card className='glass-nebula border-space-accent/30'>
          <CardContent className='p-4'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-white/70'>Avg Proficiency</p>
                <p className='font-semibold text-white'>
                  {stats.avgProficiency}%
                </p>
              </div>
              <Star className='text-space-gold h-5 w-5' />
            </div>
          </CardContent>
        </Card>

        <Card className='glass-nebula border-space-accent/30'>
          <CardContent className='p-4'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-white/70'>Expert Level</p>
                <p className='font-semibold text-white'>{stats.expertSkills}</p>
              </div>
              <Star className='text-space-gold h-5 w-5' />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Skills List */}
      <Card className='glass-nebula border-space-accent/30'>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <div>
              <CardTitle className='text-white'>Technical Skills</CardTitle>
              <CardDescription className='text-white/70'>
                Your proficiency levels across different technologies and tools
              </CardDescription>
            </div>
            <CreateSkillDialog>
              <Button variant='cosmic'>
                <Plus className='mr-2 h-4 w-4' />
                Add Skill
              </Button>
            </CreateSkillDialog>
          </div>
          {stats.lastUpdated && (
            <div className='flex items-center gap-2 text-xs text-white/60'>
              <Calendar className='h-3 w-3' />
              <span>
                Last updated:{' '}
                {formatDistanceToNow(stats.lastUpdated, { addSuffix: true })}
              </span>
            </div>
          )}
        </CardHeader>
        <CardContent>
          {skills.length === 0 ? (
            <div className='flex min-h-[200px] flex-col items-center justify-center rounded-lg border border-dashed border-white/20 bg-white/5 p-8 text-center'>
              <Target className='mb-4 h-12 w-12 text-white/40' />
              <h3 className='mb-2 text-lg font-semibold text-white'>
                No skills yet
              </h3>
              <p className='mb-4 text-sm text-white/70'>
                Start building your skill portfolio by adding your first
                technical skill.
              </p>
              <CreateSkillDialog>
                <Button variant='space'>
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
