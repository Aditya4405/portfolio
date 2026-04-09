import { useEffect } from 'react'

function CursorSpotlight() {
  useEffect(() => {
    const handleMove = (event) => {
      document.documentElement.style.setProperty('--spotlight-x', `${event.clientX}px`)
      document.documentElement.style.setProperty('--spotlight-y', `${event.clientY}px`)
    }

    window.addEventListener('pointermove', handleMove)
    return () => window.removeEventListener('pointermove', handleMove)
  }, [])

  return <div className="pointer-events-none fixed inset-0 z-30 spotlight-layer" />
}

export default CursorSpotlight
