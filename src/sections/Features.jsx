import { useRef, useEffect, useState } from 'react'
import { motion, useMotionValue } from 'framer-motion'

function IconCalculator() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-[#16255C]">
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
      <line x1="8" y1="6" x2="16" y2="6" />
      <line x1="16" y1="14" x2="16" y2="18" />
      <path d="M16 10h.01" />
      <path d="M12 10h.01" />
      <path d="M8 10h.01" />
      <path d="M12 14h.01" />
      <path d="M8 14h.01" />
      <path d="M12 18h.01" />
      <path d="M8 18h.01" />
    </svg>
  )
}

function IconGlobe() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-[#16255C]">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}

function IconFileText() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-[#16255C]">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  )
}

function IconShieldCheck() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-[#16255C]">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  )
}

function IconBarChart2() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-[#16255C]">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  )
}

function IconTrendingUp() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-[#16255C]">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  )
}

const features = [
  {
    icon: <IconCalculator />,
    title: 'Control financiero total',
    description:
      'Conoce tu margen bruto real en cada operación restando al precio de venta el coste de compra y todos los gastos asociados de preparación.',
  },
  {
    icon: <IconGlobe />,
    title: 'Catálogo web sincronizado',
    description:
      'Lo que pasa en StockDrive, pasa en tu web. Se acabó anunciar coches que ya has vendido o retrasarte en subir las novedades del escaparate.',
  },
  {
    icon: <IconFileText />,
    title: 'Registro histórico de ventas',
    description:
      'Guarda un historial ordenado de cada operación con datos del comprador, forma de pago y régimen fiscal aplicado.',
  },
  {
    icon: <IconShieldCheck />,
    title: 'Contratos en 1 clic',
    description:
      'Genera el contrato de compraventa oficial en PDF automáticamente, cuando lo necesites. Sin plantillas de Word ni rellenar a mano.',
  },
  {
    icon: <IconBarChart2 />,
    title: 'Dashboard de rentabilidad',
    description:
      'Visualiza el capital que tienes inmovilizado, tus márgenes potenciales y qué coches llevan demasiado tiempo ocupando espacio.',
  },
  {
    icon: <IconTrendingUp />,
    title: 'Rendimiento de tu web',
    description:
      'Descubre qué vehículos reciben más visitas en tu catálogo, cuántos leads generas y si prefieren llamarte o escribirte por WhatsApp.',
  },
]

function FeatureCard({ feature }) {
  return (
    <div className="w-[280px] flex-shrink-0 rounded-2xl border border-slate-200 bg-white p-6 sm:w-[320px] md:w-[340px]">
      <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-[#16255C]/10">
        {feature.icon}
      </div>
      <h3 className="mb-2 text-base font-bold text-[#0F172A]">{feature.title}</h3>
      <p className="text-sm leading-relaxed text-[#64748B]">{feature.description}</p>
    </div>
  )
}

// Carrusel infinito tipo marquee, para todos los tamaños de pantalla.
// Se anima solo vía requestAnimationFrame; el usuario puede arrastrarlo y
// el auto-scroll se pausa mientras arrastra y se reanuda 300ms después de
// soltar. El ancho del set se mide en tiempo real (scrollWidth / 3), así
// que el loop sigue siendo exacto sin importar qué anchos de card resulten
// en cada breakpoint (280 / 320 / 340px + gap).
function Marquee() {
  const loopedFeatures = [...features, ...features, ...features]
  const x = useMotionValue(0)
  const [isDragging, setIsDragging] = useState(false)
  const trackRef = useRef(null)
  const setWidthRef = useRef(0)
  const resumeTimeoutRef = useRef(null)

  useEffect(() => {
    function measure() {
      const el = trackRef.current
      if (!el) return
      // Ancho de un set completo (las 6 cards originales, sin duplicar)
      setWidthRef.current = el.scrollWidth / 3
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  useEffect(() => {
    let frame
    const speed = 0.9

    function animate() {
      if (!isDragging) {
        x.set(x.get() - speed)
      }

      // Wrap infinito: si se sale del primer set por cualquiera de los dos
      // lados (auto-scroll o arrastre manual), lo recolocamos sumando o
      // restando el ancho exacto de un set — sin salto visible, porque el
      // set duplicado que queda visible es idéntico al que "desaparece".
      const setWidth = setWidthRef.current
      if (setWidth) {
        const current = x.get()
        if (current <= -setWidth) {
          x.set(current + setWidth)
        } else if (current > 0) {
          x.set(current - setWidth)
        }
      }

      frame = requestAnimationFrame(animate)
    }

    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [isDragging, x])

  useEffect(() => {
    return () => clearTimeout(resumeTimeoutRef.current)
  }, [])

  function handleDragStart() {
    clearTimeout(resumeTimeoutRef.current)
    setIsDragging(true)
  }

  function handleDragEnd() {
    resumeTimeoutRef.current = setTimeout(() => setIsDragging(false), 300)
  }

  return (
    <div className="-mx-6 relative overflow-hidden px-6">
      {/* Fade izquierdo */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-10 md:w-20 z-10 bg-gradient-to-r from-[#F8FAFC] to-transparent" />

      {/* Fade derecho */}
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 md:w-20 z-10 bg-gradient-to-l from-[#F8FAFC] to-transparent" />

      <motion.div
        ref={trackRef}
        className="flex gap-4"
        style={{ x }}
        drag="x"
        dragElastic={0.05}
        dragMomentum={false}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {loopedFeatures.map((feature, i) => (
          <FeatureCard key={`${feature.title}-${i}`} feature={feature} />
        ))}
      </motion.div>
    </div>
  )
}

export default function Features() {
  return (
    <section id="features" className="bg-[#F8FAFC] py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="mx-auto mb-4 max-w-2xl text-center text-3xl font-bold text-[#0F172A] md:text-5xl">
          Todo lo que necesitas, nada de lo que te sobra.
        </h2>
        <p className="mx-auto mb-16 max-w-xl text-center text-lg text-[#64748B]">
          Seis herramientas que resuelven el día a día real de gestionar un stock de vehículos.
        </p>

        <Marquee />
      </div>
    </section>
  )
}
