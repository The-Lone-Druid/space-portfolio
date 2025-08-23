import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { personalInfoSchema } from '@/lib/validations'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const personalInfo = await prisma.personalInfo.findFirst({
      include: {
        socialLinks: {
          orderBy: { order: 'asc' },
        },
      },
      where: { isActive: true },
    })

    const heroStats = await prisma.hero.findFirst({
      where: { isActive: true },
    })

    return NextResponse.json({
      personalInfo,
      heroStats,
    })
  } catch (error) {
    console.error('Error fetching personal info:', error)
    return NextResponse.json(
      { error: 'Failed to fetch personal info' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = personalInfoSchema.parse(body)

    // Check if personal info already exists
    const existingInfo = await prisma.personalInfo.findFirst({
      where: { isActive: true },
    })

    let personalInfo
    if (existingInfo) {
      // Update existing
      personalInfo = await prisma.personalInfo.update({
        where: { id: existingInfo.id },
        data: {
          ...validatedData,
          resumeUrl: validatedData.resumeUrl || null,
          updatedAt: new Date(),
        },
        include: {
          socialLinks: {
            orderBy: { order: 'asc' },
          },
        },
      })
    } else {
      // Create new
      personalInfo = await prisma.personalInfo.create({
        data: {
          ...validatedData,
          resumeUrl: validatedData.resumeUrl || null,
        },
        include: {
          socialLinks: {
            orderBy: { order: 'asc' },
          },
        },
      })
    }

    return NextResponse.json(personalInfo)
  } catch (error) {
    console.error('Error saving personal info:', error)
    return NextResponse.json(
      { error: 'Failed to save personal info' },
      { status: 500 }
    )
  }
}
