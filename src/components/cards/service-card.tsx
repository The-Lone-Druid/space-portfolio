import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ArrowRight, Star, Zap } from 'lucide-react'

interface ServiceCardProps {
  id: number
  name: string
  desc: string
  icon: string | null
  onGetStarted?: () => void
  className?: string
  animationDelay?: number
}

export const ServiceCard = ({
  name,
  desc,
  icon,
  onGetStarted,
  className = '',
  animationDelay = 0,
}: ServiceCardProps) => {
  // Map Font Awesome classes to emojis/icons
  const getServiceIcon = (iconClass: string) => {
    const iconMap: Record<string, string> = {
      'fas fa-rocket': '🚀',
      'fab fa-html5': '🔧',
      'fas fa-laptop-code': '💻',
      'fas fa-cogs': '⚙️',
      'fas fa-mobile-alt': '📱',
      'fab fa-github': '📚',
      'fas fa-phone-laptop': '📱',
      'fas fa-pencil-paintbrush': '🎨',
    }
    return iconMap[iconClass] || '⭐'
  }

  const scrollToContact = () => {
    const element = document.querySelector('#contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleGetStarted = () => {
    if (onGetStarted) {
      onGetStarted()
    } else {
      scrollToContact()
    }
  }

  return (
    <Card
      className={`glass-cosmic hover:border-space-gold/50 group h-full border-purple-500/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl ${className}`}
      style={{ animationDelay: `${animationDelay}s` }}
    >
      <CardHeader className='pb-3 text-center sm:pb-4'>
        {/* Service Icon */}
        <div className='bg-gradient-nebula group-hover:animate-pulse-cosmic mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full text-3xl sm:mb-4 sm:h-20 sm:w-20 sm:text-4xl'>
          {getServiceIcon(icon || 'fas fa-rocket')}
        </div>

        {/* Service Name */}
        <h3 className='group-hover:text-space-gold text-lg font-bold text-white transition-colors duration-300 sm:text-xl'>
          {name}
        </h3>
      </CardHeader>

      <CardContent className='space-y-3 sm:space-y-4'>
        {/* Service Description */}
        <p className='text-xs leading-relaxed text-gray-400 sm:text-sm'>
          {desc}
        </p>

        {/* Service Features/Benefits */}
        <div className='space-y-1.5 sm:space-y-2'>
          <div className='text-space-gold flex items-center text-xs'>
            <Star className='mr-1.5 h-2.5 w-2.5 sm:mr-2 sm:h-3 sm:w-3' />
            Professional Quality
          </div>
          <div className='text-space-gold flex items-center text-xs'>
            <Zap className='mr-1.5 h-2.5 w-2.5 sm:mr-2 sm:h-3 sm:w-3' />
            Fast Delivery
          </div>
          <div className='text-space-gold flex items-center text-xs'>
            <Star className='mr-1.5 h-2.5 w-2.5 sm:mr-2 sm:h-3 sm:w-3' />
            Ongoing Support
          </div>
        </div>

        {/* CTA Button */}
        <div className='pt-3 sm:pt-4'>
          <Button
            variant='cosmic'
            size='sm'
            onClick={handleGetStarted}
            className='group h-9 w-full text-xs sm:h-10 sm:text-sm'
          >
            Get Started
            <ArrowRight className='ml-1.5 h-3 w-3 transition-transform duration-300 group-hover:translate-x-1 sm:ml-2 sm:h-4 sm:w-4' />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
