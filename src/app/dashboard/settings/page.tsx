import { DashboardPageHeader } from '@/components/dashboard/page-header'
import { SettingListClient } from '@/components/dashboard/settings/setting-list-client'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  getSettingsServer,
  getSettingsStats,
} from '@/services/settings-service'
import {
  Activity,
  Database,
  Eye,
  EyeOff,
  Calendar,
  Plus,
  Settings,
  Cog,
} from 'lucide-react'

export default async function SettingsPage() {
  const [settings, stats] = await Promise.all([
    getSettingsServer(),
    getSettingsStats(),
  ])

  return (
    <div className='space-y-8'>
      {/* Header */}
      <DashboardPageHeader
        title='Settings & Configuration'
        description='Manage your site settings, configuration options, and system preferences across the digital cosmos.'
      />

      {/* Enhanced Stats Overview */}
      <div className='grid gap-6 md:grid-cols-4'>
        <Card className='glass-cosmic border-white/10'>
          <CardContent className='p-6'>
            <div className='flex items-center justify-between'>
              <div className='space-y-1'>
                <p className='text-sm font-medium text-white/70'>
                  Total Settings
                </p>
                <p className='text-2xl font-bold text-white'>
                  {stats.totalSettings}
                </p>
              </div>
              <div className='rounded-full bg-blue-500/20 p-3'>
                <Database className='h-5 w-5 text-blue-400' />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className='glass-cosmic border-white/10'>
          <CardContent className='p-6'>
            <div className='flex items-center justify-between'>
              <div className='space-y-1'>
                <p className='text-sm font-medium text-white/70'>
                  Active Settings
                </p>
                <p className='text-2xl font-bold text-white'>
                  {stats.activeSettings}
                </p>
              </div>
              <div className='rounded-full bg-green-500/20 p-3'>
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
                  Inactive Settings
                </p>
                <p className='text-2xl font-bold text-white'>
                  {stats.inactiveSettings}
                </p>
              </div>
              <div className='rounded-full bg-gray-500/20 p-3'>
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
                  Setting Types
                </p>
                <p className='text-2xl font-bold text-white'>
                  {stats.byType.length}
                </p>
              </div>
              <div className='rounded-full bg-purple-500/20 p-3'>
                <Activity className='h-5 w-5 text-purple-400' />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Settings Type Overview */}
      {stats.byType.length > 0 && (
        <Card className='glass-cosmic border-white/10'>
          <CardHeader className='pb-4'>
            <div className='flex items-center gap-3'>
              <Cog className='text-space-accent h-5 w-5' />
              <CardTitle className='text-xl text-white'>
                Settings Categories
              </CardTitle>
            </div>
            <CardDescription className='text-white/70'>
              Configuration options organized by type and usage
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-3'>
              {stats.byType.map(type => (
                <div
                  key={type.type}
                  className='flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-3'
                >
                  <div className='flex items-center gap-3'>
                    <Settings className='text-space-accent h-4 w-4' />
                    <span className='font-medium text-white'>{type.type}</span>
                  </div>
                  <Badge
                    variant='secondary'
                    className='bg-white/10 text-white/80'
                  >
                    {type._count}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Settings Management */}
      <Card className='glass-cosmic border-white/10'>
        <CardHeader className='pb-4'>
          <div className='flex items-center justify-between'>
            <div className='space-y-2'>
              <CardTitle className='text-xl text-white'>
                Settings Management
              </CardTitle>
              <CardDescription className='text-white/70'>
                Configure and manage your system settings and preferences
              </CardDescription>
            </div>
            <Button variant='stellar' size='lg'>
              <Plus className='mr-2 h-4 w-4' />
              Add Setting
            </Button>
          </div>
          {stats.totalSettings > 0 && (
            <div className='flex items-center gap-2 border-t border-white/10 pt-2 text-xs text-white/60'>
              <Calendar className='h-3 w-3' />
              <span>{stats.totalSettings} total settings configured</span>
            </div>
          )}
        </CardHeader>
        <CardContent className='pt-2'>
          {settings.length === 0 ? (
            <div className='flex min-h-[300px] flex-col items-center justify-center rounded-lg border border-dashed border-white/20 bg-white/5 p-8 text-center'>
              <div className='mb-4 rounded-full bg-white/10 p-4'>
                <Settings className='h-12 w-12 text-white/40' />
              </div>
              <h3 className='mb-2 text-xl font-semibold text-white'>
                No settings configured
              </h3>
              <p className='mb-6 max-w-md text-sm text-white/70'>
                Start configuring your system by adding your first setting.
                Customize your application behavior and preferences.
              </p>
              <Button variant='stellar' size='lg'>
                <Plus className='mr-2 h-4 w-4' />
                Add Your First Setting
              </Button>
            </div>
          ) : (
            <SettingListClient settings={settings} />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
