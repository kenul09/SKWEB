import aprintImg from '../assets/images/slide1.webp'
import ecommerceImg from '../assets/images/slide2.webp'
import cvBuilderImg from '../assets/images/slide3.webp'

/* Language-independent project fields. Translatable text (title, type, desc)
   lives in translations[lang].projects.cards, keyed by the same id. */
export const PROJECTS = [
  {
    id: 'cv-builder',
    color: '#2563eb',
    img: cvBuilderImg,
    link: 'https://cvgenerateapp.vercel.app/',
  },
  {
    id: 'social-dashboard',
    color: '#3b82f6',
    img: null,
    link: 'https://social-app-orpin-five.vercel.app/',
  },
  {
    id: 'aprint',
    color: '#9333ea',
    img: aprintImg,
    link: 'https://custom-hook-kappa-sand.vercel.app/',
  },
  {
    id: 'film',
    color: '#ec4899',
    img: null,
    link: 'https://routerweb-68o4.vercel.app/',
  },
  {
    id: 'ecommerce',
    color: '#f59e0b',
    img: ecommerceImg,
    link: '',
  },
]
