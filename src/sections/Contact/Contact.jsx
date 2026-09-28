import { useState, useRef, useEffect } from 'react'
import emailjs from '@emailjs/browser'
import { FiInstagram, FiMail, FiPhone, FiSend } from 'react-icons/fi'

import { useLanguage } from '../../hooks'
import { translations } from '../../translations'

import styles from './Contact.module.css'

/* ── EmailJS Configuration ── */
const EMAILJS_SERVICE_ID = 'service_htx2k8e'      // ← Öz Service ID
const EMAILJS_TEMPLATE_ID = 'template_xyz789'    // ← Öz Template ID
const EMAILJS_PUBLIC_KEY = 'FX5yH6EbphakDfCrd'           // ← Öz Public Key

export default function Contact() {
  const { language } = useLanguage()
  const t = translations[language]
  const formRef = useRef(null)
  const successRef = useRef(null)

  const [form, setForm] = useState({
    name: '',
    email: '',
    interest: 'both',
    message: '',
  })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const handle = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  useEffect(() => {
    if (sent) successRef.current?.focus()
  }, [sent])

  useEffect(() => {
    const handleServiceSelect = (e) => {
      setForm((prev) => ({ ...prev, interest: e.detail }))
    }
    window.addEventListener('services:select', handleServiceSelect)
    return () => window.removeEventListener('services:select', handleServiceSelect)
  }, [])

  const validate = () => {
    const newErrors = {}
    if (!form.name.trim()) newErrors.name = t.contact.errors.name
    if (!form.email.trim()) newErrors.email = t.contact.errors.email
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = t.contact.errors.emailInvalid
    if (!form.message.trim()) newErrors.message = t.contact.errors.message

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const submit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)

    try {
      /* EmailJS template parameters */
      const templateParams = {
        from_name: form.name,
        from_email: form.email,
        interest: form.interest,
        message: form.message,
      }

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      )

      setSent(true)
      /* Reset form */
      setForm({
        name: '',
        email: '',
        interest: 'both',
        message: '',
      })
    } catch (error) {
      console.error('Email send failed:', error)
      setErrors({ submit: t.contact.errors.submitFailed })
    } finally {
      setLoading(false)
    }
  }

  const interestOptions = t.contact.interestOptions

  const directLinks = [
    { key: 'email', icon: FiMail, href: 'mailto:kenul94@mail.ru', value: 'kenul94@mail.ru' },
    { key: 'phone', icon: FiPhone, href: 'tel:+994503417069', value: '+994 50 341 70 69' },
    { key: 'instagram', icon: FiInstagram, href: 'https://instagram.com/s.k_web', value: '@s.k_web', external: true },
  ]

  return (
    <section
      className={styles.contact}
      id="contact"
      aria-labelledby="contact-heading"
    >
      <div className={styles.bgGlow} aria-hidden="true" />

      <div className={styles.container}>
        <div className={styles.contactInner}>
          {/* INTRO */}
          <div className={styles.contactIntro}>
            <span className={styles.sectionLabel}>
              <span className={styles.labelDot} aria-hidden="true" />
              {t.contact.sectionLabel}
            </span>

            <h2 id="contact-heading" className={styles.contactTitle}>
              {t.contact.title}
            </h2>

            <p className={styles.contactDesc}>
              {t.contact.desc}
            </p>
          </div>

          {/* DIRECT CONTACT + NEXT STEPS */}
          <div className={styles.contactAside}>
            <div className={styles.infoBlock}>
              <h3 className={styles.infoTitle}>{t.contact.directTitle}</h3>
              <ul className={styles.directList}>
                {directLinks.map(({ key, icon: Icon, href, value, external }) => (
                  <li key={key}>
                    <a
                      href={href}
                      className={styles.directLink}
                      {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
                    >
                      <span className={styles.directIcon} aria-hidden="true">
                        <Icon />
                      </span>
                      <span className={styles.directText}>
                        <span className={styles.directLabel}>{t.contact.direct[key]}</span>
                        <span className={styles.directValue}>{value}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className={`${styles.infoBlock} ${styles.stepsBlock}`}>
              <h3 className={styles.infoTitle}>{t.contact.stepsTitle}</h3>
              <ol className={styles.steps}>
                {t.contact.steps.map((step, i) => (
                  <li key={i} className={styles.step}>
                    <span className={styles.stepNum} aria-hidden="true">{i + 1}</span>
                    <span className={styles.stepText}>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* FORM */}
          <div className={styles.contactRight}>
            {sent ? (
              <div
                ref={successRef}
                className={styles.successMsg}
                role="status"
                aria-live="polite"
                tabIndex={-1}
              >
                <div className={styles.successIcon} aria-hidden="true">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className={styles.successTitle}>
                  {t.contact.successTitle}
                </h3>
                <p className={styles.successText}>
                  {t.contact.successMessage}
                </p>
              </div>
            ) : (
              <form
                ref={formRef}
                className={styles.contactForm}
                onSubmit={submit}
                noValidate
              >
                {/* Name + Email */}
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="name" className={styles.formLabel}>
                      {t.contact.placeholders.name}
                      <span className={styles.required} aria-hidden="true">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      autoComplete="name"
                      className={`${styles.formInput} ${errors.name ? styles.formInputError : ''}`}
                      placeholder={t.contact.examples.name}
                      value={form.name}
                      onChange={handle}
                      disabled={loading}
                      aria-required="true"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                    />
                    {errors.name && (
                      <span id="name-error" className={styles.formError} role="alert">
                        {errors.name}
                      </span>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.formLabel}>
                      {t.contact.placeholders.email}
                      <span className={styles.required} aria-hidden="true">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      autoComplete="email"
                      className={`${styles.formInput} ${errors.email ? styles.formInputError : ''}`}
                      placeholder={t.contact.examples.email}
                      value={form.email}
                      onChange={handle}
                      disabled={loading}
                      aria-required="true"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                    {errors.email && (
                      <span id="email-error" className={styles.formError} role="alert">
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                {/* Interest — native radios keep arrow-key navigation */}
                <fieldset className={styles.chipFieldset} disabled={loading}>
                  <legend className={styles.formLabel}>
                    {t.contact.interestLabel}
                  </legend>
                  <div className={styles.chips}>
                    {interestOptions.map((option) => (
                      <div key={option.key} className={styles.chip}>
                        <input
                          id={`interest-${option.key}`}
                          type="radio"
                          name="interest"
                          value={option.key}
                          className={styles.chipInput}
                          checked={form.interest === option.key}
                          onChange={handle}
                        />
                        <label htmlFor={`interest-${option.key}`} className={styles.chipLabel}>
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </fieldset>

                {/* Message */}
                <div className={styles.formGroup}>
                  <label htmlFor="message" className={styles.formLabel}>
                    {t.contact.placeholders.message}
                    <span className={styles.required} aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    className={`${styles.formTextarea} ${errors.message ? styles.formInputError : ''}`}
                    placeholder={t.contact.examples.message}
                    rows={5}
                    value={form.message}
                    onChange={handle}
                    disabled={loading}
                    aria-required="true"
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                  />
                  {errors.message && (
                    <span id="message-error" className={styles.formError} role="alert">
                      {errors.message}
                    </span>
                  )}
                </div>

                {/* Submit error */}
                {errors.submit && (
                  <div className={styles.submitError} role="alert">
                    <span className={styles.submitErrorIcon} aria-hidden="true">✗</span>
                    {errors.submit}
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <svg
                        className={styles.spinner}
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        aria-hidden="true"
                      >
                        <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                        <path d="M12 2a10 10 0 0 1 10 10" />
                      </svg>
                      {t.contact.sending}
                    </>
                  ) : (
                    <>
                      {t.contact.submit}
                      <FiSend aria-hidden="true" />
                    </>
                  )}
                </button>

                <p className={styles.privacyNote}>{t.contact.privacyNote}</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}