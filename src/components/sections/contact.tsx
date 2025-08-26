'use client'

import { Github, Mail, MapPin, Phone, Sparkles, Star } from 'lucide-react'
import { getLucideIcon } from '../../lib/utils'
import { PersonalInfoWithSocials } from '../../types'
import { ContactMethodCard } from '../cards/contact-method-card'
import { SectionHeader } from '../shared/section-header'
import { SocialLinkCard } from '../cards/social-link-card'
import { ContactForm } from '../forms/contact-form'
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
    <>
      {/* Background Effects */}
      <div className='pointer-events-none absolute inset-0 overflow-hidden'>
        <div className='bg-space-gold/20 animate-float absolute top-20 right-10 h-4 w-4 rounded-full'></div>
        <div
          className='bg-space-accent/30 animate-float absolute bottom-32 left-20 h-2 w-2 rounded-full'
          style={{ animationDelay: '2s' }}
        ></div>
        <div
          className='animate-float absolute top-1/2 right-1/4 h-3 w-3 rounded-full bg-blue-400/20'
          style={{ animationDelay: '4s' }}
        ></div>
      </div>

      <SectionHeader
        title="Let's"
        highlight='Work Together'
        subtitle="Ready to bring your vision to life? I'd love to hear about your project and explore how we can create something extraordinary together."
        badge={{ text: 'Ready to collaborate?', emoji: '💫' }}
      />

      {/* Main Contact Layout - Improved Structure */}
      <div
        className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
      >
        {/* Contact Form Section - Full Width with Centered Layout */}
        <div className='mb-12 lg:mb-16'>
          <div className='mx-auto max-w-4xl'>
            <div className='glass-nebula group relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl transition-all duration-500 hover:border-white/20'>
              {/* Background glow effect */}
              <div className='from-space-gold/5 to-space-accent/5 absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100'></div>

              {/* Decorative header bar */}
              <div className='from-space-gold to-space-accent h-1 w-full bg-gradient-to-r'></div>

              <div className='p-8 md:p-12'>
                {/* Header with enhanced styling */}
                <div className='mb-8 text-center'>
                  <div className='mb-4 flex items-center justify-center gap-4'>
                    <div className='from-space-gold flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br to-yellow-400 shadow-lg'>
                      <Mail className='h-6 w-6 text-white' />
                    </div>
                    <h3 className='text-3xl font-bold text-white md:text-4xl'>
                      Send a <span className='text-space-gold'>Message</span>
                    </h3>
                  </div>
                  <p className='mx-auto max-w-2xl text-gray-400 md:text-lg'>
                    Have a project in mind? Let&apos;s discuss how we can turn
                    your ideas into digital reality.
                  </p>
                </div>

                <div className='relative z-10'>
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info & Social Links - Horizontal Layout */}
        <div
          className={`grid transform grid-cols-1 gap-8 transition-all delay-200 duration-1000 lg:grid-cols-3 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          {/* Contact Methods */}
          <div className='glass-cosmic group relative overflow-hidden rounded-2xl border border-white/10 p-6 shadow-xl transition-all duration-500 hover:scale-105 hover:border-white/20'>
            {/* Background glow effect */}
            <div className='from-space-accent/5 absolute inset-0 bg-gradient-to-br to-purple-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100'></div>

            <div className='relative z-10 text-center'>
              <div className='mb-6 flex justify-center'>
                <div className='bg-gradient-cosmic flex h-16 w-16 items-center justify-center rounded-2xl shadow-lg'>
                  <Mail className='h-8 w-8 text-white' />
                </div>
              </div>

              <h3 className='mb-6 text-xl font-bold text-white'>
                Get in <span className='text-space-accent'>Touch</span>
              </h3>

              <div className='space-y-4'>
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
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className='glass-cosmic group relative overflow-hidden rounded-2xl border border-white/10 p-6 shadow-xl transition-all duration-500 hover:scale-105 hover:border-white/20'>
            {/* Background glow effect */}
            <div className='from-space-gold/5 absolute inset-0 bg-gradient-to-br to-cyan-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100'></div>

            <div className='relative z-10 text-center'>
              <div className='mb-6 flex justify-center'>
                <div className='bg-gradient-nebula flex h-16 w-16 items-center justify-center rounded-2xl shadow-lg'>
                  <Github className='h-8 w-8 text-white' />
                </div>
              </div>

              <h3 className='mb-6 text-xl font-bold text-white'>
                Connect <span className='text-space-gold'>Online</span>
              </h3>

              <div className='space-y-4'>
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
              </div>
            </div>
          </div>

          {/* Availability Status */}
          <div className='glass-nebula group relative overflow-hidden rounded-2xl border border-green-500/30 bg-gradient-to-br from-green-500/10 to-emerald-500/5 p-6 shadow-xl transition-all duration-500 hover:scale-105 hover:border-green-500/50'>
            {/* Animated background elements */}
            <div className='absolute inset-0 opacity-10 transition-opacity duration-500 group-hover:opacity-20'>
              <div className='bg-gradient-radial absolute top-0 right-0 h-20 w-20 rounded-full from-green-400/30 to-transparent'></div>
              <div className='bg-gradient-radial absolute bottom-0 left-0 h-16 w-16 rounded-full from-emerald-400/30 to-transparent'></div>
            </div>

            <div className='relative z-10 text-center'>
              <div className='mb-6 flex justify-center'>
                <div className='relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-green-400 to-emerald-400 shadow-lg transition-transform duration-300 group-hover:scale-110'>
                  <div className='relative'>
                    <div className='h-3 w-3 animate-pulse rounded-full bg-white shadow-sm'></div>
                    <div className='absolute inset-0 h-3 w-3 animate-ping rounded-full bg-white opacity-75'></div>
                  </div>
                </div>
              </div>

              <h3 className='mb-4 text-xl font-bold text-green-400'>
                Currently <span className='text-white'>Available</span>
              </h3>

              <p className='mb-6 text-sm leading-relaxed text-gray-300'>
                Ready to take on new projects and collaborations. Let&apos;s
                create something amazing together!
              </p>

              {/* Enhanced Quote decoration */}
              <div className='rounded-lg bg-white/5 p-4'>
                <div className='flex justify-center'>
                  <div className='flex items-center gap-2'>
                    <div className='font-serif text-lg text-green-400/60'>
                      &ldquo;
                    </div>
                    <p className='text-sm font-medium text-green-300 italic'>
                      Innovation awaits your vision
                    </p>
                    <div className='font-serif text-lg text-green-400/60'>
                      &rdquo;
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Call-to-Action Section */}
        <div
          className={`mt-16 transform text-center transition-all delay-400 duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          <div className='glass-cosmic relative mx-auto max-w-3xl overflow-hidden rounded-2xl border border-white/10 p-8 md:p-12'>
            {/* Background pattern */}
            <div className='absolute inset-0 opacity-5'>
              <div className='bg-gradient-radial from-space-gold/30 absolute top-0 right-0 h-32 w-32 rounded-full to-transparent'></div>
              <div className='bg-gradient-radial from-space-accent/30 absolute bottom-0 left-0 h-24 w-24 rounded-full to-transparent'></div>
            </div>

            <div className='relative z-10'>
              <div className='mb-6 flex items-center justify-center gap-4'>
                <Sparkles className='text-space-gold h-8 w-8 animate-pulse' />
                <h3 className='text-2xl font-bold text-white md:text-3xl'>
                  Ready to Start Your{' '}
                  <span className='text-space-gold'>Journey?</span>
                </h3>
                <Star className='text-space-accent h-8 w-8 animate-pulse' />
              </div>

              <p className='mx-auto mb-8 max-w-2xl text-gray-400 md:text-lg'>
                Whether you need a complete web application, mobile app, or just
                want to discuss your next big idea, I&apos;m here to help bring
                your vision to life with cutting-edge technology and creative
                solutions.
              </p>

              <div className='flex flex-col gap-4 sm:flex-row sm:justify-center'>
                <a
                  href='mailto:your.email@example.com'
                  className='group from-space-gold inline-flex items-center justify-center rounded-xl bg-gradient-to-r to-yellow-500 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl'
                >
                  <Mail className='mr-2 h-5 w-5 transition-transform duration-300 group-hover:scale-110' />
                  Start a Conversation
                </a>
                <a
                  href='#about'
                  className='group inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-white/30'
                >
                  Learn More About Me
                  <Sparkles className='ml-2 h-5 w-5 transition-transform duration-300 group-hover:scale-110' />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact
