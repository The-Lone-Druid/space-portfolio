import { requireAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { projectSkillSchema } from '@/lib/validations'
import { NextRequest, NextResponse } from 'next/server'

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    await requireAdmin()

    const { id } = await params
    const projectId = parseInt(id)

    if (isNaN(projectId)) {
      return NextResponse.json({ error: 'Invalid project ID' }, { status: 400 })
    }

    const body = await request.json()
    const validatedData = projectSkillSchema.parse(body)

    const skill = await prisma.projectSkill.create({
      data: {
        ...validatedData,
        projectId,
      },
    })

    return NextResponse.json(skill, { status: 201 })
  } catch (error) {
    console.error('Error creating project skill:', error)

    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    return NextResponse.json(
      { error: 'Failed to create project skill' },
      { status: 500 }
    )
  }
}
