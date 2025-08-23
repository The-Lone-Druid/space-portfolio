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
  projectName: string
  projectDescription: string
  projectDate: string
  projectLink: string | null
  githubLink?: string | null
  skillsUtilized: Skill[]
  featured?: boolean
  image?: string
  className?: string
  animationDelay?: number
}

export const ProjectCard = ({
  projectName,
  projectDescription,
  projectDate,
  projectLink,
  githubLink,
  skillsUtilized,
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
              alt={projectName}
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
            {projectLink !== null && projectLink !== '#' && (
              <Button
                variant='outline'
                size='sm'
                onClick={() => window.open(projectLink, '_blank')}
                className='glass-cosmic border-space-gold/30 text-space-gold hover:bg-space-gold/10'
              >
                <ExternalLink className='mr-1 size-3' />
              </Button>
            )}
            {githubLink && (
              <Button
                variant='outline'
                size='sm'
                onClick={() => window.open(githubLink, '_blank')}
                className='glass-cosmic border-purple-400/30 text-purple-400 hover:bg-purple-400/10'
              >
                <Github className='mr-1 size-3' />
              </Button>
            )}
          </div>
        </div>

        {/* Project Date */}
        <div className='mb-2 flex items-center text-sm text-gray-400'>
          <Calendar className='mr-2 h-4 w-4' />
          {projectDate}
        </div>

        {/* Project Title */}
        <h3 className='group-hover:text-space-gold text-xl font-bold text-white transition-colors duration-300'>
          {projectName}
        </h3>
      </CardHeader>

      <CardContent className='space-y-4'>
        {/* Description */}
        <p className='text-sm leading-relaxed text-gray-400'>
          {projectDescription}
        </p>

        {/* Technologies Used */}
        <div className='flex flex-wrap gap-2'>
          {skillsUtilized
            .slice(0, 4)
            .map((skill: { id: number; name: string }) => (
              <Badge
                key={skill.id}
                variant='outline'
                className='border-space-gold/70 bg-space-gold/20 hover:border-space-gold hover:bg-space-gold/30 text-xs font-medium text-white transition-all duration-300'
              >
                {skill.name}
              </Badge>
            ))}
          {skillsUtilized.length > 4 && (
            <Badge
              variant='outline'
              className='border-gray-500 bg-gray-700/50 text-xs text-gray-200 hover:bg-gray-600/50'
            >
              +{skillsUtilized.length - 4} more
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
