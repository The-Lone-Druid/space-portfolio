import { Button } from '@/components/ui/button'
import { LucideIcon } from 'lucide-react'
import { ReactNode } from 'react'
import { useScrollToSection } from '../../hooks/use-scroll-to-section'

interface StoryCardProps {
  title: string
  titleIcon?: LucideIcon
  children: ReactNode
  ctaText?: string
  ctaIcon?: LucideIcon
  onCtaClick?: () => void
  ctaSection?: string
  className?: string
}

export const StoryCard = ({
  title,
  titleIcon: TitleIcon,
  children,
  ctaText,
  ctaIcon: CtaIcon,
  onCtaClick,
  ctaSection,
  className = '',
}: StoryCardProps) => {
  const { scrollToSection } = useScrollToSection()

  const handleCtaClick = () => {
    if (onCtaClick) {
      onCtaClick()
    } else if (ctaSection) {
      scrollToSection(ctaSection)
    }
  }

  return (
    <div className={`glass-cosmic rounded-2xl p-8 ${className}`}>
      <h3 className='mb-4 flex items-center text-2xl font-bold text-white'>
        {TitleIcon && <TitleIcon className='text-space-gold mr-3 h-8 w-8' />}
        {title}
      </h3>

      <div className='space-y-4 leading-relaxed text-gray-300'>{children}</div>

      {(ctaText || CtaIcon) && (
        <div className='mt-6'>
          <Button
            variant='stellar'
            size='lg'
            onClick={handleCtaClick}
            className='group'
          >
            {CtaIcon && (
              <CtaIcon className='mr-2 h-5 w-5 transition-transform duration-300 group-hover:scale-110' />
            )}
            {ctaText}
          </Button>
        </div>
      )}
    </div>
  )
}
