'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useContactForm } from '@/hooks'
import { Loader2, Send } from 'lucide-react'

export const ContactForm = () => {
  const {
    register,
    onSubmit,
    formState: { errors },
    isSubmitting,
  } = useContactForm()

  return (
    <Card className='glass-cosmic border-purple-500/30 shadow-2xl backdrop-blur-xl'>
      <CardHeader className='pb-8'>
        <div className='flex items-center space-x-4'>
          <div className='bg-gradient-cosmic flex h-16 w-16 items-center justify-center rounded-2xl'>
            <Send className='h-8 w-8 text-white' />
          </div>
          <div>
            <h3 className='text-2xl font-bold text-white'>Send me a message</h3>
            <p className='text-gray-400'>Let&apos;s start a conversation</p>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={onSubmit} className='space-y-6'>
          {/* First Name Field */}
          <div className='space-y-2'>
            <Label htmlFor='firstName' className='text-white'>
              First Name *
            </Label>
            <Input
              id='firstName'
              placeholder='Your first name'
              className='focus:border-space-gold/50 border-purple-500/30 bg-black/50 text-white placeholder:text-gray-500'
              {...register('firstName')}
            />
            {errors.firstName && (
              <p className='text-sm text-red-400'>{errors.firstName.message}</p>
            )}
          </div>

          {/* Last Name Field */}
          <div className='space-y-2'>
            <Label htmlFor='lastName' className='text-white'>
              Last Name *
            </Label>
            <Input
              id='lastName'
              placeholder='Your last name'
              className='focus:border-space-gold/50 border-purple-500/30 bg-black/50 text-white placeholder:text-gray-500'
              {...register('lastName')}
            />
            {errors.lastName && (
              <p className='text-sm text-red-400'>{errors.lastName.message}</p>
            )}
          </div>

          {/* Email Field */}
          <div className='space-y-2'>
            <Label htmlFor='email' className='text-white'>
              Email *
            </Label>
            <Input
              id='email'
              type='email'
              placeholder='your.email@example.com'
              className='focus:border-space-gold/50 border-purple-500/30 bg-black/50 text-white placeholder:text-gray-500'
              {...register('email')}
            />
            {errors.email && (
              <p className='text-sm text-red-400'>{errors.email.message}</p>
            )}
          </div>

          {/* Phone Field */}
          <div className='space-y-2'>
            <Label htmlFor='phone' className='text-white'>
              Phone *
            </Label>
            <Input
              id='phone'
              placeholder='Your phone number'
              className='focus:border-space-gold/50 border-purple-500/30 bg-black/50 text-white placeholder:text-gray-500'
              {...register('phone')}
            />
            {errors.phone && (
              <p className='text-sm text-red-400'>{errors.phone.message}</p>
            )}
          </div>

          {/* Message Field */}
          <div className='space-y-2'>
            <Label htmlFor='message' className='text-white'>
              Message *
            </Label>
            <Textarea
              id='message'
              placeholder='Tell me about your project, ideas, or just say hello!'
              rows={5}
              className='focus:border-space-gold/50 border-purple-500/30 bg-black/50 text-white placeholder:text-gray-500'
              {...register('message')}
            />
            {errors.message && (
              <p className='text-sm text-red-400'>{errors.message.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type='submit'
            variant='cosmic'
            size='lg'
            className='w-full'
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className='mr-2 h-5 w-5 animate-spin' />
                Launching Message...
              </>
            ) : (
              <>
                <Send className='mr-2 h-5 w-5' />
                Launch Message
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
