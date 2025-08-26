import { AuditLog } from '@prisma/client'
import { DefaultSession, DefaultUser, User } from 'next-auth'
import { DefaultJWT } from 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      role: string
    } & DefaultSession['user']
  }

  interface User extends DefaultUser {
    role: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    role: string
  }
}

type AuthLevel = 'none' | 'user' | 'editor' | 'admin'

export interface AuthOptions {
  level: AuthLevel
}

export interface AuthUser {
  id: string
  email: string
  name?: string | null
  role: string
}

export class AuthError extends Error {
  constructor(
    message: string,
    public status: number = 401,
    public code: string = 'UNAUTHORIZED'
  ) {
    super(message)
    this.name = 'AuthError'
  }
}

export interface ServiceResponse {
  success: boolean
  error?: string
  data?: { message?: string; [key: string]: unknown }
}

export interface UseAuthOptions {
  required?: boolean
  requiredRole?: 'ADMIN' | 'EDITOR' | string[]
  redirectTo?: string
}

export interface AuthActionResult {
  success: boolean
  error?: string
  message?: string
}

export interface PasswordResetRequest {
  email: string
}

export interface PasswordResetVerify {
  token: string
  password: string
}

export interface ChangePasswordRequest {
  currentPassword: string
  newPassword: string
}

export interface LockedAccount {
  email: string
  failedAttempts: number
  lockedUntil: Date | null
  lastAttempt: Date
  remainingTime?: number
}

export interface LockoutConfig {
  maxAttempts: number
  lockoutDurationMinutes: number
  cleanupAfterDays: number
}

export interface LockoutStatus {
  isLocked: boolean
  failedAttempts: number
  lockedUntil?: Date | null
  remainingTime?: number // minutes
}

export type AuditAction =
  | 'login_success'
  | 'login_failed'
  | 'logout'
  | 'password_change'
  | 'password_reset_request'
  | 'password_reset_complete'
  | 'session_revoked'
  | 'account_locked'
  | 'account_unlocked'
  | 'admin_unlock'
  | 'profile_updated'
  | 'settings_changed'

export interface AuditLogData {
  userId?: string
  email?: string
  action: AuditAction
  ipAddress?: string
  userAgent?: string
  details?: Record<string, unknown>
}

export interface AuditLogWithUser extends AuditLog {
  user?: User | null
}
