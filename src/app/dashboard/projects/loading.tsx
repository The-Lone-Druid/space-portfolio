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
import { Calendar, FolderOpen, Plus, Star } from 'lucide-react'

export default function ProjectsLoading() {
  return (
    <div className='space-y-6'>
      {/* Header */}
      <DashboardPageHeader
        title='Projects'
        description='Manage your projects and collaborations across the digital cosmos.'
        isLoading={true}
      />

      {/* Stats Overview Skeleton */}
      <div className='grid gap-4 md:grid-cols-3'>
        <Card className='glass-nebula border-space-accent/30'>
          <CardContent className='p-4'>
            <div className='flex items-center justify-between'>
              <div className='space-y-2'>
                <p className='text-sm text-white/70'>Total Projects</p>
                <Skeleton className='h-6 w-8' />
              </div>
              <FolderOpen className='text-space-gold h-5 w-5 opacity-50' />
            </div>
          </CardContent>
        </Card>

        <Card className='glass-nebula border-space-accent/30'>
          <CardContent className='p-4'>
            <div className='flex items-center justify-between'>
              <div className='space-y-2'>
                <p className='text-sm text-white/70'>Featured Projects</p>
                <Skeleton className='h-6 w-8' />
              </div>
              <Star className='text-space-gold h-5 w-5 opacity-50' />
            </div>
          </CardContent>
        </Card>

        <Card className='glass-nebula border-space-accent/30'>
          <CardContent className='p-4'>
            <div className='flex items-center justify-between'>
              <div className='space-y-2'>
                <p className='text-sm text-white/70'>Last Updated</p>
                <Skeleton className='h-6 w-16' />
              </div>
              <Calendar className='text-space-gold h-5 w-5 opacity-50' />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Projects List Skeleton */}
      <Card className='glass-nebula border-space-accent/30'>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <div>
              <CardTitle className='text-white'>Project Portfolio</CardTitle>
              <CardDescription className='text-white/70'>
                Your digital creations and contributions to the cosmos
              </CardDescription>
            </div>
            <Button variant='stellar' disabled>
              <Plus className='mr-2 h-4 w-4' />
              Add Project
            </Button>
          </div>
        </CardHeader>
        <CardContent className='space-y-4'>
          {/* Search and Filter Controls Skeleton */}
          <div className='space-y-4'>
            {/* Search Input Skeleton */}
            <div className='relative'>
              <Skeleton className='h-10 w-full' />
            </div>

            {/* Skills Filter Skeleton */}
            <div className='space-y-2'>
              <div className='text-sm text-white/70'>Filter by skills:</div>
              <div className='flex flex-wrap gap-2'>
                <Skeleton className='h-8 w-16' />
                {[1, 2, 3, 4, 5].map(index => (
                  <Skeleton key={index} className='h-8 w-20' />
                ))}
              </div>
            </div>
          </div>

          {/* Project Cards Skeleton */}
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
            {[1, 2, 3, 4, 5, 6].map(index => (
              <Card
                key={index}
                className='glass-nebula border-space-accent/30 transition-all duration-300'
              >
                <CardHeader className='pb-3'>
                  <div className='flex items-start justify-between'>
                    <div className='flex-1 space-y-2'>
                      <div className='flex items-center gap-2'>
                        <Skeleton className='h-6 w-32' />
                        {index <= 2 && (
                          <Skeleton className='h-5 w-16 rounded-full' />
                        )}
                      </div>
                      <Skeleton className='h-4 w-24' />
                    </div>
                    <div className='flex gap-2'>
                      <Skeleton className='h-8 w-8' />
                      <Skeleton className='h-8 w-8' />
                      <Skeleton className='h-8 w-8' />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className='space-y-4'>
                  {/* Description */}
                  <div className='space-y-2'>
                    <Skeleton className='h-4 w-full' />
                    <Skeleton className='h-4 w-full' />
                    <Skeleton className='h-4 w-3/4' />
                  </div>

                  {/* Links */}
                  <div className='flex gap-2'>
                    <Skeleton className='h-8 w-20' />
                    <Skeleton className='h-8 w-24' />
                  </div>

                  {/* Skills */}
                  <div className='space-y-2'>
                    <Skeleton className='h-4 w-16' />
                    <div className='flex flex-wrap gap-1'>
                      <Skeleton className='h-6 w-16' />
                      <Skeleton className='h-6 w-20' />
                      <Skeleton className='h-6 w-14' />
                    </div>
                  </div>

                  {/* Tasks */}
                  <div className='space-y-2'>
                    <Skeleton className='h-4 w-20' />
                    <div className='space-y-1'>
                      <Skeleton className='h-4 w-full' />
                      <Skeleton className='h-4 w-4/5' />
                    </div>
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
        </CardContent>
      </Card>
    </div>
  )
}
