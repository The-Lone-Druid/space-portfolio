import { requireAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { projectTaskSchema } from '@/lib/validations'
import { NextRequest, NextResponse } from 'next/server'

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    await requireAdmin()

    const { id } = await params
    const taskId = parseInt(id)

    if (isNaN(taskId)) {
      return NextResponse.json({ error: 'Invalid task ID' }, { status: 400 })
    }

    const body = await request.json()
    const validatedData = projectTaskSchema.parse(body)

    const task = await prisma.projectTask.update({
      where: { id: taskId },
      data: validatedData,
    })

    return NextResponse.json(task)
  } catch (error) {
    console.error('Error updating project task:', error)

    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    return NextResponse.json(
      { error: 'Failed to update project task' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    await requireAdmin()

    const { id } = await params
    const taskId = parseInt(id)

    if (isNaN(taskId)) {
      return NextResponse.json({ error: 'Invalid task ID' }, { status: 400 })
    }

    await prisma.projectTask.delete({
      where: { id: taskId },
    })

    return NextResponse.json(
      { message: 'Task deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error deleting project task:', error)

    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    return NextResponse.json(
      { error: 'Failed to delete project task' },
      { status: 500 }
    )
  }
}
