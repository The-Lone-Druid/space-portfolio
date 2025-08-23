import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { socialLinkSchema } from '@/lib/validations'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = socialLinkSchema.parse(body)

    // Get the personal info to link to
    const personalInfo = await prisma.personalInfo.findFirst({
      where: { isActive: true },
    })

    if (!personalInfo) {
      return NextResponse.json(
        { error: 'No personal info found. Please create personal info first.' },
        { status: 400 }
      )
    }

    // Get the next order number
    const lastSocialLink = await prisma.socialLink.findFirst({
      where: { personalInfoId: personalInfo.id },
      orderBy: { order: 'desc' },
    })

    const socialLink = await prisma.socialLink.create({
      data: {
        ...validatedData,
        personalInfoId: personalInfo.id,
        order: (lastSocialLink?.order || 0) + 1,
      },
    })

    return NextResponse.json(socialLink)
  } catch (error) {
    console.error('Error creating social link:', error)
    return NextResponse.json(
      { error: 'Failed to create social link' },
      { status: 500 }
    )
  }
}
