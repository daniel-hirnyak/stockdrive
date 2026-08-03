import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function IconChevron({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

const faqs = [
  {
    question: '¿Publicáis en Coches.net, AutoScout24 o Wallapop?',
    answer:
      'Por ahora no. StockDrive gestiona y sincroniza tu propio catálogo web, y nos enfocamos en que tu canal directo esté siempre perfecto y tu stock controlado. La publicación automática en portales es algo que tenemos en el radar para el futuro.',
  },
  {
    question: '¿Es un software de facturación o contabilidad?',
    answer:
      'Por ahora es una herramienta específica para la gestión de stock, operaciones de venta y catálogo web. Para la contabilidad y presentación de impuestos, sigue usando los servicios de tu gestoría. Es un área que iremos ampliando según lo que necesiten los concesionarios que confían en nosotros.',
  },
  {
    question: '¿Tengo que instalar alguna aplicación en el móvil?',
    answer:
      'No hay ninguna app nativa que ocupe espacio o requiera actualizaciones constantes. StockDrive es una web app totalmente responsive (PWA). Puedes instalarla directamente en la pantalla de inicio de tu móvil con un botón y funciona exactamente igual que una app.',
  },
  {
    question: '¿Cuánto cuesta y hay permanencia?',
    answer:
      'Contacta con nosotros para una propuesta ajustada al tamaño de tu stock. No hay permanencia obligatoria: si StockDrive no encaja con tu forma de trabajar, puedes darte de baja cuando quieras.',
  },
  {
    question: '¿Qué pasa con mis datos si dejo de usar StockDrive?',
    answer:
      'Tus datos son tuyos. Si decides dejar de usar la plataforma, te ayudamos a exportar tu información (stock, ventas, contactos) en un formato que puedas seguir usando donde quieras.',
  },
  {
    question: '¿Ofrecéis soporte si tengo un problema?',
    answer:
      'Sí, soporte directo por WhatsApp y email, con respuesta en el mismo día laborable. Nada de tickets perdidos en un sistema automatizado.',
  },
]

function FAQItem({ faq, index, isOpen, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="border-b border-slate-200 py-5"
    >
      <button
        onClick={onClick}
        className="flex w-full cursor-pointer items-center justify-between text-left"
      >
        <span className="text-base font-semibold text-[#0F172A] md:text-lg">{faq.question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="ml-4 flex-shrink-0"
        >
          <IconChevron className="h-5 w-5 text-slate-400" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pt-3 text-sm leading-relaxed text-[#64748B]">{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  function handleClick(index) {
    setOpenIndex((prev) => (prev === index ? null : index))
  }

  return (
    <section id="faq" className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="mb-4 text-center text-3xl font-bold text-[#0F172A] md:text-4xl">
          Preguntas frecuentes
        </h2>
        <p className="mb-12 text-center text-lg text-[#64748B]">
          Todo lo que necesitas saber antes de empezar.
        </p>

        <div>
          {faqs.map((faq, index) => (
            <FAQItem
              key={faq.question}
              faq={faq}
              index={index}
              isOpen={openIndex === index}
              onClick={() => handleClick(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
