import { DashboardPageHeader } from '@/components/dashboard/page-header'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Activity, Globe, User } from 'lucide-react'

export default function PersonalInfoLoading() {
  return (
    <div className='space-y-6'>
      {/* Header */}
      <DashboardPageHeader
        title='Personal Information'
        description='Manage your space explorer profile and contact information across the cosmos.'
      />

      {/* Stats Overview Skeleton */}
      <div className='grid gap-4 md:grid-cols-3'>
        <Card className='glass-nebula border-space-accent/30'>
          <CardContent className='p-4'>
            <div className='flex items-center justify-between'>
              <div className='space-y-2'>
                <Skeleton className='h-4 w-20' />
                <Skeleton className='h-5 w-16' />
              </div>
              <Skeleton className='h-6 w-20 rounded-full' />
            </div>
          </CardContent>
        </Card>

        <Card className='glass-nebula border-space-accent/30'>
          <CardContent className='p-4'>
            <div className='flex items-center justify-between'>
              <div className='space-y-2'>
                <Skeleton className='h-4 w-24' />
                <Skeleton className='h-5 w-8' />
              </div>
              <Globe className='text-space-gold h-5 w-5 opacity-50' />
            </div>
          </CardContent>
        </Card>

        <Card className='glass-nebula border-space-accent/30'>
          <CardContent className='p-4'>
            <div className='flex items-center justify-between'>
              <div className='space-y-2'>
                <Skeleton className='h-4 w-24' />
                <Skeleton className='h-4 w-16' />
              </div>
              <Activity className='text-space-gold h-5 w-5 opacity-50' />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className='grid gap-6 lg:grid-cols-2'>
        {/* Current Information Display Skeleton */}
        <div className='space-y-6'>
          {/* Basic Info Card Skeleton */}
          <Card className='glass-nebula border-space-accent/30'>
            <CardHeader>
              <CardTitle className='flex items-center text-white'>
                <User className='text-space-gold mr-2 h-5 w-5 opacity-50' />
                Current Information
              </CardTitle>
              <CardDescription className='text-white/70'>
                Your active profile information
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-3'>
                {/* Name */}
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-white/80'>Full Name</span>
                  <Skeleton className='h-5 w-32' />
                </div>
                <div className='h-px bg-white/10' />

                {/* Title */}
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-white/80'>Title</span>
                  <Skeleton className='h-5 w-40' />
                </div>
                <div className='h-px bg-white/10' />

                {/* Email */}
                <div className='flex items-start justify-between'>
                  <span className='flex items-center text-sm text-white/80'>
                    <Skeleton className='mr-2 h-4 w-4' />
                    Email
                  </span>
                  <Skeleton className='h-5 w-48' />
                </div>
                <div className='h-px bg-white/10' />

                {/* Location */}
                <div className='flex items-center justify-between'>
                  <span className='flex items-center text-sm text-white/80'>
                    <Skeleton className='mr-2 h-4 w-4' />
                    Location
                  </span>
                  <Skeleton className='h-5 w-28' />
                </div>

                {/* Resume */}
                <div className='h-px bg-white/10' />
                <div className='flex items-center justify-between'>
                  <span className='flex items-center text-sm text-white/80'>
                    <Skeleton className='mr-2 h-4 w-4' />
                    Resume
                  </span>
                  <Skeleton className='h-4 w-24' />
                </div>
              </div>

              {/* Bio Section */}
              <div className='pt-4'>
                <Skeleton className='mb-2 h-5 w-12' />
                <div className='space-y-2'>
                  <Skeleton className='h-4 w-full' />
                  <Skeleton className='h-4 w-full' />
                  <Skeleton className='h-4 w-3/4' />
                </div>
              </div>

              {/* Timestamps */}
              <div className='border-t border-white/10 pt-4'>
                <div className='flex items-center justify-between'>
                  <Skeleton className='h-3 w-24' />
                  <Skeleton className='h-3 w-20' />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Social Links Card Skeleton */}
          <Card className='glass-nebula border-space-accent/30'>
            <CardHeader>
              <CardTitle className='flex items-center text-white'>
                <Globe className='text-space-gold mr-2 h-5 w-5 opacity-50' />
                Social Links
              </CardTitle>
              <CardDescription className='text-white/70'>
                Your connected social platforms
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-3'>
                {/* Social Link Items */}
                {[1, 2, 3].map(index => (
                  <div
                    key={index}
                    className='border-space-accent/20 flex items-center justify-between rounded-lg border bg-white/5 p-3'
                  >
                    <div className='flex items-center space-x-3'>
                      <Skeleton className='h-5 w-5' />
                      <div className='space-y-1'>
                        <Skeleton className='h-4 w-20' />
                        <Skeleton className='h-3 w-32' />
                      </div>
                    </div>
                    <Skeleton className='h-4 w-4' />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Edit Form Skeleton */}
        <div>
          <Card className='glass-nebula border-space-accent/30'>
            <CardHeader>
              <CardTitle className='text-white'>Edit Information</CardTitle>
              <CardDescription className='text-white/70'>
                Update your personal information and social links
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
              {/* Form Fields Skeleton */}
              <div className='space-y-4'>
                {/* Name Field */}
                <div className='space-y-2'>
                  <Skeleton className='h-4 w-16' />
                  <Skeleton className='h-10 w-full' />
                </div>

                {/* Title Field */}
                <div className='space-y-2'>
                  <Skeleton className='h-4 w-12' />
                  <Skeleton className='h-10 w-full' />
                </div>

                {/* Email Field */}
                <div className='space-y-2'>
                  <Skeleton className='h-4 w-14' />
                  <Skeleton className='h-10 w-full' />
                </div>

                {/* Location Field */}
                <div className='space-y-2'>
                  <Skeleton className='h-4 w-18' />
                  <Skeleton className='h-10 w-full' />
                </div>

                {/* Bio Field */}
                <div className='space-y-2'>
                  <Skeleton className='h-4 w-8' />
                  <Skeleton className='h-24 w-full' />
                </div>

                {/* Resume URL Field */}
                <div className='space-y-2'>
                  <Skeleton className='h-4 w-24' />
                  <Skeleton className='h-10 w-full' />
                </div>
              </div>

              {/* Social Links Section */}
              <div className='space-y-4'>
                <Skeleton className='h-5 w-24' />
                {[1, 2].map(index => (
                  <div key={index} className='grid grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                      <Skeleton className='h-4 w-12' />
                      <Skeleton className='h-10 w-full' />
                    </div>
                    <div className='space-y-2'>
                      <Skeleton className='h-4 w-8' />
                      <Skeleton className='h-10 w-full' />
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className='flex gap-4 pt-4'>
                <Skeleton className='h-10 w-24' />
                <Skeleton className='h-10 w-32' />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
