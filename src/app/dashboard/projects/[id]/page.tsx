import { ProjectDetailClient } from '@/components/dashboard/project/project-detail-client'
import { prisma } from '@/lib/prisma'
import type { ProjectWithDetails } from '@/types'
import { notFound } from 'next/navigation'

interface ProjectPageProps {
  params: Promise<{
    id: string
  }>
}

async function getProject(id: number): Promise<ProjectWithDetails | null> {
  try {
    return await prisma.project.findUnique({
      where: { id },
      include: {
        projectTasks: {
          orderBy: { order: 'asc' },
        },
        skillsUtilized: {
          orderBy: { order: 'asc' },
        },
      },
    })
  } catch (error) {
    console.error('Error fetching project:', error)
    return null
  }
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { id } = await params
  const projectId = parseInt(id)

  if (isNaN(projectId)) {
    notFound()
  }

  const project = await getProject(projectId)

  if (!project) {
    notFound()
  }

  return <ProjectDetailClient project={project} />
}
