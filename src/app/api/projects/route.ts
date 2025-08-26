import { editorApiRoute, publicApiRoute } from '@/lib/auth-utils'
import { prisma } from '@/lib/prisma'
import { projectSchema } from '@/lib/validations'
import { getProjects } from '@/services/portfolio-service'
import type { ApiResponse, ProjectWithDetails } from '@/types'
import { NextRequest, NextResponse } from 'next/server'

// GET route is public (for displaying projects on portfolio)
export const GET = publicApiRoute(
  async (): Promise<NextResponse<ApiResponse<ProjectWithDetails[]>>> => {
    try {
      const projects = await getProjects()

      return NextResponse.json({
        success: true,
        data: projects,
      })
    } catch (error) {
      console.error('Error fetching projects:', error)
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to fetch projects',
        },
        { status: 500 }
      )
    }
  }
)

// POST route requires editor/admin role
export const POST = editorApiRoute(
  async (
    request: NextRequest
  ): Promise<NextResponse<ApiResponse<ProjectWithDetails>>> => {
    try {
      // Parse and validate request body
      const body = await request.json()
      const validatedData = projectSchema.parse(body)

      // Create project with related data in a transaction
      const project = await prisma.$transaction(async tx => {
        // Create the main project
        return await tx.project.create({
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
      })

      // Create project tasks if provided
      if (validatedData.projectTasks.length > 0 && project.id) {
        await prisma.$transaction(async tx => {
          return await tx.projectTask.createMany({
            data: validatedData.projectTasks.map(task => ({
              task: task.task,
              order: task.order,
              projectId: project.id,
            })),
          })
        })
      }

      // Create project skills if provided
      if (validatedData.skillsUtilized.length > 0 && project.id) {
        await prisma.$transaction(async tx => {
          return await tx.projectSkill.createMany({
            data: validatedData.skillsUtilized.map(skill => ({
              name: skill.name,
              order: skill.order,
              projectId: project.id,
            })),
          })
        })
      }

      const finalProject = await prisma.project.findUnique({
        where: { id: project.id },
        include: {
          projectTasks: {
            orderBy: { order: 'asc' },
          },
          skillsUtilized: {
            orderBy: { order: 'asc' },
          },
        },
      })

      if (!finalProject) {
        throw new Error('Failed to create project')
      }

      return NextResponse.json({
        success: true,
        data: finalProject,
        message: 'Project created successfully',
      })
    } catch (error) {
      console.error('Error creating project:', error)

      if (error instanceof Error && error.name === 'ZodError') {
        return NextResponse.json(
          {
            success: false,
            error: 'Invalid project data provided',
          },
          { status: 400 }
        )
      }

      return NextResponse.json(
        {
          success: false,
          error: 'Failed to create project',
        },
        { status: 500 }
      )
    }
  }
)
