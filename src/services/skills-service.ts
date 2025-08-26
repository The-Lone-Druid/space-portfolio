import { prisma } from '@/lib/prisma'
import { unstable_cache } from 'next/cache'

// Server-side cached functions for skills data

/**
 * Get all skills with server-side caching
 */
export const getSkillsServer = unstable_cache(
  async () => {
    try {
      const skills = await prisma.skill.findMany({
        where: {
          isActive: true,
        },
        orderBy: [{ order: 'asc' }, { level: 'desc' }, { name: 'asc' }],
      })

      return skills
    } catch (error) {
      console.error('Error fetching skills:', error)
      return []
    }
  },
  ['skills-server'],
  {
    tags: ['skills', 'portfolio-data'],
    revalidate: 60,
  }
)

/**
 * Get a single skill by ID with server-side caching
 */
export const getSkillByIdServer = unstable_cache(
  async (id: number) => {
    try {
      const skill = await prisma.skill.findUnique({
        where: {
          id,
          isActive: true,
        },
      })

      return skill
    } catch (error) {
      console.error('Error fetching skill:', error)
      return null
    }
  },
  ['skill-by-id'],
  {
    tags: ['skills'],
    revalidate: 60,
  }
)

/**
 * Get skills statistics with server-side caching
 */
export const getSkillsStats = unstable_cache(
  async () => {
    try {
      const [totalSkills, skillsByCategory, avgProficiency, topSkills] =
        await Promise.all([
          // Total active skills count
          prisma.skill.count({
            where: {
              isActive: true,
            },
          }),

          // Skills grouped by category
          prisma.skill.groupBy({
            by: ['category'],
            where: {
              isActive: true,
            },
            _count: {
              category: true,
            },
            orderBy: {
              _count: {
                category: 'desc',
              },
            },
          }),

          // Average proficiency level
          prisma.skill.aggregate({
            where: {
              isActive: true,
            },
            _avg: {
              level: true,
            },
          }),

          // Top proficiency skills
          prisma.skill.findMany({
            where: {
              isActive: true,
              level: {
                gte: 90,
              },
            },
            select: {
              id: true,
              name: true,
              level: true,
              category: true,
            },
            orderBy: {
              level: 'desc',
            },
            take: 5,
          }),
        ])

      // Get the most recent skill update
      const lastUpdated = await prisma.skill.findFirst({
        where: {
          isActive: true,
        },
        select: {
          updatedAt: true,
        },
        orderBy: {
          updatedAt: 'desc',
        },
      })

      return {
        totalSkills,
        skillsByCategory: skillsByCategory.map(item => ({
          category: item.category,
          count: item._count.category,
        })),
        avgProficiency: Math.round(avgProficiency._avg.level || 0),
        topSkills,
        totalCategories: skillsByCategory.length,
        expertSkills: topSkills.length,
        lastUpdated: lastUpdated?.updatedAt || null,
      }
    } catch (error) {
      console.error('Error fetching skills stats:', error)
      return {
        totalSkills: 0,
        skillsByCategory: [],
        avgProficiency: 0,
        topSkills: [],
        totalCategories: 0,
        expertSkills: 0,
        lastUpdated: null,
      }
    }
  },
  ['skills-stats'],
  {
    tags: ['skills-stats', 'skills', 'portfolio-data'],
    revalidate: 60,
  }
)
