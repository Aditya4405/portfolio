import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useMotionTemplate, useScroll, useTransform } from 'framer-motion'
import { ArrowDownRight, Download } from 'lucide-react'
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { SiLeetcode } from 'react-icons/si'
import Tilt from 'react-parallax-tilt'
import { scaleIn } from '../../motion/variants'

const socialIcons = {
  GitHub: FiGithub,
  LinkedIn: FiLinkedin,
  Email: FiMail,
  LeetCode: SiLeetcode,
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
}

const textReveal = {
  hidden: { opacity: 0, filter: "blur(12px)", y: 30 },
  show: { 
    opacity: 1, 
    filter: "blur(0px)", 
    y: 0, 
    transition: { type: "spring", stiffness: 80, damping: 15, mass: 1 } 
  }
}

function HeroSection({ personalInfo, heroMetrics, resumeUrl }) {
  const sectionRef = useRef(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Cinematic Parallax Variables
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  })
  
  const gridY = useTransform(scrollYProgress, [0, 1], [0, -200])
  const meshY = useTransform(scrollYProgress, [0, 1], [0, -120])
  const particlesY = useTransform(scrollYProgress, [0, 1], [0, -70])

  function handleMouseMove({ clientX, clientY }) {
    if (!sectionRef.current) return
    const { left, top } = sectionRef.current.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  const spotlightGradient = useMotionTemplate`radial-gradient(800px circle at ${mouseX}px ${mouseY}px, rgba(0, 212, 255, 0.08), transparent 80%)`

  return (
    <section 
      id="home" 
      ref={sectionRef} 
      onMouseMove={handleMouseMove} 
      className="relative overflow-hidden px-6 lg:px-12 flex items-center justify-between min-h-[92vh] pt-24 pb-12 w-full"
    >
      {/* Background Interactive Layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        
        {/* Cinematic Parallax Hooks mapped to user scroll */}
        
        {/* Soft Blurred Gradient Orb */}
        <motion.div style={{ y: meshY }} className="absolute top-[10%] right-[10%] w-[500px] h-[500px] bg-[rgba(0,212,255,0.06)] rounded-full blur-[140px]" />
        {/* Spotlight Beam Glow coming from top right edge */}
        <motion.div style={{ y: meshY }} className="absolute -top-[10%] xl:top-0 right-[-5%] w-[800px] h-[300px] bg-[rgba(124,58,237,0.08)] -rotate-12 blur-[100px]" />
        
        {/* Low-opacity matrix particles drifting upper right */}
        <motion.div style={{ y: particlesY }} className="absolute top-[15%] right-[20%] w-2 h-2 rounded-full bg-[#00D4FF] blur-[1.5px] animate-[ping_8s_infinite_ease-in-out_1s]" />
        <motion.div style={{ y: particlesY }} className="absolute top-[25%] right-[10%] w-1.5 h-1.5 rounded-full bg-[#7C3AED] blur-[1px] animate-[bounce_5s_infinite_ease-in-out_2s]" />
        <motion.div style={{ y: particlesY }} className="absolute top-[5%] right-[28%] w-1.5 h-1.5 rounded-full bg-[#00D4FF] blur-[1px] animate-[ping_10s_infinite_ease-in-out]" />

        {/* Soft Mesh Gradient Backdrop Left Bottom */}
        <motion.div style={{ y: meshY }} className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-[rgba(0,212,255,0.03)] rounded-full blur-[140px]" />
        
        {/* Blueprint Grid with 0.6x Speed offset */}
        <motion.div style={{ backgroundSize: '40px 40px', y: gridY }} className="absolute inset-0 h-[150vh] bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)]" />
        
        {/* Dynamic Spotlight following cursor */}
        <motion.div className="absolute inset-0 z-0 mix-blend-screen" style={{ background: spotlightGradient }} />
      </div>

      <div className="mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-[6%] w-full max-w-7xl relative z-10 w-full">
        
        {/* LEFT COLUMN: Cinematic Typography (58% allocated width) */}
        <motion.div 
          variants={containerVariants} 
          initial="hidden" 
          animate="show" 
          className="relative w-full lg:w-[58%] flex flex-col"
        >
          {/* Tagline Badge */}
          <motion.div variants={textReveal} className="flex items-center gap-4">
            <span className="h-[1px] w-12 bg-gradient-to-r from-[#00D4FF] to-transparent" />
            <span className="text-[0.75rem] font-bold uppercase tracking-[0.4em] text-[#00D4FF]">
              Software Engineer
            </span>
          </motion.div>

          {/* Heading - strict rhythm line breaks & responsive clamp scaling */}
          <motion.h1 className="mt-7 font-sans text-[clamp(2.8rem,5vw,5rem)] font-bold leading-[0.96] tracking-[-0.03em] text-[#F8FAFC]">
            <motion.div variants={textReveal} className="overflow-visible whitespace-nowrap">Building premium web</motion.div>
            <motion.div variants={textReveal} className="overflow-visible whitespace-nowrap">
              products with <span className="bg-[linear-gradient(135deg,#00D4FF_0%,#60A5FA_50%,#A855F7_100%)] bg-[length:200%_auto] animate-[gradient_4s_linear_infinite] bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(0,212,255,0.2)]">
                Java
              </span>
            </motion.div>
            <motion.div variants={textReveal} className="overflow-visible whitespace-nowrap">
               <span className="bg-[linear-gradient(135deg,#00D4FF_0%,#60A5FA_50%,#A855F7_100%)] bg-[length:200%_auto] animate-[gradient_4s_linear_infinite] bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(0,212,255,0.2)]">
                backend depth
               </span> and
            </motion.div>
            <motion.div variants={textReveal} className="overflow-visible pb-2 whitespace-nowrap">
               <span className="text-white relative inline-block group">
                 AI thinking.
                 <span className="absolute bottom-2 left-0 w-full h-[4px] bg-[#7C3AED]/40 rounded opacity-80" />
               </span>
            </motion.div>
          </motion.h1>

          <motion.p variants={textReveal} className="mt-8 max-w-[540px] text-[1.05rem] leading-[1.8] text-[#94A3B8] font-medium tracking-wide">
            I focus on clean interfaces, reliable service architecture, and practical AI execution. Shaping products that feel calm, useful, and production-ready.
          </motion.p>

          {/* 3-Tier Luxury CTA */}
          <motion.div variants={textReveal} className="mt-12 flex flex-wrap items-center gap-4">
            <a href="#projects" className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-[linear-gradient(135deg,#00D4FF_0%,#60A5FA_50%,#A855F7_100%)] p-[1px] font-semibold text-[#050816] transition-all hover:shadow-[0_0_25px_rgba(0,212,255,0.3)] hover:-translate-y-0.5">
               <div className="bg-[linear-gradient(135deg,#00D4FF_0%,#60A5FA_50%,#A855F7_100%)] px-[1.6rem] py-[0.8rem] rounded-full flex items-center gap-2 relative overflow-hidden transition-all">
                  <span className="tracking-wide">Explore Work</span>
                  <ArrowDownRight size={18} className="transition-transform group-hover:rotate-[-45deg]" />
                  <div className="absolute inset-0 -translate-x-full bg-white/25 skew-x-[-20deg] group-hover:animate-[shimmer_1s_ease-in-out_forwards]" />
               </div>
            </a>
            
            <a href={resumeUrl} download className="group relative inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-[1.6rem] py-[0.8rem] font-semibold text-white backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/20 hover:-translate-y-0.5">
              <Download size={18} />
              <span className="tracking-wide">Resume</span>
            </a>

            <a href="#contact" className="group relative inline-flex items-center justify-center gap-2 rounded-full px-[1.6rem] py-[0.8rem] font-semibold text-[#94A3B8] transition-all hover:text-white hover:bg-white/5">
              <FiMail size={18} />
              <span className="tracking-wide">Contact</span>
            </a>
          </motion.div>

          {/* Luxury Social Pills */}
          <motion.div variants={textReveal} className="mt-7 flex flex-wrap gap-3">
            {personalInfo.socials.map((social) => {
              const Icon = socialIcons[social.label]
              return (
                <a key={social.label} href={social.href} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-[0.4rem] rounded-full border border-white/5 bg-[#0B1120]/40 backdrop-blur-sm text-[#94A3B8] text-[0.85rem] font-medium transition-all hover:text-[#00D4FF] hover:border-[#00D4FF]/30 hover:bg-[#00D4FF]/10 hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(0,212,255,0.08)] group">
                  <Icon size={15} className="transition-transform group-hover:scale-110" />
                  {social.label}
                </a>
              )
            })}
          </motion.div>

          {/* Animated Stats Flow */}
          <motion.div variants={textReveal} className="flex gap-10 mt-8 pt-8 border-t border-white/5">
            {heroMetrics.map((metric) => (
              <div key={metric.label} className="flex flex-col">
                <p className="text-[1.35rem] font-bold text-white mb-1.5">{metric.value}</p>
                <p className="text-[0.62rem] uppercase tracking-[0.2em] text-[#94A3B8] font-bold">{metric.label}</p>
              </div>
            ))}
          </motion.div>

        </motion.div>


        {/* RIGHT COLUMN: Cinematic Portrait Framing (42% allocated width) */}
        <motion.div variants={scaleIn} initial="hidden" animate="show" className="relative flex justify-center lg:justify-end w-full lg:w-[42%] pt-16 lg:pt-0 pb-10 xl:pr-5">
          <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} perspective={1000} scale={1.03} transitionSpeed={2500} className="relative z-10 w-full max-w-[460px]">
             
            {/* Cinematic Background Glows / Ambient Light */}
            <div className="absolute -inset-6 bg-[radial-gradient(circle,rgba(0,212,255,0.1)_0%,transparent_70%)] rounded-3xl blur-2xl" />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#00D4FF]/10 to-[#7C3AED]/15 rounded-[2rem] blur-[40px]" />


            {/* Clean Portrait Card */}
            <div className="relative overflow-hidden rounded-[2rem] border border-white/5 bg-[#0B1120] backdrop-blur-xl shadow-[0_40px_100px_rgba(0,0,0,0.5)] aspect-[4/5.2] group">
              
              {/* Glass Reflection Sweep */}
              <div className="absolute inset-0 w-full h-[200%] bg-gradient-to-b from-white-[0.08] to-transparent -translate-y-[100%] group-hover:translate-y-[100%] transition-transform duration-[1200ms] ease-in-out skew-y-[15deg] z-20 pointer-events-none" />
              
              {/* Soft border inner highlight */}
              <div className="absolute inset-0 border border-white/[0.06] rounded-[2rem] z-20 pointer-events-none" />

              <img 
                src={personalInfo.profileImage} 
                alt="Aditya Prajapati portrait" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 z-10" 
                style={{ objectPosition: 'center 15%' }}
              />
              
              {/* Ambient inner shadow mapping to the dark theme */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-[#050816]/20 to-transparent z-10 pointer-events-none opacity-90 transition-opacity duration-1000 group-hover:opacity-75" />
            </div>

          </Tilt>
        </motion.div>

      </div>
    </section>
  )
}

export default HeroSection
