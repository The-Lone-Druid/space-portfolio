import About from '@/components/sections/about'
import Contact from '@/components/sections/contact'
import Hero from '@/components/sections/hero'
import Projects from '@/components/sections/projects'
import Services from '@/components/sections/services'
import Skills from '@/components/sections/skills'
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
      <SpaceBackground />
      <Header />
      <main id='main' role='main'>
        {/* Hero Section - Full height, no padding */}
        <section
          id='home'
          className='relative flex min-h-screen items-center justify-center pt-20'
        >
          <div className='container mx-auto px-6'>
            <Hero personalInfo={personalInfo} heroStats={heroStats} />
          </div>
        </section>

        {/* About Section */}
        <section id='about' className='py-20'>
          <div className='container mx-auto px-6'>
            <About heroStats={heroStats} />
          </div>
        </section>

        {/* Projects Section */}
        <section id='projects' className='py-20'>
          <div className='container mx-auto px-6'>
            <Projects projects={projects} />
          </div>
        </section>

        {/* Skills Section */}
        <section id='skills' className='py-20'>
          <div className='container mx-auto px-6'>
            <Skills skills={skills} />
          </div>
        </section>

        {/* Services Section */}
        <section id='services' className='py-20'>
          <div className='container mx-auto px-6'>
            <Services services={services} />
          </div>
        </section>

        {/* Contact Section */}
        <section id='contact' className='py-20'>
          <div className='container mx-auto px-6'>
            <Contact personalInfo={personalInfo} />
          </div>
        </section>
      </main>
      <Footer personalInfo={personalInfo} />
    </>
  )
}
