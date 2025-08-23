import { DashboardPageHeader } from '@/components/dashboard/page-header'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export default function DashboardPage() {
  return (
    <div className='space-y-6'>
      {/* Header */}
      <DashboardPageHeader
        title='Dashboard Overview'
        description="Welcome back! Here's what's happening with your portfolio."
        actions={
          <Button className='bg-space-accent hover:bg-space-accent/80 text-white'>
            <Plus className='mr-2 h-4 w-4' />
            Quick Action
          </Button>
        }
      />
    </div>
  )
}
