import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Calendar, ExternalLink, Github, Star } from 'lucide-react'
import Image from 'next/image'

interface Skill {
  id: number
  name: string
}

interface ProjectCardProps {
  id: number
  project_name: string
  project_description: string
  project_date: string
  project_link: string
  github_link?: string
  skills_utilized: Skill[]
  featured?: boolean
  image?: string
  className?: string
  animationDelay?: number
}

export const ProjectCard = ({
  project_name,
  project_description,
  project_date,
  project_link,
  github_link,
  skills_utilized,
  featured = false,
  image,
  className = '',
  animationDelay = 0,
}: ProjectCardProps) => {
  return (
    <Card
      className={`glass-cosmic hover:border-space-gold/50 group border-purple-500/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl ${className}`}
      style={{ animationDelay: `${animationDelay}s` }}
    >
      <CardHeader className='relative'>
        {featured && (
          <div className='absolute top-4 right-4 z-10'>
            <Badge className='bg-space-gold text-space-deep'>
              <Star className='mr-1 h-3 w-3' />
              Featured
            </Badge>
          </div>
        )}

        {/* Project Image */}
        <div className='bg-gradient-nebula relative mb-4 flex h-48 w-full items-center justify-center overflow-hidden rounded-lg'>
          {image ? (
            <Image
              src={image}
              alt={project_name}
              width={300}
              height={200}
              className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-110'
            />
          ) : (
            <div className='text-6xl opacity-50 transition-transform duration-500 group-hover:scale-110'>
              🚀
            </div>
          )}
          <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent'></div>

          {/* Hover overlay with actions */}
          <div className='absolute inset-0 flex items-center justify-center space-x-4 bg-black/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
            {project_link !== '#' && (
              <Button
                size='sm'
                variant='cosmic'
                onClick={() => window.open(project_link, '_blank')}
              >
                <ExternalLink className='h-4 w-4' />
              </Button>
            )}
            {github_link && (
              <Button
                size='sm'
                variant='stellar'
                onClick={() => window.open(github_link, '_blank')}
                className='group'
              >
                <Github className='h-4 w-4 transition-transform duration-300 group-hover:scale-110' />
              </Button>
            )}
          </div>
        </div>

        {/* Project Date */}
        <div className='mb-2 flex items-center text-sm text-gray-400'>
          <Calendar className='mr-2 h-4 w-4' />
          {project_date}
        </div>

        {/* Project Title */}
        <h3 className='group-hover:text-space-gold text-xl font-bold text-white transition-colors duration-300'>
          {project_name}
        </h3>
      </CardHeader>

      <CardContent className='space-y-4'>
        {/* Description */}
        <p className='text-sm leading-relaxed text-gray-400'>
          {project_description}
        </p>

        {/* Technologies Used */}
        <div className='flex flex-wrap gap-2'>
          {skills_utilized.slice(0, 4).map(skill => (
            <Badge
              key={skill.id}
              variant='outline'
              className='border-space-gold/70 bg-space-gold/20 hover:border-space-gold hover:bg-space-gold/30 text-xs font-medium text-white transition-all duration-300'
            >
              {skill.name}
            </Badge>
          ))}
          {skills_utilized.length > 4 && (
            <Badge
              variant='outline'
              className='border-gray-500 bg-gray-700/50 text-xs text-gray-200 hover:bg-gray-600/50'
            >
              +{skills_utilized.length - 4} more
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
