import { prefersReducedMotion } from '../utils/motion'

export default function useSmoothScroll() {
  const scrollTo = (id) => {
    if (typeof document === 'undefined') return
    const element = document.getElementById(id)
    if (!element) return
    element.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  }

  return {
    scrollTo,
    scrollToSection: scrollTo,
  }
}
