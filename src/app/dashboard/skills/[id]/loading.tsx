import { DashboardPageHeader } from '@/components/dashboard/page-header'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Skeleton } from '@/components/ui/skeleton'
import {
  ArrowLeft,
  BarChart3,
  Calendar,
  Edit,
  Star,
  Target,
} from 'lucide-react'
import Link from 'next/link'

export default function SkillDetailLoading() {
  return (
    <div className='space-y-6'>
      {/* Header */}
      <DashboardPageHeader
        title='Skill Details'
        description='Loading skill information and proficiency details...'
        isLoading={true}
      />

      {/* Back Button */}
      <Button variant='link' asChild>
        <Link href='/dashboard/skills'>
          <ArrowLeft className='mr-2 h-4 w-4' />
          Back to Skills
        </Link>
      </Button>

      {/* Skill Details */}
      <div className='grid gap-6 lg:grid-cols-3'>
        {/* Main Skill Info */}
        <div className='lg:col-span-2'>
          <Card className='glass-nebula border-space-accent/30'>
            <CardHeader>
              <div className='flex items-start justify-between'>
                <div className='space-y-3'>
                  <div className='flex items-center gap-3'>
                    <Skeleton className='h-8 w-48' />
                    <Skeleton className='h-6 w-20 rounded' />
                  </div>
                  <div className='space-y-1'>
                    <Skeleton className='h-4 w-40' />
                  </div>
                </div>
                <Button size='sm' variant='stellar' disabled>
                  <Edit className='mr-2 h-4 w-4' />
                  Edit Skill
                </Button>
              </div>
            </CardHeader>
            <CardContent className='space-y-6'>
              {/* Proficiency Section Skeleton */}
              <div>
                <h3 className='mb-4 text-lg font-semibold text-white'>
                  Proficiency Level
                </h3>
                <div className='space-y-4'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                      <Skeleton className='h-8 w-12' />
                      <div>
                        <Skeleton className='h-5 w-20' />
                      </div>
                    </div>
                    <div className='flex items-center gap-2'>
                      <Target className='text-space-gold h-5 w-5 opacity-50' />
                      <span className='text-sm text-white/70'>Proficiency</span>
                    </div>
                  </div>
                  <Progress value={0} className='h-3 opacity-50' />
                  <div className='space-y-2'>
                    <Skeleton className='h-4 w-full' />
                    <Skeleton className='h-4 w-3/4' />
                  </div>
                </div>
              </div>

              {/* Additional Details Skeleton */}
              <div className='grid gap-4 md:grid-cols-2'>
                <div className='space-y-2'>
                  <div className='flex items-center gap-2 text-sm font-medium text-white/90'>
                    <BarChart3 className='h-4 w-4 opacity-50' />
                    Category
                  </div>
                  <Skeleton className='h-4 w-24' />
                </div>

                <div className='space-y-2'>
                  <div className='flex items-center gap-2 text-sm font-medium text-white/90'>
                    <Star className='h-4 w-4 opacity-50' />
                    Display Order
                  </div>
                  <Skeleton className='h-4 w-20' />
                </div>

                <div className='space-y-2'>
                  <div className='flex items-center gap-2 text-sm font-medium text-white/90'>
                    <Calendar className='h-4 w-4 opacity-50' />
                    Added
                  </div>
                  <Skeleton className='h-4 w-28' />
                </div>

                <div className='space-y-2'>
                  <div className='flex items-center gap-2 text-sm font-medium text-white/90'>
                    <Target className='h-4 w-4 opacity-50' />
                    Status
                  </div>
                  <Skeleton className='h-6 w-16 rounded' />
                </div>
              </div>

              {/* Additional Information Skeleton */}
              <div className='border-t border-white/10 pt-6'>
                <h3 className='mb-4 text-lg font-semibold text-white'>
                  Skill Development
                </h3>
                <div className='space-y-4'>
                  <div className='grid gap-4 md:grid-cols-2'>
                    <div className='space-y-2'>
                      <h4 className='text-sm font-medium text-white/80'>
                        Learning Path
                      </h4>
                      <div className='space-y-1'>
                        <Skeleton className='h-4 w-32' />
                        <Skeleton className='h-4 w-28' />
                        <Skeleton className='h-4 w-36' />
                      </div>
                    </div>

                    <div className='space-y-2'>
                      <h4 className='text-sm font-medium text-white/80'>
                        Experience Level
                      </h4>
                      <div className='space-y-1'>
                        <Skeleton className='h-4 w-24' />
                        <Skeleton className='h-4 w-20' />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons Skeleton */}
              <div className='flex gap-4 border-t border-white/10 pt-4'>
                <Skeleton className='h-10 w-28' />
                <Skeleton className='h-10 w-32' />
                <Skeleton className='h-10 w-24' />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className='space-y-6'>
          {/* Quick Stats Skeleton */}
          <Card className='glass-nebula border-space-accent/30'>
            <CardHeader>
              <CardTitle className='text-white'>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-white/70'>Proficiency</span>
                <Skeleton className='h-4 w-12' />
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-white/70'>Level</span>
                <Skeleton className='h-4 w-16' />
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-white/70'>Category</span>
                <Skeleton className='h-4 w-20' />
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-white/70'>Experience</span>
                <Skeleton className='h-4 w-14' />
              </div>
            </CardContent>
          </Card>

          {/* Actions Skeleton */}
          <Card className='glass-nebula border-space-accent/30'>
            <CardHeader>
              <CardTitle className='text-white'>Actions</CardTitle>
            </CardHeader>
            <CardContent className='space-y-3'>
              <Button variant='stellar' className='w-full' disabled>
                <Edit className='mr-2 h-4 w-4' />
                Edit Skill
              </Button>
              <Button variant='link' className='w-full' asChild>
                <Link href='/dashboard/skills'>
                  <ArrowLeft className='mr-2 h-4 w-4' />
                  Back to Skills
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Related Skills Skeleton */}
          <Card className='glass-nebula border-space-accent/30'>
            <CardHeader>
              <CardTitle className='text-white'>
                <Skeleton className='h-6 w-28' />
              </CardTitle>
              <CardDescription className='text-white/70'>
                <Skeleton className='h-4 w-36' />
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-3'>
              {[1, 2, 3].map(index => (
                <div
                  key={index}
                  className='border-space-accent/20 flex items-center justify-between rounded-lg border bg-white/5 p-3'
                >
                  <div className='space-y-1'>
                    <Skeleton className='h-4 w-24' />
                    <div className='flex items-center gap-2'>
                      <Skeleton className='h-3 w-12' />
                      <Skeleton className='h-3 w-8' />
                    </div>
                  </div>
                  <Skeleton className='h-8 w-8' />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
