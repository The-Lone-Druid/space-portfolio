import { DashboardPageHeader } from '@/components/dashboard/page-header'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  getPersonalInfoServer,
  getPersonalInfoStats,
} from '@/services/personal-info-service'
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
  Rocket,
  Star,
  Twitter,
  User,
  Youtube,
  Zap,
} from 'lucide-react'
import { PersonalInfoForm } from '../../../components/forms/personal-info-form'
import { getHeroStats } from '../../../services/portfolio-service'

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
  return socialIcons[iconName] ?? socialIcons.default
}

export default async function PersonalInfoPage() {
  // Server-side data fetching
  const [personalInfo, stats, heroStats] = await Promise.all([
    getPersonalInfoServer(),
    getPersonalInfoStats(),
    getHeroStats(),
  ])

  return (
    <div className='space-y-6'>
      {/* Header */}
      <DashboardPageHeader
        title='Personal Information'
        description='Manage your space explorer profile and contact information across the cosmos.'
      />

      {/* Stats Overview */}
      <div className='grid gap-6 md:grid-cols-3'>
        <Card className='glass-cosmic hover:border-space-accent/30 border-white/10 transition-colors'>
          <CardContent className='p-6'>
            <div className='flex items-center justify-between'>
              <div className='space-y-1'>
                <p className='text-sm font-medium text-white/70'>
                  Profile Status
                </p>
                <p className='text-2xl font-bold text-white'>
                  {stats.personalInfoExists ? 'Active' : 'Not Set'}
                </p>
                <p className='text-xs text-white/60'>Profile completion</p>
              </div>
              <div className='bg-space-accent/20 rounded-full p-3'>
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
            </div>
          </CardContent>
        </Card>

        <Card className='glass-cosmic hover:border-space-accent/30 border-white/10 transition-colors'>
          <CardContent className='p-6'>
            <div className='flex items-center justify-between'>
              <div className='space-y-1'>
                <p className='text-sm font-medium text-white/70'>
                  Social Links
                </p>
                <p className='text-2xl font-bold text-white'>
                  {stats.socialLinksCount}
                </p>
                <p className='text-xs text-white/60'>Connected platforms</p>
              </div>
              <div className='rounded-full bg-blue-500/20 p-3'>
                <Globe className='h-6 w-6 text-blue-400' />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className='glass-cosmic hover:border-space-accent/30 border-white/10 transition-colors'>
          <CardContent className='p-6'>
            <div className='flex items-center justify-between'>
              <div className='space-y-1'>
                <p className='text-sm font-medium text-white/70'>
                  Last Updated
                </p>
                <p className='text-2xl font-bold text-white'>
                  {stats.lastUpdated
                    ? formatDistanceToNow(new Date(stats.lastUpdated), {
                        addSuffix: true,
                      }).split(' ')[0]
                    : 'Never'}
                </p>
                <p className='text-xs text-white/60'>
                  {stats.lastUpdated ? 'ago' : 'No updates yet'}
                </p>
              </div>
              <div className='rounded-full bg-green-500/20 p-3'>
                <Activity className='h-6 w-6 text-green-400' />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {personalInfo ? (
        <div className='grid gap-8 lg:grid-cols-2'>
          {/* Current Information Display */}
          <div className='space-y-6'>
            {/* Basic Info Card */}
            <Card className='glass-cosmic hover:border-space-accent/30 border-white/10 transition-colors'>
              <CardHeader className='pb-4'>
                <CardTitle className='flex items-center text-xl text-white'>
                  <div className='bg-space-accent/20 mr-3 rounded-full p-2'>
                    <User className='text-space-accent h-5 w-5' />
                  </div>
                  Current Information
                </CardTitle>
                <CardDescription className='text-white/70'>
                  Your active profile information across the cosmos
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='space-y-4'>
                  <div className='flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-3'>
                    <span className='text-sm font-medium text-white/80'>
                      Full Name
                    </span>
                    <span className='font-semibold text-white'>
                      {personalInfo.name}
                    </span>
                  </div>

                  <div className='flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-3'>
                    <span className='text-sm font-medium text-white/80'>
                      Title
                    </span>
                    <span className='max-w-[200px] text-right font-semibold text-white'>
                      {personalInfo.title}
                    </span>
                  </div>

                  <div className='flex items-start justify-between rounded-lg border border-white/10 bg-white/5 p-3'>
                    <span className='flex items-center text-sm font-medium text-white/80'>
                      <Mail className='mr-2 h-4 w-4' />
                      Email
                    </span>
                    <span className='font-semibold text-white'>
                      {personalInfo.email}
                    </span>
                  </div>

                  <div className='flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-3'>
                    <span className='flex items-center text-sm font-medium text-white/80'>
                      <MapPin className='mr-2 h-4 w-4' />
                      Location
                    </span>
                    <span className='font-semibold text-white'>
                      {personalInfo.location}
                    </span>
                  </div>

                  <div className='flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-3'>
                    <span className='flex items-center text-sm font-medium text-white/80'>
                      <Rocket className='mr-2 h-4 w-4' />
                      Professional Projects
                    </span>
                    <span className='font-semibold text-white'>
                      {heroStats?.professionalProjects ?? 0}
                    </span>
                  </div>

                  <div className='flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-3'>
                    <span className='flex items-center text-sm font-medium text-white/80'>
                      <Rocket className='mr-2 h-4 w-4' />
                      Personal Projects
                    </span>
                    <span className='font-semibold text-white'>
                      {heroStats?.personalProjects ?? 0}
                    </span>
                  </div>

                  <div className='flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-3'>
                    <span className='flex items-center text-sm font-medium text-white/80'>
                      <Zap className='mr-2 h-4 w-4' />
                      Verified Skills
                    </span>
                    <span className='font-semibold text-white'>
                      {heroStats?.verifiedSkills ?? 0}
                    </span>
                  </div>

                  <div className='flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-3'>
                    <span className='flex items-center text-sm font-medium text-white/80'>
                      <Star className='mr-2 h-4 w-4' />
                      Years of Experience
                    </span>
                    <span className='font-semibold text-white'>
                      {heroStats?.yearsOfExperience
                        ? `${heroStats?.yearsOfExperience}+`
                        : 0}
                    </span>
                  </div>

                  {personalInfo.resumeUrl && (
                    <div className='flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-3'>
                      <span className='flex items-center text-sm font-medium text-white/80'>
                        <FileText className='mr-2 h-4 w-4' />
                        Resume
                      </span>
                      <a
                        href={personalInfo.resumeUrl}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-space-accent hover:text-space-accent/80 flex items-center text-sm font-medium transition-colors'
                      >
                        View Resume
                        <ExternalLink className='ml-1 h-3 w-3' />
                      </a>
                    </div>
                  )}
                </div>

                {/* Bio Section */}
                <div className='border-t border-white/10 pt-4'>
                  <h4 className='mb-3 font-semibold text-white'>Bio</h4>
                  <div className='rounded-lg border border-white/10 bg-white/5 p-4'>
                    <p className='text-sm leading-relaxed text-white/80'>
                      {personalInfo.bio}
                    </p>
                  </div>
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
                <Card className='glass-cosmic hover:border-space-accent/30 border-white/10 transition-colors'>
                  <CardHeader className='pb-4'>
                    <CardTitle className='flex items-center text-xl text-white'>
                      <div className='mr-3 rounded-full bg-blue-500/20 p-2'>
                        <Globe className='h-5 w-5 text-blue-400' />
                      </div>
                      Social Links
                    </CardTitle>
                    <CardDescription className='text-white/70'>
                      Your connected social platforms and networks
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className='space-y-3'>
                      {personalInfo.socialLinks.map((link, index) => {
                        const IconComponent = getSocialIcon(link.name)
                        return (
                          <div
                            key={link.id ?? index}
                            className='hover:border-space-accent/30 flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:bg-white/10'
                          >
                            <div className='flex items-center space-x-3'>
                              <div className='bg-space-accent/20 rounded-full p-2'>
                                <IconComponent className='text-space-accent h-4 w-4' />
                              </div>
                              <div>
                                <div className='font-semibold text-white'>
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
                              className='text-space-accent hover:text-space-accent/80 rounded-full p-2 transition-colors hover:bg-white/10'
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
            <Card className='glass-cosmic hover:border-space-accent/30 border-white/10 transition-colors'>
              <CardHeader className='pb-4'>
                <CardTitle className='text-xl text-white'>
                  Edit Information
                </CardTitle>
                <CardDescription className='text-white/70'>
                  Update your personal information and social links
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PersonalInfoForm
                  initialData={{
                    ...personalInfo,
                    heroStats,
                  }}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        // No Personal Info - Show Create Form
        <div className='mx-auto max-w-4xl'>
          <Card className='glass-cosmic hover:border-space-accent/30 border-white/10 transition-colors'>
            <CardHeader className='pb-6 text-center'>
              <div className='bg-space-accent/20 mx-auto mb-4 w-fit rounded-full p-4'>
                <User className='text-space-accent h-12 w-12' />
              </div>
              <CardTitle className='mb-2 text-2xl text-white'>
                Create Your Space Profile
              </CardTitle>
              <CardDescription className='mx-auto max-w-2xl text-lg text-white/70'>
                Set up your personal information to complete your space explorer
                profile and showcase your cosmic journey across the digital
                universe
              </CardDescription>
            </CardHeader>
            <CardContent className='pt-2'>
              <PersonalInfoForm />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
