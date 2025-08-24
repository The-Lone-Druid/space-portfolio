'use client'

import type { SkillFormData } from '@/lib/validations'
import type { ApiResponse, SkillWithDetails } from '@/types'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function useSkills() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const createSkill = async (
    data: SkillFormData
  ): Promise<SkillWithDetails> => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/skills', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to create skill')
      }

      const result: ApiResponse<SkillWithDetails> = await response.json()

      if (!result.success || !result.data) {
        throw new Error(result.error || 'Failed to create skill')
      }

      router.refresh()
      return result.data
    } finally {
      setIsLoading(false)
    }
  }

  const updateSkill = async (
    id: number,
    data: SkillFormData
  ): Promise<SkillWithDetails> => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/skills/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to update skill')
      }

      const result: ApiResponse<SkillWithDetails> = await response.json()

      if (!result.success || !result.data) {
        throw new Error(result.error || 'Failed to update skill')
      }

      router.refresh()
      return result.data
    } finally {
      setIsLoading(false)
    }
  }

  const deleteSkill = async (id: number): Promise<void> => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/skills/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete skill')
      }

      const result: ApiResponse<void> = await response.json()

      if (!result.success) {
        throw new Error(result.error || 'Failed to delete skill')
      }

      router.refresh()
    } finally {
      setIsLoading(false)
    }
  }

  return {
    createSkill,
    updateSkill,
    deleteSkill,
    isLoading,
  }
}
