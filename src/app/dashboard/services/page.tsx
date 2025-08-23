import { DashboardPageHeader } from '@/components/dashboard/page-header'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export default async function ServicesPage() {
  return (
    <div className='space-y-6'>
      {/* Header */}
      <DashboardPageHeader
        title='Services & Solutions'
        description='Manage your space technology services and client offerings across the cosmos.'
        actions={
          <Button className='bg-space-accent hover:bg-space-accent/80 text-white'>
            <Plus className='mr-2 h-4 w-4' />
            Add Service
          </Button>
        }
      />
    </div>
  )
}
