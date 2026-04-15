import { motion as Motion } from 'framer-motion'
import { useTheme } from '../hooks/useTheme.jsx'

function SectionHeading({ eyebrow, title, description }) {
  const { theme } = useTheme()

  return (
    <Motion.div
      className="mx-auto mb-16 max-w-[42rem] text-center"
      initial={{ opacity: 0, y: 24, scale: 0.98, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="section-eyebrow">
        {eyebrow}
      </p>
      <h2 
        className="text-[2.2rem] md:text-[3rem] font-extrabold leading-[1.06]"
        style={{ 
          background: theme === 'dark'
            ? 'linear-gradient(135deg, #ffffff 30%, #f87171 70%, #ef4444 100%)'
            : 'none',
          WebkitBackgroundClip: theme === 'dark' ? 'text' : 'unset',
          WebkitTextFillColor: theme === 'dark' ? 'transparent' : 'unset',
          color: theme === 'dark' ? 'transparent' : '#1e293b',
          marginBottom: '16px'
        }}
      >
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-[1.05rem] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {description}
        </p>
      )}
    </Motion.div>
  )
}

export default SectionHeading
