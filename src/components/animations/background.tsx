'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

// Constants for better performance - moved outside component to avoid re-creation
const CONSTANTS = {
  FRAME_INTERVAL: 1000 / 60,
  MAX_ASTEROIDS: 4,
  MAX_TRAIL_LENGTH: 20,
  STAR_DENSITY: 20000,
  ASTEROID_SPAWN_CHANCE: 0.5,
  MIN_SPAWN_INTERVAL: 800,
  MAX_SPAWN_INTERVAL: 2300,
  COLORS: ['#ffffff', '#ffffcc', '#fff700', '#ffd700', '#f0f0f0'] as const,
  PI2: Math.PI * 2,
}

const SpaceBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isClient, setIsClient] = useState(false)
  const animationIdRef = useRef<number>(0)
  const spawnTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Performance refs
  const canvasSizeRef = useRef({ width: 0, height: 0 })
  const starsRef = useRef<
    Array<{
      x: number
      y: number
      size: number
      opacity: number
      twinkleSpeed: number
      driftSpeed: number
    }>
  >([])
  const asteroidsRef = useRef<
    Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
      color: string
      glowSize: number
      trail: Array<{ x: number; y: number; opacity: number }>
    }>
  >([])

  // Memoized resize handler
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const { innerWidth, innerHeight } = window
    canvas.width = innerWidth
    canvas.height = innerHeight
    canvasSizeRef.current = { width: innerWidth, height: innerHeight }
  }, [])

  // Optimized star creation
  const createStars = useCallback(() => {
    const { width, height } = canvasSizeRef.current
    const numStars = Math.floor((width * height) / CONSTANTS.STAR_DENSITY)
    const stars = starsRef.current

    stars.length = 0
    stars.length = numStars // Pre-allocate array size

    for (let i = 0; i < numStars; i++) {
      stars[i] = {
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.8 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        driftSpeed: Math.random() * 0.4 + 0.2,
      }
    }
  }, [])

  // Optimized asteroid creation
  const createAsteroid = useCallback(() => {
    const { width, height } = canvasSizeRef.current
    const side = Math.floor(Math.random() * 4)
    let x: number, y: number, vx: number, vy: number

    switch (side) {
      case 0: // From top
        x = Math.random() * width
        y = -10
        vx = (Math.random() - 0.5) * 4
        vy = Math.random() * 3 + 2
        break
      case 1: // From right
        x = width + 10
        y = Math.random() * height
        vx = -(Math.random() * 3 + 2)
        vy = (Math.random() - 0.5) * 4
        break
      case 2: // From bottom
        x = Math.random() * width
        y = height + 10
        vx = (Math.random() - 0.5) * 4
        vy = -(Math.random() * 3 + 2)
        break
      default: // From left
        x = -10
        y = Math.random() * height
        vx = Math.random() * 3 + 2
        vy = (Math.random() - 0.5) * 4
        break
    }

    return {
      x,
      y,
      vx,
      vy,
      size: Math.random() * 4 + 1.5,
      opacity: Math.random() * 0.9 + 0.3,
      color:
        CONSTANTS.COLORS[Math.floor(Math.random() * CONSTANTS.COLORS.length)],
      glowSize: Math.random() * 10 + 6,
      trail: [],
    }
  }, [])

  // Optimized asteroid spawning
  const spawnAsteroid = useCallback(() => {
    const asteroids = asteroidsRef.current

    if (
      asteroids.length < CONSTANTS.MAX_ASTEROIDS &&
      Math.random() < CONSTANTS.ASTEROID_SPAWN_CHANCE
    ) {
      asteroids.push(createAsteroid())
    }

    spawnTimeoutRef.current = setTimeout(
      spawnAsteroid,
      Math.random() *
        (CONSTANTS.MAX_SPAWN_INTERVAL - CONSTANTS.MIN_SPAWN_INTERVAL) +
        CONSTANTS.MIN_SPAWN_INTERVAL
    )
  }, [createAsteroid])

  // Visibility change handler
  const handleVisibilityChange = useCallback(() => {
    if (document.hidden) {
      if (spawnTimeoutRef.current) {
        clearTimeout(spawnTimeoutRef.current)
        spawnTimeoutRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    setIsClient(true)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      if (spawnTimeoutRef.current) {
        clearTimeout(spawnTimeoutRef.current)
      }
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
    }
  }, [handleVisibilityChange])

  useEffect(() => {
    if (!isClient) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    createStars()

    // Create initial asteroids
    const initialCount = 2
    for (let i = 0; i < initialCount; i++) {
      setTimeout(() => {
        asteroidsRef.current.push(createAsteroid())
      }, i * 400)
    }

    spawnAsteroid()

    // Optimized animation loop
    let lastFrameTime = 0

    const animate = (timestamp: number) => {
      // Frame rate limiting
      if (timestamp - lastFrameTime < CONSTANTS.FRAME_INTERVAL) {
        animationIdRef.current = requestAnimationFrame(animate)
        return
      }
      lastFrameTime = timestamp

      const { width, height } = canvasSizeRef.current
      ctx.clearRect(0, 0, width, height)

      // Optimized star rendering
      const stars = starsRef.current
      const time = timestamp * 0.001 // Convert to seconds for performance

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i]

        // Enhanced twinkling with optimized math
        const twinkleIntensity =
          Math.sin(time * star.twinkleSpeed * 1000) * 0.3 + 0.7
        const twinkleSize = star.size * (0.8 + twinkleIntensity * 0.4)

        ctx.globalAlpha = star.opacity * twinkleIntensity
        ctx.fillStyle = '#ffffff'

        // Add glow only for larger stars
        if (star.size > 1) {
          ctx.shadowColor = '#ffffff'
          ctx.shadowBlur = 3
        } else {
          ctx.shadowBlur = 0
        }

        ctx.beginPath()
        ctx.arc(star.x, star.y, twinkleSize, 0, CONSTANTS.PI2)
        ctx.fill()

        // Update star position
        star.x += star.driftSpeed
        if (star.x > width + 10) {
          star.x = -10
          star.y = Math.random() * height
        }

        // Update twinkling
        star.opacity += star.twinkleSpeed
        if (star.opacity > 1) {
          star.opacity = 1
          star.twinkleSpeed = -Math.abs(star.twinkleSpeed)
        } else if (star.opacity < 0.2) {
          star.opacity = 0.2
          star.twinkleSpeed = Math.abs(star.twinkleSpeed)
        }
      }

      // Reset styles after stars
      ctx.shadowBlur = 0
      ctx.globalAlpha = 1

      // Optimized asteroid rendering
      const asteroids = asteroidsRef.current
      for (let i = asteroids.length - 1; i >= 0; i--) {
        const asteroid = asteroids[i]

        // Update position
        asteroid.x += asteroid.vx
        asteroid.y += asteroid.vy

        // Add to trail
        asteroid.trail.push({
          x: asteroid.x,
          y: asteroid.y,
          opacity: asteroid.opacity,
        })
        if (asteroid.trail.length > CONSTANTS.MAX_TRAIL_LENGTH) {
          asteroid.trail.shift()
        }

        // Draw trail (optimized)
        const trail = asteroid.trail
        const trailLength = trail.length
        for (let j = 0; j < trailLength; j++) {
          const point = trail[j]
          const trailOpacity = ((point.opacity * (j + 1)) / trailLength) * 0.5

          ctx.globalAlpha = trailOpacity
          ctx.fillStyle = asteroid.color
          ctx.beginPath()
          ctx.arc(point.x, point.y, asteroid.size * 0.5, 0, CONSTANTS.PI2)
          ctx.fill()
        }

        // Draw glow effect (optimized)
        const gradient = ctx.createRadialGradient(
          asteroid.x,
          asteroid.y,
          0,
          asteroid.x,
          asteroid.y,
          asteroid.glowSize
        )
        gradient.addColorStop(0, asteroid.color + '80')
        gradient.addColorStop(0.5, asteroid.color + '40')
        gradient.addColorStop(1, asteroid.color + '00')

        ctx.globalAlpha = asteroid.opacity * 0.6
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(asteroid.x, asteroid.y, asteroid.glowSize, 0, CONSTANTS.PI2)
        ctx.fill()

        // Draw main asteroid
        ctx.globalAlpha = asteroid.opacity
        ctx.fillStyle = asteroid.color
        ctx.shadowColor = asteroid.color
        ctx.shadowBlur = 6
        ctx.beginPath()
        ctx.arc(asteroid.x, asteroid.y, asteroid.size, 0, CONSTANTS.PI2)
        ctx.fill()

        // Remove off-screen asteroids (using reverse iteration for safe removal)
        if (
          asteroid.x < -50 ||
          asteroid.x > width + 50 ||
          asteroid.y < -50 ||
          asteroid.y > height + 50
        ) {
          asteroids.splice(i, 1)
        }
      }

      // Reset context state
      ctx.globalAlpha = 1
      ctx.shadowBlur = 0

      animationIdRef.current = requestAnimationFrame(animate)
    }

    animationIdRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (spawnTimeoutRef.current) {
        clearTimeout(spawnTimeoutRef.current)
      }
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
    }
  }, [isClient, resizeCanvas, createStars, createAsteroid, spawnAsteroid])

  return (
    <>
      {/* Static background that loads immediately */}
      <div
        className='pointer-events-none fixed inset-0 -z-50'
        style={{
          background:
            'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #16213e 100%)',
        }}
      />

      {/* Canvas for stars - loads progressively */}
      {isClient && (
        <canvas
          ref={canvasRef}
          className='pointer-events-none fixed inset-0 -z-40'
          style={{ background: 'transparent' }}
        />
      )}

      {/* Additional cosmic elements */}
      <div className='pointer-events-none fixed inset-0 -z-30'>
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
