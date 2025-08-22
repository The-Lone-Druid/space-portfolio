import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { CSSProperties } from 'react'

interface SkillCardProps {
  name: string
  category: string
  icon?: string
  proficiency?: number
  className?: string
  style?: CSSProperties
}

export const SkillCard = ({
  name,
  category,
  icon,
  proficiency,
  className = '',
  style,
}: SkillCardProps) => {
  // Category color mapping
  const getCategoryColor = (category: string) => {
    const colorMap: Record<string, string> = {
      frontend: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      backend: 'bg-green-500/20 text-green-400 border-green-500/30',
      database: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      cloud: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      mobile: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
      devops: 'bg-red-500/20 text-red-400 border-red-500/30',
      design: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
      other: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
    }
    return colorMap[category.toLowerCase()] || colorMap.other
  }

  return (
    <Card
      className={`glass-cosmic hover:border-space-gold/50 group border-purple-500/20 transition-all duration-300 hover:scale-105 hover:shadow-xl ${className}`}
      style={style}
    >
      <CardContent className='p-6 text-center'>
        {/* Skill Icon */}
        {icon && (
          <div className='bg-gradient-nebula group-hover:animate-pulse-cosmic mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full text-2xl'>
            {icon}
          </div>
        )}

        {/* Skill Name */}
        <h3 className='group-hover:text-space-gold mb-3 text-lg font-semibold text-white transition-colors duration-300'>
          {name}
        </h3>

        {/* Category Badge */}
        <Badge
          className={`mb-3 text-xs font-medium ${getCategoryColor(category)}`}
          variant='outline'
        >
          {category}
        </Badge>

        {/* Proficiency Bar (if provided) */}
        {proficiency && (
          <div className='space-y-2'>
            <div className='flex justify-between text-xs text-gray-400'>
              <span>Proficiency</span>
              <span>{proficiency}%</span>
            </div>
            <div className='h-2 w-full rounded-full bg-gray-700'>
              <div
                className='bg-gradient-cosmic h-2 rounded-full transition-all duration-1000 ease-out'
                style={{ width: `${proficiency}%` }}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
