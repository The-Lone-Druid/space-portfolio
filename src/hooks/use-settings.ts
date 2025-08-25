'use client'

import { useCacheInvalidation } from '@/hooks/use-cache-invalidation'
import type { SettingFormData, SettingUpdateData } from '@/lib/validations'
import { useState } from 'react'

export function useSettings() {
  const [isLoading, setIsLoading] = useState(false)
  const { invalidateSettings } = useCacheInvalidation()

  const createSetting = async (data: SettingFormData) => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to create setting')
      }

      const setting = await response.json()
      await invalidateSettings()
      return setting
    } finally {
      setIsLoading(false)
    }
  }

  const updateSetting = async (id: string, data: SettingUpdateData) => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/settings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to update setting')
      }

      const setting = await response.json()
      await invalidateSettings()
      return setting
    } finally {
      setIsLoading(false)
    }
  }

  const deleteSetting = async (id: string) => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/settings/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to delete setting')
      }

      await invalidateSettings()
      return true
    } finally {
      setIsLoading(false)
    }
  }

  const toggleSettingStatus = async (id: string, isActive: boolean) => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/settings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to toggle setting status')
      }

      const setting = await response.json()
      await invalidateSettings()
      return setting
    } finally {
      setIsLoading(false)
    }
  }

  return {
    createSetting,
    updateSetting,
    deleteSetting,
    toggleSettingStatus,
    isLoading,
  }
}
