import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'

function IconChevron({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

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
  const { t } = useTranslation()
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    { question: t('faq.q1'), answer: t('faq.a1') },
    { question: t('faq.q2'), answer: t('faq.a2') },
    { question: t('faq.q3'), answer: t('faq.a3') },
    { question: t('faq.q4'), answer: t('faq.a4') },
    { question: t('faq.q5'), answer: t('faq.a5') },
    { question: t('faq.q6'), answer: t('faq.a6') },
  ]

  function handleClick(index) {
    setOpenIndex((prev) => (prev === index ? null : index))
  }

  return (
    <section id="faq" className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="mb-4 text-center text-3xl font-bold text-[#0F172A] md:text-4xl">
          {t('faq.title')}
        </h2>
        <p className="mb-12 text-center text-lg text-[#64748B]">
          {t('faq.subtitle')}
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
