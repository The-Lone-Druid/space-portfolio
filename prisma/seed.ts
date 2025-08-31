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
  const existingPersonalInfo = await prisma.personalInfo.findFirst({
    where: { email: process.env.ADMIN_EMAIL },
  })

  const personalInfo = existingPersonalInfo
    ? await prisma.personalInfo.update({
        where: { id: existingPersonalInfo.id },
        data: {
          name: 'Zahid Shaikh',
          title: 'Full Stack Developer & Tech Innovator',
          bio: 'I craft modern web experiences and build scalable applications that drive user satisfaction. With a passion for clean code and innovative solutions, I transform ideas into powerful digital products.',
          location: 'Pune, Maharashtra',
          resumeUrl: '#',
        },
      })
    : await prisma.personalInfo.create({
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

  for (const linkData of socialLinks) {
    const existingLink = await prisma.socialLink.findFirst({
      where: {
        personalInfoId: personalInfo.id,
        name: linkData.name,
      },
    })

    if (existingLink) {
      await prisma.socialLink.update({
        where: { id: existingLink.id },
        data: {
          url: linkData.url,
          icon: linkData.icon,
          order: linkData.order,
        },
      })
    } else {
      await prisma.socialLink.create({
        data: linkData,
      })
    }
  }

  console.warn('✅ Social links created')

  // Create Hero Stats
  const existingHero = await prisma.hero.findFirst()
  if (!existingHero) {
    await prisma.hero.create({
      data: {
        verifiedSkills: 25,
        professionalProjects: 12,
        personalProjects: 16,
        yearsOfExperience: 5,
      },
    })
  } else {
    await prisma.hero.update({
      where: { id: existingHero.id },
      data: {
        verifiedSkills: 25,
        professionalProjects: 12,
        personalProjects: 16,
        yearsOfExperience: 5,
      },
    })
  }

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

  for (const serviceData of services) {
    const existingService = await prisma.service.findFirst({
      where: { name: serviceData.name },
    })

    if (existingService) {
      await prisma.service.update({
        where: { id: existingService.id },
        data: {
          icon: serviceData.icon,
          desc: serviceData.desc,
          order: serviceData.order,
        },
      })
    } else {
      await prisma.service.create({
        data: serviceData,
      })
    }
  }

  console.warn('✅ Services created')

  // Create skills
  const skills = [
    // Frontend Technologies
    {
      name: 'HTML5',
      iconName: 'html5',
      category: 'Frontend',
      level: 100,
      order: 0,
      isActive: true,
    },
    {
      name: 'CSS3',
      iconName: 'css',
      category: 'Frontend',
      level: 100,
      order: 1,
      isActive: true,
    },
    {
      name: 'JavaScript',
      iconName: 'javascript',
      category: 'Frontend',
      level: 100,
      order: 2,
      isActive: true,
    },
    {
      name: 'TypeScript',
      iconName: 'typescript',
      category: 'Frontend',
      level: 100,
      order: 3,
      isActive: true,
    },
    {
      name: 'React',
      iconName: 'react',
      category: 'Frontend',
      level: 100,
      order: 4,
      isActive: true,
    },
    {
      name: 'Next.js',
      iconName: 'nextdotjs',
      category: 'Frontend',
      level: 95,
      order: 5,
      isActive: true,
    },
    {
      name: 'Vue.js',
      iconName: 'vuedotjs',
      category: 'Frontend',
      level: 85,
      order: 6,
      isActive: true,
    },
    {
      name: 'Angular',
      iconName: 'angular',
      category: 'Frontend',
      level: 90,
      order: 7,
      isActive: true,
    },
    {
      name: 'Tailwind CSS',
      iconName: 'tailwindcss',
      category: 'Frontend',
      level: 95,
      order: 8,
      isActive: true,
    },
    {
      name: 'Sass/SCSS',
      iconName: 'sass',
      category: 'Frontend',
      level: 90,
      order: 9,
      isActive: true,
    },

    // Backend Technologies
    {
      name: 'Node.js',
      iconName: 'nodedotjs',
      category: 'Backend',
      level: 95,
      order: 0,
      isActive: true,
    },
    {
      name: 'Express.js',
      iconName: 'express',
      category: 'Backend',
      level: 95,
      order: 1,
      isActive: true,
    },
    {
      name: 'Python',
      iconName: 'python',
      category: 'Backend',
      level: 85,
      order: 2,
      isActive: true,
    },
    {
      name: 'Flask',
      iconName: 'flask',
      category: 'Backend',
      level: 80,
      order: 3,
      isActive: true,
    },
    {
      name: 'FastAPI',
      iconName: 'fastapi',
      category: 'Backend',
      level: 75,
      order: 4,
      isActive: true,
    },
    {
      name: 'GraphQL',
      iconName: 'graphql',
      category: 'Backend',
      level: 80,
      order: 5,
      isActive: true,
    },
    {
      name: 'REST APIs',
      iconName: 'api',
      category: 'Backend',
      level: 100,
      order: 6,
      isActive: true,
    },

    // Databases
    {
      name: 'PostgreSQL',
      iconName: 'postgresql',
      category: 'Database',
      level: 90,
      order: 0,
      isActive: true,
    },
    {
      name: 'MongoDB',
      iconName: 'mongodb',
      category: 'Database',
      level: 85,
      order: 1,
      isActive: true,
    },
    {
      name: 'MySQL',
      iconName: 'mysql',
      category: 'Database',
      level: 80,
      order: 2,
      isActive: true,
    },
    {
      name: 'Redis',
      iconName: 'redis',
      category: 'Database',
      level: 75,
      order: 3,
      isActive: true,
    },
    {
      name: 'Prisma ORM',
      iconName: 'prisma',
      category: 'Database',
      level: 90,
      order: 4,
      isActive: true,
    },

    // DevOps & Tools
    {
      name: 'Git',
      iconName: 'git',
      category: 'DevOps',
      level: 95,
      order: 0,
      isActive: true,
    },
    {
      name: 'GitHub',
      iconName: 'github',
      category: 'DevOps',
      level: 95,
      order: 1,
      isActive: true,
    },
    {
      name: 'Bitbucket',
      iconName: 'bitbucket',
      category: 'DevOps',
      level: 85,
      order: 2,
      isActive: true,
    },
    {
      name: 'Docker',
      iconName: 'docker',
      category: 'DevOps',
      level: 80,
      order: 3,
      isActive: true,
    },
    {
      name: 'AWS',
      iconName: 'aws',
      category: 'DevOps',
      level: 75,
      order: 4,
      isActive: true,
    },
    {
      name: 'Vercel',
      iconName: 'vercel',
      category: 'DevOps',
      level: 90,
      order: 5,
      isActive: true,
    },
    {
      name: 'Netlify',
      iconName: 'netlify',
      category: 'DevOps',
      level: 85,
      order: 6,
      isActive: true,
    },
    {
      name: 'CI/CD',
      iconName: 'cicd',
      category: 'DevOps',
      level: 80,
      order: 7,
      isActive: true,
    },

    // Mobile Development
    {
      name: 'React Native',
      iconName: 'react',
      category: 'Mobile',
      level: 90,
      order: 0,
      isActive: true,
    },
    {
      name: 'Ionic Framework',
      iconName: 'ionic',
      category: 'Mobile',
      level: 85,
      order: 1,
      isActive: true,
    },
    {
      name: 'Capacitor.js',
      iconName: 'capacitor',
      category: 'Mobile',
      level: 80,
      order: 2,
      isActive: true,
    },
    {
      name: 'Expo',
      iconName: 'expo',
      category: 'Mobile',
      level: 85,
      order: 3,
      isActive: true,
    },

    // Desktop Development
    {
      name: 'Electron',
      iconName: 'electron',
      category: 'Desktop',
      level: 80,
      order: 0,
      isActive: true,
    },

    // Testing
    {
      name: 'Jest',
      iconName: 'jest',
      category: 'Testing',
      level: 80,
      order: 0,
      isActive: true,
    },
    {
      name: 'Cypress',
      iconName: 'cypress',
      category: 'Testing',
      level: 75,
      order: 1,
      isActive: true,
    },
    {
      name: 'Playwright',
      iconName: 'playwright',
      category: 'Testing',
      level: 70,
      order: 2,
      isActive: true,
    },

    // Other Tools
    {
      name: 'Webpack',
      iconName: 'webpack',
      category: 'Tools',
      level: 85,
      order: 0,
      isActive: true,
    },
    {
      name: 'Vite',
      iconName: 'vite',
      category: 'Tools',
      level: 90,
      order: 1,
      isActive: true,
    },
    {
      name: 'ESLint',
      iconName: 'eslint',
      category: 'Tools',
      level: 90,
      order: 2,
      isActive: true,
    },
    {
      name: 'Prettier',
      iconName: 'prettier',
      category: 'Tools',
      level: 95,
      order: 3,
      isActive: true,
    },
    {
      name: 'VS Code',
      iconName: 'vscode',
      category: 'Tools',
      level: 100,
      order: 4,
      isActive: true,
    },
    {
      name: 'Figma',
      iconName: 'figma',
      category: 'Design',
      level: 85,
      order: 0,
      isActive: true,
    },
  ]

  // Create skills with upsert logic
  for (const skillData of skills) {
    const existingSkill = await prisma.skill.findFirst({
      where: { name: skillData.name },
    })

    if (existingSkill) {
      await prisma.skill.update({
        where: { id: existingSkill.id },
        data: {
          iconName: skillData.iconName,
          category: skillData.category,
          level: skillData.level,
          order: skillData.order,
          isActive: skillData.isActive,
        },
      })
    } else {
      await prisma.skill.create({
        data: skillData,
      })
    }
  }

  console.warn('✅ Skills created')

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

  for (const settingData of settings) {
    await prisma.siteSettings.upsert({
      where: { key: settingData.key },
      update: {
        value: settingData.value,
        description: settingData.description,
        type: settingData.type,
      },
      create: settingData,
    })
  }

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
