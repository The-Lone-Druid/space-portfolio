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
        <div className='mb-20 text-center'>
          <div className='mb-6'>
            <span className='text-space-gold text-lg font-medium'>
              💫 Ready to collaborate?
            </span>
          </div>
          <h2 className='mb-6 text-4xl font-bold text-white md:text-5xl lg:text-6xl'>
            Let&apos;s{' '}
            <span className='text-space-gold animate-pulse-cosmic'>
              Work Together
            </span>
          </h2>
          <div className='via-space-gold mx-auto mb-8 h-0.5 w-32 bg-gradient-to-r from-transparent to-transparent'></div>
          <p className='mx-auto max-w-3xl text-xl leading-relaxed text-gray-300'>
            Ready to bring your vision to life? I&apos;d love to hear about your
            project and explore how we can create something extraordinary
            together.
          </p>

          {/* Quick stats */}
          <div className='mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3'>
            <div className='text-center'>
              <div className='text-space-gold text-3xl font-bold'>24h</div>
              <p className='text-sm text-gray-400'>Response Time</p>
            </div>
            <div className='text-center'>
              <div className='text-space-gold text-3xl font-bold'>100+</div>
              <p className='text-sm text-gray-400'>Projects Delivered</p>
            </div>
            <div className='text-center'>
              <div className='text-space-gold text-3xl font-bold'>5★</div>
              <p className='text-sm text-gray-400'>Client Satisfaction</p>
            </div>
          </div>
        </div>

        <div className='mb-20 grid grid-cols-1 gap-16 lg:grid-cols-2'>
          {/* Contact Form */}
          <div className='order-2 lg:order-1'>
            <Card className='glass-cosmic border-purple-500/30 shadow-2xl backdrop-blur-xl'>
              <CardHeader className='pb-8'>
                <div className='flex items-center space-x-4'>
                  <div className='bg-gradient-cosmic flex h-16 w-16 items-center justify-center rounded-2xl'>
                    <Send className='h-8 w-8 text-white' />
                  </div>
                  <div>
                    <h3 className='mb-2 text-2xl font-bold text-white'>
                      Send Me a Message
                    </h3>
                    <p className='text-gray-400'>
                      Let&apos;s discuss your next big idea!
                    </p>
                  </div>
                </div>
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
                        className='bg-space-cosmic/30 focus:border-space-gold focus:bg-space-cosmic/50 h-12 rounded-xl border-purple-500/40 text-white backdrop-blur-sm transition-all duration-300 placeholder:text-gray-400'
                        placeholder='Your first name'
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
                        className='bg-space-cosmic/30 focus:border-space-gold focus:bg-space-cosmic/50 h-12 rounded-xl border-purple-500/40 text-white backdrop-blur-sm transition-all duration-300 placeholder:text-gray-400'
                        placeholder='Your last name'
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
                      className='bg-space-cosmic/30 focus:border-space-gold focus:bg-space-cosmic/50 h-12 rounded-xl border-purple-500/40 text-white backdrop-blur-sm transition-all duration-300 placeholder:text-gray-400'
                      placeholder='your.email@example.com'
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
                      className='bg-space-cosmic/30 focus:border-space-gold focus:bg-space-cosmic/50 h-12 rounded-xl border-purple-500/40 text-white backdrop-blur-sm transition-all duration-300 placeholder:text-gray-400'
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
                      className='bg-space-cosmic/30 focus:border-space-gold focus:bg-space-cosmic/50 resize-none rounded-xl border-purple-500/40 text-white backdrop-blur-sm transition-all duration-300 placeholder:text-gray-400'
                      placeholder="Tell me about your project vision, goals, timeline, and what success looks like to you. I'm excited to hear your ideas! ✨"
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
          </div>
        </div>

        {/* Social Links & Availability */}
        <div className='mt-16'>
          <h3 className='mb-8 text-center text-2xl font-bold text-white'>
            Connect in the{' '}
            <span className='text-space-gold'>Digital Universe</span>
          </h3>

          <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
            {/* Social Links */}
            <div className='lg:col-span-2'>
              <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
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
                      <Card className='glass-nebula hover:border-space-gold/50 h-full border-purple-500/20 transition-all duration-300 group-hover:scale-105'>
                        <CardContent className='p-6'>
                          <div className='flex items-center space-x-4'>
                            <div className='bg-gradient-cosmic group-hover:animate-pulse-cosmic flex h-12 w-12 items-center justify-center rounded-xl'>
                              <IconComponent className='h-6 w-6 text-white' />
                            </div>
                            <div className='flex-1'>
                              <h4 className='group-hover:text-space-gold mb-1 text-lg font-semibold text-white transition-colors duration-300'>
                                {social.name}
                              </h4>
                              <p className='text-sm text-gray-400'>
                                {social.username}
                              </p>
                              <p className='text-space-gold mt-1 text-xs'>
                                Click to connect →
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </a>
                  )
                })}
              </div>
            </div>

            {/* Availability Status */}
            <div className='lg:col-span-1'>
              <Card className='glass-cosmic h-full border-purple-500/20'>
                <CardContent className='flex h-full flex-col justify-center p-6'>
                  <div className='space-y-4 text-center'>
                    {/* Status Indicator */}
                    <div className='flex items-center justify-center space-x-3'>
                      <div className='relative'>
                        <div className='h-4 w-4 animate-pulse rounded-full bg-green-400'></div>
                        <div className='absolute inset-0 h-4 w-4 animate-ping rounded-full bg-green-400 opacity-75'></div>
                      </div>
                      <span className='text-lg font-semibold text-white'>
                        Available for Work
                      </span>
                    </div>

                    {/* Description */}
                    <p className='text-sm leading-relaxed text-gray-300'>
                      Ready to bring your vision to life! I&apos;m accepting new
                      projects and collaborations.
                    </p>

                    {/* Quick Stats */}
                    <div className='space-y-3 border-t border-purple-500/20 pt-4'>
                      <div className='flex items-center justify-between'>
                        <span className='text-sm text-gray-400'>Response:</span>
                        <span className='text-space-gold text-sm font-medium'>
                          24 hours
                        </span>
                      </div>
                      <div className='flex items-center justify-between'>
                        <span className='text-sm text-gray-400'>Start:</span>
                        <span className='text-space-gold text-sm font-medium'>
                          1-2 weeks
                        </span>
                      </div>
                      <div className='flex items-center justify-between'>
                        <span className='text-sm text-gray-400'>Rate:</span>
                        <span className='text-space-gold text-sm font-medium'>
                          Competitive
                        </span>
                      </div>
                    </div>

                    {/* Call to Action */}
                    <div className='pt-4'>
                      <Button
                        variant='stellar'
                        size='sm'
                        className='w-full text-sm'
                        onClick={() => {
                          const element =
                            document.querySelector('#contact form')
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth' })
                          }
                        }}
                      >
                        Let&apos;s Talk! 💫
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
