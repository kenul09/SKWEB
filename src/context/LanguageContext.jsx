import React, { createContext, useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useLocalStorage('language', 'en')

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
