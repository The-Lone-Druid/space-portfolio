import { useAnimatedCounter } from '@/hooks'

interface AchievementCardProps {
  label: string
  value: string
  icon: string
  isNumeric?: boolean
  className?: string
}

export const AchievementCard = ({
  label,
  value,
  icon,
  isNumeric = false,
  className = '',
}: AchievementCardProps) => {
  // Extract numeric value for animation if it's numeric
  const numericValue = isNumeric ? parseInt(value.replace(/\D/g, ''), 10) : 0
  const suffix = isNumeric ? value.replace(/[\d]/g, '') : ''

  const { count, ref } = useAnimatedCounter({
    end: numericValue,
    duration: 2000,
    suffix: suffix,
  })

  return (
    <div ref={ref} className={`group text-center ${className}`}>
      <div className='bg-gradient-nebula group-hover:animate-pulse-cosmic mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full text-3xl transition-all duration-300'>
        {icon}
      </div>
      <div className='text-space-gold mb-2 text-3xl font-bold'>
        {isNumeric ? count : value}
      </div>
      <p className='text-sm text-gray-400'>{label}</p>
    </div>
  )
}
