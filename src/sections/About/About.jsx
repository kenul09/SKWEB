import styles from './About.module.css'
import { useLanguage } from '../../hooks'
import { translations } from '../../translations'

export default function About() {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <section className={styles.about} id="about">
      {/* Decorative background */}
      <div className={styles.bgGlow} aria-hidden="true" />

      <div className={styles.container}>
        <div className={styles.aboutInner}>
          {/* Section Label */}
          <span className={styles.sectionLabel}>
            <span className={styles.labelDot} aria-hidden="true" />
            {t.navbar.about}
          </span>

          {/* Title */}
          <h2 className={styles.aboutTitle}>
            {t.about.title}
          </h2>

          {/* Description */}
          <p className={styles.aboutText}>
            {t.about.text}
          </p>
        </div>
      </div>
    </section>
  )
}