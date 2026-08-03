import { motion } from 'framer-motion'

function IconCheck({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function IconShieldCheck({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  )
}

const steps = [
  {
    number: 1,
    title: 'Configuramos tu cuenta',
    description: 'Con los datos de tu compraventa, tu logo y tus colores. Todo listo antes de que empieces.',
  },
  {
    number: 2,
    title: 'Importamos tu stock inicial',
    description: 'No partes de cero. Migramos los vehículos que ya tienes en tu inventario actual.',
  },
  {
    number: 3,
    title: 'Formamos a tu equipo',
    description: 'Una sesión de 20 minutos para que todos sepan usar el panel desde el primer día.',
  },
]

function Step({ step, index }) {
  const delay = index * 0.15

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="relative z-10 mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full border-2 border-slate-200 bg-white">
        <span className="text-lg font-bold text-[#16255C]">{step.number}</span>

        <motion.span
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.3, type: 'spring', stiffness: 400, damping: 15 }}
          className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500"
        >
          <IconCheck className="h-2 w-2 text-white" />
        </motion.span>
      </div>

      <h3 className="mb-2 text-center text-base font-bold text-[#0F172A]">{step.title}</h3>
      <p className="text-center text-sm leading-normal text-[#64748B]">{step.description}</p>
    </motion.div>
  )
}

export default function Onboarding() {
  return (
    <section id="onboarding" className="bg-[#F8FAFC] py-16 md:py-20">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-4 flex justify-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
            <IconCheck className="h-3 w-3" />
            Configuración incluida, sin coste extra
          </span>
        </div>

        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#16255C]/10">
          <IconShieldCheck className="h-6 w-6 text-[#16255C]" />
        </div>

        <h2 className="mx-auto mb-3 max-w-2xl text-center text-2xl font-bold text-[#0F172A] md:text-4xl">
          No te entregamos una cuenta vacía y nos olvidamos.
        </h2>
        <p className="mx-auto mb-10 max-w-xl text-center text-lg text-[#64748B]">
          Sabemos que cambiar de sistema da pereza. Por eso nos encargamos de que empieces a trabajar desde el primer día.
        </p>

        <div className="relative grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Línea conectora punteada horizontal — solo desktop, detrás de los círculos */}
          <div className="absolute left-[16.67%] right-[16.67%] top-5 hidden border-t border-dashed border-slate-300 md:block" />

          {/* Línea conectora punteada vertical — solo móvil, detrás de los círculos */}
          <div className="absolute left-1/2 top-5 bottom-5 -translate-x-1/2 border-l border-dashed border-slate-300 md:hidden" />

          {steps.map((step, index) => (
            <Step key={step.number} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
