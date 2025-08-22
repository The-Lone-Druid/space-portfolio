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
      {/* Quick stats */}
      <div className='mt-12 mb-20 grid grid-cols-1 gap-8 sm:grid-cols-3'>
        <div className='text-center' ref={responseTimeCounter.ref}>
          <div className='text-space-gold text-3xl font-bold'>
            {responseTimeCounter.count}
          </div>
          <p className='text-sm text-gray-400'>Response Time</p>
        </div>
        <div className='text-center' ref={projectsCounter.ref}>
          <div className='text-space-gold text-3xl font-bold'>
            {projectsCounter.count}
          </div>
          <p className='text-sm text-gray-400'>Projects Delivered</p>
        </div>
        <div className='text-center' ref={satisfactionCounter.ref}>
          <div className='text-space-gold text-3xl font-bold'>
            {satisfactionCounter.count}
          </div>
          <p className='text-sm text-gray-400'>Client Satisfaction</p>
        </div>
      </div>

      <div className='mb-20 grid grid-cols-1 gap-16 lg:grid-cols-2'>
        {/* Contact Form */}
        <div className='order-2 lg:order-1'>
          <ContactForm />
        </div>

        {/* Contact Information */}
        <div className='order-1 space-y-8 lg:order-2'>
          {/* Contact Methods */}
          <div className='space-y-6'>
            <h3 className='text-2xl font-bold text-white'>Get in Touch</h3>
            <div className='grid gap-4'>
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
          <div className='space-y-6'>
            <h3 className='text-2xl font-bold text-white'>Connect With Me</h3>
            <div className='grid gap-4'>
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
          <div className='rounded-2xl border border-green-500/30 bg-green-500/10 p-6 text-center'>
            <div className='mb-3 flex items-center justify-center'>
              <div className='mr-3 h-3 w-3 animate-pulse rounded-full bg-green-500'></div>
              <span className='font-medium text-green-400'>
                Currently Available
              </span>
            </div>
            <p className='mb-4 text-sm text-gray-300'>
              Ready to take on new projects and collaborations
            </p>
          </div>
        </div>
      </div>
    </SectionCard>
  )
}

export default Contact
