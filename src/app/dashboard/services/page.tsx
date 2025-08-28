import { DashboardPageHeader } from '@/components/dashboard/page-header'
import { CreateServiceDialog } from '@/components/dashboard/service/create-service-dialog'
import { ServiceListClient } from '@/components/dashboard/service/service-list-client'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  getServicesServer,
  getServicesStats,
} from '@/services/services-service'
import { formatDistanceToNow } from 'date-fns'
import { Calendar, Eye, EyeOff, Package, Plus } from 'lucide-react'

export default async function ServicesPage() {
  const [services, stats] = await Promise.all([
    getServicesServer(),
    getServicesStats(),
  ])

  return (
    <div className='space-y-8'>
      {/* Header */}
      <DashboardPageHeader
        title='Services & Solutions'
        description='Manage your space technology services and client offerings across the cosmos.'
      />

      {/* Stats Overview */}
      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
        <Card className='glass-cosmic border-white/10'>
          <CardContent className='p-6'>
            <div className='flex items-center justify-between'>
              <div className='space-y-1'>
                <p className='text-sm font-medium text-white/70'>
                  Total Services
                </p>
                <p className='text-2xl font-bold text-white'>
                  {stats.totalServices}
                </p>
              </div>
              <div className='bg-space-accent/20 rounded-full p-3'>
                <Package className='text-space-accent h-5 w-5' />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className='glass-cosmic border-white/10'>
          <CardContent className='p-6'>
            <div className='flex items-center justify-between'>
              <div className='space-y-1'>
                <p className='text-sm font-medium text-white/70'>
                  Active Services
                </p>
                <p className='text-2xl font-bold text-white'>
                  {stats.activeServices}
                </p>
              </div>
              <div className='rounded-full bg-green-400/20 p-3'>
                <Eye className='h-5 w-5 text-green-400' />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className='glass-cosmic border-white/10'>
          <CardContent className='p-6'>
            <div className='flex items-center justify-between'>
              <div className='space-y-1'>
                <p className='text-sm font-medium text-white/70'>
                  Inactive Services
                </p>
                <p className='text-2xl font-bold text-white'>
                  {stats.inactiveServices}
                </p>
              </div>
              <div className='rounded-full bg-gray-400/20 p-3'>
                <EyeOff className='h-5 w-5 text-gray-400' />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className='glass-cosmic border-white/10'>
          <CardContent className='p-6'>
            <div className='flex items-center justify-between'>
              <div className='space-y-1'>
                <p className='text-sm font-medium text-white/70'>
                  Last Updated
                </p>
                <p className='text-2xl font-bold text-white'>
                  {stats.lastUpdated
                    ? formatDistanceToNow(stats.lastUpdated, {
                        addSuffix: true,
                      })
                    : 'Never'}
                </p>
              </div>
              <div className='rounded-full bg-blue-400/20 p-3'>
                <Calendar className='h-5 w-5 text-blue-400' />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Services List */}
      <Card className='glass-cosmic border-white/10'>
        <CardHeader className='pb-4'>
          <div className='flex items-center justify-between'>
            <div className='space-y-2'>
              <CardTitle className='text-xl text-white'>
                Services & Solutions
              </CardTitle>
              <CardDescription className='text-white/70'>
                Your professional offerings and client solutions across the
                digital cosmos
              </CardDescription>
            </div>
            <CreateServiceDialog
              trigger={
                <Button variant='stellar' size='lg'>
                  <Plus className='mr-2 h-4 w-4' />
                  Add Service
                </Button>
              }
            />
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
          {services.length === 0 ? (
            <div className='flex min-h-[300px] flex-col items-center justify-center rounded-lg border border-dashed border-white/20 bg-white/5 p-8 text-center'>
              <div className='mb-4 rounded-full bg-white/10 p-4'>
                <Package className='h-12 w-12 text-white/40' />
              </div>
              <h3 className='mb-2 text-xl font-semibold text-white'>
                No services yet
              </h3>
              <p className='mb-6 max-w-md text-sm text-white/70'>
                Start building your service portfolio by adding your first
                professional offering. Showcase your capabilities and solutions.
              </p>
              <CreateServiceDialog
                trigger={
                  <Button variant='stellar' size='lg'>
                    <Plus className='mr-2 h-4 w-4' />
                    Add Your First Service
                  </Button>
                }
              />
            </div>
          ) : (
            <ServiceListClient services={services} />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
