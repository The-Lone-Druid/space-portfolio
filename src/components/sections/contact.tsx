'use client'

import {
  Mail,
  MapPin,
  Phone,
  Sparkles,
  Star,
  ArrowRight,
  Zap,
} from 'lucide-react'
import { getLucideIcon } from '../../lib/utils'
import { PersonalInfoWithSocials } from '../../types'
import { ContactMethodCard } from '../cards/contact-method-card'
import { SectionHeader } from '../shared/section-header'
import { SocialLinkCard } from '../cards/social-link-card'
import { ContactForm } from '../forms/contact-form'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader } from '../ui/card'
import { useState, useEffect } from 'react'

interface ContactProps {
  personalInfo: PersonalInfoWithSocials
}

const Contact = ({ personalInfo }: ContactProps) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      description: 'Send me a direct message',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: personalInfo.location,
      href: '#',
      description: 'Currently exploring from',
    },
    {
      icon: Phone,
      label: 'Response Time',
      value: 'Within 24 hours',
      href: '#',
      description: 'Average response time',
    },
  ]

  const socialLinks = personalInfo?.socialLinks.map(social => ({
    icon: getLucideIcon(social.name),
    name: social.name,
    url: social.url,
    username: social.url,
  }))

  return (
    <section className='relative'>
      <div>
        {/* Section Header */}
        <div className='mb-16'>
          <SectionHeader
            title="Let's"
            highlight='Work Together'
            subtitle="Ready to bring your vision to life? I'd love to hear about your project and explore how we can create something extraordinary together."
            badge={{ text: 'Ready to collaborate?', emoji: '💫' }}
          />
        </div>

        {/* Main Content Grid */}
        <div
          className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          <div className='grid grid-cols-12 gap-4 sm:gap-6 lg:gap-8'>
            {/* Contact Form - Takes 2 columns on large screens */}
            <div className='col-span-12 lg:col-span-8'>
              <Card className='glass-cosmic group hover:shadow-space-accent/20 w-full transition-all duration-500 hover:shadow-2xl'>
                {/* Gradient Header */}
                <div className='from-space-gold via-space-accent h-1 w-full bg-gradient-to-r to-purple-500'></div>

                <CardHeader className='px-3 pb-3 sm:px-4 sm:pb-4 md:px-6 md:pb-6 lg:px-8'>
                  <div className='mb-2 flex items-center gap-2 sm:mb-3 sm:gap-3 md:gap-4'>
                    <div className='from-space-gold flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br to-amber-500 shadow-lg transition-transform duration-300 group-hover:scale-110 sm:h-10 sm:w-10 sm:rounded-xl md:h-12 md:w-12 lg:h-14 lg:w-14'>
                      <Mail className='h-4 w-4 text-white sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-7 lg:w-7' />
                    </div>
                    <div className='min-w-0 flex-1'>
                      <h2 className='text-lg font-bold text-white sm:text-xl md:text-2xl lg:text-3xl'>
                        Send a <span className='text-space-gold'>Message</span>
                      </h2>
                      <p className='mt-1 text-xs text-gray-400 sm:text-sm'>
                        Let&apos;s discuss your project
                      </p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className='px-3 pb-4 sm:px-4 sm:pb-6 md:px-6 md:pb-8 lg:px-8 lg:pb-10'>
                  <ContactForm />
                </CardContent>
              </Card>
            </div>

            {/* Contact Info Sidebar */}
            <div className='col-span-12 space-y-4 sm:space-y-6 lg:col-span-4'>
              {/* Quick Contact */}
              <Card className='glass-cosmic group w-full hover:shadow-xl'>
                <CardHeader className='px-3 pt-3 pb-2 sm:px-4 sm:pt-4 sm:pb-3 md:px-6 md:pt-6 md:pb-4'>
                  <div className='mb-1 flex items-center gap-2 sm:mb-2 sm:gap-3'>
                    <div className='from-space-accent flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br to-purple-600 shadow-md transition-transform duration-300 group-hover:scale-110 sm:h-8 sm:w-8 sm:rounded-lg md:h-10 md:w-10'>
                      <Zap className='h-3 w-3 text-white sm:h-4 sm:w-4 md:h-5 md:w-5' />
                    </div>
                    <h3 className='text-sm font-bold text-white sm:text-base md:text-lg'>
                      Quick <span className='text-space-accent'>Contact</span>
                    </h3>
                  </div>
                </CardHeader>

                <CardContent className='space-y-2 px-3 pb-3 sm:space-y-3 sm:px-4 sm:pb-4 md:px-6 md:pb-6'>
                  {contactMethods.map((method, index) => (
                    <div
                      key={method.label}
                      className='transform transition-all duration-300 hover:scale-105'
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <ContactMethodCard
                        icon={method.icon}
                        label={method.label}
                        value={method.value}
                        description={method.description}
                        href={method.href}
                      />
                    </div>
                  ))}
                  {socialLinks.map((social, index) => (
                    <div
                      key={social.name}
                      className='transform transition-all duration-300 hover:scale-105'
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <SocialLinkCard
                        icon={social.icon}
                        name={social.name}
                        username={social.username}
                        url={social.url}
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Call-to-Action Section */}
        <div
          className={`mt-6 transform transition-all delay-400 duration-1000 sm:mt-8 lg:mt-10 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          <Card className='glass-cosmic hover:shadow-space-accent/20 w-full transition-all duration-500 hover:shadow-2xl'>
            {/* Decorative Background */}
            <div className='absolute inset-0 overflow-hidden opacity-5'>
              <div className='bg-gradient-radial from-space-gold/30 absolute -top-4 -right-4 h-32 w-32 rounded-full to-transparent'></div>
              <div className='bg-gradient-radial from-space-accent/30 absolute -bottom-4 -left-4 h-24 w-24 rounded-full to-transparent'></div>
            </div>

            <CardContent className='relative z-10 px-3 py-6 text-center sm:px-4 sm:py-8 md:px-6 md:py-12 lg:px-12 lg:py-16'>
              <div className='mb-3 flex flex-col items-center justify-center gap-2 sm:mb-4 sm:gap-3 md:mb-6 md:flex-row md:gap-4'>
                <Sparkles className='text-space-gold h-5 w-5 animate-pulse sm:h-6 sm:w-6 md:h-8 md:w-8' />
                <h2 className='text-lg font-bold text-white sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl'>
                  Ready to Start Your{' '}
                  <span className='text-space-gold'>Journey?</span>
                </h2>
                <Star className='text-space-accent h-5 w-5 animate-pulse sm:h-6 sm:w-6 md:h-8 md:w-8' />
              </div>

              <p className='mx-auto mb-6 max-w-3xl text-xs leading-relaxed text-gray-400 sm:mb-8 sm:text-sm md:mb-10 md:text-base lg:text-lg xl:text-xl'>
                Whether you need a complete web application, mobile app, or just
                want to discuss your next big idea, I&apos;m here to help bring
                your vision to life with cutting-edge technology and creative
                solutions.
              </p>

              <div className='flex flex-col gap-2 sm:gap-3 md:flex-row md:justify-center md:gap-4 lg:gap-6'>
                <Button
                  asChild
                  variant='cosmic'
                  size='lg'
                  className='group h-10 px-4 text-sm font-semibold shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 sm:h-12 sm:px-6 sm:text-base md:h-14 md:px-8 md:text-lg'
                >
                  <a href={`mailto:${personalInfo.email}`}>
                    <Mail className='mr-1 h-3 w-3 transition-transform duration-300 group-hover:scale-110 sm:mr-2 sm:h-4 sm:w-4 md:mr-3 md:h-5 md:w-5' />
                    Start a Conversation
                  </a>
                </Button>

                <Button
                  asChild
                  variant='outline'
                  size='lg'
                  className='group h-10 border-white/20 bg-white/5 px-4 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/10 hover:shadow-lg hover:shadow-white/20 sm:h-12 sm:px-6 sm:text-base md:h-14 md:px-8 md:text-lg'
                >
                  <a href='#about'>
                    Learn More About Me
                    <ArrowRight className='ml-1 h-3 w-3 transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-110 sm:ml-2 sm:h-4 sm:w-4 md:ml-3 md:h-5 md:w-5' />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default Contact
