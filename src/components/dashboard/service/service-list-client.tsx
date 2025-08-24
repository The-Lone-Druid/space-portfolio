'use client'

import { CreateServiceDialog } from '@/components/dashboard/service/create-service-dialog'
import { EditServiceDialog } from '@/components/dashboard/service/edit-service-dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { useServices } from '@/hooks/use-services'
import type { ServiceWithDetails } from '@/types'
import { Edit, Eye, EyeOff, Search, Trash2, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { toast } from 'sonner'

interface ServiceListClientProps {
  services: ServiceWithDetails[]
}

export function ServiceListClient({ services }: ServiceListClientProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<
    'all' | 'active' | 'inactive'
  >('all')
  const { deleteService, isLoading } = useServices()

  const filteredServices = useMemo(() => {
    let filtered = services

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        service =>
          service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          service.desc.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(service =>
        statusFilter === 'active' ? service.isActive : !service.isActive
      )
    }

    return filtered
  }, [services, searchTerm, statusFilter])

  const handleDeleteService = async (id: number, name: string) => {
    if (
      !confirm(
        `Are you sure you want to delete "${name}"? This action cannot be undone.`
      )
    ) {
      return
    }

    try {
      await deleteService(id)
      toast.success('Service deleted successfully')
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to delete service'
      )
    }
  }

  return (
    <Card className='glass-nebula border-space-accent/30'>
      <CardContent className='space-y-6 p-6'>
        {/* Add Service Action */}
        <div className='flex justify-end'>
          <CreateServiceDialog />
        </div>

        {/* Search and Filter Controls */}
        <div className='space-y-4'>
          {/* Search Input */}
          <div className='relative'>
            <Search className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-white/50' />
            <Input
              placeholder='Search services by name or description...'
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className='border-white/20 bg-white/5 pl-10 text-white placeholder:text-white/50'
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className='absolute top-1/2 right-3 -translate-y-1/2 text-white/50 hover:text-white'
              >
                <X className='h-4 w-4' />
              </button>
            )}
          </div>

          {/* Status Filter */}
          <div className='space-y-2'>
            <div className='text-sm text-white/70'>Filter by status:</div>
            <div className='flex flex-wrap gap-2'>
              <Button
                size='sm'
                variant={statusFilter === 'all' ? 'space' : 'link'}
                onClick={() => setStatusFilter('all')}
              >
                All Services
              </Button>
              <Button
                size='sm'
                variant={statusFilter === 'active' ? 'space' : 'link'}
                onClick={() => setStatusFilter('active')}
              >
                <Eye className='mr-1 h-3 w-3' />
                Active
              </Button>
              <Button
                size='sm'
                variant={statusFilter === 'inactive' ? 'space' : 'link'}
                onClick={() => setStatusFilter('inactive')}
              >
                <EyeOff className='mr-1 h-3 w-3' />
                Inactive
              </Button>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className='text-sm text-white/70'>
          {filteredServices.length === services.length
            ? `Showing all ${services.length} services`
            : `Showing ${filteredServices.length} of ${services.length} services`}
        </div>

        {/* Services Grid */}
        {filteredServices.length === 0 ? (
          <div className='flex min-h-[200px] flex-col items-center justify-center rounded-lg border border-dashed border-white/20 bg-white/5 p-8 text-center'>
            <Search className='mb-4 h-12 w-12 text-white/40' />
            <h3 className='mb-2 text-lg font-semibold text-white'>
              No services found
            </h3>
            <p className='mb-4 text-sm text-white/70'>
              {searchTerm || statusFilter !== 'all'
                ? 'Try adjusting your search or filters.'
                : 'Create your first service to get started.'}
            </p>
            {searchTerm || statusFilter !== 'all' ? (
              <Button
                onClick={() => {
                  setSearchTerm('')
                  setStatusFilter('all')
                }}
                variant='space'
              >
                Clear Filters
              </Button>
            ) : (
              <CreateServiceDialog />
            )}
          </div>
        ) : (
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
            {filteredServices.map(service => (
              <Card
                key={service.id}
                className='glass-nebula hover:border-space-accent/50 border-white/10 transition-all'
              >
                <CardHeader className='pb-3'>
                  <div className='flex items-start justify-between'>
                    <div className='space-y-2'>
                      <CardTitle className='line-clamp-1 text-lg text-white'>
                        {service.name}
                      </CardTitle>
                      <div className='flex items-center gap-2'>
                        <Badge
                          variant={service.isActive ? 'default' : 'secondary'}
                          className={`gap-1 ${
                            service.isActive
                              ? 'border-green-500/30 bg-green-500/20 text-green-400'
                              : 'border-gray-500/30 bg-gray-500/20 text-gray-400'
                          }`}
                        >
                          {service.isActive ? (
                            <Eye className='h-3 w-3' />
                          ) : (
                            <EyeOff className='h-3 w-3' />
                          )}
                          {service.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                        <Badge
                          variant='outline'
                          className='border-space-accent/30 bg-space-accent/20 text-space-accent'
                        >
                          Order: {service.order}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <CardDescription className='line-clamp-3 text-white/70'>
                    {service.desc}
                  </CardDescription>

                  <div className='text-sm text-white/60'>
                    <div className='flex items-center gap-2'>
                      <span className='font-medium'>Icon:</span>
                      <span className='font-mono text-xs'>{service.icon}</span>
                    </div>
                  </div>

                  <div className='flex gap-2 pt-2'>
                    <EditServiceDialog service={service}>
                      <Button size='sm' variant='stellar'>
                        <Edit className='h-3 w-3' />
                      </Button>
                    </EditServiceDialog>
                    <Button
                      variant='destructive'
                      size='sm'
                      onClick={() =>
                        handleDeleteService(service.id, service.name)
                      }
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <LoadingSpinner className='h-3 w-3' />
                      ) : (
                        <Trash2 className='h-3 w-3' />
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
