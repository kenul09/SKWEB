import { useEffect } from 'react'
import useLocalStorage from './useLocalStorage'

export default function useTheme(initialTheme = 'dark') {
  const [theme, setTheme] = useLocalStorage('theme', initialTheme)

  useEffect(() => {
    if (typeof document === 'undefined') return
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'))
  }

  return { theme, toggleTheme }
}
