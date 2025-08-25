import { prisma } from '@/lib/prisma'
import { settingUpdateSchema } from '@/lib/validations'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

interface RouteParams {
  params: Promise<{
    id: string
  }>
}

// GET /api/settings/[id] - Get setting by ID
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params

    const setting = await prisma.siteSettings.findUnique({
      where: { id },
    })

    if (!setting) {
      return NextResponse.json(
        { message: 'Setting not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(setting)
  } catch (error) {
    console.error('Error fetching setting:', error)
    return NextResponse.json(
      { message: 'Failed to fetch setting' },
      { status: 500 }
    )
  }
}

// PATCH /api/settings/[id] - Update setting
export async function PATCH(request: NextRequest, { params }: RouteParams) {
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
        { message: 'Setting not found' },
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
          { message: 'Setting with this key already exists' },
          { status: 400 }
        )
      }
    }

    const setting = await prisma.siteSettings.update({
      where: { id },
      data: validatedData,
    })

    return NextResponse.json(setting)
  } catch (error) {
    console.error('Error updating setting:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: 'Validation error', errors: error.issues },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { message: 'Failed to update setting' },
      { status: 500 }
    )
  }
}

// DELETE /api/settings/[id] - Delete setting
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params

    // Check if setting exists
    const existingSetting = await prisma.siteSettings.findUnique({
      where: { id },
    })

    if (!existingSetting) {
      return NextResponse.json(
        { message: 'Setting not found' },
        { status: 404 }
      )
    }

    await prisma.siteSettings.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Setting deleted successfully' })
  } catch (error) {
    console.error('Error deleting setting:', error)
    return NextResponse.json(
      { message: 'Failed to delete setting' },
      { status: 500 }
    )
  }
}
