'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { services } from '@/lib/data'
import { ArrowRight, Star, Zap } from 'lucide-react'

const Services = () => {
  const scrollToContact = () => {
    const element = document.querySelector('#contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

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

  return (
    <section id='services' className='py-20'>
      <div className='container mx-auto px-6'>
        {/* Section Header */}
        <div className='mb-16 text-center'>
          <h2 className='mb-4 text-4xl font-bold text-white md:text-5xl'>
            Services I{' '}
            <span className='bg-gradient-stellar bg-clip-text text-transparent'>
              Offer
            </span>
          </h2>
          <div className='bg-gradient-stellar mx-auto mb-6 h-1 w-24'></div>
          <p className='mx-auto max-w-3xl text-lg text-gray-400'>
            From concept to deployment, I provide comprehensive solutions to
            launch your digital presence into the stratosphere of success
          </p>
        </div>

        {/* Services Grid */}
        <div className='mb-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {services.map((service, index) => (
            <Card
              key={service.id}
              className='glass-cosmic hover:border-space-gold/50 group h-full border-purple-500/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl'
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className='pb-4 text-center'>
                {/* Service Icon */}
                <div className='bg-gradient-nebula group-hover:animate-pulse-cosmic mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full text-4xl'>
                  {getServiceIcon(service.icon)}
                </div>

                {/* Service Name */}
                <h3 className='group-hover:text-space-gold text-xl font-bold text-white transition-colors duration-300'>
                  {service.name}
                </h3>
              </CardHeader>

              <CardContent className='space-y-4'>
                {/* Service Description */}
                <p className='text-sm leading-relaxed text-gray-400'>
                  {service.desc}
                </p>

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
                    onClick={scrollToContact}
                    className='group w-full'
                  >
                    Get Started
                    <ArrowRight className='ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1' />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Process Section */}
        <div className='glass-nebula mb-16 rounded-2xl p-8'>
          <h3 className='mb-8 text-center text-2xl font-bold text-white'>
            My Development <span className='text-space-gold'>Process</span>
          </h3>

          <div className='grid grid-cols-1 gap-6 md:grid-cols-4'>
            {[
              {
                step: '01',
                title: 'Discovery',
                description:
                  'Understanding your vision and mission requirements',
                icon: '🎯',
              },
              {
                step: '02',
                title: 'Design',
                description: 'Creating stellar UI/UX designs and prototypes',
                icon: '🎨',
              },
              {
                step: '03',
                title: 'Development',
                description:
                  'Building your application with clean, scalable code',
                icon: '⚡',
              },
              {
                step: '04',
                title: 'Launch',
                description: 'Deploying and launching your project into orbit',
                icon: '🚀',
              },
            ].map((phase, index) => (
              <div key={index} className='group text-center'>
                <div className='relative mb-4'>
                  <div className='bg-gradient-cosmic group-hover:animate-pulse-cosmic mx-auto flex h-16 w-16 items-center justify-center rounded-full text-2xl'>
                    {phase.icon}
                  </div>
                  <Badge className='bg-space-gold text-space-deep absolute -top-2 -right-2 text-xs'>
                    {phase.step}
                  </Badge>
                </div>
                <h4 className='mb-2 font-semibold text-white'>{phase.title}</h4>
                <p className='text-sm text-gray-400'>{phase.description}</p>

                {/* Connection Line (except for last item) */}
                {index < 3 && (
                  <div className='from-space-gold absolute top-8 left-1/2 hidden h-0.5 w-full translate-x-8 transform bg-gradient-to-r to-transparent md:block'></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Technologies & Guarantees */}
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
          {/* Technologies */}
          <div className='glass-cosmic rounded-2xl p-8'>
            <h3 className='mb-6 flex items-center text-xl font-bold text-white'>
              <span className='mr-3 text-2xl'>🛠️</span>
              Technologies I Use
            </h3>
            <div className='grid grid-cols-3 gap-4'>
              {[
                'React',
                'Next.js',
                'TypeScript',
                'Node.js',
                'Tailwind',
                'Firebase',
              ].map(tech => (
                <div key={tech} className='group text-center'>
                  <div className='bg-space-accent group-hover:animate-pulse-cosmic mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-lg text-sm font-semibold text-white'>
                    {tech.slice(0, 2)}
                  </div>
                  <p className='text-xs text-gray-400'>{tech}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Guarantees */}
          <div className='glass-cosmic rounded-2xl p-8'>
            <h3 className='mb-6 flex items-center text-xl font-bold text-white'>
              <span className='mr-3 text-2xl'>✨</span>
              My Guarantees
            </h3>
            <div className='space-y-4'>
              {[
                '100% Clean & Valid Code',
                'Responsive Design Across All Devices',
                'SEO Optimized & Performance Focused',
                'Regular Updates & Communication',
                'Post-Launch Support & Maintenance',
              ].map((guarantee, index) => (
                <div
                  key={index}
                  className='flex items-center text-sm text-gray-300'
                >
                  <Star className='text-space-gold mr-3 h-4 w-4 flex-shrink-0' />
                  {guarantee}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className='mt-16 text-center'>
          <div className='glass-nebula mx-auto max-w-2xl rounded-2xl p-8'>
            <h3 className='mb-4 text-2xl font-bold text-white'>
              Ready to Launch Your{' '}
              <span className='text-space-gold'>Digital Mission</span>?
            </h3>
            <p className='mb-6 text-gray-400'>
              Let&apos;s discuss your project and create something amazing
              together. Your success story starts with a single message.
            </p>
            <Button
              variant='cosmic'
              size='lg'
              onClick={scrollToContact}
              className='group'
            >
              Start Your Project
              <ArrowRight className='ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1' />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services
