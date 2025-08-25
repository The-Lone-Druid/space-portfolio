import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { Monitor, Settings, Shield, User } from 'lucide-react'

export default function ProfileLoading() {
  return (
    <div className='space-y-6'>
      {/* Header Section Skeleton */}
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <h1 className='text-2xl font-bold text-white'>Account Profile</h1>
          <p className='text-gray-400'>
            Manage your user account, connected providers, and active sessions
          </p>
        </div>
      </div>

      <Separator className='bg-white/10' />

      {/* User Profile Overview Skeleton */}
      <Card className='glass-nebula border-space-accent/30'>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <User className='text-space-gold h-5 w-5 opacity-50' />
              <CardTitle className='text-white'>User Profile</CardTitle>
            </div>
            <Button variant='stellar' size='sm' disabled>
              <Settings className='mr-2 h-4 w-4' />
              Edit Profile
            </Button>
          </div>
          <CardDescription className='text-white/70'>
            Your account information and preferences
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='grid gap-4 md:grid-cols-2'>
            <div className='space-y-2'>
              <label className='text-sm font-medium text-white/80'>Name</label>
              <Skeleton className='h-10 w-full' />
            </div>
            <div className='space-y-2'>
              <label className='text-sm font-medium text-white/80'>Email</label>
              <Skeleton className='h-10 w-full' />
            </div>
            <div className='space-y-2'>
              <label className='text-sm font-medium text-white/80'>Role</label>
              <Skeleton className='h-10 w-full' />
            </div>
            <div className='space-y-2'>
              <label className='text-sm font-medium text-white/80'>
                Status
              </label>
              <Skeleton className='h-10 w-full' />
            </div>
          </div>
          <div className='space-y-2'>
            <label className='text-sm font-medium text-white/80'>
              Profile Image
            </label>
            <div className='flex items-center gap-4'>
              <Skeleton className='h-16 w-16 rounded-full' />
              <div className='space-y-2'>
                <Skeleton className='h-4 w-48' />
                <Skeleton className='h-8 w-32' />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator className='bg-white/10' />

      {/* Connected Accounts Management Skeleton */}
      <Card className='glass-nebula border-space-accent/30'>
        <CardHeader>
          <div className='flex items-center gap-3'>
            <Shield className='text-space-gold h-5 w-5 opacity-50' />
            <CardTitle className='text-white'>Connected Accounts</CardTitle>
          </div>
          <CardDescription className='text-white/70'>
            Manage your connected authentication providers
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          {[1, 2, 3].map(index => (
            <div
              key={index}
              className='flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-4'
            >
              <div className='flex items-center gap-3'>
                <Skeleton className='h-10 w-10 rounded' />
                <div className='space-y-1'>
                  <Skeleton className='h-5 w-24' />
                  <Skeleton className='h-4 w-32' />
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <Skeleton className='h-6 w-16 rounded' />
                <Skeleton className='h-8 w-20' />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Separator className='bg-white/10' />

      {/* Sessions Management Skeleton */}
      <Card className='glass-nebula border-space-accent/30'>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <Monitor className='text-space-gold h-5 w-5 opacity-50' />
              <CardTitle className='text-white'>Active Sessions</CardTitle>
            </div>
            <Button variant='destructive' size='sm' disabled>
              Revoke All
            </Button>
          </div>
          <CardDescription className='text-white/70'>
            Monitor and manage your active login sessions
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          {[1, 2, 3, 4].map(index => (
            <div
              key={index}
              className='flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-4'
            >
              <div className='flex items-center gap-3'>
                <Skeleton className='h-8 w-8 rounded' />
                <div className='space-y-1'>
                  <div className='flex items-center gap-2'>
                    <Skeleton className='h-4 w-20' />
                    {index === 1 && <Skeleton className='h-5 w-16 rounded' />}
                  </div>
                  <Skeleton className='h-3 w-32' />
                  <Skeleton className='h-3 w-24' />
                </div>
              </div>
              <div className='text-right'>
                <Skeleton className='mb-1 h-4 w-16' />
                <Skeleton className='h-8 w-20' />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Actions Skeleton */}
      <Card className='glass-nebula border-space-accent/30'>
        <CardHeader>
          <CardTitle className='text-white'>Quick Actions</CardTitle>
          <CardDescription className='text-white/70'>
            Common account management tasks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
            {[1, 2, 3, 4, 5, 6].map(index => (
              <Button
                key={index}
                variant='cosmic'
                className='h-auto flex-col gap-2 p-4'
                disabled
              >
                <Skeleton className='h-6 w-6' />
                <Skeleton className='h-4 w-20' />
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
