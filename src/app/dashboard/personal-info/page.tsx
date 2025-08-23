import { DashboardPageHeader } from '@/components/dashboard/page-header'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Github,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  Rocket,
  Save,
  Twitter,
  User,
} from 'lucide-react'

export default async function PersonalInfoPage() {
  return (
    <div className='space-y-6'>
      {/* Header */}
      <DashboardPageHeader
        title='Personal Information'
        description='Manage your space explorer profile and contact information across the cosmos.'
        actions={
          <Button className='bg-space-accent hover:bg-space-accent/80 text-white'>
            <Save className='mr-2 h-4 w-4' />
            Save Changes
          </Button>
        }
      />

      {/* Personal Info Content */}
      <div className='grid gap-6 lg:grid-cols-2'>
        {/* Basic Information */}
        <Card className='glass-nebula border-space-accent/30'>
          <CardHeader>
            <CardTitle className='flex items-center text-white'>
              <User className='text-space-gold mr-2 h-5 w-5' />
              Basic Information
            </CardTitle>
            <CardDescription className='text-white/70'>
              Your primary contact and identification details
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='fullName' className='text-white/90'>
                Full Name
              </Label>
              <Input
                id='fullName'
                defaultValue='Zahid Shaikh'
                className='border-white/20 bg-white/10 text-white placeholder:text-white/50'
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='title' className='text-white/90'>
                Professional Title
              </Label>
              <Input
                id='title'
                defaultValue='Space Technology Engineer & Full-Stack Developer'
                className='border-white/20 bg-white/10 text-white placeholder:text-white/50'
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='email' className='text-white/90'>
                Email Address
              </Label>
              <Input
                id='email'
                type='email'
                defaultValue='admin@zahidshaikh.space'
                className='border-white/20 bg-white/10 text-white placeholder:text-white/50'
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='phone' className='text-white/90'>
                Phone Number
              </Label>
              <Input
                id='phone'
                type='tel'
                defaultValue='+1 (555) 123-4567'
                className='border-white/20 bg-white/10 text-white placeholder:text-white/50'
              />
            </div>
          </CardContent>
        </Card>

        {/* Location & Bio */}
        <Card className='glass-nebula border-space-accent/30'>
          <CardHeader>
            <CardTitle className='flex items-center text-white'>
              <MapPin className='text-space-gold mr-2 h-5 w-5' />
              Location & Bio
            </CardTitle>
            <CardDescription className='text-white/70'>
              Your location and professional biography
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='location' className='text-white/90'>
                Location
              </Label>
              <Input
                id='location'
                defaultValue='Houston, Texas, USA'
                className='border-white/20 bg-white/10 text-white placeholder:text-white/50'
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='timezone' className='text-white/90'>
                Timezone
              </Label>
              <Input
                id='timezone'
                defaultValue='Central Time (UTC-6)'
                className='border-white/20 bg-white/10 text-white placeholder:text-white/50'
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='bio' className='text-white/90'>
                Professional Bio
              </Label>
              <Textarea
                id='bio'
                rows={4}
                defaultValue='Passionate space technology engineer with expertise in satellite systems, mission planning, and full-stack development. Combining aerospace engineering with modern web technologies to create innovative solutions for space exploration.'
                className='resize-none border-white/20 bg-white/10 text-white placeholder:text-white/50'
              />
            </div>
          </CardContent>
        </Card>

        {/* Social Links */}
        <Card className='glass-nebula border-space-accent/30'>
          <CardHeader>
            <CardTitle className='flex items-center text-white'>
              <Globe className='text-space-gold mr-2 h-5 w-5' />
              Social Links
            </CardTitle>
            <CardDescription className='text-white/70'>
              Your professional social media and portfolio links
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='space-y-2'>
              <Label
                htmlFor='website'
                className='flex items-center text-white/90'
              >
                <Globe className='mr-2 h-4 w-4' />
                Website
              </Label>
              <Input
                id='website'
                defaultValue='https://zahidshaikh.space'
                className='border-white/20 bg-white/10 text-white placeholder:text-white/50'
              />
            </div>
            <div className='space-y-2'>
              <Label
                htmlFor='github'
                className='flex items-center text-white/90'
              >
                <Github className='mr-2 h-4 w-4' />
                GitHub
              </Label>
              <Input
                id='github'
                defaultValue='https://github.com/zahidshaikh'
                className='border-white/20 bg-white/10 text-white placeholder:text-white/50'
              />
            </div>
            <div className='space-y-2'>
              <Label
                htmlFor='linkedin'
                className='flex items-center text-white/90'
              >
                <Linkedin className='mr-2 h-4 w-4' />
                LinkedIn
              </Label>
              <Input
                id='linkedin'
                defaultValue='https://linkedin.com/in/zahidshaikh'
                className='border-white/20 bg-white/10 text-white placeholder:text-white/50'
              />
            </div>
            <div className='space-y-2'>
              <Label
                htmlFor='twitter'
                className='flex items-center text-white/90'
              >
                <Twitter className='mr-2 h-4 w-4' />
                Twitter
              </Label>
              <Input
                id='twitter'
                defaultValue='https://twitter.com/zahidshaikh'
                className='border-white/20 bg-white/10 text-white placeholder:text-white/50'
              />
            </div>
          </CardContent>
        </Card>

        {/* Professional Status */}
        <Card className='glass-nebula border-space-accent/30'>
          <CardHeader>
            <CardTitle className='flex items-center text-white'>
              <Rocket className='text-space-gold mr-2 h-5 w-5' />
              Professional Status
            </CardTitle>
            <CardDescription className='text-white/70'>
              Current availability and project status
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='space-y-3'>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-white/80'>
                  Availability Status
                </span>
                <Badge
                  variant='secondary'
                  className='border-green-500/30 bg-green-500/20 text-green-400'
                >
                  Available for Hire
                </Badge>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-white/80'>Current Projects</span>
                <span className='text-sm text-white/70'>3 Active</span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-white/80'>Next Available</span>
                <span className='text-sm text-white/70'>March 2024</span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-white/80'>Response Time</span>
                <Badge
                  variant='secondary'
                  className='bg-space-gold/20 text-space-gold border-space-gold/30'
                >
                  Within 24h
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contact Preferences */}
      <Card className='glass-nebula border-space-accent/30'>
        <CardHeader>
          <CardTitle className='flex items-center text-white'>
            <Mail className='text-space-gold mr-2 h-5 w-5' />
            Contact Preferences
          </CardTitle>
          <CardDescription className='text-white/70'>
            How clients and collaborators can best reach you
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
            {[
              { method: 'Email', preferred: true, response: '2-6 hours' },
              { method: 'LinkedIn', preferred: true, response: '4-12 hours' },
              { method: 'Phone', preferred: false, response: 'Urgent only' },
              { method: 'Discord', preferred: true, response: '1-4 hours' },
            ].map((contact, index) => (
              <div
                key={index}
                className='border-space-accent/20 rounded-lg border bg-white/5 p-3'
              >
                <h4 className='flex items-center text-sm font-medium text-white'>
                  {contact.method}
                  {contact.preferred && (
                    <Badge
                      variant='outline'
                      className='bg-space-gold/20 text-space-gold border-space-gold/30 ml-2 text-xs'
                    >
                      Preferred
                    </Badge>
                  )}
                </h4>
                <p className='mt-1 text-xs text-white/60'>
                  Response: {contact.response}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
