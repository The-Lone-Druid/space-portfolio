'use client'

import { DashboardLayout } from '@/components/dashboard'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Edit, ExternalLink, Eye, Plus, Trash2 } from 'lucide-react'
import Link from 'next/link'

// Sample projects data
const projects = [
  {
    id: 1,
    title: 'Cosmic Portfolio',
    description:
      'A stellar portfolio website built with Next.js 15, featuring space-themed animations and modern web technologies.',
    status: 'Published',
    featured: true,
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    views: 1247,
    lastUpdated: '2 days ago',
  },
  {
    id: 2,
    title: 'Spotfinder',
    description:
      'A revolutionary parking solution platform where users can book car parking spaces through mobile app.',
    status: 'Published',
    featured: true,
    technologies: ['React', 'React Native', 'Node.js'],
    views: 892,
    lastUpdated: '1 week ago',
  },
  {
    id: 3,
    title: 'Neev Healthcare',
    description:
      'A comprehensive healthcare platform enabling users to book yoga classes and purchase health products.',
    status: 'Draft',
    featured: false,
    technologies: ['React', 'Node.js', 'MongoDB'],
    views: 634,
    lastUpdated: '3 weeks ago',
  },
]

export default function ProjectsPage() {
  return (
    <DashboardLayout title='Projects Management'>
      <div className='space-y-6'>
        {/* Header with actions */}
        <div className='flex items-center justify-between'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Projects</h2>
            <p className='text-muted-foreground'>
              Manage your portfolio projects and showcase your work.
            </p>
          </div>
          <Button asChild>
            <Link href='/admin/projects/new'>
              <Plus className='mr-2 h-4 w-4' />
              Add Project
            </Link>
          </Button>
        </div>

        {/* Stats */}
        <div className='grid gap-4 md:grid-cols-4'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Total Projects
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{projects.length}</div>
              <p className='text-muted-foreground text-xs'>All time projects</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Published</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {projects.filter(p => p.status === 'Published').length}
              </div>
              <p className='text-muted-foreground text-xs'>Live projects</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Featured</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {projects.filter(p => p.featured).length}
              </div>
              <p className='text-muted-foreground text-xs'>Featured projects</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Total Views</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {projects.reduce((acc, p) => acc + p.views, 0).toLocaleString()}
              </div>
              <p className='text-muted-foreground text-xs'>
                All projects combined
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Projects Grid */}
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {projects.map(project => (
            <Card key={project.id} className='flex flex-col'>
              <CardHeader>
                <div className='flex items-start justify-between'>
                  <CardTitle className='text-lg'>{project.title}</CardTitle>
                  <div className='flex items-center gap-2'>
                    <Badge
                      variant={
                        project.status === 'Published' ? 'default' : 'secondary'
                      }
                    >
                      {project.status}
                    </Badge>
                    {project.featured && (
                      <Badge variant='outline'>Featured</Badge>
                    )}
                  </div>
                </div>
                <p className='text-muted-foreground line-clamp-2 text-sm'>
                  {project.description}
                </p>
              </CardHeader>
              <CardContent className='flex-1'>
                <div className='space-y-4'>
                  {/* Technologies */}
                  <div className='flex flex-wrap gap-1'>
                    {project.technologies.map(tech => (
                      <Badge key={tech} variant='outline' className='text-xs'>
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className='text-muted-foreground flex items-center justify-between text-sm'>
                    <div className='flex items-center gap-1'>
                      <Eye className='h-3 w-3' />
                      {project.views} views
                    </div>
                    <span>{project.lastUpdated}</span>
                  </div>

                  {/* Actions */}
                  <div className='flex gap-2 pt-2'>
                    <Button variant='outline' size='sm' className='flex-1'>
                      <Edit className='mr-2 h-3 w-3' />
                      Edit
                    </Button>
                    <Button variant='outline' size='sm'>
                      <ExternalLink className='h-3 w-3' />
                    </Button>
                    <Button variant='outline' size='sm'>
                      <Trash2 className='h-3 w-3' />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
