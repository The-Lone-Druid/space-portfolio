import { DashboardPageHeader } from '@/components/dashboard/page-header'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function SecurityDashboardLoading() {
  return (
    <div className='space-y-6'>
      {/* Header skeleton */}
      <DashboardPageHeader
        title='Security Dashboard'
        description='Loading security monitoring data...'
        isLoading={true}
      />

      {/* Stats skeleton */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className='glass-nebula border-space-accent/30'>
            <CardContent className='p-4'>
              <div className='flex items-center justify-between'>
                <div className='space-y-2'>
                  <Skeleton className='h-4 w-24 bg-white/20' />
                  <Skeleton className='h-6 w-8 bg-white/20' />
                  <Skeleton className='h-3 w-20 bg-white/20' />
                </div>
                <Skeleton className='h-5 w-5 bg-white/20' />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main content skeleton */}
      <div className='grid gap-6 lg:grid-cols-2'>
        {/* Audit logs skeleton */}
        <Card className='glass-nebula border-space-accent/30'>
          <CardHeader>
            <div className='flex items-center gap-2'>
              <Skeleton className='h-5 w-5 bg-white/20' />
              <Skeleton className='h-6 w-32 bg-white/20' />
              <Skeleton className='h-5 w-12 bg-white/20' />
            </div>
            <Skeleton className='h-4 w-48 bg-white/20' />
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className='flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-3'
                >
                  <div className='flex items-center gap-3'>
                    <Skeleton className='h-8 w-8 rounded-full bg-white/20' />
                    <div className='space-y-1'>
                      <Skeleton className='h-4 w-32 bg-white/20' />
                      <Skeleton className='h-3 w-24 bg-white/20' />
                    </div>
                  </div>
                  <Skeleton className='h-3 w-16 bg-white/20' />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Lockout status skeleton */}
        <Card className='glass-nebula border-red-400/30 bg-red-400/5'>
          <CardHeader>
            <div className='flex items-center gap-2'>
              <Skeleton className='h-5 w-5 bg-white/20' />
              <Skeleton className='h-6 w-32 bg-white/20' />
              <Skeleton className='h-5 w-12 bg-white/20' />
            </div>
            <Skeleton className='h-4 w-56 bg-white/20' />
          </CardHeader>
          <CardContent>
            <div className='space-y-3'>
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className='flex items-center justify-between rounded-lg border border-red-400/20 bg-red-400/10 p-3'
                >
                  <div className='space-y-1'>
                    <div className='flex items-center gap-2'>
                      <Skeleton className='h-4 w-32 bg-white/20' />
                      <Skeleton className='h-4 w-16 bg-white/20' />
                    </div>
                    <Skeleton className='h-3 w-48 bg-white/20' />
                  </div>
                  <Skeleton className='h-8 w-16 bg-white/20' />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
