import { prisma } from '@/lib/prisma'
import { unstable_cache } from 'next/cache'

// Server-side data fetching for projects (cached with tags)
export const getProjectsServer = unstable_cache(
  async () => {
    try {
      const projects = await prisma.project.findMany({
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

      return projects
    } catch (error) {
      console.error('Error fetching projects server-side:', error)
      return []
    }
  },
  ['projects-server'],
  {
    tags: ['projects', 'portfolio-data'],
    revalidate: 60,
  }
)

// Get single project by ID
export const getProjectByIdServer = unstable_cache(
  async (id: number) => {
    try {
      const project = await prisma.project.findUnique({
        where: { id, isActive: true },
        include: {
          projectTasks: {
            orderBy: { order: 'asc' },
          },
          skillsUtilized: {
            orderBy: { order: 'asc' },
          },
        },
      })

      return project
    } catch (error) {
      console.error('Error fetching project by ID server-side:', error)
      return null
    }
  },
  ['project-by-id'],
  {
    tags: ['projects'],
    revalidate: 60,
  }
)

// Get featured projects
export const getFeaturedProjectsServer = unstable_cache(
  async () => {
    try {
      const projects = await prisma.project.findMany({
        where: {
          isActive: true,
          featured: true,
        },
        include: {
          projectTasks: {
            orderBy: { order: 'asc' },
          },
          skillsUtilized: {
            orderBy: { order: 'asc' },
          },
        },
        orderBy: [
          { isOngoing: 'desc' },
          { startDate: 'desc' },
          { order: 'asc' },
        ],
      })

      return projects
    } catch (error) {
      console.error('Error fetching featured projects server-side:', error)
      return []
    }
  },
  ['featured-projects'],
  {
    tags: ['projects', 'featured-projects'],
    revalidate: 60,
  }
)

// Get projects statistics
export const getProjectsStats = unstable_cache(
  async () => {
    try {
      const [totalProjects, featuredProjects] = await Promise.all([
        prisma.project.count({ where: { isActive: true } }),
        prisma.project.count({ where: { isActive: true, featured: true } }),
      ])

      // Get latest project update
      const latestProject = await prisma.project.findFirst({
        where: { isActive: true },
        select: { updatedAt: true },
        orderBy: { updatedAt: 'desc' },
      })

      return {
        totalProjects,
        featuredProjects,
        lastUpdated: latestProject?.updatedAt || null,
      }
    } catch (error) {
      console.error('Error fetching projects stats:', error)
      return {
        totalProjects: 0,
        featuredProjects: 0,
        lastUpdated: null,
      }
    }
  },
  ['projects-stats'],
  {
    tags: ['projects-stats', 'projects', 'portfolio-data'],
    revalidate: 60,
  }
)

// Check if projects exist
export const checkProjectsExist = unstable_cache(
  async () => {
    try {
      const count = await prisma.project.count({
        where: { isActive: true },
      })
      return count > 0
    } catch (error) {
      console.error('Error checking projects existence:', error)
      return false
    }
  },
  ['projects-exist'],
  {
    tags: ['projects'],
    revalidate: 60,
  }
)
