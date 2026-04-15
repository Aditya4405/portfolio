import { motion, useScroll, useTransform } from 'framer-motion'
import { useTheme } from '../../hooks/useTheme.jsx'

export default function BackgroundOrbs() {
  const { scrollYProgress } = useScroll()
  const { theme } = useTheme()

  const isDark = theme === 'dark'

  // Animate Positions
  const orb1X = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], ['-10%', '70%', '10%', '60%'])
  const orb1Y = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], ['10%', '20%', '80%', '40%'])
  
  const orb2X = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], ['90%', '20%', '70%', '10%'])
  const orb2Y = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], ['80%', '60%', '10%', '90%'])

  // Animate Colors
  const orb1Color = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 1],
    isDark ? [
      'radial-gradient(circle, rgba(239, 68, 68, 0.1) 0%, transparent 70%)',
      'radial-gradient(circle, rgba(153, 27, 27, 0.15) 0%, transparent 70%)',
      'radial-gradient(circle, rgba(239, 68, 68, 0.12) 0%, transparent 70%)',
      'radial-gradient(circle, rgba(153, 27, 27, 0.1) 0%, transparent 70%)'
    ] : [
      'radial-gradient(circle, rgba(239, 68, 68, 0.05) 0%, transparent 70%)',
      'radial-gradient(circle, rgba(239, 68, 68, 0.08) 0%, transparent 70%)',
      'radial-gradient(circle, rgba(239, 68, 68, 0.06) 0%, transparent 70%)',
      'radial-gradient(circle, rgba(239, 68, 68, 0.04) 0%, transparent 70%)'
    ]
  )

  const orb3Scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.4, 1.1])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Orb 1 - Dynamic Red */}
      <motion.div
        style={{
          position: 'absolute',
          left: orb1X,
          top: orb1Y,
          width: '70vw',
          height: '70vw',
          borderRadius: '50%',
          background: orb1Color,
          filter: 'blur(120px)',
          x: '-50%',
          y: '-50%',
        }}
      />

      {/* Orb 2 - Deep Red */}
      <motion.div
        style={{
          position: 'absolute',
          left: orb2X,
          top: orb2Y,
          width: '60vw',
          height: '60vw',
          borderRadius: '50%',
          background: isDark 
            ? 'radial-gradient(circle, rgba(153, 27, 27, 0.08) 0%, rgba(239, 68, 68, 0.04) 40%, transparent 70%)'
            : 'radial-gradient(circle, rgba(239, 68, 68, 0.04) 0%, transparent 70%)',
          filter: 'blur(140px)',
          x: '-50%',
          y: '-50%',
        }}
      />

      {/* Orb 3 - Ambient Glow */}
      <motion.div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: '90vw',
          height: '90vw',
          scale: orb3Scale,
          borderRadius: '50%',
          background: isDark
            ? 'radial-gradient(circle, rgba(239, 68, 68, 0.03) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(239, 68, 68, 0.02) 0%, transparent 70%)',
          filter: 'blur(160px)',
          x: '-50%',
          y: '-50%',
        }}
      />
    </div>
  )
}
