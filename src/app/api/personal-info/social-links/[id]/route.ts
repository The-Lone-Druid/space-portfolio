import { editorApiRoute, publicApiRoute } from '@/lib/auth-utils'
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const socialLinkSchema = z.object({
  name: z.string().min(1, 'Social platform name is required'),
  url: z.string().url('Invalid URL format'),
  icon: z.string().optional(),
  order: z.number().int().min(0).default(0),
})

// GET - Fetch specific social link (Public for portfolio display)
export const GET = publicApiRoute(
  async (
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ) => {
    try {
      const { id } = await params
      const socialLink = await prisma.socialLink.findUnique({
        where: { id, isActive: true },
        include: {
          personalInfo: {
            select: { id: true, name: true },
          },
        },
      })

      if (!socialLink) {
        return NextResponse.json(
          { success: false, error: 'Social link not found' },
          { status: 404 }
        )
      }

      return NextResponse.json({
        success: true,
        data: socialLink,
      })
    } catch (error) {
      console.error('Error fetching social link:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to fetch social link' },
        { status: 500 }
      )
    }
  }
)

// PUT - Update specific social link
export const PUT = editorApiRoute(
  async (
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ) => {
    try {
      const { id } = await params
      const body = await request.json()
      const validatedData = socialLinkSchema.parse(body)

      const existingSocialLink = await prisma.socialLink.findUnique({
        where: { id, isActive: true },
      })

      if (!existingSocialLink) {
        return NextResponse.json(
          { success: false, error: 'Social link not found' },
          { status: 404 }
        )
      }

      const updatedSocialLink = await prisma.socialLink.update({
        where: { id },
        data: validatedData,
      })

      return NextResponse.json({
        success: true,
        data: updatedSocialLink,
      })
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          { success: false, error: 'Validation failed', details: error.issues },
          { status: 400 }
        )
      }

      console.error('Error updating social link:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to update social link' },
        { status: 500 }
      )
    }
  }
)

// DELETE - Remove specific social link
export const DELETE = editorApiRoute(
  async (
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ) => {
    try {
      const { id } = await params
      const existingSocialLink = await prisma.socialLink.findUnique({
        where: { id, isActive: true },
      })

      if (!existingSocialLink) {
        return NextResponse.json(
          { success: false, error: 'Social link not found' },
          { status: 404 }
        )
      }

      // Soft delete by setting isActive to false
      await prisma.socialLink.update({
        where: { id },
        data: { isActive: false },
      })

      return NextResponse.json({
        success: true,
        message: 'Social link deleted successfully',
      })
    } catch (error) {
      console.error('Error deleting social link:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to delete social link' },
        { status: 500 }
      )
    }
  }
)
