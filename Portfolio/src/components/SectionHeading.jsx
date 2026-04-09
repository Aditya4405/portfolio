import { motion as Motion } from 'framer-motion'

function SectionHeading({ eyebrow, title, description }) {
  return (
    <Motion.div
      className="mx-auto mb-7 max-w-[42rem] text-center"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.6 }}
    >
      <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.42em] text-cyan-300/80">
        {eyebrow}
      </p>
      <h2 className="bg-[linear-gradient(120deg,#f8fafc_20%,#67e8f9_55%,#c084fc_100%)] bg-clip-text text-[1.92rem] font-semibold leading-[1.06] text-transparent md:text-[2.4rem]">
        {title}
      </h2>
      <p className="mt-2.5 text-[0.92rem] leading-7 text-slate-300">
        {description}
      </p>
    </Motion.div>
  )
}

export default SectionHeading
