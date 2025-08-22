'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { personalInfo } from '@/lib/data'
import { contactFormSchema, type ContactFormData } from '@/lib/validations'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Github,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Send,
} from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)

    try {
      // Simulate form submission - would normally send data to API
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Use data for API call in real implementation
      void data

      toast.success('Mission Control Received! 🚀', {
        description:
          "Your message has been sent successfully. I'll get back to you soon!",
      })

      reset()
    } catch {
      toast.error('Houston, we have a problem! 🛰️', {
        description:
          'Something went wrong. Please try again or contact me directly.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

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
    <section id='contact' className='py-20'>
      <div className='container mx-auto px-6'>
        {/* Section Header */}
        <div className='mb-16 text-center'>
          <h2 className='mb-4 text-4xl font-bold text-white md:text-5xl'>
            Launch{' '}
            <span className='bg-gradient-stellar bg-clip-text text-transparent'>
              Your Mission
            </span>
          </h2>
          <div className='bg-gradient-stellar mx-auto mb-6 h-1 w-24'></div>
          <p className='mx-auto max-w-3xl text-lg text-gray-400'>
            Ready to embark on a digital journey together? Let&apos;s connect
            and create something extraordinary that will reach new heights in
            the digital cosmos.
          </p>
        </div>

        <div className='grid grid-cols-1 gap-12 lg:grid-cols-2'>
          {/* Contact Form */}
          <div>
            <Card className='glass-cosmic border-purple-500/20'>
              <CardHeader>
                <h3 className='flex items-center text-2xl font-bold text-white'>
                  <Send className='text-space-gold mr-3 h-8 w-8' />
                  Send Message to Mission Control
                </h3>
                <p className='text-gray-400'>
                  Fill out the form below and I&apos;ll get back to you at warp
                  speed!
                </p>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
                  {/* Name Fields */}
                  <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                    <div className='space-y-2'>
                      <Label htmlFor='firstName' className='text-white'>
                        First Name *
                      </Label>
                      <Input
                        id='firstName'
                        {...register('firstName')}
                        className='bg-space-cosmic/50 focus:border-space-gold border-purple-500/30 text-white placeholder:text-gray-400'
                        placeholder='Enter your first name'
                      />
                      {errors.firstName && (
                        <p className='text-sm text-red-400'>
                          {errors.firstName.message}
                        </p>
                      )}
                    </div>

                    <div className='space-y-2'>
                      <Label htmlFor='lastName' className='text-white'>
                        Last Name *
                      </Label>
                      <Input
                        id='lastName'
                        {...register('lastName')}
                        className='bg-space-cosmic/50 focus:border-space-gold border-purple-500/30 text-white placeholder:text-gray-400'
                        placeholder='Enter your last name'
                      />
                      {errors.lastName && (
                        <p className='text-sm text-red-400'>
                          {errors.lastName.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Email */}
                  <div className='space-y-2'>
                    <Label htmlFor='email' className='text-white'>
                      Email Address *
                    </Label>
                    <Input
                      id='email'
                      type='email'
                      {...register('email')}
                      className='bg-space-cosmic/50 focus:border-space-gold border-purple-500/30 text-white placeholder:text-gray-400'
                      placeholder='your.email@galaxy.com'
                    />
                    {errors.email && (
                      <p className='text-sm text-red-400'>
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className='space-y-2'>
                    <Label htmlFor='phone' className='text-white'>
                      Phone Number *
                    </Label>
                    <Input
                      id='phone'
                      type='tel'
                      {...register('phone')}
                      className='bg-space-cosmic/50 focus:border-space-gold border-purple-500/30 text-white placeholder:text-gray-400'
                      placeholder='+1 (555) 123-4567'
                    />
                    {errors.phone && (
                      <p className='text-sm text-red-400'>
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div className='space-y-2'>
                    <Label htmlFor='message' className='text-white'>
                      Project Details *
                    </Label>
                    <Textarea
                      id='message'
                      {...register('message')}
                      rows={6}
                      className='bg-space-cosmic/50 focus:border-space-gold resize-none border-purple-500/30 text-white placeholder:text-gray-400'
                      placeholder="Tell me about your project... What's your vision? What problems are you trying to solve? Let's make it happen! 🚀"
                    />
                    {errors.message && (
                      <p className='text-sm text-red-400'>
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <Button
                    type='submit'
                    variant='cosmic'
                    size='lg'
                    disabled={isSubmitting}
                    className='group w-full'
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className='mr-2 h-5 w-5 animate-spin' />
                        Launching Mission...
                      </>
                    ) : (
                      <>
                        <Send className='mr-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1' />
                        Launch Mission
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className='space-y-8'>
            {/* Contact Methods */}
            <div>
              <h3 className='mb-6 text-2xl font-bold text-white'>
                Alternative{' '}
                <span className='text-space-gold'>Communication Channels</span>
              </h3>

              <div className='space-y-4'>
                {contactMethods.map((method, index) => {
                  const IconComponent = method.icon
                  return (
                    <Card
                      key={index}
                      className='glass-nebula hover:border-space-gold/50 group border-purple-500/20 transition-all duration-300'
                    >
                      <CardContent className='p-6'>
                        <div className='flex items-start space-x-4'>
                          <div className='bg-space-accent group-hover:animate-pulse-cosmic flex h-12 w-12 items-center justify-center rounded-lg'>
                            <IconComponent className='h-6 w-6 text-white' />
                          </div>
                          <div className='flex-1'>
                            <h4 className='mb-1 font-semibold text-white'>
                              {method.label}
                            </h4>
                            <p className='text-space-gold mb-1 font-medium'>
                              {method.href.startsWith('mailto:') ? (
                                <a
                                  href={method.href}
                                  className='hover:underline'
                                >
                                  {method.value}
                                </a>
                              ) : (
                                method.value
                              )}
                            </p>
                            <p className='text-sm text-gray-400'>
                              {method.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className='mb-4 text-xl font-bold text-white'>
                Connect in the{' '}
                <span className='text-space-gold'>Digital Universe</span>
              </h3>

              <div className='flex space-x-4'>
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon
                  return (
                    <a
                      key={index}
                      href={social.url}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='group'
                    >
                      <Card className='glass-nebula hover:border-space-gold/50 border-purple-500/20 transition-all duration-300 group-hover:scale-105'>
                        <CardContent className='p-6 text-center'>
                          <IconComponent className='group-hover:text-space-gold mx-auto mb-3 h-8 w-8 text-gray-400 transition-colors duration-300' />
                          <h4 className='mb-1 text-sm font-semibold text-white'>
                            {social.name}
                          </h4>
                          <p className='text-xs text-gray-400'>
                            {social.username}
                          </p>
                        </CardContent>
                      </Card>
                    </a>
                  )
                })}
              </div>
            </div>

            {/* Availability Status */}
            <Card className='glass-cosmic border-purple-500/20'>
              <CardContent className='p-6'>
                <div className='mb-4 flex items-center space-x-3'>
                  <div className='h-3 w-3 animate-pulse rounded-full bg-green-400'></div>
                  <span className='font-semibold text-white'>
                    Currently Available
                  </span>
                </div>
                <p className='mb-4 text-sm text-gray-400'>
                  I&apos;m currently accepting new projects and collaborations.
                  Let&apos;s create something amazing together!
                </p>
                <div className='space-y-2 text-sm'>
                  <div className='flex justify-between text-gray-400'>
                    <span>Response time:</span>
                    <span className='text-space-gold'>Within 24 hours</span>
                  </div>
                  <div className='flex justify-between text-gray-400'>
                    <span>Project start:</span>
                    <span className='text-space-gold'>Within 1-2 weeks</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
