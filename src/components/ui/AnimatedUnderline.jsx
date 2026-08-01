import { motion } from 'framer-motion'

export function AnimatedUnderline({ color = '#16255C', duration = 1, delay = 0.4 }) {
  return (
    <svg
      width="100%"
      height="14"
      viewBox="0 0 300 14"
      preserveAspectRatio="none"
      className="absolute left-0 w-full"
      style={{ top: '100%', marginTop: '-4px', overflow: 'visible' }}
    >
      <motion.path
        d="M2,7 Q75,2 150,7 Q225,12 298,7"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration, delay, ease: 'easeOut' }}
      />
    </svg>
  )
}
