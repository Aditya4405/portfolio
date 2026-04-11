import { motion } from 'framer-motion'
import { useState } from 'react'
import SectionHeading from '../SectionHeading'
import { skills } from '../../data/portfolio'

const VP = { once: true, amount: 0.2 }
const base = { initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 }, viewport: VP }
const t = (delay = 0) => ({ transition: { duration: 0.7, ease: 'easeOut', delay } })

function SkillsSection() {
  const innerRingSkills = ['REST API', 'MySQL', 'Docker', 'Firebase']
  const outerRingSkills = ['React', 'Tailwind', 'Cloud', 'GitHub', 'AI', 'Vercel']
  const getSkillObj = (name) => skills.find((s) => s.name === name) || { name, icon: '' }

  const skillDetailsMap = {
    'Java': { exp: 'Core Backend', projects: '5+ Projects' },
    'Spring Boot': { exp: 'Architecture', projects: '4 Projects' },
    'React': { exp: 'Frontend UI', projects: '8+ Projects' },
    'Tailwind': { exp: 'CSS Styling', projects: '10+ Projects' },
    'MySQL': { exp: 'Relational DB', projects: '6+ Projects' },
    'Docker': { exp: 'Containerization', projects: '3 Projects' },
    'Firebase': { exp: 'Realtime Sync', projects: '4 Projects' },
    'REST API': { exp: 'Integrations', projects: '10+ APIs' },
    'GitHub': { exp: 'Version Control', projects: 'Daily' },
    'Cloud': { exp: 'Infrastructure', projects: '2 Projects' },
    'AI': { exp: 'Workflows & CV', projects: '3 Projects' },
    'Vercel': { exp: 'Deployment', projects: '5+ Sites' },
  }

  const innerRadius = 42
  const outerRadius = 45

  const getOrbitPosition = (index, total, radiusPercent) => {
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2
    return {
      left: `${50 + radiusPercent * Math.cos(angle)}%`,
      top: `${50 + radiusPercent * Math.sin(angle)}%`,
      transform: 'translate(-50%, -50%)'
    }
  }

  return (
    <section id="skills" className="relative px-6 py-24 lg:px-10 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="absolute w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(0,212,255,0.06)_0%,rgba(59,130,246,0.02)_40%,transparent_70%)] blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">

        <motion.div {...base} {...t()}>
          <SectionHeading
            eyebrow="Technical Ecosystem"
            title={<span className="bg-[linear-gradient(135deg,#00D4FF_0%,#60A5FA_50%,#A855F7_100%)] bg-clip-text text-transparent">Architecture Map</span>}
            description="A visual architecture of the technologies powering my backend systems, full-stack workflows, and AI explorations."
          />
        </motion.div>

        {/* Orbit: animates as one block when it enters */}
        <motion.div {...base} {...t(0.1)}
          className="mt-16 relative flex items-center justify-center w-full min-h-[700px] py-10">

          <div className="orbit-container relative flex items-center justify-center w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] md:w-[600px] md:h-[600px] lg:w-[700px] lg:h-[700px]">

            {/* Inner Ring */}
            <div className="absolute inset-0 flex items-center justify-center scale-75 md:scale-100">
              <div className="orbit-path w-[18rem] h-[18rem] md:w-[24rem] md:h-[24rem] border border-[rgba(0,212,255,0.15)] rounded-full absolute" style={{ borderStyle: 'dashed' }} />
              <div className="orbit-ring orbit-ring-inner absolute w-[18rem] h-[18rem] md:w-[24rem] md:h-[24rem] rounded-full">
                {innerRingSkills.map((name, i) => {
                  const skill = getSkillObj(name)
                  const details = skillDetailsMap[name] || { exp: 'Experience', projects: 'Projects' }
                  return (
                    <div key={name} className="orbit-counter-ring-inner absolute" style={getOrbitPosition(i, innerRingSkills.length, innerRadius)}>
                      <OrbitNode skill={skill} details={details} />
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Outer Ring */}
            <div className="absolute inset-0 flex items-center justify-center scale-[0.65] sm:scale-[0.80] md:scale-100">
              <div className="orbit-path w-[28rem] h-[28rem] md:w-[38rem] md:h-[38rem] border border-[rgba(124,58,237,0.15)] rounded-full absolute" />
              <div className="orbit-ring orbit-ring-outer absolute w-[28rem] h-[28rem] md:w-[38rem] md:h-[38rem] rounded-full">
                {outerRingSkills.map((name, i) => {
                  const skill = getSkillObj(name)
                  const details = skillDetailsMap[name] || { exp: 'Experience', projects: 'Projects' }
                  return (
                    <div key={name} className="orbit-counter-ring-outer absolute" style={getOrbitPosition(i, outerRingSkills.length, outerRadius)}>
                      <OrbitNode skill={skill} details={details} />
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Center Core */}
            <div className="absolute z-20 flex flex-col items-center justify-center w-32 h-32 md:w-36 md:h-36 rounded-full border border-white/10 bg-[#0B1120]/80 backdrop-blur-xl shadow-[0_0_60px_rgba(0,212,255,0.3)] animate-pulse-slow cursor-crosshair group">
              <div className="absolute inset-1.5 rounded-full bg-gradient-to-br from-[#00D4FF]/20 via-[#60A5FA]/20 to-[#A855F7]/20 border border-white/10 group-hover:from-[#00D4FF]/40 group-hover:to-[#A855F7]/40 transition-colors duration-500" />
              <div className="relative z-10 flex gap-2 mb-2">
                <img src={getSkillObj('Java').icon} alt="Java" className="w-8 h-8 md:w-9 md:h-9" />
                <img src={getSkillObj('Spring Boot').icon} alt="Spring Boot" className="w-8 h-8 md:w-9 md:h-9" />
              </div>
              <div className="relative z-10 text-center">
                <h4 className="text-[0.65rem] font-bold text-white tracking-[0.15em] leading-tight">JAVA +<br />SPRING BOOT</h4>
              </div>
              <div className="absolute top-[120%] opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300 z-50">
                <div className="px-5 py-2 border border-[#00D4FF]/40 bg-[#050816]/95 rounded-lg shadow-xl whitespace-nowrap backdrop-blur-xl text-center">
                  <p className="font-bold text-white text-sm">Core Engineering</p>
                  <p className="text-xs text-[#00D4FF] mt-1">Architecture Base</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function OrbitNode({ skill, details }) {
  return (
    <div className="group relative flex items-center justify-center">
      <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-[rgba(255,255,255,0.12)] bg-[#0B1120]/90 backdrop-blur-md flex items-center justify-center cursor-crosshair transition-all duration-300 group-hover:scale-125 group-hover:border-[#00D4FF] group-hover:shadow-[0_0_25px_rgba(0,212,255,0.4)]">
        {skill.icon
          ? <img src={skill.icon} alt={skill.name} className="w-7 h-7 md:w-8 md:h-8" />
          : <span className="text-xs text-white uppercase tracking-wider">{skill.name.substring(0, 3)}</span>
        }
      </div>
      <div className="absolute top-[130%] opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300 z-50">
        <div className="px-4 py-3 border border-[#00D4FF]/40 bg-[#050816]/95 rounded-lg shadow-xl whitespace-nowrap backdrop-blur-xl flex flex-col items-center">
          <p className="font-bold text-white text-sm">{skill.name}</p>
          <div className="flex items-center gap-3 mt-2">
            <span className="px-2 py-0.5 rounded border border-[#60A5FA]/30 bg-[#60A5FA]/10 text-[0.65rem] text-[#00D4FF] font-bold uppercase tracking-widest">{details.exp}</span>
            <span className="text-[0.7rem] text-slate-300">{details.projects}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SkillsSection
