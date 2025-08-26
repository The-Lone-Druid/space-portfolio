import { DashboardPageHeader } from '@/components/dashboard/page-header'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function AdminDashboardLoading() {
  return (
    <div className='space-y-6'>
      {/* Header skeleton */}
      <DashboardPageHeader
        title='Admin Dashboard'
        description='Loading administrative controls and system monitoring...'
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
                  <Skeleton className='h-6 w-16 bg-white/20' />
                </div>
                <Skeleton className='h-8 w-8 bg-white/20' />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tools grid skeleton */}
      <div className='grid gap-6 md:grid-cols-2'>
        {Array.from({ length: 2 }).map((_, i) => (
          <Card key={i} className='glass-nebula border-space-accent/30'>
            <CardHeader>
              <div className='flex items-center gap-2'>
                <Skeleton className='h-5 w-5 bg-white/20' />
                <Skeleton className='h-6 w-32 bg-white/20' />
              </div>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <Skeleton className='h-4 w-full bg-white/20' />

                <div className='space-y-2'>
                  {Array.from({ length: 3 }).map((_, j) => (
                    <div key={j} className='flex justify-between'>
                      <Skeleton className='h-4 w-24 bg-white/20' />
                      <Skeleton className='h-4 w-16 bg-white/20' />
                    </div>
                  ))}
                </div>

                <Skeleton className='h-10 w-full bg-white/20' />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
