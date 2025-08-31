import React from 'react'
import { getSimpleIconData } from '@/lib/simple-icons'

interface SimpleIconProps {
  iconName: string
  className?: string
  fallback?: React.ReactNode
}

export function SimpleIcon({ iconName, className, fallback }: SimpleIconProps) {
  const iconData = getSimpleIconData(iconName)

  if (!iconData) {
    return fallback ? <>{fallback}</> : null
  }

  return (
    <svg
      role='img'
      viewBox='0 0 24 24'
      className={className}
      fill={`#${iconData.hex}`}
      aria-label={iconData.title}
    >
      <path d={iconData.path} />
    </svg>
  )
}
