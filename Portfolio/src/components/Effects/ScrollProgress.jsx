import { motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  
  // Apply a spring physics layer to the progress bar so it glides smoothly rather than juddering
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[9999] origin-left"
      style={{
        scaleX,
        height: '2px',
        background: 'linear-gradient(90deg, #c0392b 0%, #e05030 100%)',
        boxShadow: '0 0 10px rgba(192,57,43,0.7)',
      }}
    />
  )
}
