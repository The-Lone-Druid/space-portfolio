import { Card, CardContent } from '@/components/ui/card'
import { LucideIcon } from 'lucide-react'

interface HighlightCardProps {
  icon: LucideIcon
  title: string
  description: string
  className?: string
}

export const HighlightCard = ({
  icon: Icon,
  title,
  description,
  className = '',
}: HighlightCardProps) => {
  return (
    <Card
      className={`glass-nebula hover:border-space-gold/50 group border-purple-500/20 transition-all duration-300 hover:scale-105 ${className}`}
    >
      <CardContent className='p-6'>
        <div className='flex items-start space-x-4'>
          <div className='bg-space-accent group-hover:animate-pulse-cosmic flex h-12 w-12 items-center justify-center rounded-lg'>
            <Icon className='h-6 w-6 text-white' />
          </div>
          <div className='flex-1'>
            <h4 className='mb-2 font-semibold text-white'>{title}</h4>
            <p className='text-sm text-gray-400'>{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
