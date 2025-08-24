import { DashboardPageHeader } from '@/components/dashboard/page-header'
import { ProjectsPageClient } from '@/components/dashboard/project/projects-page-client'

export default async function ProjectsPage() {
  return (
    <div className='space-y-6'>
      {/* Header */}
      <DashboardPageHeader
        title='Projects'
        description='Manage your projects and collaborations across the digital cosmos.'
      />

      {/* Projects Management */}
      <ProjectsPageClient />
    </div>
  )
}
