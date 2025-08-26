import { DashboardPageHeader } from '@/components/dashboard/page-header'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import {
  User,
  Shield,
  Activity,
  Settings,
  Eye,
  Clock,
  Calendar,
  Mail,
} from 'lucide-react'

export default function ProfileLoading() {
  return (
    <div className='space-y-6'>
      {/* Header Skeleton */}
      <DashboardPageHeader
        title='Profile Management'
        description='Loading your account information...'
        isLoading={true}
      />

      {/* Profile Grid Skeleton */}
      <div className='grid gap-6 lg:grid-cols-3'>
        {/* Main Profile Column */}
        <div className='space-y-6 lg:col-span-2'>
          {/* Profile Overview Skeleton */}
          <Card className='glass-nebula border-space-accent/30'>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <User className='text-space-gold h-5 w-5' />
                  <CardTitle className='text-white'>Profile Overview</CardTitle>
                </div>
                <Skeleton className='h-9 w-24 bg-white/10' />
              </div>
              <CardDescription className='text-white/70'>
                Your account information and settings
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
              {/* Avatar and Basic Info */}
              <div className='flex items-start gap-6'>
                <Skeleton className='h-20 w-20 rounded-full bg-white/10' />
                <div className='flex-1 space-y-3'>
                  <div className='space-y-2'>
                    <Skeleton className='h-4 w-16 bg-white/10' />
                    <Skeleton className='h-6 w-40 bg-white/10' />
                  </div>
                  <div className='space-y-2'>
                    <Skeleton className='h-4 w-12 bg-white/10' />
                    <Skeleton className='h-5 w-56 bg-white/10' />
                  </div>
                </div>
              </div>

              {/* Account Details Grid */}
              <div className='grid gap-4 md:grid-cols-2'>
                <div className='space-y-2'>
                  <div className='flex items-center gap-2'>
                    <Calendar className='h-4 w-4 text-white/60' />
                    <Skeleton className='h-4 w-24 bg-white/10' />
                  </div>
                  <Skeleton className='h-5 w-32 bg-white/10' />
                </div>
                <div className='space-y-2'>
                  <div className='flex items-center gap-2'>
                    <Clock className='h-4 w-4 text-white/60' />
                    <Skeleton className='h-4 w-20 bg-white/10' />
                  </div>
                  <Skeleton className='h-5 w-28 bg-white/10' />
                </div>
                <div className='space-y-2'>
                  <div className='flex items-center gap-2'>
                    <Shield className='h-4 w-4 text-white/60' />
                    <Skeleton className='h-4 w-16 bg-white/10' />
                  </div>
                  <Skeleton className='h-6 w-20 bg-white/10' />
                </div>
                <div className='space-y-2'>
                  <div className='flex items-center gap-2'>
                    <Mail className='h-4 w-4 text-white/60' />
                    <Skeleton className='h-4 w-20 bg-white/10' />
                  </div>
                  <Skeleton className='h-6 w-16 bg-white/10' />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Card Skeleton */}
          <Card className='glass-nebula border-space-accent/30'>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <Shield className='h-5 w-5 text-cyan-400' />
                  <CardTitle className='text-white'>
                    Security Settings
                  </CardTitle>
                </div>
                <Skeleton className='h-9 w-32 bg-white/10' />
              </div>
              <CardDescription className='text-white/70'>
                Manage your account security
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              {/* Security Items */}
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className='flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-4'
                >
                  <div className='flex items-center gap-3'>
                    <Skeleton className='h-5 w-5 bg-white/20' />
                    <div className='space-y-2'>
                      <Skeleton className='h-4 w-32 bg-white/20' />
                      <Skeleton className='h-3 w-48 bg-white/20' />
                    </div>
                  </div>
                  <Skeleton className='h-8 w-20 bg-white/20' />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Column */}
        <div className='space-y-6'>
          {/* Activity Card Skeleton */}
          <Card className='glass-nebula border-space-accent/30'>
            <CardHeader>
              <div className='flex items-center gap-3'>
                <Activity className='h-5 w-5 text-green-400' />
                <CardTitle className='text-white'>Recent Activity</CardTitle>
              </div>
              <CardDescription className='text-white/70'>
                Your latest account activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className='flex items-start gap-3'>
                    <Skeleton className='mt-2 h-2 w-2 rounded-full bg-white/20' />
                    <div className='flex-1 space-y-2'>
                      <Skeleton className='h-4 w-40 bg-white/20' />
                      <Skeleton className='h-3 w-24 bg-white/20' />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Settings Card Skeleton */}
          <Card className='glass-nebula border-space-accent/30'>
            <CardHeader>
              <div className='flex items-center gap-3'>
                <Settings className='h-5 w-5 text-purple-400' />
                <CardTitle className='text-white'>Quick Settings</CardTitle>
              </div>
              <CardDescription className='text-white/70'>
                Common account actions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-3'>
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className='flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                      <Skeleton className='h-4 w-4 bg-white/20' />
                      <Skeleton className='h-4 w-28 bg-white/20' />
                    </div>
                    <Skeleton className='h-6 w-12 bg-white/20' />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Profile Stats Skeleton */}
          <Card className='glass-nebula border-space-accent/30'>
            <CardHeader>
              <div className='flex items-center gap-3'>
                <Eye className='h-5 w-5 text-blue-400' />
                <CardTitle className='text-white'>Profile Stats</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className='flex items-center justify-between'>
                    <Skeleton className='h-4 w-20 bg-white/20' />
                    <Skeleton className='h-6 w-8 bg-white/20' />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
