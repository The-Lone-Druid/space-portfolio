'use client'

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
import { DashboardStats } from '../../types'

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
    <Card className='glass-cosmic hover:border-space-accent/30 border-white/10 transition-colors'>
      <CardHeader className='pb-4'>
        <CardTitle className='flex items-center text-xl text-white'>
          <div className='mr-3 rounded-full bg-yellow-500/20 p-2'>
            <Lightbulb className='h-5 w-5 text-yellow-400' />
          </div>
          Insights & Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-6'>
        {/* Key Insights */}
        <div className='space-y-4'>
          <h4 className='text-sm font-semibold text-white/90'>Key Insights</h4>
          <div className='grid gap-4'>
            {insights.map((insight, index) => (
              <div
                key={index}
                className='flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-4 transition-all hover:border-white/20 hover:bg-white/10'
              >
                <div className='flex-1'>
                  <div className='flex items-center gap-2'>
                    <span className='text-sm font-semibold text-white'>
                      {insight.title}
                    </span>
                    <TrendingUp
                      className={`h-4 w-4 ${
                        insight.trend === 'up'
                          ? 'text-green-400'
                          : insight.trend === 'down'
                            ? 'text-red-400'
                            : 'text-gray-400'
                      }`}
                    />
                  </div>
                  <p className='mt-1 text-xs text-white/60'>
                    {insight.description}
                  </p>
                </div>
                <div className='text-right'>
                  <div className={`text-lg font-bold ${insight.color}`}>
                    {insight.value}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className='space-y-4'>
          <h4 className='text-sm font-semibold text-white/90'>
            Recommendations
          </h4>
          <div className='space-y-3'>
            {quickInsights.recommendations
              .slice(0, 3)
              .map((recommendation, index) => (
                <div
                  key={index}
                  className='flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-4 transition-all hover:border-white/20 hover:bg-white/10'
                >
                  <div className='flex items-start gap-3'>
                    <div className='mt-0.5 rounded-full bg-white/10 p-1'>
                      {getRecommendationIcon(recommendation)}
                    </div>
                    <div className='flex-1'>
                      <p className='text-sm font-medium text-white/90'>
                        {recommendation}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant='ghost'
                    size='sm'
                    asChild
                    className='hover:bg-white/10'
                  >
                    <Link href={getRecommendationAction(recommendation)}>
                      <ArrowRight className='h-3 w-3' />
                    </Link>
                  </Button>
                </div>
              ))}
          </div>
        </div>

        {/* Portfolio Strength */}
        <div className='rounded-lg border border-purple-500/30 bg-purple-500/10 p-5 transition-all hover:bg-purple-500/15'>
          <div className='flex items-center justify-between'>
            <div>
              <h4 className='text-sm font-semibold text-purple-200'>
                Portfolio Strength
              </h4>
              <p className='mt-2 text-xs leading-relaxed text-purple-200/80'>
                Based on completeness and quality metrics across your cosmic
                portfolio
              </p>
            </div>
            <Badge
              variant='outline'
              className={`text-sm font-medium ${
                quickInsights.portfolioStrength === 'excellent'
                  ? 'border-green-500/30 bg-green-500/10 text-green-400'
                  : quickInsights.portfolioStrength === 'strong'
                    ? 'border-blue-500/30 bg-blue-500/10 text-blue-400'
                    : quickInsights.portfolioStrength === 'moderate'
                      ? 'border-yellow-500/30 bg-yellow-500/10 text-yellow-400'
                      : 'border-red-500/30 bg-red-500/10 text-red-400'
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
