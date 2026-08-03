import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function IconCheck({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function IconArrowRight({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M5 12h14" />
      <path d="M12 5l7 7-7 7" />
    </svg>
  )
}

function IconUser({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.5-6 8-6s8 2 8 6" />
    </svg>
  )
}

function IconBuilding({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="4" y="3" width="16" height="18" rx="1" />
      <path d="M9 21v-6h6v6" />
      <path d="M8 8h.01M12 8h.01M16 8h.01M8 12h.01M12 12h.01M16 12h.01" />
    </svg>
  )
}

const bullets = [
  {
    title: 'Demo directa de 20 minutos',
    subtitle: 'Vamos al grano, sin rodeos.',
  },
  {
    title: 'Configuración guiada',
    subtitle: 'Te ayudamos a importar tu primer stock.',
  },
]

function Bullet({ bullet }) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-emerald-50">
        <IconCheck className="h-3.5 w-3.5 text-emerald-600" />
      </span>
      <div>
        <p className="text-sm font-semibold text-[#0F172A]">{bullet.title}</p>
        <p className="text-sm text-[#64748B]">{bullet.subtitle}</p>
      </div>
    </div>
  )
}

function StepCircle({ step, isFilled }) {
  return (
    <span
      className={`relative z-10 flex h-5 w-5 flex-shrink-0 items-center justify-center overflow-hidden rounded-full text-[11px] font-bold text-white transition-colors ${
        isFilled ? 'bg-emerald-500' : 'bg-[#16255C]'
      }`}
    >
      <AnimatePresence mode="wait">
        {isFilled ? (
          <motion.svg
            key="check"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.2 }}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3 w-3"
          >
            <polyline points="20 6 9 17 4 12" />
          </motion.svg>
        ) : (
          <motion.span key="number" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ duration: 0.2 }}>
            {step}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  )
}

function StepField({ step, label, required, isFilled, icon, children }) {
  return (
    <div className="mb-6">
      <label className="mb-2 flex items-center gap-2">
        <StepCircle step={step} isFilled={isFilled} />
        <span className="text-sm font-medium text-[#0F172A]">
          {label} {required && <span className="text-red-500">*</span>}
        </span>
      </label>
      {icon ? (
        <div className="relative">
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </span>
          {children}
        </div>
      ) : (
        children
      )}
    </div>
  )
}

const inputClasses =
  'w-full rounded-xl border border-slate-200 py-3.5 pl-10 pr-4 text-sm transition-colors focus:border-[#16255C] focus:outline-none focus:ring-1 focus:ring-[#16255C] focus:shadow-sm'

export default function CTAFinal() {
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [phone, setPhone] = useState('')
  const [prefijo, setPrefijo] = useState('+34')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1000)
  }

  return (
    <section id="cta" className="bg-[#F8FAFC] py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Columna izquierda: texto persuasivo */}
          <div>
            <h2 className="mb-4 text-3xl font-bold text-[#0F172A] md:text-4xl">
              Toma el control de tu stock hoy mismo.
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-[#64748B]">
              Solicita una demo de 20 minutos. Sin compromisos ni presentaciones aburridas. Te enseñamos el producto real funcionando y vemos si encaja con tu forma de trabajar.
            </p>

            <div className="space-y-5">
              {bullets.map((bullet) => (
                <Bullet key={bullet.title} bullet={bullet} />
              ))}
            </div>
          </div>

          {/* Columna derecha: formulario */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-slate-100 bg-gradient-to-b from-white to-slate-50/50 p-8 shadow-2xl md:p-10"
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center py-8 text-center"
                >
                  <motion.span
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1, type: 'spring', stiffness: 300, damping: 15 }}
                    className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50"
                  >
                    <IconCheck className="h-8 w-8 text-emerald-600" />
                  </motion.span>
                  <p className="text-lg font-semibold text-[#0F172A]">
                    ¡Gracias! Te contactaremos en menos de 24h.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSubmit}
                >
                  <h3 className="mb-6 text-xl font-bold text-[#0F172A]">Solicita tu demo gratuita</h3>

                  <div>
                    <StepField
                      step={1}
                      label="Nombre y apellidos"
                      required
                      isFilled={name.trim().length > 0}
                      icon={<IconUser className="h-4 w-4" />}
                    >
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ej. Carlos Martínez"
                        className={inputClasses}
                      />
                    </StepField>

                    <StepField
                      step={2}
                      label="Nombre de tu compraventa"
                      required
                      isFilled={company.trim().length > 0}
                      icon={<IconBuilding className="h-4 w-4" />}
                    >
                      <input
                        type="text"
                        required
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Ej. Autos Martínez"
                        className={inputClasses}
                      />
                    </StepField>

                    <StepField
                      step={3}
                      label="Teléfono móvil"
                      required
                      isFilled={phone.length >= 9}
                    >
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={prefijo}
                          onChange={(e) => {
                            let value = e.target.value
                            value = value.replace(/\+/g, '')
                            value = value.replace(/[^0-9]/g, '')
                            setPrefijo('+' + value)
                          }}
                          className="w-16 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3.5 text-center text-sm font-medium text-[#0F172A] focus:border-[#16255C] focus:outline-none focus:ring-1 focus:ring-[#16255C]"
                          maxLength={5}
                        />
                        <input
                          type="tel"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          maxLength={9}
                          placeholder="600 000 000"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
                          className="flex-1 rounded-xl border border-slate-200 px-4 py-3.5 text-sm transition-colors focus:border-[#16255C] focus:outline-none focus:ring-1 focus:ring-[#16255C] focus:shadow-sm"
                          required
                        />
                      </div>
                    </StepField>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-[#16255C] py-4 text-base font-bold text-white shadow-lg shadow-[#16255C]/25 transition-all hover:opacity-90 hover:shadow-xl disabled:opacity-70"
                  >
                    {loading ? 'Enviando...' : (
                      <>
                        Solicitar demo sin compromiso
                        <IconArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>

                  <p className="mt-3 text-center text-xs text-slate-400">
                    Tus datos están seguros. Solo los usaremos para agendar la demo.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
