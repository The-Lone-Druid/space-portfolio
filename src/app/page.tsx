import About from '@/components/sections/about'
import Contact from '@/components/sections/contact'
import Hero from '@/components/sections/hero'
import Projects from '@/components/sections/projects'
import Services from '@/components/sections/services'
import Skills from '@/components/sections/skills'
import { Toaster } from 'sonner'
import SpaceBackground from '../components/animations/background'
import Footer from '../components/shared/footer'
import Header from '../components/shared/header'
import {
  heroStats,
  personalInfo,
  projects,
  services,
  skills,
} from '../lib/data'

export default async function Page() {
  return (
    <>
      <SpaceBackground />
      <Header />
      <div>
        <Hero personalInfo={personalInfo} heroStats={heroStats} />
      </div>
      <div>
        <About heroStats={heroStats} />
      </div>
      <div>
        <Projects projects={projects} />
      </div>
      <div>
        <Skills skills={skills} />
      </div>
      <div>
        <Services services={services} />
      </div>
      <div>
        <Contact personalInfo={personalInfo} />
      </div>
      <Footer personalInfo={personalInfo} />
      <Toaster />
    </>
  )
}
