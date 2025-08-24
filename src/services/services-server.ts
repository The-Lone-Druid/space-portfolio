import { prisma } from '@/lib/prisma'
import { cache } from 'react'

// Server-side cached functions for services data

/**
 * Get all services with server-side caching
 */
export const getServicesServer = cache(async () => {
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
})

/**
 * Get a single service by ID with server-side caching
 */
export const getServiceByIdServer = cache(async (id: number) => {
  try {
    const service = await prisma.service.findUnique({
      where: { id },
    })

    return service
  } catch (error) {
    console.error('Error fetching service:', error)
    return null
  }
})

/**
 * Get services statistics with server-side caching
 */
export const getServicesStats = cache(async () => {
  try {
    const [totalServices, activeServices, lastUpdated] = await Promise.all([
      prisma.service.count(),
      prisma.service.count({
        where: { isActive: true },
      }),
      prisma.service.findFirst({
        orderBy: { updatedAt: 'desc' },
        select: { updatedAt: true },
      }),
    ])

    return {
      totalServices,
      activeServices,
      inactiveServices: totalServices - activeServices,
      lastUpdated: lastUpdated?.updatedAt || null,
    }
  } catch (error) {
    console.error('Error fetching services stats:', error)
    return {
      totalServices: 0,
      activeServices: 0,
      inactiveServices: 0,
      lastUpdated: null,
    }
  }
})
