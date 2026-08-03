import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const MARCA_TEXT = 'Mercedes Sprinter'
const FIELD_2_TEXT = '18.500 €'

function TypedField({ label, value, target }) {
  return (
    <div>
      <label className="text-[11px] font-semibold uppercase tracking-wide text-[#64748B]">{label}</label>
      <div className="mt-1 h-7 rounded-md border border-slate-200 bg-white px-3 flex items-center text-xs font-medium text-[#0F172A]">
        {value}
        {value.length > 0 && value.length < target.length && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
            className="ml-0.5 inline-block h-3.5 w-[1.5px] bg-slate-400"
          />
        )}
      </div>
    </div>
  )
}

export function AnimAddVehicle({ isActive }) {
  const [phase, setPhase] = useState('button') // 'button' | 'form' | 'done'
  const [marca, setMarca] = useState('')
  const [field2, setField2] = useState('')
  const [buttonPressed, setButtonPressed] = useState(false)
  const [cycle, setCycle] = useState(0)

  useEffect(() => {
    if (!isActive) {
      setPhase('button')
      setMarca('')
      setField2('')
      setButtonPressed(false)
      return
    }

    let timers = []
    setPhase('button')
    setMarca('')
    setField2('')
    setButtonPressed(false)

    timers.push(setTimeout(() => setButtonPressed(true), 700))
    timers.push(setTimeout(() => setPhase('form'), 900))
    const formStart = 1300

    MARCA_TEXT.split('').forEach((_, i) => {
      timers.push(setTimeout(() => setMarca(MARCA_TEXT.slice(0, i + 1)), formStart + i * 75))
    })
    const marcaDone = formStart + MARCA_TEXT.length * 75 + 400

    FIELD_2_TEXT.split('').forEach((_, i) => {
      timers.push(setTimeout(() => setField2(FIELD_2_TEXT.slice(0, i + 1)), marcaDone + i * 95))
    })
    const field2Done = marcaDone + FIELD_2_TEXT.length * 95 + 700

    timers.push(setTimeout(() => setPhase('done'), field2Done))
    timers.push(setTimeout(() => setCycle((c) => c + 1), field2Done + 2200))

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
              animate={{ opacity: 1, scale: buttonPressed ? 0.92 : 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-2 rounded-lg bg-[#16255C] px-5 py-2.5 text-sm font-semibold text-white"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Añadir vehículo
            </motion.button>
          )}

          {phase === 'form' && (
            <motion.div
              key="form"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm"
            >
              <div className="flex items-center gap-1.5 border-b border-slate-100 px-3 py-2">
                <span className="h-2 w-2 rounded-full bg-slate-200" />
                <span className="h-2 w-2 rounded-full bg-slate-200" />
                <span className="h-2 w-2 rounded-full bg-slate-200" />
                <span className="ml-1 text-[11px] font-semibold text-[#64748B]">Nuevo vehículo</span>
              </div>
              <div className="space-y-2.5 p-2.5">
                <TypedField label="Marca y modelo" value={marca} target={MARCA_TEXT} />
                <TypedField label="Precio de compra" value={field2} target={FIELD_2_TEXT} />
              </div>
            </motion.div>
          )}

          {phase === 'done' && (
            <motion.div
              key="done"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Vehículo guardado
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
