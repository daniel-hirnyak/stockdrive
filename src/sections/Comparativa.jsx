import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

function IconX({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
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

const manualRows = [
  'Actualizas la web a mano, coche por coche. Unas 3 horas cada semana.',
  'No sabes si has ganado o perdido dinero hasta que haces cuentas a fin de mes.',
  'Rellenas cada contrato de compraventa a mano, unos 15 minutos por venta.',
  'No tienes ni idea de qué coches generan interés real en tu web.',
  'Cuando empiezas, tienes que averiguar tú solo cómo organizar tu stock y qué datos llevar de cada coche.',
]

const stockdriveRows = [
  'La web se actualiza sola en cuanto cambias el estado del coche. Cero minutos.',
  'Ves tu margen exacto en cada operación al instante, sin esperar a fin de mes.',
  'Contrato en PDF generado automáticamente en 1 clic, listo para firmar.',
  'Sabes exactamente qué vehículos generan más visitas y contactos.',
  'Configuramos StockDrive con los datos de tu compraventa e importamos tu stock inicial. Empiezas a trabajar desde el minuto uno.',
]

const INTERVAL_MS = 9000

export default function Comparativa() {
  const [activeTab, setActiveTab] = useState('manual')
  const intervalRef = useRef(null)

  useEffect(() => {
    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setActiveTab((prev) => (prev === 'manual' ? 'stockdrive' : 'manual'))
    }, INTERVAL_MS)
    return () => clearInterval(intervalRef.current)
  }, [activeTab])

  function handleTabClick(tab) {
    setActiveTab(tab)
  }

  return (
    <section id="comparativa" className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-4xl px-6">
        <h2 className="mx-auto mb-4 max-w-2xl text-center text-3xl font-bold text-[#0F172A] md:text-5xl">
          La diferencia entre perder tiempo o ganarlo.
        </h2>
        <p className="mb-10 text-center text-lg text-[#64748B]">
          Mismo trabajo, resultado completamente distinto.
        </p>

        {/* Tabs — solo móvil */}
        <div className="mb-6 flex gap-2 md:hidden">
          <div className="flex-1">
            <button
              onClick={() => handleTabClick('manual')}
              className={`w-full rounded-lg py-3 text-sm font-semibold transition-colors ${
                activeTab === 'manual' ? 'bg-slate-200 text-[#0F172A]' : 'bg-slate-100 text-slate-400'
              }`}
            >
              Método manual
            </button>
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-slate-200">
              {activeTab === 'manual' && (
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: INTERVAL_MS / 1000, ease: 'linear' }}
                  className="h-full bg-[#16255C]"
                />
              )}
            </div>
          </div>
          <div className="flex-1">
            <button
              onClick={() => handleTabClick('stockdrive')}
              className={`w-full rounded-lg py-3 text-sm font-semibold transition-colors ${
                activeTab === 'stockdrive' ? 'bg-[#16255C] text-white' : 'bg-slate-100 text-slate-400'
              }`}
            >
              Con StockDrive
            </button>
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-slate-200">
              {activeTab === 'stockdrive' && (
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: INTERVAL_MS / 1000, ease: 'linear' }}
                  className="h-full bg-[#16255C]"
                />
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2">
          {/* Columna izquierda: método manual */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`${activeTab === 'manual' ? 'flex' : 'hidden'} h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg md:flex`}
          >
            <div className="border-b border-slate-200 p-6">
              <h3 className="text-base font-semibold text-[#0F172A]">El método manual</h3>
              <p className="mt-1 text-sm text-[#64748B]">Lo que probablemente haces hoy</p>
            </div>

            <div className="flex-1 p-6">
              {manualRows.map((row, index) => (
                <div
                  key={row}
                  className={`flex items-start gap-3 py-2.5 ${
                    index < manualRows.length - 1 ? 'border-b border-slate-200' : ''
                  }`}
                >
                  <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-slate-200">
                    <IconX className="h-3 w-3 text-slate-500" />
                  </span>
                  <p className="flex-1 text-sm text-[#64748B]">{row}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-200 px-6 py-4 text-center">
              <span className="text-xs text-slate-400">Sin automatización</span>
            </div>
          </motion.div>

          {/* Columna derecha: con StockDrive */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className={`${activeTab === 'stockdrive' ? 'flex' : 'hidden'} h-full flex-col overflow-hidden rounded-2xl bg-[#16255C] shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg md:flex`}
          >
            <div className="border-b border-white/10 p-6">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-semibold text-white">Con StockDrive</h3>
                <span className="inline-flex items-center rounded-full bg-emerald-500/20 px-2.5 py-1 text-xs font-semibold text-emerald-400">
                  Recomendado
                </span>
              </div>
              <p className="mt-1 text-sm text-slate-300">Lo que pasa desde el primer día</p>
            </div>

            <div className="flex-1 p-6">
              {stockdriveRows.map((row, index) => (
                <div
                  key={row}
                  className={`flex items-start gap-3 py-2.5 ${
                    index < stockdriveRows.length - 1 ? 'border-b border-white/10' : ''
                  }`}
                >
                  <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500">
                    <IconCheck className="h-3 w-3 text-white" />
                  </span>
                  <p className="flex-1 text-sm text-slate-200">{row}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 p-6">
              <a
                href="#cta"
                className="flex items-center justify-center gap-2 text-sm font-semibold text-white transition-all hover:gap-3"
              >
                Solicitar demo
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
