import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Authentication | Space Portfolio',
  description: 'Secure access to Space Portfolio admin dashboard.',
}

interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return <div className='bg-gradient-cosmic min-h-screen'>{children}</div>
}
