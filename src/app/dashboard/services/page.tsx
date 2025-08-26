import { DashboardPageHeader } from '@/components/dashboard/page-header'
import { ServiceListClient } from '@/components/dashboard/service/service-list-client'
import { Card, CardContent } from '@/components/ui/card'
import {
  getServicesServer,
  getServicesStats,
} from '@/services/services-service'
import { formatDistanceToNow } from 'date-fns'
import { Calendar, Eye, EyeOff, Package } from 'lucide-react'

export default async function ServicesPage() {
  const [services, stats] = await Promise.all([
    getServicesServer(),
    getServicesStats(),
  ])

  return (
    <div className='space-y-6'>
      {/* Header */}
      <DashboardPageHeader
        title='Services & Solutions'
        description='Manage your space technology services and client offerings across the cosmos.'
      />

      {/* Stats Overview */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <Card className='glass-nebula border-space-accent/30'>
          <CardContent className='p-4'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-white/70'>Total Services</p>
                <p className='font-semibold text-white'>
                  {stats.totalServices}
                </p>
              </div>
              <Package className='text-space-gold h-5 w-5' />
            </div>
          </CardContent>
        </Card>

        <Card className='glass-nebula border-space-accent/30'>
          <CardContent className='p-4'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-white/70'>Active Services</p>
                <p className='font-semibold text-white'>
                  {stats.activeServices}
                </p>
              </div>
              <Eye className='text-space-gold h-5 w-5' />
            </div>
          </CardContent>
        </Card>

        <Card className='glass-nebula border-space-accent/30'>
          <CardContent className='p-4'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-white/70'>Inactive Services</p>
                <p className='font-semibold text-white'>
                  {stats.inactiveServices}
                </p>
              </div>
              <EyeOff className='text-space-gold h-5 w-5' />
            </div>
          </CardContent>
        </Card>

        <Card className='glass-nebula border-space-accent/30'>
          <CardContent className='p-4'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-white/70'>Last Updated</p>
                <p className='font-semibold text-white'>
                  {stats.lastUpdated
                    ? formatDistanceToNow(stats.lastUpdated, {
                        addSuffix: true,
                      })
                    : 'Never'}
                </p>
              </div>
              <Calendar className='text-space-gold h-5 w-5' />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Services List */}
      <ServiceListClient services={services} />
    </div>
  )
}
