import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue } from 'framer-motion'
import { useTranslation } from 'react-i18next'

function IconGlobe() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5 text-red-500"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}

function IconFileText() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5 text-red-500"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  )
}

function IconRefresh() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5 text-red-500"
    >
      <polyline points="23 4 23 10 17 10" />
      <polyline points="1 20 1 14 7 14" />
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
    </svg>
  )
}

function IconAlertTriangle() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5 text-red-500"
    >
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    </svg>
  )
}

function ProblemaCard({ row, i, total }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="relative h-[300px] w-[300px] flex-shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 sm:w-[340px] md:w-[360px]"
    >
      <span className="pointer-events-none absolute right-4 top-4 z-0 select-none text-[100px] font-black leading-none text-slate-100">
        {String((i % total) + 1).padStart(2, '0')}
      </span>

      <div className="relative z-10">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
          {row.icon}
        </div>
        <span className="mb-2 inline-block rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-600">
          {row.tag}
        </span>
        <h3 className="mb-2 text-xl font-bold text-[#0F172A]">{row.title}</h3>
        <p className="line-clamp-4 text-sm leading-relaxed text-[#64748B]">{row.description}</p>
      </div>
    </motion.div>
  )
}

function ProblemaMarquee({ rows }) {
  const trackRef = useRef(null)
  const setWidthRef = useRef(0)
  const resumeTimeoutRef = useRef(null)
  const x = useMotionValue(0)
  const [isDragging, setIsDragging] = useState(false)

  const loopedRows = [...rows, ...rows, ...rows]

  useEffect(() => {
    function measure() {
      if (trackRef.current) {
        setWidthRef.current = trackRef.current.scrollWidth / 3
      }
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  useEffect(() => {
    let frameId

    function animate() {
      if (!isDragging) {
        const speed = 1.1
        const setWidth = setWidthRef.current
        let next = x.get() - speed
        if (setWidth > 0) {
          if (next <= -setWidth) next += setWidth
          if (next > 0) next -= setWidth
        }
        x.set(next)
      }
      frameId = requestAnimationFrame(animate)
    }

    frameId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frameId)
  }, [isDragging, x])

  function handleDragStart() {
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
    setIsDragging(true)
  }

  function handleDragEnd() {
    resumeTimeoutRef.current = setTimeout(() => setIsDragging(false), 300)
  }

  return (
    <div className="relative -mx-6 overflow-hidden px-6">
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-[#F8FAFC] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-[#F8FAFC] to-transparent" />

      <motion.div
        ref={trackRef}
        className="flex gap-4 pb-4"
        style={{ x }}
        drag="x"
        dragConstraints={{ left: -Infinity, right: Infinity }}
        dragElastic={0}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {loopedRows.map((row, i) => (
          <ProblemaCard key={`${row.title}-${i}`} row={row} i={i} total={rows.length} />
        ))}
      </motion.div>
    </div>
  )
}

export default function Problema() {
  const { t } = useTranslation()

  const rows = [
    {
      icon: <IconGlobe />,
      tag: t('problema.card1Tag'),
      title: t('problema.card1Title'),
      description: t('problema.card1Desc'),
    },
    {
      icon: <IconFileText />,
      tag: t('problema.card2Tag'),
      title: t('problema.card2Title'),
      description: t('problema.card2Desc'),
    },
    {
      icon: <IconRefresh />,
      tag: t('problema.card3Tag'),
      title: t('problema.card3Title'),
      description: t('problema.card3Desc'),
    },
    {
      icon: <IconAlertTriangle />,
      tag: t('problema.card4Tag'),
      title: t('problema.card4Title'),
      description: t('problema.card4Desc'),
    },
  ]

  return (
    <section id="problema" className="bg-[#F8FAFC] py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="mb-3 text-3xl font-bold text-[#0F172A] md:text-4xl lg:whitespace-nowrap">
            {t('problema.title')}
          </h2>
          <p className="mb-1.5 text-xl font-semibold text-[#0F172A]">
            {t('problema.subtitleBold')}
          </p>
          <p className="text-lg text-[#64748B]">
            {t('problema.subtitle')}
          </p>
        </div>

        <ProblemaMarquee rows={rows} />
      </div>
    </section>
  )
}
