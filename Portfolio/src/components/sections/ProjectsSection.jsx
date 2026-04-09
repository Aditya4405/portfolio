import { motion as Motion } from 'framer-motion'
import Tilt from 'react-parallax-tilt'
import { ArrowUpRight, BarChart3, Clock3, Users } from 'lucide-react'
import SectionHeading from '../SectionHeading'
import { fadeUp, stagger } from '../../motion/variants'

const metricIcons = [Users, BarChart3, Clock3]

function ProjectsSection({ projects, onOpen }) {
  return (
    <section id="projects" className="px-6 py-20 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Projects"
          title="Case-study cards with tighter proportions and cleaner density"
          description="Each project is framed like a polished product story with preview artwork, technology icon badges, performance cues, and a modal case-study view."
        />

        <Motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.12 }} className="grid auto-rows-fr gap-4 lg:grid-cols-2">
          {projects.map((project) => (
            <Tilt key={project.title} tiltMaxAngleX={6} tiltMaxAngleY={6} glareEnable glareMaxOpacity={0.16} className="h-full">
              <Motion.article variants={fadeUp} className="case-card h-full">
                <div className="case-card__image-wrap">
                  <img src={project.preview} alt={`${project.title} preview`} className="case-card__image" />
                  <div className="case-card__overlay" />
                </div>

                <div className="case-card__body">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-[1rem] font-semibold leading-snug text-white md:text-[1.14rem]">{project.title}</h3>
                    <div className="flex gap-2">
                      {project.stack.map((icon, index) => (
                        <span key={`${project.title}-icon-${index}`} className="case-icon-badge">
                          <img src={icon} alt="" className="h-6 w-6" />
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="case-summary mt-2.5 text-[0.92rem] leading-7 text-slate-400">{project.summary}</p>

                  <div className="mt-4 grid gap-2 sm:grid-cols-3">
                    {project.metrics.map((metric, index) => {
                      const Icon = metricIcons[index] ?? Clock3
                      return (
                        <div key={metric.label} className="case-metric">
                          <Icon size={16} className="text-cyan-300" />
                          <p className="mt-2 text-sm font-semibold text-white">{metric.value}</p>
                          <p className="text-xs uppercase tracking-[0.24em] text-slate-500">{metric.label}</p>
                        </div>
                      )
                    })}
                  </div>

                  <div className="mt-auto flex flex-wrap gap-2 pt-4">
                    <a href={project.github} target="_blank" rel="noreferrer" className="secondary-button premium-button compact-button">
                      GitHub
                    </a>
                    <a href={project.demo} className="secondary-button premium-button compact-button">
                      Live Demo
                    </a>
                    <button type="button" onClick={() => onOpen(project)} className="primary-button premium-button compact-button">
                      View Case Study
                      <ArrowUpRight size={18} />
                    </button>
                  </div>
                </div>
              </Motion.article>
            </Tilt>
          ))}
        </Motion.div>
      </div>
    </section>
  )
}

export default ProjectsSection
