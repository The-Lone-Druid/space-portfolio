import { prisma } from '@/lib/prisma'
import { skillSchema } from '@/lib/validations'
import { getSkills } from '@/services/portfolio-data'
import type { ApiResponse, Skill, SkillWithDetails } from '@/types'
import { NextRequest, NextResponse } from 'next/server'

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

export async function POST(
  request: NextRequest
): Promise<NextResponse<ApiResponse<SkillWithDetails>>> {
  try {
    const body = await request.json()
    const validatedData = skillSchema.parse(body)

    const skill = await prisma.skill.create({
      data: validatedData,
    })

    return NextResponse.json({
      success: true,
      data: skill,
      message: 'Skill created successfully',
    })
  } catch (error) {
    console.error('Failed to create skill:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create skill',
      },
      { status: 500 }
    )
  }
}
