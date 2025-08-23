'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Save, User } from 'lucide-react'
import { useForm } from 'react-hook-form'

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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  personalInfoSchema,
  type PersonalInfoFormData,
} from '@/lib/validations'

interface PersonalInfoFormProps {
  initialData?: Partial<PersonalInfoFormData>
  onSubmit: (data: PersonalInfoFormData) => Promise<void>
  isLoading?: boolean
}

export function PersonalInfoForm({
  initialData,
  onSubmit,
  isLoading = false,
}: PersonalInfoFormProps) {
  const form = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      name: initialData?.name || '',
      title: initialData?.title || '',
      bio: initialData?.bio || '',
      email: initialData?.email || '',
      location: initialData?.location || '',
      resumeUrl: initialData?.resumeUrl || '',
    },
  })

  const handleSubmit = async (data: PersonalInfoFormData) => {
    await onSubmit(data)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <User className='h-5 w-5' />
          Personal Information
        </CardTitle>
        <CardDescription>
          Manage your basic profile information displayed on the portfolio
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className='space-y-4'
          >
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder='John Doe' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Professional Title</FormLabel>
                    <FormControl>
                      <Input placeholder='Full Stack Developer' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name='bio'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Tell us about yourself...'
                      className='min-h-[100px]'
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    A brief description about yourself and your expertise
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type='email'
                        placeholder='john@example.com'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='location'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder='San Francisco, CA' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name='resumeUrl'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resume URL (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      type='url'
                      placeholder='https://example.com/resume.pdf'
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Link to your resume or CV</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type='submit' disabled={isLoading}>
              <Save className='mr-2 h-4 w-4' />
              {isLoading ? 'Saving...' : 'Save Personal Info'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
