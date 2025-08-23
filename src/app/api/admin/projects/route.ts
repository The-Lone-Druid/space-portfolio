import { requireAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { projectWithRelationsSchema } from '@/lib/validations'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      include: {
        projectTasks: {
          orderBy: { order: 'asc' },
        },
        skillsUtilized: {
          orderBy: { order: 'asc' },
        },
      },
      orderBy: { order: 'asc' },
    })

    return NextResponse.json(projects)
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin()

    const body = await request.json()
    const validatedData = projectWithRelationsSchema.parse(body)

    const { tasks = [], skills = [], ...projectData } = validatedData

    // Create project with related data in a transaction
    const project = await prisma.$transaction(async tx => {
      // Create the project
      const newProject = await tx.project.create({
        data: projectData,
      })

      // Create tasks if provided
      if (tasks.length > 0) {
        await tx.projectTask.createMany({
          data: tasks.map((task, index) => ({
            projectId: newProject.id,
            task: task.task,
            order: task.order || index,
          })),
        })
      }

      // Create skills if provided
      if (skills.length > 0) {
        await tx.projectSkill.createMany({
          data: skills.map((skill, index) => ({
            projectId: newProject.id,
            name: skill.name,
            order: skill.order || index,
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

    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    console.error('Error creating project:', error)

    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    )
  }
}
