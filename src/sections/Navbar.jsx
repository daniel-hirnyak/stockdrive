import { useEffect, useState } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 20)
  })

  const links = [
    { label: 'Producto', href: '#features' },
    { label: 'Cómo funciona', href: '#como-funciona' },
    { label: 'Web conectada', href: '#web-conectada' },
    { label: 'FAQ', href: '#faq' },
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
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5 no-underline">
            <img src="/assets/logo.png" alt="StockDrive" className="h-8 w-8 rounded-lg" />
            <span className="font-bold text-lg text-[#0F172A]">StockDrive</span>
          </a>

          {/* Links desktop */}
          <div className="hidden md:flex items-center gap-8">
            {links.map(link => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-[#475569] hover:text-[#0F172A] transition-colors no-underline"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTAs desktop */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="/login"
              className="text-sm font-medium text-[#475569] hover:text-[#0F172A] transition-colors no-underline px-3 py-2"
            >
              Iniciar sesión
            </a>
            <a
              href="#cta"
              className="text-sm font-semibold text-white bg-[#16255C] hover:opacity-90 transition-opacity no-underline px-4 py-2 rounded-lg"
            >
              Solicitar demo
            </a>
          </div>

          {/* Hamburger móvil */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
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
      </motion.nav>

      {/* Mobile menu */}
      <motion.div
        className="fixed top-16 left-0 right-0 z-40 bg-white border-b border-[#E2E8F0] md:hidden"
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: mobileOpen ? 'auto' : 0, opacity: mobileOpen ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        style={{ overflow: 'hidden' }}
      >
        <div className="px-6 py-4 flex flex-col gap-4">
          {links.map(link => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-[#475569] no-underline"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <hr className="border-[#E2E8F0]" />
          <a href="/login" className="text-sm font-medium text-[#475569] no-underline">
            Iniciar sesión
          </a>
          <a
            href="#cta"
            className="text-sm font-semibold text-white bg-[#16255C] text-center py-3 rounded-lg no-underline"
            onClick={() => setMobileOpen(false)}
          >
            Solicitar demo
          </a>
        </div>
      </motion.div>
    </>
  )
}
