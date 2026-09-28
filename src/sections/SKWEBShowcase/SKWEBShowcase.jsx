import { useEffect, useRef, useState } from 'react'
import { FiPause, FiPlay } from 'react-icons/fi'

import { useLanguage } from '../../hooks'
import { translations } from '../../translations'

import styles from './SKWEBShowcase.module.css'

import showcaseVideo from '../../assets/videos/hero.mp4'

export default function SKWEBShowcase() {
  const { language } = useLanguage()
  const t = translations[language]

  const videoRef = useRef(null)
  /* Reduced motion: never autoplay — the viewer starts it with the button */
  const [playing, setPlaying] = useState(
    () => !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  )

  useEffect(() => {
    if (!playing) videoRef.current?.pause()
  }, [playing])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      video.play().catch(() => {})
      setPlaying(true)
    } else {
      video.pause()
      setPlaying(false)
    }
  }

  const toggleLabel = playing ? t.showcase.videoPause : t.showcase.videoPlay

  return (
    <section
      className={styles.skwebShowcase}
      id="responsiveness"
      aria-labelledby="showcase-heading"
    >
      <div className={styles.container}>
        <div className={styles.showcaseGrid}>
          {/* ── Header ── */}
          <header className={styles.showcaseHeader}>
            <span className={styles.sectionLabel}>
              <span className={styles.labelDot} aria-hidden="true" />
              {t.showcase.sectionLabel}
            </span>

            <h2 id="showcase-heading" className={styles.showcaseTitle}>
              {t.showcase.title}
            </h2>

            <p className={styles.showcaseLead}>
              {t.showcase.description}
            </p>
          </header>

          {/* ── Video Showcase ── */}
          <div className={styles.showcaseVideoWrapper}>
            <video
              ref={videoRef}
              className={styles.showcaseVideo}
              autoPlay={playing}
              muted
              loop
              playsInline
              preload="metadata"
              aria-label={t.showcase.description}
            >
              <source src={showcaseVideo} type="video/mp4" />
            </video>

            <button
              type="button"
              className={styles.videoToggle}
              onClick={togglePlay}
              aria-label={toggleLabel}
              aria-pressed={!playing}
              title={toggleLabel}
            >
              {playing ? <FiPause aria-hidden="true" /> : <FiPlay aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}