import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { heroStatsSchema } from '@/lib/validations'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = heroStatsSchema.parse(body)

    // Check if hero stats already exist
    const existingStats = await prisma.hero.findFirst({
      where: { isActive: true },
    })

    let heroStats
    if (existingStats) {
      // Update existing
      heroStats = await prisma.hero.update({
        where: { id: existingStats.id },
        data: {
          ...validatedData,
          updatedAt: new Date(),
        },
      })
    } else {
      // Create new
      heroStats = await prisma.hero.create({
        data: validatedData,
      })
    }

    return NextResponse.json(heroStats)
  } catch (error) {
    console.error('Error saving hero stats:', error)
    return NextResponse.json(
      { error: 'Failed to save hero stats' },
      { status: 500 }
    )
  }
}
