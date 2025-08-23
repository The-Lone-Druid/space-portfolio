'use client'

import { DashboardLayout } from '@/components/dashboard'
import { ProjectList } from '@/components/project-list'

export default function ProjectsPage() {
  return (
    <DashboardLayout>
      <ProjectList />
    </DashboardLayout>
  )
}
