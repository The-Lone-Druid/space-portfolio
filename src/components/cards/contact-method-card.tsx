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
    <div
      className='glass-nebula hover:border-space-gold/50 group cursor-pointer rounded-lg border border-purple-500/20 p-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg sm:rounded-xl sm:p-3 md:p-4'
      onClick={handleClick}
    >
      <div className='flex items-center space-x-2 sm:space-x-3'>
        <div className='bg-gradient-cosmic group-hover:animate-pulse-cosmic flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md shadow-md sm:h-8 sm:w-8 sm:rounded-lg md:h-10 md:w-10 md:rounded-xl'>
          <Icon className='h-3 w-3 text-white sm:h-4 sm:w-4 md:h-5 md:w-5' />
        </div>

        <div className='min-w-0 flex-1'>
          <h4 className='group-hover:text-space-gold truncate text-xs font-semibold text-white transition-colors duration-300 sm:text-sm'>
            {label}
          </h4>
          <p className='text-space-gold truncate text-xs font-medium sm:text-sm'>
            {value}
          </p>
          <p className='truncate text-xs text-gray-400'>{description}</p>
        </div>

        {href !== '#' && (
          <div className='text-space-gold flex-shrink-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
            <svg
              className='h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4'
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
        )}
      </div>
    </div>
  )
}
