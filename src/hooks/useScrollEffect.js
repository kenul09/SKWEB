import { useEffect, useState } from 'react'

export default function useScrollEffect(threshold = 40) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const onScroll = () => {
      setScrolled(window.scrollY > threshold)
    }

    window.addEventListener('scroll', onScroll)
    onScroll()

    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return scrolled
}
