'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { projectSchema, type ProjectFormData } from '@/lib/validations'
import type { ProjectWithDetails } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Calendar,
  FileText,
  Github,
  Lightbulb,
  Link,
  Loader2,
  Plus,
  Save,
  Star,
  Trash2,
} from 'lucide-react'
import { useFieldArray, useForm } from 'react-hook-form'

interface ProjectFormProps {
  initialData?: ProjectWithDetails
  onSubmit: (data: ProjectFormData) => Promise<void>
  onCancel?: () => void
  isSubmitting?: boolean
  submitLabel?: string
}

export function ProjectForm({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting = false,
  submitLabel = 'Save Project',
}: ProjectFormProps) {
  const form = useForm({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      projectName: initialData?.projectName || '',
      projectDate: initialData?.projectDate || '',
      projectDescription: initialData?.projectDescription || '',
      projectLink: initialData?.projectLink || '',
      githubLink: initialData?.githubLink || '',
      featured: initialData?.featured || false,
      order: initialData?.order || 0,
      isActive: initialData?.isActive ?? true,
      projectTasks: initialData?.projectTasks || [{ task: '', order: 0 }],
      skillsUtilized: initialData?.skillsUtilized?.map(skill => ({
        name: skill.name,
        order: skill.order,
      })) || [{ name: '', order: 0 }],
    },
  })

  const {
    fields: taskFields,
    append: appendTask,
    remove: removeTask,
  } = useFieldArray({
    control: form.control,
    name: 'projectTasks',
  })

  const {
    fields: skillFields,
    append: appendSkill,
    remove: removeSkill,
  } = useFieldArray({
    control: form.control,
    name: 'skillsUtilized',
  })

  const handleSubmit = async (data: ProjectFormData) => {
    try {
      // Filter out empty tasks and skills
      const cleanedData: ProjectFormData = {
        ...data,
        projectTasks:
          data.projectTasks?.filter(task => task.task.trim() !== '') || [],
        skillsUtilized:
          data.skillsUtilized?.filter(skill => skill.name.trim() !== '') || [],
      }

      await onSubmit(cleanedData)
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
                <FileText className='h-5 w-5 text-purple-400' />
                Project Information
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                <FormField
                  control={form.control}
                  name='projectName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-gray-200'>
                        Project Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Enter project name'
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
                  name='projectDate'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='flex items-center gap-2 text-gray-200'>
                        <Calendar className='h-4 w-4' />
                        Project Date
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder='e.g., 2024, Q1 2024, Jan 2024'
                          className='border-gray-700 bg-gray-800/50 text-white placeholder:text-gray-400'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name='projectDescription'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-gray-200'>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Describe the project, its goals, and key features...'
                        className='min-h-[100px] border-gray-700 bg-gray-800/50 text-white placeholder:text-gray-400'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                <FormField
                  control={form.control}
                  name='projectLink'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='flex items-center gap-2 text-gray-200'>
                        <Link className='h-4 w-4' />
                        Project URL (Optional)
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder='https://project-demo.com'
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
                  name='githubLink'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='flex items-center gap-2 text-gray-200'>
                        <Github className='h-4 w-4' />
                        GitHub URL (Optional)
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder='https://github.com/username/repo'
                          className='border-gray-700 bg-gray-800/50 text-white placeholder:text-gray-400'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Project Tasks Card */}
          <Card className='border-gray-800/50 bg-gray-900/40 backdrop-blur-sm'>
            <CardHeader className='pb-4'>
              <CardTitle className='flex items-center gap-2 text-white'>
                <Lightbulb className='h-5 w-5 text-blue-400' />
                Project Tasks
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              {taskFields.map((field, index) => (
                <div key={field.id} className='flex items-start gap-2'>
                  <div className='flex-1'>
                    <FormField
                      control={form.control}
                      name={`projectTasks.${index}.task`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Textarea
                              placeholder={`Task ${index + 1}: Describe what was accomplished...`}
                              className='border-gray-700 bg-gray-800/50 text-white placeholder:text-gray-400'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  {taskFields.length > 1 && (
                    <Button
                      type='button'
                      variant='outline'
                      size='sm'
                      onClick={() => removeTask(index)}
                      className='mt-1 border-red-400/30 text-red-400 hover:bg-red-400/10'
                    >
                      <Trash2 className='h-4 w-4' />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type='button'
                variant='outline'
                onClick={() =>
                  appendTask({ task: '', order: taskFields.length })
                }
                className='w-full border-gray-600 text-gray-300 hover:bg-gray-800/50'
              >
                <Plus className='mr-2 h-4 w-4' />
                Add Task
              </Button>
            </CardContent>
          </Card>

          {/* Skills Used Card */}
          <Card className='border-gray-800/50 bg-gray-900/40 backdrop-blur-sm'>
            <CardHeader className='pb-4'>
              <CardTitle className='flex items-center gap-2 text-white'>
                <Star className='h-5 w-5 text-yellow-400' />
                Skills & Technologies
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                {skillFields.map((field, index) => (
                  <div key={field.id} className='flex items-start gap-2'>
                    <div className='flex-1'>
                      <FormField
                        control={form.control}
                        name={`skillsUtilized.${index}.name`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder={`Skill ${index + 1}: React, Node.js, etc.`}
                                className='border-gray-700 bg-gray-800/50 text-white placeholder:text-gray-400'
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    {skillFields.length > 1 && (
                      <Button
                        type='button'
                        variant='outline'
                        size='sm'
                        onClick={() => removeSkill(index)}
                        className='border-red-400/30 text-red-400 hover:bg-red-400/10'
                      >
                        <Trash2 className='h-4 w-4' />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              <Button
                type='button'
                variant='outline'
                onClick={() =>
                  appendSkill({ name: '', order: skillFields.length })
                }
                className='w-full border-gray-600 text-gray-300 hover:bg-gray-800/50'
              >
                <Plus className='mr-2 h-4 w-4' />
                Add Skill
              </Button>
            </CardContent>
          </Card>

          {/* Settings Card */}
          <Card className='border-gray-800/50 bg-gray-900/40 backdrop-blur-sm'>
            <CardHeader className='pb-4'>
              <CardTitle className='text-white'>Project Settings</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
                <FormField
                  control={form.control}
                  name='featured'
                  render={({ field }) => (
                    <FormItem className='flex flex-row items-center justify-between rounded-lg border border-gray-700 p-4'>
                      <div className='space-y-0.5'>
                        <FormLabel className='text-base text-gray-200'>
                          Featured Project
                        </FormLabel>
                        <FormDescription className='text-sm text-gray-400'>
                          Show this project prominently
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='isActive'
                  render={({ field }) => (
                    <FormItem className='flex flex-row items-center justify-between rounded-lg border border-gray-700 p-4'>
                      <div className='space-y-0.5'>
                        <FormLabel className='text-base text-gray-200'>
                          Active Status
                        </FormLabel>
                        <FormDescription className='text-sm text-gray-400'>
                          Display this project publicly
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='order'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-gray-200'>
                        Display Order
                      </FormLabel>
                      <FormControl>
                        <Input
                          type='number'
                          placeholder='0'
                          className='border-gray-700 bg-gray-800/50 text-white'
                          {...field}
                          onChange={e =>
                            field.onChange(parseInt(e.target.value) || 0)
                          }
                        />
                      </FormControl>
                      <FormDescription className='text-gray-400'>
                        Lower numbers appear first
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Form Actions */}
          <div className='flex justify-end gap-4'>
            {onCancel && (
              <Button
                type='button'
                variant='outline'
                onClick={onCancel}
                className='border-gray-600 text-gray-300 hover:bg-gray-800/50'
              >
                Cancel
              </Button>
            )}
            <Button
              type='submit'
              disabled={isSubmitting}
              className='bg-purple-600 text-white hover:bg-purple-700'
            >
              {isSubmitting ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Saving...
                </>
              ) : (
                <>
                  <Save className='mr-2 h-4 w-4' />
                  {submitLabel}
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
