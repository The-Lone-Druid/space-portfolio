'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { projects } from '@/lib/data'
import { Calendar, ExternalLink, Github, Star } from 'lucide-react'
import { useState } from 'react'

const Projects = () => {
  const [filter, setFilter] = useState('all')

  const filteredProjects =
    filter === 'all'
      ? projects
      : projects.filter(project =>
          project.skills_utilized.some(skill =>
            filter === 'frontend'
              ? skill.name.toLowerCase().includes('react') ||
                skill.name.toLowerCase().includes('next')
              : filter === 'backend'
                ? skill.name.toLowerCase().includes('node')
                : true
          )
        )

  return (
    <section id='projects' className='py-20'>
      <div className='container mx-auto px-6'>
        {/* Section Header */}
        <div className='mb-16 text-center'>
          <h2 className='mb-4 text-4xl font-bold text-white md:text-5xl'>
            My{' '}
            <span className='bg-gradient-stellar bg-clip-text text-transparent'>
              Project Galaxy
            </span>
          </h2>
          <div className='bg-gradient-stellar mx-auto mb-6 h-1 w-24'></div>
          <p className='mx-auto max-w-3xl text-lg text-gray-400'>
            Explore the constellation of applications I&apos;ve launched into
            the digital universe, each one solving real-world problems with
            innovative solutions
          </p>
        </div>

        {/* Filter Buttons */}
        <div className='mb-12 flex flex-wrap justify-center gap-4'>
          {['all', 'frontend', 'backend', 'web'].map(category => (
            <Button
              key={category}
              variant={filter === category ? 'cosmic' : 'outline'}
              onClick={() => setFilter(category)}
              className={`capitalize ${
                filter !== category
                  ? 'border-space-gold/30 hover:text-space-gold hover:border-space-gold text-gray-400'
                  : ''
              }`}
            >
              {category === 'all' ? 'All Projects' : category}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {filteredProjects.map((project, index) => (
            <Card
              key={project.id}
              className='glass-cosmic hover:border-space-gold/50 group border-purple-500/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl'
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className='relative'>
                {project.featured && (
                  <div className='absolute top-4 right-4'>
                    <Badge className='bg-space-gold text-space-deep'>
                      <Star className='mr-1 h-3 w-3' />
                      Featured
                    </Badge>
                  </div>
                )}

                {/* Project Image Placeholder */}
                <div className='bg-gradient-nebula relative mb-4 flex h-48 w-full items-center justify-center overflow-hidden rounded-lg'>
                  <div className='text-6xl opacity-50 transition-transform duration-500 group-hover:scale-110'>
                    🚀
                  </div>
                  <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent'></div>

                  {/* Hover overlay with quick actions */}
                  <div className='absolute inset-0 flex items-center justify-center space-x-4 bg-black/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
                    {project.project_link !== '#' && (
                      <Button
                        size='sm'
                        variant='cosmic'
                        onClick={() =>
                          window.open(project.project_link, '_blank')
                        }
                      >
                        <ExternalLink className='h-4 w-4' />
                      </Button>
                    )}
                    {project.github_link && (
                      <Button
                        size='sm'
                        variant='outline'
                        onClick={() =>
                          window.open(project.github_link, '_blank')
                        }
                        className='border-white text-white hover:bg-white hover:text-black'
                      >
                        <Github className='h-4 w-4' />
                      </Button>
                    )}
                  </div>
                </div>

                <div className='mb-2 flex items-center text-sm text-gray-400'>
                  <Calendar className='mr-2 h-4 w-4' />
                  {project.project_date}
                </div>

                <h3 className='group-hover:text-space-gold text-xl font-bold text-white transition-colors duration-300'>
                  {project.project_name}
                </h3>
              </CardHeader>

              <CardContent className='space-y-4'>
                <p className='text-sm leading-relaxed text-gray-400'>
                  {project.project_description}
                </p>

                {/* Technologies Used */}
                <div className='flex flex-wrap gap-2'>
                  {project.skills_utilized.slice(0, 4).map(skill => (
                    <Badge
                      key={skill.id}
                      variant='outline'
                      className='border-space-accent/30 text-space-accent hover:border-space-gold hover:text-space-gold text-xs transition-colors duration-300'
                    >
                      {skill.name}
                    </Badge>
                  ))}
                  {project.skills_utilized.length > 4 && (
                    <Badge
                      variant='outline'
                      className='border-gray-500 text-xs text-gray-500'
                    >
                      +{project.skills_utilized.length - 4} more
                    </Badge>
                  )}
                </div>

                {/* Key Features */}
                <div className='space-y-2'>
                  <h4 className='text-sm font-semibold text-white'>
                    Key Features:
                  </h4>
                  <ul className='space-y-1 text-xs text-gray-400'>
                    {project.project_tasks.slice(0, 3).map(task => (
                      <li key={task.id} className='flex items-start'>
                        <span className='text-space-gold mr-2'>•</span>
                        {task.task}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className='flex space-x-2 pt-4'>
                  {project.project_link !== '#' && (
                    <Button
                      size='sm'
                      variant='cosmic'
                      onClick={() =>
                        window.open(project.project_link, '_blank')
                      }
                      className='flex-1'
                    >
                      <ExternalLink className='mr-2 h-4 w-4' />
                      Live Demo
                    </Button>
                  )}
                  {project.github_link && (
                    <Button
                      size='sm'
                      variant='outline'
                      onClick={() => window.open(project.github_link, '_blank')}
                      className='border-space-gold text-space-gold hover:bg-space-gold hover:text-space-deep'
                    >
                      <Github className='h-4 w-4' />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className='mt-16 text-center'>
          <div className='glass-nebula mx-auto max-w-2xl rounded-2xl p-8'>
            <h3 className='mb-4 text-2xl font-bold text-white'>
              Ready to Launch Your Next Project?
            </h3>
            <p className='mb-6 text-gray-400'>
              Let&apos;s collaborate and bring your vision to life in the
              digital cosmos
            </p>
            <Button
              variant='cosmic'
              size='lg'
              onClick={() => {
                const element = document.querySelector('#contact')
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' })
                }
              }}
            >
              Start Your Mission
              <Star className='ml-2 h-5 w-5' />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Projects
