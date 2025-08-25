import { prisma } from '@/lib/prisma'
import { settingSchema } from '@/lib/validations'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

// GET /api/settings - Get all settings
export async function GET() {
  try {
    const settings = await prisma.siteSettings.findMany({
      orderBy: [{ key: 'asc' }],
    })

    return NextResponse.json(settings)
  } catch (error) {
    console.error('Error fetching settings:', error)
    return NextResponse.json(
      { message: 'Failed to fetch settings' },
      { status: 500 }
    )
  }
}

// POST /api/settings - Create new setting
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = settingSchema.parse(body)

    // Check if setting with this key already exists
    const existingSetting = await prisma.siteSettings.findUnique({
      where: { key: validatedData.key },
    })

    if (existingSetting) {
      return NextResponse.json(
        { message: 'Setting with this key already exists' },
        { status: 400 }
      )
    }

    const setting = await prisma.siteSettings.create({
      data: validatedData,
    })

    return NextResponse.json(setting, { status: 201 })
  } catch (error) {
    console.error('Error creating setting:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: 'Validation error', errors: error.issues },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { message: 'Failed to create setting' },
      { status: 500 }
    )
  }
}
