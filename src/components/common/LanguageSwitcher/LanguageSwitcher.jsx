import { useLanguage } from '../../../hooks'
import styles from './LanguageSwitcher.module.css'

const languages = [
  { code: 'az', label: 'AZ' },
  { code: 'en', label: 'EN' },
  { code: 'ru', label: 'RU' },
]

export default function LanguageSwitcher() {
  const { language, changeLanguage } = useLanguage()

  return (
    <div className={styles['language-switcher']}>
      {languages.map((lang) => (
        <button
          key={lang.code}
          className={`${styles['lang-btn']} ${language === lang.code ? styles.active : ''}`}
          onClick={() => changeLanguage(lang.code)}
        >
          {lang.label}
        </button>
      ))}
    </div>
  )
}