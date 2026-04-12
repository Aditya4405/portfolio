import { motion } from 'framer-motion'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.1 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay },
})

function MilestonesSection({ milestones }) {
  return (
    <div className="container">
      {/* Section Header */}
      <motion.div {...fadeUp(0)} style={{ marginBottom: '80px' }}>
        <span className="section-label">Evolution</span>
        <h2 className="section-title">Academic & Growth Milestones</h2>
        <p className="section-subtitle">
          A collection of academic highlights, internships, hackathons, and product-building experiences shaping my engineering journey.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {milestones.map((milestone, index) => (
          <motion.div
            key={milestone.title}
            {...fadeUp(index * 0.1)}
            className="flex flex-col gap-6 p-8 rounded-[2rem] border border-white/5 bg-white/5 backdrop-blur-sm"
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-violet-400 bg-violet-500/10 rounded-lg">
                {milestone.category || 'Experience'}
              </span>
              <span className="text-xs font-semibold text-slate-500">
                {milestone.year}
              </span>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-3">
                {milestone.title}
              </h3>
              <p className="text-sm leading-7 text-slate-400">
                {milestone.description || milestone.text}
              </p>
            </div>

            {milestone.skills && (
              <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-white/5">
                {milestone.skills.map((skill) => (
                  <span key={skill} className="px-2 py-1 text-[10px] font-medium text-slate-400 bg-white/5 rounded-md border border-white/5">
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default MilestonesSection
