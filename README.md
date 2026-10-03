# SKWEB

Portfolio site of Konul Samadova, a web developer and UI/UX designer. It is a single-page site with About, Services, Projects and Contact sections. Text is available in Azerbaijani, English and Russian, and there is a light and a dark theme.

**Live:** _coming soon_ <!-- TODO: add live URL -->

## Tech stack

- React 18 + Vite 5
- CSS Modules
- EmailJS (`@emailjs/browser`) for the contact form
- react-icons
- ESLint (flat config)

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build into dist/
npm run preview  # preview the production build
npm run lint     # lint the source
```

## Environment variables

The contact form sends email through EmailJS. Copy `.env.example` to `.env` and fill in the values from your EmailJS dashboard:

| Variable | Description |
| --- | --- |
| `VITE_EMAILJS_SERVICE_ID` | EmailJS service ID |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS template ID |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS public key |

The template receives `from_name`, `from_email`, `interest` and `message`.

If any of these values are missing, the dev server logs an error in the console. When you deploy, set the same variables in your hosting provider's settings.
