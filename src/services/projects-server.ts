import { prisma } from '@/lib/prisma'
import { cache } from 'react'

// Server-side data fetching for projects (cached)
export const getProjectsServer = cache(async () => {
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
      orderBy: { order: 'asc' },
    })

    return projects
  } catch (error) {
    console.error('Error fetching projects server-side:', error)
    return []
  }
})

// Get single project by ID
export const getProjectByIdServer = cache(async (id: number) => {
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
})

// Get featured projects
export const getFeaturedProjectsServer = cache(async () => {
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
      orderBy: { order: 'asc' },
    })

    return projects
  } catch (error) {
    console.error('Error fetching featured projects server-side:', error)
    return []
  }
})

// Get projects statistics
export const getProjectsStats = cache(async () => {
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
})

// Check if projects exist
export const checkProjectsExist = cache(async () => {
  try {
    const count = await prisma.project.count({
      where: { isActive: true },
    })
    return count > 0
  } catch (error) {
    console.error('Error checking projects existence:', error)
    return false
  }
})
