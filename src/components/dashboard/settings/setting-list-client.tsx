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
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { useSettings } from '@/hooks/use-settings'
import type { SiteSettingWithDetails } from '@/services/settings-service'
import { Edit, Eye, EyeOff, Search, Settings2, Trash2, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { toast } from 'sonner'

interface SettingListClientProps {
  settings: SiteSettingWithDetails[]
}

export function SettingListClient({ settings }: SettingListClientProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<
    'all' | 'active' | 'inactive'
  >('all')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const { deleteSetting, toggleSettingStatus, isLoading } = useSettings()

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

  // Get unique types for filter
  const settingTypes = useMemo(() => {
    const types = Array.from(new Set(settings.map(setting => setting.type)))
    return types
  }, [settings])

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
    <Card className='glass-nebula border-space-accent/30'>
      <CardContent className='space-y-6 p-6'>
        {/* Add Setting Action */}
        <div className='flex justify-end'>
          <CreateSettingDialog />
        </div>

        {/* Search and Filter Controls */}
        <div className='space-y-4'>
          {/* Search Input */}
          <div className='relative'>
            <Search className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-white/50' />
            <Input
              placeholder='Search settings by key, value, or description...'
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

          {/* Filters */}
          <div className='flex flex-wrap gap-4'>
            {/* Status Filter */}
            <div className='space-y-2'>
              <div className='text-sm text-white/70'>Filter by status:</div>
              <div className='flex flex-wrap gap-2'>
                <Button
                  size='sm'
                  variant={statusFilter === 'all' ? 'space' : 'link'}
                  onClick={() => setStatusFilter('all')}
                >
                  All Settings
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

            {/* Type Filter */}
            <div className='space-y-2'>
              <div className='text-sm text-white/70'>Filter by type:</div>
              <div className='flex flex-wrap gap-2'>
                <Button
                  size='sm'
                  variant={typeFilter === 'all' ? 'space' : 'link'}
                  onClick={() => setTypeFilter('all')}
                >
                  All Types
                </Button>
                {settingTypes.map(type => (
                  <Button
                    key={type}
                    size='sm'
                    variant={typeFilter === type ? 'space' : 'link'}
                    onClick={() => setTypeFilter(type)}
                  >
                    {type}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className='text-sm text-white/70'>
          {filteredSettings.length === settings.length
            ? `Showing all ${settings.length} settings`
            : `Showing ${filteredSettings.length} of ${settings.length} settings`}
        </div>

        {/* Settings Grid */}
        {filteredSettings.length === 0 ? (
          <div className='flex min-h-[200px] flex-col items-center justify-center rounded-lg border border-dashed border-white/20 bg-white/5 p-8 text-center'>
            <Settings2 className='mb-4 h-12 w-12 text-white/40' />
            <h3 className='mb-2 text-lg font-semibold text-white'>
              No settings found
            </h3>
            <p className='mb-4 text-sm text-white/70'>
              {searchTerm || statusFilter !== 'all' || typeFilter !== 'all'
                ? 'Try adjusting your search or filters.'
                : 'Create your first setting to get started.'}
            </p>
            {searchTerm || statusFilter !== 'all' || typeFilter !== 'all' ? (
              <Button
                onClick={() => {
                  setSearchTerm('')
                  setStatusFilter('all')
                  setTypeFilter('all')
                }}
                variant='space'
              >
                Clear Filters
              </Button>
            ) : (
              <CreateSettingDialog />
            )}
          </div>
        ) : (
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
            {filteredSettings.map(setting => (
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
                      onClick={() =>
                        handleDeleteSetting(setting.id, setting.key)
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
