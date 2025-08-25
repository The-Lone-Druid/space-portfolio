import { useCallback, useEffect, useState } from 'react'
import { DashboardStats } from '../types'

export function useDashboardData() {
  const [data, setData] = useState<DashboardStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchDashboardData = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch('/api/dashboard')
      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to fetch dashboard data')
      }

      setData(result.data)
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Unknown error occurred'
      setError(errorMessage)
      console.error('Dashboard data fetch error:', errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchDashboardData()
  }, [fetchDashboardData])

  const refetch = useCallback(() => {
    fetchDashboardData()
  }, [fetchDashboardData])

  return {
    data,
    isLoading,
    error,
    refetch,
  }
}
