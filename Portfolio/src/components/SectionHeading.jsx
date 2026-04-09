import { motion as Motion } from 'framer-motion'

function SectionHeading({ eyebrow, title, description }) {
  return (
    <Motion.div
      className="mx-auto mb-12 max-w-3xl text-center"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.6 }}
    >
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.5em] text-cyan-300/80">
        {eyebrow}
      </p>
      <h2 className="bg-[linear-gradient(120deg,#f8fafc_20%,#67e8f9_55%,#c084fc_100%)] bg-clip-text text-4xl font-semibold text-transparent md:text-5xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-7 text-slate-300 md:text-lg">
        {description}
      </p>
    </Motion.div>
  )
}

export default SectionHeading
