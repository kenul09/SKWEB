import { useEffect } from 'react'

export default function useMountAnimation(ref, className = 'hero-visible', delay = 0) {
  useEffect(() => {
    if (!ref?.current) return

    const timeout = setTimeout(() => {
      ref.current.classList.add(className)
    }, delay)

    return () => clearTimeout(timeout)
  }, [ref, className, delay])
}
