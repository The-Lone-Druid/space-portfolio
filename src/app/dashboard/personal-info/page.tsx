import { DashboardPageHeader } from '@/components/dashboard/page-header'
import { PersonalInfoClientWrapper } from '@/components/forms/personal-info-client-wrapper'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
  getPersonalInfoServer,
  getPersonalInfoStats,
} from '@/services/personal-info-server'
import { formatDistanceToNow } from 'date-fns'
import {
  Activity,
  Calendar,
  ExternalLink,
  FileText,
  Github,
  Globe,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Twitter,
  User,
  Youtube,
} from 'lucide-react'

// Icon mapping for social platforms
const socialIcons: Record<string, React.ElementType> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  instagram: Instagram,
  youtube: Youtube,
  website: Globe,
  portfolio: Globe,
  default: Globe,
}

function getSocialIcon(name: string) {
  const iconName = name.toLowerCase()
  return socialIcons[iconName] || socialIcons.default
}

export default async function PersonalInfoPage() {
  // Server-side data fetching
  const [personalInfo, stats] = await Promise.all([
    getPersonalInfoServer(),
    getPersonalInfoStats(),
  ])

  return (
    <div className='space-y-6'>
      {/* Header */}
      <DashboardPageHeader
        title='Personal Information'
        description='Manage your space explorer profile and contact information across the cosmos.'
      />

      {/* Stats Overview */}
      <div className='grid gap-4 md:grid-cols-3'>
        <Card className='glass-nebula border-space-accent/30'>
          <CardContent className='p-4'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-white/70'>Profile Status</p>
                <p className='font-semibold text-white'>
                  {stats.personalInfoExists ? 'Active' : 'Not Set'}
                </p>
              </div>
              <Badge
                variant='secondary'
                className={
                  stats.personalInfoExists
                    ? 'border-green-500/30 bg-green-500/20 text-green-400'
                    : 'border-yellow-500/30 bg-yellow-500/20 text-yellow-400'
                }
              >
                {stats.personalInfoExists ? 'Complete' : 'Incomplete'}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className='glass-nebula border-space-accent/30'>
          <CardContent className='p-4'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-white/70'>Social Links</p>
                <p className='font-semibold text-white'>
                  {stats.socialLinksCount}
                </p>
              </div>
              <Globe className='text-space-gold h-5 w-5' />
            </div>
          </CardContent>
        </Card>

        <Card className='glass-nebula border-space-accent/30'>
          <CardContent className='p-4'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-white/70'>Last Updated</p>
                <p className='text-xs font-semibold text-white'>
                  {stats.lastUpdated
                    ? formatDistanceToNow(new Date(stats.lastUpdated), {
                        addSuffix: true,
                      })
                    : 'Never'}
                </p>
              </div>
              <Activity className='text-space-gold h-5 w-5' />
            </div>
          </CardContent>
        </Card>
      </div>

      {personalInfo ? (
        <div className='grid gap-6 lg:grid-cols-2'>
          {/* Current Information Display */}
          <div className='space-y-6'>
            {/* Basic Info Card */}
            <Card className='glass-nebula border-space-accent/30'>
              <CardHeader>
                <CardTitle className='flex items-center text-white'>
                  <User className='text-space-gold mr-2 h-5 w-5' />
                  Current Information
                </CardTitle>
                <CardDescription className='text-white/70'>
                  Your active profile information
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='space-y-3'>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm text-white/80'>Full Name</span>
                    <span className='font-medium text-white'>
                      {personalInfo.name}
                    </span>
                  </div>
                  <Separator className='bg-white/10' />

                  <div className='flex items-center justify-between'>
                    <span className='text-sm text-white/80'>Title</span>
                    <span className='max-w-[200px] text-right font-medium text-white'>
                      {personalInfo.title}
                    </span>
                  </div>
                  <Separator className='bg-white/10' />

                  <div className='flex items-start justify-between'>
                    <span className='flex items-center text-sm text-white/80'>
                      <Mail className='mr-2 h-4 w-4' />
                      Email
                    </span>
                    <span className='font-medium text-white'>
                      {personalInfo.email}
                    </span>
                  </div>
                  <Separator className='bg-white/10' />

                  <div className='flex items-center justify-between'>
                    <span className='flex items-center text-sm text-white/80'>
                      <MapPin className='mr-2 h-4 w-4' />
                      Location
                    </span>
                    <span className='font-medium text-white'>
                      {personalInfo.location}
                    </span>
                  </div>

                  {personalInfo.resumeUrl && (
                    <>
                      <Separator className='bg-white/10' />
                      <div className='flex items-center justify-between'>
                        <span className='flex items-center text-sm text-white/80'>
                          <FileText className='mr-2 h-4 w-4' />
                          Resume
                        </span>
                        <a
                          href={personalInfo.resumeUrl}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='text-space-accent hover:text-space-accent/80 flex items-center text-sm'
                        >
                          View Resume
                          <ExternalLink className='ml-1 h-3 w-3' />
                        </a>
                      </div>
                    </>
                  )}
                </div>

                {/* Bio Section */}
                <div className='pt-4'>
                  <h4 className='mb-2 font-medium text-white'>Bio</h4>
                  <p className='text-sm leading-relaxed text-white/70'>
                    {personalInfo.bio}
                  </p>
                </div>

                {/* Timestamps */}
                <div className='border-t border-white/10 pt-4'>
                  <div className='flex items-center justify-between text-xs text-white/60'>
                    <span className='flex items-center'>
                      <Calendar className='mr-1 h-3 w-3' />
                      Created:{' '}
                      {new Date(personalInfo.createdAt).toLocaleDateString()}
                    </span>
                    <span>
                      Updated:{' '}
                      {new Date(personalInfo.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Links Card */}
            {personalInfo.socialLinks &&
              personalInfo.socialLinks.length > 0 && (
                <Card className='glass-nebula border-space-accent/30'>
                  <CardHeader>
                    <CardTitle className='flex items-center text-white'>
                      <Globe className='text-space-gold mr-2 h-5 w-5' />
                      Social Links
                    </CardTitle>
                    <CardDescription className='text-white/70'>
                      Your connected social platforms
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className='space-y-3'>
                      {personalInfo.socialLinks.map((link, index) => {
                        const IconComponent = getSocialIcon(link.name)
                        return (
                          <div
                            key={link.id || index}
                            className='border-space-accent/20 hover:border-space-gold/50 flex items-center justify-between rounded-lg border bg-white/5 p-3 transition-colors'
                          >
                            <div className='flex items-center space-x-3'>
                              <IconComponent className='text-space-gold h-5 w-5' />
                              <div>
                                <div className='font-medium text-white'>
                                  {link.name}
                                </div>
                                <div className='text-sm text-white/60'>
                                  {link.url.replace(/^https?:\/\//, '')}
                                </div>
                              </div>
                            </div>
                            <a
                              href={link.url}
                              target='_blank'
                              rel='noopener noreferrer'
                              className='text-space-accent hover:text-space-accent/80 transition-colors'
                            >
                              <ExternalLink className='h-4 w-4' />
                            </a>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              )}
          </div>

          {/* Edit Form */}
          <div>
            <Card className='glass-nebula border-space-accent/30'>
              <CardHeader>
                <CardTitle className='text-white'>Edit Information</CardTitle>
                <CardDescription className='text-white/70'>
                  Update your personal information and social links
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PersonalInfoClientWrapper initialData={personalInfo} />
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        // No Personal Info - Show Create Form
        <div className='mx-auto max-w-4xl'>
          <Card className='glass-nebula border-space-accent/30'>
            <CardHeader className='text-center'>
              <CardTitle className='flex items-center justify-center text-white'>
                <User className='text-space-gold mr-2 h-6 w-6' />
                Create Your Space Profile
              </CardTitle>
              <CardDescription className='text-white/70'>
                Set up your personal information to complete your space explorer
                profile
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PersonalInfoClientWrapper />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
