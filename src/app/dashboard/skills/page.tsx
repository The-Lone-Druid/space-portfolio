import { DashboardPageHeader } from '@/components/dashboard/page-header'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export default async function SkillsPage() {
  return (
    <div className='space-y-6'>
      {/* Header */}
      <DashboardPageHeader
        title='Skills & Expertise'
        description='Manage your technical skills and proficiency levels across the galaxy of technologies.'
        actions={
          <Button variant='cosmic'>
            <Plus className='mr-2 h-4 w-4' />
            Add Skill
          </Button>
        }
      />
    </div>
  )
}
