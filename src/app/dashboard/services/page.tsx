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
import { Brain, Code, Globe, Plus, Rocket, Satellite, Zap } from 'lucide-react'

export default async function ServicesPage() {
  const services = [
    {
      title: 'Space Mission Planning',
      description:
        'Complete mission architecture and trajectory optimization for space exploration projects.',
      icon: Rocket,
      status: 'active',
      clients: 12,
      price: '$50,000',
      features: [
        'Trajectory Analysis',
        'Risk Assessment',
        'Resource Planning',
        'Mission Timeline',
      ],
    },
    {
      title: 'Full-Stack Development',
      description:
        'Modern web applications with React, Next.js, and cutting-edge technologies.',
      icon: Code,
      status: 'active',
      clients: 28,
      price: '$25,000',
      features: [
        'React/Next.js',
        'TypeScript',
        'Database Design',
        'API Development',
      ],
    },
    {
      title: 'Satellite Systems Engineering',
      description:
        'Design and optimization of satellite communication and control systems.',
      icon: Satellite,
      status: 'active',
      clients: 8,
      price: '$75,000',
      features: [
        'System Architecture',
        'Communication Protocols',
        'Ground Control',
        'Data Processing',
      ],
    },
    {
      title: 'AI & Machine Learning',
      description:
        'Intelligent systems for space data analysis and autonomous mission control.',
      icon: Brain,
      status: 'featured',
      clients: 15,
      price: '$40,000',
      features: [
        'Deep Learning',
        'Computer Vision',
        'Predictive Analytics',
        'Autonomous Systems',
      ],
    },
    {
      title: 'Space Data Visualization',
      description:
        'Interactive 3D visualizations for space missions and astronomical data.',
      icon: Globe,
      status: 'active',
      clients: 22,
      price: '$18,000',
      features: [
        '3D Rendering',
        'Real-time Data',
        'Interactive Maps',
        'Custom Dashboards',
      ],
    },
    {
      title: 'Performance Optimization',
      description:
        'High-performance computing solutions for space simulation and modeling.',
      icon: Zap,
      status: 'active',
      clients: 10,
      price: '$30,000',
      features: [
        'Code Optimization',
        'Parallel Computing',
        'Memory Management',
        'Scalability',
      ],
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'featured':
        return 'bg-space-gold/20 text-space-gold border-space-gold/30'
      case 'active':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <DashboardPageHeader
        title='Services & Solutions'
        description='Manage your space technology services and client offerings across the cosmos.'
        actions={
          <Button className='bg-space-accent hover:bg-space-accent/80 text-white'>
            <Plus className='mr-2 h-4 w-4' />
            Add Service
          </Button>
        }
      />

      {/* Services Grid */}
      <div className='grid gap-6 lg:grid-cols-2 xl:grid-cols-3'>
        {services.map((service, index) => (
          <Card
            key={index}
            className='glass-nebula border-space-accent/30 hover:border-space-gold/50 transition-all duration-300'
          >
            <CardHeader>
              <div className='flex items-start justify-between'>
                <div className='flex items-center space-x-3'>
                  <div className='bg-space-accent/20 rounded-lg p-2'>
                    <service.icon className='text-space-gold h-5 w-5' />
                  </div>
                  <div>
                    <CardTitle className='text-lg text-white'>
                      {service.title}
                    </CardTitle>
                    <div className='mt-1 flex items-center space-x-2'>
                      <Badge
                        variant='secondary'
                        className={getStatusColor(service.status)}
                      >
                        {service.status}
                      </Badge>
                      <span className='text-sm text-white/60'>
                        {service.clients} clients
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <CardDescription className='mt-2 text-white/70'>
                {service.description}
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-2'>
                <h4 className='text-sm font-medium text-white'>
                  Key Features:
                </h4>
                <div className='flex flex-wrap gap-1'>
                  {service.features.map((feature, featureIndex) => (
                    <Badge
                      key={featureIndex}
                      variant='outline'
                      className='border-white/20 bg-white/5 text-xs text-white/80'
                    >
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className='flex items-center justify-between border-t border-white/10 pt-2'>
                <span className='text-space-gold text-lg font-semibold'>
                  {service.price}
                </span>
                <Button
                  size='sm'
                  variant='outline'
                  className='border-space-accent/50 text-space-accent hover:bg-space-accent/20'
                >
                  Edit Service
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Service Analytics */}
      <div className='grid gap-6 lg:grid-cols-3'>
        <Card className='glass-nebula border-space-accent/30'>
          <CardHeader>
            <CardTitle className='text-lg text-white'>Total Revenue</CardTitle>
            <CardDescription className='text-white/70'>
              Monthly recurring revenue from all services
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='text-space-gold text-3xl font-bold'>$127,500</div>
            <div className='mt-1 text-sm text-green-400'>
              +12.5% from last month
            </div>
          </CardContent>
        </Card>

        <Card className='glass-nebula border-space-accent/30'>
          <CardHeader>
            <CardTitle className='text-lg text-white'>Active Clients</CardTitle>
            <CardDescription className='text-white/70'>
              Currently engaged service contracts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='text-space-gold text-3xl font-bold'>95</div>
            <div className='mt-1 text-sm text-green-400'>+8 new this month</div>
          </CardContent>
        </Card>

        <Card className='glass-nebula border-space-accent/30'>
          <CardHeader>
            <CardTitle className='text-lg text-white'>Service Rating</CardTitle>
            <CardDescription className='text-white/70'>
              Average client satisfaction score
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='text-space-gold text-3xl font-bold'>4.9</div>
            <div className='mt-1 text-sm text-white/60'>out of 5.0 stars</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
