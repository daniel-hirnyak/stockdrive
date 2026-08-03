import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'

function IconRefresh({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="23 4 23 10 17 10" />
      <polyline points="1 20 1 14 7 14" />
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
    </svg>
  )
}

function IconCar({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="11" width="18" height="7" rx="2" />
      <path d="M5 11l1.5-5h11L19 11" />
      <circle cx="7.5" cy="18" r="1.5" />
      <circle cx="16.5" cy="18" r="1.5" />
    </svg>
  )
}

function IconCheck({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

const INTERVAL_MS = 4000

function ProgressLine({ isActive }) {
  return (
    <div className="absolute left-0 top-0 h-full w-[3px] overflow-hidden bg-slate-200">
      {isActive && (
        <motion.div
          initial={{ height: '0%' }}
          animate={{ height: '100%' }}
          transition={{ duration: INTERVAL_MS / 1000, ease: 'linear' }}
          className="w-full bg-[#16255C]"
        />
      )}
    </div>
  )
}

function PointCard({ point, isActive, onClick }) {
  return (
    <div
      onClick={onClick}
      className="relative cursor-pointer overflow-hidden rounded-xl border border-slate-200 border-l-[3px] border-l-transparent bg-white p-4 transition-all"
    >
      <ProgressLine isActive={isActive} />

      <h3 className={`text-base ${isActive ? 'font-bold text-[#0F172A]' : 'font-semibold text-slate-500'}`}>
        {point.title}
      </h3>

      <p className="mt-2 text-[13px] leading-snug text-[#64748B]">{point.description}</p>
    </div>
  )
}

// ── Widgets del panel derecho, uno por cada punto activo ──────────────

function WidgetSync() {
  const { t } = useTranslation()
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-3">
        <div className="flex h-16 w-20 flex-col items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50">
          <div className="h-1.5 w-10 rounded-full bg-slate-300" />
          <div className="h-1.5 w-8 rounded-full bg-slate-300" />
          <span className="mt-1 text-[10px] font-medium text-slate-400">{t('webConectada.widget1Panel')}</span>
        </div>
        <motion.div initial={{ rotate: -30, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} transition={{ duration: 0.4 }}>
          <IconRefresh className="h-5 w-5 text-[#16255C]" />
        </motion.div>
        <div className="flex h-16 w-20 flex-col items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50">
          <div className="h-1.5 w-10 rounded-full bg-slate-300" />
          <div className="h-1.5 w-8 rounded-full bg-slate-300" />
          <span className="mt-1 text-[10px] font-medium text-slate-400">{t('webConectada.widget1Web')}</span>
        </div>
      </div>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-4 text-xs font-medium text-green-600">
        {t('webConectada.widget1Synced')}
      </motion.p>
    </div>
  )
}

function WidgetFinance() {
  const { t } = useTranslation()
  const rows = [t('webConectada.widget2Compra'), t('webConectada.widget2Gastos')]

  return (
    <div className="w-48">
      {rows.map((row, i) => (
        <motion.div
          key={row}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className="py-1.5 text-sm text-slate-500"
        >
          {row}
        </motion.div>
      ))}
      <motion.div
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-1 border-t border-slate-200 pt-2 text-sm font-semibold text-green-600"
      >
        {t('webConectada.widget2Margen')}
      </motion.div>
    </div>
  )
}

function WidgetSalesContract() {
  const { t } = useTranslation()
  return (
    <div className="flex flex-col items-center gap-4">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex w-56 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2"
      >
        <IconCar className="h-4 w-4 flex-shrink-0 text-[#16255C]" />
        <span className="flex-1 truncate text-xs font-medium text-slate-700">{t('webConectada.widget3Vehicle')}</span>
        <span className="text-xs font-semibold text-slate-700">{t('webConectada.widget3Price')}</span>
      </motion.div>

      <div className="flex items-center gap-2">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="rounded-lg bg-[#16255C] px-4 py-2 text-xs font-semibold text-white"
        >
          {t('webConectada.widget3Generate')}
        </motion.button>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.35, type: 'spring', stiffness: 300, damping: 15 }}
          className="flex h-7 w-7 items-center justify-center rounded-full bg-green-100"
        >
          <IconCheck className="h-4 w-4 text-green-600" />
        </motion.div>
      </div>
    </div>
  )
}

function WidgetChart() {
  const { t } = useTranslation()
  const bars = [40, 70, 55, 90, 65]
  const [visitCount, setVisitCount] = useState(0)

  useEffect(() => {
    const target = 247
    const steps = 30
    const stepValue = target / steps
    let current = 0
    const interval = setInterval(() => {
      current += stepValue
      if (current >= target) {
        setVisitCount(target)
        clearInterval(interval)
      } else {
        setVisitCount(Math.round(current))
      }
    }, 800 / steps)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-48">
      <div className="mb-2 flex items-center justify-between">
        <div>
          <p className="text-2xl font-bold text-[#0F172A]">{visitCount}</p>
          <p className="text-[10px] text-[#64748B]">{t('webConectada.widget4Visits')}</p>
        </div>
        <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700">
          ↑ +18%
        </span>
      </div>

      <div className="flex h-24 w-48 items-end justify-center gap-2">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            animate={{ height: `${h}%` }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="w-6 rounded-t bg-[#16255C]"
          />
        ))}
      </div>
    </div>
  )
}

const widgets = [WidgetSync, WidgetFinance, WidgetSalesContract, WidgetChart]

export default function WebConectada() {
  const { t } = useTranslation()

  const points = [
    {
      title: t('webConectada.card1Title'),
      description: t('webConectada.card1Desc'),
    },
    {
      title: t('webConectada.card2Title'),
      description: t('webConectada.card2Desc'),
    },
    {
      title: t('webConectada.card3Title'),
      description: t('webConectada.card3Desc'),
    },
    {
      title: t('webConectada.card4Title'),
      description: t('webConectada.card4Desc'),
    },
  ]

  const [activeIndex, setActiveIndex] = useState(0)
  const intervalRef = useRef(null)

  useEffect(() => {
    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % points.length)
    }, INTERVAL_MS)
    return () => clearInterval(intervalRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex])

  function handleClick(index) {
    setActiveIndex(index)
  }

  const ActiveWidget = widgets[activeIndex]

  return (
    <section id="features" className="bg-white py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="mx-auto mb-4 max-w-2xl text-center text-3xl font-bold text-[#0F172A] md:text-5xl">
          {t('webConectada.title')}
        </h2>
        <p className="mx-auto mb-10 max-w-xl text-center text-base text-[#64748B] md:text-lg">
          {t('webConectada.subtitle')}
        </p>

        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-2">
          {/* Columna izquierda: 4 cards — segunda en móvil, primera en desktop */}
          <div className="order-2 space-y-3 lg:order-1">
            {points.map((point, index) => (
              <PointCard
                key={point.title}
                point={point}
                isActive={index === activeIndex}
                onClick={() => handleClick(index)}
              />
            ))}
          </div>

          {/* Columna derecha: panel punteado — primera en móvil, segunda en desktop */}
          <div className="relative order-1 h-56 overflow-hidden rounded-2xl border border-slate-200 bg-white lg:order-2 lg:h-full">
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage: 'radial-gradient(circle, #cbd5e1 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }}
            />

            <div className="relative flex h-full items-center justify-center p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-xl border border-slate-200 bg-white p-6 shadow-xl"
                >
                  <ActiveWidget />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
