import { FiArrowUp, FiGithub, FiInstagram, FiLinkedin } from 'react-icons/fi'

import { useLanguage } from '../../../hooks'
import useSmoothScroll from '../../../hooks/useSmoothScroll'
import { translations } from '../../../translations'

import styles from './Footer.module.css'

/* ── Constants ── */
const NAV_LINKS = ['about', 'responsiveness', 'services', 'projects', 'testimonials', 'contact']

const SOCIAL_LINKS = [
  { key: 'github', label: 'GitHub', icon: FiGithub, href: 'https://github.com/kenul09' },
  { key: 'linkedin', label: 'LinkedIn', icon: FiLinkedin, href: 'https://linkedin.com/in/konul-samadova' },
  { key: 'instagram', label: 'Instagram', icon: FiInstagram, href: 'https://instagram.com/s.k_web' },
]

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  )
}

export default function Footer() {
  const { language } = useLanguage()
  const t = translations[language]
  const { scrollToSection } = useSmoothScroll()

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    })
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer} role="contentinfo" aria-label="Site footer">
      <div className={styles.container}>
        {/* ── ROW 1 ── */}
        <div className={styles.topRow}>
          {/* Brand: logo + status pill */}
          <div className={styles.brandRow}>
            <a href="/" className={styles.logo} aria-label="SK WEB Home">
              <svg
                className={styles.logoIcon}
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 6L2 12L8 18"
                  stroke="url(#footerLogoGradient)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16 6L22 12L16 18"
                  stroke="url(#footerLogoGradient)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14 4L10 20"
                  stroke="url(#footerLogoGradient)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <defs>
                  <linearGradient id="footerLogoGradient" x1="0" y1="0" x2="24" y2="24">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#60a5fa" />
                  </linearGradient>
                </defs>
              </svg>
              <span className={styles.logoText}>
                SK<span className={styles.logoAccent}>WEB</span>
              </span>
            </a>

            {t.footer.available && (
              <span className={styles.availablePill}>
                <span className={styles.availableDot} aria-hidden="true" />
                {t.footer.available}
              </span>
            )}
          </div>

          {/* Nav links */}
          <nav className={styles.nav} aria-label="Footer" role="list">
            {NAV_LINKS.map((key) => (
              <button
                key={key}
                type="button"
                role="listitem"
                className={styles.navLink}
                onClick={() => scrollToSection(key)}
              >
                {t.navbar[key]}
              </button>
            ))}
          </nav>

          {/* Social icons */}
          <div className={styles.socialIcons}>
            {SOCIAL_LINKS.map(({ key, label, icon: Icon, href }) => (
              <a
                key={key}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialIcon}
                aria-label={label}
                title={label}
              >
                <Icon aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        {/* ── ROW 2 ── */}
        <div className={styles.bottomRow}>
          <p className={styles.copyright}>
            © {currentYear} SKWEB. {t.footer.rights}
          </p>

          <button type="button" className={styles.backToTop} onClick={scrollToTop}>
            {t.footer.backToTop}
            <FiArrowUp aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  )
}
