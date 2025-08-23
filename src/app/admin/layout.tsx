import { DashboardProvider } from '@/components/providers'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin Dashboard - Space Portfolio',
  description: 'Admin dashboard for managing space portfolio content',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DashboardProvider>{children}</DashboardProvider>
}
