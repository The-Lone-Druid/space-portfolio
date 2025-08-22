'use client'

import {
  ContactMethodCard,
  SectionCard,
  SocialLinkCard,
} from '@/components/cards'
import { ContactForm } from '@/components/forms'
import { useAnimatedCounter } from '@/hooks'
import { personalInfo } from '@/lib/data'
import { Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react'

const Contact = () => {
  const responseTimeCounter = useAnimatedCounter({ end: 24, suffix: 'h' })
  const projectsCounter = useAnimatedCounter({ end: 100, suffix: '+' })
  const satisfactionCounter = useAnimatedCounter({ end: 5, suffix: '★' })

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

  const socialLinks = [
    {
      icon: Github,
      name: 'GitHub',
      url: 'https://github.com/zahidshaikh',
      username: '@zahidshaikh',
    },
    {
      icon: Linkedin,
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/zahidshaikh',
      username: 'Zahid Shaikh',
    },
  ]

  return (
    <SectionCard
      id='contact'
      title="Let's"
      highlight='Work Together'
      subtitle="Ready to bring your vision to life? I'd love to hear about your project and explore how we can create something extraordinary together."
      badge={{ text: 'Ready to collaborate?', emoji: '💫' }}
    >
      {/* Quick stats with improved visual appeal and responsive design */}
      <div className='relative mb-12 md:mb-16'>
        <div className='glass-cosmic rounded-2xl p-6 shadow-2xl md:rounded-3xl md:p-8'>
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-3 md:gap-8'>
            <div className='group text-center' ref={responseTimeCounter.ref}>
              <div className='bg-gradient-cosmic group-hover:animate-pulse-cosmic mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-xl shadow-lg transition-all duration-300 md:mb-4 md:h-20 md:w-20 md:rounded-2xl'>
                <div className='text-xl font-bold text-white md:text-2xl'>
                  {responseTimeCounter.count}
                </div>
              </div>
              <h4 className='text-base font-semibold text-white md:text-lg'>
                Response Time
              </h4>
              <p className='text-xs text-gray-400 md:text-sm'>
                Lightning fast replies
              </p>
            </div>
            <div className='group text-center' ref={projectsCounter.ref}>
              <div className='bg-gradient-nebula group-hover:animate-pulse-cosmic mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-xl shadow-lg transition-all duration-300 md:mb-4 md:h-20 md:w-20 md:rounded-2xl'>
                <div className='text-xl font-bold text-white md:text-2xl'>
                  {projectsCounter.count}
                </div>
              </div>
              <h4 className='text-base font-semibold text-white md:text-lg'>
                Projects Delivered
              </h4>
              <p className='text-xs text-gray-400 md:text-sm'>
                Successful launches
              </p>
            </div>
            <div className='group text-center' ref={satisfactionCounter.ref}>
              <div className='bg-gradient-stellar group-hover:animate-pulse-cosmic mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-xl shadow-lg transition-all duration-300 md:mb-4 md:h-20 md:w-20 md:rounded-2xl'>
                <div className='text-xl font-bold text-white md:text-2xl'>
                  {satisfactionCounter.count}
                </div>
              </div>
              <h4 className='text-base font-semibold text-white md:text-lg'>
                Client Satisfaction
              </h4>
              <p className='text-xs text-gray-400 md:text-sm'>Perfect rating</p>
            </div>
          </div>
        </div>
      </div>

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
              <h4 className='mb-2 text-base font-semibold text-green-400 md:text-lg'>
                Currently Available
              </h4>
              <p className='text-xs leading-relaxed text-gray-300 md:text-sm'>
                Ready to take on new projects and collaborations. Let&apos;s
                create something amazing together!
              </p>
            </div>
          </div>
        </div>
      </div>
    </SectionCard>
  )
}

export default Contact
