import { DashboardPageHeader } from '@/components/dashboard/page-header'
import { Button } from '@/components/ui/button'
import { Plus, Settings } from 'lucide-react'

export default async function ProjectsPage() {
  return (
    <div className='space-y-6'>
      {/* Header */}
      <DashboardPageHeader
        title='Projects'
        description='Manage your projects and collaborations across the digital cosmos.'
        actions={
          <>
            <Button
              variant='outline'
              className='border-space-accent/30 hover:bg-space-accent/20 hover:border-space-accent/50 bg-transparent text-white'
            >
              <Settings className='mr-2 h-4 w-4' />
              Settings
            </Button>
            <Button className='bg-space-accent hover:bg-space-accent/80 text-white'>
              <Plus className='mr-2 h-4 w-4' />
              New Project
            </Button>
          </>
        }
      />
    </div>
  )
}
