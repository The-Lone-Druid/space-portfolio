'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { useSettings } from '@/hooks/use-settings'
import { settingUpdateSchema, type SettingUpdateData } from '@/lib/validations'
import type { SiteSettingWithDetails } from '@/services/settings-service'
import { zodResolver } from '@hookform/resolvers/zod'
import { SettingType } from '@prisma/client'
import { ReactNode, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

interface EditSettingDialogProps {
  setting: SiteSettingWithDetails
  children: ReactNode
}

export function EditSettingDialog({
  setting,
  children,
}: EditSettingDialogProps) {
  const [open, setOpen] = useState(false)
  const { updateSetting, isLoading } = useSettings()

  const form = useForm<SettingUpdateData>({
    resolver: zodResolver(settingUpdateSchema),
    defaultValues: {
      key: setting.key,
      value: setting.value,
      description: setting.description || '',
      type: setting.type,
      isActive: setting.isActive,
    },
  })

  const handleSubmit = async (data: SettingUpdateData) => {
    try {
      // Remove empty description
      const submitData = {
        ...data,
        description: data.description?.trim() || undefined,
      }

      await updateSetting(setting.id, submitData)
      toast.success('Setting updated successfully')
      setOpen(false)
      form.reset()
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to update setting'
      )
    }
  }

  const resetForm = () => {
    form.reset({
      key: setting.key,
      value: setting.value,
      description: setting.description || '',
      type: setting.type,
      isActive: setting.isActive,
    })
  }

  return (
    <Dialog
      open={open}
      onOpenChange={newOpen => {
        setOpen(newOpen)
        if (!newOpen) {
          resetForm()
        }
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='glass-nebula border-space-accent/30 max-w-2xl'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2 text-white'>
            Edit Setting
          </DialogTitle>
          <DialogDescription className='text-white/70'>
            Update the setting configuration. The key should be unique across
            all settings.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className='space-y-6'
          >
            <div className='grid gap-6 md:grid-cols-2'>
              {/* Key Field */}
              <FormField
                control={form.control}
                name='key'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-white'>Key</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='e.g., site_title'
                        className='border-white/20 bg-white/5 text-white placeholder:text-white/50'
                      />
                    </FormControl>
                    <FormDescription className='text-xs text-white/60'>
                      Unique identifier for this setting. Letters, numbers,
                      underscores, dots, and hyphens only.
                    </FormDescription>
                    <FormMessage className='text-red-400' />
                  </FormItem>
                )}
              />

              {/* Type Field */}
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
                      <SelectContent className='glass-nebula border-space-accent/30'>
                        <SelectItem value={SettingType.STRING}>
                          String
                        </SelectItem>
                        <SelectItem value={SettingType.NUMBER}>
                          Number
                        </SelectItem>
                        <SelectItem value={SettingType.BOOLEAN}>
                          Boolean
                        </SelectItem>
                        <SelectItem value={SettingType.JSON}>JSON</SelectItem>
                        <SelectItem value={SettingType.URL}>URL</SelectItem>
                        <SelectItem value={SettingType.EMAIL}>Email</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription className='text-xs text-white/60'>
                      Data type for validation and display purposes.
                    </FormDescription>
                    <FormMessage className='text-red-400' />
                  </FormItem>
                )}
              />
            </div>

            {/* Value Field */}
            <FormField
              control={form.control}
              name='value'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-white'>Value</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder='Enter setting value...'
                      className='min-h-[100px] border-white/20 bg-white/5 text-white placeholder:text-white/50'
                    />
                  </FormControl>
                  <FormDescription className='text-xs text-white/60'>
                    The actual value for this setting. Format should match the
                    selected type.
                  </FormDescription>
                  <FormMessage className='text-red-400' />
                </FormItem>
              )}
            />

            {/* Description Field */}
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
                      className='min-h-[80px] border-white/20 bg-white/5 text-white placeholder:text-white/50'
                    />
                  </FormControl>
                  <FormDescription className='text-xs text-white/60'>
                    Optional description to help understand what this setting
                    does.
                  </FormDescription>
                  <FormMessage className='text-red-400' />
                </FormItem>
              )}
            />

            {/* Active Status */}
            <FormField
              control={form.control}
              name='isActive'
              render={({ field }) => (
                <FormItem className='flex flex-row items-start space-y-0 space-x-3 rounded-md border border-white/20 bg-white/5 p-4'>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className='space-y-1 leading-none'>
                    <FormLabel className='cursor-pointer text-white'>
                      Active Setting
                    </FormLabel>
                    <FormDescription className='text-white/60'>
                      Enable this setting to make it available for use.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <div className='flex justify-end gap-3 pt-4'>
              <Button
                type='button'
                variant='ghost'
                onClick={() => setOpen(false)}
                disabled={isLoading}
                className='text-white/70 hover:bg-white/10 hover:text-white'
              >
                Cancel
              </Button>
              <Button
                type='submit'
                variant='nebula'
                disabled={isLoading}
                className='min-w-[120px]'
              >
                {isLoading ? (
                  <>
                    <LoadingSpinner className='mr-2 h-4 w-4' />
                    Updating...
                  </>
                ) : (
                  'Update Setting'
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
