import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import type { User } from '@prisma/client'
import { getServerSession } from 'next-auth'

// Simplified type for JWT-only authentication
export type UserProfile = {
  user: User
  lastLogin: Date | null
}

// Server-side function to get current user profile
export async function getCurrentUserProfile(): Promise<UserProfile | null> {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return null
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      return null
    }

    return {
      user,
      lastLogin: user.updatedAt, // Use updatedAt as proxy for last login
    }
  } catch (error) {
    console.error('Error fetching current user profile:', error)
    return null
  }
}

// Get user by ID (admin function)
export async function getUserById(id: string): Promise<User | null> {
  try {
    return await prisma.user.findUnique({
      where: { id },
    })
  } catch (error) {
    console.error('Error fetching user by ID:', error)
    return null
  }
}

// Update user profile
export async function updateUserProfile(
  userId: string,
  data: Partial<Pick<User, 'name' | 'email' | 'image'>>
): Promise<User | null> {
  try {
    return await prisma.user.update({
      where: { id: userId },
      data,
    })
  } catch (error) {
    console.error('Error updating user profile:', error)
    return null
  }
}
