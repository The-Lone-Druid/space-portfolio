import { useEffect, useRef, useState } from 'react'
import { UseAnimatedCounterProps } from '../types'

export const useAnimatedCounter = ({
  end,
  duration = 2000,
  start = 0,
  suffix = '',
}: UseAnimatedCounterProps) => {
  const [count, setCount] = useState(start)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) return

    const startTime = Date.now()
    const range = end - start

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function for smooth animation
      const easedProgress = 1 - Math.pow(1 - progress, 3)
      const currentCount = Math.floor(start + range * easedProgress)

      setCount(currentCount)

      if (progress === 1) {
        clearInterval(timer)
      }
    }, 16) // ~60fps

    return () => clearInterval(timer)
  }, [isVisible, start, end, duration])

  return {
    count: `${count}${suffix}`,
    ref,
  }
}
