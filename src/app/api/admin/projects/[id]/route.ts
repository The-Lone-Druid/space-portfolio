import { requireAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { projectWithRelationsSchema } from '@/lib/validations'
import { NextRequest, NextResponse } from 'next/server'

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const projectId = parseInt(id)

    if (isNaN(projectId)) {
      return NextResponse.json({ error: 'Invalid project ID' }, { status: 400 })
    }

    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        projectTasks: {
          orderBy: { order: 'asc' },
        },
        skillsUtilized: {
          orderBy: { order: 'asc' },
        },
      },
    })

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    return NextResponse.json(project)
  } catch (error) {
    console.error('Error fetching project:', error)
    return NextResponse.json(
      { error: 'Failed to fetch project' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    await requireAdmin()

    const { id } = await params
    const projectId = parseInt(id)

    if (isNaN(projectId)) {
      return NextResponse.json({ error: 'Invalid project ID' }, { status: 400 })
    }

    const body = await request.json()
    const validatedData = projectWithRelationsSchema.parse(body)

    const { tasks = [], skills = [], ...projectData } = validatedData

    // Update project with related data in a transaction
    const project = await prisma.$transaction(async tx => {
      // Update the project
      const updatedProject = await tx.project.update({
        where: { id: projectId },
        data: projectData,
      })

      // Delete existing tasks and skills
      await tx.projectTask.deleteMany({
        where: { projectId },
      })

      await tx.projectSkill.deleteMany({
        where: { projectId },
      })

      // Create new tasks if provided
      if (tasks.length > 0) {
        await tx.projectTask.createMany({
          data: tasks.map((task, index) => ({
            projectId: updatedProject.id,
            task: task.task,
            order: task.order || index,
          })),
        })
      }

      // Create new skills if provided
      if (skills.length > 0) {
        await tx.projectSkill.createMany({
          data: skills.map((skill, index) => ({
            projectId: updatedProject.id,
            name: skill.name,
            order: skill.order || index,
          })),
        })
      }

      // Fetch the complete updated project with relations
      return await tx.project.findUnique({
        where: { id: updatedProject.id },
        include: {
          projectTasks: {
            orderBy: { order: 'asc' },
          },
          skillsUtilized: {
            orderBy: { order: 'asc' },
          },
        },
      })
    })

    return NextResponse.json(project)
  } catch (error) {
    console.error('Error updating project:', error)

    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    await requireAdmin()

    const { id } = await params
    const projectId = parseInt(id)

    if (isNaN(projectId)) {
      return NextResponse.json({ error: 'Invalid project ID' }, { status: 400 })
    }

    // Delete project and related data (cascade should handle this)
    await prisma.project.delete({
      where: { id: projectId },
    })

    return NextResponse.json(
      { message: 'Project deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error deleting project:', error)

    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    )
  }
}
