'use client'

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
import { LoadingSpinnerInline } from '@/components/ui/loading-spinner'
import { Textarea } from '@/components/ui/textarea'
import {
  usePersonalInfo,
  type PersonalInfoFormData,
} from '@/hooks/use-personal-info'
import {
  ExternalLink,
  FileText,
  Github,
  Globe,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Plus,
  Save,
  Trash2,
  Twitter,
  User,
  Youtube,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { PersonalInfo, SocialLink } from '../../types'

interface PersonalInfoFormProps {
  initialData?:
    | ({
        socialLinks: SocialLink[]
      } & PersonalInfo)
    | null
  onSave?: (data: PersonalInfo) => void
}

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

export function PersonalInfoForm({
  initialData,
  onSave,
}: PersonalInfoFormProps) {
  const { createPersonalInfo, updatePersonalInfo, isLoading } =
    usePersonalInfo()

  const [formData, setFormData] = useState<PersonalInfoFormData>({
    name: '',
    title: '',
    bio: '',
    email: '',
    location: '',
    resumeUrl: '',
    socialLinks: [],
  })

  const [newSocialLink, setNewSocialLink] = useState({
    name: '',
    url: '',
    icon: '',
  })

  const [showAddSocialLink, setShowAddSocialLink] = useState(false)

  // Populate form with initial data
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        title: initialData.title,
        bio: initialData.bio,
        email: initialData.email,
        location: initialData.location,
        resumeUrl: initialData.resumeUrl || '',
        socialLinks: initialData.socialLinks.map(link => ({
          name: link.name,
          url: link.url,
          icon: link.icon || '',
          order: link.order,
        })),
      })
    }
  }, [initialData])

  const handleInputChange = (
    field: keyof PersonalInfoFormData,
    value: string
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleAddSocialLink = () => {
    if (newSocialLink.name && newSocialLink.url) {
      const order = formData.socialLinks?.length || 0
      setFormData(prev => ({
        ...prev,
        socialLinks: [...(prev.socialLinks || []), { ...newSocialLink, order }],
      }))
      setNewSocialLink({ name: '', url: '', icon: '' })
      setShowAddSocialLink(false)
    }
  }

  const handleRemoveSocialLink = (index: number) => {
    setFormData(prev => ({
      ...prev,
      socialLinks: prev.socialLinks?.filter((_, i) => i !== index) || [],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      let result: PersonalInfo | null = null

      if (initialData) {
        result = await updatePersonalInfo(formData)
      } else {
        result = await createPersonalInfo(formData)
      }

      if (result && onSave) {
        onSave(result)
      }
    } catch (error) {
      console.error('Error saving personal info:', error)
    }
  }

  const getSocialIcon = (name: string) => {
    const iconName = name.toLowerCase()
    const IconComponent = socialIcons[iconName] || socialIcons.default
    return IconComponent
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
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
          <div className='grid gap-4 md:grid-cols-2'>
            <div className='space-y-2'>
              <Label htmlFor='name' className='text-white/90'>
                Full Name *
              </Label>
              <Input
                id='name'
                value={formData.name}
                onChange={e => handleInputChange('name', e.target.value)}
                className='border-white/20 bg-white/10 text-white placeholder:text-white/50'
                placeholder='Enter your full name'
                required
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='title' className='text-white/90'>
                Professional Title *
              </Label>
              <Input
                id='title'
                value={formData.title}
                onChange={e => handleInputChange('title', e.target.value)}
                className='border-white/20 bg-white/10 text-white placeholder:text-white/50'
                placeholder='e.g., Space Technology Engineer'
                required
              />
            </div>
          </div>

          <div className='grid gap-4 md:grid-cols-2'>
            <div className='space-y-2'>
              <Label
                htmlFor='email'
                className='flex items-center text-white/90'
              >
                <Mail className='mr-2 h-4 w-4' />
                Email Address *
              </Label>
              <Input
                id='email'
                type='email'
                value={formData.email}
                onChange={e => handleInputChange('email', e.target.value)}
                className='border-white/20 bg-white/10 text-white placeholder:text-white/50'
                placeholder='your.email@domain.com'
                required
              />
            </div>
            <div className='space-y-2'>
              <Label
                htmlFor='location'
                className='flex items-center text-white/90'
              >
                <MapPin className='mr-2 h-4 w-4' />
                Location *
              </Label>
              <Input
                id='location'
                value={formData.location}
                onChange={e => handleInputChange('location', e.target.value)}
                className='border-white/20 bg-white/10 text-white placeholder:text-white/50'
                placeholder='City, Country'
                required
              />
            </div>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='bio' className='flex items-center text-white/90'>
              <FileText className='mr-2 h-4 w-4' />
              Professional Bio *
            </Label>
            <Textarea
              id='bio'
              rows={4}
              value={formData.bio}
              onChange={e => handleInputChange('bio', e.target.value)}
              className='resize-none border-white/20 bg-white/10 text-white placeholder:text-white/50'
              placeholder='Write a brief description about yourself and your expertise...'
              required
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='resumeUrl' className='text-white/90'>
              Resume URL
            </Label>
            <Input
              id='resumeUrl'
              type='url'
              value={formData.resumeUrl}
              onChange={e => handleInputChange('resumeUrl', e.target.value)}
              className='border-white/20 bg-white/10 text-white placeholder:text-white/50'
              placeholder='https://your-resume-link.com'
            />
          </div>
        </CardContent>
      </Card>

      {/* Social Links */}
      <Card className='glass-nebula border-space-accent/30'>
        <CardHeader>
          <CardTitle className='flex items-center justify-between text-white'>
            <div className='flex items-center'>
              <Globe className='text-space-gold mr-2 h-5 w-5' />
              Social Links
            </div>
            <Button
              type='button'
              variant='space'
              size='sm'
              onClick={() => setShowAddSocialLink(true)}
            >
              <Plus className='mr-2 h-4 w-4' />
              Add Link
            </Button>
          </CardTitle>
          <CardDescription className='text-white/70'>
            Your professional social media and portfolio links
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          {/* Existing Social Links */}
          {formData.socialLinks && formData.socialLinks.length > 0 ? (
            <div className='space-y-3'>
              {formData.socialLinks.map((link, index) => {
                const IconComponent = getSocialIcon(link.name)
                return (
                  <div
                    key={index}
                    className='border-space-accent/20 flex items-center justify-between rounded-lg border bg-white/5 p-3'
                  >
                    <div className='flex items-center space-x-3'>
                      <IconComponent className='text-space-gold h-5 w-5' />
                      <div>
                        <div className='font-medium text-white'>
                          {link.name}
                        </div>
                        <div className='flex items-center text-sm text-white/60'>
                          <ExternalLink className='mr-1 h-3 w-3' />
                          {link.url}
                        </div>
                      </div>
                    </div>
                    <Button
                      type='button'
                      variant='destructive'
                      size='sm'
                      onClick={() => handleRemoveSocialLink(index)}
                    >
                      <Trash2 className='h-4 w-4' />
                    </Button>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className='py-8 text-center text-white/60'>
              <Globe className='mx-auto mb-4 h-12 w-12 text-white/20' />
              <p>No social links added yet</p>
            </div>
          )}

          {/* Add New Social Link Form */}
          {showAddSocialLink && (
            <div className='border-space-accent/30 space-y-3 rounded-lg border bg-white/5 p-4'>
              <div className='grid gap-3 md:grid-cols-2'>
                <div className='space-y-2'>
                  <Label className='text-white/90'>Platform Name</Label>
                  <Input
                    value={newSocialLink.name}
                    onChange={e =>
                      setNewSocialLink(prev => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    className='border-white/20 bg-white/10 text-white placeholder:text-white/50'
                    placeholder='GitHub, LinkedIn, Twitter...'
                  />
                </div>
                <div className='space-y-2'>
                  <Label className='text-white/90'>URL</Label>
                  <Input
                    value={newSocialLink.url}
                    onChange={e =>
                      setNewSocialLink(prev => ({
                        ...prev,
                        url: e.target.value,
                      }))
                    }
                    className='border-white/20 bg-white/10 text-white placeholder:text-white/50'
                    placeholder='https://...'
                  />
                </div>
              </div>
              <div className='flex justify-end space-x-2'>
                <Button
                  type='button'
                  variant='ghost'
                  size='sm'
                  onClick={() => setShowAddSocialLink(false)}
                >
                  Cancel
                </Button>
                <Button
                  type='button'
                  variant='space'
                  size='sm'
                  onClick={handleAddSocialLink}
                  disabled={!newSocialLink.name || !newSocialLink.url}
                >
                  Add Link
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className='flex justify-end'>
        <Button type='submit' variant='stellar' disabled={isLoading}>
          {isLoading ? (
            <>
              <LoadingSpinnerInline variant='orbit' />
              <span className='ml-2'>Updating...</span>
            </>
          ) : (
            <>
              <Save className='mr-2 h-4 w-4' />
              {initialData ? 'Update Information' : 'Save Information'}
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
