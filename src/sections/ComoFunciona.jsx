import { useRef, useState, useLayoutEffect } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { AnimAddVehicle } from '../components/ui/AnimAddVehicle'
import { AnimPublishVehicle } from '../components/ui/AnimPublishVehicle'
import { AnimMargin } from '../components/ui/AnimMargin'
import { AnimSellVehicle } from '../components/ui/AnimSellVehicle'

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

function StepText({ step, opacity, y }) {
  return (
    <motion.div style={{ opacity, y }}>
      <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#16255C]">
        {step.value}
      </div>
      <h3 className="mb-3 text-2xl font-bold text-[#0F172A]">{step.title}</h3>
      <p className="text-base text-[#64748B]">{step.description}</p>
    </motion.div>
  )
}

function StepPlaceholder({ step, opacity, y, children }) {
  return (
    <motion.div
      style={{ opacity, y }}
      className="flex aspect-video items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50"
    >
      {children ?? <span className="text-sm text-slate-400">Animación: {step.title}</span>}
    </motion.div>
  )
}

export default function ComoFunciona() {
  const { t } = useTranslation()

  const steps = [
    {
      value: t('comoFunciona.step1Value'),
      title: t('comoFunciona.step1Title'),
      description: t('comoFunciona.step1Desc'),
    },
    {
      value: t('comoFunciona.step2Value'),
      title: t('comoFunciona.step2Title'),
      description: t('comoFunciona.step2Desc'),
    },
    {
      value: t('comoFunciona.step3Value'),
      title: t('comoFunciona.step3Title'),
      description: t('comoFunciona.step3Desc'),
    },
    {
      value: t('comoFunciona.step4Value'),
      title: t('comoFunciona.step4Title'),
      description: t('comoFunciona.step4Desc'),
    },
  ]

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

  // Paso "activo" discreto (el más cercano al scroll actual), derivado del
  // mismo scrollYProgress continuo que ya anima color/opacidad — se usa para
  // pausar/reanudar animaciones internas costosas de pasos fuera de vista.
  const [activeStep, setActiveStep] = useState(0)

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    let closest = 0
    let minDist = Infinity
    fractions.forEach((fraction, idx) => {
      const dist = Math.abs(latest - fraction)
      if (dist < minDist) {
        minDist = dist
        closest = idx
      }
    })
    setActiveStep(closest)
  })

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
          {t('comoFunciona.title')}
        </h2>
        <p className="mx-auto mb-20 max-w-xl text-center text-lg text-[#64748B]">
          {t('comoFunciona.subtitle')}
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
            // Impares: texto a la derecha, placeholder a la izquierda.
            // Pares: se invierte — texto a la izquierda, placeholder a la derecha.
            const textOnLeft = stepNumber % 2 === 0
            const { circleColor, opacity, y } = stepMotionValues[i]

            const circle = (
              <motion.div
                ref={circleRefs[i]}
                className="absolute left-6 top-0 z-10 h-4 w-4 -translate-x-1/2 rounded-full border-2 md:left-1/2"
                style={{ backgroundColor: circleColor, borderColor: circleColor }}
              />
            )

            const textBlock = (
              <div
                className={
                  textOnLeft
                    ? 'pl-14 md:order-1 md:pl-0 md:pr-12 md:text-right'
                    : 'pl-14 md:order-2 md:pl-12 md:text-left'
                }
              >
                <StepText step={step} opacity={opacity} y={y} />
              </div>
            )

            const placeholderBlock = (
              <div
                className={
                  textOnLeft
                    ? 'mt-6 pl-14 md:order-2 md:mt-0 md:pl-12'
                    : 'mt-6 pl-14 md:order-1 md:mt-0 md:pl-0 md:pr-12'
                }
              >
                <StepPlaceholder step={step} opacity={opacity} y={y}>
                  {i === 0 ? (
                    <AnimAddVehicle isActive={activeStep === 0} />
                  ) : i === 1 ? (
                    <AnimPublishVehicle isActive={activeStep === 1} />
                  ) : i === 2 ? (
                    <AnimMargin isActive={activeStep === 2} />
                  ) : (
                    <AnimSellVehicle isActive={activeStep === 3} />
                  )}
                </StepPlaceholder>
              </div>
            )

            return (
              <div key={step.title} className="relative mb-20 last:mb-0 md:grid md:grid-cols-2 md:gap-12">
                {circle}
                {textBlock}
                {placeholderBlock}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
