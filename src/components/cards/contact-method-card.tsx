import { Card, CardContent } from '@/components/ui/card'
import { LucideIcon } from 'lucide-react'

interface ContactMethodCardProps {
  icon: LucideIcon
  label: string
  value: string
  description: string
  href?: string
  onClick?: () => void
}

export const ContactMethodCard = ({
  icon: Icon,
  label,
  value,
  description,
  href = '#',
  onClick,
}: ContactMethodCardProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick()
    } else if (href !== '#') {
      window.open(href, '_blank')
    }
  }

  return (
    <Card
      className='glass-cosmic hover:border-space-gold/50 group cursor-pointer border-purple-500/20 transition-all duration-300 hover:scale-105 hover:shadow-xl'
      onClick={handleClick}
    >
      <CardContent className='p-6 text-center'>
        <div className='bg-gradient-cosmic group-hover:animate-pulse-cosmic mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl'>
          <Icon className='h-8 w-8 text-white' />
        </div>

        <h3 className='group-hover:text-space-gold mb-2 text-lg font-semibold text-white transition-colors duration-300'>
          {label}
        </h3>

        <p className='text-space-gold mb-1 font-medium'>{value}</p>

        <p className='text-sm text-gray-400'>{description}</p>
      </CardContent>
    </Card>
  )
}
