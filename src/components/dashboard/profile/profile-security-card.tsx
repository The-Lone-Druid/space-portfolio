import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { formatDistanceToNow } from 'date-fns'
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Shield,
  Settings,
} from 'lucide-react'

export function ProfileSecurityCard() {
  // Mock security data - replace with actual data service when available
  const securityData = {
    score: 85,
    lastPasswordChange: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    twoFactorEnabled: false,
    activeSessions: 1,
    recentLoginAttempts: 0,
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400'
    if (score >= 60) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'from-green-500/20 to-green-600/10'
    if (score >= 60) return 'from-yellow-500/20 to-yellow-600/10'
    return 'from-red-500/20 to-red-600/10'
  }

  return (
    <Card className='glass-nebula border-space-accent/30'>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <Shield className='text-space-gold h-5 w-5' />
            <CardTitle className='text-white'>Security Overview</CardTitle>
          </div>
          <Button variant='outline' size='sm' className='gap-2'>
            <Settings className='h-4 w-4' />
            Settings
          </Button>
        </div>
        <CardDescription className='text-white/70'>
          Monitor and manage your account security
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-6'>
        {/* Security Score */}
        <div className='space-y-3'>
          <div className='flex items-center justify-between'>
            <h4 className='text-sm font-medium text-white/80'>
              Security Score
            </h4>
            <span
              className={`text-2xl font-bold ${getScoreColor(securityData.score)}`}
            >
              {securityData.score}%
            </span>
          </div>
          <Progress value={securityData.score} className='h-2' />
          <div
            className={`rounded-lg bg-gradient-to-r ${getScoreBg(securityData.score)} p-3`}
          >
            <p className='text-sm text-white/80'>
              {securityData.score >= 80
                ? '🎉 Excellent security! Your account is well protected.'
                : securityData.score >= 60
                  ? '⚡ Good security, but there are improvements you can make.'
                  : '⚠️ Your account security needs attention.'}
            </p>
          </div>
        </div>

        {/* Security Checklist */}
        <div className='space-y-3'>
          <h4 className='text-sm font-medium text-white/80'>
            Security Checklist
          </h4>
          <div className='space-y-2'>
            <div className='flex items-center justify-between rounded-lg bg-white/5 p-3'>
              <div className='flex items-center gap-3'>
                <CheckCircle className='h-4 w-4 text-green-400' />
                <span className='text-sm text-white/80'>Strong Password</span>
              </div>
              <Badge variant='secondary' className='text-xs'>
                Active
              </Badge>
            </div>

            <div className='flex items-center justify-between rounded-lg bg-white/5 p-3'>
              <div className='flex items-center gap-3'>
                <AlertTriangle className='h-4 w-4 text-yellow-400' />
                <span className='text-sm text-white/80'>
                  Two-Factor Authentication
                </span>
              </div>
              <Badge
                variant='outline'
                className='border-yellow-400/30 text-xs text-yellow-400'
              >
                Recommended
              </Badge>
            </div>

            <div className='flex items-center justify-between rounded-lg bg-white/5 p-3'>
              <div className='flex items-center gap-3'>
                <CheckCircle className='h-4 w-4 text-green-400' />
                <span className='text-sm text-white/80'>
                  Email Verification
                </span>
              </div>
              <Badge variant='secondary' className='text-xs'>
                Verified
              </Badge>
            </div>
          </div>
        </div>

        {/* Recent Security Activity */}
        <div className='space-y-3'>
          <h4 className='text-sm font-medium text-white/80'>Recent Activity</h4>
          <div className='space-y-2'>
            <div className='flex items-center gap-3 rounded-lg bg-white/5 p-3'>
              <Clock className='h-4 w-4 text-white/60' />
              <div className='flex-1'>
                <p className='text-sm text-white/80'>Last password change</p>
                <p className='text-xs text-white/60'>
                  {formatDistanceToNow(securityData.lastPasswordChange, {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </div>

            <div className='flex items-center gap-3 rounded-lg bg-white/5 p-3'>
              <Shield className='h-4 w-4 text-white/60' />
              <div className='flex-1'>
                <p className='text-sm text-white/80'>Active sessions</p>
                <p className='text-xs text-white/60'>
                  {securityData.activeSessions} device(s)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className='grid gap-2 sm:grid-cols-2'>
          <Button variant='outline' size='sm' className='w-full'>
            Change Password
          </Button>
          <Button variant='outline' size='sm' className='w-full'>
            Enable 2FA
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
