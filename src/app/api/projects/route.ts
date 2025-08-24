import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { projectSchema } from '@/lib/validations'
import { getProjects } from '@/services/portfolio-data'
import type { ApiResponse, ProjectWithDetails } from '@/types'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(): Promise<
  NextResponse<ApiResponse<ProjectWithDetails[]>>
> {
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

export async function POST(
  request: NextRequest
): Promise<NextResponse<ApiResponse<ProjectWithDetails>>> {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json(
        {
          success: false,
          error: 'Unauthorized - Please sign in',
        },
        { status: 401 }
      )
    }

    // Parse and validate request body
    const body = await request.json()
    const validatedData = projectSchema.parse(body)

    // Create project with related data in a transaction
    const project = await prisma.$transaction(async tx => {
      // Create the main project
      const newProject = await tx.project.create({
        data: {
          projectName: validatedData.projectName,
          projectDate: validatedData.projectDate,
          projectDescription: validatedData.projectDescription,
          projectLink: validatedData.projectLink || null,
          githubLink: validatedData.githubLink || null,
          featured: validatedData.featured,
          order: validatedData.order,
          isActive: validatedData.isActive,
        },
      })

      // Create project tasks if provided
      if (validatedData.projectTasks.length > 0) {
        await tx.projectTask.createMany({
          data: validatedData.projectTasks.map(task => ({
            task: task.task,
            order: task.order,
            projectId: newProject.id,
          })),
        })
      }

      // Create project skills if provided
      if (validatedData.skillsUtilized.length > 0) {
        await tx.projectSkill.createMany({
          data: validatedData.skillsUtilized.map(skill => ({
            name: skill.name,
            order: skill.order,
            projectId: newProject.id,
          })),
        })
      }

      // Fetch the complete project with relations
      return await tx.project.findUnique({
        where: { id: newProject.id },
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
      throw new Error('Failed to create project')
    }

    return NextResponse.json({
      success: true,
      data: project,
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
