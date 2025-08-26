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
    <div className={`mb-16 text-center ${className}`}>
      {badge && (
        <div className='mb-6'>
          <span className='text-space-gold text-lg font-medium'>
            {badge.emoji && `${badge.emoji} `}
            {badge.text}
          </span>
        </div>
      )}

      <h2 className='mb-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl'>
        {title}{' '}
        {highlight && <span className='text-space-gold'>{highlight}</span>}
      </h2>

      <div className='bg-gradient-stellar mx-auto mb-6 h-1 w-24'></div>

      <p className='mx-auto max-w-3xl text-lg leading-relaxed text-gray-400 md:text-xl'>
        {subtitle}
      </p>
    </div>
  )
}
