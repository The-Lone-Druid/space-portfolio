import About from '@/components/sections/about'
import Contact from '@/components/sections/contact'
import Hero from '@/components/sections/hero'
import Projects from '@/components/sections/projects'
import Services from '@/components/sections/services'
import Skills from '@/components/sections/skills'

export default function Page() {
  return (
    <div className='min-h-screen'>
      <div data-scroll-section>
        <Hero />
      </div>
      <div data-scroll-section>
        <About />
      </div>
      <div data-scroll-section>
        <Projects />
      </div>
      <div data-scroll-section>
        <Skills />
      </div>
      <div data-scroll-section>
        <Services />
      </div>
      <div data-scroll-section>
        <Contact />
      </div>
    </div>
  )
}
