import { createContext, useContext, useEffect } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useLocalStorage('language', 'az')

  /* Keeps <html lang> in sync so text-transform: uppercase uses the right
     locale rules (az: i → İ) and screen readers pick the right voice. */
  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  const changeLanguage = (lang) => {
    setLanguage(lang)
  }

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}
