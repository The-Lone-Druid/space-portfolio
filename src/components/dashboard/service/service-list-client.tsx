'use client'

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { useServices } from '@/hooks/use-services'
import type { ServiceWithDetails } from '@/types'
import {
  Edit,
  Eye,
  EyeOff,
  Filter,
  Search,
  Trash2,
  X,
  Package,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { toast } from 'sonner'

interface ServiceListClientProps {
  services: ServiceWithDetails[]
}

const ITEMS_PER_PAGE = 9 // 3x3 grid

export function ServiceListClient({ services }: ServiceListClientProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<
    'all' | 'active' | 'inactive'
  >('all')
  const [currentPage, setCurrentPage] = useState(1)
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

  // Pagination calculations
  const totalPages = Math.ceil(filteredServices.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const paginatedServices = filteredServices.slice(startIndex, endIndex)

  // Reset to first page when filters change
  const handleFilterChange = () => {
    setCurrentPage(1)
  }

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('')
    setStatusFilter('all')
    setCurrentPage(1)
  }

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
    <div className='space-y-6'>
      {/* Search and Filter Controls */}
      <div className='space-y-4'>
        {/* Header Filter Controls */}
        <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
          <div className='flex items-center gap-2'>
            <Filter className='h-4 w-4 text-white/70' />
            <span className='text-sm font-medium text-white'>Filters</span>
          </div>

          {/* Filter Row */}
          <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
            <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
              {/* Status Filter */}
              <div className='flex items-center gap-2'>
                <Select
                  value={statusFilter}
                  onValueChange={value => {
                    setStatusFilter(value as 'all' | 'active' | 'inactive')
                    handleFilterChange()
                  }}
                >
                  <SelectTrigger className='w-[140px] border-white/20 bg-white/5 text-white'>
                    <SelectValue placeholder='All Status' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='all'>All Status</SelectItem>
                    <SelectItem value='active'>
                      <div className='flex items-center gap-2'>
                        <Eye className='h-3 w-3' />
                        Active
                      </div>
                    </SelectItem>
                    <SelectItem value='inactive'>
                      <div className='flex items-center gap-2'>
                        <EyeOff className='h-3 w-3' />
                        Inactive
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Clear Filters */}
            {(searchTerm || statusFilter !== 'all') && (
              <Button variant='outline' size='sm' onClick={clearFilters}>
                <X className='mr-2 h-4 w-4' />
                Clear Filters
              </Button>
            )}
          </div>
        </div>

        {/* Search Input */}
        <div className='relative'>
          <Search className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-white/50' />
          <Input
            placeholder='Search services by name or description...'
            value={searchTerm}
            onChange={e => {
              setSearchTerm(e.target.value)
              handleFilterChange()
            }}
            className='border-white/20 bg-white/5 pl-10 text-white placeholder:text-white/50'
          />
          {searchTerm && (
            <button
              onClick={() => {
                setSearchTerm('')
                handleFilterChange()
              }}
              className='absolute top-1/2 right-3 -translate-y-1/2 text-white/50 transition-colors hover:text-white'
            >
              <X className='h-4 w-4' />
            </button>
          )}
        </div>
      </div>

      {/* Services Grid */}
      {filteredServices.length === 0 ? (
        <div className='flex min-h-[300px] flex-col items-center justify-center rounded-lg border border-dashed border-white/20 bg-white/5 p-12 text-center'>
          <div className='bg-space-accent/20 mb-6 rounded-full p-4'>
            <Package className='text-space-accent h-8 w-8' />
          </div>
          <h3 className='mb-3 text-xl font-semibold text-white'>
            No services found
          </h3>
          <p className='mb-6 max-w-md text-white/70'>
            {searchTerm || statusFilter !== 'all'
              ? "Try adjusting your search criteria or filters to find the services you're looking for."
              : 'Create your first service to start showcasing your offerings to potential clients.'}
          </p>
          <Button
            onClick={() => {
              if (searchTerm || statusFilter !== 'all') {
                clearFilters()
              }
            }}
            variant='stellar'
            className='min-w-[140px]'
          >
            {searchTerm || statusFilter !== 'all'
              ? 'Clear All Filters'
              : 'Add Your First Service'}
          </Button>
        </div>
      ) : (
        <div className='space-y-6'>
          {/* Services Grid */}
          <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {paginatedServices.map(service => (
              <Card
                key={service.id}
                className='glass-cosmic group border-white/10 transition-all duration-200 hover:scale-[1.02] hover:border-white/20 hover:shadow-lg'
              >
                <CardHeader className='pb-4'>
                  <div className='flex items-start justify-between'>
                    <div className='flex-1 space-y-3'>
                      <CardTitle className='group-hover:text-space-accent line-clamp-1 text-lg text-white transition-colors'>
                        {service.name}
                      </CardTitle>
                      <div className='flex flex-wrap items-center gap-2'>
                        <Badge
                          variant={service.isActive ? 'default' : 'secondary'}
                          className={`gap-1 transition-all ${
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
                          className='border-space-accent/30 bg-space-accent/10 text-space-accent'
                        >
                          Order: {service.order}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <CardDescription className='line-clamp-3 leading-relaxed text-white/80'>
                    {service.desc}
                  </CardDescription>

                  <div className='rounded-lg border border-white/10 bg-white/5 p-3'>
                    <div className='flex items-center gap-2 text-sm'>
                      <span className='font-medium text-white/70'>Icon:</span>
                      <code className='text-space-accent bg-space-accent/10 rounded px-2 py-1 font-mono text-xs'>
                        {service.icon}
                      </code>
                    </div>
                  </div>

                  <div className='flex gap-2 pt-2'>
                    <EditServiceDialog service={service}>
                      <Button size='sm' variant='stellar' className='flex-1'>
                        <Edit className='mr-2 h-3 w-3' />
                        Edit
                      </Button>
                    </EditServiceDialog>
                    <Button
                      variant='destructive'
                      size='sm'
                      onClick={() =>
                        handleDeleteService(service.id, service.name)
                      }
                      disabled={isLoading}
                      className='px-3'
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

          {/* Pagination */}
          {totalPages > 1 && (
            <div className='flex justify-center'>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() =>
                        setCurrentPage(Math.max(1, currentPage - 1))
                      }
                      className={
                        currentPage === 1
                          ? 'pointer-events-none opacity-50'
                          : 'cursor-pointer'
                      }
                    />
                  </PaginationItem>

                  {/* Page Numbers */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(page => {
                      // Show first page, last page, current page, and pages around current
                      return (
                        page === 1 ||
                        page === totalPages ||
                        Math.abs(page - currentPage) <= 1
                      )
                    })
                    .map((page, index, array) => (
                      <div key={page}>
                        {/* Add ellipsis if there's a gap */}
                        {index > 0 && array[index - 1] < page - 1 && (
                          <PaginationItem>
                            <PaginationEllipsis />
                          </PaginationItem>
                        )}
                        <PaginationItem>
                          <PaginationLink
                            onClick={() => setCurrentPage(page)}
                            isActive={currentPage === page}
                            className='cursor-pointer'
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      </div>
                    ))}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        setCurrentPage(Math.min(totalPages, currentPage + 1))
                      }
                      className={
                        currentPage === totalPages
                          ? 'pointer-events-none opacity-50'
                          : 'cursor-pointer'
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
