import { motion } from 'framer-motion'

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

const rows = [
  {
    icon: <IconGlobe />,
    title: 'La web desactualizada',
    tag: 'Lead perdido',
    description:
      'Un cliente te llama por un coche que ya vendiste hace 3 semanas. Tienes que decirle que ya no está, quedas mal y has perdido tiempo de teléfono con un lead inservible.',
  },
  {
    icon: <IconFileText />,
    title: 'El Excel infinito',
    tag: 'Margen incierto',
    description:
      'Llevas el control en un Excel que solo entiendes tú. Apuntas el precio de compra, pero te olvidas de sumar la ITV o la limpieza. Tu cálculo de margen a fin de mes es siempre una aproximación.',
  },
  {
    icon: <IconRefresh />,
    title: 'El trabajo de mono',
    tag: '-3h/semana',
    description:
      'Creas la ficha en el Excel. Luego vas a tu web, subes las fotos a mano otra vez, copias y pegas el texto. Un trabajo repetitivo de cero valor.',
  },
  {
    icon: <IconAlertTriangle />,
    title: 'Descontrol de gastos y márgenes',
    tag: 'Gastos fantasma',
    description:
      'Compras un coche, luego pagas ITV, luego limpieza, luego un arreglo. Cada gasto queda en un ticket o una nota mental distinta. Cuando vendes, no tienes ni idea de cuánto has ganado realmente.',
  },
]

export default function Problema() {
  return (
    <section id="problema" className="bg-[#F8FAFC] py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="mb-3 text-3xl font-bold text-[#0F172A] md:text-4xl lg:whitespace-nowrap">
            El coste invisible de "hacerlo todo a mano"
          </h2>
          <p className="mb-1.5 text-xl font-semibold text-[#0F172A]">
            Probablemente tu día a día se parece a esto.
          </p>
          <p className="text-lg text-[#64748B]">
            Parece normal, pero tiene un coste oculto altísimo en horas y credibilidad.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {rows.map((row, i) => (
            <motion.div
              key={row.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0, transition: { delay: i * 0.1 } }}
              whileHover={{ y: -4 }}
              viewport={{ once: true }}
              className="relative h-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-6"
            >
              <span className="pointer-events-none absolute right-4 top-4 z-0 select-none text-[100px] font-black leading-none text-slate-100">
                {String(i + 1).padStart(2, '0')}
              </span>

              <div className="relative z-10">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
                  {row.icon}
                </div>
                <span className="mb-2 inline-block rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-600">
                  {row.tag}
                </span>
                <h3 className="mb-2 text-xl font-bold text-[#0F172A]">{row.title}</h3>
                <p className="text-sm leading-relaxed text-[#64748B]">{row.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
