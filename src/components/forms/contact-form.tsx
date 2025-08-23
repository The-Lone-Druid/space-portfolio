'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Loader2, Send } from 'lucide-react'
import { useContactForm } from '../../hooks/use-contact-form'

export const ContactForm = () => {
  const {
    register,
    onSubmit,
    formState: { errors },
    isSubmitting,
  } = useContactForm()

  return (
    <div className='h-fit'>
      <div className='mb-6 md:mb-8'>
        <div className='flex items-center space-x-3 md:space-x-4'>
          <div className='bg-gradient-cosmic flex h-12 w-12 items-center justify-center rounded-xl shadow-lg md:h-14 md:w-14'>
            <Send className='h-6 w-6 text-white md:h-7 md:w-7' />
          </div>
          <div>
            <h3 className='text-lg font-bold text-white md:text-xl'>
              Send me a message
            </h3>
            <p className='text-sm text-gray-400 md:text-base'>
              Let&apos;s start a conversation
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={onSubmit} className='space-y-4 md:space-y-5'>
        {/* Name Fields Row */}
        <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4'>
          {/* First Name Field */}
          <div className='space-y-2'>
            <Label
              htmlFor='firstName'
              className='text-sm font-medium text-white md:text-base'
            >
              First Name *
            </Label>
            <Input
              id='firstName'
              placeholder='Your first name'
              className='focus:border-space-gold/50 focus:ring-space-gold/20 border-purple-500/30 bg-black/50 text-sm text-white transition-all duration-300 placeholder:text-gray-500 md:text-base'
              {...register('firstName')}
            />
            {errors.firstName && (
              <p className='text-xs text-red-400 md:text-sm'>
                {errors.firstName.message}
              </p>
            )}
          </div>

          {/* Last Name Field */}
          <div className='space-y-2'>
            <Label
              htmlFor='lastName'
              className='text-sm font-medium text-white md:text-base'
            >
              Last Name *
            </Label>
            <Input
              id='lastName'
              placeholder='Your last name'
              className='focus:border-space-gold/50 focus:ring-space-gold/20 border-purple-500/30 bg-black/50 text-sm text-white transition-all duration-300 placeholder:text-gray-500 md:text-base'
              {...register('lastName')}
            />
            {errors.lastName && (
              <p className='text-xs text-red-400 md:text-sm'>
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        {/* Email Field */}
        <div className='space-y-2'>
          <Label
            htmlFor='email'
            className='text-sm font-medium text-white md:text-base'
          >
            Email *
          </Label>
          <Input
            id='email'
            type='email'
            placeholder='your.email@example.com'
            className='focus:border-space-gold/50 focus:ring-space-gold/20 border-purple-500/30 bg-black/50 text-sm text-white transition-all duration-300 placeholder:text-gray-500 md:text-base'
            {...register('email')}
          />
          {errors.email && (
            <p className='text-xs text-red-400 md:text-sm'>
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Phone Field */}
        <div className='space-y-2'>
          <Label
            htmlFor='phone'
            className='text-sm font-medium text-white md:text-base'
          >
            Phone *
          </Label>
          <Input
            id='phone'
            placeholder='Your phone number'
            className='focus:border-space-gold/50 focus:ring-space-gold/20 border-purple-500/30 bg-black/50 text-sm text-white transition-all duration-300 placeholder:text-gray-500 md:text-base'
            {...register('phone')}
          />
          {errors.phone && (
            <p className='text-xs text-red-400 md:text-sm'>
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* Message Field */}
        <div className='space-y-2'>
          <Label
            htmlFor='message'
            className='text-sm font-medium text-white md:text-base'
          >
            Message *
          </Label>
          <Textarea
            id='message'
            placeholder='Tell me about your project, ideas, or just say hello!'
            rows={4}
            className='focus:border-space-gold/50 focus:ring-space-gold/20 resize-none border-purple-500/30 bg-black/50 text-sm text-white transition-all duration-300 placeholder:text-gray-500 md:text-base'
            {...register('message')}
          />
          {errors.message && (
            <p className='text-xs text-red-400 md:text-sm'>
              {errors.message.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className='pt-2 md:pt-4'>
          <Button
            type='submit'
            variant='cosmic'
            size='lg'
            className='group hover:shadow-space-gold/25 w-full text-sm shadow-lg transition-all duration-300 md:text-base'
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className='mr-2 h-4 w-4 animate-spin md:h-5 md:w-5' />
                Launching Message...
              </>
            ) : (
              <>
                <Send className='mr-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 md:h-5 md:w-5' />
                Launch Message 🚀
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
