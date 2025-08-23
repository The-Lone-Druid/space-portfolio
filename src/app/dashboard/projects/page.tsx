import { DashboardPageHeader } from '@/components/dashboard/page-header'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { FolderOpen, Plus, Settings } from 'lucide-react'

export default async function ProjectsPage() {
  return (
    <div className='space-y-6'>
      {/* Header */}
      <DashboardPageHeader
        title='Projects'
        description='Manage your projects and collaborations across the digital cosmos.'
        actions={
          <>
            <Button
              variant='outline'
              className='border-space-accent/30 hover:bg-space-accent/20 hover:border-space-accent/50 bg-transparent text-white'
            >
              <Settings className='mr-2 h-4 w-4' />
              Settings
            </Button>
            <Button className='bg-space-accent hover:bg-space-accent/80 text-white'>
              <Plus className='mr-2 h-4 w-4' />
              New Project
            </Button>
          </>
        }
      />

      {/* Projects Content */}
      <div className='grid gap-6 lg:grid-cols-2 xl:grid-cols-3'>
        <Card className='glass-nebula border-space-accent/30 hover:border-space-accent/50 transition-all duration-300'>
          <CardHeader>
            <CardTitle className='flex items-center text-white'>
              <FolderOpen className='text-space-gold mr-2 h-5 w-5' />
              Getting Started
            </CardTitle>
            <CardDescription className='text-white/70'>
              Create your first project to begin your space journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className='mb-4 text-sm text-white/60'>
              Start building amazing projects with our space-themed portfolio
              system.
            </p>
            <Button className='bg-gradient-stellar hover:bg-gradient-cosmic-gold w-full text-white'>
              Create Project
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
