import { editorApiRoute, publicApiRoute } from '@/lib/auth-utils'
import { prisma } from '@/lib/prisma'
import { projectUpdateSchema } from '@/lib/validations'
import type { ApiResponse, ProjectWithDetails } from '@/types'
import { NextRequest, NextResponse } from 'next/server'

interface RouteParams {
  params: Promise<{
    id: string
  }>
}

export const GET = publicApiRoute(
  async (
    request: NextRequest,
    { params }: RouteParams
  ): Promise<NextResponse<ApiResponse<ProjectWithDetails>>> => {
    try {
      const { id } = await params
      const projectId = parseInt(id)

      if (isNaN(projectId)) {
        return NextResponse.json(
          {
            success: false,
            error: 'Invalid project ID',
          },
          { status: 400 }
        )
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
        return NextResponse.json(
          {
            success: false,
            error: 'Project not found',
          },
          { status: 404 }
        )
      }

      return NextResponse.json({
        success: true,
        data: project,
      })
    } catch (error) {
      console.error('Error fetching project:', error)
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to fetch project',
        },
        { status: 500 }
      )
    }
  }
)

export const PUT = editorApiRoute(
  async (
    request: NextRequest,
    { params }: RouteParams
  ): Promise<NextResponse<ApiResponse<ProjectWithDetails>>> => {
    try {
      const { id } = await params
      const projectId = parseInt(id)

      if (isNaN(projectId)) {
        return NextResponse.json(
          {
            success: false,
            error: 'Invalid project ID',
          },
          { status: 400 }
        )
      }

      // Parse and validate request body
      const body = await request.json()
      const validatedData = projectUpdateSchema.parse({
        ...body,
        id: projectId,
      })

      // Update project with related data in a transaction
      const project = await prisma.$transaction(async tx => {
        // Update the main project
        await tx.project.update({
          where: { id: projectId },
          data: {
            projectName: validatedData.projectName,
            startDate: validatedData.startDate,
            endDate: validatedData.endDate || null,
            isOngoing: validatedData.isOngoing,
            projectDescription: validatedData.projectDescription,
            projectLink: validatedData.projectLink || null,
            githubLink: validatedData.githubLink || null,
            featured: validatedData.featured,
            order: validatedData.order,
            isActive: validatedData.isActive,
          },
        })

        // Handle project tasks if provided
        if (validatedData.projectTasks !== undefined) {
          // Delete existing tasks and recreate them
          await tx.projectTask.deleteMany({
            where: { projectId },
          })

          if (validatedData.projectTasks.length > 0) {
            await tx.projectTask.createMany({
              data: validatedData.projectTasks.map(task => ({
                task: task.task,
                order: task.order,
                projectId,
              })),
            })
          }
        }

        // Handle project skills if provided
        if (validatedData.skillsUtilized !== undefined) {
          // Delete existing skills and recreate them
          await tx.projectSkill.deleteMany({
            where: { projectId },
          })

          if (validatedData.skillsUtilized.length > 0) {
            await tx.projectSkill.createMany({
              data: validatedData.skillsUtilized.map(skill => ({
                name: skill.name,
                order: skill.order,
                projectId,
              })),
            })
          }
        }

        // Fetch the complete updated project with relations
        return await tx.project.findUnique({
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
      })

      if (!project) {
        throw new Error('Failed to update project')
      }

      return NextResponse.json({
        success: true,
        data: project,
        message: 'Project updated successfully',
      })
    } catch (error) {
      console.error('Error updating project:', error)

      if (error instanceof Error && error.name === 'ZodError') {
        return NextResponse.json(
          {
            success: false,
            error: 'Invalid project data provided',
          },
          { status: 400 }
        )
      }

      if (
        error instanceof Error &&
        error.message.includes('Record to update not found')
      ) {
        return NextResponse.json(
          {
            success: false,
            error: 'Project not found',
          },
          { status: 404 }
        )
      }

      return NextResponse.json(
        {
          success: false,
          error: 'Failed to update project',
        },
        { status: 500 }
      )
    }
  }
)

export const DELETE = editorApiRoute(
  async (
    request: NextRequest,
    { params }: RouteParams
  ): Promise<NextResponse<ApiResponse<null>>> => {
    try {
      const { id } = await params
      const projectId = parseInt(id)

      if (isNaN(projectId)) {
        return NextResponse.json(
          {
            success: false,
            error: 'Invalid project ID',
          },
          { status: 400 }
        )
      }

      // Delete project (cascade will handle related records)
      await prisma.project.delete({
        where: { id: projectId },
      })

      return NextResponse.json({
        success: true,
        data: null,
        message: 'Project deleted successfully',
      })
    } catch (error) {
      console.error('Error deleting project:', error)

      if (
        error instanceof Error &&
        error.message.includes('Record to delete does not exist')
      ) {
        return NextResponse.json(
          {
            success: false,
            error: 'Project not found',
          },
          { status: 404 }
        )
      }

      return NextResponse.json(
        {
          success: false,
          error: 'Failed to delete project',
        },
        { status: 500 }
      )
    }
  }
)
