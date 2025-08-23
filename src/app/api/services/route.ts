import { getServices } from '@/services/portfolio-data'
import type { ApiResponse, Service } from '@/types'
import { NextResponse } from 'next/server'

export async function GET(): Promise<NextResponse<ApiResponse<Service[]>>> {
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
