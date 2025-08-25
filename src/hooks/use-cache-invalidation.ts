import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

/**
 * Global cache invalidation hook for dashboard data
 * Ensures data freshness after mutations
 */
export function useCacheInvalidation() {
  const router = useRouter()

  const invalidateAll = useCallback(() => {
    router.refresh()
  }, [router])

  const invalidateProjects = useCallback(async () => {
    // Revalidate server-side cached project data
    await fetch('/api/revalidate?tag=projects', { method: 'POST' })
    router.refresh()
  }, [router])

  const invalidateSkills = useCallback(async () => {
    // Revalidate server-side cached skills data
    await fetch('/api/revalidate?tag=skills', { method: 'POST' })
    router.refresh()
  }, [router])

  const invalidateServices = useCallback(async () => {
    // Revalidate server-side cached services data
    await fetch('/api/revalidate?tag=services', { method: 'POST' })
    router.refresh()
  }, [router])

  const invalidatePersonalInfo = useCallback(async () => {
    // Revalidate server-side cached personal info data
    await fetch('/api/revalidate?tag=personal-info', { method: 'POST' })
    router.refresh()
  }, [router])

  const invalidatePortfolio = useCallback(async () => {
    // Revalidate all portfolio data
    await fetch('/api/revalidate?tag=portfolio', { method: 'POST' })
    router.refresh()
  }, [router])

  const invalidateSettings = useCallback(async () => {
    // Revalidate server-side cached settings data
    await fetch('/api/revalidate?tag=settings', { method: 'POST' })
    router.refresh()
  }, [router])

  return {
    invalidateAll,
    invalidateProjects,
    invalidateSkills,
    invalidateServices,
    invalidatePersonalInfo,
    invalidatePortfolio,
    invalidateSettings,
  }
}
