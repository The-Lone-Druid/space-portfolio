'use client'

import {
  Github,
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
          <div className='grid gap-12 lg:grid-cols-3 lg:gap-8 xl:gap-12'>
            {/* Contact Form - Takes 2 columns on large screens */}
            <div className='lg:col-span-2'>
              <Card className='glass-cosmic group hover:shadow-space-accent/20 transition-all duration-500 hover:shadow-2xl'>
                {/* Gradient Header */}
                <div className='from-space-gold via-space-accent h-1 w-full bg-gradient-to-r to-purple-500'></div>

                <CardHeader className='px-6 pb-6 sm:px-8 lg:px-10'>
                  <div className='mb-4 flex items-center gap-4'>
                    <div className='from-space-gold flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br to-amber-500 shadow-lg transition-transform duration-300 group-hover:scale-110 sm:h-14 sm:w-14'>
                      <Mail className='h-6 w-6 text-white sm:h-7 sm:w-7' />
                    </div>
                    <div>
                      <h2 className='text-2xl font-bold text-white sm:text-3xl'>
                        Send a <span className='text-space-gold'>Message</span>
                      </h2>
                      <p className='mt-1 text-sm text-gray-400'>
                        Let&apos;s discuss your project
                      </p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className='px-6 pb-8 sm:px-8 sm:pb-10 lg:px-10'>
                  <ContactForm />
                </CardContent>
              </Card>
            </div>

            {/* Contact Info Sidebar */}
            <div className='space-y-6'>
              {/* Quick Contact */}
              <Card className='glass-cosmic group transition-all duration-500 hover:scale-[1.02] hover:shadow-xl'>
                <CardHeader className='px-6 pt-6 pb-4'>
                  <div className='mb-2 flex items-center gap-3'>
                    <div className='from-space-accent flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br to-purple-600 shadow-md transition-transform duration-300 group-hover:scale-110'>
                      <Zap className='h-5 w-5 text-white' />
                    </div>
                    <h3 className='text-lg font-bold text-white'>
                      Quick <span className='text-space-accent'>Contact</span>
                    </h3>
                  </div>
                </CardHeader>

                <CardContent className='space-y-3 px-6 pb-6'>
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
          className={`mt-10 transform transition-all delay-400 duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          <Card className='glass-cosmic hover:shadow-space-accent/20 transition-all duration-500 hover:shadow-2xl'>
            {/* Decorative Background */}
            <div className='absolute inset-0 overflow-hidden opacity-5'>
              <div className='bg-gradient-radial from-space-gold/30 absolute -top-4 -right-4 h-32 w-32 rounded-full to-transparent'></div>
              <div className='bg-gradient-radial from-space-accent/30 absolute -bottom-4 -left-4 h-24 w-24 rounded-full to-transparent'></div>
            </div>

            <CardContent className='relative z-10 px-6 py-12 text-center sm:px-8 sm:py-16 lg:px-12'>
              <div className='mb-6 flex items-center justify-center gap-4'>
                <Sparkles className='text-space-gold h-8 w-8 animate-pulse' />
                <h2 className='text-2xl font-bold text-white sm:text-3xl lg:text-4xl'>
                  Ready to Start Your{' '}
                  <span className='text-space-gold'>Journey?</span>
                </h2>
                <Star className='text-space-accent h-8 w-8 animate-pulse' />
              </div>

              <p className='mx-auto mb-10 max-w-3xl text-base leading-relaxed text-gray-400 sm:text-lg lg:text-xl'>
                Whether you need a complete web application, mobile app, or just
                want to discuss your next big idea, I&apos;m here to help bring
                your vision to life with cutting-edge technology and creative
                solutions.
              </p>

              <div className='flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-6'>
                <Button
                  asChild
                  variant='cosmic'
                  size='lg'
                  className='group h-14 px-8 text-lg font-semibold shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25'
                >
                  <a href={`mailto:${personalInfo.email}`}>
                    <Mail className='mr-3 h-5 w-5 transition-transform duration-300 group-hover:scale-110' />
                    Start a Conversation
                  </a>
                </Button>

                <Button
                  asChild
                  variant='outline'
                  size='lg'
                  className='group h-14 border-white/20 bg-white/5 px-8 text-lg font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/10 hover:shadow-lg hover:shadow-white/20'
                >
                  <a href='#about'>
                    Learn More About Me
                    <ArrowRight className='ml-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-110' />
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
