import { getProjects } from '@/services/portfolio-data'
import type { ApiResponse, ProjectWithDetails } from '@/types'
import { NextResponse } from 'next/server'

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
