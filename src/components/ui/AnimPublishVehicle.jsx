import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'

export function AnimPublishVehicle({ isActive }) {
  const { t } = useTranslation()
  const [phase, setPhase] = useState('panel') // 'panel' | 'transfer' | 'web'
  const [cycle, setCycle] = useState(0)

  useEffect(() => {
    if (!isActive) {
      setPhase('panel')
      return
    }

    let timers = []
    setPhase('panel')

    timers.push(setTimeout(() => setPhase('transfer'), 1800))
    timers.push(setTimeout(() => setPhase('web'), 2800))
    timers.push(setTimeout(() => setCycle((c) => c + 1), 5000))

    return () => timers.forEach(clearTimeout)
  }, [cycle, isActive])

  return (
    <div className="flex h-full w-full items-center justify-center p-4">
      <div className="flex w-full max-w-[240px] items-center justify-center" style={{ minHeight: 160 }}>
        <AnimatePresence mode="wait">
          {phase === 'panel' && (
            <motion.div
              key="panel"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm"
            >
              <div className="flex items-center gap-1.5 border-b border-slate-100 px-3 py-2">
                <span className="h-2 w-2 rounded-full bg-slate-200" />
                <span className="h-2 w-2 rounded-full bg-slate-200" />
                <span className="h-2 w-2 rounded-full bg-slate-200" />
                <span className="ml-1 text-[11px] font-semibold text-[#64748B]">{t('comoFunciona.animPublish.panelHeader')}</span>
              </div>
              <div className="p-3">
                <div className="rounded-md border border-slate-200 bg-slate-50 p-2.5">
                  <p className="text-xs font-semibold text-[#0F172A]">{t('comoFunciona.animPublish.vehicleName')}</p>
                  <span className="mt-1.5 inline-flex items-center rounded-full bg-[#16255C]/10 px-2 py-0.5 text-[10px] font-semibold text-[#16255C]">
                    {t('comoFunciona.animPublish.available')}
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {phase === 'transfer' && (
            <motion.div
              key="transfer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-2"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#16255C]/10"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16255C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="23 4 23 10 17 10" />
                  <polyline points="1 20 1 14 7 14" />
                  <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
                </svg>
              </motion.div>
              <span className="text-xs font-medium text-[#64748B]">{t('comoFunciona.animPublish.publishing')}</span>
            </motion.div>
          )}

          {phase === 'web' && (
            <motion.div
              key="web"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm"
            >
              <div className="flex items-center gap-1.5 border-b border-slate-100 px-3 py-2">
                <span className="h-2 w-2 rounded-full bg-slate-200" />
                <span className="h-2 w-2 rounded-full bg-slate-200" />
                <span className="h-2 w-2 rounded-full bg-slate-200" />
                <span className="ml-1 text-[11px] font-semibold text-[#64748B]">{t('comoFunciona.animPublish.webHeader')}</span>
              </div>
              <div className="p-3">
                <div className="rounded-md border border-slate-200 bg-slate-50 p-2.5">
                  <p className="text-xs font-semibold text-[#0F172A]">{t('comoFunciona.animPublish.vehicleName')}</p>
                  <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {t('comoFunciona.animPublish.onWeb')}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
