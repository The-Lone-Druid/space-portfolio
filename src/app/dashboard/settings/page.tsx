import { DashboardPageHeader } from '@/components/dashboard/page-header'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Database, Palette, Save, Shield, User } from 'lucide-react'

export default async function SettingsPage() {
  return (
    <div className='space-y-6'>
      {/* Header */}
      <DashboardPageHeader
        title='Settings'
        description='Configure your space dashboard and account preferences.'
        actions={
          <Button className='bg-space-accent hover:bg-space-accent/80 text-white'>
            <Save className='mr-2 h-4 w-4' />
            Save Changes
          </Button>
        }
      />

      {/* Settings Content */}
      <div className='grid gap-6 lg:grid-cols-2'>
        <Card className='glass-nebula border-space-accent/30'>
          <CardHeader>
            <CardTitle className='flex items-center text-white'>
              <User className='text-space-gold mr-2 h-5 w-5' />
              Profile Settings
            </CardTitle>
            <CardDescription className='text-white/70'>
              Manage your personal information and preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-3'>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-white/80'>Display Name</span>
                <Badge
                  variant='secondary'
                  className='bg-space-gold/20 text-space-gold border-space-gold/30'
                >
                  Zahid Shaikh
                </Badge>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-white/80'>Email</span>
                <Badge
                  variant='secondary'
                  className='border-blue-500/30 bg-blue-500/20 text-blue-400'
                >
                  admin@zahidshaikh.space
                </Badge>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-white/80'>Role</span>
                <Badge
                  variant='secondary'
                  className='border-green-500/30 bg-green-500/20 text-green-400'
                >
                  ADMIN
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className='glass-nebula border-space-accent/30'>
          <CardHeader>
            <CardTitle className='flex items-center text-white'>
              <Shield className='text-space-gold mr-2 h-5 w-5' />
              Security
            </CardTitle>
            <CardDescription className='text-white/70'>
              Manage your account security and authentication
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-3'>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-white/80'>Two-Factor Auth</span>
                <Badge
                  variant='secondary'
                  className='border-green-500/30 bg-green-500/20 text-green-400'
                >
                  Enabled
                </Badge>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-white/80'>Last Login</span>
                <span className='text-sm text-white/70'>2 hours ago</span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-white/80'>Session Timeout</span>
                <span className='text-sm text-white/70'>24 hours</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className='glass-nebula border-space-accent/30'>
          <CardHeader>
            <CardTitle className='flex items-center text-white'>
              <Palette className='text-space-gold mr-2 h-5 w-5' />
              Appearance
            </CardTitle>
            <CardDescription className='text-white/70'>
              Customize the look and feel of your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-3'>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-white/80'>Theme</span>
                <Badge
                  variant='secondary'
                  className='border-purple-500/30 bg-purple-500/20 text-purple-400'
                >
                  Space Dark
                </Badge>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-white/80'>Animations</span>
                <Badge
                  variant='secondary'
                  className='border-green-500/30 bg-green-500/20 text-green-400'
                >
                  Enabled
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className='glass-nebula border-space-accent/30'>
          <CardHeader>
            <CardTitle className='flex items-center text-white'>
              <Database className='text-space-gold mr-2 h-5 w-5' />
              Data Management
            </CardTitle>
            <CardDescription className='text-white/70'>
              Manage your portfolio data and content
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-3'>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-white/80'>Auto Backup</span>
                <Badge
                  variant='secondary'
                  className='border-green-500/30 bg-green-500/20 text-green-400'
                >
                  Daily
                </Badge>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-white/80'>Storage Used</span>
                <span className='text-sm text-white/70'>2.4 GB / 10 GB</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
