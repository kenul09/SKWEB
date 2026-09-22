import styles from './Footer.module.css'
import Button from '../../ui/Button'
import { useLanguage } from '../../../hooks'
import { translations } from '../../../translations'
import useSmoothScroll from '../../../hooks/useSmoothScroll'

import {
  FiPhone,
  FiMail,
  FiInstagram,
  FiGithub,
  FiLinkedin,
  FiArrowUp,
} from 'react-icons/fi'

import { SiBehance } from 'react-icons/si'

/* ── Constants ── */
const QUICK_LINKS = ['about', 'services', 'projects', 'contact']

const CONTACT_INFO = [
  {
    type: 'phone',
    icon: FiPhone,
    label: '+994 50 341 70 69',
    href: 'tel:+994503417069',
    external: false,
  },
  {
    type: 'email',
    icon: FiMail,
    label: 'kenul94@mail.ru',
    href: 'https://mail.ru/',
    external: false,
  },
  {
    type: 'instagram',
    icon: FiInstagram,
    label: '@s.k_web',
    href: 'https://instagram.com/s.k_web',
    external: true,
  },
  {
    type: 'github',
    icon: FiGithub,
    label: 'GitHub',
    href: 'https://github.com/kenul09',
    external: true,
  },
  {
    type: 'linkedin',
    icon: FiLinkedin,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/feed/',
    external: true,
  },
  {
    type: 'behance',
    icon: SiBehance,
    label: 'Behance',
    href: 'https://behance.net/YOUR_BEHANCE',
    external: true,
  },
]

export default function Footer() {
  const { language } = useLanguage()
  const t = translations[language]
  const { scrollTo } = useSmoothScroll()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer
      className={styles.footer}
      role="contentinfo"
      aria-label="Site footer"
    >
      {/* Decorative background */}
      <div className={styles.bgGlow} aria-hidden="true" />

      {/* Big decorative text */}
      <div className={styles.footerBigText} aria-hidden="true">
        SKWEB
      </div>

      <div className={styles.container}>
        {/* ── MAIN CONTENT ── */}
        <div className={styles.footerInner}>
          {/* LEFT — CTA */}
          <div className={styles.footerLeft}>
            <span className={styles.sectionLabel}>
              <span className={styles.labelDot} aria-hidden="true" />
              {t.footer.sectionLabel || "Let's Connect"}
            </span>

            <h3 className={styles.footerCtaTitle}>
              {t.footer.ctaTitle}
            </h3>

            <Button
              className={styles.btnPrimary}
              onClick={() => scrollTo('contact')}
            >
              {t.footer.button}
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Button>
          </div>

          {/* RIGHT — LINKS */}
          <div className={styles.footerLinks}>
            {/* QUICK LINKS */}
            <nav className={styles.footerCol} aria-label="Quick links">
              <p className={styles.footerColTitle}>
                {t.footer.quickLinksTitle}
              </p>

              <ul className={styles.footerList}>
                {QUICK_LINKS.map((key) => (
                  <li key={key}>
                    <button
                      className={styles.footerLink}
                      onClick={() => scrollTo(key)}
                      type="button"
                    >
                      {t.navbar[key]}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            {/* CONTACT */}
            <div className={styles.footerCol}>
              <p className={styles.footerColTitle}>
                {t.footer.contactTitle}
              </p>

              <ul className={styles.footerList}>
                {CONTACT_INFO.map((item) => {
                  const Icon = item.icon
                  return (
                    <li key={item.type}>
                      <a
                        href={item.href}
                        target={item.external ? '_blank' : undefined}
                        rel={item.external ? 'noopener noreferrer' : undefined}
                        className={styles.footerContactItem}
                        aria-label={`${item.type}: ${item.label}`}
                      >
                        <span className={styles.contactIconWrapper} aria-hidden="true">
                          <Icon className={styles.contactIcon} />
                        </span>
                        <span className={styles.contactLabel}>{item.label}</span>
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>

        {/* ── DIVIDER ── */}
        <div className={styles.footerDivider} aria-hidden="true" />

        {/* ── BOTTOM ── */}
        <div className={styles.footerBottom}>
          <p className={styles.footerCopyright}>
            <span aria-hidden="true">{'// '}</span>
            © {currentYear} {t.footer.bottomText}
          </p>

          {/* Scroll to top button */}
          <button
            className={styles.scrollTopBtn}
            onClick={scrollToTop}
            aria-label="Scroll to top"
            type="button"
          >
            <FiArrowUp aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  )
}