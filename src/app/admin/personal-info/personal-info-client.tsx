'use client'

import {
  HeroStatsForm,
  PersonalInfoForm,
  SocialLinksManager,
} from '@/components/forms'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { usePersonalInfo } from '@/hooks'

export function PersonalInfoClient() {
  const {
    personalInfo,
    heroStats,
    socialLinks,
    isLoading,
    isSaving,
    savePersonalInfo,
    saveHeroStats,
    addSocialLink,
    deleteSocialLink,
  } = usePersonalInfo()

  if (isLoading) {
    return <LoadingSpinner message='Loading personal information...' />
  }

  return (
    <div className='space-y-6'>
      <PersonalInfoForm
        initialData={personalInfo || undefined}
        onSubmit={savePersonalInfo}
        isLoading={isSaving}
      />

      <HeroStatsForm
        initialData={heroStats || undefined}
        onSubmit={saveHeroStats}
        isLoading={isSaving}
      />

      <SocialLinksManager
        socialLinks={socialLinks}
        onAddLink={addSocialLink}
        onDeleteLink={deleteSocialLink}
        isLoading={isSaving}
      />
    </div>
  )
}
