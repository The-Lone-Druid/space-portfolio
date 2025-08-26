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
