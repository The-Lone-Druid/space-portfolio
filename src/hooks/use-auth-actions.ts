'use client'

import { useState } from 'react'
import { toast } from 'sonner'

interface AuthActionResult {
  success: boolean
  error?: string
  message?: string
}

interface PasswordResetRequest {
  email: string
}

interface PasswordResetVerify {
  token: string
  password: string
}

interface ChangePasswordRequest {
  currentPassword: string
  newPassword: string
}

/**
 * Hook for authentication-related API actions
 * Provides centralized auth API calls with consistent error handling and toast notifications
 */
export function useAuthActions() {
  const [isLoading, setIsLoading] = useState(false)

  /**
   * Request password reset email
   */
  const requestPasswordReset = async (
    data: PasswordResetRequest
  ): Promise<AuthActionResult> => {
    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (result.success) {
        toast.success('Password reset email sent!', {
          description: result.message,
        })
        return { success: true, message: result.message }
      } else {
        toast.error('Failed to send reset email', {
          description: result.error || 'Please try again',
        })
        return { success: false, error: result.error }
      }
    } catch {
      const errorMessage = 'Failed to send reset email. Please try again.'
      toast.error('An error occurred', {
        description: errorMessage,
      })
      return { success: false, error: errorMessage }
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Reset password with token
   */
  const resetPassword = async (
    data: PasswordResetVerify
  ): Promise<AuthActionResult> => {
    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (result.success) {
        toast.success('Password reset successfully!', {
          description: 'You can now sign in with your new password',
        })
        return { success: true, message: result.message }
      } else {
        toast.error('Password reset failed', {
          description: result.error || 'Please try again',
        })
        return { success: false, error: result.error }
      }
    } catch {
      const errorMessage = 'An unexpected error occurred. Please try again.'
      toast.error('An error occurred', {
        description: errorMessage,
      })
      return { success: false, error: errorMessage }
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Change password for authenticated user
   */
  const changePassword = async (
    data: ChangePasswordRequest
  ): Promise<AuthActionResult> => {
    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (result.success) {
        toast.success('Password changed successfully!', {
          description: 'Your password has been updated',
        })
        return { success: true, message: result.message }
      } else {
        toast.error('Failed to change password', {
          description: result.error || 'Please try again',
        })
        return { success: false, error: result.error }
      }
    } catch {
      const errorMessage = 'An unexpected error occurred. Please try again.'
      toast.error('An error occurred', {
        description: errorMessage,
      })
      return { success: false, error: errorMessage }
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Send test email (admin only)
   */
  const sendTestEmail = async (
    email: string,
    type: string = 'password-reset'
  ): Promise<AuthActionResult> => {
    setIsLoading(true)

    try {
      const response = await fetch('/api/admin/test-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, type }),
      })

      const result = await response.json()

      if (result.success) {
        toast.success('Test email sent successfully!', {
          description: result.message,
        })
        return { success: true, message: result.message }
      } else {
        toast.error('Failed to send test email', {
          description: result.error || 'Please check your configuration',
        })
        return { success: false, error: result.error }
      }
    } catch {
      const errorMessage = 'Failed to send test email. Please try again.'
      toast.error('An error occurred', {
        description: errorMessage,
      })
      return { success: false, error: errorMessage }
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    requestPasswordReset,
    resetPassword,
    changePassword,
    sendTestEmail,
  }
}
