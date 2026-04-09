import { AnimatePresence, motion as Motion } from 'framer-motion'
import { ArrowUpRight, X } from 'lucide-react'

function ProjectModal({ project, onClose }) {
  return (
    <AnimatePresence>
      {project ? (
        <Motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-slate-950/80 px-4 py-8 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <Motion.div
            className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(8,12,24,0.98),rgba(12,18,34,0.95))] p-6 shadow-[0_40px_120px_rgba(15,23,42,0.65)]"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-5 top-5 rounded-full border border-white/10 bg-white/6 p-3 text-slate-200 transition hover:border-cyan-300/40 hover:text-cyan-200"
            >
              <X size={18} />
            </button>

            <div className="overflow-hidden rounded-[1.6rem] border border-white/10">
              <img src={project.preview} alt={`${project.title} case study`} className="h-80 w-full object-cover" />
            </div>

            <div className="mt-8">
              <p className="text-xs uppercase tracking-[0.35em] text-cyan-200">Case Study</p>
              <h3 className="mt-3 text-3xl font-semibold text-white">{project.title}</h3>
              <p className="mt-4 max-w-3xl text-base leading-8 text-slate-300">{project.summary}</p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {project.stack.map((icon, index) => (
                <span key={`${project.title}-stack-${index}`} className="case-icon-badge">
                  <img src={icon} alt="" className="h-6 w-6" />
                </span>
              ))}
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {project.features.map((feature) => (
                <div key={feature} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 text-sm leading-7 text-slate-300">
                  {feature}
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {project.metrics.map((metric) => (
                <div key={metric.label} className="rounded-[1.4rem] border border-white/10 bg-slate-950/50 p-5">
                  <p className="text-lg font-semibold text-white">{metric.value}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.24em] text-slate-500">{metric.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <a href={project.github} target="_blank" rel="noreferrer" className="secondary-button premium-button">
                View GitHub
              </a>
              <a href={project.demo} className="primary-button premium-button">
                Live Demo
                <ArrowUpRight size={18} />
              </a>
            </div>
          </Motion.div>
        </Motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export default ProjectModal
