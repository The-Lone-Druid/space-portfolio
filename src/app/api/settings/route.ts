import { adminApiRoute } from '@/lib/auth-utils'
import { prisma } from '@/lib/prisma'
import { settingSchema } from '@/lib/validations'
import { NextRequest, NextResponse } from 'next/server'
import type { ApiResponse, SiteSettings } from '@/types'

// GET /api/settings - Get all settings (Admin only)
export const GET = adminApiRoute(
  async (): Promise<NextResponse<ApiResponse<SiteSettings[]>>> => {
    try {
      const settings = await prisma.siteSettings.findMany({
        orderBy: [{ key: 'asc' }],
      })

      return NextResponse.json({
        success: true,
        data: settings,
      })
    } catch (error) {
      console.error('Error fetching settings:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to fetch settings' },
        { status: 500 }
      )
    }
  }
)

// POST /api/settings - Create new setting (Admin only)
export const POST = adminApiRoute(
  async (
    request: NextRequest
  ): Promise<NextResponse<ApiResponse<SiteSettings>>> => {
    try {
      const body = await request.json()
      const validatedData = settingSchema.parse(body)

      const existingSetting = await prisma.siteSettings.findUnique({
        where: { key: validatedData.key },
      })

      if (existingSetting) {
        return NextResponse.json(
          { success: false, error: 'Setting with this key already exists' },
          { status: 400 }
        )
      }

      const setting = await prisma.siteSettings.create({
        data: validatedData,
      })

      return NextResponse.json(
        {
          success: true,
          data: setting,
          message: 'Setting created successfully',
        },
        { status: 201 }
      )
    } catch (error) {
      console.error('Error creating setting:', error)

      if (error instanceof Error && error.name === 'ZodError') {
        return NextResponse.json(
          { success: false, error: 'Invalid setting data provided' },
          { status: 400 }
        )
      }

      return NextResponse.json(
        { success: false, error: 'Failed to create setting' },
        { status: 500 }
      )
    }
  }
)
