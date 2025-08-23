'use client'

import { useEffect, useState } from 'react'

interface UseSidebarReturn {
  isOpen: boolean
  isMobile: boolean
  toggle: () => void
  close: () => void
  open: () => void
}

export function useSidebar(): UseSidebarReturn {
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      if (!mobile && isOpen) {
        setIsOpen(false)
      }
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [isOpen])

  const toggle = () => setIsOpen(prev => !prev)
  const close = () => setIsOpen(false)
  const open = () => setIsOpen(true)

  return {
    isOpen,
    isMobile,
    toggle,
    close,
    open,
  }
}
