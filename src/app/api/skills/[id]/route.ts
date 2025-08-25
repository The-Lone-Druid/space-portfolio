import { editorApiRoute, publicApiRoute } from '@/lib/api-auth'
import { prisma } from '@/lib/prisma'
import { skillSchema } from '@/lib/validations'
import type { ApiResponse, SkillWithDetails } from '@/types'
import { NextRequest, NextResponse } from 'next/server'

interface Context {
  params: Promise<{ id: string }>
}

export const GET = publicApiRoute(
  async (
    request: NextRequest,
    context: Context
  ): Promise<NextResponse<ApiResponse<SkillWithDetails>>> => {
    try {
      const { id } = await context.params
      const skillId = parseInt(id)

      if (isNaN(skillId)) {
        return NextResponse.json(
          {
            success: false,
            error: 'Invalid skill ID',
          },
          { status: 400 }
        )
      }

      const skill = await prisma.skill.findUnique({
        where: { id: skillId },
      })

      if (!skill) {
        return NextResponse.json(
          {
            success: false,
            error: 'Skill not found',
          },
          { status: 404 }
        )
      }

      return NextResponse.json({
        success: true,
        data: skill,
      })
    } catch (error) {
      console.error('Error fetching skill:', error)
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to fetch skill',
        },
        { status: 500 }
      )
    }
  }
)

export const PUT = editorApiRoute(
  async (
    request: NextRequest,
    context: Context
  ): Promise<NextResponse<ApiResponse<SkillWithDetails>>> => {
    try {
      const { id } = await context.params
      const skillId = parseInt(id)

      if (isNaN(skillId)) {
        return NextResponse.json(
          {
            success: false,
            error: 'Invalid skill ID',
          },
          { status: 400 }
        )
      }

      const body = await request.json()
      const validatedData = skillSchema.parse(body)

      const skill = await prisma.skill.update({
        where: { id: skillId },
        data: validatedData,
      })

      return NextResponse.json({
        success: true,
        data: skill,
        message: 'Skill updated successfully',
      })
    } catch (error) {
      console.error('Failed to update skill:', error)
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to update skill',
        },
        { status: 500 }
      )
    }
  }
)

export const DELETE = editorApiRoute(
  async (
    request: NextRequest,
    context: Context
  ): Promise<NextResponse<ApiResponse<void>>> => {
    try {
      const { id } = await context.params
      const skillId = parseInt(id)

      if (isNaN(skillId)) {
        return NextResponse.json(
          {
            success: false,
            error: 'Invalid skill ID',
          },
          { status: 400 }
        )
      }

      await prisma.skill.delete({
        where: { id: skillId },
      })

      return NextResponse.json({
        success: true,
        message: 'Skill deleted successfully',
      })
    } catch (error) {
      console.error('Failed to delete skill:', error)
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to delete skill',
        },
        { status: 500 }
      )
    }
  }
)
