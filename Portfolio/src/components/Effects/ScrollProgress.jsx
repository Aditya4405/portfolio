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
      className="fixed top-0 left-0 right-0 h-[2.5px] z-50 origin-left bg-[linear-gradient(90deg,#00D4FF_0%,#60A5FA_50%,#A855F7_100%)] shadow-[0_0_15px_rgba(0,212,255,0.4)]"
      style={{ scaleX }}
    />
  )
}
