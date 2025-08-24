'use client'

import { Mail, MapPin, Rocket } from 'lucide-react'
import { getLucideIcon } from '../../lib/utils'
import { PersonalInfoWithSocials } from '../../types'

interface FooterProps {
  personalInfo: PersonalInfoWithSocials
}

const Footer = ({ personalInfo }: FooterProps) => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className='bg-space-deep relative z-10 border-t border-purple-500/20'>
      <div className='container mx-auto px-6 py-12'>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
          {/* Brand Section */}
          <div className='space-y-4'>
            <div className='flex items-center space-x-2'>
              <Rocket className='text-space-gold animate-float h-8 w-8' />
              <span className='text-xl font-bold text-white'>
                zahidshaikh<span className='text-space-gold'>.space</span>
              </span>
            </div>
            <p className='max-w-sm text-gray-200'>
              Building modern web experiences and crafting innovative solutions
              that drive business growth.
            </p>
            <div className='flex items-center space-x-2 text-gray-200'>
              <MapPin className='h-4 w-4' />
              <span>{personalInfo.location}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold text-white'>Navigation</h3>
            <div className='grid grid-cols-2 gap-2'>
              {[
                'Home',
                'About',
                'Projects',
                'Skills',
                'Services',
                'Contact',
              ].map(item => (
                <button
                  key={item}
                  onClick={() => {
                    const element = document.querySelector(
                      `#${item.toLowerCase()}`
                    )
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' })
                    }
                  }}
                  className='hover:text-space-gold text-left text-gray-200 transition-colors duration-300'
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Connect Section */}
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold text-white'>Connect</h3>
            <div className='flex space-x-4'>
              {personalInfo.socialLinks.map(social => {
                const IconComponent = getLucideIcon(social.name)
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='bg-space-cosmic hover:bg-space-stellar hover:text-space-gold flex h-10 w-10 items-center justify-center rounded-full text-gray-200 transition-all duration-300 hover:scale-110'
                    aria-label={`Visit my ${social.name} profile`}
                  >
                    <IconComponent className='h-5 w-5' />
                  </a>
                )
              })}
            </div>
            <div className='space-y-2'>
              <a
                href={`mailto:${personalInfo.email}`}
                className='hover:text-space-gold flex items-center space-x-2 text-gray-200 transition-colors duration-300'
                aria-label={`Send email to ${personalInfo.email}`}
              >
                <Mail className='h-4 w-4' />
                <span>{personalInfo.email}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className='mt-8 flex flex-col items-center justify-between border-t border-purple-500/20 pt-8 md:flex-row'>
          <p className='text-sm text-gray-400'>
            © {currentYear} Zahid Shaikh. All rights reserved. Built with
            passion ✨
          </p>
          <div className='mt-4 flex items-center space-x-4 md:mt-0'>
            <span className='text-sm text-gray-400'>Made with</span>
            <div className='flex items-center space-x-2'>
              <span className='text-red-500'>❤️</span>
              <span className='text-sm text-gray-400'>and</span>
              <span className='text-space-gold'>🚀</span>
            </div>
          </div>
        </div>
      </div>

      {/* Cosmic background effect */}
      <div className='via-space-gold absolute right-0 bottom-0 left-0 h-px bg-gradient-to-r from-transparent to-transparent opacity-50'></div>
    </footer>
  )
}

export default Footer
