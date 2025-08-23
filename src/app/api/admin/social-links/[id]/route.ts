import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { socialLinkSchema } from '@/lib/validations'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const session = await getServerSession(authOptions)

    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = socialLinkSchema.parse(body)

    const socialLink = await prisma.socialLink.update({
      where: { id },
      data: {
        ...validatedData,
        updatedAt: new Date(),
      },
    })

    return NextResponse.json(socialLink)
  } catch (error) {
    console.error('Error updating social link:', error)
    return NextResponse.json(
      { error: 'Failed to update social link' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const session = await getServerSession(authOptions)

    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await prisma.socialLink.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting social link:', error)
    return NextResponse.json(
      { error: 'Failed to delete social link' },
      { status: 500 }
    )
  }
}
