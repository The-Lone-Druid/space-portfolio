import Script from 'next/script'

interface StructuredDataProps {
  personalInfo: {
    name: string
    email: string
    location: string
    bio: string
    socialLinks: Array<{
      name: string
      url: string
    }>
  }
  skills: Array<{
    name: string
    category: string
    level: number
  }>
  projects: Array<{
    projectName: string
    projectDescription: string
    projectLink?: string | null
    githubLink?: string | null
    skillsUtilized: Array<{ name: string }>
    startDate?: Date | string | null
    endDate?: Date | string | null
  }>
}

export function StructuredData({
  personalInfo,
  skills,
  projects,
}: StructuredDataProps) {
  const baseUrl = 'https://zahidshaikh.space'

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: personalInfo.name,
    url: baseUrl,
    email: personalInfo.email,
    address: {
      '@type': 'Place',
      name: personalInfo.location,
    },
    description: personalInfo.bio,
    jobTitle: 'Full Stack Developer',
    knowsAbout: skills.map(skill => skill.name),
    sameAs: personalInfo.socialLinks.map(link => link.url),
    worksFor: {
      '@type': 'Organization',
      name: 'Freelance',
    },
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'Website',
    name: 'Zahid Shaikh - Full Stack Developer Portfolio',
    url: baseUrl,
    description:
      'Expert Full Stack Developer specializing in React, Next.js, TypeScript, and modern web technologies.',
    author: {
      '@type': 'Person',
      name: personalInfo.name,
    },
    inLanguage: 'en-US',
    copyrightYear: new Date().getFullYear(),
    copyrightHolder: {
      '@type': 'Person',
      name: personalInfo.name,
    },
  }

  const professionalServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Zahid Shaikh - Full Stack Development Services',
    url: baseUrl,
    description:
      'Professional web development services including React, Next.js, TypeScript, and full-stack application development.',
    provider: {
      '@type': 'Person',
      name: personalInfo.name,
    },
    areaServed: 'Worldwide',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Web Development Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Frontend Development',
            description: 'React, Next.js, TypeScript frontend development',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Backend Development',
            description: 'Node.js, API development, database design',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Full Stack Development',
            description: 'Complete web application development',
          },
        },
      ],
    },
  }

  const portfolioSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Zahid Shaikh Portfolio Projects',
    description:
      'A collection of web development projects showcasing expertise in modern technologies',
    itemListElement: projects.slice(0, 5).map((project, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'CreativeWork',
        name: project.projectName,
        description: project.projectDescription,
        url: project.projectLink || project.githubLink || undefined,
        author: {
          '@type': 'Person',
          name: personalInfo.name,
        },
        dateCreated: project.startDate || undefined,
        dateModified: project.endDate || undefined,
        keywords: project.skillsUtilized.map(skill => skill.name).join(', '),
      },
    })),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'About',
        item: `${baseUrl}/#about`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Skills',
        item: `${baseUrl}/#skills`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'Projects',
        item: `${baseUrl}/#projects`,
      },
      {
        '@type': 'ListItem',
        position: 5,
        name: 'Contact',
        item: `${baseUrl}/#contact`,
      },
    ],
  }

  return (
    <>
      <Script
        id='person-schema'
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema),
        }}
      />
      <Script
        id='website-schema'
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <Script
        id='professional-service-schema'
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(professionalServiceSchema),
        }}
      />
      <Script
        id='portfolio-schema'
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(portfolioSchema),
        }}
      />
      <Script
        id='breadcrumb-schema'
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
    </>
  )
}
