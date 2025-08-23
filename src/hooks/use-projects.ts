import type {
  ProjectSkillFormData,
  ProjectTaskFormData,
  ProjectWithRelationsFormData,
} from '@/lib/validations'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

interface ProjectTask {
  id: number
  task: string
  order: number
}

interface ProjectSkill {
  id: number
  name: string
  order: number
}

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
  projectTasks: ProjectTask[]
  skillsUtilized: ProjectSkill[]
}

interface UseProjectsReturn {
  // Data
  projects: Project[]

  // Loading states
  isLoading: boolean
  isSaving: boolean

  // Actions
  createProject: (data: ProjectWithRelationsFormData) => Promise<Project>
  updateProject: (
    id: number,
    data: ProjectWithRelationsFormData
  ) => Promise<Project>
  deleteProject: (id: number) => Promise<void>
  toggleFeatured: (id: number) => Promise<void>

  // Tasks
  addTask: (projectId: number, data: ProjectTaskFormData) => Promise<void>
  updateTask: (taskId: number, data: ProjectTaskFormData) => Promise<void>
  deleteTask: (taskId: number) => Promise<void>

  // Skills
  addSkill: (projectId: number, data: ProjectSkillFormData) => Promise<void>
  updateSkill: (skillId: number, data: ProjectSkillFormData) => Promise<void>
  deleteSkill: (skillId: number) => Promise<void>

  // Utility
  refreshProjects: () => Promise<void>
}

export function useProjects(): UseProjectsReturn {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  const fetchProjects = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/admin/projects')

      if (!response.ok) {
        throw new Error('Failed to fetch projects')
      }

      const data = await response.json()
      setProjects(data)
    } catch (error) {
      console.error('Error fetching projects:', error)
      toast.error('Failed to load projects')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const createProject = async (
    data: ProjectWithRelationsFormData
  ): Promise<Project> => {
    try {
      setIsSaving(true)
      const response = await fetch('/api/admin/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to create project')
      }

      const newProject = await response.json()
      setProjects(prev => [...prev, newProject])
      toast.success('Project created successfully!')
      return newProject
    } catch (error) {
      console.error('Error creating project:', error)
      toast.error('Failed to create project')
      throw error
    } finally {
      setIsSaving(false)
    }
  }

  const updateProject = async (
    id: number,
    data: ProjectWithRelationsFormData
  ): Promise<Project> => {
    try {
      setIsSaving(true)
      const response = await fetch(`/api/admin/projects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to update project')
      }

      const updatedProject = await response.json()
      setProjects(prev => prev.map(p => (p.id === id ? updatedProject : p)))
      toast.success('Project updated successfully!')
      return updatedProject
    } catch (error) {
      console.error('Error updating project:', error)
      toast.error('Failed to update project')
      throw error
    } finally {
      setIsSaving(false)
    }
  }

  const deleteProject = async (id: number) => {
    try {
      const response = await fetch(`/api/admin/projects/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete project')
      }

      setProjects(prev => prev.filter(p => p.id !== id))
      toast.success('Project deleted successfully!')
    } catch (error) {
      console.error('Error deleting project:', error)
      toast.error('Failed to delete project')
      throw error
    }
  }

  const toggleFeatured = async (id: number) => {
    try {
      const response = await fetch(`/api/admin/projects/${id}/featured`, {
        method: 'PATCH',
      })

      if (!response.ok) {
        throw new Error('Failed to toggle featured status')
      }

      const updatedProject = await response.json()
      setProjects(prev => prev.map(p => (p.id === id ? updatedProject : p)))
      toast.success(
        `Project ${updatedProject.featured ? 'featured' : 'unfeatured'} successfully!`
      )
    } catch (error) {
      console.error('Error toggling featured status:', error)
      toast.error('Failed to update featured status')
      throw error
    }
  }

  const addTask = async (projectId: number, data: ProjectTaskFormData) => {
    try {
      setIsSaving(true)
      const response = await fetch(`/api/admin/projects/${projectId}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to add task')
      }

      await fetchProjects() // Refresh to get updated project with tasks
      toast.success('Task added successfully!')
    } catch (error) {
      console.error('Error adding task:', error)
      toast.error('Failed to add task')
      throw error
    } finally {
      setIsSaving(false)
    }
  }

  const updateTask = async (taskId: number, data: ProjectTaskFormData) => {
    try {
      setIsSaving(true)
      const response = await fetch(`/api/admin/project-tasks/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to update task')
      }

      await fetchProjects() // Refresh to get updated data
      toast.success('Task updated successfully!')
    } catch (error) {
      console.error('Error updating task:', error)
      toast.error('Failed to update task')
      throw error
    } finally {
      setIsSaving(false)
    }
  }

  const deleteTask = async (taskId: number) => {
    try {
      const response = await fetch(`/api/admin/project-tasks/${taskId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete task')
      }

      await fetchProjects() // Refresh to get updated data
      toast.success('Task deleted successfully!')
    } catch (error) {
      console.error('Error deleting task:', error)
      toast.error('Failed to delete task')
      throw error
    }
  }

  const addSkill = async (projectId: number, data: ProjectSkillFormData) => {
    try {
      setIsSaving(true)
      const response = await fetch(`/api/admin/projects/${projectId}/skills`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to add skill')
      }

      await fetchProjects() // Refresh to get updated project with skills
      toast.success('Skill added successfully!')
    } catch (error) {
      console.error('Error adding skill:', error)
      toast.error('Failed to add skill')
      throw error
    } finally {
      setIsSaving(false)
    }
  }

  const updateSkill = async (skillId: number, data: ProjectSkillFormData) => {
    try {
      setIsSaving(true)
      const response = await fetch(`/api/admin/project-skills/${skillId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to update skill')
      }

      await fetchProjects() // Refresh to get updated data
      toast.success('Skill updated successfully!')
    } catch (error) {
      console.error('Error updating skill:', error)
      toast.error('Failed to update skill')
      throw error
    } finally {
      setIsSaving(false)
    }
  }

  const deleteSkill = async (skillId: number) => {
    try {
      const response = await fetch(`/api/admin/project-skills/${skillId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete skill')
      }

      await fetchProjects() // Refresh to get updated data
      toast.success('Skill deleted successfully!')
    } catch (error) {
      console.error('Error deleting skill:', error)
      toast.error('Failed to delete skill')
      throw error
    }
  }

  return {
    projects,
    isLoading,
    isSaving,
    createProject,
    updateProject,
    deleteProject,
    toggleFeatured,
    addTask,
    updateTask,
    deleteTask,
    addSkill,
    updateSkill,
    deleteSkill,
    refreshProjects: fetchProjects,
  }
}
