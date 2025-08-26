import { getHeroStats } from '@/services/portfolio-service'
import type { ApiResponse, Hero } from '@/types'
import { NextResponse } from 'next/server'

export async function GET(): Promise<NextResponse<ApiResponse<Hero>>> {
  try {
    const heroStats = await getHeroStats()

    if (!heroStats) {
      return NextResponse.json(
        {
          success: false,
          error: 'Hero stats not found',
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: heroStats,
    })
  } catch (error) {
    console.error('Error fetching hero stats:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch hero statistics',
      },
      { status: 500 }
    )
  }
}
