import { prisma } from '@/lib/prisma'
import { SettingType } from '@prisma/client'
import { unstable_cache } from 'next/cache'

export type SiteSettingWithDetails = {
  id: string
  key: string
  value: string
  description: string | null
  type: SettingType
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export type SettingStats = {
  totalSettings: number
  activeSettings: number
  inactiveSettings: number
  lastUpdated: Date | null
  byType: Array<{
    type: string
    _count: number
  }>
}

// Get all settings with caching
export const getSettingsServer = unstable_cache(
  async (): Promise<SiteSettingWithDetails[]> => {
    const settings = await prisma.siteSettings.findMany({
      orderBy: [{ key: 'asc' }],
    })
    return settings
  },
  ['settings'],
  {
    tags: ['settings', 'dashboard'],
    revalidate: 3600, // 1 hour
  }
)

// Get settings statistics
export const getSettingsStats = unstable_cache(
  async (): Promise<SettingStats> => {
    const [totalSettings, activeSettings, lastUpdatedSetting, typeBreakdown] =
      await Promise.all([
        prisma.siteSettings.count(),
        prisma.siteSettings.count({ where: { isActive: true } }),
        prisma.siteSettings.findFirst({
          orderBy: { updatedAt: 'desc' },
          select: { updatedAt: true },
        }),
        prisma.siteSettings.groupBy({
          by: ['type'],
          _count: {
            _all: true,
          },
        }),
      ])

    return {
      totalSettings,
      activeSettings,
      inactiveSettings: totalSettings - activeSettings,
      lastUpdated: lastUpdatedSetting?.updatedAt || null,
      byType: typeBreakdown.map(item => ({
        type: item.type,
        _count: item._count._all,
      })),
    }
  },
  ['settings-stats'],
  {
    tags: ['settings', 'dashboard'],
    revalidate: 3600, // 1 hour
  }
)

// Get setting by ID
export const getSettingByIdServer = unstable_cache(
  async (id: string): Promise<SiteSettingWithDetails | null> => {
    const setting = await prisma.siteSettings.findUnique({
      where: { id },
    })
    return setting
  },
  ['setting-by-id'],
  {
    tags: ['settings', 'dashboard'],
    revalidate: 3600, // 1 hour
  }
)

// Get setting by key
export const getSettingByKeyServer = unstable_cache(
  async (key: string): Promise<SiteSettingWithDetails | null> => {
    const setting = await prisma.siteSettings.findUnique({
      where: { key },
    })
    return setting
  },
  ['setting-by-key'],
  {
    tags: ['settings', 'dashboard'],
    revalidate: 3600, // 1 hour
  }
)

// Get active settings only
export const getActiveSettingsServer = unstable_cache(
  async (): Promise<SiteSettingWithDetails[]> => {
    const settings = await prisma.siteSettings.findMany({
      where: { isActive: true },
      orderBy: [{ key: 'asc' }],
    })
    return settings
  },
  ['active-settings'],
  {
    tags: ['settings', 'dashboard'],
    revalidate: 3600, // 1 hour
  }
)
