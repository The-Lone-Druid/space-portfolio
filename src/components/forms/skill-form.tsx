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
import { Award, Code, Settings } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { LoadingSpinnerInline } from '../ui/loading-spinner'

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
  'Mobile',
  'Desktop',
  'Database',
  'DevOps',
  'Design',
  'Testing',
  'Tools',
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
  // Convert percentage to 1-5 scale for UI
  const percentageToScale = (percentage: number): number => {
    if (percentage === 0) return 1
    return Math.ceil(percentage / 20) // 0-20=1, 21-40=2, 41-60=3, 61-80=4, 81-100=5
  }

  // Convert 1-5 scale to percentage for storage
  const scaleToPercentage = (scale: number): number => {
    const percentageMap: Record<number, number> = {
      1: 20, // Beginner: 20%
      2: 40, // Novice: 40%
      3: 60, // Intermediate: 60%
      4: 80, // Advanced: 80%
      5: 100, // Expert: 100%
    }
    return percentageMap[scale] || 60
  }

  const form = useForm({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      name: initialData?.name || '',
      category: initialData?.category || '',
      level: initialData?.level || 60, // Default to 60% (Intermediate)
      order: initialData?.order || 0,
      isActive: initialData?.isActive ?? true,
    } as SkillFormData,
  })

  // Convert stored percentage to UI scale for display
  const uiLevel = percentageToScale(form.watch('level'))

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
                          uiLevel as keyof typeof proficiencyLabels
                        ]
                      }{' '}
                      ({field.value}%)
                    </FormLabel>
                    <FormControl>
                      <div className='px-3'>
                        <Slider
                          min={1}
                          max={5}
                          step={1}
                          value={[uiLevel]}
                          onValueChange={vals => {
                            const newPercentage = scaleToPercentage(vals[0])
                            field.onChange(newPercentage)
                          }}
                          className='w-full'
                        />
                      </div>
                    </FormControl>
                    <div className='flex justify-between text-xs text-gray-400'>
                      <span>Beginner (20%)</span>
                      <span>Novice (40%)</span>
                      <span>Intermediate (60%)</span>
                      <span>Advanced (80%)</span>
                      <span>Expert (100%)</span>
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
              <Button type='button' variant='link' onClick={onCancel}>
                Cancel
              </Button>
            )}
            <Button type='submit' disabled={isSubmitting} variant='cosmic'>
              {isSubmitting ? (
                <>
                  <LoadingSpinnerInline />
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
