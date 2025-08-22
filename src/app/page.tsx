import Hero from '@/components/sections/hero'
import About from '@/components/sections/about'
import Projects from '@/components/sections/projects'
import Skills from '@/components/sections/skills'
import Services from '@/components/sections/services'
import Contact from '@/components/sections/contact'

export default function Page() {
  return (
    <div className='min-h-screen'>
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Services />
      <Contact />
    </div>
  )
}
