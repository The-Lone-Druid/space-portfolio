import About from '@/components/sections/about'
import Contact from '@/components/sections/contact'
import Hero from '@/components/sections/hero'
import Projects from '@/components/sections/projects'
import Services from '@/components/sections/services'
import Skills from '@/components/sections/skills'
import { getPortfolioData } from '@/services/portfolio-data'
import { Toaster } from 'sonner'
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
            <h1 className='mb-4 text-2xl font-bold'>
              Portfolio Data Unavailable
            </h1>
            <p className='text-muted-foreground'>
              Something went wrong, try accessing the site later.
            </p>
          </div>
        </div>
        <Toaster />
      </>
    )
  }

  return (
    <>
      <SpaceBackground />
      <Header />
      <main id='main' role='main'>
        <Hero personalInfo={personalInfo} heroStats={heroStats} />
        <About heroStats={heroStats} />
        <Projects projects={projects} />
        <Skills skills={skills} />
        <Services services={services} />
        <Contact personalInfo={personalInfo} />
      </main>
      <Footer personalInfo={personalInfo} />
    </>
  )
}
