'use client'

import { useEffect, useRef, useState } from 'react'

const SpaceBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

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

    // Asteroid showers array
    const asteroids: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
      color: string
      glowSize: number
      trail: Array<{ x: number; y: number; opacity: number }>
    }> = []

    // Create stars - reduced number for better performance
    const createStars = () => {
      const numStars = Math.floor((canvas.width * canvas.height) / 12000) // Reduced from 8000
      stars.length = 0

      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.5, // Smaller stars
          opacity: Math.random() * 0.8 + 0.2, // More visible range
          twinkleSpeed: Math.random() * 0.015 + 0.005, // Slower animation
        })
      }
    }

    createStars()

    // Create asteroid showers
    const createAsteroid = () => {
      const colors = ['#ffffff', '#ffffcc', '#fff700', '#ffd700', '#f0f0f0']
      const side = Math.floor(Math.random() * 4) // 0=top, 1=right, 2=bottom, 3=left

      let x, y, vx, vy

      switch (side) {
        case 0: // From top
          x = Math.random() * canvas.width
          y = -10
          vx = (Math.random() - 0.5) * 4
          vy = Math.random() * 3 + 2
          break
        case 1: // From right
          x = canvas.width + 10
          y = Math.random() * canvas.height
          vx = -(Math.random() * 3 + 2)
          vy = (Math.random() - 0.5) * 4
          break
        case 2: // From bottom
          x = Math.random() * canvas.width
          y = canvas.height + 10
          vx = (Math.random() - 0.5) * 4
          vy = -(Math.random() * 3 + 2)
          break
        default: // From left
          x = -10
          y = Math.random() * canvas.height
          vx = Math.random() * 3 + 2
          vy = (Math.random() - 0.5) * 4
          break
      }

      asteroids.push({
        x,
        y,
        vx,
        vy,
        size: Math.random() * 4 + 1.5, // Slightly larger asteroids (1.5-5.5px)
        opacity: Math.random() * 0.9 + 0.3, // Higher opacity range (0.3-1.2)
        color: colors[Math.floor(Math.random() * colors.length)],
        glowSize: Math.random() * 10 + 6, // Larger glow effect
        trail: [],
      })
    }

    // Spawn asteroids randomly
    const spawnAsteroid = () => {
      if (Math.random() < 0.8) {
        // 80% chance every interval (increased from 30%)
        createAsteroid()
      }
      setTimeout(spawnAsteroid, Math.random() * 800 + 300) // Random interval 0.3-1.1 seconds (faster)
    }

    // Create initial asteroids immediately
    for (let i = 0; i < 5; i++) {
      setTimeout(() => createAsteroid(), i * 200) // Create 5 asteroids in first second
    }

    spawnAsteroid() // Animation loop
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

      // Draw and update asteroids
      asteroids.forEach((asteroid, index) => {
        // Update position
        asteroid.x += asteroid.vx
        asteroid.y += asteroid.vy

        // Add to trail
        asteroid.trail.push({
          x: asteroid.x,
          y: asteroid.y,
          opacity: asteroid.opacity,
        })
        if (asteroid.trail.length > 20) {
          // Much longer trails for dramatic effect
          asteroid.trail.shift()
        }

        // Draw trail
        asteroid.trail.forEach((point, i) => {
          const trailOpacity =
            ((point.opacity * (i + 1)) / asteroid.trail.length) * 0.5
          ctx.save()
          ctx.globalAlpha = trailOpacity
          ctx.fillStyle = asteroid.color
          ctx.beginPath()
          ctx.arc(point.x, point.y, asteroid.size * 0.5, 0, Math.PI * 2)
          ctx.fill()
          ctx.restore()
        })

        // Draw glow effect
        const gradient = ctx.createRadialGradient(
          asteroid.x,
          asteroid.y,
          0,
          asteroid.x,
          asteroid.y,
          asteroid.glowSize
        )
        gradient.addColorStop(0, asteroid.color + '80') // Semi-transparent center
        gradient.addColorStop(0.5, asteroid.color + '40')
        gradient.addColorStop(1, asteroid.color + '00') // Fully transparent edge

        ctx.save()
        ctx.globalAlpha = asteroid.opacity * 0.6
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(asteroid.x, asteroid.y, asteroid.glowSize, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()

        // Draw main asteroid
        ctx.save()
        ctx.globalAlpha = asteroid.opacity
        ctx.fillStyle = asteroid.color
        ctx.shadowColor = asteroid.color
        ctx.shadowBlur = 6
        ctx.beginPath()
        ctx.arc(asteroid.x, asteroid.y, asteroid.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()

        // Remove asteroids that are off screen
        if (
          asteroid.x < -50 ||
          asteroid.x > canvas.width + 50 ||
          asteroid.y < -50 ||
          asteroid.y > canvas.height + 50
        ) {
          asteroids.splice(index, 1)
        }
      })

      requestAnimationFrame(animate)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [isClient])

  return (
    <>
      {/* Static background that loads immediately */}
      <div
        className='pointer-events-none fixed inset-0 z-0'
        style={{
          background:
            'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #16213e 100%)',
        }}
      />

      {/* Canvas for stars - loads progressively */}
      {isClient && (
        <canvas
          ref={canvasRef}
          className='pointer-events-none fixed inset-0 z-0'
          style={{ background: 'transparent' }}
        />
      )}

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
