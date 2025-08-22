'use client'

import { useEffect, useState } from 'react'

const SpaceLoader = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className='bg-space-deep fixed inset-0 z-50 flex items-center justify-center'>
      <div className='text-center'>
        {/* Animated Rocket */}
        <div className='relative mb-8'>
          <div className='animate-bounce text-8xl'>🚀</div>
          <div className='absolute -bottom-4 left-1/2 h-16 w-2 -translate-x-1/2 transform animate-pulse bg-gradient-to-t from-orange-400 to-red-500 opacity-70'></div>
        </div>

        {/* Loading Text */}
        <h2 className='mb-4 text-2xl font-bold text-white'>
          Loading <span className='text-space-gold'>Portfolio</span>
        </h2>

        {/* Loading Animation */}
        <div className='mb-6 flex justify-center space-x-2'>
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className='bg-space-gold h-3 w-3 animate-pulse rounded-full'
              style={{ animationDelay: `${i * 0.2}s` }}
            ></div>
          ))}
        </div>

        {/* Status Text */}
        <p className='text-sm text-gray-400'>Preparing your experience...</p>
      </div>

      {/* Background Stars */}
      <div className='pointer-events-none absolute inset-0'>
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className='animate-twinkle absolute h-1 w-1 rounded-full bg-white'
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>
    </div>
  )
}

export default SpaceLoader
