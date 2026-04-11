import { motion } from 'framer-motion'
import { ArrowUpRight, BarChart3, Clock3, Users } from 'lucide-react'
import SectionHeading from '../SectionHeading'

const metricIcons = [Users, BarChart3, Clock3]
const VP = { once: true, amount: 0.1 }
const base = { initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 }, viewport: VP }
const t = (delay = 0) => ({ transition: { duration: 0.7, ease: 'easeOut', delay } })

function ProjectsSection({ projects, onOpen }) {
  return (
    <section id="projects" className="relative px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-7xl">

        <motion.div {...base} {...t()}>
          <SectionHeading
            eyebrow="Case Studies"
            title="Engineering Architecture"
            description="Each project represents a scalable backend architecture or precise front-end execution."
          />
        </motion.div>

        <div className="flex flex-col gap-24 mt-16">
          {projects.map((project, index) => (
            <div key={project.title} className="flex flex-col gap-10 md:flex-row items-center">

              {/* Project image — animates as one unit */}
              <motion.div {...base} {...t()} className="w-full md:w-[55%]">
                <div
                  className="relative overflow-hidden rounded-[2rem] border border-white/5 bg-[#0B1120] shadow-[0_20px_50px_rgba(0,0,0,0.3)] group cursor-pointer"
                  onClick={() => onOpen(project)}>
                  <div className="absolute inset-0 w-full h-[200%] bg-gradient-to-b from-white/10 to-transparent -translate-y-[100%] group-hover:translate-y-[100%] transition-transform duration-1000 skew-y-12 z-20 pointer-events-none" />
                  <img src={project.preview} alt={project.title}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                </div>
              </motion.div>

              {/* Project details — staggered individually */}
              <div className="w-full md:w-[45%] flex flex-col gap-5 md:pl-8">
                <motion.div {...base} {...t(0.05)} className="flex gap-2">
                  {project.stack.map((icon, i) => (
                    <span key={i} className="bg-[#0B1120] border border-white/10 p-2 rounded-lg">
                      <img src={icon} alt="" className="h-5 w-5 opacity-90" />
                    </span>
                  ))}
                </motion.div>

                <motion.h3 {...base} {...t(0.1)} className="text-3xl font-bold text-white tracking-tight">
                  {project.title}
                </motion.h3>

                <motion.p {...base} {...t(0.15)} className="text-[1.05rem] leading-8 text-[#94A3B8]">
                  {project.summary}
                </motion.p>

                <motion.div {...base} {...t(0.2)} className="grid gap-4 grid-cols-2">
                  {project.metrics.slice(0, 2).map((metric, mi) => {
                    const Icon = metricIcons[mi] ?? Clock3
                    return (
                      <div key={metric.label} className="border border-white/10 bg-white/5 rounded-xl p-4">
                        <Icon size={18} className="text-[#00D4FF] mb-2" />
                        <p className="text-base font-semibold text-white">{metric.value}</p>
                        <p className="text-xs uppercase tracking-widest text-slate-500 mt-1 font-bold">{metric.label}</p>
                      </div>
                    )
                  })}
                </motion.div>

                <motion.div {...base} {...t(0.25)} className="flex flex-wrap gap-4">
                  <a href={project.github} target="_blank" rel="noreferrer"
                    className="secondary-button whitespace-nowrap hover:border-white/30 hover:bg-white/5">
                    GitHub Repo
                  </a>
                  <button type="button" onClick={() => onOpen(project)}
                    className="primary-button whitespace-nowrap bg-[linear-gradient(135deg,#00D4FF_0%,#60A5FA_50%,#A855F7_100%)] text-[#050816] hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,212,255,0.3)] transition-all">
                    View full stack <ArrowUpRight size={18} />
                  </button>
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectsSection
