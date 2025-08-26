import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import {
  Bell,
  Globe,
  Mail,
  Moon,
  Palette,
  Settings,
  Shield,
  Smartphone,
  Volume2,
} from 'lucide-react'

export function ProfileSettingsCard() {
  // Mock settings - replace with actual state management when available
  const settings = {
    notifications: {
      email: true,
      push: false,
      security: true,
      marketing: false,
    },
    preferences: {
      theme: 'dark',
      language: 'en',
      timezone: 'UTC',
      soundEnabled: true,
    },
    privacy: {
      profileVisible: true,
      activityVisible: false,
      contactable: true,
    },
  }

  return (
    <Card className='glass-nebula border-space-accent/30'>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <Settings className='text-space-gold h-5 w-5' />
            <CardTitle className='text-white'>Quick Settings</CardTitle>
          </div>
          <Button
            variant='ghost'
            size='sm'
            className='text-white/70 hover:text-white'
          >
            <Settings className='h-4 w-4' />
          </Button>
        </div>
        <CardDescription className='text-white/70'>
          Manage your account preferences
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-6'>
        {/* Notifications Section */}
        <div className='space-y-3'>
          <div className='flex items-center gap-2'>
            <Bell className='h-4 w-4 text-white/60' />
            <h4 className='text-sm font-medium text-white/80'>Notifications</h4>
          </div>
          <div className='ml-6 space-y-3'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <Mail className='h-3 w-3 text-white/40' />
                <span className='text-sm text-white/70'>
                  Email notifications
                </span>
              </div>
              <Switch checked={settings.notifications.email} />
            </div>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <Smartphone className='h-3 w-3 text-white/40' />
                <span className='text-sm text-white/70'>
                  Push notifications
                </span>
              </div>
              <Switch checked={settings.notifications.push} />
            </div>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <Shield className='h-3 w-3 text-white/40' />
                <span className='text-sm text-white/70'>Security alerts</span>
              </div>
              <Switch checked={settings.notifications.security} />
            </div>
          </div>
        </div>

        {/* Appearance Section */}
        <div className='space-y-3'>
          <div className='flex items-center gap-2'>
            <Palette className='h-4 w-4 text-white/60' />
            <h4 className='text-sm font-medium text-white/80'>Appearance</h4>
          </div>
          <div className='ml-6 space-y-3'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <Moon className='h-3 w-3 text-white/40' />
                <span className='text-sm text-white/70'>Dark mode</span>
              </div>
              <Badge
                variant='secondary'
                className='bg-space-accent/20 text-space-accent border-space-accent/30 text-xs'
              >
                Active
              </Badge>
            </div>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <Volume2 className='h-3 w-3 text-white/40' />
                <span className='text-sm text-white/70'>Sound effects</span>
              </div>
              <Switch checked={settings.preferences.soundEnabled} />
            </div>
          </div>
        </div>

        {/* Privacy Section */}
        <div className='space-y-3'>
          <div className='flex items-center gap-2'>
            <Shield className='h-4 w-4 text-white/60' />
            <h4 className='text-sm font-medium text-white/80'>Privacy</h4>
          </div>
          <div className='ml-6 space-y-3'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <Globe className='h-3 w-3 text-white/40' />
                <span className='text-sm text-white/70'>Public profile</span>
              </div>
              <Switch checked={settings.privacy.profileVisible} />
            </div>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <Bell className='h-3 w-3 text-white/40' />
                <span className='text-sm text-white/70'>Activity tracking</span>
              </div>
              <Switch checked={settings.privacy.activityVisible} />
            </div>
          </div>
        </div>

        {/* Language & Region */}
        <div className='space-y-3'>
          <div className='flex items-center gap-2'>
            <Globe className='h-4 w-4 text-white/60' />
            <h4 className='text-sm font-medium text-white/80'>
              Language & Region
            </h4>
          </div>
          <div className='ml-6 space-y-2'>
            <div className='flex items-center justify-between rounded-lg bg-white/5 p-2'>
              <span className='text-sm text-white/70'>Language</span>
              <Badge variant='outline' className='text-xs'>
                English
              </Badge>
            </div>
            <div className='flex items-center justify-between rounded-lg bg-white/5 p-2'>
              <span className='text-sm text-white/70'>Timezone</span>
              <Badge variant='outline' className='text-xs'>
                UTC
              </Badge>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className='border-t border-white/10 pt-2'>
          <div className='grid gap-2'>
            <Button
              variant='outline'
              size='sm'
              className='w-full justify-start gap-2'
            >
              <Settings className='h-4 w-4' />
              Advanced Settings
            </Button>
            <Button
              variant='outline'
              size='sm'
              className='w-full justify-start gap-2'
            >
              <Shield className='h-4 w-4' />
              Privacy Center
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
