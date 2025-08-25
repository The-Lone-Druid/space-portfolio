import { prisma } from '@/lib/prisma'
import type {
  Hero,
  PersonalInfoWithSocials,
  ProjectWithDetails,
  Service,
  Skill,
} from '@/types'
import { unstable_cache } from 'next/cache'

// Individual fetch functions for server-side use with cache tags
export const getPersonalInfo = unstable_cache(
  async (): Promise<PersonalInfoWithSocials | null> => {
    try {
      return await prisma.personalInfo.findFirst({
        where: { isActive: true },
        include: {
          socialLinks: {
            where: { isActive: true },
            orderBy: { order: 'asc' },
          },
        },
      })
    } catch (error) {
      // Use console.warn instead of console.error for better accessibility
      console.warn('Error fetching personal info:', error)
      return null
    }
  },
  ['personal-info'],
  {
    tags: ['personal-info', 'portfolio-data'],
  }
)

export const getHeroStats = unstable_cache(
  async (): Promise<Hero | null> => {
    try {
      return await prisma.hero.findFirst({
        where: { isActive: true },
      })
    } catch (error) {
      console.warn('Error fetching hero stats:', error)
      return null
    }
  },
  ['hero-stats'],
  {
    tags: ['hero-stats', 'portfolio-data'],
  }
)

export const getSkills = unstable_cache(
  async (): Promise<Skill[]> => {
    try {
      return await prisma.skill.findMany({
        where: { isActive: true },
        orderBy: [{ order: 'asc' }, { category: 'asc' }, { name: 'asc' }],
      })
    } catch (error) {
      console.warn('Error fetching skills:', error)
      return []
    }
  },
  ['skills'],
  {
    tags: ['skills', 'portfolio-data'],
  }
)

export const getProjects = unstable_cache(
  async (): Promise<ProjectWithDetails[]> => {
    try {
      return await prisma.project.findMany({
        where: { isActive: true },
        include: {
          projectTasks: {
            orderBy: { order: 'asc' },
          },
          skillsUtilized: {
            orderBy: { order: 'asc' },
          },
        },
        orderBy: [
          { isOngoing: 'desc' }, // Ongoing projects first
          { startDate: 'desc' }, // Most recent start date first
          { featured: 'desc' }, // Featured projects higher
          { createdAt: 'desc' }, // Most recently created first
        ],
      })
    } catch (error) {
      console.warn('Error fetching projects:', error)
      return []
    }
  },
  ['projects'],
  {
    tags: ['projects', 'portfolio-data'],
  }
)

export const getServices = unstable_cache(
  async (): Promise<Service[]> => {
    try {
      return await prisma.service.findMany({
        where: { isActive: true },
        orderBy: [{ order: 'asc' }, { name: 'asc' }],
      })
    } catch (error) {
      console.warn('Error fetching services:', error)
      return []
    }
  },
  ['services'],
  {
    tags: ['services', 'portfolio-data'],
  }
)

// Comprehensive function to fetch all portfolio data with caching
export const getPortfolioData = unstable_cache(
  async () => {
    try {
      const [personalInfo, heroStats, skills, projects, services] =
        await Promise.all([
          getPersonalInfo(),
          getHeroStats(),
          getSkills(),
          getProjects(),
          getServices(),
        ])

      return {
        personalInfo,
        heroStats,
        skills,
        projects,
        services,
      }
    } catch (error) {
      console.warn('Error fetching portfolio data:', error)
      throw new Error('Failed to fetch portfolio data')
    }
  },
  ['portfolio-data-complete'],
  {
    tags: ['portfolio-data-complete', 'portfolio-data'],
  }
)
