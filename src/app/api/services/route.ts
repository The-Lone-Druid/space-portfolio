import { editorApiRoute, publicApiRoute } from '@/lib/api-auth'
import { prisma } from '@/lib/prisma'
import { serviceSchema } from '@/lib/validations'
import { getServices } from '@/services/portfolio-data'
import type { ApiResponse, Service, ServiceWithDetails } from '@/types'
import { NextRequest, NextResponse } from 'next/server'

// GET route is public (for displaying services on portfolio)
export const GET = publicApiRoute(
  async (): Promise<NextResponse<ApiResponse<Service[]>>> => {
    try {
      const services = await getServices()

      return NextResponse.json({
        success: true,
        data: services,
      })
    } catch (error) {
      console.error('Error fetching services:', error)
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to fetch services',
        },
        { status: 500 }
      )
    }
  }
)

// POST route requires editor/admin role
export const POST = editorApiRoute(
  async (
    request: NextRequest
  ): Promise<NextResponse<ApiResponse<ServiceWithDetails>>> => {
    try {
      const body = await request.json()
      const validatedData = serviceSchema.parse(body)

      const service = await prisma.service.create({
        data: {
          name: validatedData.name,
          desc: validatedData.desc,
          icon: validatedData.icon,
          order: validatedData.order,
          isActive: validatedData.isActive,
        },
      })

      return NextResponse.json({
        success: true,
        data: service,
        message: 'Service created successfully',
      })
    } catch (error) {
      console.error('Failed to create service:', error)
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to create service',
        },
        { status: 500 }
      )
    }
  }
)
