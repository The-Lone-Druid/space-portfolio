import { DashboardPageHeader } from '@/components/dashboard/page-header'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { Calendar, Eye, EyeOff, Package, Plus, Search, X } from 'lucide-react'

export default function ServicesLoading() {
  return (
    <div className='space-y-6'>
      {/* Header */}
      <DashboardPageHeader
        title='Services & Solutions'
        description='Manage your space technology services and client offerings across the cosmos.'
        isLoading={true}
      />

      {/* Stats Overview Skeleton */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <Card className='glass-nebula border-space-accent/30'>
          <CardContent className='p-4'>
            <div className='flex items-center justify-between'>
              <div className='space-y-2'>
                <p className='text-sm text-white/70'>Total Services</p>
                <Skeleton className='h-6 w-8' />
              </div>
              <Package className='text-space-gold h-5 w-5 opacity-50' />
            </div>
          </CardContent>
        </Card>

        <Card className='glass-nebula border-space-accent/30'>
          <CardContent className='p-4'>
            <div className='flex items-center justify-between'>
              <div className='space-y-2'>
                <p className='text-sm text-white/70'>Active Services</p>
                <Skeleton className='h-6 w-8' />
              </div>
              <Eye className='text-space-gold h-5 w-5 opacity-50' />
            </div>
          </CardContent>
        </Card>

        <Card className='glass-nebula border-space-accent/30'>
          <CardContent className='p-4'>
            <div className='flex items-center justify-between'>
              <div className='space-y-2'>
                <p className='text-sm text-white/70'>Inactive Services</p>
                <Skeleton className='h-6 w-8' />
              </div>
              <EyeOff className='text-space-gold h-5 w-5 opacity-50' />
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

      {/* Services List Skeleton */}
      <Card className='glass-nebula border-space-accent/30'>
        <CardContent className='space-y-6 p-6'>
          {/* Add Service Action Skeleton */}
          <div className='flex justify-end'>
            <Button variant='cosmic' disabled>
              <Plus className='mr-2 h-4 w-4' />
              Add Service
            </Button>
          </div>

          {/* Search and Filter Controls Skeleton */}
          <div className='space-y-4'>
            {/* Search Input Skeleton */}
            <div className='relative'>
              <Search className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-white/50 opacity-50' />
              <Input
                placeholder='Search services by name or description...'
                disabled
                className='border-white/20 bg-white/5 pl-10 text-white opacity-50 placeholder:text-white/50'
              />
              <X className='absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-white/50 opacity-50' />
            </div>

            {/* Status Filter Skeleton */}
            <div className='space-y-2'>
              <div className='text-sm text-white/70'>Filter by status:</div>
              <div className='flex flex-wrap gap-2'>
                <Skeleton className='h-8 w-24' />
                <Skeleton className='h-8 w-20' />
                <Skeleton className='h-8 w-22' />
              </div>
            </div>
          </div>

          {/* Results Summary Skeleton */}
          <div className='text-sm text-white/70'>
            <Skeleton className='inline-block h-4 w-32' />
          </div>

          {/* Services Grid Skeleton */}
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
            {[1, 2, 3, 4, 5, 6].map(index => (
              <Card
                key={index}
                className='glass-nebula border-white/10 transition-all'
              >
                <CardHeader className='pb-3'>
                  <div className='flex items-start justify-between'>
                    <div className='flex-1 space-y-2'>
                      <CardTitle className='text-lg text-white'>
                        <Skeleton className='h-6 w-32' />
                      </CardTitle>
                      <div className='flex items-center gap-2'>
                        <Skeleton className='h-6 w-16 rounded' />
                        <Skeleton className='h-6 w-20 rounded' />
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className='space-y-4'>
                  {/* Description Skeleton */}
                  <CardDescription className='text-white/70'>
                    <div className='space-y-2'>
                      <Skeleton className='h-4 w-full' />
                      <Skeleton className='h-4 w-full' />
                      <Skeleton className='h-4 w-3/4' />
                    </div>
                  </CardDescription>

                  {/* Icon Section Skeleton */}
                  <div className='text-sm text-white/60'>
                    <div className='flex items-center gap-2'>
                      <span className='font-medium'>Icon:</span>
                      <Skeleton className='h-4 w-16' />
                    </div>
                  </div>

                  {/* Action Buttons Skeleton */}
                  <div className='flex gap-2 pt-2'>
                    <Skeleton className='h-8 w-8' />
                    <Skeleton className='h-8 w-8' />
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
