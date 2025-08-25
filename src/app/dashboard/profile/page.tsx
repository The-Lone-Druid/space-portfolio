import { AccountsManager } from '@/components/dashboard/profile/accounts-manager'
import { QuickActionsCard } from '@/components/dashboard/profile/quick-actions-card'
import { SessionsManager } from '@/components/dashboard/profile/sessions-manager'
import { UserProfileListClient } from '@/components/dashboard/profile/user-profile-list-client'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { Separator } from '@/components/ui/separator'
import {
  getCurrentUserProfile,
  getUserAccounts,
  getUserSessions,
} from '@/services/user-profile'
import { Settings } from 'lucide-react'
import { Suspense } from 'react'

// Force dynamic rendering since we use authentication
export const dynamic = 'force-dynamic'

// Server Component for data fetching
async function ProfileContent() {
  try {
    const [userProfile, accounts, sessions] = await Promise.all([
      getCurrentUserProfile(),
      getUserAccounts(),
      getUserSessions(),
    ])

    return (
      <div className='space-y-6'>
        {/* Header Section */}
        <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
          <div>
            <h1 className='text-2xl font-bold text-white'>Account Profile</h1>
            <p className='text-gray-400'>
              Manage your user account, connected providers, and active sessions
            </p>
          </div>
        </div>

        <Separator className='bg-white/10' />

        {/* User Profile Overview */}
        <UserProfileListClient userProfile={userProfile} />

        <Separator className='bg-white/10' />

        {/* Connected Accounts Management */}
        <AccountsManager accounts={accounts} />

        <Separator className='bg-white/10' />

        {/* Sessions Management */}
        <SessionsManager sessions={sessions} />

        {/* Quick Actions Card */}
        <QuickActionsCard />
      </div>
    )
  } catch (error) {
    console.error('Error loading profile data:', error)
    return (
      <div className='flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed border-red-500/30 bg-red-500/5 p-6 text-center'>
        <Settings className='mb-2 h-8 w-8 text-red-400' />
        <p className='text-sm text-red-400'>Error loading profile data</p>
        <p className='mt-1 text-xs text-red-300/70'>
          Please try refreshing the page or check your connection
        </p>
      </div>
    )
  }
}

export default async function ProfilePage() {
  return (
    <div className='container mx-auto py-6'>
      <Suspense
        fallback={
          <div className='flex min-h-[400px] items-center justify-center'>
            <LoadingSpinner className='h-8 w-8 text-cyan-400' />
          </div>
        }
      >
        <ProfileContent />
      </Suspense>
    </div>
  )
}
