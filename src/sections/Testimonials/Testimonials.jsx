import styles from './Testimonials.module.css'
import { useLanguage } from '../../hooks'
import { translations } from '../../translations'

export default function Testimonials() {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <section
      className={styles.testimonials}
      id="testimonials"
      aria-labelledby="testimonials-heading"
    >
      {/* Decorative background */}
      <div className={styles.bgGlow} aria-hidden="true" />

      <div className={styles.container}>
        {/* ── Header ── */}
        <header className={styles.testHeader}>
          <span className={styles.sectionLabel}>
            <span className={styles.labelDot} aria-hidden="true" />
            {t.testimonials.sectionLabel}
          </span>

          <h2 id="testimonials-heading" className={styles.testTitle}>
            {t.testimonials.title}
          </h2>

          <p className={styles.testSub}>
            {t.testimonials.sub}
          </p>
        </header>

        {/* ── Grid ── */}
        <div className={styles.testGrid} role="list">
          {t.testimonials.cards.map((item, i) => (
            <article
              key={i}
              className={styles.testCard}
              role="listitem"
            >
              {/* Quote icon */}
              <svg
                className={styles.quoteIcon}
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
              </svg>

              {/* Stars rating */}
              <div
                className={styles.testStars}
                role="img"
                aria-label={`${item.stars} out of 5 stars`}
              >
                {[...Array(5)].map((_, idx) => (
                  <svg
                    key={idx}
                    className={`${styles.star} ${idx < item.stars ? styles.starFilled : ''}`}
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>

              {/* Testimonial text */}
              <blockquote className={styles.testText}>
                {item.text}
              </blockquote>

              {/* Author */}
              <footer className={styles.testAuthor}>
                <div
                  className={styles.testAvatar}
                  style={{ background: item.color }}
                  aria-hidden="true"
                >
                  {item.initials}
                </div>

                <div className={styles.testAuthorInfo}>
                  <p className={styles.testName}>{item.name}</p>
                  <p className={styles.testRole}>{item.role}</p>
                </div>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}