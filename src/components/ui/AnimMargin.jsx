import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'

export function AnimMargin({ isActive }) {
  const { t } = useTranslation()

  const rows = [
    { label: t('comoFunciona.animMargin.rowVenta'), value: t('comoFunciona.animMargin.rowVentaValue'), color: 'text-[#0F172A]' },
    { label: t('comoFunciona.animMargin.rowCompra'), value: t('comoFunciona.animMargin.rowCompraValue'), color: 'text-red-500' },
    { label: t('comoFunciona.animMargin.rowGastos'), value: t('comoFunciona.animMargin.rowGastosValue'), color: 'text-red-500' },
  ]

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cycle, isActive])

  return (
    <div className="flex h-full w-full items-center justify-center p-4">
      <div className="w-full max-w-[240px] overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center gap-1.5 border-b border-slate-100 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-slate-200" />
          <span className="h-2 w-2 rounded-full bg-slate-200" />
          <span className="h-2 w-2 rounded-full bg-slate-200" />
          <span className="ml-1 text-[11px] font-semibold text-[#64748B]">{t('comoFunciona.animMargin.header')}</span>
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
                <span className="text-xs font-semibold text-emerald-700">{t('comoFunciona.animMargin.totalLabel')}</span>
                <span className="text-sm font-bold text-emerald-700">{t('comoFunciona.animMargin.totalValue')}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
