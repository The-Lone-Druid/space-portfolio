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
import { Progress } from '@/components/ui/progress'
import { Code, Database, Monitor, Palette, Plus, Rocket } from 'lucide-react'

export default async function SkillsPage() {
  const skillCategories = [
    {
      title: 'Programming Languages',
      icon: Code,
      skills: [
        { name: 'TypeScript', level: 95, color: 'bg-blue-500' },
        { name: 'JavaScript', level: 90, color: 'bg-yellow-500' },
        { name: 'Python', level: 85, color: 'bg-green-500' },
        { name: 'Rust', level: 70, color: 'bg-orange-500' },
      ],
    },
    {
      title: 'Frontend Development',
      icon: Monitor,
      skills: [
        { name: 'React', level: 95, color: 'bg-cyan-500' },
        { name: 'Next.js', level: 90, color: 'bg-white' },
        { name: 'Tailwind CSS', level: 85, color: 'bg-teal-500' },
        { name: 'Three.js', level: 75, color: 'bg-purple-500' },
      ],
    },
    {
      title: 'Backend & Database',
      icon: Database,
      skills: [
        { name: 'Node.js', level: 88, color: 'bg-green-600' },
        { name: 'PostgreSQL', level: 80, color: 'bg-blue-600' },
        { name: 'Prisma', level: 85, color: 'bg-indigo-500' },
        { name: 'GraphQL', level: 75, color: 'bg-pink-500' },
      ],
    },
    {
      title: 'Space Tech & Tools',
      icon: Rocket,
      skills: [
        { name: 'Satellite Systems', level: 80, color: 'bg-space-gold' },
        { name: 'Mission Planning', level: 85, color: 'bg-space-accent' },
        { name: 'Docker', level: 78, color: 'bg-blue-700' },
        { name: 'AWS', level: 72, color: 'bg-orange-600' },
      ],
    },
  ]

  return (
    <div className='space-y-6'>
      {/* Header */}
      <DashboardPageHeader
        title='Skills & Expertise'
        description='Manage your technical skills and proficiency levels across the galaxy of technologies.'
        actions={
          <Button className='bg-space-accent hover:bg-space-accent/80 text-white'>
            <Plus className='mr-2 h-4 w-4' />
            Add Skill
          </Button>
        }
      />

      {/* Skills Content */}
      <div className='grid gap-6 lg:grid-cols-2'>
        {skillCategories.map((category, index) => (
          <Card key={index} className='glass-nebula border-space-accent/30'>
            <CardHeader>
              <CardTitle className='flex items-center text-white'>
                <category.icon className='text-space-gold mr-2 h-5 w-5' />
                {category.title}
              </CardTitle>
              <CardDescription className='text-white/70'>
                Proficiency levels in {category.title.toLowerCase()}
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              {category.skills.map((skill, skillIndex) => (
                <div key={skillIndex} className='space-y-2'>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm font-medium text-white/90'>
                      {skill.name}
                    </span>
                    <Badge
                      variant='secondary'
                      className='bg-space-gold/20 text-space-gold border-space-gold/30'
                    >
                      {skill.level}%
                    </Badge>
                  </div>
                  <Progress value={skill.level} className='h-2 bg-white/10' />
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Certifications Section */}
      <Card className='glass-nebula border-space-accent/30'>
        <CardHeader>
          <CardTitle className='flex items-center text-white'>
            <Palette className='text-space-gold mr-2 h-5 w-5' />
            Certifications & Achievements
          </CardTitle>
          <CardDescription className='text-white/70'>
            Professional certifications and space technology achievements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
            {[
              {
                name: 'AWS Solutions Architect',
                issuer: 'Amazon Web Services',
                year: '2023',
              },
              {
                name: 'Space Systems Engineering',
                issuer: 'NASA',
                year: '2022',
              },
              {
                name: 'Certified Kubernetes Admin',
                issuer: 'CNCF',
                year: '2023',
              },
              { name: 'Satellite Operations', issuer: 'ESA', year: '2021' },
              {
                name: 'React Expert Certificate',
                issuer: 'Meta',
                year: '2023',
              },
              {
                name: 'Mission Control Systems',
                issuer: 'SpaceX Academy',
                year: '2022',
              },
            ].map((cert, index) => (
              <div
                key={index}
                className='border-space-accent/20 hover:border-space-gold/50 rounded-lg border bg-white/5 p-3 transition-colors'
              >
                <h4 className='text-sm font-medium text-white'>{cert.name}</h4>
                <p className='text-xs text-white/60'>{cert.issuer}</p>
                <Badge
                  variant='outline'
                  className='bg-space-accent/20 text-space-accent border-space-accent/30 mt-2 text-xs'
                >
                  {cert.year}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
