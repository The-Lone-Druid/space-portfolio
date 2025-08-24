'use client'

import type { ServiceFormData } from '@/lib/validations'
import type { ApiResponse, ServiceWithDetails } from '@/types'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function useServices() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const createService = async (
    data: ServiceFormData
  ): Promise<ServiceWithDetails> => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to create service')
      }

      const result: ApiResponse<ServiceWithDetails> = await response.json()

      if (!result.success || !result.data) {
        throw new Error(result.error || 'Failed to create service')
      }

      router.refresh()
      return result.data
    } finally {
      setIsLoading(false)
    }
  }

  const updateService = async (
    id: number,
    data: ServiceFormData
  ): Promise<ServiceWithDetails> => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/services/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to update service')
      }

      const result: ApiResponse<ServiceWithDetails> = await response.json()

      if (!result.success || !result.data) {
        throw new Error(result.error || 'Failed to update service')
      }

      router.refresh()
      return result.data
    } finally {
      setIsLoading(false)
    }
  }

  const deleteService = async (id: number): Promise<void> => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/services/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete service')
      }

      const result: ApiResponse<void> = await response.json()

      if (!result.success) {
        throw new Error(result.error || 'Failed to delete service')
      }

      router.refresh()
    } finally {
      setIsLoading(false)
    }
  }

  return {
    createService,
    updateService,
    deleteService,
    isLoading,
  }
}
