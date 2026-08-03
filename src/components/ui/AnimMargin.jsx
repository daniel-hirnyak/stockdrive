import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const rows = [
  { label: 'Precio de venta', value: '24.900 €', color: 'text-[#0F172A]' },
  { label: 'Precio de compra', value: '−18.500 €', color: 'text-red-500' },
  { label: 'ITV + Limpieza', value: '−320 €', color: 'text-red-500' },
]

export function AnimMargin({ isActive }) {
  const [visibleRows, setVisibleRows] = useState(0)
  const [showTotal, setShowTotal] = useState(false)
  const [cycle, setCycle] = useState(0)

  useEffect(() => {
    if (!isActive) {
      setVisibleRows(0)
      setShowTotal(false)
      return
    }

    let timers = []
    setVisibleRows(0)
    setShowTotal(false)

    rows.forEach((_, i) => {
      timers.push(setTimeout(() => setVisibleRows(i + 1), 500 + i * 600))
    })

    const totalAppears = 500 + rows.length * 600 + 400
    timers.push(setTimeout(() => setShowTotal(true), totalAppears))
    timers.push(setTimeout(() => setCycle((c) => c + 1), totalAppears + 2400))

    return () => timers.forEach(clearTimeout)
  }, [cycle, isActive])

  return (
    <div className="flex h-full w-full items-center justify-center p-4">
      <div className="w-full max-w-[240px] overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center gap-1.5 border-b border-slate-100 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-slate-200" />
          <span className="h-2 w-2 rounded-full bg-slate-200" />
          <span className="h-2 w-2 rounded-full bg-slate-200" />
          <span className="ml-1 text-[11px] font-semibold text-[#64748B]">Mercedes Sprinter</span>
        </div>

        <div className="space-y-1.5 p-3">
          <AnimatePresence>
            {rows.slice(0, visibleRows).map((row) => (
              <motion.div
                key={row.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between text-xs"
              >
                <span className="text-[#64748B]">{row.label}</span>
                <span className={`font-semibold ${row.color}`}>{row.value}</span>
              </motion.div>
            ))}
          </AnimatePresence>

          <AnimatePresence>
            {showTotal && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                className="mt-2 flex items-center justify-between rounded-md bg-emerald-50 px-2.5 py-2"
              >
                <span className="text-xs font-semibold text-emerald-700">Margen neto</span>
                <span className="text-sm font-bold text-emerald-700">+6.080 €</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
