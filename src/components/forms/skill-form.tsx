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
import { Slider } from '@/components/ui/slider'
import { skillSchema, type SkillFormData } from '@/lib/validations'
import type { SkillWithDetails } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Award, Code, Loader2, Settings } from 'lucide-react'
import { useForm } from 'react-hook-form'

interface SkillFormProps {
  initialData?: SkillWithDetails
  onSubmit: (data: SkillFormData) => Promise<void>
  onCancel?: () => void
  isSubmitting?: boolean
  submitLabel?: string
}

const skillCategories = [
  'Frontend',
  'Backend',
  'Database',
  'DevOps',
  'Mobile',
  'Design',
  'Testing',
  'Other',
]

const proficiencyLabels = {
  1: 'Beginner',
  2: 'Novice',
  3: 'Intermediate',
  4: 'Advanced',
  5: 'Expert',
}

export function SkillForm({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting = false,
  submitLabel = 'Save Skill',
}: SkillFormProps) {
  const form = useForm({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      name: initialData?.name || '',
      category: initialData?.category || '',
      level: initialData?.level || 3,
      order: initialData?.order || 0,
      isActive: initialData?.isActive ?? true,
    } as SkillFormData,
  })

  const watchedLevel = form.watch('level')

  const handleSubmit = async (data: SkillFormData) => {
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
                <Code className='h-5 w-5 text-blue-400' />
                Skill Information
              </CardTitle>
              <CardDescription className='text-gray-400'>
                Define the basic details of your skill or technology
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-white'>Skill Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='e.g., React, TypeScript, Node.js'
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
                  name='category'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-white'>Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className='border-gray-700 bg-gray-800/50 text-white'>
                            <SelectValue placeholder='Select a category' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className='border-gray-700 bg-gray-800'>
                          {skillCategories.map(category => (
                            <SelectItem
                              key={category}
                              value={category}
                              className='text-white focus:bg-gray-700 focus:text-white'
                            >
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Proficiency Level Card */}
          <Card className='border-gray-800/50 bg-gray-900/40 backdrop-blur-sm'>
            <CardHeader className='pb-4'>
              <CardTitle className='flex items-center gap-2 text-white'>
                <Award className='h-5 w-5 text-yellow-400' />
                Proficiency Level
              </CardTitle>
              <CardDescription className='text-gray-400'>
                Rate your expertise level with this skill
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
              <FormField
                control={form.control}
                name='level'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-white'>
                      Level:{' '}
                      {
                        proficiencyLabels[
                          watchedLevel as keyof typeof proficiencyLabels
                        ]
                      }{' '}
                      ({watchedLevel}/5)
                    </FormLabel>
                    <FormControl>
                      <div className='px-3'>
                        <Slider
                          min={1}
                          max={5}
                          step={1}
                          value={[field.value]}
                          onValueChange={vals => field.onChange(vals[0])}
                          className='w-full'
                        />
                      </div>
                    </FormControl>
                    <div className='flex justify-between text-xs text-gray-400'>
                      <span>Beginner</span>
                      <span>Novice</span>
                      <span>Intermediate</span>
                      <span>Advanced</span>
                      <span>Expert</span>
                    </div>
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
                Configure how this skill appears in your portfolio
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
