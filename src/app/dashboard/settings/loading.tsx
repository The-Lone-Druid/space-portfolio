import { DashboardPageHeader } from '@/components/dashboard/page-header'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function SettingsLoading() {
  return (
    <>
      <DashboardPageHeader
        title='Settings'
        description='Manage your site settings and configuration'
        isLoading={true}
      />
      <div className='mt-6 space-y-6'>
        {/* Stats Overview Skeleton */}
        <div className='grid gap-4 md:grid-cols-4'>
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className='glass-nebula border-space-accent/30'>
              <CardContent className='p-4'>
                <div className='flex items-center justify-between'>
                  <div className='space-y-2'>
                    <Skeleton className='h-4 w-20 bg-white/20' />
                    <Skeleton className='h-8 w-12 bg-white/20' />
                  </div>
                  <Skeleton className='h-8 w-8 rounded bg-white/20' />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Type Breakdown Skeleton */}
        <Card className='glass-nebula border-space-accent/30'>
          <CardContent className='p-6'>
            <Skeleton className='mb-4 h-6 w-32 bg-white/20' />
            <div className='flex flex-wrap gap-3'>
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className='h-8 w-20 bg-white/20' />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Settings List Skeleton */}
        <Card className='glass-nebula border-space-accent/30'>
          <CardContent className='space-y-6 p-6'>
            {/* Create Button Skeleton */}
            <div className='flex justify-end'>
              <Skeleton className='h-10 w-32 bg-white/20' />
            </div>

            {/* Search and Filters Skeleton */}
            <div className='space-y-4'>
              <Skeleton className='h-10 w-full bg-white/20' />
              <div className='flex flex-wrap gap-4'>
                <div className='space-y-2'>
                  <Skeleton className='h-4 w-24 bg-white/20' />
                  <div className='flex flex-wrap gap-2'>
                    {Array.from({ length: 3 }).map((_, i) => (
                      <Skeleton key={i} className='h-8 w-20 bg-white/20' />
                    ))}
                  </div>
                </div>
                <div className='space-y-2'>
                  <Skeleton className='h-4 w-20 bg-white/20' />
                  <div className='flex flex-wrap gap-2'>
                    {Array.from({ length: 4 }).map((_, i) => (
                      <Skeleton key={i} className='h-8 w-16 bg-white/20' />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Results Summary Skeleton */}
            <Skeleton className='h-4 w-40 bg-white/20' />

            {/* Settings Grid Skeleton */}
            <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
              {Array.from({ length: 6 }).map((_, i) => (
                <Card
                  key={i}
                  className='glass-nebula hover:border-space-accent/50 border-white/10 transition-all'
                >
                  <CardContent className='p-4'>
                    <div className='space-y-4'>
                      {/* Header */}
                      <div className='space-y-2'>
                        <Skeleton className='h-5 w-32 bg-white/20' />
                        <div className='flex gap-2'>
                          <Skeleton className='h-6 w-16 bg-white/20' />
                          <Skeleton className='h-6 w-20 bg-white/20' />
                        </div>
                      </div>

                      {/* Value */}
                      <div className='space-y-2'>
                        <Skeleton className='h-4 w-12 bg-white/20' />
                        <Skeleton className='h-12 w-full bg-white/20' />
                      </div>

                      {/* Description */}
                      <div className='space-y-2'>
                        <Skeleton className='h-4 w-20 bg-white/20' />
                        <Skeleton className='h-8 w-full bg-white/20' />
                      </div>

                      {/* Actions */}
                      <div className='flex gap-2 pt-2'>
                        <Skeleton className='h-8 w-8 bg-white/20' />
                        <Skeleton className='h-8 w-8 bg-white/20' />
                        <Skeleton className='h-8 w-8 bg-white/20' />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
