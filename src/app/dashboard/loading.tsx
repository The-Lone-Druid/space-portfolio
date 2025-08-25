import { DashboardPageHeader } from '@/components/dashboard/page-header'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function DashboardLoading() {
  return (
    <div className='space-y-6'>
      {/* Header */}
      <DashboardPageHeader
        title='Dashboard Overview'
        description='Loading your portfolio insights...'
        isLoading={true}
      />

      {/* Portfolio Completion Skeleton */}
      <Card className='glass-nebula border-space-accent/30'>
        <CardContent className='p-6'>
          <div className='mb-4 flex items-center justify-between'>
            <Skeleton className='h-6 w-48 bg-white/20' />
            <Skeleton className='h-6 w-20 bg-white/20' />
          </div>
          <div className='space-y-4'>
            <div className='flex items-center justify-between'>
              <Skeleton className='h-4 w-32 bg-white/20' />
              <Skeleton className='h-4 w-12 bg-white/20' />
            </div>
            <Skeleton className='h-2 w-full bg-white/20' />
            <div className='grid gap-2'>
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className='flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-3'
                >
                  <div className='flex items-center gap-2'>
                    <Skeleton className='h-4 w-4 rounded-full bg-white/20' />
                    <Skeleton className='h-4 w-32 bg-white/20' />
                  </div>
                  <Skeleton className='h-4 w-12 bg-white/20' />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats Overview Skeleton */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className='glass-nebula border-space-accent/30'>
            <CardContent className='p-4'>
              <div className='flex items-center justify-between'>
                <div className='space-y-2'>
                  <Skeleton className='h-4 w-20 bg-white/20' />
                  <Skeleton className='h-8 w-12 bg-white/20' />
                  <Skeleton className='h-3 w-16 bg-white/20' />
                </div>
                <Skeleton className='h-12 w-12 rounded-full bg-white/20' />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid Skeleton */}
      <div className='grid gap-6 lg:grid-cols-3'>
        {/* Recent Activity Skeleton */}
        <Card className='glass-nebula border-space-accent/30 lg:col-span-2'>
          <CardContent className='p-6'>
            <div className='mb-4 flex items-center justify-between'>
              <Skeleton className='h-6 w-32 bg-white/20' />
              <Skeleton className='h-8 w-20 bg-white/20' />
            </div>
            <div className='space-y-4'>
              <Skeleton className='h-4 w-24 bg-white/20' />
              <div className='space-y-2'>
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className='flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-3'
                  >
                    <div className='flex items-center gap-3'>
                      <Skeleton className='h-4 w-4 bg-white/20' />
                      <div className='space-y-1'>
                        <Skeleton className='h-4 w-32 bg-white/20' />
                        <Skeleton className='h-3 w-24 bg-white/20' />
                      </div>
                    </div>
                    <Skeleton className='h-6 w-6 bg-white/20' />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions Skeleton */}
        <Card className='glass-nebula border-space-accent/30'>
          <CardContent className='p-6'>
            <Skeleton className='mb-4 h-6 w-24 bg-white/20' />
            <div className='space-y-3'>
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className='h-16 w-full bg-white/20' />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Insights Skeleton */}
      <Card className='glass-nebula border-space-accent/30'>
        <CardContent className='p-6'>
          <Skeleton className='mb-4 h-6 w-48 bg-white/20' />
          <div className='space-y-4'>
            <div className='space-y-2'>
              <Skeleton className='h-4 w-24 bg-white/20' />
              <div className='grid gap-3'>
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className='flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-3'
                  >
                    <div className='flex-1'>
                      <Skeleton className='mb-1 h-4 w-32 bg-white/20' />
                      <Skeleton className='h-3 w-24 bg-white/20' />
                    </div>
                    <Skeleton className='h-4 w-12 bg-white/20' />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
