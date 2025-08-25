import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl
    const tag = searchParams.get('tag')
    const path = searchParams.get('path')

    // Revalidate by path (higher priority)
    if (path) {
      revalidatePath(path)
      return NextResponse.json({
        success: true,
        message: `Path revalidated: ${path}`,
        revalidated: true,
        type: 'path',
        target: path,
        timestamp: new Date().toISOString(),
      })
    }

    // Revalidate by tag
    if (tag) {
      revalidateTag(tag)
      return NextResponse.json({
        success: true,
        message: `Cache invalidated for tag: ${tag}`,
        revalidated: true,
        type: 'tag',
        target: tag,
        timestamp: new Date().toISOString(),
      })
    }

    // If no path or tag specified, return error
    return NextResponse.json(
      {
        success: false,
        error: 'Either "path" or "tag" parameter is required',
        usage: {
          path: '/api/revalidate?path=/',
          tag: '/api/revalidate?tag=portfolio-data',
        },
      },
      { status: 400 }
    )
  } catch (error) {
    console.error('Error revalidating cache:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to revalidate cache',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

// GET method for easy testing and homepage revalidation
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl
    const path = searchParams.get('path') || '/'

    revalidatePath(path)

    return NextResponse.json({
      success: true,
      message: `Successfully revalidated: ${path}`,
      revalidated: true,
      type: 'path',
      target: path,
      method: 'GET',
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('GET revalidation error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to revalidate',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
