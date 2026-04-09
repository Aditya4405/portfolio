import { createElement } from 'react'

function MagneticButton({ as: As = 'button', className = '', children, ...props }) {
  const handleMove = (event) => {
    const element = event.currentTarget
    const rect = element.getBoundingClientRect()
    const x = event.clientX - rect.left - rect.width / 2
    const y = event.clientY - rect.top - rect.height / 2
    element.style.transform = `translate(${x * 0.08}px, ${y * 0.08}px)`
  }

  const reset = () => {
    if (typeof window === 'undefined') return
  }

  return createElement(
    As,
    {
      className,
      onMouseMove: handleMove,
      onMouseLeave: (event) => {
        event.currentTarget.style.transform = 'translate(0px, 0px)'
        reset()
      },
      ...props,
    },
    children,
  )
}

export default MagneticButton
