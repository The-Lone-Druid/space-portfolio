import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.warn('🌌 Starting Space Portfolio seeding...')

  // Create admin user
  const hashedPassword = await bcrypt.hash(
    process.env.ADMIN_PASSWORD || 'admin123',
    12
  )

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@spaceportfolio.com' },
    update: {},
    create: {
      email: 'admin@spaceportfolio.com',
      password: hashedPassword,
      name: 'Space Admin',
      role: 'ADMIN',
    },
  })

  console.warn('👤 Admin user created:', adminUser.email)

  // Create Personal Info
  const personalInfo = await prisma.personalInfo.upsert({
    where: { id: 'personal-info-1' },
    update: {},
    create: {
      id: 'personal-info-1',
      name: 'Zahid Shaikh',
      title: 'Full Stack Developer & Tech Innovator',
      bio: 'I craft modern web experiences and build scalable applications that drive user satisfaction. With a passion for clean code and innovative solutions, I transform ideas into powerful digital products.',
      email: 'reachtozahid@gmail.com',
      location: 'Pune, Maharashtra',
      resumeUrl: '#',
    },
  })

  console.warn('👨‍💻 Personal info created:', personalInfo.name)

  // Create Social Links for Personal Info
  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/The-Lone-Druid',
      icon: 'fab fa-github',
      order: 0,
      personalInfoId: personalInfo.id,
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/zahid-shaikh-7a4843178',
      icon: 'fab fa-linkedin',
      order: 1,
      personalInfoId: personalInfo.id,
    },
  ]

  for (const link of socialLinks) {
    await prisma.socialLink.upsert({
      where: { id: `social-${link.name.toLowerCase()}` },
      update: {},
      create: {
        id: `social-${link.name.toLowerCase()}`,
        ...link,
      },
    })
  }

  console.warn('🔗 Social links created')

  // Create Hero Stats
  const hero = await prisma.hero.upsert({
    where: { id: 'hero-stats-1' },
    update: {},
    create: {
      id: 'hero-stats-1',
      verifiedSkills: 25,
      professionalProjects: 12,
      personalProjects: 16,
    },
  })

  console.warn('🦸‍♂️ Hero stats created:', hero)

  // Create Services
  const services = [
    {
      name: 'Stellar Web Design',
      icon: 'fas fa-rocket',
      desc: 'I craft cosmic user experiences using cutting-edge design tools like Figma, creating prototypes that give clients a glimpse into their digital universe before launch.',
      order: 0,
    },
    {
      name: 'Code to Orbit Conversion',
      icon: 'fab fa-html5',
      desc: 'Transform your designs into responsive, pixel-perfect websites using modern web technologies. Your vision will be launched exactly as designed across all devices.',
      order: 1,
    },
    {
      name: 'Clean Cosmic Code',
      icon: 'fas fa-laptop-code',
      desc: 'Every line of code is written with stellar precision - 100% clean, valid, and maintainable. Built for scalability and easy understanding by future space travelers.',
      order: 2,
    },
    {
      name: 'Mission-Ready Customization',
      icon: 'fas fa-cogs',
      desc: 'Develop websites with modular architecture, making them easily customizable for evolving business needs and seamless feature integration.',
      order: 3,
    },
    {
      name: 'Multi-Device Exploration',
      icon: 'fas fa-mobile-alt',
      desc: 'Create responsive experiences that adapt perfectly across all devices - from mobile to desktop, ensuring your users can explore your digital space anywhere.',
      order: 4,
    },
    {
      name: 'Version Control Mission',
      icon: 'fab fa-github',
      desc: "Maintain your project's trajectory using advanced version control systems, ensuring smooth deployments and coordinated development across the team.",
      order: 5,
    },
  ]

  for (const service of services) {
    const existing = await prisma.service.findFirst({
      where: { name: service.name },
    })
    if (!existing) {
      await prisma.service.create({ data: service })
    }
  }

  console.warn('🛠️ Services created:', services.length)

  // Create some site settings
  const settings = [
    {
      key: 'site_title',
      value: 'Zahid Shaikh - Space Portfolio',
      description: 'Main site title',
      type: 'STRING' as const,
    },
    {
      key: 'site_description',
      value:
        'Full Stack Developer & Tech Innovator crafting stellar digital experiences',
      description: 'Site meta description',
      type: 'STRING' as const,
    },
    {
      key: 'contact_email',
      value: 'reachtozahid@gmail.com',
      description: 'Primary contact email',
      type: 'EMAIL' as const,
    },
  ]

  for (const setting of settings) {
    await prisma.siteSettings.upsert({
      where: { key: setting.key },
      update: {},
      create: setting,
    })
  }

  console.warn('⚙️ Site settings created:', settings.length)

  console.warn('✨ Space Portfolio seeding completed successfully!')
}

main()
  .catch(e => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
