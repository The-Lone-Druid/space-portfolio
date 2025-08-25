import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl
    const tag = searchParams.get('tag')

    if (!tag) {
      return NextResponse.json(
        { success: false, error: 'Tag parameter is required' },
        { status: 400 }
      )
    }

    // Revalidate the specified cache tag
    revalidateTag(tag)

    return NextResponse.json({
      success: true,
      message: `Cache invalidated for tag: ${tag}`,
      revalidated: true,
      now: Date.now(),
    })
  } catch (error) {
    console.error('Error revalidating cache:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to revalidate cache',
      },
      { status: 500 }
    )
  }
}
