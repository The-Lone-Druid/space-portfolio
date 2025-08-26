import { editorApiRoute } from '@/lib/auth-utils'
import { getPersonalInfoServer } from '@/services/personal-info-service'
import { getHeroStats } from '@/services/portfolio-service'
import {
  getFeaturedProjectsServer,
  getProjectsStats,
} from '@/services/projects-service'
import { getServicesStats } from '@/services/services-service'
import { getSkillsStats } from '@/services/skills-service'
import type { ApiResponse, DashboardStats } from '@/types'
import { NextResponse } from 'next/server'

export const GET = editorApiRoute(
  async (): Promise<NextResponse<ApiResponse<DashboardStats>>> => {
    try {
      // Fetch all data concurrently
      // Fetch all data concurrently
      const [
        heroStats,
        personalInfo,
        projectsStats,
        featuredProjects,
        skillsStats,
        servicesStats,
      ] = await Promise.all([
        getHeroStats(),
        getPersonalInfoServer(),
        getProjectsStats(),
        getFeaturedProjectsServer(),
        getSkillsStats(),
        getServicesStats(),
      ])

      // Calculate portfolio completion
      const completionFactors = [
        personalInfo !== null, // Has personal info
        heroStats !== null, // Has hero stats
        projectsStats.totalProjects > 0, // Has projects
        skillsStats.totalSkills > 0, // Has skills
        servicesStats.totalServices > 0, // Has services
        personalInfo?.resumeUrl !== null && personalInfo?.resumeUrl !== '', // Has resume
      ]

      const portfolioCompletion = Math.round(
        (completionFactors.filter(Boolean).length / completionFactors.length) *
          100
      )

      // Calculate total portfolio items
      const totalItems =
        projectsStats.totalProjects +
        skillsStats.totalSkills +
        servicesStats.totalServices

      // Get the most recent update across all entities
      const updateDates = [
        projectsStats.lastUpdated,
        skillsStats.lastUpdated,
        servicesStats.lastUpdated,
        personalInfo?.updatedAt,
        heroStats?.updatedAt,
      ].filter(Boolean) as Date[]

      const lastUpdated =
        updateDates.length > 0
          ? new Date(Math.max(...updateDates.map(d => d.getTime())))
          : null

      // Get recent projects (limit to 5)
      const recentProjects = featuredProjects.slice(0, 5).map(project => ({
        id: project.id,
        projectName: project.projectName,
        startDate: project.startDate,
        endDate: project.endDate,
        isOngoing: project.isOngoing,
        featured: project.featured,
      }))

      // Calculate portfolio strength
      let portfolioStrength: 'weak' | 'moderate' | 'strong' | 'excellent' =
        'weak'
      if (portfolioCompletion >= 90) portfolioStrength = 'excellent'
      else if (portfolioCompletion >= 70) portfolioStrength = 'strong'
      else if (portfolioCompletion >= 50) portfolioStrength = 'moderate'

      // Generate recommendations
      const recommendations: string[] = []
      if (projectsStats.totalProjects === 0) {
        recommendations.push('Add your first project to showcase your work')
      } else if (projectsStats.featuredProjects === 0) {
        recommendations.push(
          'Mark some projects as featured to highlight your best work'
        )
      }

      if (skillsStats.totalSkills < 5) {
        recommendations.push('Add more skills to demonstrate your expertise')
      }

      if (!personalInfo?.resumeUrl) {
        recommendations.push('Upload your resume to complete your profile')
      }

      if (skillsStats.avgProficiency < 70) {
        recommendations.push(
          'Update skill proficiency levels to better represent your abilities'
        )
      }

      if (recommendations.length === 0) {
        recommendations.push(
          'Your portfolio looks great! Consider adding more recent projects.'
        )
      }

      // Completion areas analysis
      const completionAreas = [
        {
          area: 'Personal Information',
          status: (personalInfo ? 'complete' : 'incomplete') as
            | 'complete'
            | 'incomplete'
            | 'needs-update',
          priority: 'high' as const,
        },
        {
          area: 'Resume Upload',
          status: (personalInfo?.resumeUrl ? 'complete' : 'incomplete') as
            | 'complete'
            | 'incomplete'
            | 'needs-update',
          priority: 'high' as const,
        },
        {
          area: 'Projects Portfolio',
          status: (projectsStats.totalProjects > 0
            ? 'complete'
            : 'incomplete') as 'complete' | 'incomplete' | 'needs-update',
          priority: 'high' as const,
        },
        {
          area: 'Skills & Expertise',
          status: (skillsStats.totalSkills > 0 ? 'complete' : 'incomplete') as
            | 'complete'
            | 'incomplete'
            | 'needs-update',
          priority: 'medium' as const,
        },
        {
          area: 'Services Offered',
          status: (servicesStats.totalServices > 0
            ? 'complete'
            : 'incomplete') as 'complete' | 'incomplete' | 'needs-update',
          priority: 'medium' as const,
        },
        {
          area: 'Featured Projects',
          status: (projectsStats.featuredProjects > 0
            ? 'complete'
            : 'needs-update') as 'complete' | 'incomplete' | 'needs-update',
          priority: 'low' as const,
        },
      ]

      const dashboardData: DashboardStats = {
        overview: {
          portfolioCompletion,
          totalItems,
          lastUpdated,
        },
        heroStats: {
          verifiedSkills: heroStats?.verifiedSkills || 0,
          professionalProjects: heroStats?.professionalProjects || 0,
          personalProjects: heroStats?.personalProjects || 0,
          yearsOfExperience: heroStats?.yearsOfExperience || 0,
        },
        projects: {
          total: projectsStats.totalProjects,
          featured: projectsStats.featuredProjects,
          recent: recentProjects,
        },
        skills: {
          total: skillsStats.totalSkills,
          categories: skillsStats.totalCategories,
          avgProficiency: skillsStats.avgProficiency,
          expertLevel: skillsStats.expertSkills,
          topSkills: skillsStats.topSkills.map(skill => ({
            id: skill.id,
            name: skill.name,
            level: skill.level,
            category: skill.category || 'General',
          })),
        },
        services: {
          total: servicesStats.totalServices,
          recent: servicesStats.recentServices.map(service => ({
            id: service.id,
            name: service.name,
            desc: service.desc,
          })),
        },
        personalInfo: {
          isComplete: personalInfo !== null,
          hasResume:
            personalInfo?.resumeUrl !== null && personalInfo?.resumeUrl !== '',
          socialLinksCount: personalInfo?.socialLinks?.length || 0,
        },
        quickInsights: {
          portfolioStrength,
          recommendations,
          completionAreas,
        },
      }

      return NextResponse.json({
        success: true,
        data: dashboardData,
      })
    } catch (error) {
      console.error('Dashboard API error:', error)

      // Handle auth errors specifically
      if (
        error instanceof Error &&
        (error.name === 'AuthError' ||
          error.message === 'Authentication required' ||
          error.message === 'Editor access required')
      ) {
        return NextResponse.json(
          { success: false, error: error.message },
          { status: error.name === 'AuthError' ? 401 : 403 }
        )
      }

      return NextResponse.json(
        {
          success: false,
          error: 'Failed to fetch dashboard data',
        },
        { status: 500 }
      )
    }
  }
)
