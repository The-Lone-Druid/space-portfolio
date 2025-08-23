import { getPersonalInfo } from '@/services/portfolio-data'
import type { ApiResponse, PersonalInfoWithSocials } from '@/types'
import { NextResponse } from 'next/server'

export async function GET(): Promise<
  NextResponse<ApiResponse<PersonalInfoWithSocials>>
> {
  try {
    const personalInfo = await getPersonalInfo()

    if (!personalInfo) {
      return NextResponse.json(
        {
          success: false,
          error: 'Personal information not found',
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: personalInfo,
    })
  } catch (error) {
    console.error('Error fetching personal info:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch personal information',
      },
      { status: 500 }
    )
  }
}
