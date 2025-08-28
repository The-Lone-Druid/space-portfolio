'use client'

import { CreateSettingDialog } from '@/components/dashboard/settings/create-setting-dialog'
import { EditSettingDialog } from '@/components/dashboard/settings/edit-setting-dialog'
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
import { Label } from '@/components/ui/label'
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
import { useSettings } from '@/hooks/use-settings'
import type { SiteSettingWithDetails } from '@/services/settings-service'
import {
  Edit,
  Eye,
  EyeOff,
  Search,
  Settings,
  Trash2,
  Filter,
} from 'lucide-react'
import { useMemo, useState, useEffect } from 'react'
import { toast } from 'sonner'

interface SettingListClientProps {
  settings: SiteSettingWithDetails[]
}

const ITEMS_PER_PAGE = 9 // 3x3 grid

export function SettingListClient({ settings }: SettingListClientProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<
    'all' | 'active' | 'inactive'
  >('all')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const { deleteSetting, toggleSettingStatus, isLoading } = useSettings()

  // Get unique types for filter
  const settingTypes = useMemo(() => {
    const types = Array.from(new Set(settings.map(setting => setting.type)))
    return types.sort()
  }, [settings])

  const filteredSettings = useMemo(() => {
    let filtered = settings

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        setting =>
          setting.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
          setting.value.toLowerCase().includes(searchTerm.toLowerCase()) ||
          setting.description?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(setting =>
        statusFilter === 'active' ? setting.isActive : !setting.isActive
      )
    }

    // Apply type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter(setting => setting.type === typeFilter)
    }

    return filtered
  }, [settings, searchTerm, statusFilter, typeFilter])

  // Pagination calculations
  const totalPages = Math.ceil(filteredSettings.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const paginatedSettings = filteredSettings.slice(startIndex, endIndex)

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, statusFilter, typeFilter])

  const clearAllFilters = () => {
    setSearchTerm('')
    setStatusFilter('all')
    setTypeFilter('all')
    setCurrentPage(1)
  }

  const handleDeleteSetting = async (id: string, key: string) => {
    if (
      !confirm(
        `Are you sure you want to delete "${key}"? This action cannot be undone.`
      )
    ) {
      return
    }

    try {
      await deleteSetting(id)
      toast.success('Setting deleted successfully')
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to delete setting'
      )
    }
  }

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      await toggleSettingStatus(id, !currentStatus)
      toast.success(
        `Setting ${!currentStatus ? 'activated' : 'deactivated'} successfully`
      )
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to update setting'
      )
    }
  }

  const getSettingTypeColor = (type: string) => {
    switch (type) {
      case 'STRING':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'NUMBER':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'BOOLEAN':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
      case 'JSON':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30'
      case 'URL':
        return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
      case 'EMAIL':
        return 'bg-pink-500/20 text-pink-400 border-pink-500/30'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  return (
    <>
      {/* Filters Header */}
      <div className='mb-6 space-y-4'>
        {/* Filter Icon and Dropdown Filters */}
        <div className='flex flex-wrap items-center justify-between gap-4'>
          <div className='flex items-center gap-2'>
            <Filter className='h-5 w-5' />
            <span className='font-medium'>Filters</span>
          </div>

          <div className='flex flex-wrap items-center gap-4'>
            {/* Status Filter */}
            <div className='space-y-1'>
              <Select
                value={statusFilter}
                onValueChange={(value: 'all' | 'active' | 'inactive') =>
                  setStatusFilter(value)
                }
              >
                <SelectTrigger
                  id='status-filter'
                  className='w-[120px] border-white/20 bg-white/5'
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>All Status</SelectItem>
                  <SelectItem value='active'>Active</SelectItem>
                  <SelectItem value='inactive'>Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Type Filter */}
            <div className='space-y-1'>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger
                  id='type-filter'
                  className='w-[140px] border-white/20 bg-white/5'
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>All Types</SelectItem>
                  {settingTypes.map(type => (
                    <SelectItem key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Clear Filters */}
            {(searchTerm || statusFilter !== 'all' || typeFilter !== 'all') && (
              <Button
                variant='outline'
                size='sm'
                onClick={clearAllFilters}
                className='border-white/20 bg-white/5 text-white hover:bg-white/10'
              >
                Clear Filters
              </Button>
            )}
          </div>
        </div>

        {/* Search Input */}
        <div className='space-y-1'>
          <Label htmlFor='search' className='text-sm text-white/70'>
            Search Settings
          </Label>
          <div className='relative'>
            <Search className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-white/40' />
            <Input
              id='search'
              type='text'
              placeholder='Search by key, value, or description...'
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className='border-white/20 bg-white/5 pl-10 text-white placeholder:text-white/40'
            />
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className='mb-6 flex items-center justify-between text-sm text-white/70'>
        <div>
          Showing {paginatedSettings.length} of {filteredSettings.length}{' '}
          settings
          {filteredSettings.length !== settings.length &&
            ` (filtered from ${settings.length} total)`}
        </div>
        {totalPages > 1 && (
          <div>
            Page {currentPage} of {totalPages}
          </div>
        )}
      </div>

      {/* Create Setting Action */}
      <div className='mb-6 flex justify-end'>
        <CreateSettingDialog />
      </div>

      {/* Settings Grid */}
      {paginatedSettings.length > 0 ? (
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {paginatedSettings.map(setting => (
            <Card
              key={setting.id}
              className='glass-nebula hover:border-space-accent/50 border-white/10 transition-all'
            >
              <CardHeader className='pb-3'>
                <div className='flex items-start justify-between'>
                  <div className='flex-1 space-y-2'>
                    <CardTitle className='line-clamp-1 font-mono text-lg text-white'>
                      {setting.key}
                    </CardTitle>
                    <div className='flex flex-wrap items-center gap-2'>
                      <Badge
                        variant={setting.isActive ? 'default' : 'secondary'}
                        className={`gap-1 ${
                          setting.isActive
                            ? 'border-green-500/30 bg-green-500/20 text-green-400'
                            : 'border-gray-500/30 bg-gray-500/20 text-gray-400'
                        }`}
                      >
                        {setting.isActive ? (
                          <Eye className='h-3 w-3' />
                        ) : (
                          <EyeOff className='h-3 w-3' />
                        )}
                        {setting.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                      <Badge
                        variant='outline'
                        className={getSettingTypeColor(setting.type)}
                      >
                        {setting.type}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className='space-y-4'>
                {/* Value */}
                <div className='space-y-2'>
                  <div className='text-sm font-medium text-white/80'>
                    Value:
                  </div>
                  <CardDescription className='line-clamp-2 rounded bg-white/5 p-2 font-mono text-sm text-white/70'>
                    {setting.value}
                  </CardDescription>
                </div>

                {/* Description */}
                {setting.description && (
                  <div className='space-y-2'>
                    <div className='text-sm font-medium text-white/80'>
                      Description:
                    </div>
                    <CardDescription className='line-clamp-2 text-white/70'>
                      {setting.description}
                    </CardDescription>
                  </div>
                )}

                {/* Actions */}
                <div className='flex gap-2 pt-2'>
                  <EditSettingDialog setting={setting}>
                    <Button size='sm' variant='stellar'>
                      <Edit className='h-3 w-3' />
                    </Button>
                  </EditSettingDialog>
                  <Button
                    size='sm'
                    variant={setting.isActive ? 'secondary' : 'stellar'}
                    onClick={() =>
                      handleToggleStatus(setting.id, setting.isActive)
                    }
                    disabled={isLoading}
                  >
                    {setting.isActive ? (
                      <EyeOff className='h-3 w-3' />
                    ) : (
                      <Eye className='h-3 w-3' />
                    )}
                  </Button>
                  <Button
                    variant='destructive'
                    size='sm'
                    onClick={() => handleDeleteSetting(setting.id, setting.key)}
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
      ) : (
        <div className='py-12 text-center'>
          <Settings className='mx-auto mb-4 h-12 w-12 text-white/20' />
          <h3 className='mb-2 text-lg font-medium text-white/80'>
            {filteredSettings.length === 0 && settings.length > 0
              ? 'No settings match your filters'
              : 'No settings found'}
          </h3>
          <p className='mb-4 text-white/60'>
            {filteredSettings.length === 0 && settings.length > 0
              ? 'Try adjusting your search or filter criteria.'
              : 'Add your first setting to get started.'}
          </p>
          {filteredSettings.length === 0 && settings.length > 0 && (
            <Button
              variant='outline'
              onClick={clearAllFilters}
              className='border-white/20 bg-white/5 text-white hover:bg-white/10'
            >
              Clear all filters
            </Button>
          )}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className='mt-8 flex justify-center'>
          <Pagination>
            <PaginationContent>
              {currentPage > 1 && (
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className='cursor-pointer border-white/20 bg-white/5 text-white hover:bg-white/10'
                  />
                </PaginationItem>
              )}

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
                // Show first page, last page, current page, and pages around current
                const showPage =
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1)

                if (!showPage) {
                  // Show ellipsis for gaps
                  if (page === currentPage - 2 || page === currentPage + 2) {
                    return (
                      <PaginationItem key={page}>
                        <PaginationEllipsis className='text-white/40' />
                      </PaginationItem>
                    )
                  }
                  return null
                }

                return (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => setCurrentPage(page)}
                      isActive={currentPage === page}
                      className={`cursor-pointer ${
                        currentPage === page
                          ? 'bg-space-accent border-space-accent text-white'
                          : 'border-white/20 bg-white/5 text-white hover:bg-white/10'
                      }`}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                )
              })}

              {currentPage < totalPages && (
                <PaginationItem>
                  <PaginationNext
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className='cursor-pointer border-white/20 bg-white/5 text-white hover:bg-white/10'
                  />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </>
  )
}
