import { AnimatePresence, motion as Motion } from 'framer-motion'
import { FiArrowUpRight, FiGithub, FiX } from 'react-icons/fi'

function ProjectModal({ project, onClose }) {
  return (
    <AnimatePresence>
      {project ? (
        <Motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/75 px-4 py-8 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <Motion.div
            className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.96),rgba(9,14,28,0.92))] p-8 shadow-[0_30px_100px_rgba(14,165,233,0.18)]"
            initial={{ scale: 0.94, y: 24 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.94, y: 24 }}
            transition={{ duration: 0.3 }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-5 top-5 rounded-full border border-white/10 bg-white/5 p-3 text-slate-200 transition hover:border-cyan-400/50 hover:text-cyan-300"
              aria-label="Close project details"
            >
              <FiX />
            </button>

            <div className="mb-8 overflow-hidden rounded-[1.6rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(103,232,249,0.24),transparent_38%),linear-gradient(135deg,rgba(30,41,59,0.8),rgba(12,18,34,0.95))] p-8">
              <p className="mb-3 text-sm uppercase tracking-[0.35em] text-cyan-300/75">
                Premium Project View
              </p>
              <h3 className="text-3xl font-semibold text-white">{project.title}</h3>
              <p className="mt-4 max-w-2xl text-slate-300">{project.description}</p>
            </div>

            <div className="mb-8 flex flex-wrap gap-3">
              {project.tech.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-100"
                >
                  {badge}
                </span>
              ))}
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {project.features.map((feature) => (
                <div
                  key={feature}
                  className="rounded-3xl border border-white/10 bg-white/5 p-5 text-sm leading-6 text-slate-300"
                >
                  {feature}
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-slate-100 transition hover:border-cyan-400/40 hover:bg-cyan-400/10"
              >
                <FiGithub />
                View GitHub
              </a>
              <a
                href={project.demo}
                className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,#22d3ee,#a855f7)] px-5 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.02]"
              >
                <FiArrowUpRight />
                Live Experience
              </a>
            </div>
          </Motion.div>
        </Motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export default ProjectModal
