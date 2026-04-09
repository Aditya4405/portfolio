import { motion as Motion } from 'framer-motion'
import SectionHeading from '../SectionHeading'

function SkillsSection({ skills }) {
  const radius = 158

  return (
    <section id="skills" className="px-6 py-20 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Skills"
          title="A compact orbit of tools around the core stack"
          description="A cleaner circular skills system with equal spacing, logo-driven pills, and a responsive compact grid on smaller screens."
        />

        <div className="hidden lg:flex skills-orbit-shell">
          <div className="skills-orbit-core">
            <div className="skills-orbit-core__ring" />
            <div className="skills-orbit-core__inner">
              <p className="text-xs uppercase tracking-[0.42em] text-cyan-200">Core</p>
              <h3 className="mt-2.5 font-display text-[2rem] font-semibold text-white">Skills</h3>
            </div>
          </div>

          {skills.map((skill, index) => {
            const angle = (360 / skills.length) * index
            return (
              <div
                key={skill.name}
                className="skills-orbit-item"
                style={{
                  transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${radius}px) rotate(-${angle}deg)`,
                }}
              >
                <Motion.div
                  className="skills-orbit-pill"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4 + index * 0.15, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <img src={skill.icon} alt={`${skill.name} logo`} className="h-7 w-7" />
                  <span>{skill.name}</span>
                </Motion.div>
              </div>
            )
          })}
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:hidden">
          {skills.map((skill) => (
            <div key={skill.name} className="skills-mobile-card">
              <img src={skill.icon} alt={`${skill.name} logo`} className="h-8 w-8" />
              <span>{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SkillsSection
