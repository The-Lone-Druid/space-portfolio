import { DashboardPageHeader } from '@/components/dashboard/page-header'
import { SettingListClient } from '@/components/dashboard/settings/setting-list-client'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import {
  getSettingsServer,
  getSettingsStats,
} from '@/services/settings-service'
import { Activity, Database, Eye, EyeOff } from 'lucide-react'

export default async function SettingsPage() {
  const [settings, stats] = await Promise.all([
    getSettingsServer(),
    getSettingsStats(),
  ])

  return (
    <>
      <DashboardPageHeader
        title='Settings'
        description='Manage your site settings and configuration'
      />
      <div className='mt-6 space-y-6'>
        {/* Stats Overview */}
        <div className='grid gap-4 md:grid-cols-4'>
          <Card className='glass-nebula border-space-accent/30'>
            <CardContent className='p-4'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm text-white/70'>Total Settings</p>
                  <p className='font-semibold text-white'>
                    {stats.totalSettings}
                  </p>
                </div>
                <Database className='h-8 w-8 text-blue-400' />
              </div>
            </CardContent>
          </Card>

          <Card className='glass-nebula border-space-accent/30'>
            <CardContent className='p-4'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm text-white/70'>Active Settings</p>
                  <p className='font-semibold text-white'>
                    {stats.activeSettings}
                  </p>
                </div>
                <Eye className='h-8 w-8 text-green-400' />
              </div>
            </CardContent>
          </Card>

          <Card className='glass-nebula border-space-accent/30'>
            <CardContent className='p-4'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm text-white/70'>Inactive Settings</p>
                  <p className='font-semibold text-white'>
                    {stats.inactiveSettings}
                  </p>
                </div>
                <EyeOff className='h-8 w-8 text-gray-400' />
              </div>
            </CardContent>
          </Card>

          <Card className='glass-nebula border-space-accent/30'>
            <CardContent className='p-4'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm text-white/70'>Setting Types</p>
                  <p className='font-semibold text-white'>
                    {stats.byType.length}
                  </p>
                </div>
                <Activity className='h-8 w-8 text-purple-400' />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Settings Type Breakdown */}
        {stats.byType.length > 0 && (
          <Card className='glass-nebula border-space-accent/30'>
            <CardContent className='p-6'>
              <h3 className='mb-4 text-lg font-semibold text-white'>
                Settings by Type
              </h3>
              <div className='flex flex-wrap gap-3'>
                {stats.byType.map(type => (
                  <Badge
                    key={type.type}
                    variant='outline'
                    className='flex items-center gap-2 border-white/20 bg-white/5 px-3 py-2 text-white/80'
                  >
                    <span className='font-medium'>{type.type}</span>
                    <span className='text-white/60'>×{type._count}</span>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Settings List */}
        <SettingListClient settings={settings} />
      </div>
    </>
  )
}
