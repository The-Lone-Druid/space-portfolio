import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.warn('🌌 Starting Space Portfolio seeding...')

  if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
    console.error('Missing admin email or password')
    return
  }

  // Create admin user
  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 12)

  await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
      name: 'Zahid Shaikh',
      role: 'ADMIN',
    },
  })

  console.warn('✅ Admin user created')

  // Create Personal Info
  const personalInfo = await prisma.personalInfo.create({
    data: {
      name: 'Zahid Shaikh',
      title: 'Full Stack Developer & Tech Innovator',
      bio: 'I craft modern web experiences and build scalable applications that drive user satisfaction. With a passion for clean code and innovative solutions, I transform ideas into powerful digital products.',
      email: process.env.ADMIN_EMAIL,
      location: 'Pune, Maharashtra',
      resumeUrl: '#',
    },
  })

  console.warn('✅ Personal info created')

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

  await prisma.socialLink.createMany({
    data: socialLinks,
  })

  console.warn('✅ Social links created')

  // Create Hero Stats
  await prisma.hero.create({
    data: {
      verifiedSkills: 25,
      professionalProjects: 12,
      personalProjects: 16,
    },
  })

  console.warn('✅ Hero stats created')

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

  await prisma.service.createMany({ data: services })

  console.warn('✅ Services created')

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

  await prisma.siteSettings.createMany({
    data: settings,
  })

  console.warn('✅ Site settings created')

  console.warn('💯 Space Portfolio seeding completed successfully!')
}

main()
  .catch(e => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
