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
      className="fixed top-0 left-0 right-0 h-[2px] z-50 origin-left bg-[linear-gradient(90deg,#7C5CFC_0%,#9F84FF_100%)]"
      style={{ scaleX }}
    />
  )
}
