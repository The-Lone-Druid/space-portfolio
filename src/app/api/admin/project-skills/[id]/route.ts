import { requireAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { projectSkillSchema } from '@/lib/validations'
import { NextRequest, NextResponse } from 'next/server'

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    await requireAdmin()

    const { id } = await params
    const skillId = parseInt(id)

    if (isNaN(skillId)) {
      return NextResponse.json({ error: 'Invalid skill ID' }, { status: 400 })
    }

    const body = await request.json()
    const validatedData = projectSkillSchema.parse(body)

    const skill = await prisma.projectSkill.update({
      where: { id: skillId },
      data: validatedData,
    })

    return NextResponse.json(skill)
  } catch (error) {
    console.error('Error updating project skill:', error)

    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    return NextResponse.json(
      { error: 'Failed to update project skill' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    await requireAdmin()

    const { id } = await params
    const skillId = parseInt(id)

    if (isNaN(skillId)) {
      return NextResponse.json({ error: 'Invalid skill ID' }, { status: 400 })
    }

    await prisma.projectSkill.delete({
      where: { id: skillId },
    })

    return NextResponse.json(
      { message: 'Skill deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error deleting project skill:', error)

    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    return NextResponse.json(
      { error: 'Failed to delete project skill' },
      { status: 500 }
    )
  }
}
