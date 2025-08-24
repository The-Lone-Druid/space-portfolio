import { prisma } from '@/lib/prisma'
import type {
  Hero,
  PersonalInfoWithSocials,
  ProjectWithDetails,
  Service,
  Skill,
} from '@/types'

// Individual fetch functions for server-side use
export async function getPersonalInfo(): Promise<PersonalInfoWithSocials | null> {
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
}

export async function getHeroStats(): Promise<Hero | null> {
  try {
    return await prisma.hero.findFirst({
      where: { isActive: true },
    })
  } catch (error) {
    console.warn('Error fetching hero stats:', error)
    return null
  }
}

export async function getSkills(): Promise<Skill[]> {
  try {
    return await prisma.skill.findMany({
      where: { isActive: true },
      orderBy: [{ order: 'asc' }, { category: 'asc' }, { name: 'asc' }],
    })
  } catch (error) {
    console.warn('Error fetching skills:', error)
    return []
  }
}

export async function getProjects(): Promise<ProjectWithDetails[]> {
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
}

export async function getServices(): Promise<Service[]> {
  try {
    return await prisma.service.findMany({
      where: { isActive: true },
      orderBy: [{ order: 'asc' }, { name: 'asc' }],
    })
  } catch (error) {
    console.warn('Error fetching services:', error)
    return []
  }
}

// Comprehensive function to fetch all portfolio data
export async function getPortfolioData() {
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
}
