import { useEffect, useState } from 'react'

export default function useResponsive(breakpoint = 768) {
  const [width, setWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : breakpoint + 1
  )

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleResize = () => {
      setWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return {
    width,
    isMobile: width <= breakpoint,
  }
}
