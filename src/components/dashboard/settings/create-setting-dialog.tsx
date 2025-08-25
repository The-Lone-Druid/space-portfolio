'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
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
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useSettings } from '@/hooks/use-settings'
import { settingSchema, type SettingFormData } from '@/lib/validations'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export function CreateSettingDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const { createSetting, isLoading } = useSettings()

  const form = useForm({
    resolver: zodResolver(settingSchema),
    defaultValues: {
      key: '',
      value: '',
      description: '',
      type: 'STRING',
      isActive: true,
    } as SettingFormData,
  })

  const handleSubmit = async (data: SettingFormData) => {
    try {
      await createSetting(data)
      toast.success('Setting created successfully')
      form.reset()
      setIsOpen(false)
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to create setting'
      )
    }
  }

  const selectedType = form.watch('type') || 'STRING'

  const getValuePlaceholder = (type: string) => {
    switch (type) {
      case 'STRING':
        return 'Enter text value...'
      case 'NUMBER':
        return 'Enter numeric value...'
      case 'BOOLEAN':
        return 'true or false'
      case 'JSON':
        return '{"key": "value"}'
      case 'URL':
        return 'https://example.com'
      case 'EMAIL':
        return 'user@example.com'
      default:
        return 'Enter value...'
    }
  }

  const validateValue = (value: string, type: string) => {
    switch (type) {
      case 'NUMBER':
        return !isNaN(Number(value)) || 'Must be a valid number'
      case 'BOOLEAN':
        return (
          ['true', 'false'].includes(value.toLowerCase()) ||
          'Must be true or false'
        )
      case 'JSON':
        try {
          JSON.parse(value)
          return true
        } catch {
          return 'Must be valid JSON'
        }
      case 'URL':
        try {
          new URL(value)
          return true
        } catch {
          return 'Must be a valid URL'
        }
      case 'EMAIL':
        return (
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'Must be a valid email'
        )
      default:
        return true
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant='stellar'>
          <Plus className='mr-2 h-4 w-4' />
          Add Setting
        </Button>
      </DialogTrigger>
      <DialogContent className='glass-nebula border-space-accent/50 max-w-md'>
        <DialogHeader>
          <DialogTitle className='text-white'>Create New Setting</DialogTitle>
          <DialogDescription className='text-white/70'>
            Add a new configuration setting to your site.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className='space-y-4'
          >
            <FormField
              control={form.control}
              name='key'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-white'>Key</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='setting.key.name'
                      className='border-white/20 bg-white/5 text-white placeholder:text-white/50'
                    />
                  </FormControl>
                  <FormDescription className='text-white/60'>
                    Unique identifier for this setting (lowercase, alphanumeric,
                    dots, hyphens allowed)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='type'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-white'>Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className='border-white/20 bg-white/5 text-white'>
                        <SelectValue placeholder='Select setting type' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='STRING'>String</SelectItem>
                      <SelectItem value='NUMBER'>Number</SelectItem>
                      <SelectItem value='BOOLEAN'>Boolean</SelectItem>
                      <SelectItem value='JSON'>JSON</SelectItem>
                      <SelectItem value='URL'>URL</SelectItem>
                      <SelectItem value='EMAIL'>Email</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription className='text-white/60'>
                    Data type for validation and formatting
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='value'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-white'>Value</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder={getValuePlaceholder(selectedType)}
                      className='resize-none border-white/20 bg-white/5 text-white placeholder:text-white/50'
                      rows={3}
                    />
                  </FormControl>
                  <FormDescription className='text-white/60'>
                    The actual value for this setting
                  </FormDescription>
                  <FormMessage />
                  {field.value &&
                    validateValue(field.value, selectedType) !== true && (
                      <p className='text-sm text-red-400'>
                        {validateValue(field.value, selectedType)}
                      </p>
                    )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-white'>
                    Description (Optional)
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder='Describe what this setting controls...'
                      className='resize-none border-white/20 bg-white/5 text-white placeholder:text-white/50'
                      rows={2}
                    />
                  </FormControl>
                  <FormDescription className='text-white/60'>
                    Help text to explain the purpose of this setting
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type='button'
                variant='outline'
                onClick={() => setIsOpen(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type='submit' variant='stellar' disabled={isLoading}>
                {isLoading ? (
                  <>
                    <LoadingSpinner className='mr-2 h-4 w-4' />
                    Creating...
                  </>
                ) : (
                  'Create Setting'
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
