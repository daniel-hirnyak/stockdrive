import { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { useTranslation } from 'react-i18next'

const languages = [
  { code: 'ES', label: 'Español' },
  { code: 'CA', label: 'Català' },
  { code: 'EN', label: 'English' },
]

function IconChevronDown({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

function IconWhatsApp({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="white" className={className}>
      <path d="M17.6 6.32A7.85 7.85 0 0 0 12.05 4a7.94 7.94 0 0 0-6.9 11.9L4 20l4.2-1.1a7.9 7.9 0 0 0 3.85 1h0a7.94 7.94 0 0 0 5.55-13.58zM12.05 18.4h0a6.55 6.55 0 0 1-3.35-.92l-.24-.14-2.5.65.67-2.43-.16-.25a6.6 6.6 0 1 1 12.24-3.5 6.56 6.56 0 0 1-6.66 6.6zm3.6-4.94c-.2-.1-1.17-.58-1.35-.64s-.31-.1-.44.1-.5.64-.61.77-.23.15-.42.05a5.4 5.4 0 0 1-1.6-.98 5.9 5.9 0 0 1-1.1-1.36c-.11-.2 0-.3.09-.4s.2-.23.3-.35.13-.2.2-.33a.36.36 0 0 0 0-.35c-.05-.1-.44-1.06-.6-1.45s-.32-.33-.44-.33h-.38a.72.72 0 0 0-.52.24 2.2 2.2 0 0 0-.69 1.64 3.8 3.8 0 0 0 .8 2.02 8.7 8.7 0 0 0 3.33 2.94c.47.2.83.32 1.12.41a2.7 2.7 0 0 0 1.24.08 2 2 0 0 0 1.32-.93 1.6 1.6 0 0 0 .11-.93c-.05-.08-.18-.13-.38-.23z" />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <a
      href="https://wa.me/34666008252"
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#25D366] md:h-9 md:w-9"
      aria-label="Contactar por WhatsApp"
    >
      <IconWhatsApp className="h-[18px] w-[18px]" />
    </a>
  )
}

function LanguageSelector({ variant = 'compact' }) {
  const { i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function selectLanguage(code) {
    i18n.changeLanguage(code.toLowerCase()) // 'es' | 'ca' | 'en'
    setOpen(false)
  }

  const currentCode = i18n.language.toUpperCase()
  const currentLabel = languages.find((l) => l.code === currentCode)?.label ?? currentCode
  const isExpanded = variant === 'expanded'

  return (
    <div ref={containerRef} className={`relative flex-shrink-0 ${isExpanded ? 'mx-auto' : ''}`}>
      {isExpanded ? (
        <button
          onClick={() => setOpen((o) => !o)}
          className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-4 py-2.5 text-sm font-semibold text-[#0F172A]"
          aria-label="Cambiar idioma"
        >
          {currentLabel}
          <IconChevronDown className="h-4 w-4 text-slate-500" />
        </button>
      ) : (
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex items-center gap-1"
          aria-label="Cambiar idioma"
        >
          <span className="flex h-6 items-center justify-center rounded-md bg-[#16255C] px-2 text-[11px] font-bold text-white">
            {currentCode}
          </span>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      )}

      {open && (
        <div
          className={`absolute top-full z-50 mt-2 w-36 space-y-0.5 overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl ${
            isExpanded ? 'left-1/2 -translate-x-1/2' : 'right-0'
          }`}
        >
          {languages.map((l) => (
            <button
              key={l.code}
              onClick={() => selectLanguage(l.code)}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-[#475569] hover:bg-slate-50"
            >
              <span className="flex h-5 flex-shrink-0 items-center justify-center rounded-md bg-[#16255C] px-1.5 text-[10px] font-bold text-white">
                {l.code}
              </span>
              {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Navbar() {
  const { t } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 20)
  })

  const links = [
    { key: 'comoFunciona', href: '#como-funciona' },
    { key: 'producto', href: '#features' },
    { key: 'comparativa', href: '#comparativa' },
    { key: 'faq', href: '#faq' },
  ]

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        animate={{
          backgroundColor: scrolled ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0)',
          backdropFilter: scrolled ? 'blur(12px)' : 'blur(0px)',
          boxShadow: scrolled ? '0 1px 0 0 rgba(0,0,0,0.08)' : 'none',
        }}
        transition={{ duration: 0.2 }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center">

          {/* 1. Logo */}
          <a href="/" className="flex flex-shrink-0 items-center gap-2.5 no-underline">
            <img src="/assets/logo.png" alt="StockDrive" width={32} height={32} className="h-8 w-8 rounded-lg" />
            <span className="font-extrabold text-xl tracking-tight text-[#0F172A]">StockDrive</span>
          </a>

          {/* 2. Links desktop — pegados al logo */}
          <div className="hidden md:flex items-center gap-8 ml-10">
            {links.map(link => (
              <a
                key={link.key}
                href={link.href}
                className="text-sm font-medium text-[#475569] hover:text-[#0F172A] transition-colors no-underline"
              >
                {t(`nav.${link.key}`)}
              </a>
            ))}
          </div>

          {/* 3. Spacer */}
          <div className="flex-1" />

          <div className="flex items-center gap-4">
            {/* 4 y 5. Selector de idioma + WhatsApp — desktop */}
            <div className="hidden items-center gap-4 md:flex">
              <LanguageSelector />
              <WhatsAppIcon />
            </div>

            {/* Selector de idioma + WhatsApp — topbar móvil compacta, antes de la hamburguesa */}
            <div className="flex items-center gap-2 md:hidden">
              <LanguageSelector />
              <WhatsAppIcon />
            </div>

            {/* 6. Botón Acceso — solo desktop */}
            <a
              href="/login"
              className="hidden md:inline-flex items-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-[#0F172A] no-underline transition-colors hover:border-slate-400 hover:bg-slate-50"
            >
              {t('nav.acceso')}
            </a>

            {/* 7. Botón Solicitar demo — solo desktop */}
            <a
              href="#cta"
              className="hidden md:inline-flex text-sm font-semibold text-white bg-[#16255C] hover:opacity-90 transition-opacity no-underline px-4 py-2 rounded-lg"
            >
              {t('nav.solicitarDemo')}
            </a>

            {/* Hamburger — solo móvil */}
            <button
              className="md:hidden flex h-11 w-11 flex-shrink-0 flex-col items-center justify-center gap-1.5"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menú"
            >
              <motion.span
                className="block w-5 h-0.5 bg-[#0F172A] rounded"
                animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 8 : 0 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="block w-5 h-0.5 bg-[#0F172A] rounded"
                animate={{ opacity: mobileOpen ? 0 : 1 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="block w-5 h-0.5 bg-[#0F172A] rounded"
                animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -8 : 0 }}
                transition={{ duration: 0.2 }}
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu — overlay a pantalla completa, la barra fija (con su logo y el hamburger/X) queda por encima gracias a su z-50 */}
      <motion.div
        className="fixed inset-0 z-40 bg-white overflow-y-auto md:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: mobileOpen ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        style={{ height: '100dvh', pointerEvents: mobileOpen ? 'auto' : 'none' }}
      >
        <div className="px-6 pb-8 pt-20">
          {/* Links de navegación */}
          <div className="flex flex-col">
            {links.map(link => (
              <a
                key={link.key}
                href={link.href}
                className="flex items-center justify-between border-b border-slate-100 py-3.5 text-base font-medium text-[#0F172A] no-underline last:border-b-0"
                onClick={() => setMobileOpen(false)}
              >
                {t(`nav.${link.key}`)}
                <IconChevronDown className="h-3.5 w-3.5 text-slate-400" />
              </a>
            ))}
          </div>

          {/* Acceso + Solicitar demo + WhatsApp, apilados */}
          <div className="mt-3 flex flex-col gap-2.5">
            <a
              href="/login"
              className="rounded-md border border-slate-300 bg-white py-3 text-center text-sm font-semibold text-[#0F172A] no-underline"
              onClick={() => setMobileOpen(false)}
            >
              {t('nav.acceso')}
            </a>
            <a
              href="#cta"
              className="rounded-md bg-[#16255C] py-3 text-center text-sm font-semibold text-white no-underline"
              onClick={() => setMobileOpen(false)}
            >
              {t('nav.solicitarDemo')}
            </a>
            <a
              href="https://wa.me/34666008252"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-md bg-[#25D366] py-3 text-sm font-semibold text-white no-underline"
            >
              <IconWhatsApp className="h-5 w-5" />
              {t('nav.hablarPorWhatsapp')}
            </a>
          </div>

          {/* Selector de idioma, expandido y centrado */}
          <div className="mt-5 flex justify-center">
            <LanguageSelector variant="expanded" />
          </div>
        </div>
      </motion.div>
    </>
  )
}
