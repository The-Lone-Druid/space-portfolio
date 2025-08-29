import About from '@/components/sections/about'
import Contact from '@/components/sections/contact'
import Hero from '@/components/sections/hero'
import Projects from '@/components/sections/projects'
import Services from '@/components/sections/services'
import Skills from '@/components/sections/skills'
import { StructuredData } from '@/components/seo/structured-data'
import { getPortfolioData } from '@/services/portfolio-service'
import SpaceBackground from '../components/animations/background'
import Footer from '../components/shared/footer'
import Header from '../components/shared/header'

export default async function Page() {
  const { personalInfo, heroStats, skills, projects, services } =
    await getPortfolioData()

  // Handle missing data gracefully
  if (!personalInfo || !heroStats) {
    return (
      <>
        <SpaceBackground />
        <Header />
        <div className='flex min-h-screen items-center justify-center'>
          <div className='text-center'>
            <h1 className='text-primary mb-4 text-2xl font-bold'>
              Portfolio Data Unavailable
            </h1>
            <p className='text-muted-foreground'>
              Something went wrong, try accessing the site later.
            </p>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      {/* Structured Data for SEO */}
      <StructuredData
        personalInfo={personalInfo}
        skills={skills}
        projects={projects}
      />

      <SpaceBackground />
      <Header />
      <main id='main' role='main' className='overflow-x-hidden'>
        {/* Hero Section - Full height, no padding */}
        <section
          id='home'
          className='relative flex min-h-screen items-center justify-center pt-24'
          role='banner'
          aria-label='Hero section introducing Zahid Shaikh'
        >
          <div className='container mx-auto px-6'>
            <Hero personalInfo={personalInfo} heroStats={heroStats} />
          </div>
        </section>

        {/* About Section */}
        <section
          className='pt-24'
          id='about'
          aria-label='About Zahid Shaikh - Background and experience'
        >
          <div className='container mx-auto px-6'>
            <About heroStats={heroStats} />
          </div>
        </section>

        {/* Projects Section */}
        <section
          className='pt-24'
          id='projects'
          aria-label='Portfolio projects and work samples'
        >
          <div className='container mx-auto px-6'>
            <Projects projects={projects} />
          </div>
        </section>

        {/* Skills Section */}
        <section
          className='pt-24'
          id='skills'
          aria-label='Technical skills and expertise'
        >
          <div className='container mx-auto px-6'>
            <Skills skills={skills} />
          </div>
        </section>

        {/* Services Section */}
        <section
          className='pt-24'
          id='services'
          aria-label='Professional services offered'
        >
          <div className='container mx-auto px-6'>
            <Services services={services} />
          </div>
        </section>

        {/* Contact Section */}
        <section
          className='py-24'
          id='contact'
          aria-label='Contact information and form'
        >
          <div className='container mx-auto px-6'>
            <Contact personalInfo={personalInfo} />
          </div>
        </section>
      </main>
      <Footer personalInfo={personalInfo} />
    </>
  )
}
