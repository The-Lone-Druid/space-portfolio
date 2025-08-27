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
    <div
      className='glass-nebula hover:border-space-gold/50 group cursor-pointer rounded-lg border border-purple-500/20 p-3 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg sm:rounded-xl sm:p-4'
      onClick={handleClick}
    >
      <div className='flex items-center space-x-2 sm:space-x-3 md:space-x-4'>
        <div className='bg-gradient-cosmic group-hover:animate-pulse-cosmic flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg sm:h-12 sm:w-12 sm:rounded-xl md:h-14 md:w-14'>
          <Icon className='h-5 w-5 text-white sm:h-6 sm:w-6 md:h-7 md:w-7' />
        </div>

        <div className='min-w-0 flex-1'>
          <h3 className='group-hover:text-space-gold truncate text-sm font-semibold text-white transition-colors duration-300 sm:text-base md:text-lg'>
            {name}
          </h3>
          <p className='truncate text-xs text-gray-400 sm:text-sm'>
            {username}
          </p>
        </div>

        <div className='text-space-gold flex-shrink-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
          <svg
            className='h-4 w-4 md:h-5 md:w-5'
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
    </div>
  )
}
