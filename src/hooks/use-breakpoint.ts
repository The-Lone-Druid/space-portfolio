'use client'

import { useEffect, useState } from 'react'

type Breakpoint = 'mobile' | 'tablet' | 'desktop'

interface UseBreakpointReturn {
  breakpoint: Breakpoint
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
}

export function useBreakpoint(): UseBreakpointReturn {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('desktop')

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth
      if (width < 768) {
        setBreakpoint('mobile')
      } else if (width < 1024) {
        setBreakpoint('tablet')
      } else {
        setBreakpoint('desktop')
      }
    }

    updateBreakpoint()
    window.addEventListener('resize', updateBreakpoint)
    return () => window.removeEventListener('resize', updateBreakpoint)
  }, [])

  return {
    breakpoint,
    isMobile: breakpoint === 'mobile',
    isTablet: breakpoint === 'tablet',
    isDesktop: breakpoint === 'desktop',
  }
}
