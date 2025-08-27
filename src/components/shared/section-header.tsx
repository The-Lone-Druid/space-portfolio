interface SectionHeaderProps {
  title: string
  highlight?: string
  subtitle: string
  badge?: {
    text: string
    emoji?: string
  }
  className?: string
}

export const SectionHeader = ({
  title,
  highlight,
  subtitle,
  badge,
  className = '',
}: SectionHeaderProps) => {
  return (
    <div className={`mb-12 text-center sm:mb-16 ${className}`}>
      {badge && (
        <div className='mb-4 sm:mb-6'>
          <span className='text-space-gold text-base font-medium sm:text-lg'>
            {badge.emoji && `${badge.emoji} `}
            {badge.text}
          </span>
        </div>
      )}

      <h2 className='mb-3 text-3xl font-bold text-white sm:mb-4 sm:text-4xl md:text-5xl lg:text-6xl'>
        {title}{' '}
        {highlight && <span className='text-space-gold'>{highlight}</span>}
      </h2>

      <div className='bg-gradient-stellar mx-auto mb-4 h-1 w-20 sm:mb-6 sm:w-24'></div>

      <p className='mx-auto max-w-3xl text-base leading-relaxed text-gray-400 sm:text-lg md:text-xl'>
        {subtitle}
      </p>
    </div>
  )
}
