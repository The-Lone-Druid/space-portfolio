import { editorApiRoute, publicApiRoute } from '@/lib/auth-utils'
import { prisma } from '@/lib/prisma'
import { serviceSchema } from '@/lib/validations'
import type { ApiResponse, ServiceWithDetails } from '@/types'
import { NextRequest, NextResponse } from 'next/server'

interface Context {
  params: Promise<{ id: string }>
}

export const GET = publicApiRoute(
  async (
    request: NextRequest,
    context: Context
  ): Promise<NextResponse<ApiResponse<ServiceWithDetails>>> => {
    try {
      const { id } = await context.params
      const serviceId = parseInt(id)

      if (isNaN(serviceId)) {
        return NextResponse.json(
          {
            success: false,
            error: 'Invalid service ID',
          },
          { status: 400 }
        )
      }

      const service = await prisma.service.findUnique({
        where: { id: serviceId },
      })

      if (!service) {
        return NextResponse.json(
          {
            success: false,
            error: 'Service not found',
          },
          { status: 404 }
        )
      }

      return NextResponse.json({
        success: true,
        data: service,
      })
    } catch (error) {
      console.error('Failed to fetch service:', error)
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to fetch service',
        },
        { status: 500 }
      )
    }
  }
)

export const PUT = editorApiRoute(
  async (
    request: NextRequest,
    context: Context
  ): Promise<NextResponse<ApiResponse<ServiceWithDetails>>> => {
    try {
      const { id } = await context.params
      const serviceId = parseInt(id)

      if (isNaN(serviceId)) {
        return NextResponse.json(
          {
            success: false,
            error: 'Invalid service ID',
          },
          { status: 400 }
        )
      }

      const body = await request.json()
      const validatedData = serviceSchema.parse(body)

      const service = await prisma.service.update({
        where: { id: serviceId },
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
        message: 'Service updated successfully',
      })
    } catch (error) {
      console.error('Failed to update service:', error)
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to update service',
        },
        { status: 500 }
      )
    }
  }
)

export const DELETE = editorApiRoute(
  async (
    request: NextRequest,
    context: Context
  ): Promise<NextResponse<ApiResponse<void>>> => {
    try {
      const { id } = await context.params
      const serviceId = parseInt(id)

      if (isNaN(serviceId)) {
        return NextResponse.json(
          {
            success: false,
            error: 'Invalid service ID',
          },
          { status: 400 }
        )
      }

      await prisma.service.delete({
        where: { id: serviceId },
      })

      return NextResponse.json({
        success: true,
        message: 'Service deleted successfully',
      })
    } catch (error) {
      console.error('Failed to delete service:', error)
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to delete service',
        },
        { status: 500 }
      )
    }
  }
)
