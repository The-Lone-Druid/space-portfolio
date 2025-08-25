import { getPersonalInfoServer } from '@/services/personal-info-server'
import { getHeroStats } from '@/services/portfolio-data'
import {
  getFeaturedProjectsServer,
  getProjectsStats,
} from '@/services/projects-server'
import { getServicesStats } from '@/services/services-server'
import { getSkillsStats } from '@/services/skills-server'

export interface DashboardStats {
  overview: {
    portfolioCompletion: number
    totalItems: number
    lastUpdated: Date | null
  }
  heroStats: {
    verifiedSkills: number
    professionalProjects: number
    personalProjects: number
    yearsOfExperience: number
  }
  projects: {
    total: number
    featured: number
    recent: Array<{
      id: number
      projectName: string
      startDate: Date
      endDate: Date | null
      isOngoing: boolean
      featured: boolean
    }>
  }
  skills: {
    total: number
    categories: number
    avgProficiency: number
    expertLevel: number
    topSkills: Array<{
      id: number
      name: string
      level: number
      category: string
    }>
  }
  services: {
    total: number
    recent: Array<{
      id: number
      name: string
      desc: string
    }>
  }
  personalInfo: {
    isComplete: boolean
    hasResume: boolean
    socialLinksCount: number
  }
  quickInsights: {
    portfolioStrength: 'weak' | 'moderate' | 'strong' | 'excellent'
    recommendations: string[]
    completionAreas: Array<{
      area: string
      status: 'complete' | 'incomplete' | 'needs-update'
      priority: 'high' | 'medium' | 'low'
    }>
  }
}

/**
 * Server-side function to fetch comprehensive dashboard data
 * This aggregates data from multiple services to provide a complete dashboard overview
 */
export async function getDashboardDataServer(): Promise<DashboardStats> {
  try {
    // Fetch all data in parallel for better performance
    const [
      personalInfo,
      heroStats,
      projectsStats,
      skillsStats,
      servicesStats,
      featuredProjects,
    ] = await Promise.all([
      getPersonalInfoServer(),
      getHeroStats(),
      getProjectsStats(),
      getSkillsStats(),
      getServicesStats(),
      getFeaturedProjectsServer(),
    ])

    // Calculate completion percentages
    const personalCompletion = personalInfo
      ? (Object.values(personalInfo).filter(Boolean).length / 7) * 100
      : 0

    const heroCompletion = heroStats
      ? (Object.values(heroStats).filter(value => value !== null && value !== 0)
          .length /
          4) *
        100
      : 0

    const projectsCompletion = projectsStats.totalProjects > 0 ? 100 : 0
    const skillsCompletion = skillsStats.totalSkills > 0 ? 100 : 0
    const servicesCompletion = servicesStats.totalServices > 0 ? 100 : 0

    // Overall portfolio completion
    const portfolioCompletion = Math.round(
      (personalCompletion +
        heroCompletion +
        projectsCompletion +
        skillsCompletion +
        servicesCompletion) /
        5
    )

    // Calculate total items across portfolio
    const totalItems =
      projectsStats.totalProjects +
      skillsStats.totalSkills +
      servicesStats.totalServices +
      1 +
      1 // +1 for personal info, +1 for hero

    // Find most recent update
    const lastUpdated = new Date() // In a real app, this would be calculated from actual data timestamps

    // Generate insights and recommendations
    const recommendations = []

    if (personalCompletion < 100) {
      recommendations.push(
        'Complete your personal information to make a stronger first impression'
      )
    }

    if (projectsStats.totalProjects === 0) {
      recommendations.push('Add your first project to showcase your work')
    }

    if (skillsStats.totalSkills < 5) {
      recommendations.push('Add more skills to highlight your expertise')
    }

    if (
      projectsStats.featuredProjects === 0 &&
      projectsStats.totalProjects > 0
    ) {
      recommendations.push('Feature your best projects to highlight them')
    }

    // Determine portfolio strength
    let portfolioStrength: 'weak' | 'moderate' | 'strong' | 'excellent'
    if (portfolioCompletion >= 90) {
      portfolioStrength = 'excellent'
    } else if (portfolioCompletion >= 70) {
      portfolioStrength = 'strong'
    } else if (portfolioCompletion >= 50) {
      portfolioStrength = 'moderate'
    } else {
      portfolioStrength = 'weak'
    }

    // Generate completion areas
    const completionAreas = [
      {
        area: 'Personal Information',
        status:
          personalCompletion >= 100
            ? ('complete' as const)
            : ('incomplete' as const),
        priority: 'high' as const,
      },
      {
        area: 'Hero Statistics',
        status:
          heroCompletion >= 100
            ? ('complete' as const)
            : ('incomplete' as const),
        priority: 'medium' as const,
      },
      {
        area: 'Projects',
        status:
          projectsCompletion >= 100
            ? ('complete' as const)
            : ('incomplete' as const),
        priority: 'high' as const,
      },
      {
        area: 'Skills',
        status:
          skillsCompletion >= 100
            ? ('complete' as const)
            : ('incomplete' as const),
        priority: 'medium' as const,
      },
      {
        area: 'Services',
        status:
          servicesCompletion >= 100
            ? ('complete' as const)
            : ('incomplete' as const),
        priority: 'low' as const,
      },
    ]

    return {
      overview: {
        portfolioCompletion,
        totalItems,
        lastUpdated,
      },
      heroStats: {
        verifiedSkills: skillsStats.totalSkills,
        professionalProjects: projectsStats.totalProjects,
        personalProjects: 0, // This could be calculated based on project categories
        yearsOfExperience: heroStats?.yearsOfExperience || 0,
      },
      projects: {
        total: projectsStats.totalProjects,
        featured: projectsStats.featuredProjects,
        recent: featuredProjects.slice(0, 3).map(project => ({
          id: project.id,
          projectName: project.projectName,
          startDate: project.startDate,
          endDate: project.endDate,
          isOngoing: project.isOngoing,
          featured: project.featured,
        })),
      },
      skills: {
        total: skillsStats.totalSkills,
        categories: skillsStats.totalCategories,
        avgProficiency: skillsStats.avgProficiency,
        expertLevel: skillsStats.expertSkills,
        topSkills: skillsStats.topSkills,
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
        isComplete: personalCompletion >= 100,
        hasResume:
          personalInfo?.resumeUrl !== null && personalInfo?.resumeUrl !== '',
        socialLinksCount: 0, // This would need to be calculated from actual data
      },
      quickInsights: {
        portfolioStrength,
        recommendations,
        completionAreas,
      },
    }
  } catch (error) {
    console.error('Error fetching dashboard data:', error)
    throw new Error('Failed to fetch dashboard data')
  }
}
