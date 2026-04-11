// The exact Adarsh-style scroll reveal:
// Pure opacity + y translate, no blur, no scale, fast easeOut
// Each element independently triggers when it enters the viewport

export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
}

// Alias exports kept for backward compat
export const cinematicReveal = fadeUp
export const scaleIn = fadeUp
export const stagger = {}
export const staggerContainer = {}
