import { DashboardPageHeader } from '@/components/dashboard/page-header'
import { Button } from '@/components/ui/button'
import { Save } from 'lucide-react'

export default async function PersonalInfoPage() {
  return (
    <div className='space-y-6'>
      {/* Header */}
      <DashboardPageHeader
        title='Personal Information'
        description='Manage your space explorer profile and contact information across the cosmos.'
        actions={
          <Button className='bg-space-accent hover:bg-space-accent/80 text-white'>
            <Save className='mr-2 h-4 w-4' />
            Save Changes
          </Button>
        }
      />
    </div>
  )
}
