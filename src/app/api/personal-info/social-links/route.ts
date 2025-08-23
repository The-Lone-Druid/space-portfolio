import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const socialLinkSchema = z.object({
  name: z.string().min(1, 'Social platform name is required'),
  url: z.string().url('Invalid URL format'),
  icon: z.string().optional(),
  order: z.number().int().min(0).default(0),
})

// GET - Fetch all social links
export async function GET() {
  try {
    const socialLinks = await prisma.socialLink.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
      include: {
        personalInfo: {
          select: { id: true, name: true },
        },
      },
    })

    return NextResponse.json({
      success: true,
      data: socialLinks,
    })
  } catch (error) {
    console.error('Error fetching social links:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch social links' },
      { status: 500 }
    )
  }
}

// POST - Create new social link
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const validatedData = socialLinkSchema.parse(body)

    // Find active personal info to attach the social link
    const personalInfo = await prisma.personalInfo.findFirst({
      where: { isActive: true },
    })

    if (!personalInfo) {
      return NextResponse.json(
        {
          success: false,
          error:
            'No active personal information found. Create personal info first.',
        },
        { status: 404 }
      )
    }

    // Get the highest order number for proper ordering
    const lastSocialLink = await prisma.socialLink.findFirst({
      where: { personalInfoId: personalInfo.id, isActive: true },
      orderBy: { order: 'desc' },
    })

    const nextOrder = lastSocialLink ? lastSocialLink.order + 1 : 0

    const socialLink = await prisma.socialLink.create({
      data: {
        ...validatedData,
        order: validatedData.order || nextOrder,
        personalInfoId: personalInfo.id,
      },
    })

    return NextResponse.json(
      {
        success: true,
        data: socialLink,
      },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: error.issues },
        { status: 400 }
      )
    }

    console.error('Error creating social link:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create social link' },
      { status: 500 }
    )
  }
}
