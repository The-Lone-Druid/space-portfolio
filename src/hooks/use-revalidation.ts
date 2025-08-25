import { useState } from 'react'

interface RevalidationResponse {
  success: boolean
  message?: string
  error?: string
  timestamp?: string
  type?: 'path' | 'tag'
  target?: string
}

interface UseRevalidationOptions {
  onSuccess?: (response: RevalidationResponse) => void
  onError?: (error: string) => void
}

export function useRevalidation(options: UseRevalidationOptions = {}) {
  const [isLoading, setIsLoading] = useState(false)
  const [lastRevalidated, setLastRevalidated] = useState<string | null>(null)

  const revalidatePath = async (path: string = '/') => {
    setIsLoading(true)
    try {
      const response = await fetch(
        `/api/revalidate?path=${encodeURIComponent(path)}`,
        {
          method: 'POST',
        }
      )

      const data: RevalidationResponse = await response.json()

      if (data.success) {
        setLastRevalidated(data.timestamp || new Date().toISOString())
        options.onSuccess?.(data)
        return data
      } else {
        const error = data.error || 'Failed to revalidate'
        options.onError?.(error)
        throw new Error(error)
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error'
      options.onError?.(errorMessage)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const revalidateTag = async (tag: string) => {
    setIsLoading(true)
    try {
      const response = await fetch(
        `/api/revalidate?tag=${encodeURIComponent(tag)}`,
        {
          method: 'POST',
        }
      )

      const data: RevalidationResponse = await response.json()

      if (data.success) {
        setLastRevalidated(data.timestamp || new Date().toISOString())
        options.onSuccess?.(data)
        return data
      } else {
        const error = data.error || 'Failed to revalidate'
        options.onError?.(error)
        throw new Error(error)
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error'
      options.onError?.(errorMessage)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const revalidateHomepage = () => revalidatePath('/')

  const revalidatePortfolio = () => revalidateTag('portfolio-data')

  return {
    revalidatePath,
    revalidateTag,
    revalidateHomepage,
    revalidatePortfolio,
    isLoading,
    lastRevalidated,
  }
}
