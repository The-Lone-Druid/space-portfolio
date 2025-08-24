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
