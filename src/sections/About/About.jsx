import { FiSmartphone, FiUsers, FiZap } from 'react-icons/fi'
import {
  SiCss,
  SiFigma,
  SiGit,
  SiHtml5,
  SiJavascript,
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si'

import styles from './About.module.css'
import { useLanguage } from '../../hooks'
import { translations } from '../../translations'

/* Principle icons, in the same order as t.about.principles */
const PRINCIPLE_ICONS = [FiZap, FiUsers, FiSmartphone]

/* Tool name → Simple Icons glyph + brand color. `color: null` means a
   black/white logo, which falls back to --text-primary so it stays
   visible in both themes. Zustand has no Simple Icons glyph, so its chip
   renders text only; CSS Modules' own glyph is a wordmark that's illegible
   at 18px, so it uses the CSS logo. */
const TOOL_ICONS = {
  React: { Icon: SiReact, color: '#61dafb' },
  'Next.js': { Icon: SiNextdotjs, color: null },
  TypeScript: { Icon: SiTypescript, color: '#3178c6' },
  JavaScript: { Icon: SiJavascript, color: '#f7df1e' },
  'React Native': { Icon: SiReact, color: '#61dafb' },
  'CSS Modules': { Icon: SiCss, color: '#663399' },
  'Tailwind CSS': { Icon: SiTailwindcss, color: '#06b6d4' },
  HTML5: { Icon: SiHtml5, color: '#e34f26' },
  Figma: { Icon: SiFigma, color: '#f24e1e' },
  Git: { Icon: SiGit, color: '#f05032' },
}

export default function About() {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <section className={styles.about} id="about" aria-labelledby="about-heading">
      <div className={styles.container}>
        <div className={styles.aboutInner}>
          {/* ── LEFT — Who I am ── */}
          <div className={styles.aboutMain}>
            <span className={styles.sectionLabel}>
              <span className={styles.labelDot} aria-hidden="true" />
              {t.about.sectionLabel}
            </span>

            <h2 id="about-heading" className={styles.aboutTitle}>
              {t.about.title}
            </h2>

            <div className={styles.paragraphs}>
              {t.about.paragraphs.map((text, i) => (
                <p key={i} className={styles.aboutText}>
                  {text}
                </p>
              ))}
            </div>

            <ul className={styles.principles}>
              {t.about.principles.map((label, i) => {
                const Icon = PRINCIPLE_ICONS[i]
                return (
                  <li key={label} className={styles.principle}>
                    {Icon && <Icon className={styles.principleIcon} aria-hidden="true" />}
                    {label}
                  </li>
                )
              })}
            </ul>
          </div>

          {/* ── RIGHT — Tools ── */}
          <div className={styles.toolsCard}>
            <h3 className={styles.toolsTitle}>{t.about.toolsTitle}</h3>

            {t.about.toolGroups.map((group) => (
              <div key={group.title} className={styles.toolGroup}>
                <h4 className={styles.toolGroupTitle}>{group.title}</h4>
                <ul className={styles.toolList}>
                  {group.items.map((name) => {
                    const tool = TOOL_ICONS[name]
                    return (
                      <li key={name} className={styles.toolChip}>
                        {tool && (
                          <tool.Icon
                            className={styles.toolIcon}
                            style={tool.color ? { color: tool.color } : undefined}
                            aria-hidden="true"
                          />
                        )}
                        {name}
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
