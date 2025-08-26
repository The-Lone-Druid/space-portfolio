'use client'

import { Github, Mail, MapPin, Phone } from 'lucide-react'
import { getLucideIcon } from '../../lib/utils'
import { PersonalInfoWithSocials } from '../../types'
import { ContactMethodCard } from '../cards/contact-method-card'
import { SectionHeader } from '../shared/section-header'
import { SocialLinkCard } from '../cards/social-link-card'
import { ContactForm } from '../forms/contact-form'

interface ContactProps {
  personalInfo: PersonalInfoWithSocials
}

const Contact = ({ personalInfo }: ContactProps) => {
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
      <SectionHeader
        title="Let's"
        highlight='Work Together'
        subtitle="Ready to bring your vision to life? I'd love to hear about your project and explore how we can create something extraordinary together."
        badge={{ text: 'Ready to collaborate?', emoji: '💫' }}
      />

      <div className='grid grid-cols-1 gap-6 lg:gap-8 xl:grid-cols-3 xl:gap-12'>
        {/* Contact Form - Takes 2 columns on xl screens */}
        <div className='xl:col-span-2'>
          <div className='glass-cosmic rounded-2xl p-6 shadow-2xl md:rounded-3xl md:p-8'>
            <ContactForm />
          </div>
        </div>

        {/* Contact Information - Takes 1 column on xl screens */}
        <div className='space-y-4 md:space-y-6'>
          {/* Contact Methods */}
          <div className='glass-cosmic rounded-xl p-4 shadow-xl md:rounded-2xl md:p-6'>
            <h3 className='mb-4 flex items-center text-lg font-bold text-white md:mb-6 md:text-xl'>
              <div className='bg-gradient-cosmic mr-2 flex h-7 w-7 items-center justify-center rounded-lg shadow-md md:mr-3 md:h-8 md:w-8'>
                <Mail className='h-3.5 w-3.5 text-white md:h-4 md:w-4' />
              </div>
              Get in Touch
            </h3>
            <div className='space-y-2 md:space-y-3'>
              {contactMethods.map(method => (
                <ContactMethodCard
                  key={method.label}
                  icon={method.icon}
                  label={method.label}
                  value={method.value}
                  description={method.description}
                  href={method.href}
                />
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className='glass-cosmic rounded-xl p-4 shadow-xl md:rounded-2xl md:p-6'>
            <h3 className='mb-4 flex items-center text-lg font-bold text-white md:mb-6 md:text-xl'>
              <div className='bg-gradient-nebula mr-2 flex h-7 w-7 items-center justify-center rounded-lg shadow-md md:mr-3 md:h-8 md:w-8'>
                <Github className='h-3.5 w-3.5 text-white md:h-4 md:w-4' />
              </div>
              Connect With Me
            </h3>
            <div className='space-y-2 md:space-y-3'>
              {socialLinks.map(social => (
                <SocialLinkCard
                  key={social.name}
                  icon={social.icon}
                  name={social.name}
                  username={social.username}
                  url={social.url}
                />
              ))}
            </div>
          </div>

          {/* Availability Status */}
          <div className='glass-cosmic rounded-xl border border-green-500/30 bg-gradient-to-br from-green-500/10 to-emerald-500/5 p-4 shadow-xl md:rounded-2xl md:p-6'>
            <div className='text-center'>
              <div className='mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-green-400 to-emerald-400 shadow-lg md:mb-4 md:h-16 md:w-16'>
                <div className='h-2.5 w-2.5 animate-pulse rounded-full bg-white shadow-sm md:h-3 md:w-3'></div>
              </div>
              <h3 className='mb-2 text-base font-semibold text-green-400 md:text-lg'>
                Currently Available
              </h3>
              <p className='text-xs leading-relaxed text-gray-300 md:text-sm'>
                Ready to take on new projects and collaborations. Let&apos;s
                create something amazing together!
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact
