import { DashboardPageHeader } from '@/components/dashboard/page-header'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { BarChart3, Calendar, Plus, Star, Target } from 'lucide-react'

export default function SkillsLoading() {
  return (
    <div className='space-y-6'>
      {/* Header */}
      <DashboardPageHeader
        title='Skills & Expertise'
        description='Manage your technical skills and proficiency levels across the galaxy of technologies.'
        isLoading={true}
      />

      {/* Stats Overview Skeleton */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <Card className='glass-nebula border-space-accent/30'>
          <CardContent className='p-4'>
            <div className='flex items-center justify-between'>
              <div className='space-y-2'>
                <p className='text-sm text-white/70'>Total Skills</p>
                <Skeleton className='h-6 w-8' />
              </div>
              <Target className='text-space-gold h-5 w-5 opacity-50' />
            </div>
          </CardContent>
        </Card>

        <Card className='glass-nebula border-space-accent/30'>
          <CardContent className='p-4'>
            <div className='flex items-center justify-between'>
              <div className='space-y-2'>
                <p className='text-sm text-white/70'>Categories</p>
                <Skeleton className='h-6 w-8' />
              </div>
              <BarChart3 className='text-space-gold h-5 w-5 opacity-50' />
            </div>
          </CardContent>
        </Card>

        <Card className='glass-nebula border-space-accent/30'>
          <CardContent className='p-4'>
            <div className='flex items-center justify-between'>
              <div className='space-y-2'>
                <p className='text-sm text-white/70'>Avg Proficiency</p>
                <Skeleton className='h-6 w-12' />
              </div>
              <Star className='text-space-gold h-5 w-5 opacity-50' />
            </div>
          </CardContent>
        </Card>

        <Card className='glass-nebula border-space-accent/30'>
          <CardContent className='p-4'>
            <div className='flex items-center justify-between'>
              <div className='space-y-2'>
                <p className='text-sm text-white/70'>Expert Level</p>
                <Skeleton className='h-6 w-8' />
              </div>
              <Star className='text-space-gold h-5 w-5 opacity-50' />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Skills List Skeleton */}
      <Card className='glass-nebula border-space-accent/30'>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <div>
              <CardTitle className='text-white'>Technical Skills</CardTitle>
              <CardDescription className='text-white/70'>
                Your proficiency levels across different technologies and tools
              </CardDescription>
            </div>
            <Button variant='cosmic' disabled>
              <Plus className='mr-2 h-4 w-4' />
              Add Skill
            </Button>
          </div>
          <div className='flex items-center gap-2 text-xs text-white/60'>
            <Calendar className='h-3 w-3 opacity-50' />
            <span>
              Last updated: <Skeleton className='inline-block h-3 w-16' />
            </span>
          </div>
        </CardHeader>
        <CardContent className='space-y-6'>
          {/* Search and Filter Controls Skeleton */}
          <div className='space-y-4'>
            {/* Search Input Skeleton */}
            <div className='relative'>
              <Skeleton className='h-10 w-full' />
            </div>

            {/* Category Filter Skeleton */}
            <div className='space-y-2'>
              <div className='text-sm text-white/70'>Filter by category:</div>
              <div className='flex flex-wrap gap-2'>
                <Skeleton className='h-8 w-12' />
                {[1, 2, 3, 4, 5].map(index => (
                  <Skeleton
                    key={index}
                    className='h-8 w-20'
                    style={{ width: `${Math.random() * 40 + 60}px` }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Skills Grid Skeleton */}
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(index => (
              <Card
                key={index}
                className='glass-nebula border-space-accent/30 transition-all duration-300'
              >
                <CardHeader className='pb-3'>
                  <div className='flex items-start justify-between'>
                    <div className='flex-1 space-y-2'>
                      <div className='flex items-center gap-2'>
                        <Skeleton className='h-6 w-24' />
                        <Skeleton className='h-5 w-16 rounded-full' />
                      </div>
                      <Skeleton className='h-4 w-20' />
                    </div>
                    <div className='flex gap-2'>
                      <Skeleton className='h-8 w-8' />
                      <Skeleton className='h-8 w-8' />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className='space-y-4'>
                  {/* Proficiency Level */}
                  <div className='space-y-2'>
                    <div className='flex items-center justify-between'>
                      <span className='text-sm text-white/70'>Proficiency</span>
                      <div className='flex items-center gap-2'>
                        <Skeleton className='h-4 w-8' />
                        <Skeleton className='h-4 w-16' />
                      </div>
                    </div>
                    <Skeleton className='h-2 w-full rounded-full' />
                  </div>

                  {/* Category */}
                  <div className='flex items-center justify-between text-sm'>
                    <span className='text-white/70'>Category</span>
                    <Skeleton className='h-4 w-20' />
                  </div>

                  {/* Status */}
                  <div className='flex items-center justify-between text-sm'>
                    <span className='text-white/70'>Status</span>
                    <Skeleton className='h-5 w-14 rounded' />
                  </div>

                  {/* Footer */}
                  <div className='border-t border-white/10 pt-3'>
                    <div className='flex items-center justify-between text-xs'>
                      <Skeleton className='h-3 w-20' />
                      <Skeleton className='h-3 w-16' />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination Skeleton */}
          <div className='flex items-center justify-between border-t border-white/10 pt-4'>
            <Skeleton className='h-4 w-32' />
            <div className='flex gap-2'>
              <Skeleton className='h-8 w-20' />
              <Skeleton className='h-8 w-8' />
              <Skeleton className='h-8 w-8' />
              <Skeleton className='h-8 w-8' />
              <Skeleton className='h-8 w-20' />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
