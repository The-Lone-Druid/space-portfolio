'use client'

import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { Separator } from '@/components/ui/separator'
import type { UserProfile } from '@/services/user-profile-service'
import {
  Activity,
  AlertCircle,
  Calendar,
  CheckCircle2,
  Clock,
  Mail,
  Shield,
  User,
} from 'lucide-react'
import Image from 'next/image'

interface UserProfileListClientProps {
  userProfile: UserProfile | null
  isLoading?: boolean
}

export function UserProfileListClient({
  userProfile,
  isLoading = false,
}: UserProfileListClientProps) {
  if (isLoading) {
    return (
      <div className='flex min-h-[400px] items-center justify-center'>
        <LoadingSpinner className='h-8 w-8 text-cyan-400' />
      </div>
    )
  }

  if (!userProfile) {
    return (
      <div className='flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed border-white/20 bg-white/5 p-6 text-center'>
        <AlertCircle className='mb-2 h-8 w-8 text-orange-400' />
        <p className='text-sm text-white/70'>No user profile found</p>
        <p className='mt-1 text-xs text-white/50'>
          Please sign in to view your profile information
        </p>
      </div>
    )
  }

  const { user, lastLogin } = userProfile

  return (
    <div className='space-y-6'>
      {/* User Overview Card */}
      <Card className='glass-nebula border-space-accent/30'>
        <CardHeader>
          <CardTitle className='flex items-center gap-2 text-white'>
            <User className='h-5 w-5 text-cyan-400' />
            User Profile
          </CardTitle>
          <CardDescription className='text-gray-400'>
            Your account information and authentication details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='space-y-6'>
            {/* Profile Header */}
            <div className='flex flex-col gap-4 sm:flex-row'>
              {user.image && (
                <div className='flex-shrink-0'>
                  <div className='border-space-accent/30 relative h-20 w-20 overflow-hidden rounded-full border-2'>
                    <Image
                      src={user.image}
                      alt={user.name || 'User avatar'}
                      width={80}
                      height={80}
                      className='object-cover'
                    />
                  </div>
                </div>
              )}
              <div className='flex-1'>
                <div className='mb-2 flex items-center gap-2'>
                  <h3 className='text-xl font-semibold text-white'>
                    {user.name || 'Anonymous User'}
                  </h3>
                  <Badge
                    variant='outline'
                    className={`${
                      user.role === 'ADMIN'
                        ? 'border-purple-400/30 bg-purple-400/20 text-purple-400'
                        : 'border-green-400/30 bg-green-400/20 text-green-400'
                    }`}
                  >
                    <Shield className='mr-1 h-3 w-3' />
                    {user.role}
                  </Badge>
                  {user.emailVerified && (
                    <Badge
                      variant='outline'
                      className='border-green-400/30 bg-green-400/20 text-green-400'
                    >
                      <CheckCircle2 className='mr-1 h-3 w-3' />
                      Verified
                    </Badge>
                  )}
                </div>
                <p className='text-space-accent mb-1 font-medium'>
                  ID: {user.id}
                </p>
              </div>
            </div>

            <Separator className='bg-white/10' />

            {/* Contact Information */}
            <div className='grid gap-4 sm:grid-cols-2'>
              <div className='flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-3'>
                <Mail className='text-space-accent h-4 w-4 flex-shrink-0' />
                <div className='min-w-0 flex-1'>
                  <p className='mb-1 text-xs text-white/60'>Email</p>
                  <p className='text-sm break-all text-white'>{user.email}</p>
                </div>
              </div>

              <div className='flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-3'>
                <Calendar className='text-space-accent h-4 w-4 flex-shrink-0' />
                <div className='min-w-0 flex-1'>
                  <p className='mb-1 text-xs text-white/60'>Member Since</p>
                  <p className='text-sm text-white'>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className='flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-3'>
                <Clock className='text-space-accent h-4 w-4 flex-shrink-0' />
                <div className='min-w-0 flex-1'>
                  <p className='mb-1 text-xs text-white/60'>Last Login</p>
                  <p className='text-sm text-white'>
                    {lastLogin
                      ? new Date(lastLogin).toLocaleDateString()
                      : 'Never'}
                  </p>
                </div>
              </div>

              <div className='flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-3'>
                <Activity className='text-space-accent h-4 w-4 flex-shrink-0' />
                <div className='min-w-0 flex-1'>
                  <p className='mb-1 text-xs text-white/60'>Last Updated</p>
                  <p className='text-sm text-white'>
                    {new Date(user.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
