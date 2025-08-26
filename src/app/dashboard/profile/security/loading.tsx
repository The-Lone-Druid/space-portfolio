import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'
import { Shield, Lock, Key, Eye, AlertTriangle } from 'lucide-react'

export default function SecurityLoading() {
  return (
    <div className='space-y-6'>
      {/* Header Skeleton */}
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div className='space-y-2'>
          <Skeleton className='h-8 w-48 bg-white/10' />
          <Skeleton className='h-4 w-80 bg-white/10' />
        </div>
        <Skeleton className='h-10 w-32 bg-white/10' />
      </div>

      <Separator className='bg-white/10' />

      {/* Security Status Skeleton */}
      <Card className='glass-nebula border-space-accent/30'>
        <CardHeader>
          <div className='flex items-center gap-2'>
            <Shield className='text-space-gold h-5 w-5' />
            <CardTitle className='text-white'>Security Status</CardTitle>
          </div>
          <CardDescription className='text-white/70'>
            Loading your account security overview...
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
            {[1, 2, 3].map(index => (
              <div
                key={index}
                className='flex items-center gap-3 rounded-lg bg-white/5 p-3'
              >
                <Skeleton className='h-4 w-4 rounded bg-white/10' />
                <div className='flex-1 space-y-2'>
                  <Skeleton className='h-4 w-20 bg-white/10' />
                  <Skeleton className='h-3 w-32 bg-white/10' />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Change Password Skeleton */}
      <Card className='glass-nebula border-space-accent/30'>
        <CardHeader>
          <div className='flex items-center gap-2'>
            <Lock className='text-space-gold h-5 w-5' />
            <CardTitle className='text-white'>Change Password</CardTitle>
          </div>
          <CardDescription className='text-white/70'>
            Update your account password
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='space-y-2'>
            <Skeleton className='h-4 w-32 bg-white/10' />
            <Skeleton className='h-10 w-full bg-white/10' />
          </div>
          <div className='space-y-2'>
            <Skeleton className='h-4 w-32 bg-white/10' />
            <Skeleton className='h-10 w-full bg-white/10' />
          </div>
          <div className='space-y-2'>
            <Skeleton className='h-4 w-40 bg-white/10' />
            <Skeleton className='h-10 w-full bg-white/10' />
          </div>
          <Skeleton className='h-10 w-32 bg-white/10' />
        </CardContent>
      </Card>

      {/* Two-Factor Authentication Skeleton */}
      <Card className='glass-nebula border-space-accent/30'>
        <CardHeader>
          <div className='flex items-center gap-2'>
            <Key className='text-space-gold h-5 w-5' />
            <CardTitle className='text-white'>
              Two-Factor Authentication
            </CardTitle>
          </div>
          <CardDescription className='text-white/70'>
            Add an extra layer of security to your account
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='flex items-center justify-between rounded-lg bg-white/5 p-4'>
            <div className='flex items-center gap-3'>
              <Skeleton className='h-8 w-8 rounded bg-white/10' />
              <div className='space-y-1'>
                <Skeleton className='h-4 w-24 bg-white/10' />
                <Skeleton className='h-3 w-40 bg-white/10' />
              </div>
            </div>
            <Skeleton className='h-9 w-20 bg-white/10' />
          </div>
        </CardContent>
      </Card>

      {/* Active Sessions Skeleton */}
      <Card className='glass-nebula border-space-accent/30'>
        <CardHeader>
          <div className='flex items-center gap-2'>
            <Eye className='text-space-gold h-5 w-5' />
            <CardTitle className='text-white'>Active Sessions</CardTitle>
          </div>
          <CardDescription className='text-white/70'>
            Manage your active login sessions
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          {[1, 2].map(index => (
            <div
              key={index}
              className='flex items-center justify-between rounded-lg bg-white/5 p-4'
            >
              <div className='flex items-center gap-3'>
                <Skeleton className='h-8 w-8 rounded bg-white/10' />
                <div className='space-y-1'>
                  <Skeleton className='h-4 w-32 bg-white/10' />
                  <Skeleton className='h-3 w-48 bg-white/10' />
                </div>
              </div>
              <Skeleton className='h-8 w-16 bg-white/10' />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Security Recommendations Skeleton */}
      <Card className='glass-nebula border-space-accent/30'>
        <CardHeader>
          <div className='flex items-center gap-2'>
            <AlertTriangle className='text-space-gold h-5 w-5' />
            <CardTitle className='text-white'>
              Security Recommendations
            </CardTitle>
          </div>
          <CardDescription className='text-white/70'>
            Suggestions to improve your account security
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-3'>
          {[1, 2, 3].map(index => (
            <div
              key={index}
              className='flex items-start gap-3 rounded-lg bg-white/5 p-3'
            >
              <Skeleton className='mt-0.5 h-4 w-4 rounded bg-white/10' />
              <div className='flex-1 space-y-1'>
                <Skeleton className='h-4 w-full bg-white/10' />
                <Skeleton className='h-3 w-3/4 bg-white/10' />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
