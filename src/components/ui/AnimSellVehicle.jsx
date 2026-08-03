import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'

export function AnimSellVehicle({ isActive }) {
  const { t } = useTranslation()
  const [phase, setPhase] = useState('button') // 'button' | 'generating' | 'done' | 'summary'
  const [cycle, setCycle] = useState(0)

  useEffect(() => {
    if (!isActive) {
      setPhase('button')
      return
    }

    let timers = []
    setPhase('button')

    timers.push(setTimeout(() => setPhase('generating'), 1500))
    timers.push(setTimeout(() => setPhase('done'), 3200))
    timers.push(setTimeout(() => setPhase('summary'), 4800))
    timers.push(setTimeout(() => setCycle((c) => c + 1), 7200))

    return () => timers.forEach(clearTimeout)
  }, [cycle, isActive])

  return (
    <div className="flex h-full w-full items-center justify-center p-4">
      <div className="flex w-full max-w-[240px] items-center justify-center" style={{ minHeight: 160 }}>
        <AnimatePresence mode="wait">
          {phase === 'button' && (
            <motion.button
              key="button"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex items-center gap-2 rounded-lg bg-[#16255C] px-5 py-2.5 text-sm font-semibold text-white"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 11l3 3L22 4" />
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
              </svg>
              {t('comoFunciona.animSell.buttonLabel')}
            </motion.button>
          )}

          {phase === 'generating' && (
            <motion.div
              key="generating"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center gap-3"
            >
              <div className="flex h-16 w-12 flex-col justify-center gap-1.5 rounded-md border-2 border-slate-300 bg-white p-2">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.4, delay: i * 0.3 }}
                    className="h-1 rounded-full bg-slate-300"
                  />
                ))}
              </div>
              <span className="text-xs font-medium text-[#64748B]">{t('comoFunciona.animSell.generating')}</span>
            </motion.div>
          )}

          {phase === 'done' && (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 350, damping: 22 }}
              className="flex flex-col items-center gap-3"
            >
              <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-sm">
                <div className="flex h-8 w-6 items-center justify-center rounded bg-red-50">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                </div>
                <span className="text-xs font-semibold text-[#0F172A]">{t('comoFunciona.animSell.pdfName')}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
                {t('comoFunciona.animSell.removed')}
              </div>
            </motion.div>
          )}

          {phase === 'summary' && (
            <motion.div
              key="summary"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-[220px] overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm"
            >
              <div className="flex items-center gap-1.5 border-b border-slate-100 px-3 py-2">
                <span className="h-2 w-2 rounded-full bg-slate-200" />
                <span className="h-2 w-2 rounded-full bg-slate-200" />
                <span className="h-2 w-2 rounded-full bg-slate-200" />
                <span className="ml-1 text-[11px] font-semibold text-[#64748B]">{t('comoFunciona.animSell.summaryHeader')}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 p-3">
                <div className="rounded-md bg-slate-50 p-2 text-center">
                  <p className="text-lg font-bold text-[#0F172A]">{t('comoFunciona.animSell.salesCount')}</p>
                  <p className="text-[10px] text-[#64748B]">{t('comoFunciona.animSell.salesLabel')}</p>
                </div>
                <div className="rounded-md bg-emerald-50 p-2 text-center">
                  <p className="text-lg font-bold text-emerald-700">{t('comoFunciona.animSell.revenue')}</p>
                  <p className="text-[10px] text-emerald-700">{t('comoFunciona.animSell.revenueLabel')}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
