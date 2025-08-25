'use client'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { AlertCircle, CheckCircle, Circle } from 'lucide-react'
import { DashboardStats } from '../../types'

interface PortfolioCompletionProps {
  data: DashboardStats
}

export function PortfolioCompletion({ data }: PortfolioCompletionProps) {
  const { overview, quickInsights } = data

  const getCompletionColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-400'
    if (percentage >= 70) return 'text-blue-400'
    if (percentage >= 50) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getCompletionBadge = (strength: string) => {
    const badgeProps = {
      excellent: {
        variant: 'default' as const,
        className: 'bg-green-500/20 text-green-400 border-green-500/30',
      },
      strong: {
        variant: 'default' as const,
        className: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      },
      moderate: {
        variant: 'default' as const,
        className: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      },
      weak: {
        variant: 'default' as const,
        className: 'bg-red-500/20 text-red-400 border-red-500/30',
      },
    }

    return badgeProps[strength as keyof typeof badgeProps] || badgeProps.weak
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'complete':
        return <CheckCircle className='h-4 w-4 text-green-400' />
      case 'needs-update':
        return <AlertCircle className='h-4 w-4 text-yellow-400' />
      default:
        return <Circle className='h-4 w-4 text-red-400' />
    }
  }

  return (
    <Card className='glass-nebula border-space-accent/30'>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <CardTitle className='flex items-center text-white'>
            Portfolio Completion
          </CardTitle>
          <Badge {...getCompletionBadge(quickInsights.portfolioStrength)}>
            {quickInsights.portfolioStrength.charAt(0).toUpperCase() +
              quickInsights.portfolioStrength.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className='space-y-6'>
        {/* Overall Progress */}
        <div className='space-y-2'>
          <div className='flex items-center justify-between'>
            <span className='text-sm text-white/70'>Overall Completion</span>
            <span
              className={`text-sm font-semibold ${getCompletionColor(overview.portfolioCompletion)}`}
            >
              {overview.portfolioCompletion}%
            </span>
          </div>
          <Progress value={overview.portfolioCompletion} className='h-2' />
        </div>

        {/* Completion Areas */}
        <div className='space-y-3'>
          <h4 className='text-sm font-medium text-white/90'>
            Completion Areas
          </h4>
          <div className='grid gap-2'>
            {quickInsights.completionAreas.map((area, index) => (
              <div
                key={index}
                className='flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-3'
              >
                <div className='flex items-center gap-2'>
                  {getStatusIcon(area.status)}
                  <span className='text-sm text-white/90'>{area.area}</span>
                </div>
                <Badge
                  variant='outline'
                  className={`text-xs ${
                    area.priority === 'high'
                      ? 'border-red-500/30 text-red-400'
                      : area.priority === 'medium'
                        ? 'border-yellow-500/30 text-yellow-400'
                        : 'border-green-500/30 text-green-400'
                  }`}
                >
                  {area.priority}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className='grid grid-cols-2 gap-4 pt-2'>
          <div className='text-center'>
            <div className='text-xl font-bold text-white'>
              {overview.totalItems}
            </div>
            <div className='text-xs text-white/60'>Total Items</div>
          </div>
          <div className='text-center'>
            <div className='text-xl font-bold text-white'>
              {overview.lastUpdated
                ? new Date(overview.lastUpdated).toLocaleDateString()
                : 'Never'}
            </div>
            <div className='text-xs text-white/60'>Last Updated</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
