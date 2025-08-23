import { requireAdmin } from '@/lib/auth-utils'
import { DashboardLayout } from '../../../components/dashboard'
import { PersonalInfoClient } from './personal-info-client'

export default async function PersonalInfoPage() {
  // Require admin authentication
  await requireAdmin()

  return (
    <DashboardLayout title='Personal Info'>
      <PersonalInfoClient />
    </DashboardLayout>
  )
}
