'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Link as LinkIcon, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Badge } from '@/components/ui/badge'
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
import { Label } from '@/components/ui/label'
import { socialLinkSchema, type SocialLinkFormData } from '@/lib/validations'

interface SocialLink {
  id: string
  name: string
  url: string
  icon?: string
  order: number
}

interface SocialLinksManagerProps {
  socialLinks: SocialLink[]
  onAddLink: (data: SocialLinkFormData) => Promise<void>
  onDeleteLink: (id: string) => Promise<void>
  isLoading?: boolean
}

export function SocialLinksManager({
  socialLinks,
  onAddLink,
  onDeleteLink,
  isLoading = false,
}: SocialLinksManagerProps) {
  const [showAddForm, setShowAddForm] = useState(false)

  const form = useForm<SocialLinkFormData>({
    resolver: zodResolver(socialLinkSchema),
    defaultValues: {
      name: '',
      url: '',
      icon: '',
    },
  })

  const handleSubmit = async (data: SocialLinkFormData) => {
    await onAddLink(data)
    form.reset()
    setShowAddForm(false)
  }

  const handleCancel = () => {
    setShowAddForm(false)
    form.reset()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <LinkIcon className='h-5 w-5' />
          Social Links
        </CardTitle>
        <CardDescription>
          Manage your social media and professional links
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        {/* Existing Social Links */}
        {socialLinks.length > 0 && (
          <div className='space-y-2'>
            <Label>Current Social Links</Label>
            <div className='space-y-2'>
              {socialLinks.map(link => (
                <div
                  key={link.id}
                  className='flex items-center justify-between rounded-lg border p-3'
                >
                  <div className='flex items-center gap-3'>
                    <Badge variant='secondary'>{link.name}</Badge>
                    <span className='text-muted-foreground max-w-[300px] truncate text-sm'>
                      {link.url}
                    </span>
                    {link.icon && (
                      <Badge variant='outline' className='text-xs'>
                        {link.icon}
                      </Badge>
                    )}
                  </div>
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => onDeleteLink(link.id)}
                    className='text-destructive hover:text-destructive'
                    disabled={isLoading}
                  >
                    <Trash2 className='h-4 w-4' />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add New Social Link */}
        {!showAddForm ? (
          <Button
            variant='outline'
            onClick={() => setShowAddForm(true)}
            className='w-full'
            disabled={isLoading}
          >
            <Plus className='mr-2 h-4 w-4' />
            Add Social Link
          </Button>
        ) : (
          <div className='space-y-4 rounded-lg border p-4'>
            <div className='flex items-center justify-between'>
              <Label>Add New Social Link</Label>
              <Button
                variant='ghost'
                size='sm'
                onClick={handleCancel}
                disabled={isLoading}
              >
                Cancel
              </Button>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className='space-y-4'
              >
                <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                  <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Platform Name</FormLabel>
                        <FormControl>
                          <Input placeholder='GitHub' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='url'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>URL</FormLabel>
                        <FormControl>
                          <Input
                            type='url'
                            placeholder='https://github.com/username'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='icon'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Icon (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder='fab fa-github' {...field} />
                        </FormControl>
                        <FormDescription>
                          Font Awesome class name
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type='submit' disabled={isLoading}>
                  <Plus className='mr-2 h-4 w-4' />
                  {isLoading ? 'Adding...' : 'Add Social Link'}
                </Button>
              </form>
            </Form>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
