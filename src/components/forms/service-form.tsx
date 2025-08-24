'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { serviceSchema, type ServiceFormData } from '@/lib/validations'
import type { ServiceWithDetails } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Briefcase,
  Cloud,
  Code,
  Database,
  Loader2,
  Palette,
  Rocket,
  Settings,
  Shield,
  Smartphone,
  Zap,
} from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'

interface ServiceFormProps {
  initialData?: ServiceWithDetails
  onSubmit: (data: ServiceFormData) => Promise<void>
  onCancel?: () => void
  isSubmitting?: boolean
  submitLabel?: string
}

// Popular service-related Lucide icons
const serviceIcons = [
  { name: 'Rocket', icon: Rocket, value: 'Rocket' },
  { name: 'Code', icon: Code, value: 'Code' },
  { name: 'Database', icon: Database, value: 'Database' },
  { name: 'Cloud', icon: Cloud, value: 'Cloud' },
  { name: 'Smartphone', icon: Smartphone, value: 'Smartphone' },
  { name: 'Palette', icon: Palette, value: 'Palette' },
  { name: 'Shield', icon: Shield, value: 'Shield' },
  { name: 'Zap', icon: Zap, value: 'Zap' },
  { name: 'Briefcase', icon: Briefcase, value: 'Briefcase' },
]

export function ServiceForm({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting = false,
  submitLabel = 'Save Service',
}: ServiceFormProps) {
  const form = useForm({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      name: initialData?.name || '',
      desc: initialData?.desc || '',
      icon: initialData?.icon || '',
      order: initialData?.order || 0,
      isActive: initialData?.isActive ?? true,
    } as ServiceFormData,
  })

  const watchedIcon = form.watch('icon')
  const selectedIconComponent = serviceIcons.find(
    icon => icon.value === watchedIcon
  )?.icon

  const handleSubmit = async (data: ServiceFormData) => {
    try {
      await onSubmit(data)
    } catch (error) {
      console.error('Form submission error:', error)
    }
  }

  return (
    <div className='space-y-6'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-6'>
          {/* Basic Information Card */}
          <Card className='border-gray-800/50 bg-gray-900/40 backdrop-blur-sm'>
            <CardHeader className='pb-4'>
              <CardTitle className='flex items-center gap-2 text-white'>
                <Briefcase className='h-5 w-5 text-blue-400' />
                Service Information
              </CardTitle>
              <CardDescription className='text-gray-400'>
                Define the basic details of your service offering
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-white'>Service Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='e.g., Web Development, Mobile Apps, UI/UX Design'
                        className='border-gray-700 bg-gray-800/50 text-white placeholder:text-gray-400'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='desc'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-white'>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={4}
                        placeholder='Describe what this service includes and how it benefits clients...'
                        className='resize-none border-gray-700 bg-gray-800/50 text-white placeholder:text-gray-400'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Icon Selection Card */}
          <Card className='border-gray-800/50 bg-gray-900/40 backdrop-blur-sm'>
            <CardHeader className='pb-4'>
              <CardTitle className='flex items-center gap-2 text-white'>
                <Palette className='h-5 w-5 text-purple-400' />
                Service Icon
              </CardTitle>
              <CardDescription className='text-gray-400'>
                Choose an icon that represents your service
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <FormField
                control={form.control}
                name='icon'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-white'>
                      Icon{' '}
                      {selectedIconComponent && (
                        <span className='ml-2 inline-flex items-center'>
                          {React.createElement(selectedIconComponent, {
                            className: 'h-4 w-4 text-blue-400',
                          })}
                        </span>
                      )}
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className='border-gray-700 bg-gray-800/50 text-white'>
                          <SelectValue placeholder='Select an icon' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className='border-gray-700 bg-gray-800'>
                        {serviceIcons.map(icon => {
                          const IconComponent = icon.icon
                          return (
                            <SelectItem
                              key={icon.value}
                              value={icon.value}
                              className='text-white focus:bg-gray-700 focus:text-white'
                            >
                              <div className='flex items-center gap-2'>
                                <IconComponent className='h-4 w-4' />
                                {icon.name}
                              </div>
                            </SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Settings Card */}
          <Card className='border-gray-800/50 bg-gray-900/40 backdrop-blur-sm'>
            <CardHeader className='pb-4'>
              <CardTitle className='flex items-center gap-2 text-white'>
                <Settings className='h-5 w-5 text-gray-400' />
                Display Settings
              </CardTitle>
              <CardDescription className='text-gray-400'>
                Configure how this service appears in your portfolio
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <FormField
                control={form.control}
                name='order'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-white'>Display Order</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder='0'
                        className='border-gray-700 bg-gray-800/50 text-white placeholder:text-gray-400'
                        {...field}
                        onChange={e =>
                          field.onChange(parseInt(e.target.value) || 0)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Form Actions */}
          <div className='flex justify-end gap-4'>
            {onCancel && (
              <Button type='button' variant='ghost' onClick={onCancel}>
                Cancel
              </Button>
            )}
            <Button type='submit' disabled={isSubmitting} variant='cosmic'>
              {isSubmitting ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Saving...
                </>
              ) : (
                submitLabel
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
