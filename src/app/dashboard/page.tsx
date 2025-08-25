import { DashboardHeaderActions } from '@/components/dashboard/header-actions'
import { InsightsRecommendations } from '@/components/dashboard/insights-recommendations'
import { DashboardPageHeader } from '@/components/dashboard/page-header'
import { PortfolioCompletion } from '@/components/dashboard/portfolio-completion'
import { QuickActions } from '@/components/dashboard/quick-actions'
import { QuickStatsOverview } from '@/components/dashboard/quick-stats-overview'
import { RecentActivity } from '@/components/dashboard/recent-activity'
import { getDashboardDataServer } from '@/services/dashboard-server'

export default async function DashboardPage() {
  // Server-side data fetching
  const data = await getDashboardDataServer()

  return (
    <div className='space-y-6'>
      {/* Header */}
      <DashboardPageHeader
        title='Dashboard Overview'
        description="Welcome back, space explorer! Here's your portfolio mission control."
        actions={<DashboardHeaderActions />}
      />

      {/* Quick Actions */}
      <QuickActions data={data} />

      {/* Portfolio Completion Status */}
      <PortfolioCompletion data={data} />

      {/* Quick Stats Overview */}
      <QuickStatsOverview data={data} />

      {/* Recent Activity */}
      <RecentActivity data={data} />

      {/* Insights and Recommendations */}
      <InsightsRecommendations data={data} />
    </div>
  )
}
