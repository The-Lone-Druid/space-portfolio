import type {
  HeroStatsFormData,
  PersonalInfoFormData,
  SocialLinkFormData,
} from '@/lib/validations'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

interface SocialLink {
  id: string
  name: string
  url: string
  icon?: string
  order: number
}

interface PersonalInfoData {
  id: string
  name: string
  title: string
  bio: string
  email: string
  location: string
  resumeUrl?: string
  socialLinks: SocialLink[]
}

interface HeroStatsData {
  id: string
  verifiedSkills: number
  professionalProjects: number
  personalProjects: number
}

interface UsePersonalInfoReturn {
  // Data
  personalInfo: PersonalInfoData | null
  heroStats: HeroStatsData | null
  socialLinks: SocialLink[]

  // Loading states
  isLoading: boolean
  isSaving: boolean

  // Actions
  savePersonalInfo: (data: PersonalInfoFormData) => Promise<void>
  saveHeroStats: (data: HeroStatsFormData) => Promise<void>
  addSocialLink: (data: SocialLinkFormData) => Promise<void>
  deleteSocialLink: (id: string) => Promise<void>

  // Utility
  refreshData: () => Promise<void>
}

export function usePersonalInfo(): UsePersonalInfoReturn {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfoData | null>(
    null
  )
  const [heroStats, setHeroStats] = useState<HeroStatsData | null>(null)
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/admin/personal-info')

      if (!response.ok) {
        throw new Error('Failed to fetch data')
      }

      const data = await response.json()

      if (data.personalInfo) {
        setPersonalInfo(data.personalInfo)
        setSocialLinks(data.personalInfo.socialLinks || [])
      }

      if (data.heroStats) {
        setHeroStats(data.heroStats)
      }
    } catch (error) {
      console.error('Error fetching personal info:', error)
      toast.error('Failed to load personal information')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const savePersonalInfo = async (data: PersonalInfoFormData) => {
    try {
      setIsSaving(true)
      const response = await fetch('/api/admin/personal-info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to save personal info')
      }

      const result = await response.json()
      setPersonalInfo(result)
      setSocialLinks(result.socialLinks || [])
      toast.success('Personal information saved successfully!')
    } catch (error) {
      console.error('Error saving personal info:', error)
      toast.error('Failed to save personal information')
      throw error
    } finally {
      setIsSaving(false)
    }
  }

  const saveHeroStats = async (data: HeroStatsFormData) => {
    try {
      setIsSaving(true)
      const response = await fetch('/api/admin/hero-stats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to save hero stats')
      }

      const result = await response.json()
      setHeroStats(result)
      toast.success('Hero statistics saved successfully!')
    } catch (error) {
      console.error('Error saving hero stats:', error)
      toast.error('Failed to save hero statistics')
      throw error
    } finally {
      setIsSaving(false)
    }
  }

  const addSocialLink = async (data: SocialLinkFormData) => {
    try {
      setIsSaving(true)
      const response = await fetch('/api/admin/social-links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to add social link')
      }

      const result = await response.json()
      setSocialLinks(prev => [...prev, result])
      toast.success('Social link added successfully!')
    } catch (error) {
      console.error('Error adding social link:', error)
      toast.error('Failed to add social link')
      throw error
    } finally {
      setIsSaving(false)
    }
  }

  const deleteSocialLink = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/social-links/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete social link')
      }

      setSocialLinks(prev => prev.filter(link => link.id !== id))
      toast.success('Social link deleted successfully!')
    } catch (error) {
      console.error('Error deleting social link:', error)
      toast.error('Failed to delete social link')
      throw error
    }
  }

  return {
    personalInfo,
    heroStats,
    socialLinks,
    isLoading,
    isSaving,
    savePersonalInfo,
    saveHeroStats,
    addSocialLink,
    deleteSocialLink,
    refreshData: fetchData,
  }
}
