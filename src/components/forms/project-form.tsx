'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  projectSchema,
  type ProjectFormData,
  type ProjectWithRelationsFormData,
} from '@/lib/validations'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Calendar,
  ExternalLink,
  Github,
  GripVertical,
  Plus,
  Save,
  Star,
  StarOff,
  Trash2,
  X,
} from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

interface Project {
  id: number
  projectName: string
  projectDate: string
  projectDescription: string
  projectLink?: string
  githubLink?: string
  featured: boolean
  order: number
  isActive: boolean
  createdAt: string
  updatedAt: string
  projectTasks: Array<{
    id: number
    task: string
    order: number
  }>
  skillsUtilized: Array<{
    id: number
    name: string
    order: number
  }>
}

interface ProjectFormProps {
  project?: Project
  onSubmit: (data: ProjectWithRelationsFormData) => Promise<void>
  onCancel?: () => void
  isLoading?: boolean
}

export function ProjectForm({
  project,
  onSubmit,
  onCancel,
  isLoading = false,
}: ProjectFormProps) {
  const [localTasks, setLocalTasks] = useState<
    Array<{ task: string; order: number }>
  >(project?.projectTasks.map(t => ({ task: t.task, order: t.order })) || [])
  const [localSkills, setLocalSkills] = useState<
    Array<{ name: string; order: number }>
  >(project?.skillsUtilized.map(s => ({ name: s.name, order: s.order })) || [])
  const [newTask, setNewTask] = useState('')
  const [newSkill, setNewSkill] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: project
      ? {
          projectName: project.projectName,
          projectDate: project.projectDate,
          projectDescription: project.projectDescription,
          projectLink: project.projectLink || '',
          githubLink: project.githubLink || '',
          featured: project.featured,
          order: project.order,
        }
      : {
          projectName: '',
          projectDate: new Date().toISOString().split('T')[0],
          projectDescription: '',
          projectLink: '',
          githubLink: '',
          featured: false,
          order: 0,
        },
  })

  const featured = watch('featured')

  const addTask = () => {
    if (newTask.trim()) {
      const newOrder =
        localTasks.length > 0
          ? Math.max(...localTasks.map(t => t.order)) + 1
          : 1
      setLocalTasks([...localTasks, { task: newTask.trim(), order: newOrder }])
      setNewTask('')
    }
  }

  const removeTask = (index: number) => {
    setLocalTasks(localTasks.filter((_, i) => i !== index))
  }

  const addSkill = () => {
    if (newSkill.trim()) {
      const newOrder =
        localSkills.length > 0
          ? Math.max(...localSkills.map(s => s.order)) + 1
          : 1
      setLocalSkills([
        ...localSkills,
        { name: newSkill.trim(), order: newOrder },
      ])
      setNewSkill('')
    }
  }

  const removeSkill = (index: number) => {
    setLocalSkills(localSkills.filter((_, i) => i !== index))
  }

  const handleFormSubmit = async (data: ProjectFormData) => {
    const formDataWithRelations: ProjectWithRelationsFormData = {
      ...data,
      tasks: localTasks,
      skills: localSkills,
    }
    await onSubmit(formDataWithRelations)
  }

  return (
    <Card className='glass-cosmic space-y-6 p-6'>
      <div className='flex items-center justify-between'>
        <h3 className='text-xl font-semibold text-white'>
          {project ? 'Edit Project' : 'Create New Project'}
        </h3>
        {onCancel && (
          <Button
            type='button'
            variant='outline'
            size='sm'
            onClick={onCancel}
            className='border-gray-600 text-gray-300 hover:bg-gray-800'
          >
            <X className='h-4 w-4' />
          </Button>
        )}
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className='space-y-6'>
        {/* Basic Information */}
        <div className='space-y-4'>
          <h4 className='border-b border-gray-700 pb-2 text-lg font-medium text-white'>
            Basic Information
          </h4>

          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <div className='space-y-2'>
              <Label htmlFor='projectName' className='text-gray-300'>
                Project Name *
              </Label>
              <Input
                id='projectName'
                {...register('projectName')}
                placeholder='Enter project name'
                className='border-gray-600 bg-gray-900/50 text-white placeholder-gray-400'
              />
              {errors.projectName && (
                <p className='text-sm text-red-400'>
                  {errors.projectName.message}
                </p>
              )}
            </div>

            <div className='space-y-2'>
              <Label htmlFor='projectDate' className='text-gray-300'>
                <Calendar className='mr-1 inline h-4 w-4' />
                Project Date *
              </Label>
              <Input
                id='projectDate'
                type='date'
                {...register('projectDate')}
                className='border-gray-600 bg-gray-900/50 text-white'
              />
              {errors.projectDate && (
                <p className='text-sm text-red-400'>
                  {errors.projectDate.message}
                </p>
              )}
            </div>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='projectDescription' className='text-gray-300'>
              Description *
            </Label>
            <Textarea
              id='projectDescription'
              {...register('projectDescription')}
              placeholder='Describe your project...'
              rows={4}
              className='border-gray-600 bg-gray-900/50 text-white placeholder-gray-400'
            />
            {errors.projectDescription && (
              <p className='text-sm text-red-400'>
                {errors.projectDescription.message}
              </p>
            )}
          </div>

          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <div className='space-y-2'>
              <Label htmlFor='projectLink' className='text-gray-300'>
                <ExternalLink className='mr-1 inline h-4 w-4' />
                Live Demo URL
              </Label>
              <Input
                id='projectLink'
                type='url'
                {...register('projectLink')}
                placeholder='https://your-project.com'
                className='border-gray-600 bg-gray-900/50 text-white placeholder-gray-400'
              />
              {errors.projectLink && (
                <p className='text-sm text-red-400'>
                  {errors.projectLink.message}
                </p>
              )}
            </div>

            <div className='space-y-2'>
              <Label htmlFor='githubLink' className='text-gray-300'>
                <Github className='mr-1 inline h-4 w-4' />
                GitHub Repository
              </Label>
              <Input
                id='githubLink'
                type='url'
                {...register('githubLink')}
                placeholder='https://github.com/username/repo'
                className='border-gray-600 bg-gray-900/50 text-white placeholder-gray-400'
              />
              {errors.githubLink && (
                <p className='text-sm text-red-400'>
                  {errors.githubLink.message}
                </p>
              )}
            </div>
          </div>

          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <div className='space-y-2'>
              <Label htmlFor='order' className='text-gray-300'>
                Display Order
              </Label>
              <Input
                id='order'
                type='number'
                {...register('order', { valueAsNumber: true })}
                placeholder='0'
                className='border-gray-600 bg-gray-900/50 text-white'
              />
              {errors.order && (
                <p className='text-sm text-red-400'>{errors.order.message}</p>
              )}
            </div>

            <div className='space-y-2'>
              <Label className='text-gray-300'>Featured Project</Label>
              <div className='flex items-center space-x-2'>
                <Button
                  type='button'
                  variant='outline'
                  size='sm'
                  onClick={() => setValue('featured', !featured)}
                  className={`${
                    featured
                      ? 'border-yellow-500 bg-yellow-500/20 text-yellow-300'
                      : 'border-gray-600 text-gray-300'
                  } hover:bg-yellow-500/30`}
                >
                  {featured ? (
                    <Star className='mr-1 h-4 w-4' />
                  ) : (
                    <StarOff className='mr-1 h-4 w-4' />
                  )}
                  {featured ? 'Featured' : 'Not Featured'}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Project Tasks */}
        <div className='space-y-4'>
          <h4 className='border-b border-gray-700 pb-2 text-lg font-medium text-white'>
            Project Tasks
          </h4>

          <div className='flex gap-2'>
            <Input
              value={newTask}
              onChange={e => setNewTask(e.target.value)}
              placeholder='Add a project task...'
              className='border-gray-600 bg-gray-900/50 text-white placeholder-gray-400'
              onKeyPress={e =>
                e.key === 'Enter' && (e.preventDefault(), addTask())
              }
            />
            <Button
              type='button'
              onClick={addTask}
              size='sm'
              className='bg-blue-600 hover:bg-blue-700'
            >
              <Plus className='h-4 w-4' />
            </Button>
          </div>

          {localTasks.length > 0 && (
            <div className='space-y-2'>
              {localTasks.map((task, index) => (
                <div
                  key={index}
                  className='flex items-center gap-2 rounded border border-gray-700 bg-gray-900/30 p-2'
                >
                  <GripVertical className='h-4 w-4 text-gray-500' />
                  <span className='flex-1 text-gray-300'>{task.task}</span>
                  <Button
                    type='button'
                    variant='outline'
                    size='sm'
                    onClick={() => removeTask(index)}
                    className='border-red-600 text-red-400 hover:bg-red-600/20'
                  >
                    <Trash2 className='h-4 w-4' />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Skills Utilized */}
        <div className='space-y-4'>
          <h4 className='border-b border-gray-700 pb-2 text-lg font-medium text-white'>
            Skills Utilized
          </h4>

          <div className='flex gap-2'>
            <Input
              value={newSkill}
              onChange={e => setNewSkill(e.target.value)}
              placeholder='Add a skill...'
              className='border-gray-600 bg-gray-900/50 text-white placeholder-gray-400'
              onKeyPress={e =>
                e.key === 'Enter' && (e.preventDefault(), addSkill())
              }
            />
            <Button
              type='button'
              onClick={addSkill}
              size='sm'
              className='bg-green-600 hover:bg-green-700'
            >
              <Plus className='h-4 w-4' />
            </Button>
          </div>

          {localSkills.length > 0 && (
            <div className='flex flex-wrap gap-2'>
              {localSkills.map((skill, index) => (
                <Badge
                  key={index}
                  variant='secondary'
                  className='border border-gray-600 bg-gray-800 px-3 py-1 text-gray-300'
                >
                  {skill.name}
                  <Button
                    type='button'
                    variant='ghost'
                    size='sm'
                    onClick={() => removeSkill(index)}
                    className='ml-2 h-auto p-0 text-red-400 hover:text-red-300'
                  >
                    <X className='h-3 w-3' />
                  </Button>
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Form Actions */}
        <div className='flex justify-end gap-2 border-t border-gray-700 pt-4'>
          {onCancel && (
            <Button
              type='button'
              variant='outline'
              onClick={onCancel}
              disabled={isLoading}
              className='border-gray-600 text-gray-300 hover:bg-gray-800'
            >
              Cancel
            </Button>
          )}
          <Button
            type='submit'
            disabled={isLoading}
            className='bg-blue-600 hover:bg-blue-700'
          >
            {isLoading ? (
              <>
                <div className='mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent' />
                Saving...
              </>
            ) : (
              <>
                <Save className='mr-2 h-4 w-4' />
                {project ? 'Update Project' : 'Create Project'}
              </>
            )}
          </Button>
        </div>
      </form>
    </Card>
  )
}
