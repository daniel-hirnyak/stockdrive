import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { AnimatedUnderline } from '../components/ui/AnimatedUnderline'

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
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-4 py-1.5">
            <span className="h-2 w-2 rounded-full bg-[#16255C]" />
            <span className="min-w-0 text-xs font-semibold uppercase tracking-widest text-[#16255C]">
              Gestión de stock de vehículos
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-[#0F172A] leading-[1.15] mb-5">
            Tu stock, tu catálogo, tu margen.
            <br />
            <span className="relative inline-block text-[#16255C]">
              Todo en un solo lugar.
              <AnimatedUnderline color="#16255C" />
            </span>
          </h1>

          <p className="mx-auto mb-8 max-w-[640px] text-lg leading-relaxed text-[#64748B] md:text-xl">
            Actualizas el estado de un coche una vez y se refleja en tu panel y en tu web al instante. Sin Excel, sin duplicar trabajo.
          </p>

          <a
            href="#cta"
            className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#16255C] px-8 py-3.5 text-sm font-semibold text-white no-underline shadow-lg shadow-[#16255C]/20 transition-all hover:scale-105 hover:shadow-xl"
          >
            Solicitar una demo
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
          </a>

          <p className="mt-4 text-sm text-[#94A3B8]">
            Demo de 15 min · Sin compromiso · Respuesta directa
          </p>
        </div>

        <div className="pb-16 md:pb-24" style={{ perspective: '1200px' }}>
          <motion.div
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
