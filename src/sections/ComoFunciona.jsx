import { useRef, useState, useLayoutEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const steps = [
  {
    value: '2 minutos, cero errores',
    title: 'Añade el vehículo',
    description:
      'Matrícula, fotos, precio de compra y gastos de preparación. Decides qué datos son públicos y cuáles solo ves tú. Todo registrado al céntimo desde el primer momento.',
  },
  {
    value: 'Cero trabajo duplicado',
    title: 'Se publica solo',
    description:
      "Marca el coche como 'Disponible' y aparece automáticamente en tu web. Lo que cambias en el panel se actualiza en tu catálogo al instante, sin tocar nada dos veces.",
  },
  {
    value: 'Tu margen, siempre a la vista',
    title: 'Controlas cada margen',
    description:
      'Compra, ITV, limpieza, transporte. Todos los gastos se suman en tiempo real, así que sabes cuánto ganas en cada coche antes de venderlo, no a fin de mes.',
  },
  {
    value: 'La venta cerrada en 1 clic',
    title: 'Vendes con todo listo',
    description:
      'Registra la venta y genera el contrato en PDF si lo necesitas. El coche desaparece de la web automáticamente y tú decides qué papeleo haces desde aquí.',
  },
]

const DEFAULT_FRACTIONS = [0, 1 / 3, 2 / 3, 1]

// Fundido de entrada suave, meseta visible, y atenuación (no desaparición)
// al pasar al siguiente paso. translateY usa el mismo rango que la opacity
// para que el "subir suavemente" quede sincronizado con el fundido.
function useStepMotion(scrollYProgress, threshold) {
  const opacityRange = [threshold - 0.08, threshold - 0.02, threshold + 0.15, threshold + 0.22]
  const opacity = useTransform(scrollYProgress, opacityRange, [0, 1, 1, 0.3])
  const y = useTransform(scrollYProgress, opacityRange, [15, 0, 0, 0])
  const circleColor = useTransform(scrollYProgress, [threshold - 0.05, threshold + 0.05], ['#cbd5e1', '#16255C'])
  return { opacity, y, circleColor }
}

function StepContent({ step, opacity, y }) {
  return (
    <motion.div style={{ opacity, y }}>
      <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#16255C]">
        {step.value}
      </div>
      <h3 className="mb-3 text-2xl font-bold text-[#0F172A]">{step.title}</h3>
      <p className="text-base text-[#64748B]">{step.description}</p>

      <div className="mt-6 flex aspect-video items-center justify-center rounded-xl border border-slate-200 bg-slate-50">
        <span className="text-sm text-slate-400">Animación: {step.title}</span>
      </div>
    </motion.div>
  )
}

export default function ComoFunciona() {
  const timelineRef = useRef(null)
  const circleRef0 = useRef(null)
  const circleRef1 = useRef(null)
  const circleRef2 = useRef(null)
  const circleRef3 = useRef(null)
  const circleRefs = [circleRef0, circleRef1, circleRef2, circleRef3]

  const [fractions, setFractions] = useState(DEFAULT_FRACTIONS)

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start center', 'end center'],
  })

  // Mide la posición Y real (centro) de cada círculo respecto al contenedor
  // de la timeline, para que el threshold de cada paso coincida exactamente
  // con dónde está ese círculo, no con una fracción adivinada.
  useLayoutEffect(() => {
    function measure() {
      const container = timelineRef.current
      if (!container) return
      const containerRect = container.getBoundingClientRect()
      if (!containerRect.height) return

      const next = circleRefs.map((ref) => {
        const el = ref.current
        if (!el) return 0
        const rect = el.getBoundingClientRect()
        const circleCenterY = rect.top - containerRect.top + rect.height / 2
        return circleCenterY / containerRect.height
      })
      setFractions(next)
    }

    measure()
    window.addEventListener('resize', measure)
    document.fonts?.ready?.then(measure)
    return () => window.removeEventListener('resize', measure)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  const step0 = useStepMotion(scrollYProgress, fractions[0])
  const step1 = useStepMotion(scrollYProgress, fractions[1])
  const step2 = useStepMotion(scrollYProgress, fractions[2])
  const step3 = useStepMotion(scrollYProgress, fractions[3])
  const stepMotionValues = [step0, step1, step2, step3]

  return (
    <section id="como-funciona" className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <h2 className="mx-auto mb-4 max-w-2xl text-center text-3xl font-bold text-[#0F172A] md:text-5xl">
          El flujo de trabajo más simple del sector.
        </h2>
        <p className="mx-auto mb-20 max-w-xl text-center text-lg text-[#64748B]">
          Desde que compras el coche hasta que lo vendes, todo queda registrado y conectado. Sin hojas de cálculo, sin trabajo duplicado.
        </p>

        {/* Contenedor que envuelve SOLO los 4 pasos — es el target de useScroll */}
        <div ref={timelineRef} className="relative">
          {/* Línea de fondo estática — arranca en el centro del primer círculo */}
          <div className="absolute left-6 top-2 bottom-0 w-0.5 -translate-x-1/2 bg-slate-200 md:left-1/2" />

          {/* Línea azul que se rellena con el scroll, mismo punto de partida que la gris */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-6 top-2 w-0.5 -translate-x-1/2 bg-[#16255C] md:left-1/2"
          />

          {steps.map((step, i) => {
            const stepNumber = i + 1
            const isLeft = stepNumber % 2 === 0
            const { circleColor, opacity, y } = stepMotionValues[i]

            const circle = (
              <motion.div
                ref={circleRefs[i]}
                className="absolute left-6 top-0 z-10 h-4 w-4 -translate-x-1/2 rounded-full border-2 md:left-1/2"
                style={{ backgroundColor: circleColor, borderColor: circleColor }}
              />
            )

            const content = (
              <div className={isLeft ? 'pl-14 md:pl-0 md:pr-12 md:text-right' : 'pl-14 md:pl-12 md:text-left'}>
                <StepContent step={step} opacity={opacity} y={y} />
              </div>
            )

            return (
              <div key={step.title} className="relative mb-20 last:mb-0 md:grid md:grid-cols-2 md:gap-12">
                {circle}
                {isLeft ? (
                  <>
                    {content}
                    <div className="hidden md:block" />
                  </>
                ) : (
                  <>
                    <div className="hidden md:block" />
                    {content}
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
