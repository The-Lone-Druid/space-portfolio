import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // Create admin user
  const hashedPassword = await bcrypt.hash(
    process.env.ADMIN_PASSWORD || 'admin123',
    12
  )

  const adminUser = await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL || 'admin@spaceportfolio.com' },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || 'admin@spaceportfolio.com',
      password: hashedPassword,
      name: 'Space Portfolio Admin',
      role: 'ADMIN',
    },
  })

  console.log('👤 Created admin user:', adminUser.email)

  // Seed Hero Section
  const heroSection = await prisma.heroSection.upsert({
    where: { id: 'hero-main' },
    update: {},
    create: {
      id: 'hero-main',
      title: "Hi, I'm",
      subtitle: 'Zahid Shaikh',
      description:
        'A passionate full-stack developer crafting digital experiences that are out of this world. Welcome to my cosmic corner of the web!',
      ctaText: 'Explore My Universe',
      ctaLink: '#projects',
    },
  })

  console.log('🚀 Created hero section')

  // Seed About Section
  const aboutSection = await prisma.aboutSection.upsert({
    where: { id: 'about-main' },
    update: {},
    create: {
      id: 'about-main',
      title: 'About',
      subtitle: 'Me',
      description:
        "I'm a full-stack developer with a passion for creating innovative digital solutions. My journey in the cosmos of code has led me to master various technologies and frameworks, always striving to push the boundaries of what's possible.",
      highlights: [
        'Full-stack development expertise',
        'Modern web technologies',
        'Creative problem solving',
        'Continuous learning mindset',
      ],
    },
  })

  console.log('🧑‍🚀 Created about section')

  // Seed Skills
  const skills = [
    { name: 'React', category: 'FRONTEND' as const, level: 95, icon: 'react' },
    {
      name: 'Next.js',
      category: 'FRAMEWORKS' as const,
      level: 90,
      icon: 'nextjs',
    },
    {
      name: 'TypeScript',
      category: 'LANGUAGES' as const,
      level: 88,
      icon: 'typescript',
    },
    {
      name: 'Node.js',
      category: 'BACKEND' as const,
      level: 85,
      icon: 'nodejs',
    },
    {
      name: 'PostgreSQL',
      category: 'DATABASE' as const,
      level: 80,
      icon: 'postgresql',
    },
    { name: 'Prisma', category: 'TOOLS' as const, level: 85, icon: 'prisma' },
    {
      name: 'Tailwind CSS',
      category: 'FRONTEND' as const,
      level: 92,
      icon: 'tailwind',
    },
    { name: 'Docker', category: 'DEVOPS' as const, level: 75, icon: 'docker' },
  ]

  for (const [index, skill] of skills.entries()) {
    await prisma.skill.upsert({
      where: {
        id: `skill-${skill.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
      },
      update: {},
      create: {
        id: `skill-${skill.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
        ...skill,
        order: index,
      },
    })
  }

  console.log('🛠️ Created skills')

  // Seed Projects
  const projects = [
    {
      id: 'space-portfolio',
      title: 'Space Portfolio',
      description:
        'A cosmic-themed personal portfolio with advanced animations and responsive design.',
      shortDesc: 'Personal portfolio with space theme',
      category: 'WEBSITE' as const,
      status: 'COMPLETED' as const,
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
      features: [
        'Responsive Design',
        'Dark Theme',
        'Smooth Animations',
        'Contact Form',
      ],
      isFeatured: true,
      order: 1,
    },
    {
      id: 'ecommerce-platform',
      title: 'E-commerce Platform',
      description:
        'Full-stack e-commerce solution with modern UI and secure payment processing.',
      shortDesc: 'Modern e-commerce platform',
      category: 'WEB_APP' as const,
      status: 'COMPLETED' as const,
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
      features: [
        'Shopping Cart',
        'Payment Processing',
        'Admin Dashboard',
        'Order Management',
      ],
      isFeatured: true,
      order: 2,
    },
    {
      id: 'task-management',
      title: 'Task Management App',
      description:
        'Collaborative task management application with real-time updates.',
      shortDesc: 'Team collaboration tool',
      category: 'WEB_APP' as const,
      status: 'IN_PROGRESS' as const,
      technologies: ['Vue.js', 'Firebase', 'TypeScript'],
      features: [
        'Real-time Updates',
        'Team Collaboration',
        'File Sharing',
        'Notifications',
      ],
      isFeatured: false,
      order: 3,
    },
  ]

  for (const project of projects) {
    await prisma.project.upsert({
      where: { id: project.id },
      update: {},
      create: project,
    })
  }

  console.log('📂 Created projects')

  // Seed Services
  const services = [
    {
      id: 'web-development',
      title: 'Web Development',
      description:
        'Custom websites and web applications built with modern technologies.',
      features: [
        'Responsive Design',
        'SEO Optimization',
        'Performance Optimization',
        'Cross-browser Compatibility',
      ],
      icon: 'code',
      price: 'Starting at $2000',
      duration: '2-6 weeks',
      order: 1,
    },
    {
      id: 'fullstack-development',
      title: 'Full-Stack Development',
      description:
        'Complete web solutions from frontend to backend and database.',
      features: [
        'API Development',
        'Database Design',
        'User Authentication',
        'Admin Dashboards',
      ],
      icon: 'layers',
      price: 'Starting at $3500',
      duration: '4-12 weeks',
      order: 2,
    },
    {
      id: 'consulting',
      title: 'Technical Consulting',
      description:
        'Expert advice on technology choices, architecture, and best practices.',
      features: [
        'Technology Assessment',
        'Architecture Planning',
        'Code Review',
        'Performance Audit',
      ],
      icon: 'lightbulb',
      price: 'Starting at $150/hour',
      duration: 'Flexible',
      order: 3,
    },
  ]

  for (const service of services) {
    await prisma.service.upsert({
      where: { id: service.id },
      update: {},
      create: service,
    })
  }

  console.log('🛎️ Created services')

  // Seed Achievements
  const achievements = [
    {
      id: 'projects-completed',
      title: 'Projects Completed',
      description: 'Successfully delivered projects',
      value: '50+',
      icon: 'trophy',
      order: 1,
    },
    {
      id: 'client-satisfaction',
      title: 'Client Satisfaction',
      description: 'Happy clients and positive feedback',
      value: '99%',
      icon: 'star',
      order: 2,
    },
    {
      id: 'years-experience',
      title: 'Years Experience',
      description: 'Professional development experience',
      value: '5+',
      icon: 'calendar',
      order: 3,
    },
  ]

  for (const achievement of achievements) {
    await prisma.achievement.upsert({
      where: { id: achievement.id },
      update: {},
      create: achievement,
    })
  }

  console.log('🏆 Created achievements')

  // Seed Contact Methods
  const contactMethods = [
    {
      id: 'email',
      type: 'EMAIL' as const,
      label: 'Email',
      value: 'hello@zahidshaikh.dev',
      description: 'Send me an email',
      icon: 'mail',
      order: 1,
    },
    {
      id: 'phone',
      type: 'PHONE' as const,
      label: 'Phone',
      value: '+1 (555) 123-4567',
      description: 'Give me a call',
      icon: 'phone',
      order: 2,
    },
    {
      id: 'location',
      type: 'LOCATION' as const,
      label: 'Location',
      value: 'San Francisco, CA',
      description: 'Based in the Bay Area',
      icon: 'map-pin',
      order: 3,
    },
  ]

  for (const method of contactMethods) {
    await prisma.contactMethod.upsert({
      where: { id: method.id },
      update: {},
      create: method,
    })
  }

  console.log('📞 Created contact methods')

  // Seed Social Links
  const socialLinks = [
    {
      id: 'github',
      platform: 'GitHub',
      username: '@zahidshaikh',
      url: 'https://github.com/zahidshaikh',
      icon: 'github',
      followerCount: '1.2K followers',
      order: 1,
    },
    {
      id: 'linkedin',
      platform: 'LinkedIn',
      username: 'Zahid Shaikh',
      url: 'https://linkedin.com/in/zahidshaikh',
      icon: 'linkedin',
      followerCount: '500+ connections',
      order: 2,
    },
    {
      id: 'twitter',
      platform: 'Twitter',
      username: '@zahidshaikh',
      url: 'https://twitter.com/zahidshaikh',
      icon: 'twitter',
      followerCount: '800 followers',
      order: 3,
    },
  ]

  for (const social of socialLinks) {
    await prisma.socialLink.upsert({
      where: { id: social.id },
      update: {},
      create: social,
    })
  }

  console.log('🌐 Created social links')

  // Seed Site Settings
  const siteSettings = [
    {
      key: 'site_title',
      value: 'Zahid Shaikh - Full Stack Developer',
      description: 'Main site title for SEO',
      type: 'STRING' as const,
    },
    {
      key: 'site_description',
      value:
        'Full-stack developer creating innovative digital solutions with modern web technologies.',
      description: 'Site meta description',
      type: 'STRING' as const,
    },
    {
      key: 'maintenance_mode',
      value: 'false',
      description: 'Enable/disable maintenance mode',
      type: 'BOOLEAN' as const,
    },
    {
      key: 'analytics_id',
      value: 'GA-XXXXXXXXX',
      description: 'Google Analytics tracking ID',
      type: 'STRING' as const,
    },
  ]

  for (const setting of siteSettings) {
    await prisma.siteSettings.upsert({
      where: { key: setting.key },
      update: {},
      create: setting,
    })
  }

  console.log('⚙️ Created site settings')

  console.log('✅ Database seeding completed successfully!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error('❌ Error during seeding:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
