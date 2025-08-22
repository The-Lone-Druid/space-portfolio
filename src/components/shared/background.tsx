'use client'

import { useEffect, useRef } from 'react'

const SpaceBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Stars array
    const stars: Array<{
      x: number
      y: number
      size: number
      opacity: number
      twinkleSpeed: number
    }> = []

    // Create stars
    const createStars = () => {
      const numStars = Math.floor((canvas.width * canvas.height) / 8000)
      stars.length = 0

      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random(),
          twinkleSpeed: Math.random() * 0.02 + 0.01,
        })
      }
    }

    createStars()

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw stars
      stars.forEach(star => {
        ctx.save()
        ctx.globalAlpha = star.opacity
        ctx.fillStyle = '#ffffff'
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()

        // Twinkling effect
        star.opacity += star.twinkleSpeed
        if (star.opacity > 1 || star.opacity < 0.1) {
          star.twinkleSpeed = -star.twinkleSpeed
        }
      })

      requestAnimationFrame(animate)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <>
      {/* Canvas for stars */}
      <canvas
        ref={canvasRef}
        className='pointer-events-none fixed inset-0 z-0'
        style={{
          background:
            'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #16213e 100%)',
        }}
      />

      {/* Additional cosmic elements */}
      <div className='pointer-events-none fixed inset-0'>
        {/* Floating particles */}
        <div className='animate-drift absolute top-1/4 left-1/4 h-2 w-2 rounded-full bg-purple-400 opacity-30'></div>
        <div
          className='animate-drift absolute top-3/4 right-1/4 h-1 w-1 rounded-full bg-blue-400 opacity-40'
          style={{ animationDelay: '5s' }}
        ></div>
        <div
          className='animate-drift absolute top-1/2 left-3/4 h-1.5 w-1.5 rounded-full bg-pink-400 opacity-25'
          style={{ animationDelay: '10s' }}
        ></div>

        {/* Cosmic glow effects */}
        <div className='animate-pulse-cosmic absolute top-10 right-10 h-32 w-32 rounded-full bg-purple-600 opacity-10 blur-3xl'></div>
        <div
          className='animate-pulse-cosmic absolute bottom-20 left-20 h-24 w-24 rounded-full bg-blue-600 opacity-10 blur-3xl'
          style={{ animationDelay: '3s' }}
        ></div>
      </div>
    </>
  )
}

export default SpaceBackground
