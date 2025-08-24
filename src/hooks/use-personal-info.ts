import { useCallback, useState } from 'react'
import { toast } from 'sonner'
import { PersonalInfo, SocialLink } from '../types'

export interface PersonalInfoFormData {
  name: string
  title: string
  bio: string
  email: string
  location: string
  resumeUrl?: string
  socialLinks?: Omit<
    SocialLink,
    'id' | 'createdAt' | 'updatedAt' | 'isActive' | 'personalInfoId'
  >[]
}

export interface SocialLinkFormData {
  name: string
  url: string
  icon?: string
  order?: number
}

// Hook for personal info management
export function usePersonalInfo() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchPersonalInfo =
    useCallback(async (): Promise<PersonalInfo | null> => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch('/api/personal-info')
        const data = await response.json()

        if (!response.ok || !data.success) {
          throw new Error(data.error || 'Failed to fetch personal information')
        }

        return data.data
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Unknown error occurred'
        setError(errorMessage)
        return null
      } finally {
        setIsLoading(false)
      }
    }, [])

  const createPersonalInfo = useCallback(
    async (data: PersonalInfoFormData): Promise<PersonalInfo | null> => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch('/api/personal-info', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })

        const result = await response.json()

        if (!response.ok || !result.success) {
          throw new Error(
            result.error || 'Failed to create personal information'
          )
        }

        toast.success('Personal information created successfully!')
        return result.data
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Unknown error occurred'
        setError(errorMessage)
        toast.error(errorMessage)
        return null
      } finally {
        setIsLoading(false)
      }
    },
    []
  )

  const updatePersonalInfo = useCallback(
    async (data: PersonalInfoFormData): Promise<PersonalInfo | null> => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch('/api/personal-info', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })

        const result = await response.json()

        if (!response.ok || !result.success) {
          throw new Error(
            result.error || 'Failed to update personal information'
          )
        }

        toast.success('Personal information updated successfully!')
        return result.data
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Unknown error occurred'
        setError(errorMessage)
        toast.error(errorMessage)
        return null
      } finally {
        setIsLoading(false)
      }
    },
    []
  )

  const deletePersonalInfo = useCallback(async (): Promise<boolean> => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/personal-info', {
        method: 'DELETE',
      })

      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to delete personal information')
      }

      toast.success('Personal information deleted successfully!')
      return true
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Unknown error occurred'
      setError(errorMessage)
      toast.error(errorMessage)
      return false
    } finally {
      setIsLoading(false)
    }
  }, [])

  return {
    fetchPersonalInfo,
    createPersonalInfo,
    updatePersonalInfo,
    deletePersonalInfo,
    isLoading,
    error,
  }
}

// Hook for social links management
export function useSocialLinks() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchSocialLinks = useCallback(async (): Promise<SocialLink[]> => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/personal-info/social-links')
      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to fetch social links')
      }

      return data.data
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Unknown error occurred'
      setError(errorMessage)
      return []
    } finally {
      setIsLoading(false)
    }
  }, [])

  const createSocialLink = useCallback(
    async (data: SocialLinkFormData): Promise<SocialLink | null> => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch('/api/personal-info/social-links', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })

        const result = await response.json()

        if (!response.ok || !result.success) {
          throw new Error(result.error || 'Failed to create social link')
        }

        toast.success('Social link created successfully!')
        return result.data
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Unknown error occurred'
        setError(errorMessage)
        toast.error(errorMessage)
        return null
      } finally {
        setIsLoading(false)
      }
    },
    []
  )

  const updateSocialLink = useCallback(
    async (
      id: string,
      data: SocialLinkFormData
    ): Promise<SocialLink | null> => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch(`/api/personal-info/social-links/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })

        const result = await response.json()

        if (!response.ok || !result.success) {
          throw new Error(result.error || 'Failed to update social link')
        }

        toast.success('Social link updated successfully!')
        return result.data
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Unknown error occurred'
        setError(errorMessage)
        toast.error(errorMessage)
        return null
      } finally {
        setIsLoading(false)
      }
    },
    []
  )

  const deleteSocialLink = useCallback(async (id: string): Promise<boolean> => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/personal-info/social-links/${id}`, {
        method: 'DELETE',
      })

      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to delete social link')
      }

      toast.success('Social link deleted successfully!')
      return true
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Unknown error occurred'
      setError(errorMessage)
      toast.error(errorMessage)
      return false
    } finally {
      setIsLoading(false)
    }
  }, [])

  return {
    fetchSocialLinks,
    createSocialLink,
    updateSocialLink,
    deleteSocialLink,
    isLoading,
    error,
  }
}
