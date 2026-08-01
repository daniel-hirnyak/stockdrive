import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function Hero() {
  const sectionRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const imageRotate = useTransform(scrollYProgress, [0, 0.4], [12, 0])
  const imageScale = useTransform(scrollYProgress, [0, 0.4], [0.94, 1])

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-x-hidden bg-white"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-50 to-white" />

      <div className="relative z-10 mx-auto w-full max-w-5xl px-6">
        <div className="pt-[120px] pb-12 text-center md:pt-[160px]">
          <div className="mb-8 inline-flex items-center rounded-full border border-slate-200 bg-slate-100 px-4 py-1.5">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#16255C]">
              Software para compraventas independientes
            </span>
          </div>

          <h1 className="mb-6 text-[36px] leading-[1.1] font-extrabold text-[#0F172A] sm:text-[48px] md:text-[56px]">
            Gestiona tu stock, publica tu catálogo y controla cada operación{' '}
            <span className="text-[#16255C]">desde un solo lugar.</span>
          </h1>

          <p className="mx-auto mb-10 max-w-[640px] text-lg leading-relaxed text-[#64748B] md:text-xl">
            Actualizas el estado de un coche una vez y se refleja en tu panel y en tu web al instante. Sin Excel, sin duplicar trabajo.
          </p>

          <a
            href="#cta"
            className="inline-block rounded-xl bg-[#16255C] px-10 py-4 text-base font-semibold text-white no-underline transition-opacity hover:opacity-90"
          >
            Solicitar una demo
          </a>

          <p className="text-sm text-[#94A3B8]">
            Demo de 15 min · Sin compromiso · Respuesta directa
          </p>
        </div>

        <div className="pb-20 md:pb-32" style={{ perspective: '1200px' }}>
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
