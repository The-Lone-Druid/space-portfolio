import { requireAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    await requireAdmin()

    const { id } = await params
    const projectId = parseInt(id)

    if (isNaN(projectId)) {
      return NextResponse.json({ error: 'Invalid project ID' }, { status: 400 })
    }

    // Get current project to toggle featured status
    const currentProject = await prisma.project.findUnique({
      where: { id: projectId },
      select: { featured: true },
    })

    if (!currentProject) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    // Update featured status
    const updatedProject = await prisma.project.update({
      where: { id: projectId },
      data: { featured: !currentProject.featured },
      include: {
        projectTasks: {
          orderBy: { order: 'asc' },
        },
        skillsUtilized: {
          orderBy: { order: 'asc' },
        },
      },
    })

    return NextResponse.json(updatedProject)
  } catch (error) {
    console.error('Error toggling featured status:', error)

    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    return NextResponse.json(
      { error: 'Failed to toggle featured status' },
      { status: 500 }
    )
  }
}
