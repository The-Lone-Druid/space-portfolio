'use client'

import { DashboardLayout } from '@/components/dashboard'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Save } from 'lucide-react'

export default function SettingsPage() {
  return (
    <DashboardLayout title='Settings'>
      <div className='space-y-6'>
        {/* Header */}
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>Settings</h2>
          <p className='text-muted-foreground'>
            Manage your portfolio settings and preferences.
          </p>
        </div>

        <div className='gap-6'>
          {/* Settings Content */}
          <div className='space-y-6'>
            {/* Profile Settings */}
            <Card className='glass-cosmic'>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <p className='text-muted-foreground text-sm'>
                  Update your personal information and portfolio details.
                </p>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='grid gap-4 md:grid-cols-2'>
                  <div className='space-y-2'>
                    <Label htmlFor='name'>Full Name</Label>
                    <Input id='name' defaultValue='Zahid Shaikh' />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='title'>Professional Title</Label>
                    <Input
                      id='title'
                      defaultValue='Full Stack Developer & Tech Innovator'
                    />
                  </div>
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='email'>Email Address</Label>
                  <Input
                    id='email'
                    type='email'
                    defaultValue='reachtozahid@gmail.com'
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='location'>Location</Label>
                  <Input id='location' defaultValue='Mumbai, Maharashtra' />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='bio'>Bio</Label>
                  <Textarea
                    id='bio'
                    defaultValue='I craft modern web experiences and build scalable applications that drive user satisfaction. With a passion for clean code and innovative solutions, I transform ideas into powerful digital products.'
                    className='min-h-[100px]'
                  />
                </div>
                <Button>
                  <Save className='mr-2 h-4 w-4' />
                  Save Profile
                </Button>
              </CardContent>
            </Card>

            {/* Security Settings */}
            <Card className='glass-cosmic'>
              <CardHeader>
                <CardTitle>Security</CardTitle>
                <p className='text-muted-foreground text-sm'>
                  Manage your account security settings.
                </p>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='space-y-2'>
                  <Label htmlFor='current-password'>Current Password</Label>
                  <Input id='current-password' type='password' />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='new-password'>New Password</Label>
                  <Input id='new-password' type='password' />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='confirm-password'>Confirm New Password</Label>
                  <Input id='confirm-password' type='password' />
                </div>
                <Button>
                  <Save className='mr-2 h-4 w-4' />
                  Update Password
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
