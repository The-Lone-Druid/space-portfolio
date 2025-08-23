import { getSkills } from '@/services/portfolio-data'
import type { ApiResponse, Skill } from '@/types'
import { NextResponse } from 'next/server'

export async function GET(): Promise<NextResponse<ApiResponse<Skill[]>>> {
  try {
    const skills = await getSkills()

    return NextResponse.json({
      success: true,
      data: skills,
    })
  } catch (error) {
    console.error('Error fetching skills:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch skills',
      },
      { status: 500 }
    )
  }
}
