import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

// Validation schemas
const personalInfoSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  title: z.string().min(1, 'Title is required'),
  bio: z.string().min(10, 'Bio must be at least 10 characters'),
  email: z.string().email('Invalid email format'),
  location: z.string().min(1, 'Location is required'),
  resumeUrl: z.string().url().optional().or(z.literal('')),
})

const socialLinkSchema = z.object({
  name: z.string().min(1, 'Social platform name is required'),
  url: z.string().url('Invalid URL format'),
  icon: z.string().optional(),
  order: z.number().int().min(0).default(0),
})

const updatePersonalInfoSchema = personalInfoSchema.extend({
  socialLinks: z.array(socialLinkSchema).optional(),
})

// GET - Fetch personal information with social links
export async function GET() {
  try {
    const personalInfo = await prisma.personalInfo.findFirst({
      where: { isActive: true },
      include: {
        socialLinks: {
          where: { isActive: true },
          orderBy: { order: 'asc' },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    if (!personalInfo) {
      return NextResponse.json(
        { success: false, error: 'Personal information not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: personalInfo,
    })
  } catch (error) {
    console.error('Error fetching personal info:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch personal information' },
      { status: 500 }
    )
  }
}

// POST - Create new personal information
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
    const validatedData = updatePersonalInfoSchema.parse(body)

    // Check if active personal info already exists
    const existingInfo = await prisma.personalInfo.findFirst({
      where: { isActive: true },
    })

    if (existingInfo) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Active personal information already exists. Use PUT to update.',
        },
        { status: 409 }
      )
    }

    const { socialLinks, ...personalInfoData } = validatedData

    const personalInfo = await prisma.personalInfo.create({
      data: {
        ...personalInfoData,
        socialLinks: socialLinks
          ? {
              create: socialLinks.map((link, index) => ({
                ...link,
                order: link.order ?? index,
              })),
            }
          : undefined,
      },
      include: {
        socialLinks: {
          where: { isActive: true },
          orderBy: { order: 'asc' },
        },
      },
    })

    return NextResponse.json(
      {
        success: true,
        data: personalInfo,
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

    console.error('Error creating personal info:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create personal information' },
      { status: 500 }
    )
  }
}

// PUT - Update personal information
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const validatedData = updatePersonalInfoSchema.parse(body)

    // Find the active personal info
    const existingInfo = await prisma.personalInfo.findFirst({
      where: { isActive: true },
      include: { socialLinks: true },
    })

    if (!existingInfo) {
      return NextResponse.json(
        { success: false, error: 'No active personal information found' },
        { status: 404 }
      )
    }

    const { socialLinks, ...personalInfoData } = validatedData

    // Use transaction to update personal info and social links
    const updatedPersonalInfo = await prisma.$transaction(async tx => {
      // Update personal info
      await tx.personalInfo.update({
        where: { id: existingInfo.id },
        data: personalInfoData,
      })

      // Handle social links if provided
      if (socialLinks) {
        // Delete existing social links
        await tx.socialLink.deleteMany({
          where: { personalInfoId: existingInfo.id },
        })

        // Create new social links
        if (socialLinks.length > 0) {
          await tx.socialLink.createMany({
            data: socialLinks.map((link, index) => ({
              ...link,
              order: link.order ?? index,
              personalInfoId: existingInfo.id,
            })),
          })
        }
      }

      // Return updated data with social links
      return await tx.personalInfo.findUnique({
        where: { id: existingInfo.id },
        include: {
          socialLinks: {
            where: { isActive: true },
            orderBy: { order: 'asc' },
          },
        },
      })
    })

    return NextResponse.json({
      success: true,
      data: updatedPersonalInfo,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: error.issues },
        { status: 400 }
      )
    }

    console.error('Error updating personal info:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update personal information' },
      { status: 500 }
    )
  }
}

// DELETE - Soft delete personal information
export async function DELETE() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const existingInfo = await prisma.personalInfo.findFirst({
      where: { isActive: true },
    })

    if (!existingInfo) {
      return NextResponse.json(
        { success: false, error: 'No active personal information found' },
        { status: 404 }
      )
    }

    // Soft delete by setting isActive to false
    await prisma.personalInfo.update({
      where: { id: existingInfo.id },
      data: { isActive: false },
    })

    return NextResponse.json({
      success: true,
      message: 'Personal information deleted successfully',
    })
  } catch (error) {
    console.error('Error deleting personal info:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete personal information' },
      { status: 500 }
    )
  }
}
