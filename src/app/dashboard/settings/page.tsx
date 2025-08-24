import { DashboardPageHeader } from '@/components/dashboard/page-header'
import { Button } from '@/components/ui/button'
import { Save } from 'lucide-react'

export default async function SettingsPage() {
  return (
    <div className='space-y-6'>
      {/* Header */}
      <DashboardPageHeader
        title='Settings'
        description='Configure your space dashboard and account preferences.'
        actions={
          <Button variant='nebula'>
            <Save className='mr-2 h-4 w-4' />
            Save Changes
          </Button>
        }
      />
    </div>
  )
}
