'use client'

import { Button } from '@/components/ui/button'
import { Menu, Rocket, X } from 'lucide-react'
import { useEffect, useState } from 'react'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigationItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' },
  ]

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-space-deep/90 border-b border-purple-500/20 backdrop-blur-lg'
          : 'bg-transparent'
      }`}
    >
      <nav className='container mx-auto px-6 py-4'>
        <div className='flex items-center justify-between'>
          {/* Logo */}
          <div className='flex items-center space-x-2'>
            <Rocket className='text-space-gold animate-float h-8 w-8' />
            <span className='text-xl font-bold text-white'>
              zahidshaikh<span className='text-space-gold'>.space</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className='hidden items-center space-x-8 md:flex'>
            {navigationItems.map(item => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className='hover:text-space-gold group relative text-gray-300 transition-colors duration-300'
              >
                {item.name}
                <span className='bg-space-gold absolute -bottom-1 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full'></span>
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <div className='hidden md:block'>
            <Button
              variant='cosmic'
              onClick={() => scrollToSection('#contact')}
              className='relative'
            >
              Get In Touch
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className='text-white md:hidden'
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className='h-6 w-6' />
            ) : (
              <Menu className='h-6 w-6' />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className='mt-4 pb-4 md:hidden'>
            <div className='bg-space-cosmic/95 flex flex-col space-y-4 rounded-lg p-6 backdrop-blur-lg'>
              {navigationItems.map(item => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className='hover:text-space-gold text-left text-gray-300 transition-colors duration-300'
                >
                  {item.name}
                </button>
              ))}
              <Button
                variant='cosmic'
                onClick={() => scrollToSection('#contact')}
                className='mt-4'
              >
                Get In Touch
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header
