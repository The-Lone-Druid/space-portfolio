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
      location: 'Mumbai, Maharashtra',
      resumeUrl: '#',
    },
  })

  console.warn('👨‍💻 Personal info created:', personalInfo.name)

  // Create Social Links for Personal Info
  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/zahidshaikh',
      icon: 'fab fa-github',
      order: 0,
      personalInfoId: personalInfo.id,
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/zahidshaikh',
      icon: 'fab fa-linkedin',
      order: 1,
      personalInfoId: personalInfo.id,
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/zahidshaikh',
      icon: 'fab fa-twitter',
      order: 2,
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

  // Create Skills
  const skills = [
    { id: 1, name: 'HTML', category: 'Frontend', order: 0 },
    { id: 2, name: 'CSS', category: 'Frontend', order: 1 },
    { id: 3, name: 'SCSS', category: 'Frontend', order: 2 },
    { id: 4, name: 'JavaScript', category: 'Frontend', order: 3 },
    { id: 5, name: 'TypeScript', category: 'Frontend', order: 4 },
    { id: 6, name: 'React', category: 'Frontend', order: 5 },
    { id: 7, name: 'Next.js', category: 'Frontend', order: 6 },
    { id: 8, name: 'Angular', category: 'Frontend', order: 7 },
    { id: 9, name: 'React Native', category: 'Mobile', order: 8 },
    { id: 10, name: 'Ionic', category: 'Mobile', order: 9 },
    { id: 11, name: 'Capacitor.js', category: 'Mobile', order: 10 },
    { id: 12, name: 'Node.js', category: 'Backend', order: 11 },
    { id: 13, name: 'Firebase', category: 'Backend', order: 12 },
    { id: 14, name: 'REST API', category: 'Backend', order: 13 },
    { id: 15, name: 'WordPress', category: 'CMS', order: 14 },
    { id: 16, name: 'Figma', category: 'Design', order: 15 },
    { id: 17, name: 'Git', category: 'Tools', order: 16 },
    { id: 18, name: 'GitHub', category: 'Tools', order: 17 },
    { id: 19, name: 'Tailwind CSS', category: 'Frontend', order: 18 },
    { id: 20, name: 'Material UI', category: 'Frontend', order: 19 },
    { id: 21, name: 'Bootstrap', category: 'Frontend', order: 20 },
    { id: 22, name: 'Responsive Design', category: 'Frontend', order: 21 },
    { id: 23, name: 'jQuery', category: 'Frontend', order: 22 },
    { id: 24, name: 'Webpack', category: 'Tools', order: 23 },
    { id: 25, name: 'Vite', category: 'Tools', order: 24 },
  ]

  for (const skill of skills) {
    await prisma.skill.upsert({
      where: { id: skill.id },
      update: {},
      create: skill,
    })
  }

  console.warn('🚀 Skills created:', skills.length)

  // Create Projects with related data
  const projects = [
    {
      id: 1,
      projectName: 'Cosmic Portfolio',
      startDate: new Date('2025-08-01'),
      endDate: null,
      isOngoing: true,
      projectDescription:
        'A stellar portfolio website built with Next.js 15, featuring space-themed animations and modern web technologies. Showcases projects in a cosmic interface with smooth animations.',
      projectLink: 'https://zahidshaikh.space/',
      githubLink: 'https://github.com/zahidshaikh/cosmic-portfolio',
      featured: true,
      order: 0,
      tasks: [
        {
          task: 'Designed and implemented space-themed UI components',
          order: 0,
        },
        { task: 'Built responsive layouts with Tailwind CSS', order: 1 },
        { task: 'Integrated smooth animations with Framer Motion', order: 2 },
        { task: 'Optimized performance and SEO', order: 3 },
      ],
      skillsUtilized: [
        { name: 'Next.js', order: 0 },
        { name: 'TypeScript', order: 1 },
        { name: 'Tailwind CSS', order: 2 },
        { name: 'Framer Motion', order: 3 },
        { name: 'React', order: 4 },
      ],
    },
    {
      id: 2,
      projectName: 'Spotfinder',
      startDate: new Date('2022-04-01'),
      endDate: new Date('2022-10-31'),
      isOngoing: false,
      projectDescription:
        'A revolutionary parking solution platform where users can book car parking spaces through mobile app and web interface with real-time availability.',
      projectLink: 'https://spotfinder.app/',
      githubLink: null,
      featured: true,
      order: 1,
      tasks: [
        {
          task: 'Converting Design Systems into reusable CSS and Components',
          order: 0,
        },
        { task: 'Making complex responsive layouts', order: 1 },
        { task: 'Developing and maintaining user interfaces', order: 2 },
        { task: 'Optimization, Performance and UX Improvement', order: 3 },
        { task: 'Integrating APIs and RESTful Services', order: 4 },
      ],
      skillsUtilized: [
        { name: 'HTML', order: 0 },
        { name: 'SCSS', order: 1 },
        { name: 'JavaScript', order: 2 },
        { name: 'React', order: 3 },
        { name: 'React Native', order: 4 },
        { name: 'TypeScript', order: 5 },
      ],
    },
    {
      id: 3,
      projectName: 'Neev Healthcare',
      startDate: new Date('2021-02-01'),
      endDate: new Date('2022-04-30'),
      isOngoing: false,
      projectDescription:
        'A comprehensive healthcare platform enabling users to book yoga classes, purchase health products, and access wellness services in one unified ecosystem.',
      projectLink: null,
      githubLink: null,
      featured: false,
      order: 2,
      tasks: [
        {
          task: 'Converting Design Systems into reusable components',
          order: 0,
        },
        { task: 'Building responsive healthcare interfaces', order: 1 },
        { task: 'Implementing booking and payment systems', order: 2 },
        { task: 'Optimizing user experience for wellness services', order: 3 },
      ],
      skillsUtilized: [
        { name: 'React', order: 0 },
        { name: 'Node.js', order: 1 },
        { name: 'CSS', order: 2 },
        { name: 'JavaScript', order: 3 },
        { name: 'REST API', order: 4 },
      ],
    },
  ]

  for (const project of projects) {
    const createdProject = await prisma.project.upsert({
      where: { id: project.id },
      update: {},
      create: {
        id: project.id,
        projectName: project.projectName,
        startDate: project.startDate,
        endDate: project.endDate,
        isOngoing: project.isOngoing,
        projectDescription: project.projectDescription,
        projectLink: project.projectLink,
        githubLink: project.githubLink,
        featured: project.featured,
        order: project.order,
      },
    })

    // Create project tasks
    for (const task of project.tasks) {
      await prisma.projectTask.upsert({
        where: { id: project.id * 100 + task.order }, // Unique ID generation
        update: {},
        create: {
          id: project.id * 100 + task.order,
          task: task.task,
          order: task.order,
          projectId: createdProject.id,
        },
      })
    }

    // Create project skills
    for (const skill of project.skillsUtilized) {
      await prisma.projectSkill.upsert({
        where: { id: project.id * 200 + skill.order }, // Unique ID generation
        update: {},
        create: {
          id: project.id * 200 + skill.order,
          name: skill.name,
          order: skill.order,
          projectId: createdProject.id,
        },
      })
    }
  }

  console.warn('📦 Projects created with tasks and skills:', projects.length)

  // Create Services
  const services = [
    {
      id: 1,
      name: 'Stellar Web Design',
      icon: 'fas fa-rocket',
      desc: 'I craft cosmic user experiences using cutting-edge design tools like Figma, creating prototypes that give clients a glimpse into their digital universe before launch.',
      order: 0,
    },
    {
      id: 2,
      name: 'Code to Orbit Conversion',
      icon: 'fab fa-html5',
      desc: 'Transform your designs into responsive, pixel-perfect websites using modern web technologies. Your vision will be launched exactly as designed across all devices.',
      order: 1,
    },
    {
      id: 3,
      name: 'Clean Cosmic Code',
      icon: 'fas fa-laptop-code',
      desc: 'Every line of code is written with stellar precision - 100% clean, valid, and maintainable. Built for scalability and easy understanding by future space travelers.',
      order: 2,
    },
    {
      id: 4,
      name: 'Mission-Ready Customization',
      icon: 'fas fa-cogs',
      desc: 'Develop websites with modular architecture, making them easily customizable for evolving business needs and seamless feature integration.',
      order: 3,
    },
    {
      id: 5,
      name: 'Multi-Device Exploration',
      icon: 'fas fa-mobile-alt',
      desc: 'Create responsive experiences that adapt perfectly across all devices - from mobile to desktop, ensuring your users can explore your digital space anywhere.',
      order: 4,
    },
    {
      id: 6,
      name: 'Version Control Mission',
      icon: 'fab fa-github',
      desc: "Maintain your project's trajectory using advanced version control systems, ensuring smooth deployments and coordinated development across the team.",
      order: 5,
    },
  ]

  for (const service of services) {
    await prisma.service.upsert({
      where: { id: service.id },
      update: {},
      create: service,
    })
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
