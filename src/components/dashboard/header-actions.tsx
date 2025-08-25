'use client'

import { Button } from '@/components/ui/button'
import { useRevalidation } from '@/hooks/use-revalidation'
import { Link2, RefreshCw } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

export function DashboardHeaderActions() {
  const { revalidateHomepage, isLoading } = useRevalidation({
    onSuccess: response => {
      toast.success('Homepage refreshed!', {
        description: `Successfully updated at ${new Date(response.timestamp!).toLocaleTimeString()}`,
      })
    },
    onError: error => {
      toast.error('Failed to refresh homepage', {
        description: error,
      })
    },
  })

  const handleRevalidate = async () => {
    try {
      await revalidateHomepage()
    } catch (error) {
      // Error is already handled by the hook's onError callback
      console.error('Revalidation failed:', error)
    }
  }

  return (
    <div className='flex gap-2'>
      <Button variant='stellar' onClick={handleRevalidate} disabled={isLoading}>
        <RefreshCw
          className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`}
        />
        {isLoading ? 'Updating...' : 'Refresh Site'}
      </Button>
      <Button variant='cosmic' asChild>
        <Link href='/' target='_blank'>
          <Link2 className='mr-2 h-4 w-4' />
          Preview Site
        </Link>
      </Button>
    </div>
  )
}
