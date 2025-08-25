'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
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
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Hero, PersonalInfo, SocialLink } from '../../types'

interface PersonalInfoFormProps {
  initialData?:
    | ({
        heroStats: Hero | null
        socialLinks: SocialLink[]
      } & PersonalInfo)
    | null
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

export function PersonalInfoForm({ initialData }: PersonalInfoFormProps) {
  const { createPersonalInfo, updatePersonalInfo, isLoading } =
    usePersonalInfo()
  const router = useRouter()

  // Initialize form with react-hook-form
  const form = useForm({
    defaultValues: {
      name: '',
      title: '',
      bio: '',
      email: '',
      location: '',
      resumeUrl: '',
      socialLinks: [],
      heroStats: {
        personalProjects: 0,
        professionalProjects: 0,
        verifiedSkills: 0,
        yearsOfExperience: 0,
        id: '',
      },
    } as PersonalInfoFormData,
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
      form.reset({
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
        heroStats: {
          id: initialData?.heroStats?.id || '',
          personalProjects: initialData?.heroStats?.personalProjects || 0,
          professionalProjects:
            initialData?.heroStats?.professionalProjects || 0,
          verifiedSkills: initialData?.heroStats?.verifiedSkills || 0,
          yearsOfExperience: initialData?.heroStats?.yearsOfExperience || 0,
        },
      })
    }
  }, [initialData, form])

  const handleAddSocialLink = () => {
    if (newSocialLink.name && newSocialLink.url) {
      const currentSocialLinks = form.getValues('socialLinks') || []
      const order = currentSocialLinks.length
      form.setValue('socialLinks', [
        ...currentSocialLinks,
        { ...newSocialLink, order },
      ])
      setNewSocialLink({ name: '', url: '', icon: '' })
      setShowAddSocialLink(false)
    }
  }

  const handleRemoveSocialLink = (index: number) => {
    const currentSocialLinks = form.getValues('socialLinks') || []
    form.setValue(
      'socialLinks',
      currentSocialLinks.filter((_, i) => i !== index)
    )
  }

  const onSubmit = async (data: PersonalInfoFormData) => {
    try {
      if (initialData) {
        await updatePersonalInfo(data)
        router.refresh()
      } else {
        await createPersonalInfo(data)
        router.refresh()
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

  const watchedSocialLinks = form.watch('socialLinks')

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
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
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-white/90'>Full Name *</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className='border-white/20 bg-white/10 text-white placeholder:text-white/50'
                        placeholder='Enter your full name'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-white/90'>
                      Professional Title *
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className='border-white/20 bg-white/10 text-white placeholder:text-white/50'
                        placeholder='e.g., Space Technology Engineer'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='grid gap-4 md:grid-cols-2'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex items-center text-white/90'>
                      <Mail className='mr-2 h-4 w-4' />
                      Email Address *
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type='email'
                        className='border-white/20 bg-white/10 text-white placeholder:text-white/50'
                        placeholder='your.email@domain.com'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='location'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex items-center text-white/90'>
                      <MapPin className='mr-2 h-4 w-4' />
                      Location *
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className='border-white/20 bg-white/10 text-white placeholder:text-white/50'
                        placeholder='City, Country'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name='bio'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='flex items-center text-white/90'>
                    <FileText className='mr-2 h-4 w-4' />
                    Professional Bio *
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      rows={4}
                      className='resize-none border-white/20 bg-white/10 text-white placeholder:text-white/50'
                      placeholder='Write a brief description about yourself and your expertise...'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='resumeUrl'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-white/90'>Resume URL</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type='url'
                      className='border-white/20 bg-white/10 text-white placeholder:text-white/50'
                      placeholder='https://your-resume-link.com'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='grid grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='heroStats.personalProjects'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-white/90'>
                      Personal Projects
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type='number'
                        min='0'
                        className='border-white/20 bg-white/10 text-white placeholder:text-white/50'
                        placeholder='Number of personal projects'
                        onChange={e =>
                          field.onChange(parseInt(e.target.value) || 0)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='heroStats.professionalProjects'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-white/90'>
                      Professional Projects
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type='number'
                        min='0'
                        className='border-white/20 bg-white/10 text-white placeholder:text-white/50'
                        placeholder='Number of professional projects'
                        onChange={e =>
                          field.onChange(parseInt(e.target.value) || 0)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='heroStats.verifiedSkills'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-white/90'>
                      Verified Skills
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type='number'
                        min='0'
                        className='border-white/20 bg-white/10 text-white placeholder:text-white/50'
                        placeholder='Number of verified skills'
                        onChange={e =>
                          field.onChange(parseInt(e.target.value) || 0)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='heroStats.yearsOfExperience'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-white/90'>
                      Years of Experience
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type='number'
                        min='0'
                        className='border-white/20 bg-white/10 text-white placeholder:text-white/50'
                        placeholder='Years in the field'
                        onChange={e =>
                          field.onChange(parseInt(e.target.value) || 0)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
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
            {watchedSocialLinks && watchedSocialLinks.length > 0 ? (
              <div className='space-y-3'>
                {watchedSocialLinks.map((link, index) => {
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
                    variant='link'
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
                <LoadingSpinnerInline />
                <span>Updating...</span>
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
    </Form>
  )
}
