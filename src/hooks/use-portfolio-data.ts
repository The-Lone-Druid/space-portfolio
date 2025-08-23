import type {
  ApiResponse,
  Hero,
  PersonalInfoWithSocials,
  ProjectWithDetails,
  Service,
  Skill,
} from '@/types'
import { useEffect, useState } from 'react'

interface PortfolioData {
  personalInfo: PersonalInfoWithSocials | null
  heroStats: Hero | null
  skills: Skill[]
  projects: ProjectWithDetails[]
  services: Service[]
}

interface UsePortfolioDataReturn {
  data: PortfolioData | null
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export function usePortfolioData(): UsePortfolioDataReturn {
  const [data, setData] = useState<PortfolioData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch('/api/portfolio')
      const result: ApiResponse<PortfolioData> = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to fetch portfolio data')
      }

      setData(result.data || null)
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Unknown error occurred'
      setError(errorMessage)
      console.error('Error fetching portfolio data:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  }
}

// Individual hooks for specific data types
export function usePersonalInfo() {
  const [data, setData] = useState<PersonalInfoWithSocials | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch('/api/personal-info')
      const result: ApiResponse<PersonalInfoWithSocials> = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to fetch personal info')
      }

      setData(result.data || null)
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Unknown error occurred'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return { data, loading, error, refetch: fetchData }
}

export function useHeroStats() {
  const [data, setData] = useState<Hero | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch('/api/hero')
      const result: ApiResponse<Hero> = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to fetch hero stats')
      }

      setData(result.data || null)
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Unknown error occurred'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return { data, loading, error, refetch: fetchData }
}

export function useSkills() {
  const [data, setData] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch('/api/skills')
      const result: ApiResponse<Skill[]> = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to fetch skills')
      }

      setData(result.data || [])
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Unknown error occurred'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return { data, loading, error, refetch: fetchData }
}

export function useProjects() {
  const [data, setData] = useState<ProjectWithDetails[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch('/api/projects')
      const result: ApiResponse<ProjectWithDetails[]> = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to fetch projects')
      }

      setData(result.data || [])
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Unknown error occurred'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return { data, loading, error, refetch: fetchData }
}

export function useServices() {
  const [data, setData] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch('/api/services')
      const result: ApiResponse<Service[]> = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to fetch services')
      }

      setData(result.data || [])
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Unknown error occurred'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return { data, loading, error, refetch: fetchData }
}
