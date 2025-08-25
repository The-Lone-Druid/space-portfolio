import { prisma } from '@/lib/prisma'
import { unstable_cache } from 'next/cache'

// Server-side data fetching for personal info (cached)
export const getPersonalInfoServer = unstable_cache(
  async () => {
    try {
      const personalInfo = await prisma.personalInfo.findFirst({
        where: { isActive: true },
        include: {
          socialLinks: {
            where: { isActive: true },
            orderBy: { order: 'asc' },
          },
        },
        orderBy: { createdAt: 'desc' },
      })

      return personalInfo
    } catch (error) {
      console.error('Error fetching personal info server-side:', error)
      return null
    }
  },
  ['personal-info-server'],
  {
    tags: ['personal-info', 'portfolio-data'],
    revalidate: 60,
  }
)

// Check if personal info exists
export const checkPersonalInfoExists = unstable_cache(
  async () => {
    try {
      const count = await prisma.personalInfo.count({
        where: { isActive: true },
      })
      return count > 0
    } catch (error) {
      console.error('Error checking personal info existence:', error)
      return false
    }
  },
  ['personal-info-exists'],
  {
    tags: ['personal-info'],
    revalidate: 60,
  }
)

// Get social links only
export const getSocialLinksServer = unstable_cache(
  async () => {
    try {
      const socialLinks = await prisma.socialLink.findMany({
        where: { isActive: true },
        orderBy: { order: 'asc' },
      })

      return socialLinks
    } catch (error) {
      console.error('Error fetching social links server-side:', error)
      return []
    }
  },
  ['social-links-server'],
  {
    tags: ['social-links', 'personal-info'],
    revalidate: 60,
  }
)

// Get personal info statistics
export const getPersonalInfoStats = unstable_cache(
  async () => {
    try {
      const [socialLinksCount, personalInfoExists] = await Promise.all([
        prisma.socialLink.count({ where: { isActive: true } }),
        checkPersonalInfoExists(),
      ])

      return {
        socialLinksCount,
        personalInfoExists,
        lastUpdated: personalInfoExists
          ? await prisma.personalInfo
              .findFirst({
                where: { isActive: true },
                select: { updatedAt: true },
                orderBy: { updatedAt: 'desc' },
              })
              ?.then(info => info?.updatedAt)
          : null,
      }
    } catch (error) {
      console.error('Error fetching personal info stats:', error)
      return {
        socialLinksCount: 0,
        personalInfoExists: false,
        lastUpdated: null,
      }
    }
  },
  ['personal-info-stats'],
  {
    tags: ['personal-info-stats', 'personal-info', 'social-links'],
    revalidate: 60,
  }
)
