'use client'

import { useEffect, useState } from 'react'

const SpaceOrbital = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className='relative'>
      {/* Orbital Asteroid Ring System */}
      <div className='absolute inset-0 mx-auto h-64 w-64'>
        {/* Outer Asteroid Ring */}
        <div className='animate-spin-slow border-space-gold/50 absolute inset-0 rounded-full border-2 border-dashed'>
          {/* Large Asteroids */}
          <div className='absolute -top-3 left-1/2 h-6 w-6 -translate-x-1/2 animate-pulse rounded-full bg-gradient-to-r from-orange-500 to-red-600 shadow-xl ring-2 shadow-orange-500/70 ring-orange-400/30'></div>
          <div
            className='absolute top-1/2 -right-3 h-5 w-5 -translate-y-1/2 animate-pulse rounded-full bg-gradient-to-r from-blue-500 to-purple-600 shadow-xl ring-2 shadow-blue-500/70 ring-blue-400/30'
            style={{ animationDelay: '0.5s' }}
          ></div>
          <div
            className='absolute -bottom-3 left-1/2 h-4 w-4 -translate-x-1/2 animate-pulse rounded-full bg-gradient-to-r from-green-500 to-teal-600 shadow-xl ring-2 shadow-green-500/70 ring-green-400/30'
            style={{ animationDelay: '1s' }}
          ></div>
          <div
            className='absolute top-1/2 -left-3 h-3 w-3 -translate-y-1/2 animate-pulse rounded-full bg-gradient-to-r from-yellow-500 to-orange-600 shadow-xl ring-2 shadow-yellow-500/70 ring-yellow-400/30'
            style={{ animationDelay: '1.5s' }}
          ></div>
        </div>

        {/* Middle Asteroid Ring */}
        <div className='animate-spin-reverse absolute inset-6 rounded-full border border-dashed border-purple-400/40'>
          <div className='absolute -top-2 left-1/2 h-3 w-3 -translate-x-1/2 animate-pulse rounded-full bg-gradient-to-r from-pink-500 to-rose-600 shadow-lg shadow-pink-500/60'></div>
          <div
            className='absolute top-1/2 -right-2 h-3 w-3 -translate-y-1/2 animate-pulse rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/60'
            style={{ animationDelay: '0.7s' }}
          ></div>
          <div
            className='absolute -bottom-2 left-1/2 h-2 w-2 -translate-x-1/2 animate-pulse rounded-full bg-gradient-to-r from-violet-500 to-purple-600 shadow-lg shadow-violet-500/60'
            style={{ animationDelay: '1.3s' }}
          ></div>
          <div
            className='absolute top-1/2 -left-2 h-2 w-2 -translate-y-1/2 animate-pulse rounded-full bg-gradient-to-r from-indigo-500 to-blue-600 shadow-lg shadow-indigo-500/60'
            style={{ animationDelay: '1.8s' }}
          ></div>
        </div>

        {/* Inner Asteroid Ring */}
        <div className='animate-spin-slow border-space-gold/30 absolute inset-12 rounded-full border border-dotted'>
          <div className='absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 animate-pulse rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 shadow-md shadow-amber-500/50'></div>
          <div
            className='absolute top-1/2 -right-1 h-1 w-1 -translate-y-1/2 animate-pulse rounded-full bg-gradient-to-r from-emerald-400 to-green-500 shadow-md shadow-emerald-500/50'
            style={{ animationDelay: '0.9s' }}
          ></div>
          <div
            className='absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 animate-pulse rounded-full bg-gradient-to-r from-fuchsia-400 to-pink-500 shadow-md shadow-fuchsia-500/50'
            style={{ animationDelay: '1.7s' }}
          ></div>
        </div>
      </div>

      {/* Thrusting Rocket - Pointing 90deg up */}
      <div className='absolute -top-20 left-1/2 z-20 -translate-x-1/2 transform'>
        <div className='relative flex flex-col items-center'>
          {/* Rocket Body - Rotated to point up */}
          <div className='animate-bounce-subtle -rotate-315 transform text-5xl'>
            🚀
          </div>

          {/* Particle effects */}
          <div className='absolute top-12 left-1/2 -translate-x-1/2'>
            <div className='relative'>
              {/* Sparks */}
              <div
                className='absolute top-2 -left-2 h-1 w-1 animate-ping rounded-full bg-yellow-400'
                style={{ animationDelay: '0.5s' }}
              ></div>
              <div
                className='absolute top-1 left-2 h-1 w-1 animate-ping rounded-full bg-orange-400'
                style={{ animationDelay: '0.8s' }}
              ></div>
              <div
                className='absolute top-3 left-0 h-1 w-1 animate-ping rounded-full bg-red-400'
                style={{ animationDelay: '1.1s' }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Central Element */}
      <div className='bg-gradient-cosmic animate-pulse-cosmic glass-cosmic-clear border-space-gold/20 relative z-10 mx-auto flex h-64 w-64 items-center justify-center rounded-full border-2'>
        <div className='text-center'>
          <div className='mb-2 text-6xl'>🌟</div>
          <p className='text-lg font-semibold text-white'>Ready to Build</p>
        </div>
      </div>
    </div>
  )
}

export default SpaceOrbital
