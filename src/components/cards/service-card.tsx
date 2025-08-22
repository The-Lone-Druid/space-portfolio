import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ArrowRight, Star, Zap } from 'lucide-react'

interface ServiceCardProps {
  id: number
  name: string
  desc: string
  icon: string
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
      <CardHeader className='pb-4 text-center'>
        {/* Service Icon */}
        <div className='bg-gradient-nebula group-hover:animate-pulse-cosmic mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full text-4xl'>
          {getServiceIcon(icon)}
        </div>

        {/* Service Name */}
        <h3 className='group-hover:text-space-gold text-xl font-bold text-white transition-colors duration-300'>
          {name}
        </h3>
      </CardHeader>

      <CardContent className='space-y-4'>
        {/* Service Description */}
        <p className='text-sm leading-relaxed text-gray-400'>{desc}</p>

        {/* Service Features/Benefits */}
        <div className='space-y-2'>
          <div className='text-space-gold flex items-center text-xs'>
            <Star className='mr-2 h-3 w-3' />
            Professional Quality
          </div>
          <div className='text-space-gold flex items-center text-xs'>
            <Zap className='mr-2 h-3 w-3' />
            Fast Delivery
          </div>
          <div className='text-space-gold flex items-center text-xs'>
            <Star className='mr-2 h-3 w-3' />
            Ongoing Support
          </div>
        </div>

        {/* CTA Button */}
        <div className='pt-4'>
          <Button
            variant='cosmic'
            size='sm'
            onClick={handleGetStarted}
            className='group w-full'
          >
            Get Started
            <ArrowRight className='ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1' />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
