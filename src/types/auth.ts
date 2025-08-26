import { DefaultSession, DefaultUser } from 'next-auth'
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
