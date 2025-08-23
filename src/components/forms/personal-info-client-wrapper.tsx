'use client'

import { PersonalInfoForm } from '@/components/forms/personal-info-form'
import { PersonalInfo } from '@/hooks/use-personal-info'
import { PersonalInfo as PrismaPersonalInfo } from '@prisma/client'

interface PersonalInfoClientWrapperProps {
  initialData?:
    | (PrismaPersonalInfo & {
        socialLinks: Array<{
          id: string
          name: string
          url: string
          icon?: string | null
          order: number
          isActive: boolean
          personalInfoId?: string | null
          createdAt: Date
          updatedAt: Date
        }>
      })
    | null
}

// Convert Prisma types to client-compatible types
function convertPrismaToClientType(
  prismaData: NonNullable<PersonalInfoClientWrapperProps['initialData']>
): PersonalInfo {
  return {
    id: prismaData.id,
    name: prismaData.name,
    title: prismaData.title,
    bio: prismaData.bio,
    email: prismaData.email,
    location: prismaData.location,
    resumeUrl: prismaData.resumeUrl,
    isActive: prismaData.isActive,
    createdAt: prismaData.createdAt.toISOString(),
    updatedAt: prismaData.updatedAt.toISOString(),
    socialLinks: prismaData.socialLinks.map(link => ({
      id: link.id,
      name: link.name,
      url: link.url,
      icon: link.icon,
      order: link.order,
      isActive: link.isActive,
      personalInfoId: link.personalInfoId,
      createdAt: link.createdAt.toISOString(),
      updatedAt: link.updatedAt.toISOString(),
    })),
  }
}

export function PersonalInfoClientWrapper({
  initialData,
}: PersonalInfoClientWrapperProps) {
  const clientData = initialData ? convertPrismaToClientType(initialData) : null

  return <PersonalInfoForm initialData={clientData} />
}
