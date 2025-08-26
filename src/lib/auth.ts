import { prisma } from '@/lib/prisma'
import { User } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { NextAuthOptions, getServerSession } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
  // Remove PrismaAdapter - not needed for JWT-only with credentials
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email,
            },
          })

          if (!user || !user.password) {
            return null
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          )

          if (!isPasswordValid) {
            return null
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          }
        } catch (error) {
          console.error('Auth error:', error)
          return null
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as User).role
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub!
        session.user.role = token.role as string
      }
      return session
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  secret: process.env.NEXTAUTH_SECRET,
}

/**
 * Validates that the current user has admin or editor role
 * Throws an error if not authenticated or doesn't have required role
 */
export async function requireAdmin() {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    throw new Error('Unauthorized')
  }

  if (session.user.role !== 'ADMIN' && session.user.role !== 'EDITOR') {
    throw new Error('Unauthorized')
  }

  return session
}

/**
 * Validates that the current user is strictly an admin (ADMIN role only)
 * Throws an error if not authenticated or not an admin
 */
export async function requireStrictAdmin() {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    throw new Error('Unauthorized')
  }

  if (session.user.role !== 'ADMIN') {
    throw new Error('Unauthorized')
  }

  return session
}
