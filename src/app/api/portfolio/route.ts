import { getPortfolioData } from '@/services/portfolio-service'
import type { ApiResponse, PortfolioData } from '@/types'
import { NextResponse } from 'next/server'

export async function GET(): Promise<NextResponse<ApiResponse<PortfolioData>>> {
  try {
    const data = await getPortfolioData()

    return NextResponse.json({
      success: true,
      data,
    })
  } catch (error) {
    console.warn('Portfolio API error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch portfolio data',
      },
      { status: 500 }
    )
  }
}
