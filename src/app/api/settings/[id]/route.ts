import { adminApiRoute } from '@/lib/auth-utils'
import { prisma } from '@/lib/prisma'
import { settingUpdateSchema } from '@/lib/validations'
import { NextRequest, NextResponse } from 'next/server'
import type { ApiResponse, RouteParams, SiteSettings } from '@/types'
import { z } from 'zod'

// GET /api/settings/[id] - Get setting by ID (Admin only)
export const GET = adminApiRoute(
  async (
    request: NextRequest,
    { params }: RouteParams
  ): Promise<NextResponse<ApiResponse<SiteSettings>>> => {
    try {
      const { id } = await params

      const setting = await prisma.siteSettings.findUnique({
        where: { id },
      })

      if (!setting) {
        return NextResponse.json(
          { success: false, error: 'Setting not found' },
          { status: 404 }
        )
      }

      return NextResponse.json({
        success: true,
        data: setting,
      })
    } catch (error) {
      console.error('Error fetching setting:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to fetch setting' },
        { status: 500 }
      )
    }
  }
)

// PATCH /api/settings/[id] - Update setting (Admin only)
export const PATCH = adminApiRoute(
  async (
    request: NextRequest,
    { params }: RouteParams
  ): Promise<NextResponse<ApiResponse<SiteSettings>>> => {
    try {
      const { id } = await params
      const body = await request.json()
      const validatedData = settingUpdateSchema.parse(body)

      // Check if setting exists
      const existingSetting = await prisma.siteSettings.findUnique({
        where: { id },
      })

      if (!existingSetting) {
        return NextResponse.json(
          { success: false, error: 'Setting not found' },
          { status: 404 }
        )
      }

      // If updating key, check if new key already exists
      if (validatedData.key && validatedData.key !== existingSetting.key) {
        const keyExists = await prisma.siteSettings.findUnique({
          where: { key: validatedData.key },
        })

        if (keyExists) {
          return NextResponse.json(
            { success: false, error: 'Setting with this key already exists' },
            { status: 400 }
          )
        }
      }

      const setting = await prisma.siteSettings.update({
        where: { id },
        data: validatedData,
      })

      return NextResponse.json({
        success: true,
        data: setting,
        message: 'Setting updated successfully',
      })
    } catch (error) {
      console.error('Error updating setting:', error)

      if (error instanceof z.ZodError) {
        return NextResponse.json(
          { success: false, error: 'Invalid setting data provided' },
          { status: 400 }
        )
      }

      return NextResponse.json(
        { success: false, error: 'Failed to update setting' },
        { status: 500 }
      )
    }
  }
)

// DELETE /api/settings/[id] - Delete setting (Admin only)
export const DELETE = adminApiRoute(
  async (
    request: NextRequest,
    { params }: RouteParams
  ): Promise<NextResponse<ApiResponse<null>>> => {
    try {
      const { id } = await params

      // Check if setting exists
      const existingSetting = await prisma.siteSettings.findUnique({
        where: { id },
      })

      if (!existingSetting) {
        return NextResponse.json(
          { success: false, error: 'Setting not found' },
          { status: 404 }
        )
      }

      await prisma.siteSettings.delete({
        where: { id },
      })

      return NextResponse.json({
        success: true,
        data: null,
        message: 'Setting deleted successfully',
      })
    } catch (error) {
      console.error('Error deleting setting:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to delete setting' },
        { status: 500 }
      )
    }
  }
)
