import { Card, CardContent } from '@/components/ui/card'
import { LucideIcon } from 'lucide-react'

interface SocialLinkCardProps {
  icon: LucideIcon
  name: string
  username: string
  url: string
  onClick?: () => void
}

export const SocialLinkCard = ({
  icon: Icon,
  name,
  username,
  url,
  onClick,
}: SocialLinkCardProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick()
    } else {
      window.open(url, '_blank')
    }
  }

  return (
    <Card
      className='glass-cosmic hover:border-space-gold/50 group cursor-pointer border-purple-500/20 transition-all duration-300 hover:scale-105 hover:shadow-xl'
      onClick={handleClick}
    >
      <CardContent className='p-6'>
        <div className='flex items-center space-x-4'>
          <div className='bg-gradient-cosmic group-hover:animate-pulse-cosmic flex h-14 w-14 items-center justify-center rounded-xl'>
            <Icon className='h-7 w-7 text-white' />
          </div>

          <div className='flex-1'>
            <h3 className='group-hover:text-space-gold text-lg font-semibold text-white transition-colors duration-300'>
              {name}
            </h3>
            <p className='text-sm text-gray-400'>{username}</p>
          </div>

          <div className='text-space-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
            <svg
              className='h-5 w-5'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
              />
            </svg>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
