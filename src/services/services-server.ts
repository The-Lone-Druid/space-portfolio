import { prisma } from '@/lib/prisma'
import { unstable_cache } from 'next/cache'

// Server-side cached functions for services data

/**
 * Get all services with server-side caching
 */
export const getServicesServer = unstable_cache(
  async () => {
    try {
      const services = await prisma.service.findMany({
        where: {
          isActive: true,
        },
        orderBy: [{ order: 'asc' }, { name: 'asc' }],
      })

      return services
    } catch (error) {
      console.error('Error fetching services:', error)
      return []
    }
  },
  ['services-server'],
  {
    tags: ['services', 'portfolio-data'],
    revalidate: 60,
  }
)

/**
 * Get a single service by ID with server-side caching
 */
export const getServiceByIdServer = unstable_cache(
  async (id: number) => {
    try {
      const service = await prisma.service.findUnique({
        where: { id },
      })

      return service
    } catch (error) {
      console.error('Error fetching service:', error)
      return null
    }
  },
  ['service-by-id'],
  {
    tags: ['services'],
    revalidate: 60,
  }
)

/**
 * Get services statistics with server-side caching
 */
export const getServicesStats = unstable_cache(
  async () => {
    try {
      const [totalServices, activeServices, lastUpdated, recentServices] =
        await Promise.all([
          prisma.service.count(),
          prisma.service.count({
            where: { isActive: true },
          }),
          prisma.service.findFirst({
            orderBy: { updatedAt: 'desc' },
            select: { updatedAt: true },
          }),
          prisma.service.findMany({
            where: { isActive: true },
            select: { id: true, name: true, desc: true, updatedAt: true },
            orderBy: { updatedAt: 'desc' },
            take: 5,
          }),
        ])

      return {
        totalServices: activeServices, // Only count active services
        activeServices,
        inactiveServices: totalServices - activeServices,
        lastUpdated: lastUpdated?.updatedAt || null,
        recentServices,
      }
    } catch (error) {
      console.error('Error fetching services stats:', error)
      return {
        totalServices: 0,
        activeServices: 0,
        inactiveServices: 0,
        lastUpdated: null,
        recentServices: [],
      }
    }
  },
  ['services-stats'],
  {
    tags: ['services-stats', 'services', 'portfolio-data'],
    revalidate: 60,
  }
)
