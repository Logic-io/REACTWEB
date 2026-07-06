import { motion, useReducedMotion } from 'motion/react'

export default function BlurText({ text, className = '', delay = 0 }) {
  const shouldReduceMotion = useReducedMotion()
  const words = text.split(' ')

  return (
    <span className={className} aria-label={text}>
      {words.map((word, index) => (
        <motion.span
          aria-hidden="true"
          className="inline-block"
          initial={shouldReduceMotion ? false : { opacity: 0, filter: 'blur(12px)', y: 16 }}
          animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.65,
            delay: shouldReduceMotion ? 0 : delay + index * 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
          key={`${word}-${index}`}
        >
          {word}
          {index < words.length - 1 && '\u00a0'}
        </motion.span>
      ))}
    </span>
  )
}
