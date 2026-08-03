import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { AnimatedUnderline } from '../components/ui/AnimatedUnderline'

const rotatingWords = ['STOCK', 'CATÁLOGO', 'MARGEN']
const wordWidths = ['5.5ch', '9ch', '7ch'] // STOCK, CATÁLOGO, MARGEN

function RotatingWord() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % rotatingWords.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <span
      className="relative inline-block"
      style={{
        width: wordWidths[index],
        height: '1.2em',
        overflow: 'hidden',
        transition: 'width 0.4s ease-in-out',
      }}
    >
      {rotatingWords.map((word, i) => (
        // Doble capa: este div hace el centrado vertical ESTÁTICO (CSS puro),
        // separado del motion.span de abajo que solo anima y/opacity — así
        // no compiten por la misma propiedad transform.
        <div key={word} className="absolute left-0 top-1/2 -translate-y-1/2 whitespace-nowrap">
          <motion.span
            className="inline-block"
            style={{ fontSize: 'inherit', fontWeight: 'inherit' }}
            initial={false}
            animate={
              i === index
                ? { y: 0, opacity: 1 }
                : { y: i > index ? 30 : -30, opacity: 0 }
            }
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {word}
          </motion.span>
        </div>
      ))}
    </span>
  )
}

export default function Hero() {
  const sectionRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const imageRotate = useTransform(scrollYProgress, [0, 0.6], [32, 0])
  const imageScale = useTransform(scrollYProgress, [0, 0.4], [0.94, 1])

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-x-hidden bg-slate-50"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(to right, #cbd5e1 1.5px, transparent 1.5px), linear-gradient(to bottom, #cbd5e1 1.5px, transparent 1.5px)`,
          backgroundSize: '32px 32px',
          opacity: 0.6,
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-50 to-white" />

      <div className="relative z-10 mx-auto w-full max-w-5xl px-6">
        <div className="pt-20 pb-12 text-center md:pt-28">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-4 py-1.5"
          >
            <span className="h-2 w-2 shrink-0 rounded-full bg-[#16255C]" />
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-[#16255C]">
              <span>GESTIONA TU</span>
              <RotatingWord />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-[#0F172A] leading-[1.15] mb-5"
          >
            Tu concesionario, sin caos.
            <br />
            <span className="relative inline-block text-[#16255C]">
              Todo en un solo lugar.
              <AnimatedUnderline color="#16255C" />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="mx-auto mb-8 max-w-[640px] text-lg leading-relaxed text-[#64748B] md:text-xl"
          >
            El software que controla tu stock, calcula tus márgenes al céntimo y mantiene tu web al día. Sin Excel, sin sorpresas a fin de mes.
          </motion.p>

          <motion.a
            href="#cta"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#16255C] px-8 py-3.5 text-sm font-semibold text-white no-underline shadow-lg shadow-[#16255C]/20 transition-all hover:scale-105 hover:shadow-xl"
          >
            Solicitar una demo
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
          </motion.a>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-4 text-sm text-[#94A3B8]"
          >
            Demo de 15 min · Sin compromiso · Respuesta directa
          </motion.p>
        </div>

        <div className="pb-16 md:pb-24" style={{ perspective: '1200px' }}>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ rotateX: imageRotate, scale: imageScale }}
            className="w-full rounded-2xl border-4 border-[#0F172A] bg-[#0F172A] p-2 shadow-2xl"
          >
            <img
              src="/assets/screenshot-inicio.png"
              alt="Panel de StockDrive"
              className="block w-full rounded-xl"
              draggable={false}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
