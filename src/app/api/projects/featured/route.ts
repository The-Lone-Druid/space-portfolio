import { prisma } from '@/lib/prisma'
import type { ApiResponse, ProjectWithDetails } from '@/types'
import { NextResponse } from 'next/server'

export async function GET(): Promise<
  NextResponse<ApiResponse<ProjectWithDetails[]>>
> {
  try {
    const featuredProjects = await prisma.project.findMany({
      where: {
        isActive: true,
        featured: true,
      },
      include: {
        projectTasks: {
          orderBy: { order: 'asc' },
        },
        skillsUtilized: {
          orderBy: { order: 'asc' },
        },
      },
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    })

    return NextResponse.json({
      success: true,
      data: featuredProjects,
    })
  } catch (error) {
    console.error('Error fetching featured projects:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch featured projects',
      },
      { status: 500 }
    )
  }
}
