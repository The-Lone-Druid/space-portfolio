import type { ProjectFormData } from '@/lib/validations'
import type { ApiResponse, ProjectWithDetails } from '@/types'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useCacheInvalidation } from './use-cache-invalidation'

export function useProjects() {
  const [projects, setProjects] = useState<ProjectWithDetails[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { invalidateProjects } = useCacheInvalidation()

  const fetchProjects = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch('/api/projects')
      const data: ApiResponse<ProjectWithDetails[]> = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to fetch projects')
      }

      setProjects(data.data || [])
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Unknown error occurred'
      setError(errorMessage)
      console.error('Error fetching projects:', err)
      toast.error('Failed to load projects')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const createProject = useCallback(
    async (projectData: ProjectFormData) => {
      try {
        const response = await fetch('/api/projects', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(projectData),
        })

        const data: ApiResponse<ProjectWithDetails> = await response.json()

        if (!response.ok || !data.success) {
          throw new Error(data.error || 'Failed to create project')
        }

        // Add the new project to the list
        if (data.data) {
          setProjects(prev => [data.data!, ...prev])
          toast.success(data.message || 'Project created successfully')

          // Invalidate cache to ensure fresh data on next page load
          await invalidateProjects()
        }

        return data.data
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to create project'
        console.error('Error creating project:', err)
        toast.error(errorMessage)
        throw err
      }
    },
    [invalidateProjects]
  )

  const updateProject = useCallback(
    async (id: number, projectData: Partial<ProjectFormData>) => {
      try {
        const response = await fetch(`/api/projects/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(projectData),
        })

        const data: ApiResponse<ProjectWithDetails> = await response.json()

        if (!response.ok || !data.success) {
          throw new Error(data.error || 'Failed to update project')
        }

        // Update the project in the list
        if (data.data) {
          setProjects(prev =>
            prev.map(project => (project.id === id ? data.data! : project))
          )
          toast.success(data.message || 'Project updated successfully')

          // Invalidate cache to ensure fresh data on next page load
          await invalidateProjects()
        }

        return data.data
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to update project'
        console.error('Error updating project:', err)
        toast.error(errorMessage)
        throw err
      }
    },
    [invalidateProjects]
  )

  const deleteProject = useCallback(
    async (id: number) => {
      try {
        const response = await fetch(`/api/projects/${id}`, {
          method: 'DELETE',
        })

        const data: ApiResponse<null> = await response.json()

        if (!response.ok || !data.success) {
          throw new Error(data.error || 'Failed to delete project')
        }

        // Remove the project from the list
        setProjects(prev => prev.filter(project => project.id !== id))
        toast.success(data.message || 'Project deleted successfully')

        // Invalidate cache to ensure fresh data on next page load
        await invalidateProjects()
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to delete project'
        console.error('Error deleting project:', err)
        toast.error(errorMessage)
        throw err
      }
    },
    [invalidateProjects]
  )

  const toggleProjectStatus = useCallback(
    async (id: number, isActive: boolean) => {
      try {
        await updateProject(id, { isActive })
      } catch (err) {
        // Error is already handled by updateProject
        throw err
      }
    },
    [updateProject]
  )

  const toggleFeaturedStatus = useCallback(
    async (id: number, featured: boolean) => {
      try {
        await updateProject(id, { featured })
      } catch (err) {
        // Error is already handled by updateProject
        throw err
      }
    },
    [updateProject]
  )

  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  return {
    projects,
    isLoading,
    error,
    fetchProjects,
    createProject,
    updateProject,
    deleteProject,
    toggleProjectStatus,
    toggleFeaturedStatus,
  }
}

export function useProject(id: number) {
  const [project, setProject] = useState<ProjectWithDetails | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProject = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch(`/api/projects/${id}`)
      const data: ApiResponse<ProjectWithDetails> = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to fetch project')
      }

      setProject(data.data || null)
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Unknown error occurred'
      setError(errorMessage)
      console.error('Error fetching project:', err)
      toast.error('Failed to load project')
    } finally {
      setIsLoading(false)
    }
  }, [id])

  useEffect(() => {
    if (id) {
      fetchProject()
    }
  }, [id, fetchProject])

  return {
    project,
    isLoading,
    error,
    refetch: fetchProject,
  }
}
