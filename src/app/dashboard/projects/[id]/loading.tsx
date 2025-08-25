import { DashboardPageHeader } from '@/components/dashboard/page-header'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import {
  ArrowLeft,
  CheckCircle,
  Edit,
  ExternalLink,
  Github,
} from 'lucide-react'
import Link from 'next/link'

export default function ProjectDetailLoading() {
  return (
    <div className='space-y-6'>
      {/* Header */}
      <DashboardPageHeader
        title='Project Details'
        description='Loading project information and details...'
        isLoading={true}
      />

      {/* Back Button */}
      <Button variant='link' asChild>
        <Link href='/dashboard/projects'>
          <ArrowLeft className='mr-2 h-4 w-4' />
          Back to Projects
        </Link>
      </Button>

      {/* Project Details Skeleton */}
      <Card className='glass-nebula border-space-accent/30'>
        <CardHeader>
          <div className='flex items-start justify-between'>
            <div className='flex-1 space-y-2'>
              <div className='flex items-center gap-3'>
                <Skeleton className='h-7 w-48' />
                <Skeleton className='h-6 w-20 rounded-full' />
              </div>
              <div className='space-y-1'>
                <Skeleton className='h-4 w-40' />
                <Skeleton className='h-4 w-32' />
              </div>
            </div>
            <Button size='sm' variant='stellar' disabled>
              <Edit className='mr-2 h-4 w-4' />
              Edit Project
            </Button>
          </div>
        </CardHeader>
        <CardContent className='space-y-6'>
          {/* Description Skeleton */}
          <div>
            <h3 className='mb-2 text-lg font-semibold text-white'>
              Description
            </h3>
            <div className='space-y-2'>
              <Skeleton className='h-4 w-full' />
              <Skeleton className='h-4 w-full' />
              <Skeleton className='h-4 w-full' />
              <Skeleton className='h-4 w-3/4' />
            </div>
          </div>

          {/* Links Skeleton */}
          <div>
            <h3 className='mb-3 text-lg font-semibold text-white'>Links</h3>
            <div className='flex gap-3'>
              <Button variant='nebula' disabled>
                <ExternalLink className='mr-2 h-4 w-4' />
                <Skeleton className='h-4 w-16' />
              </Button>
              <Button variant='cosmic' disabled>
                <Github className='mr-2 h-4 w-4' />
                <Skeleton className='h-4 w-20' />
              </Button>
            </div>
          </div>

          {/* Skills Skeleton */}
          <div>
            <h3 className='mb-3 text-lg font-semibold text-white'>
              Skills & Technologies
            </h3>
            <div className='flex flex-wrap gap-2'>
              {[1, 2, 3, 4, 5, 6].map(index => (
                <Skeleton
                  key={index}
                  className='h-6 w-16 rounded-full'
                  style={{ width: `${Math.random() * 40 + 40}px` }}
                />
              ))}
            </div>
          </div>

          {/* Tasks Skeleton */}
          <div>
            <h3 className='mb-3 text-lg font-semibold text-white'>
              Project Tasks
            </h3>
            <div className='space-y-2'>
              {[1, 2, 3, 4, 5].map(index => (
                <div
                  key={index}
                  className='flex items-center gap-3 rounded-md border border-white/10 bg-white/5 p-3'
                >
                  <CheckCircle className='h-4 w-4 text-green-400 opacity-50' />
                  <Skeleton className='h-4 flex-1' />
                </div>
              ))}
            </div>
          </div>

          {/* Project Metadata Skeleton */}
          <div className='border-t border-white/10 pt-6'>
            <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
              {/* Date Information */}
              <div className='space-y-2'>
                <h4 className='text-sm font-medium text-white/80'>Timeline</h4>
                <div className='space-y-1'>
                  <Skeleton className='h-4 w-32' />
                  <Skeleton className='h-4 w-28' />
                </div>
              </div>

              {/* Status Information */}
              <div className='space-y-2'>
                <h4 className='text-sm font-medium text-white/80'>Status</h4>
                <div className='space-y-1'>
                  <Skeleton className='h-4 w-20' />
                  <Skeleton className='h-4 w-24' />
                </div>
              </div>

              {/* Statistics */}
              <div className='space-y-2'>
                <h4 className='text-sm font-medium text-white/80'>
                  Statistics
                </h4>
                <div className='space-y-1'>
                  <Skeleton className='h-4 w-16' />
                  <Skeleton className='h-4 w-20' />
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons Skeleton */}
          <div className='flex gap-4 border-t border-white/10 pt-4'>
            <Skeleton className='h-10 w-32' />
            <Skeleton className='h-10 w-28' />
            <Skeleton className='h-10 w-36' />
          </div>
        </CardContent>
      </Card>

      {/* Additional Information Cards Skeleton */}
      <div className='grid gap-6 lg:grid-cols-2'>
        {/* Project Analytics Skeleton */}
        <Card className='glass-nebula border-space-accent/30'>
          <CardHeader>
            <CardTitle className='text-white'>
              <Skeleton className='h-6 w-32' />
            </CardTitle>
            <CardDescription className='text-white/70'>
              <Skeleton className='h-4 w-48' />
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            {[1, 2, 3].map(index => (
              <div key={index} className='flex items-center justify-between'>
                <Skeleton className='h-4 w-24' />
                <Skeleton className='h-4 w-16' />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Related Projects Skeleton */}
        <Card className='glass-nebula border-space-accent/30'>
          <CardHeader>
            <CardTitle className='text-white'>
              <Skeleton className='h-6 w-36' />
            </CardTitle>
            <CardDescription className='text-white/70'>
              <Skeleton className='h-4 w-44' />
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-3'>
            {[1, 2, 3].map(index => (
              <div
                key={index}
                className='border-space-accent/20 flex items-center justify-between rounded-lg border bg-white/5 p-3'
              >
                <div className='space-y-1'>
                  <Skeleton className='h-4 w-28' />
                  <Skeleton className='h-3 w-20' />
                </div>
                <Skeleton className='h-8 w-8' />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
