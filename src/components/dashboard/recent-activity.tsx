'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatDistanceToNow } from 'date-fns'
import {
  Activity,
  ArrowRight,
  Calendar,
  ExternalLink,
  FolderOpen,
  Star,
} from 'lucide-react'
import Link from 'next/link'
import { DashboardStats } from '../../types'

interface RecentActivityProps {
  data: DashboardStats
}

export function RecentActivity({ data }: RecentActivityProps) {
  const { projects, skills } = data

  return (
    <Card className='glass-nebula border-space-accent/30'>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <CardTitle className='flex items-center text-white'>
            <Activity className='text-space-gold mr-2 h-5 w-5' />
            Recent Activity
          </CardTitle>
          <Button variant='ghost' size='sm' asChild>
            <Link
              href='/dashboard/projects'
              className='text-white/70 hover:text-white'
            >
              View All
              <ArrowRight className='ml-1 h-3 w-3' />
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent className='space-y-4'>
        {/* Recent Projects */}
        <div className='space-y-3'>
          <h4 className='text-sm font-medium text-white/90'>Recent Projects</h4>
          {projects.recent.length > 0 ? (
            <div className='space-y-2'>
              {projects.recent.slice(0, 3).map(project => (
                <div
                  key={project.id}
                  className='flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-3'
                >
                  <div className='flex items-center gap-3'>
                    <FolderOpen className='h-4 w-4 text-blue-400' />
                    <div className='flex-1'>
                      <div className='flex items-center gap-2'>
                        <span className='text-sm font-medium text-white'>
                          {project.projectName}
                        </span>
                        {project.featured && (
                          <Star className='h-3 w-3 fill-current text-yellow-400' />
                        )}
                        {project.isOngoing && (
                          <Badge
                            variant='outline'
                            className='border-green-500/30 text-xs text-green-400'
                          >
                            Ongoing
                          </Badge>
                        )}
                      </div>
                      <div className='flex items-center gap-2 text-xs text-white/60'>
                        <Calendar className='h-3 w-3' />
                        Started{' '}
                        {formatDistanceToNow(new Date(project.startDate), {
                          addSuffix: true,
                        })}
                      </div>
                    </div>
                  </div>
                  <Button variant='ghost' size='sm' asChild>
                    <Link href={`/dashboard/projects/${project.id}`}>
                      <ExternalLink className='h-3 w-3' />
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className='flex flex-col items-center justify-center rounded-lg border border-dashed border-white/20 bg-white/5 p-6 text-center'>
              <FolderOpen className='mb-2 h-8 w-8 text-white/20' />
              <p className='text-sm text-white/60'>No projects yet</p>
              <Button variant='ghost' size='sm' asChild className='mt-2'>
                <Link href='/dashboard/projects'>Add your first project</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Top Skills */}
        <div className='space-y-3'>
          <h4 className='text-sm font-medium text-white/90'>Top Skills</h4>
          {skills.topSkills.length > 0 ? (
            <div className='grid gap-2'>
              {skills.topSkills.slice(0, 3).map(skill => (
                <div
                  key={skill.id}
                  className='flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-2'
                >
                  <div className='flex items-center gap-2'>
                    <div className='h-2 w-2 rounded-full bg-green-400' />
                    <span className='text-sm text-white'>{skill.name}</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Badge
                      variant='outline'
                      className='border-blue-500/30 text-xs text-blue-400'
                    >
                      {skill.category}
                    </Badge>
                    <span className='text-xs font-medium text-green-400'>
                      {skill.level}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className='flex flex-col items-center justify-center rounded-lg border border-dashed border-white/20 bg-white/5 p-6 text-center'>
              <Star className='mb-2 h-8 w-8 text-white/20' />
              <p className='text-sm text-white/60'>No skills added yet</p>
              <Button variant='ghost' size='sm' asChild className='mt-2'>
                <Link href='/dashboard/skills'>Add skills</Link>
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
