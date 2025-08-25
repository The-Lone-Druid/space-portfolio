'use client'

import type { DashboardStats } from '@/app/api/dashboard/route'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle,
  Lightbulb,
  Target,
  TrendingUp,
} from 'lucide-react'
import Link from 'next/link'

interface InsightsRecommendationsProps {
  data: DashboardStats
}

export function InsightsRecommendations({
  data,
}: InsightsRecommendationsProps) {
  const { quickInsights, projects, skills, services } = data

  const insights = [
    {
      title: 'Portfolio Growth',
      value: `${projects.total + skills.total + services.total} items`,
      trend: projects.total > 0 ? 'up' : 'neutral',
      description: 'Total portfolio content',
      color: 'text-green-400',
    },
    {
      title: 'Skill Proficiency',
      value: `${skills.avgProficiency}%`,
      trend: skills.avgProficiency >= 70 ? 'up' : 'down',
      description: 'Average skill level',
      color: skills.avgProficiency >= 70 ? 'text-green-400' : 'text-yellow-400',
    },
    {
      title: 'Featured Content',
      value: `${projects.featured}/${projects.total}`,
      trend: projects.featured > 0 ? 'up' : 'down',
      description: 'Featured projects ratio',
      color: projects.featured > 0 ? 'text-green-400' : 'text-red-400',
    },
  ]

  const getRecommendationIcon = (recommendation: string) => {
    if (recommendation.includes('Add') || recommendation.includes('Upload')) {
      return <AlertTriangle className='h-4 w-4 text-yellow-400' />
    }
    if (recommendation.includes('Mark') || recommendation.includes('Update')) {
      return <Target className='h-4 w-4 text-blue-400' />
    }
    return <CheckCircle className='h-4 w-4 text-green-400' />
  }

  const getRecommendationAction = (recommendation: string) => {
    if (recommendation.includes('project')) return '/dashboard/projects'
    if (recommendation.includes('skill')) return '/dashboard/skills'
    if (recommendation.includes('resume')) return '/dashboard/personal-info'
    return '/dashboard'
  }

  return (
    <Card className='glass-nebula border-space-accent/30'>
      <CardHeader>
        <CardTitle className='flex items-center text-white'>
          <Lightbulb className='text-space-gold mr-2 h-5 w-5' />
          Insights & Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-6'>
        {/* Key Insights */}
        <div className='space-y-3'>
          <h4 className='text-sm font-medium text-white/90'>Key Insights</h4>
          <div className='grid gap-3'>
            {insights.map((insight, index) => (
              <div
                key={index}
                className='flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-3'
              >
                <div className='flex-1'>
                  <div className='flex items-center gap-2'>
                    <span className='text-sm font-medium text-white'>
                      {insight.title}
                    </span>
                    <TrendingUp
                      className={`h-3 w-3 ${
                        insight.trend === 'up'
                          ? 'text-green-400'
                          : insight.trend === 'down'
                            ? 'text-red-400'
                            : 'text-gray-400'
                      }`}
                    />
                  </div>
                  <p className='text-xs text-white/60'>{insight.description}</p>
                </div>
                <div className='text-right'>
                  <div className={`text-sm font-semibold ${insight.color}`}>
                    {insight.value}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className='space-y-3'>
          <h4 className='text-sm font-medium text-white/90'>Recommendations</h4>
          <div className='space-y-2'>
            {quickInsights.recommendations
              .slice(0, 3)
              .map((recommendation, index) => (
                <div
                  key={index}
                  className='flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-3'
                >
                  <div className='flex items-start gap-3'>
                    {getRecommendationIcon(recommendation)}
                    <div className='flex-1'>
                      <p className='text-sm text-white/90'>{recommendation}</p>
                    </div>
                  </div>
                  <Button variant='ghost' size='sm' asChild>
                    <Link href={getRecommendationAction(recommendation)}>
                      <ArrowRight className='h-3 w-3' />
                    </Link>
                  </Button>
                </div>
              ))}
          </div>
        </div>

        {/* Portfolio Strength */}
        <div className='rounded-lg border border-purple-500/30 bg-purple-500/10 p-4'>
          <div className='flex items-center justify-between'>
            <div>
              <h4 className='text-sm font-medium text-purple-200'>
                Portfolio Strength
              </h4>
              <p className='mt-1 text-xs text-purple-200/80'>
                Based on completeness and quality metrics
              </p>
            </div>
            <Badge
              variant='outline'
              className={`${
                quickInsights.portfolioStrength === 'excellent'
                  ? 'border-green-500/30 text-green-400'
                  : quickInsights.portfolioStrength === 'strong'
                    ? 'border-blue-500/30 text-blue-400'
                    : quickInsights.portfolioStrength === 'moderate'
                      ? 'border-yellow-500/30 text-yellow-400'
                      : 'border-red-500/30 text-red-400'
              }`}
            >
              {quickInsights.portfolioStrength.charAt(0).toUpperCase() +
                quickInsights.portfolioStrength.slice(1)}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
